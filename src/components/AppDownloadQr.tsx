import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import {
  APP_STORE_URL,
  getDownloadAppQrUrl,
  PLAY_STORE_URL,
  QR_CODE_BG_COLOR,
  QR_CODE_FG_COLOR,
} from '../data/appStoreLinks';

const QR_SIZE = 180;

export default function AppDownloadQr() {
  const downloadUrl = getDownloadAppQrUrl();

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div
        className="shrink-0 self-start overflow-hidden rounded-3xl border border-white/10 p-3.5 shadow-sm"
        style={{ backgroundColor: QR_CODE_BG_COLOR }}
        role="img"
        aria-label="QR code to download The Laundry Man app"
      >
        <QRCode
          value={downloadUrl}
          size={QR_SIZE}
          fgColor={QR_CODE_FG_COLOR}
          bgColor={QR_CODE_BG_COLOR}
          ecLevel="M"
          quietZone={0}
          qrStyle="dots"
          eyeRadius={[
            { outer: 14, inner: 8 },
            { outer: 14, inner: 8 },
            { outer: 14, inner: 8 },
          ]}
          style={{ height: 'auto', maxWidth: '100%', width: QR_SIZE }}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
        <p className="text-sm font-light leading-relaxed text-ink">
          Scan to download on your phone.
        </p>

        <div className="flex flex-col gap-4">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:-translate-y-1"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
              className="h-12 w-auto sm:h-14"
            />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:-translate-y-1"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12 w-auto sm:h-14"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
