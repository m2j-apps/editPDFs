"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { Tool, EditorObject, ShapeType } from "@/app/editor/page";
import SignatureModal from "./SignatureModal";
import TextEditModal from "./TextEditModal";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface EditorCanvasProps {
  fileUrl: string;
  currentPage: number;
  zoom: number;
  activeTool: Tool;
  objects: EditorObject[];
  selectedObjectId: string | null;
  onAddObject: (obj: Omit<EditorObject, "id">) => string;
  onUpdateObject: (id: string, updates: Partial<EditorObject>) => void;
  onDeleteObject: (id: string) => void;
  onSelectObject: (id: string | null) => void;
}

export default function EditorCanvas({
  fileUrl,
  currentPage,
  zoom,
  activeTool,
  objects,
  selectedObjectId,
  onAddObject,
  onUpdateObject,
  onDeleteObject,
  onSelectObject,
}: EditorCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageDimensions, setPageDimensions] = useState({ width: 612, height: 792 });
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const scale = zoom / 100;

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    // If clicking on an object, select it
    if ((e.target as HTMLElement).closest(".editor-object")) {
      return;
    }

    // Deselect current object
    onSelectObject(null);

    // Handle tool-specific actions
    switch (activeTool) {
      case "text":
        setPendingPosition({ x, y });
        setShowTextModal(true);
        break;
        
      case "sign":
        setPendingPosition({ x, y });
        setShowSignatureModal(true);
        break;
        
      case "whiteout":
        onAddObject({
          type: "whiteout",
          pageNumber: currentPage,
          x,
          y,
          width: 100,
          height: 30,
          color: "#ffffff",
        });
        break;
        
      case "shape":
        onAddObject({
          type: "shape",
          pageNumber: currentPage,
          x,
          y,
          width: 100,
          height: 80,
          shapeType: "rectangle",
          color: "#000000",
          strokeWidth: 2,
        });
        break;
        
      case "highlight":
        onAddObject({
          type: "highlight",
          pageNumber: currentPage,
          x,
          y,
          width: 150,
          height: 24,
          color: "#ffff00",
          opacity: 0.4,
        });
        break;
    }
  }, [activeTool, currentPage, onAddObject, onSelectObject, scale]);

  const handleObjectMouseDown = useCallback((e: React.MouseEvent, objId: string) => {
    e.stopPropagation();
    onSelectObject(objId);
    
    if (activeTool === "select") {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [activeTool, onSelectObject]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedObjectId) return;
    
    const dx = (e.clientX - dragStart.x) / scale;
    const dy = (e.clientY - dragStart.y) / scale;
    
    const obj = objects.find(o => o.id === selectedObjectId);
    if (obj) {
      onUpdateObject(selectedObjectId, {
        x: obj.x + dx,
        y: obj.y + dy,
      });
    }
    
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, selectedObjectId, objects, onUpdateObject, scale, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  const handleSignatureCreate = useCallback((signatureDataUrl: string) => {
    if (pendingPosition) {
      onAddObject({
        type: "signature",
        pageNumber: currentPage,
        x: pendingPosition.x,
        y: pendingPosition.y,
        width: 200,
        height: 75,
        src: signatureDataUrl,
      });
    }
    setShowSignatureModal(false);
    setPendingPosition(null);
  }, [pendingPosition, currentPage, onAddObject]);

  const handleTextCreate = useCallback((text: string, fontSize: number, color: string) => {
    if (pendingPosition) {
      onAddObject({
        type: "text",
        pageNumber: currentPage,
        x: pendingPosition.x,
        y: pendingPosition.y,
        width: text.length * fontSize * 0.6,
        height: fontSize * 1.2,
        content: text,
        fontSize,
        color,
      });
    }
    setShowTextModal(false);
    setPendingPosition(null);
  }, [pendingPosition, currentPage, onAddObject]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 300;
        const ratio = Math.min(maxWidth / img.width, 1);
        onAddObject({
          type: "image",
          pageNumber: currentPage,
          x: 50,
          y: 50,
          width: img.width * ratio,
          height: img.height * ratio,
          src: event.target?.result as string,
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [currentPage, onAddObject]);

  // Delete selected object on Delete key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedObjectId) {
        onDeleteObject(selectedObjectId);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjectId, onDeleteObject]);

  const getCursor = () => {
    switch (activeTool) {
      case "text":
        return "text";
      case "sign":
      case "whiteout":
      case "shape":
      case "highlight":
        return "crosshair";
      case "draw":
        return "crosshair";
      default:
        return "default";
    }
  };

  const selectedObject = objects.find(o => o.id === selectedObjectId);

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="relative bg-white shadow-lg"
        style={{ 
          cursor: getCursor(),
          width: pageDimensions.width * scale,
          height: pageDimensions.height * scale,
        }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* PDF Page */}
        <Document file={fileUrl} loading={null}>
          <Page
            pageNumber={currentPage}
            scale={scale}
            onLoadSuccess={(page) => {
              setPageDimensions({ 
                width: page.originalWidth, 
                height: page.originalHeight 
              });
            }}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        
        {/* Editor Objects Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {objects.map((obj) => (
            <div
              key={obj.id}
              className={`editor-object absolute pointer-events-auto ${
                selectedObjectId === obj.id ? "ring-2 ring-blue-500" : ""
              }`}
              style={{
                left: obj.x * scale,
                top: obj.y * scale,
                width: obj.width * scale,
                height: obj.height * scale,
                cursor: activeTool === "select" ? "move" : "pointer",
              }}
              onMouseDown={(e) => handleObjectMouseDown(e, obj.id)}
            >
              {/* Render based on object type */}
              {obj.type === "text" && (
                <div
                  style={{
                    fontSize: (obj.fontSize || 16) * scale,
                    color: obj.color || "#000000",
                    whiteSpace: "nowrap",
                  }}
                >
                  {obj.content}
                </div>
              )}
              
              {obj.type === "whiteout" && (
                <div className="w-full h-full bg-white border border-gray-200" />
              )}
              
              {obj.type === "highlight" && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: obj.color || "#ffff00",
                    opacity: obj.opacity || 0.4,
                  }}
                />
              )}
              
              {(obj.type === "image" || obj.type === "signature") && obj.src && (
                <img
                  src={obj.src}
                  alt=""
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              )}
              
              {obj.type === "shape" && obj.shapeType === "rectangle" && (
                <div
                  className="w-full h-full"
                  style={{
                    border: `${obj.strokeWidth || 2}px solid ${obj.color || "#000000"}`,
                  }}
                />
              )}
              
              {/* Resize handles for selected object */}
              {selectedObjectId === obj.id && (
                <>
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-sm cursor-nwse-resize" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-sm cursor-nesw-resize" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-sm cursor-nesw-resize" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-sm cursor-nwse-resize" />
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Hidden file input for image upload */}
        {activeTool === "image" && (
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
        )}
      </div>
      
      {/* Signature Modal */}
      {showSignatureModal && (
        <SignatureModal
          onClose={() => {
            setShowSignatureModal(false);
            setPendingPosition(null);
          }}
          onSave={handleSignatureCreate}
        />
      )}
      
      {/* Text Modal */}
      {showTextModal && (
        <TextEditModal
          onClose={() => {
            setShowTextModal(false);
            setPendingPosition(null);
          }}
          onSave={handleTextCreate}
        />
      )}
    </div>
  );
}
