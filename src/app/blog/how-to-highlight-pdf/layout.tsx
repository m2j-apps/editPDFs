import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Highlight Text in a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to highlight text in any PDF document for free. Choose colors, mark key sections, and save your highlighted PDF. No account required.",
  keywords: "how to highlight pdf, highlight text in pdf, pdf highlighter free, annotate pdf, mark up pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-highlight-pdf" },
  openGraph: {
    title: "How to Highlight Text in a PDF for Free (2026 Guide)",
    description: "Highlight text in any PDF in seconds. Free, private, no signup required.",
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
        title="How to Highlight Text in a PDF for Free (2026 Guide)"
        description="Learn how to highlight text in any PDF document for free. Choose colors, mark key sections, and save your highlighted PDF. No account required."
        slug="how-to-highlight-pdf"
        datePublished="2026-04-06"
      />
      <FaqJsonLd
        questions={[
          { question: "Will other people see my highlights?", answer: "Yes. Once saved, highlights are embedded in the PDF and visible to anyone who opens the file." },
          { question: "Can I highlight a password-protected PDF?", answer: "Only if you have permission to edit it. If you know the password and the file allows changes, unlock it first." },
          { question: "Does highlighting reduce PDF quality?", answer: "No. Highlighting adds annotation layers and does not reduce the original text or image quality." },
          { question: "Should I use highlights or comments?", answer: "Use highlights for fast visual marking, and comments when context or explanation is needed. Together, they work best." },
        ]}
      />
      {children}
    </>
  );
}
