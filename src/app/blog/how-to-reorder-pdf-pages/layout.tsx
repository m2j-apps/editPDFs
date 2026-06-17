import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Reorder PDF Pages for Free (2026 Guide) | EditPDFs.app",
  description:
    "Rearrange pages in a PDF with drag and drop. Covers long documents, moving blocks of pages, fixing scans, printed page numbers, troubleshooting, and mobile — free and private.",
  keywords:
    "reorder pdf pages, rearrange pdf pages, change pdf page order, move pages in pdf, reorganize pdf free, sort pdf pages, fix pdf page order",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-reorder-pdf-pages" },
  openGraph: {
    title: "How to Reorder PDF Pages for Free (2026 Guide)",
    description:
      "Rearrange PDF pages with simple drag and drop. Step-by-step, plus tips for long documents, moving blocks of pages, and mobile.",
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
        title="How to Reorder PDF Pages for Free (2026 Guide)"
        description="Learn how to rearrange pages in a PDF document. Drag and drop to change page order instantly. Free online tool, no signup required."
        slug="how-to-reorder-pdf-pages"
        datePublished="2026-02-07"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to reorder PDF pages?", answer: "Yes. Reordering on EditPDFs.app is completely free with no signup, no watermark on the output, and no cap on the number of pages or files you can work with." },
          { question: "Does reordering change the contents of my pages?", answer: "No. Only the sequence changes. Every page keeps its exact text, images, and formatting — you're rearranging pages, not editing what's on them." },
          { question: "Will the printed page numbers update automatically?", answer: "Only the underlying page order updates. If page numbers are printed into the content itself, they stay with their page and may look out of sequence after a reshuffle, so you may want to redo them." },
          { question: "Can I move several pages at once?", answer: "You move pages individually, which is quick with drag-and-drop. To relocate a block, drag its pages one by one in reverse order so they settle into place without disturbing your target spot." },
          { question: "Does this work on a phone or tablet?", answer: "Yes. Touch dragging works in Safari on iPhone and iPad and in Chrome on Android. Rotating to landscape gives you more room and makes precise drops easier." },
          { question: "Are my files uploaded anywhere?", answer: "No. All reordering happens in your browser on your own device, so nothing is uploaded to a server — ideal for sensitive or confidential documents." },
          { question: "What if I make a mistake while rearranging?", answer: "Just keep dragging until the order is right — nothing is final until you export. And because the download is a new copy, your original file stays intact if you'd rather begin again." },
          { question: "Can I reorder a scanned PDF?", answer: "Absolutely — reordering works on scanned pages just like any other PDF, since it operates on whole pages rather than their contents. It's one of the fastest ways to fix pages that a scanner captured out of sequence." },
        ]}
      />
      {children}
    </>
  );
}
