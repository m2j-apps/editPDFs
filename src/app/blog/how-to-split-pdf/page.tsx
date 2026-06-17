"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToSplitPdf() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Split a PDF into Multiple Files for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Mike</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-02-16">February 16, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            One bloated PDF is rarely what you actually need to send. Maybe a colleague only wants the
            signature page, an upload form rejects your 80-page report, or you scanned a stack of receipts
            into a single file and need them apart again. Splitting fixes all of it — and you can do every
            version of it for free, right in your browser, without installing anything.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Split a PDF?
          </h2>
          <p className="text-gray-700 mb-4">
            &quot;Splitting&quot; covers a handful of related jobs people reach for constantly:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Pull out the pages that matter</strong> — share a single contract clause instead of the whole agreement</li>
            <li><strong>Get under an upload limit</strong> — break a large file into pieces a portal will accept</li>
            <li><strong>Separate combined scans</strong> — turn one multi-page scan back into individual documents</li>
            <li><strong>Send selectively</strong> — give each recipient only the section meant for them</li>
            <li><strong>Organize by chapter or topic</strong> — split a manual into per-section files</li>
            <li><strong>Trim the weight</strong> — a shorter file is faster to email, store, and open</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Four Ways to Split a PDF — Pick the One That Fits
          </h2>
          <p className="text-gray-700 mb-4">
            Before you start clicking, it helps to know which kind of split you actually want. They produce
            very different output:
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            1. Extract a single page
          </h3>
          <p className="text-gray-700 mb-4">
            Grab exactly one page — the invoice, the signed page, the diagram — and save it as its own PDF.
            The fastest, most common split.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            2. Extract a page range
          </h3>
          <p className="text-gray-700 mb-4">
            Pull a continuous run such as pages 5–12 into a new file. Ideal for lifting one chapter or
            section out of a longer document while leaving the rest behind.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            3. Split into several files at once
          </h3>
          <p className="text-gray-700 mb-4">
            Define multiple ranges and produce them together — for example, turning a 20-page document into
            four separate 5-page files (1–5, 6–10, 11–15, 16–20). Useful when one large document is really
            several documents stuck together.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            4. Separate every page
          </h3>
          <p className="text-gray-700 mb-4">
            Burst the whole file so each page becomes its own single-page PDF. A 10-page file becomes 10
            files — handy when pages need to be routed, signed, or filed individually.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Split a PDF: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 1: Open your PDF
          </h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and drop your
            file onto the upload area (or click to browse). It loads straight away in the browser — nothing
            is sent to a server. If the file has an open password, you&apos;ll be prompted to enter it first.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 2: Review the page thumbnails
          </h3>
          <p className="text-gray-700 mb-4">
            You&apos;ll see a thumbnail of every page laid out in order. Scroll through and confirm the page
            numbers, because the PDF&apos;s page count rarely matches the numbers printed on the pages
            themselves — cover sheets and Roman-numeral intros throw it off.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 3: Choose what to keep
          </h3>
          <p className="text-gray-700 mb-4">
            Click the pages you want in your new file. Selected pages are highlighted, so you can see your
            selection building up before you commit. Pick a single page, a tidy range, or a scattered set —
            the order you click doesn&apos;t lock you in.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 4: Export
          </h3>
          <p className="text-gray-700 mb-6">
            Download your new PDF containing just the selected pages. If you split into several files at
            once, you&apos;ll get each one to save. Your original is never touched, so you can come straight
            back and pull a different set of pages without re-uploading.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to split your PDF?
            </h3>
            <p className="text-blue-800 mb-4">
              No signup, no watermarks, no page limits — and your files stay on your device the whole time.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Split Your PDF Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Split vs. Delete vs. Merge — Which Do You Actually Need?
          </h2>
          <p className="text-gray-700 mb-4">
            These three operations get confused constantly, and choosing the wrong one means redoing the
            work:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Split</strong> keeps the pages you select and saves them as a new file — the original
              stays whole. Reach for it when you want a <em>copy</em> of part of a document.
            </li>
            <li>
              <strong>Delete</strong> removes pages so what&apos;s left is the document minus those pages.
              If your goal is &quot;get rid of the blank pages,&quot; see{" "}
              <Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">
                how to delete pages from a PDF
              </Link>
              .
            </li>
            <li>
              <strong>Merge</strong> does the opposite of splitting — it combines several PDFs into one. If
              you split too aggressively, you can recombine with{" "}
              <Link href="/blog/how-to-merge-pdfs" className="text-blue-600 hover:underline">
                how to merge PDFs
              </Link>
              .
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            I selected the wrong pages
          </h3>
          <p className="text-gray-700 mb-4">
            Nothing is final until you export, so just click a page again to deselect it and adjust your
            selection. If you only realize after downloading, your original is untouched — reopen it and
            split again.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The thumbnails are slow on a big document
          </h3>
          <p className="text-gray-700 mb-4">
            Because everything runs locally, a few-hundred-page or image-heavy file leans on your
            device&apos;s memory. Give the thumbnails a moment to render, close other heavy browser tabs,
            and the selection will stay responsive.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            It won&apos;t open my protected file
          </h3>
          <p className="text-gray-700 mb-4">
            A PDF with an open password has to be unlocked before it can be split. Enter the password when
            prompted; if you don&apos;t have it, see{" "}
            <Link href="/blog/how-to-remove-password-from-pdf" className="text-blue-600 hover:underline">
              how to remove a password from a PDF
            </Link>{" "}
            (you&apos;ll still need to know the current one).
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            I wanted one combined file, not many
          </h3>
          <p className="text-gray-700 mb-6">
            If you ended up with several files but wanted them in one, you reached for a per-range or
            per-page split when a single extraction (Method 1 or 2) was what you needed. Re-open the
            original and select all the pages you want into one new file instead.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Splitting on Specific Devices</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows / Mac (any browser):</strong> The steps above work identically with no
              install. On Mac, Preview can extract pages too, but the browser route handles ranges and
              every-page bursts more directly.
            </li>
            <li>
              <strong>iPhone / iPad:</strong> Open EditPDFs.app in Safari — tap to select pages and the
              split files save to the Files app. No App Store download needed.
            </li>
            <li>
              <strong>Android:</strong> Chrome works the same way; downloaded pieces land in your Downloads
              folder.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Few Real-World Uses</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Lifting a single chapter out of an ebook or manual to study on its own</li>
            <li>Separating a batch scan of receipts so each can be filed against the right expense</li>
            <li>Extracting one invoice from a monthly statement to forward to accounting</li>
            <li>Breaking a long report into per-section files for different reviewers</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Privacy When Splitting PDFs Online
          </h2>
          <p className="text-gray-700 mb-4">
            Most &quot;split PDF&quot; sites upload your file to their servers to process it — a real concern
            for the kind of documents people most often split:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Contracts and signed agreements</li>
            <li>Financial statements and tax paperwork</li>
            <li>Medical and insurance records</li>
            <li>ID documents and confidential reports</li>
          </ul>
          <p className="text-gray-700 mb-6">
            With <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> the split
            happens entirely in your browser. The file never leaves your device, so there&apos;s no upload
            to intercept, cache, or retain — not even by us.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free to split PDFs?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, completely. There&apos;s no premium tier, no page cap, and no watermark on the files you
            download.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            What&apos;s the difference between splitting and deleting pages?
          </h3>
          <p className="text-gray-700 mb-4">
            Splitting saves the pages you select as a new file and leaves the original intact. Deleting
            removes pages so you&apos;re left with the document minus them. Use splitting when you want a copy
            of part of a file; use deleting when you want to permanently drop pages.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I split a password-protected PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            Only if you can open it. Enter the password when prompted and it splits normally. There&apos;s no
            way to split a file you can&apos;t unlock — that protection is working as intended.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will splitting reduce the quality?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Pages are extracted exactly as they are, with no re-encoding or compression, so text stays
            crisp and images keep their original resolution.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I split a PDF on my phone?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. It runs in any modern mobile browser — Safari on iPhone/iPad, Chrome on Android — with the
            same page-selection flow as on desktop.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            How large a PDF can I split?
          </h3>
          <p className="text-gray-700 mb-4">
            Because processing is local, the practical limit is your device&apos;s memory. Most files up to
            around 100MB split without trouble; very large or image-heavy documents just take a little longer
            to render.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does splitting change the original file?
          </h3>
          <p className="text-gray-700 mb-4">
            Never. Splitting always creates new files and leaves your source document exactly as it was, so
            you can re-split it as many ways as you like.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I split several PDFs at once?
          </h3>
          <p className="text-gray-700 mb-6">
            You work with one document at a time. For a batch, process them one after another — each split
            takes only a few seconds.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-merge-pdfs" className="text-blue-600 hover:underline">How to merge PDFs</Link></li>
            <li><Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">How to delete pages from a PDF</Link></li>
            <li><Link href="/blog/how-to-reorder-pdf-pages" className="text-blue-600 hover:underline">How to reorder PDF pages</Link></li>
            <li><Link href="/blog/how-to-extract-images-from-pdf" className="text-blue-600 hover:underline">How to extract images from a PDF</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
