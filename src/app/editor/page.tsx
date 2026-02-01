"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import AdUnit from "@/components/AdUnit";

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

export type Tool = "select" | "text" | "sign" | "image" | "shape" | "whiteout" | "highlight" | "draw";
export type ShapeType = "rectangle" | "circle" | "line" | "arrow";

export interface EditorObject {
  id: string;
  type: "text" | "image" | "shape" | "signature" | "whiteout" | "highlight" | "drawing";
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string; // For text
  src?: string; // For images/signatures
  shapeType?: ShapeType;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  strokeWidth?: number;
  opacity?: number;
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
    // Calculate and set fit-to-page zoom
    setTimeout(() => {
      const fitZoom = calculateFitZoom();
      setZoom(Math.round(fitZoom));
    }, 100);
  }, [calculateFitZoom]);

  // Initialize page order when PDF loads
  useEffect(() => {
    if (totalPages > 0 && pageOrder.length === 0) {
      setPageOrder(Array.from({ length: totalPages }, (_, i) => i + 1));
    }
  }, [totalPages, pageOrder.length]);

  const handleFileSelect = useCallback(async (file: File) => {
    setFileName(file.name);
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

  const addObject = useCallback((obj: Omit<EditorObject, "id">, keepTool: boolean = false) => {
    const newObj: EditorObject = {
      ...obj,
      id: `obj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setObjects(prev => [...prev, newObj]);
    setSelectedObjectId(newObj.id);
    // Auto-switch to select tool after adding object (unless keepTool is true)
    if (!keepTool) {
      setActiveTool("select");
    }
    return newObj.id;
  }, []);

  const updateObject = useCallback((id: string, updates: Partial<EditorObject>) => {
    setObjects(prev => prev.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
  }, []);

  const deleteObject = useCallback((id: string) => {
    setObjects(prev => prev.filter(obj => obj.id !== id));
    if (selectedObjectId === id) setSelectedObjectId(null);
  }, [selectedObjectId]);

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

  const addBlankPage = useCallback(() => {
    // Add a new "virtual" page number
    const maxPage = Math.max(...pageOrder, totalPages);
    const newPageNum = maxPage + 1;
    setPageOrder(prev => [...prev, newPageNum]);
    setTotalPages(prev => prev + 1);
  }, [pageOrder, totalPages]);

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
  const [shapeOptions, setShapeOptions] = useState({ shapeType: "rectangle" as "rectangle" | "circle", color: "#000000", strokeWidth: 2 });
  const [highlightColor, setHighlightColor] = useState("#ffff00");

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: "select", icon: "👆", label: "Select" },
    { id: "text", icon: <span className="font-bold">T</span>, label: "Add Text" },
    { id: "sign", icon: "✍️", label: "Sign" },
    { id: "image", icon: "🖼️", label: "Add Image" },
    { id: "shape", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="8" height="8"/><circle cx="17" cy="17" r="4"/></svg>, label: "Shapes" },
    { id: "whiteout", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 20H7L3 16c-.6-.6-.6-1.5 0-2.1l10-10c.6-.6 1.5-.6 2.1 0l5.9 5.9c.6.6.6 1.5 0 2.1L13.1 20"/><path d="M6 11l7 7"/></svg>, label: "Eraser" },
    { id: "highlight", icon: "🖍️", label: "Highlight" },
    { id: "draw", icon: "✏️", label: "Draw" },
  ];

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
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <a href="/" className="text-xl font-bold text-blue-600 mr-4">EditPDFs</a>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-600 truncate max-w-[200px]">{fileName}</span>
        </div>
        
        {/* Tools */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                if (tool.id === "image") {
                  // Open file picker immediately for image tool
                  imageInputRef.current?.click();
                } else {
                  setActiveTool(tool.id);
                }
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative group flex items-center justify-center ${
                activeTool === tool.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              title={tool.label}
            >
              <span className="text-lg leading-none">{tool.icon}</span>
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {tool.label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Hidden image input */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        {/* Tool Options */}
        {activeTool === "text" && (
          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-1">
            <select
              value={textOptions.fontSize}
              onChange={(e) => setTextOptions(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
              className="px-2 py-1 rounded border border-gray-300 text-sm"
            >
              {[10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64].map(size => (
                <option key={size} value={size}>{size}px</option>
              ))}
            </select>
            <input
              type="color"
              value={textOptions.color}
              onChange={(e) => setTextOptions(prev => ({ ...prev, color: e.target.value }))}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </div>
        )}

        {activeTool === "shape" && (
          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-1">
            <select
              value={shapeOptions.shapeType}
              onChange={(e) => setShapeOptions(prev => ({ ...prev, shapeType: e.target.value as "rectangle" | "circle" }))}
              className="px-2 py-1 rounded border border-gray-300 text-sm"
            >
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
            </select>
            <input
              type="color"
              value={shapeOptions.color}
              onChange={(e) => setShapeOptions(prev => ({ ...prev, color: e.target.value }))}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
            <select
              value={shapeOptions.strokeWidth}
              onChange={(e) => setShapeOptions(prev => ({ ...prev, strokeWidth: Number(e.target.value) }))}
              className="px-2 py-1 rounded border border-gray-300 text-sm"
            >
              {[1, 2, 3, 4, 5].map(w => (
                <option key={w} value={w}>{w}px</option>
              ))}
            </select>
          </div>
        )}

        {activeTool === "highlight" && (
          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-1">
            <span className="text-sm text-gray-600">Color:</span>
            {["#ffff00", "#00ff00", "#00ffff", "#ff69b4", "#ffa500"].map(color => (
              <button
                key={color}
                onClick={() => setHighlightColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${highlightColor === color ? "border-blue-500 scale-110" : "border-gray-300"}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        
        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* Zoom */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
            <button
              onClick={() => setZoom(z => Math.max(25, z - 25))}
              className="text-gray-600 hover:text-gray-900"
            >
              −
            </button>
            <span className="text-sm w-12 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(z => Math.min(200, z + 25))}
              className="text-gray-600 hover:text-gray-900"
            >
              +
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
                <span>💾</span>
                <span>Download</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Page thumbnails */}
        <div className="w-48 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Pages</span>
            <button
              onClick={addBlankPage}
              className="text-xs text-blue-600 hover:text-blue-800"
              title="Add blank page"
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
              zoom={zoom}
              activeTool={activeTool}
              objects={objects.filter(o => o.pageNumber === currentPage)}
              selectedObjectId={selectedObjectId}
              onAddObject={addObject}
              onUpdateObject={updateObject}
              onDeleteObject={deleteObject}
              onSelectObject={setSelectedObjectId}
              onPageDimensionsChange={handlePageDimensionsChange}
              textOptions={textOptions}
              shapeOptions={shapeOptions}
              highlightColor={highlightColor}
            />
          )}
        </div>
        
        {/* Right sidebar ad - only on large screens */}
        <div className="hidden xl:block w-[160px] bg-white border-l border-gray-200 p-2">
          <AdUnit slot="EDITOR_RIGHT" format="vertical" className="sticky top-2" />
        </div>
      </div>
    </div>
  );
}
