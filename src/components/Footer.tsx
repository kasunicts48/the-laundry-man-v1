import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy text-white pt-24 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy font-heading font-bold text-xl">
                LM
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                The Laundry<br/><span className="text-gold leading-none block -mt-1 font-light tracking-wider uppercase text-[10px]">Man.</span>
              </span>
            </div>
            <p className="text-slate opacity-60 mb-6 font-light leading-relaxed">
              Premium, eco-friendly laundry and dry cleaning services returning your garments pristine within 24 hours.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">X</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate opacity-80 font-medium text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14}/> About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14}/> Services</Link></li>
              <li><Link to="/commercial" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14}/> Commercial Cleaning</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14}/> Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight size={14}/> Contact</Link></li>
            </ul>
          </div>

          {/* Contact & Offices */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-6">Our Offices</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-slate opacity-80 font-light text-sm leading-relaxed">
              
              {/* London */}
              <div>
                <h5 className="text-white font-bold text-base mb-3 border-b border-white/20 pb-2">London Office</h5>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                    <span>The Laundry Man App Ltd,<br/>71-75 Shelton Street, Covent Garden,<br/>London, WC2H 9JQ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gold shrink-0" />
                    <span>0800 037 0485 / 0845 299 3524</span>
                  </div>
                </div>
              </div>

              {/* Manchester */}
              <div>
                <h5 className="text-white font-bold text-base mb-3 border-b border-white/20 pb-2">Manchester Office</h5>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                    <span>The Laundry Man App,<br/>61 Mosley St,<br/>Manchester M2 3HZ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gold shrink-0" />
                    <span>0161 241 9685 / 0161 509 2469</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Mail size={18} className="text-gold shrink-0" />
                    <a href="mailto:info@thelaundryman.co.uk" className="hover:text-white">info@thelaundryman.co.uk</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Service Areas */}
        <div className="py-8 border-y border-white/5 mb-8">
          <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-6">Service Areas (The Laundry Man App UK)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-xs text-slate opacity-60 font-light leading-relaxed">
            <div>
              <span className="text-white font-bold block mb-1 uppercase tracking-widest text-[10px] opacity-80">East London</span>
              <p>Hackney, Walthamstow, Dalston, Canary Wharf</p>
            </div>
            <div>
              <span className="text-white font-bold block mb-1 uppercase tracking-widest text-[10px] opacity-80">North London</span>
              <p>Stoke Newington, Highbury, Holloway, Homerton, Hoxton, Camden, Crouch End, Finsbury Park</p>
            </div>
            <div>
              <span className="text-white font-bold block mb-1 uppercase tracking-widest text-[10px] opacity-80">South London</span>
              <p>Richmond Upon, London Fields, Muswell Hill, Stratford, Islington</p>
            </div>
            <div>
              <span className="text-white font-bold block mb-1 uppercase tracking-widest text-[10px] opacity-80">West London</span>
              <p>Mayfair, Tottenham, Wood Green, Stamford Hill, Leytonstone</p>
            </div>
            <div>
              <span className="text-white font-bold block mb-1 uppercase tracking-widest text-[10px] opacity-80">Other Cities/Regions</span>
              <p className="flex flex-wrap gap-2">
                <Link to="/manchester" className="hover:text-gold transition-colors">Manchester</Link>, 
                <Link to="/leeds" className="hover:text-gold transition-colors">Leeds</Link>, 
                <Link to="/birmingham" className="hover:text-gold transition-colors">Birmingham</Link>, 
                <Link to="/sheffield" className="hover:text-gold transition-colors">Sheffield</Link>, 
                <Link to="/cheshire" className="hover:text-gold transition-colors">Cheshire</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate/50 font-medium">
          <p>© {new Date().getFullYear()} The Laundry Man App Ltd. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Icons by Flaticon</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
