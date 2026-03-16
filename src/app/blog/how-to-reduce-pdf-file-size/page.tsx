"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToReducePdfFileSize() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            &larr; Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Reduce PDF File Size Without Losing Quality (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>EditPDFs Team</span>
            <span className="mx-2">&bull;</span>
            <span>March 9, 2026</span>
            <span className="mx-2">&bull;</span>
            <span>7 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Your PDF is too big to email, upload, or share &mdash; but you don&apos;t want blurry
            images or broken formatting. Good news: you can reduce PDF file size significantly
            while keeping everything looking sharp. Here&apos;s exactly how.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Are PDF Files So Large?
          </h2>
          <p className="text-gray-700 mb-4">
            Before you start shrinking, it helps to know what&apos;s making your PDF so big.
            The most common culprits:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>High-resolution images</strong> &mdash; A single 300 DPI photo can add several megabytes</li>
            <li><strong>Embedded fonts</strong> &mdash; Full font families embedded in the file add up fast</li>
            <li><strong>Scanned pages</strong> &mdash; Scanned documents are essentially large images, not text</li>
            <li><strong>Duplicate resources</strong> &mdash; PDFs created by merging multiple files sometimes carry redundant data</li>
            <li><strong>Hidden metadata</strong> &mdash; Edit history, comments, and form data can quietly inflate file size</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Reduce PDF File Size (Step by Step)
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Upload your PDF</h3>
          <p className="text-gray-700 mb-4">
            Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and
            drop your file in. There&apos;s no size limit and your file stays in your browser &mdash;
            nothing gets uploaded to a server.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Choose your compression level</h3>
          <p className="text-gray-700 mb-4">
            Most PDF compressors give you a slider or presets like &ldquo;low,&rdquo;
            &ldquo;medium,&rdquo; and &ldquo;high&rdquo; compression. Start with medium &mdash; it
            typically cuts file size by 40&ndash;60% without visible quality loss. You can always try
            high compression and compare the result.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Check the output</h3>
          <p className="text-gray-700 mb-4">
            Open the compressed PDF and zoom into any images, charts, or fine text. If everything
            looks clean, you&apos;re done. If something looks off, step back to a lighter compression
            setting and try again.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Download and share</h3>
          <p className="text-gray-700 mb-6">
            Save the smaller file and use it wherever you need &mdash; email attachments,
            form submissions, cloud storage, or your website.
          </p>

          <AdUnit slot="MIDDLE_BANNER" format="horizontal" className="my-8" />

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            5 Tips to Reduce PDF Size Without Losing Quality
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Downsample images to 150 DPI</h3>
          <p className="text-gray-700 mb-4">
            Most PDFs don&apos;t need 300 DPI images. For on-screen viewing and standard printing,
            150 DPI looks just as good and can cut image data in half. Only keep 300 DPI if you&apos;re
            sending to a professional printer.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Remove unnecessary pages first</h3>
          <p className="text-gray-700 mb-4">
            Before compressing, <Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">delete any blank
            or unnecessary pages</Link>. A 20-page PDF with 5 blank pages is carrying
            dead weight &mdash; remove them and you immediately save space.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Flatten form fields and annotations</h3>
          <p className="text-gray-700 mb-4">
            If your PDF has filled-in forms, comments, or markup you no longer need to edit,{" "}
            <Link href="/blog/how-to-flatten-pdf" className="text-blue-600 hover:underline">flatten
            the PDF</Link>. This merges interactive layers into the page and removes hidden data
            that inflates the file.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Use PDF format instead of scanned images</h3>
          <p className="text-gray-700 mb-4">
            If you&apos;re creating PDFs from scratch, export directly from the source app (Word,
            Google Docs, design tools) rather than printing to paper and scanning. Digital-origin
            PDFs are dramatically smaller because they contain real text, not images of text.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Split large documents</h3>
          <p className="text-gray-700 mb-6">
            If a 50-page report exceeds an upload limit, consider{" "}
            <Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">splitting
            it into smaller PDFs</Link> by section. Each part will be smaller and easier to handle.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Real-world example</h3>
            <p className="text-blue-800 mb-4">
              A 15 MB product catalog with high-res photos can often be compressed to 3&ndash;4 MB
              with medium compression &mdash; small enough to email as an attachment while still
              looking professional on screen and in print.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Reduce Your PDF Size Now &rarr;
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common File Size Limits You Might Hit
          </h2>
          <p className="text-gray-700 mb-4">
            Knowing the limits helps you set a target size:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Gmail</strong> &mdash; 25 MB per attachment</li>
            <li><strong>Outlook</strong> &mdash; 20 MB per attachment</li>
            <li><strong>Most web forms</strong> &mdash; 5&ndash;10 MB upload limit</li>
            <li><strong>WhatsApp</strong> &mdash; 100 MB for documents</li>
            <li><strong>Government portals</strong> &mdash; Often 2&ndash;5 MB per file</li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-yellow-900 mb-2">Warning</h3>
            <p className="text-yellow-800">
              Be cautious with online tools that require you to upload your PDF to their servers.
              Sensitive documents (tax returns, contracts, medical records) shouldn&apos;t be
              processed on someone else&apos;s server. With{" "}
              <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>,
              everything happens in your browser &mdash; your files never leave your device.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Compression vs. Quality: What to Expect
          </h2>
          <p className="text-gray-700 mb-4">
            Here&apos;s a rough guide to what different compression levels do:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Light compression (10&ndash;30% smaller)</strong> &mdash; Virtually no visible change. Safe for any document.</li>
            <li><strong>Medium compression (40&ndash;60% smaller)</strong> &mdash; Best balance. Images stay sharp at normal zoom. Ideal for email and web.</li>
            <li><strong>Heavy compression (70%+ smaller)</strong> &mdash; Noticeable on high-detail photos. Fine for text-heavy documents or internal drafts.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">How to compress a PDF</Link></li>
            <li><Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">How to delete pages from a PDF</Link></li>
            <li><Link href="/blog/how-to-flatten-pdf" className="text-blue-600 hover:underline">How to flatten a PDF</Link></li>
            <li><Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">How to split a PDF</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
