"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Sparkles, Heart, X } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPaperSound, playSparkleSound, playPopSound } from "@/lib/sound-effects";
import coupleSweetPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29.jpeg";

export default function OneLastSecret() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"envelope" | "letter">("envelope");

  const handleOpenSecret = useCallback(() => {
    playSparkleSound();
    setIsOpen(true);
    setStep("envelope");

    setTimeout(() => {
      playPaperSound();
      setStep("letter");
    }, 1200);
  }, []);

  const handleClose = useCallback(() => {
    playPopSound();
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Prominent Secret Invitation Button */}
      <div className="relative py-12 flex flex-col items-center justify-center text-center select-none">
        <button
          type="button"
          onClick={handleOpenSecret}
          className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#A94F65] via-[#D58C9C] to-[#A94F65] text-white font-serif font-medium text-base sm:text-lg shadow-[0_10px_30px_rgba(169,79,101,0.3)] hover:shadow-[0_15px_40px_rgba(169,79,101,0.45)] hover:scale-105 active:scale-95 transition-all"
        >
          <span className="text-xl animate-[pulse_2s_ease-in-out_infinite]">✨</span>
          <span>One Last Little Surprise...</span>
          <span className="text-xl animate-[pulse_2s_ease-in-out_infinite_1s]">💌</span>
        </button>
        <span className="text-[11px] font-mono tracking-widest text-[#A94F65]/80 mt-2 uppercase">
          A FINAL SECRET TUCKED AWAY JUST FOR YOU
        </span>
      </div>

      {/* Cinematic Modal Reveal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#702C43]/70 via-[#5C2336]/80 to-[#451625]/90 backdrop-blur-md animate-[fadeIn_0.5s_ease-out] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="One last surprise for Alura"
        >
          {/* Ambient Butterflies and Lilies */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <span className="absolute top-12 left-[10%] text-3xl animate-[float_6s_ease-in-out_infinite]">
              🦋
            </span>
            <span className="absolute bottom-20 right-[12%] text-3xl animate-[float_8s_ease-in-out_infinite_1s]">
              🦋
            </span>
            <div className="absolute -top-10 -right-10 opacity-60">
              <PinkLily size={120} />
            </div>
            <div className="absolute -bottom-10 -left-10 opacity-60">
              <PinkLily size={120} />
            </div>
          </div>

          {step === "envelope" ? (
            /* Envelope Opening Stage */
            <div className="relative text-center animate-[scaleIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="w-48 h-32 sm:w-64 sm:h-44 mx-auto rounded-2xl bg-[#FFFDFB] border-2 border-[#F4D1D5] shadow-2xl flex flex-col items-center justify-center p-4">
                <span className="text-4xl animate-bounce mb-2">💌</span>
                <span className="font-serif italic text-base text-[#702C43]">
                  Unfolding one last secret...
                </span>
              </div>
            </div>
          ) : (
            /* Unfolded Heartfelt Letter Sheet */
            <div className="relative max-w-lg w-full bg-white text-[#702C43] rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.4)] border-4 border-[#FCE8E8] my-auto max-h-[90vh] overflow-y-auto animate-[fadeIn_0.5s_ease-out]">
              <button
                type="button"
                onClick={handleClose}
                className="sticky top-0 float-right -mr-2 -mt-2 p-2 rounded-full bg-[#FFF7F5] hover:bg-[#FCE8E8] text-[#702C43] transition-colors z-20 shadow-xs"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Letterhead */}
              <div className="border-b border-[#F4D1D5] pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#A94F65] uppercase">
                    ONE LAST LITTLE SECRET // FOR ALURA
                  </span>
                  <p className="font-serif italic text-xs text-[#702C43]/70 mt-0.5">
                    Written with all my heart
                  </p>
                </div>
                <PinkLily size={44} />
              </div>

              {/* Exact Letter Body */}
              <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[#702C43]/90">
                <p className="text-2xl font-medium text-[#702C43]">
                  Hey, Alura.
                </p>

                <p>
                  If you&apos;ve made it all the way here, I hope this little world made you smile.
                </p>

                <p>
                  I made all these little things because I wanted you to have something that reminds you how special you are to me.
                </p>

                <p>
                  I know a website can never hold everything I feel for you. But I hope, in its own little way, it can show you just how much I cherish every minute, every laugh, and every memory we share.
                </p>

                <p>
                  Thank you for being here.
                </p>

                <p className="font-medium text-[#A94F65] text-lg">
                  I love you, and I&apos;m looking forward to all the little things we haven&apos;t done together yet.
                </p>

                <p className="pt-2 text-right font-serif text-xl font-medium text-[#702C43]">
                  — Rifky
                </p>
              </div>

              {/* Our Best Couple Photo */}
              <div className="mt-8 pt-6 border-t border-[#F4D1D5] flex flex-col items-center">
                <div className="relative p-3 bg-[#FFF7F5] rounded-2xl border border-[#E8B5C0] shadow-md max-w-xs rotate-1 hover:rotate-0 transition-transform">
                  <div className="washi-tape top-[-7px] left-1/2 -translate-x-1/2 w-20 bg-[#F4D1D5]" />
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2">
                    <Image
                      src={coupleSweetPhoto}
                      alt="Rifky and Alura together"
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-serif italic text-xs text-[#702C43]/85 text-center">
                    To many more pages ahead, side by side
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
                >
                  Keep this memory forever in my heart 💕
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

