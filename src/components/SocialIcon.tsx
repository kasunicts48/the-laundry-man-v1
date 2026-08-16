import { useId } from 'react';

export type SocialIconType = 'facebook' | 'tiktok' | 'instagram';

interface SocialIconProps {
  type: SocialIconType;
  className?: string;
  size?: number;
  /** Use on dark/coloured backgrounds (white glyph). Default suits light backgrounds. */
  onDark?: boolean;
}

function svgSizeProps(size?: number) {
  return size != null ? { width: size, height: size } : {};
}

const BRAND = {
  facebook: '#1877F2',
  tiktokCyan: '#25F4EE',
  tiktokPink: '#FE2C55',
  tiktokBlack: '#111111',
};

const IG_GLYPH =
  'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z';

const TIKTOK_GLYPH =
  'M12.53 0h3.36c.09.9.42 1.79.99 2.5.68.86 1.68 1.46 2.77 1.62.28.05.56.07.85.08v3.42c-1.4 0-2.79-.36-3.99-1.03V13.9c0 1.4-.34 2.82-1.09 4.02a6.5 6.5 0 0 1-2.9 2.48 6.53 6.53 0 0 1-3.42.52 6.51 6.51 0 0 1-3.06-1.12 6.53 6.53 0 0 1-2.6-4.11c-.14-.75-.13-1.52-.02-2.27a6.52 6.52 0 0 1 2.35-4.06 6.5 6.5 0 0 1 4.6-1.4v3.5a2.97 2.97 0 0 0-1.6-.06 2.97 2.97 0 0 0-1.7 1.14 2.97 2.97 0 0 0-.54 1.98 2.97 2.97 0 0 0 1.3 2.14 2.97 2.97 0 0 0 3.3.08 2.97 2.97 0 0 0 1.31-2.03c.06-.36.05-.72.05-1.08V0Z';

const FB_GLYPH =
  'M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z';

export function SocialIcon({
  type,
  className = 'shrink-0',
  size,
  onDark = false,
}: SocialIconProps) {
  const gradientId = useId().replace(/:/g, '');
  const sizeProps = svgSizeProps(size);
  const inverse = onDark;

  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...sizeProps}>
        <path fill={inverse ? '#FFFFFF' : BRAND.facebook} d={FB_GLYPH} />
      </svg>
    );
  }

  if (type === 'instagram') {
    if (inverse) {
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...sizeProps}>
          <path fill="#FFFFFF" d={IG_GLYPH} />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...sizeProps}>
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#FDD35D" />
            <stop offset="25%" stopColor="#FDA75E" />
            <stop offset="50%" stopColor="#F86A69" />
            <stop offset="70%" stopColor="#E0459E" />
            <stop offset="100%" stopColor="#8A3AB9" />
          </radialGradient>
        </defs>
        <path fill={`url(#${gradientId})`} d={IG_GLYPH} />
      </svg>
    );
  }

  const tiktokCenter = inverse ? '#FFFFFF' : BRAND.tiktokBlack;

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...sizeProps}>
      <path fill={BRAND.tiktokCyan} transform="translate(-0.9, 0.9)" d={TIKTOK_GLYPH} />
      <path fill={BRAND.tiktokPink} transform="translate(0.9, -0.9)" d={TIKTOK_GLYPH} />
      <path fill={tiktokCenter} d={TIKTOK_GLYPH} />
    </svg>
  );
}
