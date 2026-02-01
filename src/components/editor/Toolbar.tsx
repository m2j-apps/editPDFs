"use client";

import { useState, useRef, useEffect } from "react";
import {
  MousePointer2,
  Type,
  Image,
  PenTool,
  Eraser,
  Edit3,
  Shapes,
  Undo2,
  Redo2,
  ChevronDown,
  Square,
  Circle,
  Minus,
  ArrowRight,
  Highlighter,
  Plus,
  Trash2,
  X,
  Check,
  Strikethrough,
  Underline,
  Eye,
  Search,
  PenLine,
} from "lucide-react";
import type { Tool, ShapeType } from "@/app/editor/page";

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onImageClick: () => void;
  onStampClick?: () => void;
  onNewSignature?: () => void;
  onNewInitials?: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onFindReplace?: () => void;
  textOptions: { fontSize: number; color: string };
  onTextOptionsChange: (options: { fontSize: number; color: string }) => void;
  shapeOptions: { shapeType: ShapeType; color: string; strokeWidth: number; fill: boolean; fillColor: string };
  onShapeOptionsChange: (options: { shapeType: ShapeType; color: string; strokeWidth: number; fill: boolean; fillColor: string }) => void;
  highlightColor: string;
  onHighlightColorChange: (color: string) => void;
  annotateColor: string;
  onAnnotateColorChange: (color: string) => void;
  savedSignatures?: string[];
  savedInitials?: string[];
  onUseSavedSignature?: (dataUrl: string) => void;
  onUseSavedInitials?: (dataUrl: string) => void;
  showAnnotations?: boolean;
  onToggleAnnotations?: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  align?: "left" | "center";
}

function Dropdown({ trigger, children, isOpen, onToggle, align = "left" }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative">
      <div onClick={onToggle}>{trigger}</div>
      {isOpen && (
        <div className={`absolute top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50 ${
          align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
        }`}>
          {children}
        </div>
      )}
    </div>
  );
}

