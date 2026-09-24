// Removes original text from a page's content streams (instead of only covering it),
// so replaced text can't be recovered by copying, searching or extracting the PDF.
//
// The page's content is interpreted just enough to know where every glyph lands:
// graphics state (q/Q/cm), text state (Tf, Tc, Tw, Tz, TL, Ts, Tr), text positioning
// (BT, Td, TD, Tm, T*) and form XObjects. Glyphs whose center falls inside one of the
// given rectangles are replaced by an equal positioning offset, so all other text on
// the line stays exactly where it was.

import {
  PDFDocument,
  PDFPage,
  PDFDict,
  PDFName,
  PDFArray,
  PDFNumber,
  PDFRef,
  PDFRawStream,
  PDFStream,
  PDFObject,
  decodePDFRawStream,
} from "pdf-lib";
import { Font as StandardFont, Encodings, type IFontNames } from "@pdf-lib/standard-fonts";
import { multiplyTransform } from "./pdfText";

/** Rectangle in the page's default user space. */
export interface PdfRect {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/**
 * Look up `key` in a PDF dictionary, resolving references; undefined if missing or of
 * another type. (pdf-lib's own lookupMaybe throws on a type mismatch, and real-world
 * PDFs vary: e.g. /Encoding may be a name, a dictionary or a stream.)
 */
export function lk<T extends PDFObject>(
  dict: PDFDict | undefined,
  key: string,
  type: { prototype: T }
): T | undefined {
  if (!dict) return undefined;
  const v = dict.context.lookup(dict.get(PDFName.of(key)));
  return v instanceof (type as unknown as typeof PDFObject) ? (v as T) : undefined;
}

/** Element `i` of a PDF array (resolving references) if it has the given type. */
export function at<T extends PDFObject>(arr: PDFArray | undefined, i: number, type: { prototype: T }): T | undefined {
  if (!arr || i >= arr.size()) return undefined;
  const v = arr.lookup(i);
  return v instanceof (type as unknown as typeof PDFObject) ? (v as T) : undefined;
}

// ---------------------------------------------------------------------------
// Content stream lexer

interface PdfString {
  bytes: number[];
}
interface PdfNameToken {
  name: string;
}
type Operand = number | boolean | null | PdfString | PdfNameToken | Operand[] | { dict: true };

interface Op {
  op: string;
  args: Operand[];
  start: number; // byte offset of the first operand (or the operator)
  end: number; // byte offset just after the operator
}

const isWhite = (c: number) => c === 0 || c === 9 || c === 10 || c === 12 || c === 13 || c === 32;
const isDelim = (c: number) =>
  c === 40 || c === 41 || c === 60 || c === 62 || c === 91 || c === 93 || c === 123 || c === 125 || c === 47 || c === 37;

class Lexer {
  pos = 0;
  constructor(private b: Uint8Array) {}

  skipWhite() {
    const b = this.b;
    while (this.pos < b.length) {
      const c = b[this.pos];
      if (isWhite(c)) this.pos++;
      else if (c === 37) {
        while (this.pos < b.length && b[this.pos] !== 10 && b[this.pos] !== 13) this.pos++;
      } else break;
    }
  }

  private readRegular(): string {
    const b = this.b;
    const start = this.pos;
    while (this.pos < b.length && !isWhite(b[this.pos]) && !isDelim(b[this.pos])) this.pos++;
    let s = "";
    for (let i = start; i < this.pos; i++) s += String.fromCharCode(b[i]);
    return s;
  }

  private readLiteralString(): PdfString {
    const b = this.b;
    this.pos++; // (
    const out: number[] = [];
    let depth = 1;
    while (this.pos < b.length) {
      const c = b[this.pos++];
      if (c === 92) {
        const e = b[this.pos++];
        if (e === 110) out.push(10);
        else if (e === 114) out.push(13);
        else if (e === 116) out.push(9);
        else if (e === 98) out.push(8);
        else if (e === 102) out.push(12);
        else if (e >= 48 && e <= 55) {
          let v = e - 48;
          for (let k = 0; k < 2 && b[this.pos] >= 48 && b[this.pos] <= 55; k++) v = v * 8 + (b[this.pos++] - 48);
          out.push(v & 0xff);
        } else if (e === 13) {
          if (b[this.pos] === 10) this.pos++;
        } else if (e === 10) {
          // line continuation
        } else out.push(e);
      } else if (c === 40) {
        depth++;
        out.push(c);
      } else if (c === 41) {
        if (--depth === 0) break;
        out.push(c);
      } else out.push(c);
    }
    return { bytes: out };
  }

