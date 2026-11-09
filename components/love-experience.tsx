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
import MemoryGallery from "@/components/memory-gallery";
import InteractiveLetter from "@/components/interactive-letter";
import PersonalizedEnding from "@/components/personalized-ending";

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
      duration: reducedMotion ? 0.2 : 1.2,
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
    // Attempt playback on first explicit user enter
    audioPlayerRef.current?.play();
    setPhase("world");
  }, []);

  return (
    <main className="relative min-h-screen bg-[#070306] text-white selection:bg-rose-500/30 selection:text-white">
      {/* Persistent Audio Manager */}
      <AudioPlayer ref={audioPlayerRef} autoPlayAttempt={true} />

      {/* Subtle Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Ambient background glow */}
      <div
        className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,15,45,0.25),rgba(255,255,255,0))] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Phase 1: Cinematic Personalized Preloader */}
      {phase === "preloader" && (
        <PersonalizedPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* Phase 2: The First Greeting Modal */}
      {phase === "greeting" && (
        <FirstGreeting onEnter={handleGreetingEnter} />
      )}

      {/* Phase 3: The Full World */}
      {phase === "world" && (
        <div className="relative z-10 w-full animate-[fadeIn_0.8s_ease-out]">
          {/* Hero Section */}
          <WorldHero />

          {/* Interactive Memory Constellation & 3D Orbit */}
          <MemoryOrbit />

          {/* Sincere Memory Gallery Cards */}
          <MemoryGallery />

          {/* Interactive Physical Letter & Foundation Message */}
          <InteractiveLetter />

          {/* Personalized Quiet Ending */}
          <PersonalizedEnding />
        </div>
      )}
    </main>
  );
}
