"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderOfServicePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-obsidian-950 text-gold-100 flex flex-col items-center justify-center p-6 relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-start">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gold-400 hover:text-gold-200 transition bg-obsidian-900/50 px-4 py-2 rounded-full backdrop-blur-md border border-gold-900/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-sans">Back Home</span>
        </button>
      </nav>

      {/* Content Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full bg-obsidian-900/40 border border-gold-900/30 backdrop-blur-md rounded-2xl p-8 sm:p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-gold-900/20 mx-auto flex items-center justify-center mb-6">
          <BookOpen className="w-8 h-8 text-gold-400" />
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl text-gold-gradient mb-4">
          Order of Service
        </h1>
        
        <p className="font-sans font-light text-gold-100/70 leading-relaxed text-sm sm:text-base">
          Welcome to the wedding of Dorcas and Victor. The detailed order of service will be available here on the day of the event. 
        </p>

        <div className="mt-8 pt-8 border-t border-gold-900/30">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-500/50">
            October 10, 2026 &bull; Uyo, Nigeria
          </p>
        </div>
      </motion.div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.05)_0%,transparent_60%)] pointer-events-none blur-3xl -z-10" />
    </main>
  );
}
