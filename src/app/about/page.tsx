export const metadata = {
  title: "About Us - EditPDFs.app",
  description: "Learn about EditPDFs.app — a free, privacy-focused online PDF editor built to make document editing accessible to everyone.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About EditPDFs.app</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-gray max-w-none">
          <h2>Our Mission</h2>
          <p>
            EditPDFs.app was built with a simple belief: <strong>everyone deserves access to
            powerful PDF tools without paying a subscription, creating an account, or sacrificing
            their privacy.</strong>
          </p>
          <p>
            Too many PDF editors require expensive monthly plans, force you to upload sensitive
            documents to unknown servers, or slap watermarks on your files unless you pay. We
            think that&apos;s wrong. PDFs are the backbone of modern documents — contracts,
            tax forms, school assignments, invoices — and the tools to work with them should be
            free and accessible to everyone.
          </p>

          <h2>How It Works</h2>
          <p>
            Every feature on EditPDFs.app runs <strong>100% in your browser</strong>. When you
            open a PDF on our site, the file is processed locally on your device using JavaScript.
            Your documents are never uploaded to a server, which means:
          </p>
          <ul>
            <li>We can&apos;t see your files — ever</li>
            <li>There&apos;s no risk of a data breach exposing your documents</li>
            <li>It works even on slow or unreliable internet connections</li>
            <li>Your edits are instant with no waiting for server processing</li>
          </ul>

          <h2>What You Can Do</h2>
          <p>
            EditPDFs.app gives you a full suite of PDF tools at no cost:
          </p>
          <ul>
            <li><strong>Edit text</strong> — add, modify, or remove text from any PDF</li>
            <li><strong>Sign documents</strong> — draw, type, or upload your signature</li>
            <li><strong>Merge &amp; split</strong> — combine multiple PDFs or extract specific pages</li>
            <li><strong>Annotate</strong> — highlight, underline, strikethrough, and add shapes</li>
            <li><strong>Insert images</strong> — place photos, logos, or stamps into your PDF</li>
            <li><strong>Manage pages</strong> — reorder, rotate, add, or delete pages</li>
            <li><strong>Compress</strong> — reduce file size for easy sharing</li>
            <li><strong>Fill forms</strong> — complete PDF forms and save them</li>
            <li><strong>Whiteout</strong> — cover sensitive information</li>
            <li><strong>Freehand drawing</strong> — sketch or mark up documents by hand</li>
          </ul>
          <p>
            All of these features are completely free — no watermarks, no page limits, no
            signup required.
          </p>

          <h2>Why Free?</h2>
          <p>
            EditPDFs.app is supported by advertisements displayed on our homepage and blog.
            The PDF editor itself is ad-free so you can focus on your work without distractions.
            This model lets us keep the tool free for everyone while covering the costs of
            development and hosting.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Privacy first</strong> — your documents are your business. We built the
              entire tool to run client-side so that we literally cannot access your files.
            </li>
            <li>
              <strong>No dark patterns</strong> — no forced sign-ups, no artificial limits to
              push you toward a paid plan, no watermarks, no bait-and-switch.
            </li>
            <li>
              <strong>Simplicity</strong> — a clean, intuitive interface that anyone can use
              without reading a manual.
            </li>
            <li>
              <strong>Transparency</strong> — our{" "}
              <a href="/privacy">privacy policy</a> and{" "}
              <a href="/terms">terms of service</a> are written in plain English.
            </li>
          </ul>

          <h2>Built for Everyone</h2>
          <p>
            Whether you&apos;re a student annotating a textbook, a freelancer signing a
            contract, a small business owner filling out tax forms, or anyone who just needs
            to make a quick edit to a PDF — EditPDFs.app is here for you.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Have questions, feedback, or feature requests? We&apos;d love to hear from you.
            Visit our <a href="/contact">contact page</a> or email us directly at{" "}
            <a href="mailto:hello@editpdfs.app">hello@editpdfs.app</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
