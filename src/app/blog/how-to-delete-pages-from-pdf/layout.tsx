import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Delete Pages from a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to remove unwanted pages from PDF documents. Delete single pages or multiple pages at once. Free online tool, no signup required.",
  keywords: "delete pdf pages, remove pages from pdf, delete page from pdf free, remove pdf page online, pdf page remover",
  openGraph: {
    title: "How to Delete Pages from a PDF for Free (2026 Guide)",
    description: "Remove unwanted pages from any PDF in seconds. Free, private, no signup.",
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
        title="How to Delete Pages from a PDF for Free (2026 Guide)"
        description="Learn how to remove unwanted pages from PDF documents. Delete single pages or multiple pages at once. Free online tool, no signup required."
        slug="how-to-delete-pages-from-pdf"
        datePublished="2026-02-10"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to delete PDF pages?", answer: "Yes, completely free. No limits on how many pages you delete or how many documents you process." },
          { question: "Can I undo a deletion?", answer: "Before downloading, yes. After downloading, you'd need to re-upload the original file. Your original file is never modified." },
          { question: "Can I delete multiple pages at once?", answer: "Yes! Select all the pages you want to remove, then delete them in one action." },
          { question: "Will this affect the quality?", answer: "No. The remaining pages keep their original quality. Deleting pages doesn't compress or re-encode the content." },
          { question: "Does this work on any PDF?", answer: "Yes, including scanned documents. If the PDF isn't password-protected for editing, you can delete pages from it." },
        ]}
      />
      {children}
    </>
  );
}
