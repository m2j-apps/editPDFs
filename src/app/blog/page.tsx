"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

const posts = [
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
              
              {/* Ad after second post */}
              {index === 1 && (
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
