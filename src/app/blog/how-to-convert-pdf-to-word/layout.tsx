import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Convert PDF to Word for Free (2026 Guide) | EditPDFs.app",
  description:
    "Convert PDF to editable Word (.docx) for free. How conversion works, text vs scanned PDFs and OCR, step-by-step, and fixes for garbled text, broken tables, and fonts.",
  keywords:
    "convert pdf to word, pdf to docx, pdf to word free, extract text from pdf, edit pdf in word, scanned pdf to word, ocr pdf to word",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-convert-pdf-to-word" },
  openGraph: {
    title: "How to Convert PDF to Word for Free (2026 Guide)",
    description:
      "Convert PDF to editable Word documents — with the text-vs-scanned distinction, step-by-step, and troubleshooting for formatting problems.",
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
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Is converting PDF to Word free?", answer: "Yes. EditPDFs.app converts in your browser for free with no signup, and free routes also exist through Microsoft Word and Google Docs. Output quality varies between them, especially on complex layouts." },
          { question: "Will my formatting be preserved exactly?", answer: "Simple, text-based documents convert very closely to the original. Complex layouts with multiple columns, detailed tables, or unusual fonts usually need a little cleanup in Word because the converter has to reconstruct that structure." },
          { question: "Can I convert a scanned PDF to editable Word?", answer: "Yes, but only after OCR. A scanned PDF is an image, so you must make it searchable first; otherwise the conversion just drops the scan into Word as a picture you can't edit." },
          { question: "Can I convert a password-protected PDF?", answer: "Only if you know the password and can open the file. No conversion tool can bypass PDF encryption — that protection exists precisely to prevent it." },
          { question: "Are my files uploaded to a server?", answer: "Not on EditPDFs.app — conversion runs locally in your browser, so your document never leaves your device. Many other converters do upload, so check before using one for sensitive files." },
          { question: "What about handwritten documents?", answer: "Handwriting is very hard to convert accurately. OCR is trained mainly on typed text, so results on handwritten notes are unreliable and usually need heavy correction." },
          { question: "Which format should I convert to — .docx or .doc?", answer: "Choose .docx. It's the modern Word format with better support for styles, images, and tables. The older .doc format only matters if you're working with very old software." },
        ]}
      />
      {children}
    </>
  );
}
