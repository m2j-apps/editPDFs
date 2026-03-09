import type { Metadata } from "next";

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

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
