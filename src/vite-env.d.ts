/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_API_URL?: string;
  /** CleanCloud store ID for the embedded booking widget (default: 4012) */
  readonly VITE_CLEANCLOUD_STORE_ID?: string;
  /** Optional — admin notifications are sent server-side via public/api/.env LAUNDRY_SERVICE_EMAIL */
  readonly VITE_LAUNDRY_SERVICE_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
