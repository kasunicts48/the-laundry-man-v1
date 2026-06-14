import LegalPageLayout from '../components/LegalPageLayout';
import { termsConditionsSections } from '../data/termsConditions';

export default function TermsConditions() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These terms and conditions apply to all orders for products and services provided by The Laundryman App. Please read them carefully. By placing an Order (as defined below) you agree to be legally bound by them. You should note that in certain circumstances these Terms exclude or limit Our liability to you."
      sections={termsConditionsSections}
    />
  );
}
