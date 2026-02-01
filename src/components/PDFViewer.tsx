"use client";

import { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  fileUrl: string;
  currentPage: number;
  totalPages: number;
  onDocumentLoadSuccess: (params: { numPages: number }) => void;
  onPageClick: (pdfX: number, pdfY: number, pageNumber: number) => void;
  placement: { pdfX: number; pdfY: number; pageNumber: number } | null;
  signatureSize: { width: number; height: number };
}

export default function PDFViewer({
  fileUrl,
  currentPage,
  totalPages,
  onDocumentLoadSuccess,
  onPageClick,
  placement,
  signatureSize,
}: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageScale, setPageScale] = useState(1);
  const [pageDimensions, setPageDimensions] = useState({ width: 612, height: 792 });

  const onPageLoadSuccess = (page: { width: number; height: number; originalWidth: number; originalHeight: number }) => {
    setPageDimensions({ width: page.originalWidth, height: page.originalHeight });
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth - 48;
      setPageScale(Math.min(containerWidth / page.originalWidth, 1));
    }
  };

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget.querySelector(".react-pdf__Page") as HTMLElement;
    if (!target) return;
    
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to PDF coordinates
    const pdfX = x / pageScale;
    const pdfY = y / pageScale;
    
    onPageClick(pdfX, pdfY, currentPage);
  };

  return (
    <div ref={containerRef}>
      {/* Page navigation */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center mb-4">
        <p className="text-blue-800 text-sm">
          👆 <strong>Click anywhere on the document</strong> where you want to place your signature
        </p>
      </div>

      {/* PDF Viewer */}
      <div 
        className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex justify-center cursor-crosshair"
        onClick={handlePageClick}
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <Page
            pageNumber={currentPage}
            scale={pageScale}
            onLoadSuccess={onPageLoadSuccess}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        
        {/* Show placement indicator */}
        {placement && placement.pageNumber === currentPage && (
          <div
            className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-30 pointer-events-none"
            style={{
              left: `calc(50% + ${(placement.pdfX - pageDimensions.width / 2) * pageScale}px - ${(signatureSize.width * pageScale) / 2}px)`,
              top: placement.pdfY * pageScale - (signatureSize.height * pageScale) / 2,
              width: signatureSize.width * pageScale,
              height: signatureSize.height * pageScale,
            }}
          />
        )}
      </div>
    </div>
  );
}
