import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Delete Pages from a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Remove single, ranged, or scattered pages from a PDF in seconds. Includes troubleshooting, redaction vs deletion, and mobile steps. Free, private, no signup.",
  keywords: "delete pdf pages, remove pages from pdf, delete page from pdf free, remove pdf page online, pdf page remover, delete multiple pdf pages, remove blank pages pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-delete-pages-from-pdf" },
  openGraph: {
    title: "How to Delete Pages from a PDF for Free (2026 Guide)",
    description: "Remove unwanted pages from any PDF in seconds — single, ranged, or scattered. Free, private, no signup.",
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
        description="Learn how to remove unwanted pages from PDF documents — single, ranged, or scattered. Free online tool, no signup required."
        slug="how-to-delete-pages-from-pdf"
        datePublished="2026-02-10"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to delete PDF pages?", answer: "Yes, completely free. There's no cap on how many pages you remove or how many documents you process, and no signup or watermark." },
          { question: "Can I undo a deletion?", answer: "Before you export, yes — nothing is committed until you download. After downloading, you'd re-upload the original, which is never modified, and redo the selection." },
          { question: "Can I delete several pages at once?", answer: "Yes, and you should when removing scattered pages. Mark every page you want gone, then delete in a single action so the page numbers you selected don't shift mid-edit." },
          { question: "Will deleting pages reduce the quality of the rest?", answer: "No. The remaining pages are untouched — deleting doesn't recompress or re-encode anything, so text stays sharp and images keep their resolution." },
          { question: "Does removing pages also shrink the file?", answer: "Usually a little, since there's less content — but if you need a meaningfully smaller file, pair it with compression." },
          { question: "Does this fully remove sensitive information?", answer: "If the sensitive content lived only on the deleted page, yes. If it's on a page you're keeping, redact it instead; and remember hidden metadata isn't stored on any page, so remove that separately." },
          { question: "Can I delete pages from a scanned PDF?", answer: "Yes. Deleting works at the page level regardless of whether pages are scanned images or digital text, as long as the file isn't locked against editing." },
        ]}
      />
      {children}
    </>
  );
}
