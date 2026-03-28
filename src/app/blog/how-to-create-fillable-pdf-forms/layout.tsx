import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Create a Fillable PDF Form for Free | EditPDFs.app",
  description: "Learn how to create fillable PDF forms with text fields, checkboxes, and dropdowns — completely free. No Adobe Acrobat needed.",
  keywords: "create fillable pdf form, fillable pdf free, pdf form creator, interactive pdf form, fillable form pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-create-fillable-pdf-forms" },
  openGraph: {
    title: "How to Create a Fillable PDF Form for Free",
    description: "Build interactive PDF forms with text fields, checkboxes, and more — free, no software needed.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleJsonLd
        title="How to Create a Fillable PDF Form for Free"
        description="Learn how to create fillable PDF forms with text fields, checkboxes, and dropdowns — completely free. No Adobe Acrobat needed."
        slug="how-to-create-fillable-pdf-forms"
        datePublished="2026-03-28"
        author="Mike"
      />
      {children}
    </>
  );
}
