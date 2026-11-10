"use client";

import { useState, useCallback } from "react";
import { Compass, Sparkles, Camera, Mail, Gift, ArrowRight, X } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPopSound, playSparkleSound } from "@/lib/sound-effects";

type WorldDestination = {
  id: string;
  targetId: string;
  name: string;
  tagline: string;
  sticker: string;
  color: string;
  border: string;
};

const DESTINATIONS: WorldDestination[] = [
  {
    id: "dest-gachapon",
    targetId: "memory-gachapon",
    name: "Memory Gachapon",
    tagline: "Turn the crank for surprise polaroids & sweet notes",
    sticker: "🎀",
    color: "#FFF0F2",
    border: "#D58C9C",
  },
  {
    id: "dest-studio",
    targetId: "couple-photo-studio",
    name: "Couple Photo Studio",
    tagline: "Style photobooth prints & export as high-res PNG",
    sticker: "📸",
    color: "#FCE8E8",
    border: "#E8B5C0",
  },
  {
    id: "dest-letters",
    targetId: "open-when-letters",
    name: "Open When... Letters",
    tagline: "Unfold comforting letters for different kinds of days",
    sticker: "💌",
    color: "#FFFDFB",
    border: "#F4D1D5",
  },
  {
    id: "dest-daily",
    targetId: "daily-love-note",
    name: "Daily Love Note",
    tagline: "A fresh thought blooming every morning on your device",
    sticker: "🌷",
    color: "#FFF7F5",
    border: "#A94F65",
  },
];

export default function WorldPortalNav() {
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  const handleJumpTo = useCallback((targetId: string) => {
    playPopSound();
    playSparkleSound();
    setIsQuickMenuOpen(false);

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      {/* SECTION EMBED: MINI WORLD MAP / SCRAPBOOK PASSPORT HUB */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none">
        <div className="relative text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
            <Compass size={14} className="text-[#A94F65]" />
            <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
              Scrapbook Map // Interactive Destinations
            </span>
            <span className="text-sm">🧭</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-[#702C43] tracking-tight mb-2">
            Alura&apos;s World Passport
          </h2>

          <p className="text-xs sm:text-sm text-[#702C43]/75 font-sans leading-relaxed">
            Four interactive rooms made just for you. Tap any destination to travel there directly!
          </p>
        </div>

        {/* 4 Destination Stamp Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleJumpTo(dest.targetId)}
              role="button"
              tabIndex={0}
              aria-label={`Travel to ${dest.name}`}
              className="group relative p-5 rounded-3xl border-2 shadow-sm hover:shadow-xl hover:-translate-y-2 active:scale-95 transition-all cursor-pointer flex flex-col justify-between text-left"
              style={{
                backgroundColor: dest.color,
                borderColor: dest.border,
              }}
            >
              {/* Top Passport Stamp Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-white/90 border border-white shadow-xs flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {dest.sticker}
                </div>
                <span className="text-[9px] font-mono tracking-widest text-[#A94F65] uppercase">
                  ENTER ROOM
                </span>
              </div>

              <div>
                <h3 className="font-serif italic text-lg sm:text-xl text-[#702C43] font-medium group-hover:text-[#A94F65] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-[#702C43]/75 font-sans leading-relaxed mt-1">
                  {dest.tagline}
                </p>
              </div>

              {/* Bottom Travel Arrow */}
              <div className="mt-4 pt-3 border-t border-[#702C43]/10 flex items-center justify-between text-xs font-mono text-[#A94F65]">
                <span>VISIT AREA</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLOATING QUICK TRAVEL PILL ON TOP-LEFT */}
      <aside
        className="fixed top-4 left-4 z-40 select-none animate-[fadeIn_0.5s_ease-out]"
        role="region"
        aria-label="Quick travel passport"
      >
        <button
          type="button"
          onClick={() => {
            playPopSound();
            setIsQuickMenuOpen((prev) => !prev);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E8B5C0] shadow-sm hover:border-[#D58C9C] active:scale-95 transition-all text-[#702C43] text-xs font-mono"
          aria-label="Open world destinations map"
        >
          <Compass size={13} className="text-[#A94F65]" />
          <span className="font-medium tracking-wider hidden sm:inline">World Map</span>
          <span className="text-[10px] text-[#A94F65]">4 Areas</span>
        </button>

        {/* Quick Flyout Menu */}
        {isQuickMenuOpen && (
          <div className="absolute top-10 left-0 w-64 p-3 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#F4D1D5] shadow-xl animate-[scaleIn_0.25s_ease-out] space-y-1.5">
            <div className="flex items-center justify-between px-2 py-1 border-b border-[#FCE8E8] text-[10px] font-mono text-[#A94F65] uppercase">
              <span>ALURA&apos;S DESTINATIONS</span>
              <button
                type="button"
                onClick={() => setIsQuickMenuOpen(false)}
                className="hover:opacity-70"
              >
                <X size={12} />
              </button>
            </div>

            {DESTINATIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => handleJumpTo(d.targetId)}
                className="w-full p-2 rounded-xl text-left text-xs font-sans text-[#702C43] hover:bg-[#FFF0F2] flex items-center gap-2 transition-colors"
              >
                <span>{d.sticker}</span>
                <span className="font-serif italic flex-1 truncate">{d.name}</span>
                <ArrowRight size={12} className="text-[#A94F65]" />
              </button>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}

