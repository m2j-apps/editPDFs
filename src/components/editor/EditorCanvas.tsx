"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { Tool, EditorObject, ShapeType } from "@/app/editor/page";
import SignatureModal from "./SignatureModal";
import InlineTextEditor from "./InlineTextEditor";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfTextEdit {
  id: string;
  pageNumber: number;
  originalText: string;
  newText: string;
  x: number;
  y: number;
  originalX?: number; // Original position (for white background to cover)
  originalY?: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    highlightColor?: string; // Background highlight color
    color?: string;
  };
}

interface EditorCanvasProps {
  fileUrl: string;
  currentPage: number;
  totalPages: number;
  zoom: number;
  activeTool: Tool;
  objects: EditorObject[];
  selectedObjectId: string | null;
  onAddObject: (obj: Omit<EditorObject, "id">, keepTool?: boolean) => string;
  onUpdateObject: (id: string, updates: Partial<EditorObject>) => void;
  onDeleteObject: (id: string) => void;
  onSelectObject: (id: string | null) => void;
  onPageChange?: (page: number) => void;
  onPageDimensionsChange?: (width: number, height: number) => void;
  textOptions?: { fontSize: number; color: string };
  shapeOptions?: { shapeType: ShapeType; color: string; strokeWidth: number; fill?: boolean; fillColor?: string };
  highlightColor?: string;
  annotateColor?: string;
  pdfTextEdits?: PdfTextEdit[];
  onPdfTextEdit?: (edit: PdfTextEdit) => void;
  onPdfTextUpdate?: (editId: string, updates: Partial<PdfTextEdit>) => void;
  onPdfTextDelete?: (editId: string) => void;
  onSignatureCreated?: (dataUrl: string, isInitials: boolean) => void;
}

type ResizeHandle = "nw" | "ne" | "sw" | "se" | null;

