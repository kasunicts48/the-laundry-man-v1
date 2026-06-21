import { injectCleanCloudOverrides } from './cleanCloudOverrides';

const CLEANCLOUD_CSS_URL = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.css';
const CLEANCLOUD_JS_URL = 'https://cleancloudapp.com/webapp/public/webapp/cleancloud.js';

let cssLoaded = false;
let cssPromise: Promise<void> | null = null;
let jsPromise: Promise<void> | null = null;

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
    const existing = document.querySelector('script[data-cleancloud-js]');
    if (existing) {
      existing.addEventListener('load', () => {
        if (typeof window.CleanCloudWebApp === 'function') resolve();
        else reject(new Error('CleanCloudWebApp is not defined after script load'));
      });
      existing.addEventListener('error', () => reject(new Error('Failed to load CleanCloud SDK')));
      return;
    }

    const script = document.createElement('script');
    script.src = CLEANCLOUD_JS_URL;
    script.async = true;
    script.dataset.cleancloudJs = 'true';
    script.onload = () => {
      if (typeof window.CleanCloudWebApp === 'function') {
        resolve();
        return;
      }
      reject(new Error('CleanCloudWebApp is not defined after script load'));
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
