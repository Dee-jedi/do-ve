"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Palette,
  ExternalLink,
  MessageCircleHeart,
  Gift,
  QrCode,
  Sparkles,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Dramatic blur-to-sharp scroll reveal with scale pop
const scrollReveal = (delay: number = 0) => ({
  initial: { opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: {
    duration: 1,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // expo-out: luxurious deceleration
  },
});

interface ReceptionDetailsProps {
  onOpenEvents: () => void;
  onOpenWishes: () => void;
  onOpenGifts: () => void;
  onOpenShare: () => void;
  onOpenInvitation: () => void;
}

export default function ReceptionDetails({
  onOpenEvents,
  onOpenWishes,
  onOpenGifts,
  onOpenShare,
  onOpenInvitation,
}: ReceptionDetailsProps) {
  const router = useRouter();
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleAddToCalendar = () => {
    // Generate .ics calendar download for the wedding
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Dorcas & Victor//DO.VE 2026//EN",
      "BEGIN:VEVENT",
      "SUMMARY:The Solemnization of Holy Matrimony: Dorcas & Victor (DO.VE 2026)",
      "DESCRIPTION:Solemnization of Holy Matrimony between Dorcas Okon Monday and Victor Onyekachi Ezennaya at Insight Bible Church, Uyo.",
      "DTSTART:20261010T090000Z",
      "DTEND:20261010T160000Z",
      "LOCATION:Insight Bible Church, 227 Nsikak Eduok Avenue (Two Lanes), Uyo, Akwa Ibom State",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "DOVE-2026-Dorcas-Victor-Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  const colorPalette = [
    { name: "Navy Blue", hex: "#0b1b3d", border: "#1f3b73" },
    { name: "Sky Blue", hex: "#7eb2dd", border: "#a6cef5" },
    { name: "Regal Gold", hex: "#dfba73", border: "#ffd98a" },
    { name: "Champagne", hex: "#f5eed8", border: "#eedcaf" },
    { name: "Obsidian Black", hex: "#0d0b0a", border: "#3e2d26" },
  ];

  return (
    <section
      id="reception-details"
      className="relative z-10 w-full bg-obsidian-950 px-4 sm:px-6 py-12 sm:py-16 text-gold-100"
    >
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Section Title */}
        <motion.div {...scrollReveal()} className="text-center space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-medium font-sans">
            Information &amp; Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#fff2d6] font-medium">
            The Celebration Details
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="mx-auto h-px w-24 bg-linear-to-r from-transparent via-gold-500 to-transparent my-3 shadow-[0_0_12px_rgba(223,186,115,0.4)]"
          />
          <p className="text-xs sm:text-sm text-[#a8998c] max-w-md mx-auto">
            Everything you need to know to celebrate the holy union of Dorcas &amp; Victor.
          </p>
        </motion.div>

        {/* 3 Core Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: The Solemnization */}
          <motion.div {...scrollReveal(0.1)} className="rounded-2xl border border-gold-900/40 bg-obsidian-900/90 p-6 flex flex-col justify-between transition duration-300 hover:border-gold-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/30 bg-obsidian-800 text-gold-400">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                The Solemnization
              </span>
              <h3 className="font-serif text-xl text-[#fff2d6]">Holy Matrimony</h3>
              <p className="text-xs text-[#a8998c] leading-relaxed">
                Saturday 10th October 2026<br />
                <strong className="text-gold-200">10:00 AM</strong> Prompt (WAT)
              </p>
              <div className="pt-2 text-xs text-gold-200">
                <strong className="block text-white">Insight Bible Church</strong>
                227 Nsikak Eduok Avenue (Two Lanes), Uyo, Akwa Ibom State
              </div>
            </div>

            <button
              onClick={handleAddToCalendar}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg border border-gold-500/40 bg-obsidian-900 py-2 text-xs text-gold-200 hover:border-gold-400 hover:text-white transition cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              <span>{calendarAdded ? "Added to Calendar!" : "Add to Calendar (.ics)"}</span>
            </button>
          </motion.div>

          {/* Card 2: The Venue & Location */}
          <motion.div {...scrollReveal(0.2)} className="rounded-2xl border border-gold-900/40 bg-obsidian-900/90 p-6 flex flex-col justify-between transition duration-300 hover:border-gold-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/30 bg-obsidian-800 text-gold-400">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                Church &amp; Venue
              </span>
              <h3 className="font-serif text-xl text-[#fff2d6]">Insight Bible Church</h3>
              <p className="text-xs text-[#a8998c] leading-relaxed">
                227 Nsikak Eduok Avenue<br />
                Uyo, Akwa Ibom State, Nigeria
              </p>
              <div className="pt-2 text-xs text-gold-200">
                <span className="block text-white font-medium">Families of the Couple:</span>
                Late Pst. Okon Monday Etinwa &amp; Deacon Eze Madubuike
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Insight+Bible+Church+227+Nsikak+Eduok+Avenue+Uyo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg border border-gold-500/40 bg-obsidian-900 py-2 text-xs text-gold-200 hover:border-gold-400 hover:text-white transition cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5 text-gold-400" />
              <span>Navigate via Google Maps</span>
            </a>
          </motion.div>

          {/* Card 3: The Color Palette & Dress Code */}
          <motion.div {...scrollReveal(0.3)} className="rounded-2xl border border-gold-900/40 bg-obsidian-900/90 p-6 flex flex-col justify-between transition duration-300 hover:border-gold-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/30 bg-obsidian-800 text-gold-400">
                <Palette className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                Official Dress Code
              </span>
              <h3 className="font-serif text-xl text-[#fff2d6]">Wedding Colours</h3>
              <p className="text-xs text-[#a8998c] leading-relaxed">
                <strong className="text-white">Navy Blue, Sky Blue and Gold</strong>.
              </p>

              {/* Color Swatches */}
              <div className="pt-2">
                <span className="text-[11px] text-gold-200/70 block mb-2">Palette Accents</span>
                <div className="flex items-center gap-2">
                  {colorPalette.map((col, idx) => (
                    <div
                      key={idx}
                      className="group relative flex flex-col items-center"
                      title={col.name}
                    >
                      <div
                        className="h-7 w-7 rounded-full shadow-md border transition group-hover:scale-110"
                        style={{ backgroundColor: col.hex, borderColor: col.border }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 text-center text-[11px] text-gold-400/80 italic">
              Navy Blue, Sky Blue &amp; Gold in celebration of DO.VE 2026!
            </div>
          </motion.div>
        </div>

        {/* Quick Access Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {/* Guestbook Banner */}
          <motion.div
            {...scrollReveal(0.1)}
            onClick={onOpenWishes}
            className="group cursor-pointer rounded-2xl border border-gold-500/30 bg-linear-to-r from-obsidian-900 via-obsidian-800 to-obsidian-900 p-5 flex items-center justify-between transition duration-300 hover:border-gold-400 hover:shadow-[0_0_25px_rgba(223,186,115,0.15)]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/15 text-gold-400 group-hover:scale-110 transition">
                <MessageCircleHeart className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[#fff2d6] group-hover:text-gold-gradient transition">
                  Leave a Wedding Toast
                </h4>
                <p className="text-xs text-[#a8998c]">
                  Send prayers and blessings to their live guestbook
                </p>
              </div>
            </div>
            <Sparkles className="h-4 w-4 text-gold-400 group-hover:rotate-12 transition" />
          </motion.div>

          {/* Registry / Gifts Banner */}
          <motion.div
            {...scrollReveal(0.2)}
            onClick={onOpenGifts}
            className="group cursor-pointer rounded-2xl border border-gold-500/30 bg-linear-to-r from-obsidian-900 via-obsidian-800 to-obsidian-900 p-5 flex items-center justify-between transition duration-300 hover:border-gold-400 hover:shadow-[0_0_25px_rgba(223,186,115,0.15)]"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/15 text-gold-400 group-hover:scale-110 transition">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[#fff2d6] group-hover:text-gold-gradient transition">
                  Gift Fund &amp; Offerings
                </h4>
                <p className="text-xs text-[#a8998c]">
                  Contribute your love gift to the new home
                </p>
              </div>
            </div>
            <Heart className="h-4 w-4 text-gold-400 group-hover:scale-110 transition" />
          </motion.div>
        </div>

        {/* Official Invitation Card Banner */}
        <motion.div
          {...scrollReveal(0.1)}
          onClick={onOpenInvitation}
          className="group cursor-pointer rounded-2xl border border-gold-400/40 bg-linear-to-r from-obsidian-900 via-obsidian-800 to-obsidian-900 p-5 flex items-center justify-between transition duration-300 hover:border-gold-400 hover:shadow-[0_0_30px_rgba(223,186,115,0.2)]"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative h-14 w-11 rounded-lg overflow-hidden border border-gold-400/50 shadow-md shrink-0">
              <img
                src="/images/dove-invitation.jpg"
                alt="DO.VE 2026 Invitation"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 bg-gold-400/15 px-2 py-0.5 rounded-full border border-gold-400/30">
                  DO.VE 2026
                </span>
                <span className="text-[10px] text-gold-200/70">Official Invitation</span>
              </div>
              <h4 className="font-serif text-lg text-[#fff2d6] group-hover:text-gold-gradient transition mt-0.5">
                View Official Wedding Invitation Card
              </h4>
              <p className="text-xs text-[#a8998c]">
                Click to view and download the formal wedding invitation
              </p>
            </div>
          </div>
          <Sparkles className="h-5 w-5 text-gold-400 group-hover:rotate-12 transition shrink-0" />
        </motion.div>

        {/* Share with Table Guests Bar */}
        <motion.div {...scrollReveal(0.15)} className="rounded-2xl border border-gold-900/40 bg-obsidian-900 p-6 text-center space-y-3">
          <QrCode className="h-8 w-8 text-gold-400 mx-auto animate-pulse" />
          <h4 className="font-serif text-xl text-[#fff2d6]">Attending at a Guest Table?</h4>
          <p className="text-xs text-[#a8998c] max-w-sm mx-auto">
            Help other guests view the menu, program, and leave wishes by sharing this site right to their phones.
          </p>
          <button
            onClick={onOpenShare}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-obsidian-800 px-5 py-2.5 text-xs text-gold-400 hover:bg-gold-500/20 hover:text-white transition cursor-pointer"
          >
            <QrCode className="h-4 w-4" />
            <span>Show QR Code / Copy Link</span>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.footer {...scrollReveal(0.2)} className="pt-8 border-t border-gold-900/30 text-center space-y-4">
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

          <p className="text-xs text-[#8e8178]">
            &ldquo;And over all these virtues put on love, which binds them all together in perfect unity.&rdquo; — Colossians 3:14
          </p>

          <div className="text-[11px] text-[#6d5e56]">
            Crafted with deep love &amp; celebration for the couple. &copy; {new Date().getFullYear()}
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
