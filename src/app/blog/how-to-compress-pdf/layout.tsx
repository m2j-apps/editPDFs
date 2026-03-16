import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Compress PDF Files for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to reduce PDF file size for free. Compress PDFs without quality loss. No account required, completely private — files never leave your browser.",
  keywords: "compress pdf, reduce pdf size, shrink pdf, compress pdf free, pdf compressor online, make pdf smaller",
  openGraph: {
    title: "How to Compress PDF Files for Free (2026 Guide)",
    description: "Reduce PDF file size in seconds. Free, private, no signup required.",
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
        title="How to Compress PDF Files for Free (2026 Guide)"
        description="Learn how to reduce PDF file size for free. Compress PDFs without quality loss. No account required, completely private — files never leave your browser."
        slug="how-to-compress-pdf"
        datePublished="2026-01-24"
      />
      <FaqJsonLd
        questions={[
          { question: "Will compression reduce quality?", answer: "For most documents, you won't notice any difference. Text stays crisp, and images remain clear. Extreme compression can affect image quality, but our tool uses smart optimization that preserves readability." },
          { question: "Is it really free?", answer: "Yes, completely free with no limits. No premium tier, no file size restrictions, no watermarks. Use it as often as you need." },
          { question: "Can I compress password-protected PDFs?", answer: "If you know the password, yes. You'll need to enter it when you open the file, then you can save a compressed version." },
          { question: "Will my links and bookmarks still work?", answer: "Yes! Compression preserves interactive elements like hyperlinks, bookmarks, and form fields." },
          { question: "Can I compress multiple PDFs at once?", answer: "Process them one at a time for best results. Each file can be opened, optimized, and downloaded individually." },
        ]}
      />
      {children}
    </>
  );
}
