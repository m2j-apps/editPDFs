import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Redact a PDF: Remove Sensitive Information Safely | EditPDFs.app",
  description: "Learn how to permanently redact text, images, and personal data from a PDF. Protect sensitive information before sharing — free, no software needed.",
  keywords: "redact pdf, pdf redaction, remove sensitive information pdf, black out text pdf, pdf redact free",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-redact-pdf" },
  openGraph: {
    title: "How to Redact a PDF: Remove Sensitive Information Safely",
    description: "Permanently black out text and images in PDFs before sharing. Free, private, browser-based.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleJsonLd
        title="How to Redact a PDF: Remove Sensitive Information Safely"
        description="Learn how to permanently redact text, images, and personal data from a PDF. Protect sensitive information before sharing — free, no software needed."
        slug="how-to-redact-pdf"
        datePublished="2026-03-28"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Why isn't drawing a black box the same as redacting?", answer: "A black box drawn with annotation or drawing tools sits on top of the page — the original text or image stays in the file underneath it. Anyone can delete the box, recolor it, or select and copy the text beneath. True redaction permanently deletes the underlying data, so there's nothing left to recover." },
          { question: "Can redaction be reversed?", answer: "True redaction cannot be reversed — the underlying data is permanently deleted. This is why you should always work from a copy of the original document, keeping the unredacted version safely stored if you need to reference it later." },
          { question: "Does redacting a PDF change its file size?", answer: "Slightly. Removing content typically reduces file size marginally, though the black redaction bars add a small amount of data. The change is usually negligible." },
          { question: "Can I redact a scanned PDF?", answer: "Yes. For scanned PDFs (which are image-based), redaction removes the image pixels in the marked areas. The process is the same — use the redaction tool to mark and apply." },
          { question: "How do I redact multiple occurrences of the same information?", answer: "Some redaction tools let you search for text and redact all instances simultaneously — for example, finding and redacting every occurrence of a specific social security number across a multi-page document. This is much faster than manually finding each occurrence." },
          { question: "Is it legal to share a document after redaction?", answer: "Redaction makes sensitive information invisible, but the legality of sharing a document depends on applicable laws and agreements, not just the technical redaction. Consult a lawyer if you're unsure about what must be redacted and whether a document can be shared after redaction." },
          { question: "Should I remove metadata after redacting?", answer: "Yes — redaction removes visible content, but a PDF can still carry hidden metadata like author name, creation software, and revision history. For a truly private document, remove the metadata as a separate step after redacting." },
        ]}
      />
      {children}
    </>
  );
}
