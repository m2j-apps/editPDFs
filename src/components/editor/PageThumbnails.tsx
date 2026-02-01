"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PageThumbnailsProps {
  fileUrl: string;
  pageOrder: number[];
  deletedPages: Set<number>;
  currentPage: number;
  onPageSelect: (page: number) => void;
  onPageDelete: (page: number) => void;
  onReorder: (newOrder: number[]) => void;
  onPageRotate?: (page: number) => void;
  pageRotations?: Map<number, number>;
}

export default function PageThumbnails({
  fileUrl,
  pageOrder,
  deletedPages,
  currentPage,
  onPageSelect,
  onPageDelete,
  onReorder,
  onPageRotate,
  pageRotations = new Map(),
}: PageThumbnailsProps) {
  const [totalPages, setTotalPages] = useState(0);
  const [draggedPage, setDraggedPage] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, pageNum: number) => {
    setDraggedPage(pageNum);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedPage === null) return;

    const dragIndex = pageOrder.indexOf(draggedPage);
    if (dragIndex === dropIndex) return;

    const newOrder = [...pageOrder];
    newOrder.splice(dragIndex, 1);
    newOrder.splice(dropIndex, 0, draggedPage);
    onReorder(newOrder);

    setDraggedPage(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedPage(null);
    setDragOverIndex(null);
  };

  return (
    <div className="p-2 space-y-2">
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
        loading={null}
      >
        {pageOrder.map((pageNum, index) => {
          const rotation = pageRotations.get(pageNum) || 0;
          const isNewPage = pageNum > totalPages; // Virtual blank page
          
          return (
            <div
              key={pageNum}
              draggable
              onDragStart={(e) => handleDragStart(e, pageNum)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => onPageSelect(pageNum)}
              className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all ${
                currentPage === pageNum
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : "hover:ring-2 hover:ring-gray-300"
              } ${dragOverIndex === index ? "ring-2 ring-blue-400 ring-dashed" : ""} ${
                draggedPage === pageNum ? "opacity-50" : ""
              }`}
            >
              {/* Page thumbnail */}
              <div 
                className="bg-white"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {isNewPage ? (
                  <div className="w-[160px] h-[207px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    Blank Page
                  </div>
                ) : (
                  <Page
                    pageNumber={pageNum}
                    width={160}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                )}
              </div>
              
              {/* Page number label */}
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                {index + 1}
              </div>
              
              {/* Rotate button */}
              {onPageRotate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPageRotate(pageNum);
                  }}
                  className="absolute bottom-1 right-1 w-6 h-6 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs hover:bg-blue-600"
                  title="Rotate page 90°"
                >
                  ↻
                </button>
              )}
              
              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPageDelete(pageNum);
                }}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs hover:bg-red-600"
                title="Delete page"
              >
                ×
              </button>
              
              {/* Drag handle indicator */}
              <div className="absolute top-1 left-1 w-6 h-6 bg-gray-800 bg-opacity-60 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs cursor-grab">
                ⋮⋮
              </div>
            </div>
          );
        })}
      </Document>
    </div>
  );
}
