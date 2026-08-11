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
  }, [location.pathname, isScrolled, isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Commercial Cleaning', href: '/commercial' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const hasHeroBanner = isLocationHomePath(location.pathname);
  const useSolidHeader = !hasHeroBanner || isScrolled || isMobileMenuOpen;
  const useLightNav = hasHeroBanner && !isScrolled && !isMobileMenuOpen;

  const navTextClass = useLightNav
    ? 'text-paper hover:text-gold'
    : 'text-ink hover:text-gold';

  return (
    <header
      className={`fixed inset-x-0 top-0 w-full z-50 transition-colors duration-300 ${
        useSolidHeader
          ? 'border-b border-white/5 bg-navy/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div ref={headerRef}>
        {/* Top Bar */}
        <div
          className="border-b border-white/10 bg-[#134633] py-1.5 px-4 text-xs font-medium text-paper transition-colors duration-300 sm:py-2 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-3">
          <a
            href="mailto:info@thelaundryman.co.uk"
            className="flex items-center gap-2 hover:text-gold transition-colors"
            aria-label="Email info@thelaundryman.co.uk"
          >
            <Mail className="h-4 w-4 shrink-0 sm:h-3.5 sm:w-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span className="hidden leading-tight sm:inline">info@thelaundryman.co.uk</span>
          </a>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <span className="font-semibold sm:font-medium">Follow Us:</span>
            <div className="flex items-center gap-2 sm:gap-3">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label={social.label}
                >
                  <SocialIcon type={social.icon} className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="mx-auto max-w-7xl px-4 transition-all duration-300 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logo */}
            <Link
              to="/"
              className="flex w-10 shrink-0 items-center sm:w-11"
              onClick={() => window.scrollTo(0, 0)}
            >
              <SiteLogo />
            </Link>

            {/* Mobile brand — only when navbar has a solid background */}
            {useSolidHeader ? (
              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="group flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg px-1 py-0.5 text-center transition-opacity active:opacity-70 md:hidden"
                aria-label="The Laundry Man App home"
              >
                <span className="max-w-full truncate text-[0.6875rem] font-extrabold uppercase leading-none tracking-[0.14em] text-ink sm:text-xs">
                  The Laundry Man App
                </span>
                <span className="mt-1 max-w-full truncate text-[0.625rem] font-semibold leading-none tracking-wide text-[rgb(76,175,80)]">
                  Eco laundry &amp; dry cleaning
                </span>
              </Link>
            ) : (
              <div className="min-w-0 flex-1 md:hidden" aria-hidden="true" />
            )}

            {/* Desktop Nav */}
            <nav className="ml-auto hidden items-center space-x-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-semibold transition-colors uppercase tracking-wide text-xs ${navTextClass} ${
                    location.pathname === link.href ||
                    (location.pathname !== '/' &&
                      link.href !== '/' &&
                      location.pathname.startsWith(link.href))
                      ? '!text-gold'
                      : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <BookNowButton className="!px-6 !py-2.5 !text-xs" label="Book Now" />
            </nav>

            {/* Mobile: Menu — matched width to logo for balanced brand centering */}
            <div className="flex w-10 shrink-0 justify-end md:hidden sm:w-11">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${navTextClass} -mr-1 rounded-lg p-1 focus:outline-none`}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 shadow-xl absolute w-full left-0 right-0">
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
