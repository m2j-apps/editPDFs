"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToAddImagesToPdf() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Add Images to a PDF for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Jen</span>
            <span className="mx-2">•</span>
            <time dateTime="2026-02-05">February 5, 2026</time>
            <span className="mx-2">•</span>
            <span>8 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Dropping an image into a PDF sounds like it should be trivial — and it is, once you know where
            to click. The catch is that a PDF isn&apos;t a Word document: there&apos;s no cursor to type
            beside, so an image gets placed as a floating layer on top of the page. This guide shows you how
            to add a logo, signature, photo, or screenshot to any PDF for free, how to get the size and
            sharpness right, and how to avoid the handful of mistakes that make an inserted image look off.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            When You&apos;d Add an Image to a PDF
          </h2>
          <p className="text-gray-700 mb-4">
            People reach for this far more often than you&apos;d expect, usually for one of these reasons:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Branding a document</strong> — dropping a company logo onto a quote, invoice, or report</li>
            <li><strong>Signing by image</strong> — pasting a saved signature graphic where a contract needs one</li>
            <li><strong>Completing a form</strong> — adding a passport photo or ID image to an application</li>
            <li><strong>Annotating visually</strong> — placing a screenshot, diagram, or chart next to the text it explains</li>
            <li><strong>Stamping</strong> — applying an &quot;Approved&quot;, &quot;Paid&quot;, or &quot;Draft&quot; graphic</li>
          </ul>
          <p className="text-gray-700 mb-6">
            If your goal is instead to turn a folder of photos <em>into</em> a brand-new PDF, that&apos;s a
            different job — see{" "}
            <Link href="/blog/how-to-convert-images-to-pdf" className="text-blue-600 hover:underline">
              how to convert images to PDF
            </Link>
            . This guide is about placing images <em>onto</em> an existing document.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Which Image Formats Work — and Which to Pick
          </h2>
          <p className="text-gray-700 mb-4">
            Most everyday formats are supported, but the right choice depends on what you&apos;re adding:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>
              <strong>PNG</strong> — the best choice for logos, signatures, and icons because it supports a
              transparent background. The image sits cleanly on the page with no white box around it.
            </li>
            <li>
              <strong>JPG / JPEG</strong> — ideal for photographs and detailed images. Smaller file size
              than PNG, but no transparency, so a photo arrives as a solid rectangle.
            </li>
            <li>
              <strong>WebP</strong> — a modern format that keeps quality high at a smaller size; handy when
              the finished PDF needs to stay light for email.
            </li>
            <li>
              <strong>GIF</strong> — works for simple flat graphics, though only the first frame is placed
              (PDFs don&apos;t animate).
            </li>
          </ul>
          <p className="text-gray-700 mb-6">
            One rule of thumb: if the image has anything that should &quot;float&quot; over the page —
            a logo, a signature, a stamp — use a <strong>PNG with a transparent background</strong>. For a
            full-frame photo, JPG is usually the sensible pick.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Add an Image to a PDF: Step-by-Step
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Open your PDF</h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and upload
            the document. It opens in the editor with page thumbnails down the side, so you can scroll to
            the exact page that needs the image before you place anything.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Select the image tool</h3>
          <p className="text-gray-700 mb-4">
            Choose the image tool from the toolbar. This switches the editor into insertion mode and prompts
            you to pick a file — nothing is added to the page until you choose one.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Choose the image file</h3>
          <p className="text-gray-700 mb-4">
            Pick the image from your device (or your phone&apos;s photo library on mobile). It drops onto the
            current page as a selectable object with handles around its edges — think of it as a sticker you
            can still move, not yet glued down.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Position, resize, and rotate</h3>
          <p className="text-gray-700 mb-4">
            Drag the image to where you want it. Pull a <strong>corner</strong> handle to resize while
            keeping the proportions locked (dragging a side handle can stretch it, which is what makes logos
            look squashed). If the tool offers a rotation handle, use it to straighten a tilted signature or
            angle a stamp.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 5: Export the finished PDF</h3>
          <p className="text-gray-700 mb-6">
            Once placement looks right, download the document. The image is embedded into the page, so it
            travels with the file and displays the same way for whoever opens it next.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to add an image?
            </h3>
            <p className="text-blue-800 mb-4">
              Insert a logo, signature, or photo anywhere on the page. Free, private, no signup.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Add Images Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Getting the Quality and Size Right
          </h2>
          <p className="text-gray-700 mb-4">
            The most common complaint about images in PDFs is that they end up blurry or pixelated. That
            almost always comes down to resolution. A logo that looks crisp at 80 pixels wide on a website
            will look fuzzy when stretched across half a page. A few habits prevent it:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Start bigger than you need.</strong> It&apos;s fine to shrink a large image down; it
              looks terrible to blow a small one up. Aim for an image at least as wide (in pixels) as the
              space it will fill on the page.
            </li>
            <li>
              <strong>Mind the file size.</strong> A 12-megapixel phone photo dropped into a PDF can balloon
              the file. If the document needs to stay email-friendly, resize the photo down first, or{" "}
              <Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">
                compress the PDF
              </Link>{" "}
              afterwards.
            </li>
            <li>
              <strong>Place images in whitespace.</strong> An inserted image sits <em>on top</em> of the
              existing content, so dropping it over text hides what&apos;s underneath. Position it in a
              margin or blank area unless covering something is the goal.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The image has a white box around it
          </h3>
          <p className="text-gray-700 mb-4">
            That&apos;s a JPG. JPGs can&apos;t store transparency, so the background fills in as white.
            Re-export the graphic as a <strong>PNG with a transparent background</strong> and re-add it —
            the box disappears.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The image looks blurry or pixelated
          </h3>
          <p className="text-gray-700 mb-4">
            The source image is lower resolution than the space it&apos;s filling. Use a larger original, or
            scale the placed image down until it sharpens up. Avoid enlarging a small image past its natural
            size.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            The image is covering text I need to see
          </h3>
          <p className="text-gray-700 mb-4">
            Images render as a top layer. Drag it into a margin or empty space, or resize it smaller. If you
            need it behind the text instead, that isn&apos;t possible with a simple overlay — rework the
            layout so the image sits in clear space.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            It landed on the wrong page
          </h3>
          <p className="text-gray-700 mb-4">
            Images are added to whichever page is in view when you insert them. Scroll to the correct page
            first using the thumbnails, then place the image — or delete it and re-add it on the right page.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            It looks fine on screen but prints wrong
          </h3>
          <p className="text-gray-700 mb-6">
            This is usually a resolution or color issue rather than a placement one. A screen-resolution
            image can print soft; start from a higher-resolution source. If you want the image locked so it
            can&apos;t shift in another viewer before printing, consider{" "}
            <Link href="/blog/how-to-flatten-pdf" className="text-blue-600 hover:underline">
              flattening the PDF
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Adding Images on Phone, Tablet, and Desktop</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows / Mac (any browser):</strong> The steps above are identical — no install
              needed. Drag-to-position is easiest with a mouse or trackpad for fine placement.
            </li>
            <li>
              <strong>iPhone / iPad:</strong> Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>{" "}
              in Safari and pick the image straight from your Photos library or the Files app. Pinch and drag
              to position with touch.
            </li>
            <li>
              <strong>Android:</strong> Use Chrome the same way — insert from your gallery or downloads, then
              drag the image into place and export.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Note on Privacy</h2>
          <p className="text-gray-700 mb-6">
            The images people add to PDFs are often personal — a scanned signature, an ID photo, a private
            document. Many online editors upload both the PDF and your images to their servers to process
            them. <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> does the work
            entirely in your browser, so neither the document nor the image you insert ever leaves your
            device.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free to add images to a PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. On EditPDFs.app it&apos;s completely free with no signup, no watermark, and no limit on how
            many images or documents you work with.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will adding an image reduce its quality?
          </h3>
          <p className="text-gray-700 mb-4">
            No. The image is embedded at the resolution of the file you upload — what you put in is what you
            get out. Any blurriness comes from the source image being too small for the space, not from the
            insertion itself.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I add several images to one PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. Add as many as you like across any pages. They can also overlap — a later image sits on top
            of an earlier one, which is useful for layering a logo over a banner, for example.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Which format is best for a logo or signature?
          </h3>
          <p className="text-gray-700 mb-4">
            A PNG with a transparent background. It places cleanly with no white box, so the logo or
            signature blends into whatever is behind it on the page.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Why did my PDF get so much larger after adding a photo?
          </h3>
          <p className="text-gray-700 mb-4">
            High-resolution photos carry a lot of data. Resize the photo before adding it, or compress the
            finished PDF if you need to email it. A logo or signature adds almost nothing by comparison.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I move or delete the image after placing it?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes — until you export, the image stays a selectable object you can drag, resize, or remove.
            Once you&apos;ve downloaded the file, it&apos;s embedded into the page.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Does this work on my phone?
          </h3>
          <p className="text-gray-700 mb-6">
            Yes. EditPDFs.app runs in any mobile browser, and you can pull images straight from your photo
            library — handy for adding a photo of a signature or an ID to a form on the go.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-add-text-to-pdf" className="text-blue-600 hover:underline">How to add text to a PDF</Link></li>
            <li><Link href="/blog/how-to-sign-pdf" className="text-blue-600 hover:underline">How to sign a PDF</Link></li>
            <li><Link href="/blog/how-to-convert-images-to-pdf" className="text-blue-600 hover:underline">How to convert images to PDF</Link></li>
            <li><Link href="/blog/how-to-add-watermark-to-pdf" className="text-blue-600 hover:underline">How to add a watermark to a PDF</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
