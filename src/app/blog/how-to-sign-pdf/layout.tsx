import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Sign a PDF for Free (2026 Guide) | EditPDFs.app",
  description: "Learn how to add your signature to any PDF document for free. Draw, type, or upload your signature. No account required, completely private.",
  keywords: "how to sign pdf, sign pdf free, add signature to pdf, digital signature pdf, sign documents online free, esign pdf",
  openGraph: {
    title: "How to Sign a PDF for Free (2026 Guide)",
    description: "Add your signature to any PDF in seconds. Free, private, no signup required.",
    type: "article",
  },
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
