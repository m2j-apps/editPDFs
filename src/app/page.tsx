import Link from "next/link";
import AdUnit from "@/components/AdUnit";

const tools = [
  {
    name: "Sign PDF",
    description: "Add your signature to any PDF document. Draw, type, or upload your signature.",
    href: "/sign-pdf",
    icon: "✍️",
    color: "bg-blue-500",
  },
  {
    name: "Merge PDF",
    description: "Combine multiple PDF files into a single document. Drag to reorder.",
    href: "/merge-pdf",
    icon: "📎",
    color: "bg-green-500",
  },
  {
    name: "Split PDF",
    description: "Extract pages from a PDF. Select which pages to keep.",
    href: "/split-pdf",
    icon: "✂️",
    color: "bg-purple-500",
  },
  {
    name: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality. Perfect for email.",
    href: "/compress-pdf",
    icon: "🗜️",
    color: "bg-orange-500",
  },
  {
    name: "Rotate PDF",
    description: "Rotate PDF pages. Fix wrongly oriented scans or documents.",
    href: "/rotate-pdf",
    icon: "🔄",
    color: "bg-pink-500",
  },
];

const trustPoints = [
  { icon: "🔒", title: "100% Private", description: "Files never leave your browser" },
  { icon: "⚡", title: "Instant", description: "No uploads, no waiting" },
  { icon: "♾️", title: "No Limits", description: "Unlimited files, unlimited use" },
  { icon: "🚫", title: "No Signup", description: "Just use it, completely free" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Free PDF Tools That Actually Work
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Edit, sign, merge, split, and compress PDFs. No signup. No limits. 
            Your files never leave your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sign-pdf"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              Sign a PDF →
            </Link>
            <Link
              href="/merge-pdf"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition border border-blue-500"
            >
              Merge PDFs →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustPoints.map((point) => (
              <div key={point.title} className="text-center">
                <span className="text-3xl mb-2 block">{point.icon}</span>
                <h3 className="font-semibold text-gray-900">{point.title}</h3>
                <p className="text-sm text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            All Tools — 100% Free
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition group"
              >
                <div className={`w-14 h-14 ${tool.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Unit */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdUnit slot="HOME_BANNER_1" format="horizontal" />
      </div>

      {/* Why Free Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Is This Free?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We believe PDF tools should be accessible to everyone. This site is supported by 
            unobtrusive ads — no paywalls, no premium tiers, no bait-and-switch.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <p className="text-blue-800 font-medium">
              🔐 <strong>Privacy First:</strong> Unlike other &quot;free&quot; PDF tools, we process 
              everything in your browser. Your files are never uploaded to any server. 
              We literally cannot see your documents.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The PDF Tools You Actually Need
          </h2>
          <div className="prose prose-gray max-w-none">
            <p>
              EditPDFs.app provides all the essential PDF tools you need, completely free. 
              Whether you need to sign a contract, merge multiple documents, split a large 
              PDF into smaller files, compress a PDF for email, or rotate scanned pages — 
              we&apos;ve got you covered.
            </p>
            <h3>How It Works</h3>
            <p>
              All processing happens directly in your web browser using modern JavaScript 
              libraries. When you upload a file, it stays on your computer. We use 
              client-side PDF manipulation which means:
            </p>
            <ul>
              <li>Your files never touch our servers</li>
              <li>Processing is instant (no upload/download wait)</li>
              <li>Works offline once the page loads</li>
              <li>Complete privacy for sensitive documents</li>
            </ul>
            <h3>No Hidden Costs</h3>
            <p>
              Tired of PDF tools that let you edit a document then demand payment to 
              download it? We don&apos;t do that. There are no premium features, no 
              watermarks, no limits on file sizes or number of operations. The site 
              is supported by advertising, not by tricking you into a subscription.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
