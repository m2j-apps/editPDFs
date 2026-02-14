import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Delete Pages from a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to remove unwanted pages from PDF documents. Delete single pages or multiple pages at once. Free online tool, no signup required.",
  keywords: "delete pdf pages, remove pages from pdf, delete page from pdf free, remove pdf page online, pdf page remover",
  openGraph: {
    title: "How to Delete Pages from a PDF for Free (2026 Guide)",
    description: "Remove unwanted pages from any PDF in seconds. Free, private, no signup.",
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
