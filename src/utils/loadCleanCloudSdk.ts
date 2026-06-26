import { injectCleanCloudOverrides } from './cleanCloudOverrides';

const CLEANCLOUD_CSS_URL = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.css';
const CLEANCLOUD_JS_URL = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.js';

const WEBAPP_POLL_INTERVAL_MS = 500;
const WEBAPP_MAX_ATTEMPTS = 24;

let cssLoaded = false;
let cssPromise: Promise<void> | null = null;
let jsPromise: Promise<void> | null = null;

export async function waitForCleanCloudWebApp(
  maxAttempts = WEBAPP_MAX_ATTEMPTS,
  intervalMs = WEBAPP_POLL_INTERVAL_MS,
): Promise<void> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (typeof window.CleanCloudWebApp === 'function') {
      return;
    }

    await new Promise((resolve) => window.setTimeout(resolve, intervalMs));
  }

  throw new Error('CleanCloudWebApp is not defined');
}

function loadCleanCloudCss(): Promise<void> {
  injectCleanCloudOverrides();

  if (cssLoaded || document.querySelector('link[data-cleancloud-css]')) {
    cssLoaded = true;
    injectCleanCloudOverrides();
    return Promise.resolve();
  }

  if (cssPromise) {
    return cssPromise;
  }

  cssPromise = new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CLEANCLOUD_CSS_URL;
    link.dataset.cleancloudCss = 'true';
    link.onload = () => {
      cssLoaded = true;
      injectCleanCloudOverrides();
      resolve();
    };
    link.onerror = () => reject(new Error('Failed to load CleanCloud CSS'));
    document.head.appendChild(link);
  });

  return cssPromise;
}

function loadCleanCloudJs(): Promise<void> {
  if (typeof window.CleanCloudWebApp === 'function') {
    return Promise.resolve();
  }

  if (jsPromise) {
    return jsPromise;
  }

  jsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-cleancloud-js]');

    const finish = () => {
      waitForCleanCloudWebApp()
        .then(resolve)
        .catch(reject);
    };

    if (existing) {
      if (existing.dataset.cleancloudLoaded === 'true') {
        finish();
        return;
      }

      existing.addEventListener(
        'load',
        () => {
          existing.dataset.cleancloudLoaded = 'true';
          finish();
        },
        { once: true },
      );
      existing.addEventListener(
        'error',
        () => reject(new Error('Failed to load CleanCloud SDK')),
        { once: true },
      );

      if (existing.readyState === 'complete' || existing.readyState === 'loaded') {
        existing.dataset.cleancloudLoaded = 'true';
        finish();
      }

      return;
    }

    const script = document.createElement('script');
    script.src = CLEANCLOUD_JS_URL;
    script.type = 'text/javascript';
    script.dataset.cleancloudJs = 'true';
    script.onload = () => {
      script.dataset.cleancloudLoaded = 'true';
      finish();
    };
    script.onerror = () => reject(new Error('Failed to load CleanCloud SDK'));
    document.body.appendChild(script);
  });

  return jsPromise;
}

/** Loads CleanCloud stylesheet and SDK script once per page session. */
export async function loadCleanCloudSdk(): Promise<void> {
  await loadCleanCloudCss();
  injectCleanCloudOverrides();
  await loadCleanCloudJs();
  injectCleanCloudOverrides();
}
