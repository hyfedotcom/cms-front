// lib/cookies.ts
export const ANALYTICS_CONSENT_COOKIE = "analytics_consent";

export type AnalyticsConsent = "granted" | "denied" | "unknown";

export function parseConsentFromCookieString(
  cookieString: string | null
): AnalyticsConsent {
  if (!cookieString) return "unknown";

  const match = cookieString.match(
    new RegExp("(^|;\\s*)" + ANALYTICS_CONSENT_COOKIE + "=([^;]*)")
  );

  if (!match) return "unknown";

  const value = decodeURIComponent(match[2]);
  if (value === "granted" || value === "denied") return value;
  return "unknown";
}

export function setConsentCookie(value: "granted" | "denied", days = 180) {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = [
    `${ANALYTICS_CONSENT_COOKIE}=${encodeURIComponent(value)}`,
    `expires=${expires.toUTCString()}`,
    "path=/",
    "SameSite=Lax",
  ].join("; ");
}
