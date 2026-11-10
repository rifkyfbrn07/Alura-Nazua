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
  "A pink lily blooming for Alura 🌷",
  "Always my favorite flower ✨",
  "Gentle, elegant, and rare 💕",
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
    }, 450);

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
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1 rounded-full bg-white/95 border border-[#E8B5C0] text-[#702C43] text-[11px] font-sans font-medium whitespace-nowrap shadow-md animate-[fadeInUp_0.3s_ease-out]"
          role="status"
        >
          {tooltip}
        </div>
      )}

      {/* 
        BOTANICAL PINK ORIENTAL LILY (Lilium)
        Exact morphology:
        - 6 tepals in 2 distinct whorls of 3 (3 outer sepals, 3 inner wide overlapping petals)
        - Graceful recurved, flaring petal tips
        - Longitudinal nectar furrows & deep pink midrib flames
        - Stippled papillae (freckles) along the throat
        - 6 prominent arching stamens with large versatile golden-brown anthers
        - 1 long central pistil/style ending in a trilobed stigma
        - Pale green nectar throat center
      */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none drop-shadow-[0_4px_12px_rgba(169,79,101,0.18)] transition-transform duration-300 ${
          tapped ? "scale-110 -translate-y-1" : "group-hover:scale-105"
        } animate-[lilySway_7s_ease-in-out_infinite] ${className}`}
        aria-hidden="true"
      >
        <defs>
          {/* Subtle Ambient Aura */}
          <radialGradient id="lilyAmbientAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FCE8E8" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#FFF7F5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFF7F5" stopOpacity="0" />
          </radialGradient>

          {/* Outer Sepal Gradient (30°, 150°, 270°) */}
          <linearGradient id="lilySepalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E2EBB8" />
            <stop offset="15%" stopColor="#FDE2E8" />
            <stop offset="50%" stopColor="#F4D1D5" />
            <stop offset="85%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FCE8E8" />
          </linearGradient>

          {/* Inner Petal Gradient (90°, 210°, 330°) - Wider, rich pink center */}
          <linearGradient id="lilyPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D5E8A8" />
            <stop offset="18%" stopColor="#E8B5C0" />
            <stop offset="45%" stopColor="#D58C9C" />
            <stop offset="78%" stopColor="#FFF0F3" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Deep Pink Midrib Flame */}
          <linearGradient id="lilyMidribFlame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#A94F65" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#D58C9C" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#F4D1D5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Anther / Pollen Sac Gradient */}
          <linearGradient id="lilyAntherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D87834" />
            <stop offset="50%" stopColor="#9C441E" />
            <stop offset="100%" stopColor="#6E2810" />
          </linearGradient>

          {/* Stigma Gradient */}
          <radialGradient id="lilyStigmaGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#9BC288" />
            <stop offset="80%" stopColor="#5E884D" />
            <stop offset="100%" stopColor="#3E6032" />
          </radialGradient>
        </defs>

        {/* Ambient Soft Glow */}
        <circle cx="100" cy="100" r="92" fill="url(#lilyAmbientAura)" />

        {/* ==============================================================
            WHORL 1: THREE OUTER SEPALS (Angled at -90°, 30°, 150°)
            Narrower base, graceful arching recurved tips
           ============================================================== */}
        <g id="outer-sepals" opacity="0.96">
          {/* Top Sepal (-90° / 270°) */}
          <g transform="translate(100, 100) rotate(0) translate(-100, -100)">
            {/* Sepal Body */}
            <path
              d="M100 100 C92 78, 76 42, 86 16 C92 4, 108 4, 114 16 C124 42, 108 78, 100 100 Z"
              fill="url(#lilySepalGrad)"
              stroke="#D58C9C"
              strokeWidth="0.8"
            />
            {/* Sepal Midrib Flame & Vein */}
            <path
              d="M100 98 Q100 48 100 10"
              stroke="url(#lilyMidribFlame)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M100 95 Q100 45 100 8"
              stroke="#A94F65"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Subtle Papillae Freckles */}
            <circle cx="98" cy="74" r="1.1" fill="#702C43" opacity="0.7" />
            <circle cx="103" cy="68" r="0.9" fill="#702C43" opacity="0.75" />
            <circle cx="97" cy="60" r="1.0" fill="#702C43" opacity="0.6" />
            <circle cx="102" cy="52" r="0.8" fill="#702C43" opacity="0.5" />
          </g>

          {/* Bottom-Right Sepal (120°) */}
          <g transform="translate(100, 100) rotate(120) translate(-100, -100)">
            <path
              d="M100 100 C92 78, 76 42, 86 16 C92 4, 108 4, 114 16 C124 42, 108 78, 100 100 Z"
              fill="url(#lilySepalGrad)"
              stroke="#D58C9C"
              strokeWidth="0.8"
            />
            <path
              d="M100 98 Q100 48 100 10"
              stroke="url(#lilyMidribFlame)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M100 95 Q100 45 100 8"
              stroke="#A94F65"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="98" cy="74" r="1.1" fill="#702C43" opacity="0.7" />
            <circle cx="103" cy="68" r="0.9" fill="#702C43" opacity="0.75" />
            <circle cx="97" cy="60" r="1.0" fill="#702C43" opacity="0.6" />
            <circle cx="102" cy="52" r="0.8" fill="#702C43" opacity="0.5" />
          </g>

          {/* Bottom-Left Sepal (240°) */}
          <g transform="translate(100, 100) rotate(240) translate(-100, -100)">
            <path
              d="M100 100 C92 78, 76 42, 86 16 C92 4, 108 4, 114 16 C124 42, 108 78, 100 100 Z"
              fill="url(#lilySepalGrad)"
              stroke="#D58C9C"
              strokeWidth="0.8"
            />
            <path
              d="M100 98 Q100 48 100 10"
              stroke="url(#lilyMidribFlame)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M100 95 Q100 45 100 8"
              stroke="#A94F65"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="98" cy="74" r="1.1" fill="#702C43" opacity="0.7" />
            <circle cx="103" cy="68" r="0.9" fill="#702C43" opacity="0.75" />
            <circle cx="97" cy="60" r="1.0" fill="#702C43" opacity="0.6" />
            <circle cx="102" cy="52" r="0.8" fill="#702C43" opacity="0.5" />
          </g>
        </g>

        {/* ==============================================================
            WHORL 2: THREE INNER PETALS (Angled at 60°, 180°, 300°)
            Wider, broader flaring, overlapping outer sepals at base
           ============================================================== */}
        <g id="inner-petals">
          {/* Top-Right Petal (60°) */}
          <g transform="translate(100, 100) rotate(60) translate(-100, -100)">
            {/* Broad Flaring Petal Body */}
            <path
              d="M100 100 C90 75, 68 40, 82 14 C90 0, 110 0, 118 14 C132 40, 110 75, 100 100 Z"
              fill="url(#lilyPetalGrad)"
              stroke="#A94F65"
              strokeWidth="0.9"
            />
            {/* Rich Magenta Midrib Flame */}
            <path
              d="M100 98 Q100 50 100 14"
              stroke="url(#lilyMidribFlame)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M100 96 Q100 46 100 10"
              stroke="#702C43"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Characteristic Papillae Freckles (raised nectar spots) */}
            <circle cx="97" cy="78" r="1.2" fill="#702C43" />
            <circle cx="104" cy="75" r="1.1" fill="#702C43" />
            <circle cx="96" cy="66" r="1.3" fill="#702C43" />
            <circle cx="103" cy="62" r="1.2" fill="#702C43" />
            <circle cx="98" cy="54" r="1.0" fill="#702C43" />
            <circle cx="104" cy="48" r="0.9" fill="#702C43" opacity="0.8" />
            <circle cx="96" cy="44" r="0.8" fill="#702C43" opacity="0.7" />
          </g>

          {/* Bottom Petal (180°) */}
          <g transform="translate(100, 100) rotate(180) translate(-100, -100)">
            <path
              d="M100 100 C90 75, 68 40, 82 14 C90 0, 110 0, 118 14 C132 40, 110 75, 100 100 Z"
              fill="url(#lilyPetalGrad)"
              stroke="#A94F65"
              strokeWidth="0.9"
            />
            <path
              d="M100 98 Q100 50 100 14"
              stroke="url(#lilyMidribFlame)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M100 96 Q100 46 100 10"
              stroke="#702C43"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle cx="97" cy="78" r="1.2" fill="#702C43" />
            <circle cx="104" cy="75" r="1.1" fill="#702C43" />
            <circle cx="96" cy="66" r="1.3" fill="#702C43" />
            <circle cx="103" cy="62" r="1.2" fill="#702C43" />
            <circle cx="98" cy="54" r="1.0" fill="#702C43" />
            <circle cx="104" cy="48" r="0.9" fill="#702C43" opacity="0.8" />
            <circle cx="96" cy="44" r="0.8" fill="#702C43" opacity="0.7" />
          </g>

          {/* Top-Left Petal (300°) */}
          <g transform="translate(100, 100) rotate(300) translate(-100, -100)">
            <path
              d="M100 100 C90 75, 68 40, 82 14 C90 0, 110 0, 118 14 C132 40, 110 75, 100 100 Z"
              fill="url(#lilyPetalGrad)"
              stroke="#A94F65"
              strokeWidth="0.9"
            />
            <path
              d="M100 98 Q100 50 100 14"
              stroke="url(#lilyMidribFlame)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M100 96 Q100 46 100 10"
              stroke="#702C43"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle cx="97" cy="78" r="1.2" fill="#702C43" />
            <circle cx="104" cy="75" r="1.1" fill="#702C43" />
            <circle cx="96" cy="66" r="1.3" fill="#702C43" />
            <circle cx="103" cy="62" r="1.2" fill="#702C43" />
            <circle cx="98" cy="54" r="1.0" fill="#702C43" />
            <circle cx="104" cy="48" r="0.9" fill="#702C43" opacity="0.8" />
            <circle cx="96" cy="44" r="0.8" fill="#702C43" opacity="0.7" />
          </g>
        </g>

        {/* ==============================================================
            DEEP GREEN/YELLOW NECTARY THROAT CENTER
           ============================================================== */}
        <circle cx="100" cy="100" r="14" fill="#CDE298" opacity="0.85" />
        <circle cx="100" cy="100" r="8" fill="#9BC268" />

        {/* ==============================================================
            SIX PROMINENT STAMENS (Long Arching Filaments + Golden-Rust Anthers)
           ============================================================== */}
        <g id="stamens">
          {/* Stamen 1 (-75°) */}
          <path
            d="M100 100 Q92 70 82 48"
            stroke="#E8F4D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 100 Q92 70 82 48"
            stroke="#A94F65"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          {/* Large Versatile Anther (T-shaped) */}
          <g transform="translate(82, 48) rotate(-40)">
            <ellipse cx="0" cy="0" rx="6.5" ry="2.4" fill="url(#lilyAntherGrad)" stroke="#4A1808" strokeWidth="0.6" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#EAA456" strokeWidth="0.7" opacity="0.8" />
          </g>

          {/* Stamen 2 (-15°) */}
          <path
            d="M100 100 Q106 68 116 46"
            stroke="#E8F4D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 100 Q106 68 116 46"
            stroke="#A94F65"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <g transform="translate(116, 46) rotate(35)">
            <ellipse cx="0" cy="0" rx="6.5" ry="2.4" fill="url(#lilyAntherGrad)" stroke="#4A1808" strokeWidth="0.6" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#EAA456" strokeWidth="0.7" opacity="0.8" />
          </g>

          {/* Stamen 3 (45°) */}
          <path
            d="M100 100 Q122 88 144 92"
            stroke="#E8F4D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 100 Q122 88 144 92"
            stroke="#A94F65"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <g transform="translate(144, 92) rotate(85)">
            <ellipse cx="0" cy="0" rx="6.5" ry="2.4" fill="url(#lilyAntherGrad)" stroke="#4A1808" strokeWidth="0.6" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#EAA456" strokeWidth="0.7" opacity="0.8" />
          </g>

          {/* Stamen 4 (105°) */}
          <path
            d="M100 100 Q118 122 126 146"
            stroke="#E8F4D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 100 Q118 122 126 146"
            stroke="#A94F65"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <g transform="translate(126, 146) rotate(40)">
            <ellipse cx="0" cy="0" rx="6.5" ry="2.4" fill="url(#lilyAntherGrad)" stroke="#4A1808" strokeWidth="0.6" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#EAA456" strokeWidth="0.7" opacity="0.8" />
          </g>

          {/* Stamen 5 (165°) */}
          <path
            d="M100 100 Q92 126 78 148"
            stroke="#E8F4D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 100 Q92 126 78 148"
            stroke="#A94F65"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <g transform="translate(78, 148) rotate(-35)">
            <ellipse cx="0" cy="0" rx="6.5" ry="2.4" fill="url(#lilyAntherGrad)" stroke="#4A1808" strokeWidth="0.6" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#EAA456" strokeWidth="0.7" opacity="0.8" />
          </g>

          {/* Stamen 6 (225°) */}
          <path
            d="M100 100 Q78 108 56 102"
            stroke="#E8F4D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 100 Q78 108 56 102"
            stroke="#A94F65"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <g transform="translate(56, 102) rotate(-85)">
            <ellipse cx="0" cy="0" rx="6.5" ry="2.4" fill="url(#lilyAntherGrad)" stroke="#4A1808" strokeWidth="0.6" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#EAA456" strokeWidth="0.7" opacity="0.8" />
          </g>
        </g>

        {/* ==============================================================
            CENTRAL PISTIL & TRILOBED STIGMA (Longest, prominent style)
           ============================================================== */}
        <g id="pistil">
          {/* Style */}
          <path
            d="M100 100 Q104 76 102 38"
            stroke="#7AA660"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 100 Q104 76 102 38"
            stroke="#CDE8A8"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Trilobed Stigma */}
          <g transform="translate(102, 38)">
            <circle cx="-2.2" cy="0" r="2.8" fill="url(#lilyStigmaGrad)" stroke="#305020" strokeWidth="0.5" />
            <circle cx="2.2" cy="0" r="2.8" fill="url(#lilyStigmaGrad)" stroke="#305020" strokeWidth="0.5" />
            <circle cx="0" cy="-2.5" r="2.8" fill="url(#lilyStigmaGrad)" stroke="#305020" strokeWidth="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
