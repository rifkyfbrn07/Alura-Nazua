"use client";

import { useState, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { Sparkles, Camera, Heart, RotateCcw, Palette, Stamp, Tag } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPaperSound, playPopSound, playSparkleSound, playChimeWin } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

import coupleSweetPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29.jpeg";
import coupleWarmPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29 (1).jpeg";
import coupleGacoanTablet1 from "@/image/WhatsApp Image 2026-11-10 at 09.33.27 (1).jpeg";
import cantikPortrait from "@/image/cantik.jpeg";

const PHOTO_OPTIONS = [
  { id: "p1", name: "Sweet Couple Selfie", img: coupleSweetPhoto },
  { id: "p2", name: "Warm Smile", img: coupleWarmPhoto },
  { id: "p3", name: "Gacoan Memory", img: coupleGacoanTablet1 },
  { id: "p4", name: "Alura's Radiance", img: cantikPortrait },
];

const FRAME_OPTIONS = [
  { id: "white", name: "Classic Polaroid", bg: "#FFFFFF", border: "#E8B5C0" },
  { id: "blush", name: "Blush Pink", bg: "#FFF0F2", border: "#D58C9C" },
  { id: "ivory", name: "Warm Ivory", bg: "#FFFDFB", border: "#E8B5C0" },
];

const STICKER_OPTIONS = ["🌷", "🎀", "⭐", "🍜", "💖", "✨", "💫", "💌"];

const CAPTION_OPTIONS = [
  "One minute with you, a million sweet feelings.",
  "Even ordinary days become special with you.",
  "My favorite place is right beside you.",
  "Proof that we can make a memory out of anything.",
  "With you, every day feels like a warm story.",
];

