function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/** Maps site CSS theme tokens to CleanCloud widget theme options. */
export function getCleanCloudThemeOptions() {
  const bg = readCssVar('--theme-bg', '#FAFAFA');
  const bgAlt = readCssVar('--theme-bg-alt', '#F3F6F4');
  const accent = readCssVar('--theme-accent', '#68A88C');
  const textSoft = readCssVar('--theme-text-soft', '#2A3B4C');
  const textStrong = readCssVar('--theme-text-strong', '#2A3B4C');

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
