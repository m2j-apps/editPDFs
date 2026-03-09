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
            <span>March 9, 2026</span>
            <span className="mx-2">•</span>
            <span>10 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Trying to email a PDF from your iPhone and getting hit with a file size limit is the worst. The good news is you can shrink PDFs directly from your phone in a few minutes, even if you are not super technical.
          </p>

          <p className="text-gray-700 mb-4">
            In this guide, you will learn the easiest way to compress a PDF on iPhone, plus backup options when a file is still too big.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why PDFs Get Huge on iPhone</h2>
          <p className="text-gray-700 mb-4">Most oversized PDFs come from one of these causes:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Scanned pages saved at very high resolution</li>
            <li>Photos pasted into the PDF directly from the camera roll</li>
            <li>Multiple documents merged into one large file</li>
            <li>Extra pages that were never removed</li>
            <li>Repeated exports that add metadata and bloat</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Fastest Method: Compress in Your Browser</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Open Safari and go to EditPDFs.app</h3>
          <p className="text-gray-700 mb-4">
            Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> in Safari on iPhone. You do not need to install an app or create an account.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Upload your PDF from Files</h3>
          <p className="text-gray-700 mb-4">
            Tap upload, then choose the file from iCloud Drive, On My iPhone, or another location in the Files app.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Remove extra pages first</h3>
          <p className="text-gray-700 mb-4">
            If your document has blank pages, duplicate scans, or unnecessary attachments, remove those before exporting. This often cuts size more than people expect.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Download the optimized PDF</h3>
          <p className="text-gray-700 mb-6">
            Save the compressed copy back to Files. Then share it by email, upload form, text message, or your cloud drive.
          </p>

          <AdUnit slot="MIDDLE_BANNER" format="horizontal" className="my-8" />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Quick win</h3>
            <p className="text-blue-800 mb-4">
              If a PDF is just over the upload limit, removing one image heavy page can be enough to pass.
            </p>
            <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Compress PDF on iPhone →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Alternative Option: Use the Files App Shortcut Workflow</h2>
          <p className="text-gray-700 mb-4">
            If you prefer a fully Apple-native flow, you can build a Shortcut that resaves documents and strips some overhead. It is not always as effective as a dedicated PDF tool, but it helps in simple cases.
          </p>
          <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
            <li>Open the Shortcuts app.</li>
            <li>Create a new shortcut that accepts PDF input from Share Sheet.</li>
            <li>Add actions to save, rename, and export to Files.</li>
            <li>Run it from Share in Files when needed.</li>
          </ol>
          <p className="text-gray-700 mb-6">
            This method is good for convenience but not ideal for large scanned packets. For heavy compression, browser-based tools usually do better.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Practices for Better Compression Results</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Scan smarter from the start</h3>
          <p className="text-gray-700 mb-4">
            If you use Notes or a scanner app, avoid ultra-high settings unless you need print-grade quality. For forms and contracts, moderate settings are usually perfect.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Crop before export</h3>
          <p className="text-gray-700 mb-4">
            Massive white borders from camera scans increase page dimensions and file weight. Cropping can help quality and size at the same time.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Split huge files into parts</h3>
          <p className="text-gray-700 mb-4">
            If one PDF has 200 pages, make separate files like Part 1 and Part 2. Upload forms often care about single-file limits, not total project size.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Remove photos you do not need</h3>
          <p className="text-gray-700 mb-6">
            One full-resolution iPhone photo can add several megabytes. Keep only pages and visuals that matter for your recipient.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common iPhone PDF Size Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">How small should a PDF be for email?</h3>
          <p className="text-gray-700 mb-4">Try to stay under 10 MB to avoid issues across providers. Some allow more, but 10 MB is a safe target.</p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Will compression make text blurry?</h3>
          <p className="text-gray-700 mb-4">
            Good compression should keep text sharp. If a result looks fuzzy, the original scan quality was likely too low or images were over-compressed.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I compress password-protected PDFs on iPhone?</h3>
          <p className="text-gray-700 mb-4">
            Yes, as long as you know the password and can open the file first.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Do I need to install any app?</h3>
          <p className="text-gray-700 mb-6">
            No. You can do it from Safari with no installation required.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Privacy on Mobile Matters</h2>
          <p className="text-gray-700 mb-4">
            A lot of PDFs on iPhone are personal. Tax docs, IDs, lease agreements, insurance forms, and healthcare paperwork should not bounce around unknown servers.
          </p>
          <p className="text-gray-700 mb-6">
            That is why tools that process files locally are a strong choice. With <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, processing happens in your browser so your PDF stays on your device.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">If Your File Is Still Too Big</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Delete pages that are not required for submission</li>
            <li>Split one giant PDF into two smaller files</li>
            <li>Rescan image-heavy pages at lower resolution</li>
            <li>Ask whether the recipient accepts cloud links instead of attachments</li>
            <li>Try exporting in batches, then merging only what is needed</li>
          </ul>

          <p className="text-gray-700 mb-6">
            For most users, a quick pass through compression plus a page cleanup is enough to get under upload limits. Once you do it a couple times, it becomes a 2 minute routine.
          </p>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
