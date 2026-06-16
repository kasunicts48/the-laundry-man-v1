import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Mail } from 'lucide-react';
import { footerSocialLinks } from '../data/footerContent';

function HeaderSocialIcon({ type }: { type: 'facebook' | 'tiktok' | 'instagram' }) {
  if (type === 'facebook') return <Facebook size={14} />;
  if (type === 'instagram') return <Instagram size={14} />;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.97-1.336-2.214-1.336-3.518V1h-3.077v13.327c0 1.605-1.303 2.9-2.908 2.9s-2.908-1.295-2.908-2.9 1.303-2.9 2.908-2.9c.307 0 .602.047.882.134V9.43a6.026 6.026 0 0 0-.882-.065c-3.233 0-5.852 2.619-5.852 5.852s2.619 5.852 5.852 5.852 5.852-2.619 5.852-5.852V8.687a8.182 8.182 0 0 0 4.773 1.527V7.135a5.093 5.093 0 0 1-2.154-.573z" />
    </svg>
  );
}

interface HeaderProps {
  onBookNow: () => void;
}

export default function Header({ onBookNow }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncHeaderHeight = () => {
      if (!headerRef.current) return;
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${headerRef.current.offsetHeight}px`
      );
    };

    syncHeaderHeight();
    requestAnimationFrame(syncHeaderHeight);

    window.addEventListener('resize', syncHeaderHeight);
    window.addEventListener('orientationchange', syncHeaderHeight);

    const observer = new ResizeObserver(syncHeaderHeight);
    if (headerRef.current) observer.observe(headerRef.current);

    return () => {
      window.removeEventListener('resize', syncHeaderHeight);
      window.removeEventListener('orientationchange', syncHeaderHeight);
      observer.disconnect();
    };
  }, [location.pathname, isScrolled]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Commercial Cleaning', href: '/commercial' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const heroRoutes = ['/', '/manchester', '/leeds', '/birmingham', '/sheffield', '/cheshire'];
  const hasHeroBanner = heroRoutes.includes(location.pathname);
  const useSolidHeader = !hasHeroBanner || isScrolled;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        useSolidHeader
          ? 'bg-navy/80 backdrop-blur-md border-white/5'
          : 'bg-transparent border-transparent py-2'
      }`}
    >
      <div ref={headerRef}>
        {/* Top Bar */}
        <div
          className={`text-ink border-b border-white/5 py-2 px-4 sm:px-6 lg:px-8 text-xs font-medium ${
            useSolidHeader ? '' : 'bg-navy'
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="mailto:info@thelaundryman.co.uk" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Mail size={14} />
            <span className="hidden sm:inline">info@thelaundryman.co.uk</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-ink">Follow Us:</span>
            {footerSocialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label={social.label}
              >
                <HeaderSocialIcon type={social.icon} />
              </a>
            ))}
          </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 py-4">
          <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-heading font-bold text-xl">
              LM
            </div>
            <span className={`font-heading font-extrabold text-2xl tracking-tight text-gold`}>
              The Laundry<br/><span className="text-ink font-light leading-none block -mt-1 tracking-wider uppercase text-[10px]">Man.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={`font-semibold transition-colors uppercase tracking-wide text-xs ${isScrolled ? 'text-ink hover:text-gold' : 'text-ink hover:text-gold'} ${(location.pathname === link.href || (location.pathname !== '/' && link.href !== '/' && location.pathname.startsWith(link.href))) ? '!text-gold' : ''}`}
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
              className="text-ink hover:text-gold focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur-md border-t border-white/10 shadow-xl absolute w-full">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-3 text-sm font-semibold uppercase tracking-wide rounded-lg ${location.pathname === link.href ? 'text-gold' : 'text-ink hover:text-gold hover:bg-white/5'}`}
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
