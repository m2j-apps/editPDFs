import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Fill Out PDF Forms for Free (2026 Guide) | EditPDFs.app",
  description: "Fill any PDF form digitally — interactive or flat. Step-by-step for both types, plus checkboxes, signatures, flattening, troubleshooting, and mobile. Free, no signup.",
  keywords: "fill pdf form, fill out pdf, complete pdf form, fillable pdf, pdf form filler free, type in pdf form, fill flat pdf form, fill non-interactive pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-fill-pdf-forms" },
  openGraph: {
    title: "How to Fill Out PDF Forms for Free (2026 Guide)",
    description: "Complete interactive and flat PDF forms digitally — no printing. Free, private, no signup.",
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
        title="How to Fill Out PDF Forms for Free (2026 Guide)"
        description="Learn how to fill in PDF forms digitally. Complete applications, contracts, and official forms without printing. Free online tool, no signup."
        slug="how-to-fill-pdf-forms"
        datePublished="2026-01-30"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to fill PDF forms?", answer: "Yes — completely free, with no limit on the number of pages or forms, no watermark, and no signup." },
          { question: "How do I know if my form is interactive or flat?", answer: "Click where you'd type your name. If a text cursor appears, the form is interactive; if nothing happens, it's flat and you'll add text on top of the page yourself." },
          { question: "Can I fill checkboxes and radio buttons?", answer: "On interactive forms, checkboxes and radio buttons work as designed — clicking one radio option deselects the rest. On flat forms, type an 'X' or checkmark in the box with the text tool." },
          { question: "Will the form still work after I fill it?", answer: "Yes. The completed file is a standard PDF that can be viewed, printed, emailed, or uploaded anywhere PDFs are accepted." },
          { question: "Should I flatten the form before sending it?", answer: "If you want your entries locked so they can't be changed and look identical in every viewer, yes — flatten it. Keep an unflattened copy in case you need to make corrections later." },
          { question: "Can I add a signature to the form?", answer: "Yes. Draw, type, or upload a signature and place it on the signature line." },
          { question: "What if the form is password-protected?", answer: "You'll need to remove the editing restriction first (if you know the password), then fill it as usual." },
          { question: "Is my form data private?", answer: "Yes. EditPDFs.app processes everything locally in your browser, so the sensitive information on your form is never uploaded to any server." },
        ]}
      />
      {children}
    </>
  );
}
