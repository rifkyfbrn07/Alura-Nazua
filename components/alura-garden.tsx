"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Sparkles, Droplets, Heart, RotateCcw, Trophy, Play, CheckCircle } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playWaterDrop, playSparkleSound, playChimeWin, playPopSound } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

type GardenFlower = {
  id: string;
  name: string;
  bloomStage: number; // 0: bud, 1: half, 2: fully bloomed
  message: string;
  waterCount: number;
  rotation: number;
};

const INITIAL_FLOWERS: GardenFlower[] = [
  {
    id: "flower-1",
    name: "Soft Whispers Lily",
    bloomStage: 1,
    waterCount: 1,
    rotation: -4,
    message: "Just a little reminder that you're loved, always and genuinely.",
  },
  {
    id: "flower-2",
    name: "Sweet Radiance Lily",
    bloomStage: 0,
    waterCount: 0,
    rotation: 3,
    message: "You're one of my favorite parts of every day.",
  },
  {
    id: "flower-3",
    name: "Cherished Moments Lily",
    bloomStage: 1,
    waterCount: 1,
    rotation: -2,
    message: "Even the smallest moments with you mean the absolute world to me.",
  },
  {
    id: "flower-4",
    name: "Bright Laughter Lily",
    bloomStage: 0,
    waterCount: 0,
    rotation: 5,
    message: "Your laughter is my favorite sound in any room.",
  },
  {
    id: "flower-5",
    name: "Everlasting Petal",
    bloomStage: 0,
    waterCount: 0,
    rotation: -3,
    message: "Every day with you is another page I want to keep forever.",
  },
];

type GameButterfly = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  caught: boolean;
};

