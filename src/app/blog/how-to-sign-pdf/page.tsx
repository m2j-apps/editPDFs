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
            <span>February 3, 2026</span>
            <span className="mx-2">•</span>
            <span>4 min read</span>
          </div>
        </header>

        {/* Top Ad */}
        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Need to sign a PDF? Whether it&apos;s a contract, form, or agreement, you can add your 
            signature to any PDF in seconds — completely free, no account required.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            3 Ways to Sign a PDF Online
          </h2>
          <p className="text-gray-700 mb-4">
            Most PDF signing tools offer multiple ways to create your signature. Here are the 
            three most common methods:
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            1. Draw Your Signature
          </h3>
          <p className="text-gray-700 mb-4">
            Use your mouse, trackpad, or finger (on touchscreens) to draw your signature directly 
            on screen. This creates the most natural-looking signature and is perfect for 
            replicating your handwritten style.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            2. Type Your Name
          </h3>
          <p className="text-gray-700 mb-4">
            Simply type your name and have it converted to a signature-style font. This is the 
            fastest option and works well when you need to sign documents quickly.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            3. Upload an Image
          </h3>
          <p className="text-gray-700 mb-4">
            If you already have a scanned signature or a photo of your handwritten signature, 
            you can upload it directly. This is ideal if you want to use the exact same signature 
            across all your documents.
          </p>

          {/* Middle Ad */}
          <AdUnit slot="MIDDLE_BANNER" format="horizontal" className="my-8" />

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Sign a PDF in 4 Simple Steps
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 1: Open the PDF Editor
          </h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and 
            drag your PDF onto the upload area, or click to browse your files.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 2: Select the Signature Tool
          </h3>
          <p className="text-gray-700 mb-4">
            Click the signature tool in the toolbar, then click where you want to place your signature.
            A signature box will appear that you can drag and resize.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 3: Create Your Signature
          </h3>
          <p className="text-gray-700 mb-4">
            Choose your preferred method — draw, type, or upload — and create your signature. 
            You can preview it on the document before finalizing.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 4: Download Your Signed PDF
          </h3>
          <p className="text-gray-700 mb-6">
            Click Download to save your signed document. The signature is 
            embedded directly in the PDF — it&apos;s not a separate layer that can be removed.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to sign your PDF?
            </h3>
            <p className="text-blue-800 mb-4">
              No signup, no watermarks, no limits. Your files stay private.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Your PDF Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Is a Digitally Signed PDF Legally Valid?
          </h2>
          <p className="text-gray-700 mb-4">
            In most cases, yes. Electronic signatures are legally recognized in:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>United States</strong> — under the ESIGN Act and UETA</li>
            <li><strong>European Union</strong> — under the eIDAS regulation</li>
            <li><strong>Canada</strong> — under PIPEDA and provincial laws</li>
            <li><strong>Australia</strong> — under the Electronic Transactions Act</li>
            <li><strong>Most other countries</strong> — have similar e-signature laws</li>
          </ul>
          <p className="text-gray-700 mb-6">
            For most everyday documents — contracts, NDAs, consent forms, applications — an 
            electronic signature is as valid as a handwritten one. However, certain documents 
            (like wills or some government forms) may still require ink signatures.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Privacy Matters When Signing PDFs
          </h2>
          <p className="text-gray-700 mb-4">
            Documents you sign often contain sensitive information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Employment contracts with salary details</li>
            <li>Rental agreements with personal addresses</li>
            <li>Medical consent forms</li>
            <li>Financial documents</li>
            <li>Legal agreements</li>
          </ul>
          <p className="text-gray-700 mb-6">
            When you use a traditional online signing service, your documents are uploaded to 
            their servers. With <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, 
            everything happens in your browser — your files never leave your device, and no one 
            else can see them.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Everything You Can Do in the Editor
          </h2>
          <p className="text-gray-700 mb-4">
            Besides signing, our editor lets you:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Edit text</strong> — Add or modify text in your PDF</li>
            <li><strong>Add images</strong> — Insert logos, photos, or stamps</li>
            <li><strong>Merge PDFs</strong> — Combine multiple documents into one</li>
            <li><strong>Manage pages</strong> — Delete, reorder, or rotate pages</li>
            <li><strong>Annotate</strong> — Highlight, underline, and draw</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h2>
          
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it free to sign PDFs?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, completely free. EditPDFs.app has no hidden fees, no premium tier, and no 
            limits on how many documents you can sign.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Do I need to create an account?
          </h3>
          <p className="text-gray-700 mb-4">
            No. Just open the site, upload your PDF, sign it, and download. No signup required.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will there be a watermark on my signed PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            No watermarks. Your signed PDF looks exactly like you&apos;d expect — clean and professional.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I sign on my phone?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes! EditPDFs.app works on any device with a modern browser. Drawing signatures 
            with your finger on a touchscreen works great.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I add multiple signatures to one document?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. After placing your first signature, you can add more signatures or initials 
            anywhere in the document.
          </p>
        </div>

        {/* Bottom Ad */}
        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
