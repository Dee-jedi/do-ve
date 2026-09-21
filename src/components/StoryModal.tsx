"use client";

import React from "react";
import Image from "next/image";
import { X, BookOpen, Heart, Calendar } from "lucide-react";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAPTERS = [
  {
    chapter: "Chapter I",
    title: "The Divine Intersection",
    date: "The Beginning",
    text: "It started in the quietest of moments. Neither expected ordinary days to turn extraordinary, but in God's sovereign orchestration, Dorcas and Victor's paths crossed. What began as an effortless conversation bloomed into hours of laughter, mutual admiration, and an undeniable kindred bond.",
  },
  {
    chapter: "Chapter II",
    title: "Friendship Turned Sanctuary",
    date: "Growing in Grace",
    text: "Through every season, Victor found in Dorcas not just beauty, but wisdom, gentleness, and an unshakeable faith. In Victor, Dorcas found her protector, confidant, and biggest cheerleader. Their love wasn't a sudden storm; it was the steady, warm glow of morning light.",
  },
  {
    chapter: "Chapter III",
    title: "The Question & A Joyous 'Yes!'",
    date: "The Proposal",
    text: "With hearts anchored in God and eyes set on a shared purpose, Victor took the knee, asking Dorcas to walk through eternity together. Through joyful tears and radiant smiles, the answer was an ecstatic 'YES!'",
  },
];

export default function StoryModal({ isOpen, onClose }: StoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border border-gold-500/40 bg-[#100d0b] text-gold-100 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-espresso-700 px-6 py-4 bg-linear-to-r from-[#171311] via-[#201713] to-[#171311]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl tracking-wide text-gold-200">Our Love Story</h3>
              <p className="text-[11px] uppercase tracking-widest text-gold-400/80 font-sans">
                Written by Grace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gold-200/60 hover:text-white hover:bg-espresso-700/40 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Story Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Featured Image Portrait */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gold-500/30 shadow-lg">
            <Image
              src="/images/dorcas-victor-hero.jpg"
              alt="Dorcas & Victor"
              fill
              className="object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#100d0b] via-transparent to-black/20" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="font-serif text-base text-[#fff2d6] drop-shadow-md">
                Dorcas & Victor
              </span>
              <span className="text-[11px] font-sans text-gold-400 bg-black/60 px-2.5 py-0.5 rounded-full border border-gold-400/40 backdrop-blur-sm">
                Forever Starts Here
              </span>
            </div>
          </div>

          {/* Chapters */}
          <div className="space-y-6">
            {CHAPTERS.map((chap, i) => (
              <div
                key={i}
                className="relative rounded-xl border border-espresso-700/70 bg-[#16110f] p-5 transition hover:border-gold-500/40"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                    {chap.chapter}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-gold-200/60">
                    <Calendar className="h-3 w-3 text-gold-500" />
                    <span>{chap.date}</span>
                  </div>
                </div>

                <h4 className="font-serif text-lg text-[#fff2d6] font-medium mb-2">
                  {chap.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#d4c7b8] leading-relaxed font-sans">
                  {chap.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 text-xs text-gold-400/90 font-serif italic">
              <Heart className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              <span>And this is only the prologue of our forever...</span>
              <Heart className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
