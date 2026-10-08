"use client";

import React, { useState, useEffect } from "react";
import { MessageCircleHeart, ArrowLeft } from "lucide-react";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

export default function WishesPage() {
  const router = useRouter();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedWishes: Wish[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        let dateString = "Recently";
        if (data.createdAt) {
          dateString = new Date(data.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        fetchedWishes.push({
          id: docSnap.id,
          name: data.name,
          relation: data.relation,
          message: data.message,
          date: dateString,
        });
      });
      setWishes(fetchedWishes);
    });

    return () => unsubscribe();
  }, []);

  const handlePointerDown = (id: string) => {
    timerRef.current = setTimeout(async () => {
      const passcode = window.prompt("Enter admin passcode to delete this wish:");
      if (passcode === "admin") {
        try {
          await deleteDoc(doc(db, "wishes", id));
        } catch (error) {
          console.error("Error deleting wish:", error);
        }
      } else if (passcode !== null) {
        alert("Incorrect passcode.");
      }
    }, 7000); // 7 seconds
  };

  const handlePointerUpOrLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <main className="relative min-h-screen bg-obsidian-950 text-gold-100 flex flex-col">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0a09]/90 backdrop-blur-md border-b border-gold-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 hover:text-white transition py-1 px-3 rounded-full border border-gold-500/30 bg-[#16110e]/70 hover:bg-gold-500/20 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gold-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Home</span>
        </button>

        <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-gold-gradient">
          DO.VE
        </span>

        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gold-400/80 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
          Guestbook
        </span>
      </header>
      
      <div className="pt-12 pb-16 px-4 sm:px-6 mx-auto max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
                <MessageCircleHeart className="h-7 w-7" />
              </div>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#fff2d6]">
              All Heartfelt Wishes
            </h1>
            <p className="text-sm text-gold-200/70 font-sans tracking-wide">
              {wishes.length} blessings from family and friends
            </p>
          </div>

          <div className="space-y-12 pt-8">
            {wishes.map((w, idx) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                onPointerDown={() => handlePointerDown(w.id)}
                onPointerUp={handlePointerUpOrLeave}
                onPointerLeave={handlePointerUpOrLeave}
                onPointerCancel={handlePointerUpOrLeave}
                className="group relative pl-6 sm:pl-10 py-2 border-l border-gold-900/30 transition-colors duration-500 hover:border-gold-500/50 select-none cursor-pointer"
              >
                <div className="absolute top-0 left-[-16px] sm:left-[-24px] text-5xl font-serif text-gold-900/30 group-hover:text-gold-500/30 transition-colors duration-500 leading-none h-4">
                  &ldquo;
                </div>
                
                <p className="text-lg sm:text-xl md:text-2xl text-[#e0d6c5] leading-relaxed italic font-serif mb-6">
                  {w.message}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-medium text-sm sm:text-base text-[#fff2d6] tracking-wide">{w.name}</span>
                    <span className="text-[9px] sm:text-[10px] text-gold-400/60 tracking-[0.2em] uppercase font-mono">
                      &mdash; {w.relation}
                    </span>
                  </div>
                  <div className="text-xs text-[#8e8178] font-sans tracking-wide">
                    {w.date}
                  </div>
                </div>
              </motion.div>
            ))}

            {wishes.length === 0 && (
              <div className="text-center py-20 text-gold-200/50 text-base font-serif italic">
                No wishes have been left yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
