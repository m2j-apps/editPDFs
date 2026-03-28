import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

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
        author="Jen"
      />
      {children}
    </>
  );
}
