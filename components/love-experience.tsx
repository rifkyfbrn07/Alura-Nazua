"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { AudioPlayer, type AudioPlayerHandle } from "@/components/audio-player";
import PersonalizedPreloader from "@/components/personalized-preloader";
import FirstGreeting from "@/components/first-greeting";
import WorldHero from "@/components/world-hero";
import MemoryOrbit from "@/components/memory-orbit";
import WorldPortalNav from "@/components/world-portal-nav";
import LittleThings from "@/components/little-things";
import MinuteWithYou from "@/components/minute-with-you";
import GacoanPhotobooth from "@/components/gacoan-photobooth";
import LittleToybox from "@/components/little-toybox";
import MemoryGallery from "@/components/memory-gallery";
import RelationshipTimeline from "@/components/relationship-timeline";
import YouAreMyMoon from "@/components/you-are-my-moon";
import LittlePromise from "@/components/little-promise";
import InteractiveLetter from "@/components/interactive-letter";
import PersonalizedEnding from "@/components/personalized-ending";
import CuteButterflies from "@/components/cute-butterflies";
import HiddenLiliesManager from "@/components/hidden-lilies-manager";

// Lazy-loaded interactive components for optimal loading and 60fps performance
const PinkPhotobooth = dynamic(
  () => import("@/components/pink-photobooth/pink-photobooth"),
  {
    ssr: false,
    loading: () => <div className="min-h-[400px]" />,
  }
);

const AluraGarden = dynamic(() => import("@/components/alura-garden"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const LittleClawMachine = dynamic(() => import("@/components/claw-machine"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const MemoryGachapon = dynamic(() => import("@/components/memory-gachapon"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const CouplePhotoStudio = dynamic(() => import("@/components/couple-photo-studio"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const MysteryGiftBoxes = dynamic(() => import("@/components/mystery-gift-boxes"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const RelationshipQuiz = dynamic(() => import("@/components/relationship-quiz"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const SecretMessageWall = dynamic(() => import("@/components/secret-message-wall"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const ScrapbookBuilder = dynamic(() => import("@/components/scrapbook-builder"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const LittleWishingWell = dynamic(() => import("@/components/wishing-well"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const MusicCorner = dynamic(() => import("@/components/music-corner"), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" />,
});

const OpenWhenLetters = dynamic(() => import("@/components/open-when-letters"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const DailyLoveNote = dynamic(() => import("@/components/daily-love-note"), {
  ssr: false,
  loading: () => <div className="min-h-[250px]" />,
});

const OneLastSecret = dynamic(() => import("@/components/one-last-secret"), {
  ssr: false,
  loading: () => <div className="min-h-[100px]" />,
});

const CollectionAlbum = dynamic(() => import("@/components/collection-album"), {
  ssr: false,
});

const SurpriseVisitor = dynamic(() => import("@/components/surprise-visitor"), {
  ssr: false,
});

type ExperiencePhase = "preloader" | "greeting" | "world";

export default function LoveExperience() {
  const [phase, setPhase] = useState<ExperiencePhase>("preloader");
  const audioPlayerRef = useRef<AudioPlayerHandle | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Setup Lenis smooth scroll tuned for high-refresh displays & touch devices
  useEffect(() => {
    if (phase !== "world") return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      duration: reducedMotion ? 0.2 : isTouch ? 0.7 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    // Restore default lag smoothing to eliminate micro-stutters
    gsap.ticker.lagSmoothing(500, 33);

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

      {/* Subtle Romantic Paper Grain Overlay (Hardware accelerated) */}
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
        <div className="relative z-10 w-full animate-[fadeIn_0.6s_ease-out]">
          {/* Hardware-accelerated fluttering butterflies */}
          <CuteButterflies />

          {/* Hidden Lilies Manager & Tracker */}
          <HiddenLiliesManager />

          {/* Floating Collection Album & Badge Toasts */}
          <CollectionAlbum />

          {/* Surprise Butterfly Visitor */}
          <SurpriseVisitor />

          {/* Scrapbook Cover & Hero */}
          <WorldHero />

          {/* Memory Constellation Orbit (Optimized 3D layout) */}
          <MemoryOrbit />

          {/* World Passport Navigation Hub (Quick jump to all 5 interactive destinations) */}
          <WorldPortalNav />

          {/* NEW FEATURE: ALURA'S PINK PHOTOBOOTH (Real Camera, 12 Frames, Filters & Print Export) */}
          <PinkPhotobooth />

          {/* Section 6: The Little Things I Love About You (Alura's favorites) */}
          <LittleThings />

          {/* Section: ALURA'S LITTLE GARDEN 🌷 & CATCH THE BUTTERFLIES 🦋 */}
          <AluraGarden />

          {/* Section: THE LITTLE CLAW MACHINE 🎀 */}
          <LittleClawMachine />

          {/* Section: OUR LITTLE MEMORY GACHAPON 🎀 */}
          <MemoryGachapon />

          {/* Section A: Every Minute With You (Live time ticker & reflections) */}
          <MinuteWithYou />

          {/* Section: OUR LITTLE GACOAN MEMORY (Photobooth Keepsakes) */}
          <GacoanPhotobooth />

          {/* Section 7: OUR LITTLE TOYBOX (Pastel Keepsake Box) */}
          <LittleToybox />

          {/* Section: COUPLE PHOTO STUDIO 📸 (Decorate curated memories) */}
          <CouplePhotoStudio />

          {/* Section: THE MYSTERY GIFT BOXES 🎁 */}
          <MysteryGiftBoxes />

          {/* Section 8: Our Little Moments (Scrapbook Polaroids & Filmstrip) */}
          <MemoryGallery />

          {/* Section 9: Our Story Timeline (Dynamic relationship counter) */}
          <RelationshipTimeline />

          {/* Section: DAILY LOVE NOTE 🌷 (A Little Note for Today) */}
          <DailyLoveNote />

          {/* Section: HOW WELL DO YOU KNOW US? 💗 */}
          <RelationshipQuiz />

          {/* Section: THE SECRET MESSAGE WALL 💌 */}
          <SecretMessageWall />

          {/* Section: BUILD OUR LITTLE MEMORY SCRAPBOOK 📸 */}
          <ScrapbookBuilder />

          {/* Section D: You Are My Moon (Night sky with glowing moon) */}
          <YouAreMyMoon />

          {/* Section: OPEN WHEN... LETTERS 💌 */}
          <OpenWhenLetters />

          {/* Section: A LITTLE WISHING WELL ✨ */}
          <LittleWishingWell />

          {/* Section: THE LITTLE MUSIC CORNER 🎧 */}
          <MusicCorner />

          {/* Section: A Little Promise */}
          <LittlePromise />

          {/* Section 10: Personal Letter in Wax-Sealed Ribbon Envelope with 7 Chapters */}
          <InteractiveLetter />

          {/* Section: ONE LAST LITTLE SURPRISE... 💌 */}
          <OneLastSecret />

          {/* Section 11 / E: Final Hopeful Scene — Our Next Chapter */}
          <PersonalizedEnding />
        </div>
      )}
    </main>
  );
}
