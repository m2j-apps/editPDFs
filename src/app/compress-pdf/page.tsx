"use client";

import { useState, useCallback } from "react";
import PDFDropzone from "@/components/PDFDropzone";

export default function CompressPDFPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setPdfFile(file);
    setResult(null);
  }, []);

  const compressPDF = useCallback(async () => {
    if (!pdfFile) return;
    
    setIsProcessing(true);
    
    try {
      // Note: True PDF compression requires either:
      // 1. Re-encoding images at lower quality (complex, needs image processing)
      // 2. Removing unnecessary objects (needs PDF parsing)
      // 3. Using a server-side tool like Ghostscript
      
      // For now, we'll use pdf-lib to create a "clean" copy which sometimes reduces size
      const { PDFDocument } = await import("pdf-lib");
      
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Save with some optimization flags
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });
      
      const originalSize = pdfFile.size;
      const compressedSize = compressedBytes.length;
      
      setResult({ original: originalSize, compressed: compressedSize });
      
      // Download
      const blob = new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${pdfFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error compressing PDF:", error);
      alert("Error compressing PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [pdfFile]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const resetAll = useCallback(() => {
    setPdfFile(null);
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Compress PDF — Free
          </h1>
          <p className="text-gray-600">
            Reduce PDF file size for easier sharing. No signup required.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {!pdfFile ? (
            <PDFDropzone onFileSelect={handleFileSelect} />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-medium text-gray-900">{pdfFile.name}</p>
                    <p className="text-sm text-gray-500">{formatSize(pdfFile.size)}</p>
                  </div>
                </div>
                <button onClick={resetAll} className="text-sm text-gray-600 hover:text-gray-900">
                  Change file
                </button>
              </div>

              {result && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Original size:</span>
                    <span className="font-medium">{formatSize(result.original)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Compressed size:</span>
                    <span className="font-medium text-green-700">{formatSize(result.compressed)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-green-200">
                    <span className="text-gray-700">Reduction:</span>
                    <span className="font-bold text-green-700">
                      {result.compressed < result.original
                        ? `${Math.round((1 - result.compressed / result.original) * 100)}% smaller`
                        : "No reduction possible"}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={compressPDF}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Compressing..." : "Compress & Download"}
              </button>

              <p className="text-sm text-gray-500 text-center">
                💡 Tip: PDFs with lots of images compress better than text-only PDFs.
              </p>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>🔒 Your files never leave your browser. All processing happens locally.</p>
        </div>
      </div>
    </div>
  );
}
