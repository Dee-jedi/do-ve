"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminWishesModal from "@/components/AdminWishesModal";

export default function AdminPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="min-h-screen bg-obsidian-950 text-gold-100 flex items-center justify-center p-4">
      <AdminWishesModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          router.push("/");
        }}
      />
    </main>
  );
}
