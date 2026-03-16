import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

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

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleJsonLd
        title="How to Annotate a PDF for Free (2026 Guide)"
        description="Learn how to highlight, underline, and add notes to PDF documents. Mark up PDFs for review, study, or collaboration. Free online tool."
        slug="how-to-annotate-pdf"
        datePublished="2026-02-02"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to annotate PDFs?", answer: "Yes, completely free with no limits." },
          { question: "Will others see my annotations?", answer: "Annotations are embedded in the PDF you download. Anyone you share the file with will see them in their PDF viewer." },
          { question: "Can I remove annotations later?", answer: "Before downloading, yes. After downloading, you can re-upload and edit, but some annotations become permanent layers." },
          { question: "Can I annotate scanned documents?", answer: "Yes! You can add annotations on top of any PDF, including scanned documents." },
        ]}
      />
      {children}
    </>
  );
}
