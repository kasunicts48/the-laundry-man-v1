import { renderSocialIcon } from './social-icons.mjs';

const headerSocialLinks = [
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

export function getStaticTopbarCss() {
  return `
      /* ── Header top bar (synced with src/components/Header.tsx) ── */
      .header-topbar {
        background: #134633;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.375rem 1rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
      }

      .header-topbar .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        max-width: 80rem;
        margin: 0 auto;
        padding: 0;
      }

      .header-email {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(255, 255, 255, 0.9);
        transition: color 0.3s;
      }

      .header-email:hover {
        color: var(--theme-accent);
      }

      .header-email svg,
      .header-social a svg {
        display: block;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }

      .header-social {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: 0.5rem;
      }

      .header-social > span {
        font-weight: 600;
      }

      .header-social-icons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .header-social a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s;
      }

      .header-social a:hover {
        opacity: 0.8;
      }

      @media (min-width: 640px) {
        .header-topbar {
          padding: 0.5rem 1.5rem;
        }

        .header-email svg,
        .header-social a svg {
          width: 0.875rem;
          height: 0.875rem;
        }

        .header-social {
          gap: 1rem;
        }

        .header-social > span {
          font-weight: 500;
        }

        .header-social-icons {
          gap: 0.75rem;
        }
      }

      @media (min-width: 1024px) {
        .header-topbar {
          padding-left: 2rem;
          padding-right: 2rem;
        }
      }

      @media (max-width: 639px) {
        .header-email span {
          display: none;
        }
      }
  `.trim();
}

export function renderStaticTopbarHtml(idSuffix = '') {
  const socialHtml = headerSocialLinks
    .map(
      (social, index) =>
        `<a href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="${social.label}">${renderSocialIcon(social.icon, 16, `${idSuffix}-${index}`)}</a>`
    )
    .join('');

  return `
        <div class="header-topbar">
          <div class="header-inner">
            <a class="header-email" href="mailto:info@thelaundryman.co.uk" aria-label="Email info@thelaundryman.co.uk">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="m4 7 8 5 8-5M4 7v10h16V7"/></svg>
              <span>info@thelaundryman.co.uk</span>
            </a>
            <div class="header-social">
              <span>Follow Us:</span>
              <div class="header-social-icons">${socialHtml}</div>
            </div>
          </div>
        </div>`.trim();
}
