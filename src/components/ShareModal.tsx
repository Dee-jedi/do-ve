"use client";

import React, { useState } from "react";
import { X, QrCode, Copy, Check, Share2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm flex flex-col rounded-2xl border border-gold-500/40 bg-[#100d0b] text-gold-100 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-espresso-700 px-5 py-4 bg-linear-to-r from-[#171311] via-[#201713] to-[#171311]">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-gold-400" />
            <h3 className="font-serif text-lg tracking-wide text-gold-200">Share With Guests</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gold-200/60 hover:text-white hover:bg-espresso-700/40 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center space-y-4">
          <p className="text-xs text-[#a8998c]">
            Show this QR code to friends at your table or copy the link to share the love celebration.
          </p>

          {/* Stylized QR placeholder with golden border */}
          <div className="mx-auto w-48 h-48 rounded-xl border-2 border-gold-400/40 bg-white p-3 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(223,186,115,0.2)]">
            <div className="w-full h-full border border-neutral-300 rounded flex flex-col items-center justify-center relative bg-neutral-900 text-gold-400">
              <QrCode className="w-24 h-24 stroke-[1.2] text-gold-400" />
              <span className="text-[10px] font-mono tracking-wider uppercase mt-1 text-gold-200">
                DORCAS & VICTOR
              </span>
            </div>
          </div>

          <button
            onClick={copyUrl}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-gold-500/50 bg-[#1e1713] py-2.5 text-xs font-semibold text-gold-200 hover:border-gold-400 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-gold-400" />
                <span>Copy Website Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
