const OVERRIDE_STYLE_ID = 'cleancloud-booking-overrides';

/** Viewport height available for the widget on mobile (header + back bar subtracted). */
export function getCleanCloudMobileShellHeight(): number {
  if (typeof window === 'undefined') return 500;

  const headerVar = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height');
  const headerHeight = Number.parseFloat(headerVar) || 106;
  const backBar = document.querySelector<HTMLElement>('.cleancloud-booking-back');
  const backBarHeight = backBar?.getBoundingClientRect().height ?? 44;

  return Math.max(Math.round(window.innerHeight - headerHeight - backBarHeight), 400);
}

/** Size mobile embed shells before CleanCloud init (needs explicit height for height:100%). */
export function applyCleanCloudMobileShell(): void {
  if (!window.matchMedia('(max-width: 767px)').matches) return;

  const heightPx = `${getCleanCloudMobileShellHeight()}px`;

  ['.cleancloud-booking-shell', '#bookingToolWrapper', '#myStoreContainer', '.cleancloud-booking-widget'].forEach(
    (selector) => {
      const el = document.querySelector<HTMLElement>(selector);
      if (!el) return;
      el.style.setProperty('min-height', heightPx, 'important');
      el.style.setProperty('height', heightPx, 'important');
    },
  );
}

/**
 * Overrides CleanCloud embed CSS.
 * Desktop: unlock height locks and flatten fixed fullscreen containers.
 * Mobile: flex shell + preserve CleanCloud absolute layer layout.
 */
export const CLEANCLOUD_OVERRIDE_CSS = `
.cleancloud-booking-page {
  --cleancloud-shell-min: calc(100svh - var(--site-header-height, 6.625rem) - 3.5rem);
}

.cleancloud-booking-page #bookingToolWrapper,
.cleancloud-booking-page #myStoreContainer,
.cleancloud-booking-page .cleancloud-booking-widget {
  width: 100%;
  max-width: 100%;
  background: var(--theme-bg);
}

.cleancloud-booking-page .cleanCloudWebApp div[style*='background-color: rgb(241, 241, 244)'],
.cleancloud-booking-page .cleanCloudWebApp div[style*='background-color:#f1f1f4'],
.cleancloud-booking-page .cleanCloudWebApp div[style*='background-color: #f1f1f4'],
.cleancloud-booking-page .cleanCloudWebApp div[style*='background: rgb(241, 241, 244)'],
.cleancloud-booking-page .cleanCloudWebApp div[style*='background:#f1f1f4'],
.cleancloud-booking-page .cleanCloudWebApp div[style*='background: #f1f1f4'] {
  background-color: var(--theme-bg) !important;
  background: var(--theme-bg) !important;
}

.cleancloud-booking-page .cleanCloudWebApp .__cc_desktopFooter,
.cleancloud-booking-page .cleanCloudWebApp #poweredByCleanCloud {
  display: none !important;
}

/* ── Mobile: flex shell + keep CleanCloud absolute panels ── */
@media (max-width: 767px) {
  .cleancloud-booking-page {
    --cleancloud-mobile-shell: calc(100dvh - var(--site-header-height, 6.625rem) - 2.75rem);
    padding-top: var(--site-header-height, 6.625rem);
    padding-bottom: 0;
    overflow-x: clip;
  }

  .cleancloud-booking-page .cleancloud-booking-shell,
  .cleancloud-booking-page .cleancloud-booking-widget,
  .cleancloud-booking-page #bookingToolWrapper,
  .cleancloud-booking-page #myStoreContainer {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;
    min-height: var(--cleancloud-mobile-shell) !important;
    position: relative !important;
    overflow: visible !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp {
    width: 100% !important;
    max-width: 100% !important;
    min-height: 100% !important;
    height: 100% !important;
    max-height: none !important;
    margin: 0 !important;
    overflow: auto !important;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudWebApp__container,
  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudWebApp__content,
  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudWebApp__appWrapper {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    max-width: 100% !important;
    flex: 1 1 auto !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_homeWrapper {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: visible !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_homeWrapperInner {
    height: 100% !important;
    overflow: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_order-flow-wrapper {
    max-width: 100% !important;
    width: 100% !important;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    box-sizing: border-box !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_order-flow-wrapper__logo {
    margin: 1rem 0 1.25rem !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_order-flow-wrapper__logo img {
    max-width: min(180px, 70vw) !important;
    height: auto !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudAuthentication {
    width: 100% !important;
    max-width: 100% !important;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    box-sizing: border-box !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_authenticationFormWrapper {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    box-sizing: border-box !important;
  }
}

/* ── Desktop: full height unlock + flatten fixed containers ── */
@media (min-width: 768px) {
  .cleancloud-booking-page {
    padding-top: var(--site-header-height, 6.625rem);
  }

  .cleancloud-booking-page #bookingToolWrapper,
  .cleancloud-booking-page #myStoreContainer,
  .cleancloud-booking-page .cleancloud-booking-widget {
    min-height: var(--cleancloud-shell-min);
    overflow: visible;
  }

  .cleancloud-booking-page .cleanCloudWebApp {
    display: flex !important;
    flex-direction: column !important;
    min-height: var(--cleancloud-shell-min) !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    padding: 0 0 2rem !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudWebApp__container,
  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudWebApp__content,
  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudWebApp__appWrapper,
  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudWebApp__orderStepsWrapper {
    display: flex !important;
    flex-direction: column !important;
    flex: 0 0 auto !important;
    flex-grow: 0 !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    overflow: visible !important;
    justify-content: flex-start !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .cleanCloudWebApp__content--desktop {
    background: var(--theme-bg) !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_homeWrapper,
  .cleancloud-booking-page .cleanCloudWebApp .__cc_homeWrapperInner,
  .cleancloud-booking-page .cleanCloudWebApp .ordersWrapper,
  .cleancloud-booking-page .cleanCloudWebApp .__cc_orders,
  .cleancloud-booking-page .cleanCloudWebApp .pricingWrapper {
    position: relative !important;
    inset: auto !important;
    top: auto !important;
    left: auto !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    overflow: visible !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_order-flow-wrapper {
    display: flex !important;
    flex-direction: column !important;
    flex: 0 0 auto !important;
    height: auto !important;
    min-height: 0 !important;
    max-width: 680px !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding-bottom: 1.5rem !important;
    overflow: visible !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_order-flow {
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    overflow: visible !important;
    flex: 0 0 auto !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_order-flow__container--fullscreen {
    position: relative !important;
    inset: auto !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    z-index: auto !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    overflow: visible !important;
  }

  .cleancloud-booking-page .cleanCloudWebApp .__cc_authWrapper,
  .cleancloud-booking-page .cleanCloudWebApp .__cc_order-flow__container,
  .cleancloud-booking-page .cleanCloudWebApp .footerMenuWrapper {
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }
}
`;

