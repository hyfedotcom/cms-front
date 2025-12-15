export {};

declare global {
  interface Window {
    // GA disable flag: window["ga-disable-G-XXXX"]=true
    [key: `ga-disable-${string}`]: boolean | undefined;

    // Microsoft Clarity Consent API
    clarity?: {
      (command: "consent"): void;
      (command: "consent", enabled: boolean): void;
    };
  }
}
