import React, { useState } from 'react';
import { X, Calendar, MapPin, PackageOpen, Tag, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { BookingPayload } from '../types';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingForm({ isOpen, onClose }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', postcode: '', instructions: '',
    serviceType: '', volume: '', notes: '',
    collectionDate: '', collectionTime: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: BookingPayload = {
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      },
      location: {
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        instructions: formData.instructions
      },
      service: {
        type: formData.serviceType,
        volume: formData.volume,
        notes: formData.notes
      },
      schedule: {
        collectionDate: formData.collectionDate,
        collectionTime: formData.collectionTime
      },
      metadata: {
        sourceUrl: window.location.href,
        submittedAt: new Date().toISOString()
      }
    };

    // Simulate Network Request / Email Send
    setTimeout(() => {
      console.log("Email Notification Payload:", JSON.stringify(payload, null, 2));
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setFormData({
      fullName: '', email: '', phone: '',
      address: '', city: '', postcode: '', instructions: '',
      serviceType: '', volume: '', notes: '',
      collectionDate: '', collectionTime: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-card border border-gold/20 shadow-[0_20px_50px_-10px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col max-h-[90vh] bg-navy"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/5 bg-white/5 backdrop-blur-md text-white flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate">Book a Collection</h2>
              {!isSuccess && <p className="text-gold text-xs uppercase tracking-widest font-bold mt-1">Step {step} of 4</p>}
            </div>
            <button onClick={onClose} className="p-2 text-slate/50 hover:text-white hover:bg-white/10 rounded-full transition-colors border border-white/5">
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-extrabold text-slate tracking-tighter mb-4">Booking Confirmed.</h3>
                <p className="text-lg text-slate/60 font-light max-w-sm mx-auto mb-10 leading-relaxed">
                  Thank you, <span className="font-bold text-white">{formData.fullName}</span>. We've sent a confirmation email to <span className="text-gold">{formData.email}</span>. Our driver will contact you prior to collection.
                </p>
                <button 
                  onClick={resetForm}
                  className="px-10 py-4 border border-gold text-gold pill hover:bg-gold hover:text-navy transition-all font-bold uppercase tracking-wide text-xs"
                >
                  Return to Site
                </button>
              </div>
            ) : (
              <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                {/* Step 1: Customer */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-slate flex items-center gap-3 border-b border-white/5 pb-4"><div className="p-2 rounded-xl bg-gold/10"><Tag className="text-gold" size={18} /></div> Contact Details</h3>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Full Name</label>
                      <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans placeholder:text-slate/20" placeholder="e.g. John Doe" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Email Address</label>
                        <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans placeholder:text-slate/20" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Phone Number</label>
                        <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans placeholder:text-slate/20" placeholder="07700 900077" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-slate flex items-center gap-3 border-b border-white/5 pb-4"><div className="p-2 rounded-xl bg-gold/10"><MapPin className="text-gold" size={18} /></div> Service Location</h3>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Street Address</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans placeholder:text-slate/20" placeholder="Flat 4, 12 High Street" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">City/Town</label>
                        <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans placeholder:text-slate/20" placeholder="London" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Postcode</label>
                        <input required name="postcode" value={formData.postcode} onChange={handleInputChange} type="text" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans placeholder:text-slate/20" placeholder="WC2H 9JQ" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Delivery Instructions <span className="text-[10px] text-slate/30">(Optional)</span></label>
                      <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} rows={2} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans placeholder:text-slate/20" placeholder="e.g. Leave at reception, gate code..." />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Service Details */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-slate flex items-center gap-3 border-b border-white/5 pb-4"><div className="p-2 rounded-xl bg-gold/10"><PackageOpen className="text-gold" size={18} /></div> Service Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Service Type</label>
                        <select required name="serviceType" value={formData.serviceType} onChange={handleInputChange} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy text-slate transition-all font-sans appearance-none">
                          <option value="" className="text-slate/50">Select a service...</option>
                          <option value="Dry Cleaning">Dry Cleaning</option>
                          <option value="Wash & Fold">Wash & Fold</option>
                          <option value="Ironing">Ironing Service</option>
                          <option value="Bedding">Bedding & Duvets</option>
                          <option value="Mixed">Mixed Bag</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Estimated Load</label>
                        <select name="volume" value={formData.volume} onChange={handleInputChange} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy text-slate transition-all font-sans appearance-none">
                          <option value="" className="text-slate/50">Select volume (Optional)</option>
                          <option value="Small">Small Bag (1-5 items)</option>
                          <option value="Medium">Medium Bag (6-15 items)</option>
                          <option value="Large">Large Bag (15+ items)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Special Requests <span className="text-[10px] text-slate/30">(Optional)</span></label>
                      <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={2} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans placeholder:text-slate/20" placeholder="e.g. No starch on shirts, gentle cycle..." />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Schedule */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-slate flex items-center gap-3 border-b border-white/5 pb-4"><div className="p-2 rounded-xl bg-gold/10"><Calendar className="text-gold" size={18} /></div> Schedule Collection</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Collection Date</label>
                        <input required name="collectionDate" value={formData.collectionDate} onChange={handleInputChange} type="date" min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-slate transition-all font-sans custom-date-input" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-slate/50 mb-2">Time Window</label>
                        <select required name="collectionTime" value={formData.collectionTime} onChange={handleInputChange} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy text-slate transition-all font-sans appearance-none">
                          <option value="" className="text-slate/50">Select a time...</option>
                          <option value="08:00 - 10:00">08:00 - 10:00</option>
                          <option value="10:00 - 12:00">10:00 - 12:00</option>
                          <option value="12:00 - 14:00">12:00 - 14:00</option>
                          <option value="14:00 - 16:00">14:00 - 16:00</option>
                          <option value="16:00 - 18:00">16:00 - 18:00</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-gold/5 border border-gold/10 p-5 rounded-2xl flex items-start gap-4 mt-6 text-sm font-light text-slate/80">
                      <div className="mt-0.5"><CheckCircle2 size={18} className="text-gold" /></div>
                      <p>Your items will be cleaned and delivered back to you roughly 24-48 hours after collection. Exact return time arranged via SMS upon completion.</p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-10 flex gap-4 pt-6 border-t border-white/5">
                  {step > 1 && (
                    <button type="button" onClick={handlePrev} className="flex-1 py-4 px-6 pill border border-white/20 text-slate font-bold hover:bg-white/5 transition-colors text-center text-xs uppercase tracking-widest">
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button type="submit" className="flex-[2] py-4 px-6 pill bg-white/5 border border-gold/50 text-gold font-bold hover:bg-gold/10 transition-colors shadow-lg text-center text-xs uppercase tracking-widest">
                      Continue
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 px-6 pill bg-gold text-navy font-bold hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden text-xs uppercase tracking-widest">
                      {isSubmitting ? 'Processing...' : 'Confirm Book'}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
