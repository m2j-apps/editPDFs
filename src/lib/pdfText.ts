// Font, position and color information for text that already exists in a PDF.
//
// The pdf.js text layer only exposes generic fallback fonts ("sans-serif") and an
// approximate size, so edits built from it never matched the original typography.
// Here we read the real data from pdf.js (text items + operator list) so edits can
// reuse the document's own font on screen and in the exported file.

import type { PDFPageProxy } from "pdfjs-dist";

/** Line height used by every on-page text box (display, inline editor and export). */
export const LINE_HEIGHT = 1.2;

export type FontKind = "sans" | "serif" | "mono";

export interface PdfTextEdit {
  id: string;
  pageNumber: number;
  originalText: string;
  newText: string;
  x: number; // top-left of the text box, page units (CSS px at 100% zoom)
  y: number;
  originalX?: number;
  originalY?: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string; // CSS font stack used when the PDF's own font can't be used
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    highlightColor?: string;
    color?: string;
  };
  // Captured from the PDF when the edit is created
  fontId?: string; // pdf.js loadedName of the original font
  fontName?: string; // PDF font name, e.g. "ABCDEF+Calibri-Bold"
  baseBold?: boolean;
  baseItalic?: boolean;
  hScale?: number; // horizontal text scaling of the original run
  ascent?: number; // em fractions of the font
  descent?: number;
  bgColor?: string; // page color behind the original text
  cover?: { x: number; y: number; width: number; height: number }; // area of the original text
  original?: { fontSize: number; color: string; bold: boolean; italic: boolean };
}

interface GlyphInfo {
  code: number; // character code in the PDF font
  fontChar: string; // character that maps to this glyph in pdf.js's loaded web font
  width: number; // advance width, 1/1000 em
}

export interface FontInfo {
  id: string;
  name: string;
  bold: boolean;
  italic: boolean;
  vertical: boolean;
  kind: FontKind;
  glyphs: Map<string, GlyphInfo>;
}

interface TextItemInfo {
  str: string;
  fontId: string;
  x: number;
  baseline: number;
  fontSize: number;
  hScale: number;
  width: number;
  ascent: number;
  descent: number;
  rotated: boolean;
}

export interface PageView {
  transform: number[]; // PDF user space -> page units (pdf.js viewport at scale 1)
  width: number;
  height: number;
}

interface PageInfo {
  view: PageView;
  items: TextItemInfo[];
}

const fonts = new Map<string, FontInfo>();
const pages = new Map<number, PageInfo>();
const loadedFaces = new Set<string>();

export function getFontInfo(id: string | undefined): FontInfo | undefined {
  return id ? fonts.get(id) : undefined;
}

export function getPageView(pageNumber: number): PageView | undefined {
  return pages.get(pageNumber)?.view;
}

/** Forget page data when a different document is loaded. */
export function resetPdfTextInfo() {
  pages.clear();
}

export function multiplyTransform(m1: number[], m2: number[]): number[] {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
  ];
}

export function invertTransform(m: number[]): number[] {
  const det = m[0] * m[3] - m[1] * m[2];
  return [
    m[3] / det,
    -m[1] / det,
    -m[2] / det,
    m[0] / det,
    (m[2] * m[5] - m[3] * m[4]) / det,
    (m[1] * m[4] - m[0] * m[5]) / det,
  ];
}

// ---------------------------------------------------------------------------
// Font names

/** "ABCDEF+TimesNewRomanPS-BoldMT" -> "Times New Roman" */
export function cleanFontName(name: string | undefined): string {
  if (!name) return "";
  let n = name.replace(/^[A-Z]{6}\+/, "").split(/[,-]/)[0];
  n = n.replace(/(PSMT|PS|MT|Std|Pro|LT)$/g, "");
  n = n.replace(/(Regular|Roman|Bold|Italic|Oblique|Semibold|Light|Medium|Black)+$/i, "") || n;
  n = n.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
  // pdf.js internal / generic names aren't useful as a CSS family
  if (!n || /^g_d\d+_f\d+$/.test(n) || /^(sans-serif|serif|monospace)$/i.test(n)) return "";
  return n;
}

