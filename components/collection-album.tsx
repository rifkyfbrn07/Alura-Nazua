"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, Trophy, X, Heart, Award } from "lucide-react";
import { ALL_BADGES, getUnlockedBadges, type CollectibleBadge } from "@/lib/collectibles";
import { playPopSound, playSparkleSound } from "@/lib/sound-effects";

export default function CollectionAlbum() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState<CollectibleBadge | null>(null);

  // Initialize
  useEffect(() => {
    setUnlockedIds(getUnlockedBadges());

    const handleBadgeUnlocked = (e: CustomEvent<{ id: string; badge: CollectibleBadge }>) => {
      setUnlockedIds(getUnlockedBadges());
      if (e.detail.badge) {
        setJustUnlocked(e.detail.badge);
        setTimeout(() => setJustUnlocked(null), 4500);
      }
    };

    window.addEventListener("alura_badge_unlocked", handleBadgeUnlocked as EventListener);
    return () => {
      window.removeEventListener("alura_badge_unlocked", handleBadgeUnlocked as EventListener);
    };
  }, []);

  const handleOpen = useCallback(() => {
    playPopSound();
    playSparkleSound();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    playPopSound();
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Toast Notification when a new badge is unlocked */}
      {justUnlocked && (
        <aside
          className="fixed top-20 right-4 z-50 flex items-center gap-3 p-3.5 pr-5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#A94F65] shadow-[0_10px_30px_rgba(112,44,67,0.25)] select-none animate-[slideIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
          role="status"
          aria-live="polite"
        >
          <span className="text-3xl animate-bounce">{justUnlocked.sticker}</span>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#A94F65] block font-bold">
              ★ NEW COLLECTIBLE UNLOCKED! ★
            </span>
            <span className="font-serif text-sm font-medium text-[#702C43]">
              {justUnlocked.name}
            </span>
          </div>
        </aside>
      )}

      {/* Floating Pill Button in Bottom Right */}
      <aside
        className="fixed bottom-4 right-4 z-40 select-none animate-[fadeIn_0.5s_ease-out]"
        role="region"
        aria-label="Alura's collection button"
      >
        <button
          type="button"
          onClick={handleOpen}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#E8B5C0] shadow-md hover:border-[#A94F65] active:scale-95 transition-all text-[#702C43]"
          aria-label="Open collection album"
        >
          <span className="text-base group-hover:scale-110 transition-transform">🎀</span>
          <span className="text-xs font-mono font-medium tracking-wider">
            Collection: {unlockedIds.length} / {ALL_BADGES.length}
          </span>
        </button>
      </aside>

      {/* Collection Album Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label="Alura's Little Collection Album"
        >
          <div className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#FCE8E8] shadow-[0_25px_60px_rgba(112,44,67,0.35)] max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={handleClose}
              className="sticky top-0 float-right -mr-2 -mt-2 w-8 h-8 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all z-20"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            {/* Album Header */}
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FCE8E8] text-[#A94F65] text-[10px] font-mono uppercase tracking-widest mb-2">
                🏆 ALURA&apos;S LITTLE ALBUM
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#702C43] font-medium">
                My Keepsake Badges
              </h3>
              <p className="text-xs text-[#702C43]/70 font-sans mt-1">
                Unlocked {unlockedIds.length} of {ALL_BADGES.length} collectibles
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {ALL_BADGES.map((badge) => {
                const isUnlocked = unlockedIds.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? "bg-[#FFF0F2] border-[#D58C9C] shadow-xs"
                        : "bg-[#FFF7F5]/50 border-dashed border-[#F4D1D5] opacity-60"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border border-white"
                      style={{ backgroundColor: badge.color }}
                    >
                      {isUnlocked ? badge.sticker : "🔒"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-[#702C43] truncate">
                          {badge.name}
                        </span>
                        {isUnlocked && (
                          <span className="text-[10px] text-[#A94F65]">✓</span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#702C43]/75 font-sans leading-tight mt-0.5">
                        {isUnlocked ? badge.description : "Keep exploring to unlock..."}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              Close Album
            </button>
          </div>
        </div>
      )}
    </>
  );
}

