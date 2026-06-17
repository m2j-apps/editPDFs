import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Annotate a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Highlight, underline, comment, draw, and add sticky notes to any PDF without changing the original. Step-by-step, plus fixes for scanned and secured files. Free and private.",
  keywords:
    "annotate pdf, highlight pdf, add notes to pdf, markup pdf, pdf annotation free, comment on pdf, add comments to pdf, draw on pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-annotate-pdf" },
  openGraph: {
    title: "How to Annotate a PDF for Free (2026 Guide)",
    description:
      "Highlight, comment, draw, and add notes to any PDF in your browser. Free, private, no signup.",
    type: "article",
  },
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleJsonLd
        title="How to Annotate a PDF for Free (2026 Guide)"
        description="Highlight, underline, comment, draw, and add sticky notes to any PDF without changing the original. Step-by-step, plus fixes for scanned and secured files."
        slug="how-to-annotate-pdf"
        datePublished="2026-02-02"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Is annotating a PDF free?", answer: "Yes. On EditPDFs.app it's completely free with no signup, no watermark, and no limit on how many files you mark up." },
          { question: "Does annotating change the original document?", answer: "No. Annotations sit in a separate layer on top of the page, so the underlying text, images, and layout stay exactly as they were. That's the whole point of annotating instead of editing." },
          { question: "Will the people I share with see my annotations?", answer: "Yes. The marks are embedded in the file you download, so anyone who opens it in a standard reader sees them. A few older viewers tuck comments behind a clickable icon rather than showing them inline." },
          { question: "Can I annotate a scanned PDF?", answer: "You can add drawings, shapes, and sticky notes on top of a scan right away. To highlight or underline actual words, run OCR first to make the text selectable." },
          { question: "How do I make annotations permanent?", answer: "Flatten the PDF after annotating. Flattening merges the markup into the page so it can't be moved or deleted and looks identical in every viewer — handy right before printing or archiving." },
          { question: "Can multiple people annotate the same PDF?", answer: "Yes, by passing the file along — each reviewer adds their marks and re-shares. Using a different highlight color per person keeps everyone's comments easy to tell apart." },
          { question: "Are my files uploaded to a server?", answer: "Not on EditPDFs.app. All annotating happens locally in your browser, so the document never leaves your device — which matters when the thing you're marking up is sensitive." },
        ]}
      />
      {children}
    </>
  );
}
