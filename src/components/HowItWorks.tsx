import React from 'react';
import { CalendarCheck, Truck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <CalendarCheck size={40} className="text-gold" />,
      title: "1. Schedule & Book",
      description: "Book online or via the app. Choose a convenient collection time that works for your schedule."
    },
    {
      icon: <Truck size={40} className="text-gold" />,
      title: "2. We Collect",
      description: "Our driver collects your laundry directly from your door—home, office, or hotel."
    },
    {
      icon: <Sparkles size={40} className="text-gold" />,
      title: "3. Clean Delivery",
      description: "Fresh, spotless, and professionally folded clothes delivered back to you in just 24 hours."
    }
  ];

  return (
    <section id="about" className="py-24 bg-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">How It Works</h2>
          <h3 className="text-4xl sm:text-5xl font-extrabold text-slate tracking-tighter">Effortless Laundry in 3 Simple Steps</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-white/10 z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-glass/10 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center mb-6 border border-gold/20 group-hover:bg-gold/5 transition-colors duration-300 transform -rotate-3 group-hover:rotate-0">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-slate mb-3">{step.title}</h4>
              <p className="text-sm opacity-60 leading-relaxed px-4 text-slate">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
