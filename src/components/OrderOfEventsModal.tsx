"use client";

import React from "react";
import { X, Clock, MapPin, Sparkles, Heart } from "lucide-react";

interface OrderOfEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EVENTS = [
  {
    time: "10:00 AM",
    title: "Solemnization & Exchange of Vows",
    venue: "Insight Bible Church, Uyo",
    desc: "The sacred holy matrimony of Dorcas Okon Monday & Victor Onyekachi Ezennaya before God and witnesses.",
  },
  {
    time: "12:30 PM",
    title: "Red Carpet & Guest Welcome",
    venue: "Reception Pavilion",
    desc: "Mingle, capture memories at the photo wall, and enjoy handcrafted refreshments.",
  },
  {
    time: "01:00 PM",
    title: "The Grand Entrance of DO.VE 2026",
    venue: "Main Banquet Hall",
    desc: "Welcome the newly wedded couple in splendor and joyous celebration.",
  },
  {
    time: "02:00 PM",
    title: "Cutting of the Cake & First Dance",
    venue: "Main Stage",
    desc: "Witness the couple's first dance and celebration together.",
  },
  {
    time: "02:45 PM",
    title: "Feasting, Toasts & Open Dance Floor",
    venue: "Main Banquet Hall",
    desc: "Celebration, delicious food, heartfelt toasts, and joy all afternoon.",
  },
];

export default function OrderOfEventsModal({ isOpen, onClose }: OrderOfEventsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border border-gold-500/40 bg-[#100d0b] text-gold-100 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-espresso-700 px-6 py-4 bg-linear-to-r from-[#171311] via-[#201713] to-[#171311]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl tracking-wide text-gold-200">Order of Events</h3>
              <p className="text-[11px] uppercase tracking-widest text-gold-400/80 font-sans">
                A Day to Remember
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

        {/* Timeline Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="relative border-l-2 border-gold-500/30 ml-3 pl-6 space-y-6">
            {EVENTS.map((event, index) => (
              <div key={index} className="relative group">
                {/* Timeline Dot */}
                <span className="absolute -left-7.75 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-gold-400 bg-[#100d0b] group-hover:scale-125 transition">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                </span>

                <div className="rounded-xl border border-espresso-700/60 bg-[#15110f] p-4 transition hover:border-gold-500/40">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded-md border border-gold-400/20">
                      {event.time}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-gold-200/60">
                      <MapPin className="h-3 w-3 text-gold-500" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  <h4 className="font-serif text-base text-[#fff2d6] font-medium mt-1">
                    {event.title}
                  </h4>
                  <p className="text-xs text-[#a8998c] mt-1 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gold-500/25 bg-linear-to-br from-[#1c1613] to-[#120d0b] p-4 text-center">
            <Sparkles className="h-4 w-4 text-gold-400 mx-auto mb-1.5" />
            <p className="font-serif text-sm text-gold-200 italic">
              &ldquo;Please be comfortably seated 15 minutes prior to the solemnization.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
