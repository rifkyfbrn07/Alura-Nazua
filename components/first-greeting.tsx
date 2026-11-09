"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, ArrowRight } from "lucide-react";
import { firstGreeting, recipientName } from "@/lib/love-story";

type FirstGreetingProps = {
  onEnter: () => void;
};

export default function FirstGreeting({ onEnter }: FirstGreetingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".greeting-title",
        { y: 25, opacity: 0, filter: reducedMotion ? "none" : "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: reducedMotion ? 0.2 : 1.1, delay: 0.2 }
      )
        .fromTo(
          ".greeting-lead",
          { y: 20, opacity: 0, filter: reducedMotion ? "none" : "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: reducedMotion ? 0.2 : 1.0 },
          "-=0.5"
        )
        .fromTo(
          ".greeting-sublead",
          { y: 15, opacity: 0, filter: reducedMotion ? "none" : "blur(4px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: reducedMotion ? 0.2 : 0.9 },
          "-=0.4"
        )
        .fromTo(
          ".greeting-button",
          { y: 15, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: reducedMotion ? 0.2 : 0.8, ease: "back.out(1.6)" },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnterClick = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    if (!container) {
      onEnter();
      return;
    }

    gsap.to(container, {
      opacity: 0,
      scale: reducedMotion ? 1 : 1.05,
      filter: reducedMotion ? "none" : "blur(12px)",
      duration: reducedMotion ? 0.15 : 0.85,
      ease: "power2.inOut",
      onComplete: () => {
        onEnter();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-[#070306]/95 backdrop-blur-xl select-none"
      role="dialog"
      aria-modal="true"
      aria-label={`Greeting for ${recipientName}`}
    >
      {/* Background radial atmosphere */}
      <div
        className="absolute w-[min(90vw,640px)] aspect-square rounded-full bg-gradient-to-tr from-rose-950/40 via-wine-900/20 to-transparent filter blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={cardRef}
        className="relative z-10 max-w-xl w-full flex flex-col items-center text-center px-4 py-8"
      >
        {/* Subtle decorative crest badge */}
        <div className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-rose-300 text-xs font-mono tracking-widest uppercase">
          <Sparkles size={12} className="text-rose-400" />
          <span>A Little World // For You</span>
        </div>

        {/* The first greeting sequence */}
        <h1 className="greeting-title font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-300 tracking-tight mb-5 leading-tight">
          {firstGreeting.greeting}
        </h1>

        <p className="greeting-lead text-lg sm:text-2xl text-rose-100/90 font-light mb-3 tracking-wide">
          {firstGreeting.lead}
        </p>

        <p className="greeting-sublead text-sm sm:text-base text-rose-200/60 font-light max-w-md mx-auto mb-10 leading-relaxed">
          {firstGreeting.sublead}
        </p>

        {/* Enter Button */}
        <button
          type="button"
          onClick={handleEnterClick}
          className="greeting-button group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-rose-400/40 bg-gradient-to-r from-rose-950/60 via-black to-rose-950/60 text-white font-medium tracking-wider text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,77,141,0.2)] hover:shadow-[0_0_30px_rgba(255,77,141,0.4)] hover:border-rose-300 hover:scale-105 active:scale-95"
        >
          <span>{firstGreeting.buttonLabel}</span>
          <ArrowRight
            size={16}
            className="text-rose-400 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        <span className="mt-8 text-[11px] font-mono tracking-widest text-rose-300/30 uppercase">
          RIFKY // FOR ALURA
        </span>
      </div>
    </div>
  );
}

