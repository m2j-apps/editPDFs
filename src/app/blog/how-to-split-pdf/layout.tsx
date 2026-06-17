import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Split a PDF into Multiple Files for Free (2026 Guide) | EditPDFs.app",
  description:
    "Split a PDF for free: extract a single page, pull a page range, break one file into several, or separate every page. Step-by-step, with troubleshooting and mobile tips. No signup, files stay private.",
  keywords:
    "split pdf, separate pdf pages, extract pages from pdf, split pdf free, divide pdf, pdf splitter online, extract page range pdf, split pdf into separate files",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-split-pdf" },
  openGraph: {
    title: "How to Split a PDF into Multiple Files for Free (2026 Guide)",
    description:
      "Extract pages, split by range, or burst a PDF into single pages — free, private, and entirely in your browser.",
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
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to split PDFs?", answer: "Yes, completely. There's no premium tier, no page cap, and no watermark on the files you download." },
          { question: "What's the difference between splitting and deleting pages?", answer: "Splitting saves the pages you select as a new file and leaves the original intact. Deleting removes pages so you're left with the document minus them. Use splitting when you want a copy of part of a file; use deleting when you want to permanently drop pages." },
          { question: "Can I split a password-protected PDF?", answer: "Only if you can open it. Enter the password when prompted and it splits normally. There's no way to split a file you can't unlock — that protection is working as intended." },
          { question: "Will splitting reduce the quality?", answer: "No. Pages are extracted exactly as they are, with no re-encoding or compression, so text stays crisp and images keep their original resolution." },
          { question: "Can I split a PDF on my phone?", answer: "Yes. It runs in any modern mobile browser — Safari on iPhone/iPad, Chrome on Android — with the same page-selection flow as on desktop." },
          { question: "How large a PDF can I split?", answer: "Because processing is local, the practical limit is your device's memory. Most files up to around 100MB split without trouble; very large or image-heavy documents just take a little longer to render." },
          { question: "Does splitting change the original file?", answer: "Never. Splitting always creates new files and leaves your source document exactly as it was, so you can re-split it as many ways as you like." },
          { question: "Can I split several PDFs at once?", answer: "You work with one document at a time. For a batch, process them one after another — each split takes only a few seconds." },
        ]}
      />
      {children}
    </>
  );
}
