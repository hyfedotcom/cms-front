"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "../../lib/motion";
import { usePathname } from "next/navigation";
import { SocialMediaRender } from "../ui/SocialMediaRender";
import type { HeaderData } from "src/lib/types/sections/header";
import type { GeneralSettingData } from "src/lib/types/sections/generalSettingData";

export function Header({
  data,
  settings,
}: {
  data: HeaderData;
  settings: GeneralSettingData;
}) {
  const { nav_links, cta } = data;
  const { logo_header, social_media } = settings;

  const [open, setOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY <= 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // закрывать меню при навигации — чтобы не залипало
  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-1001 w-full ${
        isTop ? "bg-white/10" : "bg-white/40"
      } transition-all duration-500 backdrop-blur-[40px] shadow-sm`}
    >
      <div className="container !py-3 md:!py-4 mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="items-center z-2">
          <Image
            src={logo_header?.url || "/logos/logo-short.png"}
            alt="Logo of CoughMonitor Suite"
            width={logo_header?.width ?? 100}
            height={logo_header?.height ?? 60}
            loading="lazy"
            className="h-8 md:h-12 w-auto"
          />
        </Link>

        {/* NAV desktop */}
        {nav_links?.length ? (
          <nav
            className={`hidden xl:flex space-x-8 ${
              isTop && path === "/" ? "text-white" : "text-gray-800"
            } font-medium`}
          >
            {nav_links.map((l, index) => (
              <Link
                key={index}
                href={`/${l.link}`}
                className={`${
                  isTop ? "hover:text-white/60" : "hover:text-primary"
                } transition-colors`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        ) : null}

        {/* CTA desktop */}
        {cta ? (
          <a
            href={cta.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden xl:inline-flex transition-all duration-400 ${
              isTop && path === "/"
                ? "bg-white text-primary hover:bg-primary hover:text-white"
                : "bg-primary text-white hover:bg-white hover:text-primary border border-activ"
            } px-6 py-3 text-[18px] rounded-full font-bold uppercase`}
          >
            {cta.label}
          </a>
        ) : null}

        {/* BURGER mobile/tablet */}
        <button
          className={`xl:hidden z-2 w-6 h-4 flex flex-col justify-between items-center`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu of navigation"
        >
          <span
            className={`block h-0.5 w-6 rounded-full transition-transform ${
              !open && isTop ? "bg-white" : "bg-primary"
            } ${open ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full transition-opacity ${
              !open && isTop ? "bg-white" : "bg-primary"
            } ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full transition-transform ${
              !open && isTop ? "bg-white" : "bg-primary"
            } ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="fixed inset-0 h-screen w-screen z-[1] bg-white flex items-end"
          >
            <div className="flex flex-col items-start p-4 md:p-10 my-auto justify-center space-y-5 text-xl font-semibold h-[70vh] w-full">
              {nav_links?.map((l, index) => (
                <Link
                  key={index}
                  href={`/${l.link}`}
                  className="hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              ))}

              {cta && (
                <a
                  href={cta.link}
                  className="mt-5 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-85 transition"
                >
                  {cta.label}
                </a>
              )}

              {social_media?.length ? (
                <div className="flex gap-5 mt-10">
                  {social_media.map((media, index) => (
                    <SocialMediaRender data={media} key={index} />
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
