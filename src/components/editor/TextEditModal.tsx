"use client";

import { useState } from "react";

interface TextEditModalProps {
  onClose: () => void;
  onSave: (text: string, fontSize: number, color: string) => void;
  initialText?: string;
  initialFontSize?: number;
  initialColor?: string;
}

export default function TextEditModal({
  onClose,
  onSave,
  initialText = "",
  initialFontSize = 16,
  initialColor = "#000000",
}: TextEditModalProps) {
  const [text, setText] = useState(initialText);
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [color, setColor] = useState(initialColor);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text, fontSize, color);
    }
  };

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72];
  const colors = [
    "#000000", "#333333", "#666666", "#999999",
    "#dc2626", "#ea580c", "#ca8a04", "#16a34a",
    "#0284c7", "#7c3aed", "#c026d3", "#e11d48",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Text</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          {/* Text input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              rows={3}
              autoFocus
            />
          </div>

          {/* Font size */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <div className="flex items-center space-x-2">
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500"
                min={6}
                max={200}
              />
            </div>
          </div>

          {/* Color picker */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center space-x-2">
              <div className="flex flex-wrap gap-1">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      color === c ? "border-blue-500 scale-110" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg min-h-[60px]">
            <p style={{ fontSize: `${fontSize}px`, color }}>
              {text || "Preview text..."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              Add Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
