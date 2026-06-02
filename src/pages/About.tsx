import React from 'react';

export default function About() {
  return (
    <div className="pt-32 pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">About Us</h2>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
        Dedicated to <span className="text-gold">Quality</span> and the <span className="text-gold">Planet</span>.
      </h1>
      <p className="text-lg sm:text-xl text-slate opacity-80 max-w-3xl font-light leading-relaxed">
        We are a premium eco-friendly laundry and dry cleaning service. 
        Our closed-loop technology and pH-neutral bio-enzymes ensure your garments receive the best care possible, without harming the environment.
      </p>
    </div>
  );
}
