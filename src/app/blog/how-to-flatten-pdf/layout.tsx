import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Flatten a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Learn what flattening a PDF does, when to use it, and how to lock form fields, signatures, and annotations into a final non-editable copy that displays correctly everywhere. Free and private.",
  keywords:
    "flatten pdf, how to flatten pdf, make pdf non editable, lock pdf form fields, flatten annotations pdf, flatten pdf signature, flatten pdf form, finalize pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-flatten-pdf" },
  openGraph: {
    title: "How to Flatten a PDF for Free (2026 Guide)",
    description:
      "Practical guide to flattening PDF forms, signatures, and annotations for consistent display and fewer compatibility problems.",
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
        title="How to Flatten a PDF (Step-by-Step)"
        description="Learn what flattening a PDF does, when to use it, and how to create a final non-editable copy that displays correctly across devices."
        slug="how-to-flatten-pdf"
        datePublished="2026-03-12"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Can I un-flatten a PDF to make it editable again?", answer: "No. Once the interactive layer is merged into the page, those fields are gone for good. That's why you should always keep an editable copy of the original before flattening." },
          { question: "Is flattening a PDF free?", answer: "Yes. On EditPDFs.app it's completely free with no signup or watermark, and the whole process runs in your browser." },
          { question: "Will flattening change how my document looks?", answer: "It shouldn't change the appearance — that's the point. It locks in the look you see so it displays the same in every viewer. The only visible difference is that fields and annotations are no longer clickable." },
          { question: "Does flattening make a PDF secure or password-protected?", answer: "No. Flattening prevents content edits but doesn't restrict who can open the file. For access control, add a password after flattening." },
          { question: "Why do my filled-in fields show as blank to other people?", answer: "Because their PDF viewer renders the interactive layer differently than yours. Flattening solves this permanently by drawing the values directly onto the page so everyone sees the same thing." },
          { question: "Do my files get uploaded to a server?", answer: "Not on EditPDFs.app. Flattening is processed locally in your browser, so signed contracts and completed forms stay on your device." },
          { question: "Should I flatten before or after signing?", answer: "After. Add every signature and form value first, verify them, then flatten as the final step so nothing can shift or be altered afterward." },
          { question: "Does flattening remove comments and highlights?", answer: "It doesn't remove them — it makes them permanent. Highlights, comments, and stamps become part of the page and can no longer be deleted or edited. If you want them gone, remove them before flattening." },
        ]}
      />
      {children}
    </>
  );
}
