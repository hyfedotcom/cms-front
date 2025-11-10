"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "../../lib/motion";
import { useScreenSize } from "src/hooks/useScreenSize";
import { HeaderData } from "src/lib/types/sections/header";
import { SocialMediaRender } from "../ui/SocialMediaRender";
import { GeneralSettingData } from "src/lib/types/sections/generalSettingData";

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
  const { width } = useScreenSize();

  useEffect(() => {
    if (width <= 767) return;
    const handleScroll = () => {
      setIsTop(window.scrollY <= 500);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [width]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-1001 ${
        isTop ? "bg-white/10" : "bg-white/20"
      } transform-color duration-500 backdrop-blur-[40px] shadow-sm`}
    >
      <div className="container !py-2 md:!py-4 mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center z-2">
          <Image
            src={logo_header?.url || "/logos/logo-short.png"}
            alt="Logo"
            width={logo_header?.width ?? 100}
            height={logo_header?.height ?? 60}
            priority
            className="h-8 md:h-12 w-auto"
          />
        </Link>

        {/* NAV */}
        {nav_links && nav_links.length > 0 && (
          <nav
            className={`hidden lg:flex space-x-8 ${
              isTop ? "text-white" : "text-gray-800"
            }  font-medium`}
          >
            {nav_links.map((l, index) => (
              <a
                key={index}
                href={l.link}
                className="hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}

        {/* CTA  */}

        {cta && (
          <a
            href={cta.link}
            className={`hidden lg:inline-block ${
              isTop ? "bg-white text-primary" : "bg-primary text-white"
            }  px-6 py-3 text-[20px] rounded-full font-bold uppercase hover:opacity-85 transition`}
          >
            {cta.label}
          </a>
        )}

        {/* BURGER MENU */}
        <button
          className="lg:hidden relative z-2 w-auto h-4 flex flex-col justify-between items-center"
          onClick={() => setOpen(!open)}
          aria-label="Open menu of navitagion"
        >
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-transform rounded-full ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-opacity rounded-full ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-transform rounded-full ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
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
            <div className="flex flex-col items-start p-4 justify-center space-y-5 text-xl font-semibold h-[70vh] w-full ">
              {nav_links &&
                nav_links.length > 0 &&
                nav_links.map((l, index) => (
                  <Link
                    key={index}
                    href={l.link}
                    onClick={() => setOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}

              {cta && (
                <a
                  href={cta.link}
                  className=" mt-5 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-85 transition"
                >
                  {cta.label}
                </a>
              )}

              {social_media && social_media.length > 0 && (
                <div className="flex gap-5 mt-auto">
                  {social_media.map((media, index) => (
                    <SocialMediaRender data={media} key={index} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
