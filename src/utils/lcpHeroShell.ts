import { isReservedPathSegment } from '../data/locations';

export function pathHasHero(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/') return true;

  const segments = normalized.split('/').filter(Boolean);
  if (segments.length !== 1) return false;

  return !isReservedPathSegment(segments[0]);
}

export function removeLcpHeroShell(): void {
  document.getElementById('lcp-hero-shell')?.remove();
}
