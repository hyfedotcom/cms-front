"use client";

import Link from "next/link";
import { useConsent } from "src/app/context/ConsentContext";

export function CookieBanner() {
  const { consent, setDenied, setGranted, isBannerOpen, closeBanner } =
    useConsent();

  if (!isBannerOpen) return null;

  const hasChoice = consent === "denied" || consent === "granted";

  return (
    <div className="bg-white fixed bottom-5 md:bottom-10 left-5 md:left-10 w-[90%] md:max-w-[500px] p-4 shadow-lg z-[9999] space-y-3 text-sm rounded-2xl border border-gray-200">
      <div className="flex items-start justify-between gap-3">
        <div className="text-base font-semibold">Cookies</div>

        {hasChoice && (
          <button
            type="button"
            onClick={closeBanner}
            className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
          >
            Close
          </button>
        )}
      </div>

      <div>
        We use essential cookies to make this website work. With your consent,
        we also use cookies to understand how our site is used and improve it.
        Learn more in our{" "}
        <Link className="underline text-blue-500" href="/privacy-policy">
          privacy policy
        </Link>
        .
      </div>

      <div className="text-xs opacity-70">
        By clicking “Accept all”, you agree to the use of analytics cookies. You
        can change or withdraw your consent at any time in Cookie settings or in
        your browser settings.
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button
          onClick={setDenied}
          className="px-4 py-2 cursor-pointer rounded-[8px] border hover:opacity-80 font-medium border-gray-300 text-gray-700 text-sm"
        >
          Reject non-essential
        </button>
        <button
          onClick={setGranted}
          className="bg-primary cursor-pointer rounded-[8px] hover:opacity-80 font-medium text-white px-4 py-2 text-sm"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
