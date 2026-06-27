import { useLayoutEffect } from 'react';
import { getAppStoreRedirectTarget } from '../data/appStoreLinks';

export default function AppRedirect() {
  useLayoutEffect(() => {
    const target = getAppStoreRedirectTarget(
      navigator.userAgent || navigator.vendor || '',
      navigator.platform || '',
      navigator.maxTouchPoints || 0,
    );

    window.location.replace(target);
  }, []);

  return null;
}
