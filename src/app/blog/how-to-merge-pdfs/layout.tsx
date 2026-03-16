import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Merge PDFs for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to combine multiple PDF files into one document for free. Drag, drop, reorder. No account required, completely private.",
  keywords: "how to merge pdf, combine pdf files, merge pdf free, join pdfs online, pdf combiner, merge multiple pdfs",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-merge-pdfs" },
  openGraph: {
    title: "How to Merge PDFs for Free (2026 Guide)",
    description: "Combine multiple PDF files into one document in seconds. Free, private, no signup required.",
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
        title="How to Merge PDFs for Free (2026 Guide)"
        description="Learn how to combine multiple PDF files into one document for free. Drag, drop, reorder. No account required, completely private."
        slug="how-to-merge-pdfs"
        datePublished="2026-01-18"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to merge PDFs?", answer: "Yes, completely free. EditPDFs.app has no hidden fees, no premium tier, and no limits on how many files you can merge or how often you use it." },
          { question: "How many PDFs can I merge at once?", answer: "There's no hard limit. You can merge as many PDF files as you need. The only practical constraint is your browser's memory, but modern browsers can handle dozens of files without issues." },
          { question: "Will my merged PDF have a watermark?", answer: "No watermarks, ever. Your merged PDF looks exactly as you'd expect — clean and professional." },
          { question: "Do I need to create an account?", answer: "No. Just open the site, upload your PDFs, merge them, and download. No signup required." },
          { question: "Can I merge PDFs on my phone?", answer: "Yes! EditPDFs.app works on any device with a modern browser. The interface adapts to smaller screens, making it easy to merge PDFs on the go." },
        ]}
      />
      {children}
    </>
  );
}
