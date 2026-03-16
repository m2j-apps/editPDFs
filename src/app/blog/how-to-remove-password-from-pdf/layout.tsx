import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Remove a Password from a PDF (If You Know It) | EditPDFs.app",
  description:
    "Remove password protection from a PDF in seconds if you know the current password. Free and private.",
  keywords:
    "remove pdf password, unlock pdf, remove pdf protection, pdf password remover, unprotect pdf",
  openGraph: {
    title: "How to Remove a Password from a PDF (If You Know It)",
    description:
      "Remove password protection from a PDF in seconds if you know the current password. Free and private.",
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
        title="How to Remove a Password from a PDF (If You Know It)"
        description="Remove password protection from a PDF in seconds if you know the current password. Free and private."
        slug="how-to-remove-password-from-pdf"
        datePublished="2026-02-25"
      />
      {children}
    </>
  );
}
