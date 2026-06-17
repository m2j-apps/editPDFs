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
            <span>Jen</span>
            <span className="mx-2">&bull;</span>
            <time dateTime="2026-03-09">March 9, 2026</time>
            <span className="mx-2">&bull;</span>
            <span>9 min read</span>
          </div>
        </header>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            A PDF that won&apos;t attach to an email or squeeze under an upload limit is one of the most
            common document headaches there is. The instinct is to crush it as hard as possible &mdash; but
            that&apos;s how you end up with blurry photos and unreadable fine print. This guide shows you how
            to shrink a PDF intelligently: cut the bulk that doesn&apos;t matter, protect the detail that
            does, and hit a specific target size on purpose rather than by trial and error.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Are PDF Files So Large?
          </h2>
          <p className="text-gray-700 mb-4">
            You can&apos;t shrink a file efficiently until you know where its weight is hiding. Almost all
            PDF bloat comes from a handful of sources:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>High-resolution images</strong> &mdash; A single 300 DPI photo can add several megabytes. Image data is almost always the biggest lever.</li>
            <li><strong>Scanned pages</strong> &mdash; A scan is a full-page picture, not text, so a scanned document is really a stack of large images.</li>
            <li><strong>Embedded fonts</strong> &mdash; Entire font families travel inside the file. Multiple fonts and weights quietly add up.</li>
            <li><strong>Duplicate resources</strong> &mdash; PDFs assembled by merging other files often carry the same logo or image embedded several times.</li>
            <li><strong>Hidden data</strong> &mdash; Edit history, form data, annotations, and metadata all take up room you never see on the page.</li>
          </ul>
          <p className="text-gray-700 mb-6">
            The practical takeaway: <strong>images and scans are where the savings live.</strong> A
            text-only PDF is already small, so if your file is huge, something visual is driving it &mdash;
            and that&apos;s exactly what compression targets.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Reduce PDF File Size (Step by Step)
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 1: Upload your PDF</h3>
          <p className="text-gray-700 mb-4">
            Open <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and drop your
            file in. There&apos;s no size limit, and the file stays in your browser &mdash; nothing is sent
            to a server, which matters when the document is personal or confidential.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 2: Choose a compression level</h3>
          <p className="text-gray-700 mb-4">
            You&apos;ll usually get presets like low, medium, and high (or a quality slider). Start at
            <strong> medium</strong> &mdash; it typically removes 40&ndash;60% of the file size with no
            change you&apos;d notice at normal zoom. Resist the urge to jump straight to maximum compression;
            you can always push harder after you&apos;ve seen the medium result.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 3: Inspect the result before you trust it</h3>
          <p className="text-gray-700 mb-4">
            Open the compressed copy and zoom in on the things most likely to suffer: photographs, charts,
            logos, and small text. Quality loss almost always shows up first in fine gradients and tiny
            type. If it still looks clean at 150&ndash;200% zoom, it&apos;ll look great at normal size.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step 4: Download and share</h3>
          <p className="text-gray-700 mb-6">
            Save the smaller file and send it wherever you were blocked &mdash; email, an upload form, cloud
            storage, or your site. Your original full-size PDF is untouched, so you always have the
            high-quality master to go back to.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Real-world example</h3>
            <p className="text-blue-800 mb-4">
              A 15 MB product catalog full of high-res photos often drops to 3&ndash;4 MB at medium
              compression &mdash; small enough to email, yet still crisp on screen and in print. The same
              setting on a mostly-text report might only save a little, simply because there wasn&apos;t much
              image weight to remove in the first place.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Reduce Your PDF Size Now &rarr;
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            5 Ways to Shrink a PDF Without Hurting Quality
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Downsample images to 150 DPI</h3>
          <p className="text-gray-700 mb-4">
            Most PDFs are viewed on screens and printed on office printers, neither of which benefits from
            300 DPI. Dropping images to 150 DPI can halve their data with no visible difference. Reserve 300
            DPI only for files going to a professional print shop.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Remove pages you don&apos;t need first</h3>
          <p className="text-gray-700 mb-4">
            Compression works on what&apos;s there, so trim first.{" "}
            <Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">
              Delete blank or irrelevant pages
            </Link>{" "}
            before compressing &mdash; a scanned page you don&apos;t need is pure dead weight.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Flatten forms and annotations</h3>
          <p className="text-gray-700 mb-4">
            If a PDF has filled fields, comments, or markup you no longer need to edit,{" "}
            <Link href="/blog/how-to-flatten-pdf" className="text-blue-600 hover:underline">flatten it</Link>.
            That collapses interactive layers into the page and discards the hidden structure that inflates
            the file.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Export digitally instead of scanning</h3>
          <p className="text-gray-700 mb-4">
            When you control how a PDF is made, export it straight from the source app (Word, Google Docs,
            your design tool) rather than printing and scanning. A digital-origin PDF contains real text and
            is dramatically smaller than a scan of the same pages.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Split oversized documents</h3>
          <p className="text-gray-700 mb-6">
            If a long report still won&apos;t fit after compression,{" "}
            <Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">
              split it into smaller PDFs
            </Link>{" "}
            by section. Two 4 MB files often sail past a limit that one 8 MB file can&apos;t.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How Much to Compress: Matching Quality to the Job
          </h2>
          <p className="text-gray-700 mb-4">
            &ldquo;Without losing quality&rdquo; really means <em>without losing quality that matters for how
            the file will be used.</em> Lossy compression is perfectly fine in plenty of cases and a mistake
            in others:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Light (10&ndash;30% smaller)</strong> &mdash; Essentially no visible change. Safe for anything, including print masters.</li>
            <li><strong>Medium (40&ndash;60% smaller)</strong> &mdash; The sweet spot for email, web, and everyday sharing. Images stay sharp at normal viewing.</li>
            <li><strong>Heavy (70%+ smaller)</strong> &mdash; Visible softening on detailed photos, but great for text-heavy drafts or internal copies where size beats polish.</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Lean toward heavier compression for internal drafts, screen-only reading, and quick shares; stay
            light when the file will be printed at size, contains photography you care about, or is an
            archival master.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common File Size Limits to Aim For
          </h2>
          <p className="text-gray-700 mb-4">
            Pick a target before you compress and you&apos;ll get there faster:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Gmail</strong> &mdash; 25 MB per attachment</li>
            <li><strong>Outlook</strong> &mdash; 20 MB per attachment</li>
            <li><strong>Most web forms</strong> &mdash; 5&ndash;10 MB</li>
            <li><strong>Government / court portals</strong> &mdash; often just 2&ndash;5 MB</li>
            <li><strong>WhatsApp documents</strong> &mdash; up to 100 MB</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Problems</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">The file barely got smaller</h3>
          <p className="text-gray-700 mb-4">
            That usually means it was mostly text to begin with &mdash; there simply wasn&apos;t much image
            data to remove. Check for non-obvious bulk instead: delete unused pages, flatten annotations, and{" "}
            <Link href="/blog/how-to-remove-pdf-metadata" className="text-blue-600 hover:underline">
              strip hidden metadata
            </Link>
            . If it&apos;s already lean, it may already be about as small as it can usefully get.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Images look blurry or pixelated now</h3>
          <p className="text-gray-700 mb-4">
            You compressed too aggressively. Re-run from the original at a lighter level &mdash; medium
            instead of high. Always compress from the full-size master, not from an already-compressed copy,
            so quality only degrades once.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">It&apos;s still over the upload limit</h3>
          <p className="text-gray-700 mb-4">
            Combine techniques rather than just compressing harder: trim pages, then compress, then split
            into parts if needed. A scanned document that won&apos;t shrink enough is a special case &mdash;
            see below.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">My scanned document won&apos;t shrink much</h3>
          <p className="text-gray-700 mb-4">
            Scans are images, so they resist compression more than digital PDFs. Lowering the scan resolution
            helps, and converting it to real text with{" "}
            <Link href="/blog/how-to-make-pdf-searchable" className="text-blue-600 hover:underline">OCR</Link>{" "}
            can dramatically cut size for text-only scans while also making the document searchable.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Compressing again did nothing</h3>
          <p className="text-gray-700 mb-6">
            Once a PDF is compressed, the easy gains are gone &mdash; running it through again mostly just
            degrades quality. If you need it smaller still, go back to the original and change your approach
            (fewer pages, lower DPI, or splitting) rather than re-compressing the output.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Reducing PDF Size on Any Device</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong>Windows &amp; Mac:</strong> The browser steps above work in any browser, no install
              needed. On Mac, Preview&apos;s Export with the &ldquo;Reduce File Size&rdquo; Quartz filter is
              an option too, though it can over-compress images.
            </li>
            <li>
              <strong>iPhone &amp; iPad:</strong> Use{" "}
              <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> in Safari &mdash;
              nothing to download. For the full iOS walkthrough including the Files app, see{" "}
              <Link href="/blog/how-to-compress-a-pdf-on-iphone" className="text-blue-600 hover:underline">
                how to compress a PDF on iPhone
              </Link>
              .
            </li>
            <li>
              <strong>Android:</strong> Open the tool in Chrome the same way &mdash; upload, choose a level,
              download to your device.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Note on Privacy</h2>
          <p className="text-gray-700 mb-6">
            Many &ldquo;compress PDF&rdquo; sites upload your document to their servers to process it. For
            tax returns, contracts, or medical records, that&apos;s the opposite of what you want. With{" "}
            <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, compression runs
            entirely in your browser, so the file never leaves your device.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can you really reduce PDF size without losing quality?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, up to a point. Light to medium compression and removing hidden bulk (extra pages, metadata,
            duplicate resources) shrink the file with no visible change. Past that, you trade some image
            quality for size &mdash; which is fine as long as it suits how the file will be used.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            What&apos;s the best compression level to start with?
          </h3>
          <p className="text-gray-700 mb-4">
            Medium. It typically cuts 40&ndash;60% of the size with no noticeable difference at normal zoom.
            Only go higher if you still need to hit a smaller target and you&apos;ve checked the result.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Why didn&apos;t my PDF get much smaller?
          </h3>
          <p className="text-gray-700 mb-4">
            Because it was probably already mostly text. Compression mainly squeezes images, so a text-heavy
            file has little to give. Look for unused pages, annotations, or metadata to trim instead.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free, and are my files uploaded?
          </h3>
          <p className="text-gray-700 mb-4">
            On EditPDFs.app it&apos;s completely free with no signup, and nothing is uploaded &mdash; all
            processing happens locally in your browser, so your file stays private.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            How do I get under a 5 MB or 10 MB limit?
          </h3>
          <p className="text-gray-700 mb-4">
            Set that as your target and stack methods: delete unneeded pages, compress at medium, check the
            result, and split the file if it&apos;s still too big. Combining steps beats simply maxing out the
            compression slider.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will compressing change the text or layout?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Text, fonts, and page layout stay intact &mdash; compression works on image data and hidden
            overhead, not on the document&apos;s structure.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Why is my scanned PDF still huge after compressing?
          </h3>
          <p className="text-gray-700 mb-6">
            Scans are page-sized images, which compress less than digital PDFs. Lower the resolution, or run{" "}
            <Link href="/blog/how-to-make-pdf-searchable" className="text-blue-600 hover:underline">OCR</Link>{" "}
            to convert text-only scans into real text &mdash; that often shrinks them far more than
            compression alone.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Related Guides</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">How to compress a PDF</Link></li>
            <li><Link href="/blog/how-to-compress-a-pdf-on-iphone" className="text-blue-600 hover:underline">How to compress a PDF on iPhone</Link></li>
            <li><Link href="/blog/how-to-delete-pages-from-pdf" className="text-blue-600 hover:underline">How to delete pages from a PDF</Link></li>
            <li><Link href="/blog/how-to-split-pdf" className="text-blue-600 hover:underline">How to split a PDF</Link></li>
          </ul>
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