export default function ScrapbookBuilder() {
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_OPTIONS[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[0]);
  const [activeStickers, setActiveStickers] = useState<string[]>(["🎀", "🌷"]);
  const [selectedCaption, setSelectedCaption] = useState(CAPTION_OPTIONS[0]);
  const [isSaved, setIsSaved] = useState(false);

  const handleAddSticker = useCallback((stk: string) => {
    playPopSound();
    setActiveStickers((prev) => (prev.includes(stk) ? prev.filter((s) => s !== stk) : [...prev, stk]));
  }, []);

  const handlePreset = useCallback((presetIdx: number) => {
    playPaperSound();
    if (presetIdx === 0) {
      setSelectedPhoto(PHOTO_OPTIONS[0]);
      setSelectedFrame(FRAME_OPTIONS[1]);
      setActiveStickers(["🎀", "💖", "✨"]);
      setSelectedCaption(CAPTION_OPTIONS[0]);
    } else if (presetIdx === 1) {
      setSelectedPhoto(PHOTO_OPTIONS[2]);
      setSelectedFrame(FRAME_OPTIONS[0]);
      setActiveStickers(["🍜", "⭐", "🌷"]);
      setSelectedCaption(CAPTION_OPTIONS[1]);
    } else {
      setSelectedPhoto(PHOTO_OPTIONS[3]);
      setSelectedFrame(FRAME_OPTIONS[2]);
      setActiveStickers(["🌷", "✨", "💌"]);
      setSelectedCaption(CAPTION_OPTIONS[2]);
    }
  }, []);

  const handleFinishScrapbook = useCallback(() => {
    playSparkleSound();
    playChimeWin();
    setIsSaved(true);
    unlockBadge("scrapbook");
  }, []);

  const handleReset = useCallback(() => {
    playPopSound();
    setIsSaved(false);
    setSelectedPhoto(PHOTO_OPTIONS[0]);
    setSelectedFrame(FRAME_OPTIONS[0]);
    setActiveStickers(["🎀", "🌷"]);
    setSelectedCaption(CAPTION_OPTIONS[0]);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none">
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Creative Workshop // Memory Studio
          </span>
          <span className="text-sm">📸</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          Build Our Little Scrapbook
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          Pick your favorite photo, style the polaroid frame, add cute stickers, and paste your handwritten thoughts.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={42} />
        </div>
      </div>

      {/* WORKSHOP DESK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        
        {/* Left Column: Scrapbook Page Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F2] to-[#FCE8E8] border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.25)] transition-all">
            
            {/* Washi Tape at Top */}
            <div className="washi-tape top-[-8px] left-1/2 -translate-x-1/2 w-28 bg-[#F4D1D5]" />

            {/* Polaroid Frame */}
            <div
              className="relative p-3.5 pb-5 rounded-2xl shadow-md border transition-all"
              style={{
                backgroundColor: selectedFrame.bg,
                borderColor: selectedFrame.border,
              }}
            >
              {/* Photo Box */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#FCE8E8] mb-3">
                <Image
                  src={selectedPhoto.img}
                  alt={selectedPhoto.name}
                  fill
                  sizes="380px"
                  className="object-cover"
                />

                {/* Overlaid Active Stickers */}
                <div className="absolute inset-0 pointer-events-none p-2 flex flex-wrap gap-2 items-start justify-between">
                  {activeStickers.map((stk, idx) => (
                    <span
                      key={idx}
                      className="text-2xl drop-shadow-sm animate-[pulse_3s_ease-in-out_infinite]"
                      style={{
                        transform: `rotate(${(idx - 1) * 8}deg)`,
                      }}
                    >
                      {stk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Caption */}
              <p className="font-serif italic text-sm sm:text-base text-[#702C43] text-center px-2 min-h-[40px] flex items-center justify-center">
                &ldquo;{selectedCaption}&rdquo;
              </p>

              {/* Stamp Footer */}
              <div className="mt-2 pt-2 border-t border-[#702C43]/10 flex items-center justify-between text-[9px] font-mono text-[#A94F65]">
                <span>SCRAPBOOK // KEEPSAKE</span>
                <span>RIFKY &amp; ALURA</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E8B5C0] text-[#702C43] text-xs font-medium shadow-xs hover:bg-[#FCE8E8] active:scale-95 transition-all"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleFinishScrapbook}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-medium shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
              >
                <Heart size={13} fill="currentColor" />
                <span>{isSaved ? "Saved to Album! ✨" : "Paste in Scrapbook"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Presets */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A94F65] block mb-2">
              ✨ Quick Inspiration Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {["First Date Vibe", "Gacoan Memories", "Sweet Radiance"].map((name, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePreset(i)}
                  className="px-3 py-1.5 rounded-full bg-[#FFF0F2] hover:bg-[#FCE8E8] text-[#702C43] text-xs font-medium border border-[#F4D1D5] transition-all"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* 1. Pick Photo */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A94F65] block mb-2">
              1. Choose Photo
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PHOTO_OPTIONS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    playPaperSound();
                    setSelectedPhoto(p);
                  }}
                  className={`p-2 rounded-xl border text-xs text-left truncate flex items-center gap-2 transition-all ${
                    selectedPhoto.id === p.id
                      ? "bg-[#FFF0F2] border-[#A94F65] text-[#702C43] font-medium"
                      : "bg-[#FFF7F5] border-[#F4D1D5] text-[#702C43]/70 hover:bg-[#FCE8E8]"
                  }`}
                >
                  <span>🖼️</span>
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Pick Frame Color */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A94F65] block mb-2">
              2. Choose Polaroid Frame
            </span>
            <div className="flex gap-2">
              {FRAME_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setSelectedFrame(f);
                  }}
                  className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    selectedFrame.id === f.id
                      ? "bg-[#FFF0F2] border-[#A94F65] text-[#702C43]"
                      : "bg-[#FFF7F5] border-[#F4D1D5] text-[#702C43]/70 hover:bg-[#FCE8E8]"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Pick Stickers */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A94F65] block mb-2">
              3. Tap Stickers to Toggle
            </span>
            <div className="flex flex-wrap gap-2">
              {STICKER_OPTIONS.map((stk) => {
                const isActive = activeStickers.includes(stk);
                return (
                  <button
                    key={stk}
                    type="button"
                    onClick={() => handleAddSticker(stk)}
                    className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center border transition-all ${
                      isActive
                        ? "bg-[#FFF0F2] border-[#A94F65] scale-110 shadow-xs"
                        : "bg-[#FFF7F5] border-[#F4D1D5] opacity-60 hover:opacity-100"
                    }`}
                  >
                    {stk}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Pick Caption */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A94F65] block mb-2">
              4. Choose Caption
            </span>
            <div className="space-y-1.5">
              {CAPTION_OPTIONS.map((cap, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playPaperSound();
                    setSelectedCaption(cap);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs font-serif italic truncate block transition-all ${
                    selectedCaption === cap
                      ? "bg-[#FFF0F2] text-[#702C43] font-medium border border-[#D58C9C]"
                      : "text-[#702C43]/70 hover:bg-[#FCE8E8]"
                  }`}
                >
                  &ldquo;{cap}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

