import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStaticFooterCss, getStaticFooterHtml } from './static-footer.mjs';
import { getStaticTopbarCss, renderStaticTopbarHtml } from './static-header.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const rawLocations = JSON.parse(
  readFileSync(join(root, 'src/data/ukLocations.json'), 'utf8')
);

const mainServiceSections = [
  { id: 'wash-fold', title: 'Wash & Fold', dataKey: 'laundry-wash' },
  { id: 'dry-cleaning', title: 'Dry Cleaning', dataKey: 'dry-cleaning' },
  { id: 'ironing-service', title: 'Ironing Service', dataKey: 'laundry-ironing' },
  { id: 'shirt-service', title: 'Shirt Service', dataKey: 'laundry' },
  { id: 'curtain-cleaning', title: 'Curtain Cleaning', dataKey: 'dry-cleaning' },
  { id: 'wedding-dress-cleaning', title: 'Wedding Dress Cleaning', dataKey: 'dry-cleaning' },
];

const seoKeywordSectionDefs = [
  { id: 'dry-cleaners', title: 'Dry Cleaners' },
  { id: 'dry-cleaners-near-you', title: 'Dry Cleaners Near You' },
  { id: 'laundromats-launderettes', title: 'Laundromats & Launderettes' },
  { id: 'laundry-near-me', title: 'Laundry Near Me' },
  { id: 'laundry-service', title: 'Laundry Service' },
  { id: 'laundry-services', title: 'Laundry Services' },
  { id: 'laundry-pickup-delivery', title: 'Laundry Pickup & Delivery' },
  { id: 'laundry-collection-delivery', title: 'Laundry Collection & Delivery' },
  { id: 'wash-and-fold-near-me', title: 'Wash and Fold Near Me' },
  { id: 'wash-fold-service', title: 'Wash & Fold Service' },
  { id: 'ironing-near-me', title: 'Ironing Near Me' },
  { id: 'professional-ironing', title: 'Professional Ironing' },
  { id: 'shirt-laundry', title: 'Shirt Laundry' },
  { id: 'shirt-laundry-service', title: 'Shirt Laundry Service' },
  { id: 'suit-cleaning', title: 'Suit Cleaning' },
  { id: 'suit-dry-cleaning', title: 'Suit Dry Cleaning' },
  { id: 'duvet-cleaning', title: 'Duvet Cleaning' },
  { id: 'bedding-cleaning', title: 'Bedding Cleaning' },
  { id: 'dry-cleaning-near-me', title: 'Dry Cleaning Near Me' },
  { id: 'dry-cleaning-service', title: 'Dry Cleaning Service' },
  { id: 'clothes-cleaning', title: 'Clothes Cleaning' },
  { id: 'garment-care', title: 'Garment Care' },
  { id: 'linen-cleaning', title: 'Linen Cleaning' },
  { id: 'express-laundry', title: 'Express Laundry Service' },
  { id: 'same-day-laundry', title: 'Same Day Laundry' },
  { id: 'eco-friendly-laundry', title: 'Eco Friendly Laundry' },
  { id: 'formal-wear-cleaning', title: 'Formal Wear Cleaning' },
  { id: 'coat-jacket-cleaning', title: 'Coat & Jacket Cleaning' },
  { id: 'dress-cleaning', title: 'Dress Cleaning' },
  { id: 'delicate-garment-cleaning', title: 'Delicate Garment Cleaning' },
  { id: 'stain-removal-service', title: 'Stain Removal Service' },
  { id: 'wedding-gown-cleaning', title: 'Wedding Gown Cleaning' },
  { id: 'curtain-laundry', title: 'Curtain Laundry' },
  { id: 'home-laundry-service', title: 'Home Laundry Service' },
  { id: 'laundry-delivery-service', title: 'Laundry Delivery Service' },
];

