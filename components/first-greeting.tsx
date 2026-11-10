"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { welcomeScreen, recipientName } from "@/lib/love-story";

type FirstGreetingProps = {
  onEnter: () => void;
};

export default function FirstGreeting({ onEnter }: FirstGreetingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".greeting-polaroid",
        { y: 30, opacity: 0, rotate: -4, scale: 0.95 },
        { y: 0, opacity: 1, rotate: -2, scale: 1, duration: reducedMotion ? 0.2 : 1.1 }
      )
        .fromTo(
          ".greeting-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: reducedMotion ? 0.2 : 0.9 },
          "-=0.6"
        )
        .fromTo(
          ".greeting-lead",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: reducedMotion ? 0.2 : 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".greeting-desc",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: reducedMotion ? 0.2 : 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".greeting-btn",
          { y: 15, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: reducedMotion ? 0.2 : 0.7, ease: "back.out(1.6)" },
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
      scale: reducedMotion ? 1 : 1.03,
      filter: reducedMotion ? "none" : "blur(8px)",
      duration: reducedMotion ? 0.2 : 0.75,
      ease: "power2.inOut",
      onComplete: onEnter,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-[#FFF7F5]/96 backdrop-blur-md select-none overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome greeting for ${recipientName}`}
    >
      {/* Soft background glow & decorative lily in corner */}
      <div className="absolute top-6 left-6 opacity-30 pointer-events-none hidden sm:block">
        <PinkLily size={90} />
      </div>
      <div className="absolute bottom-6 right-6 opacity-30 pointer-events-none hidden sm:block">
        <PinkLily size={90} />
      </div>

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center px-4 py-8 my-auto">
        {/* Real photo of Alura in a sweet romantic Polaroid */}
        <div className="greeting-polaroid relative mb-8">
          <div className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-28 -rotate-1" />
          <div className="polaroid-frame w-48 sm:w-56 -rotate-2 hover:rotate-0 transition-transform">
            <div className="relative w-full aspect-[4/5] rounded overflow-hidden bg-[#FCE8E8]">
              <Image
                src={welcomeScreen.featuredPhoto}
                alt="Portrait of Alura smiling"
                fill
                sizes="(max-width: 640px) 190px, 220px"
                className="object-cover"
                priority
              />
            </div>
            <p className="font-serif italic text-xs text-[#702C43]/80 pt-3 text-center">
              {welcomeScreen.photoCaption}
            </p>
          </div>
          {/* Lily accent pinned to Polaroid corner */}
          <div className="absolute -bottom-4 -right-4 pointer-events-none">
            <PinkLily size={48} />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D58C9C]/40 bg-[#FCE8E8]/70 text-[#702C43] text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles size={12} className="text-[#A94F65]" />
          <span>Alura&apos;s Little Lily World</span>
        </div>

        {/* Text sequence */}
        <h1 className="greeting-title font-serif text-3xl sm:text-5xl text-[#702C43] tracking-tight mb-2 font-normal">
          {welcomeScreen.greeting}
        </h1>

        <p className="greeting-lead font-serif italic text-xl sm:text-2xl text-[#A94F65] mb-3">
          {welcomeScreen.lead}
        </p>

        <p className="greeting-desc text-sm sm:text-base text-[#702C43]/80 font-light max-w-md mx-auto mb-8 leading-relaxed">
          {welcomeScreen.description}
        </p>

        {/* Enter Button */}
        <button
          type="button"
          onClick={handleEnterClick}
          className="greeting-btn group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#D58C9C] bg-gradient-to-r from-[#FCE8E8] via-[#FFFFFF] to-[#FCE8E8] text-[#702C43] font-medium tracking-wider text-sm transition-all duration-300 shadow-[0_8px_20px_rgba(169,79,101,0.15)] hover:shadow-[0_12px_28px_rgba(169,79,101,0.25)] hover:scale-105 active:scale-95"
        >
          <span>{welcomeScreen.buttonText}</span>
          <ArrowRight
            size={16}
            className="text-[#A94F65] transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        <span className="mt-8 text-[10px] font-mono tracking-widest text-[#A94F65]/50 uppercase">
          MADE WITH ALL MY HEART // RIFKY
        </span>
      </div>
    </div>
  );
}
