import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, PackageOpen, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { BookingPayload } from '../types';
import { services } from '../data/services';
import { generateBookingReference } from '../config/bookingEmail';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string | null;
}

export default function BookingForm({ isOpen, onClose, initialServiceId }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const bookingApiUrl = import.meta.env.VITE_BOOKING_API_URL ?? '/api/send-email.php';

  // Form State
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', postcode: '', instructions: '',
    serviceType: '', volume: '', notes: '',
    collectionDate: '', collectionTime: ''
  });

  useEffect(() => {
    if (!isOpen) return;

    const isValidService = initialServiceId && services.some((s) => s.id === initialServiceId);
    if (isValidService) {
      setFormData((prev) => ({ ...prev, serviceType: initialServiceId }));
    }
  }, [isOpen, initialServiceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const selectedService = services.find((service) => service.id === formData.serviceType);
    const referenceNumber = generateBookingReference();

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
        type: selectedService?.name ?? formData.serviceType,
        volume: formData.volume,
        notes: formData.notes
      },
      schedule: {
        collectionDate: formData.collectionDate,
        collectionTime: formData.collectionTime
      },
      metadata: {
        sourceUrl: window.location.href,
        submittedAt: new Date().toISOString(),
        referenceNumber,
      }
    };

    try {
      const response = await fetch(bookingApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        if (!result && (response.status === 500 || response.status === 502 || response.status === 503)) {
          throw new Error('Booking API is not running. Restart dev with: npm run dev');
        }

        throw new Error(result?.message ?? 'Unable to send your booking request. Please try again or call us directly.');
      }

      setBookingReference(result?.meta?.referenceNumber ?? referenceNumber);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof TypeError) {
        setSubmitError('Cannot reach the booking API. Restart dev with: npm run dev');
        return;
      }

      setSubmitError(error instanceof Error ? error.message : 'Unable to send your booking request. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setBookingReference(null);
    setSubmitError(null);
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
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Book a Collection</h2>
              {!isSuccess && <p className="text-gold text-xs uppercase tracking-widest font-bold mt-1">Step {step} of 4</p>}
            </div>
            <button onClick={onClose} className="p-2 text-ink hover:text-white hover:bg-white/10 rounded-full transition-colors border border-white/5">
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            {isSuccess ? (
              <div className="text-center py-10 max-w-md mx-auto">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-500/25 bg-green-500/10 text-green-500 shadow-[0_0_24px_-6px_rgba(34,197,94,0.35)]">
                  <CheckCircle2 size={40} strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-extrabold text-ink tracking-tighter mb-6">Booking Confirmed.</h3>
                <p className="text-base text-ink leading-relaxed mb-5">
                  Thank you, <span className="font-bold">{formData.fullName}</span>. We&apos;ve sent a confirmation email to{' '}
                  <span className="font-bold">{formData.email}</span>. Our driver will contact you prior to collection.
                </p>
                {bookingReference && (
                  <p className="text-base font-bold text-ink mb-5">
                    Reference Number: {bookingReference}
                  </p>
                )}
                <p className="text-sm text-ink leading-relaxed mb-10">
                  Note: If you don&apos;t see the confirmation email in your inbox, please check your Spam or Promotions folder.
                </p>
                <button 
                  onClick={resetForm}
                  className="px-10 py-4 border border-gold text-gold pill hover:bg-gold hover:text-navy transition-all font-bold uppercase tracking-wide text-xs cursor-pointer"
                >
                  Return to Site
                </button>
              </div>
            ) : (
              <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                {/* Step 1: Customer */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-ink flex items-center gap-3 border-b border-white/5 pb-4"><div className="p-2 rounded-xl bg-gold/10"><Tag className="text-gold" size={18} /></div> Contact Details</h3>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Full Name</label>
                      <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink/50" placeholder="e.g. John Doe" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Email Address</label>
                        <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink/50" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Phone Number</label>
                        <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink/50" placeholder="07700 900077" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-ink flex items-center gap-3 border-b border-white/5 pb-4"><div className="p-2 rounded-xl bg-gold/10"><MapPin className="text-gold" size={18} /></div> Service Location</h3>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Street Address <span className="text-[10px] font-normal lowercase">(optional)</span></label>
                      <input name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink/50" placeholder="Flat 4, 12 High Street" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">City/Town</label>
                        <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink/50" placeholder="London" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Postcode</label>
                        <input required name="postcode" value={formData.postcode} onChange={handleInputChange} type="text" className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink/50" placeholder="WC2H 9JQ" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Delivery Instructions <span className="text-[10px] text-ink">(Optional)</span></label>
                      <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} rows={2} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink/50" placeholder="e.g. Leave at reception, gate code..." />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Service Details */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-ink flex items-center gap-3 border-b border-white/5 pb-4"><div className="p-2 rounded-xl bg-gold/10"><PackageOpen className="text-gold" size={18} /></div> Service Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Service Type</label>
                        <select required name="serviceType" value={formData.serviceType} onChange={handleInputChange} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy text-ink transition-all font-sans appearance-none">
                          <option value="" className="text-ink">Select a service...</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Quantity <span className="text-[10px] font-normal normal-case">(Optional)</span></label>
                        <select name="volume" value={formData.volume} onChange={handleInputChange} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy text-ink transition-all font-sans appearance-none">
                          <option value="" className="text-ink">Select quantity (Optional)</option>
                          <option value="Small">Small Bag (1-5 items)</option>
                          <option value="Medium">Medium Bag (6-15 items)</option>
                          <option value="Large">Large Bag (15+ items)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Special Requests <span className="text-[10px] text-ink">(Optional)</span></label>
                      <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={2} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink/50" placeholder="e.g. No starch on shirts, gentle cycle..." />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Schedule */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-xl font-bold text-ink flex items-center gap-3 border-b border-white/5 pb-4"><div className="p-2 rounded-xl bg-gold/10"><Calendar className="text-gold" size={18} /></div> Schedule Collection</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Collection Date</label>
                        <input required name="collectionDate" value={formData.collectionDate} onChange={handleInputChange} type="date" min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans custom-date-input" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-ink mb-2">Time Window</label>
                        <select required name="collectionTime" value={formData.collectionTime} onChange={handleInputChange} className="w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-navy text-ink transition-all font-sans appearance-none">
                          <option value="" className="text-ink">Select a time...</option>
                          <option value="08:00 - 10:00">08:00 - 10:00</option>
                          <option value="10:00 - 12:00">10:00 - 12:00</option>
                          <option value="12:00 - 14:00">12:00 - 14:00</option>
                          <option value="14:00 - 16:00">14:00 - 16:00</option>
                          <option value="16:00 - 18:00">16:00 - 18:00</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-gold/5 border border-gold/10 p-5 rounded-2xl flex items-start gap-4 mt-6 text-sm font-light text-ink">
                      <div className="mt-0.5"><CheckCircle2 size={18} className="text-gold" /></div>
                      <p>Your items will be cleaned and delivered back to you roughly 24-48 hours after collection. Exact return time arranged via SMS upon completion.</p>
                    </div>
                  </motion.div>
                )}

                {submitError && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                    <p>{submitError}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-10 flex gap-4 pt-6 border-t border-white/5">
                  {step > 1 && (
                    <button type="button" onClick={handlePrev} className="flex-1 py-4 px-6 pill border border-white/20 text-ink font-bold hover:bg-white/5 transition-colors text-center text-xs uppercase tracking-widest cursor-pointer">
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button type="submit" className="flex-[2] py-4 px-6 pill bg-white/5 border border-gold/50 text-gold font-bold hover:bg-gold/10 transition-colors shadow-lg text-center text-xs uppercase tracking-widest cursor-pointer">
                      Continue
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 px-6 pill bg-gold text-navy font-bold hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden text-xs uppercase tracking-widest cursor-pointer disabled:cursor-not-allowed">
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
