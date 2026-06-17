import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Remove a Password from a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Remove password protection from a PDF in seconds if you know the current password. Covers user vs owner passwords, forgotten passwords, errors, and mobile — free and private.",
  keywords:
    "remove pdf password, unlock pdf, remove pdf protection, pdf password remover, unprotect pdf, remove pdf permissions password, decrypt pdf",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-remove-password-from-pdf" },
  openGraph: {
    title: "How to Remove a Password from a PDF for Free (2026 Guide)",
    description:
      "Strip password protection from a PDF if you know the current password. Step-by-step, plus fixes for common errors and mobile devices.",
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
        title="How to Remove a Password from a PDF (If You Know It)"
        description="Remove password protection from a PDF in seconds if you know the current password. Free and private."
        slug="how-to-remove-password-from-pdf"
        datePublished="2026-02-25"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Can I remove a PDF password without knowing it?", answer: "No — not legitimately. If you can't open the file, the encryption is working as designed. Your best routes are recovering the password from your records or asking whoever created the document for an unprotected copy." },
          { question: "Is removing a PDF password free?", answer: "Yes. On EditPDFs.app it's completely free with no signup, no watermark, and no file-size limit, as long as you know the current password." },
          { question: "Does removing the password change the contents of my PDF?", answer: "No. The text, images, layout, and pages stay exactly the same. The only thing that changes is that the encryption and any usage restrictions are lifted." },
          { question: "What's the difference between a user password and an owner password?", answer: "A user (open) password is needed to view the file at all. An owner (permissions) password lets the file open but blocks printing, copying, or editing. A PDF can use either or both." },
          { question: "Are my files uploaded to a server?", answer: "Not on EditPDFs.app. All processing runs locally in your browser, so the file and its password never leave your device — which matters most for the kind of sensitive documents people tend to password-protect." },
          { question: "Can I remove passwords from several PDFs at once?", answer: "Process them one at a time, authenticating each file with its own password. Since each PDF can have a different password, there's no safe way to batch-unlock files with different credentials." },
          { question: "Can I add the password back later?", answer: "Yes. You can re-apply protection any time. Keeping the original protected copy as a backup makes this easy." },
          { question: "Will this work on a scanned or read-only PDF?", answer: "Yes. Password removal is about encryption, not content, so it works the same whether the PDF is scanned, text-based, or marked read-only — as long as you can open it." },
        ]}
      />
      {children}
    </>
  );
}
