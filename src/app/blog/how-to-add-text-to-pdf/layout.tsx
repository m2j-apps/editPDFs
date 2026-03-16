import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Add Text to a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to add text anywhere in a PDF document. Insert text boxes, fill forms, add notes and labels. Free online tool, no signup required.",
  keywords: "add text to pdf, insert text in pdf, edit pdf text, type on pdf, write on pdf free, pdf text editor",
  openGraph: {
    title: "How to Add Text to a PDF for Free (2026 Guide)",
    description: "Add text anywhere in your PDF. Free, private, no signup required.",
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
        description="Learn how to add text anywhere in a PDF document. Insert text boxes, fill forms, add notes and labels. Free online tool, no signup required."
        slug="how-to-add-text-to-pdf"
        datePublished="2026-02-12"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to add text to PDFs?", answer: "Yes, completely free. No limits on how much text you add or how many documents you edit." },
          { question: "Will the text be permanent?", answer: "Yes. When you download the PDF, the text is embedded in the document. It will display in any PDF viewer." },
          { question: "Can I add text to a scanned PDF?", answer: "Yes! You can add text on top of any PDF, including scanned documents. The text appears as a layer above the scanned image." },
          { question: "Can I delete text I added?", answer: "Before downloading, you can select and delete any text you've added. After downloading, you'd need to re-upload and edit again." },
          { question: "Does this work on my phone?", answer: "Yes. EditPDFs.app works on any device with a modern browser — phones, tablets, and computers." },
        ]}
      />
      {children}
    </>
  );
}
