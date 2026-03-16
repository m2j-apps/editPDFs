import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Password Protect a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to add password protection to your PDF files for free. Secure sensitive documents with encryption. No account required, completely private.",
  keywords: "password protect pdf, secure pdf, encrypt pdf, pdf password, lock pdf, protect pdf file, add password to pdf free",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-password-protect-pdf" },
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
  return (
    <>
      <ArticleJsonLd
        title="How to Password Protect a PDF for Free (2026 Guide)"
        description="Learn how to add password protection to your PDF files for free. Secure sensitive documents with encryption. No account required, completely private."
        slug="how-to-password-protect-pdf"
        datePublished="2026-02-22"
        author="Jen"
      />
      {children}
    </>
  );
}
