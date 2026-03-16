import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Flatten a PDF (Free Guide) | EditPDFs.app",
  description:
    "Learn what flattening a PDF does, when to use it, and how to create a final non-editable copy that displays correctly across devices.",
  keywords:
    "flatten pdf, how to flatten pdf, make pdf non editable, lock pdf form fields, flatten annotations pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-flatten-pdf" },
  openGraph: {
    title: "How to Flatten a PDF (Step-by-Step)",
    description:
      "Practical guide to flattening PDF forms, signatures, and annotations for cleaner sharing and fewer compatibility problems.",
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
        title="How to Flatten a PDF (Step-by-Step)"
        description="Learn what flattening a PDF does, when to use it, and how to create a final non-editable copy that displays correctly across devices."
        slug="how-to-flatten-pdf"
        datePublished="2026-03-12"
      />
      {children}
    </>
  );
}
