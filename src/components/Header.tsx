"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  { name: "Sign PDF", href: "/sign-pdf", icon: "✍️" },
  { name: "Merge PDF", href: "/merge-pdf", icon: "📎" },
  { name: "Split PDF", href: "/split-pdf", icon: "✂️" },
  { name: "Compress PDF", href: "/compress-pdf", icon: "🗜️" },
  { name: "Rotate PDF", href: "/rotate-pdf", icon: "🔄" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📄</span>
            <span className="font-bold text-xl text-gray-900">EditPDFs</span>
            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              FREE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                Tools ▾
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="mr-2">{tool.icon}</span>
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/about"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              About
            </Link>
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
            <Link
              href="/about"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
