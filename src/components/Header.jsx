import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Header({ setIsPortalOpen, isLoggedIn }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/logo.jpeg" alt="Ali Group Logo" className="h-16 w-auto object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-700 hover:text-[#3478B4] font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-[#3478B4] font-medium transition-colors">Manuals</a>
            <a href="#" className="text-gray-700 hover:text-[#3478B4] font-medium transition-colors">Quick Fixes</a>
            <button 
              onClick={() => setIsPortalOpen(true)}
              className="bg-[#3478B4] hover:bg-[#286090] text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
            >
              <User size={18} />
              {isLoggedIn ? 'Client Portal' : 'Client Login'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={() => setIsPortalOpen(true)}
              className="text-[#3478B4] p-2"
            >
              <User size={24} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Home</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Manuals</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Quick Fixes</a>
            <button 
              onClick={() => {
                setIsPortalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 w-full bg-[#3478B4] text-white px-4 py-3 rounded-md font-medium flex justify-center items-center gap-2"
            >
              <User size={20} />
              {isLoggedIn ? 'Open Portal' : 'Client Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}