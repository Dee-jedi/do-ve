"use client";

import React from "react";
import Image from "next/image";
import { X, FileText, Download } from "lucide-react";

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvitationModal({ isOpen, onClose }: InvitationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md max-h-[95vh] flex flex-col rounded-2xl border border-gold-500/40 bg-[#100d0b] text-gold-100 shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-espresso-700 px-5 py-3.5 bg-linear-to-r from-[#171311] via-[#201713] to-[#171311]">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gold-400" />
            <h3 className="font-serif text-base tracking-wide text-gold-200">Official Wedding Invitation</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gold-200/60 hover:text-white hover:bg-espresso-700/40 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Invitation Image Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col items-center">
          <div className="relative aspect-4/5 w-full rounded-lg overflow-hidden border border-gold-500/30 shadow-2xl">
            <Image
              src="/images/dove-invitation.jpg"
              alt="DO.VE 2026 Official Wedding Invitation"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 450px"
              priority
            />
          </div>

          <a
            href="/images/dove-invitation.jpg"
            download="DOVE-2026-Invitation.jpg"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gold-500/40 bg-[#1e1713] px-4 py-2 text-xs font-semibold text-gold-200 hover:border-gold-400 hover:text-white transition"
          >
            <Download className="h-3.5 w-3.5 text-gold-400" />
            <span>Save Invitation Card</span>
          </a>
        </div>
      </div>
    </div>
  );
}
