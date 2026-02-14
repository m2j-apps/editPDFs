import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Add Images to a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to insert images, logos, and photos into PDF documents. Add pictures anywhere on any page. Free online tool, no signup required.",
  keywords: "add image to pdf, insert picture in pdf, add logo to pdf, add photo to pdf free, pdf image editor",
  openGraph: {
    title: "How to Add Images to a PDF for Free (2026 Guide)",
    description: "Insert images, logos, and photos into any PDF. Free, private, no signup.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
