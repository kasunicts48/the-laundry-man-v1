export const APP_STORE_URL =
  'https://apps.apple.com/kr/app/the-laundryman-app/id6748582882?l=en-GB';

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.cleancloudapp.thelaundryman';

export const DOWNLOAD_APP_PATH = '/download-app';

export const QR_CODE_FG_COLOR = '#ffffff';
export const QR_CODE_BG_COLOR = 'rgb(27, 53, 22)';

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

  return '/';
}

/** QR codes must use a phone-reachable URL (never localhost). */
export function getDownloadAppQrUrl(): string {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const { hostname, origin } = window.location;
    const isLocalHost =
      hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local');

    if (isLocalHost) {
      return `${configuredSiteUrl || PRODUCTION_SITE_URL}${DOWNLOAD_APP_PATH}`;
    }

    return `${origin}${DOWNLOAD_APP_PATH}`;
  }

  return `${configuredSiteUrl || PRODUCTION_SITE_URL}${DOWNLOAD_APP_PATH}`;
}
