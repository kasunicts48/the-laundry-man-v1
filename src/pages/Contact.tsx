import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="pt-32 pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Get in Touch</h2>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-12">
        We&apos;re here to <span className="text-gold">help</span>.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-16">
        <div className="glass-card p-10 space-y-8">
           <h3 className="text-2xl font-bold text-white">London Office</h3>
           <div className="space-y-4 font-light text-ink">
             <div className="flex items-start gap-4">
               <MapPin className="text-gold mt-1 shrink-0" size={20} />
               <p>The Laundry Man App Ltd,<br/>71-75 Shelton Street, Covent Garden,<br/>London, WC2H 9JQ</p>
             </div>
             <div className="flex items-center gap-4">
               <Phone className="text-gold shrink-0" size={20} />
               <p>0800 037 0485 / 0845 299 3524</p>
             </div>
           </div>
        </div>

        <div className="glass-card p-10 space-y-8">
           <h3 className="text-2xl font-bold text-white">Manchester Office</h3>
           <div className="space-y-4 font-light text-ink">
             <div className="flex items-start gap-4">
               <MapPin className="text-gold mt-1 shrink-0" size={20} />
               <p>The Laundry Man App,<br/>61 Mosley St,<br/>Manchester M2 3HZ</p>
             </div>
             <div className="flex items-center gap-4">
               <Phone className="text-gold shrink-0" size={20} />
               <p>0161 241 9685 / 0161 509 2469</p>
             </div>
             <div className="flex items-center gap-4 pt-2">
               <Mail className="text-gold shrink-0" size={20} />
               <p>info@thelaundryman.co.uk</p>
             </div>
           </div>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
