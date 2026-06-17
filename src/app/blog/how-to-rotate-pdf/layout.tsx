import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Rotate PDF Pages for Free (2026 Guide) | EditPDFs.app",
  description: "Rotate PDF pages 90, 180, or 270 degrees and save the change permanently into the file. Fix sideways scans and upside-down pages on any device — free, private, no signup.",
  keywords: "rotate pdf, rotate pdf pages, fix sideways pdf, turn pdf pages, rotate pdf 90 degrees, rotate pdf permanently, rotate scanned pdf, rotate pdf free online",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-rotate-pdf" },
  openGraph: {
    title: "How to Rotate PDF Pages for Free (2026 Guide)",
    description: "Rotate PDF pages and save it into the file so it displays correctly everywhere. Fix sideways or upside-down pages in seconds. Free, no signup.",
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
        title="How to Rotate PDF Pages for Free (2026 Guide)"
        description="Learn how to rotate PDF pages 90 or 180 degrees. Fix sideways or upside-down pages instantly. Free online tool, no signup required."
        slug="how-to-rotate-pdf"
        datePublished="2026-02-14"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Will rotating reduce the quality of my PDF?", answer: "No. Rotation just records the angle at which each page should display — the underlying text and images are untouched and uncompressed, so quality is identical." },
          { question: "What's the difference between rotating the view and rotating the file?", answer: "Rotating the view only spins the page on your screen and is forgotten when you close the reader. Rotating the file saves the new orientation permanently, so everyone who opens it sees it correctly." },
          { question: "Can I rotate just one page in a long document?", answer: "Yes. Rotate any individual page and leave the others as they are — ideal for a single landscape table inside a portrait report." },
          { question: "Does rotation work on scanned PDFs?", answer: "Absolutely. A scanned page is an image inside the PDF, and rotation displays that image at the right angle just like any other page." },
          { question: "Can I undo a rotation?", answer: "Before you download, just rotate the page back to where it started. After downloading, re-upload the file and rotate the opposite direction to reverse it." },
          { question: "Is rotating PDF pages free?", answer: "Yes — completely free on EditPDFs.app, with no page limits, no watermarks, and no signup." },
          { question: "Does it work on a phone?", answer: "Yes. It runs in your mobile browser and the layout adapts to the screen, so you can fix a sideways scan straight from your phone." },
        ]}
      />
      {children}
    </>
  );
}
