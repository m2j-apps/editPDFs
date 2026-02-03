"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import AdUnit from "@/components/AdUnit";

export default function Home() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      sessionStorage.setItem("pendingPdfData", e.target?.result as string);
      sessionStorage.setItem("pendingPdfName", file.name);
      router.push("/editor");
    };
    reader.readAsDataURL(file);
  }, [router]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free PDF Editor
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Edit, sign, annotate, and modify PDFs online. No signup required. 
            Your files never leave your browser — 100% private.
          </p>
          
          {/* Upload Box */}
          <div
            className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all p-8 md:p-12 cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📄</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Drop your PDF here
            </h2>
            <p className="text-gray-600 mb-6">
              or click to browse your files
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
              Select PDF File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">🔒</span> 100% Private
            </div>
            <div className="flex items-center gap-2">
              <span>⚡</span> Instant Processing
            </div>
            <div className="flex items-center gap-2">
              <span>♾️</span> No Limits
            </div>
            <div className="flex items-center gap-2">
              <span>🚫</span> No Signup
            </div>
          </div>
        </div>
      </section>

      {/* Ad Unit */}
      <div className="max-w-4xl mx-auto px-4">
        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />
      </div>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How to Edit Your PDF
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your PDF</h3>
              <p className="text-gray-600">Drag and drop your PDF file above, or click to browse. Your file stays on your device.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Edit with Our Tools</h3>
              <p className="text-gray-600">Use the toolbar to add text, signatures, images, shapes, highlights, and more.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download Instantly</h3>
              <p className="text-gray-600">Click Download to save your edited PDF. No watermarks, no waiting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Everything You Need to Edit PDFs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "✏️", title: "Add & Edit Text", desc: "Insert new text anywhere or modify existing content in your PDF." },
              { icon: "✍️", title: "Sign Documents", desc: "Draw your signature with mouse or finger, type it, or upload an image." },
              { icon: "🖼️", title: "Insert Images", desc: "Add photos, logos, stamps, or any image to your PDF pages." },
              { icon: "📑", title: "Manage Pages", desc: "Add, delete, reorder, or rotate pages. Merge multiple PDFs together." },
              { icon: "🔷", title: "Shapes & Lines", desc: "Draw rectangles, circles, lines, and arrows to annotate your documents." },
              { icon: "🖍️", title: "Highlight & Annotate", desc: "Highlight important text, underline, or strikethrough content." },
              { icon: "🖊️", title: "Freehand Drawing", desc: "Draw freely anywhere on the document with customizable pen colors." },
              { icon: "⬜", title: "Whiteout Tool", desc: "Cover and hide sensitive information with white rectangles." },
              { icon: "💾", title: "Save & Compress", desc: "Download your edited PDF optimized for smaller file sizes." },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm">
                <span className="text-3xl mb-3 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Unit */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdUnit slot="MIDDLE_BANNER" format="horizontal" />
      </div>

      {/* Privacy Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Your Privacy is Guaranteed
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🔐</span>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">100% Client-Side Processing</h3>
                <p className="text-blue-800">
                  Your PDF files are processed entirely in your web browser using JavaScript. 
                  They are <strong>never uploaded</strong> to any server. We literally cannot see your documents 
                  because they never leave your computer. This means instant processing with zero privacy risk.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🚫</div>
              <h4 className="font-semibold text-gray-900">No Uploads</h4>
              <p className="text-sm text-gray-600">Files stay on your device</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900">No Data Collection</h4>
              <p className="text-sm text-gray-600">We don&apos;t store anything</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-semibold text-gray-900">Works Offline</h4>
              <p className="text-sm text-gray-600">Once loaded, no internet needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Why EditPDFs.app?
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We built this because we were tired of &quot;free&quot; PDF tools that demand payment at download time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">💯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Actually Free</h3>
              <p className="text-gray-600 text-sm">
                No hidden costs, no premium tiers, no watermarks on your files. 
                We&apos;re supported by ads, not subscription traps.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Processing</h3>
              <p className="text-gray-600 text-sm">
                No upload wait times. Your PDF loads instantly because everything 
                happens right in your browser.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">♾️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Limits</h3>
              <p className="text-gray-600 text-sm">
                Edit as many PDFs as you want. No daily limits, no file size restrictions, 
                no feature lockouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad Unit */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdUnit slot="BOTTOM_BANNER" format="horizontal" />
      </div>

      {/* Final CTA */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Edit Your PDF?
          </h2>
          <p className="text-blue-100 mb-6">
            Just drop your file above and start editing. It&apos;s that simple.
          </p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Select PDF File
          </button>
        </div>
      </section>
    </div>
  );
}
