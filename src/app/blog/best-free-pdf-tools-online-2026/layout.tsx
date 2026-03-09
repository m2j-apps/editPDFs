import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free PDF Tools Online in 2026 | EditPDFs.app",
  description:
    "A practical list of the best free PDF tools in 2026, what each tool is best for, and how to choose safely.",
  keywords:
    "best free pdf tools, pdf tools online, pdf editor free, merge split compress pdf",
  openGraph: {
    title: "Best Free PDF Tools Online in 2026",
    description: "What to use for merge, split, compress, sign, and edit tasks without paying.",
    type: "article",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
