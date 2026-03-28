import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";

export const metadata: Metadata = {
  title: "How to Convert Images to PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Turn photos, screenshots, and images into PDF files instantly. Convert JPG, PNG, HEIC, and WebP to PDF free — no software, no signup.",
  keywords: "convert image to pdf, jpg to pdf, png to pdf, image to pdf free, photo to pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-convert-images-to-pdf" },
  openGraph: {
    title: "How to Convert Images to PDF for Free (2026 Guide)",
    description: "Turn photos and screenshots into PDF files instantly. Free, private, works on any device.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleJsonLd
        title="How to Convert Images to PDF for Free (2026 Guide)"
        description="Turn photos, screenshots, and images into PDF files instantly. Convert JPG, PNG, HEIC, and WebP to PDF free — no software, no signup."
        slug="how-to-convert-images-to-pdf"
        datePublished="2026-03-23"
        author="Jen"
      />
      {children}
    </>
  );
}
