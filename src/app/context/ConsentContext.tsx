// context/ConsentContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AnalyticsConsent,
  parseConsentFromCookieString,
  setConsentCookie,
} from "../../lib/cookies/cookies";

type ConsentContextValue = {
  consent: AnalyticsConsent;
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

  // На клиенте перечитываем куку, если SSR был без неё
  useEffect(() => {
    if (typeof document === "undefined") return;
    const current = parseConsentFromCookieString(document.cookie);
    if (current !== consent) {
      setConsent(current);
    }
  }, [consent]);

  const setGranted = () => {
    setConsent("granted");
    setConsentCookie("granted");
  };

  const setDenied = () => {
    setConsent("denied");
    setConsentCookie("denied");
  };

  return (
    <ConsentContext.Provider value={{ consent, setGranted, setDenied }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
