"use client";

import { useState, useEffect, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { Sparkles, RotateCw, Heart, X, Trophy, Gift, ArrowRight } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPopSound, playSparkleSound, playChimeWin } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

import coupleSweetPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29.jpeg";
import coupleGacoanTablet1 from "@/image/WhatsApp Image 2026-11-10 at 09.33.27 (1).jpeg";
import coupleNightPhoto from "@/image/berdua.jpeg";
import cantikPortrait from "@/image/cantik.jpeg";
import labBoxStripScreen from "@/image/WhatsApp Image 2026-11-10 at 09.33.24 (1).jpeg";

type GachaItem = {
  id: string;
  capsuleColor: string;
  capsuleAccent: string;
  sticker: string;
  title: string;
  type: "photo" | "note" | "compliment" | "memory" | "hope";
  message: string;
  photo?: StaticImageData;
  photoCaption?: string;
};

const GACHA_ITEMS: GachaItem[] = [
  {
    id: "gacha-1",
    capsuleColor: "#FCE8E8",
    capsuleAccent: "#A94F65",
    sticker: "🎀",
    title: "Sweet Selfie Together",
    type: "photo",
    message: "Right beside you is my absolute favorite place to be. Every frame of us brings so much warmth.",
    photo: coupleSweetPhoto,
    photoCaption: "Our sweet moment together",
  },
  {
    id: "gacha-2",
    capsuleColor: "#FFF0F2",
    capsuleAccent: "#D58C9C",
    sticker: "✨",
    title: "Gentle Radiance",
    type: "compliment",
    message: "Your gentle kindness and glowing smile light up my entire day. You make everything feel so soft.",
  },
  {
    id: "gacha-3",
    capsuleColor: "#F4D1D5",
    capsuleAccent: "#702C43",
    sticker: "🍜",
    title: "Our Gacoan Afternoon",
    type: "memory",
    message: "Proof that an ordinary afternoon having noodles can become an unforgettable memory filled with laughs.",
    photo: coupleGacoanTablet1,
    photoCaption: "Mie Gacoan memories",
  },
  {
    id: "gacha-4",
    capsuleColor: "#E8B5C0",
    capsuleAccent: "#A94F65",
    sticker: "💌",
    title: "A Little Love Note",
    type: "note",
    message: "I love the way we understand each other without needing many words. Having you is the sweetest gift.",
  },
  {
    id: "gacha-5",
    capsuleColor: "#FFF7F5",
    capsuleAccent: "#D58C9C",
    sticker: "🌟",
    title: "Future Hope",
    type: "hope",
    message: "I hope we keep filling thousands more pages of our story together, visiting quiet places and smiling side by side.",
  },
  {
    id: "gacha-6",
    capsuleColor: "#FDE2E8",
    capsuleAccent: "#A94F65",
    sticker: "🌷",
    title: "Alura's Soft Warmth",
    type: "photo",
    message: "The most beautiful smile in the world, effortlessly glowing and bringing peace wherever you go.",
    photo: cantikPortrait,
    photoCaption: "Alura's gentle smile",
  },
  {
    id: "gacha-7",
    capsuleColor: "#FCE8E8",
    capsuleAccent: "#702C43",
    sticker: "🌙",
    title: "Quiet Night Under the Moon",
    type: "memory",
    message: "Under the quiet night sky, sitting close and wishing the hours wouldn't pass so quickly.",
    photo: coupleNightPhoto,
    photoCaption: "Quiet evening with you",
  },
  {
    id: "gacha-8",
    capsuleColor: "#FFF9E6",
    capsuleAccent: "#E5A93C",
    sticker: "⭐",
    title: "Photobooth Keepsake",
    type: "memory",
    message: "Matching bucket hats, silly takes, and forever memories held in our hands.",
    photo: labBoxStripScreen,
    photoCaption: "Matching bucket hats at the booth",
  },
];

const STORAGE_KEY = "alura_gacha_collected_ids";

