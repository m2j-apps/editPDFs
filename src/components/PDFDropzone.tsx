"use client";

import { useCallback } from "react";

interface PDFDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
}

export default function PDFDropzone({ 
  onFileSelect, 
  accept = ".pdf",
  multiple = false,
  children 
}: PDFDropzoneProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFiles = files.filter(f => f.type === "application/pdf");
    
    if (pdfFiles.length > 0) {
      if (multiple) {
        pdfFiles.forEach(f => onFileSelect(f));
      } else {
        onFileSelect(pdfFiles[0]);
      }
    }
  }, [onFileSelect, multiple]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (multiple) {
        Array.from(files).forEach(f => onFileSelect(f));
      } else {
        onFileSelect(files[0]);
      }
    }
  }, [onFileSelect, multiple]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer"
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
        id="pdf-upload"
      />
      <label htmlFor="pdf-upload" className="cursor-pointer">
        {children || (
          <>
            <div className="text-5xl mb-4">📄</div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag & drop your PDF here
            </p>
            <p className="text-gray-500">
              or <span className="text-blue-600 hover:underline">browse files</span>
            </p>
          </>
        )}
      </label>
    </div>
  );
}
