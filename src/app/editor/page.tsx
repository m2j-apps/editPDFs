"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import AdUnit from "@/components/AdUnit";
import Toolbar from "@/components/editor/Toolbar";
import FindReplaceModal from "@/components/editor/FindReplaceModal";

const AddPagesModal = dynamic(() => import("@/components/editor/AddPagesModal"), {
  ssr: false,
});

// Dynamic imports for browser-only components
const EditorCanvas = dynamic(() => import("@/components/editor/EditorCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ),
});

const PageThumbnails = dynamic(() => import("@/components/editor/PageThumbnails"), {
  ssr: false,
});

export type Tool = 
  | "select" 
  | "text" 
  | "sign" 
  | "initials"
  | "image" 
  | "stamp"
  | "delete-image"
  | "shape" 
  | "whiteout" 
  | "highlight" 
  | "draw" 
  | "link" 
  | "form-checkbox" 
  | "form-text" 
  | "form-text-multi"
  | "form-radio"
  | "form-dropdown"
  | "form-signature"
  | "form-edit"
  | "symbol-x"
  | "symbol-check"
  | "symbol-bullet"
  | "strikeout"
  | "underline"
  | "freehand-highlight";
export type ShapeType = "rectangle" | "circle" | "line" | "arrow";

export interface EditorObject {
  id: string;
  type: 
    | "text" 
    | "image" 
    | "shape" 
    | "signature" 
    | "whiteout" 
    | "highlight" 
    | "drawing" 
    | "link" 
    | "stamp"
    | "strikeout"
    | "underline";
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string; // For text/stamps
  src?: string; // For images/signatures
  shapeType?: ShapeType;
  // For lines/arrows - store actual endpoints for direction
  endX?: number;
  endY?: number;
  // For freehand drawing - store path points
  points?: { x: number; y: number }[];
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  strokeWidth?: number;
  opacity?: number;
  url?: string; // For links
  fill?: boolean;
  fillColor?: string;
  // Text formatting options
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    highlightColor?: string;
  };
}

// PDF text edit type
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