const locationPageSections = [
  { id: 'general', title: 'General', dataKey: 'general' },
  ...mainServiceSections,
  ...seoKeywordSectionDefs.map((section) => ({ ...section, dataKey: 'general' })),
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function dedupeRegionAreas(areas) {
  const seen = new Set();
  const uniqueAreas = [];

  for (const area of areas) {
    const key = area.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueAreas.push(area);
  }

  return uniqueAreas;
}

function normalizeRegions(regions) {
  return regions.map((region) => ({
    id: region.id,
    name: region.name,
    areas: dedupeRegionAreas(region.areas),
  }));
}

const locationsBySection = Object.fromEntries(
  Object.entries(rawLocations).map(([key, regions]) => [key, normalizeRegions(regions)])
);

const generalRegions = locationsBySection.general ?? [];
const regionCount = generalRegions.length;
const areaCount = generalRegions.reduce((total, region) => total + region.areas.length, 0);

const usedDataKeys = [...new Set(locationPageSections.map((section) => section.dataKey))];
/** Every section uses the same county/region directory as General for consistent layout. */
const regionsByKey = Object.fromEntries(
  usedDataKeys.map((key) => [key, generalRegions])
);

const locationsData = {
  sections: locationPageSections.map(({ id, title, dataKey }) => ({ id, title, dataKey })),
  regionsByKey,
};

function renderSectionShell(section, index) {
  const borderClass = index > 0 ? ' location-section--bordered' : '';

  return `        <section id="${escapeHtml(section.id)}" class="location-section scroll-mt-28${borderClass}" data-section-id="${escapeHtml(section.id)}" data-data-key="${escapeHtml(section.dataKey)}" aria-labelledby="locations-section-${escapeHtml(section.id)}">
          <h2 id="locations-section-${escapeHtml(section.id)}" class="location-section__title">${escapeHtml(section.title)}</h2>
          <div class="location-directory" aria-busy="true"></div>
        </section>`;
}

const sectionsHtml = locationPageSections
  .map((section, index) => renderSectionShell(section, index))
  .join('\n\n');

const rendererScript = `
      (function () {
        var SLUG_ALIASES = {
          'manchester city centre': 'manchester',
          'manchester-city-centre': 'manchester',
        };
        var renderedSections = new Set();
        var sectionObserver = null;
        var appData = null;
        var backgroundLoadActive = false;
        var backgroundLoadGeneration = 0;
        var idleFillTimer = null;
        var interactionTimer = null;
        var userInteracting = false;
        var lastQuerySectionId = null;
        var LINKS_PER_FRAME = 150;
        var HASH_LAYOUT_DELAY_MS = 100;
        var IDLE_CALLBACK_TIMEOUT_MS = 2000;
        var IDLE_FILL_DELAY_MS = 10000;
        var INTERACTION_PAUSE_MS = 2000;

        function toLocationSlug(area) {
          return area
            .toLowerCase()
            .trim()
            .replace(/[^\\w\\s-]/g, '')
            .replace(/\\s+/g, '-');
        }

        function resolveLocationHref(area) {
          var trimmed = area.toLowerCase().trim();
          var slug =
            SLUG_ALIASES[trimmed] ||
            SLUG_ALIASES[toLocationSlug(area)] ||
            toLocationSlug(area);
          return '/' + slug;
        }

        function escapeHtml(value) {
          return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        }

        function scheduleFrame(callback) {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(callback);
          } else {
            window.setTimeout(callback, 16);
          }
        }

        function scheduleBackgroundWork(callback) {
          if (window.requestIdleCallback) {
            window.requestIdleCallback(
              function () {
                callback();
              },
              { timeout: IDLE_CALLBACK_TIMEOUT_MS }
            );
          } else {
            scheduleFrame(callback);
          }
        }

        function parseQueryTarget() {
          var urlParams = new URLSearchParams(window.location.search);
          var service = urlParams.get('service');
          var area = urlParams.get('area');

          return {
            sectionId: service ? String(service).trim() : null,
            regionId: area ? String(area).trim() : null,
          };
        }

        function hasQueryTarget() {
          var target = parseQueryTarget();
          return !!(target.sectionId && isValidSectionId(target.sectionId));
        }

        function getScrollTargetId() {
          var target = parseQueryTarget();
          if (!target.sectionId) return null;

          if (target.regionId) {
            return target.sectionId + '/' + target.regionId;
          }

          return target.sectionId;
        }

        function buildLocationsQueryHref(sectionId, regionId) {
          var params = new URLSearchParams();
          params.set('service', sectionId);
          if (regionId) {
            params.set('area', regionId);
          }
          return '/locations?' + params.toString();
        }

        function migrateLegacyHashToQuery() {
          var raw = (window.location.hash || '').replace(/^#/, '').trim();
          if (!raw) return false;

          try {
            raw = decodeURIComponent(raw);
          } catch (error) {
            /* keep raw */
          }

          var parts = raw.split('/').filter(Boolean);
          var sectionId = parts[0] || null;
          var regionId = parts[1] || null;
          if (!sectionId || !isValidSectionId(sectionId)) return false;

          var params = new URLSearchParams(window.location.search);
          params.set('service', sectionId);
          if (regionId) {
            params.set('area', regionId);
          }

          var nextUrl = window.location.pathname + '?' + params.toString();
          window.history.replaceState(null, '', nextUrl);
          return true;
        }

        function getSectionMeta(sectionId) {
          if (!appData) return null;
          for (var i = 0; i < appData.sections.length; i += 1) {
            if (appData.sections[i].id === sectionId) return appData.sections[i];
          }
          return null;
        }

        function isValidSectionId(sectionId) {
          return !!getSectionMeta(sectionId);
        }

        function getSectionIndex(sectionId) {
          if (!appData) return -1;
          for (var i = 0; i < appData.sections.length; i += 1) {
            if (appData.sections[i].id === sectionId) return i;
          }
          return -1;
        }

        function getRegions(dataKey) {
          return appData.regionsByKey[dataKey] || appData.regionsByKey.general || [];
        }

        function getDirectory(sectionId) {
          var section = document.getElementById(sectionId);
          if (!section) return null;
          return section.querySelector('.location-directory');
        }

        function buildAreaLinkHtml(area) {
          return (
            '<li><a class="location-link" href="' +
            escapeHtml(resolveLocationHref(area)) +
            '">' +
            escapeHtml(area) +
            '</a></li>'
          );
        }

        function buildRegionArticle(sectionId, region) {
          var regionAnchorId = sectionId + '/' + region.id;
          var headingId = 'location-region-' + sectionId + '-' + region.id;
          var areaLinks = region.areas.map(buildAreaLinkHtml).join('');

          return (
            '<article id="' +
            escapeHtml(regionAnchorId) +
            '" class="location-region scroll-mt-28" aria-labelledby="' +
            escapeHtml(headingId) +
            '"><div class="location-region__grid"><div class="location-region__heading"><h3 id="' +
            escapeHtml(headingId) +
            '"><a class="location-link location-link--heading" href="' +
            escapeHtml(buildLocationsQueryHref(sectionId, region.id)) +
            '">' +
            escapeHtml(region.name) +
            '</a></h3><p class="location-region__count">' +
            region.areas.length +
            ' areas</p></div><ul class="location-region__areas">' +
            areaLinks +
            '</ul></div></article>'
          );
        }

        function buildRegionShell(sectionId, region) {
          var regionAnchorId = sectionId + '/' + region.id;
          var headingId = 'location-region-' + sectionId + '-' + region.id;

          return (
            '<article id="' +
            escapeHtml(regionAnchorId) +
            '" class="location-region scroll-mt-28" aria-labelledby="' +
            escapeHtml(headingId) +
            '"><div class="location-region__grid"><div class="location-region__heading"><h3 id="' +
            escapeHtml(headingId) +
            '"><a class="location-link location-link--heading" href="' +
            escapeHtml(buildLocationsQueryHref(sectionId, region.id)) +
            '">' +
            escapeHtml(region.name) +
            '</a></h3><p class="location-region__count">' +
            region.areas.length +
            ' areas</p></div><ul class="location-region__areas"></ul></div></article>'
          );
        }

        function markSectionRendered(sectionId, container) {
          renderedSections.add(sectionId);
          if (container) container.removeAttribute('aria-busy');
        }

        function renderSectionSync(sectionId, dataKey) {
          if (renderedSections.has(sectionId)) return;

          var container = getDirectory(sectionId);
          if (!container) return;

          var regions = getRegions(dataKey);
          var html = '';

          for (var i = 0; i < regions.length; i += 1) {
            html += buildRegionArticle(sectionId, regions[i]);
          }

          container.innerHTML = html;
          markSectionRendered(sectionId, container);
        }

        function renderSectionBatched(sectionId, dataKey, generation, onComplete) {
          if (generation != null && generation !== backgroundLoadGeneration) {
            if (onComplete) onComplete(false);
            return;
          }

          if (renderedSections.has(sectionId)) {
            if (onComplete) onComplete(true);
            return;
          }

          var container = getDirectory(sectionId);
          if (!container) {
            if (onComplete) onComplete(true);
            return;
          }

          var regions = getRegions(dataKey);
          container.innerHTML = '';
          container.setAttribute('aria-busy', 'true');

          var regionIndex = 0;
          var areaIndex = 0;
          var activeList = null;

          function appendRegionShell(region) {
            container.insertAdjacentHTML('beforeend', buildRegionShell(sectionId, region));
            var article = container.lastElementChild;
            activeList = article ? article.querySelector('.location-region__areas') : null;
          }

          function processBatch() {
            if (generation != null && generation !== backgroundLoadGeneration) {
              if (onComplete) onComplete(false);
              return;
            }

            if (userInteracting && generation != null) {
              scheduleBackgroundWork(processBatch);
              return;
            }

            if (renderedSections.has(sectionId)) {
              if (onComplete) onComplete(true);
              return;
            }

            var linksAdded = 0;

            while (regionIndex < regions.length && linksAdded < LINKS_PER_FRAME) {
              var region = regions[regionIndex];
              var remaining = LINKS_PER_FRAME - linksAdded;

              if (areaIndex === 0) {
                if (region.areas.length <= remaining) {
                  container.insertAdjacentHTML('beforeend', buildRegionArticle(sectionId, region));
                  linksAdded += region.areas.length;
                  regionIndex += 1;
                  activeList = null;
                  continue;
                }

                appendRegionShell(region);
              }

              if (!activeList) {
                regionIndex += 1;
                areaIndex = 0;
                continue;
              }

              var endArea = Math.min(region.areas.length, areaIndex + remaining);
              var batchHtml = '';

              for (var i = areaIndex; i < endArea; i += 1) {
                batchHtml += buildAreaLinkHtml(region.areas[i]);
              }

              if (batchHtml) {
                activeList.insertAdjacentHTML('beforeend', batchHtml);
              }

              linksAdded += endArea - areaIndex;
              areaIndex = endArea;

              if (areaIndex >= region.areas.length) {
                regionIndex += 1;
                areaIndex = 0;
                activeList = null;
              }
            }

            if (regionIndex < regions.length || areaIndex > 0) {
              scheduleBackgroundWork(processBatch);
              return;
            }

            markSectionRendered(sectionId, container);
            if (onComplete) onComplete(true);
          }

          processBatch();
        }

        function scrollToQueryTarget(onComplete) {
          scheduleFrame(function () {
            window.setTimeout(function () {
              var targetId = getScrollTargetId();
              if (targetId) {
                var targetEl = document.getElementById(targetId);
                if (targetEl) {
                  targetEl.scrollIntoView({ behavior: 'auto', block: 'center' });
                }
              }
              if (onComplete) onComplete();
            }, HASH_LAYOUT_DELAY_MS);
          });
        }

        function buildBackgroundQueue(prioritySectionId) {
          if (!appData) return [];

          var priorityIndex = prioritySectionId ? getSectionIndex(prioritySectionId) : -1;
          var queue = [];

          if (priorityIndex >= 0) {
            for (var i = priorityIndex + 1; i < appData.sections.length; i += 1) {
              queue.push(appData.sections[i].id);
            }
            for (var j = 0; j < priorityIndex; j += 1) {
              queue.push(appData.sections[j].id);
            }
          } else {
            for (var k = 0; k < appData.sections.length; k += 1) {
              queue.push(appData.sections[k].id);
            }
          }

          return queue.filter(function (sectionId) {
            return !renderedSections.has(sectionId);
          });
        }

        function startBackgroundSectionLoad(prioritySectionId) {
          backgroundLoadGeneration += 1;
          var generation = backgroundLoadGeneration;
          var queue = buildBackgroundQueue(prioritySectionId);
          var queueIndex = 0;
          backgroundLoadActive = queue.length > 0;

          function loadNextSection() {
            if (generation !== backgroundLoadGeneration) return;

            while (queueIndex < queue.length && renderedSections.has(queue[queueIndex])) {
              queueIndex += 1;
            }

            if (queueIndex >= queue.length) {
              backgroundLoadActive = false;
              return;
            }

            var sectionId = queue[queueIndex];
            var meta = getSectionMeta(sectionId);
            if (!meta) {
              queueIndex += 1;
              scheduleBackgroundWork(loadNextSection);
              return;
            }

            renderSectionBatched(sectionId, meta.dataKey, generation, function (continued) {
              if (!continued || generation !== backgroundLoadGeneration) return;
              queueIndex += 1;
              scheduleBackgroundWork(loadNextSection);
            });
          }

          if (queue.length > 0) {
            scheduleBackgroundWork(loadNextSection);
          }
        }

        function hasPendingSections() {
          if (!appData) return false;
          for (var i = 0; i < appData.sections.length; i += 1) {
            if (!renderedSections.has(appData.sections[i].id)) return true;
          }
          return false;
        }

        function scheduleDeferredFullFill() {
          window.clearTimeout(idleFillTimer);
          idleFillTimer = window.setTimeout(function () {
            if (userInteracting || !hasPendingSections()) return;
            startBackgroundSectionLoad(lastQuerySectionId);
          }, IDLE_FILL_DELAY_MS);
        }

        function pauseBackgroundOnInteraction() {
          userInteracting = true;
          backgroundLoadGeneration += 1;
          backgroundLoadActive = false;
          window.clearTimeout(idleFillTimer);
          window.clearTimeout(interactionTimer);
          interactionTimer = window.setTimeout(function () {
            userInteracting = false;
            scheduleDeferredFullFill();
          }, INTERACTION_PAUSE_MS);
        }

        function setupIntersectionObserver() {
          var sections = document.querySelectorAll('.location-section[data-section-id]');

          if (!('IntersectionObserver' in window)) {
            sections.forEach(function (sectionEl) {
              var sectionId = sectionEl.getAttribute('data-section-id');
              var dataKey = sectionEl.getAttribute('data-data-key');
              if (!renderedSections.has(sectionId)) {
                renderSectionBatched(sectionId, dataKey, null, function () {});
              }
            });
            return;
          }

          if (sectionObserver) {
            sectionObserver.disconnect();
          }

          sectionObserver = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                var sectionEl = entry.target;
                var sectionId = sectionEl.getAttribute('data-section-id');
                var dataKey = sectionEl.getAttribute('data-data-key');

                sectionObserver.unobserve(sectionEl);

                if (renderedSections.has(sectionId)) return;

                renderSectionBatched(sectionId, dataKey, null, function () {});
              });
            },
            { root: null, rootMargin: '400px 0px', threshold: 0 }
          );

          sections.forEach(function (sectionEl) {
            var sectionId = sectionEl.getAttribute('data-section-id');
            if (!renderedSections.has(sectionId)) {
              sectionObserver.observe(sectionEl);
            }
          });
        }

        function finishQueryNavigation() {
          setupIntersectionObserver();
          scheduleDeferredFullFill();
        }

        function handleQueryNavigation() {
          if (!appData) return;

          var target = parseQueryTarget();
          if (!target.sectionId || !isValidSectionId(target.sectionId)) {
            lastQuerySectionId = null;
            setupIntersectionObserver();
            scheduleDeferredFullFill();
            return;
          }

          lastQuerySectionId = target.sectionId;

          var meta = getSectionMeta(target.sectionId);
          if (!meta) {
            setupIntersectionObserver();
            scheduleDeferredFullFill();
            return;
          }

          backgroundLoadGeneration += 1;

          if (!renderedSections.has(target.sectionId)) {
            renderSectionSync(target.sectionId, meta.dataKey);
          }

          scrollToQueryTarget(finishQueryNavigation);
        }

        function boot(data) {
          appData = data;

          if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
          }

          window.addEventListener('scroll', pauseBackgroundOnInteraction, { passive: true });
          window.addEventListener('wheel', pauseBackgroundOnInteraction, { passive: true });
          window.addEventListener('touchstart', pauseBackgroundOnInteraction, { passive: true });

          migrateLegacyHashToQuery();

          if (hasQueryTarget()) {
            handleQueryNavigation();
          } else {
            lastQuerySectionId = null;
            setupIntersectionObserver();
            scheduleDeferredFullFill();
          }

          window.addEventListener('popstate', function () {
            handleQueryNavigation();
          });
        }

        fetch('/locations-data.json')
          .then(function (response) {
            if (!response.ok) throw new Error('Failed to load locations data');
            return response.json();
          })
          .then(boot)
          .catch(function () {
            document.querySelectorAll('.location-directory').forEach(function (node) {
              node.innerHTML =
                '<p class="location-directory__loading">Unable to load locations. Please refresh the page.</p>';
              node.removeAttribute('aria-busy');
            });
          });
      })();
`;

const staticFooterCss = getStaticFooterCss();
const staticFooterHtml = getStaticFooterHtml({ includeLocations: true });

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>Service Areas | The Laundry Man</title>
    <meta name="description" content="Browse laundry and dry cleaning service areas across the UK. Free collection and delivery in ${regionCount} regions and ${areaCount.toLocaleString()} neighbourhoods." />
    <link rel="icon" href="/logo-laundry-man-app-icon.webp" type="image/png" />
    <link rel="apple-touch-icon" href="/logo-laundry-man-app-icon.webp" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
    <style>
      :root {
        --theme-bg: #ffffff;
        --theme-bg-alt: #f5f8f5;
        --theme-text: #1b3516;
        --theme-text-soft: #2c5125;
        --theme-accent: #4caf50;
        --header-height: 6.625rem;
      }
      *, *::before, *::after { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: 'Outfit', system-ui, sans-serif;
        background: var(--theme-bg);
        color: var(--theme-text);
        -webkit-font-smoothing: antialiased;
      }
      a { color: inherit; text-decoration: none; }
      .site-shell { min-height: 100dvh; display: flex; flex-direction: column; }
      .site-header {
        position: fixed; top: 0; left: 0; right: 0; z-index: 50;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(27, 53, 22, 0.06);
      }
${getStaticTopbarCss()}
      .header-inner { max-width: 80rem; margin: 0 auto; padding: 0 1rem; }
      .nav-link:hover, .footer a:hover, .location-link:hover { color: var(--theme-accent); }
      .header-main { padding: 1rem 0; }
      .header-main .header-inner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
      .site-logo { display: flex; align-items: center; flex-shrink: 0; }
      .site-logo img { display: block; height: 2.5rem; width: auto; }
      @media (min-width: 640px) { .site-logo img { height: 2.75rem; } }
      .desktop-nav { display: none; align-items: center; gap: 2rem; }
      .nav-link { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--theme-text); }
      .nav-link.is-active { color: var(--theme-accent); }
      .btn-book { display: inline-flex; align-items: center; justify-content: center; padding: 0.625rem 1.5rem; border: 1px solid var(--theme-accent); border-radius: 9999px; color: var(--theme-accent); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
      .btn-book:hover { background: var(--theme-accent); color: #fff; }
      .menu-toggle { display: inline-flex; align-items: center; justify-content: center; padding: 0.25rem; border: 0; background: transparent; color: var(--theme-text); cursor: pointer; }
      .mobile-nav { display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 60; border-top: 1px solid rgba(27, 53, 22, 0.08); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); box-shadow: 0 20px 25px -5px rgba(0,0,0,.1); max-height: calc(100dvh - var(--header-height)); overflow-y: auto; }
      .mobile-nav.is-open { display: block; }
      .mobile-nav-inner { padding: 1rem; }
      .mobile-nav a:not(.btn-book) { display: block; padding: 0.75rem; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 0.5rem; color: var(--theme-text); }
      .mobile-nav a:not(.btn-book):hover { color: var(--theme-accent); background: rgba(76, 175, 80, 0.06); }
      .mobile-nav-cta { padding: 1rem 0.75rem 0.5rem; }
      .mobile-nav .btn-book--mobile { display: block; width: 100%; padding: 0.75rem 1.5rem; border: 1px solid var(--theme-accent); border-radius: 9999px; color: var(--theme-accent); background: transparent; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-align: center; }
      .mobile-nav .btn-book--mobile:hover { background: var(--theme-accent); color: #fff; }
      @media (min-width: 768px) { .desktop-nav { display: flex; } .menu-toggle { display: none; } .header-inner { padding: 0 1.5rem; } }
      .page-banner {
        position: relative;
        z-index: 10;
        margin-top: calc(var(--header-height) - 1px);
        background: #4caf50;
        border-radius: 0 0 30px 30px;
        padding: 2.5rem 1rem 3rem;
      }
      @media (min-width: 640px) { .page-banner { padding: 3.5rem 1.5rem 4rem; } }
      @media (min-width: 768px) { .page-banner { padding: 4rem 1.5rem; } }
      .page-banner__inner {
        max-width: 80rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
      }
      @media (min-width: 768px) {
        .page-banner__inner {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
      }
      .page-banner__content { min-width: 0; flex: 1 1 auto; text-align: left; }
      .page-banner__eyebrow { margin: 0 0 0.5rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #d1fae5; }
      .page-banner__title { margin: 0; font-size: clamp(1.875rem, 5vw, 3.75rem); font-weight: 800; line-height: 1.1; color: #1b3516; }
      .page-banner__title span { color: #ffffff; }
      .page-banner__desc { margin: 1rem 0 0; max-width: 48rem; font-size: 1rem; font-weight: 300; line-height: 1.6; color: rgba(255,255,255,0.92); }
      @media (min-width: 640px) { .page-banner__desc { font-size: 1.125rem; } }
      .page-banner__illustration {
        flex-shrink: 0;
        display: flex;
        width: 100%;
        justify-content: center;
      }
      @media (min-width: 768px) { .page-banner__illustration { width: auto; justify-content: flex-end; } }
      .page-banner__illustration img {
        width: 187px;
        height: 187px;
        object-fit: contain;
      }
      @media (min-width: 768px) { .page-banner__illustration img { width: 267px; height: 267px; } }
      .locations-main { flex: 1 1 auto; background: var(--theme-bg); padding: 3rem 1rem 5rem; }
      .locations-main__inner { max-width: 80rem; margin: 0 auto; }
      .locations-intro { margin: 0 0 3rem; max-width: 48rem; font-size: 1rem; font-weight: 300; line-height: 1.6; color: var(--theme-text-soft); }
      .locations-sections { display: flex; flex-direction: column; gap: 4rem; }
      .location-section { scroll-margin-top: 7rem; content-visibility: auto; contain-intrinsic-size: auto 480px; }
      .location-section--bordered { padding-top: 4rem; border-top: 1px solid rgba(27, 53, 22, 0.08); }
      .location-section__title { margin: 0 0 2rem; font-size: clamp(1.875rem, 4vw, 2.25rem); font-weight: 800; letter-spacing: -0.02em; color: var(--theme-text); }
      .location-directory__loading { margin: 0; font-size: 0.875rem; font-weight: 300; color: var(--theme-text-soft); }
      .location-region { padding-bottom: 2.5rem; margin-bottom: 2.5rem; border-bottom: 1px solid rgba(27, 53, 22, 0.08); scroll-margin-top: 7rem; }
      .location-region:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: 0; }
      .location-region__grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
      @media (min-width: 768px) { .location-region__grid { grid-template-columns: 2fr 10fr; gap: 2rem; } }
      .location-region__heading h3 { margin: 0; font-size: 1.125rem; font-weight: 800; color: var(--theme-text); }
      @media (min-width: 640px) { .location-region__heading h3 { font-size: 1.25rem; } }
      .location-region__count { margin: 0.25rem 0 0; font-size: 0.75rem; font-weight: 300; color: var(--theme-text-soft); }
      .location-region__areas { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; gap: 0.5rem 1.5rem; }
      @media (min-width: 640px) { .location-region__areas { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (min-width: 1024px) { .location-region__areas { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
      .location-link { font-size: 0.875rem; font-weight: 300; line-height: 1.5; color: var(--theme-text-soft); transition: color 0.2s; }
      .location-link--heading { font-weight: 800; color: var(--theme-text); }
      .scroll-mt-28 { scroll-margin-top: 7rem; }
${staticFooterCss}
      .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      @media (min-width: 640px) { .locations-main { padding-left: 1.5rem; padding-right: 1.5rem; } }
    </style>
  </head>
  <body>
    <div class="site-shell">
      <header class="site-header" id="siteHeader">
        ${renderStaticTopbarHtml('-locations-header')}
        <div class="header-main">
          <div class="header-inner">
            <a class="site-logo" href="/">
              <img src="/logo-laundry-man-app.webp" alt="The Laundry Man" width="44" height="44" />
            </a>
            <nav class="desktop-nav" aria-label="Main navigation">
              <a class="nav-link" href="/">Home</a>
              <a class="nav-link" href="/about">About Us</a>
              <a class="nav-link" href="/services">Services</a>
              <a class="nav-link" href="/commercial">Commercial Cleaning</a>
              <a class="nav-link" href="/blog">Blog</a>
              <a class="nav-link" href="/contact">Contact</a>
              <a class="btn-book" href="/booking.html">Book Now</a>
            </nav>
            <button class="menu-toggle" type="button" id="menuToggle" aria-expanded="false" aria-controls="mobileNav">
              <span class="sr-only">Toggle menu</span>
              <svg id="menuIconOpen" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
              <svg id="menuIconClose" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M6 6l12 12M18 6 6 18"/></svg>
            </button>
          </div>
        </div>
        <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
          <div class="mobile-nav-inner">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/services">Services</a>
            <a href="/commercial">Commercial Cleaning</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
            <div class="mobile-nav-cta"><a class="btn-book btn-book--mobile" href="/booking.html">Book a Collection</a></div>
          </div>
        </nav>
      </header>

      <div class="page-banner">
        <div class="page-banner__inner">
          <div class="page-banner__content">
            <p class="page-banner__eyebrow">Service Areas</p>
            <h1 class="page-banner__title">Laundry Services Across the <span>United Kingdom</span>.</h1>
            <p class="page-banner__desc">Find your city or neighbourhood below. Select any location to view local laundry and dry cleaning services with free collection and delivery.</p>
          </div>
          <div class="page-banner__illustration">
            <img src="/images/banner-locations.svg" width="267" height="267" alt="Directions and locations illustration" />
          </div>
        </div>
      </div>

      <main class="locations-main">
        <div class="locations-main__inner">
          <p class="locations-intro">We serve ${regionCount} major regions and ${areaCount.toLocaleString()} neighbourhoods across the UK. Browse by service or explore our full location directory below.</p>
          <div class="locations-sections">
${sectionsHtml}
          </div>
        </div>
      </main>

${staticFooterHtml}
    </div>
    <script>
      (function () {
        var menuToggle = document.getElementById('menuToggle');
        var mobileNav = document.getElementById('mobileNav');
        var iconOpen = document.getElementById('menuIconOpen');
        var iconClose = document.getElementById('menuIconClose');
        function setMobileMenuOpen(isOpen) {
          if (!mobileNav || !menuToggle) return;
          mobileNav.classList.toggle('is-open', isOpen);
          menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          document.body.style.overflow = isOpen ? 'hidden' : '';
          if (iconOpen && iconClose) {
            iconOpen.style.display = isOpen ? 'none' : 'block';
            iconClose.style.display = isOpen ? 'block' : 'none';
          }
        }
        if (menuToggle && mobileNav) {
          menuToggle.addEventListener('click', function () {
            setMobileMenuOpen(!mobileNav.classList.contains('is-open'));
          });
          mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setMobileMenuOpen(false); });
          });
        }
        window.addEventListener('resize', function () {
          if (window.innerWidth >= 768 && mobileNav && mobileNav.classList.contains('is-open')) {
            setMobileMenuOpen(false);
          }
        });
      })();
    </script>
    <script>${rendererScript}</script>
  </body>
</html>
`;

const dataPath = join(root, 'public/locations-data.json');
const dirPath = join(root, 'public/locations');
const htmlPath = join(dirPath, 'index.html');
const imagesDir = join(root, 'public/images');
const bannerSvgSource = join(root, 'src/assets/images/Directions-bro.svg');
const bannerSvgDest = join(imagesDir, 'banner-locations.svg');

mkdirSync(dirPath, { recursive: true });
mkdirSync(imagesDir, { recursive: true });
writeFileSync(bannerSvgDest, readFileSync(bannerSvgSource, 'utf8'), 'utf8');
writeFileSync(htmlPath, html, 'utf8');
writeFileSync(dataPath, JSON.stringify(locationsData), 'utf8');

const htmlMb = (Buffer.byteLength(html, 'utf8') / (1024 * 1024)).toFixed(2);
const dataMb = (Buffer.byteLength(JSON.stringify(locationsData), 'utf8') / (1024 * 1024)).toFixed(2);

console.log(`Generated ${htmlPath} (${htmlMb} MB, ${locationPageSections.length} sections)`);
console.log(`Generated ${dataPath} (${dataMb} MB location data)`);