export default function EditorCanvas({
  fileUrl,
  currentPage,
  totalPages,
  zoom,
  activeTool,
  objects,
  selectedObjectId,
  onAddObject,
  onUpdateObject,
  onDeleteObject,
  onSelectObject,
  onPageChange,
  onPageDimensionsChange,
  textOptions = { fontSize: 16, color: "#000000" },
  shapeOptions = { shapeType: "rectangle" as ShapeType, color: "#000000", strokeWidth: 2, fill: false, fillColor: "#ffffff" },
  highlightColor = "#ffff00",
  annotateColor = "#ff0000",
  pdfTextEdits = [],
  onPdfTextEdit,
  onPdfTextUpdate,
  onPdfTextDelete,
  onSignatureCreated,
}: EditorCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const [pageDimensions, setPageDimensions] = useState({ width: 612, height: 792 });
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureMode, setSignatureMode] = useState<"signature" | "initials">("signature");
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editingTextValue, setEditingTextValue] = useState("");
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<ResizeHandle>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, objX: 0, objY: 0 });
  
  // State for dragging PDF text edits (existing text that's been modified)
  const [selectedTextEditId, setSelectedTextEditId] = useState<string | null>(null);
  const [isDraggingTextEdit, setIsDraggingTextEdit] = useState(false);
  const [textEditDragStart, setTextEditDragStart] = useState({ x: 0, y: 0, editX: 0, editY: 0 });
  
  // Inline PDF text editing state
  const [editingPdfText, setEditingPdfText] = useState<{
    element: HTMLElement;
    text: string;
    x: number;
    y: number;
    originalX?: number; // Original position for whiteout (preserved when moving)
    originalY?: number;
    width: number;
    height: number;
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
    color: string;
    editId?: string; // If editing an existing edit or EditorObject
    formatting?: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
      highlightColor?: string;
    };
    isNewText?: boolean; // If true, this is new text being added (not editing existing PDF text)
    isEditorObject?: boolean; // If true, editId refers to an EditorObject (not PdfTextEdit)
  } | null>(null);
  const [hoveredTextElement, setHoveredTextElement] = useState<HTMLElement | null>(null);
  
  // Track text selection for annotations
  const [textSelection, setTextSelection] = useState<{
    text: string;
    rects: DOMRect[];
  } | null>(null);
  
  // Drawing state for shapes/annotations (click and drag to draw)
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [drawPreview, setDrawPreview] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    endX?: number; // For lines/arrows
    endY?: number;
  } | null>(null);
  // For freehand drawing - track all points
  const [freehandPoints, setFreehandPoints] = useState<{ x: number; y: number }[]>([]);

  const scale = zoom / 100;
  
  // Tools that support click-and-drag drawing
  const drawableTools = ["shape", "highlight", "strikeout", "underline", "whiteout", "freehand-highlight", "draw", "link"];

  // Check for text selection in PDF text layer
  const getTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return null;
    
    const range = selection.getRangeAt(0);
    const container = containerRef.current;
    if (!container) return null;
    
    // Check if selection is within our text layer
    const textLayer = container.querySelector(".react-pdf__Page__textContent");
    if (!textLayer || !textLayer.contains(range.commonAncestorContainer)) return null;
    
    const rects = Array.from(range.getClientRects());
    if (rects.length === 0) return null;
    
    const containerRect = container.getBoundingClientRect();
    
    return {
      text: selection.toString(),
      rects: rects.map(r => new DOMRect(
        (r.left - containerRect.left) / scale,
        (r.top - containerRect.top) / scale,
        r.width / scale,
        r.height / scale
      )),
    };
  }, [scale]);

  // Apply annotation to text selection
  const applyAnnotationToSelection = useCallback((type: "highlight" | "strikeout" | "underline") => {
    const sel = getTextSelection();
    if (!sel || sel.rects.length === 0) return false;
    
    // Create annotation objects for each rect (handles multi-line selections)
    sel.rects.forEach((rect) => {
      if (rect.width < 2) return; // Skip tiny rects
      
      // Calculate y position based on annotation type
      let yPos = rect.y;
      if (type === "underline") {
        yPos = rect.y + rect.height - 2; // At bottom of text
      } else if (type === "strikeout") {
        yPos = rect.y + rect.height / 2 - 1; // In middle of text
      }
      
      onAddObject({
        type: type,
        pageNumber: currentPage,
        x: rect.x,
        y: yPos,
        width: rect.width,
        height: type === "highlight" ? rect.height : 2,
        color: type === "highlight" ? highlightColor : annotateColor,
        opacity: type === "highlight" ? 0.4 : undefined,
      }, true);
    });
    
    // Clear selection after applying
    window.getSelection()?.removeAllRanges();
    return true;
  }, [getTextSelection, onAddObject, currentPage, highlightColor, annotateColor]);

  // Auto-apply annotation when tool changes (if text is selected)
  // This allows: select text → click toolbar button → annotation applies immediately
  const prevToolRef = useRef<Tool>(activeTool);
  useEffect(() => {
    const annotationTools = ["highlight", "strikeout", "underline"] as const;
    
    // Only trigger when tool changes TO an annotation tool
    if (annotationTools.includes(activeTool as typeof annotationTools[number]) && 
        prevToolRef.current !== activeTool) {
      // Small delay to let the toolbar dropdown close and preserve selection
      setTimeout(() => {
        applyAnnotationToSelection(activeTool as "highlight" | "strikeout" | "underline");
      }, 50);
    }
    
    prevToolRef.current = activeTool;
  }, [activeTool, applyAnnotationToSelection]);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    // If clicking on an object, select it (handled by object's own mousedown)
    if ((e.target as HTMLElement).closest(".editor-object")) {
      return;
    }
    
    // If clicking on a pdf-text-edit overlay, handle re-editing
    if ((e.target as HTMLElement).closest(".pdf-text-edit-overlay")) {
      return;
    }

    // Deselect current object and text edits
    onSelectObject(null);
    setSelectedTextEditId(null);

    // If we're editing text inline and click elsewhere, commit the text
    if (editingTextId) {
      if (editingTextValue.trim()) {
        onUpdateObject(editingTextId, { content: editingTextValue });
      } else {
        onDeleteObject(editingTextId);
      }
      setEditingTextId(null);
      setEditingTextValue("");
      return;
    }
    
    // For annotation tools, check if there's a text selection first
    if (["highlight", "strikeout", "underline"].includes(activeTool)) {
      if (applyAnnotationToSelection(activeTool as "highlight" | "strikeout" | "underline")) {
        return; // Applied to selection, don't create floating annotation
      }
      // No selection - fall through to draw annotation
    }

    // For drawable tools, start drawing mode
    if (drawableTools.includes(activeTool)) {
      setIsDrawing(true);
      setDrawStart({ x, y });
      setDrawPreview({ x, y, width: 0, height: 0, endX: x, endY: y });
      // Initialize freehand points
      if (activeTool === "draw" || activeTool === "freehand-highlight") {
        setFreehandPoints([{ x, y }]);
      }
      return;
    }

    // Handle instant-create tools (text, sign, symbols, stamp)
    switch (activeTool) {
      case "text": {
        // Open InlineTextEditor at click position for new text (with formatting toolbar)
        setEditingPdfText({
          element: null as unknown as HTMLElement, // No source element for new text
          text: "",
          x,
          y,
          width: 150,
          height: textOptions.fontSize * 1.5,
          fontSize: textOptions.fontSize,
          fontFamily: "sans-serif",
          fontWeight: "normal",
          color: textOptions.color,
          editId: undefined, // No editId = new text
          formatting: {
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
            highlightColor: undefined,
          },
          isNewText: true, // Flag to indicate this is new text (not PDF text edit)
        } as typeof editingPdfText & { isNewText?: boolean });
        break;
      }
        
      case "sign":
        setPendingPosition({ x, y });
        setSignatureMode("signature");
        setShowSignatureModal(true);
        break;
        
      case "initials":
        setPendingPosition({ x, y });
        setSignatureMode("initials");
        setShowSignatureModal(true);
        break;
        
      case "stamp":
        onAddObject({
          type: "stamp",
          pageNumber: currentPage,
          x,
          y,
          width: 120,
          height: 40,
          content: "DRAFT",
          color: "#ff0000",
        });
        break;
        
      case "symbol-x":
        onAddObject({
          type: "text",
          pageNumber: currentPage,
          x,
          y,
          width: 20,
          height: 20,
          content: "✗",
          fontSize: textOptions.fontSize,
          color: textOptions.color,
        });
        break;
        
      case "symbol-check":
        onAddObject({
          type: "text",
          pageNumber: currentPage,
          x,
          y,
          width: 20,
          height: 20,
          content: "✓",
          fontSize: textOptions.fontSize,
          color: textOptions.color,
        });
        break;
        
      case "symbol-bullet":
        onAddObject({
          type: "text",
          pageNumber: currentPage,
          x,
          y,
          width: 20,
          height: 20,
          content: "•",
          fontSize: textOptions.fontSize,
          color: textOptions.color,
        });
        break;
    }
  }, [activeTool, currentPage, onAddObject, onSelectObject, onUpdateObject, onDeleteObject, scale, textOptions, editingTextId, editingTextValue, drawableTools, applyAnnotationToSelection]);

  const handleObjectMouseDown = useCallback((e: React.MouseEvent, objId: string) => {
    e.stopPropagation();
    onSelectObject(objId);
    
    // Always allow dragging when clicking on an object (better UX)
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [onSelectObject]);

  const handleResizeStart = useCallback((e: React.MouseEvent, objId: string, handle: ResizeHandle) => {
    e.stopPropagation();
    e.preventDefault();
    const obj = objects.find(o => o.id === objId);
    if (!obj) return;
    
    setResizeHandle(handle);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: obj.width,
      height: obj.height,
      objX: obj.x,
      objY: obj.y,
    });
  }, [objects]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) / scale;
    const currentY = (e.clientY - rect.top) / scale;
    
    // Handle drawing preview
    if (isDrawing && drawStart) {
      const minX = Math.min(drawStart.x, currentX);
      const minY = Math.min(drawStart.y, currentY);
      const width = Math.abs(currentX - drawStart.x);
      const height = Math.abs(currentY - drawStart.y);
      
      setDrawPreview({
        x: minX,
        y: minY,
        width,
        height,
        endX: currentX,
        endY: currentY,
      });
      
      // For freehand tools, track all points
      if (activeTool === "draw" || activeTool === "freehand-highlight") {
        setFreehandPoints(prev => [...prev, { x: currentX, y: currentY }]);
      }
      return;
    }
    
    // Handle PDF text edit dragging
    if (isDraggingTextEdit && selectedTextEditId && onPdfTextUpdate) {
      const newX = textEditDragStart.editX + (e.clientX - textEditDragStart.x) / scale;
      const newY = textEditDragStart.editY + (e.clientY - textEditDragStart.y) / scale;
      
      onPdfTextUpdate(selectedTextEditId, { x: newX, y: newY });
      return;
    }
    
    // Handle object dragging
    if (isDragging && selectedObjectId) {
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
    } else if (resizeHandle && selectedObjectId) {
      const dx = (e.clientX - resizeStart.x) / scale;
      const dy = (e.clientY - resizeStart.y) / scale;
      
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = resizeStart.objX;
      let newY = resizeStart.objY;
      
      switch (resizeHandle) {
        case "se":
          newWidth = Math.max(30, resizeStart.width + dx);
          newHeight = Math.max(20, resizeStart.height + dy);
          break;
        case "sw":
          newWidth = Math.max(30, resizeStart.width - dx);
          newHeight = Math.max(20, resizeStart.height + dy);
          newX = resizeStart.objX + (resizeStart.width - newWidth);
          break;
        case "ne":
          newWidth = Math.max(30, resizeStart.width + dx);
          newHeight = Math.max(20, resizeStart.height - dy);
          newY = resizeStart.objY + (resizeStart.height - newHeight);
          break;
        case "nw":
          newWidth = Math.max(30, resizeStart.width - dx);
          newHeight = Math.max(20, resizeStart.height - dy);
          newX = resizeStart.objX + (resizeStart.width - newWidth);
          newY = resizeStart.objY + (resizeStart.height - newHeight);
          break;
      }
      
      onUpdateObject(selectedObjectId, {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    }
  }, [isDrawing, drawStart, isDragging, isDraggingTextEdit, selectedTextEditId, textEditDragStart, onPdfTextUpdate, resizeHandle, selectedObjectId, objects, onUpdateObject, scale, dragStart, resizeStart, activeTool]);

  // Finalize drawing when mouse is released
  const handleMouseUp = useCallback(() => {
    // Finalize drawn shape
    if (isDrawing && drawStart && drawPreview) {
      const { x, y, width, height, endX, endY } = drawPreview;
      
      // Only create if dragged a minimum distance (not just a click)
      const minSize = 5;
      const hasMoved = width >= minSize || height >= minSize || freehandPoints.length > 3;
      
      if (hasMoved) {
        switch (activeTool) {
          case "shape":
            // For lines/arrows, store actual start and end points for direction
            if (shapeOptions.shapeType === "line" || shapeOptions.shapeType === "arrow") {
              onAddObject({
                type: "shape",
                pageNumber: currentPage,
                x: drawStart.x,
                y: drawStart.y,
                width: Math.abs((endX || drawStart.x) - drawStart.x) || 1,
                height: Math.abs((endY || drawStart.y) - drawStart.y) || 1,
                endX: endX || drawStart.x,
                endY: endY || drawStart.y,
                shapeType: shapeOptions.shapeType,
                color: shapeOptions.color,
                strokeWidth: shapeOptions.strokeWidth,
              }, true);
            } else {
              onAddObject({
                type: "shape",
                pageNumber: currentPage,
                x,
                y,
                width: Math.max(width, 20),
                height: Math.max(height, 20),
                shapeType: shapeOptions.shapeType,
                color: shapeOptions.color,
                strokeWidth: shapeOptions.strokeWidth,
                fill: shapeOptions.fill,
                fillColor: shapeOptions.fillColor,
              }, true);
            }
            break;
          
          case "draw":
            // Freehand drawing - store all points
            if (freehandPoints.length > 1) {
              const minPtX = Math.min(...freehandPoints.map(p => p.x));
              const maxPtX = Math.max(...freehandPoints.map(p => p.x));
              const minPtY = Math.min(...freehandPoints.map(p => p.y));
              const maxPtY = Math.max(...freehandPoints.map(p => p.y));
              onAddObject({
                type: "drawing",
                pageNumber: currentPage,
                x: minPtX,
                y: minPtY,
                width: maxPtX - minPtX || 1,
                height: maxPtY - minPtY || 1,
                points: freehandPoints,
                color: annotateColor,
                strokeWidth: shapeOptions.strokeWidth || 2,
              }, true);
            }
            break;
            
          case "freehand-highlight":
            // Freehand highlight - store path for non-rectangular highlight
            if (freehandPoints.length > 1) {
              const minPtX = Math.min(...freehandPoints.map(p => p.x));
              const maxPtX = Math.max(...freehandPoints.map(p => p.x));
              const minPtY = Math.min(...freehandPoints.map(p => p.y));
              const maxPtY = Math.max(...freehandPoints.map(p => p.y));
              onAddObject({
                type: "highlight",
                pageNumber: currentPage,
                x: minPtX,
                y: minPtY,
                width: maxPtX - minPtX || 1,
                height: maxPtY - minPtY || 1,
                points: freehandPoints,
                color: highlightColor,
                opacity: 0.4,
              }, true);
            }
            break;
            
          case "highlight":
            onAddObject({
              type: "highlight",
              pageNumber: currentPage,
              x,
              y,
              width: Math.max(width, 20),
              height: Math.max(height, 10),
              color: highlightColor,
              opacity: 0.4,
            }, true);
            break;
            
          case "strikeout":
            onAddObject({
              type: "strikeout",
              pageNumber: currentPage,
              x,
              y: y + height / 2,
              width: Math.max(width, 20),
              height: 4,
              color: annotateColor,
            }, true);
            break;
            
          case "underline":
            onAddObject({
              type: "underline",
              pageNumber: currentPage,
              x,
              y: y + height,
              width: Math.max(width, 20),
              height: 4,
              color: annotateColor,
            }, true);
            break;
            
          case "whiteout":
            onAddObject({
              type: "whiteout",
              pageNumber: currentPage,
              x,
              y,
              width: Math.max(width, 20),
              height: Math.max(height, 10),
              color: "#ffffff",
            }, true);
            break;
            
          case "link":
            onAddObject({
              type: "link",
              pageNumber: currentPage,
              x,
              y,
              width: Math.max(width, 40),
              height: Math.max(height, 20),
              color: "#3b82f6",
            }, true);
            break;
        }
      }
      
      // Reset drawing state
      setIsDrawing(false);
      setDrawStart(null);
      setDrawPreview(null);
      setFreehandPoints([]);
    }
    
    // Reset other states
    setIsDragging(false);
    setResizeHandle(null);
    setIsDraggingTextEdit(false);
  }, [isDrawing, drawStart, drawPreview, freehandPoints, activeTool, currentPage, onAddObject, shapeOptions, highlightColor, annotateColor]);

  const handleSignatureCreate = useCallback((signatureDataUrl: string) => {
    const isInitials = signatureMode === "initials";
    
    if (pendingPosition) {
      onAddObject({
        type: "signature",
        pageNumber: currentPage,
        x: pendingPosition.x,
        y: pendingPosition.y,
        width: isInitials ? 100 : 200,
        height: isInitials ? 50 : 75,
        src: signatureDataUrl,
      });
    }
    
    // Save the signature/initials for reuse
    onSignatureCreated?.(signatureDataUrl, isInitials);
    
    setShowSignatureModal(false);
    setPendingPosition(null);
  }, [pendingPosition, currentPage, onAddObject, signatureMode, onSignatureCreated]);

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

  // Delete selected object on Delete key (but not when editing text)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't delete if we're editing text inline or editing PDF text
      if (editingTextId || editingPdfText) return;
      
      if (e.key === "Delete" && selectedObjectId) {
        onDeleteObject(selectedObjectId);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjectId, onDeleteObject, editingTextId, editingPdfText]);

  // Track when text layer is ready
  const [textLayerReady, setTextLayerReady] = useState(false);

  // Set up text layer interaction for inline editing using event delegation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let textLayer: Element | null = null;

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "SPAN" && target.textContent?.trim() && target.closest(".react-pdf__Page__textContent")) {
        target.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
        target.style.outline = "2px dashed rgba(59, 130, 246, 0.7)";
        target.style.outlineOffset = "2px";
        target.style.cursor = "text";
        target.style.borderRadius = "3px";
        setHoveredTextElement(target);
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "SPAN" && target.closest(".react-pdf__Page__textContent")) {
        target.style.backgroundColor = "";
        target.style.outline = "";
        target.style.outlineOffset = "";
        target.style.cursor = "";
        target.style.borderRadius = "";
        setHoveredTextElement(null);
      }
    };

    // Single click on original PDF text: create a moveable text edit (same text, but now draggable)
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "SPAN" && target.textContent?.trim() && target.closest(".react-pdf__Page__textContent")) {
        e.preventDefault();
        e.stopPropagation();
        
        const rect = target.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Get computed styles
        const computedStyle = window.getComputedStyle(target);
        const fontSize = parseFloat(computedStyle.fontSize) / scale;
        const fontFamily = computedStyle.fontFamily;
        const fontWeight = computedStyle.fontWeight;
        const color = target.getAttribute("data-font-color") || "#000000";
        
        const textX = (rect.left - containerRect.left) / scale;
        const textY = (rect.top - containerRect.top) / scale;
        const textWidth = rect.width / scale;
        const textHeight = rect.height / scale;
        const text = target.textContent || "";
        
        // Create a text edit (makes text moveable) and select it
        if (onPdfTextEdit) {
          const editId = `pdf-text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          onPdfTextEdit({
            id: editId,
            pageNumber: currentPage,
            originalText: text,
            newText: text, // Same text, just making it moveable
            x: textX,
            y: textY,
            originalX: textX, // Store original position for white background
            originalY: textY,
            width: textWidth,
            height: textHeight,
            fontSize,
            fontFamily,
            formatting: {
              bold: fontWeight === "bold" || parseInt(fontWeight) >= 700,
              color,
            },
          });
          
          // Select the new edit for immediate dragging
          setSelectedTextEditId(editId);
          
          // Hide original text (now covered by the edit overlay)
          target.style.visibility = "hidden";
        }
      }
    };
    
    // Double-click: open inline editor for text editing
    const handleDoubleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "SPAN" && target.textContent?.trim() && target.closest(".react-pdf__Page__textContent")) {
        e.preventDefault();
        e.stopPropagation();
        
        const rect = target.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const computedStyle = window.getComputedStyle(target);
        const fontSize = parseFloat(computedStyle.fontSize) / scale;
        const fontFamily = computedStyle.fontFamily;
        const fontWeight = computedStyle.fontWeight;
        const color = target.getAttribute("data-font-color") || "#000000";
        
        setEditingPdfText({
          element: target,
          text: target.textContent || "",
          x: (rect.left - containerRect.left) / scale,
          y: (rect.top - containerRect.top) / scale,
          width: rect.width / scale,
          height: rect.height / scale,
          fontSize: fontSize,
          fontFamily: fontFamily,
          fontWeight: fontWeight,
          color: color,
        });
        
        target.style.visibility = "hidden";
      }
    };

    const setupListeners = () => {
      textLayer = container.querySelector(".react-pdf__Page__textContent");
      if (!textLayer) return false;
      
      // Use event delegation on the text layer container
      textLayer.addEventListener("mouseover", handleMouseOver);
      textLayer.addEventListener("mouseout", handleMouseOut);
      textLayer.addEventListener("click", handleClick, true);
      textLayer.addEventListener("dblclick", handleDoubleClick, true);
      
      // Enable pointer events only when NOT using drawing tools
      // Drawing tools need mouse events to pass through to the canvas
      const drawingTools = ["draw", "freehand-highlight", "shape", "highlight", "strikeout", "underline", "whiteout", "link"];
      (textLayer as HTMLElement).style.pointerEvents = drawingTools.includes(activeTool) ? "none" : "auto";
      
      setTextLayerReady(true);
      return true;
    };

    // Try to set up immediately
    if (setupListeners()) {
      return () => {
        if (textLayer) {
          textLayer.removeEventListener("mouseover", handleMouseOver);
          textLayer.removeEventListener("mouseout", handleMouseOut);
          textLayer.removeEventListener("click", handleClick, true);
          textLayer.removeEventListener("dblclick", handleDoubleClick, true);
        }
      };
    }

    // If text layer not ready, use MutationObserver to wait for it
    const observer = new MutationObserver(() => {
      if (setupListeners()) {
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (textLayer) {
        textLayer.removeEventListener("mouseover", handleMouseOver);
        textLayer.removeEventListener("mouseout", handleMouseOut);
        textLayer.removeEventListener("click", handleClick, true);
        textLayer.removeEventListener("dblclick", handleDoubleClick, true);
      }
    };
  }, [currentPage, scale, onPdfTextEdit]);

  // Update text layer pointer events based on active tool
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const textLayer = container.querySelector(".react-pdf__Page__textContent") as HTMLElement;
    if (!textLayer) return;
    
    // Disable pointer events on text layer when using drawing tools
    const drawingTools = ["draw", "freehand-highlight", "shape", "highlight", "strikeout", "underline", "whiteout", "link"];
    textLayer.style.pointerEvents = drawingTools.includes(activeTool) ? "none" : "auto";
  }, [activeTool]);

  // Mouse wheel page navigation
  useEffect(() => {
    const container = containerRef.current?.parentElement; // The scrollable container
    if (!container || !onPageChange) return;

    let wheelTimeout: NodeJS.Timeout | null = null;
    
    const handleWheel = (e: WheelEvent) => {
      // Only trigger page change if at scroll boundaries
      const atTop = container.scrollTop <= 0;
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      
      // Debounce to prevent rapid page changes
      if (wheelTimeout) return;
      
      if (e.deltaY > 0 && atBottom && currentPage < totalPages) {
        // Scrolling down at bottom - go to next page
        e.preventDefault();
        onPageChange(currentPage + 1);
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 300);
      } else if (e.deltaY < 0 && atTop && currentPage > 1) {
        // Scrolling up at top - go to previous page
        e.preventDefault();
        onPageChange(currentPage - 1);
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 300);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentPage, totalPages, onPageChange]);

  // Handle saving inline PDF text edit
  const handlePdfTextSave = useCallback((newText: string, formatting?: { bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean; highlightColor?: string; fontSize?: number; color?: string }) => {
    if (!editingPdfText) {
      setEditingPdfText(null);
      return;
    }
    
    // If this is new text being added (via text tool), create an EditorObject
    if (editingPdfText.isNewText) {
      if (newText.trim()) {
        onAddObject({
          type: "text",
          pageNumber: currentPage,
          x: editingPdfText.x,
          y: editingPdfText.y,
          width: Math.max(newText.length * (formatting?.fontSize || editingPdfText.fontSize) * 0.6, 50),
          height: (formatting?.fontSize || editingPdfText.fontSize) * 1.5,
          content: newText,
          fontSize: formatting?.fontSize || editingPdfText.fontSize,
          color: formatting?.color || editingPdfText.color,
          formatting: {
            bold: formatting?.bold,
            italic: formatting?.italic,
            underline: formatting?.underline,
            strikethrough: formatting?.strikethrough,
            highlightColor: formatting?.highlightColor,
          },
        }, true); // keepTool=true to stay in text mode
      }
      setEditingPdfText(null);
      return;
    }
    
    // If editing an existing EditorObject (text object), update it
    if (editingPdfText.isEditorObject && editingPdfText.editId) {
      if (newText.trim()) {
        onUpdateObject(editingPdfText.editId, {
          content: newText,
          width: Math.max(newText.length * (formatting?.fontSize || editingPdfText.fontSize) * 0.6, 50),
          fontSize: formatting?.fontSize || editingPdfText.fontSize,
          color: formatting?.color || editingPdfText.color,
          formatting: {
            bold: formatting?.bold,
            italic: formatting?.italic,
            underline: formatting?.underline,
            strikethrough: formatting?.strikethrough,
            highlightColor: formatting?.highlightColor,
          },
        });
      } else {
        // Empty text - delete the object
        onDeleteObject(editingPdfText.editId);
      }
      setEditingPdfText(null);
      return;
    }
    
    // Otherwise, this is editing existing PDF text - create/update a PdfTextEdit
    if (onPdfTextEdit) {
      // Create new/updated edit (handlePdfTextEdit will replace if ID exists)
      const editId = editingPdfText.editId || `pdf-text-${Date.now()}`;
      onPdfTextEdit({
        id: editId,
        pageNumber: currentPage,
        originalText: editingPdfText.text,
        newText,
        x: editingPdfText.x,
        y: editingPdfText.y,
        originalX: editingPdfText.originalX ?? editingPdfText.x, // Preserve or set original position for whiteout
        originalY: editingPdfText.originalY ?? editingPdfText.y,
        width: editingPdfText.width,
        height: editingPdfText.height,
        fontSize: formatting?.fontSize || editingPdfText.fontSize,
        fontFamily: editingPdfText.fontFamily,
        formatting,
      });
    }
    setEditingPdfText(null);
  }, [editingPdfText, onPdfTextEdit, onPdfTextDelete, onAddObject, onUpdateObject, onDeleteObject, currentPage]);

  const handlePdfTextCancel = useCallback(() => {
    if (editingPdfText) {
      // Only restore visibility if we were editing original PDF text (not new text or existing edit)
      if (!editingPdfText.editId && !editingPdfText.isNewText && editingPdfText.element) {
        editingPdfText.element.style.visibility = "visible";
      }
    }
    setEditingPdfText(null);
  }, [editingPdfText]);

  const handlePdfTextDelete = useCallback(() => {
    if (editingPdfText) {
      // For new text, just close the editor (nothing to delete)
      if (editingPdfText.isNewText) {
        setEditingPdfText(null);
        return;
      }
      
      // For EditorObjects, delete the object
      if (editingPdfText.isEditorObject && editingPdfText.editId) {
        onDeleteObject(editingPdfText.editId);
        setEditingPdfText(null);
        return;
      }
      
      if (editingPdfText.editId && onPdfTextDelete) {
        // If editing an existing edit, just delete it (restores original)
        onPdfTextDelete(editingPdfText.editId);
      } else if (onPdfTextEdit) {
        // If editing original PDF text, create an edit that replaces with empty (whiteout)
        const editId = `pdf-text-${Date.now()}`;
        onPdfTextEdit({
          id: editId,
          pageNumber: currentPage,
          originalText: editingPdfText.text,
          newText: "",
          x: editingPdfText.x,
          y: editingPdfText.y,
          width: editingPdfText.width,
          height: editingPdfText.height,
          fontSize: editingPdfText.fontSize,
          fontFamily: editingPdfText.fontFamily,
        });
      }
    }
    setEditingPdfText(null);
  }, [editingPdfText, onPdfTextEdit, onPdfTextDelete, currentPage]);

  const getCursor = () => {
    switch (activeTool) {
      case "text":
      case "symbol-x":
      case "symbol-check":
      case "symbol-bullet":
        return "text";
      case "sign":
      case "initials":
      case "whiteout":
      case "shape":
      case "highlight":
      case "link":
      case "stamp":
      case "strikeout":
      case "underline":
      case "freehand-highlight":
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
        className="relative bg-white shadow-lg select-none"
        style={{ 
          cursor: getCursor(),
          width: pageDimensions.width * scale,
          height: pageDimensions.height * scale,
        }}
        onMouseDown={handleCanvasMouseDown}
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
              onPageDimensionsChange?.(page.originalWidth, page.originalHeight);
            }}
            renderTextLayer={true}
            renderAnnotationLayer={false}
          />
        </Document>
        
        {/* PDF Text Edits Overlay - rendered on top of the PDF text layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          {pdfTextEdits.filter(e => e.pageNumber === currentPage).map((edit) => {
            const isSelected = selectedTextEditId === edit.id;
            return (
              <div key={edit.id} className="pdf-text-edit-overlay">
                {/* White background to cover ORIGINAL text position */}
                <div
                  className="absolute bg-white"
                  style={{
                    left: ((edit.originalX ?? edit.x) - 2) * scale,
                    top: ((edit.originalY ?? edit.y) - 2) * scale,
                    width: (edit.width + 8) * scale,
                    height: (edit.height + 6) * scale,
                    zIndex: 5, // Ensure it's above the text layer
                  }}
                />
                {/* New text - clickable for re-editing, draggable for moving */}
                {edit.newText && (
                  <div
                    className={`absolute whitespace-nowrap pointer-events-auto ${
                      isSelected 
                        ? "ring-2 ring-blue-500 cursor-move" 
                        : "cursor-move hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-dashed"
                    }`}
                    style={{
                      left: edit.x * scale,
                      top: edit.y * scale,
                      fontSize: edit.fontSize * scale,
                      fontFamily: edit.fontFamily,
                      color: edit.formatting?.color || "#000000",
                      fontWeight: edit.formatting?.bold ? "bold" : "normal",
                      fontStyle: edit.formatting?.italic ? "italic" : "normal",
                      textDecoration: [
                        edit.formatting?.underline ? "underline" : "",
                        edit.formatting?.strikethrough ? "line-through" : "",
                      ].filter(Boolean).join(" ") || "none",
                      padding: "2px",
                      margin: "-2px",
                      borderRadius: "2px",
                      backgroundColor: edit.formatting?.highlightColor || (isSelected ? "rgba(59, 130, 246, 0.1)" : "white"),
                      zIndex: 6, // Above the white background (zIndex: 5)
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent text selection
                      // Select this text edit and prepare for dragging
                      setSelectedTextEditId(edit.id);
                      onSelectObject(null); // Deselect any regular object
                      setIsDraggingTextEdit(true);
                      setTextEditDragStart({
                        x: e.clientX,
                        y: e.clientY,
                        editX: edit.x,
                        editY: edit.y,
                      });
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      // Double-click to edit text
                      setSelectedTextEditId(null);
                      setEditingPdfText({
                        element: e.currentTarget as HTMLElement,
                        text: edit.newText,
                        x: edit.x,
                        y: edit.y,
                        originalX: edit.originalX, // Preserve original position for whiteout
                        originalY: edit.originalY,
                        width: edit.width,
                        height: edit.height,
                        fontSize: edit.fontSize,
                        fontFamily: edit.fontFamily,
                        fontWeight: edit.formatting?.bold ? "bold" : "normal",
                        color: edit.formatting?.color || "#000000",
                        editId: edit.id,
                        formatting: edit.formatting,
                      });
                    }}
                  >
                    {edit.newText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Inline PDF Text Editor - Sejda-style contenteditable overlay */}
        {editingPdfText && (
          <InlineTextEditor
            key={editingPdfText.editId || `new-${editingPdfText.x}-${editingPdfText.y}`}
            text={editingPdfText.text}
            x={editingPdfText.x}
            y={editingPdfText.y}
            width={editingPdfText.width}
            height={editingPdfText.height}
            fontSize={editingPdfText.fontSize}
            fontFamily={editingPdfText.fontFamily}
            fontWeight={editingPdfText.fontWeight}
            color={editingPdfText.color}
            scale={scale}
            initialFormatting={editingPdfText.formatting}
            onSave={handlePdfTextSave}
            onCancel={handlePdfTextCancel}
            onDelete={handlePdfTextDelete}
          />
        )}
        
        {/* Drawing Preview Layer - shows shape being drawn */}
        {isDrawing && drawPreview && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
            {/* Shape preview */}
            {activeTool === "shape" && shapeOptions.shapeType === "rectangle" && (
              <div
                className="absolute border-2 border-dashed"
                style={{
                  left: drawPreview.x * scale,
                  top: drawPreview.y * scale,
                  width: drawPreview.width * scale,
                  height: drawPreview.height * scale,
                  borderColor: shapeOptions.color,
                  backgroundColor: shapeOptions.fill ? `${shapeOptions.fillColor}40` : "transparent",
                }}
              />
            )}
            {activeTool === "shape" && shapeOptions.shapeType === "circle" && (
              <div
                className="absolute border-2 border-dashed rounded-full"
                style={{
                  left: drawPreview.x * scale,
                  top: drawPreview.y * scale,
                  width: drawPreview.width * scale,
                  height: drawPreview.height * scale,
                  borderColor: shapeOptions.color,
                  backgroundColor: shapeOptions.fill ? `${shapeOptions.fillColor}40` : "transparent",
                }}
              />
            )}
            {activeTool === "shape" && (shapeOptions.shapeType === "line" || shapeOptions.shapeType === "arrow") && drawStart && (
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                  {shapeOptions.shapeType === "arrow" && (
                    <marker
                      id="preview-arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill={shapeOptions.color} />
                    </marker>
                  )}
                </defs>
                <line
                  x1={drawStart.x * scale}
                  y1={drawStart.y * scale}
                  x2={(drawPreview.endX || drawPreview.x + drawPreview.width) * scale}
                  y2={(drawPreview.endY || drawPreview.y + drawPreview.height) * scale}
                  stroke={shapeOptions.color}
                  strokeWidth={shapeOptions.strokeWidth}
                  strokeDasharray="5,5"
                  markerEnd={shapeOptions.shapeType === "arrow" ? "url(#preview-arrowhead)" : undefined}
                />
              </svg>
            )}
            {/* Highlight preview - box only for regular highlight, not freehand */}
            {activeTool === "highlight" && (
              <div
                className="absolute"
                style={{
                  left: drawPreview.x * scale,
                  top: drawPreview.y * scale,
                  width: drawPreview.width * scale,
                  height: drawPreview.height * scale,
                  backgroundColor: highlightColor,
                  opacity: 0.4,
                }}
              />
            )}
            {/* Whiteout preview */}
            {activeTool === "whiteout" && (
              <div
                className="absolute bg-white border border-gray-300"
                style={{
                  left: drawPreview.x * scale,
                  top: drawPreview.y * scale,
                  width: drawPreview.width * scale,
                  height: drawPreview.height * scale,
                }}
              />
            )}
            {/* Strikeout preview */}
            {activeTool === "strikeout" && (
              <div
                className="absolute"
                style={{
                  left: drawPreview.x * scale,
                  top: (drawPreview.y + drawPreview.height / 2) * scale,
                  width: drawPreview.width * scale,
                  height: 2,
                  backgroundColor: annotateColor,
                }}
              />
            )}
            {/* Underline preview */}
            {activeTool === "underline" && (
              <div
                className="absolute"
                style={{
                  left: drawPreview.x * scale,
                  top: (drawPreview.y + drawPreview.height) * scale,
                  width: drawPreview.width * scale,
                  height: 2,
                  backgroundColor: annotateColor,
                }}
              />
            )}
            {/* Link preview */}
            {activeTool === "link" && (
              <div
                className="absolute border-2 border-dashed border-blue-400 bg-blue-50/30"
                style={{
                  left: drawPreview.x * scale,
                  top: drawPreview.y * scale,
                  width: drawPreview.width * scale,
                  height: drawPreview.height * scale,
                }}
              />
            )}
            {/* Freehand drawing preview */}
            {activeTool === "draw" && freehandPoints.length > 1 && (
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                <polyline
                  points={freehandPoints.map(p => `${p.x * scale},${p.y * scale}`).join(' ')}
                  fill="none"
                  stroke={annotateColor}
                  strokeWidth={shapeOptions.strokeWidth || 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {/* Freehand highlight preview */}
            {activeTool === "freehand-highlight" && freehandPoints.length > 1 && (
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                <polyline
                  points={freehandPoints.map(p => `${p.x * scale},${p.y * scale}`).join(' ')}
                  fill="none"
                  stroke={highlightColor}
                  strokeWidth={16 * scale}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.4}
                />
              </svg>
            )}
          </div>
        )}
        
        {/* Editor Objects Layer - highest z-index so objects can be selected */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
          {objects.filter(obj => obj.pageNumber === currentPage).map((obj) => {
            // Don't show ring on line/arrow shapes (use resize handles only)
            const isLineOrArrow = obj.type === "shape" && (obj.shapeType === "line" || obj.shapeType === "arrow");
            const showRing = selectedObjectId === obj.id && !isLineOrArrow;
            
            return (
            <div
              key={obj.id}
              className={`editor-object absolute pointer-events-auto ${
                showRing ? "ring-2 ring-blue-500" : ""
              }`}
              style={{
                left: obj.x * scale,
                top: obj.y * scale,
                width: Math.max(obj.width * scale, isLineOrArrow ? 1 : 0),
                height: Math.max(obj.height * scale, isLineOrArrow ? 1 : 0),
                cursor: "move",
                zIndex: selectedObjectId === obj.id ? 100 : 1,
                // For lines/arrows, expand the hit area
                ...(isLineOrArrow ? { overflow: 'visible' } : {}),
              }}
              onMouseDown={(e) => handleObjectMouseDown(e, obj.id)}
            >
              {/* Render based on object type */}
              {obj.type === "text" && (
                // Hide if we're editing this object with InlineTextEditor
                (editingPdfText?.isEditorObject && editingPdfText?.editId === obj.id) ? null :
                editingTextId === obj.id ? (
                  <input
                    ref={textInputRef}
                    type="text"
                    value={editingTextValue}
                    onChange={(e) => setEditingTextValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (editingTextValue.trim()) {
                          onUpdateObject(obj.id, { content: editingTextValue, width: editingTextValue.length * (obj.fontSize || 16) * 0.6 });
                        } else {
                          onDeleteObject(obj.id);
                        }
                        setEditingTextId(null);
                        setEditingTextValue("");
                      } else if (e.key === "Escape") {
                        onDeleteObject(obj.id);
                        setEditingTextId(null);
                        setEditingTextValue("");
                      }
                    }}
                    className="bg-transparent border-none outline-none w-full"
                    style={{
                      fontSize: (obj.fontSize || 16) * scale,
                      color: obj.color || "#000000",
                      fontFamily: "inherit",
                    }}
                    autoFocus
                  />
                ) : (
                  <div
                    style={{
                      fontSize: (obj.fontSize || 16) * scale,
                      color: obj.color || "#000000",
                      whiteSpace: "nowrap",
                      fontWeight: obj.formatting?.bold ? "bold" : "normal",
                      fontStyle: obj.formatting?.italic ? "italic" : "normal",
                      textDecoration: [
                        obj.formatting?.underline ? "underline" : "",
                        obj.formatting?.strikethrough ? "line-through" : "",
                      ].filter(Boolean).join(" ") || "none",
                      backgroundColor: obj.formatting?.highlightColor || "transparent",
                      padding: obj.formatting?.highlightColor ? "2px 4px" : undefined,
                      borderRadius: obj.formatting?.highlightColor ? "2px" : undefined,
                    }}
                    onDoubleClick={() => {
                      // Open InlineTextEditor for rich formatting
                      setEditingPdfText({
                        element: null as unknown as HTMLElement,
                        text: obj.content || "",
                        x: obj.x,
                        y: obj.y,
                        width: obj.width,
                        height: obj.height,
                        fontSize: obj.fontSize || 16,
                        fontFamily: obj.fontFamily || "sans-serif",
                        fontWeight: obj.formatting?.bold ? "bold" : "normal",
                        color: obj.color || "#000000",
                        editId: obj.id, // Use object ID so save updates this object
                        formatting: obj.formatting,
                        isNewText: false,
                        isEditorObject: true, // Flag to indicate this is an EditorObject (not PDF text)
                      } as typeof editingPdfText & { isEditorObject?: boolean });
                      onSelectObject(null); // Deselect while editing
                    }}
                  >
                    {obj.content || " "}
                  </div>
                )
              )}
              
              {obj.type === "whiteout" && (
                <div className="w-full h-full bg-white" />
              )}
              
              {obj.type === "highlight" && !obj.points && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: obj.color || "#ffff00",
                    opacity: obj.opacity || 0.4,
                  }}
                />
              )}
              
              {/* Freehand highlight */}
              {obj.type === "highlight" && obj.points && obj.points.length > 1 && (
                <svg className="absolute overflow-visible" style={{ left: 0, top: 0, width: '100%', height: '100%' }}>
                  <polyline
                    points={obj.points.map(p => `${(p.x - obj.x) * scale},${(p.y - obj.y) * scale}`).join(' ')}
                    fill="none"
                    stroke={obj.color || "#ffff00"}
                    strokeWidth={16 * scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={obj.opacity || 0.4}
                  />
                </svg>
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
                    backgroundColor: obj.fill ? (obj.fillColor || "#ffffff") : "transparent",
                  }}
                />
              )}
              
              {obj.type === "shape" && obj.shapeType === "circle" && (
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    border: `${obj.strokeWidth || 2}px solid ${obj.color || "#000000"}`,
                    backgroundColor: obj.fill ? (obj.fillColor || "#ffffff") : "transparent",
                  }}
                />
              )}
              
              {obj.type === "shape" && obj.shapeType === "line" && (
                <svg className="absolute overflow-visible" style={{ left: 0, top: 0, width: '100%', height: '100%' }}>
                  <line
                    x1={0}
                    y1={0}
                    x2={obj.endX !== undefined ? (obj.endX - obj.x) * scale : obj.width * scale}
                    y2={obj.endY !== undefined ? (obj.endY - obj.y) * scale : 0}
                    stroke={obj.color || "#000000"}
                    strokeWidth={obj.strokeWidth || 2}
                  />
                </svg>
              )}
              
              {obj.type === "shape" && obj.shapeType === "arrow" && (
                <svg className="absolute overflow-visible" style={{ left: 0, top: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <marker
                      id={`arrowhead-${obj.id}`}
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill={obj.color || "#000000"}
                      />
                    </marker>
                  </defs>
                  <line
                    x1={0}
                    y1={0}
                    x2={obj.endX !== undefined ? (obj.endX - obj.x) * scale : obj.width * scale}
                    y2={obj.endY !== undefined ? (obj.endY - obj.y) * scale : 0}
                    stroke={obj.color || "#000000"}
                    strokeWidth={obj.strokeWidth || 2}
                    markerEnd={`url(#arrowhead-${obj.id})`}
                  />
                </svg>
              )}
              
              {/* Freehand drawing */}
              {obj.type === "drawing" && obj.points && obj.points.length > 1 && (
                <svg className="absolute overflow-visible" style={{ left: 0, top: 0, width: '100%', height: '100%' }}>
                  <polyline
                    points={obj.points.map(p => `${(p.x - obj.x) * scale},${(p.y - obj.y) * scale}`).join(' ')}
                    fill="none"
                    stroke={obj.color || "#ff0000"}
                    strokeWidth={obj.strokeWidth || 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              
              {obj.type === "link" && (
                <div
                  className="w-full h-full border-2 border-dashed border-blue-400 bg-blue-50/30 flex items-center justify-center"
                >
                  <span className="text-blue-500 text-xs">🔗 Link</span>
                </div>
              )}
              
              {obj.type === "stamp" && (
                <div
                  className="w-full h-full border-2 rounded flex items-center justify-center font-bold"
                  style={{ 
                    borderColor: obj.color || "#ff0000",
                    color: obj.color || "#ff0000",
                    fontSize: Math.min(obj.width, obj.height) * 0.4,
                  }}
                >
                  {obj.content || "STAMP"}
                </div>
              )}
              
              {obj.type === "strikeout" && (
                <div 
                  className="w-full" 
                  style={{ 
                    height: obj.height * scale || 2, 
                    backgroundColor: obj.color || "#ff0000" 
                  }} 
                />
              )}
              
              {obj.type === "underline" && (
                <div 
                  className="w-full" 
                  style={{ 
                    height: obj.height * scale || 2, 
                    backgroundColor: obj.color || "#ff0000" 
                  }} 
                />
              )}
              
              {/* Resize handles for selected object */}
              {selectedObjectId === obj.id && !isLineOrArrow && (
                <>
                  <div 
                    className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-sm cursor-nwse-resize"
                    onMouseDown={(e) => handleResizeStart(e, obj.id, "nw")}
                  />
                  <div 
                    className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-sm cursor-nesw-resize"
                    onMouseDown={(e) => handleResizeStart(e, obj.id, "ne")}
                  />
                  <div 
                    className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-sm cursor-nesw-resize"
                    onMouseDown={(e) => handleResizeStart(e, obj.id, "sw")}
                  />
                  <div 
                    className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-sm cursor-nwse-resize"
                    onMouseDown={(e) => handleResizeStart(e, obj.id, "se")}
                  />
                </>
              )}
              {/* Line/Arrow endpoint handles */}
              {selectedObjectId === obj.id && isLineOrArrow && (
                <>
                  {/* Start point handle */}
                  <div 
                    className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-move"
                    style={{
                      left: -6,
                      top: -6,
                    }}
                    onMouseDown={(e) => handleResizeStart(e, obj.id, "nw")}
                  />
                  {/* End point handle */}
                  <div 
                    className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-move"
                    style={{
                      left: (obj.endX !== undefined ? (obj.endX - obj.x) : obj.width) * scale - 6,
                      top: (obj.endY !== undefined ? (obj.endY - obj.y) : 0) * scale - 6,
                    }}
                    onMouseDown={(e) => handleResizeStart(e, obj.id, "se")}
                  />
                </>
              )}
            </div>
          );
          })}
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
          mode={signatureMode}
        />
      )}
    </div>
  );
}
