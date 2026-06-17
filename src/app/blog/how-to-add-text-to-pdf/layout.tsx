import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Add Text to a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Place new text anywhere on a PDF in your browser — fill flat forms, add notes, dates, and labels. Covers formatting, alignment fixes, scanned files, and mobile. Free, no signup.",
  keywords:
    "add text to pdf, insert text in pdf, type on pdf, write on pdf free, pdf text editor, add text to scanned pdf, put text on pdf form",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-add-text-to-pdf" },
  openGraph: {
    title: "How to Add Text to a PDF for Free (2026 Guide)",
    description:
      "Add text anywhere on a PDF — forms, notes, labels, dates. Free, private, no signup, works on any device.",
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
        title="How to Add Text to a PDF for Free (2026 Guide)"
        description="Place new text anywhere on a PDF in your browser — fill flat forms, add notes, dates, and labels. Free online tool, no signup required."
        slug="how-to-add-text-to-pdf"
        datePublished="2026-02-12"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to add text to a PDF?", answer: "Yes — completely free on EditPDFs.app, with no signup, no watermark, and no limit on how much text you add or how many documents you work on." },
          { question: "Will the text be permanent once I download?", answer: "Yes. On export the text is embedded into the PDF and renders the same in any viewer. To change it later you'd re-upload the file and edit again." },
          { question: "Can I add text to a scanned PDF?", answer: "Yes. Overlay text works on scans because it sits in a layer above the image. You can't edit the words inside the scan itself, but you can write anywhere on top of it." },
          { question: "Can I edit existing text in the PDF?", answer: "Adding text places new content on top; it doesn't change words already in the document. Editing existing text depends on how the PDF was made and isn't possible on scanned files without OCR." },
          { question: "Can I delete text I added?", answer: "Before exporting, select the text box and delete it. After downloading, re-upload the file and remove the box to make further changes." },
          { question: "How do I make my text match the form?", answer: "Pick the closest standard font, match the size of the surrounding text, keep the color black, and zoom in to align the baseline with the form line. Small adjustments make it look native." },
          { question: "Does it work on my phone?", answer: "Yes. It runs in any modern mobile browser — Safari on iPhone/iPad, Chrome on Android. Pinch to zoom for precise placement in tight spaces." },
        ]}
      />
      {children}
    </>
  );
}
