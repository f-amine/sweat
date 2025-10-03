"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CountdownProps = {
  /** Unique key to persist deadline across reloads */
  storageKey?: string;
  /** Total seconds of the countdown when first initialized */
  initialSeconds?: number;
  /** Optional className for outer wrapper */
  className?: string;
  /** Optional label text rendered before the ticking time */
  prefix?: string;
  /** Visual style variant */
  variant?: "pill" | "plain";
  /** Time format preference */
  format?: "auto" | "mm:ss" | "hh:mm:ss";
};

function getNow(): number {
  return Date.now();
}

export function Countdown({
  storageKey = "checkout_deadline_ms",
  initialSeconds = 15 * 60,
  className,
  prefix,
  variant = "pill",
  format = "auto",
}: CountdownProps) {
  const initializedRef = useRef(false);
  // Always start fresh at 15 minutes on each page load (no persistence)
  const [deadlineMs] = useState<number>(() => getNow() + initialSeconds * 1000);
  const [now, setNow] = useState<number>(() => getNow());

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const id = window.setInterval(() => setNow(getNow()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = Math.max(0, Math.floor((deadlineMs - now) / 1000));

  const timeParts = useMemo(() => {
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    const useHMS = format === "hh:mm:ss" || (format === "auto" && hours > 0);
    return { hh, mm, ss, useHMS };
  }, [remaining, format]);

  const timeString = timeParts.useHMS
    ? `${timeParts.hh}:${timeParts.mm}:${timeParts.ss}`
    : `${timeParts.mm}:${timeParts.ss}`;

  const Timer = (
    <span
      className="tabular-nums"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`الوقت المتبقي ${timeString}`}
    >
      {timeString}
    </span>
  );

  if (variant === "plain") {
    return (
      <span className={className}>
        {prefix ? <span className="ml-1">{prefix} </span> : null}
        {Timer}
      </span>
    );
  }

  return (
    <div className={[
      "inline-flex items-center justify-center",
      "rounded-[10px] bg-white border-2 border-[#FFB6CA]",
      "px-3 py-1 text-[#2B2B2B] text-[14px] font-semibold",
      className || "",
    ].join(" ")}
    >
      {prefix ? <span className="ml-1">{prefix}</span> : null}
      {Timer}
    </div>
  );
}

export default Countdown;


