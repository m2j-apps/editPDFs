import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Add Text to a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to add text anywhere in a PDF document. Insert text boxes, fill forms, add notes and labels. Free online tool, no signup required.",
  keywords: "add text to pdf, insert text in pdf, edit pdf text, type on pdf, write on pdf free, pdf text editor",
  openGraph: {
    title: "How to Add Text to a PDF for Free (2026 Guide)",
    description: "Add text anywhere in your PDF. Free, private, no signup required.",
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
