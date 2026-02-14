"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToAddTextToPdf() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Add Text to a PDF for Free (2026 Guide)
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
            Need to add text to a PDF? Whether you&apos;re filling in a form, adding notes, 
            or labeling a diagram, you can insert text anywhere in a PDF document — 
            completely free, no software required.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Reasons to Add Text to a PDF
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Fill out forms</strong> — Add your information to PDF forms</li>
            <li><strong>Add comments</strong> — Insert notes and annotations</li>
            <li><strong>Label images</strong> — Add captions and descriptions</li>
            <li><strong>Correct errors</strong> — Fix typos or update information</li>
            <li><strong>Add headers/footers</strong> — Insert page numbers or titles</li>
            <li><strong>Complete applications</strong> — Fill in job or school applications</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Add Text: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 1: Upload Your PDF
          </h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and 
            upload your PDF by dragging it onto the page or clicking to browse.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 2: Select the Text Tool
          </h3>
          <p className="text-gray-700 mb-4">
            Click the text tool in the toolbar. Your cursor will change to indicate 
            you&apos;re in text mode.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 3: Click Where You Want Text
          </h3>
          <p className="text-gray-700 mb-4">
            Click anywhere on the PDF where you want to add text. A text box will 
            appear at that location.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 4: Type Your Text
          </h3>
          <p className="text-gray-700 mb-4">
            Start typing. You can customize the font, size, and color to match the 
            document or stand out as needed.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 5: Position and Download
          </h3>
          <p className="text-gray-700 mb-6">
            Drag the text box to fine-tune positioning. When you&apos;re satisfied, 
            download your updated PDF.
          </p>

          <AdUnit slot="MIDDLE_BANNER" format="horizontal" className="my-8" />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to add text to your PDF?
            </h3>
            <p className="text-blue-800 mb-4">
              No signup, no watermarks, completely free.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Text Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Text Formatting Options
          </h2>
          <p className="text-gray-700 mb-4">
            When adding text, you have several formatting options:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Font family</strong> — Choose from common fonts like Arial, Times New Roman, or Helvetica</li>
            <li><strong>Font size</strong> — Adjust from tiny labels to large headings</li>
            <li><strong>Color</strong> — Pick any color to match or contrast with the document</li>
            <li><strong>Bold and italic</strong> — Add emphasis to your text</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Adding Text to PDFs
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Match the Existing Font
          </h3>
          <p className="text-gray-700 mb-4">
            If you&apos;re filling in a form, try to match the font style and size of 
            the existing text. This makes your additions look natural and professional.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Use Contrasting Colors for Notes
          </h3>
          <p className="text-gray-700 mb-4">
            If you&apos;re adding comments or annotations meant to stand out, use a 
            different color. Red or blue text on a black-text document is clearly visible.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Zoom In for Precision
          </h3>
          <p className="text-gray-700 mb-4">
            When positioning text in tight spaces (like form fields), zoom in for 
            more precise placement.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Adding Text vs. Editing Existing Text
          </h2>
          <p className="text-gray-700 mb-4">
            It&apos;s important to understand the difference:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Adding text</strong> — Places new text on top of the PDF</li>
            <li><strong>Editing existing text</strong> — Modifies text that&apos;s already in the document</li>
          </ul>
          <p className="text-gray-700 mb-6">
            EditPDFs.app allows you to add new text anywhere. Editing existing text 
            is more complex and depends on how the PDF was created. Scanned documents 
            (which are images) can&apos;t have their text directly edited.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free to add text to PDFs?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, completely free. No limits on how much text you add or how many 
            documents you edit.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will the text be permanent?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. When you download the PDF, the text is embedded in the document. 
            It will display in any PDF viewer.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I add text to a scanned PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes! You can add text on top of any PDF, including scanned documents. 
            The text appears as a layer above the scanned image.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I delete text I added?
          </h3>
          <p className="text-gray-700 mb-4">
            Before downloading, you can select and delete any text you&apos;ve added. 
            After downloading, you&apos;d need to re-upload and edit again.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does this work on my phone?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. EditPDFs.app works on any device with a modern browser — phones, 
            tablets, and computers.
          </p>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
