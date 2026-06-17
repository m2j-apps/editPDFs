import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Edit a PDF for Free in 2026 (Complete Guide) | EditPDFs.app",
  description:
    "Edit PDFs free in your browser — add text and images, sign, fill forms, annotate, and reorganize pages. Honest about what free tools can and can't do, with troubleshooting and mobile steps. No signup, no watermark.",
  keywords:
    "how to edit pdf, edit pdf free, free pdf editor, edit pdf online, modify pdf free, edit pdf text free, edit pdf without acrobat, edit pdf in browser",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-edit-pdf-free" },
  openGraph: {
    title: "How to Edit a PDF for Free in 2026 (Complete Guide)",
    description:
      "Everything you can edit in a PDF for free — text, images, signatures, forms, pages — plus what free tools can't do and how to work around it.",
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
        title="How to Edit a PDF for Free in 2026"
        description="Learn how to edit PDF files for free without watermarks, signups, or limits. Step-by-step guide to editing PDFs in your browser with complete privacy."
        slug="how-to-edit-pdf-free"
        datePublished="2026-01-15"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it really free, with no catch?", answer: "Yes. EditPDFs.app is supported by ads rather than subscriptions, so there are no hidden fees, no watermarks, and no daily limits. You don't even create an account." },
          { question: "Can I edit the existing text in a PDF for free?", answer: "You can cover existing text and type new text over it, which works for small fixes. For rewriting whole paragraphs, convert the PDF to Word, edit it there, and export back to PDF — that's the practical free route." },
          { question: "Do I need to install anything?", answer: "No. It runs entirely in your web browser on any device. There's no app, plugin, or download to set up." },
          { question: "Are my files uploaded to a server?", answer: "No. All editing happens locally in your browser, so the file never leaves your device — which is why it's safe to use for sensitive documents." },
          { question: "Will editing change my formatting?", answer: "Additions you make (text, images, signatures) sit on top of the original layout and don't disturb it. Formatting only shifts in edge cases, such as when a non-embedded font is replaced." },
          { question: "Can I edit a scanned PDF?", answer: "You can annotate or add text on top of a scan immediately. To edit the scanned words themselves, run OCR first to create a selectable text layer." },
          { question: "Does it work on mobile?", answer: "Yes — it works on any device with a modern browser, including iPhone, iPad, and Android, with full touch support for signing and drawing." },
        ]}
      />
      {children}
    </>
  );
}
