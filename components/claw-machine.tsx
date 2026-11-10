"use client";

import { useState, useRef, useCallback } from "react";
import { Sparkles, ArrowLeft, ArrowRight, Disc3, Heart, RotateCcw, X, Trophy } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPopSound, playSparkleSound, playChimeWin } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

type Plushie = {
  id: string;
  name: string;
  sticker: string;
  message: string;
  color: string;
  accent: string;
};

const PLUSHIES: Plushie[] = [
  {
    id: "lily",
    name: "Lily Plushie",
    sticker: "🌷",
    message: "You deserve all the soft and beautiful things in this world.",
    color: "#FCE8E8",
    accent: "#D58C9C",
  },
  {
    id: "bunny",
    name: "Bunny Plushie",
    sticker: "🐰",
    message: "I wish I could give you the warmest, tightest hug right now.",
    color: "#FFF0F2",
    accent: "#A94F65",
  },
  {
    id: "star",
    name: "Star Plushie",
    sticker: "⭐",
    message: "You make ordinary days feel special just by being in them.",
    color: "#FFF9E6",
    accent: "#E5A93C",
  },
  {
    id: "ribbon",
    name: "Ribbon Plushie",
    sticker: "🎀",
    message: "A little sweet gift for my favorite, most special girl.",
    color: "#F4D1D5",
    accent: "#702C43",
  },
  {
    id: "heart",
    name: "Heart Plushie",
    sticker: "💖",
    message: "No matter where we go, my heart will always choose you.",
    color: "#FCE8E8",
    accent: "#A94F65",
  },
];

