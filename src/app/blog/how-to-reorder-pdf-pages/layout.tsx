import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Reorder PDF Pages for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to rearrange pages in a PDF document. Drag and drop to change page order instantly. Free online tool, no signup required.",
  keywords: "reorder pdf pages, rearrange pdf pages, change pdf page order, move pages in pdf, reorganize pdf free",
  openGraph: {
    title: "How to Reorder PDF Pages for Free (2026 Guide)",
    description: "Rearrange PDF pages with simple drag and drop. Free, private, no signup.",
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
        title="How to Reorder PDF Pages for Free (2026 Guide)"
        description="Learn how to rearrange pages in a PDF document. Drag and drop to change page order instantly. Free online tool, no signup required."
        slug="how-to-reorder-pdf-pages"
        datePublished="2026-02-07"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to reorder PDF pages?", answer: "Yes, completely free with no limits." },
          { question: "Will this change page numbers in the document?", answer: "The pages will be in your new order. If the PDF has printed page numbers as part of the content, those won't change — only the actual page order." },
          { question: "Can I move multiple pages at once?", answer: "Currently you move pages one at a time, but it's quick — just drag and drop." },
          { question: "Does this work on phone?", answer: "Yes! Drag and drop works with touch screens too." },
        ]}
      />
      {children}
    </>
  );
}
