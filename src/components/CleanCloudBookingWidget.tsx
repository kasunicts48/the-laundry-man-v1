import React, { useEffect, useRef, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { loadCleanCloudSdk } from '../utils/loadCleanCloudSdk';
import { getCleanCloudThemeOptions } from '../utils/cleanCloudTheme';
import { handleOrderSuccess } from '../utils/orderPlaced';
import type { CleanCloudWidgetInstance } from '../types/cleancloud';

const CLEANCLOUD_STORE_ID = Number(import.meta.env.VITE_CLEANCLOUD_STORE_ID ?? 4012);
const CONTAINER_ID = 'myStoreContainer';
const CONTAINER_SELECTOR = `#${CONTAINER_ID}`;

interface CleanCloudBookingWidgetProps {
  onOrderSuccess?: () => void;
}

type LoadState = 'loading' | 'ready' | 'error';

export default function CleanCloudBookingWidget({ onOrderSuccess }: CleanCloudBookingWidgetProps) {
  const widgetRef = useRef<CleanCloudWidgetInstance | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);

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
        if (cancelled) return;

        if (typeof window.CleanCloudWebApp !== 'function') {
          throw new Error('CleanCloudWebApp is not defined');
        }

        if (!document.querySelector(CONTAINER_SELECTOR)) {
          throw new Error('CleanCloud container is not available');
        }

        destroyWidget();

        widgetRef.current = window.CleanCloudWebApp(CONTAINER_SELECTOR, CLEANCLOUD_STORE_ID, {
          width: 'auto',
          height: 'auto',
          responsivityEnabled: true,
          ...getCleanCloudThemeOptions(),
        });

        if (!cancelled) {
          setLoadState('ready');
        }
      } catch (error) {
        if (cancelled) return;
        destroyWidget();
        setLoadError(
          error instanceof Error
            ? error.message
            : 'Unable to load the booking system. Please try again later.'
        );
        setLoadState('error');
      }
    };

    void initWidget();

    return () => {
      cancelled = true;
      destroyWidget();
    };
  }, []);

  return (
    <div className="relative w-full">
      {loadState === 'loading' && (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-phone-border bg-navy-alt py-16">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
          <p className="text-sm font-light text-slate">Loading booking system…</p>
        </div>
      )}

      {loadState === 'error' && (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-phone-border bg-navy-alt px-6 py-16 text-center">
          <AlertCircle className="h-10 w-10 text-gold" />
          <p className="max-w-md text-sm font-light leading-relaxed text-slate">{loadError}</p>
        </div>
      )}

      <div
        className={`cleancloud-booking-shell w-full rounded-2xl ${loadState === 'ready' ? 'block' : 'hidden'}`}
        aria-hidden={loadState !== 'ready'}
      >
        <div id={CONTAINER_ID} className="cleancloud-store-container w-full" />
      </div>
    </div>
  );
}

export { handleOrderSuccess } from '../utils/orderPlaced';
