import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { CityData } from '../data/cities';
import { services, type ServiceItem } from '../data/services';

interface ServicesOverviewProps {
  city?: string;
  cityData?: CityData;
  onBookNow?: (serviceId: string) => void;
  hideSectionHeader?: boolean;
}

export default function ServicesOverview({ city, cityData, onBookNow, hideSectionHeader = false }: ServicesOverviewProps = {}) {
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
    <section id="services" className={`bg-navy-alt transition-colors duration-500 relative ${hideSectionHeader ? 'pt-12 pb-24' : 'py-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideSectionHeader && (
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-eyebrow">Our Services</h2>
          {city ? (
             <>
               <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate tracking-tighter">Eco-Friendly Laundry in {cityData?.name || city}</h3>
               <p className="text-ink font-light mt-4 text-lg leading-relaxed">
                 {cityData ? cityData.servicesDescription : `Welcome to ${city}'s premier sustainable garment care service.`}
               </p>
             </>
          ) : (
             <>
               <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate tracking-tighter">Comprehensive Garment Care</h3>
               <p className="text-ink font-light mt-4 text-lg leading-relaxed">We handle everything from your everyday wash & fold to specialized dry cleaning, ensuring superior quality across all fabrics.</p>
             </>
          )}
        </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-x-8 md:gap-y-16 items-stretch max-w-5xl md:max-w-none mx-auto">
          {services.map((service, index) => {
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-full flex-col items-center text-center group cursor-pointer bg-transparent border-0 shadow-none rounded-none py-7 md:py-0 p-2 md:bg-navy md:border md:border-slate/5 md:rounded-3xl md:p-8 lg:p-10 md:shadow-sm md:hover:shadow-xl md:hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                onClick={() => setSelectedService(service)}
              >
                <div className="absolute inset-0 hidden bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:block"></div>

                <div className="relative z-10 flex h-full w-full flex-col justify-between items-center md:h-auto md:justify-start">
                  <div className="mx-auto mb-3 flex h-40 w-40 shrink-0 items-center justify-center sm:h-44 sm:w-44 md:mb-6 md:h-20 md:w-20 lg:h-24 lg:w-24">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="max-h-full max-w-full object-contain object-center transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      style={{ filter: "invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex w-full flex-col items-center md:gap-y-0">
                    <h4 className="mb-2 w-full px-1 text-center text-xl font-bold uppercase leading-snug tracking-wide text-slate transition-colors group-hover:text-gold sm:text-2xl md:mb-0 md:px-0.5 md:text-xl md:leading-snug">
                      {service.title}
                    </h4>

                    <div className="mt-2 flex w-full shrink-0 flex-col items-center justify-center text-sm sm:text-base md:mt-2 md:text-sm font-normal text-ink leading-snug md:leading-tight">
                      <span className="block md:inline">Prices starting from</span>
                      <span className="block md:inline md:ml-1">{service.price}</span>
                    </div>
                  </div>
                </div>

                {index < services.length - 1 && (
                  <hr
                    className="md:hidden mt-7 w-56 max-w-[80%] border-0 border-t border-slate/20"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
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
                className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4 bg-navy/80 backdrop-blur-sm"
                onClick={() => setSelectedService(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="bg-navy-alt rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[min(88dvh,calc(100dvh-env(safe-area-inset-bottom)-0.5rem))] sm:max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/10 border-b-0 sm:border-b"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 p-2 bg-slate/5 rounded-full hover:bg-slate/10 transition-colors z-10"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6 text-slate" />
                  </button>
                  <div className="p-6 sm:p-12 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pb-12 mt-4 sm:mt-0">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-16 h-16 mb-6 opacity-90"
                      style={{ filter: 'invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate mb-2 uppercase tracking-tighter">{selectedService.title}</h3>
                        <div className="text-sm font-normal text-ink">Prices starting from {selectedService.price}</div>
                      </div>
                      <button
                        type="button"
                        onClick={handleBookService}
                        className="w-full sm:w-auto px-8 py-3 border border-gold/50 bg-gold/10 text-gold font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-navy transition-colors rounded-full shrink-0 cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>

                    <div className="text-sm sm:text-base font-light leading-relaxed text-ink space-y-4">
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
