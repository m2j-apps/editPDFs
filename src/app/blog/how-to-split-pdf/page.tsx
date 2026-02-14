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
            <span>February 14, 2026</span>
            <span className="mx-2">•</span>
            <span>6 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Have a large PDF that you need to break into smaller pieces? Whether you want to extract 
            specific pages, split by chapter, or separate a document into individual pages, 
            you can do it all for free — no software installation required.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Split a PDF?
          </h2>
          <p className="text-gray-700 mb-4">
            There are many reasons you might need to split a PDF document:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Extract specific pages</strong> — Pull out just the pages you need to share</li>
            <li><strong>Reduce file size</strong> — Smaller files are easier to email and upload</li>
            <li><strong>Organize content</strong> — Separate chapters, sections, or topics</li>
            <li><strong>Meet upload limits</strong> — Many websites have PDF size restrictions</li>
            <li><strong>Share selectively</strong> — Send only relevant portions to different people</li>
            <li><strong>Archive efficiently</strong> — Store related pages together</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            3 Ways to Split a PDF
          </h2>
          <p className="text-gray-700 mb-4">
            Depending on your needs, there are different approaches to splitting PDFs:
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            1. Extract Specific Pages
          </h3>
          <p className="text-gray-700 mb-4">
            This is the most common method. Select exactly which pages you want to extract — 
            for example, pages 1, 3, and 7-10. The selected pages become a new PDF while 
            leaving your original file unchanged.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            2. Split by Page Ranges
          </h3>
          <p className="text-gray-700 mb-4">
            Define multiple ranges to create several PDFs at once. For example, split a 
            20-page document into pages 1-5, 6-10, 11-15, and 16-20 — creating four 
            separate 5-page documents.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            3. Split Every Page
          </h3>
          <p className="text-gray-700 mb-4">
            Turn each page into its own individual PDF file. A 10-page document becomes 
            10 separate single-page PDFs. This is useful when you need to process or 
            distribute pages individually.
          </p>

          <AdUnit slot="MIDDLE_BANNER" format="horizontal" className="my-8" />

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Split a PDF: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 1: Upload Your PDF
          </h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and 
            drag your PDF file onto the upload area, or click to browse and select your file. 
            Your document loads instantly in the browser.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 2: View All Pages
          </h3>
          <p className="text-gray-700 mb-4">
            Once loaded, you&apos;ll see thumbnail previews of every page in your document. 
            This makes it easy to identify exactly which pages you want to extract.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 3: Select Pages to Extract
          </h3>
          <p className="text-gray-700 mb-4">
            Click on the pages you want to include in your new PDF. Selected pages are 
            highlighted so you can see exactly what you&apos;re extracting. You can select 
            multiple pages in any order.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 4: Download Your Split PDF
          </h3>
          <p className="text-gray-700 mb-6">
            Click the download button to save your new PDF containing only the selected pages. 
            Your original file remains unchanged — you can go back and extract different 
            pages if needed.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to split your PDF?
            </h3>
            <p className="text-blue-800 mb-4">
              No signup, no watermarks, no limits. Your files stay completely private.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Split Your PDF Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Splitting PDFs Effectively
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Check Your Page Numbers First
          </h3>
          <p className="text-gray-700 mb-4">
            Before splitting, scroll through the thumbnails to make sure you&apos;re selecting 
            the right pages. PDF page numbers don&apos;t always match the printed page numbers 
            in the document — especially if there are cover pages or Roman numeral introductions.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Keep Your Original Safe
          </h3>
          <p className="text-gray-700 mb-4">
            When you split a PDF with EditPDFs.app, your original file is never modified. 
            But it&apos;s still good practice to keep a backup of important documents before 
            making any changes.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Name Your Files Descriptively
          </h3>
          <p className="text-gray-700 mb-4">
            After downloading split PDFs, rename them with clear, descriptive names. 
            Instead of &quot;document_pages_1-5.pdf&quot;, use something like 
            &quot;Contract_Introduction.pdf&quot; or &quot;Report_Chapter1.pdf&quot;.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Privacy When Splitting PDFs Online
          </h2>
          <p className="text-gray-700 mb-4">
            Many online PDF tools upload your files to their servers for processing. 
            This raises privacy concerns, especially with sensitive documents like:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Legal contracts and agreements</li>
            <li>Financial statements and tax documents</li>
            <li>Medical records and health information</li>
            <li>Business proposals and confidential reports</li>
            <li>Personal identification documents</li>
          </ul>
          <p className="text-gray-700 mb-6">
            With <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, 
            all processing happens directly in your browser. Your files never leave your 
            device, and no one else can access them — not even us.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free to split PDFs?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, completely free. EditPDFs.app has no premium tier, no page limits, and no 
            watermarks on your output files.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I split a password-protected PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            You&apos;ll need to know the password to open the PDF first. Once it&apos;s open in the 
            editor, you can split it normally. We can&apos;t bypass PDF security.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will splitting affect the quality?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Splitting extracts pages exactly as they are — there&apos;s no re-encoding or 
            compression. Your split PDFs maintain the original quality.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I split a PDF on my phone?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes! EditPDFs.app works on any device with a modern browser — phones, tablets, 
            laptops, and desktops.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            How large can the PDF be?
          </h3>
          <p className="text-gray-700 mb-4">
            Since processing happens in your browser, the limit depends on your device&apos;s 
            memory. Most devices handle PDFs up to 100MB without issues. Very large files 
            may be slower to process.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I split multiple PDFs at once?
          </h3>
          <p className="text-gray-700 mb-4">
            Currently, you work with one PDF at a time. For multiple documents, simply 
            process them one after another — it&apos;s quick and easy.
          </p>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
