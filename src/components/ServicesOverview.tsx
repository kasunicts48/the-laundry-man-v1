import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Columns, Sparkles, Shirt, Wind, Briefcase, Layers, X } from 'lucide-react';
import type { CityData } from '../data/cities';

import curtainsImg from '../assets/images/curtains.png';
import suitDressImg from '../assets/images/suit-dress.png';
import foldedShirtImg from '../assets/images/folded-shirt.png';
import ironImg from '../assets/images/iron.png';
import suitCoverImg from '../assets/images/suit-cover.png';
import washingMachineImg from '../assets/images/washing-machine.png';

interface ServicesOverviewProps {
  city?: string;
  cityData?: CityData;
}

export default function ServicesOverview({ city, cityData }: ServicesOverviewProps = {}) {
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      title: "Curtain Cleaning",
      description: "Refresh and restore your curtains with our professional curtain cleaning service for both residential and commercial properties across Manchester. Using specialist cleaning techniques and careful handling, we remove dust, odours, and everyday build-up while helping to preserve the appearance, colour, and fabric quality of your curtains.\n\nWe have the expertise and equipment to clean a wide range of curtain types, including delicate and lined fabrics. We also specialise in cleaning blackout curtains, a service that requires particular care and is not widely offered. Every curtain is treated with attention to detail and returned fresh, clean, and ready to hang.",
      image: curtainsImg,
      price: "£10.00"
    },
    {
      title: "Wedding Dress Cleaning",
      description: "Preserve the beauty of your treasured gown with our specialist wedding dress cleaning service. Using gentle, professional cleaning techniques, we carefully treat delicate fabrics, intricate lace, beadwork, embroidery, and detailed embellishments to achieve the best possible results.\n\nEvery wedding dress receives individual attention and expert care, helping to remove marks and restore freshness while protecting the fabric and fine details. Whether you wish to preserve your gown as a keepsake or prepare it for future use, we ensure it is returned in the best possible condition with the care it deserves.",
      image: suitDressImg,
      price: "£50.00"
    },
    {
      title: "Shirt Service",
      description: "Look your best every day with our professional Shirt Service. Each shirt is carefully washed, expertly pressed, and finished to a high standard, ensuring a crisp, fresh, and professional appearance.\n\nUsing quality laundry processes and professional finishing equipment, we help maintain the shape, fabric quality, and appearance of your shirts. For your convenience, shirts can be returned neatly folded or individually hung and ready to wear, saving you valuable time while delivering outstanding results.",
      image: foldedShirtImg,
      price: "£6.00"
    },
    {
      title: "Ironing Service",
      description: "Enjoy perfectly finished garments with our professional ironing service. Each item is carefully pressed and finished with attention to detail, giving your clothes a crisp, fresh, and polished appearance.\n\nWe provide expert ironing for shirts, trousers, office wear, casual clothing, everyday dresses, occasion wear, and delicate fabrics. Using professional equipment and garment-specific techniques, we help maintain the shape, quality, and presentation of your clothing, saving you time while ensuring exceptional results every time.",
      image: ironImg,
      price: "£4.50"
    },
    {
      title: "Dry Cleaning",
      description: "Your garments are professionally cleaned, pressed, and finished using advanced, industry-leading equipment and premium eco-friendly cleaning solutions. Our carefully selected processes are designed to remove stains effectively while helping to preserve the colour, texture, and quality of your garments.\n\nWith a focus on quality and garment care, we use high-performance equipment and environmentally responsible products to deliver exceptional results while being gentle on both your clothes and the environment.",
      image: suitCoverImg,
      price: "£6.00"
    },
    {
      title: "Wash & Fold",
      description: "Enjoy the convenience of professionally washed, carefully dried, and neatly folded laundry, ready to wear or put away. Our Wash & Fold service is ideal for busy individuals, families, and businesses looking to save time without compromising on quality.\n\nFor garments that require extra care and a crisp, polished appearance, we also offer a professional ironing service. Every item is handled with attention to detail to ensure your clothes are returned fresh, clean, and finished to the highest standard.",
      image: washingMachineImg,
      price: "£4.50"
    }
  ];

  return (
    <section id="services" className="py-24 bg-navy-alt transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Our Services</h2>
          {city ? (
             <>
               <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate tracking-tighter">Eco-Friendly Laundry in {cityData?.name || city}</h3>
               <p className="text-slate opacity-60 font-light mt-4 text-lg leading-relaxed">
                 {cityData ? cityData.servicesDescription : `Welcome to ${city}'s premier sustainable garment care service.`}
               </p>
             </>
          ) : (
             <>
               <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate tracking-tighter">Comprehensive Garment Care</h3>
               <p className="text-slate opacity-60 font-light mt-4 text-lg leading-relaxed">We handle everything from your everyday wash & fold to specialized dry cleaning, ensuring superior quality across all fabrics.</p>
             </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group cursor-pointer bg-navy border border-slate/5 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                onClick={() => setSelectedService(service)}
              >
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="mb-6 relative z-10 w-20 h-20 lg:w-24 lg:h-24">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    style={{ filter: "invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <h4 className="text-lg font-bold text-slate mb-2 uppercase tracking-wide z-10 transition-colors group-hover:text-gold">{service.title}</h4>
                <div className="text-xs font-bold opacity-60 text-slate z-10">Prices starting from {service.price}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-navy-alt rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/10"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 bg-slate/5 rounded-full hover:bg-slate/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-slate" />
              </button>
              <div className="p-8 sm:p-12 mt-4 sm:mt-0">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="w-16 h-16 mb-6 opacity-90"
                  style={{ filter: "invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate mb-2 uppercase tracking-tighter">{selectedService.title}</h3>
                    <div className="text-sm font-bold opacity-80 text-slate">Prices starting from {selectedService.price}</div>
                  </div>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto px-8 py-3 border border-slate/20 text-slate/60 font-bold uppercase tracking-widest text-xs hover:border-slate/40 hover:text-slate transition-colors rounded-full shrink-0"
                  >
                    Book Now
                  </button>
                </div>
                
                <div className="text-sm sm:text-base font-light leading-relaxed text-slate opacity-80 space-y-4">
                  {selectedService.description.split('\n\n').map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
