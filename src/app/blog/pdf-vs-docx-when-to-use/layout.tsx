import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "PDF vs Word (DOCX): When to Use Each Format (2026 Guide) | EditPDFs.app",
  description:
    "PDF or Word? A clear decision guide: head-to-head comparison, when to use each, real-world examples (resumes, contracts, invoices), conversion pitfalls, and FAQs.",
  keywords:
    "pdf vs word, pdf vs docx, when to use pdf, pdf or word document, file format comparison, should i send pdf or word, pdf or word resume",
  alternates: { canonical: "https://editpdfs.app/blog/pdf-vs-docx-when-to-use" },
  openGraph: {
    title: "PDF vs Word (DOCX): When to Use Each Format",
    description:
      "A plain-English decision guide for choosing PDF or Word — comparison table, real examples, and conversion pitfalls.",
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
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is PDF or Word more professional?", answer: "For a finished document, PDF reads as more polished — it signals the work is complete and not meant to be altered. Word is the right look while something is still a working draft." },
          { question: "Can everyone open a PDF?", answer: "Effectively yes. Every modern browser, phone, and operating system opens PDFs with no extra software, which is part of why they're the default for sharing." },
          { question: "Will converting Word to PDF change how it looks?", answer: "No — that's the point of the conversion. Word-to-PDF locks in your current layout so it displays and prints the same everywhere." },
          { question: "Why does my Word document look different on someone else's computer?", answer: "DOCX relies on the fonts and software installed on the viewer's machine. If they're missing a font or using a different Word version, spacing and page breaks can shift. Exporting to PDF removes that variability." },
          { question: "Should I send a resume as PDF or Word?", answer: "Default to PDF so your formatting is guaranteed. Only send DOCX if the application explicitly asks for it, since some automated screening systems parse Word more reliably." },
          { question: "Can I edit a PDF without converting it to Word?", answer: "Yes. You can add or change text, insert images, fill forms, sign, and rearrange pages directly in a PDF — for most edits that's quicker and cleaner than converting back and forth." },
          { question: "Which format is better for long-term archiving?", answer: "PDF — especially because it preserves exact appearance over time and doesn't depend on a future version of Word rendering it correctly. It's the standard for records that must stay unchanged." },
        ]}
      />
      {children}
    </>
  );
}
