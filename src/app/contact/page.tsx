export const metadata = {
  title: "Contact Us - EditPDFs.app",
  description: "Get in touch with the EditPDFs.app team. Report bugs, request features, or ask questions about our free online PDF editor.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-gray max-w-none">
          <p>
            We&apos;re a small team passionate about making PDF tools free and accessible.
            Whether you have a question, found a bug, or want to suggest a feature, we&apos;d
            love to hear from you.
          </p>

          <h2>Email Us</h2>
          <p>
            The best way to reach us is by email. We aim to respond within 1-2 business days.
          </p>

          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-1">General Inquiries</h3>
              <p className="text-sm text-gray-600 mb-3">
                Questions about EditPDFs.app, partnerships, or anything else.
              </p>
              <a
                href="mailto:hello@editpdfs.app"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                hello@editpdfs.app
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Bug Reports</h3>
              <p className="text-sm text-gray-600 mb-3">
                Found something broken? Let us know so we can fix it.
              </p>
              <a
                href="mailto:bugs@editpdfs.app?subject=Bug Report"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                bugs@editpdfs.app
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Feature Requests</h3>
              <p className="text-sm text-gray-600 mb-3">
                Have an idea for a new tool or improvement? We&apos;re all ears.
              </p>
              <a
                href="mailto:hello@editpdfs.app?subject=Feature Request"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                hello@editpdfs.app
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-1">Privacy Concerns</h3>
              <p className="text-sm text-gray-600 mb-3">
                Questions about how we handle data and protect your privacy.
              </p>
              <a
                href="mailto:privacy@editpdfs.app"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                privacy@editpdfs.app
              </a>
            </div>
          </div>

          <h2>Frequently Asked Questions</h2>

          <h3>Is EditPDFs.app really free?</h3>
          <p>
            Yes, 100% free. There are no hidden fees, no premium tiers, and no limits on how
            many PDFs you can edit. We support the site through advertisements on our homepage
            and blog.
          </p>

          <h3>Are my files safe?</h3>
          <p>
            Absolutely. All PDF processing happens directly in your browser. Your files are
            never uploaded to our servers or any third-party service. We physically cannot
            access your documents. Read more in our{" "}
            <a href="/privacy">privacy policy</a>.
          </p>

          <h3>Can I use EditPDFs.app for business documents?</h3>
          <p>
            Yes. Many users rely on EditPDFs.app for contracts, invoices, proposals, and other
            business documents. Since everything is processed locally, your confidential
            business documents stay confidential.
          </p>

          <h3>What browsers are supported?</h3>
          <p>
            EditPDFs.app works on all modern browsers including Chrome, Firefox, Safari, and
            Edge. It also works on mobile browsers, so you can edit PDFs from your phone or
            tablet.
          </p>

          <h3>I found a bug. What should I do?</h3>
          <p>
            Please email us at{" "}
            <a href="mailto:bugs@editpdfs.app?subject=Bug Report">bugs@editpdfs.app</a>{" "}
            with a description of the issue, the browser you&apos;re using, and if possible,
            steps to reproduce the problem. Screenshots are always helpful.
          </p>

          <h3>Do you plan to add more features?</h3>
          <p>
            Yes! We&apos;re actively developing new tools and improving existing ones. If
            there&apos;s a specific feature you&apos;d like to see, send us an email — user
            feedback directly shapes our roadmap.
          </p>
        </div>
      </div>
    </div>
  );
}
