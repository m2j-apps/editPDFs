import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Make a PDF Searchable (OCR Guide) | EditPDFs.app",
  description: "Learn how to make a scanned PDF searchable using OCR. Convert image-based PDFs into text-searchable documents free — no software needed.",
  keywords: "make pdf searchable, ocr pdf, searchable pdf, pdf ocr free, scanned pdf to searchable",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-make-pdf-searchable" },
  openGraph: {
    title: "How to Make a PDF Searchable (OCR Guide)",
    description: "Convert scanned PDFs into searchable, selectable-text documents with OCR. Free and private.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleJsonLd
        title="How to Make a PDF Searchable (OCR Guide)"
        description="Learn how to make a scanned PDF searchable using OCR. Convert image-based PDFs into text-searchable documents free — no software needed."
        slug="how-to-make-pdf-searchable"
        datePublished="2026-03-28"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Will the PDF look different after OCR?", answer: "No. The output PDF looks identical to the original. OCR adds an invisible text layer beneath the image — the visual appearance of the document doesn't change at all." },
          { question: "Can OCR recognize handwriting?", answer: "Basic OCR tools don't handle handwriting well. Modern AI-based tools (like Google Cloud Vision or Microsoft Azure) have better handwriting recognition, but accuracy varies significantly based on handwriting quality. For most free online tools, expect poor results on handwritten text." },
          { question: "Does file size increase after OCR?", answer: "Slightly — adding a text layer increases file size, but usually by less than 10%. The original image data remains unchanged, so the visual quality is identical." },
          { question: "Can I OCR a multi-page PDF all at once?", answer: "Yes. Most OCR tools process all pages in a single pass. Upload the full multi-page PDF and you'll get back a fully searchable document with every page converted." },
          { question: "Is OCR the same as making a PDF editable?", answer: "Not exactly. OCR makes the text searchable and selectable, but the PDF structure is still based on the original image. To edit the actual content (change words, move paragraphs), you'd need to convert to Word or use a dedicated PDF editor that supports full text editing." },
          { question: "What languages does OCR support?", answer: "Most OCR engines support dozens of languages, including non-Latin scripts like Cyrillic, Greek, Arabic, and CJK (Chinese, Japanese, Korean). Accuracy is highest when you tell the tool which language to expect, so set the language before processing rather than relying on auto-detection — especially for documents that mix scripts." },
          { question: "I ran OCR but the text still isn't selectable — why?", answer: "Usually one of three things: you're viewing the original file instead of the downloaded output, the scan quality was too low for OCR to detect characters, or the page was too skewed. Re-open the downloaded copy, and if it still won't select, rescan at 300 DPI or higher and straighten the pages before trying again." },
        ]}
      />
      {children}
    </>
  );
}
