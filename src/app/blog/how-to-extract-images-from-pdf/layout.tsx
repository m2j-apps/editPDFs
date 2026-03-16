import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Extract Images from a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Learn how to extract images from PDF files online for free. Save photos, graphics, and diagrams from PDFs in their original quality without installing software.",
  keywords:
    "extract images from pdf, pdf image extractor, save images from pdf, get images from pdf, pdf to images free",
  openGraph: {
    title: "How to Extract Images from a PDF for Free (2026 Guide)",
    description:
      "Learn how to extract images from PDF files online for free. Save photos, graphics, and diagrams from PDFs in their original quality without installing software.",
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
        title="How to Extract Images from a PDF for Free (2026 Guide)"
        description="Learn how to extract images from PDF files online for free. Save photos, graphics, and diagrams from PDFs in their original quality without installing software."
        slug="how-to-extract-images-from-pdf"
        datePublished="2026-03-16"
      />
      <FaqJsonLd
        questions={[
          {
            question: "Will extracting images reduce their quality?",
            answer:
              "No, extracting images from a PDF preserves the original quality of the images as they were embedded in the document. However, if the original PDF used compressed or low-resolution images, the extracted images will reflect that quality.",
          },
          {
            question:
              "Can I extract images from protected or password-protected PDFs?",
            answer:
              "If you know the password, you'll need to enter it first to unlock the PDF before extracting images. If you don't know the password, you won't be able to access the PDF's contents, including its images.",
          },
          {
            question: "What image formats can I extract?",
            answer:
              "Most PDF image extractors support common formats including PNG, JPEG, and WebP. Some tools let you choose the format and quality level for the extracted images.",
          },
          {
            question: "Are there limits on how many images I can extract?",
            answer:
              "With browser-based tools like those on EditPDFs.app, there are no limits on the number of images you can extract or the size of the PDF files you can process.",
          },
        ]}
      />
      {children}
    </>
  );
}
