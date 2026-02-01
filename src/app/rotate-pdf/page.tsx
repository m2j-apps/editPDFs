"use client";

import { useState, useCallback } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import PDFDropzone from "@/components/PDFDropzone";

export default function RotatePDFPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rotations, setRotations] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    setPdfFile(file);
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    setPdfBytes(bytes);
    
    const pdfDoc = await PDFDocument.load(bytes);
    const pageCount = pdfDoc.getPageCount();
    setTotalPages(pageCount);
    setRotations(new Array(pageCount).fill(0));
  }, []);

  const rotatePage = useCallback((pageIndex: number, direction: "cw" | "ccw") => {
    setRotations(prev => {
      const next = [...prev];
      next[pageIndex] = (next[pageIndex] + (direction === "cw" ? 90 : -90) + 360) % 360;
      return next;
    });
  }, []);

  const rotateAll = useCallback((direction: "cw" | "ccw") => {
    setRotations(prev => prev.map(r => (r + (direction === "cw" ? 90 : -90) + 360) % 360));
  }, []);

  const applyRotation = useCallback(async () => {
    if (!pdfBytes) return;
    
    setIsProcessing(true);
    
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page, i) => {
        if (rotations[i] !== 0) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees(currentRotation + rotations[i]));
        }
      });
      
      const rotatedPdfBytes = await pdfDoc.save();
      
      const blob = new Blob([new Uint8Array(rotatedPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rotated_${pdfFile?.name || "document.pdf"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error rotating PDF:", error);
      alert("Error rotating PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [pdfBytes, pdfFile, rotations]);

  const resetAll = useCallback(() => {
    setPdfFile(null);
    setPdfBytes(null);
    setTotalPages(0);
    setRotations([]);
  }, []);

  const hasRotations = rotations.some(r => r !== 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rotate PDF Pages — Free
          </h1>
          <p className="text-gray-600">
            Rotate individual pages or all pages at once. No signup required.
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
                    <p className="text-sm text-gray-500">{totalPages} pages</p>
                  </div>
                </div>
                <button onClick={resetAll} className="text-sm text-gray-600 hover:text-gray-900">
                  Change file
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rotate all pages:</span>
                <div className="space-x-2">
                  <button
                    onClick={() => rotateAll("ccw")}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
                  >
                    ↺ Left
                  </button>
                  <button
                    onClick={() => rotateAll("cw")}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
                  >
                    ↻ Right
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div 
                      className="aspect-[3/4] bg-white border border-gray-200 rounded mb-2 flex items-center justify-center transition-transform duration-200"
                      style={{ transform: `rotate(${rotations[i]}deg)` }}
                    >
                      <span className="text-gray-400 text-sm">Page {i + 1}</span>
                    </div>
                    <div className="flex justify-center space-x-1">
                      <button
                        onClick={() => rotatePage(i, "ccw")}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Rotate left"
                      >
                        ↺
                      </button>
                      <span className="text-xs text-gray-500 py-1">
                        {rotations[i]}°
                      </span>
                      <button
                        onClick={() => rotatePage(i, "cw")}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Rotate right"
                      >
                        ↻
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={applyRotation}
                disabled={!hasRotations || isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Apply Rotation & Download"}
              </button>
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
