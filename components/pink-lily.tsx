"use client";

import React, { useState, useCallback } from "react";
import { playSparkleSound } from "@/lib/sound-effects";

type PinkLilyProps = {
  className?: string;
  size?: number;
  interactive?: boolean;
  petalColor?: string;
  centerColor?: string;
};

const lilyMessages = [
  "Blooming so beautifully for Alura 🌷",
  "Always my favorite flower ✨",
  "You make every moment softer 💕",
  "A little petal for you 🌸",
];

export default function PinkLily({
  className = "",
  size = 64,
  interactive = true,
}: PinkLilyProps) {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [tapped, setTapped] = useState(false);

  const handleTap = useCallback((e: React.PointerEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    playSparkleSound();
    setTapped(true);

    const randomMsg = lilyMessages[Math.floor(Math.random() * lilyMessages.length)];
    setTooltip(randomMsg);

    setTimeout(() => {
      setTapped(false);
    }, 400);

    setTimeout(() => {
      setTooltip(null);
    }, 2400);
  }, [interactive]);

  return (
    <div
      className={`relative inline-block ${interactive ? "cursor-pointer group" : "pointer-events-none"}`}
      onPointerDown={handleTap}
      title={interactive ? "Tap the lily for a sweet note 🌷" : undefined}
    >
      {/* Floating Sweet Message Tooltip on Tap */}
      {tooltip && (
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 px-3 py-1 rounded-full bg-white/95 border border-[#E8B5C0] text-[#702C43] text-[11px] font-sans font-medium whitespace-nowrap shadow-md animate-[fadeInUp_0.3s_ease-out]"
          role="status"
        >
          {tooltip}
        </div>
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none drop-shadow-sm transition-transform duration-300 ${
          tapped ? "scale-115 rotate-6" : "group-hover:scale-105"
        } animate-[lilySway_6s_ease-in-out_infinite] ${className}`}
        aria-hidden="true"
      >
        <defs>
          {/* Soft pink petal gradient */}
          <linearGradient id="lilyPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7F5" />
            <stop offset="40%" stopColor="#F4D1D5" />
            <stop offset="75%" stopColor="#D58C9C" />
            <stop offset="100%" stopColor="#A94F65" />
          </linearGradient>

          <linearGradient id="lilyCenterGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFF5E4" />
            <stop offset="60%" stopColor="#FDE2E8" />
            <stop offset="100%" stopColor="#D58C9C" />
          </linearGradient>

          <radialGradient id="lilyHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FCE8E8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFF7F5" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle background glow */}
        <circle cx="50" cy="50" r="42" fill="url(#lilyHalo)" />

        {/* Back Petals */}
        <g opacity="0.95">
          {/* Top Back Petal */}
          <path
            d="M50 50 C44 32 40 14 50 6 C60 14 56 32 50 50 Z"
            fill="url(#lilyPetalGrad)"
            stroke="#E8B5C0"
            strokeWidth="0.8"
          />
          {/* Bottom Left Petal */}
          <path
            d="M50 50 C34 56 16 68 12 80 C24 84 40 70 50 50 Z"
            fill="url(#lilyPetalGrad)"
            stroke="#E8B5C0"
            strokeWidth="0.8"
          />
          {/* Bottom Right Petal */}
          <path
            d="M50 50 C66 56 84 68 88 80 C76 84 60 70 50 50 Z"
            fill="url(#lilyPetalGrad)"
            stroke="#E8B5C0"
            strokeWidth="0.8"
          />
        </g>

        {/* Front Petals */}
        <g>
          {/* Top-Right Petal */}
          <path
            d="M50 50 C60 38 78 26 88 28 C86 42 68 48 50 50 Z"
            fill="url(#lilyCenterGrad)"
            stroke="#D58C9C"
            strokeWidth="0.8"
          />
          {/* Top-Left Petal */}
          <path
            d="M50 50 C40 38 22 26 12 28 C14 42 32 48 50 50 Z"
            fill="url(#lilyCenterGrad)"
            stroke="#D58C9C"
            strokeWidth="0.8"
          />
          {/* Bottom Center Petal */}
          <path
            d="M50 50 C44 65 42 85 50 94 C58 85 56 65 50 50 Z"
            fill="url(#lilyCenterGrad)"
            stroke="#D58C9C"
            strokeWidth="0.8"
          />
        </g>

        {/* Petal Ribs / Midrib Lines */}
        <g stroke="#A94F65" strokeWidth="0.6" opacity="0.6" strokeLinecap="round">
          <path d="M50 48 Q50 25 50 10" />
          <path d="M50 50 Q66 40 82 30" />
          <path d="M50 50 Q34 40 18 30" />
          <path d="M50 50 Q50 72 50 90" />
          <path d="M50 50 Q30 64 16 76" />
          <path d="M50 50 Q70 64 84 76" />
        </g>

        {/* Delicate Lily Freckles / Papillae */}
        <g fill="#702C43" opacity="0.55">
          <circle cx="48" cy="38" r="0.8" />
          <circle cx="52" cy="34" r="0.7" />
          <circle cx="49" cy="28" r="0.6" />
          <circle cx="58" cy="45" r="0.8" />
          <circle cx="64" cy="42" r="0.7" />
          <circle cx="42" cy="45" r="0.8" />
          <circle cx="36" cy="42" r="0.7" />
          <circle cx="48" cy="62" r="0.8" />
          <circle cx="52" cy="68" r="0.7" />
        </g>

        {/* Stamens & Pistil (Golden Anthers) */}
        <g stroke="#8B3D52" strokeWidth="1" strokeLinecap="round">
          <path d="M50 50 Q46 44 42 38" />
          <path d="M50 50 Q54 44 58 38" />
          <path d="M50 50 Q42 50 36 48" />
          <path d="M50 50 Q58 50 64 48" />
          <path d="M50 50 Q46 56 42 62" />
          <path d="M50 50 Q54 56 58 62" />
        </g>

        {/* Golden pollen anthers */}
        <g fill="#D48B38" stroke="#8B3D52" strokeWidth="0.5">
          <ellipse cx="41" cy="37" rx="2.4" ry="1.2" transform="rotate(-30 41 37)" />
          <ellipse cx="59" cy="37" rx="2.4" ry="1.2" transform="rotate(30 59 37)" />
          <ellipse cx="35" cy="48" rx="2.4" ry="1.2" transform="rotate(-70 35 48)" />
          <ellipse cx="65" cy="48" rx="2.4" ry="1.2" transform="rotate(70 65 48)" />
          <ellipse cx="41" cy="63" rx="2.4" ry="1.2" transform="rotate(45 41 63)" />
          <ellipse cx="59" cy="63" rx="2.4" ry="1.2" transform="rotate(-45 59 63)" />
        </g>

        {/* Center Pistil Stigma */}
        <circle cx="50" cy="50" r="2.2" fill="#70A865" stroke="#487840" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
