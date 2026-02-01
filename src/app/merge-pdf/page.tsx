"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";

interface PDFFile {
  id: string;
  file: File;
  pageCount: number;
}

export default function MergePDFPage() {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newFiles: PDFFile[] = [];
    
    for (const file of Array.from(files)) {
      if (file.type !== "application/pdf") continue;
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        
        newFiles.push({
          id: Math.random().toString(36).substring(7),
          file,
          pageCount: pdfDoc.getPageCount(),
        });
      } catch (error) {
        console.error(`Error loading ${file.name}:`, error);
      }
    }
    
    setPdfFiles(prev => [...prev, ...newFiles]);
    e.target.value = ""; // Reset input
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    
    const files = Array.from(e.dataTransfer.files).filter(
      f => f.type === "application/pdf"
    );
    
    const newFiles: PDFFile[] = [];
    
    for (const file of files) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        
        newFiles.push({
          id: Math.random().toString(36).substring(7),
          file,
          pageCount: pdfDoc.getPageCount(),
        });
      } catch (error) {
        console.error(`Error loading ${file.name}:`, error);
      }
    }
    
    setPdfFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setPdfFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const handleDragStart = useCallback((id: string) => {
    setDraggedId(id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;
    
    setPdfFiles(prev => {
      const draggedIndex = prev.findIndex(f => f.id === draggedId);
      const targetIndex = prev.findIndex(f => f.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newFiles = [...prev];
      const [draggedFile] = newFiles.splice(draggedIndex, 1);
      newFiles.splice(targetIndex, 0, draggedFile);
      
      return newFiles;
    });
  }, [draggedId]);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
  }, []);

  const mergePDFs = useCallback(async () => {
    if (pdfFiles.length < 2) {
      alert("Please add at least 2 PDF files to merge");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const pdfFile of pdfFiles) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }
      
      const mergedPdfBytes = await mergedPdf.save();
      
      // Download
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Error merging PDFs. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [pdfFiles]);

  const totalPages = pdfFiles.reduce((sum, f) => sum + f.pageCount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Merge PDF Files — Free
          </h1>
          <p className="text-gray-600">
            Combine multiple PDFs into one document. Drag to reorder. No limits.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Drop zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition mb-6"
          >
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <div className="text-5xl mb-4">📎</div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag & drop PDF files here
              </p>
              <p className="text-gray-500">
                or <span className="text-blue-600 hover:underline">browse files</span>
              </p>
            </label>
          </div>

          {/* File list */}
          {pdfFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{pdfFiles.length} file{pdfFiles.length !== 1 ? "s" : ""} • {totalPages} total pages</span>
                <button
                  onClick={() => setPdfFiles([])}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-2">
                {pdfFiles.map((pdfFile, index) => (
                  <div
                    key={pdfFile.id}
                    draggable
                    onDragStart={() => handleDragStart(pdfFile.id)}
                    onDragOver={(e) => handleDragOver(e, pdfFile.id)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center justify-between bg-gray-50 rounded-lg p-4 cursor-move hover:bg-gray-100 transition ${
                      draggedId === pdfFile.id ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400 text-lg">⋮⋮</span>
                      <span className="bg-blue-100 text-blue-700 text-sm font-medium px-2 py-1 rounded">
                        {index + 1}
                      </span>
                      <span className="text-2xl">📄</span>
                      <div>
                        <p className="font-medium text-gray-900">{pdfFile.file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(pdfFile.file.size / 1024).toFixed(1)} KB • {pdfFile.pageCount} page{pdfFile.pageCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(pdfFile.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center">
                💡 Drag files to reorder them
              </p>

              {/* Merge button */}
              <button
                onClick={mergePDFs}
                disabled={pdfFiles.length < 2 || isProcessing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isProcessing ? "Merging..." : `Merge ${pdfFiles.length} PDFs`}
              </button>
            </div>
          )}
        </div>

        {/* Trust message */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 Your files never leave your browser. All processing happens locally.</p>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-gray max-w-none">
          <h2>How to Merge PDF Files for Free</h2>
          <p>
            Combining multiple PDF documents into one file is easy with EditPDFs.app:
          </p>
          <ol>
            <li><strong>Add your PDFs</strong> — drag and drop multiple files or click to browse</li>
            <li><strong>Reorder</strong> — drag files to arrange them in the order you want</li>
            <li><strong>Merge</strong> — click the button to combine all PDFs</li>
            <li><strong>Download</strong> — get your merged PDF instantly</li>
          </ol>
          <h3>No File Limits</h3>
          <p>
            Unlike other PDF tools, we don&apos;t limit how many files you can merge or how 
            large they can be. Merge 2 PDFs or 20 — it&apos;s all free.
          </p>
          <h3>Privacy Guaranteed</h3>
          <p>
            Your PDF files are processed entirely in your web browser. They are never 
            uploaded to any server. This means your documents stay private, and the 
            merging happens instantly without any upload/download wait time.
          </p>
        </div>
      </div>
    </div>
  );
}
