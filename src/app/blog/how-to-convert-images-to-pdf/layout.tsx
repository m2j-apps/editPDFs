import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

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
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Will my image quality be preserved when converting to PDF?", answer: "Yes. When you convert an image to PDF, the image data is embedded in the PDF at its original quality. The PDF format itself doesn't compress or degrade images — though you can optionally compress the PDF afterward if you need a smaller file size." },
          { question: "Is there a limit on how many images I can convert at once?", answer: "Free online tools vary. EditPDFs.app processes files directly in your browser, so there's no server-side limit — though very large batches of high-resolution photos may take a moment to process depending on your device." },
          { question: "Can I convert a screenshot to PDF?", answer: "Absolutely. Screenshots are PNG files, and PNG converts to PDF just like any other image. This is useful for saving web pages, chat logs, or anything else you've captured on screen." },
          { question: "Will the PDF be searchable after converting from an image?", answer: "Not automatically. When you convert an image to PDF, the text in the image is not recognized — it's just pixels. If you need the text to be searchable and selectable, you'll want to run OCR (Optical Character Recognition) on the PDF after conversion. Some PDF tools offer this as an additional step." },
          { question: "How do I convert a PNG with a transparent background to PDF?", answer: "Transparency isn't supported in PDF pages the same way it is in PNG. When you convert a PNG with transparency to PDF, the transparent areas are typically filled with white. If you need transparency preserved, consider whether embedding the PNG inside a PDF page is the right approach for your use case." },
          { question: "How do I control the page order when combining multiple images?", answer: "After you upload several images, you arrange them by dragging each into the position you want before converting — the order you set is the order the pages appear in the finished PDF. If your tool doesn't offer drag reordering, rename the files numerically (01, 02, 03…) first so they upload in sequence." },
          { question: "What if the converted PDF is too large to email?", answer: "High-resolution photos can produce big PDFs. If the file exceeds an email or upload limit, run it through a PDF compressor afterward, or use lower-resolution versions of the images. A handful of phone photos can easily total 20–30 MB before compression." },
          { question: "Is converting images to PDF the same as adding an image to an existing PDF?", answer: "No. This guide turns standalone image files into PDF pages. If you instead want to place a photo or logo onto a PDF you already have, see our separate guide on how to add images to a PDF." },
        ]}
      />
      {children}
    </>
  );
}
