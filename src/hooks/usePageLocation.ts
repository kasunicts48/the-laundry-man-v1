import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getPageLocation, type PageLocation } from '../data/locations';

export function usePageLocation(): PageLocation {
  const { location: locationSlug } = useParams<{ location?: string }>();
  const { pathname } = useLocation();

  const slugFromPath = useMemo(() => {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    if (normalizedPath === '/') return null;

    const segment = locationSlug ?? normalizedPath.split('/').filter(Boolean)[0];
    return segment || null;
  }, [locationSlug, pathname]);

  return useMemo(() => getPageLocation(slugFromPath), [slugFromPath]);
}
