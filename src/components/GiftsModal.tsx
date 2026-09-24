"use client";

import React, { useState } from "react";
import { X, Gift, Copy, Check, Heart, ShieldCheck } from "lucide-react";

interface GiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftsModal({ isOpen, onClose }: GiftsModalProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl glass-panel text-gold-100 overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-gold-500/20 px-6 py-4 bg-black/20">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl tracking-wide text-gold-200">Love Offerings & Gifts</h3>
              <p className="text-[11px] uppercase tracking-widest text-gold-400/80 font-sans">
                Blessing The Couple
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center space-y-2">
            <Heart className="h-6 w-6 text-gold-400 fill-gold-400/30 mx-auto" />
            <p className="font-serif text-base text-[#fff2d6]">
              We are beyond overjoyed to have you celebrate with us and your presence is a gift we deeply appreciate.
            </p>
            <p className="text-xs text-[#a8998c] leading-relaxed max-w-xs mx-auto">
              If you would like to honour us with a cash gift, please send to the account number below:
            </p>
          </div>

          {/* Account 1 */}
          <div className="glass-panel glass-card-hover rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-gold-400 font-medium">
                Wedding Gift Account
              </span>
              <span className="text-[10px] text-gold-200/50 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                Verified
              </span>
            </div>

            <div className="space-y-1 text-left">
              <div className="text-xs text-gold-200/70">Bank Name</div>
              <div className="font-semibold text-sm text-white">United Bank for Africa (UBA)</div>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg bg-black/40 p-3 border border-gold-500/20">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gold-400/80">Account Number</div>
                <div className="font-mono text-base font-bold text-[#fff2d6] tracking-wider">
                  2278707892
                </div>
              </div>
              <button
                onClick={() => copyToClipboard("2278707892", "uba")}
                className="flex items-center gap-1.5 rounded-md border border-gold-500/40 bg-obsidian-800 px-3 py-1.5 text-xs text-gold-400 hover:bg-gold-500/20 transition"
              >
                {copiedAccount === "uba" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-2 text-left text-xs text-[#a8998c]">
              Account Name: <span className="text-gold-200">Victor Ezennaya</span>
            </div>
          </div>

          {/* Note */}
          <div className="rounded-lg bg-black/30 p-3 border border-gold-500/20 text-center">
            <p className="text-[11px] text-[#8e8178]">
              Details can be updated with the couple&apos;s direct bank credentials at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
