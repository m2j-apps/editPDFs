import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Merge PDF Files Without Software (No Install, No Upload) | EditPDFs.app",
  description:
    "Merge multiple PDFs without installing software and without uploading your files. Step-by-step browser method, plus fixes for wrong order, big files, locked PDFs, and mobile.",
  keywords:
    "merge pdf without software, combine pdf online, merge files in browser, no install pdf merge, merge pdf no upload, combine pdf without acrobat, merge pdf on phone",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-merge-pdf-files-without-software" },
  openGraph: {
    title: "How to Merge PDF Files Without Software (No Install, No Upload)",
    description:
      "Combine PDFs in your browser with nothing to install and no files uploaded. Includes troubleshooting and mobile steps.",
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
        title="How to Merge PDF Files Without Software"
        description="Merge multiple PDF files without installing software and without uploading them. Step-by-step browser method with tips for order, size, and quality."
        slug="how-to-merge-pdf-files-without-software"
        datePublished="2026-03-09"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Do I really not need to install anything?", answer: "Correct. The entire merge happens inside your browser tab. There's nothing to download, no extension to add, and nothing left on your computer afterward — which is why it works even on locked-down work or school machines." },
          { question: "Are my files uploaded to a server?", answer: "Not on EditPDFs.app. Processing runs locally in your browser, so your documents stay on your device. That's the main reason to choose it over tools that merge online but still send your files away to do it." },
          { question: "Is there a limit on how many PDFs I can combine?", answer: "You can merge multiple files in a single session, not just two. Very large jobs are limited only by your device's memory, since the work happens locally rather than on a capped free server tier." },
          { question: "Will merging reduce the quality of my pages?", answer: "No. Merging combines pages as they are; it doesn't recompress them. Quality only changes if you separately choose to compress the file afterward to shrink its size." },
          { question: "Can I merge PDFs entirely on my phone?", answer: "Yes. Mobile Safari and Chrome handle browser merging well for everyday files. Pull pages from your Files app, iCloud, or Google Drive, arrange them, and download the result back to your phone." },
          { question: "Do I need to create an account?", answer: "No. There's no signup, no email required, and no watermark on the merged file — you upload, arrange, and download." },
          { question: "What's the difference between this and your regular merge guide?", answer: "This article focuses on doing it with zero installed software and zero uploads. If you just want the quickest walkthrough of combining files, see the how to merge PDFs guide." },
        ]}
      />
      {children}
    </>
  );
}
