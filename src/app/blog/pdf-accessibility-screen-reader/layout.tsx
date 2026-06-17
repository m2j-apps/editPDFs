import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "PDF Accessibility: Making PDFs Screen Reader Friendly | EditPDFs.app",
  description: "Learn how to make PDFs accessible for screen readers. Covers PDF tags, reading order, alt text, WCAG 2.2 compliance, and free testing tools.",
  keywords: "pdf accessibility, screen reader pdf, accessible pdf, pdf tags, wcag pdf, pdf ua, alt text pdf",
  alternates: { canonical: "https://editpdfs.app/blog/pdf-accessibility-screen-reader" },
  openGraph: {
    title: "PDF Accessibility: Making PDFs Screen Reader Friendly",
    description: "A practical guide to making PDFs accessible for screen readers and assistive technology.",
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
        title="PDF Accessibility: Making PDFs Screen Reader Friendly"
        description="Learn how to make PDFs accessible for screen readers. Covers PDF tags, reading order, alt text, WCAG 2.2 compliance, and free testing tools."
        slug="pdf-accessibility-screen-reader"
        datePublished="2026-03-30"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "What makes a PDF accessible?", answer: "An accessible PDF has real, selectable text (not a scanned image), structural tags that identify headings, lists, and tables, a logical reading order, alt text on meaningful images, labeled form fields, a set document language, and a meaningful title. Together these let assistive technology read and navigate the document the way a sighted user reads the layout." },
          { question: "Do screen readers read any PDF?", answer: "No. A screen reader interprets the PDF's underlying tag structure, not its visual appearance. An untagged or image-only PDF may read back as silence, gibberish, or a scrambled jumble — even though it looks perfectly normal on screen." },
          { question: "What are PDF tags, and why do they matter?", answer: "Tags are invisible structural markers embedded in the file — the PDF equivalent of HTML. They tell assistive tech what each element is (heading, paragraph, list, figure, table) and the order to read it in. Without tags, a screen reader has no way to navigate the content meaningfully." },
          { question: "Is a scanned PDF accessible?", answer: "Not on its own — a scan is just an image of a page, so there's no text for a screen reader to read. You first need to run OCR to add a real text layer, then tag the document." },
          { question: "How do I add alt text to images in a PDF?", answer: "The most reliable way is to add alt text in the source document (Word, Google Docs, InDesign) before exporting to a tagged PDF. To fix an existing PDF, Adobe Acrobat Pro lets you edit a figure's alternate text in the tag tree. Describe what the image communicates, not just what it looks like." },
          { question: "How do I check whether my PDF meets PDF/UA, WCAG, or Section 508?", answer: "Start with a free automated checker like PAC 2024, which tests against PDF/UA-1 and WCAG 2.2 and lists failures by page. Then confirm with a real screen reader, since automated tools can't judge whether alt text or reading order actually makes sense. Section 508 and the ADA generally point back to WCAG AA, so passing WCAG is the practical target." },
          { question: "Does making a PDF accessible help with SEO?", answer: "Yes. The same tags and real text that screen readers rely on also let search engines index the document's structure and content more accurately. Accessible PDFs tend to be cleaner, more portable, and easier for every reader — which is good for both rankings and users." },
        ]}
      />
      {children}
    </>
  );
}
