"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import PDFDropzone from "@/components/PDFDropzone";
import SignatureCanvas from "@/components/SignatureCanvas";
import AdUnit from "@/components/AdUnit";

type SignatureMode = "draw" | "type" | "upload";

export default function SignPDFPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signatureMode, setSignatureMode] = useState<SignatureMode>("draw");
  const [typedSignature, setTypedSignature] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [signaturePosition, setSignaturePosition] = useState({ x: 50, y: 50 });
  const [signatureSize, setSignatureSize] = useState({ width: 200, height: 75 });
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFileSelect = useCallback(async (file: File) => {
    setPdfFile(file);
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    setPdfBytes(bytes);
    
    // Get page count
    const pdfDoc = await PDFDocument.load(bytes);
    setTotalPages(pdfDoc.getPageCount());
    setSelectedPage(1);
  }, []);

  const handleTypedSignatureToDataUrl = useCallback(() => {
    if (!typedSignature) return null;
    
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "italic 48px 'Brush Script MT', cursive, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedSignature, canvas.width / 2, canvas.height / 2);
    
    return canvas.toDataURL("image/png");
  }, [typedSignature]);

  const handleUploadSignature = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setSignatureDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const applySignature = useCallback(async () => {
    if (!pdfBytes) return;
    
    let sigDataUrl = signatureDataUrl;
    if (signatureMode === "type") {
      sigDataUrl = handleTypedSignatureToDataUrl();
    }
    
    if (!sigDataUrl) {
      alert("Please create a signature first");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const page = pages[selectedPage - 1];
      const { height } = page.getSize();
      
      // Convert data URL to bytes
      const response = await fetch(sigDataUrl);
      const sigBytes = await response.arrayBuffer();
      
      // Embed the signature image
      const sigImage = await pdfDoc.embedPng(new Uint8Array(sigBytes));
      
      // Draw signature on the page
      page.drawImage(sigImage, {
        x: signaturePosition.x,
        y: height - signaturePosition.y - signatureSize.height,
        width: signatureSize.width,
        height: signatureSize.height,
      });
      
      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
      
      // Download
      const blob = new Blob([new Uint8Array(modifiedPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `signed_${pdfFile?.name || "document.pdf"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error signing PDF:", error);
      alert("Error signing PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [pdfBytes, pdfFile, signatureDataUrl, signatureMode, handleTypedSignatureToDataUrl, signaturePosition, signatureSize, selectedPage]);

  const resetAll = useCallback(() => {
    setPdfFile(null);
    setPdfBytes(null);
    setSignatureDataUrl(null);
    setTypedSignature("");
    setSelectedPage(1);
    setTotalPages(1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sign PDF Online — Free
          </h1>
          <p className="text-gray-600">
            Add your signature to any PDF. Draw, type, or upload. No signup required.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {!pdfFile ? (
            /* Step 1: Upload PDF */
            <PDFDropzone onFileSelect={handleFileSelect} />
          ) : (
            /* Step 2: Add Signature */
            <div className="space-y-6">
              {/* File info */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-medium text-gray-900">{pdfFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(pdfFile.size / 1024).toFixed(1)} KB • {totalPages} page{totalPages !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetAll}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Change file
                </button>
              </div>

              {/* Page selector */}
              {totalPages > 1 && (
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Sign on page:
                  </label>
                  <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(Number(e.target.value))}
                    className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <option key={page} value={page}>
                        Page {page}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Signature mode tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {[
                    { id: "draw", label: "Draw", icon: "✏️" },
                    { id: "type", label: "Type", icon: "⌨️" },
                    { id: "upload", label: "Upload", icon: "📤" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSignatureMode(mode.id as SignatureMode)}
                      className={`py-3 px-1 border-b-2 font-medium text-sm ${
                        signatureMode === mode.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {mode.icon} {mode.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Signature input */}
              <div className="py-4">
                {signatureMode === "draw" && (
                  <SignatureCanvas onSignatureChange={setSignatureDataUrl} />
                )}
                
                {signatureMode === "type" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={typedSignature}
                      onChange={(e) => setTypedSignature(e.target.value)}
                      placeholder="Type your name"
                      className="w-full px-4 py-3 text-2xl italic border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      style={{ fontFamily: "'Brush Script MT', cursive" }}
                    />
                    <p className="text-sm text-gray-500">
                      Your typed name will be converted to a signature style
                    </p>
                  </div>
                )}
                
                {signatureMode === "upload" && (
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadSignature}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {signatureDataUrl && (
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <img
                          src={signatureDataUrl}
                          alt="Uploaded signature"
                          className="max-h-24 mx-auto"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Position controls */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    X Position (from left)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="400"
                    value={signaturePosition.x}
                    onChange={(e) => setSignaturePosition(p => ({ ...p, x: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{signaturePosition.x}px</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Y Position (from top)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="700"
                    value={signaturePosition.y}
                    onChange={(e) => setSignaturePosition(p => ({ ...p, y: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{signaturePosition.y}px</span>
                </div>
              </div>

              {/* Size controls */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Signature Width
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={signatureSize.width}
                    onChange={(e) => setSignatureSize(s => ({ ...s, width: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{signatureSize.width}px</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Signature Height
                  </label>
                  <input
                    type="range"
                    min="25"
                    max="150"
                    value={signatureSize.height}
                    onChange={(e) => setSignatureSize(s => ({ ...s, height: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{signatureSize.height}px</span>
                </div>
              </div>

              {/* Apply button */}
              <button
                onClick={applySignature}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Sign & Download PDF"}
              </button>
            </div>
          )}
        </div>

        {/* Trust message */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 Your files never leave your browser. All processing happens locally.</p>
        </div>

        {/* Ad Unit */}
        <div className="my-8">
          <AdUnit slot="SIGN_PDF_BOTTOM" format="horizontal" />
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-gray max-w-none">
          <h2>How to Sign a PDF for Free</h2>
          <p>
            Signing PDFs shouldn&apos;t require expensive software or complicated accounts. 
            With EditPDFs.app, you can add your signature to any PDF document in seconds:
          </p>
          <ol>
            <li><strong>Upload your PDF</strong> — drag and drop or click to browse</li>
            <li><strong>Create your signature</strong> — draw with your mouse/finger, type your name, or upload an image</li>
            <li><strong>Position it</strong> — adjust the location and size of your signature</li>
            <li><strong>Download</strong> — get your signed PDF instantly</li>
          </ol>
          <h3>Why Use EditPDFs.app?</h3>
          <ul>
            <li><strong>100% Free</strong> — no hidden fees, no premium tier, no limits</li>
            <li><strong>Private</strong> — your files never leave your browser</li>
            <li><strong>No Account Required</strong> — just use it</li>
            <li><strong>Works Everywhere</strong> — desktop, tablet, or phone</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
