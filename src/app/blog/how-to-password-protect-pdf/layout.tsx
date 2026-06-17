import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "How to Password Protect a PDF for Free (2026 Guide) | EditPDFs.app",
  description:
    "Add password protection to a PDF for free. Covers open vs permissions passwords, choosing a strong password, sharing it safely, troubleshooting, and mobile — private, in-browser, no signup.",
  keywords:
    "password protect pdf, secure pdf, encrypt pdf, pdf password, lock pdf, protect pdf file, add password to pdf free, aes-256 pdf encryption, permissions password",
  alternates: { canonical: "https://editpdfs.app/blog/how-to-password-protect-pdf" },
  openGraph: {
    title: "How to Password Protect a PDF for Free (2026 Guide)",
    description:
      "Encrypt a PDF in seconds: pick the right password type, share it safely, and fix common issues. Free, private, no signup.",
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
        title="How to Password Protect a PDF for Free (2026 Guide)"
        description="Add password protection to a PDF for free. Covers open vs permissions passwords, strong passwords, safe sharing, and troubleshooting."
        slug="how-to-password-protect-pdf"
        datePublished="2026-02-22"
        dateModified="2026-06-17"
        author="Jen"
      />
      <FaqJsonLd
        questions={[
          { question: "Is password-protecting a PDF really free?", answer: "Yes. On EditPDFs.app it's completely free with no signup, no watermark, and no file-size limit — protect as many PDFs as you need." },
          { question: "How strong is PDF encryption?", answer: "Modern PDFs use AES-256, which is virtually unbreakable on its own. The real vulnerability is a weak or guessable password, so the strength of your protection comes down to the password you choose." },
          { question: "What's the difference between an open password and a permissions password?", answer: "An open (user) password is required to view the file at all. A permissions (owner) password lets the file open but restricts printing, copying, or editing. Use the open password for true confidentiality; you can apply both together." },
          { question: "What happens if I forget the password?", answer: "The file can't be recovered — that's by design. Your only routes are re-protecting the original unprotected copy or, if you still know the password, removing it. Always save the password in a manager when you set it." },
          { question: "Does adding a password change my PDF's contents?", answer: "No. The text, images, layout, and quality stay exactly the same. Only an encryption layer is added so the file requires authentication to open." },
          { question: "Can I password-protect several PDFs at once?", answer: "Protect them one at a time so each gets the right password, or merge related files first if they should share a single password." },
          { question: "Are my files uploaded to a server?", answer: "Not on EditPDFs.app. Encryption runs in your browser, so the document and its password never leave your device — which matters most for exactly the confidential files you're trying to secure." },
          { question: "Can I remove the password later?", answer: "Yes, as long as you know it. Keeping an unprotected backup makes switching protection on and off painless." },
        ]}
      />
      {children}
    </>
  );
}
