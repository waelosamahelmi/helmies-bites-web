import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Helmies Bites</h3>
            <p className="text-sm">
              Launch your restaurant website in 5 minutes with AI-powered setup.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><a href="#" className="hover:text-white">Examples</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © 2025 Helmies Bites. All rights reserved.
          </p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="mailto:info@helmiesbites.fi" className="hover:text-white">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