export default function EditorPage() {
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [objects, setObjects] = useState<EditorObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [deletedPages, setDeletedPages] = useState<Set<number>>(new Set());
  const [pageRotations, setPageRotations] = useState<Map<number, number>>(new Map());
  const [pageDimensions, setPageDimensions] = useState({ width: 612, height: 792 });
  const [pdfTextEdits, setPdfTextEdits] = useState<PdfTextEdit[]>([]);
  const [showAddPagesModal, setShowAddPagesModal] = useState(false);
  
  // Undo/Redo history - tracks both objects and text edits
  const [history, setHistory] = useState<{ objects: EditorObject[]; textEdits: PdfTextEdit[] }[]>([{ objects: [], textEdits: [] }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const hasAutoZoomedRef = useRef(false); // Track if initial auto-zoom has been applied

  // Calculate fit-to-page zoom when page dimensions change
  const calculateFitZoom = useCallback(() => {
    if (!editorContainerRef.current) return 100;
    const container = editorContainerRef.current;
    const padding = 64; // 32px padding on each side
    const availableWidth = container.clientWidth - padding;
    const availableHeight = container.clientHeight - padding;
    
    const widthZoom = (availableWidth / pageDimensions.width) * 100;
    const heightZoom = (availableHeight / pageDimensions.height) * 100;
    
    return Math.min(widthZoom, heightZoom, 200); // Cap at 200%
  }, [pageDimensions]);

  const handlePageDimensionsChange = useCallback((width: number, height: number) => {
    setPageDimensions({ width, height });
    // Calculate and set fit-to-page zoom only on initial load
    if (!hasAutoZoomedRef.current) {
      setTimeout(() => {
        const fitZoom = calculateFitZoom();
        setZoom(Math.round(fitZoom));
        hasAutoZoomedRef.current = true;
      }, 100);
    }
  }, [calculateFitZoom]);

  // Initialize page order when PDF loads
  useEffect(() => {
    if (totalPages > 0 && pageOrder.length === 0) {
      setPageOrder(Array.from({ length: totalPages }, (_, i) => i + 1));
    }
  }, [totalPages, pageOrder.length]);

  const handleFileSelect = useCallback(async (file: File) => {
    setFileName(file.name);
    hasAutoZoomedRef.current = false; // Reset auto-zoom for new file
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Check if it's a PDF or needs conversion
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    
    if (isPdf) {
      setPdfBytes(bytes);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      // For now, show error for non-PDF files
      // TODO: Add conversion support
      alert("Please upload a PDF file. Support for other formats coming soon!");
      return;
    }
    
    // Load PDF to get page count
    try {
      const pdfDoc = await PDFDocument.load(bytes);
      setTotalPages(pdfDoc.getPageCount());
      setPageOrder(Array.from({ length: pdfDoc.getPageCount() }, (_, i) => i + 1));
    } catch (error) {
      console.error("Error loading PDF:", error);
      alert("Error loading PDF file. Please try another file.");
    }
  }, []);

  // Check for pending PDF from homepage
  useEffect(() => {
    const pendingData = sessionStorage.getItem("pendingPdfData");
    const pendingName = sessionStorage.getItem("pendingPdfName");
    
    if (pendingData && pendingName) {
      sessionStorage.removeItem("pendingPdfData");
      sessionStorage.removeItem("pendingPdfName");
      
      // Convert data URL to File
      fetch(pendingData)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], pendingName, { type: "application/pdf" });
          handleFileSelect(file);
        });
    }
  }, [handleFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Helper to push to history
  const pushToHistory = useCallback((newObjects: EditorObject[], newTextEdits?: PdfTextEdit[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ 
        objects: newObjects, 
        textEdits: newTextEdits ?? pdfTextEdits 
      });
      // Limit history to 50 states
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex, pdfTextEdits]);

  const addObject = useCallback((obj: Omit<EditorObject, "id">, keepTool: boolean = false) => {
    const newObj: EditorObject = {
      ...obj,
      id: `obj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    const newObjects = [...objects, newObj];
    setObjects(newObjects);
    pushToHistory(newObjects);
    setSelectedObjectId(newObj.id);
    // Auto-switch to select tool after adding object (unless keepTool is true)
    if (!keepTool) {
      setActiveTool("select");
    }
    return newObj.id;
  }, [objects, pushToHistory]);

  const updateObject = useCallback((id: string, updates: Partial<EditorObject>) => {
    setObjects(prev => prev.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
  }, []);

  // Commit object changes to history (call after drag/resize ends)
  const commitObjectChange = useCallback(() => {
    pushToHistory(objects);
  }, [objects, pushToHistory]);

  const deleteObject = useCallback((id: string) => {
    const newObjects = objects.filter(obj => obj.id !== id);
    setObjects(newObjects);
    pushToHistory(newObjects);
    if (selectedObjectId === id) setSelectedObjectId(null);
  }, [selectedObjectId, objects, pushToHistory]);

  // Undo/Redo handlers
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = useCallback(() => {
    if (canUndo) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setObjects(history[newIndex].objects);
      setPdfTextEdits(history[newIndex].textEdits);
      setSelectedObjectId(null);
    }
  }, [canUndo, historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setObjects(history[newIndex].objects);
      setPdfTextEdits(history[newIndex].textEdits);
      setSelectedObjectId(null);
    }
  }, [canRedo, historyIndex, history]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  // PDF text edit handlers - track edits and push to history
  const handlePdfTextEdit = useCallback((edit: PdfTextEdit) => {
    // Check if edit with this ID already exists - replace instead of duplicate
    const existingIndex = pdfTextEdits.findIndex(e => e.id === edit.id);
    let newEdits: PdfTextEdit[];
    if (existingIndex >= 0) {
      // Replace existing edit
      newEdits = [...pdfTextEdits];
      newEdits[existingIndex] = edit;
    } else {
      // Add new edit
      newEdits = [...pdfTextEdits, edit];
    }
    setPdfTextEdits(newEdits);
    pushToHistory(objects, newEdits);
  }, [pdfTextEdits, objects, pushToHistory]);

  const handlePdfTextDelete = useCallback((editId: string) => {
    const newEdits = pdfTextEdits.filter(e => e.id !== editId);
    setPdfTextEdits(newEdits);
    pushToHistory(objects, newEdits);
  }, [pdfTextEdits, objects, pushToHistory]);

  // Update an existing text edit (for dragging/moving)
  const handlePdfTextUpdate = useCallback((editId: string, updates: Partial<PdfTextEdit>) => {
    setPdfTextEdits(prev => prev.map(edit => 
      edit.id === editId ? { ...edit, ...updates } : edit
    ));
    // Note: Don't push to history on every drag move - only on mouseup
    // (History is pushed when the user starts a new edit or action)
  }, []);

  const deletePage = useCallback((pageNum: number) => {
    setDeletedPages(prev => new Set([...prev, pageNum]));
    setPageOrder(prev => prev.filter(p => p !== pageNum));
    // Move to adjacent page if current is deleted
    if (currentPage === pageNum) {
      const remaining = pageOrder.filter(p => p !== pageNum);
      if (remaining.length > 0) {
        setCurrentPage(remaining[0]);
      }
    }
  }, [currentPage, pageOrder]);

  const reorderPages = useCallback((newOrder: number[]) => {
    setPageOrder(newOrder);
  }, []);

  const rotatePage = useCallback((pageNum: number) => {
    setPageRotations(prev => {
      const newMap = new Map(prev);
      const currentRotation = newMap.get(pageNum) || 0;
      newMap.set(pageNum, (currentRotation + 90) % 360);
      return newMap;
    });
  }, []);

  const addBlankPage = useCallback(async () => {
    if (!pdfBytes) return;
    
    try {
      // Load the PDF and add a blank page
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDoc.addPage(); // Adds a default letter-size blank page
      
      // Save the updated PDF
      const updatedBytes = await pdfDoc.save();
      const updatedUint8 = new Uint8Array(updatedBytes);
      
      // Update state
      setPdfBytes(updatedUint8);
      
      // Create new URL
      const blob = new Blob([updatedUint8], { type: "application/pdf" });
      const newUrl = URL.createObjectURL(blob);
      setPdfUrl(newUrl);
      
      // Update page count and order
      const newTotalPages = pdfDoc.getPageCount();
      setTotalPages(newTotalPages);
      setPageOrder(Array.from({ length: newTotalPages }, (_, i) => i + 1));
      
      // Navigate to the new page
      setCurrentPage(newTotalPages);
    } catch (error) {
      console.error("Error adding blank page:", error);
    }
  }, [pdfBytes]);

  const addPdfPages = useCallback(async (newPdfBytes: Uint8Array, selectedPages: number[]) => {
    if (!pdfBytes) return;
    
    try {
      // Load both PDFs
      const mainPdf = await PDFDocument.load(pdfBytes);
      const sourcePdf = await PDFDocument.load(newPdfBytes);
      
      // Copy selected pages from source to main
      const pageIndices = selectedPages.map(p => p - 1); // Convert to 0-based
      const copiedPages = await mainPdf.copyPages(sourcePdf, pageIndices);
      
      // Add copied pages to main PDF
      copiedPages.forEach(page => {
        mainPdf.addPage(page);
      });
      
      // Save the merged PDF
      const mergedBytes = await mainPdf.save();
      const mergedUint8 = new Uint8Array(mergedBytes);
      
      // Update state with merged PDF
      setPdfBytes(mergedUint8);
      
      // Create new URL for the merged PDF
      const blob = new Blob([mergedUint8], { type: "application/pdf" });
      const newUrl = URL.createObjectURL(blob);
      setPdfUrl(newUrl);
      
      // Update page count and order
      const newTotalPages = mainPdf.getPageCount();
      setTotalPages(newTotalPages);
      setPageOrder(Array.from({ length: newTotalPages }, (_, i) => i + 1));
      
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Error adding pages from PDF. Please try again.");
    }
  }, [pdfBytes]);

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 300;
        const ratio = Math.min(maxWidth / img.width, 1);
        addObject({
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
    // Reset input so same file can be selected again
    e.target.value = "";
  }, [currentPage, addObject]);

  const applyChangesAndDownload = useCallback(async () => {
    if (!pdfBytes) return;
    setIsProcessing(true);
    
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      // Apply objects to pages
      for (const obj of objects) {
        const pageIndex = obj.pageNumber - 1;
        if (pageIndex < 0 || pageIndex >= pdfDoc.getPageCount()) continue;
        
        const page = pdfDoc.getPages()[pageIndex];
        const { height } = page.getSize();
        
        if (obj.type === "text" && obj.content) {
          page.drawText(obj.content, {
            x: obj.x,
            y: height - obj.y - (obj.fontSize || 16),
            size: obj.fontSize || 16,
            font: helvetica,
            color: obj.color ? rgb(
              parseInt(obj.color.slice(1, 3), 16) / 255,
              parseInt(obj.color.slice(3, 5), 16) / 255,
              parseInt(obj.color.slice(5, 7), 16) / 255
            ) : rgb(0, 0, 0),
          });
        }
        
        if (obj.type === "whiteout") {
          page.drawRectangle({
            x: obj.x,
            y: height - obj.y - obj.height,
            width: obj.width,
            height: obj.height,
            color: rgb(1, 1, 1),
          });
        }
        
        if ((obj.type === "image" || obj.type === "signature") && obj.src) {
          try {
            const response = await fetch(obj.src);
            const imgBytes = await response.arrayBuffer();
            const img = obj.src.includes("png") 
              ? await pdfDoc.embedPng(new Uint8Array(imgBytes))
              : await pdfDoc.embedJpg(new Uint8Array(imgBytes));
            
            page.drawImage(img, {
              x: obj.x,
              y: height - obj.y - obj.height,
              width: obj.width,
              height: obj.height,
            });
          } catch (e) {
            console.error("Error embedding image:", e);
          }
        }
        
        if (obj.type === "shape" && obj.shapeType === "rectangle") {
          page.drawRectangle({
            x: obj.x,
            y: height - obj.y - obj.height,
            width: obj.width,
            height: obj.height,
            borderColor: obj.color ? rgb(
              parseInt(obj.color.slice(1, 3), 16) / 255,
              parseInt(obj.color.slice(3, 5), 16) / 255,
              parseInt(obj.color.slice(5, 7), 16) / 255
            ) : rgb(0, 0, 0),
            borderWidth: obj.strokeWidth || 2,
          });
        }
      }
      
      // Handle page deletion and reordering
      if (deletedPages.size > 0 || pageOrder.some((p, i) => p !== i + 1)) {
        const newPdf = await PDFDocument.create();
        for (const pageNum of pageOrder) {
          if (!deletedPages.has(pageNum)) {
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
            newPdf.addPage(copiedPage);
          }
        }
        const modifiedBytes = await newPdf.save();
        downloadPdf(modifiedBytes);
      } else {
        const modifiedBytes = await pdfDoc.save();
        downloadPdf(modifiedBytes);
      }
    } catch (error) {
      console.error("Error applying changes:", error);
      alert("Error saving PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [pdfBytes, objects, pageOrder, deletedPages]);

  const downloadPdf = (bytes: Uint8Array) => {
    const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.[^/.]+$/, "") + "_edited.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Tool options state
  const [textOptions, setTextOptions] = useState({ fontSize: 16, color: "#000000" });
  const [shapeOptions, setShapeOptions] = useState<{ shapeType: ShapeType; color: string; strokeWidth: number; fill: boolean; fillColor: string }>({ shapeType: "rectangle", color: "#000000", strokeWidth: 2, fill: false, fillColor: "#ffffff" });
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [annotateColor, setAnnotateColor] = useState("#ff0000");
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [savedSignatures, setSavedSignatures] = useState<string[]>([]);
  const [savedInitials, setSavedInitials] = useState<string[]>([]);
  
  // Handler for placing a saved signature on the page
  const handleUseSavedSignature = useCallback((dataUrl: string) => {
    addObject({
      type: "signature",
      pageNumber: currentPage,
      x: 100,
      y: 100,
      width: 200,
      height: 75,
      src: dataUrl,
    });
  }, [currentPage, addObject]);
  
  // Handler for placing saved initials on the page
  const handleUseSavedInitials = useCallback((dataUrl: string) => {
    addObject({
      type: "signature",
      pageNumber: currentPage,
      x: 100,
      y: 100,
      width: 100,
      height: 50,
      src: dataUrl,
    });
  }, [currentPage, addObject]);
  
  // Handler to save a new signature (called from EditorCanvas)
  const handleSignatureCreated = useCallback((dataUrl: string, isInitials: boolean) => {
    if (isInitials) {
      setSavedInitials(prev => {
        if (prev.includes(dataUrl)) return prev;
        return [...prev, dataUrl];
      });
    } else {
      setSavedSignatures(prev => {
        if (prev.includes(dataUrl)) return prev;
        return [...prev, dataUrl];
      });
    }
  }, []);
  
  // Find & Replace state
  const [findMatches, setFindMatches] = useState<Array<{
    pageNumber: number;
    spanText: string;       // Full text of the span containing the match
    matchText: string;      // The actual matched text
    matchStart: number;     // Character offset within span where match starts
    matchEnd: number;       // Character offset where match ends
    element?: HTMLElement;
    // Bounding box for the MATCHED PORTION (not the whole span)
    x: number;
    y: number;
    width: number;
    height: number;
  }>>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  
  // Helper: Get bounding rect for a specific text range within a text node
  const getTextRangeBounds = useCallback((textNode: Text, startOffset: number, endOffset: number): DOMRect | null => {
    try {
      const range = document.createRange();
      range.setStart(textNode, startOffset);
      range.setEnd(textNode, endOffset);
      const rects = range.getClientRects();
      if (rects.length > 0) {
        // If text wraps, there may be multiple rects - use the first one
        return rects[0];
      }
      return range.getBoundingClientRect();
    } catch {
      return null;
    }
  }, []);

  // Find handler - searches PDF text layer with character-level precision
  const handleFind = useCallback((searchText: string, options: { caseSensitive: boolean; wholeWord: boolean }) => {
    // Clear previous highlights first
    findMatches.forEach(match => {
      if (match.element) {
        match.element.style.backgroundColor = "";
        match.element.style.outline = "";
        // Remove any highlight spans we may have added
        const highlights = match.element.querySelectorAll(".find-highlight");
        highlights.forEach(h => {
          const parent = h.parentNode;
          if (parent) {
            parent.replaceChild(document.createTextNode(h.textContent || ""), h);
            parent.normalize(); // Merge adjacent text nodes
          }
        });
      }
    });
    
    const matches: typeof findMatches = [];
    const scale = zoom / 100;
    
    // We only render one page at a time, so search the current page's text layer
    const textLayer = document.querySelector(".react-pdf__Page__textContent");
    if (textLayer) {
      const container = textLayer.closest(".react-pdf__Page");
      const containerRect = container?.getBoundingClientRect();
      if (!containerRect) return;
      
      const spans = textLayer.querySelectorAll("span");
      spans.forEach((span) => {
        const htmlSpan = span as HTMLElement;
        // Skip hidden elements (already replaced)
        if (htmlSpan.style.visibility === "hidden") return;
        
        const spanText = span.textContent || "";
        let searchIn = spanText;
        let searchFor = searchText;
        
        if (!options.caseSensitive) {
          searchIn = searchIn.toLowerCase();
          searchFor = searchFor.toLowerCase();
        }
        
        // Find ALL matches within this span (not just the first)
        let searchStart = 0;
        while (true) {
          let matchIndex = -1;
          
          if (options.wholeWord) {
            const regex = new RegExp(`\\b${searchFor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, options.caseSensitive ? 'g' : 'gi');
            regex.lastIndex = searchStart;
            const match = regex.exec(spanText);
            if (match) {
              matchIndex = match.index;
            }
          } else {
            matchIndex = searchIn.indexOf(searchFor, searchStart);
          }
          
          if (matchIndex === -1) break;
          
          const matchEnd = matchIndex + searchText.length;
          searchStart = matchEnd; // Continue searching after this match
          
          // Get the text node (first child of span)
          const textNode = span.firstChild;
          if (!textNode || textNode.nodeType !== Node.TEXT_NODE) continue;
          
          // Use Range API to get precise bounds of the matched portion
          const matchRect = getTextRangeBounds(textNode as Text, matchIndex, matchEnd);
          if (!matchRect) continue;
          
          matches.push({
            pageNumber: currentPage,
            spanText: spanText,
            matchText: spanText.substring(matchIndex, matchEnd),
            matchStart: matchIndex,
            matchEnd: matchEnd,
            element: htmlSpan,
            x: (matchRect.left - containerRect.left) / scale,
            y: (matchRect.top - containerRect.top) / scale,
            width: matchRect.width / scale,
            height: matchRect.height / scale,
          });
        }
      });
    }
    
    // Also search through text edits on current page
    pdfTextEdits.filter(edit => edit.pageNumber === currentPage && edit.newText).forEach(edit => {
      let searchIn = edit.newText;
      let searchFor = searchText;
      
      if (!options.caseSensitive) {
        searchIn = searchIn.toLowerCase();
        searchFor = searchFor.toLowerCase();
      }
      
      let searchStart = 0;
      while (true) {
        const matchIndex = searchIn.indexOf(searchFor, searchStart);
        if (matchIndex === -1) break;
        
        const matchEnd = matchIndex + searchText.length;
        searchStart = matchEnd;
        
        // Estimate character position within the edit
        // Use average character width approximation
        const avgCharWidth = edit.width / edit.newText.length;
        
        matches.push({
          pageNumber: currentPage,
          spanText: edit.newText,
          matchText: edit.newText.substring(matchIndex, matchEnd),
          matchStart: matchIndex,
          matchEnd: matchEnd,
          x: edit.x + (matchIndex * avgCharWidth),
          y: edit.y,
          width: searchText.length * avgCharWidth,
          height: edit.height,
        });
      }
    });
    
    // Apply visual highlights to all matches
    matches.forEach((match, index) => {
      if (match.element) {
        // Create highlight span around matched text
        const textNode = match.element.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          try {
            const range = document.createRange();
            range.setStart(textNode, match.matchStart);
            range.setEnd(textNode, match.matchEnd);
            
            const highlight = document.createElement("span");
            highlight.className = "find-highlight";
            highlight.style.backgroundColor = index === currentMatchIndex ? "rgba(255, 165, 0, 0.6)" : "rgba(255, 255, 0, 0.5)";
            highlight.style.borderRadius = "2px";
            range.surroundContents(highlight);
          } catch {
            // Fallback: highlight whole span if Range manipulation fails
            match.element.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
          }
        }
      }
    });
    
    setFindMatches(matches);
    setCurrentMatchIndex(0);
  }, [findMatches, currentPage, pdfTextEdits, zoom, getTextRangeBounds]);
  
  // Clear find highlights
  const clearFindHighlights = useCallback(() => {
    findMatches.forEach(match => {
      if (match.element) {
        match.element.style.backgroundColor = "";
        match.element.style.outline = "";
        // Remove highlight spans and restore text nodes
        const highlights = match.element.querySelectorAll(".find-highlight");
        highlights.forEach(h => {
          const parent = h.parentNode;
          if (parent) {
            parent.replaceChild(document.createTextNode(h.textContent || ""), h);
            parent.normalize();
          }
        });
      }
    });
  }, [findMatches]);
  
  // Replace handler - creates text edit for current match (word-level precision)
  const handleReplace = useCallback((findText: string, replaceText: string, options: { caseSensitive: boolean; wholeWord: boolean }) => {
    if (findMatches.length === 0 || currentMatchIndex >= findMatches.length) return;
    
    const match = findMatches[currentMatchIndex];
    
    // Get font info from the element's computed style
    const computedStyle = match.element ? window.getComputedStyle(match.element) : null;
    const fontSize = computedStyle ? parseFloat(computedStyle.fontSize) / (zoom / 100) : 12;
    const fontFamily = computedStyle?.fontFamily || "sans-serif";
    
    // Create a text edit that covers ONLY the matched word/phrase
    // x, y, width, height in match are already in PDF coordinates
    const editId = `pdf-text-${Date.now()}`;
    handlePdfTextEdit({
      id: editId,
      pageNumber: match.pageNumber,
      originalText: match.matchText, // Only the matched portion
      newText: replaceText,
      x: match.x,
      y: match.y,
      width: match.width,
      height: match.height,
      fontSize,
      fontFamily,
    });
    
    // Clear highlight from this match
    if (match.element) {
      const highlights = match.element.querySelectorAll(".find-highlight");
      highlights.forEach(h => {
        const parent = h.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(h.textContent || ""), h);
          parent.normalize();
        }
      });
    }
    
    // Remove this match and update indices for remaining matches in same span
    // Since we replaced text, character offsets in the same span may have shifted
    const newMatches = findMatches.filter((m, i) => {
      if (i === currentMatchIndex) return false;
      // If match is in same span and AFTER our replacement, adjust its position
      // (This is complex - for now, just remove matches in the same span to be safe)
      if (m.element === match.element && m.matchStart >= match.matchStart) {
        return false; // Remove overlapping/affected matches
      }
      return true;
    });
    
    setFindMatches(newMatches);
    if (currentMatchIndex >= newMatches.length) {
      setCurrentMatchIndex(Math.max(0, newMatches.length - 1));
    }
  }, [findMatches, currentMatchIndex, handlePdfTextEdit, zoom]);
  
  // Replace All handler - word-level precision for all matches
  const handleReplaceAll = useCallback((findText: string, replaceText: string, options: { caseSensitive: boolean; wholeWord: boolean }) => {
    const scale = zoom / 100;
    
    // Group matches by span to handle multiple matches in same span correctly
    // Process from end to start within each span to avoid offset issues
    const matchesByElement = new Map<HTMLElement | undefined, typeof findMatches>();
    findMatches.forEach(match => {
      const existing = matchesByElement.get(match.element) || [];
      existing.push(match);
      matchesByElement.set(match.element, existing);
    });
    
    // Sort each group by matchStart descending (replace from end first)
    matchesByElement.forEach(matches => {
      matches.sort((a, b) => b.matchStart - a.matchStart);
    });
    
    // Now process all matches
    let editIndex = 0;
    matchesByElement.forEach((matches) => {
      matches.forEach((match) => {
        const computedStyle = match.element ? window.getComputedStyle(match.element) : null;
        const fontSize = computedStyle ? parseFloat(computedStyle.fontSize) / scale : 12;
        const fontFamily = computedStyle?.fontFamily || "sans-serif";
        
        const editId = `pdf-text-${Date.now()}-${editIndex++}`;
        handlePdfTextEdit({
          id: editId,
          pageNumber: match.pageNumber,
          originalText: match.matchText,
          newText: replaceText,
          x: match.x,
          y: match.y,
          width: match.width,
          height: match.height,
          fontSize,
          fontFamily,
        });
      });
      
      // Clear highlights from element
      const element = matches[0]?.element;
      if (element) {
        const highlights = element.querySelectorAll(".find-highlight");
        highlights.forEach(h => {
          const parent = h.parentNode;
          if (parent) {
            parent.replaceChild(document.createTextNode(h.textContent || ""), h);
            parent.normalize();
          }
        });
      }
    });
    
    setFindMatches([]);
    setCurrentMatchIndex(0);
  }, [findMatches, handlePdfTextEdit, zoom]);
  
  // Navigate matches - updates highlight colors to show current match
  const updateMatchHighlights = useCallback((newIndex: number) => {
    findMatches.forEach((match, index) => {
      if (match.element) {
        const highlights = match.element.querySelectorAll(".find-highlight");
        highlights.forEach(h => {
          (h as HTMLElement).style.backgroundColor = 
            index === newIndex ? "rgba(255, 165, 0, 0.6)" : "rgba(255, 255, 0, 0.5)";
        });
      }
    });
  }, [findMatches]);

  const handleNextMatch = useCallback(() => {
    if (findMatches.length === 0) return;
    const newIndex = (currentMatchIndex + 1) % findMatches.length;
    setCurrentMatchIndex(newIndex);
    updateMatchHighlights(newIndex);
    setCurrentPage(findMatches[newIndex].pageNumber);
  }, [findMatches, currentMatchIndex, setCurrentPage, updateMatchHighlights]);
  
  const handlePrevMatch = useCallback(() => {
    if (findMatches.length === 0) return;
    const newIndex = (currentMatchIndex - 1 + findMatches.length) % findMatches.length;
    setCurrentMatchIndex(newIndex);
    updateMatchHighlights(newIndex);
    setCurrentPage(findMatches[newIndex].pageNumber);
  }, [findMatches, currentMatchIndex, setCurrentPage, updateMatchHighlights]);

  // Upload screen
  if (!pdfUrl) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Free PDF Editor
            </h1>
            <p className="text-xl text-gray-600">
              Edit, sign, annotate, and modify PDFs. No signup required.
            </p>
          </div>
          
          <div
            className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors p-12 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Drop your PDF here
            </h2>
            <p className="text-gray-600 mb-4">
              or click to browse
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Select PDF
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: "🔒", text: "100% Private" },
              { icon: "⚡", text: "Instant" },
              { icon: "♾️", text: "No Limits" },
              { icon: "🚫", text: "No Signup" },
            ].map((item) => (
              <div key={item.text} className="bg-white rounded-lg p-4 shadow-sm">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm text-gray-600 mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Editor screen
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo and filename */}
          <div className="flex items-center space-x-3 min-w-0">
            <a href="/" className="text-xl font-bold text-blue-600 flex-shrink-0">EditPDFs</a>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600 truncate max-w-[180px]">{fileName}</span>
          </div>
          
          {/* Center: Tools */}
          <Toolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            onImageClick={() => imageInputRef.current?.click()}
            canUndo={canUndo}
            canRedo={canRedo}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onFindReplace={() => setShowFindReplace(true)}
            textOptions={textOptions}
            onTextOptionsChange={setTextOptions}
            shapeOptions={shapeOptions}
            onShapeOptionsChange={setShapeOptions}
            highlightColor={highlightColor}
            onHighlightColorChange={setHighlightColor}
            annotateColor={annotateColor}
            onAnnotateColorChange={setAnnotateColor}
            savedSignatures={savedSignatures}
            savedInitials={savedInitials}
            onUseSavedSignature={handleUseSavedSignature}
            onUseSavedInitials={handleUseSavedInitials}
            showAnnotations={showAnnotations}
            onToggleAnnotations={() => setShowAnnotations(prev => !prev)}
          />
          
          {/* Hidden image input */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
          
          {/* Right: Zoom and Download */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Zoom */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg px-2 py-1.5">
              <button
                onClick={() => setZoom(z => Math.max(25, z - 25))}
                className="p-1 text-gray-600 hover:text-gray-900 rounded hover:bg-gray-200"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm w-12 text-center font-medium">{zoom}%</span>
              <button
                onClick={() => setZoom(z => Math.min(200, z + 25))}
                className="p-1 text-gray-600 hover:text-gray-900 rounded hover:bg-gray-200"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            {/* Download */}
            <button
              onClick={applyChangesAndDownload}
              disabled={isProcessing}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Page thumbnails */}
        <div className="w-48 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Pages</span>
            <button
              onClick={() => setShowAddPagesModal(true)}
              className="text-xs text-blue-600 hover:text-blue-800"
              title="Add pages"
            >
              + Add
            </button>
          </div>
          {pdfUrl && (
            <PageThumbnails
              fileUrl={pdfUrl}
              pageOrder={pageOrder}
              deletedPages={deletedPages}
              currentPage={currentPage}
              onPageSelect={setCurrentPage}
              onPageDelete={deletePage}
              onReorder={reorderPages}
              onPageRotate={rotatePage}
              pageRotations={pageRotations}
            />
          )}
        </div>
        
        {/* Center - PDF Canvas */}
        <div ref={editorContainerRef} className="flex-1 overflow-auto bg-gray-200 p-4">
          {pdfUrl && (
            <EditorCanvas
              fileUrl={pdfUrl}
              currentPage={currentPage}
              totalPages={totalPages}
              zoom={zoom}
              activeTool={activeTool}
              objects={objects.filter(o => {
                if (o.pageNumber !== currentPage) return false;
                // Hide annotations if showAnnotations is false
                if (!showAnnotations && ["highlight", "strikeout", "underline", "drawing"].includes(o.type)) {
                  return false;
                }
                return true;
              })}
              selectedObjectId={selectedObjectId}
              onAddObject={addObject}
              onUpdateObject={updateObject}
              onDeleteObject={deleteObject}
              onSelectObject={setSelectedObjectId}
              onPageChange={setCurrentPage}
              onPageDimensionsChange={handlePageDimensionsChange}
              textOptions={textOptions}
              shapeOptions={shapeOptions}
              highlightColor={highlightColor}
              annotateColor={annotateColor}
              pdfTextEdits={pdfTextEdits}
              onPdfTextEdit={handlePdfTextEdit}
              onPdfTextUpdate={handlePdfTextUpdate}
              onPdfTextDelete={handlePdfTextDelete}
              onSignatureCreated={handleSignatureCreated}
            />
          )}
        </div>
        
        {/* Right sidebar ad - only on large screens */}
        <div className="hidden xl:block w-[160px] bg-white border-l border-gray-200 p-2">
          <AdUnit slot="EDITOR_RIGHT" format="vertical" className="sticky top-2" />
        </div>
      </div>
      
      {/* Find & Replace Modal */}
      {showFindReplace && (
        <FindReplaceModal
          onClose={() => {
            clearFindHighlights();
            setShowFindReplace(false);
          }}
          onFind={handleFind}
          onReplace={handleReplace}
          onReplaceAll={handleReplaceAll}
          matchCount={findMatches.length}
          currentMatch={findMatches.length > 0 ? currentMatchIndex + 1 : 0}
          onNextMatch={handleNextMatch}
          onPrevMatch={handlePrevMatch}
        />
      )}
      
      {/* Add Pages Modal */}
      {showAddPagesModal && (
        <AddPagesModal
          onClose={() => setShowAddPagesModal(false)}
          onAddBlankPage={addBlankPage}
          onAddPdfPages={addPdfPages}
        />
      )}
    </div>
  );
}
