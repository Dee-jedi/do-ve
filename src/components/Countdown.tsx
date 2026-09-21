"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate?: string;
  forceCompleted?: boolean;
  onElapsedChange?: (elapsed: boolean) => void;
}

// Official Wedding Date: Saturday 10th October 2026, 10:00 AM Prompt (WAT / UTC+1)
// In Universal UTC: 2026-10-10 09:00:00 UTC -> Date.UTC(2026, 9, 10, 9, 0, 0)
const UNIVERSAL_WEDDING_TIMESTAMP = Date.UTC(2026, 9, 10, 9, 0, 0);

export default function Countdown({
  targetDate,
  forceCompleted = false,
  onElapsedChange,
}: CountdownProps) {
  const targetTimestamp = targetDate ? new Date(targetDate).getTime() : UNIVERSAL_WEDDING_TIMESTAMP;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isCompleted, setIsCompleted] = useState(() => {
    if (forceCompleted) return true;
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("celebrate") === "true";
    }
    return false;
  });
  const [mounted, setMounted] = useState(false);
  const [serverOffset, setServerOffset] = useState<number>(0);

  // Notify parent on status change
  useEffect(() => {
    onElapsedChange?.(isCompleted);
  }, [isCompleted, onElapsedChange]);

  // Synchronize with atomic server clock so every device worldwide sees the exact same second
  useEffect(() => {
    let active = true;

    fetch("/api/time", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.now) {
          const offset = data.now - Date.now();
          setServerOffset(offset);
        }
      })
      .catch(() => {
        // Fallback to client clock if offline or unreachable
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setMounted(true);

    // Check if celebration preview is requested via URL query param (?celebrate=true)
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("celebrate") === "true") {
        setIsCompleted(true);
        return;
      }
    }

    if (forceCompleted) {
      setIsCompleted(true);
      return;
    }

    const calculateTime = () => {
      // True universal now = device clock + atomic server offset
      const trueNow = Date.now() + serverOffset;
      const difference = targetTimestamp - trueNow;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsCompleted(false);
      } else {
        // When the countdown reaches 0 (The Wedding has commenced) -> Disappear
        setIsCompleted(true);
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetTimestamp, forceCompleted, serverOffset]);

  // When timer completes / wedding has arrived, disappear cleanly to keep Hero pristine
  if (mounted && isCompleted) {
    return null;
  }

  // Active Countdown Pills
  const items = [
    { label: "Days", value: mounted ? timeLeft.days : 19 },
    { label: "Hours", value: mounted ? timeLeft.hours : 0 },
    { label: "Mins", value: mounted ? timeLeft.minutes : 0 },
    { label: "Secs", value: mounted ? timeLeft.seconds : 0, isSecond: true },
  ];

  return (
    <div className="w-full max-w-xs sm:max-w-sm mx-auto mt-8 sm:mt-12 mb-4 transition-opacity duration-500">
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-xl border border-gold-500/30 bg-[#140f0c]/85 py-2 sm:py-2.5 px-1 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)] relative overflow-hidden group"
          >
            {/* Top gold highlight line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-gold-400 to-transparent opacity-60 group-hover:opacity-100 transition" />

            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#fff2d6]">
              {String(item.value).padStart(2, "0")}
            </span>
            <span
              className={`text-[8px] sm:text-[9px] uppercase tracking-widest font-medium mt-0.5 ${
                item.isSecond ? "text-gold-400 animate-pulse" : "text-gold-400/85"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