  private readHexString(): PdfString {
    const b = this.b;
    this.pos++; // <
    let hex = "";
    while (this.pos < b.length && b[this.pos] !== 62) {
      const c = b[this.pos++];
      if (!isWhite(c)) hex += String.fromCharCode(c);
    }
    this.pos++; // >
    if (hex.length % 2) hex += "0";
    const out: number[] = [];
    for (let i = 0; i < hex.length; i += 2) out.push(parseInt(hex.slice(i, i + 2), 16) || 0);
    return { bytes: out };
  }

  /** Next operand, or { keyword } for an operator; null at end of data. */
  next(): Operand | { keyword: string } | undefined {
    this.skipWhite();
    const b = this.b;
    if (this.pos >= b.length) return undefined;
    const c = b[this.pos];
    if (c === 40) return this.readLiteralString();
    if (c === 60) {
      if (b[this.pos + 1] === 60) {
        this.pos += 2;
        while (this.pos < b.length) {
          this.skipWhite();
          if (b[this.pos] === 62 && b[this.pos + 1] === 62) {
            this.pos += 2;
            break;
          }
          const before = this.pos;
          this.next();
          if (this.pos === before) this.pos++;
        }
        return { dict: true };
      }
      return this.readHexString();
    }
    if (c === 91) {
      this.pos++;
      const arr: Operand[] = [];
      while (this.pos < b.length) {
        this.skipWhite();
        if (b[this.pos] === 93) {
          this.pos++;
          break;
        }
        const before = this.pos;
        const t = this.next();
        if (t === undefined) break;
        if (t !== null && typeof t === "object" && "keyword" in t) {
          if (this.pos === before) this.pos++;
          continue;
        }
        arr.push(t as Operand);
      }
      return arr;
    }
    if (c === 47) {
      this.pos++;
      return { name: this.readRegular() };
    }
    if (c === 41 || c === 62 || c === 93 || c === 123 || c === 125) {
      this.pos++;
      return this.next();
    }
    const word = this.readRegular();
    if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(word)) return parseFloat(word);
    if (word === "true") return true;
    if (word === "false") return false;
    if (word === "null") return null;
    return { keyword: word };
  }

  /** Skip inline image data after an ID operator. */
  skipInlineImage() {
    const b = this.b;
    this.pos++; // single whitespace after ID
    while (this.pos < b.length) {
      if (
        b[this.pos] === 69 && b[this.pos + 1] === 73 &&
        isWhite(b[this.pos - 1]) &&
        (this.pos + 2 >= b.length || isWhite(b[this.pos + 2]) || isDelim(b[this.pos + 2]))
      ) {
        this.pos += 2;
        return;
      }
      this.pos++;
    }
  }
}

function* parseOps(bytes: Uint8Array): Generator<Op> {
  const lx = new Lexer(bytes);
  let args: Operand[] = [];
  let start = -1;
  while (true) {
    lx.skipWhite();
    const tokenStart = lx.pos;
    const t = lx.next();
    if (t === undefined) return;
    if (start < 0) start = tokenStart;
    if (t !== null && typeof t === "object" && "keyword" in t) {
      if (t.keyword === "ID") {
        lx.skipInlineImage();
        args = [];
        start = -1;
        continue;
      }
      yield { op: t.keyword, args, start, end: lx.pos };
      args = [];
      start = -1;
    } else {
      args.push(t as Operand);
    }
  }
}

// ---------------------------------------------------------------------------
// Font metrics (from the PDF's font dictionaries)

interface FontMetrics {
  twoByte: boolean;
  width(code: number): number; // advance in text space units at font size 1
}

let winAnsiNames: Map<number, string> | null = null;
function encodingNames(which: "WinAnsi" | "Symbol" | "ZapfDingbats"): Map<number, string> {
  if (which === "WinAnsi" && winAnsiNames) return winAnsiNames;
  const enc = Encodings[which];
  const map = new Map<number, string>();
  for (const cp of enc.supportedCodePoints) {
    const { code, name } = enc.encodeUnicodeCodePoint(cp);
    if (!map.has(code)) map.set(code, name);
  }
  if (which === "WinAnsi") winAnsiNames = map;
  return map;
}

