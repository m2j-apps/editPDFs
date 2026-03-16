import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "Best Free PDF Editors Compared (2026) | EditPDFs.app",
  description: "Compare the top free PDF editors in 2026. We analyze features, privacy, limitations, and ease of use to help you choose the best tool for your needs.",
  keywords: "best free pdf editor, free pdf editor comparison, pdf editor review, online pdf editor, pdf editing tools compared",
  alternates: { canonical: "https://editpdfs.app/blog/best-free-pdf-editors-compared" },
  openGraph: {
    title: "Best Free PDF Editors Compared (2026)",
    description: "Find the best free PDF editor for your needs. Complete comparison of features, privacy, and limitations.",
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
        title="Best Free PDF Editors Compared (2026)"
        description="Compare the top free PDF editors in 2026. We analyze features, privacy, limitations, and ease of use to help you choose the best tool for your needs."
        slug="best-free-pdf-editors-compared"
        datePublished="2026-02-20"
      />
      <FaqJsonLd
        questions={[
          { question: "Are free PDF editors safe?", answer: "It depends on the tool. Browser-based editors that don't upload your files (like EditPDFs.app) are safest. Tools that upload to servers should be avoided for sensitive documents." },
          { question: "Why do free PDF editors have limits?", answer: "Most free tiers are designed to upsell you to paid plans. They give you a taste of features, then restrict usage to encourage subscriptions." },
          { question: "Can free PDF editors edit scanned documents?", answer: "Basic editing (annotations, signatures) works on scanned PDFs. Editing the actual text in a scanned document requires OCR, which most free tools don't include." },
          { question: "Do I need to download software?", answer: "Not for online tools. EditPDFs.app, Smallpdf, and ILovePDF work entirely in your browser. Adobe has browser tools but prefers you use their desktop app." },
        ]}
      />
      {children}
    </>
  );
}
