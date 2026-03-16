import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Reduce PDF File Size Without Losing Quality (2026 Guide) | EditPDFs.app",
  description: "Learn how to reduce PDF file size without losing quality. 5 proven tips to shrink large PDFs for email, web uploads, and sharing. Free, private, no signup.",
  keywords: "reduce pdf file size, reduce pdf size without losing quality, make pdf smaller, shrink pdf, compress pdf without quality loss, pdf too large",
  openGraph: {
    title: "How to Reduce PDF File Size Without Losing Quality (2026 Guide)",
    description: "Shrink large PDFs without losing quality. Free, private, no signup required.",
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
        title="How to Reduce PDF File Size Without Losing Quality (2026 Guide)"
        description="Learn how to reduce PDF file size without losing quality. 5 proven tips to shrink large PDFs for email, web uploads, and sharing. Free, private, no signup."
        slug="how-to-reduce-pdf-file-size"
        datePublished="2026-03-09"
      />
      {children}
    </>
  );
}
