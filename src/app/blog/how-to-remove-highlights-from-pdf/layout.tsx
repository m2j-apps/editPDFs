import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Remove Highlights from a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to remove highlights from any PDF document for free. Delete annotation markup, clean up review marks, and save a polished PDF.",
  keywords: "remove highlights from pdf, delete pdf highlights, clear pdf annotations, remove markup pdf, clean up pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-remove-highlights-from-pdf" },
  openGraph: {
    title: "How to Remove Highlights from a PDF for Free (2026 Guide)",
    description: "Remove highlights from any PDF in seconds. Free, private, no signup required.",
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
        title="How to Remove Highlights from a PDF for Free (2026 Guide)"
        description="Learn how to remove highlights from any PDF document for free. Delete annotation markup, clean up review marks, and save a polished PDF."
        slug="how-to-remove-highlights-from-pdf"
        datePublished="2026-04-13"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Does removing highlights delete text?", answer: "No. Removing a normal PDF highlight annotation does not delete the underlying text." },
          { question: "Why can I select the highlight but not delete it?", answer: "The file may be locked, flattened, or opened in a viewer that does not support editing. Try a full PDF editor." },
          { question: "Can other people still see old highlights after I remove them?", answer: "Once you save and share the updated file, removed highlights should no longer appear. Always re-open the saved PDF and verify before sending." },
          { question: "Should I remove highlights or redact text?", answer: "Use highlight removal for cleanup. Use redaction when you need to permanently remove sensitive content." },
        ]}
      />
      {children}
    </>
  );
}
