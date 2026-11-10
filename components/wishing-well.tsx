"use client";

import { useState, useCallback } from "react";
import { Sparkles, Star, RotateCcw, Heart, X } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playWaterDrop, playSparkleSound, playChimeWin, playPopSound } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

type WishStar = {
  id: string;
  label: string;
  color: string;
};

const STARS: WishStar[] = [
  { id: "s1", label: "Twinkling Rose", color: "#F4D1D5" },
  { id: "s2", label: "Golden Radiance", color: "#FFF2CC" },
  { id: "s3", label: "Blush Dream", color: "#FCE8E8" },
  { id: "s4", label: "Ivory Glow", color: "#FFFDFB" },
];

const WISH_MESSAGES = [
  "I hope we get to see more beautiful, quiet places together.",
  "I hope we never stop laughing at the silliest little things.",
  "I hope we always make time for the quiet moments that truly matter.",
  "I hope your days are always overflowing with reasons to smile.",
  "I hope you always feel safe, understood, and deeply cherished with me.",
  "I hope our story keeps growing into something even more meaningful every day.",
];

export default function LittleWishingWell() {
  const [isCasting, setIsCasting] = useState(false);
  const [rippling, setRippling] = useState(false);
  const [grantedWish, setGrantedWish] = useState<string | null>(null);
  const [wishesMadeCount, setWishesMadeCount] = useState(0);

  const handleCastStar = useCallback((star: WishStar) => {
    if (isCasting) return;
    setIsCasting(true);
    playPopSound();

    // 1. Star drops into well
    setTimeout(() => {
      setRippling(true);
      playWaterDrop();
    }, 600);

    // 2. Water ripples and sparkles
    setTimeout(() => {
      playSparkleSound();
    }, 1100);

    // 3. Grant wish
    setTimeout(() => {
      const randomMsg = WISH_MESSAGES[Math.floor(Math.random() * WISH_MESSAGES.length)];
      setGrantedWish(randomMsg);
      setWishesMadeCount((c) => c + 1);
      playChimeWin();
      unlockBadge("wishingWell");
      setIsCasting(false);
      setRippling(false);
    }, 1600);
  }, [isCasting]);

  const handleCloseWish = useCallback(() => {
    playPopSound();
    setGrantedWish(null);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto select-none">
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Fairy-tale Shrine // Hopes &amp; Wishes
          </span>
          <span className="text-sm">✨</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          A Little Wishing Well
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          Drop a glowing star into the pastel waters and release a wish for the two of us.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={40} />
        </div>
      </div>

      {/* THE WISHING WELL STRUCTURE */}
      <div className="relative max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.25)] text-center">
        
        {/* Floating Stars Shelf */}
        <div className="mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A94F65] block mb-3">
            Choose a Star to Cast into the Well
          </span>
          <div className="flex items-center justify-center gap-3">
            {STARS.map((star) => (
              <button
                key={star.id}
                type="button"
                onClick={() => handleCastStar(star)}
                disabled={isCasting}
                className="group relative w-12 h-12 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-115 active:scale-90 disabled:opacity-40"
                style={{ backgroundColor: star.color }}
                aria-label={`Cast ${star.label}`}
              >
                <Star size={20} className="text-[#A94F65] fill-current animate-pulse" />
              </button>
            ))}
          </div>
        </div>

        {/* The Physical Well Illustration */}
        <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
          {/* Well Basin Outer Ring */}
          <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-[#E8B5C0] via-[#F4D1D5] to-white border-4 border-white shadow-inner flex items-center justify-center">
            
            {/* Well Water Chamber */}
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-b from-[#A94F65]/30 via-[#D58C9C]/40 to-[#702C43]/40 overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Shimmering Water Surface */}
              <div className="absolute inset-0 bg-[#FCE8E8]/40 blur-xs" />

              {/* Water Ripples when star drops */}
              {rippling && (
                <>
                  <div className="absolute w-12 h-12 rounded-full border-2 border-white/80 animate-ping" />
                  <div className="absolute w-20 h-20 rounded-full border border-white/60 animate-ping animation-delay-200" />
                </>
              )}

              {/* Water reflections */}
              <span className="relative z-10 text-2xl animate-[float_4s_ease-in-out_infinite]">
                {isCasting ? "💫" : "✨"}
              </span>
            </div>
          </div>
        </div>

        {/* Well Footer Status */}
        <div className="mt-4 pt-3 border-t border-[#E8B5C0]/50 flex items-center justify-between text-xs text-[#702C43]/70 font-sans">
          <span className="flex items-center gap-1">
            <Heart size={12} className="text-[#A94F65] fill-current" />
            Wishes cast: {wishesMadeCount}
          </span>
          <span className="font-mono text-[11px] text-[#A94F65]">
            FAIRY-TALE FOUNTAIN
          </span>
        </div>
      </div>

      {/* GRANTED WISH MODAL */}
      {grantedWish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label="Wish granted"
        >
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-[#FCE8E8] shadow-[0_25px_60px_rgba(112,44,67,0.35)] animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            <button
              type="button"
              onClick={handleCloseWish}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#FCE8E8] text-[#A94F65] text-xs font-mono uppercase tracking-widest mb-3">
              ✨ A WISH FROM THE HEART
            </span>

            <div className="text-4xl my-3 animate-bounce">🌟</div>

            <p className="font-serif italic text-lg sm:text-xl text-[#702C43] leading-relaxed mb-6">
              &ldquo;{grantedWish}&rdquo;
            </p>

            <button
              type="button"
              onClick={handleCloseWish}
              className="w-full py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              May this wish come true 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

