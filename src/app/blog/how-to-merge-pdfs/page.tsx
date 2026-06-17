"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToMergePdfs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Merge PDFs for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Jen</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-01-18">January 18, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Combining several PDFs into one tidy document is one of those tasks that sounds like it
            should need expensive software — and doesn&apos;t. Whether you&apos;re stitching together
            scanned pages, bundling a cover letter with a resume, or assembling receipts for an expense
            report, you can merge any number of PDFs in your browser in under a minute. This guide covers
            the full process, how to handle files that don&apos;t quite match, and what to do when the
            result isn&apos;t what you expected.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When Merging PDFs Helps</h2>
          <p className="text-gray-700 mb-4">
            Merging turns a scattered pile of files into a single document that&apos;s easier to send,
            print, and archive. Common situations:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Job applications</strong> — one file with your cover letter, resume, and portfolio</li>
            <li><strong>Scanned paperwork</strong> — combine pages your scanner saved as separate files</li>
            <li><strong>Reports and proposals</strong> — assemble chapters, appendices, and exhibits in order</li>
            <li><strong>Expense reports</strong> — bundle invoices and receipts into one submission</li>
            <li><strong>Contracts</strong> — attach signed pages and supporting documents to the agreement</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Merge PDFs: Step-by-Step</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Add your files</h3>
          <p className="text-gray-700 mb-4">
            Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and upload
            your first PDF, then use the add-files option to bring in the rest. You can load several at
            once — each one&apos;s pages appear in the page panel as you add them.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Put them in the right order</h3>
          <p className="text-gray-700 mb-4">
            The page panel shows a thumbnail of every page across all your files. Drag thumbnails to
            rearrange them — this is where you decide what comes first, second, and so on. If two files
            need to interleave (say, a form followed by its instructions), you can position individual
            pages exactly where they belong, not just whole documents.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Drop any pages you don&apos;t need</h3>
          <p className="text-gray-700 mb-4">
            Scanned files often include blank backs or cover sheets you don&apos;t want in the final
            document. Delete those stray pages now so the merged file is clean. (Need to remove a lot?
            See our guide on{" "}
            <Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">splitting PDFs</Link>.)
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Merge and download</h3>
          <p className="text-gray-700 mb-6">
            Export the document. All the pages combine into one continuous PDF in the order you set, and
            it downloads to your device. Your original files are untouched — merging always produces a new
            file.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to merge your PDFs?</h3>
            <p className="text-blue-800 mb-4">
              No signup, no watermarks, no limits — and your files never leave your device.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Merge PDFs Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Combining Files That Don&apos;t Match</h2>
          <p className="text-gray-700 mb-4">
            Real-world documents rarely share the same dimensions. Here&apos;s how mismatched inputs
            behave when you merge them:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Different page sizes (A4 + Letter)</strong> — each page keeps its own size. The merged
              file is valid, but pages may not look uniform when printed. If consistency matters, standardize
              the originals before merging.
            </li>
            <li>
              <strong>Portrait + landscape</strong> — orientation is preserved per page, so a landscape chart
              can sit between portrait pages without being squashed.
            </li>
            <li>
              <strong>Scanned + digital</strong> — both combine fine. Scanned pages are images, so they may be
              larger and won&apos;t have selectable text unless you{" "}
              <Link href="/blog/how-to-make-pdf-searchable" className="text-blue-600 hover:underline">
                make the PDF searchable
              </Link>{" "}
              first.
            </li>
            <li>
              <strong>Images alongside PDFs</strong> — if you have photos or screenshots to include,{" "}
              <Link href="/blog/how-to-convert-images-to-pdf" className="text-blue-600 hover:underline">
                convert them to PDF
              </Link>{" "}
              first, then merge.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The pages ended up in the wrong order</h3>
          <p className="text-gray-700 mb-4">
            Order is set in the page panel before you export, so it&apos;s easiest to fix there rather than
            re-doing the merge. Drag the thumbnails into place and double-check the first and last pages of
            each section before downloading.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">One of the files is password-protected</h3>
          <p className="text-gray-700 mb-4">
            An encrypted PDF can&apos;t be merged until it&apos;s unlocked. Enter its password when prompted,
            or{" "}
            <Link href="/blog/how-to-remove-password-from-pdf" className="text-blue-600 hover:underline">
              remove the password
            </Link>{" "}
            first (you&apos;ll need to know the current one), then add it to the merge.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The combined file is too large to email</h3>
          <p className="text-gray-700 mb-4">
            Merging many scanned pages can push the file over typical attachment limits. Run the result
            through a{" "}
            <Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">compression pass</Link>{" "}
            after merging to bring the size down.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Some pages look rotated or inconsistent</h3>
          <p className="text-gray-700 mb-6">
            Scanned pages sometimes import sideways. Rotate them to the correct orientation before exporting,
            and if sizes look uneven, remember each page keeps its original dimensions — that&apos;s expected
            behavior, not a bug.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Merging on Different Devices</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows / Mac (any browser):</strong> The steps above work identically — drag files in,
              arrange, export. No install needed.
            </li>
            <li>
              <strong>iPhone / iPad:</strong> Open the site in Safari and pull files from the Files app or
              iCloud Drive. Everything runs in the browser, so there&apos;s nothing to download.
            </li>
            <li>
              <strong>Android:</strong> Use Chrome the same way — select your PDFs, reorder, and save the
              merged file back to your device.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Stays Intact When You Merge</h2>
          <p className="text-gray-700 mb-4">
            Merging copies every page exactly as it was — nothing is re-rendered or downgraded:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>All pages from every file, in the order you choose</li>
            <li>Original text, images, and layout, at full quality</li>
            <li>Page orientation and size, preserved per page</li>
            <li>A brand-new file — your source documents are never modified</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Note on Privacy</h2>
          <p className="text-gray-700 mb-6">
            The files people merge — tax documents, medical records, contracts, IDs — are often exactly the
            ones you don&apos;t want sitting on a stranger&apos;s server. Many online merge tools upload your
            files to process them. <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>{" "}
            does the work entirely in your browser, so your documents never leave your device and nothing is
            stored anywhere.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-merge-pdf-files-without-software" className="text-blue-600 hover:underline">How to merge PDFs without installing software</Link></li>
            <li><Link href="/blog/how-to-reorder-pdf-pages" className="text-blue-600 hover:underline">How to reorder PDF pages</Link></li>
            <li><Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">How to split a PDF</Link></li>
            <li><Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">How to compress a PDF</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Is it free to merge PDFs?</h3>
          <p className="text-gray-700 mb-4">
            Yes, completely free. There&apos;s no hidden fee, no premium tier, and no cap on how many files
            you merge or how often you do it.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">How many PDFs can I merge at once?</h3>
          <p className="text-gray-700 mb-4">
            There&apos;s no fixed limit. The practical ceiling is your device&apos;s memory, since processing
            happens locally — but modern browsers handle dozens of files comfortably.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I reorder pages before merging?</h3>
          <p className="text-gray-700 mb-4">
            Yes. The page panel lets you drag any page anywhere, so you can interleave documents or move a
            single page — you&apos;re not limited to stacking whole files end to end.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Will merging reduce the quality of my pages?</h3>
          <p className="text-gray-700 mb-4">
            No. Pages are copied as-is with no re-compression, so text stays sharp and images keep their
            original resolution.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I merge a password-protected PDF?</h3>
          <p className="text-gray-700 mb-4">
            Only after it&apos;s unlocked. Enter the password when prompted (or remove it first), then include
            the file in your merge like any other.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Will my merged PDF have a watermark?</h3>
          <p className="text-gray-700 mb-4">
            No watermarks, ever. The merged file looks clean and professional, exactly as you arranged it.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Do I need an account?</h3>
          <p className="text-gray-700 mb-4">
            No signup required. Open the site, add your PDFs, merge, and download.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I merge PDFs on my phone?</h3>
          <p className="text-gray-700 mb-6">
            Yes. The editor works in any modern mobile browser and adapts to smaller screens, so you can
            merge files from your phone or tablet without an app.
          </p>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
