import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Rotate PDF Pages for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to rotate PDF pages 90 or 180 degrees. Fix sideways or upside-down pages instantly. Free online tool, no signup required.",
  keywords: "rotate pdf, rotate pdf pages, fix sideways pdf, turn pdf pages, rotate pdf 90 degrees, rotate pdf free online",
  openGraph: {
    title: "How to Rotate PDF Pages for Free (2026 Guide)",
    description: "Rotate PDF pages instantly. Fix sideways or upside-down pages in seconds. Free, no signup.",
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
        title="How to Rotate PDF Pages for Free (2026 Guide)"
        description="Learn how to rotate PDF pages 90 or 180 degrees. Fix sideways or upside-down pages instantly. Free online tool, no signup required."
        slug="how-to-rotate-pdf"
        datePublished="2026-02-14"
      />
      <FaqJsonLd
        questions={[
          { question: "Will rotating affect the content quality?", answer: "No. Rotation is a metadata change that tells PDF viewers how to display the page. The actual content — text, images, graphics — remains identical and uncompressed." },
          { question: "Can I rotate pages in a scanned PDF?", answer: "Absolutely. Scanned PDFs are just images inside a PDF container. Rotation works the same way — the image is displayed at the correct angle." },
          { question: "Is it free to rotate PDF pages?", answer: "Yes, completely free. No limits on pages, no watermarks, no premium features locked behind a paywall." },
          { question: "Can I undo a rotation?", answer: "Yes. Before downloading, you can rotate the page again to get back to the original orientation. After downloading, you'd need to re-upload and rotate the other direction." },
          { question: "Does this work on phone?", answer: "Yes! EditPDFs.app works on any device — phones, tablets, laptops, desktops. The interface adapts to your screen size." },
        ]}
      />
      {children}
    </>
  );
}
