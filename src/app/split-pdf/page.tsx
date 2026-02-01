"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import PDFDropzone from "@/components/PDFDropzone";

export default function SplitPDFPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    setPdfFile(file);
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    setPdfBytes(bytes);
    
    const pdfDoc = await PDFDocument.load(bytes);
    const pageCount = pdfDoc.getPageCount();
    setTotalPages(pageCount);
    setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i)));
  }, []);

  const togglePage = useCallback((pageIndex: number) => {
    setSelectedPages(prev => {
      const next = new Set(prev);
      if (next.has(pageIndex)) {
        next.delete(pageIndex);
      } else {
        next.add(pageIndex);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedPages(new Set(Array.from({ length: totalPages }, (_, i) => i)));
  }, [totalPages]);

  const selectNone = useCallback(() => {
    setSelectedPages(new Set());
  }, []);

  const splitPDF = useCallback(async () => {
    if (!pdfBytes || selectedPages.size === 0) return;
    
    setIsProcessing(true);
    
    try {
      const sourcePdf = await PDFDocument.load(pdfBytes);
      const newPdf = await PDFDocument.create();
      
      const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);
      const copiedPages = await newPdf.copyPages(sourcePdf, sortedPages);
      copiedPages.forEach(page => newPdf.addPage(page));
      
      const newPdfBytes = await newPdf.save();
      
      const blob = new Blob([new Uint8Array(newPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `split_${pdfFile?.name || "document.pdf"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Error splitting PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [pdfBytes, pdfFile, selectedPages]);

  const resetAll = useCallback(() => {
    setPdfFile(null);
    setPdfBytes(null);
    setTotalPages(0);
    setSelectedPages(new Set());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Split PDF — Extract Pages Free
          </h1>
          <p className="text-gray-600">
            Select which pages to keep and download a new PDF. No signup required.
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
                <span className="text-sm text-gray-600">
                  {selectedPages.size} of {totalPages} pages selected
                </span>
                <div className="space-x-2">
                  <button onClick={selectAll} className="text-sm text-blue-600 hover:underline">
                    Select all
                  </button>
                  <span className="text-gray-300">|</span>
                  <button onClick={selectNone} className="text-sm text-blue-600 hover:underline">
                    Select none
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => togglePage(i)}
                    className={`aspect-[3/4] rounded-lg border-2 flex items-center justify-center text-sm font-medium transition ${
                      selectedPages.has(i)
                        ? "bg-blue-100 border-blue-500 text-blue-700"
                        : "bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={splitPDF}
                disabled={selectedPages.size === 0 || isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : `Extract ${selectedPages.size} Pages`}
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
