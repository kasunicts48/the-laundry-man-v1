import type { InnerPageIllustrationConfig } from '../data/innerPageIllustrations';

interface InnerPageBannerIllustrationProps {
  config: InnerPageIllustrationConfig;
}

/** Shared banner illustration height (Commercial 750×500 reference). */
const LANDSCAPE_CLASS =
  'h-auto w-full max-w-[280px] max-h-[187px] md:max-w-[400px] md:max-h-[267px]';

/** Square art scaled to the same visual height as landscape. */
const SQUARE_CLASS = 'h-[187px] w-[187px] md:h-[267px] md:w-[267px]';

export default function InnerPageBannerIllustration({ config }: InnerPageBannerIllustrationProps) {
  const { Illustration, alt, aspect } = config;
  const className = aspect === 'landscape' ? LANDSCAPE_CLASS : SQUARE_CLASS;

  return (
    <div className="flex w-full shrink-0 justify-center md:w-auto md:justify-end">
      <Illustration className={className} aria-label={alt} role="img" />
    </div>
  );
}