export default function MemoryGachapon() {
  const [collectedIds, setCollectedIds] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeCapsule, setActiveCapsule] = useState<GachaItem | null>(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [capsuleOpening, setCapsuleOpening] = useState(false);
  const [showFullCollection, setShowFullCollection] = useState(false);
  const [dialRotation, setDialRotation] = useState(0);

  // Load collection from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setCollectedIds(JSON.parse(raw));
      }
    } catch {}
  }, []);

  const saveCollected = (nextIds: string[]) => {
    setCollectedIds(nextIds);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));
    } catch {}
  };

  // Turn crank and dispense capsule
  const handleTurnCrank = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    playPopSound();

    // 1. Rotate the physical crank dial 360 deg
    setDialRotation((prev) => prev + 360);

    // 2. Determine next capsule (prioritize uncollected items for fair rewards)
    const uncollected = GACHA_ITEMS.filter((item) => !collectedIds.includes(item.id));
    const nextPrize =
      uncollected.length > 0
        ? uncollected[Math.floor(Math.random() * uncollected.length)]
        : GACHA_ITEMS[Math.floor(Math.random() * GACHA_ITEMS.length)];

    // 3. Machine jiggles and capsule drops after 900ms
    setTimeout(() => {
      playSparkleSound();
      setActiveCapsule(nextPrize);
      setCapsuleOpening(true);

      // Save collection
      if (!collectedIds.includes(nextPrize.id)) {
        const updated = [...collectedIds, nextPrize.id];
        saveCollected(updated);
        if (updated.length === GACHA_ITEMS.length) {
          playChimeWin();
        }
      }
    }, 900);

    // 4. Reveal prize modal
    setTimeout(() => {
      setShowPrizeModal(true);
      setCapsuleOpening(false);
      setIsSpinning(false);
      playChimeWin();
      unlockBadge("gachapon");
    }, 1700);
  }, [isSpinning, collectedIds]);

  const handleClosePrizeModal = useCallback(() => {
    playPopSound();
    setShowPrizeModal(false);
    setActiveCapsule(null);
  }, []);

  const handleOpenCapsuleFromAlbum = useCallback((item: GachaItem) => {
    playPopSound();
    setActiveCapsule(item);
    setShowPrizeModal(true);
  }, []);

  const handleResetCollection = useCallback(() => {
    playPopSound();
    saveCollected([]);
  }, []);

  const isCollectionComplete = collectedIds.length === GACHA_ITEMS.length;

  return (
    <section
      id="memory-gachapon"
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none"
    >
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Surprise Dispenser // Keepsake Capsules
          </span>
          <span className="text-sm">🎀</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          Our Little Memory Gachapon
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          Turn the golden crank to drop a pastel capsule filled with secret polaroids, sweet compliments, and cherished moments.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={40} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center max-w-5xl mx-auto">
        {/* Left Column: The 3D Gachapon Machine */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            className={`relative w-72 sm:w-80 rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_25px_60px_-15px_rgba(169,79,101,0.3)] p-6 flex flex-col items-center transition-all ${
              isSpinning ? "animate-[gentleFloat_0.3s_ease-in-out_infinite]" : ""
            }`}
          >
            {/* Top Sign */}
            <div className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#A94F65] via-[#D58C9C] to-[#A94F65] text-white text-center shadow-xs border border-white/70 mb-4">
              <span className="font-serif italic font-medium text-sm sm:text-base tracking-wide">
                Alura&apos;s Memory Gachapon
              </span>
            </div>

            {/* Transparent Globe Dome filled with Capsules */}
            <div className="relative w-56 h-56 rounded-full bg-gradient-to-b from-white/95 via-white/80 to-[#FCE8E8]/70 border-4 border-[#E8B5C0] shadow-inner overflow-hidden flex items-center justify-center p-3">
              {/* Glass Reflection shine */}
              <div
                className="absolute -top-10 -left-10 w-40 h-72 bg-white/45 rotate-35 pointer-events-none blur-xs"
                aria-hidden="true"
              />

              {/* Floating Capsules inside Globe */}
              <div className="relative w-full h-full flex flex-wrap items-center justify-around p-2 gap-1.5">
                {GACHA_ITEMS.slice(0, 7).map((item, i) => (
                  <div
                    key={item.id}
                    className="w-11 h-11 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-lg animate-[float_4s_ease-in-out_infinite]"
                    style={{
                      backgroundColor: item.capsuleColor,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    <span>{item.sticker}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Mechanism: Turn Crank Dial */}
            <div className="mt-5 flex flex-col items-center">
              <button
                type="button"
                onClick={handleTurnCrank}
                disabled={isSpinning}
                className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#702C43] via-[#A94F65] to-[#D58C9C] border-4 border-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                aria-label="Turn Gachapon crank"
              >
                {/* Dial crossbar */}
                <div
                  className="w-14 h-3 bg-white/90 rounded-full shadow-xs flex items-center justify-between px-1 transition-transform duration-700 ease-out"
                  style={{ transform: `rotate(${dialRotation}deg)` }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#A94F65]" />
                  <div className="w-2 h-2 rounded-full bg-[#A94F65]" />
                </div>
              </button>

              <button
                type="button"
                onClick={handleTurnCrank}
                disabled={isSpinning}
                className="mt-3 px-6 py-2 rounded-full bg-[#A94F65] text-white text-xs font-serif font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
              >
                {isSpinning ? "TURNING CRANK..." : "GET A LITTLE MEMORY 🎀"}
              </button>
            </div>

            {/* Bottom Capsule Drop Chute */}
            <div className="mt-5 w-32 h-14 rounded-2xl bg-gradient-to-b from-[#702C43]/20 to-white/90 border-2 border-[#D58C9C] shadow-inner flex items-center justify-center relative overflow-hidden">
              {capsuleOpening && activeCapsule ? (
                <div className="animate-bounce">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center text-lg animate-spin"
                    style={{ backgroundColor: activeCapsule.capsuleColor }}
                  >
                    {activeCapsule.sticker}
                  </div>
                </div>
              ) : (
                <span className="text-[10px] font-mono tracking-widest text-[#702C43]/70 uppercase">
                  DROP TRAY
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Capsule Collection Shelf */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8B5C0] shadow-sm">
            <div className="flex items-center justify-between border-b border-[#F4D1D5] pb-4 mb-5">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#A94F65] uppercase block">
                  CAPSULE ALBUM
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#702C43] font-medium">
                  Collected Keepsakes
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FFF0F2] border border-[#D58C9C] text-xs font-mono font-medium text-[#702C43]">
                  {collectedIds.length} / {GACHA_ITEMS.length}
                </span>
              </div>
            </div>

            {/* Completed Collection Celebration Banner */}
            {isCollectionComplete && (
              <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-[#FFF0F2] via-[#FCE8E8] to-[#FFF0F2] border border-[#D58C9C] text-center animate-[fadeIn_0.4s_ease-out]">
                <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#A94F65] font-semibold uppercase mb-1">
                  <Trophy size={14} />
                  <span>All 8 Capsules Discovered!</span>
                </div>
                <p className="font-serif italic text-sm text-[#702C43]">
                  &ldquo;You unlocked every little memory in this machine. You can reopen any capsule anytime!&rdquo;
                </p>
                <button
                  type="button"
                  onClick={handleResetCollection}
                  className="mt-2.5 px-3 py-1 rounded-full bg-white text-[11px] font-mono text-[#702C43] border border-[#E8B5C0] hover:bg-[#FCE8E8] transition-all"
                >
                  Spin Again From Scratch
                </button>
              </div>
            )}

            {/* Grid of 8 Capsules */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {GACHA_ITEMS.map((item, idx) => {
                const isCollected = collectedIds.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => isCollected && handleOpenCapsuleFromAlbum(item)}
                    disabled={!isCollected}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                      isCollected
                        ? "bg-[#FFF7F5] border-[#D58C9C] hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                        : "bg-white/40 border-dashed border-[#F4D1D5] opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xl mb-1.5"
                      style={{
                        backgroundColor: isCollected ? item.capsuleColor : "#E8E8E8",
                      }}
                    >
                      {isCollected ? item.sticker : "🔒"}
                    </div>
                    <span className="font-serif italic text-xs text-[#702C43] truncate w-full">
                      {isCollected ? item.title : `Capsule #${idx + 1}`}
                    </span>
                    <span className="text-[9px] font-mono text-[#A94F65] mt-0.5">
                      {isCollected ? "Tap to view" : "Locked"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* PRIZE REVEAL MODAL */}
      {showPrizeModal && activeCapsule && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={activeCapsule.title}
        >
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-[#FCE8E8] shadow-[0_25px_60px_rgba(112,44,67,0.35)] animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            <button
              type="button"
              onClick={handleClosePrizeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#FCE8E8] text-[#A94F65] text-xs font-mono uppercase tracking-widest mb-3">
              🎉 GACHAPON SURPRISE
            </span>

            {/* Photo preview if available */}
            {activeCapsule.photo && (
              <div className="relative w-48 aspect-[4/5] mx-auto rounded-xl overflow-hidden bg-[#FCE8E8] shadow-md border-2 border-white mb-4">
                <Image
                  src={activeCapsule.photo}
                  alt={activeCapsule.title}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            )}

            <h3 className="font-serif text-2xl text-[#702C43] font-medium mb-2">
              {activeCapsule.title}
            </h3>

            <p className="font-serif italic text-base sm:text-lg text-[#702C43]/90 leading-relaxed mb-6">
              &ldquo;{activeCapsule.message}&rdquo;
            </p>

            <button
              type="button"
              onClick={handleClosePrizeModal}
              className="w-full py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              Put into my album 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
