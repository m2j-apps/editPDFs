import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Annotate a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to highlight, underline, and add notes to PDF documents. Mark up PDFs for review, study, or collaboration. Free online tool.",
  keywords: "annotate pdf, highlight pdf, add notes to pdf, markup pdf, pdf annotation free, comment on pdf",
  openGraph: {
    title: "How to Annotate a PDF for Free (2026 Guide)",
    description: "Highlight, underline, and add notes to any PDF. Free, private, no signup.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
