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
import AluraGarden from "@/components/alura-garden";
import LittleClawMachine from "@/components/claw-machine";
import MinuteWithYou from "@/components/minute-with-you";
import GacoanPhotobooth from "@/components/gacoan-photobooth";
import LittleToybox from "@/components/little-toybox";
import MysteryGiftBoxes from "@/components/mystery-gift-boxes";
import MemoryGallery from "@/components/memory-gallery";
import RelationshipTimeline from "@/components/relationship-timeline";
import RelationshipQuiz from "@/components/relationship-quiz";
import SecretMessageWall from "@/components/secret-message-wall";
import ScrapbookBuilder from "@/components/scrapbook-builder";
import YouAreMyMoon from "@/components/you-are-my-moon";
import LittleWishingWell from "@/components/wishing-well";
import MusicCorner from "@/components/music-corner";
import LittlePromise from "@/components/little-promise";
import InteractiveLetter from "@/components/interactive-letter";
import OneLastSecret from "@/components/one-last-secret";
import PersonalizedEnding from "@/components/personalized-ending";
import CuteButterflies from "@/components/cute-butterflies";
import HiddenLiliesManager from "@/components/hidden-lilies-manager";
import CollectionAlbum from "@/components/collection-album";
import SurpriseVisitor from "@/components/surprise-visitor";
import WorldPortalNav from "@/components/world-portal-nav";
import MemoryGachapon from "@/components/memory-gachapon";
import CouplePhotoStudio from "@/components/couple-photo-studio";
import OpenWhenLetters from "@/components/open-when-letters";
import DailyLoveNote from "@/components/daily-love-note";

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

          {/* Hidden Lilies Manager & Tracker */}
          <HiddenLiliesManager />

          {/* Floating Collection Album & Badge Unlocked Toasts */}
          <CollectionAlbum />

          {/* Surprise Butterfly Visitor */}
          <SurpriseVisitor />

          {/* Scrapbook Cover & Hero */}
          <WorldHero />

          {/* Memory Constellation Orbit (Crucial preserved feature) */}
          <MemoryOrbit />

          {/* World Passport Navigation Hub to 4 Interactive Rooms */}
          <WorldPortalNav />

          {/* Section 6: The Little Things I Love About You (Alura's favorites) */}
          <LittleThings />

          {/* Section: ALURA'S LITTLE GARDEN 🌷 & CATCH THE BUTTERFLIES 🦋 */}
          <AluraGarden />

          {/* Section: THE LITTLE CLAW MACHINE 🎀 */}
          <LittleClawMachine />

          {/* Feature 1: OUR LITTLE MEMORY GACHAPON 🎀 */}
          <MemoryGachapon />

          {/* Section A: Every Minute With You (Live time ticker & reflections) */}
          <MinuteWithYou />

          {/* Section: OUR LITTLE GACOAN MEMORY (Photobooth Keepsakes) */}
          <GacoanPhotobooth />

          {/* Section 7: OUR LITTLE TOYBOX (Pastel Keepsake Box) */}
          <LittleToybox />

          {/* Feature 2: COUPLE PHOTO STUDIO 📸 */}
          <CouplePhotoStudio />

          {/* Section: THE MYSTERY GIFT BOXES 🎁 */}
          <MysteryGiftBoxes />

          {/* Section 8: Our Little Moments (Scrapbook Polaroids & Filmstrip) */}
          <MemoryGallery />

          {/* Section 9: Our Story Timeline (Dynamic relationship counter) */}
          <RelationshipTimeline />

          {/* Feature 4: DAILY LOVE NOTE 🌷 (A Little Note for Today) */}
          <DailyLoveNote />

          {/* Section: HOW WELL DO YOU KNOW US? 💗 */}
          <RelationshipQuiz />

          {/* Section: THE SECRET MESSAGE WALL 💌 */}
          <SecretMessageWall />

          {/* Section: BUILD OUR LITTLE MEMORY SCRAPBOOK 📸 */}
          <ScrapbookBuilder />

          {/* Section D: You Are My Moon (Night sky with glowing moon) */}
          <YouAreMyMoon />

          {/* Feature 3: OPEN WHEN... LETTERS 💌 */}
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
