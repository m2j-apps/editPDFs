import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Sign a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to add your signature to any PDF document for free. Draw, type, or upload your signature. No account required, completely private.",
  keywords: "how to sign pdf, sign pdf free, add signature to pdf, digital signature pdf, sign documents online free, esign pdf",
  openGraph: {
    title: "How to Sign a PDF for Free (2026 Guide)",
    description: "Add your signature to any PDF in seconds. Free, private, no signup required.",
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
        title="How to Sign a PDF for Free (2026 Guide)"
        description="Learn how to add your signature to any PDF document for free. Draw, type, or upload your signature. No account required, completely private."
        slug="how-to-sign-pdf"
        datePublished="2026-01-21"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to sign PDFs?", answer: "Yes, completely free. EditPDFs.app has no hidden fees, no premium tier, and no limits on how many documents you can sign." },
          { question: "Do I need to create an account?", answer: "No. Just open the site, upload your PDF, sign it, and download. No signup required." },
          { question: "Will there be a watermark on my signed PDF?", answer: "No watermarks. Your signed PDF looks exactly like you'd expect — clean and professional." },
          { question: "Can I sign on my phone?", answer: "Yes! EditPDFs.app works on any device with a modern browser. Drawing signatures with your finger on a touchscreen works great." },
          { question: "Can I add multiple signatures to one document?", answer: "Yes. After placing your first signature, you can add more signatures or initials anywhere in the document." },
        ]}
      />
      {children}
    </>
  );
}