export default function LittleClawMachine() {
  const [clawX, setClawX] = useState(50); // percentage 15% - 85%
  const [clawY, setClawY] = useState(0); // 0 (top) to 75 (bottom)
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [clawsClosed, setClawsClosed] = useState(false);
  const [caughtPlushie, setCaughtPlushie] = useState<Plushie | null>(null);
  const [revealedPrize, setRevealedPrize] = useState<Plushie | null>(null);
  const [grabbedHistory, setGrabbedHistory] = useState<string[]>([]);

  // Move left
  const moveLeft = useCallback(() => {
    if (isGrabbing) return;
    playPopSound();
    setClawX((prev) => Math.max(18, prev - 12));
  }, [isGrabbing]);

  // Move right
  const moveRight = useCallback(() => {
    if (isGrabbing) return;
    playPopSound();
    setClawX((prev) => Math.min(82, prev + 12));
  }, [isGrabbing]);

  // Grab action
  const handleGrab = useCallback(() => {
    if (isGrabbing) return;
    setIsGrabbing(true);
    playPopSound();

    // 1. Lower claw
    setTimeout(() => {
      setClawY(70);
    }, 150);

    // 2. Close claws at bottom and determine prize
    setTimeout(() => {
      setClawsClosed(true);

      // Select plushie closest to claw position (with 90% success rate)
      const targetIndex = Math.min(
        PLUSHIES.length - 1,
        Math.max(0, Math.floor(((clawX - 15) / 70) * PLUSHIES.length))
      );
      const wonPlushie = PLUSHIES[targetIndex] || PLUSHIES[0];
      setCaughtPlushie(wonPlushie);
      playSparkleSound();
    }, 850);

    // 3. Lift claw with plushie
    setTimeout(() => {
      setClawY(0);
    }, 1300);

    // 4. Move claw to drop chute on the left (20%)
    setTimeout(() => {
      setClawX(20);
    }, 1900);

    // 5. Open claws, plushie drops down into chute
    setTimeout(() => {
      setClawsClosed(false);
      setCaughtPlushie(null);
      playPopSound();
    }, 2500);

    // 6. Present celebratory prize modal
    setTimeout(() => {
      const wonPlushie = PLUSHIES[Math.floor(Math.random() * PLUSHIES.length)];
      setRevealedPrize(wonPlushie);
      setGrabbedHistory((prev) => [...new Set([...prev, wonPlushie.id])]);
      playChimeWin();
      unlockBadge("claw");
      setIsGrabbing(false);
    }, 2900);
  }, [isGrabbing, clawX]);

  const handleClosePrize = useCallback(() => {
    playPopSound();
    setRevealedPrize(null);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto select-none">
      {/* Chapter Header */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Interactive Arcade // Little Toybox
          </span>
          <span className="text-sm">🎀</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          The Little Claw Machine
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          Move the claw left and right, press <strong>GRAB</strong>, and win a sweet plushie made just for Alura!
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={42} />
        </div>
      </div>

      {/* CLAW MACHINE HOUSING */}
      <div className="relative max-w-lg mx-auto bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] rounded-3xl p-5 sm:p-7 border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.3)]">
        {/* Machine Marquee */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#A94F65] via-[#D58C9C] to-[#A94F65] rounded-2xl py-3 px-5 mb-4 text-white shadow-md border-2 border-white/60">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎀</span>
            <span className="font-serif italic font-medium tracking-wide text-sm sm:text-base">
              Alura&apos;s Sweet Claw
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest bg-white/20 px-2.5 py-1 rounded-full uppercase">
            FREE PLAY
          </span>
        </div>

        {/* Transparent Glass Play Chamber */}
        <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-gradient-to-b from-white/90 via-[#FFF7F5]/85 to-white/70 border-3 border-[#E8B5C0] overflow-hidden shadow-inner flex flex-col justify-between">
          
          {/* Glass reflection shine */}
          <div
            className="absolute -top-12 -left-12 w-48 h-96 bg-white/40 rotate-25 pointer-events-none blur-sm"
            aria-hidden="true"
          />

          {/* Top Rail Bar */}
          <div className="relative w-full h-3 bg-[#E8B5C0] border-b border-[#D58C9C] z-20">
            {/* The Moving Trolley */}
            <div
              className="absolute top-0 w-8 h-4 bg-[#A94F65] rounded-b-md transition-all duration-300 transform -translate-x-1/2 flex items-center justify-center shadow-sm"
              style={{ left: `${clawX}%` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Cable & Claw Assembly */}
          <div
            className="absolute top-3 z-20 transition-all duration-500 ease-in-out transform -translate-x-1/2 flex flex-col items-center pointer-events-none"
            style={{
              left: `${clawX}%`,
              transform: `translate(-50%, ${clawY * 2.4}px)`,
            }}
          >
            {/* Cable Line */}
            <div
              className="w-0.5 bg-[#A94F65] transition-all duration-500"
              style={{ height: `${Math.max(16, clawY * 2.2 + 16)}px` }}
            />

            {/* Claw Hub */}
            <div className="w-6 h-4 bg-[#702C43] rounded-sm flex items-center justify-center shadow-md">
              <span className="text-[8px] text-white">✦</span>
            </div>

            {/* Claw Prongs */}
            <div className="flex items-start justify-center gap-1 -mt-0.5">
              {/* Left Prong */}
              <div
                className={`w-1.5 h-6 bg-[#A94F65] rounded-b-full transition-transform duration-300 origin-top ${
                  clawsClosed ? "rotate-15 translate-x-0.5" : "-rotate-25"
                }`}
              />
              {/* Center Pin */}
              <div className="w-1 h-3 bg-[#702C43] rounded-full" />
              {/* Right Prong */}
              <div
                className={`w-1.5 h-6 bg-[#A94F65] rounded-b-full transition-transform duration-300 origin-top ${
                  clawsClosed ? "-rotate-15 -translate-x-0.5" : "rotate-25"
                }`}
              />
            </div>

            {/* Caught Plushie hanging in claw */}
            {caughtPlushie && (
              <div className="mt-1 flex flex-col items-center animate-bounce">
                <span className="text-3xl drop-shadow-md">{caughtPlushie.sticker}</span>
              </div>
            )}
          </div>

          {/* Prize Chute in Bottom Left */}
          <div className="absolute bottom-0 left-2 w-16 h-14 bg-gradient-to-t from-[#702C43]/20 to-transparent border-t-2 border-r-2 border-[#D58C9C] rounded-tr-xl flex items-center justify-center pointer-events-none">
            <span className="text-[9px] font-mono tracking-widest text-[#702C43]/70 uppercase">
              CHUTE
            </span>
          </div>

          {/* Plushies in the Pit at Bottom */}
          <div className="relative w-full h-24 mt-auto flex items-end justify-around px-4 pb-2 z-10">
            {PLUSHIES.map((plush, idx) => (
              <div
                key={plush.id}
                className="group flex flex-col items-center transition-transform hover:scale-110"
                style={{
                  transform: `translateY(${idx % 2 === 0 ? "0px" : "-6px"}) rotate(${
                    (idx - 2) * 5
                  }deg)`,
                }}
              >
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-sm border border-white"
                  style={{ backgroundColor: plush.color }}
                >
                  {plush.sticker}
                </div>
                <span className="text-[9px] font-mono text-[#702C43]/80 font-medium mt-1">
                  {plush.name.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Arcade Controls Panel */}
        <div className="mt-5 p-4 rounded-2xl bg-white/90 border border-[#E8B5C0] shadow-sm flex items-center justify-between">
          {/* Directional Joysticks */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={moveLeft}
              disabled={isGrabbing}
              className="w-12 h-12 rounded-xl bg-[#FFF0F2] border-2 border-[#D58C9C] text-[#702C43] flex items-center justify-center shadow-sm hover:bg-[#FCE8E8] active:scale-95 disabled:opacity-40 transition-all"
              aria-label="Move claw left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={moveRight}
              disabled={isGrabbing}
              className="w-12 h-12 rounded-xl bg-[#FFF0F2] border-2 border-[#D58C9C] text-[#702C43] flex items-center justify-center shadow-sm hover:bg-[#FCE8E8] active:scale-95 disabled:opacity-40 transition-all"
              aria-label="Move claw right"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Big Grab Action Button */}
          <button
            type="button"
            onClick={handleGrab}
            disabled={isGrabbing}
            className="flex-1 ml-4 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#A94F65] to-[#702C43] text-white font-serif font-medium text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            <Disc3 size={18} className={isGrabbing ? "animate-spin" : ""} />
            <span>{isGrabbing ? "GRABBING..." : "GRAB A PLUSHIE! ✨"}</span>
          </button>
        </div>

        {/* Prize Collection Tracker */}
        <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-[#702C43]/70">
          <span className="flex items-center gap-1">
            <Trophy size={12} className="text-[#A94F65]" />
            Won: {grabbedHistory.length} / {PLUSHIES.length} plushies
          </span>
          <span>Tap arrows, then grab!</span>
        </div>
      </div>

      {/* PRIZE REVEAL MODAL */}
      {revealedPrize && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={`You won a ${revealedPrize.name}`}
        >
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-[#FCE8E8] shadow-[0_25px_60px_rgba(112,44,67,0.35)] animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            <button
              type="button"
              onClick={handleClosePrize}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#FCE8E8] text-[#A94F65] text-xs font-mono uppercase tracking-widest mb-3">
              🎉 YOU GOT A PRIZE!
            </span>

            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-[#FFF7F5] via-[#FFF0F2] to-[#FCE8E8] border-2 border-[#F4D1D5] flex items-center justify-center text-5xl shadow-sm mb-4">
              {revealedPrize.sticker}
            </div>

            <h3 className="font-serif text-2xl text-[#702C43] font-medium mb-2">
              {revealedPrize.name}
            </h3>

            <p className="font-serif italic text-base text-[#702C43]/90 leading-relaxed mb-6">
              &ldquo;{revealedPrize.message}&rdquo;
            </p>

            <button
              type="button"
              onClick={handleClosePrize}
              className="w-full py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              Put in my collection 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

