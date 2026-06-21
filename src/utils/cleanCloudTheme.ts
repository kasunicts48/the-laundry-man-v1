function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/** Maps site CSS theme tokens to CleanCloud widget theme options. */
export function getCleanCloudThemeOptions() {
  const bg = readCssVar('--theme-bg', '#FFFFFF');
  const bgAlt = readCssVar('--theme-bg-alt', '#F5F8F5');
  const accent = readCssVar('--theme-accent', '#4CAF50');
  const textSoft = readCssVar('--theme-text-soft', '#2C5125');
  const textStrong = readCssVar('--theme-text-strong', '#1B3516');

  const isLightSurface = bg.toLowerCase() === '#ffffff' || bg.startsWith('#f');

  return {
    theme: {
      color: accent,
      contrast: textStrong,
      darker: accent,
      border: {
        visible: false,
        color: accent,
        width: '1px',
      },
      auth: {
        backgroundColor: bg,
        logo: '',
      },
      multipleSelection: {
        backgroundColor: bgAlt,
      },
      loader: {
        color: accent,
        backgroundColor: bg,
      },
      button: {
        color: accent,
        darker: accent,
        disabled: isLightSurface ? '#9ca3af' : '#4b5563',
        text: isLightSurface ? textStrong : bg,
      },
      order: {
        create: {
          color: accent,
          darker: accent,
        },
        selection: {
          color: bgAlt,
          darker: bg,
          text: textSoft,
        },
        status: {
          progress: accent,
          done: accent,
        },
      },
    },
  };
}
