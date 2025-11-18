"use client";

import { useConsent } from "src/app/context/ConsentContext";
import { GoogleAnalytics } from "./GoogleAnalytics";

export function AnalyticsLoader() {
  const { consent } = useConsent();

  if (consent !== "granted") {
    return null;
  }

  return (
    <>
      <GoogleAnalytics />
    </>
  );
}
