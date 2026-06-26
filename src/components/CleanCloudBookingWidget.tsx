import React, { useEffect, useRef, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { loadCleanCloudSdk, waitForCleanCloudWebApp } from '../utils/loadCleanCloudSdk';
import { injectCleanCloudOverrides, applyCleanCloudLayoutFix, applyCleanCloudMobileShell, getCleanCloudMobileShellHeight } from '../utils/cleanCloudOverrides';
import { handleOrderSuccess } from '../utils/orderPlaced';
import type { CleanCloudWidgetInstance } from '../types/cleancloud';

const CLEANCLOUD_STORE_ID = Number(import.meta.env.VITE_CLEANCLOUD_STORE_ID ?? 4012);
const CONTAINER_ID = 'myStoreContainer';
const CONTAINER_SELECTOR = `#${CONTAINER_ID}`;

function isMobileViewport(): boolean {
  return window.matchMedia('(max-width: 767px)').matches;
}

interface CleanCloudBookingWidgetProps {
  onOrderSuccess?: () => void;
}

type LoadState = 'loading' | 'ready' | 'error';

export default function CleanCloudBookingWidget({ onOrderSuccess }: CleanCloudBookingWidgetProps) {
  const widgetRef = useRef<CleanCloudWidgetInstance | null>(null);
  const layoutObserverRef = useRef<MutationObserver | null>(null);
  const layoutRefreshTimerRef = useRef<number | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);

  const scheduleLayoutRefresh = () => {
    if (layoutRefreshTimerRef.current !== null) {
      window.clearTimeout(layoutRefreshTimerRef.current);
    }

    layoutRefreshTimerRef.current = window.setTimeout(() => {
      injectCleanCloudOverrides();
      applyCleanCloudMobileShell();
      applyCleanCloudLayoutFix();
      window.dispatchEvent(new Event('resize'));
    }, 120);
  };

  useEffect(() => {
    const onViewportChange = () => scheduleLayoutRefresh();

    window.addEventListener('resize', onViewportChange);
    window.addEventListener('orientationchange', onViewportChange);

    return () => {
      window.removeEventListener('resize', onViewportChange);
      window.removeEventListener('orientationchange', onViewportChange);
    };
  }, []);

  const destroyWidget = () => {
    widgetRef.current?.destroy();
    widgetRef.current = null;
  };

  useEffect(() => {
    const onOrderCompleted = () => {
      handleOrderSuccess();
      onOrderSuccess?.();
    };

    window.addEventListener('CleanCloud.ORDER_COMPLETED', onOrderCompleted);
    return () => window.removeEventListener('CleanCloud.ORDER_COMPLETED', onOrderCompleted);
  }, [onOrderSuccess]);

  useEffect(() => {
    let cancelled = false;

    const initWidget = async () => {
      setLoadState('loading');
      setLoadError(null);

      try {
        await loadCleanCloudSdk();
        await waitForCleanCloudWebApp();
        if (cancelled) return;

        if (typeof window.CleanCloudWebApp !== 'function') {
          throw new Error('CleanCloudWebApp is not defined');
        }

        if (!document.querySelector(CONTAINER_SELECTOR)) {
          throw new Error('CleanCloud container is not available');
        }

        destroyWidget();

        applyCleanCloudMobileShell();
        await new Promise<void>((resolve) => {
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
        });

        const mobileHeight = isMobileViewport() ? getCleanCloudMobileShellHeight() : undefined;

        widgetRef.current = window.CleanCloudWebApp(CONTAINER_SELECTOR, CLEANCLOUD_STORE_ID, {
          width: 'auto',
          height: isMobileViewport() ? mobileHeight : 'auto',
          responsivityEnabled: true,
        });

        injectCleanCloudOverrides();
        applyCleanCloudLayoutFix();

        if (!cancelled) {
          setLoadState('ready');
          scheduleLayoutRefresh();
          window.requestAnimationFrame(scheduleLayoutRefresh);
          window.setTimeout(scheduleLayoutRefresh, 500);
          window.setTimeout(scheduleLayoutRefresh, 1500);

          layoutObserverRef.current?.disconnect();
          const container = document.querySelector(CONTAINER_SELECTOR);
          if (container) {
            layoutObserverRef.current = new MutationObserver(scheduleLayoutRefresh);
            layoutObserverRef.current.observe(container, { childList: true, subtree: true });
          }
        }
      } catch (error) {
        if (cancelled) return;
        destroyWidget();
        setLoadError(
          error instanceof Error
            ? error.message
            : 'Unable to load the booking system. Please try again later.',
        );
        setLoadState('error');
      }
    };

    void initWidget();

    return () => {
      cancelled = true;
      layoutObserverRef.current?.disconnect();
      if (layoutRefreshTimerRef.current !== null) {
        window.clearTimeout(layoutRefreshTimerRef.current);
      }
      destroyWidget();
    };
  }, []);

  return (
    <div className="cleancloud-booking-widget relative flex h-full min-h-0 w-full flex-col">
      <div id="bookingToolWrapper" className="flex min-h-0 flex-1 flex-col">
        <div id={CONTAINER_ID} className="min-h-0 flex-1" />
      </div>

      {loadState === 'loading' && (
        <div className="absolute inset-0 z-10 flex min-h-[20rem] flex-col items-center justify-center gap-3 bg-navy sm:min-h-[24rem]">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
          <p className="text-sm font-light text-slate">Loading booking system…</p>
        </div>
      )}

      {loadState === 'error' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-navy px-6 text-center">
          <AlertCircle className="h-10 w-10 text-gold" />
          <p className="max-w-md text-sm font-light leading-relaxed text-slate">{loadError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full border border-gold/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

export { handleOrderSuccess } from '../utils/orderPlaced';
