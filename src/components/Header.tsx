import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Mail } from 'lucide-react';

interface HeaderProps {
  onBookNow: () => void;
}

export default function Header({ onBookNow }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Commercial Cleaning', href: '/commercial' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-navy/80 backdrop-blur-md border-white/5 py-0' : 'bg-transparent border-transparent py-2'}`}>
      {/* Top Bar */}
      <div className="bg-navy text-slate border-b border-white/5 py-2 px-4 sm:px-6 lg:px-8 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="mailto:info@thelaundryman.co.uk" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Mail size={14} />
            <span className="hidden sm:inline">info@thelaundryman.co.uk</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="opacity-70">Follow Us:</span>
            <a href="#" className="hover:text-gold transition-colors"><Facebook size={14} /></a>
            <a href="#" className="hover:text-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors"><Instagram size={14} /></a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-4'}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-heading font-bold text-xl">
              LM
            </div>
            <span className={`font-heading font-extrabold text-2xl tracking-tight text-gold`}>
              The Laundry<br/><span className="text-slate font-light leading-none block -mt-1 tracking-wider uppercase text-[10px]">Man.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={`font-semibold transition-colors uppercase tracking-wide text-xs ${isScrolled ? 'text-slate opacity-70 hover:opacity-100 hover:text-gold' : 'text-white opacity-80 hover:opacity-100 hover:text-gold'} ${(location.pathname === link.href || (location.pathname !== '/' && link.href !== '/' && location.pathname.startsWith(link.href))) ? '!text-gold opacity-100' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={onBookNow}
              className="px-6 py-2.5 border border-gold text-gold pill hover:bg-gold hover:text-navy transition-all text-xs font-semibold uppercase tracking-wide cursor-pointer"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-slate' : 'text-white'} hover:text-gold focus:outline-none`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 shadow-xl absolute w-full">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-3 text-sm font-semibold uppercase tracking-wide rounded-lg ${location.pathname === link.href ? 'text-gold' : 'text-slate opacity-80 hover:text-gold hover:bg-white/5'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-3 flex flex-col items-center space-y-4">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookNow();
                }}
                className="border border-gold text-gold w-full py-3 px-6 pill hover:bg-gold hover:text-navy transition-all text-sm font-semibold uppercase tracking-wide text-center cursor-pointer"
              >
                Book a Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