function ColorPicker({ colors, selected, onSelect }: { colors: string[]; selected: string; onSelect: (color: string) => void }) {
  return (
    <div className="flex gap-1">
      {colors.map(color => (
        <button
          key={color}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(color);
          }}
          className={`w-5 h-5 rounded-full border-2 transition-transform ${
            selected === color ? "border-blue-500 scale-110" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function DropdownSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">{title}</div>
      {children}
    </div>
  );
}

function DropdownItem({ icon, label, onClick, isActive, rightContent }: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void; 
  isActive?: boolean;
  rightContent?: React.ReactNode;
}) {
  return (
    <button
      className={`flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-100 ${
        isActive ? "bg-blue-50 text-blue-600" : "text-gray-700"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {rightContent}
    </button>
  );
}

export default function Toolbar({
  activeTool,
  onToolChange,
  onImageClick,
  onStampClick,
  onNewSignature,
  onNewInitials,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onFindReplace,
  textOptions,
  onTextOptionsChange,
  shapeOptions,
  onShapeOptionsChange,
  highlightColor,
  onHighlightColorChange,
  annotateColor,
  onAnnotateColorChange,
  savedSignatures = [],
  savedInitials = [],
  onUseSavedSignature,
  onUseSavedInitials,
  showAnnotations = true,
  onToggleAnnotations,
}: ToolbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdown = () => setOpenDropdown(null);

  const annotateColors = ["#ff0000", "#ff8c00", "#ffff00", "#00ff00", "#00bfff", "#0000ff", "#800080"];
  const highlightColors = ["#ffff00", "#00ff00", "#00ffff", "#ff69b4", "#ffa500"];

  const toolButtonClass = (isActive: boolean, hasDropdown = false) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    } ${hasDropdown ? "pr-2" : ""}`;

  return (
    <div className="flex items-center gap-1 bg-white rounded-xl shadow-sm border border-gray-200 px-2 py-1.5">
      {/* Select Tool */}
      <button
        onClick={() => onToolChange("select")}
        className={toolButtonClass(activeTool === "select")}
        title="Select & Move"
      >
        <MousePointer2 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Text Tool with Dropdown */}
      <Dropdown
        isOpen={openDropdown === "text"}
        onToggle={() => { toggleDropdown("text"); onToolChange("text"); }}
        trigger={
          <button className={toolButtonClass(activeTool === "text" || activeTool === "symbol-x" || activeTool === "symbol-check" || activeTool === "symbol-bullet", true)}>
            <Type className="w-4 h-4" />
            <span>Text</span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>
        }
      >
        <DropdownSection title="Add Text and Symbols">
          <div className="flex items-center gap-2 px-3 py-2">
            <button
              onClick={() => { onToolChange("text"); closeDropdown(); }}
              className={`p-2 rounded hover:bg-gray-100 ${activeTool === "text" ? "bg-blue-100 text-blue-600" : ""}`}
              title="Add Text"
            >
              <Type className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button
              onClick={() => { onToolChange("symbol-x"); closeDropdown(); }}
              className={`p-2 rounded hover:bg-gray-100 ${activeTool === "symbol-x" ? "bg-blue-100 text-blue-600" : ""}`}
              title="X Mark"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => { onToolChange("symbol-check"); closeDropdown(); }}
              className={`p-2 rounded hover:bg-gray-100 ${activeTool === "symbol-check" ? "bg-blue-100 text-blue-600" : ""}`}
              title="Checkmark"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={() => { onToolChange("symbol-bullet"); closeDropdown(); }}
              className={`p-2 rounded hover:bg-gray-100 ${activeTool === "symbol-bullet" ? "bg-blue-100 text-blue-600" : ""}`}
              title="Bullet Point"
            >
              <span className="text-xl">•</span>
            </button>
          </div>
        </DropdownSection>
        <div className="border-t border-gray-100 my-1" />
        <div className="px-3 py-2">
          <label className="text-xs text-gray-500 block mb-1">Font Size</label>
          <select
            value={textOptions.fontSize}
            onChange={(e) => onTextOptionsChange({ ...textOptions, fontSize: Number(e.target.value) })}
            className="w-full px-2 py-1 rounded border border-gray-300 text-sm"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72].map(size => (
              <option key={size} value={size}>{size}px</option>
            ))}
          </select>
        </div>
        <div className="px-3 py-2">
          <label className="text-xs text-gray-500 block mb-1">Color</label>
          <input
            type="color"
            value={textOptions.color}
            onChange={(e) => onTextOptionsChange({ ...textOptions, color: e.target.value })}
            className="w-full h-8 rounded cursor-pointer border-0"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
      </Dropdown>

      {/* Images Tool with Dropdown */}
      <Dropdown
        isOpen={openDropdown === "images"}
        onToggle={() => toggleDropdown("images")}
        trigger={
          <button className={toolButtonClass(activeTool === "image", true)}>
            <Image className="w-4 h-4" />
            <span>Images</span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>
        }
      >
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-blue-600 hover:bg-gray-100"
          onClick={() => { onImageClick(); closeDropdown(); }}
        >
          <Plus className="w-4 h-4" />
          <span>New Image</span>
        </button>
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          onClick={() => { onToolChange("delete-image"); closeDropdown(); }}
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Existing Image</span>
        </button>
      </Dropdown>

      {/* Sign Tool with Dropdown */}
      <Dropdown
        isOpen={openDropdown === "sign"}
        onToggle={() => toggleDropdown("sign")}
        trigger={
          <button className={toolButtonClass(activeTool === "sign" || activeTool === "initials", true)}>
            <PenTool className="w-4 h-4" />
            <span>Sign</span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>
        }
      >
        {/* Saved signatures */}
        {savedSignatures.length > 0 && (
          <>
            <DropdownSection title="Your Signatures">
              <div className="px-3 py-1 space-y-1">
                {savedSignatures.map((sig, i) => (
                  <button
                    key={`sig-${i}`}
                    className="w-full p-2 border border-gray-200 rounded hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    onClick={() => { 
                      onUseSavedSignature?.(sig);
                      closeDropdown(); 
                    }}
                    title="Click to place signature"
                  >
                    <img src={sig} alt={`Signature ${i + 1}`} className="h-10 object-contain mx-auto" />
                  </button>
                ))}
              </div>
            </DropdownSection>
            <div className="border-t border-gray-100 my-1" />
          </>
        )}
        {/* Saved initials */}
        {savedInitials.length > 0 && (
          <>
            <DropdownSection title="Your Initials">
              <div className="px-3 py-1 space-y-1">
                {savedInitials.map((init, i) => (
                  <button
                    key={`init-${i}`}
                    className="w-full p-2 border border-gray-200 rounded hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    onClick={() => { 
                      onUseSavedInitials?.(init);
                      closeDropdown(); 
                    }}
                    title="Click to place initials"
                  >
                    <img src={init} alt={`Initials ${i + 1}`} className="h-8 object-contain mx-auto" />
                  </button>
                ))}
              </div>
            </DropdownSection>
            <div className="border-t border-gray-100 my-1" />
          </>
        )}
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-blue-600 hover:bg-gray-100"
          onClick={() => { onToolChange("sign"); closeDropdown(); }}
        >
          <Plus className="w-4 h-4" />
          <span>New Signature</span>
        </button>
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-blue-600 hover:bg-gray-100"
          onClick={() => { onToolChange("initials"); closeDropdown(); }}
        >
          <Plus className="w-4 h-4" />
          <span>New Initials</span>
        </button>
      </Dropdown>

      {/* Whiteout Tool */}
      <button
        onClick={() => onToolChange("whiteout")}
        className={toolButtonClass(activeTool === "whiteout")}
        title="Whiteout"
      >
        <Eraser className="w-4 h-4" />
        <span>Whiteout</span>
      </button>

      {/* Annotate Tool with Dropdown */}
      <Dropdown
        isOpen={openDropdown === "annotate"}
        onToggle={() => toggleDropdown("annotate")}
        trigger={
          <button className={toolButtonClass(
            ["draw", "freehand-highlight"].includes(activeTool),
            true
          )}>
            <Edit3 className="w-4 h-4" />
            <span>Annotate</span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>
        }
      >
        <DropdownItem
          icon={<Eye className="w-4 h-4" />}
          label={showAnnotations ? "Hide Annotations" : "Show Annotations"}
          onClick={() => { onToggleAnnotations?.(); closeDropdown(); }}
          isActive={showAnnotations}
        />
        <div className="border-t border-gray-100 my-1" />
        <DropdownSection title="Freehand">
          <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100">
            <button
              className={`flex items-center gap-2 text-sm ${activeTool === "freehand-highlight" ? "text-blue-600" : "text-gray-700"}`}
              onClick={() => { onToolChange("freehand-highlight"); closeDropdown(); }}
            >
              <Highlighter className="w-4 h-4" />
              <span>Highlight</span>
            </button>
            <ColorPicker colors={highlightColors} selected={highlightColor} onSelect={onHighlightColorChange} />
          </div>
          <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100">
            <button
              className={`flex items-center gap-2 text-sm ${activeTool === "draw" ? "text-blue-600" : "text-gray-700"}`}
              onClick={() => { onToolChange("draw"); closeDropdown(); }}
            >
              <PenLine className="w-4 h-4" />
              <span>Draw</span>
            </button>
            <ColorPicker colors={annotateColors} selected={annotateColor} onSelect={onAnnotateColorChange} />
          </div>
        </DropdownSection>
      </Dropdown>

      {/* Shapes Tool with Dropdown */}
      <Dropdown
        isOpen={openDropdown === "shapes"}
        onToggle={() => toggleDropdown("shapes")}
        trigger={
          <button className={toolButtonClass(activeTool === "shape", true)}>
            <Shapes className="w-4 h-4" />
            <span>Shapes</span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>
        }
      >
        <DropdownItem
          icon={<Circle className="w-4 h-4" />}
          label="Ellipse"
          onClick={() => {
            onShapeOptionsChange({ ...shapeOptions, shapeType: "circle" });
            onToolChange("shape");
            closeDropdown();
          }}
          isActive={shapeOptions.shapeType === "circle"}
        />
        <DropdownItem
          icon={<Square className="w-4 h-4" />}
          label="Rectangle"
          onClick={() => {
            onShapeOptionsChange({ ...shapeOptions, shapeType: "rectangle" });
            onToolChange("shape");
            closeDropdown();
          }}
          isActive={shapeOptions.shapeType === "rectangle"}
        />
        <DropdownItem
          icon={<Minus className="w-4 h-4" />}
          label="Line"
          onClick={() => {
            onShapeOptionsChange({ ...shapeOptions, shapeType: "line" });
            onToolChange("shape");
            closeDropdown();
          }}
          isActive={shapeOptions.shapeType === "line"}
        />
        <DropdownItem
          icon={<ArrowRight className="w-4 h-4" />}
          label="Arrow"
          onClick={() => {
            onShapeOptionsChange({ ...shapeOptions, shapeType: "arrow" });
            onToolChange("shape");
            closeDropdown();
          }}
          isActive={shapeOptions.shapeType === "arrow"}
        />
        <div className="border-t border-gray-100 my-1" />
        <div className="px-3 py-2">
          <label className="text-xs text-gray-500 block mb-1">Color</label>
          <input
            type="color"
            value={shapeOptions.color}
            onChange={(e) => onShapeOptionsChange({ ...shapeOptions, color: e.target.value })}
            className="w-full h-8 rounded cursor-pointer border-0"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
        <div className="px-3 py-2">
          <label className="text-xs text-gray-500 block mb-1">Stroke Width</label>
          <select
            value={shapeOptions.strokeWidth}
            onChange={(e) => onShapeOptionsChange({ ...shapeOptions, strokeWidth: Number(e.target.value) })}
            className="w-full px-2 py-1 rounded border border-gray-300 text-sm"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map(w => (
              <option key={w} value={w}>{w}px</option>
            ))}
          </select>
        </div>
        <div className="border-t border-gray-100 my-1" />
        <div className="px-3 py-2">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={shapeOptions.fill}
              onChange={(e) => {
                e.stopPropagation();
                onShapeOptionsChange({ ...shapeOptions, fill: e.target.checked });
              }}
              className="rounded border-gray-300"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
            Fill Shape
          </label>
        </div>
        {shapeOptions.fill && (
          <div className="px-3 py-2">
            <label className="text-xs text-gray-500 block mb-1">Fill Color</label>
            <input
              type="color"
              value={shapeOptions.fillColor}
              onChange={(e) => onShapeOptionsChange({ ...shapeOptions, fillColor: e.target.value })}
              className="w-full h-8 rounded cursor-pointer border-0"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </Dropdown>

      <div className="w-px h-6 bg-gray-200 mx-1" />

      {/* Find & Replace */}
      <button
        onClick={onFindReplace}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
        title="Find & Replace"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Undo/Redo */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`flex items-center gap-1.5 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
          canUndo ? "text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"
        }`}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`flex items-center gap-1.5 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
          canRedo ? "text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"
        }`}
        title="Redo (Ctrl+Y)"
      >
        <Redo2 className="w-4 h-4" />
      </button>
    </div>
  );
}
