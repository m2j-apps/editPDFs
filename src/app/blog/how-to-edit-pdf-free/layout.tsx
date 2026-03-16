import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Edit a PDF for Free in 2026 | EditPDFs.app",
  description: "Learn how to edit PDF files for free without watermarks, signups, or limits. Step-by-step guide to editing PDFs in your browser with complete privacy.",
  keywords: "how to edit pdf, edit pdf free, free pdf editor, edit pdf online, modify pdf free",
  openGraph: {
    title: "How to Edit a PDF for Free in 2026",
    description: "Edit PDF files for free without watermarks or signups. Complete guide.",
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
      />
      <FaqJsonLd
        questions={[
          { question: "Is it really free?", answer: "Yes. EditPDFs.app is supported by ads, not subscriptions. There are no hidden fees, no watermarks, and no limits on usage." },
          { question: "Do I need to create an account?", answer: "No. Just open the site, upload your PDF, make your edits, and download. No signup required." },
          { question: "Is my document safe?", answer: "Yes. Your files are processed entirely in your browser. They're never uploaded to any server." },
          { question: "Does it work on mobile?", answer: "Yes, EditPDFs.app works on any device with a modern web browser." },
        ]}
      />
      {children}
    </>
  );
}
