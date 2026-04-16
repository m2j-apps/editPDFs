import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Convert PDF to Word for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to convert PDF files to editable Word documents. Extract text and formatting from PDFs. Tips for best conversion results.",
  keywords: "convert pdf to word, pdf to docx, pdf to word free, extract text from pdf, edit pdf in word",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-convert-pdf-to-word" },
  openGraph: {
    title: "How to Convert PDF to Word for Free (2026 Guide)",
    description: "Convert PDF to editable Word documents. Tips for best results.",
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
        title="How to Convert PDF to Word for Free (2026 Guide)"
        description="Learn how to convert PDF files to editable Word documents. Extract text and formatting from PDFs. Tips for best conversion results."
        slug="how-to-convert-pdf-to-word"
        datePublished="2026-01-27"
      />
      <FaqJsonLd
        questions={[
          { question: "Is PDF to Word conversion free?", answer: "Several free options exist: Microsoft Word, Google Docs, and various online tools. Quality varies between them." },
          { question: "Will my formatting be preserved?", answer: "Simple documents convert well. Complex layouts with multiple columns, tables, or unusual fonts may need cleanup." },
          { question: "Can I convert password-protected PDFs?", answer: "Only if you know the password. Conversion tools can't bypass PDF security." },
          { question: "What about handwritten documents?", answer: "Handwriting is very difficult to convert accurately. OCR struggles with non-typed text. Results are usually poor." },
        ]}
      />
      {children}
    </>
  );
}
