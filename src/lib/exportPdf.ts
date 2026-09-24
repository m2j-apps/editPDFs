// Builds the downloaded PDF: applies text edits, added objects, page rotation,
// deletion and reordering to the original document.

import {
  PDFDocument,
  PDFPage,
  PDFFont,
  PDFDict,
  PDFName,
  PDFArray,
  PDFRef,
  PDFString,
  PDFHexString,
  PDFContentStream,
  PDFOperator,
  PDFOperatorNames,
  StandardFonts,
  LineCapStyle,
  rgb,
  degrees,
  pushGraphicsState,
  popGraphicsState,
  concatTransformationMatrix,
  beginText,
  endText,
  setFontAndSize,
  setTextMatrix,
  setFillingRgbColor,
} from "pdf-lib";
import type { EditorObject } from "@/app/editor/page";
import { removeTextInRects, lk, at, type PdfRect } from "./removeText";
import {
  LINE_HEIGHT,
  PdfTextEdit,
  FontKind,
  baselineOffset,
  canUseOriginalFont,
  splitByFont,
  type TextSegment,
  fontKindFromName,
  getPageView,
  invertTransform,
  isEditUnchanged,
  multiplyTransform,
  cleanFontName,
  type FontInfo,
  type PageView,
} from "./pdfText";

export interface ExportInput {
  bytes: Uint8Array;
  objects: EditorObject[];
  textEdits: PdfTextEdit[];
  pageOrder: number[];
  deletedPages: Set<number>;
  pageRotations: Map<number, number>;
}

function hexToRgb(hex: string | undefined, fallback = "#000000") {
  const h = /^#[0-9a-f]{6}$/i.test(hex || "") ? hex! : fallback;
  return rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
}

/** Same math as pdf.js PageViewport at scale 1, computed from the pdf-lib page. */
function computePageView(page: PDFPage): PageView {
  const crop = page.getCropBox();
  const media = page.getMediaBox();
  const x0 = Math.max(crop.x, media.x), y0 = Math.max(crop.y, media.y);
  const x1 = Math.min(crop.x + crop.width, media.x + media.width);
  const y1 = Math.min(crop.y + crop.height, media.y + media.height);
  const view = x1 > x0 && y1 > y0 ? [x0, y0, x1, y1] : [media.x, media.y, media.x + media.width, media.y + media.height];
  const rotation = ((page.getRotation().angle % 360) + 360) % 360;
  const cx = (view[2] + view[0]) / 2, cy = (view[3] + view[1]) / 2;
  let a: number, b: number, c: number, d: number;
  switch (rotation) {
    case 180: a = -1; b = 0; c = 0; d = 1; break;
    case 90: a = 0; b = 1; c = 1; d = 0; break;
    case 270: a = 0; b = -1; c = -1; d = 0; break;
    default: a = 1; b = 0; c = 0; d = -1;
  }
  let offX: number, offY: number, width: number, height: number;
  if (a === 0) {
    offX = Math.abs(cy - view[1]); offY = Math.abs(cx - view[0]);
    width = Math.abs(view[3] - view[1]); height = Math.abs(view[2] - view[0]);
  } else {
    offX = Math.abs(cx - view[0]); offY = Math.abs(cy - view[1]);
    width = Math.abs(view[2] - view[0]); height = Math.abs(view[3] - view[1]);
  }
  return {
    transform: [a, b, c, d, offX - a * cx - c * cy, offY - b * cx - d * cy],
    width,
    height,
  };
}

// ---------------------------------------------------------------------------
// Fonts

class StandardFontSet {
  private cache = new Map<string, Promise<PDFFont>>();
  constructor(private doc: PDFDocument) {}

  get(name: StandardFonts) {
    let p = this.cache.get(name);
    if (!p) {
      p = this.doc.embedFont(name);
      this.cache.set(name, p);
    }
    return p;
  }

  forStyle(kind: FontKind, bold: boolean, italic: boolean) {
    const table: Record<FontKind, StandardFonts[]> = {
      sans: [StandardFonts.Helvetica, StandardFonts.HelveticaBold, StandardFonts.HelveticaOblique, StandardFonts.HelveticaBoldOblique],
      serif: [StandardFonts.TimesRoman, StandardFonts.TimesRomanBold, StandardFonts.TimesRomanItalic, StandardFonts.TimesRomanBoldItalic],
      mono: [StandardFonts.Courier, StandardFonts.CourierBold, StandardFonts.CourierOblique, StandardFonts.CourierBoldOblique],
    };
    return this.get(table[kind][(bold ? 1 : 0) + (italic ? 2 : 0)]);
  }
}

