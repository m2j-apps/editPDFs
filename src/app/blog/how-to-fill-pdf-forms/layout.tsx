import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Fill Out PDF Forms for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to fill in PDF forms digitally. Complete applications, contracts, and official forms without printing. Free online tool, no signup.",
  keywords: "fill pdf form, fill out pdf, complete pdf form, fillable pdf, pdf form filler free, type in pdf form",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-fill-pdf-forms" },
  openGraph: {
    title: "How to Fill Out PDF Forms for Free (2026 Guide)",
    description: "Complete PDF forms digitally. No printing needed. Free, private, no signup.",
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
        title="How to Fill Out PDF Forms for Free (2026 Guide)"
        description="Learn how to fill in PDF forms digitally. Complete applications, contracts, and official forms without printing. Free online tool, no signup."
        slug="how-to-fill-pdf-forms"
        datePublished="2026-01-30"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to fill PDF forms?", answer: "Yes, completely free with no limits on pages or forms." },
          { question: "Will the form still work after I fill it?", answer: "Yes. The filled form is a valid PDF that can be viewed, printed, or submitted anywhere PDFs are accepted." },
          { question: "Can I fill checkboxes and radio buttons?", answer: "Interactive form elements work as expected. For flat forms, you can add 'X' marks or checkmarks using the text tool." },
          { question: "Is my form data private?", answer: "Absolutely. EditPDFs.app processes everything in your browser. Your form data is never uploaded to any server." },
        ]}
      />
      {children}
    </>
  );
}
