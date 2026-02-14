import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Split a PDF into Multiple Files for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to split PDF documents into separate files. Extract specific pages, split by page ranges, or separate every page. Free, no signup required.",
  keywords: "split pdf, separate pdf pages, extract pages from pdf, split pdf free, divide pdf, pdf splitter online",
  openGraph: {
    title: "How to Split a PDF into Multiple Files for Free (2026 Guide)",
    description: "Split PDF documents into separate files in seconds. Free, private, no signup required.",
    type: "article",
  },
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
