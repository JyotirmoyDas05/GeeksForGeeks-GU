"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="nav-logo">
              <span className="text-xl font-bold text-green-600 dark:text-green-400 font-fraunces drop-shadow-sm">
                GFG GU
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="nav-links flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wide drop-shadow-sm"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wide drop-shadow-sm"
              >
                About
              </Link>
              <Link 
                href="/events" 
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wide drop-shadow-sm"
              >
                Events
              </Link>
              <Link 
                href="/members" 
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wide drop-shadow-sm"
              >
                Members
              </Link>
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 focus:outline-none focus:text-green-600 dark:focus:text-green-400 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-800/50">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/events"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/members"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Members
              </Link>
            
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
