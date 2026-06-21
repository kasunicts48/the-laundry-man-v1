const OVERRIDE_STYLE_ID = 'cleancloud-booking-overrides';

export const CLEANCLOUD_OVERRIDE_CSS = `
.cleancloud-booking-page .cleanCloudWebApp .__cc_desktopFooter {
  display: none !important;
  box-shadow: none !important;
}

.cleancloud-booking-page .cleanCloudWebApp #poweredByCleanCloud {
  display: none !important;
}

.cleancloud-booking-page .cleancloud-booking-shell .cleanCloudWebApp .cleanCloudAuthentication .__cc_authenticationFormWrapper {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
}
`;

/** Injected after CleanCloud CSS so branding/shadow overrides win the cascade. */
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
