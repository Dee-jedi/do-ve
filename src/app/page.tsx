"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoveStoryPreview from "@/components/LoveStoryPreview";
import OrderOfEventsModal from "@/components/OrderOfEventsModal";
import WishesSection from "@/components/WishesSection";
import GiftsModal from "@/components/GiftsModal";
import ShareModal from "@/components/ShareModal";
import InvitationModal from "@/components/InvitationModal";

export default function Home() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

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
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-400/40 bg-obsidian-800">
            <span className="font-serif text-xs font-bold text-gold-gradient">D&amp;V</span>
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
    </main>
  );
}
