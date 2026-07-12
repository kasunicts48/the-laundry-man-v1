import type { HtmlTagDescriptor, Plugin } from 'vite';

/**
 * Build-time HTML performance optimizations for the SPA entry (index.html):
 *
 *  1. Preloads the responsive hero (LCP) images with the correct hashed URLs.
 *  2. Injects a static hero image shell in the HTML body so the LCP element
 *     exists before React boots (critical for mobile PSI on SPAs).
 *  3. Rewrites the render-blocking main stylesheet into a non-blocking preload+swap.
 */

interface HeroPreload {
  match: RegExp;
  media?: string;
}

const HERO_PRELOADS: HeroPreload[] = [
  { match: /sm-hero-section-image2-[^/]+\.webp$/, media: '(max-width: 639.98px)' },
  { match: /hero-section-image-[^/]+\.webp$/, media: '(min-width: 640px)' },
];

const LCP_SHELL_CSS = `
#lcp-hero-shell{position:fixed;inset:0;z-index:0;display:flex;flex-direction:column;overflow:hidden;background:#fff;pointer-events:none}
#lcp-hero-shell picture{flex:1;min-height:34svh;display:block;overflow:hidden;position:relative}
#lcp-hero-shell img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 46%}
#lcp-hero-shell .lcp-fade{flex-shrink:0;height:28%;margin-top:-28%;background:linear-gradient(to top,#fff 0%,rgba(255,255,255,.5) 50%,transparent 100%);position:relative;z-index:1}
@media(min-width:640px){#lcp-hero-shell{display:none}}
`.replace(/\s+/g, ' ');

function findHeroAsset(bundle: Record<string, unknown>, match: RegExp): string | null {
  const asset = Object.values(bundle).find(
    (output) =>
      output &&
      typeof output === 'object' &&
      'type' in output &&
      output.type === 'asset' &&
      'fileName' in output &&
      typeof output.fileName === 'string' &&
      match.test(output.fileName)
  ) as { fileName: string } | undefined;

  return asset ? `/${asset.fileName}` : null;
}

function buildLcpShell(mobileSrc: string, desktopSrc: string): string {
  return `<div id="lcp-hero-shell" aria-hidden="true"><picture><source media="(min-width: 640px)" srcset="${desktopSrc}"><img src="${mobileSrc}" alt="" fetchpriority="high" decoding="async" width="800" height="1067"></picture><div class="lcp-fade"></div></div>`;
}

export function heroPerfPlugin(): Plugin {
  return {
    name: 'hero-perf',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;

        const tags: HtmlTagDescriptor[] = [];
        const mobileHero = findHeroAsset(bundle, HERO_PRELOADS[0].match);
        const desktopHero = findHeroAsset(bundle, HERO_PRELOADS[1].match);

        for (const preload of HERO_PRELOADS) {
          const href = findHeroAsset(bundle, preload.match);
          if (!href) continue;

          tags.push({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'image',
              href,
              type: 'image/webp',
              fetchpriority: 'high',
              ...(preload.media ? { media: preload.media } : {}),
            },
            injectTo: 'head-prepend',
          });
        }

        if (mobileHero && desktopHero) {
          tags.push({
            tag: 'style',
            children: LCP_SHELL_CSS,
            injectTo: 'head',
          });
        }

        const cssLinkRe =
          /<link[^>]*rel=["']stylesheet["'][^>]*href=["'](\/assets\/[^"']+\.css)["'][^>]*>/gi;

        let updatedHtml = html.replace(cssLinkRe, (_match, href: string) => {
          const preload = `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">`;
          const fallback = `<noscript><link rel="stylesheet" href="${href}"></noscript>`;
          return `${preload}${fallback}`;
        });

        if (mobileHero && desktopHero) {
          updatedHtml = updatedHtml.replace(
            '<div id="root"></div>',
            `${buildLcpShell(mobileHero, desktopHero)}\n    <div id="root"></div>`
          );
        }

        if (tags.length > 0) {
          return { html: updatedHtml, tags };
        }

        return updatedHtml;
      },
    },
  };
}
