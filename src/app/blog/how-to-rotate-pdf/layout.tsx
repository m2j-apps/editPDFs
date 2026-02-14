import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Rotate PDF Pages for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to rotate PDF pages 90 or 180 degrees. Fix sideways or upside-down pages instantly. Free online tool, no signup required.",
  keywords: "rotate pdf, rotate pdf pages, fix sideways pdf, turn pdf pages, rotate pdf 90 degrees, rotate pdf free online",
  openGraph: {
    title: "How to Rotate PDF Pages for Free (2026 Guide)",
    description: "Rotate PDF pages instantly. Fix sideways or upside-down pages in seconds. Free, no signup.",
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
