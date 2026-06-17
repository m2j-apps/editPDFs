"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToDeletePagesFromPdf() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Delete Pages from a PDF for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Jen</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-02-10">February 10, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            A scanned document with a blank page at the end, a report with a cover sheet you don&apos;t
            need, a contract whose last two pages are irrelevant to the person you&apos;re emailing —
            trimming a PDF down to just the pages that matter takes seconds once you know where to click.
            This guide covers the full process, including how to remove scattered pages in one pass, what
            to do when a page won&apos;t delete, and the one thing people get wrong when they think
            deleting a page makes its content disappear.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Reasons to Delete a Page
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Blank pages from scanning</strong> — Double-sided scanners often insert empty backs of pages.</li>
            <li><strong>Cover sheets and fax headers</strong> — The first page is frequently a wrapper you don&apos;t need to forward.</li>
            <li><strong>Duplicate pages</strong> — Merged or re-scanned documents sometimes repeat content.</li>
            <li><strong>Ads or filler</strong> — Downloaded brochures and manuals pad pages you&apos;ll never read.</li>
            <li><strong>Trimming for email</strong> — Sending only the relevant section keeps a file small and focused.</li>
            <li><strong>Removing a page from view before sharing</strong> — though, as we&apos;ll cover below, &quot;out of sight&quot; isn&apos;t the same as &quot;gone.&quot;</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Delete Pages: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Open your PDF</h3>
          <p className="text-gray-700 mb-4">
            Head to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and add
            your file. It loads directly in your browser — there&apos;s nothing to install and no account
            to create.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Scan the thumbnail grid</h3>
          <p className="text-gray-700 mb-4">
            Every page appears as a numbered thumbnail. This grid is your map: it&apos;s far easier to spot
            a stray blank page or a duplicate here than by scrolling through the document itself. Zoom in
            on any thumbnail if you&apos;re not sure what a page contains.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Select the pages to remove</h3>
          <p className="text-gray-700 mb-4">
            Click a page to mark it for deletion — selected pages are highlighted so you can see exactly
            what&apos;s on the chopping block. You can mark several pages before committing, which is the
            key to removing scattered pages cleanly (more on that next).
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Delete, review, and export</h3>
          <p className="text-gray-700 mb-6">
            Remove the selected pages, then look over what remains <em>before</em> you export — this is
            your last easy chance to catch a mistake. When the document looks right, download the new PDF.
            The remaining pages keep their original order and quality.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to trim your PDF?</h3>
            <p className="text-blue-800 mb-4">
              Delete unwanted pages in seconds — free, private, and no signup required.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Delete PDF Pages Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            One Page, a Range, or Scattered Pages?
          </h2>
          <p className="text-gray-700 mb-4">
            How you approach the selection depends on what you&apos;re removing:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>A single page</strong> — the simplest case. Click the one thumbnail and delete. Useful
              for that lone blank page or an unwanted cover sheet.
            </li>
            <li>
              <strong>A continuous range</strong> (say, pages 10–15) — select each page in the run before
              deleting. Removing them in one action keeps the surrounding pages from shifting underneath you
              mid-edit.
            </li>
            <li>
              <strong>Scattered, non-contiguous pages</strong> (pages 3, 8, and 21) — this is where deleting
              one at a time causes mistakes, because every deletion renumbers the pages after it. Mark all of
              them first against the <em>original</em> numbering, then delete together so the numbers you
              picked still line up.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Important: Deleting a Page Isn&apos;t Always Removing the Information
          </h2>
          <p className="text-gray-700 mb-4">
            If your goal is to <strong>hide sensitive information</strong>, deleting the page it sits on is
            usually enough — once the page is gone, its text and images go with it. But two cases catch
            people out:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Sensitive content spread across a page you&apos;re keeping.</strong> If only part of a
              page is confidential, you can&apos;t delete the whole page — you need to{" "}
              <Link href="/blog/how-to-redact-pdf" className="text-blue-600 hover:underline">redact</Link> the
              specific text or image instead.
            </li>
            <li>
              <strong>Hidden document data.</strong> Author names, edit history, and other{" "}
              <Link href="/blog/how-to-remove-pdf-metadata" className="text-blue-600 hover:underline">metadata</Link>{" "}
              live in the file itself, not on any single page, so deleting pages won&apos;t touch them.
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            For genuinely sensitive sharing, think of page deletion as step one, with redaction and metadata
            removal as the follow-through.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">I deleted the wrong page</h3>
          <p className="text-gray-700 mb-4">
            As long as you haven&apos;t exported yet, just re-add the page or reload the file and start the
            selection over — nothing is final until you download. And because your original file is never
            altered, the worst case is simply re-uploading it.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The pages won&apos;t delete from a protected PDF</h3>
          <p className="text-gray-700 mb-4">
            A PDF locked with a permissions password can block editing. Clear that protection first — see{" "}
            <Link href="/blog/how-to-remove-password-from-pdf" className="text-blue-600 hover:underline">
              how to remove a password from a PDF
            </Link>{" "}
            (you&apos;ll need the current password) — then delete pages from the unlocked copy.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A large document feels slow</h3>
          <p className="text-gray-700 mb-4">
            Very long PDFs take a moment to render every thumbnail since the work happens on your device.
            Give the grid a few seconds to finish loading before selecting, and the deletion itself will
            still be quick.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The deleted page still appears</h3>
          <p className="text-gray-700 mb-4">
            You&apos;re almost certainly looking at the original file. Confirm you opened the freshly
            downloaded version, and clear your viewer&apos;s cache if it&apos;s showing a stale copy.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Bookmarks or links point to the wrong place now</h3>
          <p className="text-gray-700 mb-6">
            Removing pages can leave internal bookmarks or cross-references pointing at content that shifted.
            After deleting, skim any table of contents or internal links and update them if needed.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Deleting on Phones and Tablets</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows / Mac:</strong> Any modern browser works — the thumbnail grid and selection
              behave the same on both.
            </li>
            <li>
              <strong>iPhone / iPad:</strong> Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> in
              Safari and pull the file from the Files app or iCloud Drive. Tap thumbnails to select.
            </li>
            <li>
              <strong>Android:</strong> Use Chrome the same way — tap to select pages, delete, and the new
              file saves to your Downloads.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Files Stay on Your Device</h2>
          <p className="text-gray-700 mb-6">
            Plenty of &quot;delete PDF page&quot; sites upload your document to a server to process it. With{" "}
            <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, the work runs
            entirely in your browser, so a file you&apos;re trimming precisely <em>because</em> it&apos;s
            sensitive never leaves your computer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Delete, Extract, or Split?</h2>
          <p className="text-gray-700 mb-6">
            If you&apos;re removing a few pages from a document you want to keep mostly intact, deleting is
            the right move. If you instead want to <em>keep only</em> a handful of pages, it&apos;s often
            cleaner to{" "}
            <Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">split the PDF</Link>{" "}
            and pull out just those — less clicking than deleting everything else. And if the page order is
            also off, handle that with{" "}
            <Link href="/blog/how-to-reorder-pdf-pages" className="text-blue-600 hover:underline">reordering</Link>{" "}
            in the same session.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Is it free to delete PDF pages?</h3>
          <p className="text-gray-700 mb-4">
            Yes, completely free. There&apos;s no cap on how many pages you remove or how many documents you
            process, and no signup or watermark.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I undo a deletion?</h3>
          <p className="text-gray-700 mb-4">
            Before you export, yes — nothing is committed until you download. After downloading, you&apos;d
            re-upload the original, which is never modified, and redo the selection.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I delete several pages at once?</h3>
          <p className="text-gray-700 mb-4">
            Yes, and you should when removing scattered pages. Mark every page you want gone, then delete in
            a single action so the page numbers you selected don&apos;t shift mid-edit.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Will deleting pages reduce the quality of the rest?</h3>
          <p className="text-gray-700 mb-4">
            No. The remaining pages are untouched — deleting doesn&apos;t recompress or re-encode anything,
            so text stays sharp and images keep their resolution.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Does removing pages also shrink the file?</h3>
          <p className="text-gray-700 mb-4">
            Usually a little, since there&apos;s less content — but if you need a meaningfully smaller file,
            pair it with{" "}
            <Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">compression</Link>.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Does this fully remove sensitive information?</h3>
          <p className="text-gray-700 mb-4">
            If the sensitive content lived only on the deleted page, yes. If it&apos;s on a page you&apos;re
            keeping, redact it instead; and remember hidden metadata isn&apos;t stored on any page, so remove
            that separately.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I delete pages from a scanned PDF?</h3>
          <p className="text-gray-700 mb-6">
            Yes. Deleting works at the page level regardless of whether pages are scanned images or digital
            text, as long as the file isn&apos;t locked against editing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-reorder-pdf-pages" className="text-blue-600 hover:underline">How to reorder PDF pages</Link></li>
            <li><Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">How to split a PDF</Link></li>
            <li><Link href="/blog/how-to-redact-pdf" className="text-blue-600 hover:underline">How to redact a PDF</Link></li>
            <li><Link href="/blog/how-to-merge-pdfs" className="text-blue-600 hover:underline">How to merge PDFs</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
