"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MediaData = {
  video?: { url: string; type?: string }; // type опционально, default video/mp4
  placeholder?: { url: string; alt?: string };
};

export function Video({
  videoMobile,
  videoPc,
  priorityImage = true, // для hero обычно true (быстро показать фон)
  start = "in-view", // "immediate" | "in-view" | "never"
  posterOnlyOnSlowNetwork = true,
}: {
  videoMobile: MediaData;
  videoPc: MediaData;
  priorityImage?: boolean;
  start?: "immediate" | "in-view" | "never";
  posterOnlyOnSlowNetwork?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(start === "immediate");
  const [ready, setReady] = useState(false);
  const [giveUp, setGiveUp] = useState(false);

  // 1) Не грузим видео на save-data/2g (если включено)
  useEffect(() => {
    if (!posterOnlyOnSlowNetwork) return;

    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    const c = nav.connection;
    const slow = /(^|-)2g/.test(c?.effectiveType ?? "");
    if (c?.saveData || slow) setGiveUp(true);
  }, [posterOnlyOnSlowNetwork]);

  // 2) Ленивый старт видео по IntersectionObserver (не трогаем SSR/гидрацию)
  useEffect(() => {
    if (start !== "in-view") return;
    if (giveUp) return;

    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCanLoadVideo(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [start, giveUp]);

  // 3) Когда можно — запускаем загрузку/плей (без setAttribute/src вручную)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!canLoadVideo || giveUp || start === "never") {
      // важно: не трогаем src/source — браузер сам решит, просто не грузим активно
      return;
    }

    // просим браузер начать (sources уже в DOM)
    // preload=metadata + play() после allow
    const play = async () => {
      try {
        await el.play();
      } catch {
        // autoplay мог быть заблокирован — ок, останется постер/превью
      }
    };

    // load() безопасно, но не обязательно — пусть браузер решит
    el.load();
    play();
  }, [canLoadVideo, giveUp, start]);

  // 4) Фоллбек “не завелось” — оставляем превью
  useEffect(() => {
    if (!canLoadVideo || ready || giveUp) return;
    const t = window.setTimeout(() => setGiveUp(true), 2500);
    return () => window.clearTimeout(t);
  }, [canLoadVideo, ready, giveUp]);

  const preview =
    videoMobile.placeholder?.url ||
    videoPc.placeholder?.url ||
    "/images/preview.png";

  const alt =
    videoMobile.placeholder?.alt || videoPc.placeholder?.alt || "Background";

  const pcSrc = videoPc.video?.url;
  const mobSrc = videoMobile.video?.url;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Видео под превью. Включаем opacity только когда ready */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          ready && !giveUp ? "opacity-100 z-10" : "opacity-0"
        }`}
        muted
        playsInline
        loop
        preload="metadata"
        // автостарт: только если разрешили
        autoPlay={canLoadVideo && !giveUp && start !== "never"}
        disableRemotePlayback
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
      >
        {/* Браузер сам выбирает source по media — без JS и без гидрации */}
        {pcSrc ? (
          <source
            src={pcSrc}
            media="(min-width: 768px)"
            type={videoPc.video?.type ?? "video/mp4"}
          />
        ) : null}
        {mobSrc ? (
          <source src={mobSrc} type={videoMobile.video?.type ?? "video/mp4"} />
        ) : null}
      </video>

      {/* Превью: то, что пользователь видит сразу */}
      <Image
        src={preview}
        alt={alt}
        fill
        priority={priorityImage}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
