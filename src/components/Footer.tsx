import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📄</span>
              <span className="font-bold text-lg text-gray-900">EditPDFs.app</span>
            </div>
            <p className="text-gray-600 text-sm">
              Free PDF editor that respects your privacy. No uploads, no signups, no limits.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/editor" className="text-gray-600 hover:text-gray-900">PDF Editor</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="/blog/how-to-edit-pdf-free" className="text-gray-600 hover:text-gray-900">How to Edit PDFs</Link></li>
              <li><Link href="/blog/how-to-sign-pdf" className="text-gray-600 hover:text-gray-900">How to Sign PDFs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><a href="mailto:bugs@editpdfs.app?subject=Bug Report" className="text-gray-600 hover:text-gray-900">Report a Bug 🐛</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EditPDFs.app. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            🔒 Your files never leave your browser. 100% client-side processing.
          </p>
        </div>
      </div>
    </footer>
  );
}
