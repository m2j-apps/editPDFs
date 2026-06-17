import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Sign a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Sign any PDF for free in your browser — draw, type, or upload a signature, place it, lock it in with flattening, and fix common signing problems. No account, fully private.",
  keywords:
    "how to sign pdf, sign pdf free, add signature to pdf, electronic signature pdf, digital signature pdf, esign pdf, sign pdf on iphone, sign pdf on phone",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-sign-pdf" },
  openGraph: {
    title: "How to Sign a PDF for Free (2026 Guide)",
    description:
      "Add your signature to any PDF in seconds — draw, type, or upload. Free, private, no signup required.",
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
        description="Sign any PDF for free in your browser — draw, type, or upload a signature, place it, lock it in with flattening, and fix common signing problems."
        slug="how-to-sign-pdf"
        datePublished="2026-01-21"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it really free to sign PDFs?", answer: "Yes. There's no fee, no premium tier, and no cap on how many documents you sign — and no watermark on the result." },
          { question: "Is an electronic signature legally binding?", answer: "For most everyday agreements, yes — electronic signatures are recognized under laws like the ESIGN Act, UETA, and eIDAS. Some specific documents (such as wills or certain government forms) may still require ink or a certificate-based digital signature. This isn't legal advice; confirm if you're unsure." },
          { question: "Do I need to create an account?", answer: "No. Open the site, upload your PDF, sign, and download — there's no signup." },
          { question: "Can I add several signatures or initials to one document?", answer: "Yes. Once your signature is created you can place it as many times as needed, plus initials, dates, and a typed name on any page." },
          { question: "Can someone remove or move my signature afterward?", answer: "To fix it firmly in place, flatten the PDF before sending — that merges the signature into the page so it can't be selected and dragged. Keep an unflattened copy if you might need to make changes later." },
          { question: "Can I sign a scanned document?", answer: "Yes. You're placing a signature on top of the page image, so scanned PDFs work the same as text-based ones." },
          { question: "Are my files uploaded anywhere?", answer: "No. On EditPDFs.app everything runs locally in your browser, so your document and signature stay on your device." },
        ]}
      />
      {children}
    </>
  );
}
