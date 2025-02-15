import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Fence } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Fence className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FenceCraft</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link to="/design" className="text-gray-600 hover:text-blue-600 transition-colors">
              Design Tool
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/services"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/design"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Design Tool
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/quote"
              className="block px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}