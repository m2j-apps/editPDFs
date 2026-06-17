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
            <span>Mike</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-02-12">February 12, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            A PDF you can&apos;t type into is frustrating — especially when you just need to drop a date
            onto a contract, label a diagram, or finish a form that has no clickable fields. The good news:
            you can place new text anywhere on a PDF in your browser, free, without installing anything.
            This guide shows exactly how, explains the one distinction that confuses most people, and fixes
            the alignment and font problems that make added text look out of place.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            First, Know What &quot;Adding Text&quot; Actually Means
          </h2>
          <p className="text-gray-700 mb-4">
            People search for &quot;add text to PDF&quot; wanting three quite different things. Knowing
            which one you need saves a lot of frustration:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Adding new text (this guide)</strong> — You place a fresh text box on top of the page
              and type into it. This works on <em>any</em> PDF, including scans, because your text sits in
              a new layer above the existing content.
            </li>
            <li>
              <strong>Editing existing text</strong> — You want to change words that are already printed in
              the document. That&apos;s a different operation, and on a scanned PDF it isn&apos;t possible
              without OCR, since the &quot;text&quot; is really part of an image.
            </li>
            <li>
              <strong>Filling form fields</strong> — If the PDF has interactive boxes that highlight when
              you click them, you&apos;re better off using those directly. See{" "}
              <Link href="/blog/how-to-fill-pdf-forms" className="text-blue-600 hover:underline">
                how to fill PDF forms
              </Link>
              .
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            Everything below covers the first case — overlaying your own text — which is the most flexible
            because it never depends on how the original PDF was built.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Add Text: Step-by-Step</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Upload your PDF</h3>
          <p className="text-gray-700 mb-4">
            Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and drag your
            file onto the page (or click to browse). It opens in the editor with a live preview of every
            page — nothing is sent to a server.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Select the text tool</h3>
          <p className="text-gray-700 mb-4">
            Choose the text tool from the toolbar. Your cursor switches to a crosshair or I-beam, signalling
            that your next click will drop a text box rather than select something.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Click where you want the text</h3>
          <p className="text-gray-700 mb-4">
            Navigate to the right page, then click the spot where the text should begin. A small editable
            box appears with a blinking cursor. Don&apos;t worry about getting the position pixel-perfect
            yet — you can nudge it afterward.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Type and style it</h3>
          <p className="text-gray-700 mb-4">
            Type your text, then set the font, size, and color. To blend in with a form or document, match
            the surrounding text as closely as you can; to make a note stand out, pick a contrasting color
            like red or blue.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 5: Position and export</h3>
          <p className="text-gray-700 mb-6">
            Drag the box to fine-tune placement, resize it if the text wraps awkwardly, and confirm it sits
            on the correct page. When it looks right, export the file — the text is baked into the
            downloaded PDF and will display identically in any viewer.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to type on your PDF?</h3>
            <p className="text-blue-800 mb-4">
              Add text anywhere on the page — no signup, no watermarks, completely free and private.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Text Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Formatting So Your Text Looks Native</h2>
          <p className="text-gray-700 mb-4">
            Added text gives itself away when the styling is off. A few adjustments make it look like it
            was always part of the document:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Match the font family</strong> — Most official documents use Arial, Helvetica, or Times New Roman. Pick the closest match.</li>
            <li><strong>Match the size</strong> — Compare against nearby text; 10–12pt is typical for body copy, smaller for form lines.</li>
            <li><strong>Use color deliberately</strong> — Black to blend in for forms; a contrasting color only when you <em>want</em> the note to be noticed.</li>
            <li><strong>Add emphasis sparingly</strong> — Bold or italic helps a heading or callout, but overusing it looks amateur.</li>
          </ul>
          <p className="text-gray-700 mb-6">
            For tight spots like a signature line or a narrow form cell, zoom in first. Placement is far
            more precise at 150–200% than at fit-to-width.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The text won&apos;t line up with a form line or box</h3>
          <p className="text-gray-700 mb-4">
            Zoom in before placing it, and drop the baseline of your text just above the printed line rather
            than on it. Nudge with small drags; if your tool supports arrow-key movement, that&apos;s the
            most precise way to settle it into place.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The font looks different from the document</h3>
          <p className="text-gray-700 mb-4">
            PDFs can embed fonts you don&apos;t have available as an overlay option. Choose the nearest
            standard font (Arial for most sans-serif documents, Times New Roman for serif) and match the
            size — readers rarely notice a close substitute, only an obvious mismatch.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">My text sits on top of existing content</h3>
          <p className="text-gray-700 mb-4">
            Added text is a layer, so it can overlap what&apos;s underneath. Move the box to clear space, or
            shrink the font so it fits the gap. There&apos;s no way to &quot;push&quot; the original content
            aside — that would require true text editing, not an overlay.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">I can&apos;t add text to this PDF at all</h3>
          <p className="text-gray-700 mb-4">
            If the file is password-protected or restricted, you&apos;ll need to open it first — see{" "}
            <Link href="/blog/how-to-fill-pdf-forms" className="text-blue-600 hover:underline">
              filling forms
            </Link>{" "}
            for handling secured documents. A scanned PDF, on the other hand, accepts overlay text fine;
            you just can&apos;t edit the words already baked into the scan.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The text shifted after I exported</h3>
          <p className="text-gray-700 mb-6">
            This usually means the box was still in edit mode when you exported, or it was anchored to a
            zoom level. Click away to commit the text first, check the preview at 100%, then export and the
            position will hold.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Adding Text on Different Devices</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Windows / Mac (any browser):</strong> Works exactly as described above — a larger screen makes precise placement easier, so this is the smoothest experience.</li>
            <li><strong>iPhone / iPad:</strong> Open the editor in Safari and tap to place a box. Use pinch-to-zoom for accuracy, and a stylus helps for tight form fields.</li>
            <li><strong>Android:</strong> Same flow in Chrome — upload, tap to add text, drag to position, then download to your device.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When This Is the Right Tool</h2>
          <p className="text-gray-700 mb-4">Overlaying text is ideal for:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Completing a flat form that has no interactive fields</li>
            <li>Adding dates, names, or reference numbers</li>
            <li>Labeling diagrams, screenshots, or photos inside a PDF</li>
            <li>Leaving short notes or corrections for a reviewer</li>
            <li>Inserting a title, header, or page reference</li>
          </ul>
          <p className="text-gray-700 mb-6">
            If you instead need to mark up a document for review with highlights and comments, see{" "}
            <Link href="/blog/how-to-annotate-pdf" className="text-blue-600 hover:underline">
              how to annotate a PDF
            </Link>
            . And for a broader overview of every kind of PDF edit, start with{" "}
            <Link href="/blog/how-to-edit-pdf-free" className="text-blue-600 hover:underline">
              how to edit a PDF for free
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Note on Privacy</h2>
          <p className="text-gray-700 mb-6">
            Forms and contracts often contain personal details. Many &quot;add text to PDF&quot; sites
            upload your file to their servers to process it. EditPDFs.app does everything in your browser,
            so the document — and whatever you type into it — never leaves your device.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Is it free to add text to a PDF?</h3>
          <p className="text-gray-700 mb-4">
            Yes — completely free on EditPDFs.app, with no signup, no watermark, and no limit on how much
            text you add or how many documents you work on.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Will the text be permanent once I download?</h3>
          <p className="text-gray-700 mb-4">
            Yes. On export the text is embedded into the PDF and renders the same in any viewer. To change
            it later you&apos;d re-upload the file and edit again.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I add text to a scanned PDF?</h3>
          <p className="text-gray-700 mb-4">
            Yes. Overlay text works on scans because it sits in a layer above the image. You can&apos;t edit
            the words inside the scan itself, but you can write anywhere on top of it.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I edit existing text in the PDF?</h3>
          <p className="text-gray-700 mb-4">
            Adding text places new content on top; it doesn&apos;t change words already in the document.
            Editing existing text depends on how the PDF was made and isn&apos;t possible on scanned files
            without OCR.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Can I delete text I added?</h3>
          <p className="text-gray-700 mb-4">
            Before exporting, select the text box and delete it. After downloading, re-upload the file and
            remove the box to make further changes.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">How do I make my text match the form?</h3>
          <p className="text-gray-700 mb-4">
            Pick the closest standard font, match the size of the surrounding text, keep the color black,
            and zoom in to align the baseline with the form line. Small adjustments make it look native.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Does it work on my phone?</h3>
          <p className="text-gray-700 mb-6">
            Yes. It runs in any modern mobile browser — Safari on iPhone/iPad, Chrome on Android. Pinch to
            zoom for precise placement in tight spaces.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-fill-pdf-forms" className="text-blue-600 hover:underline">How to fill out PDF forms</Link></li>
            <li><Link href="/blog/how-to-annotate-pdf" className="text-blue-600 hover:underline">How to annotate a PDF</Link></li>
            <li><Link href="/blog/how-to-sign-pdf" className="text-blue-600 hover:underline">How to sign a PDF</Link></li>
            <li><Link href="/blog/how-to-edit-pdf-free" className="text-blue-600 hover:underline">How to edit a PDF for free</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
