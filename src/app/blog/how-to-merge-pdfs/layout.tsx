import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Merge PDFs for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to combine multiple PDF files into one document for free. Drag, drop, reorder. No account required, completely private.",
  keywords: "how to merge pdf, combine pdf files, merge pdf free, join pdfs online, pdf combiner, merge multiple pdfs",
  openGraph: {
    title: "How to Merge PDFs for Free (2026 Guide)",
    description: "Combine multiple PDF files into one document in seconds. Free, private, no signup required.",
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