export function fontKindFromName(name: string | undefined, cssFallback?: string): FontKind {
  const n = (name || "").toLowerCase();
  if (/courier|mono|consolas|menlo|lucida ?console|inconsolata/.test(n)) return "mono";
  if (!/sans/.test(n) && /times|roman|serif|georgia|garamond|cambria|antiqua|palatino|minion|baskerville|caslon|century|bodoni|didot|constantia|charter|merriweather|playfair|bookman/.test(n)) {
    return "serif";
  }
  if (!n && cssFallback) {
    const f = cssFallback.toLowerCase();
    if (/monospace|courier/.test(f)) return "mono";
    if (/(^|[\s,"])serif|times|georgia/.test(f) && !/sans-serif/.test(f.split(",").pop() || "")) return "serif";
  }
  return "sans";
}

export function isBoldName(name: string | undefined) {
  return /bold|black|heavy|semibold|demi/i.test(name || "");
}

export function isItalicName(name: string | undefined) {
  return /italic|oblique/i.test(name || "");
}

export function cssFontStack(name: string | undefined, kind: FontKind): string {
  const generic =
    kind === "serif" ? '"Times New Roman", Times, serif'
    : kind === "mono" ? '"Courier New", Courier, monospace'
    : "Arial, Helvetica, sans-serif";
  const clean = cleanFontName(name);
  return clean ? `"${clean}", ${generic}` : generic;
}

// ---------------------------------------------------------------------------
// Page analysis

interface PdfJsOps {
  setFont: number;
  showText: number;
  showSpacedText: number;
  nextLineShowText: number;
  nextLineSetSpacingShowText: number;
}

interface PdfJsFontObject {
  name?: string;
  bold?: boolean;
  italic?: boolean;
  black?: boolean;
  vertical?: boolean;
}

function getCommonObj(page: PDFPageProxy, id: string): Promise<PdfJsFontObject | null> {
  return new Promise((resolve) => {
    const objs = (page as unknown as { commonObjs: { has(id: string): boolean; get(id: string, cb?: (d: unknown) => void): unknown } }).commonObjs;
    try {
      if (objs.has(id)) {
        resolve(objs.get(id) as PdfJsFontObject);
        return;
      }
      objs.get(id, (data) => resolve(data as PdfJsFontObject));
      setTimeout(() => resolve(null), 4000);
    } catch {
      resolve(null);
    }
  });
}

/**
 * Collect text items, fonts and the glyph (character code) map for a page.
 * Called once per page render; cheap relative to rendering.
 */
export async function analyzePage(page: PDFPageProxy, ops: PdfJsOps): Promise<void> {
  const viewport = page.getViewport({ scale: 1 });
  const view: PageView = {
    transform: Array.from(viewport.transform),
    width: viewport.width,
    height: viewport.height,
  };

  const [content, opList] = await Promise.all([page.getTextContent(), page.getOperatorList()]);

  // Glyph maps from the operator list: unicode -> character code in each font
  const showOps = new Set([ops.showText, ops.showSpacedText, ops.nextLineShowText, ops.nextLineSetSpacingShowText]);
  const pendingFonts = new Map<string, Map<string, GlyphInfo>>();
  let current: Map<string, GlyphInfo> | null = null;
  for (let i = 0; i < opList.fnArray.length; i++) {
    const fn = opList.fnArray[i];
    const args = opList.argsArray[i] as unknown[] | null;
    if (fn === ops.setFont && args && typeof args[0] === "string") {
      const id = args[0];
      current = fonts.get(id)?.glyphs ?? pendingFonts.get(id) ?? new Map();
      if (!fonts.has(id)) pendingFonts.set(id, current);
    } else if (current && showOps.has(fn) && args) {
      const glyphs = args.find(Array.isArray) as unknown[] | undefined;
      if (!glyphs) continue;
      for (const g of glyphs) {
        if (!g || typeof g !== "object") continue;
        const glyph = g as { unicode?: string; originalCharCode?: number; fontChar?: string; width?: number; isInFont?: boolean };
        if (typeof glyph.unicode !== "string" || typeof glyph.originalCharCode !== "number") continue;
        if (glyph.isInFont === false || [...glyph.unicode].length !== 1) continue;
        if (!current.has(glyph.unicode)) {
          current.set(glyph.unicode, {
            code: glyph.originalCharCode,
            fontChar: glyph.fontChar ?? glyph.unicode,
            width: glyph.width ?? 0,
          });
        }
      }
    }
  }

  const fontIds = new Set<string>([...pendingFonts.keys()]);
  for (const item of content.items) {
    if ("fontName" in item && item.fontName && !fonts.has(item.fontName)) fontIds.add(item.fontName);
  }
  await Promise.all(
    [...fontIds].map(async (id) => {
      const obj = await getCommonObj(page, id);
      const name = obj?.name || content.styles[id]?.fontFamily || "";
      const existing = fonts.get(id);
      if (existing) return;
      fonts.set(id, {
        id,
        name,
        bold: !!obj?.bold || !!obj?.black || isBoldName(name),
        italic: !!obj?.italic || isItalicName(name),
        vertical: !!obj?.vertical,
        kind: fontKindFromName(obj?.name, content.styles[id]?.fontFamily),
        glyphs: pendingFonts.get(id) ?? new Map(),
      });
    })
  );

  const items: TextItemInfo[] = [];
  for (const item of content.items) {
    if (!("str" in item) || !item.str) continue;
    const tx = multiplyTransform(view.transform, item.transform);
    const fontSize = Math.hypot(tx[2], tx[3]);
    if (!fontSize) continue;
    const style = content.styles[item.fontName];
    let ascent = style?.ascent ?? 0;
    let descent = Math.abs(style?.descent ?? 0);
    if (!(ascent > 0.3 && ascent < 1.5)) ascent = 0.8;
    if (!(descent > 0 && descent < 1)) descent = 0.2;
    items.push({
      str: item.str,
      fontId: item.fontName,
      x: tx[4],
      baseline: tx[5],
      fontSize,
      hScale: Math.hypot(tx[0], tx[1]) / fontSize,
      width: item.width,
      ascent,
      descent,
      rotated: Math.abs(tx[1]) > 1e-3 || Math.abs(tx[2]) > 1e-3 || tx[0] < 0,
    });
  }

  pages.set(page.pageNumber, { view, items });
}

function findTextItem(pageNumber: number, text: string, rect: { x: number; y: number; width: number; height: number }) {
  const info = pages.get(pageNumber);
  if (!info) return null;
  const wanted = text.trim();
  const midY = rect.y + rect.height / 2;
  let best: TextItemInfo | null = null;
  let bestScore = Infinity;
  for (const it of info.items) {
    if (it.rotated) continue;
    const top = it.baseline - it.ascent * it.fontSize;
    const bottom = it.baseline + it.descent * it.fontSize;
    if (midY < top - 2 || midY > bottom + 2) continue;
    if (rect.x + rect.width < it.x - 2 || rect.x > it.x + it.width + 2) continue;
    const s = it.str.trim();
    const textScore = s === wanted ? 0 : s.includes(wanted) ? 1 : 5;
    const score = textScore * 100 + Math.abs(it.x - rect.x) + Math.abs(top - rect.y);
    if (score < bestScore) {
      bestScore = score;
      best = it;
    }
  }
  return best;
}

/** Offset from the top of a text box to its first baseline, for a line height of LINE_HEIGHT. */
export function baselineOffset(fontSize: number, ascent = 0.905, descent = 0.212) {
  return ((LINE_HEIGHT - (ascent + descent)) / 2 + ascent) * fontSize;
}

// ---------------------------------------------------------------------------
// Colors sampled from the rendered page

function toHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

export function sampleTextColors(
  canvas: HTMLCanvasElement | null,
  rect: { x: number; y: number; width: number; height: number },
  pageWidth: number
): { bg: string; fg: string } {
  const fallback = { bg: "#ffffff", fg: "#000000" };
  if (!canvas || !pageWidth) return fallback;
  try {
    const ctx = canvas.getContext("2d");
    if (!ctx) return fallback;
    const k = canvas.width / pageWidth; // canvas pixels per page unit
    const pad = 3;
    const x0 = Math.max(0, Math.floor((rect.x - pad) * k));
    const y0 = Math.max(0, Math.floor((rect.y - pad) * k));
    const x1 = Math.min(canvas.width, Math.ceil((rect.x + rect.width + pad) * k));
    const y1 = Math.min(canvas.height, Math.ceil((rect.y + rect.height + pad) * k));
    if (x1 <= x0 || y1 <= y0) return fallback;
    const data = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data;
    const w = x1 - x0;
    const innerX0 = rect.x * k - x0, innerX1 = (rect.x + rect.width) * k - x0;
    const innerY0 = rect.y * k - y0, innerY1 = (rect.y + rect.height) * k - y0;

    // Background: most common color in the ring around the text
    const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();
    const inner: number[] = [];
    for (let i = 0; i < data.length; i += 4) {
      const px = (i / 4) % w, py = Math.floor(i / 4 / w);
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      const rr = a === 0 ? 255 : r, gg = a === 0 ? 255 : g, bb = a === 0 ? 255 : b;
      const isInner = px > innerX0 && px < innerX1 && py > innerY0 && py < innerY1;
      if (isInner) {
        inner.push(rr, gg, bb);
      } else {
        const key = ((rr >> 4) << 8) | ((gg >> 4) << 4) | (bb >> 4);
        const bucket = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
        bucket.n++; bucket.r += rr; bucket.g += gg; bucket.b += bb;
        buckets.set(key, bucket);
      }
    }
    let top: { n: number; r: number; g: number; b: number } | null = null;
    for (const bucket of buckets.values()) if (!top || bucket.n > top.n) top = bucket;
    const bg = top ? [top.r / top.n, top.g / top.n, top.b / top.n] : [255, 255, 255];
    if (bg.every((v) => v > 247)) bg.fill(255);

    // Text color: the inner pixel that differs most from the background
    let fg = [0, 0, 0];
    let maxDist = 0;
    for (let i = 0; i < inner.length; i += 3) {
      const d = Math.abs(inner[i] - bg[0]) + Math.abs(inner[i + 1] - bg[1]) + Math.abs(inner[i + 2] - bg[2]);
      if (d > maxDist) {
        maxDist = d;
        fg = [inner[i], inner[i + 1], inner[i + 2]];
      }
    }
    if (maxDist < 60 || fg.every((v) => v < 40)) fg = [0, 0, 0];
    return { bg: toHex(bg[0], bg[1], bg[2]), fg: toHex(fg[0], fg[1], fg[2]) };
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Building an edit from clicked text

export function captureTextStyle(opts: {
  pageNumber: number;
  text: string;
  rect: { x: number; y: number; width: number; height: number }; // clicked text, page units
  canvas: HTMLCanvasElement | null;
  pageWidth: number;
  fallback: { fontSize: number; fontFamily: string; fontWeight: string };
}): Omit<PdfTextEdit, "id" | "pageNumber" | "originalText" | "newText"> {
  const { pageNumber, text, rect, canvas, pageWidth, fallback } = opts;
  const item = findTextItem(pageNumber, text, rect);
  const font = item ? fonts.get(item.fontId) : undefined;

  let x: number, y: number, fontSize: number, ascent: number, descent: number, hScale: number;
  let cover: { x: number; y: number; width: number; height: number };
  if (item) {
    fontSize = item.fontSize;
    ascent = item.ascent;
    descent = item.descent;
    hScale = item.hScale;
    const whole = item.str.trim() === text.trim();
    const top = item.baseline - ascent * fontSize;
    cover = {
      x: whole ? item.x : rect.x,
      y: top,
      width: whole ? item.width : rect.width,
      height: (ascent + descent) * fontSize,
    };
    x = cover.x;
    y = item.baseline - baselineOffset(fontSize, ascent, descent);
  } else {
    fontSize = fallback.fontSize;
    ascent = 0.8;
    descent = 0.2;
    hScale = 1;
    cover = { ...rect };
    x = rect.x;
    y = rect.y + ascent * fontSize - baselineOffset(fontSize, ascent, descent);
  }

  const colors = sampleTextColors(canvas, cover, pageWidth);
  const bold = font ? font.bold : fallback.fontWeight === "bold" || parseInt(fallback.fontWeight) >= 700;
  const italic = font ? font.italic : false;
  const kind = font?.kind ?? fontKindFromName(undefined, fallback.fontFamily);

  return {
    x,
    y,
    originalX: x,
    originalY: y,
    width: cover.width,
    height: cover.height,
    fontSize,
    fontFamily: cssFontStack(font?.name, kind),
    formatting: { bold, italic, color: colors.fg },
    fontId: font?.id,
    fontName: font?.name,
    baseBold: bold,
    baseItalic: italic,
    hScale,
    ascent,
    descent,
    bgColor: colors.bg,
    cover,
    original: { fontSize, color: colors.fg, bold, italic },
  };
}

/** True when an edit would render exactly like the original text (e.g. it was only clicked). */
export function isEditUnchanged(edit: PdfTextEdit): boolean {
  if (!edit.original) return false;
  const f = edit.formatting ?? {};
  return (
    edit.newText === edit.originalText &&
    Math.abs(edit.x - (edit.originalX ?? edit.x)) < 0.01 &&
    Math.abs(edit.y - (edit.originalY ?? edit.y)) < 0.01 &&
    Math.abs(edit.fontSize - edit.original.fontSize) < 0.01 &&
    !!f.bold === edit.original.bold &&
    !!f.italic === edit.original.italic &&
    !f.underline &&
    !f.strikethrough &&
    !f.highlightColor &&
    (f.color ?? edit.original.color).toLowerCase() === edit.original.color.toLowerCase()
  );
}

// ---------------------------------------------------------------------------
// On-screen rendering

function isFaceLoaded(id: string): boolean {
  if (loadedFaces.has(id)) return true;
  if (typeof document === "undefined" || !document.fonts) return false;
  for (const face of document.fonts) {
    if (face.family.replace(/["']/g, "") === id && face.status === "loaded") {
      loadedFaces.add(id);
      return true;
    }
  }
  return false;
}

export interface TextSegment {
  text: string;
  original: boolean; // drawable with the PDF's own font
}

/**
 * Split text into runs the PDF's own font can draw and runs that need a substitute
 * (fonts embedded in PDFs usually only contain the characters the document uses).
 */
export function splitByFont(font: FontInfo | null, text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  for (const ch of text) {
    const neutral = ch === " " || ch === "\n";
    const original = !!font && (font.glyphs.has(ch) || neutral);
    const last = segments[segments.length - 1];
    if (last && (last.original === original || (neutral && !font?.glyphs.has(ch)))) last.text += ch;
    else segments.push({ text: ch, original });
  }
  return segments;
}

/** Map text to the characters pdf.js uses for this font's glyphs (for on-screen rendering). */
function mapToFontChars(font: FontInfo, text: string): string {
  let out = "";
  for (const ch of text) out += font.glyphs.get(ch)?.fontChar ?? ch;
  return out;
}

/** The PDF's own font for an edit, if the edit still has the original bold/italic style. */
export function canUseOriginalFont(edit: PdfTextEdit): FontInfo | null {
  const font = getFontInfo(edit.fontId);
  if (!font || font.vertical || font.glyphs.size === 0) return null;
  if (!!edit.formatting?.bold !== !!edit.baseBold || !!edit.formatting?.italic !== !!edit.baseItalic) return null;
  return font;
}

export interface DisplaySegment {
  text: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
}

export function editDisplaySegments(edit: PdfTextEdit): DisplaySegment[] {
  const candidate = canUseOriginalFont(edit);
  const font = candidate && isFaceLoaded(candidate.id) ? candidate : null;
  const substitute = {
    fontFamily: edit.fontFamily,
    fontWeight: edit.formatting?.bold ? "bold" : "normal",
    fontStyle: edit.formatting?.italic ? "italic" : "normal",
  };
  return splitByFont(font, edit.newText).map((seg) =>
    seg.original && font
      ? { text: mapToFontChars(font, seg.text), fontFamily: `"${font.id}", ${edit.fontFamily}`, fontWeight: "normal", fontStyle: "normal" }
      : { text: seg.text, ...substitute }
  );
}
