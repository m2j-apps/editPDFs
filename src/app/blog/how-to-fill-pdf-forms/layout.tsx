import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Fill Out PDF Forms for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to fill in PDF forms digitally. Complete applications, contracts, and official forms without printing. Free online tool, no signup.",
  keywords: "fill pdf form, fill out pdf, complete pdf form, fillable pdf, pdf form filler free, type in pdf form",
  openGraph: {
    title: "How to Fill Out PDF Forms for Free (2026 Guide)",
    description: "Complete PDF forms digitally. No printing needed. Free, private, no signup.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
