"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToSignPdf() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Sign a PDF for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Mike</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-01-21">January 21, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        {/* Top Ad */}
        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            A contract lands in your inbox, the deadline is today, and printing it just to scribble
            your name and scan it back feels absurd in 2026. It is. You can drop a signature onto any
            PDF straight from your browser in well under a minute — no printer, no app to install, and
            no account to create. This guide walks through the three ways to build a signature, how to
            place it cleanly, how to keep it from being nudged later, and what to do when something
            looks off.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Three Ways to Create Your Signature (and When to Use Each)
          </h2>
          <p className="text-gray-700 mb-4">
            Before you place anything, you need a signature to place. There are three ways to make one,
            and the right choice depends on the device you&apos;re on and how polished you want it to
            look.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Draw it
          </h3>
          <p className="text-gray-700 mb-4">
            Sign with your mouse, trackpad, or — far easier — a finger or stylus on a touchscreen. A
            drawn signature looks the most like your real one, which matters on contracts and anything
            a person will actually eyeball. It&apos;s fiddly with a mouse, though; if you&apos;re on a
            laptop with no touchscreen, the typed option usually looks cleaner.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Type it
          </h3>
          <p className="text-gray-700 mb-4">
            Type your name and let it render in a handwriting-style font. This is the fastest route and
            the most legible, which is ideal for routine approvals, internal sign-offs, and forms where
            nobody is scrutinizing the curve of your signature. The trade-off: it won&apos;t match the
            signature on your ID or bank records.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Upload an image
          </h3>
          <p className="text-gray-700 mb-6">
            If you already have a photo or scan of your handwritten signature, upload it and reuse it
            everywhere. This gives you a consistent, authentic mark across every document. For the
            cleanest result, sign in dark ink on plain white paper and crop tightly — and see the
            troubleshooting note below about removing the white box behind it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Electronic Signature vs. Digital Signature: What You&apos;re Actually Adding
          </h2>
          <p className="text-gray-700 mb-4">
            These two terms get used interchangeably, but they aren&apos;t the same thing:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>An electronic signature</strong> is the visible mark you draw, type, or upload. It
              represents your intent to agree. This is what the steps below add, and it&apos;s what the
              overwhelming majority of everyday documents need.
            </li>
            <li>
              <strong>A digital signature</strong> is a separate, cryptographic layer that uses a
              certificate to mathematically prove who signed and that the file hasn&apos;t been altered
              since. It&apos;s issued by a certificate authority and is what some regulated or
              enterprise workflows specifically require.
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            For contracts, NDAs, consent forms, applications, and approvals, an electronic signature is
            broadly recognized — for example under the U.S. ESIGN Act and UETA, the EU&apos;s eIDAS
            regulation, and Canada&apos;s PIPEDA. A few document types, like wills or certain government
            filings, may still demand an ink signature or a certificate-based digital signature. This
            is general information, not legal advice — if a specific document&apos;s requirements are
            unclear, check with the party requesting it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Sign a PDF: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Open your document</h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and drag
            your PDF onto the upload area, or click to browse. It opens in the editor with your pages
            shown as you&apos;ll see them in the final file.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Open the signature tool</h3>
          <p className="text-gray-700 mb-4">
            Select the signature tool from the toolbar. You&apos;ll be prompted to create your signature
            using one of the three methods above — do this once, and you can reuse it on every spot in
            the document.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Place and size it</h3>
          <p className="text-gray-700 mb-4">
            Click where the signature belongs and a movable box appears. Drag it onto the signature line
            and pull a corner to resize. Aim to have it sit on the line rather than floating above it,
            and keep it roughly the height of the surrounding text so it doesn&apos;t overwhelm the page.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Add the date and initials</h3>
          <p className="text-gray-700 mb-4">
            Many documents also need a date, initials on each page, or a printed name beneath the
            signature. Add those now — you can place additional signatures and initials anywhere, as
            many times as the document requires.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 5: Download the signed PDF</h3>
          <p className="text-gray-700 mb-6">
            Export the file. The signature is baked into the PDF itself, so it travels with the document
            and displays correctly wherever it&apos;s opened.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to sign your PDF?
            </h3>
            <p className="text-blue-800 mb-4">
              No signup, no watermarks, no limits — and your file never leaves your device.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Your PDF Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Lock the Signature So It Can&apos;t Be Moved
          </h2>
          <p className="text-gray-700 mb-6">
            By default, a placed signature stays a distinct object that a recipient could, in theory,
            select and reposition in some editors. If you&apos;re sending a signed contract and want the
            signature fixed in place, <Link href="/blog/how-to-flatten-pdf" className="text-blue-600 hover:underline">flatten
            the PDF</Link> before sending. Flattening merges the signature into the page so it behaves
            like printed ink — just keep an unflattened copy if you might still need to edit it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The signature is too big, too small, or blurry
          </h3>
          <p className="text-gray-700 mb-4">
            Resize it by dragging a corner rather than stretching one side, which keeps the proportions
            intact. If an uploaded image looks fuzzy, the source was low-resolution — re-scan or
            re-photograph it larger and crop, rather than blowing up a small image.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The signature landed on the wrong page
          </h3>
          <p className="text-gray-700 mb-4">
            Scroll to the correct page first, then place it — signatures are added to whichever page is
            in view. If one&apos;s already misplaced, drag it to the right spot or remove it and place a
            fresh one.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The signature box has a white rectangle around it
          </h3>
          <p className="text-gray-700 mb-4">
            That happens when an uploaded signature image has a solid white background instead of a
            transparent one. Use a PNG with a transparent background, or sign on clean white paper and
            crop tightly so the box blends into the page.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            It won&apos;t let me sign a secured or scanned PDF
          </h3>
          <p className="text-gray-700 mb-4">
            If the file is password-protected, you&apos;ll need to{" "}
            <Link href="/blog/how-to-remove-password-from-pdf" className="text-blue-600 hover:underline">
              remove the password
            </Link>{" "}
            first (you must know it). Scanned PDFs sign fine — you&apos;re placing a signature on top of
            the image, so no text editing is involved.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The signature shifted after I downloaded it
          </h3>
          <p className="text-gray-700 mb-6">
            This is almost always a different PDF viewer rendering an unflattened object slightly
            differently. Flattening before export locks the position so it looks identical everywhere.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Signing on Specific Devices</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows / Mac:</strong> The browser steps work identically in any modern browser.
              Drawing with a trackpad is doable but slow — typing or uploading an image usually looks
              tidier on a laptop.
            </li>
            <li>
              <strong>iPhone / iPad:</strong> Open the site in Safari and draw with your finger, or use
              an Apple Pencil on iPad for a signature that&apos;s genuinely close to your pen-on-paper
              version.
            </li>
            <li>
              <strong>Android:</strong> Use Chrome the same way — drawing with a finger or stylus works
              well on a phone or tablet.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When People Reach for This</h2>
          <p className="text-gray-700 mb-4">
            Signing a PDF online tends to come up for:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Employment contracts, offer letters, and NDAs</li>
            <li>Rental and lease agreements</li>
            <li>Consent and permission forms (medical, school, travel)</li>
            <li>Invoices, quotes, and purchase approvals</li>
            <li>Any form that arrives as a PDF and has to go back signed</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Note on Privacy</h2>
          <p className="text-gray-700 mb-6">
            The documents you sign are often the most sensitive ones you handle — salary figures, home
            addresses, medical details, financial terms. Many online signing services upload your file
            to their servers to process it. With{" "}
            <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, signing happens
            entirely in your browser, so the document and your signature never leave your device.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it really free to sign PDFs?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. There&apos;s no fee, no premium tier, and no cap on how many documents you sign — and
            no watermark on the result.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is an electronic signature legally binding?
          </h3>
          <p className="text-gray-700 mb-4">
            For most everyday agreements, yes — electronic signatures are recognized under laws like the
            ESIGN Act, UETA, and eIDAS. Some specific documents (such as wills or certain government
            forms) may still require ink or a certificate-based digital signature. This isn&apos;t legal
            advice; confirm if you&apos;re unsure.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Do I need to create an account?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Open the site, upload your PDF, sign, and download — there&apos;s no signup.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I add several signatures or initials to one document?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. Once your signature is created you can place it as many times as needed, plus initials,
            dates, and a typed name on any page.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can someone remove or move my signature afterward?
          </h3>
          <p className="text-gray-700 mb-4">
            To fix it firmly in place, flatten the PDF before sending — that merges the signature into
            the page so it can&apos;t be selected and dragged. Keep an unflattened copy if you might need
            to make changes later.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I sign a scanned document?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. You&apos;re placing a signature on top of the page image, so scanned PDFs work the same
            as text-based ones.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Are my files uploaded anywhere?
          </h3>
          <p className="text-gray-700 mb-6">
            No. On EditPDFs.app everything runs locally in your browser, so your document and signature
            stay on your device.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-fill-pdf-forms" className="text-blue-600 hover:underline">How to fill out PDF forms</Link></li>
            <li><Link href="/blog/how-to-flatten-pdf" className="text-blue-600 hover:underline">How to flatten a PDF (lock your signature)</Link></li>
            <li><Link href="/blog/how-to-add-text-to-pdf" className="text-blue-600 hover:underline">How to add text to a PDF</Link></li>
            <li><Link href="/blog/how-to-create-fillable-pdf-forms" className="text-blue-600 hover:underline">How to create a fillable PDF form</Link></li>
          </ul>
        </div>

        {/* Bottom Ad */}
        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
