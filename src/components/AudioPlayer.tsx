"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

// Note frequencies (Hz) for Pachelbel's Canon in D Major
const N = {
  D2: 73.42, A2: 110.0, B2: 123.47, Fs2: 92.5, G2: 98.0,
  D3: 146.83, A3: 220.0,
  B3: 246.94,
  D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392.0, A4: 440.0, B4: 493.88,
  Cs5: 554.37, D5: 587.33, E5: 659.25, Fs5: 739.99, G5: 783.99, A5: 880.0,
};

// Canon ground bass: D – A – Bm – F#m – G – D – G – A (8 bars, repeating)
const BASS = [N.D3, N.A2, N.B2, N.Fs2, N.G2, N.D3, N.G2, N.A2];

// Chord tones per measure (arpeggiated harp pads)
const CHORDS = [
  [N.D4, N.Fs4, N.A4],     // D Major
  [N.Cs5, N.E4, N.A4],     // A Major
  [N.D4, N.Fs4, N.B4],     // B minor
  [N.Fs4, N.A4, N.Cs5],    // F# minor
  [N.G4, N.B4, N.D5],      // G Major
  [N.D4, N.Fs4, N.A4],     // D Major
  [N.G4, N.B4, N.D5],      // G Major
  [N.E4, N.A4, N.Cs5],     // A Major
];

// The actual Canon in D melody — 3 variations cycling through:
//
// Variation 1: The famous descending half-note theme (first violin entrance)
//   F#5 E5 | D5 C#5 | B4 A4 | B4 C#5 | D5 C#5 | B4 A4 | G4 F#4 | G4 E4
//
// Variation 2: Quarter-note walking theme (ascending arpeggiated figures)
//   D4 F#4 A4 G4 | F#4 D4 F#4 E4 | D4 B4 D5 A4 | G4 B4 A4 G4 |
//   F#4 D5 C#5 A4 | D4 F#4 A4 D5 | B4 G4 A4 F#4 | G4 E4 D4 E4
//
// Variation 3: Flowing eighth-note run (the cascading ornamental variation)
//   F#5 E5 D5 C#5 | D5 E5 F#5 D5 | B4 C#5 D5 B4 | G4 A4 B4 C#5 |
//   D5 A4 B4 G4 | F#4 A4 D5 F#5 | G5 F#5 E5 D5 | C#5 B4 A4 E5

const MELODY: number[][] = [
  // Variation 1 – The iconic descending theme
  [N.Fs5, N.E5],
  [N.D5, N.Cs5],
  [N.B4, N.A4],
  [N.B4, N.Cs5],
  [N.D5, N.Cs5],
  [N.B4, N.A4],
  [N.G4, N.Fs4],
  [N.G4, N.E4],

  // Variation 2 – Quarter-note walking arpeggio theme
  [N.D4, N.Fs4, N.A4, N.G4],
  [N.Fs4, N.D4, N.Fs4, N.E4],
  [N.D4, N.B4, N.D5, N.A4],
  [N.G4, N.B4, N.A4, N.G4],
  [N.Fs4, N.D5, N.Cs5, N.A4],
  [N.D4, N.Fs4, N.A4, N.D5],
  [N.B4, N.G4, N.A4, N.Fs4],
  [N.G4, N.E4, N.D4, N.E4],

  // Variation 3 – Flowing eighth-note cascading run
  [N.Fs5, N.E5, N.D5, N.Cs5],
  [N.D5, N.E5, N.Fs5, N.D5],
  [N.B4, N.Cs5, N.D5, N.B4],
  [N.G4, N.A4, N.B4, N.Cs5],
  [N.D5, N.A4, N.B4, N.G4],
  [N.Fs4, N.A4, N.D5, N.Fs5],
  [N.G5, N.Fs5, N.E5, N.D5],
  [N.Cs5, N.B4, N.A4, N.E5],
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const barRef = useRef(0);

  const tone = (
    ctx: AudioContext,
    freq: number,
    delay: number,
    dur: number,
    vol: number,
    wave: OscillatorType = "sine"
  ) => {
    if (!playingRef.current) return;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = wave;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  };

  const tick = useCallback(() => {
    if (!playingRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const bar = barRef.current;

    // Ground bass
    tone(ctx, BASS[bar % 8], 0, 3.0, 0.10, "triangle");

    // Arpeggiated chord pad
    CHORDS[bar % 8].forEach((f, i) => tone(ctx, f, 0.3 + i * 0.35, 2.2, 0.04));

    // Melody
    const notes = MELODY[bar % MELODY.length];
    const gap = 2.6 / notes.length;
    notes.forEach((f, i) => tone(ctx, f, i * gap, 2.0, 0.085));

    barRef.current++;
    timerRef.current = setTimeout(tick, 2800);
  }, []);

  const start = () => {
    try {
      const Ctx = window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
      if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
      playingRef.current = true;
      barRef.current = 0;
      setIsPlaying(true);
      tick();
    } catch {
      setIsPlaying(false);
    }
  };

  const stop = () => {
    playingRef.current = false;
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (audioCtxRef.current) audioCtxRef.current.suspend();
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      playingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={() => (isPlaying ? stop() : start())}
      aria-label={isPlaying ? "Mute melody" : "Play melody"}
      className="group relative flex items-center gap-2 rounded-full border border-gold-500/40 bg-[#120e0c]/85 px-3 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:bg-[#1a1310] hover:shadow-[0_0_15px_rgba(223,186,115,0.25)] cursor-pointer"
    >
      <span className="relative flex h-3 w-3 items-center justify-center">
        {isPlaying ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
          </>
        ) : (
          <Music className="h-3 w-3 text-gold-500/70 group-hover:text-gold-400" />
        )}
      </span>

      <span className="text-[11px] font-medium tracking-wider uppercase text-gold-200/90 group-hover:text-white">
        <span className="hidden sm:inline">{isPlaying ? "Music On" : "Play Melody"}</span>
        <span className="sm:hidden">{isPlaying ? "Music" : "Play"}</span>
      </span>

      {isPlaying ? (
        <Volume2 className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
      ) : (
        <VolumeX className="h-3.5 w-3.5 text-gold-200/50" />
      )}
    </button>
  );
}
