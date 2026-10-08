"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Music,
  Camera,
  Users,
  ChevronDown,
  ChevronUp,
  Heart,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Solemnization Program items
const SERVICE_ITEMS = [
  { id: 1, title: "Opening Prayer", detail: "Invocation and dedication of the service" },
  { id: 2, title: "Praise and Worship", detail: "Congregational songs of praise and adoration" },
  { id: 3, title: "Arrival of the Groom", detail: "Processional of Victor and the groomsmen" },
  { id: 4, title: "Arrival of the Bride", detail: "Bridal march of Dorcas and the bridal party" },
  {
    id: 5,
    title: "Hymn: Great is Thy Faithfulness",
    isHymn: true,
    detail: "Congregational Hymn — Tap to view verses & refrain",
  },
  { id: 6, title: "Exhortation", detail: "Ministering the Word of God on holy matrimony" },
  { id: 7, title: "Contemporary Choir", detail: "Special choral ministration" },
  { id: 8, title: "Marriage Rites", detail: "Exchange of vows and blessing of wedding rings" },
  { id: 9, title: "Prayers for the Couple", detail: "Pastoral and parental benedictions and blessing" },
  { id: 10, title: "Signing of the Marriage Register", detail: "Special presentation by the Classical Choir" },
  { id: 11, title: "Offering", detail: "Giving in Thanksgiving to God" },
  { id: 12, title: "Presentation of Marriage Certificate", detail: "Official proclamation of the union" },
  { id: 13, title: "Announcement & Closing Prayers", detail: "Benediction and recessional" },
];

// Hymn lyrics for "Great is Thy Faithfulness"
const HYMN_DATA = {
  title: "Great is Thy Faithfulness",
  author: "Thomas O. Chisholm (1923)",
  tune: "FAITHFULNESS (William M. Runyan)",
  stanzas: [
    {
      num: 1,
      lines: [
        "Great is Thy faithfulness, O God my Father,",
        "There is no shadow of turning with Thee;",
        "Thou changest not, Thy compassions, they fail not;",
        "As Thou hast been Thou forever wilt be.",
      ],
    },
    {
      isRefrain: true,
      title: "Refrain",
      lines: [
        "Great is Thy faithfulness!",
        "Great is Thy faithfulness!",
        "Morning by morning new mercies I see;",
        "All I have needed Thy hand hath provided—",
        "Great is Thy faithfulness, Lord, unto me!",
      ],
    },
    {
      num: 2,
      lines: [
        "Summer and winter, and springtime and harvest,",
        "Sun, moon and stars in their courses above,",
        "Join with all nature in manifold witness",
        "To Thy great faithfulness, mercy and love.",
      ],
    },
    {
      num: 3,
      lines: [
        "Pardon for sin and a peace that endureth,",
        "Thine own dear presence to cheer and to guide;",
        "Strength for today and bright hope for tomorrow,",
        "Blessings all mine, with ten thousand beside!",
      ],
    },
  ],
};

// Officiating Ministers
const OFFICIATING_MINISTERS = [
  "Dr. Sylvanus & Pst. (Mrs) Erikan Ukafia",
  "Pst. Mandu & Pst. (Mrs) Emem Davies",
  "Pst. Ime-Obong & Mrs. Lynda Etuk",
  "Dr. Samuel & Barr. (Mrs) Osinachi Udo",
  "Pst. Emeka & Dr. (Mrs) Chinyere Atansi",
  "Pst. Amos & Mrs. Justina Ekanem",
  "Pst. Christopher Benjamin",
];

// Order of Photographs (Clean sequence 1-25)
const PHOTO_SESSIONS = [
  { num: 1, group: "Couple with Officiating Ministers", category: "Ministers" },
  { num: 2, group: "Couple alone", category: "Couple" },
  { num: 3, group: "Bride alone", category: "Couple" },
  { num: 4, group: "Groom alone", category: "Couple" },
  { num: 5, group: "Couple with Parents of the Groom", category: "Family" },
  { num: 6, group: "Couple with Parents of the Bride", category: "Family" },
  { num: 7, group: "Couple with Parents of the Bride and Groom", category: "Family" },
  { num: 8, group: "Couple with Groom's Family", category: "Family" },
  { num: 9, group: "Couple with Bride's Family", category: "Family" },
  { num: 10, group: "Couple with Families of Bride and Groom", category: "Family" },
  { num: 11, group: "Couple with Internal Control Officers, UBA", category: "Colleagues" },
  { num: 12, group: "Couple with Staff of United Bank for Africa (UBA)", category: "Colleagues" },
  { num: 13, group: "Couple with Staff of Saint John Paul II College", category: "Colleagues" },
  { num: 14, group: "Couple with Staff of Beulah International Schools", category: "Colleagues" },
  { num: 15, group: "Couple with Insight Bible Church", category: "Church" },
  { num: 16, group: "Couple with Contemporary Choir", category: "Church" },
  { num: 17, group: "Couple with Classical Choir", category: "Church" },
  { num: 18, group: "Couple with IYX", category: "Church" },
  { num: 19, group: "Couple with Men of Honour", category: "Church" },
  { num: 20, group: "Couple with Women of Grace", category: "Church" },
  { num: 21, group: "Couple with Deeper Life Family", category: "Church" },
  { num: 22, group: "Couple with Faculty of Education / Department of English, UniUyo", category: "Education" },
  { num: 23, group: "Couple with ALSCON Family", category: "Community" },
  { num: 24, group: "Couple with Bride's Neighbours", category: "Community" },
  { num: 25, group: "Couple with Friends", category: "Friends" },
];

