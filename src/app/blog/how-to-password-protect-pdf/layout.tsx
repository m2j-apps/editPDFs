import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Password Protect a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to add password protection to your PDF files for free. Secure sensitive documents with encryption. No account required, completely private.",
  keywords: "password protect pdf, secure pdf, encrypt pdf, pdf password, lock pdf, protect pdf file, add password to pdf free",
  openGraph: {
    title: "How to Password Protect a PDF for Free (2026 Guide)",
    description: "Secure your PDF with password protection in seconds. Free, private, no signup required.",
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
