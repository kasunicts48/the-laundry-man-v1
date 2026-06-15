import React from 'react';

export default function Commercial() {
  return (
    <div className="pt-32 pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Corporate Solutions</h2>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
        Commercial <span className="text-gold">Cleaning</span>.
      </h1>
      <p className="text-lg sm:text-xl text-ink max-w-3xl font-light leading-relaxed">
        Reliable, high-volume laundry and dry cleaning services for hotels, restaurants, and businesses. 
        Get customized pricing and scheduled collections to keep your operations running smoothly.
      </p>
    </div>
  );
}
