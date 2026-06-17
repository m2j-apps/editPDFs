import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Reduce PDF File Size Without Losing Quality (2026 Guide) | EditPDFs.app",
  description:
    "Shrink large PDFs for email and uploads without blurry images. What makes PDFs big, how much to compress, hitting a target size, troubleshooting, and mobile steps. Free and private.",
  keywords:
    "reduce pdf file size, reduce pdf size without losing quality, make pdf smaller, shrink pdf, compress pdf without quality loss, pdf too large for email, pdf under 5mb, reduce scanned pdf size",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-reduce-pdf-file-size" },
  openGraph: {
    title: "How to Reduce PDF File Size Without Losing Quality (2026 Guide)",
    description:
      "Shrink large PDFs without blurry images. Where the size hides, how much to compress, target sizes, troubleshooting, and mobile steps.",
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
        title="How to Reduce PDF File Size Without Losing Quality (2026 Guide)"
        description="Learn how to reduce PDF file size without losing quality. Shrink large PDFs for email, web uploads, and sharing. Free, private, no signup."
        slug="how-to-reduce-pdf-file-size"
        datePublished="2026-03-09"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Can you really reduce PDF size without losing quality?", answer: "Yes, up to a point. Light to medium compression and removing hidden bulk (extra pages, metadata, duplicate resources) shrink the file with no visible change. Past that, you trade some image quality for size — which is fine as long as it suits how the file will be used." },
          { question: "What's the best compression level to start with?", answer: "Medium. It typically cuts 40-60% of the size with no noticeable difference at normal zoom. Only go higher if you still need to hit a smaller target and you've checked the result." },
          { question: "Why didn't my PDF get much smaller?", answer: "Because it was probably already mostly text. Compression mainly squeezes images, so a text-heavy file has little to give. Look for unused pages, annotations, or metadata to trim instead." },
          { question: "Is it free, and are my files uploaded?", answer: "On EditPDFs.app it's completely free with no signup, and nothing is uploaded — all processing happens locally in your browser, so your file stays private." },
          { question: "How do I get under a 5 MB or 10 MB limit?", answer: "Set that as your target and stack methods: delete unneeded pages, compress at medium, check the result, and split the file if it's still too big. Combining steps beats simply maxing out the compression slider." },
          { question: "Will compressing change the text or layout?", answer: "No. Text, fonts, and page layout stay intact — compression works on image data and hidden overhead, not on the document's structure." },
          { question: "Why is my scanned PDF still huge after compressing?", answer: "Scans are page-sized images, which compress less than digital PDFs. Lower the resolution, or run OCR to convert text-only scans into real text — that often shrinks them far more than compression alone." },
        ]}
      />
      {children}
    </>
  );
}
