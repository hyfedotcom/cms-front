"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type MediaData = {
  video?: { url: string; type?: string }; // type опционально, default video/mp4
  placeholder?: { url: string; alt?: string };
};

function useIsDesktop(breakpoint = 768) {
  const [isDesk, setIsDesk] = useState(false); // важно: одинаково на SSR и на первом client render

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const onChange = () => setIsDesk(mq.matches);
    onChange(); // выставляем после mount

    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpoint]);

  return isDesk;
}

export function Video({
  videoMobile,
  videoPc,
  priorityImage = true, // для hero обычно true (быстро показать фон)
}: {
  videoMobile: MediaData;
  videoPc: MediaData;
  priorityImage?: boolean;
  start?: "immediate" | "in-view" | "never";
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [play, setPlay] = useState(false);
  const isDesk = useIsDesktop();

  const posterSrc = useMemo(() => {
    const mobile = videoMobile.placeholder?.url;
    const pc = videoPc.placeholder?.url;
    return (isDesk ? pc : mobile) ?? pc ?? mobile ?? "/images/preview.png";
  }, [isDesk, videoMobile.placeholder?.url, videoPc.placeholder?.url]);

  const videoSrc = useMemo(() => {
    const mobile = videoMobile.video?.url;
    const pc = videoPc.video?.url;
    return (isDesk ? pc : mobile) ?? pc ?? mobile;
  }, [isDesk, videoMobile.video?.url, videoPc.video?.url]);

  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!play || !videoSrc) return;

    el.src = videoSrc;
    el.load();
    el.play().catch(() => {});
  }, [play, videoSrc]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={posterSrc}
        alt="it is poster vor video"
        fill
        priority={priorityImage}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        preload="none"
      ></video>
    </div>
  );
}
