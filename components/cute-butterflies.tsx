"use client";

import { useCallback } from "react";
import { playSparkleSound } from "@/lib/sound-effects";

export default function CuteButterflies() {
  const handleButterflyTap = useCallback(() => {
    playSparkleSound();
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Butterfly 1: Soft Blush - Top Left to Center float */}
      <div
        onClick={handleButterflyTap}
        role="presentation"
        className="absolute top-[18%] left-[8%] pointer-events-auto cursor-pointer animate-[gentleFloat_8s_ease-in-out_infinite] hover:scale-125 transition-transform"
      >
        <div className="relative flex items-center justify-center filter drop-shadow-sm">
          <span className="text-2xl sm:text-3xl animate-[flutter_1.2s_ease-in-out_infinite]">
            🦋
          </span>
        </div>
      </div>

      {/* Butterfly 2: Rose Pink - Mid Right float */}
      <div
        onClick={handleButterflyTap}
        role="presentation"
        className="absolute top-[45%] right-[10%] pointer-events-auto cursor-pointer animate-[gentleFloat_10s_ease-in-out_infinite_2s] hover:scale-125 transition-transform"
      >
        <div className="relative flex items-center justify-center filter drop-shadow-sm">
          <span className="text-2xl sm:text-3xl animate-[flutter_1.5s_ease-in-out_infinite_0.4s]">
            🦋
          </span>
        </div>
      </div>

      {/* Butterfly 3: Pastel Gold/Pink - Lower Left float */}
      <div
        onClick={handleButterflyTap}
        role="presentation"
        className="absolute bottom-[22%] left-[16%] pointer-events-auto cursor-pointer animate-[gentleFloat_9s_ease-in-out_infinite_1s] hover:scale-125 transition-transform hidden sm:block"
      >
        <div className="relative flex items-center justify-center filter drop-shadow-sm">
          <span className="text-xl sm:text-2xl animate-[flutter_1.3s_ease-in-out_infinite_0.8s]">
            🦋
          </span>
        </div>
      </div>
    </div>
  );
}
