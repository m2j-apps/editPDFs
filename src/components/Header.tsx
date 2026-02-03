"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Blog */}
          <Link
            href="/blog"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Blog
          </Link>

          {/* Center - Logo */}
          <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2">
            <img src="/logo.png" alt="EditPDFs.app" className="h-10 md:h-12" />
          </Link>

          {/* Right - Privacy */}
          <div className="hidden sm:flex items-center text-sm text-gray-600">
            <span className="mr-2">🔒</span>
            Files never leave your browser
          </div>
        </div>
      </div>
    </header>
  );
}
