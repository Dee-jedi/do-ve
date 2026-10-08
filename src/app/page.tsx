"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoveStoryPreview from "@/components/LoveStoryPreview";
import OrderOfEventsModal from "@/components/OrderOfEventsModal";
import WishesSection from "@/components/WishesSection";
import GiftsModal from "@/components/GiftsModal";
import ShareModal from "@/components/ShareModal";
import InvitationModal from "@/components/InvitationModal";
import AdminWishesModal from "@/components/AdminWishesModal";

export default function Home() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);

  const startHold = () => {
    holdStartTimeRef.current = Date.now();
    const duration = 7000; // 7 seconds hold requirement

    holdIntervalRef.current = setInterval(() => {
      if (!holdStartTimeRef.current) return;
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setHoldProgress(progress);

      if (elapsed >= duration) {
        clearInterval(holdIntervalRef.current!);
        holdIntervalRef.current = null;
        holdStartTimeRef.current = null;
        setHoldProgress(0);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(200);
        }
        setIsAdminOpen(true);
      }
    }, 50);
  };

  const cancelHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    holdStartTimeRef.current = null;
    setHoldProgress(0);
  };

  return (
    <main className="relative min-h-screen bg-obsidian-950 text-gold-100">
      {/* Top Floating Glass Navigation with Hamburger */}
      <Navbar
        onOpenEvents={() => setIsEventsOpen(true)}
        onOpenWishes={() => {
          document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenGifts={() => setIsGiftsOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Editorial Luxury Hero Section */}
      <Hero onOpenGifts={() => setIsGiftsOpen(true)} />

      {/* Love Story Teaser */}
      <LoveStoryPreview />

      {/* Live Guestbook / Wishes Section */}
      <WishesSection />

      <footer className="pb-12 pt-8 text-center space-y-4 max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-espresso-700" />
          <div
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
            onPointerCancel={cancelHold}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-obsidian-800 select-none cursor-pointer transition-transform active:scale-95 group"
            title="D&V"
          >
            {/* Visual 7-second hold progress ring */}
            {holdProgress > 0 && (
              <svg className="absolute inset-0 -rotate-90 w-full h-full pointer-events-none">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  stroke="rgba(223, 186, 115, 0.9)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="100"
                  strokeDashoffset={100 - holdProgress}
                  className="transition-all duration-75"
                />
              </svg>
            )}
            <span className="font-serif text-xs font-bold text-gold-gradient group-hover:scale-105 transition-transform">
              D&amp;V
            </span>
          </div>
          <div className="h-px w-12 bg-espresso-700" />
        </div>

        <p className="font-serif text-base sm:text-lg text-[#fff2d6]">
          Dorcas &amp; Victor
        </p>

        <p className="text-xs text-[#8e8178] max-w-md mx-auto">
          &ldquo;And over all these virtues put on love, which binds them all together in perfect unity.&rdquo; — Colossians 3:14
        </p>

        <div className="text-[11px] text-[#6d5e56]">
          Crafted with deep love &amp; celebration for the couple. &copy; {new Date().getFullYear()}
        </div>
      </footer>

      {/* Interactive Modals */}
      <OrderOfEventsModal isOpen={isEventsOpen} onClose={() => setIsEventsOpen(false)} />
      <GiftsModal isOpen={isGiftsOpen} onClose={() => setIsGiftsOpen(false)} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <InvitationModal isOpen={isInvitationOpen} onClose={() => setIsInvitationOpen(false)} />
      <AdminWishesModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </main>
  );
}
