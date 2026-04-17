import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "PDF Accessibility: Making PDFs Screen Reader Friendly | EditPDFs.app",
  description: "Learn how to make PDFs accessible for screen readers. Covers PDF tags, reading order, alt text, WCAG 2.2 compliance, and free testing tools.",
  keywords: "pdf accessibility, screen reader pdf, accessible pdf, pdf tags, wcag pdf, pdf ua, alt text pdf",
  alternates: { canonical: "https://editpdfs.app/blog/pdf-accessibility-screen-reader" },
  openGraph: {
    title: "PDF Accessibility: Making PDFs Screen Reader Friendly",
    description: "A practical guide to making PDFs accessible for screen readers and assistive technology.",
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
        title="PDF Accessibility: Making PDFs Screen Reader Friendly"
        description="Learn how to make PDFs accessible for screen readers. Covers PDF tags, reading order, alt text, WCAG 2.2 compliance, and free testing tools."
        slug="pdf-accessibility-screen-reader"
        datePublished="2026-03-30"
      />
      {children}
    </>
  );
}
