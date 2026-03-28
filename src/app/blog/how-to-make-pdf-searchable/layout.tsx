import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

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
        author="Jen"
      />
      {children}
    </>
  );
}
