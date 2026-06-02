import React from 'react';
import { motion } from 'motion/react';
import type { CityData } from '../data/cities';

import dryCleaningImg from '../assets/images/dry_cleaning_1779977874771.png';
import washAndFoldImg from '../assets/images/wash_and_fold_1779977895762.png';
import ironingServiceImg from '../assets/images/ironing_service_1779977916535.png';
import beddingImg from '../assets/images/bedding_1779977935678.png';
import shirtServiceImg from '../assets/images/shirt_service_1779977953525.png';
import alterationsImg from '../assets/images/alterations_1779977969827.png';

interface ServicesOverviewProps {
  city?: string;
  cityData?: CityData;
}

export default function ServicesOverview({ city, cityData }: ServicesOverviewProps = {}) {
  const services = [
    {
      title: "Dry Cleaning",
      description: "Premium care for delicate garments, suits, and dresses using eco-friendly solvents.",
      image: dryCleaningImg
    },
    {
      title: "Wash & Fold",
      description: "Everyday laundry separated, washed at optimal temperatures, and neatly folded.",
      image: washAndFoldImg
    },
    {
      title: "Ironing Service",
      description: "Crisp, professional hand-ironing for shirts, trousers, and delicate fabrics.",
      image: ironingServiceImg
    },
    {
      title: "Bedding & Duvets",
      description: "Deep cleaning for duvets, pillows, and bed linens, returning them fresh and fluffy.",
      image: beddingImg
    },
    {
      title: "Shirt Service",
      description: "Washed, expertly pressed, and returned on a hanger or carefully folded.",
      image: shirtServiceImg
    },
    {
      title: "Alterations",
      description: "Expert tailoring and repair services to keep your favorite garments fitting perfectly.",
      image: alterationsImg
    }
  ];

  return (
    <section id="services" className="py-24 bg-navy-alt transition-colors duration-500 hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Our Services</h2>
            {city ? (
              <>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-slate tracking-tighter">Eco-Friendly Laundry in {cityData?.name || city}</h3>
                <p className="text-slate opacity-60 font-light mt-4 text-lg leading-relaxed">
                  {cityData ? cityData.servicesDescription : `Welcome to ${city}'s premier sustainable garment care service. We offer a full suite of services, from premium dry cleaning using 100% eco-solvent processes to convenient wash & fold, ensuring that residents of ${city} receive superior quality without harsh chemicals harming the planet.`}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-slate tracking-tighter">Comprehensive Garment Care</h3>
                <p className="text-slate opacity-60 font-light mt-4 text-lg leading-relaxed">We handle everything from your everyday wash & fold to specialized dry cleaning, ensuring superior quality across all fabrics.</p>
              </>
            )}
          </div>
          <button className="px-8 py-4 border border-gold text-gold pill hover:bg-gold hover:text-navy transition-all font-bold uppercase tracking-wide text-xs shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] flex-shrink-0">
            View All Services
          </button>
        </div>

        {!city && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden group hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative border-b border-white/5">
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-slate mb-3 group-hover:text-gold transition-colors">{service.title}</h4>
                  <p className="text-sm opacity-60 leading-relaxed text-slate">{service.description}</p>
                  <div className="mt-6 flex items-center text-slate font-bold text-sm cursor-pointer group-hover:text-gold transition-colors">
                    Learn more <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
