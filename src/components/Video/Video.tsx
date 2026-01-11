"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type MediaData = {
  video?: { url: string };
  placeholder?: { url: string };
};

function pickByMediaQuery(pc: string | undefined, mobile: string | undefined) {
  if (typeof window === "undefined") return pc ?? mobile; // SSR fallback
  return window.matchMedia("(min-width: 768px)").matches
    ? pc ?? mobile
    : mobile ?? pc;
}

export function Video({
  videoMobile,
  videoPc,
  priority = false,
}: {
  videoMobile: MediaData;
  videoPc: MediaData;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [src, setSrc] = useState<string | undefined>(() =>
    pickByMediaQuery(videoPc.video?.url, videoMobile.video?.url)
  );

  const [ready, setReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [giveUp, setGiveUp] = useState(false);

  // Обновляем src только когда реально поменялся breakpoint (768)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () =>
      setSrc(pickByMediaQuery(videoPc.video?.url, videoMobile.video?.url));

    mq.addEventListener?.("change", onChange);
  
    mq.addListener?.(onChange);

    return () => {
      mq.removeEventListener?.("change", onChange);

      mq.removeListener?.(onChange);
    };
  }, [videoPc.video?.url, videoMobile.video?.url]);

  // медленные сети -> постер
  useEffect(() => {
    if (priority) return;
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    const c = nav.connection;
    const slow = /(^|-)2g/.test(c?.effectiveType ?? "");
    if (c?.saveData || slow) setGiveUp(true);
  }, [priority]);

  // Назначаем src ТОЛЬКО когда решили грузить
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!shouldLoad || giveUp || !src) {
      // убираем src, чтобы не было сети
      if (el.getAttribute("src")) {
        el.removeAttribute("src");
        el.load();
      }
      return;
    }

    // назначаем src один раз (или при смене breakpoint)
    if (el.getAttribute("src") !== src) {
      setReady(false);
      el.setAttribute("src", src);
      el.load(); // только здесь
    }
  }, [shouldLoad, giveUp, src]);

  // simple lazy start: если priority — сразу, если нет — запускай когда хочешь (например, из IO)
  // здесь оставлю простой вариант: грузим сразу если priority, иначе через 150мс после маунта
  useEffect(() => {
    if (priority) return;
    const t = setTimeout(() => setShouldLoad(true), 150);
    return () => clearTimeout(t);
  }, [priority]);

  // таймаут “не завелось”
  useEffect(() => {
    if (!shouldLoad || ready || giveUp) return;
    const t = setTimeout(() => setGiveUp(true), 2500);
    return () => clearTimeout(t);
  }, [shouldLoad, ready, giveUp]);

  const preview =
    videoMobile.placeholder?.url ||
    videoPc.placeholder?.url ||
    "/images/preview.png";

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        preload={priority ? "metadata" : "none"}
        autoPlay={shouldLoad && !giveUp}
        muted
        playsInline
        loop
        disableRemotePlayback
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
      />

      <Image
        src={preview}
        alt="preview"
        fill
        sizes="90vw"
        priority={priority}
        className={`absolute inset-0 w-full h-screen ${
          ready ? "z-0" : "z-10"
        }`}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}
