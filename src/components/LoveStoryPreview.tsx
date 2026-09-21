"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const fadeUp = {
  initial: { opacity: 0, y: 30, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
};

export default function LoveStoryPreview() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchFirstSet() {
      try {
        const docRef = doc(db, "love_story", "set_1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.images && data.images.length > 0) {
            setImages(data.images);
          }
        }
      } catch (error) {
        console.error("Error fetching preview images:", error);
      }
    }
    fetchFirstSet();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000); // 6 seconds per image for a slow cinematic feel

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="relative w-full py-24 sm:py-32 bg-obsidian-900 border-t border-gold-900/30 overflow-hidden text-gold-100">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10 space-y-12">

        {/* Section Heading matching ReceptionDetails */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-2"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-medium font-sans">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#fff2d6] font-medium">
            How It All Began
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="w-24 h-px bg-linear-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4 shadow-[0_0_8px_rgba(223,186,115,0.4)]"
          />
        </motion.div>

        {/* Story Teaser */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-2xl mx-auto space-y-6"
        >
          <p className="font-sans font-light text-gold-100/70 leading-relaxed text-sm sm:text-base md:text-lg">
            Victor and Dorcas met in August of 2022 at Beulah International Schools where he taught Mathematics and she had just been employed fresh-off NYSC to be the English teacher.
          </p>
          <p className="font-sans font-light text-gold-100/70 leading-relaxed text-sm sm:text-base md:text-lg">
            What started as an attempt to recruit an instrumentalist for the church blossomed into years of friendship, partnership, and a love story we are thrilled to celebrate with you.
          </p>
        </motion.div>

        {/* Cinematic Animated Image Loop */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl aspect-[4/3] sm:aspect-video mt-12 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-[0_0_40px_rgba(223,186,115,0.15)] border border-gold-900/30"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: currentIndex % 2 === 0 ? 1.15 : 1 }}
                animate={{
                  opacity: 1,
                  scale: currentIndex % 2 === 0 ? 1 : 1.15,
                  transition: {
                    opacity: { duration: 2, ease: "easeInOut" },
                    scale: { duration: 7, ease: "linear" }
                  }
                }}
                exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
                className="absolute inset-0 origin-center"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Memory ${currentIndex + 1}`}
                  fill
                  className="object-cover object-[center_20%] brightness-[0.85] contrast-[1.15]"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,6,6,0.6)_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-t from-obsidian-950/70 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* Read More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="pt-8 pb-4"
        >
          <button
            onClick={() => router.push("/story")}
            className="group relative inline-flex items-center justify-center px-10 py-4 sm:px-12 sm:py-5 text-sm sm:text-base font-light tracking-[0.2em] uppercase text-gold-100 transition-all duration-300 hover:text-white"
          >
            <span className="absolute inset-0 border border-gold-600/40 group-hover:border-gold-400/80 transition-colors duration-500 rounded-full" />
            <span className="absolute inset-0 bg-gold-900/10 group-hover:bg-gold-800/20 transition-colors duration-500 rounded-full" />
            <span className="relative">Read Our Full Story</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.4)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.2)_0%,transparent_70%)] blur-3xl" />
      </div>
    </section>
  );
}
