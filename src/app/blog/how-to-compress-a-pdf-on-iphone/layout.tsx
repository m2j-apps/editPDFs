import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Compress a PDF on iPhone for Free (2026 Guide) | EditPDFs.app",
  description:
    "Shrink large PDFs on iPhone or iPad so they email and upload without errors. Covers the native Print-to-PDF trick and its limits, the no-install Safari method, and quality tips — free and private.",
  keywords:
    "compress pdf on iphone, reduce pdf size iphone, iphone pdf compressor, shrink pdf ios, compress pdf ipad, make pdf smaller iphone, pdf too big to email iphone",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-compress-a-pdf-on-iphone" },
  openGraph: {
    title: "How to Compress a PDF on iPhone for Free (2026 Guide)",
    description:
      "A practical iPhone/iPad guide for reducing PDF size without wrecking readability — native options, their limits, and the fastest browser method.",
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
        title="How to Compress a PDF on iPhone"
        description="Shrink large PDFs on iPhone or iPad so they email and upload without errors. Native options, their limits, and the fastest browser method."
        slug="how-to-compress-a-pdf-on-iphone"
        datePublished="2026-03-09"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Does the iPhone have a built-in PDF compressor?", answer: "No. iOS has no dedicated compress button for PDFs. The closest native option is re-saving via Print to PDF, which is unreliable — a browser tool that re-encodes the images is the dependable route." },
          { question: "How small should a PDF be to email?", answer: "Aim for under 10 MB to be safe across providers. Gmail allows up to 25 MB and iCloud Mail 20 MB, but the recipient's server may be stricter, so smaller is safer." },
          { question: "Will compressing make my scan blurry?", answer: "Light to moderate compression keeps text and scans readable. Blurriness comes from over-compressing or from a low-quality original — start gentle and only push harder if you need to." },
          { question: "Do I need to install an app?", answer: "No. Everything runs in Safari, so there's nothing to download and no account to set up." },
          { question: "Is it free?", answer: "Yes — compressing a PDF on EditPDFs.app is free, with no signup or watermark." },
          { question: "Can I compress a password-protected PDF on iPhone?", answer: "Yes, as long as you know the password and can open the file. You can also strip the password separately if you want to." },
          { question: "Does this work on iPad too?", answer: "Yes. The steps are identical on iPadOS in Safari, and the larger screen makes trimming pages before compressing even easier." },
        ]}
      />
      {children}
    </>
  );
}
