import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Tips & Tutorials Blog | EditPDFs.app",
  description: "Learn how to edit, sign, merge, split, and compress PDFs with free tutorials and guides. Tips for working with PDF documents.",
  keywords: "pdf tutorial, how to edit pdf, pdf tips, pdf guide, free pdf editor tutorial",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
