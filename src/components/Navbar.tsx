"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  BookOpen,
  Clock,
  MessageCircleHeart,
  Gift,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AudioPlayer from "./AudioPlayer";

interface NavbarProps {
  onOpenStory?: () => void;
  onOpenEvents?: () => void;
  onOpenWishes?: () => void;
  onOpenGifts?: () => void;
  onOpenShare?: () => void;
}

export default function Navbar({
  onOpenStory,
  onOpenEvents,
  onOpenWishes,
  onOpenGifts,
  onOpenShare,
}: NavbarProps) {
  const router = useRouter();
  
  // Fallbacks for when Navbar is rendered on other pages like /story
  const handleOpenStory = onOpenStory || (() => router.push("/story"));
  const handleOpenEvents = onOpenEvents || (() => router.push("/"));
  const handleOpenWishes = onOpenWishes || (() => router.push("/"));
  const handleOpenGifts = onOpenGifts || (() => router.push("/"));
  const handleOpenShare = onOpenShare || (() => router.push("/"));
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Streamlined essential navigation pillars
  const primaryNavItems = [
    {
      label: "Our Story",
      icon: BookOpen,
      action: () => {
        setIsOpen(false);
        handleOpenStory();
      },
    },
    {
      label: "Order of Events",
      icon: Clock,
      action: () => {
        setIsOpen(false);
        handleOpenEvents();
      },
    },
    {
      label: "Leave a Wish",
      icon: MessageCircleHeart,
      action: () => {
        setIsOpen(false);
        handleOpenWishes();
      },
      highlight: true,
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#0c0a09]/90 backdrop-blur-md border-b border-gold-500/20 py-2.5 shadow-2xl"
            : "bg-linear-to-b from-black/85 via-black/40 to-transparent py-3.5 sm:py-4"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between">
          {/* Couple Wordmark / Brand: DO.VE */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none py-1"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-gold-gradient transition group-hover:brightness-110 drop-shadow-sm">
              DO.VE
            </span>
          </button>

          {/* Desktop Nav Links (Streamlined 3 clean pillars) */}
          <nav className="hidden md:flex items-center gap-8">
            {primaryNavItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="text-xs uppercase tracking-widest text-gold-200/80 hover:text-gold-400 transition cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onOpenGifts}
              className="text-xs uppercase tracking-widest text-gold-400/80 hover:text-gold-300 transition cursor-pointer"
            >
              Love Gifts
            </button>
          </nav>

          {/* Right Action Group: Music + Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <AudioPlayer />

            {/* Hamburger Button (Mobile & Tablet only, hidden on desktop) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="relative flex md:hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gold-500/40 bg-[#140f0c]/80 text-gold-400 backdrop-blur-md transition hover:border-gold-400 hover:bg-[#1f1713] focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* AnimatePresence for smooth drawer enter/exit */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dimmed Background Overlay */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40"
              aria-label="Close menu backdrop"
            />

            {/* Smooth Slide-out Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%", filter: "brightness(0.5)" }}
              animate={{ x: 0, filter: "brightness(1)" }}
              exit={{ x: "100%", filter: "brightness(0.5)" }}
              transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation drawer"
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-90 flex flex-col justify-between bg-[#110e0c] border-l border-gold-500/30 shadow-[-12px_0_40px_rgba(0,0,0,0.85)] will-change-transform"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-espresso-700/70 bg-[#15100d]">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl font-bold tracking-[0.2em] text-gold-gradient">
                    DO.VE
                  </span>
                  <span className="text-[10px] font-mono text-gold-400/80 uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold-400/30 bg-gold-400/10">
                    2026
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-gold-200/70 hover:text-white hover:bg-espresso-700/50 transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Clean, Streamlined Navigation Links */}
              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400/70 font-mono mb-4">
                  Navigation
                </p>

                {primaryNavItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: 0.15 + idx * 0.08,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1], // Expo-out curve
                      }}
                      onClick={item.action}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                        item.highlight
                          ? "bg-linear-to-r from-[#241712] to-[#1c130f] border border-gold-500/40 text-[#fff2d6] shadow-[0_0_20px_rgba(223,186,115,0.1)] hover:shadow-[0_0_25px_rgba(223,186,115,0.3)] hover:border-gold-400"
                          : "bg-[#16110e]/70 hover:bg-[#1f1713] border border-espresso-700/40 text-gold-200 hover:text-[#fff2d6] hover:border-gold-500/60"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                            item.highlight
                              ? "bg-gold-500/20 text-gold-400"
                              : "bg-[#1c1411] text-gold-400/80"
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="font-serif text-base tracking-wide">
                          {item.label}
                        </span>
                      </div>
                      {item.highlight && (
                        <span className="text-[9px] uppercase tracking-widest bg-gold-400/20 text-gold-400 px-2 py-0.5 rounded-full border border-gold-400/40">
                          Guestbook
                        </span>
                      )}
                    </motion.button>
                  );
                })}

                {/* Single Subtle Love Offering Row */}
                <motion.div
                  initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-2"
                >
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleOpenGifts();
                    }}
                    className="w-full flex items-center gap-3.5 p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer bg-[#16110e]/70 hover:bg-[#1f1713] border border-espresso-700/40 text-gold-200/90 hover:text-[#fff2d6]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1c1411] text-gold-400/80">
                      <Gift className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-serif text-base tracking-wide">
                      Love Offerings &amp; Gifts
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Minimal Footer Signature */}
              <div className="border-t border-espresso-700/70 bg-[#15100d] px-6 py-5 text-center space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gold-200 font-serif">
                  <span>Dorcas &amp; Victor</span>
                  <Heart className="h-3 w-3 fill-gold-500 text-gold-500" />
                  <span>October 10, 2026</span>
                </div>
                <p className="text-[10px] text-[#7a6d64] font-sans tracking-wide">
                  Insight Bible Church &bull; Uyo, Akwa Ibom State
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
