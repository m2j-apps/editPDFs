import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Merge PDF Files Without Software | EditPDFs.app",
  description:
    "Merge multiple PDF files without installing software. Step by step browser method with tips for order and quality.",
  keywords:
    "merge pdf without software, combine pdf online, merge files in browser, no install pdf merge",
  openGraph: {
    title: "How to Merge PDF Files Without Software",
    description: "A no-install guide to combining PDFs in the correct order and sharing clean final files.",
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
        title="How to Merge PDF Files Without Software"
        description="Merge multiple PDF files without installing software. Step by step browser method with tips for order and quality."
        slug="how-to-merge-pdf-files-without-software"
        datePublished="2026-03-09"
      />
      {children}
    </>
  );
}