export default function AluraGarden() {
  const [activeTab, setActiveTab] = useState<"garden" | "butterflies">("garden");
  const [flowers, setFlowers] = useState<GardenFlower[]>(INITIAL_FLOWERS);
  const [isWateringCanActive, setIsWateringCanActive] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [waterRipplePos, setWaterRipplePos] = useState<{ x: number; y: number } | null>(null);

  // Butterfly mini-game states
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [butterflies, setButterflies] = useState<GameButterfly[]>([]);
  const [gameWon, setGameWon] = useState(false);

  // Water flower interaction
  const handleWaterFlower = useCallback((flowerId: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setWaterRipplePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setTimeout(() => setWaterRipplePos(null), 600);

    playWaterDrop();

    setFlowers((prev) =>
      prev.map((f) => {
        if (f.id === flowerId) {
          const nextCount = f.waterCount + 1;
          const nextStage = Math.min(2, f.bloomStage + 1);
          if (nextStage === 2) {
            playSparkleSound();
          }
          return {
            ...f,
            waterCount: nextCount,
            bloomStage: nextStage,
          };
        }
        return f;
      })
    );

    // Check if all flowers bloomed
    setTimeout(() => {
      setFlowers((current) => {
        const allBloomed = current.every((f) => f.bloomStage === 2);
        if (allBloomed) {
          unlockBadge("garden");
          playChimeWin();
        }
        return current;
      });
    }, 400);

    // Show flower message
    const target = flowers.find((f) => f.id === flowerId);
    if (target) {
      setSelectedMessage(target.message);
    }
  }, [flowers]);

  // BUTTERFLY GAME ENGINE
  const spawnButterflies = useCallback(() => {
    const colors = ["#F4D1D5", "#E8B5C0", "#D58C9C", "#FCE8E8", "#FFF0F2"];
    const list: GameButterfly[] = [];
    for (let i = 0; i < 8; i++) {
      list.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        color: colors[i % colors.length],
        size: Math.random() * 8 + 22,
        caught: false,
      });
    }
    setButterflies(list);
  }, []);

  const startButterflyGame = useCallback(() => {
    playPopSound();
    setScore(0);
    setTimeLeft(30);
    setGameWon(false);
    setGameStarted(true);
    spawnButterflies();
  }, [spawnButterflies]);

  // Timer loop
  useEffect(() => {
    if (!gameStarted || gameWon) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Continuous flutter movement for butterflies
  useEffect(() => {
    if (!gameStarted || gameWon) return;
    const flutterInterval = setInterval(() => {
      setButterflies((prev) =>
        prev.map((b) => {
          if (b.caught) return b;
          return {
            ...b,
            x: Math.max(8, Math.min(92, b.x + (Math.random() * 12 - 6))),
            y: Math.max(10, Math.min(85, b.y + (Math.random() * 12 - 6))),
          };
        })
      );
    }, 600);
    return () => clearInterval(flutterInterval);
  }, [gameStarted, gameWon]);

  const handleCatchButterfly = useCallback((id: number) => {
    playPopSound();
    playSparkleSound();
    setButterflies((prev) =>
      prev.map((b) => (b.id === id ? { ...b, caught: true } : b))
    );
    setScore((prev) => {
      const next = prev + 1;
      if (next >= 6) {
        setGameWon(true);
        setGameStarted(false);
        playChimeWin();
        unlockBadge("butterflies");
      }
      return next;
    });
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none overflow-hidden">
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Section 08 // Botanical Meadow
          </span>
          <span className="text-sm">🌷</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          Alura&apos;s Little Garden
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          A blooming meadow where lilies grow, butterflies dance, and secret love notes hide.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab("garden");
            }}
            className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
              activeTab === "garden"
                ? "bg-[#702C43] text-white shadow-md scale-105"
                : "bg-white/80 text-[#702C43] border border-[#E8B5C0] hover:bg-[#FCE8E8]"
            }`}
          >
            🌷 Garden Stroll &amp; Watering
          </button>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab("butterflies");
            }}
            className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
              activeTab === "butterflies"
                ? "bg-[#702C43] text-white shadow-md scale-105"
                : "bg-white/80 text-[#702C43] border border-[#E8B5C0] hover:bg-[#FCE8E8]"
            }`}
          >
            🦋 Catch the Butterflies
          </button>
        </div>
      </div>

      {/* VIEW 1: THE INTERACTIVE BLOOMING GARDEN */}
      {activeTab === "garden" && (
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.25)] p-6 sm:p-10 overflow-hidden">
          
          {/* Garden Control Bar */}
          <div className="flex items-center justify-between border-b border-[#E8B5C0]/60 pb-4 mb-6">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setIsWateringCanActive((prev) => !prev);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                isWateringCanActive
                  ? "bg-[#A94F65] text-white border-[#702C43] shadow-md scale-105"
                  : "bg-white text-[#702C43] border-[#D58C9C] hover:bg-[#FCE8E8]"
              }`}
            >
              <Droplets size={14} className={isWateringCanActive ? "animate-bounce" : ""} />
              <span>{isWateringCanActive ? "Watering Can Ready!" : "Pick Up Watering Can 💧"}</span>
            </button>

            <span className="text-[11px] font-mono text-[#A94F65]">
              Tap any flower to water &amp; bloom
            </span>
          </div>

          {/* Garden Bed with 5 Interactive Lilies */}
          <div className="relative min-h-[300px] sm:min-h-[340px] rounded-2xl bg-gradient-to-b from-white/90 via-[#FFF9FA] to-[#FCE8E8]/60 border-2 border-white p-6 flex flex-wrap items-end justify-around gap-6">
            
            {flowers.map((fl) => {
              const isBloomed = fl.bloomStage === 2;
              const isHalf = fl.bloomStage === 1;

              return (
                <div
                  key={fl.id}
                  onClick={(e) => handleWaterFlower(fl.id, e)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Water ${fl.name}`}
                  className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                  style={{ transform: `rotate(${fl.rotation}deg)` }}
                >
                  {/* Floating Butterfly landing on bloomed flower */}
                  {isBloomed && (
                    <span className="absolute -top-7 text-sm animate-[float_4s_ease-in-out_infinite] drop-shadow-xs">
                      🦋
                    </span>
                  )}

                  {/* The Lily Graphic at dynamic size depending on bloom */}
                  <div className="relative">
                    <PinkLily size={isBloomed ? 66 : isHalf ? 48 : 36} />
                  </div>

                  {/* Stem and Soil Mound */}
                  <div className="w-1.5 h-6 bg-[#A94F65]/40 rounded-full mt-1" />
                  <div className="w-12 h-3 bg-[#702C43]/15 rounded-full blur-xs -mt-1" />

                  {/* Flower Name Tag */}
                  <div className="mt-2 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#E8B5C0] text-[10px] font-mono text-[#702C43] shadow-xs">
                    {isBloomed ? "✦ Fully Bloomed" : isHalf ? "🌱 Blooming..." : "🌿 Fresh Bud"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Revealed Secret Message Note */}
          {selectedMessage && (
            <div className="mt-6 p-4 rounded-2xl bg-white/95 border border-[#D58C9C] shadow-sm flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
              <span className="text-xl">💌</span>
              <div className="flex-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A94F65] block">
                  Garden Whispers For Alura
                </span>
                <p className="font-serif italic text-base sm:text-lg text-[#702C43] mt-0.5">
                  &ldquo;{selectedMessage}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Garden Footer */}
          <div className="mt-6 pt-4 border-t border-[#E8B5C0]/40 flex items-center justify-between text-xs text-[#702C43]/70 font-sans">
            <span className="flex items-center gap-1.5">
              <Heart size={12} className="text-[#A94F65] fill-current" />
              Bloomed flowers: {flowers.filter((f) => f.bloomStage === 2).length} / 5
            </span>
            <span className="font-mono text-[11px] text-[#A94F65]">
              ALURA&apos;S PRIVATE BOTANICAL CORNER
            </span>
          </div>
        </div>
      )}

      {/* VIEW 2: CATCH THE BUTTERFLIES MINI-GAME */}
      {activeTab === "butterflies" && (
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.25)] p-6 sm:p-10 overflow-hidden">
          
          {/* Header & Stats Bar */}
          <div className="flex items-center justify-between border-b border-[#E8B5C0]/60 pb-4 mb-6">
            <div className="flex items-center gap-4 text-xs font-mono text-[#702C43]">
              <span className="px-3 py-1 rounded-full bg-white border border-[#E8B5C0]">
                Score: <strong>{score}</strong> / 6
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#E8B5C0]">
                Time: <strong>{timeLeft}s</strong>
              </span>
            </div>

            {!gameStarted && !gameWon && (
              <button
                type="button"
                onClick={startButterflyGame}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#A94F65] text-white text-xs font-medium shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
              >
                <Play size={13} fill="currentColor" />
                <span>Start Game</span>
              </button>
            )}
          </div>

          {/* Butterfly Playing Meadow Field */}
          <div className="relative h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-white/90 via-[#FFF9FA] to-[#FCE8E8]/70 border-2 border-white overflow-hidden p-4">
            
            {/* Background floating decor */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <span className="absolute top-10 left-[15%] text-[#A94F65] text-xs">✦</span>
              <span className="absolute top-24 right-[20%] text-[#D58C9C] text-sm">🌸</span>
              <span className="absolute bottom-12 left-[30%] text-[#E8B5C0] text-sm">🌷</span>
            </div>

            {/* In-game Butterflies */}
            {gameStarted &&
              butterflies.map((b) => {
                if (b.caught) return null;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleCatchButterfly(b.id)}
                    className="absolute cursor-pointer p-2 transition-all duration-500 ease-out hover:scale-125 active:scale-90"
                    style={{
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    aria-label="Catch butterfly"
                  >
                    <span
                      className="text-3xl sm:text-4xl filter drop-shadow-sm animate-[flutter_0.8s_ease-in-out_infinite]"
                      style={{ filter: "hue-rotate(15deg)" }}
                    >
                      🦋
                    </span>
                  </button>
                );
              })}

            {/* Pre-game Screen */}
            {!gameStarted && !gameWon && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-2xs p-6 text-center">
                <span className="text-5xl mb-3 animate-bounce">🦋</span>
                <h3 className="font-serif text-2xl text-[#702C43] font-medium mb-1">
                  Catch the Fluttering Butterflies
                </h3>
                <p className="text-xs sm:text-sm text-[#702C43]/75 font-sans max-w-sm mb-5">
                  Pastel butterflies will dance across the screen. Catch 6 butterflies before the timer runs out to reveal a sweet message!
                </p>
                <button
                  type="button"
                  onClick={startButterflyGame}
                  className="px-6 py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
                >
                  Play Catch 🦋
                </button>
              </div>
            )}

            {/* Victory Reward Screen */}
            {gameWon && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs p-6 text-center animate-[fadeIn_0.3s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-[#FCE8E8] border border-[#D58C9C] flex items-center justify-center text-3xl mb-3 shadow-sm">
                  🎉
                </div>
                <h3 className="font-serif text-2xl text-[#702C43] font-medium mb-2">
                  Yay! You caught them all!
                </h3>
                <div className="max-w-md p-4 rounded-2xl bg-[#FFF7F5] border border-[#E8B5C0] shadow-xs mb-5">
                  <p className="font-serif italic text-base sm:text-lg text-[#702C43] leading-relaxed">
                    &ldquo;Yay! You caught them all. Here&apos;s a little reminder: someone loves you very, very much.&rdquo;
                  </p>
                  <span className="block text-[11px] font-mono text-[#A94F65] mt-1.5">
                    — From Rifky
                  </span>
                </div>
                <button
                  type="button"
                  onClick={startButterflyGame}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-medium shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
                >
                  <RotateCcw size={13} />
                  <span>Play Again</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

