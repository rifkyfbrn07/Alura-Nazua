"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Sparkles, Gift, Heart, RotateCcw, X } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playConfettiPop, playPopSound, playChimeWin } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";
import coupleSweetPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29.jpeg";
import type { StaticImageData } from "next/image";

type MysteryBox = {
  id: string;
  tag: string;
  boxColor: string;
  ribbonColor: string;
  pattern: string;
  type: "note" | "photo" | "compliment" | "memory" | "coupon";
  title: string;
  content: string;
  photo?: StaticImageData;
  opened: boolean;
};

const INITIAL_BOXES: MysteryBox[] = [
  {
    id: "box-1",
    tag: "A Little Love Note",
    boxColor: "#FCE8E8",
    ribbonColor: "#A94F65",
    pattern: "🎀",
    type: "note",
    title: "A Gentle Thought",
    content: "Sometimes I look at you and wonder how I got so lucky to have you in my life. Thank you for being you, Alura.",
    opened: false,
  },
  {
    id: "box-2",
    tag: "A Secret Photograph",
    boxColor: "#FFF0F2",
    ribbonColor: "#D58C9C",
    pattern: "📸",
    type: "photo",
    title: "Our Sweetest Smile",
    content: "Looking back at this moment, my heart feels as warm as the first time I held your hand.",
    photo: coupleSweetPhoto,
    opened: false,
  },
  {
    id: "box-3",
    tag: "A Cute Compliment",
    boxColor: "#F4D1D5",
    ribbonColor: "#702C43",
    pattern: "💖",
    type: "compliment",
    title: "Official Adoration",
    content: "You have the kindest eyes, the sweetest laugh, and the most radiant smile that can instantly turn my entire day around.",
    opened: false,
  },
  {
    id: "box-4",
    tag: "A Memory From Us",
    boxColor: "#E8B5C0",
    ribbonColor: "#FFF7F5",
    pattern: "✨",
    type: "memory",
    title: "Unforgettable Hours",
    content: "Remember that day we ate Mie Gacoan and couldn't stop taking silly photobooth takes? Even the most ordinary days feel like a movie with you.",
    opened: false,
  },
  {
    id: "box-5",
    tag: "A Special Surprise",
    boxColor: "#FFF7F5",
    ribbonColor: "#A94F65",
    pattern: "🎁",
    type: "coupon",
    title: "Golden Lifetime Pass",
    content: "Redeemable anytime: Unlimited warm forehead kisses, tight hugs, endless listening ears, and all the sweet matcha you crave.",
    opened: false,
  },
];

export default function MysteryGiftBoxes() {
  const [boxes, setBoxes] = useState<MysteryBox[]>(INITIAL_BOXES);
  const [selectedBox, setSelectedBox] = useState<MysteryBox | null>(null);

  const handleOpenBox = useCallback((boxId: string) => {
    playConfettiPop();

    setBoxes((prev) => {
      const updated = prev.map((b) => (b.id === boxId ? { ...b, opened: true } : b));
      // If all boxes opened, unlock badge
      if (updated.every((b) => b.opened)) {
        unlockBadge("mysteryBox");
        playChimeWin();
      }
      return updated;
    });

    const target = boxes.find((b) => b.id === boxId);
    if (target) {
      setSelectedBox({ ...target, opened: true });
    }
  }, [boxes]);

  const handleCloseModal = useCallback(() => {
    playPopSound();
    setSelectedBox(null);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none overflow-hidden">
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Curated Surprises // Wrapped with Love
          </span>
          <span className="text-sm">🎁</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          The Mystery Gift Boxes
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          Five wrapped pastel boxes waiting for Alura to untie. Each one hides a sweet surprise inside.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={40} />
        </div>
      </div>

      {/* Row of 5 Interactive Gift Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {boxes.map((box, index) => {
          return (
            <div
              key={box.id}
              onClick={() => handleOpenBox(box.id)}
              role="button"
              tabIndex={0}
              aria-label={`Open gift box: ${box.tag}`}
              className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:-translate-y-2.5 active:scale-95"
            >
              {/* Tag sticker */}
              <div className="mb-2 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#E8B5C0] text-[10px] font-mono text-[#702C43] shadow-xs">
                {box.opened ? "✓ Opened" : `Box #${index + 1}`}
              </div>

              {/* Physical 3D Box Illustration */}
              <div
                className="relative w-28 sm:w-32 h-28 sm:h-32 rounded-2xl shadow-md border-2 border-white flex items-center justify-center transition-transform duration-300 group-hover:shadow-xl"
                style={{ backgroundColor: box.boxColor }}
              >
                {/* Horizontal & Vertical Satin Ribbon */}
                <div
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 shadow-xs"
                  style={{ backgroundColor: box.ribbonColor }}
                />
                <div
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 shadow-xs"
                  style={{ backgroundColor: box.ribbonColor }}
                />

                {/* Bow on Top */}
                <div className="relative z-10 w-10 h-10 rounded-full bg-white/90 border border-white shadow-sm flex items-center justify-center text-lg">
                  {box.opened ? "✨" : box.pattern}
                </div>
              </div>

              {/* Tag Caption */}
              <span className="font-serif italic text-xs text-[#702C43]/90 mt-2 text-center">
                {box.tag}
              </span>
            </div>
          );
        })}
      </div>

      {/* MODAL: UNWRAPPED GIFT REVEAL */}
      {selectedBox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={selectedBox.title}
        >
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-[#FCE8E8] shadow-[0_25px_60px_rgba(112,44,67,0.35)] animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#FCE8E8] text-[#A94F65] text-xs font-mono uppercase tracking-widest mb-3">
              🎉 {selectedBox.tag}
            </span>

            <h3 className="font-serif text-2xl text-[#702C43] font-medium mb-3">
              {selectedBox.title}
            </h3>

            {/* If Photo type */}
            {selectedBox.photo && (
              <div className="relative w-44 aspect-[4/5] mx-auto rounded-xl overflow-hidden bg-[#FCE8E8] shadow-md border-2 border-white mb-4">
                <Image
                  src={selectedBox.photo}
                  alt="Secret memory photo"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            )}

            <p className="font-serif italic text-base sm:text-lg text-[#702C43]/90 leading-relaxed max-w-sm mx-auto mb-6">
              &ldquo;{selectedBox.content}&rdquo;
            </p>

            <button
              type="button"
              onClick={handleCloseModal}
              className="w-full py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              Keep this gift safe in my heart 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

