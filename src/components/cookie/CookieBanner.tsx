"use client";

import Link from "next/link";
import { useConsent } from "src/app/context/ConsentContext";

export function CookieBanner() {
  const { consent, setDenied, setGranted } = useConsent();

  if (consent === "denied" || consent === "granted") return null;

  return (
    <div className="bg-white fixed bottom-10 left-10 max-w-[500px] p-4 shadow-lg z-[9999] space-y-3 text-sm rounded-2xl">
      <div className="text-base font-semibold">Cookies</div>
      <div>
        We use essential cookies to make this website work. With your consent,
        we also use analytics cookies (Google Analytics) to understand how our
        site is used and improve it. Learn more in our{" "}
        <Link className="underline text-blue-500" href="/privacy-policy">
          privacy policy
        </Link>
        .
      </div>
      <div className="text-xs opacity-70">
        By clicking “Accept all”, you agree to the use of analytics cookies. You
        can change or withdraw your consent in your browser settings.
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <button
          onClick={setDenied}
          className="px-4 py-2 cursor-pointer rounded-[8px] border-1 hover:opacity-80 font-medium border-gray-300 text-gray-700 text-sm"
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
