"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

// Hardcoded story chapters
const storyChapters = [
  {
    id: "set_1",
    chapter: "CHAPTER I",
    title: "A Match Made in Core Subjects",
    paragraphs: [
      "Victor and Dorcas met in August of 2022 at Beulah International Schools where he taught Mathematics and she had just been employed fresh-off NYSC to be the English teacher.",
      "What started as an attempt to recruit an instrumentalist for the church blossomed into years of friendship, partnership, and a love story we are thrilled to celebrate with you."
    ]
  },
  {
    id: "set_2",
    chapter: "CHAPTER II",
    title: "A Cash-Crunch Love",
    paragraphs: [
      "Sometime in February 2023, during the nationwide cash scarcity, Victor and Dorcas found themselves stranded after work due to the unavailability of cash to pay for transportation.",
      "They had to walk a long distance under the scorching sun, finding solace in each other's company and the shared experience of surviving the economic hardship."
    ]
  },
  {
    id: "set_3",
    chapter: "CHAPTER III",
    title: "The Gentle Chokehold",
    paragraphs: [
      "It was at this point that he realised that this Akwa Ibom woman had him in a chokehold. He had to make a move.",
      "He asked her out on a date, and she said yes. They went to a local restaurant and had a good time. He asked her to be his girlfriend, and she said yes."
    ]
  },
  {
    id: "set_4",
    chapter: "CHAPTER IV",
    title: "From Friendship to Forever",
    paragraphs: [
      "It's been years of friendship and partnership, and we are excited to take this next step in our journey together.",
      "That's where all great relationships start."
    ]
  }
];

export default function StoryPage() {
  const router = useRouter();
  // Map of document ID to array of images
  const [imagesMap, setImagesMap] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const querySnapshot = await getDocs(collection(db, "love_story"));
        const imgData: Record<string, string[]> = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.images) {
            imgData[doc.id] = data.images;
          }
        });
        setImagesMap(imgData);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  return (
    <main className="bg-obsidian-950 text-gold-100 min-h-screen relative">
      <Navbar />

      {/* Intro Header */}
      <header className="relative min-h-dvh flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/story-hero.jpg"
            alt="Dorcas and Victor"
            fill
            className="object-cover object-[center_15%] opacity-50 contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-obsidian-950/20 via-obsidian-950/80 to-obsidian-950" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-3xl mx-auto relative z-10"
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-400/80 font-sans block mb-6 drop-shadow-md">
            An Unfolding Tale
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#fff2d6] font-medium leading-tight drop-shadow-lg mt-8">
            Our Love Story
          </h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="w-32 h-px bg-linear-to-r from-transparent via-gold-400 to-transparent mx-auto mt-12 shadow-[0_0_8px_rgba(223,186,115,0.4)]"
          />
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-400/60 z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-linear-to-b from-gold-400/60 to-transparent"
          />
        </motion.div>
      </header>

      {/* Chapters */}
      <div className="relative pb-32">
        {/* Background Decorative glow */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.15)_0%,transparent_60%)] blur-3xl" />
        </div>

        {storyChapters.map((chapterData, index) => {
          let chapterImages = [];
          
          if (chapterData.id === "set_3") {
            // Chapter 3 uses images from both 3rd set and 4th set
            chapterImages = [...(imagesMap["set_3"] || []), ...(imagesMap["set_4"] || [])];
          } else if (chapterData.id === "set_4") {
            // Chapter 4 uses images from the 5th set
            chapterImages = imagesMap["set_5"] || [];
          } else {
            // Standard mapping
            chapterImages = imagesMap[chapterData.id] || [];
          }

          const isEven = index % 2 === 0;

          return (
            <section
              key={chapterData.id}
              className="relative min-h-[90vh] flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto"
            >
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-16 lg:gap-24`}>
                
                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-12 z-10 lg:sticky lg:top-40 lg:self-start">
                  {/* Chapter Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-medium font-sans">
                      {chapterData.chapter}
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl text-[#fff2d6] font-medium leading-tight">
                      {chapterData.title}
                    </h2>
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                      className="w-24 h-px bg-linear-to-r from-gold-400 to-transparent mt-6 shadow-[0_0_8px_rgba(223,186,115,0.4)]"
                    />
                  </motion.div>

                  {/* Paragraphs */}
                  <div className="space-y-6">
                    {chapterData.paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                        className="font-sans font-light text-gold-100/70 leading-relaxed text-base sm:text-lg"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Cinematic Image Gallery for this Chapter */}
                <div className="w-full lg:w-1/2 relative">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : chapterImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10">
                      {chapterImages.map((src, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          initial={{ opacity: 0, scale: 0.9, y: 40 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.8, delay: (imgIndex % 4) * 0.15, ease: "easeOut" }}
                          className={`relative w-full overflow-hidden rounded-4xl sm:rounded-[2.5rem] shadow-[0_0_30px_rgba(223,186,115,0.1)] border border-gold-900/20 group 
                            ${imgIndex % 2 === 0 ? 'aspect-4/5 mt-0' : 'aspect-3/4 mt-8 sm:mt-12'}`}
                        >
                          <Image
                            src={src}
                            alt={`Chapter ${index + 1} Memory ${imgIndex + 1}`}
                            fill
                            className="object-cover brightness-[0.85] contrast-[1.1] transition-all duration-[20s] ease-linear group-hover:scale-125"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-obsidian-950/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                        </motion.div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
