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
    title: "A Match Made in Core Subjects",
    date: "August 2022",
    text: "Victor and Dorcas met in August of 2022 at Beulah International Schools where he taught Mathematics and she had just been employed fresh-off NYSC to be the English teacher. They started talking when Dorcas saw Victor's laptop screen saver featuring him on the backup mic in church, asked him what church he went to and they discovered that they went to the same church (although Victor worshipped at the headquarters while Dorcas worshipped at a branch). The rest, they say, is history.",
  },
  {
    chapter: "Chapter II",
    title: "A Cash-Crunch Love",
    date: "2023",
    text: "Dorcas tried to persuade Victor to come to her branch especially when she discovered that he could play a number of musical instruments and the church needed his services. \"I don't like small branches; everybody will know you. I don't want anybody to know me.\" Victor argued. Dorcas said, \"Hold my drink\"... In a matter of months (thanks to the cash crunch of 2023 where he could no longer get cash to pay to the headquarters, to the glory of God.😂) he was answering questions in Sunday school, playing the keyboard, drums and the bass guitar.",
  },
  {
    chapter: "Chapter III",
    title: "The Akwa Ibom Effect",
    date: "The Turning Point",
    text: "What began as routine Sunday appearances soon became an unspoken anticipation. Between weekly rehearsals, shared rides, and lingering conversations after service, the headquarters boy was completely captivated. It was at this point that he realised that this Akwa Ibom woman had him in a chokehold—and truthfully, there was no escaping, nor did he want to.",
  },
  {
    chapter: "Chapter IV",
    title: "From \"Brother\" to Forever",
    date: "Today & Always",
    text: "Today, you have come to witness what started as an attempt to recruit an instrumentalist for the church, years of friendship and partnership. Victor was just like a brother to Dorcas. Yes. That's where all great relationships start. Somewhere between the music, the laughter, and walking through seasons of life together, God wrote a chapter neither saw coming: turning the closest of friends into each other's forever.",
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
