"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Sparkles } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { foundationLetter, recipientName } from "@/lib/love-story";

export default function InteractiveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasCracked, setHasCracked] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);

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

    // 1. Camera approaches envelope
    tl.to(envelopeRef.current, { scale: 1.05, duration: 0.35, ease: "power2.out" })
      // 2. Ribbon slides
      .to(".envelope-ribbon", { x: -35, opacity: 0, duration: 0.4 }, "-=0.15")
      // 3. Wax seal cracks
      .to(".wax-crack", { scaleY: 1, opacity: 1, duration: 0.25 })
      .to(".wax-left", { x: -6, y: -2, rotation: -6, opacity: 0.7, duration: 0.3 }, "+=0.05")
      .to(".wax-right", { x: 6, y: 2, rotation: 6, opacity: 0.7, duration: 0.3 }, "<")
      // 4. Flap opens
      .to(".envelope-flap", {
        rotateX: 180,
        duration: 0.65,
        ease: "power2.inOut",
        transformOrigin: "top center",
      })
      // 5. Letter slides out
      .to(".letter-sheet-preview", { y: -130, duration: 0.6, ease: "power2.out" });
  };

  const handleClose = () => {
    setIsOpen(false);
    setHasCracked(false);
    gsap.set(envelopeRef.current, { scale: 1 });
    gsap.set(".envelope-ribbon", { x: 0, opacity: 1 });
    gsap.set(".wax-crack", { scaleY: 0, opacity: 0 });
    gsap.set(".wax-left, .wax-right", { x: 0, y: 0, rotation: 0, opacity: 1 });
    gsap.set(".envelope-flap", { rotateX: 0 });
    gsap.set(".letter-sheet-preview", { y: 0 });
  };

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center select-none">
      {/* Section Header */}
      <div className="mb-4 flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-[#A94F65]">
        <Sparkles size={12} className="text-[#D58C9C]" />
        <span>Personal Correspondence // For Alura</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] text-center mb-3 font-normal tracking-tight">
        A Personal Letter For You
      </h2>
      <p className="text-sm sm:text-base text-[#A94F65] max-w-md text-center mb-12 font-light">
        Written from the heart. Click the wax-sealed envelope to unfold what is inside.
      </p>

      {/* The Physical Ivory & Ribbon Envelope */}
      <div
        ref={envelopeRef}
        onClick={handleOpenLetter}
        className="group relative w-full max-w-[340px] sm:max-w-[420px] h-[220px] sm:h-[260px] cursor-pointer select-none perspective-1200"
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
        {/* Envelope Back Base (Warm Ivory with subtle shadow) */}
        <div className="absolute inset-0 bg-[#FFFDFB] rounded-2xl border border-[#F4D1D5] shadow-[0_15px_35px_rgba(112,44,67,0.12)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_45px_rgba(112,44,67,0.2)]">
          {/* Subtle interior blush lining */}
          <div className="absolute inset-2 rounded-xl bg-gradient-to-tr from-[#FCE8E8]/70 via-[#FFF7F5] to-[#FCE8E8]/70 border border-[#F4D1D5]/40" />
        </div>

        {/* Letter Preview Sheet sliding out */}
        <div
          className="letter-sheet-preview absolute left-6 right-6 top-6 bottom-4 rounded-xl bg-white shadow-sm flex flex-col p-5 pointer-events-none transition-transform"
          style={{ transformOrigin: "bottom center" }}
        >
          <div className="w-12 h-0.5 bg-[#D58C9C] mb-2" />
          <p className="font-serif italic text-xs text-[#702C43]/70">Dear Alura,</p>
          <div className="space-y-1.5 opacity-50 mt-2">
            <div className="h-1.5 bg-[#F4D1D5] rounded w-full" />
            <div className="h-1.5 bg-[#F4D1D5] rounded w-5/6" />
            <div className="h-1.5 bg-[#F4D1D5] rounded w-4/6" />
          </div>
        </div>

        {/* Envelope Front Pocket (Ivory Triangles) */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          <div
            className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#FFFDFB] border-r border-[#F4D1D5]/60 shadow-sm"
            style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
          />
          <div
            className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#FFFDFB] border-l border-[#F4D1D5]/60 shadow-sm"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-[60%] bg-[#FFF9F6] border-t border-[#F4D1D5]/60"
            style={{ clipPath: "polygon(0 100%, 50% 15%, 100% 100%)" }}
          />
        </div>

        {/* Pink Satin Ribbon wrapping envelope */}
        <div className="envelope-ribbon absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-[#F4D1D5] via-[#E8B5C0] to-[#F4D1D5] shadow-sm flex items-center justify-center pointer-events-none z-15 border-y border-[#D58C9C]/40">
          <span className="text-[9px] font-mono tracking-widest text-[#702C43]/70 uppercase">
            TIED WITH LOVE
          </span>
        </div>

        {/* Envelope Label */}
        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center justify-center pointer-events-none z-10 text-center">
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#A94F65] uppercase">
            A GIFT FOR
          </span>
          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#702C43] font-medium tracking-wide">
            To: Alura
          </h3>
          <span className="text-[9px] font-mono tracking-widest text-[#D58C9C] mt-0.5 uppercase">
            [ TAP TO OPEN ]
          </span>
        </div>

        {/* Envelope Flap (Top Triangle) */}
        <div
          className="envelope-flap absolute inset-x-0 top-0 h-[56%] z-20 pointer-events-none origin-top"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="w-full h-full bg-[#FFF5F2] shadow-md border-b border-[#F4D1D5]"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          />

          {/* Burgundy Wax Seal with Letter A */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-14 h-14 z-30 pointer-events-auto flex items-center justify-center">
            {/* Crack effect line */}
            <div
              className="wax-crack absolute inset-y-1 left-1/2 w-0.5 bg-white -translate-x-1/2 z-40 opacity-0 scale-y-0 rounded transition-transform"
              aria-hidden="true"
            />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#702C43] via-[#8B3D52] to-[#A94F65] shadow-[0_4px_12px_rgba(112,44,67,0.3)] border border-[#E8B5C0]/50 flex items-center justify-center overflow-hidden">
              <div className="wax-left absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-white font-medium text-lg select-none">A</span>
              </div>
              <div className="wax-right absolute inset-0" />
            </div>
          </div>
        </div>

        {/* Lily illustration stamped in top-left */}
        <div className="absolute top-3 left-3 pointer-events-none z-10 opacity-70">
          <PinkLily size={42} />
        </div>
      </div>

      {/* Expanded Modal: Unfolded Letter Paper */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#FFF7F5]/90 backdrop-blur-md animate-[fadeIn_0.4s_ease-out] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="A letter to Alura from Rifky"
        >
          <div className="relative w-full max-w-2xl bg-white text-[#702C43] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(112,44,67,0.18)] border border-[#F4D1D5] my-auto max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="sticky top-0 float-right -mr-2 -mt-2 p-2 rounded-full bg-[#FFF7F5] hover:bg-[#FCE8E8] text-[#702C43] transition-colors z-20 shadow-sm"
              aria-label="Close letter"
            >
              <X size={18} />
            </button>

            {/* Letterhead with Pink Lily */}
            <div className="border-b border-[#F4D1D5] pb-5 mb-8 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#A94F65] uppercase">
                  A PERSONAL LETTER // FOR ALURA
                </span>
                <p className="text-xs font-serif italic text-[#702C43]/70 mt-0.5">
                  Finding our way forward, together
                </p>
              </div>
              <PinkLily size={48} />
            </div>

            {/* Letter Body */}
            <div className="space-y-5 font-serif text-base sm:text-lg leading-relaxed text-[#702C43]/90">
              {foundationLetter.map((paragraph, index) => {
                const isSalutation = index === 0;
                const isSignoff = index >= foundationLetter.length - 2;

                if (isSalutation) {
                  return (
                    <p key={index} className="text-2xl sm:text-3xl font-medium text-[#702C43] mb-6">
                      {paragraph}
                    </p>
                  );
                }

                if (isSignoff) {
                  return (
                    <p key={index} className="text-lg font-medium text-[#702C43] pt-2">
                      {paragraph}
                    </p>
                  );
                }

                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-[#F4D1D5] flex items-center justify-between text-[10px] font-mono tracking-widest text-[#A94F65]/70 uppercase">
              <span>ALURA&apos;S LITTLE LILY WORLD</span>
              <span>FOREVER WITH LOVE</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
