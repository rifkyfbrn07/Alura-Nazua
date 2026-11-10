"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, Calendar, Heart, X, Check, BookOpen } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import {
  getTodayLoveNote,
  type DailyLoveNote,
  getTodayDateString,
} from "@/lib/daily-notes";
import { playPaperSound, playPopSound, playSparkleSound } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

const STORAGE_OPENED_KEY = "alura_today_note_opened";

export default function DailyLoveNote() {
  const [todayData, setTodayData] = useState<ReturnType<typeof getTodayLoveNote> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedToday, setHasOpenedToday] = useState(false);

  // Initialize on mount using device-local date
  useEffect(() => {
    const data = getTodayLoveNote();
    setTodayData(data);

    try {
      const savedDate = localStorage.getItem(STORAGE_OPENED_KEY);
      if (savedDate === data.dateStr) {
        setHasOpenedToday(true);
      }
    } catch {}
  }, []);

  const handleOpenNote = useCallback(() => {
    playPaperSound();
    playSparkleSound();
    setIsOpen(true);
    setHasOpenedToday(true);
    unlockBadge("dailyNote");

    if (todayData) {
      try {
        localStorage.setItem(STORAGE_OPENED_KEY, todayData.dateStr);
      } catch {}
    }
  }, [todayData]);

  const handleCloseNote = useCallback(() => {
    playPopSound();
    setIsOpen(false);
  }, []);

  if (!todayData) return null;

  return (
    <section
      id="daily-love-note"
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto select-none"
    >
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Everyday Affection // A Reason to Return
          </span>
          <span className="text-sm">🌷</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          A Little Note for Today
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          A fresh, handwritten thought from Rifky waiting for you every single day.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={40} />
        </div>
      </div>

      {/* THE DESK WITH WAX-SEALED TODAY'S ENVELOPE */}
      <div className="relative max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.25)] text-center">
        
        {/* Local Device Date Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D58C9C] text-xs font-mono text-[#702C43] shadow-xs mb-6">
          <Calendar size={13} className="text-[#A94F65]" />
          <span>{todayData.displayDate}</span>
        </div>

        {/* Envelope on Desk */}
        <div
          onClick={handleOpenNote}
          role="button"
          tabIndex={0}
          aria-label="Open today's love note"
          className="group relative w-60 h-40 sm:w-72 sm:h-44 mx-auto rounded-2xl bg-[#FFFDFB] border-2 border-[#F4D1D5] shadow-md hover:shadow-xl hover:-translate-y-1.5 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center p-4 overflow-hidden"
        >
          {/* Flap shape */}
          <div
            className="absolute inset-x-0 top-0 h-24 bg-[#FFF5F7] border-b border-[#F4D1D5]/70"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          />

          {/* Burgundy Wax Seal */}
          <div className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-tr from-[#702C43] to-[#A94F65] border border-white/80 shadow-md flex items-center justify-center text-white text-base">
            🌷
          </div>

          <div className="relative z-10 mt-3 text-center">
            <span className="font-serif italic text-base sm:text-lg text-[#702C43] font-medium block">
              To: Alura
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[#A94F65] uppercase">
              {hasOpenedToday ? "✓ Note Ready to Re-read" : "[ Tap to Open Today's Note ]"}
            </span>
          </div>

          {/* Washi ribbon at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#F4D1D5]" />
        </div>

        {/* Open Button */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleOpenNote}
            className="px-6 py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-serif font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all cursor-pointer"
          >
            {hasOpenedToday ? "Read Today's Note Again ✨" : "Open Today's Note 💌"}
          </button>
          <span className="text-[10px] font-mono text-[#702C43]/70">
            A new note blooms every morning on your device
          </span>
        </div>
      </div>

      {/* TODAY'S NOTE MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label="Today's love note"
        >
          <div className="relative max-w-md w-full bg-white text-[#702C43] rounded-3xl p-6 sm:p-8 text-center border-4 border-[#FCE8E8] shadow-[0_25px_60px_rgba(112,44,67,0.35)] animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            <button
              type="button"
              onClick={handleCloseNote}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF7F5] text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            {/* Tag Badge */}
            <span className="inline-block px-3 py-1 rounded-full bg-[#FCE8E8] text-[#A94F65] text-xs font-mono uppercase tracking-widest mb-3">
              {todayData.note.tag}
            </span>

            <div className="text-xs font-mono text-[#702C43]/60 mb-4">
              {todayData.displayDate}
            </div>

            {/* Note text */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#FFF7F5] border border-[#F4D1D5] mb-6">
              <p className="font-serif italic text-lg sm:text-xl text-[#702C43] leading-relaxed">
                &ldquo;{todayData.note.text}&rdquo;
              </p>
              <span className="block text-xs font-serif text-[#A94F65] mt-3">
                — Rifky
              </span>
            </div>

            <button
              type="button"
              onClick={handleCloseNote}
              className="w-full py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              Carry this thought today 💕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
