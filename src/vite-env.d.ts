/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_API_URL?: string;
  /** Optional — admin notifications are sent server-side via public/api/.env LAUNDRY_SERVICE_EMAIL */
  readonly VITE_LAUNDRY_SERVICE_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
