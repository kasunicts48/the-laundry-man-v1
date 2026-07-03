import { Facebook, Instagram } from 'lucide-react';

export type SocialIconType = 'facebook' | 'tiktok' | 'instagram';

interface SocialIconProps {
  type: SocialIconType;
  className?: string;
  size?: number;
}

export function SocialIcon({ type, className = '', size }: SocialIconProps) {
  const iconClass = className || 'h-5 w-5 shrink-0';

  if (type === 'facebook') {
    return <Facebook className={iconClass} size={size} strokeWidth={1.75} aria-hidden="true" />;
  }

  if (type === 'instagram') {
    return <Instagram className={iconClass} size={size} strokeWidth={1.75} aria-hidden="true" />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={iconClass}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.67a4.85 4.85 0 0 1-1.01-.02z" />
    </svg>
  );
}
