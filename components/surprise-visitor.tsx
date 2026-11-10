"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Heart } from "lucide-react";
import { playPopSound, playSparkleSound } from "@/lib/sound-effects";

export default function SurpriseVisitor() {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Trigger once after ~45 seconds of exploring or scrolling
  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => {
      setVisible(true);
      playSparkleSound();
    }, 45000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleOpen = useCallback(() => {
    playPopSound();
    setOpened(true);
  }, []);

  const handleDismiss = useCallback(() => {
    playPopSound();
    setVisible(false);
    setOpened(false);
    setDismissed(true);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-20 right-4 z-40 select-none animate-[slideIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)]"
      role="complementary"
      aria-label="A sweet surprise visitor"
    >
      {!opened ? (
        <button
          type="button"
          onClick={handleOpen}
          className="group relative flex items-center gap-2 p-2.5 pr-4 rounded-full bg-white/95 backdrop-blur-md border border-[#E8B5C0] shadow-lg hover:border-[#A94F65] active:scale-95 transition-all text-left"
        >
          <span className="text-2xl animate-[float_3s_ease-in-out_infinite]">🦋</span>
          <div>
            <span className="text-[10px] font-mono tracking-wider text-[#A94F65] block uppercase">
              Special Delivery
            </span>
            <span className="text-xs font-serif italic text-[#702C43]">
              A butterfly brought a note...
            </span>
          </div>
        </button>
      ) : (
        <div className="relative max-w-xs w-full bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#F4D1D5] shadow-xl animate-[scaleIn_0.3s_ease-out]">
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all"
            aria-label="Dismiss note"
          >
            <X size={12} />
          </button>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#A94F65] uppercase mb-1">
            <Heart size={10} className="fill-current" />
            <span>Just checking in</span>
          </div>

          <p className="font-serif italic text-sm text-[#702C43] leading-relaxed mb-3">
            &ldquo;Hey Alura... I hope browsing this little world is making you smile. That smile is everything to me.&rdquo;
          </p>

          <span className="block text-[10px] font-mono text-[#A94F65] text-right">
            — With love, Rifky
          </span>
        </div>
      )}
    </div>
  );
}

