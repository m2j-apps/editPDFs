import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Convert PDF to Word for Free (No Watermark) | EditPDFs.app",
  description:
    "Learn how to convert PDF to Word for free while keeping formatting intact. Includes troubleshooting and quality tips.",
  keywords:
    "convert pdf to word free, pdf to docx, editable word from pdf, free pdf converter",
  openGraph: {
    title: "How to Convert PDF to Word for Free",
    description: "Simple steps to convert PDF files into editable Word documents.",
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
        title="How to Convert PDF to Word for Free"
        description="Learn how to convert PDF to Word for free while keeping formatting intact. Includes troubleshooting and quality tips."
        slug="how-to-convert-pdf-to-word-for-free"
        datePublished="2026-03-09"
      />
      {children}
    </>
  );
}
