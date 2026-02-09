import type { Metadata } from "next";

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
  return children;
}
