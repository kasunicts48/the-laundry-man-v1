import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import type { ContactPayload } from '../types';

const inputClassName =
  'w-full px-4 py-4 rounded-xl border border-white/10 focus:ring-1 focus:ring-gold focus:border-gold outline-none bg-white/5 text-ink transition-all font-sans placeholder:text-ink';

const labelClassName = 'mb-2 block text-sm font-medium tracking-wide text-ink';

interface ContactFormProps {
  defaultSubject?: string;
  heading?: string;
  description?: string;
}

export default function ContactForm({
  defaultSubject = '',
  heading = 'Send Us a Message',
  description = "Have a question about our services? Fill in the form below and we'll get back to you as soon as possible.",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL ?? '/api/send-contact.php';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: defaultSubject,
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setIsSuccess(false);
    setSubmitError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: defaultSubject,
      message: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload: ContactPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        if (!result && (response.status === 500 || response.status === 502 || response.status === 503)) {
          throw new Error('Contact API is not running. Restart dev with: npm run dev');
        }

        throw new Error(result?.message ?? 'Unable to send your message. Please try again or call us directly.');
      }

      setIsSuccess(true);
    } catch (error) {
      if (error instanceof TypeError) {
        setSubmitError('Cannot reach the contact API. Restart dev with: npm run dev');
        return;
      }

      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again or call us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 sm:p-10"
    >
      <h3 className="mb-2 text-2xl font-semibold text-slate">{heading}</h3>
      <p className="mb-8 font-light text-ink">{description}</p>

      {isSuccess ? (
        <div className="space-y-6 py-8 text-center">
          <CheckCircle2 className="mx-auto text-gold" size={56} />
          <div>
            <h4 className="mb-2 text-xl font-semibold text-slate">Message Sent</h4>
            <p className="font-light text-ink">
              Thank you, <span className="font-semibold text-slate">{formData.name}</span>. We&apos;ve received your message and will respond to{' '}
              <span className="text-gold">{formData.email}</span> shortly.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="pill border border-gold px-8 py-3 text-sm font-semibold tracking-wide text-gold transition-all hover:bg-gold hover:text-paper"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelClassName} htmlFor="contact-name">
              Full Name
            </label>
            <input
              required
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              type="text"
              className={inputClassName}
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClassName} htmlFor="contact-email">
                Email Address
              </label>
              <input
                required
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                className={inputClassName}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="contact-phone">
                Phone Number <span className="text-[10px] font-normal lowercase">(optional)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="tel"
                className={inputClassName}
                placeholder="07700 900077"
              />
            </div>
          </div>

          <div>
            <label className={labelClassName} htmlFor="contact-subject">
              Subject
            </label>
            <input
              required
              id="contact-subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              type="text"
              className={inputClassName}
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label className={labelClassName} htmlFor="contact-message">
              Message
            </label>
            <textarea
              required
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className={inputClassName}
              placeholder="Tell us about your enquiry..."
            />
          </div>

          {submitError && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{submitError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-semibold tracking-wide text-paper transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Send size={16} />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </motion.div>
  );
}