// Standard-font metrics (em fractions), so exported text sits where it did on screen
const STANDARD_METRICS: Record<FontKind, { ascent: number; descent: number }> = {
  sans: { ascent: 0.905, descent: 0.212 },
  serif: { ascent: 0.891, descent: 0.216 },
  mono: { ascent: 0.833, descent: 0.3 },
};

/** Split text into runs that each font can encode; symbols fall back to Symbol / ZapfDingbats. */
async function encodeRuns(text: string, primary: PDFFont, fonts: StandardFontSet) {
  const sets = new Map<PDFFont, Set<number>>();
  const charset = (f: PDFFont) => {
    let s = sets.get(f);
    if (!s) {
      s = new Set(f.getCharacterSet());
      sets.set(f, s);
    }
    return s;
  };
  const fallbacks = [await fonts.get(StandardFonts.ZapfDingbats), await fonts.get(StandardFonts.Symbol)];
  const runs: { font: PDFFont; text: string }[] = [];
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    let font = primary;
    let out = ch;
    if (!charset(primary).has(cp)) {
      const alt = fallbacks.find((f) => charset(f).has(cp));
      if (alt) font = alt;
      else out = "?";
    }
    const last = runs[runs.length - 1];
    if (last && last.font === font) last.text += out;
    else runs.push({ font, text: out });
  }
  return runs;
}

interface OriginalFontRef {
  key: PDFName;
  twoByte: boolean;
}

function fontDictNames(dict: PDFDict): string[] {
  const names: string[] = [];
  const add = (d: PDFDict | undefined) => {
    if (!d) return;
    const base = lk(d, "BaseFont", PDFName);
    if (base) names.push(base.decodeText());
    const desc = lk(d, "FontDescriptor", PDFDict);
    const fname = lk(desc, "FontName", PDFName);
    if (fname) names.push(fname.decodeText());
  };
  add(dict);
  const descendants = lk(dict, "DescendantFonts", PDFArray);
  add(at(descendants, 0, PDFDict));
  const norm = (n: string) => n.replace(/-Identity-[HV]$/, "").replace(/[^A-Za-z0-9+]/g, "").toLowerCase();
  return names.map(norm);
}

