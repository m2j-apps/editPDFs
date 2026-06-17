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
            <span>Jen</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-02-14">February 14, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Opened a scan that&apos;s lying on its side, or a report where one landscape chart sits
            sideways in a stack of portrait pages? Rotating PDF pages is one of the most common fixes
            people need — and once you understand the difference between rotating the <em>file</em> and
            rotating your <em>view</em>, you&apos;ll fix it once and never see it crooked again.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why PDF Pages End Up Sideways
          </h2>
          <p className="text-gray-700 mb-4">
            Wrong orientation creeps in at the moment a page is captured or combined, not when you open
            it. The usual culprits:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Scanner placement</strong> — a sheet fed in sideways is saved exactly as it landed</li>
            <li><strong>Phone scans</strong> — camera apps guess orientation from motion sensors and sometimes guess wrong</li>
            <li><strong>Mixed-orientation documents</strong> — a landscape spreadsheet or chart dropped into a portrait report</li>
            <li><strong>Merged files</strong> — combining PDFs that were each built for a different orientation</li>
            <li><strong>Exported slides and forms</strong> — designed for landscape printing but viewed on screen</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            The Key Distinction: Permanent Rotation vs. View Rotation
          </h2>
          <p className="text-gray-700 mb-4">
            This is the part that trips most people up. Almost every PDF reader has a &quot;rotate
            view&quot; button — but it only spins the page <em>on your screen</em>. It changes nothing
            inside the file. Close the document, reopen it, or send it to someone else, and it&apos;s
            sideways again.
          </p>
          <p className="text-gray-700 mb-6">
            A <strong>permanent rotation</strong> writes the new orientation into the PDF itself, so the
            page displays correctly everywhere — in any viewer, on any device, and when printed. That&apos;s
            what you want when you&apos;re sharing or archiving a file, and it&apos;s what the steps below
            do.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Which Rotation Do You Need?
          </h2>
          <p className="text-gray-700 mb-4">
            Rotation is measured clockwise. Picture which way the top of the page needs to travel:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>90° clockwise</strong> — the page is sideways with its top pointing <em>left</em></li>
            <li><strong>90° counter-clockwise (270°)</strong> — the page is sideways with its top pointing <em>right</em></li>
            <li><strong>180°</strong> — the page is fully upside down; text is readable but inverted</li>
          </ul>
          <p className="text-gray-700 mb-6">
            If you&apos;re not sure, just click once and look at the preview — it&apos;s faster to test
            than to calculate.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Rotate PDF Pages: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Upload your PDF</h3>
          <p className="text-gray-700 mb-4">
            Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and drag your
            file onto the page, or click to browse. The document opens as a grid of page thumbnails so you
            can see every page at a glance.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Spot the pages that need fixing</h3>
          <p className="text-gray-700 mb-4">
            Scan the thumbnails for anything lying on its side or upside down. In a long document it&apos;s
            usually just one or two pages — the thumbnail view makes them obvious.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Rotate to the right orientation</h3>
          <p className="text-gray-700 mb-4">
            Use the rotate control on a page to turn it 90° at a time. Each click steps it a quarter turn,
            and the thumbnail updates immediately so you can stop the moment it looks right. Rotate each
            affected page until the whole document reads cleanly.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Download the corrected PDF</h3>
          <p className="text-gray-700 mb-6">
            Export the file. The rotation is baked into the new copy, so it opens correctly in every viewer
            and prints the right way up. Your original file is left untouched.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to straighten it out?</h3>
            <p className="text-blue-800 mb-4">
              Rotate any page in seconds — free, private, and no signup. The fix is saved into the file,
              not just your view.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Rotate PDF Pages Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            One Page, Some Pages, or the Whole Document
          </h2>
          <p className="text-gray-700 mb-4">
            How you select pages depends on what went wrong:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>A single page</strong> — common when one landscape table or chart sits inside an
              otherwise upright document. Rotate just that page and leave the rest alone.
            </li>
            <li>
              <strong>A few scattered pages</strong> — fix each one individually; they can even need
              different rotations (one 90°, another 180°).
            </li>
            <li>
              <strong>Every page</strong> — typical for a whole document scanned sideways. Rotate them all
              the same direction so the entire file is corrected in one pass.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The page is sideways again when I reopen it elsewhere
          </h3>
          <p className="text-gray-700 mb-4">
            That means a previous &quot;fix&quot; only rotated the view in your reader, not the file. Re-do
            it with a tool that writes the rotation into the PDF and re-export — the corrected copy will
            hold its orientation everywhere.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Only some pages are wrong, and they&apos;re wrong in different ways
          </h3>
          <p className="text-gray-700 mb-4">
            Handle them one at a time rather than rotating everything together. Mixed orientations are
            normal in merged documents — give each page its own correction.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The page rotates but it&apos;s now too wide or gets cut off when printing
          </h3>
          <p className="text-gray-700 mb-4">
            Rotating 90° swaps a page between portrait and landscape proportions. If it prints cropped,
            check your print dialog&apos;s scaling — set it to &quot;Fit to page&quot; so the new
            orientation prints at full size.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            I can&apos;t rotate a password-protected PDF
          </h3>
          <p className="text-gray-700 mb-4">
            A secured file has to be unlocked before it can be edited. If you know the password, remove the
            protection first — see{" "}
            <Link href="/blog/how-to-remove-password-from-pdf" className="text-blue-600 hover:underline">
              how to remove a password from a PDF
            </Link>{" "}
            — then rotate and re-export.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            A scanned page looks rotated but the text is still hard to read
          </h3>
          <p className="text-gray-700 mb-6">
            Rotation fixes orientation, not legibility. If a scan is faint or skewed, that&apos;s a
            scan-quality issue — rotating it won&apos;t sharpen the text, though making it{" "}
            <Link href="/blog/how-to-make-pdf-searchable" className="text-blue-600 hover:underline">
              searchable with OCR
            </Link>{" "}
            can help you work with it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Rotating PDFs on Any Device</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows / Mac:</strong> the browser steps above work in any browser with no install.
              Built-in readers often only rotate the view, so use a tool that saves the change into the file.
            </li>
            <li>
              <strong>iPhone / iPad:</strong> open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> in
              Safari and rotate right there — no app required. The corrected file saves back to your Files app.
            </li>
            <li>
              <strong>Android:</strong> the same flow works in Chrome — upload, rotate, download.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Note on Privacy</h2>
          <p className="text-gray-700 mb-6">
            Many online &quot;rotate PDF&quot; sites upload your file to their servers to process it. With{" "}
            <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, rotation happens
            entirely in your browser, so the document never leaves your device — handy when the sideways
            scan happens to be a contract or a medical form.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will rotating reduce the quality of my PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Rotation just records the angle at which each page should display — the underlying text and
            images are untouched and uncompressed, so quality is identical.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            What&apos;s the difference between rotating the view and rotating the file?
          </h3>
          <p className="text-gray-700 mb-4">
            Rotating the view only spins the page on your screen and is forgotten when you close the
            reader. Rotating the file saves the new orientation permanently, so everyone who opens it sees
            it correctly.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I rotate just one page in a long document?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. Rotate any individual page and leave the others as they are — ideal for a single landscape
            table inside a portrait report.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does rotation work on scanned PDFs?
          </h3>
          <p className="text-gray-700 mb-4">
            Absolutely. A scanned page is an image inside the PDF, and rotation displays that image at the
            right angle just like any other page.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I undo a rotation?
          </h3>
          <p className="text-gray-700 mb-4">
            Before you download, just rotate the page back to where it started. After downloading, re-upload
            the file and rotate the opposite direction to reverse it.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is rotating PDF pages free?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes — completely free on EditPDFs.app, with no page limits, no watermarks, and no signup.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does it work on a phone?
          </h3>
          <p className="text-gray-700 mb-6">
            Yes. It runs in your mobile browser and the layout adapts to the screen, so you can fix a
            sideways scan straight from your phone.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-reorder-pdf-pages" className="text-blue-600 hover:underline">How to reorder PDF pages</Link></li>
            <li><Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">How to delete pages from a PDF</Link></li>
            <li><Link href="/blog/how-to-merge-pdfs" className="text-blue-600 hover:underline">How to merge PDFs</Link></li>
            <li><Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">How to split a PDF</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
