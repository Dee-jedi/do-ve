"use client";

import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Send, MessageCircleHeart, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
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

export default function WishesSection() {
  const router = useRouter();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Friend");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedWishes: Wish[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        let dateString = "Recently";
        if (data.createdAt) {
          dateString = new Date(data.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        fetchedWishes.push({
          id: doc.id,
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

  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#dfba73", "#ffd98a", "#ffffff", "#c59b53", "#f2a6a6"],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    try {
      await addDoc(collection(db, "wishes"), {
        name: name.trim(),
        relation,
        message: message.trim(),
        createdAt: serverTimestamp(),
      });

      triggerCelebration();
      setSubmitted(true);
      setName("");
      setMessage("");

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } catch (error) {
      console.error("Error saving wish:", error);
    }
  };

  return (
    <section id="wishes" className="relative z-10 w-full bg-obsidian-950 px-4 sm:px-6 py-12 sm:py-16 text-gold-100">
      <div className="mx-auto max-w-2xl space-y-8">
        
        {/* Section Header matching LoveStoryPreview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-2"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-medium font-sans">
            Live Guestbook
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#fff2d6] font-medium">
            Leave a Loving Wish
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="w-24 h-px bg-linear-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4 shadow-[0_0_8px_rgba(223,186,115,0.4)]"
          />
          <p className="text-xs sm:text-sm text-[#a8998c] max-w-md mx-auto pt-4">
            Send prayers, blessings, and warm congratulations to Dorcas & Victor.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto pt-6"
        >
          <div className="bg-obsidian-900/40 backdrop-blur-sm border border-gold-900/30 rounded-2xl p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative border-b border-gold-900/60 focus-within:border-gold-400 transition-colors duration-300">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent px-0 py-3 text-sm sm:text-base text-[#fff2d6] placeholder-[#8e8178] focus:outline-none transition"
                  />
                </div>

                <div className="relative border-b border-gold-900/60 focus-within:border-gold-400 transition-colors duration-300">
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full bg-transparent px-0 py-3 text-sm sm:text-base text-[#fff2d6] focus:outline-none transition appearance-none cursor-pointer pr-8"
                  >
                    <option className="bg-obsidian-950" value="Bride's Family">Bride&apos;s Family</option>
                    <option className="bg-obsidian-950" value="Groom's Family">Groom&apos;s Family</option>
                    <option className="bg-obsidian-950" value="Friend">Friend</option>
                    <option className="bg-obsidian-950" value="Colleague">Colleague</option>
                    <option className="bg-obsidian-950" value="Well-wisher">Well-wisher</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold-500/70">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

            <div className="relative border-b border-gold-900/60 focus-within:border-gold-400 transition-colors duration-300">
              <textarea
                required
                rows={3}
                placeholder="Write your prayers, blessings, and warm congratulations..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent px-0 py-3 text-sm sm:text-base text-[#fff2d6] placeholder-[#8e8178] focus:outline-none transition resize-none"
              />
            </div>

            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-light tracking-[0.2em] uppercase text-gold-100 transition-all duration-300 hover:text-white w-full sm:w-auto"
              >
                <span className="absolute inset-0 border border-gold-600/40 group-hover:border-gold-400/80 transition-colors duration-500 rounded-full" />
                <span className="absolute inset-0 bg-gold-900/10 group-hover:bg-gold-800/20 transition-colors duration-500 rounded-full" />
                <span className="relative flex items-center gap-2">
                  <Send className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>Send Blessings</span>
                </span>
              </button>
            </div>

            {submitted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 rounded-lg bg-gold-400/15 border border-gold-400/40 p-3 text-sm text-gold-200"
              >
                <Heart className="h-4 w-4 fill-gold-400 text-gold-400" />
                <span>Thank you! Your wish was delivered with love.</span>
              </motion.div>
            )}
            </form>
          </div>
        </motion.div>

        {/* Existing Wishes Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-8"
        >
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gold-900/30">
            <h4 className="font-serif text-xl text-gold-200 tracking-wide">
              Heartfelt Wishes <span className="text-gold-400/70 font-sans text-sm">({wishes.length})</span>
            </h4>
          </div>

          <div className="space-y-12">
            {wishes.slice(0, 3).map((w) => (
              <div
                key={w.id}
                onPointerDown={() => handlePointerDown(w.id)}
                onPointerUp={handlePointerUpOrLeave}
                onPointerLeave={handlePointerUpOrLeave}
                onPointerCancel={handlePointerUpOrLeave}
                className="group relative pl-6 sm:pl-10 py-2 border-l border-gold-900/30 transition-colors duration-500 hover:border-gold-500/50 select-none cursor-pointer"
              >
                <div className="absolute top-0 left-[-16px] sm:left-[-24px] text-5xl font-serif text-gold-900/30 group-hover:text-gold-500/30 transition-colors duration-500 leading-none h-4">
                  &ldquo;
                </div>
                
                <p className="text-lg sm:text-xl text-[#e0d6c5] leading-relaxed italic font-serif mb-6">
                  {w.message}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-medium text-sm text-[#fff2d6] tracking-wide">{w.name}</span>
                    <span className="text-[9px] text-gold-400/60 tracking-[0.2em] uppercase font-mono">
                      &mdash; {w.relation}
                    </span>
                  </div>
                  <div className="text-xs text-[#8e8178] font-sans tracking-wide">
                    {w.date}
                  </div>
                </div>
              </div>
            ))}
            
            {wishes.length === 0 && (
              <div className="text-center py-10 text-gold-200/50 text-sm font-serif italic">
                Be the first to leave a heartfelt wish.
              </div>
            )}

            {wishes.length > 3 && (
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => router.push("/wishes")}
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-xs font-light tracking-[0.2em] uppercase text-gold-200 transition-all duration-300 hover:text-white"
                >
                  <span className="absolute inset-0 border border-gold-900/50 group-hover:border-gold-500/50 transition-colors duration-500 rounded-full" />
                  <span className="absolute inset-0 bg-gold-900/10 group-hover:bg-gold-800/20 transition-colors duration-500 rounded-full" />
                  <span className="relative">See all {wishes.length} wishes</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
