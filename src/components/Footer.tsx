import React from 'react';
import { Link } from 'react-router-dom';
import {
  footerServices,
  footerQuickLinksCol1,
  footerQuickLinksCol2,
  footerExploreLinks,
  footerUkCities,
  footerSocialLinks,
  resolveFooterUkCityHref,
  type FooterLink,
} from '../data/footerContent';
import { SocialIcon } from './SocialIcon';

const linkClassName =
  'text-sm font-light leading-relaxed text-paper/90 transition-colors duration-300 hover:text-gold';

function FooterSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-6 border-b border-paper/10 pb-3 text-sm font-semibold tracking-wide text-gold">
      {children}
    </h4>
  );
}

function isStaticPageHref(href: string): boolean {
  return href.endsWith('.html') || href === '/locations' || href.startsWith('/locations?');
}

function FooterNavLink({ label, href }: FooterLink) {
  if (href.includes('#')) {
    return (
      <a href={href} className={linkClassName}>
        {label}
      </a>
    );
  }

  if (isStaticPageHref(href)) {
    return (
      <a href={href} className={linkClassName}>
        {label}
      </a>
    );
  }

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} className={linkClassName}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={linkClassName}>
      {label}
    </a>
  );
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <FooterNavLink {...link} />
        </li>
      ))}
    </ul>
  );
}

function FooterSocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {footerSocialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-paper shadow-sm transition-opacity hover:opacity-90 ${social.className}`}
        >
          <SocialIcon type={social.icon} size={18} onDark />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-black/5 bg-slate text-paper transition-colors duration-500"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-16 sm:px-6 md:pb-10 lg:px-8 lg:pt-24">
        <div className="grid w-full grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <div className="min-w-0 lg:col-span-4">
            <FooterSectionHeading>Services</FooterSectionHeading>
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <FooterLinkList links={footerServices.slice(0, Math.ceil(footerServices.length / 2))} />
              <FooterLinkList links={footerServices.slice(Math.ceil(footerServices.length / 2))} />
            </div>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <FooterSectionHeading>Explore</FooterSectionHeading>
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <FooterLinkList
                links={footerExploreLinks.slice(0, Math.ceil(footerExploreLinks.length / 2))}
              />
              <FooterLinkList
                links={footerExploreLinks.slice(Math.ceil(footerExploreLinks.length / 2))}
              />
            </div>
          </div>

          <div className="min-w-0 md:col-span-2 lg:col-span-5">
            <FooterSectionHeading>Quick Links</FooterSectionHeading>
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <FooterLinkList links={footerQuickLinksCol1} />
              <div className="flex flex-col">
                <FooterLinkList links={footerQuickLinksCol2} />
                <div className="mt-6 hidden flex-wrap items-center gap-4 md:flex sm:mt-8">
                  <span className="text-sm font-light text-paper/90">Social media</span>
                  <FooterSocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="locations" className="mt-8 scroll-mt-28 pt-4">
          <div>
            <FooterSectionHeading>The Laundry Man App UK</FooterSectionHeading>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {footerUkCities.map((city) => (
                <li key={city}>
                  <Link
                    to={resolveFooterUkCityHref(city)}
                    className="block rounded-lg border border-paper/15 bg-paper/5 px-4 py-2.5 text-center text-sm font-light text-paper/90 transition-colors duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/10 pt-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs font-medium text-paper/90">
              © 2026 The Laundry Man App. All Rights Reserved.
            </p>
            <nav
              className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs font-light text-paper/90 sm:justify-end"
              aria-label="Footer legal and attribution links"
            >
              <a
                href="https://www.flaticon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-gold"
              >
                Icons by Flaticon
              </a>
              <span className="text-paper/40" aria-hidden="true">
                ·
              </span>
              <Link to="/privacy-policy" className="transition-colors duration-300 hover:text-gold">
                Privacy Policy
              </Link>
              <span className="text-paper/40" aria-hidden="true">
                ·
              </span>
              <Link to="/terms-conditions" className="transition-colors duration-300 hover:text-gold">
                Terms of Service
              </Link>
            </nav>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 md:hidden">
            <span className="text-xs font-light text-paper/90">Follow us</span>
            <FooterSocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
