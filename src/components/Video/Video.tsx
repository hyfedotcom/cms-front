"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type MediaData = {
  video?: { url: string; type?: string }; // type опционально, default video/mp4
  placeholder?: { url: string; alt?: string };
};

function isDesktop() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(min-width: 768px)").matches;
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

  const posterSrc = useMemo(
    () =>
      (isDesktop() ? videoPc.placeholder?.url : videoMobile.placeholder?.url) ??
      videoPc.placeholder?.url ??
      videoMobile.placeholder?.url ??
      "/images/preview.png",
    [videoMobile.placeholder?.url, videoPc.placeholder?.url]
  );

  const videoSrc = useMemo(() => {
    const pick = isDesktop() ? videoPc.video?.url : videoMobile.video?.url;
    return pick ?? videoPc.video?.url ?? videoMobile.video?.url;
  }, [videoPc, videoMobile]);

  useEffect(() => {
    // можно мягче: requestIdleCallback, но setTimeout достаточно
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
