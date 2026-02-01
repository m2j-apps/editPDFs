"use client";

import { useRef, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureBox from "./SignatureBox";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  fileUrl: string;
  currentPage: number;
  onDocumentLoadSuccess: (params: { numPages: number }) => void;
  onPageClick: (pdfX: number, pdfY: number) => void;
  placement: { pdfX: number; pdfY: number } | null;
  signatureSize: { width: number; height: number };
  onPositionChange: (x: number, y: number) => void;
  onSizeChange: (width: number, height: number) => void;
  signaturePreview?: string | null;
}

export default function PDFViewer({
  fileUrl,
  currentPage,
  onDocumentLoadSuccess,
  onPageClick,
  placement,
  signatureSize,
  onPositionChange,
  onSizeChange,
  signaturePreview,
}: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [pageScale, setPageScale] = useState(1);
  const [pageDimensions, setPageDimensions] = useState({ width: 612, height: 792 });

  const onPageLoadSuccess = (page: { width: number; height: number; originalWidth: number; originalHeight: number }) => {
    setPageDimensions({ width: page.originalWidth, height: page.originalHeight });
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth - 16;
      setPageScale(Math.min(containerWidth / page.originalWidth, 1));
    }
  };

  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Don't trigger if clicking on the signature box
    if ((e.target as HTMLElement).closest('.signature-box-container')) return;
    
    const pageElement = pageContainerRef.current?.querySelector(".react-pdf__Page") as HTMLElement;
    if (!pageElement) return;
    
    const rect = pageElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to PDF coordinates
    const pdfX = x / pageScale;
    const pdfY = y / pageScale;
    
    onPageClick(pdfX, pdfY);
  }, [pageScale, onPageClick]);

  return (
    <div ref={containerRef}>
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center mb-4">
        <p className="text-blue-800 text-sm">
          {placement 
            ? "👆 Drag to move, drag corners/edges to resize. Click elsewhere to reposition."
            : "👆 Click anywhere on the document to place your signature"
          }
        </p>
      </div>

      {/* PDF Viewer */}
      <div 
        ref={pageContainerRef}
        className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex justify-center"
        onClick={handlePageClick}
        style={{ cursor: placement ? "default" : "crosshair" }}
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
        
        {/* Draggable/Resizable Signature Box */}
        {placement && (
          <div className="signature-box-container absolute inset-0 pointer-events-none">
            <div className="pointer-events-auto">
              <SignatureBox
                initialX={placement.pdfX * pageScale - (signatureSize.width * pageScale) / 2}
                initialY={placement.pdfY * pageScale - (signatureSize.height * pageScale) / 2}
                width={signatureSize.width}
                height={signatureSize.height}
                scale={pageScale}
                containerRef={pageContainerRef}
                onPositionChange={onPositionChange}
                onSizeChange={onSizeChange}
                signaturePreview={signaturePreview}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