function standardFontName(baseFont: string): IFontNames {
  const n = baseFont.replace(/^[A-Z]{6}\+/, "");
  const bold = /bold|black|heavy/i.test(n);
  const italic = /italic|oblique/i.test(n);
  if (/symbol/i.test(n)) return "Symbol";
  if (/dingbat/i.test(n)) return "ZapfDingbats";
  if (/courier|mono/i.test(n)) return (["Courier", "Courier-Bold", "Courier-Oblique", "Courier-BoldOblique"] as const)[(bold ? 1 : 0) + (italic ? 2 : 0)];
  if (/times|roman|serif/i.test(n) && !/sans/i.test(n)) {
    return (["Times-Roman", "Times-Bold", "Times-Italic", "Times-BoldItalic"] as const)[(bold ? 1 : 0) + (italic ? 2 : 0)];
  }
  return (["Helvetica", "Helvetica-Bold", "Helvetica-Oblique", "Helvetica-BoldOblique"] as const)[(bold ? 1 : 0) + (italic ? 2 : 0)];
}

function numberAt(arr: PDFArray | undefined, i: number): number | undefined {
  const v = arr?.get(i);
  return v instanceof PDFNumber ? v.asNumber() : undefined;
}

function loadFontMetrics(doc: PDFDocument, dict: PDFDict): FontMetrics | null {
  const ctx = doc.context;
  const subtype = lk(dict, "Subtype", PDFName)?.decodeText();

  if (subtype === "Type0") {
    const enc = lk(dict, "Encoding", PDFName)?.decodeText();
    if (enc !== "Identity-H") return null; // other CMaps: code lengths unknown
    const desc = at(lk(dict, "DescendantFonts", PDFArray), 0, PDFDict);
    const dw = lk(desc, "DW", PDFNumber)?.asNumber() ?? 1000;
    const widths = new Map<number, number>();
    const w = lk(desc, "W", PDFArray);
    if (w) {
      let i = 0;
      while (i < w.size()) {
        const first = ctx.lookup(w.get(i));
        const second = ctx.lookup(w.get(i + 1));
        if (!(first instanceof PDFNumber)) break;
        if (second instanceof PDFArray) {
          for (let k = 0; k < second.size(); k++) {
            const v = ctx.lookup(second.get(k));
            if (v instanceof PDFNumber) widths.set(first.asNumber() + k, v.asNumber());
          }
          i += 2;
        } else if (second instanceof PDFNumber) {
          const width = ctx.lookup(w.get(i + 2));
          if (width instanceof PDFNumber) {
            for (let cid = first.asNumber(); cid <= second.asNumber(); cid++) widths.set(cid, width.asNumber());
          }
          i += 3;
        } else break;
      }
    }
    return { twoByte: true, width: (code) => (widths.get(code) ?? dw) / 1000 };
  }

  const firstChar = lk(dict, "FirstChar", PDFNumber)?.asNumber() ?? 0;
  const widthsArr = lk(dict, "Widths", PDFArray);

  if (subtype === "Type3") {
    const fm = lk(dict, "FontMatrix", PDFArray);
    const scale = numberAt(fm, 0) ?? 0.001;
    if (!widthsArr) return null;
    return {
      twoByte: false,
      width: (code) => {
        const v = ctx.lookup(widthsArr.get(code - firstChar));
        return v instanceof PDFNumber ? v.asNumber() * scale : 0;
      },
    };
  }

  if (widthsArr && widthsArr.size() > 0) {
    const missing =
      lk(lk(dict, "FontDescriptor", PDFDict), "MissingWidth", PDFNumber)?.asNumber() ?? 0;
    return {
      twoByte: false,
      width: (code) => {
        const idx = code - firstChar;
        if (idx < 0 || idx >= widthsArr.size()) return missing / 1000;
        const v = ctx.lookup(widthsArr.get(idx));
        return v instanceof PDFNumber ? v.asNumber() / 1000 : missing / 1000;
      },
    };
  }

  // Standard 14 font without a Widths array: use the built-in metrics
  const baseFont = lk(dict, "BaseFont", PDFName)?.decodeText() ?? "Helvetica";
  const stdName = standardFontName(baseFont);
  let std: StandardFont;
  try {
    std = StandardFont.load(stdName);
  } catch {
    return null;
  }
  let names: Map<number, string>;
  if (stdName === "Symbol" || stdName === "ZapfDingbats") {
    names = new Map(encodingNames(stdName));
  } else {
    names = new Map(encodingNames("WinAnsi"));
    const encName = lk(dict, "Encoding", PDFName)?.decodeText();
    const encDict = lk(dict, "Encoding", PDFDict);
    const base = encName ?? lk(encDict, "BaseEncoding", PDFName)?.decodeText();
    if (!base || base === "StandardEncoding") {
      names.set(39, "quoteright");
      names.set(96, "quoteleft");
    }
  }
  const diffs = lk(lk(dict, "Encoding", PDFDict), "Differences", PDFArray);
  if (diffs) {
    let code = 0;
    for (let i = 0; i < diffs.size(); i++) {
      const v = ctx.lookup(diffs.get(i));
      if (v instanceof PDFNumber) code = v.asNumber();
      else if (v instanceof PDFName) names.set(code++, v.decodeText());
    }
  }
  return {
    twoByte: false,
    width: (code) => {
      const name = names.get(code);
      return ((name && std.getWidthOfGlyph(name)) || 0) / 1000;
    },
  };
}

