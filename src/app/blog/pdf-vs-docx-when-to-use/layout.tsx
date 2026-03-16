import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

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

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleJsonLd
        title="PDF vs Word (DOCX): When to Use Each Format"
        description="Learn when to use PDF vs Word documents. Understand the differences, advantages, and best use cases for each file format."
        slug="pdf-vs-docx-when-to-use"
        datePublished="2026-02-18"
      />
      <FaqJsonLd
        questions={[
          { question: "Can I convert between PDF and Word?", answer: "Yes. Word to PDF is straightforward and preserves formatting. PDF to Word works but may require cleanup depending on the document complexity." },
          { question: "Which format is more professional?", answer: "PDF is generally considered more polished for final documents. It signals that the document is complete and not meant for editing." },
          { question: "Can everyone open PDFs?", answer: "Yes. All modern browsers, operating systems, and devices can open PDFs without additional software." },
        ]}
      />
      {children}
    </>
  );
}
