import type { Metadata } from "next";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: "Best Free PDF Tools Online in 2026 (by Task) | EditPDFs.app",
  description:
    "The best free PDF tools in 2026, organized by task — merge, split, compress, convert, sign, edit, and redact — plus what to watch out for and when paid is worth it.",
  keywords:
    "best free pdf tools, free pdf tools online, pdf editor free, merge pdf free, split pdf free, compress pdf free, sign pdf free, free pdf software 2026",
  alternates: { canonical: "https://editpdfs.app/blog/best-free-pdf-tools-online-2026" },
  openGraph: {
    title: "Best Free PDF Tools Online in 2026 (by Task)",
    description:
      "A practical, task-by-task guide to the best free PDF tools in 2026 — and how to avoid paywalls, watermarks, and privacy traps.",
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
        title="Best Free PDF Tools Online in 2026"
        description="A practical list of the best free PDF tools in 2026, organized by task, with what each is best for and how to choose safely."
        slug="best-free-pdf-tools-online-2026"
        datePublished="2026-03-09"
        dateModified="2026-06-17"
      />
      <FaqJsonLd
        questions={[
          { question: "Are free PDF tools good enough for professional work?", answer: "For the vast majority of day-to-day tasks — merging, signing, compressing, filling forms — yes. Teams running complex, high-volume, or compliance-heavy workflows may still need a paid suite, but most people never hit those limits." },
          { question: "Which free PDF tool is best for beginners?", answer: "Choose an all-in-one editor with clearly labeled buttons rather than a scattering of single-task sites. Doing everything in one place means fewer tool switches and fewer mistakes." },
          { question: "Do free PDF tools always add watermarks?", answer: "No — many don't. Watermarks are a tactic some tools use to push you toward a paid plan. Always run one test file through before committing a document you care about." },
          { question: "Is it safe to upload sensitive PDFs to online tools?", answer: "It depends on the tool. Anything that uploads to a server creates a copy you don't control. For sensitive files, prefer browser-based tools that process locally, or check the tool's stated deletion policy before uploading." },
          { question: "Can I do all of this on my phone?", answer: "Yes, as long as the tool is responsive and supports touch-friendly page controls. A browser-based editor works in Safari or Chrome on mobile with no app to install." },
          { question: "What's the fastest way to pick a tool for a one-off task?", answer: "Name the task, check for page/size/daily caps, glance at the privacy language, and run one small test file before feeding it your real document. Thirty seconds of checking saves a half-finished job behind a paywall." },
          { question: "Do I need to create an account?", answer: "Not for most tasks. Some tools gate downloads behind signup, but many — including EditPDFs.app — let you finish and export without an account." },
        ]}
      />
      {children}
    </>
  );
}
