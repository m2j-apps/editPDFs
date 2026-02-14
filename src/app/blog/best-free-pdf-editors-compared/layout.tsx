import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free PDF Editors Compared (2026) | EditPDFs.app",
  description: "Compare the top free PDF editors in 2026. We analyze features, privacy, limitations, and ease of use to help you choose the best tool for your needs.",
  keywords: "best free pdf editor, free pdf editor comparison, pdf editor review, online pdf editor, pdf editing tools compared",
  openGraph: {
    title: "Best Free PDF Editors Compared (2026)",
    description: "Find the best free PDF editor for your needs. Complete comparison of features, privacy, and limitations.",
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
