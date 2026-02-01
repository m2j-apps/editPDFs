"use client";

import { useState, useCallback, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { PDFDocument } from "pdf-lib";
import PDFDropzone from "@/components/PDFDropzone";
import SignatureCanvas from "@/components/SignatureCanvas";
import AdUnit from "@/components/AdUnit";

// Dynamic import for PDF viewer (no SSR)
const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

type SignatureMode = "draw" | "type" | "upload";

interface SignaturePlacement {
  pdfX: number;
  pdfY: number;
  pageNumber: number;
}

export default function SignPDFPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signatureMode, setSignatureMode] = useState<SignatureMode>("draw");
  const [typedSignature, setTypedSignature] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [placement, setPlacement] = useState<SignaturePlacement | null>(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureSize, setSignatureSize] = useState({ width: 200, height: 75 });

  const handleFileSelect = useCallback(async (file: File) => {
    setPdfFile(file);
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    setPdfBytes(bytes);
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
    setCurrentPage(1);
  };

  const handlePageClick = (pdfX: number, pdfY: number, pageNumber: number) => {
    setPlacement({ pdfX, pdfY, pageNumber });
    setShowSignatureModal(true);
  };

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
    if (!pdfBytes || !placement) return;
    
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
      const page = pages[placement.pageNumber - 1];
      const { height } = page.getSize();
      
      // Convert data URL to bytes
      const response = await fetch(sigDataUrl);
      const sigBytes = await response.arrayBuffer();
      
      // Embed the signature image
      const sigImage = await pdfDoc.embedPng(new Uint8Array(sigBytes));
      
      // Draw signature centered on clicked position
      // PDF coordinates start from bottom-left, so we need to flip Y
      page.drawImage(sigImage, {
        x: placement.pdfX - signatureSize.width / 2,
        y: height - placement.pdfY - signatureSize.height / 2,
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
      
      // Reset placement
      setShowSignatureModal(false);
      setPlacement(null);
      
    } catch (error) {
      console.error("Error signing PDF:", error);
      alert("Error signing PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [pdfBytes, pdfFile, signatureDataUrl, signatureMode, handleTypedSignatureToDataUrl, placement, signatureSize]);

  const resetAll = useCallback(() => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfFile(null);
    setPdfBytes(null);
    setPdfUrl(null);
    setSignatureDataUrl(null);
    setTypedSignature("");
    setPlacement(null);
    setShowSignatureModal(false);
    setCurrentPage(1);
    setTotalPages(1);
  }, [pdfUrl]);

  const cancelSignature = () => {
    setShowSignatureModal(false);
    setPlacement(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sign PDF Online — Free
          </h1>
          <p className="text-gray-600">
            Add your signature to any PDF. Click where you want to sign. No signup required.
          </p>
        </div>

        {/* Main content with sidebar ads */}
        <div className="flex gap-4">
          {/* Left sidebar ad */}
          <div className="hidden xl:block w-[160px] flex-shrink-0">
            <div className="sticky top-4">
              <AdUnit slot="SIGN_PDF_LEFT" format="vertical" className="min-h-[600px]" />
            </div>
          </div>

          {/* Main editor */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              {!pdfFile ? (
                <PDFDropzone onFileSelect={handleFileSelect} />
              ) : (
                <div className="space-y-4">
              {/* File info and controls */}
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
                  className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded hover:bg-gray-200"
                >
                  Change file
                </button>
              </div>

              {/* Page navigation */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    ← Prev
                  </button>
                  <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    Next →
                  </button>
                </div>
              )}

              {/* PDF Viewer */}
              {pdfUrl && (
                <PDFViewer
                  fileUrl={pdfUrl}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onDocumentLoadSuccess={onDocumentLoadSuccess}
                  onPageClick={handlePageClick}
                  placement={placement}
                  signatureSize={signatureSize}
                />
              )}
            </div>
          )}
            </div>
          </div>

          {/* Right sidebar ad */}
          <div className="hidden xl:block w-[160px] flex-shrink-0">
            <div className="sticky top-4">
              <AdUnit slot="SIGN_PDF_RIGHT" format="vertical" className="min-h-[600px]" />
            </div>
          </div>
        </div>

        {/* Signature Modal */}
        {showSignatureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Create Your Signature</h2>
                  <button
                    onClick={cancelSignature}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Signature mode tabs */}
                <div className="border-b border-gray-200 mb-4">
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
                      {signatureDataUrl && signatureMode === "upload" && (
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

                {/* Size controls */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width: {signatureSize.width}px
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="400"
                      value={signatureSize.width}
                      onChange={(e) => setSignatureSize(s => ({ ...s, width: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height: {signatureSize.height}px
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="150"
                      value={signatureSize.height}
                      onChange={(e) => setSignatureSize(s => ({ ...s, height: Number(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={cancelSignature}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applySignature}
                    disabled={isProcessing || (signatureMode === "draw" && !signatureDataUrl) || (signatureMode === "type" && !typedSignature) || (signatureMode === "upload" && !signatureDataUrl)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Processing..." : "Sign & Download"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
            <li><strong>Click where you want to sign</strong> — just click on the document</li>
            <li><strong>Create your signature</strong> — draw with your mouse/finger, type your name, or upload an image</li>
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
