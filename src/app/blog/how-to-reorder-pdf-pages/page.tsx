"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToReorderPdfPages() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Reorder PDF Pages for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>February 14, 2026</span>
            <span className="mx-2">•</span>
            <span>4 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Pages in the wrong order? Whether you merged PDFs and need to reorganize, 
            or scanned pages out of sequence, rearranging PDF pages is simple with 
            the right tool.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Reorder PDF Pages?
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Fix scanning mistakes</strong> — Pages scanned out of order</li>
            <li><strong>Organize merged documents</strong> — Arrange content logically after combining PDFs</li>
            <li><strong>Move important pages first</strong> — Put key information at the beginning</li>
            <li><strong>Create custom order</strong> — Arrange pages for a specific presentation</li>
            <li><strong>Correct export errors</strong> — Fix documents exported in wrong sequence</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Reorder Pages: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 1: Upload Your PDF
          </h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and 
            upload your PDF document.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 2: View All Pages
          </h3>
          <p className="text-gray-700 mb-4">
            You&apos;ll see thumbnail previews of every page, making it easy to identify 
            what needs to move where.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 3: Drag Pages to New Positions
          </h3>
          <p className="text-gray-700 mb-4">
            Simply drag any page thumbnail to its new position. The other pages will 
            automatically adjust. It&apos;s as intuitive as sorting photos.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 4: Download Reordered PDF
          </h3>
          <p className="text-gray-700 mb-6">
            Once pages are in the correct order, download your reorganized PDF.
          </p>

          <AdUnit slot="MIDDLE_BANNER" format="horizontal" className="my-8" />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to reorganize your PDF?
            </h3>
            <p className="text-blue-800 mb-4">
              Drag and drop to reorder pages. Free, private, no signup.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Reorder Pages Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Reordering PDF Pages
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Plan Your Order First
          </h3>
          <p className="text-gray-700 mb-4">
            For complex rearrangements, jot down the order you want before you start 
            dragging. This helps avoid confusion with many pages.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Use Page Numbers as Reference
          </h3>
          <p className="text-gray-700 mb-4">
            Each thumbnail shows its current page number. Use these to track what&apos;s 
            moved where, especially in longer documents.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free to reorder PDF pages?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, completely free with no limits.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will this change page numbers in the document?
          </h3>
          <p className="text-gray-700 mb-4">
            The pages will be in your new order. If the PDF has printed page numbers 
            as part of the content, those won&apos;t change — only the actual page order.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I move multiple pages at once?
          </h3>
          <p className="text-gray-700 mb-4">
            Currently you move pages one at a time, but it&apos;s quick — just drag and drop.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does this work on phone?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes! Drag and drop works with touch screens too.
          </p>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
