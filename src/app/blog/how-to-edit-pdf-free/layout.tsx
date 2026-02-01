import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Edit a PDF for Free in 2026 | EditPDFs.app",
  description: "Learn how to edit PDF files for free without watermarks, signups, or limits. Step-by-step guide to editing PDFs in your browser with complete privacy.",
  keywords: "how to edit pdf, edit pdf free, free pdf editor, edit pdf online, modify pdf free",
  openGraph: {
    title: "How to Edit a PDF for Free in 2026",
    description: "Edit PDF files for free without watermarks or signups. Complete guide.",
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
