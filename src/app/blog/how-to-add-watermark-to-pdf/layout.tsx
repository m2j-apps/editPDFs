import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Add a Watermark to a PDF for Free | EditPDFs.app",
  description: "Add text or image watermarks to PDF files for free. Mark documents as Draft, Confidential, or add your logo — no software needed.",
  keywords: "add watermark to pdf, pdf watermark free, watermark pdf online, text watermark pdf, confidential watermark pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-add-watermark-to-pdf" },
  openGraph: {
    title: "How to Add a Watermark to a PDF for Free",
    description: "Stamp PDFs with text or image watermarks. Free, browser-based, works on any device.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleJsonLd
        title="How to Add a Watermark to a PDF for Free"
        description="Add text or image watermarks to PDF files for free. Mark documents as Draft, Confidential, or add your logo — no software needed."
        slug="how-to-add-watermark-to-pdf"
        datePublished="2026-03-28"
        dateModified="2026-06-17"
        author="Mike"
      />
      <FaqJsonLd
        questions={[
          { question: "Can I add a watermark to just specific pages?", answer: "Yes, most PDF watermark tools let you specify page ranges. You can watermark only the first page, all odd pages, or any custom range." },
          { question: "Will the watermark affect the original PDF's quality?", answer: "No. Adding a watermark doesn't compress or degrade the original content. The watermark is added as an additional layer, and the original text and images remain at their original quality." },
          { question: "Can I add a watermark to a PDF that already has a watermark?", answer: "Yes — you can add multiple watermarks. Upload the already-watermarked PDF and add an additional watermark. Both will appear in the output." },
          { question: "How do I add a watermark to a PDF on iPhone or Android?", answer: "EditPDFs.app works in mobile browsers. Upload the PDF, configure your watermark, and download the result — all from your phone." },
          { question: "Can I watermark multiple PDFs at once?", answer: "Some tools offer batch watermarking for multiple files simultaneously. For one-off documents, processing them individually is straightforward." },
          { question: "What's the difference between a text and image watermark?", answer: "A text watermark overlays words like \"DRAFT\" or \"CONFIDENTIAL\" that you type and style directly. An image watermark places a graphic such as a logo or seal — use a PNG with a transparent background so no white box appears around it." },
          { question: "Will the watermark show up when the PDF is printed?", answer: "Yes. A watermark is part of the page, so it prints exactly as it appears on screen, including its opacity and position. If you only want an on-screen marking, lower the opacity rather than expecting it to be hidden in print." },
        ]}
      />
      {children}
    </>
  );
}
