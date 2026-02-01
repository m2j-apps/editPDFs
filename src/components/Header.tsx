"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  { name: "Edit PDF", href: "/editor", icon: "✏️" },
  { name: "Sign PDF", href: "/sign-pdf", icon: "✍️" },
  { name: "Split PDF", href: "/split-pdf", icon: "✂️" },
  { name: "Compress PDF", href: "/compress-pdf", icon: "🗜️" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="EditPDFs.app" className="h-16 md:h-20" />
          </Link>

          {/* Desktop Navigation - Direct tool links */}
          <nav className="hidden md:flex items-center space-x-1">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                <span className="mr-1.5">{tool.icon}</span>
                {tool.name}
              </Link>
            ))}
          </nav>

          {/* Trust Badge */}
          <div className="hidden lg:flex items-center text-sm text-gray-600">
            <span className="mr-2">🔒</span>
            Files never leave your browser
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2">{tool.icon}</span>
                {tool.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
