"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import { Eraser } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    // Store file in sessionStorage for the editor to pick up
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

  const features = [
    { icon: "✏️", title: "Edit Text", desc: "Add, modify, or remove text from any PDF" },
    { icon: "✍️", title: "Sign & Initials", desc: "Draw, type, or upload your signature" },
    { icon: "🖼️", title: "Add Images", desc: "Insert photos, logos, or graphics" },
    { icon: "📑", title: "Manage Pages", desc: "Merge, split, reorder, rotate, or delete pages" },
    { icon: "🔷", title: "Shapes & Lines", desc: "Rectangles, circles, lines, and arrows" },
    { icon: "🖍️", title: "Highlight & Annotate", desc: "Highlight, underline, or strikethrough text" },
    { icon: "🖊️", title: "Freehand Draw", desc: "Draw freely anywhere on the document" },
    { icon: "eraser", title: "Whiteout", desc: "Cover and hide sensitive information" },
    { icon: "💾", title: "Save & Compress", desc: "Download optimized PDFs directly to your device" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Free PDF Editor
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Edit, sign, annotate, and modify PDFs online. No signup required. 
            Your files never leave your browser.
          </p>
          
          {/* Upload Box */}
          <div
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all p-12 cursor-pointer group"
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

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Edit PDFs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <span className="text-4xl mb-4 block">
                  {feature.icon === "eraser" ? <Eraser className="w-10 h-10 text-gray-700" /> : feature.icon}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdUnit slot="HOME_BANNER_1" format="horizontal" />
      </div>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload", desc: "Drop your PDF or click to browse" },
              { step: "2", title: "Edit", desc: "Use our tools to make changes" },
              { step: "3", title: "Download", desc: "Save your edited PDF instantly" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Privacy Matters
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <p className="text-lg text-blue-800">
              🔐 <strong>100% Client-Side Processing</strong>
              <br />
              <span className="text-blue-700">
                Your files never leave your browser. We can&apos;t see your documents 
                because they&apos;re processed entirely on your computer using modern 
                JavaScript. No uploads, no servers, no data collection.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Why Choose EditPDFs.app?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We built this because we were tired of &quot;free&quot; PDF tools that demand payment at download time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">💯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Actually Free</h3>
              <p className="text-gray-600">
                No hidden costs, no premium tiers, no watermarks. Supported by unobtrusive ads, 
                not subscription traps.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Private</h3>
              <p className="text-gray-600">
                Your files never leave your browser. All processing happens locally — 
                we literally cannot see your documents.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant & Offline</h3>
              <p className="text-gray-600">
                No upload wait times. Process PDFs instantly, and even work offline 
                once the page loads.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
