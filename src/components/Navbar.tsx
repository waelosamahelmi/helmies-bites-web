import { useLocation } from 'react-router-dom';
import { Menu, X, Rocket, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled
          ? 'bg-[#0D0907]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-[#FF7A00] to-[#CC6200] overflow-hidden">
                <img src="/b.svg" alt="Helmies Bites" className="h-8 w-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF7A00] rounded-full border-2 border-[#0D0907] animate-pulse" />
            </div>
            <span
              className="font-black text-2xl tracking-tight"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <span className="gradient-text">Helmies</span>
              <span className="text-white">Bites</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`font-semibold text-sm tracking-wide transition-all duration-300 relative group ${isActive(link.path)
                    ? 'text-[#FF7A00]'
                    : 'text-white/70 hover:text-white'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#FF7A00] transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
              </a>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20">
              <Rocket className="h-4 w-4 text-[#FF7A00]" />
              <span className="text-sm font-bold text-[#FF7A00]">Launching Mar 5</span>
            </div>
            <a
              href="https://plateos.fi/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#FF7A00] text-white text-sm font-bold hover:bg-[#CC6200] transition-all duration-300 hover:scale-105"
            >
              Try Demo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-white/10 hover:border-[#FF7A00]/30 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/5">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isActive(link.path)
                      ? 'bg-[#FF7A00]/10 text-[#FF7A00]'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="mx-6 mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/20">
                <Rocket className="h-4 w-4 text-[#FF7A00]" />
                <span className="text-sm font-bold text-[#FF7A00]">Launching March 5th</span>
              </div>
              <a
                href="https://plateos.fi/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-6 mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF7A00] text-white text-sm font-bold hover:bg-[#CC6200] transition-all duration-300"
              >
                Try Demo
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