// ---------------------------------------------------------------------------
// Interpreter

interface GState {
  ctm: number[];
  font: FontMetrics | null;
  fontSize: number;
  Tc: number;
  Tw: number;
  Th: number;
  TL: number;
  Ts: number;
  Tr: number;
}

function fmt(n: number) {
  const s = n.toFixed(3).replace(/\.?0+$/, "");
  return s === "-0" ? "0" : s;
}

function hexOf(bytes: number[]) {
  return "<" + bytes.map((b) => b.toString(16).padStart(2, "0")).join("") + ">";
}

function streamBytes(stream: PDFObject | undefined): Uint8Array | null {
  if (stream instanceof PDFRawStream) return decodePDFRawStream(stream).decode();
  const s = stream as unknown as { getUnencodedContents?: () => Uint8Array };
  if (stream instanceof PDFStream && typeof s.getUnencodedContents === "function") return s.getUnencodedContents();
  return null;
}

class TextRemover {
  private fontCache = new Map<PDFDict, FontMetrics | null>();
  readonly removed: number[]; // visible glyphs removed per rectangle

  constructor(private doc: PDFDocument, private rects: PdfRect[]) {
    this.removed = rects.map(() => 0);
  }

  private font(resources: PDFDict | undefined, name: string): FontMetrics | null {
    const dict = lk(lk(resources, "Font", PDFDict), name, PDFDict);
    if (!dict) return null;
    if (!this.fontCache.has(dict)) {
      let m: FontMetrics | null = null;
      try {
        m = loadFontMetrics(this.doc, dict);
      } catch {
        m = null;
      }
      this.fontCache.set(dict, m);
    }
    return this.fontCache.get(dict)!;
  }

  private hit(x: number, y: number) {
    return this.rects.findIndex((r) => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1);
  }

