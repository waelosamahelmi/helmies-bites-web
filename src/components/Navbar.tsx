import { Link } from 'react-router-dom';
import { Utensils, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Helmies Bites</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link to="/get-started" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                to="/features"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/get-started"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
