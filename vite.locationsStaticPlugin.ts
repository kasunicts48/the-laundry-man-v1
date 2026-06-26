import type { Plugin } from 'vite';

/** Serve public/locations/index.html for /locations URLs in dev and preview. */
export function locationsStaticPlugin(): Plugin {
  const rewriteLocationsUrl = (url: string | undefined): string | undefined => {
    if (!url) return url;

    const [pathname, search = ''] = url.split('?');

    if (pathname === '/locations' || pathname === '/locations/') {
      return `/locations/index.html${search ? `?${search}` : ''}`;
    }

    return url;
  };

  const middleware = (
    req: { url?: string },
    _res: unknown,
    next: () => void,
  ) => {
    const rewritten = rewriteLocationsUrl(req.url);
    if (rewritten !== req.url) {
      req.url = rewritten;
    }
    next();
  };

  return {
    name: 'locations-static',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
