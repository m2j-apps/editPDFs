"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { X, FileUp, File } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface AddPagesModalProps {
  onClose: () => void;
  onAddBlankPage: () => void;
  onAddPdfPages: (pdfBytes: Uint8Array, selectedPages: number[]) => void;
}

export default function AddPagesModal({
  onClose,
  onAddBlankPage,
  onAddPdfPages,
}: AddPagesModalProps) {
  const [mode, setMode] = useState<"choose" | "selectPages">("choose");
  const [uploadedPdf, setUploadedPdf] = useState<{
    url: string;
    bytes: Uint8Array;
    totalPages: number;
  } | null>(null);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const url = URL.createObjectURL(file);

    setUploadedPdf({ url, bytes, totalPages: 0 });
    setMode("selectPages");
    setSelectedPages(new Set());
  }, []);

  const handlePdfLoad = useCallback(({ numPages }: { numPages: number }) => {
    if (uploadedPdf) {
      setUploadedPdf({ ...uploadedPdf, totalPages: numPages });
      // Select all pages by default
      setSelectedPages(new Set(Array.from({ length: numPages }, (_, i) => i + 1)));
    }
  }, [uploadedPdf]);

  const togglePage = (pageNum: number) => {
    setSelectedPages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pageNum)) {
        newSet.delete(pageNum);
      } else {
        newSet.add(pageNum);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    if (uploadedPdf) {
      setSelectedPages(new Set(Array.from({ length: uploadedPdf.totalPages }, (_, i) => i + 1)));
    }
  };

  const selectNone = () => {
    setSelectedPages(new Set());
  };

  const handleAddPages = () => {
    if (uploadedPdf && selectedPages.size > 0) {
      onAddPdfPages(uploadedPdf.bytes, Array.from(selectedPages).sort((a, b) => a - b));
    }
    onClose();
  };

  const handleAddBlank = () => {
    onAddBlankPage();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === "choose" ? "Add Pages" : "Select Pages to Add"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {mode === "choose" ? (
            <div className="grid grid-cols-2 gap-4">
              {/* Add from PDF */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">Import from PDF</h3>
                  <p className="text-sm text-gray-500">Upload another PDF and select pages to add</p>
                </div>
              </label>

              {/* Add blank page */}
              <button
                onClick={handleAddBlank}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <File className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Blank Page</h3>
                <p className="text-sm text-gray-500">Add an empty page to your document</p>
              </button>
            </div>
          ) : uploadedPdf ? (
            <div>
              {/* Selection controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  {selectedPages.size} of {uploadedPdf.totalPages} pages selected
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Select All
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={selectNone}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Select None
                  </button>
                </div>
              </div>

              {/* Page thumbnails grid */}
              <div className="grid grid-cols-4 gap-3">
                <Document
                  file={uploadedPdf.url}
                  onLoadSuccess={handlePdfLoad}
                  loading={
                    <div className="col-span-4 text-center py-8 text-gray-500">
                      Loading PDF...
                    </div>
                  }
                >
                  {Array.from({ length: uploadedPdf.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <div
                      key={pageNum}
                      onClick={() => togglePage(pageNum)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                        selectedPages.has(pageNum)
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "ring-1 ring-gray-200 hover:ring-gray-300"
                      }`}
                    >
                      <Page
                        pageNumber={pageNum}
                        width={120}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                      {/* Checkbox overlay */}
                      <div className={`absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedPages.has(pageNum)
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white border-gray-300"
                      }`}>
                        {selectedPages.has(pageNum) && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      {/* Page number */}
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                        {pageNum}
                      </div>
                    </div>
                  ))}
                </Document>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        {mode === "selectPages" && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                setMode("choose");
                setUploadedPdf(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              ← Back
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPages}
                disabled={selectedPages.size === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add {selectedPages.size} Page{selectedPages.size !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
