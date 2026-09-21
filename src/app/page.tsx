"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoveStoryPreview from "@/components/LoveStoryPreview";
import ReceptionDetails from "@/components/ReceptionDetails";
import OrderOfEventsModal from "@/components/OrderOfEventsModal";
import WishesModal from "@/components/WishesModal";
import GiftsModal from "@/components/GiftsModal";
import ShareModal from "@/components/ShareModal";
import InvitationModal from "@/components/InvitationModal";

export default function Home() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isWishesOpen, setIsWishesOpen] = useState(false);
  const [isGiftsOpen, setIsGiftsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-obsidian-950 text-gold-100">
      {/* Top Floating Glass Navigation with Hamburger */}
      <Navbar
        onOpenEvents={() => setIsEventsOpen(true)}
        onOpenWishes={() => setIsWishesOpen(true)}
        onOpenGifts={() => setIsGiftsOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Editorial Luxury Hero Section */}
      <Hero />

      {/* Love Story Teaser */}
      <LoveStoryPreview />

      {/* Reception Details, Color Palette & Quick Guest Actions (Information & Guide at the last) */}
      <ReceptionDetails
        onOpenEvents={() => setIsEventsOpen(true)}
        onOpenWishes={() => setIsWishesOpen(true)}
        onOpenGifts={() => setIsGiftsOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenInvitation={() => setIsInvitationOpen(true)}
      />

      {/* Interactive Modals */}
      <OrderOfEventsModal isOpen={isEventsOpen} onClose={() => setIsEventsOpen(false)} />
      <WishesModal isOpen={isWishesOpen} onClose={() => setIsWishesOpen(false)} />
      <GiftsModal isOpen={isGiftsOpen} onClose={() => setIsGiftsOpen(false)} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <InvitationModal isOpen={isInvitationOpen} onClose={() => setIsInvitationOpen(false)} />
    </main>
  );
}
