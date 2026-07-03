import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';
import { footerSocialLinks } from '../data/footerContent';
import { isLocationHomePath } from '../data/locations';
import BookNowButton from './BookNowButton';
import SiteLogo from './SiteLogo';
import { SocialIcon } from './SocialIcon';

interface HeaderProps {
  onBookNow?: () => void;
}

export default function Header(_props: HeaderProps = {}) {
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

  const hasHeroBanner = isLocationHomePath(location.pathname);
  const useSolidHeader = !hasHeroBanner || isScrolled;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        useSolidHeader
          ? 'bg-navy/80 backdrop-blur-md border-white/5'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div ref={headerRef}>
        {/* Top Bar */}
        <div
          className={`text-ink border-b border-white/5 py-3 px-4 sm:py-2 sm:px-6 lg:px-8 text-sm sm:text-xs font-medium ${
            useSolidHeader ? '' : 'bg-navy'
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-3">
          <a
            href="mailto:info@thelaundryman.co.uk"
            className="flex min-h-10 items-center gap-2.5 hover:text-gold transition-colors sm:min-h-0"
            aria-label="Email info@thelaundryman.co.uk"
          >
            <Mail className="h-5 w-5 shrink-0 sm:h-3.5 sm:w-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span className="hidden text-sm leading-tight sm:inline sm:text-xs">info@thelaundryman.co.uk</span>
          </a>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <span className="text-sm font-semibold sm:text-xs sm:font-medium">Follow Us:</span>
            <div className="flex items-center gap-0.5 sm:gap-3">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center hover:text-gold transition-colors sm:h-auto sm:w-auto"
                  aria-label={social.label}
                >
                  <SocialIcon type={social.icon} className="h-5 w-5 sm:h-3.5 sm:w-3.5" />
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 py-4">
          <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <SiteLogo />
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
            <BookNowButton className="!px-6 !py-2.5 !text-xs" label="Book Now" />
          </nav>

          {/* Mobile: Menu */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-ink hover:text-gold focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
            <div className="pt-4 pb-2 px-3">
              <BookNowButton fullWidth label="Book Now" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
