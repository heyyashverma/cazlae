"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = "/bg2.webm";
    video.load();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      onCanPlay={() => setReady(true)}
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        filter: ready ? "blur(0px)" : "blur(20px)",
        opacity: ready ? 1 : 0,
        transform: ready ? "scale(1)" : "scale(1.08)",
        transition: "filter 1.4s ease, opacity 1.4s ease, transform 1.4s ease",
      }}
    />
  );
}
