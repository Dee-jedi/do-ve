"use client";

import React, { useState, useEffect } from "react";
import { X, Heart, Sparkles, Send, MessageCircleHeart } from "lucide-react";
import confetti from "canvas-confetti";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: "1",
    name: "Aunty Grace & Family",
    relation: "Bride's Family",
    message: "Dorcas, watching you grow into such a graceful woman has been our joy. May your union with Victor be richly blessed with peace, fruitfulness, and unending joy!",
    date: "Just now",
  },
  {
    id: "2",
    name: "Emeka & Tola",
    relation: "Best Friends",
    message: "Victor, you found your jewel! Seeing how you two look at each other gives all of us so much warmth. Cheers to forever!",
    date: "1 hour ago",
  },
  {
    id: "3",
    name: "Pastor & Mrs. Adebayo",
    relation: "Family Friends",
    message: "May the cord of three strands never be broken. Keep Christ at the center of your marriage, Dorcas & Victor. Congratulations!",
    date: "Today",
  },
];

interface WishesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishesModal({ isOpen, onClose }: WishesModalProps) {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Friend");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
      if (fetchedWishes.length > 0) {
        setWishes(fetchedWishes);
      }
    });

    return () => unsubscribe();
  }, []);

  const triggerCelebration = () => {
    // Elegant gold and rose confetti
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl glass-panel text-gold-100 overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-gold-500/20 px-6 py-4 bg-black/20">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
              <MessageCircleHeart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl tracking-wide text-gold-200">Leave a Loving Wish</h3>
              <p className="text-[11px] uppercase tracking-widest text-gold-400/80 font-sans">
                For Dorcas & Victor
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl glass-panel p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-200/70 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Olawale"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gold-900/40 bg-obsidian-950 px-3 py-2 text-sm text-white placeholder-stone-600 focus:border-gold-400 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-200/70 mb-1">
                  Relationship
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full rounded-lg border border-gold-900/40 bg-obsidian-950 px-3 py-2 text-sm text-white focus:border-gold-400 focus:outline-none transition"
                >
                  <option value="Bride's Family">Bride&apos;s Family</option>
                  <option value="Groom's Family">Groom&apos;s Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Well-wisher">Well-wisher</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gold-200/70 mb-1">
                Your Heartfelt Message
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write your prayers, blessings, and warm congratulations..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-gold-900/40 bg-obsidian-950 px-3 py-2 text-sm text-white placeholder-stone-600 focus:border-gold-400 focus:outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#b88636] via-gold-400 to-gold-500 py-2.5 text-sm font-semibold text-[#100d0b] shadow-md hover:brightness-110 active:scale-[0.99] transition cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Send Blessings</span>
              <Sparkles className="h-4 w-4" />
            </button>

            {submitted && (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-gold-400/15 border border-gold-400/40 p-2 text-xs text-gold-200 animate-fade-in">
                <Heart className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                <span>Thank you! Your wish was delivered with love.</span>
              </div>
            )}
          </form>

          {/* Existing Wishes Feed */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif text-lg text-gold-200 tracking-wide">
                Heartfelt Wishes ({wishes.length})
              </h4>
              <span className="text-[11px] text-gold-400/80 uppercase tracking-widest">
                Live Guestbook
              </span>
            </div>

            <div className="space-y-3">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="glass-panel glass-card-hover rounded-xl p-3.5"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm text-[#fff2d6]">{w.name}</span>
                    <span className="text-[10px] rounded-full border border-gold-500/30 bg-gold-500/10 px-2 py-0.5 text-gold-400">
                      {w.relation}
                    </span>
                  </div>
                  <p className="text-xs text-[#e0d6c5] leading-relaxed italic">
                    &ldquo;{w.message}&rdquo;
                  </p>
                  <div className="mt-2 flex items-center justify-end text-[10px] text-[#8e8178]">
                    {w.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
