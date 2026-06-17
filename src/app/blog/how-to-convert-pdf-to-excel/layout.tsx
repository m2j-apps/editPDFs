import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Convert PDF to Excel for Free (2026 Guide) | EditPDFs.app",
  description: "Convert PDF tables and data into editable Excel spreadsheets for free. Extract numbers, rows, and columns without retyping — no software needed.",
  keywords: "convert pdf to excel, pdf to xlsx free, pdf to spreadsheet, extract table from pdf, pdf to excel online",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-convert-pdf-to-excel" },
  openGraph: {
    title: "How to Convert PDF to Excel for Free (2026 Guide)",
    description: "Turn PDF tables and data into editable Excel files instantly. Free, private, no signup required.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleJsonLd
        title="How to Convert PDF to Excel for Free (2026 Guide)"
        description="Convert PDF tables and data into editable Excel spreadsheets for free. Extract numbers, rows, and columns without retyping — no software needed."
        slug="how-to-convert-pdf-to-excel"
        datePublished="2026-03-28"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is PDF to Excel conversion accurate?", answer: "For text-based PDFs with clear table structures, accuracy is typically 90–99%. For scanned PDFs or complex layouts, accuracy drops and manual cleanup is usually required. Always verify converted data against the original PDF before using it for important decisions." },
          { question: "Can I convert a multi-page PDF to Excel?", answer: "Yes. Most conversion tools process all pages. Tables spanning multiple pages are usually merged into a single sheet, though you may need to remove repeated header rows." },
          { question: "Does PDF to Excel preserve formulas?", answer: "No. PDFs only contain displayed values, not underlying formulas. If the original Excel file had a formula calculating a total, the PDF shows the calculated number. You'll get the number in your converted Excel file, not the formula." },
          { question: "Can I convert a scanned bank statement to Excel?", answer: "Yes, but accuracy depends on scan quality. The tool needs to run OCR first, then structure the recognized text into table rows. Bank statement formats vary widely, so results range from excellent to requiring significant manual cleanup." },
          { question: "Are my documents safe when converting online?", answer: "With EditPDFs.app, processing happens in your browser — your files are not uploaded to external servers, keeping your documents completely private." },
        ]}
      />
      {children}
    </>
  );
}
