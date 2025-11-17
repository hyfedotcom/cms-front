"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { lenisInstance } from "src/components/Animation/LenisProvide";
import { CardItem } from "./Card";
import { CardServices } from "src/lib/types/sections/services";
import Image from "next/image";
import clsx from "clsx";

export default function CardsWrapper({ card }: { card: CardServices[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [active, setActive] = useState(0); // индекс активной карточки/таба
  const tabEls = useRef<Record<number, HTMLDivElement | null>>({}); // DOM-узлы табов слева
  const refs = useRef<Record<number, HTMLDivElement | null>>({}); // DOM-узлы карточек справа
  const [dotY, setDotY] = useState(0); // Y-смещение точки на линии
  const ticking = useRef(false); // защита от лишних кадров
  const frameRef = useRef<number | undefined>(undefined); // id requestAnimationFrame

  // Флаг гидрации
  useEffect(() => {
    setHydrated(true);
    setActive(0); // инициализация после монтирования
  }, []);

  // позиция точки
  useLayoutEffect(() => {
    const el = tabEls.current[active];
    if (el) setDotY(el.offsetTop + el.offsetHeight / 5);
  }, [active]);

  // ручной scroll listener (через RAF)
  useEffect(() => {
    const updateActiveCard = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        let nearest = 0;
        let minDist = Infinity;

        Object.entries(refs.current).forEach(([i, el]) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(
            rect.top + rect.height / 2 - window.innerHeight / 2
          );
          if (dist < minDist) {
            minDist = dist;
            nearest = Number(i);
          }
        });

        setActive((prev) => (prev !== nearest ? nearest : prev));
        ticking.current = false;

        // цикл повторяется каждый кадр
        frameRef.current = requestAnimationFrame(updateActiveCard);
      });
    };

    frameRef.current = requestAnimationFrame(updateActiveCard);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  if (!hydrated || active === null) {
    // пока не прогидрировалось — ничего не рендерим
    return <div className="h-[400px]" />;
  }

  // клик по табу
  const handleTabClick = (index: number) => {
    const lenis = lenisInstance.current;
    if (lenis && refs.current[index]) {
      lenis.scrollTo(refs.current[index], { offset: -window.innerHeight / 3 });
      // setActive(index);
    }
  };

  return (
    <div className="relative w-full flex justify-between z-0">
      {/* Левая колонка */}
      <div className="absolute w-full md:max-w-[300px] top-0 left-0 h-[350vh] z-11">
        <div className="relative h-full">
          <div className="sticky top-0 md:top-34 h-max flex ">
            {/* Вертикальная линия с точкой */}
            <div
              className="hidden md:flex relative w-1 h-screen"
              style={{ transform: `translateY(${dotY}px)` }}
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 transition-transform duration-300" />
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-0 w-[2px] bg-gray-200" />
            </div>

            {/* Таб-лист */}
            <div className="md:ml-4 max-[768px]:pt-16 space-y-3 flex justify-evenly gap-2 md:block w-full md:w-max bg-white md:bg-transparent">
              {card.map((c, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    tabEls.current[i] = el;
                  }}
                  onClick={() => handleTabClick(i)}
                >
                  <span
                    className={clsx(
                      "md:hidden flex cursor-pointer transition-colors text-balance w-full px-2 md:px-5 py-2 rounded-full text-[16px] border border-gray-100",
                      active === i
                        ? " bg-primary font-bold shadow-[0_3px_8px_0_rgba(0,0,0,0.12),_0px_3px_1px_0_rgba(0,0,0,0.04)]"
                        : "md:text-gray-500 bg-[#C6E8E6] font-normal"
                    )}
                  >
                    <Image
                      className="w-6 h-6"
                      src={c.icon?.url || "/icons/icon.svg"}
                      alt="icon"
                      width={6}
                      height={6}
                    />
                  </span>
                  <span
                    className={clsx(
                      "hidden md:block cursor-pointer transition-color transition-font duration-150 text-balance w-full ",
                      active === i
                        ? "text-activ font-bold "
                        : "md:text-gray-500 font-normal hover:font-semibold"
                    )}
                  >
                    {c.heading}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[400px] w-0 h-full"></div>

      {/* Правая колонка */}
      <div className="space-y-6 w-full md:max-w-[1074px] z-2 mt-24 md:mt-0">
        {card.map((c, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <CardItem card={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
