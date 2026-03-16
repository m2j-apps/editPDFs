import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Add Images to a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to insert images, logos, and photos into PDF documents. Add pictures anywhere on any page. Free online tool, no signup required.",
  keywords: "add image to pdf, insert picture in pdf, add logo to pdf, add photo to pdf free, pdf image editor",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-add-images-to-pdf" },
  openGraph: {
    title: "How to Add Images to a PDF for Free (2026 Guide)",
    description: "Insert images, logos, and photos into any PDF. Free, private, no signup.",
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
        title="How to Add Images to a PDF for Free (2026 Guide)"
        description="Learn how to insert images, logos, and photos into PDF documents. Add pictures anywhere on any page. Free online tool, no signup required."
        slug="how-to-add-images-to-pdf"
        datePublished="2026-02-05"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to add images to PDFs?", answer: "Yes, completely free with no limits on images or documents." },
          { question: "Will the image quality be preserved?", answer: "Yes. Images are embedded at their original quality. What you upload is what you get in the PDF." },
          { question: "Can I add multiple images?", answer: "Yes! Add as many images as you need to any pages in your document." },
          { question: "Can I layer images over each other?", answer: "Yes. Images can overlap. Later-added images appear on top of earlier ones." },
          { question: "Does this work on mobile?", answer: "Yes! EditPDFs.app works on any device. You can select images from your phone's photo library." },
        ]}
      />
      {children}
    </>
  );
}
