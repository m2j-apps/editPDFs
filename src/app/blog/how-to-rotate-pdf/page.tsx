"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToRotatePdf() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Rotate PDF Pages for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>February 14, 2026</span>
            <span className="mx-2">•</span>
            <span>5 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Scanned document came out sideways? Downloaded a PDF with upside-down pages? 
            Rotating PDF pages is one of the most common fixes people need — and it&apos;s 
            incredibly easy to do for free.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Reasons to Rotate PDF Pages
          </h2>
          <p className="text-gray-700 mb-4">
            PDFs end up with incorrectly oriented pages more often than you&apos;d think:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Scanning mistakes</strong> — Documents placed sideways on the scanner</li>
            <li><strong>Mixed orientations</strong> — Portrait and landscape pages in one document</li>
            <li><strong>Mobile scans</strong> — Phone camera apps sometimes guess wrong</li>
            <li><strong>Merged PDFs</strong> — Combining files with different orientations</li>
            <li><strong>Downloaded forms</strong> — Some forms are designed for landscape printing</li>
            <li><strong>Presentation slides</strong> — Slides exported as PDF in wrong orientation</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Rotation Options Explained
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Rotate 90° Clockwise
          </h3>
          <p className="text-gray-700 mb-4">
            Turns the page a quarter turn to the right. Use this when a page is sideways 
            with the top pointing left.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Rotate 90° Counter-Clockwise
          </h3>
          <p className="text-gray-700 mb-4">
            Turns the page a quarter turn to the left. Use this when a page is sideways 
            with the top pointing right.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Rotate 180°
          </h3>
          <p className="text-gray-700 mb-4">
            Flips the page completely upside down. Use this when a page is completely 
            inverted — text readable but upside down.
          </p>

          <AdUnit slot="MIDDLE_BANNER" format="horizontal" className="my-8" />

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Rotate PDF Pages: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 1: Upload Your PDF
          </h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and 
            upload your PDF by dragging it onto the page or clicking to browse your files.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 2: Find the Page to Rotate
          </h3>
          <p className="text-gray-700 mb-4">
            Browse through the thumbnail previews to find the incorrectly oriented page. 
            You can easily spot which pages need rotation from the thumbnails.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 3: Apply Rotation
          </h3>
          <p className="text-gray-700 mb-4">
            Click the rotate button to turn the page. Each click rotates 90 degrees. 
            Continue clicking until the page is correctly oriented.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 4: Download Your Fixed PDF
          </h3>
          <p className="text-gray-700 mb-6">
            Once all pages are correctly oriented, download your PDF. The rotation is 
            permanently saved — the pages will display correctly in any PDF viewer.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to fix your PDF?
            </h3>
            <p className="text-blue-800 mb-4">
              Rotate pages in seconds. Free, private, no signup required.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Rotate PDF Pages Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Rotating Single Pages vs. All Pages
          </h2>
          <p className="text-gray-700 mb-4">
            Sometimes you need to rotate just one page, and other times the entire 
            document is sideways. Here&apos;s how to handle each situation:
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Single Page Rotation
          </h3>
          <p className="text-gray-700 mb-4">
            Select the specific page that needs fixing and rotate just that one. This is 
            common when you have a landscape table or chart in an otherwise portrait document.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Batch Rotation
          </h3>
          <p className="text-gray-700 mb-4">
            If your entire document is incorrectly oriented (common with scanned documents), 
            you can select all pages and rotate them at once. This saves time when every 
            page needs the same fix.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Understanding Page Orientation
          </h2>
          <p className="text-gray-700 mb-4">
            PDF pages have two orientation concepts that sometimes cause confusion:
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Portrait vs. Landscape
          </h3>
          <p className="text-gray-700 mb-4">
            <strong>Portrait</strong> means the page is taller than it is wide (like a standard letter). 
            <strong>Landscape</strong> means the page is wider than it is tall (like a widescreen display). 
            Rotating a page 90° switches between these orientations.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            View Rotation vs. Page Rotation
          </h3>
          <p className="text-gray-700 mb-4">
            Some PDF viewers let you rotate your <em>view</em> temporarily without changing the file. 
            This doesn&apos;t fix the actual PDF — if you share it, others will see it incorrectly. 
            With EditPDFs.app, you&apos;re making permanent changes to the file itself.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will rotating affect the content quality?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Rotation is a metadata change that tells PDF viewers how to display the page. 
            The actual content — text, images, graphics — remains identical and uncompressed.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I rotate pages in a scanned PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            Absolutely. Scanned PDFs are just images inside a PDF container. Rotation works 
            the same way — the image is displayed at the correct angle.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free to rotate PDF pages?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, completely free. No limits on pages, no watermarks, no premium features 
            locked behind a paywall.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I undo a rotation?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. Before downloading, you can rotate the page again to get back to the original 
            orientation. After downloading, you&apos;d need to re-upload and rotate the other direction.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does this work on phone?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes! EditPDFs.app works on any device — phones, tablets, laptops, desktops. 
            The interface adapts to your screen size.
          </p>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
