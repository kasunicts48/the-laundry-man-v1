export interface CleanCloudWidgetInstance {
  destroy: () => void;
  init: (
    selector: string,
    storeId: number,
    options?: Record<string, unknown>
  ) => void;
}

declare global {
  interface Window {
    CleanCloudWebApp?: (
      selector: string,
      storeId: number,
      options?: Record<string, unknown>
    ) => CleanCloudWidgetInstance;
  }
}

export {};
