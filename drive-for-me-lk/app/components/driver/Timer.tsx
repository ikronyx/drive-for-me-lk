"use client";

import { useEffect, useState } from "react";

export function useTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(i);
  }, [active]);

  return [seconds, setSeconds] as const;
}

export function formatTime(sec: number) {
  const h = Math.floor(sec / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((sec % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");

  return `${h}:${m}:${s}`;
}
