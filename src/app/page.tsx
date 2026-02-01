"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

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
    { icon: "✍️", title: "Sign Documents", desc: "Draw, type, or upload your signature" },
    { icon: "🖼️", title: "Add Images", desc: "Insert images anywhere in your document" },
    { icon: "📄", title: "Manage Pages", desc: "Reorder, delete, or rotate pages" },
    { icon: "⬜", title: "Shapes & Whiteout", desc: "Add shapes or hide sensitive content" },
    { icon: "🔖", title: "Annotate", desc: "Highlight text and add annotations" },
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
                <span className="text-4xl mb-4 block">{feature.icon}</span>
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

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h2>Free Online PDF Editor</h2>
            <p>
              EditPDFs.app is a powerful, free PDF editor that runs entirely in your web browser. 
              Unlike other &quot;free&quot; PDF tools that require signups, impose limits, or upload 
              your files to remote servers, our editor processes everything locally on your device.
            </p>
            <h3>What Can You Do?</h3>
            <ul>
              <li><strong>Edit Text</strong> — Add new text or modify existing content</li>
              <li><strong>Sign Documents</strong> — Draw, type, or upload your signature</li>
              <li><strong>Add Images</strong> — Insert photos, logos, or graphics</li>
              <li><strong>Manage Pages</strong> — Reorder, delete, rotate, or add pages</li>
              <li><strong>Annotate</strong> — Highlight text and add notes</li>
              <li><strong>Whiteout</strong> — Cover sensitive information</li>
              <li><strong>Add Shapes</strong> — Insert rectangles, circles, and lines</li>
            </ul>
            <h3>Why Choose EditPDFs.app?</h3>
            <p>
              We built this tool because we were frustrated with PDF editors that promise 
              free editing but then demand payment to download your work. Our tool is 
              completely free, with no hidden costs or premium tiers. The site is supported 
              by unobtrusive advertising, not by tricking you into subscriptions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
