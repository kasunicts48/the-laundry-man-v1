import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderSocialIcon } from './social-icons.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ukLocations = JSON.parse(
  readFileSync(path.join(__dirname, '../src/data/ukLocations.json'), 'utf8')
);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toLocationSlug(area) {
  return area
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

const SLUG_ALIASES = {
  'manchester city centre': 'manchester',
  'manchester-city-centre': 'manchester',
};

function resolveLocationHref(area) {
  const trimmed = area.toLowerCase().trim();
  const slug =
    SLUG_ALIASES[trimmed] ?? SLUG_ALIASES[toLocationSlug(area)] ?? toLocationSlug(area);
  return `/${slug}`;
}

const footerServices = [
  { label: 'Laundry', href: '/services' },
  { label: 'Wash & Fold', href: '/booking.html' },
  { label: 'Dry Cleaning', href: '/booking.html' },
  { label: 'Dry Cleaners', href: '/services' },
  { label: 'Ironing Service', href: '/booking.html' },
  { label: 'Shirt Service', href: '/booking.html' },
  { label: 'Curtain Cleaning', href: '/booking.html' },
  { label: 'Wedding Dress Cleaning', href: '/booking.html' },
  { label: 'Airbnb Laundry', href: '/commercial' },
  { label: 'Hotel Laundry', href: '/commercial' },
  { label: 'Commercial Laundry', href: '/commercial' },
  { label: 'Express Laundry', href: '/booking.html' },
  { label: 'Laundry Near Me', href: '/locations' },
  { label: 'Dry Cleaners Near Me', href: '/locations' },
];

const footerQuickLinksCol1 = [
  { label: 'About us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Commercial Cleaning', href: '/commercial' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book a Collection', href: '/booking.html' },
];

const footerExploreLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Why Choose Us', href: '/#why-choose-us' },
  { label: 'Prices & Services', href: '/services' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Locations', href: '/locations' },
];

const footerQuickLinksCol2 = [
  { label: 'Blog', href: '/blog' },
  { label: 'Download App', href: '/download-app' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
];

const footerLondonRegions = [
  {
    name: 'East London',
    areas: ['Hackney', 'Walthamstow', 'Crouch End', 'Dalston', 'Finsbury Park', 'Canary Wharf'],
  },
  {
    name: 'North London',
    areas: ['Stoke Newington', 'Highbury', 'Holloway', 'Homerton', 'Hoxton', 'Camden'],
  },
  {
    name: 'South London',
    areas: [
      'Richmond Upon Thames',
      'London Fields',
      'Muswell Hill',
      'Stratford',
      'Islington',
      'Hornsey',
      'Lambeth',
    ],
  },
  {
    name: 'West London',
    areas: [
      'Mayfair',
      'Tottenham',
      'Wood Green',
      'Stamford Hill',
      'Leytonstone',
      'Bond Street',
      'Hammersmith',
      'Wandsworth',
    ],
  },
];

function splitIntoColumns(items, columns) {
  const chunkSize = Math.ceil(items.length / columns);

  return Array.from({ length: columns }, (_, index) =>
    items.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}

const footerLondonAreas = footerLondonRegions.flatMap((region) => region.areas);
const footerLondonAreaColumns = splitIntoColumns(footerLondonAreas, 4);

const footerManchesterAreas =
  ukLocations.general.find((region) => region.id === 'manchester')?.areas ?? [];

const footerManchesterAreaColumns = splitIntoColumns(footerManchesterAreas, 4);

const footerSocialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/wilmslowedcls/',
    icon: 'facebook',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@ecolaundryanddrycleaners',
    icon: 'tiktok',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thedrycleaners2025',
    icon: 'instagram',
  },
];

function renderLinkList(links) {
  return `<ul class="footer-list">${links
    .map(
      (link) =>
        `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`
    )
    .join('')}</ul>`;
}

function renderAreaList(areas) {
  return `<ul class="footer-list">${areas
    .map(
      (area) =>
        `<li><a href="${escapeHtml(resolveLocationHref(area))}">${escapeHtml(area)}</a></li>`
    )
    .join('')}</ul>`;
}

export function getStaticFooterCss() {
  return `
      /* ── Footer (synced with src/components/Footer.tsx) ── */
      .site-footer {
        position: relative;
        overflow: hidden;
        background: #134633;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }

      .site-footer::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.1), transparent, rgba(0, 0, 0, 0.2));
      }

      .footer-inner {
        position: relative;
        max-width: 80rem;
        margin: 0 auto;
        padding: 4rem 1rem 2.5rem;
      }

      @media (min-width: 1024px) {
        .footer-inner {
          padding-top: 6rem;
        }
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem 2rem;
      }

      @media (min-width: 768px) {
        .footer-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .footer-grid {
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 3rem 2.5rem;
        }
      }

      .footer-col-services {
        min-width: 0;
      }

      @media (min-width: 1024px) {
        .footer-col-services {
          grid-column: span 4 / span 4;
        }
      }

      .footer-col-explore {
        min-width: 0;
      }

      @media (min-width: 1024px) {
        .footer-col-explore {
          grid-column: span 3 / span 3;
        }
      }

      .footer-col-quick {
        min-width: 0;
      }

      @media (min-width: 768px) {
        .footer-col-quick {
          grid-column: span 2 / span 2;
        }
      }

      @media (min-width: 1024px) {
        .footer-col-quick {
          grid-column: span 5 / span 5;
        }
      }

      .footer-heading {
        margin: 0 0 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.625rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgb(76, 175, 80);
      }

      .footer-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .footer-list li + li {
        margin-top: 0.625rem;
      }

      .footer-list a,
      .footer-list span {
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        transition: color 0.3s;
      }

      .site-footer a:hover {
        color: rgb(76, 175, 80);
      }

      .footer-services-cols,
      .footer-explore-cols,
      .footer-quick-cols {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0 1.5rem;
      }

      @media (min-width: 640px) {
        .footer-services-cols,
        .footer-explore-cols,
        .footer-quick-cols {
          gap: 0 2rem;
        }
      }

      .footer-social-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-top: 1.5rem;
        max-width: 100%;
      }

      @media (min-width: 640px) {
        .footer-social-row {
          margin-top: 2rem;
        }
      }

      .footer-social-row > span {
        font-size: 0.875rem;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.9);
      }

      .footer-social-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        margin-top: 1.5rem;
      }

      @media (min-width: 768px) {
        .footer-social-bottom {
          display: none;
        }
      }

      .footer-social-bottom > span {
        font-size: 0.75rem;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.8);
      }

      .footer-social-icons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
      }

      .footer-social-btn {
        flex-shrink: 0;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(255, 255, 255, 0.1);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }

      .footer-social-btn svg {
        display: block;
        width: 1.125rem;
        height: 1.125rem;
        flex-shrink: 0;
      }

      .footer-social-btn:hover {
        border-color: rgba(76, 175, 80, 0.4);
        background: rgba(76, 175, 80, 0.15);
        opacity: 0.9;
      }

      .footer-locations {
        margin-top: 2rem;
        padding-top: 1rem;
      }

      .locations-sections {
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }

      .footer-area-cols-4 {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0 1.5rem;
      }

      @media (min-width: 640px) {
        .footer-area-cols-4 {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0 2rem;
        }
      }

      .footer-bottom {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;
        font-size: 0.75rem;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.8);
      }

      @media (min-width: 640px) {
        .footer-bottom {
          flex-direction: row;
          justify-content: space-between;
          text-align: left;
        }
      }

      .footer-legal {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      @media (min-width: 640px) {
        .footer-legal {
          justify-content: flex-end;
        }
      }

      .footer-legal span {
        color: rgba(255, 255, 255, 0.4);
      }
  `.trim();
}

export function getStaticFooterHtml({ includeLocations = true } = {}) {
  const servicesSplit = Math.ceil(footerServices.length / 2);
  const servicesCol1 = footerServices.slice(0, servicesSplit);
  const servicesCol2 = footerServices.slice(servicesSplit);

  const exploreSplit = Math.ceil(footerExploreLinks.length / 2);
  const exploreCol1 = footerExploreLinks.slice(0, exploreSplit);
  const exploreCol2 = footerExploreLinks.slice(exploreSplit);

  function renderSocialHtml(idSuffix) {
    return `<div class="footer-social-icons">${footerSocialLinks
      .map(
        (social, index) =>
          `<a class="footer-social-btn" href="${escapeHtml(social.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(social.label)}">${renderSocialIcon(social.icon, 18, `${idSuffix}-${index}`)}</a>`
      )
      .join('')}</div>`;
  }

  const socialHtmlQuick = renderSocialHtml('footer-quick');
  const socialHtmlBottom = renderSocialHtml('footer-bottom');

  const locationsHtml = includeLocations
    ? `
          <div class="footer-locations" id="locations">
            <div class="locations-sections">
              <div>
                <h4 class="footer-heading">The Laundry Man App London</h4>
                <div class="footer-area-cols-4">
                  ${footerLondonAreaColumns.map((column) => renderAreaList(column)).join('')}
                </div>
              </div>
              <div>
                <h4 class="footer-heading">The Laundry Man App Manchester</h4>
                <div class="footer-area-cols-4">
                  ${footerManchesterAreaColumns.map((column) => renderAreaList(column)).join('')}
                </div>
              </div>
            </div>
          </div>`
    : '';

  return `
      <footer class="site-footer" id="footer">
        <div class="footer-inner">
          <div class="footer-grid">
            <div class="footer-col-services">
              <h4 class="footer-heading">Services</h4>
              <div class="footer-services-cols">
                ${renderLinkList(servicesCol1)}
                ${renderLinkList(servicesCol2)}
              </div>
            </div>

            <div class="footer-col-explore">
              <h4 class="footer-heading">Explore</h4>
              <div class="footer-explore-cols">
                ${renderLinkList(exploreCol1)}
                ${renderLinkList(exploreCol2)}
              </div>
            </div>

            <div class="footer-col-quick">
              <h4 class="footer-heading">Quick Links</h4>
              <div class="footer-quick-cols">
                ${renderLinkList(footerQuickLinksCol1)}
                <div>
                  ${renderLinkList(footerQuickLinksCol2)}
                  <div class="footer-social-row">
                    <span>Social media</span>
                    ${socialHtmlQuick}
                  </div>
                </div>
              </div>
            </div>
          </div>
          ${locationsHtml}
          <div class="footer-bottom">
            <p>© 2026 The Laundry Man App. All Rights Reserved.</p>
            <nav class="footer-legal" aria-label="Footer legal and attribution links">
              <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">Icons by Flaticon</a>
              <span aria-hidden="true">·</span>
              <a href="/privacy-policy">Privacy Policy</a>
              <span aria-hidden="true">·</span>
              <a href="/terms-conditions">Terms of Service</a>
            </nav>
            <div class="footer-social-bottom">
              <span>Follow us</span>
              ${socialHtmlBottom}
            </div>
          </div>
        </div>
      </footer>`.trim();
}
