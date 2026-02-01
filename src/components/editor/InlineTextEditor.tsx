"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Trash2,
  Check,
  X,
  Highlighter,
  Strikethrough,
} from "lucide-react";

interface TextFormatting {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  highlightColor?: string;
  fontSize?: number;
  color?: string;
}

interface InlineTextEditorProps {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  fontWeight?: string;
  color?: string;
  scale: number;
  initialFormatting?: TextFormatting;
  onSave: (newText: string, formatting?: TextFormatting) => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function InlineTextEditor({
  text,
  x,
  y,
  width,
  height,
  fontSize,
  fontFamily,
  fontWeight = "normal",
  color = "#000000",
  scale,
  initialFormatting,
  onSave,
  onCancel,
  onDelete,
}: InlineTextEditorProps) {
  const [formatting, setFormatting] = useState<TextFormatting>({
    bold: initialFormatting?.bold ?? (fontWeight === "bold" || parseInt(fontWeight) >= 700),
    italic: initialFormatting?.italic ?? false,
    underline: initialFormatting?.underline ?? false,
    strikethrough: initialFormatting?.strikethrough ?? false,
    highlightColor: initialFormatting?.highlightColor,
    fontSize: initialFormatting?.fontSize ?? fontSize,
    color: initialFormatting?.color ?? color,
  });
  
  const [highlightPickerColor, setHighlightPickerColor] = useState("#ffff00");
  const [isMounted, setIsMounted] = useState(false);
  const [styleKey, setStyleKey] = useState(0);

  const editableRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay to prevent immediate blur from firing
    const timer = setTimeout(() => {
      setIsMounted(true);
      if (editableRef.current) {
        editableRef.current.focus();
        // Only select all if there's existing text
        if (text) {
          const range = document.createRange();
          range.selectNodeContents(editableRef.current);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      toggleFormat("bold");
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "i") {
      e.preventDefault();
      toggleFormat("italic");
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "u") {
      e.preventDefault();
      toggleFormat("underline");
    }
  };

  const handleSave = useCallback(() => {
    const newText = editableRef.current?.innerText || "";
    if (newText.trim()) {
      onSave(newText, formatting);
    } else {
      // Empty text - just cancel (don't delete) for new text scenarios
      onCancel();
    }
  }, [formatting, onSave, onCancel]);
  
  const handleBlur = useCallback((e: React.FocusEvent) => {
    // Only save on blur if component has fully mounted (prevents immediate save on mount)
    // AND if focus didn't move to the toolbar (e.g., clicking font size dropdown)
    if (isMounted) {
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      if (relatedTarget && toolbarRef.current?.contains(relatedTarget)) {
        // Focus moved to toolbar - don't close
        return;
      }
      handleSave();
    }
  }, [isMounted, handleSave]);

  const toggleFormat = (format: "bold" | "italic" | "underline" | "strikethrough") => {
    console.log("Toggle format:", format, "current:", formatting[format], "-> new:", !formatting[format]);
    setFormatting(prev => {
      const newVal = { ...prev, [format]: !prev[format] };
      console.log("New formatting state:", newVal);
      return newVal;
    });
    setStyleKey(k => k + 1);
  };

  const toggleHighlight = () => {
    setFormatting(prev => ({
      ...prev,
      highlightColor: prev.highlightColor ? undefined : highlightPickerColor,
    }));
    setStyleKey(k => k + 1); // Force style recalculation
  };

  const toolbarTop = Math.max(8, y * scale - 52);

  // Build text-decoration value
  const textDecorations: string[] = [];
  if (formatting.underline) textDecorations.push("underline");
  if (formatting.strikethrough) textDecorations.push("line-through");
  const textDecoration = textDecorations.length > 0 ? textDecorations.join(" ") : "none";

  // Apply styles directly to DOM - runs on every render for simplicity
  useEffect(() => {
    const el = editableRef.current;
    if (!el) return;
    
    const decorations: string[] = [];
    if (formatting.underline) decorations.push("underline");
    if (formatting.strikethrough) decorations.push("line-through");
    const textDec = decorations.length > 0 ? decorations.join(" ") : "none";
    
    // Set all styles with !important to override any other styles
    el.setAttribute('style', `
      outline: none !important;
      min-width: 100% !important;
      font-size: ${(formatting.fontSize || fontSize) * scale}px !important;
      font-family: ${fontFamily} !important;
      font-weight: ${formatting.bold ? "bold" : "normal"} !important;
      font-style: ${formatting.italic ? "italic" : "normal"} !important;
      text-decoration: ${textDec} !important;
      color: ${formatting.color || color} !important;
      line-height: 1.2 !important;
    `);
    
    // Also update parent's background for highlight
    const parent = el.parentElement;
    if (parent) {
      parent.style.backgroundColor = formatting.highlightColor || "transparent";
    }
    
    console.log("Applied styles:", { bold: formatting.bold, fontSize: formatting.fontSize, scale, computedSize: (formatting.fontSize || fontSize) * scale });
  }); // No dependencies - runs every render

  return (
    <>
      {/* Toolbar */}
      <div
        ref={toolbarRef}
        className="text-edit-toolbar"
        style={{
          left: x * scale,
          top: toolbarTop,
        }}
        onMouseDown={(e) => { 
          // preventDefault keeps toolbar from losing focus, but skip for form elements
          const target = e.target as HTMLElement;
          const tag = target.tagName.toLowerCase();
          const isFormElement = tag === 'select' || tag === 'input' || tag === 'option' || target.closest('select') || target.closest('input');
          if (!isFormElement) {
            e.preventDefault(); 
          }
          e.stopPropagation(); 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Text formatting */}
        <button
          type="button"
          onClick={() => toggleFormat("bold")}
          className={formatting.bold ? "active" : ""}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => toggleFormat("italic")}
          className={formatting.italic ? "active" : ""}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => toggleFormat("underline")}
          className={formatting.underline ? "active" : ""}
          title="Underline (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => toggleFormat("strikethrough")}
          className={formatting.strikethrough ? "active" : ""}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        
        <div className="separator" />
        
        <select
          value={formatting.fontSize}
          onChange={(e) => { 
            const newSize = Number(e.target.value);
            console.log("Font size changed to:", newSize);
            setFormatting(prev => ({ ...prev, fontSize: newSize })); 
            setStyleKey(k => k + 1); 
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="text-xs px-1 py-1 border border-gray-200 rounded bg-white"
          style={{ width: 55 }}
        >
          {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        
        <input
          type="color"
          value={formatting.color || color}
          onChange={(e) => { setFormatting(prev => ({ ...prev, color: e.target.value })); setStyleKey(k => k + 1); }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="w-6 h-6 rounded cursor-pointer border border-gray-200"
          title="Text Color"
        />
        
        <div className="separator" />
        
        {/* Highlight with color picker */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleHighlight}
            className={formatting.highlightColor ? "active" : ""}
            title="Highlight"
            style={{ color: formatting.highlightColor || highlightPickerColor }}
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <input
            type="color"
            value={formatting.highlightColor || highlightPickerColor}
            onChange={(e) => {
              setHighlightPickerColor(e.target.value);
              if (formatting.highlightColor) {
                setFormatting(prev => ({ ...prev, highlightColor: e.target.value }));
                setStyleKey(k => k + 1);
              }
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded cursor-pointer border-0"
            title="Highlight Color"
          />
        </div>
        
        <div className="separator" />
        
        {/* Confirm / Cancel */}
        <button
          type="button"
          onClick={handleSave}
          className="text-green-600 hover:bg-green-50"
          title="Confirm (Enter)"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:bg-gray-100"
          title="Cancel (Escape)"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-red-500 hover:bg-red-50"
          title="Delete Text"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Contenteditable text area wrapped for reliable style updates */}
      <div
        className="existing-text-edit"
        style={{
          left: x * scale,
          top: y * scale,
          minWidth: width * scale,
          minHeight: height * scale,
          backgroundColor: formatting.highlightColor || "transparent",
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        >
          {text}
        </div>
      </div>
    </>
  );
}
