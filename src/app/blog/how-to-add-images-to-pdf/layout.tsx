import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Add Images to a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Insert a logo, signature, photo, or screenshot into any PDF for free. Step-by-step placement, format tips (PNG vs JPG), quality fixes, troubleshooting, and mobile — no signup, no uploads.",
  keywords:
    "add image to pdf, insert picture in pdf, add logo to pdf, add photo to pdf free, add signature image to pdf, pdf image editor, png transparent pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-add-images-to-pdf" },
  openGraph: {
    title: "How to Add Images to a PDF for Free (2026 Guide)",
    description: "Insert logos, signatures, and photos into any PDF. Placement, format, and quality tips — free, private, no signup.",
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
        title="How to Add Images to a PDF for Free (2026 Guide)"
        description="Insert a logo, signature, photo, or screenshot into any PDF for free. Step-by-step placement, format tips, quality fixes, and troubleshooting."
        slug="how-to-add-images-to-pdf"
        datePublished="2026-02-05"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is it free to add images to a PDF?", answer: "Yes. On EditPDFs.app it's completely free with no signup, no watermark, and no limit on how many images or documents you work with." },
          { question: "Will adding an image reduce its quality?", answer: "No. The image is embedded at the resolution of the file you upload — what you put in is what you get out. Any blurriness comes from the source image being too small for the space, not from the insertion itself." },
          { question: "Can I add several images to one PDF?", answer: "Yes. Add as many as you like across any pages. They can also overlap — a later image sits on top of an earlier one, which is useful for layering a logo over a banner." },
          { question: "Which format is best for a logo or signature?", answer: "A PNG with a transparent background. It places cleanly with no white box, so the logo or signature blends into whatever is behind it on the page." },
          { question: "Why did my PDF get so much larger after adding a photo?", answer: "High-resolution photos carry a lot of data. Resize the photo before adding it, or compress the finished PDF if you need to email it. A logo or signature adds almost nothing by comparison." },
          { question: "Can I move or delete the image after placing it?", answer: "Yes — until you export, the image stays a selectable object you can drag, resize, or remove. Once you've downloaded the file, it's embedded into the page." },
          { question: "Does this work on my phone?", answer: "Yes. EditPDFs.app runs in any mobile browser, and you can pull images straight from your photo library — handy for adding a photo of a signature or an ID to a form on the go." },
        ]}
      />
      {children}
    </>
  );
}
