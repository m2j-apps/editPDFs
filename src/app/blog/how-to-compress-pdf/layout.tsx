import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Compress a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Compress PDF files for free to fit email and upload limits. Step-by-step, how to choose a compression level, troubleshooting, and mobile — all private, files never leave your browser.",
  keywords:
    "compress pdf, reduce pdf size, shrink pdf, compress pdf free, pdf compressor online, make pdf smaller, compress pdf for email, compress pdf without losing quality",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-compress-pdf" },
  openGraph: {
    title: "How to Compress a PDF for Free (2026 Guide)",
    description: "Shrink PDF file size in seconds to clear email and upload limits. Free, private, no signup.",
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
        title="How to Compress a PDF for Free (2026 Guide)"
        description="Compress PDF files for free to fit email and upload limits. Step-by-step, choosing a compression level, troubleshooting, and mobile — all private, files never leave your browser."
        slug="how-to-compress-pdf"
        datePublished="2026-01-24"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Will compression reduce quality?", answer: "For everyday documents you won't notice a difference — text stays crisp and images look fine on screen. Quality only suffers if you compress aggressively and then print image-heavy pages, which is why keeping the original is worthwhile." },
          { question: "Is it really free?", answer: "Yes — completely free with no file-size limits, no premium tier, and no watermarks. Compress as many PDFs as you like." },
          { question: "Are my files uploaded to a server?", answer: "No. All compression happens locally in your browser, so your file never leaves your device — which matters for the sensitive documents people most often need to shrink." },
          { question: "Can I compress a password-protected PDF?", answer: "Yes, if you know the password. Enter it when you open the file, then compress and download a smaller copy." },
          { question: "Will my links and bookmarks survive?", answer: "Yes. Compression preserves interactive elements like hyperlinks, bookmarks, and form fields — it only optimizes how the file is stored." },
          { question: "Can I compress several PDFs at once?", answer: "Process them one at a time for the best control over each result. Open, compress, and download each file individually." },
          { question: "Does compressing change the page count or layout?", answer: "No. Your pages, text, and layout stay exactly the same — only the file's storage size goes down. To remove pages, do that separately before compressing." },
        ]}
      />
      {children}
    </>
  );
}
