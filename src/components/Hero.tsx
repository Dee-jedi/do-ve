"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

// Cinematic blur-to-sharp reveal with vertical float
const blurReveal = (delay: number = 0) => ({
  initial: { opacity: 0, y: 50, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: {
    duration: 1.4,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // expo-out for that luxurious deceleration
  },
});

// Dramatic scale + blur entrance for hero title
const titleReveal = {
  initial: { opacity: 0, y: 60, scale: 0.92, filter: "blur(16px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  transition: {
    duration: 1.8,
    delay: 0.8,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

export default function Hero() {
  const [isElapsed, setIsElapsed] = useState(false);

  const scrollToStory = () => {
    const el = document.getElementById("reception-details");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-svh w-full flex flex-col justify-between overflow-hidden bg-obsidian-950">
      {/* Background Image: Ken Burns slow cinematic zoom. Removed opacity: 0 to fix LCP */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.25 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <Image
          src="/images/dorcas-victor-hero.jpg"
          alt="Dorcas & Victor"
          fill
          priority
          className="object-cover object-[center_20%] sm:object-[center_25%] md:object-[center_35%] filter contrast-125 brightness-[0.95] blur-[2px] opacity-50"
          sizes="100vw"
        />

        {/* Ambient Chandelier Warmth Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(223,186,115,0.15)_0%,transparent_50%)] pointer-events-none" />

        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,6,6,0.85)_100%)] pointer-events-none" />

        {/* Strong Bottom Fade matching the story page */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-obsidian-950/60 to-obsidian-950 pointer-events-none" />
      </motion.div>

      {/* Spacing for Top Navbar */}
      <div className="h-16 sm:h-20 shrink-0" />

      {/* Editorial Content: Centered in the screen */}
      <div className="relative z-10 mx-auto w-full max-w-xl px-6 text-center flex flex-col items-center justify-center my-auto pt-12 sm:pt-16">
        {/* Minimal Monogram Pill — floats in with blur */}
        <motion.span
          {...blurReveal(0.4)}
          className="font-serif text-xs font-semibold tracking-[0.3em] uppercase text-gold-400/90 mb-2.5"
        >
          DO.VE 2026
        </motion.span>

        {/* Couple Names — dramatic scale + blur entrance */}
        <motion.h1
          {...titleReveal}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-gold-gradient drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] leading-tight"
        >
          Dorcas &amp; Victor
        </motion.h1>

        {/* Decorative Gold Line — expands from center with glow */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 1.6,
            delay: 1.8,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="w-24 h-px bg-linear-to-r from-transparent via-gold-400 to-transparent mt-3 mb-2 shadow-[0_0_12px_rgba(223,186,115,0.5)]"
        />

        {/* Date & Location — blur reveal */}
        <motion.p
          {...blurReveal(2.0)}
          className="font-sans text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold-200/80 font-light leading-relaxed mt-4"
        >
          Saturday, October 10, 2026 <br className="sm:hidden" />
          <span className="hidden sm:inline"> &bull; </span>
          <span className="sm:hidden text-gold-500/50 block my-1">❦</span>
          Uyo, Nigeria
        </motion.p>

        {/* Romantic Tagline — soft drift with blur */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)", rotate: -1 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: 0 }}
          transition={{ duration: 1.6, delay: 2.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-script text-3xl sm:text-4xl text-gold-200/90 mt-6 sm:mt-8 drop-shadow-md"
        >
          Forever Begins Today
        </motion.p>
      </div>

      {/* Bottom Section: Countdown & Scroll Indicator */}
      <div className="relative z-10 w-full mt-auto flex flex-col items-center pb-6 sm:pb-8">
        {/* Minimal Countdown Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 2.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full px-6"
        >
          <Countdown onElapsedChange={setIsElapsed} />
        </motion.div>

        {/* Scroll Indicator — breathes in with a float */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.4, ease: "easeOut" }}
          className="shrink-0 pt-4 flex justify-center"
        >
          <button
            onClick={scrollToStory}
            aria-label="Scroll down to story"
            className="flex flex-col items-center gap-2 text-gold-400/60 hover:text-gold-400 transition cursor-pointer group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans group-hover:text-gold-200 transition">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-linear-to-b from-gold-400/60 to-transparent group-hover:from-gold-400"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

