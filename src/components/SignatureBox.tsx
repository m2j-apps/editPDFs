"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface SignatureBoxProps {
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  scale: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPositionChange: (x: number, y: number) => void;
  onSizeChange: (width: number, height: number) => void;
  signaturePreview?: string | null;
}

type ResizeHandle = "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w" | null;

export default function SignatureBox({
  initialX,
  initialY,
  width,
  height,
  scale,
  containerRef,
  onPositionChange,
  onSizeChange,
  signaturePreview,
}: SignatureBoxProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<ResizeHandle>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  // Update parent when position changes
  useEffect(() => {
    onPositionChange(position.x / scale, position.y / scale);
  }, [position, scale, onPositionChange]);

  // Update parent when size changes
  useEffect(() => {
    onSizeChange(size.width / scale, size.height / scale);
  }, [size, scale, onSizeChange]);

  // Sync with prop changes
  useEffect(() => {
    setSize({ width: width * scale, height: height * scale });
  }, [width, height, scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent, handle: ResizeHandle = null) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (handle) {
      setIsResizing(handle);
    } else {
      setIsDragging(true);
    }
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging && !isResizing) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    if (isDragging) {
      setPosition(prev => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
    } else if (isResizing) {
      setSize(prev => {
        let newWidth = prev.width;
        let newHeight = prev.height;
        let newX = position.x;
        let newY = position.y;
        
        // Handle horizontal resize
        if (isResizing.includes("e")) {
          newWidth = Math.max(50, prev.width + dx);
        } else if (isResizing.includes("w")) {
          const widthChange = Math.min(dx, prev.width - 50);
          newWidth = prev.width - widthChange;
          newX = position.x + widthChange;
        }
        
        // Handle vertical resize
        if (isResizing.includes("s")) {
          newHeight = Math.max(25, prev.height + dy);
        } else if (isResizing.includes("n")) {
          const heightChange = Math.min(dy, prev.height - 25);
          newHeight = prev.height - heightChange;
          newY = position.y + heightChange;
        }
        
        if (newX !== position.x || newY !== position.y) {
          setPosition({ x: newX, y: newY });
        }
        
        return { width: newWidth, height: newHeight };
      });
    }
    
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, isResizing, dragStart, position]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(null);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const getCursor = (handle: ResizeHandle): string => {
    switch (handle) {
      case "nw":
      case "se":
        return "nwse-resize";
      case "ne":
      case "sw":
        return "nesw-resize";
      case "n":
      case "s":
        return "ns-resize";
      case "e":
      case "w":
        return "ew-resize";
      default:
        return "move";
    }
  };

  return (
    <div
      ref={boxRef}
      className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-30"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={(e) => handleMouseDown(e)}
    >
      {/* Signature preview */}
      {signaturePreview && (
        <img
          src={signaturePreview}
          alt="Signature preview"
          className="w-full h-full object-contain pointer-events-none opacity-70"
          draggable={false}
        />
      )}
      
      {/* Placeholder text when no signature */}
      {!signaturePreview && (
        <div className="absolute inset-0 flex items-center justify-center text-blue-600 text-sm font-medium pointer-events-none">
          Signature here
        </div>
      )}

      {/* Resize handles */}
      {/* Corners */}
      <div
        className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-sm"
        style={{ cursor: getCursor("nw") }}
        onMouseDown={(e) => handleMouseDown(e, "nw")}
      />
      <div
        className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-sm"
        style={{ cursor: getCursor("ne") }}
        onMouseDown={(e) => handleMouseDown(e, "ne")}
      />
      <div
        className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-sm"
        style={{ cursor: getCursor("sw") }}
        onMouseDown={(e) => handleMouseDown(e, "sw")}
      />
      <div
        className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-sm"
        style={{ cursor: getCursor("se") }}
        onMouseDown={(e) => handleMouseDown(e, "se")}
      />
      
      {/* Edge handles */}
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-blue-500 rounded-sm"
        style={{ cursor: getCursor("n") }}
        onMouseDown={(e) => handleMouseDown(e, "n")}
      />
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-blue-500 rounded-sm"
        style={{ cursor: getCursor("s") }}
        onMouseDown={(e) => handleMouseDown(e, "s")}
      />
      <div
        className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-6 bg-blue-500 rounded-sm"
        style={{ cursor: getCursor("w") }}
        onMouseDown={(e) => handleMouseDown(e, "w")}
      />
      <div
        className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-6 bg-blue-500 rounded-sm"
        style={{ cursor: getCursor("e") }}
        onMouseDown={(e) => handleMouseDown(e, "e")}
      />
    </div>
  );
}
