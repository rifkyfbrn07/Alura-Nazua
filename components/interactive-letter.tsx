"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Sparkles, Heart } from "lucide-react";
import { foundationLetter, recipientName } from "@/lib/love-story";

export default function InteractiveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasCracked, setHasCracked] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  const handleOpenLetter = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    setHasCracked(true);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setIsOpen(true);
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(true);
        setIsAnimating(false);
      },
    });

    // 1. Wax seal cracks
    tl.to(".wax-crack", {
      scaleY: 1,
      opacity: 1,
      duration: 0.25,
      ease: "power2.in",
    })
      .to(".wax-left", { x: -8, y: -2, rotation: -8, opacity: 0.6, duration: 0.35 }, "+=0.05")
      .to(".wax-right", { x: 8, y: 2, rotation: 8, opacity: 0.6, duration: 0.35 }, "<")
      // 2. Flap unfolds in 3D
      .to(".envelope-flap", {
        rotateX: 180,
        duration: 0.7,
        ease: "power2.inOut",
        transformOrigin: "top center",
      })
      // 3. Letter slides out
      .to(".letter-sheet", {
        y: -140,
        duration: 0.6,
        ease: "power2.out",
      })
      // 4. Smooth expand into readable letter
      .to(".letter-sheet", {
        scale: 1.05,
        duration: 0.3,
      });
  };

  const handleClose = () => {
    setIsOpen(false);
    setHasCracked(false);
    gsap.set(".wax-crack", { scaleY: 0, opacity: 0 });
    gsap.set(".wax-left, .wax-right", { x: 0, y: 0, rotation: 0, opacity: 1 });
    gsap.set(".envelope-flap", { rotateX: 0 });
    gsap.set(".letter-sheet", { y: 0, scale: 1 });
  };

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center">
      {/* Subtle section label */}
      <div className="mb-4 flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-rose-300/50">
        <Sparkles size={12} className="text-rose-400" />
        <span>A Letter I Needed to Write</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-serif text-center text-rose-100 mb-4 tracking-tight">
        The Message I Hope You Understand
      </h2>
      <p className="text-sm text-rose-300/60 max-w-md text-center mb-12">
        Open the envelope to read what I&apos;ve held in my heart.
      </p>

      {/* The Physical Envelope */}
      <div
        ref={envelopeRef}
        onClick={handleOpenLetter}
        className="group relative w-full max-w-[340px] sm:max-w-[420px] h-[220px] sm:h-[260px] cursor-pointer select-none perspective-[1200px]"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpenLetter();
          }
        }}
        aria-label="Click to open letter to Alura"
      >
        {/* Envelope Back Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#230a1c] to-[#12040f] rounded-2xl border border-rose-500/20 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(255,77,141,0.12)] overflow-hidden transition-all duration-300 group-hover:border-rose-400/40 group-hover:shadow-[0_20px_45px_rgba(255,77,141,0.2)]">
          {/* Subtle interior lining texture */}
          <div className="absolute inset-2 rounded-xl bg-gradient-to-tr from-rose-950/20 via-black to-rose-950/30 opacity-70 border border-white/5" />
        </div>

        {/* The Letter Sheet sliding inside/out */}
        <div
          className="letter-sheet absolute left-6 right-6 top-6 bottom-4 rounded-xl bg-[#fffafb] shadow-md flex flex-col p-5 pointer-events-none transition-transform"
          style={{ transformOrigin: "bottom center" }}
        >
          <div className="w-12 h-0.5 bg-rose-200/80 mb-3" />
          <p className="font-serif text-xs text-rose-950/70 italic mb-2">Dear Alura,</p>
          <div className="space-y-1.5 opacity-60">
            <div className="h-1.5 bg-stone-300 rounded w-full" />
            <div className="h-1.5 bg-stone-300 rounded w-5/6" />
            <div className="h-1.5 bg-stone-300 rounded w-4/6" />
          </div>
          <span className="mt-auto text-[9px] font-mono text-rose-900/40 tracking-wider">
            WITH LOVE, RIFKY
          </span>
        </div>

        {/* Envelope Front Pocket (Lower triangles) */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          {/* Left triangle */}
          <div
            className="absolute left-0 bottom-0 top-0 w-1/2 bg-gradient-to-tr from-[#1b0817] to-[#250b1f] border-r border-rose-500/10 shadow-lg"
            style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
          />
          {/* Right triangle */}
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-tl from-[#1a0716] to-[#250b1f] border-l border-rose-500/10 shadow-lg"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />
          {/* Bottom triangle */}
          <div
            className="absolute left-0 right-0 bottom-0 h-[60%] bg-gradient-to-t from-[#160513] to-[#20091a] border-t border-rose-500/15"
            style={{ clipPath: "polygon(0 100%, 50% 15%, 100% 100%)" }}
          />
        </div>

        {/* "To: Alura" Printed On The Envelope */}
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center pointer-events-none z-10 text-center">
          <span className="text-[10px] font-mono tracking-[0.25em] text-rose-300/50 uppercase">
            PERSONAL CORRESPONDENCE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-rose-100 tracking-wide mt-1 text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-white font-medium">
            To: Alura
          </h3>
          <span className="text-[10px] font-mono tracking-widest text-rose-400/40 mt-1 uppercase">
            [ TAP TO OPEN ]
          </span>
        </div>

        {/* Envelope Flap (Top triangle) */}
        <div
          className="envelope-flap absolute inset-x-0 top-0 h-[56%] z-20 pointer-events-none origin-top"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="w-full h-full bg-gradient-to-b from-[#2e0e25] to-[#1c0817] shadow-xl border-b border-rose-400/20"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          />

          {/* The Wax Seal sitting on the flap point */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-14 h-14 z-30 pointer-events-auto flex items-center justify-center">
            {/* Wax crack effect line */}
            <div
              className="wax-crack absolute inset-y-1 left-1/2 w-0.5 bg-rose-200 -translate-x-1/2 z-40 opacity-0 scale-y-0 rounded transition-transform"
              aria-hidden="true"
            />

            {/* Wax seal halves */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#690d20] via-[#8c1731] to-[#b82346] shadow-[0_4px_12px_rgba(0,0,0,0.6),0_0_15px_rgba(255,77,141,0.3)] border border-rose-400/30 flex items-center justify-center overflow-hidden">
              <div className="wax-left absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-rose-100 font-bold text-lg select-none">A</span>
              </div>
              <div className="wax-right absolute inset-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Modal / Reading Sheet for the Letter */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-[fadeIn_0.4s_ease-out] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="A letter to Alura from Rifky"
        >
          <div
            ref={paperRef}
            className="relative w-full max-w-2xl bg-[#fffbfc] text-[#24131b] rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(255,77,141,0.2)] my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close / Fold Button */}
            <button
              type="button"
              onClick={handleClose}
              className="sticky top-0 float-right -mr-2 -mt-2 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors z-20 shadow-sm"
              aria-label="Close letter"
              title="Close letter"
            >
              <X size={18} />
            </button>

            {/* Letter Header */}
            <div className="border-b border-rose-900/15 pb-4 mb-8">
              <span className="text-[10px] font-mono tracking-[0.25em] text-rose-900/60 uppercase">
                A PERSONAL LETTER // FOR ALURA
              </span>
              <p className="text-xs font-serif italic text-rose-950/70 mt-1">
                Written with sincerity and quiet care
              </p>
            </div>

            {/* Foundation Letter Body */}
            <div className="space-y-5 font-serif text-base sm:text-lg leading-relaxed text-[#2c1523] selection:bg-rose-200">
              {foundationLetter.map((paragraph, index) => {
                const isSalutation = index === 0;
                const isSignoff = index >= foundationLetter.length - 2;

                if (isSalutation) {
                  return (
                    <p key={index} className="text-xl sm:text-2xl font-medium text-rose-950 mb-6">
                      {paragraph}
                    </p>
                  );
                }

                if (isSignoff) {
                  return (
                    <p
                      key={index}
                      className="text-base sm:text-lg font-medium text-rose-950/90 pt-2"
                    >
                      {paragraph}
                    </p>
                  );
                }

                return (
                  <p key={index} className="text-stone-800 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Letter Footer watermark */}
            <div className="mt-12 pt-6 border-t border-rose-900/10 flex flex-wrap items-center justify-between text-[11px] font-mono tracking-widest text-rose-900/50 uppercase">
              <span>FOR GHISCCA ALURA NAZUA</span>
              <span>FOREVER REMEMBERED</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