/** Injected after CleanCloud CSS so layout overrides win the cascade. */
export function injectCleanCloudOverrides(): void {
  if (typeof document === 'undefined') return;

  let style = document.getElementById(OVERRIDE_STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = OVERRIDE_STYLE_ID;
    style.dataset.cleancloudOverrides = 'true';
    document.head.appendChild(style);
  }

  style.textContent = CLEANCLOUD_OVERRIDE_CSS;
}

function applyCleanCloudMobileLayerFix(root: HTMLElement): void {
  root.style.setProperty('max-height', 'none', 'important');
  root.style.setProperty('height', '100%', 'important');
  root.style.setProperty('min-height', '100%', 'important');
  root.style.setProperty('max-width', '100%', 'important');

  root.querySelectorAll<HTMLElement>('.cleanCloudWebApp__container, .cleanCloudWebApp__content, .cleanCloudWebApp__appWrapper').forEach(
    (node) => {
      node.style.setProperty('position', 'relative', 'important');
      node.style.setProperty('height', '100%', 'important');
      node.style.setProperty('min-height', '100%', 'important');
      node.style.setProperty('width', '100%', 'important');
    },
  );

  root.querySelectorAll<HTMLElement>('.__cc_homeWrapper').forEach((node) => {
    node.style.setProperty('position', 'absolute', 'important');
    node.style.setProperty('top', '0', 'important');
    node.style.setProperty('left', '0', 'important');
    node.style.setProperty('width', '100%', 'important');
    node.style.setProperty('height', '100%', 'important');
  });

  root.querySelectorAll<HTMLElement>('.__cc_homeWrapperInner').forEach((node) => {
    node.style.setProperty('height', '100%', 'important');
    node.style.setProperty('overflow', 'auto', 'important');
  });
}

/** Walk widget nodes and undo CleanCloud height/overflow locks after mount or route changes. */
export function applyCleanCloudLayoutFix(): void {
  const root = document.querySelector<HTMLElement>('#myStoreContainer .cleanCloudWebApp');
  if (!root) return;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  if (isMobile) {
    applyCleanCloudMobileShell();
    applyCleanCloudMobileLayerFix(root);
    return;
  }

  const heightAutoClasses = [
    'cleanCloudWebApp',
    'cleanCloudWebApp__container',
    'cleanCloudWebApp__content',
    'cleanCloudWebApp__appWrapper',
    'cleanCloudWebApp__orderStepsWrapper',
    '__cc_order-flow',
    '__cc_order-flow-wrapper',
    '__cc_authWrapper',
    '__cc_homeWrapper',
    '__cc_homeWrapperInner',
    'ordersWrapper',
    '__cc_orders',
    'pricingWrapper',
  ];

  const overflowUnlockClasses = [
    'cleanCloudWebApp',
    'cleanCloudWebApp__content',
    '__cc_order-flow',
    '__cc_order-flow-wrapper',
    '__cc_authWrapper',
    '__cc_homeWrapperInner',
    'ordersWrapper',
    '__cc_orders',
  ];

  const relativePositionClasses = [
    '__cc_order-flow__container--fullscreen',
    '__cc_homeWrapper',
    'pricingWrapper',
  ];

  const unlock = (node: HTMLElement) => {
    const cls = typeof node.className === 'string' ? node.className : '';

    node.style.setProperty('max-height', 'none', 'important');

    if (heightAutoClasses.some((name) => cls.includes(name))) {
      node.style.setProperty('height', 'auto', 'important');
      node.style.setProperty('min-height', '0', 'important');
    }

    if (overflowUnlockClasses.some((name) => cls.includes(name))) {
      node.style.setProperty('overflow', 'visible', 'important');
    }

    if (relativePositionClasses.some((name) => cls.includes(name))) {
      node.style.setProperty('position', 'relative', 'important');
      node.style.setProperty('inset', 'auto', 'important');
    }
  };

  unlock(root);
  root.querySelectorAll<HTMLElement>('*').forEach(unlock);
}