type TabType = "service" | "ministers" | "photographs";

const TAB_TITLES: Record<TabType, string> = {
  service: "Order of Service",
  ministers: "Officiating Ministers",
  photographs: "Order of Photographs",
};

export default function OrderOfServicePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("service");
  const [hymnExpanded, setHymnExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-obsidian-950 text-gold-100 flex flex-col relative selection:bg-gold-500/30 selection:text-white">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(223,186,115,0.12)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0a09]/90 backdrop-blur-md border-b border-gold-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 hover:text-white transition py-1 px-3 rounded-full border border-gold-500/30 bg-[#16110e]/70 hover:bg-gold-500/20 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gold-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Home</span>
        </button>

        <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-gold-gradient">
          DO.VE
        </span>

        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gold-400/80 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
          Program
        </span>
      </header>

      {/* Dynamic Editorial Hero */}
      <section className="px-6 pt-10 pb-6 text-center max-w-3xl mx-auto space-y-2">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold-400 font-sans block">
          Solemnization of Holy Matrimony
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fff2d6] font-normal leading-tight">
              {TAB_TITLES[activeTab]}
            </h1>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Interactive Tab Switcher */}
      <div className="sticky top-[61px] z-30 bg-obsidian-950/95 backdrop-blur-md border-y border-gold-900/40 py-3 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-1.5 sm:gap-3 p-1 rounded-full bg-[#140f0c] border border-gold-500/20 shadow-inner">
          <button
            onClick={() => setActiveTab("service")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer ${
              activeTab === "service"
                ? "bg-linear-to-r from-gold-600/30 to-gold-500/30 text-[#fff2d6] border border-gold-400/60 shadow-[0_0_15px_rgba(223,186,115,0.25)] font-medium"
                : "text-gold-200/60 hover:text-gold-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400" />
            <span>Service</span>
          </button>

          <button
            onClick={() => setActiveTab("ministers")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer ${
              activeTab === "ministers"
                ? "bg-linear-to-r from-gold-600/30 to-gold-500/30 text-[#fff2d6] border border-gold-400/60 shadow-[0_0_15px_rgba(223,186,115,0.25)] font-medium"
                : "text-gold-200/60 hover:text-gold-200"
            }`}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400" />
            <span>Ministers</span>
          </button>

          <button
            onClick={() => setActiveTab("photographs")}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 cursor-pointer ${
              activeTab === "photographs"
                ? "bg-linear-to-r from-gold-600/30 to-gold-500/30 text-[#fff2d6] border border-gold-400/60 shadow-[0_0_15px_rgba(223,186,115,0.25)] font-medium"
                : "text-gold-200/60 hover:text-gold-200"
            }`}
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400" />
            <span>Photographs</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {/* TAB 1: ORDER OF SERVICE */}
          {activeTab === "service" && (
            <motion.div
              key="service"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-gold-100">
                  Program of Events
                </h2>
              </div>

              <div className="divide-y divide-gold-900/30 rounded-2xl border border-gold-500/30 bg-[#120e0b]/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden">
                {SERVICE_ITEMS.map((item) => (
                  <div key={item.id} className="transition-colors hover:bg-gold-500/5">
                    {item.isHymn ? (
                      /* Hymn Item with Interactive Dropdown */
                      <div>
                        <button
                          onClick={() => setHymnExpanded(!hymnExpanded)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 group cursor-pointer focus:outline-none"
                          aria-expanded={hymnExpanded}
                        >
                          <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                            <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold-400 bg-gold-400/20 text-gold-200 text-xs sm:text-sm font-mono shrink-0 shadow-[0_0_10px_rgba(223,186,115,0.3)]">
                              {item.id}
                            </span>
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif text-base sm:text-lg text-gold-200 group-hover:text-gold-100 font-medium transition-colors">
                                {item.title}
                              </h3>
                              <Music className="w-4 h-4 text-gold-400 animate-pulse" />
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-gold-400 bg-gold-500/10 border border-gold-500/30 px-3 py-1.5 rounded-full shrink-0 group-hover:border-gold-400 transition-colors">
                            <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-wider">
                              {hymnExpanded ? "Close Hymn" : "View Hymn"}
                            </span>
                            {hymnExpanded ? (
                              <ChevronUp className="w-4 h-4 text-gold-300" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gold-300" />
                            )}
                          </div>
                        </button>

                        {/* Collapsible Hymn Lyrics Drawer */}
                        <AnimatePresence>
                          {hymnExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden border-t border-gold-500/20 bg-linear-to-b from-[#18120e] to-[#0f0b09]"
                            >
                              <div className="p-5 sm:p-8 space-y-6">
                                <div className="text-center pb-4 border-b border-gold-900/40">
                                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400/80 block">
                                    Wedding Hymn
                                  </span>
                                  <h4 className="font-serif text-xl sm:text-2xl text-[#fff2d6] mt-1">
                                    {HYMN_DATA.title}
                                  </h4>
                                  <p className="text-xs text-gold-200/60 font-sans mt-1">
                                    {HYMN_DATA.author} &bull; Tune: {HYMN_DATA.tune}
                                  </p>
                                </div>

                                <div className="space-y-6 max-w-xl mx-auto font-serif">
                                  {HYMN_DATA.stanzas.map((stanza, sIdx) => (
                                    <div
                                      key={sIdx}
                                      className={`p-4 rounded-xl ${
                                        stanza.isRefrain
                                          ? "bg-gold-500/10 border border-gold-400/30 text-center"
                                          : "text-center sm:text-left"
                                      }`}
                                    >
                                      {stanza.isRefrain ? (
                                        <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-sans block mb-2 font-semibold">
                                          [ Refrain ]
                                        </span>
                                      ) : (
                                        <span className="text-[11px] uppercase tracking-wider text-gold-400/80 font-sans block mb-2 font-medium">
                                          Verse {stanza.num}
                                        </span>
                                      )}
                                      <div className="space-y-1 text-sm sm:text-base text-gold-100/90 leading-relaxed font-light">
                                        {stanza.lines.map((line, lIdx) => (
                                          <p key={lIdx}>{line}</p>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Standard Service Item */
                      <div className="p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4">
                        <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 text-xs sm:text-sm font-mono shrink-0">
                          {item.id}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg text-[#fff2d6] font-medium">
                          {item.title}
                        </h3>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: OFFICIATING MINISTERS */}
          {activeTab === "ministers" && (
            <motion.div
              key="ministers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-gold-100">
                  Presiding Ministers
                </h2>
              </div>

              <div className="divide-y divide-gold-900/30 rounded-2xl border border-gold-500/30 bg-[#120e0b]/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden">
                {OFFICIATING_MINISTERS.map((minister, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 hover:bg-gold-500/5 transition-colors flex items-center gap-3.5 sm:gap-4"
                  >
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold-500/40 bg-gold-500/10 flex items-center justify-center text-xs sm:text-sm font-mono text-gold-300 shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-sm sm:text-base text-[#fff2d6] font-medium leading-snug">
                        {minister}
                      </h3>
                    </div>
                  </div>
                ))}

                {/* Other Anointed Ministers Row */}
                <div className="p-4 sm:p-5 hover:bg-gold-500/5 transition-colors flex items-center gap-3.5 sm:gap-4 bg-linear-to-r from-gold-950/10 to-transparent">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold-400/40 bg-gold-400/20 flex items-center justify-center text-gold-300 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-300" />
                  </span>
                  <div>
                    <h3 className="font-serif text-sm sm:text-base text-gold-200 font-medium">
                      Other Anointed Ministers of God
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ORDER OF PHOTOGRAPHS */}
          {activeTab === "photographs" && (
            <motion.div
              key="photographs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl sm:text-3xl text-gold-100">
                  Post-Session Photographs
                </h2>
              </div>

              <div className="divide-y divide-gold-900/30 rounded-2xl border border-gold-500/30 bg-[#120e0b]/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden">
                {PHOTO_SESSIONS.map((photo) => (
                  <div
                    key={photo.num}
                    className="p-4 sm:p-5 hover:bg-gold-500/5 transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold-500/40 bg-gold-500/10 flex items-center justify-center text-xs sm:text-sm font-mono text-gold-300 shrink-0">
                        {photo.num}
                      </span>
                      <p className="font-serif text-sm sm:text-base text-[#fff2d6] font-medium leading-snug">
                        {photo.group}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-gold-900/30 text-gold-400/60 font-sans text-xs space-y-2">
          <p className="tracking-widest uppercase text-[10px]">
            Dorcas &amp; Victor &bull; Holy Matrimony
          </p>
          <p className="text-gold-200/40">
            Thank you for celebrating this sacred day with us.
          </p>
        </div>
      </div>
    </main>
  );
}
