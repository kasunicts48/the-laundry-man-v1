export const APP_STORE_URL =
  'https://apps.apple.com/gb/app/the-laundryman-app/id6748582882';

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.cleancloudapp.thelaundryman';

export const DOWNLOAD_APP_PATH = '/download-app';

export const QR_CODE_FG_COLOR = '#FFFFFF';
export const QR_CODE_BG_COLOR = '#2A3B4C';

const PRODUCTION_SITE_URL = 'https://www.thelaundryman.co.uk';

export function getAppStoreRedirectTarget(
  userAgent: string,
  platform = '',
  maxTouchPoints = 0,
): string {
  if (/android/i.test(userAgent)) {
    return PLAY_STORE_URL;
  }

  if (/iPhone|iPod|iPad/i.test(userAgent)) {
    return APP_STORE_URL;
  }

  if (platform === 'MacIntel' && maxTouchPoints > 1) {
    return APP_STORE_URL;
  }

  // Desktop / unknown: land on the app section with store badges
  return '/#the-app';
}

/**
 * QR codes encode `{site origin}/download-app` so scans follow whatever host
 * the site is running on (production, staging, or a configured VITE_SITE_URL).
 */
export function getDownloadAppQrUrl(): string {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const { hostname, origin } = window.location;
    const isLocalHost =
      hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local');

    // Phones cannot open localhost — use configured public URL when developing locally.
    if (isLocalHost) {
      return `${configuredSiteUrl || PRODUCTION_SITE_URL}${DOWNLOAD_APP_PATH}`;
    }

    return `${origin}${DOWNLOAD_APP_PATH}`;
  }

  return `${configuredSiteUrl || PRODUCTION_SITE_URL}${DOWNLOAD_APP_PATH}`;
}