/** Find the PDF font dictionary pdf.js loaded as `font`, and make it usable on `page`. */
function findOriginalFont(doc: PDFDocument, page: PDFPage, font: FontInfo, cache: Map<string, OriginalFontRef | null>): OriginalFontRef | null {
  const cacheKey = `${font.id}@${page.ref.toString()}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;
  const target = font.name.replace(/-Identity-[HV]$/, "").replace(/[^A-Za-z0-9+]/g, "").toLowerCase();
  let result: OriginalFontRef | null = null;

  const check = (dict: PDFDict) => {
    if (lk(dict, "Type", PDFName)?.decodeText() !== "Font") return null;
    if (!fontDictNames(dict).includes(target)) return null;
    const subtype = lk(dict, "Subtype", PDFName)?.decodeText();
    if (subtype === "Type3") return null;
    if (subtype === "Type0") {
      const enc = lk(dict, "Encoding", PDFName)?.decodeText();
      if (enc !== "Identity-H") return null; // other CMaps have variable-length codes
      return { twoByte: true };
    }
    return { twoByte: false };
  };

  // 1. The page's own font resources
  const resources = page.node.Resources();
  const pageFonts = lk(resources, "Font", PDFDict);
  if (pageFonts) {
    for (const [key, value] of pageFonts.entries()) {
      const resolved = doc.context.lookup(value);
      const dict = resolved instanceof PDFDict ? resolved : undefined;
      const hit = dict && check(dict);
      if (hit) {
        result = { key, twoByte: hit.twoByte };
        break;
      }
    }
  }

  // 2. Anywhere in the document (e.g. fonts used inside form XObjects)
  if (!result) {
    for (const [ref, obj] of doc.context.enumerateIndirectObjects()) {
      if (!(obj instanceof PDFDict)) continue;
      const hit = check(obj);
      if (hit) {
        result = { key: page.node.newFontDictionary("EdF", ref as PDFRef), twoByte: hit.twoByte };
        break;
      }
    }
  }

  cache.set(cacheKey, result);
  return result;
}

// ---------------------------------------------------------------------------
// Text drawing

interface TextWriter {
  ascent: number;
  descent: number;
  width(line: string): number;
  draw(line: string, x: number, baselineY: number): void;
}

async function standardWriter(
  page: PDFPage,
  fonts: StandardFontSet,
  block: { kind: FontKind; bold: boolean; italic: boolean; fontSize: number },
  color: ReturnType<typeof rgb>,
  lines: string[]
): Promise<TextWriter> {
  const primary = await fonts.forStyle(block.kind, block.bold, block.italic);
  const size = block.fontSize;
  const runs = new Map<string, { font: PDFFont; text: string }[]>();
  for (const line of lines) runs.set(line, await encodeRuns(line, primary, fonts));
  return {
    ...STANDARD_METRICS[block.kind],
    width(line) {
      return (runs.get(line) ?? []).reduce((w, run) => w + run.font.widthOfTextAtSize(run.text, size), 0);
    },
    draw(line, x, y) {
      let cx = x;
      for (const run of runs.get(line) ?? []) {
        page.drawText(run.text, { x: cx, y, size, font: run.font, color });
        cx += run.font.widthOfTextAtSize(run.text, size);
      }
    },
  };
}

function originalWriter(
  page: PDFPage,
  ref: OriginalFontRef,
  font: FontInfo,
  edit: PdfTextEdit,
  size: number,
  color: ReturnType<typeof rgb>
): TextWriter {
  const hScale = edit.hScale || 1;
  const spaceWidth = font.glyphs.get(" ")?.width || 250;
  const hex = (code: number) => code.toString(16).padStart(ref.twoByte ? 4 : 2, "0");
  return {
    ascent: edit.ascent ?? 0.8,
    descent: edit.descent ?? 0.2,
    width(line: string) {
      let w = 0;
      for (const ch of line) w += font.glyphs.get(ch)?.width ?? spaceWidth;
      return (w / 1000) * size * hScale;
    },
    draw(line: string, x: number, y: number) {
      // TJ array: glyph codes, with missing spaces emitted as positioning offsets
      const parts: (PDFHexString | number)[] = [];
      let codes = "";
      for (const ch of line) {
        const g = font.glyphs.get(ch);
        if (g) {
          codes += hex(g.code);
        } else {
          if (codes) parts.push(PDFHexString.of(codes));
          codes = "";
          parts.push(-spaceWidth);
        }
      }
      if (codes) parts.push(PDFHexString.of(codes));
      const arr = page.doc.context.obj(parts);
      page.pushOperators(
        pushGraphicsState(),
        beginText(),
        setFontAndSize(ref.key, size),
        setFillingRgbColor(color.red, color.green, color.blue),
        setTextMatrix(hScale, 0, 0, 1, x, y),
        PDFOperator.of(PDFOperatorNames.ShowTextAdjusted, [arr]),
        endText(),
        popGraphicsState()
      );
    },
  };
}

interface TextBlock {
  text: string;
  x: number;
  y: number; // top of the text box (page units, y down)
  fontSize: number;
  color: string | undefined;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  highlightColor?: string;
  kind: FontKind;
  edit?: PdfTextEdit; // set for edits of existing PDF text
}

async function drawTextBlock(ctx: PageContext, block: TextBlock) {
  const { page, fonts, H } = ctx;
  const color = hexToRgb(block.color);
  const lines = block.text.split(/\r?\n/);

  let writer: TextWriter | null = null;
  if (block.edit) {
    const font = canUseOriginalFont(block.edit);
    const ref = font && findOriginalFont(ctx.doc, page, font, ctx.fontRefs);
    if (font && ref) {
      // PDF's own font where it has the glyphs, closest standard font for the rest
      const original = originalWriter(page, ref, font, block.edit, block.fontSize, color);
      const segmented = lines.map((line) => splitByFont(font, line));
      const substituteText = segmented.flat().filter((seg) => !seg.original).map((seg) => seg.text);
      const substitute = await standardWriter(page, fonts, block, color, substituteText);
      const segWidth = (seg: TextSegment) => (seg.original ? original : substitute).width(seg.text);
      writer = {
        ascent: original.ascent,
        descent: original.descent,
        width: (line) => splitByFont(font, line).reduce((w, seg) => w + segWidth(seg), 0),
        draw: (line, x, y) => {
          let cx = x;
          for (const seg of splitByFont(font, line)) {
            (seg.original ? original : substitute).draw(seg.text, cx, y);
            cx += segWidth(seg);
          }
        },
      };
    }
  }
  if (!writer) writer = await standardWriter(page, fonts, block, color, lines);

  const lineStep = LINE_HEIGHT * block.fontSize;
  const firstBaseline = block.y + baselineOffset(block.fontSize, writer.ascent, writer.descent);

  lines.forEach((line, i) => {
    const width = writer!.width(line);
    const top = block.y + i * lineStep;
    const baseline = firstBaseline + i * lineStep;
    if (block.highlightColor && width > 0) {
      page.drawRectangle({ x: block.x - 2, y: H - (top + lineStep + 1), width: width + 4, height: lineStep + 2, color: hexToRgb(block.highlightColor, "#ffff00") });
    }
    if (line) writer!.draw(line, block.x, H - baseline);
    const thickness = Math.max(0.5, block.fontSize * 0.06);
    if (block.underline && width > 0) {
      const y = H - (baseline + block.fontSize * 0.12);
      page.drawLine({ start: { x: block.x, y }, end: { x: block.x + width, y }, thickness, color });
    }
    if (block.strikethrough && width > 0) {
      const y = H - (baseline - block.fontSize * 0.3);
      page.drawLine({ start: { x: block.x, y }, end: { x: block.x + width, y }, thickness, color });
    }
  });
}

// ---------------------------------------------------------------------------
// Pages

interface PageContext {
  doc: PDFDocument;
  page: PDFPage;
  fonts: StandardFontSet;
  fontRefs: Map<string, OriginalFontRef | null>;
  H: number; // page height in page units; drawing uses y-up coordinates of that height
  toPdf: (x: number, y: number) => { x: number; y: number }; // page units (y down) -> PDF user space
}

/**
 * Isolate the existing page content in q/Q (pdf-lib doesn't), then map a y-up
 * coordinate system that matches what the editor displays onto PDF user space,
 * taking crop box offsets and /Rotate into account.
 */
function preparePage(doc: PDFDocument, page: PDFPage, view: PageView, shared: Omit<PageContext, "page" | "H" | "toPdf">): PageContext {
  page.node.normalize();
  const start = doc.context.register(PDFContentStream.of(doc.context.obj({}), [pushGraphicsState()]));
  const end = doc.context.register(PDFContentStream.of(doc.context.obj({}), [popGraphicsState()]));
  page.node.wrapContentStreams(start, end);

  const H = view.height;
  // page units (y down) = view.transform * pdf ; y-up units = flip * page units
  const toYUp = multiplyTransform([1, 0, 0, -1, 0, H], view.transform);
  const m = invertTransform(toYUp);
  page.pushOperators(pushGraphicsState(), concatTransformationMatrix(m[0], m[1], m[2], m[3], m[4], m[5]));

  const inv = invertTransform(view.transform);
  const toPdf = (x: number, y: number) => ({ x: inv[0] * x + inv[2] * y + inv[4], y: inv[1] * x + inv[3] * y + inv[5] });
  return { ...shared, page, H, toPdf };
}

async function embedImage(doc: PDFDocument, src: string) {
  let dataUrl = src;
  if (!/^data:image\/(png|jpe?g)/i.test(src)) {
    // Convert other formats (webp, gif, svg, blob URLs...) to PNG
    dataUrl = await new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d")!.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = src;
    });
  }
  const bytes = await (await fetch(dataUrl)).arrayBuffer();
  return /^data:image\/png/i.test(dataUrl) ? doc.embedPng(bytes) : doc.embedJpg(bytes);
}

async function drawObject(ctx: PageContext, obj: EditorObject) {
  const { page, H, doc } = ctx;
  const color = hexToRgb(obj.color);

  switch (obj.type) {
    case "text": {
      if (!obj.content) return;
      await drawTextBlock(ctx, {
        text: obj.content,
        x: obj.x,
        y: obj.y,
        fontSize: obj.fontSize || 16,
        color: obj.color,
        bold: !!obj.formatting?.bold,
        italic: !!obj.formatting?.italic,
        underline: !!obj.formatting?.underline,
        strikethrough: !!obj.formatting?.strikethrough,
        highlightColor: obj.formatting?.highlightColor,
        kind: fontKindFromName(cleanFontName(obj.fontFamily), obj.fontFamily),
      });
      return;
    }
    case "whiteout":
      page.drawRectangle({ x: obj.x, y: H - obj.y - obj.height, width: obj.width, height: obj.height, color: rgb(1, 1, 1) });
      return;
    case "highlight": {
      const c = hexToRgb(obj.color, "#ffff00");
      const opacity = obj.opacity || 0.4;
      if (obj.points && obj.points.length > 1) {
        const path = obj.points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
        page.drawSvgPath(path, { x: 0, y: H, borderColor: c, borderWidth: 16, borderOpacity: opacity, borderLineCap: LineCapStyle.Round });
      } else {
        page.drawRectangle({ x: obj.x, y: H - obj.y - obj.height, width: obj.width, height: obj.height, color: c, opacity });
      }
      return;
    }
    case "strikeout":
    case "underline": {
      const h = obj.height || 2;
      page.drawRectangle({ x: obj.x, y: H - obj.y - h, width: obj.width, height: h, color: hexToRgb(obj.color, "#ff0000") });
      return;
    }
    case "image":
    case "signature": {
      if (!obj.src) return;
      try {
        const img = await embedImage(doc, obj.src);
        // Display uses object-fit: contain
        const s = Math.min(obj.width / img.width, obj.height / img.height);
        const w = img.width * s, h = img.height * s;
        page.drawImage(img, { x: obj.x + (obj.width - w) / 2, y: H - obj.y - (obj.height + h) / 2, width: w, height: h });
      } catch (e) {
        console.error("Error embedding image:", e);
      }
      return;
    }
    case "shape": {
      const strokeWidth = obj.strokeWidth || 2;
      const fill = obj.fill ? hexToRgb(obj.fillColor, "#ffffff") : undefined;
      if (obj.shapeType === "rectangle") {
        page.drawRectangle({ x: obj.x, y: H - obj.y - obj.height, width: obj.width, height: obj.height, borderColor: color, borderWidth: strokeWidth, color: fill });
      } else if (obj.shapeType === "circle") {
        page.drawEllipse({ x: obj.x + obj.width / 2, y: H - obj.y - obj.height / 2, xScale: obj.width / 2, yScale: obj.height / 2, borderColor: color, borderWidth: strokeWidth, color: fill });
      } else {
        const endX = obj.endX ?? obj.x + obj.width;
        const endY = obj.endY ?? obj.y;
        page.drawLine({ start: { x: obj.x, y: H - obj.y }, end: { x: endX, y: H - endY }, thickness: strokeWidth, color });
        if (obj.shapeType === "arrow") {
          const angle = Math.atan2(endY - obj.y, endX - obj.x);
          const len = 10, half = 3.5;
          const bx = endX - Math.cos(angle) * len, by = endY - Math.sin(angle) * len;
          const px = -Math.sin(angle) * half, py = Math.cos(angle) * half;
          page.drawSvgPath(`M${endX} ${endY} L${bx + px} ${by + py} L${bx - px} ${by - py} Z`, { x: 0, y: H, color });
        }
      }
      return;
    }
    case "drawing": {
      if (!obj.points || obj.points.length < 2) return;
      const path = obj.points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
      page.drawSvgPath(path, { x: 0, y: H, borderColor: hexToRgb(obj.color, "#ff0000"), borderWidth: obj.strokeWidth || 2, borderLineCap: LineCapStyle.Round });
      return;
    }
    case "stamp": {
      const c = hexToRgb(obj.color, "#ff0000");
      page.drawRectangle({ x: obj.x, y: H - obj.y - obj.height, width: obj.width, height: obj.height, borderColor: c, borderWidth: 2 });
      const font = await ctx.fonts.get(StandardFonts.HelveticaBold);
      const text = (obj.content || "STAMP").replace(/[^\x20-\x7e]/g, "?");
      const size = Math.min(obj.width, obj.height) * 0.4;
      const w = font.widthOfTextAtSize(text, size);
      page.drawText(text, { x: obj.x + (obj.width - w) / 2, y: H - obj.y - obj.height / 2 - size * 0.35, size, font, color: c });
      return;
    }
    case "link": {
      if (!obj.url) return;
      const corners = [
        ctx.toPdf(obj.x, obj.y),
        ctx.toPdf(obj.x + obj.width, obj.y + obj.height),
      ];
      const rect = [
        Math.min(corners[0].x, corners[1].x),
        Math.min(corners[0].y, corners[1].y),
        Math.max(corners[0].x, corners[1].x),
        Math.max(corners[0].y, corners[1].y),
      ];
      const annot = doc.context.register(
        doc.context.obj({
          Type: "Annot",
          Subtype: "Link",
          Rect: rect,
          Border: [0, 0, 0],
          A: { Type: "Action", S: "URI", URI: PDFString.of(obj.url) },
        })
      );
      page.node.addAnnot(annot);
      return;
    }
  }
}

function coverArea(edit: PdfTextEdit) {
  return edit.cover ?? {
    x: edit.originalX ?? edit.x,
    y: edit.originalY ?? edit.y,
    width: edit.width,
    height: edit.height,
  };
}

/** The edit's original-text area in PDF user space. */
function coverRectPdf(edit: PdfTextEdit, view: PageView): PdfRect {
  const c = coverArea(edit);
  const inv = invertTransform(view.transform);
  const pts = [
    [c.x, c.y],
    [c.x + c.width, c.y],
    [c.x, c.y + c.height],
    [c.x + c.width, c.y + c.height],
  ].map(([x, y]) => [inv[0] * x + inv[2] * y + inv[4], inv[1] * x + inv[3] * y + inv[5]]);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const pad = 0.5;
  return { x0: Math.min(...xs) - pad, y0: Math.min(...ys) - pad, x1: Math.max(...xs) + pad, y1: Math.max(...ys) + pad };
}

async function drawTextEdit(ctx: PageContext, edit: PdfTextEdit, originalRemoved: boolean) {
  const { page, H } = ctx;

  // The original text was deleted from the page content; if it couldn't be found there
  // (e.g. it's part of a scanned image), cover it with the page's own background color
  if (!originalRemoved) {
    const cover = coverArea(edit);
    const pad = 1;
    page.drawRectangle({
      x: cover.x - pad,
      y: H - (cover.y + cover.height + pad),
      width: cover.width + pad * 2,
      height: cover.height + pad * 2,
      color: hexToRgb(edit.bgColor, "#ffffff"),
    });
  }

  if (!edit.newText.trim()) return;
  await drawTextBlock(ctx, {
    text: edit.newText,
    x: edit.x,
    y: edit.y,
    fontSize: edit.fontSize,
    color: edit.formatting?.color,
    bold: !!edit.formatting?.bold,
    italic: !!edit.formatting?.italic,
    underline: !!edit.formatting?.underline,
    strikethrough: !!edit.formatting?.strikethrough,
    highlightColor: edit.formatting?.highlightColor,
    kind: fontKindFromName(edit.fontName || cleanFontName(edit.fontFamily), edit.fontFamily),
    edit,
  });
}

export async function buildEditedPdf(input: ExportInput): Promise<Uint8Array> {
  const doc = await PDFDocument.load(input.bytes);
  const pages = doc.getPages();
  const shared = { doc, fonts: new StandardFontSet(doc), fontRefs: new Map<string, OriginalFontRef | null>() };

  const pageNumbers = new Set<number>([
    ...input.textEdits.map((e) => e.pageNumber),
    ...input.objects.map((o) => o.pageNumber),
  ]);

  for (const pageNumber of [...pageNumbers].sort((a, b) => a - b)) {
    const page = pages[pageNumber - 1];
    if (!page) continue;
    const view = getPageView(pageNumber) ?? computePageView(page);

    // Delete the original text of every changed edit from the page content first
    const edits = input.textEdits.filter((e) => e.pageNumber === pageNumber && !isEditUnchanged(e));
    const removed = removeTextInRects(doc, page, edits.map((e) => coverRectPdf(e, view)));

    const ctx = preparePage(doc, page, view, shared);

    // Text edits sit below added objects in the editor, so draw them first
    for (let i = 0; i < edits.length; i++) {
      await drawTextEdit(ctx, edits[i], (removed[i] ?? 0) > 0);
    }
    for (const obj of input.objects.filter((o) => o.pageNumber === pageNumber)) {
      await drawObject(ctx, obj);
    }
    page.pushOperators(popGraphicsState());
  }

  for (const [pageNumber, rotation] of input.pageRotations) {
    const page = pages[pageNumber - 1];
    if (page && rotation) page.setRotation(degrees((page.getRotation().angle + rotation) % 360));
  }

  const { pageOrder, deletedPages } = input;
  if (deletedPages.size > 0 || pageOrder.some((p, i) => p !== i + 1)) {
    const out = await PDFDocument.create();
    const keep = pageOrder.filter((p) => !deletedPages.has(p)).map((p) => p - 1);
    const copied = await out.copyPages(doc, keep);
    copied.forEach((p) => out.addPage(p));
    return out.save();
  }
  return doc.save();
}
