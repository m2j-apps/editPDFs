import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF Free Online - Combine PDF Files | EditPDFs.app",
  description: "Merge multiple PDF files into one for free online. Combine PDFs in any order. No signup required. Your files never leave your browser - 100% private.",
  keywords: "merge pdf, combine pdf, join pdf files, free pdf merger, pdf combiner",
};

export default function MergePDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
