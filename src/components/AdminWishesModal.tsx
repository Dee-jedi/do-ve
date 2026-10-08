"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  RefreshCw,
  Lock,
  Sparkles,
  AlertCircle,
  Heart,
  KeyRound,
  LogOut,
  Calendar,
} from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface PendingWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
  rawCreatedAt?: any;
}

interface AdminWishesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminWishesModal({ isOpen, onClose }: AdminWishesModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [pendingWishes, setPendingWishes] = useState<PendingWish[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check stored authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("dove_admin_authenticated");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // On-demand fetch (no listener cost bleed)
  const fetchPendingWishes = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "pendingWishes"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const fetched: PendingWish[] = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        let dateString = "Recently";
        if (data.createdAt) {
          try {
            dateString = new Date(data.createdAt.toDate()).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
          } catch {
            dateString = "Recently";
          }
        }
        fetched.push({
          id: docSnap.id,
          name: data.name || "Anonymous",
          relation: data.relation || "Well-wisher",
          message: data.message || "",
          date: dateString,
          rawCreatedAt: data.createdAt || null,
        });
      });

      setPendingWishes(fetched);
    } catch (err) {
      console.error("Error fetching pending wishes:", err);
      showToast("Unable to load wishes. Check permissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchPendingWishes();
    }
  }, [isOpen, isAuthenticated, fetchPendingWishes]);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("dove_admin_authenticated", "true");
      setPasscode("");
      setPasscodeError("");
      fetchPendingWishes();
    } else {
      setPasscodeError("Incorrect passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("dove_admin_authenticated");
    setPasscode("");
    setPendingWishes([]);
  };

  const handleApprove = async (wish: PendingWish) => {
    setProcessingId(wish.id);
    try {
      await addDoc(collection(db, "wishes"), {
        name: wish.name,
        relation: wish.relation,
        message: wish.message,
        createdAt: wish.rawCreatedAt || serverTimestamp(),
      });

      await deleteDoc(doc(db, "pendingWishes", wish.id));
      setPendingWishes((prev) => prev.filter((w) => w.id !== wish.id));
      showToast(`Blessing from ${wish.name} is now live!`);
    } catch (error) {
      console.error("Error approving wish:", error);
      showToast("Failed to approve. Please retry.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (wish: PendingWish) => {
    if (!window.confirm(`Reject and delete the blessing from "${wish.name}"?`)) {
      return;
    }

    setProcessingId(wish.id);
    try {
      await deleteDoc(doc(db, "pendingWishes", wish.id));
      setPendingWishes((prev) => prev.filter((w) => w.id !== wish.id));
      showToast(`Blessing from ${wish.name} was removed.`);
    } catch (error) {
      console.error("Error rejecting wish:", error);
      showToast("Failed to reject. Please retry.");
    } finally {
      setProcessingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Soft Ambient Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-[#0b0907] border border-gold-500/25 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[88vh] z-10"
        >
          {/* Subtle Top Ambient Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-linear-to-r from-transparent via-gold-400/60 to-transparent pointer-events-none" />

          {/* Clean Editorial Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gold-900/30 bg-[#100c09]/90 backdrop-blur-sm">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400/80 block">
                Concierge Moderation
              </span>
              <div className="flex items-center gap-2.5 mt-0.5">
                <h3 className="font-serif text-xl sm:text-2xl text-[#fff2d6] font-normal">
                  Pending Wishes
                </h3>
                {isAuthenticated && (
                  <span className="text-xs font-mono text-gold-300 px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                    {pendingWishes.length}
                  </span>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <>
                  <button
                    onClick={fetchPendingWishes}
                    disabled={loading}
                    title="Refresh feed"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/25 bg-gold-500/5 hover:bg-gold-500/15 text-gold-300 hover:text-white transition text-xs font-sans cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-gold-400" : ""}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    title="Log out"
                    className="p-1.5 rounded-full border border-gold-900/30 hover:border-red-500/40 text-gold-400/50 hover:text-red-400 transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full border border-gold-500/20 text-gold-400/70 hover:text-white hover:bg-gold-500/10 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gold-500/15 border-b border-gold-500/30 px-6 py-2 text-xs text-gold-200 flex items-center justify-center gap-2 text-center"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5">
            {!isAuthenticated ? (
              /* Luxury Passcode Screen */
              <div className="py-10 max-w-sm mx-auto text-center space-y-6">
                <div className="relative mx-auto w-16 h-16 rounded-full border border-gold-400/40 bg-linear-to-b from-gold-500/15 to-transparent flex items-center justify-center text-gold-300 shadow-[0_0_25px_rgba(223,186,115,0.15)]">
                  <span className="font-serif text-sm font-bold text-gold-gradient">D&amp;V</span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-serif text-2xl text-[#fff2d6]">Curator Access</h4>
                  <p className="text-xs text-[#a8998c] font-sans leading-relaxed">
                    Enter the passcode to review and publish blessings from guests.
                  </p>
                </div>

                <form onSubmit={handlePasscodeSubmit} className="space-y-4 pt-2">
                  <div>
                    <input
                      type="password"
                      autoFocus
                      placeholder="Passcode"
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        setPasscodeError("");
                      }}
                      className="w-full bg-[#130f0c] border border-gold-500/30 focus:border-gold-400 rounded-full px-5 py-3 text-sm text-[#fff2d6] text-center tracking-widest placeholder-gold-400/30 focus:outline-none transition shadow-inner"
                    />
                  </div>

                  {passcodeError && (
                    <p className="text-xs text-red-400 font-sans flex items-center justify-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{passcodeError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-linear-to-r from-gold-600/40 via-gold-500/30 to-gold-600/40 hover:from-gold-500/60 hover:to-gold-400/60 border border-gold-400/60 text-[#fff2d6] font-sans text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(223,186,115,0.2)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-gold-300" />
                    <span>Open Screening</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Wishes Queue */
              <div className="space-y-4">
                {loading && pendingWishes.length === 0 ? (
                  <div className="py-16 text-center text-xs text-gold-400/60 font-sans space-y-3">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-gold-400/80" />
                    <p>Fetching pending submissions...</p>
                  </div>
                ) : pendingWishes.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full border border-gold-500/20 bg-gold-500/5 mx-auto flex items-center justify-center text-gold-400/60">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-[#fff2d6]">All Caught Up</h4>
                      <p className="text-xs text-[#8e8178] font-sans max-w-xs mx-auto leading-relaxed">
                        No pending wishes waiting for review. You can tap Refresh above to check for new entries.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingWishes.map((wish) => {
                      const isProcessing = processingId === wish.id;
                      return (
                        <div
                          key={wish.id}
                          className="relative bg-linear-to-b from-[#140f0c] to-[#0d0a08] border border-gold-500/20 hover:border-gold-400/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-4"
                        >
                          {/* Sender Details */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-sans font-medium text-sm sm:text-base text-[#fff2d6] tracking-wide">
                                {wish.name}
                              </span>
                              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-gold-400/80 px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                                {wish.relation}
                              </span>
                            </div>
                            <span className="text-[11px] font-sans text-[#8e8178] shrink-0">
                              {wish.date}
                            </span>
                          </div>

                          {/* The Message */}
                          <p className="font-serif italic text-base sm:text-lg text-[#e0d6c5] leading-relaxed whitespace-pre-wrap pl-3.5 border-l-2 border-gold-500/40">
                            &ldquo;{wish.message}&rdquo;
                          </p>

                          {/* Refined Action Controls */}
                          <div className="flex items-center justify-end gap-3 pt-1 border-t border-gold-900/20">
                            <button
                              onClick={() => handleReject(wish)}
                              disabled={isProcessing}
                              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-500/25 bg-red-950/20 hover:bg-red-900/30 hover:border-red-500/40 text-red-300 text-xs font-sans tracking-wide transition cursor-pointer disabled:opacity-50"
                            >
                              <X className="w-3 h-3 text-red-400" />
                              <span>Reject</span>
                            </button>

                            <button
                              onClick={() => handleApprove(wish)}
                              disabled={isProcessing}
                              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold-400/50 bg-linear-to-r from-gold-600/30 to-gold-500/30 hover:from-gold-500/50 hover:to-gold-400/50 text-[#fff2d6] text-xs font-sans tracking-wider uppercase font-medium transition cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(223,186,115,0.15)]"
                            >
                              <Check className="w-3 h-3 text-gold-300" />
                              <span>Approve</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
