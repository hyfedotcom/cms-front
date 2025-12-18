"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
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

export function ConsentProvider({
  initialConsent,
  children,
}: {
  initialConsent: AnalyticsConsent;
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<AnalyticsConsent>(initialConsent);

  // Баннер открыт, если consent ещё не выбран
  const [isBannerOpen, setIsBannerOpen] = useState<boolean>(
    initialConsent !== "granted" && initialConsent !== "denied"
  );

  // На клиенте перечитываем куку, если SSR был без неё
  useEffect(() => {
    const current = parseConsentFromCookieString(document.cookie);
    setConsent(current);

    const hasChoice = current === "granted" || current === "denied";
    setIsBannerOpen(!hasChoice);
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
