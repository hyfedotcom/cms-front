"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useHasMounted } from "src/hooks/useHasMounted";

type MediaData = {
  video?: { url: string };
  placeholder?: { url: string; blurDataURL?: string };
};

export function Video({
  video,
  priority = false,
}: {
  video: MediaData;
  priority?: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [inView, setInView] = useState(false);
  const mounted = useHasMounted();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [giveUp, setGiveUp] = useState(false);

  useEffect(() => {
    if (priority) return;
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    const c = nav.connection;
    const slow = /(^|-)2g/.test(c?.effectiveType ?? "");
    if (c?.saveData || slow) {
      setShouldLoad(false);
      setReady(false);
      setGiveUp(true); // всегда постер
    }
  }, [priority]);

  // IO — лениво подгружаем
  useEffect(() => {
    if (!mounted || !wrapperRef.current || priority) return;
    const node = wrapperRef.current;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "300px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [mounted, priority]);

  // Активируем загрузку
  useEffect(() => {
    if (inView && !shouldLoad) setShouldLoad(true);
  }, [inView, shouldLoad]);

  // Подгружаем видео вручную (чтобы гарантировать start)
  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.load(); // гарантирует начало загрузки даже при preload="none"
    }
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || ready || giveUp) return;
    const t = setTimeout(() => setGiveUp(true), 2500); // 2.5s хватит
    return () => clearTimeout(t);
  }, [shouldLoad, ready, giveUp]);

  // Проверяем готовность (на случай, если браузер кэшировал)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.readyState >= 2) setReady(true);
  }, [shouldLoad]);

  const preview = video.placeholder?.url || "/images/preview.png";
  const src = video.video?.url;

  return (
    <div ref={wrapperRef} className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        preload={priority ? "metadata" : "none"}
        autoPlay
        muted
        playsInline
        loop
        disableRemotePlayback
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
        style={{
          transform: "translateZ(0)",
          willChange: "opacity, transform",
        }}
      />

      <Image
        src={preview}
        alt="preview"
        fill
        className={`object-cover transition-opacity duration-700 ${
          ready ? "z-0" :  "z-10"
        }`}
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 90vw"
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
