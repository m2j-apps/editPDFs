import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Remove Password from a PDF (Safely) | EditPDFs.app",
  description:
    "Step by step guide to remove a PDF password if you already know it. Learn safe workflows, legal notes, and privacy tips.",
  keywords:
    "remove password from pdf, unlock pdf, pdf password remover, remove pdf protection, pdf security",
  openGraph: {
    title: "How to Remove Password from a PDF (Safely)",
    description:
      "A practical guide to removing PDF passwords when you have permission and know the current password.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
