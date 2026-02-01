"use client";

import { useState } from "react";
import { X, Search, Replace, ChevronDown, ChevronUp } from "lucide-react";

interface FindReplaceModalProps {
  onClose: () => void;
  onFind: (text: string, options: FindOptions) => void;
  onReplace: (find: string, replace: string, options: FindOptions) => void;
  onReplaceAll: (find: string, replace: string, options: FindOptions) => void;
  matchCount?: number;
  currentMatch?: number;
  onNextMatch?: () => void;
  onPrevMatch?: () => void;
}

interface FindOptions {
  caseSensitive: boolean;
  wholeWord: boolean;
}

export default function FindReplaceModal({
  onClose,
  onFind,
  onReplace,
  onReplaceAll,
  matchCount = 0,
  currentMatch = 0,
  onNextMatch,
  onPrevMatch,
}: FindReplaceModalProps) {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [showReplace, setShowReplace] = useState(false);

  const options: FindOptions = { caseSensitive, wholeWord };

  const handleFind = () => {
    if (findText.trim()) {
      onFind(findText, options);
    }
  };

  const handleReplace = () => {
    if (findText.trim()) {
      onReplace(findText, replaceText, options);
    }
  };

  const handleReplaceAll = () => {
    if (findText.trim()) {
      onReplaceAll(findText, replaceText, options);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[420px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold text-gray-800">Find & Replace</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Find input */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Find</label>
            <div className="relative">
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFind()}
                placeholder="Enter text to find..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {matchCount > 0 && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="text-sm text-gray-500">{currentMatch}/{matchCount}</span>
                  <button
                    onClick={onPrevMatch}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onNextMatch}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Replace section (collapsible) */}
          <div>
            <button
              onClick={() => setShowReplace(!showReplace)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              {showReplace ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <Replace className="w-4 h-4" />
              <span>Replace</span>
            </button>
            
            {showReplace && (
              <div className="mt-2">
                <input
                  type="text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  placeholder="Replace with..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span>Case sensitive</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={wholeWord}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span>Whole word</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          {showReplace && (
            <>
              <button
                onClick={handleReplace}
                disabled={!findText.trim()}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Replace
              </button>
              <button
                onClick={handleReplaceAll}
                disabled={!findText.trim()}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Replace All
              </button>
            </>
          )}
          <button
            onClick={handleFind}
            disabled={!findText.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
}
