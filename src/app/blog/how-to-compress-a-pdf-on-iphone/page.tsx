"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToCompressPdfOnIphone() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">← Back to Blog</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Compress a PDF on iPhone</h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Mike</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-03-09">March 9, 2026</time>
            <span className="mx-2">•</span>
            <span>9 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            You go to email a scanned form from your iPhone and the app bounces it back: file too large. It&apos;s
            one of the most frustrating little walls in iOS, because the iPhone makes it easy to <em>create</em>
            big PDFs but gives you almost nothing built in to shrink them. This guide covers what actually works
            on an iPhone or iPad — the native tricks, their real limits, and the fastest browser method — so you
            can get under that limit in about two minutes without installing anything.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why iPhone PDFs Balloon in the First Place</h2>
          <p className="text-gray-700 mb-4">
            Understanding the cause tells you which fix will help. On iOS, almost all oversized PDFs trace back to
            images rather than text:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Scans from the Notes or Files scanner</strong> — these save each page as a high-resolution photo, so a 10-page scan can easily top 20&nbsp;MB.</li>
            <li><strong>Camera-roll photos dropped into a PDF</strong> — a single 12-megapixel image adds several megabytes on its own.</li>
            <li><strong>Big white margins</strong> from scanning a document on a dark table — wasted pixels still cost file size.</li>
            <li><strong>Merged documents</strong> — combining several PDFs stacks all their images into one heavy file.</li>
            <li><strong>Repeated re-exports</strong> that pile on metadata and never discard the original high-res data.</li>
          </ul>
          <p className="text-gray-700 mb-6">
            The takeaway: a text-only PDF is almost never the problem. If your file is huge, it&apos;s the images — so
            effective compression means re-encoding those images at a sensible resolution, which is exactly what iOS
            won&apos;t do for you natively.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Native iPhone Options (and Where They Fall Short)</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The &quot;Print to PDF&quot; re-save trick</h3>
          <p className="text-gray-700 mb-4">
            The one genuinely native trick: open the PDF in the Files app, tap Share → Print, then on the print
            preview pinch <em>outward</em> with two fingers to open it as a new PDF, and share that copy. Re-saving
            this way sometimes flattens and slightly shrinks a file. The catch — it&apos;s unpredictable: on many
            scanned documents it barely changes the size, and on some it actually makes the file <em>bigger</em>. Fine
            as a 30-second gamble, not something to rely on.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The Files app and Mail</h3>
          <p className="text-gray-700 mb-4">
            The Files app itself has no compress button. Mail will offer to scale down <em>image</em> attachments, but
            not PDFs. So the common advice to &quot;just use the Files app&quot; doesn&apos;t actually reduce a PDF —
            it only moves it around.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Shortcuts</h3>
          <p className="text-gray-700 mb-6">
            You can build a Shortcut that re-saves a PDF, and it&apos;s handy for convenience, but the Shortcuts app has
            no real image-downsampling action — so for the image-heavy scans that cause most size problems, it gives
            you little. It&apos;s automation, not compression.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Fastest Method: Compress in Safari (No App, No Upload)</h2>
          <p className="text-gray-700 mb-4">
            Because the real fix is re-encoding the images, the quickest reliable route is a browser tool that does
            exactly that — right on your phone, with the file never leaving your device.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Open EditPDFs.app in Safari</h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> in Safari. There&apos;s no
            app to download and no account to create — it loads as a normal web page.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Upload from the Files app</h3>
          <p className="text-gray-700 mb-4">
            Tap to add a file, and the iOS file picker opens. Choose your PDF from <strong>iCloud Drive</strong>,
            <strong> On My iPhone</strong>, or wherever you saved it. If you just scanned something in Notes, save it to
            Files first so it shows up here.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Trim obvious bloat, then compress</h3>
          <p className="text-gray-700 mb-4">
            Before exporting, delete any blank pages, duplicate scans, or pages the recipient doesn&apos;t need —
            dropping one image-heavy page often saves more than compression itself. Then run the compression to
            re-encode the images at a smaller size.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Save the smaller copy back to Files</h3>
          <p className="text-gray-700 mb-6">
            Download the optimized PDF — it lands in your Safari downloads / Files. From there, attach it to an email,
            an upload form, or a message. Your original is untouched, so you always have the full-quality version.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Quick win</h3>
            <p className="text-blue-800 mb-4">
              If you&apos;re only a little over the limit, you usually don&apos;t need heavy compression — removing a
              single full-page photo or scan is often enough to slip under the cap with full quality everywhere else.
            </p>
            <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Compress a PDF on iPhone →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get a Smaller File from the Start</h2>
          <p className="text-gray-700 mb-4">
            A little prevention beats compression. When you&apos;re the one creating the PDF on your iPhone:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Use the document scanner, not the camera.</strong> The Notes/Files scanner crops to the page and corrects perspective, which is far leaner than a raw photo of a document.</li>
            <li><strong>Crop tight.</strong> Trimming dark table backgrounds and white borders cuts pixels you&apos;re paying for in file size.</li>
            <li><strong>Don&apos;t scan in color if you don&apos;t need it.</strong> A black-and-white or grayscale scan of a printed form is dramatically smaller than full color.</li>
            <li><strong>Skip &quot;maximum quality&quot;</strong> unless it&apos;s headed for print. Screen-readable is plenty for forms and contracts.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting on iPhone</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">It&apos;s still too big for email or the upload form</h3>
          <p className="text-gray-700 mb-4">
            Compress, then also remove non-essential pages, or{" "}
            <Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">split the PDF</Link> into two
            smaller files — many upload forms limit per-file size, not your total submission.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The text or scan looks too soft afterward</h3>
          <p className="text-gray-700 mb-4">
            You compressed harder than the source could take. Re-do it from the original at a lighter setting. If even
            light compression looks rough, the original scan was low quality to begin with — rescan it cleaner rather
            than compressing a poor capture.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">I can&apos;t find the file after downloading</h3>
          <p className="text-gray-700 mb-4">
            Safari downloads go to the Downloads folder in Files (often inside iCloud Drive). Open Files → Browse →
            Downloads. You can move it to <strong>On My iPhone</strong> if you&apos;d rather keep it off iCloud.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The scan from Notes is enormous</h3>
          <p className="text-gray-700 mb-6">
            That&apos;s the most common iPhone case, and it&apos;s purely the scan resolution. Compressing the images
            is the only real fix — the native re-save trick rarely dents these. See our general{" "}
            <Link href="/blog/how-to-reduce-pdf-file-size" className="text-blue-600 hover:underline">guide to reducing PDF size</Link>{" "}
            for how image re-encoding works.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Word on Privacy</h2>
          <p className="text-gray-700 mb-6">
            The PDFs people compress on a phone are often the most sensitive ones — tax documents, IDs, leases,
            insurance and medical forms. Many &quot;compress PDF&quot; sites upload your file to their servers to
            process it, which is the last thing you want for paperwork like that. With{" "}
            <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, compression runs in your
            browser on the device itself, so the file never gets uploaded anywhere.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Does the iPhone have a built-in PDF compressor?</h3>
          <p className="text-gray-700 mb-4">
            No. iOS has no dedicated compress button for PDFs. The closest native option is re-saving via Print to PDF,
            which is unreliable — a browser tool that re-encodes the images is the dependable route.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">How small should a PDF be to email?</h3>
          <p className="text-gray-700 mb-4">
            Aim for under 10&nbsp;MB to be safe across providers. Gmail allows up to 25&nbsp;MB and iCloud Mail 20&nbsp;MB,
            but the recipient&apos;s server may be stricter, so smaller is safer.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Will compressing make my scan blurry?</h3>
          <p className="text-gray-700 mb-4">
            Light to moderate compression keeps text and scans readable. Blurriness comes from over-compressing or from
            a low-quality original — start gentle and only push harder if you need to.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Do I need to install an app?</h3>
          <p className="text-gray-700 mb-4">
            No. Everything runs in Safari, so there&apos;s nothing to download and no account to set up.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Is it free?</h3>
          <p className="text-gray-700 mb-4">
            Yes — compressing a PDF on EditPDFs.app is free, with no signup or watermark.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I compress a password-protected PDF on iPhone?</h3>
          <p className="text-gray-700 mb-4">
            Yes, as long as you know the password and can open the file. If you want to strip the password too, see{" "}
            <Link href="/blog/how-to-remove-password-from-pdf" className="text-blue-600 hover:underline">how to remove a PDF password</Link>.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Does this work on iPad too?</h3>
          <p className="text-gray-700 mb-6">
            Yes. The steps are identical on iPadOS in Safari, and the larger screen makes trimming pages before
            compressing even easier.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-reduce-pdf-file-size" className="text-blue-600 hover:underline">How to reduce PDF file size without losing quality</Link></li>
            <li><Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">How to compress a PDF (desktop &amp; web)</Link></li>
            <li><Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">How to split a PDF into multiple files</Link></li>
            <li><Link href="/blog/how-to-merge-pdfs" className="text-blue-600 hover:underline">How to merge PDFs</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
