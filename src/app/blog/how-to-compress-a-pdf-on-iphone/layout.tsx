import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Compress a PDF on iPhone (Free and Fast) | EditPDFs.app",
  description:
    "Learn multiple ways to compress PDF files on iPhone, including browser tools, Files app workflows, and quality tips.",
  keywords:
    "compress pdf on iphone, reduce pdf size iphone, iphone pdf compressor, shrink pdf ios",
  openGraph: {
    title: "How to Compress a PDF on iPhone",
    description:
      "A practical iPhone guide for reducing PDF size without wrecking readability.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
