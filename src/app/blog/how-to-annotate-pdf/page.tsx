"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToAnnotatePdf() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Annotate a PDF for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Mike</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-02-02">February 2, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Whether you&apos;re reviewing a contract, marking up a study reading, or sending feedback on a
            draft, annotating a PDF lets you layer comments, marks, and drawings on top of a document
            without ever touching the underlying text. This guide covers every annotation type and when to
            reach for each, the exact steps from upload to download, and the snags people hit — like
            annotations that won&apos;t stick to a scanned page or look wrong in someone else&apos;s reader.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Annotation vs. Editing: Why the Difference Matters
          </h2>
          <p className="text-gray-700 mb-6">
            Annotating and editing are not the same thing, and confusing them causes most of the frustration
            people have with PDFs. <strong>Editing</strong> changes the actual content — rewriting a
            sentence, deleting a paragraph, swapping an image. <strong>Annotating</strong> leaves the
            original content exactly as it is and adds a separate layer of marks on top: a highlight, a
            comment, an arrow. That distinction is what makes annotation safe for documents you don&apos;t
            own or shouldn&apos;t alter, like a signed agreement or a published paper — you&apos;re recording
            your reaction to the document, not rewriting it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            The Annotation Types — and When to Use Each
          </h2>
          <p className="text-gray-700 mb-4">
            Most tools bundle several markup tools together. Picking the right one for the job keeps your
            markup readable for whoever opens the file next:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>Highlight</strong> — best for flagging passages you want to return to or call
              attention to. For a deep dive on color and scanned-text highlighting, see our dedicated{" "}
              <Link href="/blog/how-to-highlight-pdf" className="text-blue-600 hover:underline">
                guide to highlighting a PDF
              </Link>
              .
            </li>
            <li>
              <strong>Underline</strong> — a lighter-touch emphasis than a highlight; useful when a full
              color band would clutter dense text.
            </li>
            <li>
              <strong>Strikethrough</strong> — signals &quot;remove this&quot; or &quot;this is
              outdated&quot; during a review, without actually deleting anything.
            </li>
            <li>
              <strong>Text notes &amp; comments</strong> — attach a written explanation to a specific spot.
              This is where the real feedback lives: &quot;clarify the refund window here.&quot;
            </li>
            <li>
              <strong>Sticky notes</strong> — collapsible comment markers that keep long remarks tucked away
              until the reader clicks them, so the page stays clean.
            </li>
            <li>
              <strong>Freehand drawing</strong> — circle a figure, sketch a correction, or jot a quick mark
              with a stylus or trackpad.
            </li>
            <li>
              <strong>Shapes &amp; arrows</strong> — point to an element, box a region, or connect a comment
              to the thing it refers to.
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            If you find yourself wanting to type a full sentence <em>into</em> the document itself rather
            than as a note, that&apos;s a job for{" "}
            <Link href="/blog/how-to-add-text-to-pdf" className="text-blue-600 hover:underline">
              adding text to a PDF
            </Link>{" "}
            instead.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Annotate a PDF: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Upload your PDF</h3>
          <p className="text-gray-700 mb-4">
            Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and drop in the
            file you want to mark up. The document opens in the viewer with a markup toolbar, and your pages
            render exactly as they&apos;ll look when you export — nothing is altered yet.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Pick the right tool</h3>
          <p className="text-gray-700 mb-4">
            Choose a tool from the toolbar — highlighter, note, drawing pen, shape, and so on. Most tools let
            you set a color before you start, which is worth doing up front so you&apos;re not recoloring
            marks afterward.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Apply your marks</h3>
          <p className="text-gray-700 mb-4">
            For text-based marks like highlight or underline, drag across the words. For notes, click where
            you want the marker and type. For drawings and shapes, click-drag to place them. You can move,
            resize, or delete any annotation before exporting, so don&apos;t worry about getting placement
            perfect on the first pass.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Download the annotated PDF</h3>
          <p className="text-gray-700 mb-6">
            Export the file. Your annotations are written into the PDF as standard markup, so they show up
            in Acrobat, Preview, Chrome, and every other mainstream reader. The original document content
            underneath is unchanged.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to mark up your PDF?</h3>
            <p className="text-blue-800 mb-4">
              Highlight, comment, draw, and add notes right in your browser — free, private, no signup.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Annotate a PDF Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Getting Annotations Right: A Few Habits
          </h2>
          <p className="text-gray-700 mb-4">
            Annotation is only useful if the next person can decode it. A consistent <strong>color
            key</strong> goes a long way — for example, yellow for &quot;important,&quot; red for
            &quot;problem,&quot; green for &quot;approved&quot; — and it&apos;s worth stating that key in a
            note on the first page when you share with a team.
          </p>
          <p className="text-gray-700 mb-6">
            Be specific in comments: &quot;update this date to 2026&quot; is actionable in a way that
            &quot;fix&quot; never is. And resist the urge to mark everything — if half the page is
            highlighted, nothing stands out. Selective markup is what makes the important bits visible.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            My annotations didn&apos;t save in the downloaded file
          </h3>
          <p className="text-gray-700 mb-4">
            Make sure you exported a new copy after marking up rather than re-downloading the original. If
            you closed the tab before exporting, the marks aren&apos;t stored anywhere — annotation happens
            in your browser, so always download before you leave the page.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            I can&apos;t highlight text on a scanned PDF
          </h3>
          <p className="text-gray-700 mb-4">
            A scanned page is an image, so there&apos;s no selectable text to grab. You can still annotate it
            — use the freehand pen, shapes, or sticky notes placed on top of the image. If you need true
            text highlighting, run the file through OCR first to{" "}
            <Link href="/blog/how-to-make-pdf-searchable" className="text-blue-600 hover:underline">
              make the PDF searchable
            </Link>
            , then highlight as normal.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The PDF is secured and won&apos;t let me annotate
          </h3>
          <p className="text-gray-700 mb-4">
            Some files carry a permissions password that blocks markup. If it&apos;s your document and you
            know the password, you can{" "}
            <Link href="/blog/how-to-remove-password-from-pdf" className="text-blue-600 hover:underline">
              remove the password
            </Link>{" "}
            first, then annotate the unlocked copy.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            My annotations look different in another app
          </h3>
          <p className="text-gray-700 mb-4">
            Readers render markup slightly differently, and a few older viewers hide comments behind an icon
            you have to click. If you need the marks to appear identically everywhere — say, before
            printing — flatten the file so annotations become part of the page. See{" "}
            <Link href="/blog/how-to-flatten-pdf" className="text-blue-600 hover:underline">
              how to flatten a PDF
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How do I remove an annotation?</h3>
          <p className="text-gray-700 mb-6">
            Before exporting, select the mark and delete it. After exporting, re-upload the file and delete
            the markup there — unless it was flattened, in which case it&apos;s baked into the page and
            can&apos;t be lifted back out.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Annotating on Specific Devices</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows / Mac (any browser):</strong> The steps above work the same on both — no
              install required. A mouse is fine for highlighting and notes; a trackpad handles freehand
              drawing in a pinch.
            </li>
            <li>
              <strong>iPhone / iPad:</strong> Open{" "}
              <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> in Safari and mark
              up by touch. An Apple Pencil makes freehand annotation genuinely comfortable on iPad.
            </li>
            <li>
              <strong>Android:</strong> Use Chrome the same way — upload, annotate by tapping and dragging,
              then download the marked-up copy to your device.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Who Annotates PDFs, and How</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Students &amp; researchers</strong> highlight key findings and drop notes in the margin
              while reading papers, building a marked-up library they can skim later.
            </li>
            <li>
              <strong>Contract reviewers</strong> strike through outdated clauses and attach comments asking
              for changes — without editing the legal text itself.
            </li>
            <li>
              <strong>Teams giving feedback</strong> use color-coded highlights and sticky notes so several
              reviewers&apos; comments stay distinguishable on one shared file.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Note on Privacy</h2>
          <p className="text-gray-700 mb-6">
            Plenty of annotation sites upload your document to their servers to process it — not ideal when
            you&apos;re marking up a contract or anything confidential. On{" "}
            <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, the whole process
            runs in your browser, so the file you&apos;re annotating never leaves your device.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is annotating a PDF free?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. On EditPDFs.app it&apos;s completely free with no signup, no watermark, and no limit on how
            many files you mark up.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does annotating change the original document?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Annotations sit in a separate layer on top of the page, so the underlying text, images, and
            layout stay exactly as they were. That&apos;s the whole point of annotating instead of editing.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will the people I share with see my annotations?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. The marks are embedded in the file you download, so anyone who opens it in a standard reader
            sees them. A few older viewers tuck comments behind a clickable icon rather than showing them
            inline.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I annotate a scanned PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            You can add drawings, shapes, and sticky notes on top of a scan right away. To highlight or
            underline actual words, run OCR first to make the text selectable.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            How do I make annotations permanent?
          </h3>
          <p className="text-gray-700 mb-4">
            Flatten the PDF after annotating. Flattening merges the markup into the page so it can&apos;t be
            moved or deleted and looks identical in every viewer — handy right before printing or archiving.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can multiple people annotate the same PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, by passing the file along — each reviewer adds their marks and re-shares. Using a different
            highlight color per person keeps everyone&apos;s comments easy to tell apart.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Are my files uploaded to a server?
          </h3>
          <p className="text-gray-700 mb-6">
            Not on EditPDFs.app. All annotating happens locally in your browser, so the document never leaves
            your device — which matters when the thing you&apos;re marking up is sensitive.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-highlight-pdf" className="text-blue-600 hover:underline">How to highlight text in a PDF</Link></li>
            <li><Link href="/blog/how-to-add-text-to-pdf" className="text-blue-600 hover:underline">How to add text to a PDF</Link></li>
            <li><Link href="/blog/how-to-sign-pdf" className="text-blue-600 hover:underline">How to sign a PDF</Link></li>
            <li><Link href="/blog/how-to-flatten-pdf" className="text-blue-600 hover:underline">How to flatten a PDF</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
