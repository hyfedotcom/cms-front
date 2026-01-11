"use client";

import React, {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ANALYTICS_CONSENT_COOKIE,
  AnalyticsConsent,
  parseConsentFromCookieString,
  setConsentCookie,
} from "../../lib/cookies/cookies";
import { clearAnalyticsCookies } from "src/components/cookie/analyticsCookies";

type ConsentContextValue = {
  consent: AnalyticsConsent;
  isBannerOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
  setGranted: () => void;
  setDenied: () => void;
};

const ConsentContext = createContext<ConsentContextValue | undefined>(
  undefined
);

function readConsent(): AnalyticsConsent {
  if (typeof document === "undefined") return "unknown";
  const raw =
    document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${ANALYTICS_CONSENT_COOKIE}=`))
      ?.split("=")[1] ?? null;

  return parseConsentFromCookieString(
    raw ? `${ANALYTICS_CONSENT_COOKIE}=${raw}` : null
  );
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<AnalyticsConsent>("unknown");

  // Баннер открыт, если consent ещё не выбран
  const [isBannerOpen, setIsBannerOpen] = useState<boolean>(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);

    if (c === "unknown") {
      const id = window.setTimeout(() => setIsBannerOpen(true), 3000);

      return () => {
        if ("cancelIdleCallback" in window)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).cancelIdleCallback(id);
        else clearTimeout(id);
      };
    }
  }, []);

  const openBanner = () => setIsBannerOpen(true);
  const closeBanner = () => setIsBannerOpen(false);

  const setGranted = () => {
    setConsent("granted");
    setConsentCookie("granted");
    setIsBannerOpen(false);
    enableTrackers();
  };

  const setDenied = () => {
    setConsent("denied");
    setConsentCookie("denied");

    if (typeof window !== "undefined") {
      clearAnalyticsCookies();
      disableTrackers(); // внутри: GA disable + clarity consent false
    }

    setIsBannerOpen(false);
  };

  const GA_ID = "G-3GD8BYW5HK" as const;
  const GA_DISABLE_KEY = `ga-disable-${GA_ID}` as const;

  function disableTrackers() {
    window[GA_DISABLE_KEY] = true;

    // Clarity: wipe cookies + stop tracking until consent again
    window.clarity?.("consent", false);
  }

  function enableTrackers() {
    window[GA_DISABLE_KEY] = false;

    // if Clarity уже загружен — можно явно дать consent
    window.clarity?.("consent");
  }

  return (
    <ConsentContext.Provider
      value={{
        consent,
        isBannerOpen,
        openBanner,
        closeBanner,
        setGranted,
        setDenied,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
