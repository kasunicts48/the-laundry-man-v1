import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { CityData } from '../data/cities';
import { services, type ServiceItem } from '../data/services';

const iconFilter =
  'invert(55%) sepia(18%) saturate(700%) hue-rotate(100deg) brightness(95%) contrast(88%)';

interface ServicesOverviewProps {
  city?: string;
  cityData?: CityData;
  onBookNow?: (serviceId: string) => void;
  hideSectionHeader?: boolean;
}

function ServiceIcon({ image, title }: { image: string; title: string }) {
  return (
    <img
      src={image}
      alt={title}
      className="h-full w-full object-contain opacity-90"
      style={{ filter: iconFilter }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}

export default function ServicesOverview({
  city,
  cityData,
  onBookNow,
  hideSectionHeader = false,
}: ServicesOverviewProps = {}) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleBookService = () => {
    if (!selectedService) return;
    const serviceId = selectedService.id;
    setSelectedService(null);
    onBookNow?.(serviceId);
  };

  useEffect(() => {
    if (!selectedService) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedService]);

  return (
    <section
      id="services"
      className={`relative scroll-mt-28 overflow-hidden border-y border-black/5 bg-navy transition-colors duration-500 ${
        hideSectionHeader ? 'pt-12 pb-24' : 'py-16 sm:py-24'
      }`}
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideSectionHeader && (
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
            <p className="section-eyebrow mb-3">Our Services</p>
            {city ? (
              <>
                <h3 className="text-3xl font-semibold tracking-tight text-slate sm:text-4xl lg:text-5xl">
                  Eco-Friendly Laundry in {cityData?.name || city}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-ink sm:text-lg">
                  We process all garments at our own premises. With many years of experience, we
                  deliver the highest quality service to every customer.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-semibold tracking-tight text-slate sm:text-4xl lg:text-5xl">
                  Professional garments care
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-ink sm:text-lg">
                  We process all garments at our own premises. With many years of experience, we
                  deliver the highest quality service to every customer.
                </p>
              </>
            )}
          </div>
        )}

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-0 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className="group flex h-full w-full cursor-pointer flex-col items-center bg-transparent px-4 py-8 text-center shadow-none max-md:border-b max-md:border-slate/20 max-md:last:border-b-0 md:aspect-square md:justify-center md:rounded-2xl md:border md:border-black/10 md:bg-paper md:p-3 md:shadow-[0_8px_30px_rgba(0,0,0,0.07)]"
              onClick={() => setSelectedService(service)}
              aria-label={`View details for ${service.title}`}
            >
              <div className="mb-4 flex h-44 w-44 items-center justify-center md:mb-2 md:h-[52%] md:w-[52%]">
                <ServiceIcon image={service.image} title={service.title} />
              </div>

              <h4 className="text-2xl font-semibold leading-snug tracking-tight text-slate md:text-base lg:text-lg">
                {service.title}
              </h4>
            </button>
          ))}
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedService && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                onClick={() => setSelectedService(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="relative max-h-[min(88dvh,calc(100dvh-env(safe-area-inset-bottom)-0.5rem))] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-gold/20 bg-paper shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute right-4 top-4 z-10 rounded-full bg-slate/5 p-2 transition-colors hover:bg-slate/10"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6 text-slate" />
                  </button>
                  <div className="mt-4 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:mt-0 sm:p-10 sm:pb-10">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 p-3">
                      <ServiceIcon image={selectedService.image} title={selectedService.title} />
                    </div>

                    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="text-left">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate sm:text-3xl">
                          {selectedService.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={handleBookService}
                        className="w-full shrink-0 cursor-pointer rounded-full border border-gold/50 bg-gold/10 px-8 py-3 text-sm font-semibold tracking-wide text-gold transition-colors hover:bg-gold hover:text-paper sm:w-auto"
                      >
                        Schedule your collection
                      </button>
                    </div>

                    <div className="space-y-4 text-left text-sm font-light leading-relaxed text-ink sm:text-base">
                      {selectedService.description.split('\n\n').map((paragraph: string, i: number) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
