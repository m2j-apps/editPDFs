import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Create a Fillable PDF Form for Free | EditPDFs.app",
  description: "Learn how to create fillable PDF forms with text fields, checkboxes, and dropdowns — completely free. No Adobe Acrobat needed.",
  keywords: "create fillable pdf form, fillable pdf free, pdf form creator, interactive pdf form, fillable form pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-create-fillable-pdf-forms" },
  openGraph: {
    title: "How to Create a Fillable PDF Form for Free",
    description: "Build interactive PDF forms with text fields, checkboxes, and more — free, no software needed.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleJsonLd
        title="How to Create a Fillable PDF Form for Free"
        description="Learn how to create fillable PDF forms with text fields, checkboxes, and dropdowns — completely free. No Adobe Acrobat needed."
        slug="how-to-create-fillable-pdf-forms"
        datePublished="2026-03-28"
        dateModified="2026-06-17"
        author="Mike"
      />
      <FaqJsonLd
        questions={[
          { question: "Can I create a fillable PDF on my iPhone or Android?", answer: "Yes, browser-based tools like EditPDFs.app work on mobile. The field placement is easier on a tablet or desktop with a larger screen, but it's doable on a phone for simple forms." },
          { question: "Will my fillable PDF work in Adobe Reader?", answer: "Yes, PDF forms are a standard part of the PDF specification and work in Adobe Reader, Acrobat, and most modern PDF viewers. Fields created in EditPDFs.app follow the standard PDF form specification." },
          { question: "Can people fill out the form in their browser without downloading it?", answer: "Yes. Most modern browsers (Chrome, Edge, Firefox, Safari) can open and fill out PDF forms natively. Recipients don't need to download any software." },
          { question: "How do I prevent people from editing the form fields after they submit?", answer: "Flatten the PDF after receiving it. Flattening converts all field content to static text, making it uneditable. You can also password-protect the flattened version to prevent future changes." },
          { question: "Is there a limit to how many fields I can add?", answer: "No practical limit. A PDF form can contain hundreds of fields. Performance may slow down on very complex forms, but for typical business forms with 20–50 fields, there's no issue." },
        ]}
      />
      {children}
    </>
  );
}
