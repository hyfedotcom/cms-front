"use client";

import Link from "next/link";
import { useConsent } from "src/app/context/ConsentContext";

export function CookieBanner() {
  const {
    consent,
    setDenied,
    setGranted,
    closeBanner,
    openBanner,
    isBannerOpen,
  } = useConsent();
  const hasChoice = consent === "denied" || consent === "granted";

  const accept = () => {
    document.documentElement.dataset.consent = "granted";
    setGranted();
    closeBanner();
  };

  const reject = () => {
    document.documentElement.dataset.consent = "denied";
    setDenied();
    closeBanner();
  };

  return (
    <>
      {isBannerOpen ? (
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
            We use essential cookies to make this website work. With your
            consent, we also use cookies to understand how our site is used and
            improve it. Learn more in our{" "}
            <Link className="underline text-blue-500" href="/privacy-policy">
              privacy policy
            </Link>
            .
          </div>

          <div className="text-xs opacity-70">
            By clicking “Accept all”, you agree to the use of analytics cookies.
            You can change or withdraw your consent at any time in Cookie
            settings or in your browser settings.
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={reject}
              className="px-4 py-2 cursor-pointer rounded-[8px] border hover:opacity-80 font-medium border-gray-300 text-gray-700 text-sm"
            >
              Reject non-essential
            </button>
            <button
              onClick={accept}
              className="bg-primary cursor-pointer rounded-[8px] hover:opacity-80 font-medium text-white px-4 py-2 text-sm"
            >
              Accept all
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openBanner}
          className="fixed cursor-pointer bottom-6 left-6 z-[9999] rounded-full bg-primary shadow-lg border border-gray-200 px-3 py-2 text-xs font-medium hover:opacity-80"
          aria-label="Cookie settings"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22.0001C10.6167 22.0001 9.31667 21.7374 8.1 21.2121C6.88333 20.6868 5.825 19.9744 4.925 19.0751C4.025 18.1758 3.31267 17.1174 2.788 15.9001C2.26333 14.6828 2.00067 13.3828 2 12.0001C2 10.7501 2.24167 9.5251 2.725 8.3251C3.20833 7.1251 3.88333 6.0541 4.75 5.1121C5.61667 4.1701 6.65833 3.41176 7.875 2.8371C9.09167 2.26243 10.425 1.9751 11.875 1.9751C12.225 1.9751 12.5833 1.99176 12.95 2.0251C13.3167 2.05843 13.6917 2.11676 14.075 2.2001C13.925 2.9501 13.975 3.65843 14.225 4.3251C14.475 4.99176 14.85 5.54576 15.35 5.9871C15.85 6.42843 16.446 6.73276 17.138 6.9001C17.83 7.06743 18.5423 7.02576 19.275 6.7751C18.8417 7.75843 18.9043 8.7001 19.463 9.6001C20.0217 10.5001 20.8507 10.9668 21.95 11.0001C21.9667 11.1834 21.9793 11.3541 21.988 11.5121C21.9967 11.6701 22.0007 11.8411 22 12.0251C22 13.3918 21.7373 14.6791 21.212 15.8871C20.6867 17.0951 19.9743 18.1534 19.075 19.0621C18.1757 19.9708 17.1173 20.6874 15.9 21.2121C14.6827 21.7368 13.3827 21.9994 12 22.0001ZM10.5 10.0001C10.9167 10.0001 11.271 9.85443 11.563 9.5631C11.855 9.27176 12.0007 8.91743 12 8.5001C11.9993 8.08276 11.8537 7.72876 11.563 7.4381C11.2723 7.14743 10.918 7.00143 10.5 7.0001C10.082 6.99876 9.728 7.14476 9.438 7.4381C9.148 7.73143 9.002 8.08543 9 8.5001C8.998 8.91476 9.144 9.2691 9.438 9.5631C9.732 9.8571 10.086 10.0028 10.5 10.0001ZM8.5 15.0001C8.91667 15.0001 9.271 14.8544 9.563 14.5631C9.855 14.2718 10.0007 13.9174 10 13.5001C9.99933 13.0828 9.85367 12.7288 9.563 12.4381C9.27233 12.1474 8.918 12.0014 8.5 12.0001C8.082 11.9988 7.728 12.1448 7.438 12.4381C7.148 12.7314 7.002 13.0854 7 13.5001C6.998 13.9148 7.144 14.2691 7.438 14.5631C7.732 14.8571 8.086 15.0028 8.5 15.0001ZM15 16.0001C15.2833 16.0001 15.521 15.9041 15.713 15.7121C15.905 15.5201 16.0007 15.2828 16 15.0001C15.9993 14.7174 15.9033 14.4801 15.712 14.2881C15.5207 14.0961 15.2833 14.0001 15 14.0001C14.7167 14.0001 14.4793 14.0961 14.288 14.2881C14.0967 14.4801 14.0007 14.7174 14 15.0001C13.9993 15.2828 14.0953 15.5204 14.288 15.7131C14.4807 15.9058 14.718 16.0014 15 16.0001Z"
              fill="white"
            />
          </svg>
        </button>
      )}
    </>
  );
}
