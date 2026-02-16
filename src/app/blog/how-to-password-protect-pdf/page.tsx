"use client";

import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export default function HowToPasswordProtectPdf() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Password Protect a PDF for Free (2026 Guide)
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span>February 16, 2026</span>
            <span className="mx-2">•</span>
            <span>6 min read</span>
          </div>
        </header>

        {/* Top Ad */}
        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Need to secure a sensitive PDF before sharing it? You can add password protection 
            in seconds — completely free, no account required, and your files stay private.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Password Protect PDFs?
          </h2>
          <p className="text-gray-700 mb-4">
            Password protection adds a layer of security to your documents. Here&apos;s when it matters:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Confidential contracts</strong> — Protect legal agreements from unauthorized access</li>
            <li><strong>Financial documents</strong> — Secure tax returns, bank statements, and invoices</li>
            <li><strong>Medical records</strong> — Keep health information private when sharing</li>
            <li><strong>Business proposals</strong> — Prevent competitors from viewing sensitive plans</li>
            <li><strong>Personal identification</strong> — Protect copies of IDs, passports, or licenses</li>
            <li><strong>Email attachments</strong> — Add security when sending sensitive files</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Types of PDF Password Protection
          </h2>
          <p className="text-gray-700 mb-4">
            There are two types of passwords you can add to a PDF:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Open Password (User Password)
          </h3>
          <p className="text-gray-700 mb-4">
            Requires a password to open and view the PDF. Without it, the document 
            cannot be accessed at all. This is the most common and secure option.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Permissions Password (Owner Password)
          </h3>
          <p className="text-gray-700 mb-4">
            Allows viewing but restricts actions like printing, copying text, or editing. 
            Useful when you want people to read a document but not modify or extract content.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Add a Password to Your PDF
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 1: Open Your PDF
          </h3>
          <p className="text-gray-700 mb-4">
            Go to <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link> and 
            upload your PDF file. Drag and drop or click to browse.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 2: Enable Password Protection
          </h3>
          <p className="text-gray-700 mb-4">
            Look for the security or password protection option in the editor. Enter a 
            strong password that you&apos;ll share with authorized recipients.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Step 3: Download Your Protected PDF
          </h3>
          <p className="text-gray-700 mb-6">
            Save the file and your PDF is now encrypted. Anyone who tries to open it 
            will need the password you set.
          </p>

          {/* Middle Ad */}
          <AdUnit slot="MIDDLE_BANNER" format="horizontal" className="my-8" />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to secure your PDF?
            </h3>
            <p className="text-blue-800 mb-4">
              No signup, no watermarks, no upload to servers. 100% private.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Protect PDF Now →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Tips for Strong PDF Passwords
          </h2>
          
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Make it long and complex
          </h3>
          <p className="text-gray-700 mb-4">
            Use at least 12 characters with a mix of uppercase, lowercase, numbers, 
            and special characters. Longer passwords are exponentially harder to crack.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Avoid personal information
          </h3>
          <p className="text-gray-700 mb-4">
            Don&apos;t use birthdays, names, or common words. These are the first things 
            attackers try. Use a random passphrase instead.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Use a password manager
          </h3>
          <p className="text-gray-700 mb-4">
            Generate and store strong passwords with tools like Bitwarden, 1Password, 
            or your browser&apos;s built-in manager. Never reuse passwords.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Share passwords securely
          </h3>
          <p className="text-gray-700 mb-4">
            Don&apos;t put the password in the same email as the PDF. Send it via a different 
            channel — text message, phone call, or a separate message.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Privacy Matters for PDF Security
          </h2>
          <p className="text-gray-700 mb-4">
            Here&apos;s the irony: many online PDF password tools upload your sensitive 
            documents to their servers to add encryption. That means your &quot;private&quot; 
            files pass through third-party systems before being secured.
          </p>
          <p className="text-gray-700 mb-4">
            This defeats the purpose of password protection. If you&apos;re securing a 
            document because it&apos;s confidential, why would you upload it unencrypted 
            to a random server first?
          </p>
          <p className="text-gray-700 mb-6">
            With <Link href="/" className="text-blue-600 hover:underline">EditPDFs.app</Link>, 
            everything happens in your browser. Your files never leave your device. 
            The encryption is applied locally using JavaScript, so your documents 
            stay private from start to finish.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            When to Use Password Protection
          </h2>
          <p className="text-gray-700 mb-4">
            Password protection is ideal for:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Sharing via email</strong> — Add a layer of security to attachments</li>
            <li><strong>Cloud storage</strong> — Protect files even if your account is compromised</li>
            <li><strong>USB drives</strong> — Secure documents on portable storage</li>
            <li><strong>Archiving sensitive records</strong> — Long-term protection for important files</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Limitations of PDF Passwords
          </h2>
          <p className="text-gray-700 mb-4">
            While password protection adds security, know its limits:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Weak passwords can be cracked</strong> — Use strong passwords to prevent brute-force attacks</li>
            <li><strong>Screenshots still work</strong> — Someone with the password can capture the screen</li>
            <li><strong>Sharing the password shares access</strong> — Once shared, you lose control</li>
            <li><strong>Some permission passwords are bypassable</strong> — Open passwords are more secure than permission-only</li>
          </ul>
          <p className="text-gray-700 mb-6">
            For highly sensitive documents, consider additional measures like encrypted 
            file sharing services or digital rights management (DRM).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Questions
          </h2>
          
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I remove a password from a PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, if you know the password. Open the PDF with the password, then save 
            it without password protection. You cannot remove a password without knowing it.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is password-protected PDF encryption strong?
          </h3>
          <p className="text-gray-700 mb-4">
            Modern PDFs use AES-256 encryption, which is extremely secure when combined 
            with a strong password. The encryption itself is virtually unbreakable — 
            weak passwords are the vulnerability.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Can I add a password to multiple PDFs at once?
          </h3>
          <p className="text-gray-700 mb-4">
            Process them one at a time for individual passwords, or consider merging 
            them first if they should share the same password.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            What if I forget the password?
          </h3>
          <p className="text-gray-700 mb-4">
            If you forget the password, the PDF cannot be recovered. This is by design — 
            it&apos;s what makes the protection secure. Always store passwords safely.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Will password protection change my PDF?
          </h3>
          <p className="text-gray-700 mb-4">
            No. The content, layout, and quality remain exactly the same. Only the 
            encryption layer is added to require authentication.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Is it really free?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, completely free with no limits. No premium tier, no file size restrictions, 
            no watermarks. Secure as many PDFs as you need.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Other Tools You Might Need
          </h2>
          <p className="text-gray-700 mb-4">
            While you&apos;re working with PDFs, you might also want to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">Compress your PDF</Link> — Reduce file size before sharing</li>
            <li><Link href="/blog/how-to-merge-pdfs" className="text-blue-600 hover:underline">Merge multiple PDFs</Link> — Combine documents into one protected file</li>
            <li><Link href="/blog/how-to-sign-pdf" className="text-blue-600 hover:underline">Sign your PDF</Link> — Add your signature before locking it</li>
          </ul>
          <p className="text-gray-700 mb-6">
            All these features are available in our free editor.
          </p>
        </div>

        {/* Bottom Ad */}
        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </article>
    </div>
  );
}
