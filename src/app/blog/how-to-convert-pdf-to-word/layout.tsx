import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert PDF to Word for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to convert PDF files to editable Word documents. Extract text and formatting from PDFs. Tips for best conversion results.",
  keywords: "convert pdf to word, pdf to docx, pdf to word free, extract text from pdf, edit pdf in word",
  openGraph: {
    title: "How to Convert PDF to Word for Free (2026 Guide)",
    description: "Convert PDF to editable Word documents. Tips for best results.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
