import React from 'react';
import { Link } from 'react-router-dom';
import {
  footerServices,
  footerQuickLinksCol1,
  footerQuickLinksCol2,
  footerExploreLinks,
  footerLondonAreaColumns,
  footerManchesterAreaColumns,
  footerSocialLinks,
  resolveCityHref,
  type FooterLink,
} from '../data/footerContent';
import { SocialIcon } from './SocialIcon';

const linkClassName =
  'text-sm text-paper/90 font-light hover:text-[rgb(76,175,80)] transition-colors duration-300 leading-relaxed';

function FooterSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[10px] uppercase tracking-widest text-[rgb(76,175,80)] font-bold pb-3 mb-6 border-b border-paper/10">
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
          className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 bg-paper/10 text-paper hover:border-[rgb(76,175,80)]/40 hover:bg-[rgb(76,175,80)]/15 hover:text-[rgb(76,175,80)] transition-all duration-300"
        >
          <SocialIcon type={social.icon} size={18} />
        </a>
      ))}
    </div>
  );
}

function AreaList({ areas }: { areas: string[] }) {
  return (
    <ul className="space-y-2.5">
      {areas.map((area) => (
        <li key={area}>
          <Link to={resolveCityHref(area)} className={linkClassName}>
            {area}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[#134633] text-paper border-t border-paper/10 transition-colors duration-500">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:pb-10 lg:pt-24">
        <div className="grid w-full grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 items-start">
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
              <FooterLinkList links={footerExploreLinks.slice(0, Math.ceil(footerExploreLinks.length / 2))} />
              <FooterLinkList links={footerExploreLinks.slice(Math.ceil(footerExploreLinks.length / 2))} />
            </div>
          </div>

          <div className="min-w-0 md:col-span-2 lg:col-span-5">
            <FooterSectionHeading>Quick Links</FooterSectionHeading>
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <FooterLinkList links={footerQuickLinksCol1} />
              <div className="flex flex-col">
                <FooterLinkList links={footerQuickLinksCol2} />
                <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                  <span className="text-sm font-light text-paper/90">Social media</span>
                  <FooterSocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower section — locations */}
        <div id="locations" className="mt-8 scroll-mt-28 pt-4">
          <div className="space-y-12">
            <div>
              <FooterSectionHeading>The Laundry Man App London</FooterSectionHeading>
              <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-4 sm:gap-x-6 lg:gap-x-8 gap-y-2.5">
                {footerLondonAreaColumns.map((column, index) => (
                  <AreaList key={index} areas={column} />
                ))}
              </div>
            </div>

            <div>
              <FooterSectionHeading>The Laundry Man App Manchester</FooterSectionHeading>
              <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4 sm:gap-x-8 gap-y-2.5">
                {footerManchesterAreaColumns.map((column, index) => (
                  <AreaList key={index} areas={column} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/10 pt-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs font-medium text-paper/80">
              © 2026 The Laundry Man App. All Rights Reserved.
            </p>
            <nav
              className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs font-light text-paper/80 sm:justify-end"
              aria-label="Footer legal and attribution links"
            >
              <a
                href="https://www.flaticon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[rgb(76,175,80)] transition-colors duration-300"
              >
                Icons by Flaticon
              </a>
              <span className="text-paper/40" aria-hidden="true">
                ·
              </span>
              <Link
                to="/privacy-policy"
                className="hover:text-[rgb(76,175,80)] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="text-paper/40" aria-hidden="true">
                ·
              </span>
              <Link
                to="/terms-conditions"
                className="hover:text-[rgb(76,175,80)] transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </nav>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 md:hidden">
            <span className="text-xs font-light text-paper/80">Follow us</span>
            <FooterSocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
