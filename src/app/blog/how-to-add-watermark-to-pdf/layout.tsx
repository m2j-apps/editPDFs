import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

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
        author="Mike"
      />
      {children}
    </>
  );
}
