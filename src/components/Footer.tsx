import React from 'react';
import { Link } from 'react-router-dom';
import {
  footerServices,
  footerOperatingHours,
  footerQuickLinksCol1,
  footerQuickLinksCol2,
  footerLondonRegions,
  footerUkCitiesCol1,
  footerUkCitiesCol2,
  footerSocialLinks,
  resolveCityHref,
  type FooterLink,
  type FooterServiceLink,
} from '../data/footerContent';

const linkClassName =
  'text-sm text-slate/80 font-light hover:text-gold transition-colors duration-300 leading-relaxed';

function FooterSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold pb-3 mb-6 border-b border-white/5">
      {children}
    </h4>
  );
}

function FooterNavLink({ label, href }: FooterLink) {
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

function FooterServiceLink({ label, href, serviceId }: FooterServiceLink) {
  return (
    <Link
      to={href}
      state={{ autoOpenBooking: true, serviceType: serviceId }}
      className={linkClassName}
    >
      {label}
    </Link>
  );
}

function FooterServiceLinkList({ links }: { links: FooterServiceLink[] }) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.serviceId}>
          <FooterServiceLink {...link} />
        </li>
      ))}
    </ul>
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

function SocialIcon({ type }: { type: 'facebook' | 'tiktok' | 'instagram' }) {
  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
        <path d="M13.5 8.5H16V5.5H13.5C11.01 5.5 9 7.51 9 10V12H6.5V15H9V22H12V15H15L15.5 12H12V10C12 9.17 12.67 8.5 13.5 8.5Z" />
      </svg>
    );
  }

  if (type === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
        <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.97-1.336-2.214-1.336-3.518V1h-3.077v13.327c0 1.605-1.303 2.9-2.908 2.9s-2.908-1.295-2.908-2.9 1.303-2.9 2.908-2.9c.307 0 .602.047.882.134V9.43a6.026 6.026 0 0 0-.882-.065c-3.233 0-5.852 2.619-5.852 5.852s2.619 5.852 5.852 5.852 5.852-2.619 5.852-5.852V8.687a8.182 8.182 0 0 0 4.773 1.527V7.135a5.093 5.093 0 0 1-2.154-.573z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
      <path d="M7 3C5.34 3 4 4.34 4 6V18C4 19.66 5.34 21 7 21H17C18.66 21 20 19.66 20 18V6C20 4.34 18.66 3 17 3H7ZM12 7.5C13.93 7.5 15.5 9.07 15.5 11C15.5 12.93 13.93 14.5 12 14.5C10.07 14.5 8.5 12.93 8.5 11C8.5 9.07 10.07 7.5 12 7.5ZM12 13C13.1 13 14 12.1 14 11C14 9.9 13.1 9 12 9C10.9 9 10 9.9 10 11C10 12.1 10.9 13 12 13ZM17 8.25C17.41 8.25 17.75 7.91 17.75 7.5C17.75 7.09 17.41 6.75 17 6.75C16.59 6.75 16.25 7.09 16.25 7.5C16.25 7.91 16.59 8.25 17 8.25Z" />
    </svg>
  );
}

function AreaList({ areas }: { areas: string[] }) {
  return (
    <ul className="space-y-2.5">
      {areas.map((area) => {
        const href = resolveCityHref(area);

        return (
          <li key={area}>
            {href === '#' ? (
              <span className={linkClassName}>{area}</span>
            ) : (
              <Link to={href} className={linkClassName}>
                {area}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function UkCityList({ cities }: { cities: string[] }) {
  return (
    <ul className="space-y-2.5">
      {cities.map((city) => {
        const href = resolveCityHref(city);

        return (
          <li key={city}>
            {href === '#' ? (
              <span className={linkClassName}>{city}</span>
            ) : (
              <Link to={href} className={linkClassName}>
                {city}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy-alt text-slate border-t border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 lg:pt-24">
        {/* Upper section — 4 equal columns on large screens */}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-12 xl:gap-x-16 items-start">
          {/* Column 1: Services */}
          <div className="min-w-0">
            <FooterSectionHeading>Services</FooterSectionHeading>
            <FooterServiceLinkList links={footerServices} />
          </div>

          {/* Column 2: Operating hours */}
          <div className="min-w-0">
            <FooterSectionHeading>Operating Hours</FooterSectionHeading>
            <ul className="space-y-2.5">
              {footerOperatingHours.map(({ day, hours }) => (
                <li key={day} className="flex items-baseline justify-between gap-4 text-sm font-light">
                  <span className="text-slate/80">{day}</span>
                  <span className="text-slate/60 shrink-0 tabular-nums">{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick links (sub-column 1) */}
          <div className="min-w-0">
            <FooterSectionHeading>Quick Links</FooterSectionHeading>
            <FooterLinkList links={footerQuickLinksCol1} />
          </div>

          {/* Column 4: Quick links (sub-column 2) + social media */}
          <div className="min-w-0 flex flex-col">
            <div
              className="hidden md:block pb-3 mb-6 border-b border-white/5"
              aria-hidden="true"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 select-none pointer-events-none">
                Quick Links
              </span>
            </div>
            <FooterLinkList links={footerQuickLinksCol2} />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-sm text-slate/80 font-light">Social media</span>
              <div className="flex items-center gap-3">
                {footerSocialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate/70 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
                  >
                    <SocialIcon type={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lower section */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-x-8 xl:gap-y-12 items-start">
            {/* London */}
            <div className="xl:col-span-8">
              <FooterSectionHeading>The Laundry Man App London</FooterSectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {footerLondonRegions.map((region) => (
                  <div key={region.name}>
                    <p className="text-sm font-bold text-white mb-2">{region.name}</p>
                    <AreaList areas={region.areas} />
                  </div>
                ))}
              </div>
            </div>

            {/* UK */}
            <div className="xl:col-span-4">
              <FooterSectionHeading>The Laundry Man App UK</FooterSectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                <UkCityList cities={footerUkCitiesCol1} />
                <UkCityList cities={footerUkCitiesCol2} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate/50 font-medium text-left">
            © 2026 The Laundry Man App Ltd. All Rights Reserved.
          </p>
          <nav
            className="flex flex-wrap items-center justify-start sm:justify-end gap-x-2 gap-y-2 text-xs text-slate/50 font-light"
            aria-label="Footer legal and attribution links"
          >
            <a
              href="https://www.flaticon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300"
            >
              Icons by Flaticon
            </a>
            <span className="text-slate/30" aria-hidden="true">
              ·
            </span>
            <Link
              to="/privacy-policy"
              className="hover:text-gold transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="text-slate/30" aria-hidden="true">
              ·
            </span>
            <Link
              to="/terms-conditions"
              className="hover:text-gold transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
