"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tools = [
    { icon: "✏️", name: "Edit PDF", desc: "Add text, images & annotations" },
    { icon: "✍️", name: "Sign PDF", desc: "Draw or type your signature" },
    { icon: "📝", name: "Add Text", desc: "Insert text anywhere on PDF" },
    { icon: "🖼️", name: "Add Images", desc: "Insert photos, logos & stamps" },
    { icon: "📑", name: "Manage Pages", desc: "Reorder, rotate & delete pages" },
    { icon: "🖍️", name: "Highlight PDF", desc: "Highlight & annotate content" },
    { icon: "⬜", name: "Whiteout", desc: "Redact sensitive information" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="EditPDFs.app" className="h-10 md:h-12" />
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                Tools
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href="/"
                      onClick={() => setToolsOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-xl mr-3">{tool.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                        <div className="text-xs text-gray-500">{tool.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Link
              href="/blog"
              className="md:hidden text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Blog
            </Link>
            <div className="hidden sm:flex items-center text-sm text-gray-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <span className="mr-2">🔒</span>
              <span className="text-green-700 font-medium">100% Private</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
