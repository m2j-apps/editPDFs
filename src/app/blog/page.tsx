"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

const posts = [
  {
    slug: "best-free-pdf-editors-compared",
    title: "Best Free PDF Editors Compared (2026)",
    excerpt: "We tested the top free PDF editors to help you find the right one. Honest comparison of features, privacy, and limitations.",
    date: "2026-02-14",
    readTime: "8 min read",
  },
  {
    slug: "pdf-vs-docx-when-to-use",
    title: "PDF vs Word (DOCX): When to Use Each Format",
    excerpt: "Confused about whether to send a PDF or Word document? Here's a complete guide to choosing the right format.",
    date: "2026-02-14",
    readTime: "7 min read",
  },
  {
    slug: "how-to-split-pdf",
    title: "How to Split a PDF into Multiple Files for Free (2026 Guide)",
    excerpt: "Extract specific pages, split by ranges, or separate every page. Free, private, no signup required.",
    date: "2026-02-14",
    readTime: "6 min read",
  },
  {
    slug: "how-to-rotate-pdf",
    title: "How to Rotate PDF Pages for Free (2026 Guide)",
    excerpt: "Fix sideways or upside-down pages instantly. Rotate 90 or 180 degrees with a single click.",
    date: "2026-02-14",
    readTime: "5 min read",
  },
  {
    slug: "how-to-add-text-to-pdf",
    title: "How to Add Text to a PDF for Free (2026 Guide)",
    excerpt: "Insert text anywhere in your PDF. Fill forms, add labels, or include notes — completely free.",
    date: "2026-02-14",
    readTime: "5 min read",
  },
  {
    slug: "how-to-delete-pages-from-pdf",
    title: "How to Delete Pages from a PDF for Free (2026 Guide)",
    excerpt: "Remove unwanted pages from any PDF in seconds. Delete blank pages, sensitive content, or irrelevant sections.",
    date: "2026-02-14",
    readTime: "4 min read",
  },
  {
    slug: "how-to-reorder-pdf-pages",
    title: "How to Reorder PDF Pages for Free (2026 Guide)",
    excerpt: "Rearrange pages in your PDF with simple drag and drop. Fix page order in seconds.",
    date: "2026-02-14",
    readTime: "4 min read",
  },
  {
    slug: "how-to-add-images-to-pdf",
    title: "How to Add Images to a PDF for Free (2026 Guide)",
    excerpt: "Insert photos, logos, and diagrams into any PDF. Position and resize anywhere on the page.",
    date: "2026-02-14",
    readTime: "5 min read",
  },
  {
    slug: "how-to-annotate-pdf",
    title: "How to Annotate a PDF for Free (2026 Guide)",
    excerpt: "Highlight, underline, and add notes to PDFs. Mark up documents for review, study, or collaboration.",
    date: "2026-02-14",
    readTime: "5 min read",
  },
  {
    slug: "how-to-fill-pdf-forms",
    title: "How to Fill Out PDF Forms for Free (2026 Guide)",
    excerpt: "Complete PDF forms digitally without printing. Fill applications, contracts, and official forms online.",
    date: "2026-02-14",
    readTime: "5 min read",
  },
  {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert PDF to Word for Free (2026 Guide)",
    excerpt: "Convert PDFs to editable Word documents. Tips for getting the best conversion results.",
    date: "2026-02-14",
    readTime: "6 min read",
  },
  {
    slug: "how-to-compress-pdf",
    title: "How to Compress PDF Files for Free (2026 Guide)",
    excerpt: "Reduce PDF file size in seconds. No quality loss, no uploads to servers — completely free and private.",
    date: "2026-02-09",
    readTime: "5 min read",
  },
  {
    slug: "how-to-sign-pdf",
    title: "How to Sign a PDF for Free (2026 Guide)",
    excerpt: "Add your signature to any PDF in seconds. Draw, type, or upload — completely free and private.",
    date: "2026-02-03",
    readTime: "4 min read",
  },
  {
    slug: "how-to-merge-pdfs",
    title: "How to Merge PDFs for Free (2026 Guide)",
    excerpt: "Combine multiple PDF files into one document in seconds. Drag, drop, reorder — completely free and private.",
    date: "2026-02-02",
    readTime: "5 min read",
  },
  {
    slug: "how-to-edit-pdf-free",
    title: "How to Edit a PDF for Free in 2026",
    excerpt: "Learn how to edit PDF files without paying for expensive software. No signup, no watermarks, no limits.",
    date: "2026-02-01",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 mb-8">
          Tips, guides, and tutorials for working with PDFs
        </p>

        {/* Top Ad */}
        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="space-y-8">
          {posts.map((post, index) => (
            <div key={post.slug}>
              <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
              
              {/* Ad after every 4th post */}
              {(index + 1) % 4 === 0 && index < posts.length - 1 && (
                <div className="mt-8">
                  <AdUnit slot="MIDDLE_BANNER" format="horizontal" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Ad */}
        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </div>
    </div>
  );
}
