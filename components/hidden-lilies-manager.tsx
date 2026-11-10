"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, X, Heart } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playSparkleSound, playChimeWin, playPopSound } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

type HiddenLilyLocation = {
  id: string;
  name: string;
  hint: string;
};

export const HIDDEN_LILIES: HiddenLilyLocation[] = [
  { id: "lily-hero", name: "Welcome Lily", hint: "Blooming near the scrapbook cover" },
  { id: "lily-gacoan", name: "Gacoan Lily", hint: "Tucked inside the photobooth sleeve" },
  { id: "lily-toybox", name: "Toybox Lily", hint: "Hiding among the cute keepsakes" },
  { id: "lily-letter", name: "Letterhead Lily", hint: "Stamping the wax-sealed envelope" },
  { id: "lily-moon", name: "Twilight Lily", hint: "Resting beneath the night sky" },
];

const STORAGE_KEY = "alura_hidden_lilies_found";

export default function HiddenLiliesManager() {
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTrackerModal, setShowTrackerModal] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFoundIds(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Listen for hidden lily clicks from anywhere on the page
  useEffect(() => {
    const handleLilyFound = (e: CustomEvent<{ id: string }>) => {
      const id = e.detail.id;
      setFoundIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}

        playSparkleSound();

        // If all 5 found, celebrate!
        if (next.length === HIDDEN_LILIES.length) {
          setTimeout(() => {
            setShowCelebration(true);
            playChimeWin();
            unlockBadge("hiddenLilies");
          }, 500);
        }
        return next;
      });
    };

    window.addEventListener("alura_hidden_lily_clicked", handleLilyFound as EventListener);
    return () => {
      window.removeEventListener("alura_hidden_lily_clicked", handleLilyFound as EventListener);
    };
  }, []);

  const handleCloseCelebration = useCallback(() => {
    playPopSound();
    setShowCelebration(false);
  }, []);

  return (
    <>
      {/* Subtle Floating Counter Pill at Bottom Left */}
      <aside
        className="fixed bottom-4 left-4 z-40 select-none animate-[fadeIn_0.5s_ease-out]"
        role="region"
        aria-label="Hidden lilies tracker"
      >
        <button
          type="button"
          onClick={() => {
            playPopSound();
            setShowTrackerModal(true);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E8B5C0] shadow-sm hover:border-[#D58C9C] active:scale-95 transition-all text-[#702C43] text-xs font-mono"
        >
          <span className="text-sm">🌸</span>
          <span className="font-medium tracking-wider">
            Lilies: {foundIds.length} / {HIDDEN_LILIES.length}
          </span>
          <span className="text-[10px] text-[#A94F65] underline hidden sm:inline">
            (hints)
          </span>
        </button>
      </aside>

      {/* Tracker Hints Modal */}
      {showTrackerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label="Hidden lilies hints"
        >
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 text-center border-4 border-[#FCE8E8] shadow-[0_25px_60px_rgba(112,44,67,0.35)]">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setShowTrackerModal(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#FCE8E8] text-[#A94F65] text-xs font-mono uppercase tracking-widest mb-3">
              🌸 EASTER EGG HUNT
            </span>

            <h3 className="font-serif text-2xl text-[#702C43] font-medium mb-2">
              Find the 5 Hidden Lilies
            </h3>

            <p className="text-xs text-[#702C43]/75 font-sans mb-5">
              Five delicate pink lilies are tucked away around this world. Tap them when you spot them!
            </p>

            <div className="space-y-2 text-left mb-6">
              {HIDDEN_LILIES.map((lily, index) => {
                const isFound = foundIds.includes(lily.id);
                return (
                  <div
                    key={lily.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-sans transition-all ${
                      isFound
                        ? "bg-[#FFF0F2] border-[#D58C9C] text-[#702C43]"
                        : "bg-white border-[#F4D1D5] text-[#702C43]/60"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-[#702C43] block">
                        #{index + 1} {lily.name}
                      </span>
                      <span className="text-[11px] opacity-80">{lily.hint}</span>
                    </div>
                    <span>{isFound ? "🌸 Found!" : "✦ Hidden"}</span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowTrackerModal(false)}
              className="w-full py-2 rounded-full bg-[#A94F65] text-white text-xs font-medium shadow-sm hover:bg-[#702C43] active:scale-95 transition-all"
            >
              Keep Exploring ✨
            </button>
          </div>
        </div>
      )}

      {/* ALL LILIES FOUND CELEBRATION MODAL */}
      {showCelebration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/50 backdrop-blur-md animate-[fadeIn_0.4s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label="All hidden lilies found"
        >
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-[#FCE8E8] shadow-[0_25px_70px_rgba(112,44,67,0.4)] animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            <button
              type="button"
              onClick={handleCloseCelebration}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <div className="flex justify-center mb-4 animate-bounce">
              <PinkLily size={64} />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-[#FCE8E8] text-[#A94F65] text-xs font-mono uppercase tracking-widest mb-3">
              🎉 SECRET UNLOCKED!
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#702C43] font-medium mb-3">
              You found all the little lilies!
            </h3>

            <div className="p-4 rounded-2xl bg-[#FFF7F5] border border-[#F4D1D5] mb-6">
              <p className="font-serif italic text-base sm:text-lg text-[#702C43] leading-relaxed">
                &ldquo;You found all the little lilies! I guess you really did explore every corner of this tiny world. I hope you found a little happiness in every one of them.&rdquo;
              </p>
              <span className="block text-[11px] font-mono text-[#A94F65] mt-2 uppercase tracking-wider">
                — Rifky
              </span>
            </div>

            <button
              type="button"
              onClick={handleCloseCelebration}
              className="w-full py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              Cherish this little victory 💕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Reusable trigger helper button for embedding inside existing sections
export function HiddenLilyTrigger({ id }: { id: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("alura_hidden_lily_clicked", { detail: { id } })
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative cursor-pointer p-1 rounded-full hover:scale-125 active:scale-90 transition-all opacity-85 hover:opacity-100"
      title="A hidden lily! Tap to collect."
      aria-label="Collect hidden lily"
    >
      <span className="text-base sm:text-lg animate-pulse block">🌸</span>
      <span className="absolute -top-1 -right-1 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
        ✦
      </span>
    </button>
  );
}