  /**
   * Process one content stream. Returns rewritten bytes and/or a replacement
   * resources dictionary (when nested form XObjects changed), or nulls if untouched.
   */
  process(bytes: Uint8Array, resources: PDFDict | undefined, ctm: number[], depth: number): { bytes: Uint8Array | null; resources: PDFDict | null } {
    const edits: { start: number; end: number; text: string }[] = [];
    const xobjectReplacements = new Map<string, PDFRef>();
    const stack: GState[] = [];
    let gs: GState = { ctm, font: null, fontSize: 0, Tc: 0, Tw: 0, Th: 1, TL: 0, Ts: 0, Tr: 0 };
    let tm = [1, 0, 0, 1, 0, 0];
    let tlm = [1, 0, 0, 1, 0, 0];
    const num = (v: Operand | undefined) => (typeof v === "number" ? v : 0);
    const moveLine = (tx: number, ty: number) => {
      tlm = multiplyTransform(tlm, [1, 0, 0, 1, tx, ty]);
      tm = tlm.slice();
    };

    const show = (op: Op, elements: Operand[], prefix: string) => {
      const font = gs.font;
      const fs = gs.fontSize;
      if (!font || !fs || !gs.Th) return;
      const parts: string[] = [];
      let kept: number[] = [];
      let offset = 0;
      let changed = false;
      const flush = () => {
        if (kept.length) {
          if (offset) parts.push(fmt(offset));
          offset = 0;
          parts.push(hexOf(kept));
          kept = [];
        }
      };
      for (const el of elements) {
        if (typeof el === "number") {
          tm = multiplyTransform(tm, [1, 0, 0, 1, (-el / 1000) * fs * gs.Th, 0]);
          flush();
          offset += el;
          continue;
        }
        if (!el || typeof el !== "object" || !("bytes" in el)) continue;
        const b = el.bytes;
        const step = font.twoByte ? 2 : 1;
        for (let i = 0; i + step <= b.length; i += step) {
          const code = font.twoByte ? (b[i] << 8) | b[i + 1] : b[i];
          const w0 = font.width(code);
          const tx = (w0 * fs + gs.Tc + (!font.twoByte && code === 32 ? gs.Tw : 0)) * gs.Th;
          const trm = multiplyTransform(multiplyTransform(gs.ctm, tm), [fs * gs.Th, 0, 0, fs, 0, gs.Ts]);
          const cx = w0 / 2, cy = 0.3;
          const px = trm[0] * cx + trm[2] * cy + trm[4];
          const py = trm[1] * cx + trm[3] * cy + trm[5];
          const hit = this.hit(px, py);
          if (hit >= 0) {
            changed = true;
            if (gs.Tr % 4 !== 3) this.removed[hit]++;
            flush();
            offset -= (tx / (fs * gs.Th)) * 1000;
          } else {
            if (offset) {
              parts.push(fmt(offset));
              offset = 0;
            }
            for (let k = 0; k < step; k++) kept.push(b[i + k]);
          }
          tm = multiplyTransform(tm, [1, 0, 0, 1, tx, 0]);
        }
      }
      flush();
      if (offset) parts.push(fmt(offset));
      if (changed) edits.push({ start: op.start, end: op.end, text: `${prefix}[${parts.join(" ")}] TJ` });
    };

    for (const op of parseOps(bytes)) {
      const a = op.args;
      switch (op.op) {
        case "q":
          stack.push({ ...gs, ctm: gs.ctm.slice() });
          break;
        case "Q":
          if (stack.length) gs = stack.pop()!;
          break;
        case "cm":
          gs.ctm = multiplyTransform(gs.ctm, a.slice(0, 6).map(num));
          break;
        case "BT":
          tm = [1, 0, 0, 1, 0, 0];
          tlm = [1, 0, 0, 1, 0, 0];
          break;
        case "Tf": {
          const name = a[0] && typeof a[0] === "object" && "name" in a[0] ? (a[0] as PdfNameToken).name : "";
          gs.font = this.font(resources, name);
          gs.fontSize = num(a[1]);
          break;
        }
        case "Tc": gs.Tc = num(a[0]); break;
        case "Tw": gs.Tw = num(a[0]); break;
        case "Tz": gs.Th = num(a[0]) / 100; break;
        case "TL": gs.TL = num(a[0]); break;
        case "Ts": gs.Ts = num(a[0]); break;
        case "Tr": gs.Tr = num(a[0]); break;
        case "Td": moveLine(num(a[0]), num(a[1])); break;
        case "TD": gs.TL = -num(a[1]); moveLine(num(a[0]), num(a[1])); break;
        case "Tm":
          tlm = a.slice(0, 6).map(num);
          tm = tlm.slice();
          break;
        case "T*": moveLine(0, -gs.TL); break;
        case "Tj": show(op, [a[0]], ""); break;
        case "TJ": show(op, Array.isArray(a[0]) ? a[0] : [], ""); break;
        case "'":
          moveLine(0, -gs.TL);
          show(op, [a[0]], "T* ");
          break;
        case '"':
          gs.Tw = num(a[0]);
          gs.Tc = num(a[1]);
          moveLine(0, -gs.TL);
          show(op, [a[2]], `${fmt(gs.Tw)} Tw ${fmt(gs.Tc)} Tc T* `);
          break;
        case "Do": {
          if (depth >= 6) break;
          const name = a[0] && typeof a[0] === "object" && "name" in a[0] ? (a[0] as PdfNameToken).name : "";
          const xobjects = lk(resources, "XObject", PDFDict);
          const ref = xobjects?.get(PDFName.of(name));
          const stream = ref ? this.doc.context.lookup(ref) : undefined;
          if (!(stream instanceof PDFStream)) break;
          if (lk(stream.dict, "Subtype", PDFName)?.decodeText() !== "Form") break;
          const content = streamBytes(stream);
          if (!content) break;
          const matrix = lk(stream.dict, "Matrix", PDFArray);
          const m = matrix ? [0, 1, 2, 3, 4, 5].map((i) => numberAt(matrix, i) ?? (i === 0 || i === 3 ? 1 : 0)) : [1, 0, 0, 1, 0, 0];
          const formResources = lk(stream.dict, "Resources", PDFDict) ?? resources;
          const result = this.process(content, formResources, multiplyTransform(gs.ctm, m), depth + 1);
          if (result.bytes || result.resources) {
            // Write a copy so other pages using the same XObject are untouched
            const dict = stream.dict.clone(this.doc.context);
            dict.delete(PDFName.of("Filter"));
            dict.delete(PDFName.of("DecodeParms"));
            dict.delete(PDFName.of("Length"));
            if (result.resources) dict.set(PDFName.of("Resources"), result.resources);
            const entries: Record<string, PDFObject> = {};
            for (const [k, v] of dict.entries()) entries[k.decodeText()] = v;
            const copy = this.doc.context.flateStream(result.bytes ?? content, entries);
            xobjectReplacements.set(name, this.doc.context.register(copy));
          }
          break;
        }
      }
    }

    let newResources: PDFDict | null = null;
    if (xobjectReplacements.size && resources) {
      newResources = resources.clone(this.doc.context);
      const xobjects = lk(resources, "XObject", PDFDict)!.clone(this.doc.context);
      for (const [name, ref] of xobjectReplacements) xobjects.set(PDFName.of(name), ref);
      newResources.set(PDFName.of("XObject"), xobjects);
    }

    if (!edits.length) return { bytes: null, resources: newResources };
    const enc = new TextEncoder();
    const chunks: Uint8Array[] = [];
    let pos = 0;
    for (const e of edits) {
      chunks.push(bytes.subarray(pos, e.start));
      chunks.push(enc.encode(e.text));
      pos = e.end;
    }
    chunks.push(bytes.subarray(pos));
    const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let o = 0;
    for (const c of chunks) {
      out.set(c, o);
      o += c.length;
    }
    return { bytes: out, resources: newResources };
  }
}

