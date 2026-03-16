import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Split a PDF into Multiple Files for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to split PDF documents into separate files. Extract specific pages, split by page ranges, or separate every page. Free, no signup required.",
  keywords: "split pdf, separate pdf pages, extract pages from pdf, split pdf free, divide pdf, pdf splitter online",
  openGraph: {
    title: "How to Split a PDF into Multiple Files for Free (2026 Guide)",
    description: "Split PDF documents into separate files in seconds. Free, private, no signup required.",
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
        title="How to Split a PDF into Multiple Files for Free (2026 Guide)"
        description="Learn how to split PDF documents into separate files. Extract specific pages, split by page ranges, or separate every page. Free, no signup required."
        slug="how-to-split-pdf"
        datePublished="2026-02-16"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to split PDFs?", answer: "Yes, completely free. EditPDFs.app has no premium tier, no page limits, and no watermarks on your output files." },
          { question: "Can I split a password-protected PDF?", answer: "You'll need to know the password to open the PDF first. Once it's open in the editor, you can split it normally. We can't bypass PDF security." },
          { question: "Will splitting affect the quality?", answer: "No. Splitting extracts pages exactly as they are — there's no re-encoding or compression. Your split PDFs maintain the original quality." },
          { question: "Can I split a PDF on my phone?", answer: "Yes! EditPDFs.app works on any device with a modern browser — phones, tablets, laptops, and desktops." },
          { question: "How large can the PDF be?", answer: "Since processing happens in your browser, the limit depends on your device's memory. Most devices handle PDFs up to 100MB without issues. Very large files may be slower to process." },
          { question: "Can I split multiple PDFs at once?", answer: "Currently, you work with one PDF at a time. For multiple documents, simply process them one after another — it's quick and easy." },
        ]}
      />
      {children}
    </>
  );
}
