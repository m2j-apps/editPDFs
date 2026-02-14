import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF vs Word (DOCX): When to Use Each Format (2026 Guide) | EditPDFs.app",
  description: "Learn when to use PDF vs Word documents. Understand the differences, advantages, and best use cases for each file format.",
  keywords: "pdf vs word, pdf vs docx, when to use pdf, pdf or word document, file format comparison",
  openGraph: {
    title: "PDF vs Word (DOCX): When to Use Each Format",
    description: "Understand when to use PDF vs Word. Best practices for choosing the right format.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
