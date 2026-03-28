import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Redact a PDF: Remove Sensitive Information Safely | EditPDFs.app",
  description: "Learn how to permanently redact text, images, and personal data from a PDF. Protect sensitive information before sharing — free, no software needed.",
  keywords: "redact pdf, pdf redaction, remove sensitive information pdf, black out text pdf, pdf redact free",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-redact-pdf" },
  openGraph: {
    title: "How to Redact a PDF: Remove Sensitive Information Safely",
    description: "Permanently black out text and images in PDFs before sharing. Free, private, browser-based.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleJsonLd
        title="How to Redact a PDF: Remove Sensitive Information Safely"
        description="Learn how to permanently redact text, images, and personal data from a PDF. Protect sensitive information before sharing — free, no software needed."
        slug="how-to-redact-pdf"
        datePublished="2026-03-28"
        author="Jen"
      />
      {children}
    </>
  );
}
