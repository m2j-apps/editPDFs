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
            <span>Mike</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-02-07">February 7, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            A scanner fed your pages in the wrong order, a merge left chapter three sitting in front of
            chapter one, or an export flipped your appendix to the top — whatever happened, a PDF with its
            pages out of sequence is frustrating to read and unprofessional to send. The good news is that
            fixing the order takes seconds and never touches the content on the pages themselves. This
            guide covers the drag-and-drop method, the snags people hit with long or stubborn documents,
            and how reordering differs from deleting or splitting.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            What &quot;Reordering&quot; Actually Does
          </h2>
          <p className="text-gray-700 mb-4">
            Reordering changes the <strong>sequence</strong> of existing pages — nothing on any page is
            altered, added, or deleted. Think of it as shuffling a deck rather than rewriting the cards.
            That distinction matters because it tells you what to expect:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Text, images, form fields, and signatures stay exactly as they were.</li>
            <li>The file size barely changes, since you&apos;re moving content, not adding it.</li>
            <li>Only the order in which pages appear when scrolling or printing is updated.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Reasons People Reorder Pages
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Fixing scans</strong> — double-sided documents scanned on a single-sided feeder often come out interleaved or reversed.</li>
            <li><strong>Cleaning up a merge</strong> — after combining files, sections rarely land in the order you want on the first try.</li>
            <li><strong>Leading with what matters</strong> — moving a summary, cover letter, or signature page to the front.</li>
            <li><strong>Matching a required format</strong> — applications and court filings sometimes mandate a specific page order.</li>
            <li><strong>Correcting export glitches</strong> — some apps export slides or attachments in reverse.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Reorder Pages: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Upload your PDF</h3>
          <p className="text-gray-700 mb-4">
            Head to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and add
            your document. Nothing is sent to a server — the file loads straight into your browser, so even
            a large PDF opens without a long upload wait.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Switch to the page thumbnail view</h3>
          <p className="text-gray-700 mb-4">
            You&apos;ll see a grid of thumbnails, one per page, each labelled with its current position.
            This bird&apos;s-eye view is what makes reordering intuitive: you can spot the out-of-place page
            visually instead of guessing by page number.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Drag pages into place</h3>
          <p className="text-gray-700 mb-4">
            Click and hold a thumbnail, then drag it to where it belongs. The surrounding pages slide aside
            to show you the drop position, and everything renumbers automatically when you release. Work one
            move at a time and watch the labels update so you always know where you are.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Review, then download</h3>
          <p className="text-gray-700 mb-6">
            Scan the thumbnails top to bottom to confirm the new flow reads correctly, then export. Your
            reordered PDF downloads as a fresh copy, leaving the original on your device untouched in case
            you want to start over.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to reorganize your PDF?</h3>
            <p className="text-blue-800 mb-4">
              Drag and drop pages into any order you like — free, private, and no signup. It all happens
              right in your browser.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Reorder Pages Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Plan Before You Drag (Especially for Long Documents)
          </h2>
          <p className="text-gray-700 mb-4">
            For a handful of pages you can rearrange by eye. For anything past 15 or 20 pages, a few seconds
            of planning saves a lot of back-and-forth:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Write down the target order as a list of current page numbers (e.g. &quot;1, 4, 5, 2, 3&quot;) before touching anything.</li>
            <li>Move pages that travel the farthest first — getting the big jumps out of the way makes the remaining nudges easier to track.</li>
            <li>Reorder in small batches and glance at the thumbnails between moves, rather than making a dozen changes blind.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A page keeps snapping back to its old spot</h3>
          <p className="text-gray-700 mb-4">
            This almost always means the drag was released too early or just outside a valid drop zone. Hold
            the thumbnail until you see the gap open between two pages, then let go directly over that gap.
            On a trackpad, a deliberate click-and-hold works better than a light tap.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Thumbnails are slow to appear on a big file</h3>
          <p className="text-gray-700 mb-4">
            Because rendering happens on your own device, a 200-page or image-heavy PDF takes a moment to
            generate previews. Give it a few seconds to finish before dragging. If your machine is older,
            closing other browser tabs frees up memory and speeds things along.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">I need to move a block of pages, not just one</h3>
          <p className="text-gray-700 mb-4">
            Move them one at a time, but in reverse order of where they&apos;ll end up — drag the last page
            of the block into position first, then the one before it, and so on. The block assembles itself
            without the earlier moves shifting your target slot.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The printed page numbers no longer match</h3>
          <p className="text-gray-700 mb-4">
            If a document has page numbers <em>printed into the content</em> (in the footer, say), those are
            part of the image and won&apos;t update when you reorder — only the actual page sequence
            changes. After a big reshuffle, re-add a fresh set of numbers or remove the old ones so readers
            aren&apos;t confused.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The order looks right on screen but prints wrong</h3>
          <p className="text-gray-700 mb-6">
            That points to a print setting rather than the file — check that your print dialog isn&apos;t set
            to &quot;reverse order&quot; or a custom page range. Download and reopen the exported PDF to
            confirm the saved order is correct before blaming the document.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Reordering on Specific Devices</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows / Mac (any browser):</strong> Drag-and-drop with a mouse or trackpad is the
              smoothest experience and needs no software install. A larger screen also lets you see more
              thumbnails at once, which helps with long documents.
            </li>
            <li>
              <strong>iPhone / iPad:</strong> Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> in
              Safari and drag thumbnails with your finger. Turning the device to landscape shows more pages
              per row and makes precise drops easier; see our{" "}
              <Link href="/blog/how-to-compress-a-pdf-on-iphone" className="text-blue-600 hover:underline">
                iPhone PDF guide
              </Link>{" "}
              for tips on the Files app.
            </li>
            <li>
              <strong>Android:</strong> Chrome handles the touch dragging the same way — upload, rearrange,
              and download back to your device with no app required.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Note on Privacy</h2>
          <p className="text-gray-700 mb-6">
            Plenty of &quot;organize PDF&quot; sites upload your document to their servers just to shuffle a
            few pages — overkill for a task that doesn&apos;t need the cloud at all. On{" "}
            <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> the entire process
            runs locally in your browser, so contracts, medical records, and anything else you reorder never
            leave your device.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Reorder, Delete, or Split — Which Do You Need?</h2>
          <p className="text-gray-700 mb-4">
            People often reach for &quot;reorder&quot; when a different tool is the real fix. Quick guide:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Reorder</strong> when every page belongs in the file but the sequence is wrong.
            </li>
            <li>
              <strong>Delete</strong> when some pages shouldn&apos;t be there at all — see{" "}
              <Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">
                how to delete pages from a PDF
              </Link>
              .
            </li>
            <li>
              <strong>Split</strong> when one document should become several — see{" "}
              <Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">
                how to split a PDF
              </Link>
              .
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            It&apos;s common to combine them: merge a few files, reorder the result, then delete a stray
            blank page. Each is a separate, quick step.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free to reorder PDF pages?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. Reordering on EditPDFs.app is completely free with no signup, no watermark on the output,
            and no cap on the number of pages or files you can work with.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does reordering change the contents of my pages?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Only the sequence changes. Every page keeps its exact text, images, and formatting — you&apos;re
            rearranging pages, not editing what&apos;s on them.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will the printed page numbers update automatically?
          </h3>
          <p className="text-gray-700 mb-4">
            Only the underlying page order updates. If page numbers are printed into the content itself,
            they stay with their page and may look out of sequence after a reshuffle, so you may want to
            redo them.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I move several pages at once?
          </h3>
          <p className="text-gray-700 mb-4">
            You move pages individually, which is quick with drag-and-drop. To relocate a block, drag its
            pages one by one in reverse order so they settle into place without disturbing your target spot.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does this work on a phone or tablet?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. Touch dragging works in Safari on iPhone and iPad and in Chrome on Android. Rotating to
            landscape gives you more room and makes precise drops easier.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Are my files uploaded anywhere?
          </h3>
          <p className="text-gray-700 mb-4">
            No. All reordering happens in your browser on your own device, so nothing is uploaded to a
            server — ideal for sensitive or confidential documents.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            What if I make a mistake while rearranging?
          </h3>
          <p className="text-gray-700 mb-4">
            Just keep dragging until the order is right — nothing is final until you export. And because the
            download is a new copy, your original file stays intact if you&apos;d rather begin again.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I reorder a scanned PDF?
          </h3>
          <p className="text-gray-700 mb-6">
            Absolutely — reordering works on scanned pages just like any other PDF, since it operates on
            whole pages rather than their contents. It&apos;s one of the fastest ways to fix pages that a
            scanner captured out of sequence.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-merge-pdfs" className="text-blue-600 hover:underline">How to merge PDFs</Link></li>
            <li><Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">How to delete pages from a PDF</Link></li>
            <li><Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">How to split a PDF</Link></li>
            <li><Link href="/blog/how-to-rotate-pdf" className="text-blue-600 hover:underline">How to rotate PDF pages</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
