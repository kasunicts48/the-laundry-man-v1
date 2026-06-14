import LegalPageLayout from '../components/LegalPageLayout';
import { privacyPolicySections } from '../data/privacyPolicy';

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Need support? We are here to assist you. Here we explain what we do with your information, including how we store and protect it."
      sections={privacyPolicySections}
    />
  );
}
