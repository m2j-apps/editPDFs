"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { X, FileUp, File, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface UploadedPdf {
  id: string;
  name: string;
  url: string;
  bytes: Uint8Array;
  totalPages: number;
  selectedPages: Set<number>;
  expanded: boolean;
}

interface AddPagesModalProps {
  onClose: () => void;
  onAddBlankPage: () => void;
  onAddPdfPages: (pdfs: Array<{ bytes: Uint8Array; selectedPages: number[] }>) => void;
}

export default function AddPagesModal({
  onClose,
  onAddBlankPage,
  onAddPdfPages,
}: AddPagesModalProps) {
  const [mode, setMode] = useState<"choose" | "selectPages">("choose");
  const [uploadedPdfs, setUploadedPdfs] = useState<UploadedPdf[]>([]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPdfs: UploadedPdf[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const url = URL.createObjectURL(file);

      newPdfs.push({
        id: `pdf-${Date.now()}-${i}`,
        name: file.name,
        url,
        bytes,
        totalPages: 0, // Will be set when Document loads
        selectedPages: new Set(),
        expanded: files.length === 1, // Auto-expand if only 1 file
      });
    }

    setUploadedPdfs(prev => [...prev, ...newPdfs]);
    setMode("selectPages");

    // Reset input so the same files can be selected again
    e.target.value = "";
  }, []);

  const handlePdfLoad = useCallback((pdfId: string, numPages: number) => {
    setUploadedPdfs(prev => prev.map(pdf => {
      if (pdf.id !== pdfId) return pdf;
      return {
        ...pdf,
        totalPages: numPages,
        selectedPages: new Set(Array.from({ length: numPages }, (_, i) => i + 1)),
      };
    }));
  }, []);

  const togglePage = (pdfId: string, pageNum: number) => {
    setUploadedPdfs(prev => prev.map(pdf => {
      if (pdf.id !== pdfId) return pdf;
      const newSet = new Set(pdf.selectedPages);
      if (newSet.has(pageNum)) {
        newSet.delete(pageNum);
      } else {
        newSet.add(pageNum);
      }
      return { ...pdf, selectedPages: newSet };
    }));
  };

  const selectAll = (pdfId: string) => {
    setUploadedPdfs(prev => prev.map(pdf => {
      if (pdf.id !== pdfId) return pdf;
      return {
        ...pdf,
        selectedPages: new Set(Array.from({ length: pdf.totalPages }, (_, i) => i + 1)),
      };
    }));
  };

  const selectNone = (pdfId: string) => {
    setUploadedPdfs(prev => prev.map(pdf => {
      if (pdf.id !== pdfId) return pdf;
      return { ...pdf, selectedPages: new Set() };
    }));
  };

  const toggleExpanded = (pdfId: string) => {
    setUploadedPdfs(prev => prev.map(pdf => {
      if (pdf.id !== pdfId) return pdf;
      return { ...pdf, expanded: !pdf.expanded };
    }));
  };

  const removePdf = (pdfId: string) => {
    setUploadedPdfs(prev => {
      const updated = prev.filter(pdf => pdf.id !== pdfId);
      if (updated.length === 0) setMode("choose");
      return updated;
    });
  };

  const totalSelectedPages = uploadedPdfs.reduce((sum, pdf) => sum + pdf.selectedPages.size, 0);

  const handleAddPages = () => {
    const pdfs = uploadedPdfs
      .filter(pdf => pdf.selectedPages.size > 0)
      .map(pdf => ({
        bytes: pdf.bytes,
        selectedPages: Array.from(pdf.selectedPages).sort((a, b) => a - b),
      }));

    if (pdfs.length > 0) {
      onAddPdfPages(pdfs);
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
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">Import from PDF</h3>
                  <p className="text-sm text-gray-500">Upload one or more PDFs and select pages to add</p>
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
          ) : (
            <div className="space-y-4">
              {/* Add more files button */}
              <label className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                <FileUp className="w-4 h-4" />
                Add more PDFs
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>

              {/* PDF list */}
              {uploadedPdfs.map((pdf) => (
                <div key={pdf.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* PDF header row */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <button
                      onClick={() => toggleExpanded(pdf.id)}
                      className="p-0.5 text-gray-500 hover:text-gray-700"
                    >
                      {pdf.expanded
                        ? <ChevronDown className="w-4 h-4" />
                        : <ChevronRight className="w-4 h-4" />
                      }
                    </button>
                    <button
                      onClick={() => toggleExpanded(pdf.id)}
                      className="flex-1 text-left min-w-0"
                    >
                      <span className="text-sm font-medium text-gray-900 truncate block">
                        {pdf.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {pdf.totalPages > 0
                          ? `${pdf.selectedPages.size} of ${pdf.totalPages} pages selected`
                          : "Loading..."}
                      </span>
                    </button>
                    <button
                      onClick={() => removePdf(pdf.id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Expanded: page selection */}
                  {pdf.expanded && (
                    <div className="p-4 border-t border-gray-200">
                      {/* Selection controls */}
                      {pdf.totalPages > 0 && (
                        <div className="flex items-center justify-end gap-2 mb-3">
                          <button
                            onClick={() => selectAll(pdf.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Select All
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => selectNone(pdf.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Select None
                          </button>
                        </div>
                      )}

                      {/* Page thumbnails grid */}
                      <div className="grid grid-cols-4 gap-3">
                        <Document
                          file={pdf.url}
                          onLoadSuccess={({ numPages }) => handlePdfLoad(pdf.id, numPages)}
                          loading={
                            <div className="col-span-4 text-center py-8 text-gray-500">
                              Loading PDF...
                            </div>
                          }
                        >
                          {Array.from({ length: pdf.totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <div
                              key={pageNum}
                              onClick={() => togglePage(pdf.id, pageNum)}
                              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                                pdf.selectedPages.has(pageNum)
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
                                pdf.selectedPages.has(pageNum)
                                  ? "bg-blue-500 border-blue-500 text-white"
                                  : "bg-white border-gray-300"
                              }`}>
                                {pdf.selectedPages.has(pageNum) && (
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
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {mode === "selectPages" && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                setMode("choose");
                setUploadedPdfs([]);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              &larr; Back
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
                disabled={totalSelectedPages === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add {totalSelectedPages} Page{totalSelectedPages !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
