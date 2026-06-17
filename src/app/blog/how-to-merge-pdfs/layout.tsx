import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Merge PDFs for Free (2026 Guide) | EditPDFs.app",
  description:
    "Combine multiple PDF files into one document for free. Step-by-step merging, handling mismatched page sizes, troubleshooting, and mobile — no account, fully private.",
  keywords:
    "how to merge pdf, combine pdf files, merge pdf free, join pdfs online, pdf combiner, merge multiple pdfs, combine scanned pages",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-merge-pdfs" },
  openGraph: {
    title: "How to Merge PDFs for Free (2026 Guide)",
    description:
      "Combine multiple PDF files into one document in seconds. Reorder pages, handle mismatched files, stay private. No signup required.",
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
        description="Combine multiple PDF files into one document for free. Step-by-step merging, handling mismatched page sizes, troubleshooting, and mobile — no account, fully private."
        slug="how-to-merge-pdfs"
        datePublished="2026-01-18"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to merge PDFs?", answer: "Yes, completely free. There's no hidden fee, no premium tier, and no cap on how many files you merge or how often you do it." },
          { question: "How many PDFs can I merge at once?", answer: "There's no fixed limit. The practical ceiling is your device's memory, since processing happens locally — but modern browsers handle dozens of files comfortably." },
          { question: "Can I reorder pages before merging?", answer: "Yes. The page panel lets you drag any page anywhere, so you can interleave documents or move a single page — you're not limited to stacking whole files end to end." },
          { question: "Will merging reduce the quality of my pages?", answer: "No. Pages are copied as-is with no re-compression, so text stays sharp and images keep their original resolution." },
          { question: "Can I merge a password-protected PDF?", answer: "Only after it's unlocked. Enter the password when prompted (or remove it first), then include the file in your merge like any other." },
          { question: "Will my merged PDF have a watermark?", answer: "No watermarks, ever. The merged file looks clean and professional, exactly as you arranged it." },
          { question: "Do I need an account?", answer: "No signup required. Open the site, add your PDFs, merge, and download." },
          { question: "Can I merge PDFs on my phone?", answer: "Yes. The editor works in any modern mobile browser and adapts to smaller screens, so you can merge files from your phone or tablet without an app." },
        ]}
      />
      {children}
    </>
  );
}