/**
 * Remove the glyphs whose centers fall inside `rects` from the page's content.
 * Returns, per rectangle, how many visible glyphs were removed (0 means the text
 * couldn't be found in the content, e.g. it's part of an image).
 */
export function removeTextInRects(doc: PDFDocument, page: PDFPage, rects: PdfRect[]): number[] {
  if (!rects.length) return [];
  const remover = new TextRemover(doc, rects);
  try {
    const node = page.node;
    const contents = node.get(PDFName.of("Contents"));
    const resolved = contents ? doc.context.lookup(contents) : undefined;
    const streams: PDFObject[] = [];
    if (resolved instanceof PDFArray) {
      for (let i = 0; i < resolved.size(); i++) {
        const s = doc.context.lookup(resolved.get(i));
        if (s) streams.push(s);
      }
    } else if (resolved) {
      streams.push(resolved);
    }
    const parts = streams.map(streamBytes);
    if (!parts.length || parts.some((p) => !p)) return remover.removed;

    // Content may be split across streams at any token boundary, so interpret them joined
    const joined = new Uint8Array(parts.reduce((n, p) => n + p!.length + 1, 0));
    let o = 0;
    for (const p of parts) {
      joined.set(p!, o);
      o += p!.length;
      joined[o++] = 10;
    }

    const resources = node.Resources();
    const result = remover.process(joined, resources, [1, 0, 0, 1, 0, 0], 0);
    if (result.bytes) {
      const ref = doc.context.register(doc.context.flateStream(result.bytes));
      node.set(PDFName.of("Contents"), doc.context.obj([ref]));
    }
    if (result.resources) node.set(PDFName.of("Resources"), result.resources);
  } catch (e) {
    console.warn("Could not remove original text; it will be covered instead:", e);
    return rects.map(() => 0);
  }
  return remover.removed;
}
