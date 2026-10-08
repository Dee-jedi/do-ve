"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#0c0a09] border border-gold-900/30 text-gold-100 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-gold-900/30 px-6 py-5 bg-[#0c0a09]">
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-gold-400" />
            <h3 className="font-serif text-xl tracking-wide text-[#fff2d6]">Love Offerings</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gold-500/70 hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10">
          <div className="text-center space-y-4">
            <Heart className="h-5 w-5 text-gold-400/50 mx-auto" />
            <p className="font-serif text-lg text-[#fff2d6] leading-relaxed max-w-sm mx-auto">
              Your presence is a profound gift. If you wish to bless the couple further, offerings can be made directly below.
            </p>
          </div>

          {/* Account Details Minimalist Block */}
          <div className="relative border-y border-gold-900/30 py-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0c0a09] px-4 text-[10px] uppercase tracking-widest text-gold-400/80 font-mono">
              Wedding Gift Account
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
              
              <div className="text-center space-y-1">
                <div className="text-[11px] uppercase tracking-widest text-gold-500/60 font-sans">Bank</div>
                <div className="font-serif text-xl text-[#fff2d6]">United Bank for Africa (UBA)</div>
              </div>

              <div className="text-center space-y-1">
                <div className="text-[11px] uppercase tracking-widest text-gold-500/60 font-sans">Account Name</div>
                <div className="font-serif text-xl text-[#fff2d6]">Victor Ezennaya</div>
              </div>

              <div className="text-center space-y-3 pt-2">
                <div className="text-[11px] uppercase tracking-widest text-gold-500/60 font-sans">Account Number</div>
                <div className="font-mono text-3xl sm:text-4xl font-bold tracking-widest text-gold-200">
                  2278707892
                </div>
                
                <button
                  onClick={() => copyToClipboard("2278707892", "uba")}
                  className="mx-auto flex items-center justify-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/5 px-6 py-2.5 text-xs uppercase tracking-widest text-gold-300 hover:bg-gold-500/10 hover:text-white transition cursor-pointer"
                >
                  {copiedAccount === "uba" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
