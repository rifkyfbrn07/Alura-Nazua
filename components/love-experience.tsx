"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { AudioPlayer, type AudioPlayerHandle } from "@/components/audio-player";
import PersonalizedPreloader from "@/components/personalized-preloader";
import FirstGreeting from "@/components/first-greeting";
import WorldHero from "@/components/world-hero";
import MemoryOrbit from "@/components/memory-orbit";
import LittleThings from "@/components/little-things";
import LittleToybox from "@/components/little-toybox";
import MemoryGallery from "@/components/memory-gallery";
import RelationshipTimeline from "@/components/relationship-timeline";
import LittlePromise from "@/components/little-promise";
import InteractiveLetter from "@/components/interactive-letter";
import PersonalizedEnding from "@/components/personalized-ending";
import CuteButterflies from "@/components/cute-butterflies";

type ExperiencePhase = "preloader" | "greeting" | "world";

export default function LoveExperience() {
  const [phase, setPhase] = useState<ExperiencePhase>("preloader");
  const audioPlayerRef = useRef<AudioPlayerHandle | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Setup Lenis smooth scroll
  useEffect(() => {
    if (phase !== "world") return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: reducedMotion ? 0.2 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [phase]);

  const handlePreloaderComplete = useCallback(() => {
    setPhase("greeting");
  }, []);

  const handleGreetingEnter = useCallback(() => {
    audioPlayerRef.current?.play();
    setPhase("world");
  }, []);

  return (
    <main className="relative min-h-screen bg-[#FFF7F5] text-[#702C43] selection:bg-[#F4D1D5] selection:text-[#702C43]">
      {/* Persistent Audio Manager */}
      <AudioPlayer ref={audioPlayerRef} autoPlayAttempt={true} />

      {/* Subtle Romantic Paper Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Phase 1: Blooming Lily Preloader */}
      {phase === "preloader" && (
        <PersonalizedPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* Phase 2: The Welcome Screen with Alura's Polaroid */}
      {phase === "greeting" && (
        <FirstGreeting onEnter={handleGreetingEnter} />
      )}

      {/* Phase 3: The Full Lily World */}
      {phase === "world" && (
        <div className="relative z-10 w-full animate-[fadeIn_0.8s_ease-out]">
          {/* Subtle Fluttering Butterflies across the page */}
          <CuteButterflies />

          {/* Scrapbook Cover & Hero */}
          <WorldHero />

          {/* Memory Constellation Orbit (Crucial preserved feature) */}
          <MemoryOrbit />

          {/* Section 6: The Little Things I Love About You (Alura's favorites) */}
          <LittleThings />

          {/* Section: OUR LITTLE TOYBOX (Interactive Photobooth Keepsakes) */}
          <LittleToybox />

          {/* Section 7: Our Little Moments (Scrapbook Polaroids & Filmstrip) */}
          <MemoryGallery />

          {/* Section 8: Our Story Timeline (Dynamic relationship counter) */}
          <RelationshipTimeline />

          {/* Section 9: A Little Promise */}
          <LittlePromise />

          {/* Section 10: Personal Letter in Wax-Sealed Ribbon Envelope */}
          <InteractiveLetter />

          {/* Section 11: Final Hopeful Scene */}
          <PersonalizedEnding />
        </div>
      )}
    </main>
  );
}
