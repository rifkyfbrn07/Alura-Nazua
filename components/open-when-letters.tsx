"use client";

import { useState, useCallback } from "react";
import { Sparkles, Mail, Heart, X, BookOpen, ChevronRight } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPaperSound, playPopSound, playSparkleSound } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

type OpenWhenEnvelope = {
  id: string;
  condition: string;
  tag: string;
  envelopeColor: string;
  ribbonColor: string;
  sealColor: string;
  sticker: string;
  content: string;
};

const OPEN_WHEN_LETTERS: OpenWhenEnvelope[] = [
  {
    id: "when-miss-me",
    condition: "Open When You Miss Me",
    tag: "FOR LONELY MOMENTS",
    envelopeColor: "#FFF0F2",
    ribbonColor: "#F4D1D5",
    sealColor: "#A94F65",
    sticker: "🤍",
    content:
      "Hey, come here for a second. I wish I could be beside you right now. Maybe give you a hug, listen to whatever is on your mind, or simply sit next to you without needing to say much. Until I can do that, remember that there's someone who is always happy to have you in his thoughts. I miss our little moments, and I can't wait to make more.",
  },
  {
    id: "when-tired",
    condition: "Open When You're Tired",
    tag: "FOR REST AND PEACE",
    envelopeColor: "#FCE8E8",
    ribbonColor: "#E8B5C0",
    sealColor: "#702C43",
    sticker: "🌿",
    content:
      "Hey, take a little break, okay? You don't have to finish everything all at once. I hope you give yourself the same kindness you give to the people around you. I'm proud of you, even on the days when you feel like you haven't done enough. You deserve to rest, too.",
  },
  {
    id: "when-need-smile",
    condition: "Open When You Need a Smile",
    tag: "FOR SWEET LAUGHS",
    envelopeColor: "#FFF9E6",
    ribbonColor: "#FCE8E8",
    sealColor: "#E5A93C",
    sticker: "✨",
    content:
      "Okay, official announcement: you're still very, very cute. I hope that made you smile, even just a little. If not, I'll have to find another way to make you laugh. Maybe a silly joke, a random story, or just reminding you how adorable you are.",
  },
  {
    id: "when-cant-sleep",
    condition: "Open When You Can't Sleep",
    tag: "FOR QUIET NIGHTS",
    envelopeColor: "#F4D1D5",
    ribbonColor: "#FFF0F2",
    sealColor: "#702C43",
    sticker: "🌙",
    content:
      "If I were there, maybe we'd end up talking about random things until neither of us noticed how late it had gotten. I hope tonight feels a little softer. Take a deep breath, get comfortable, and let the day go slowly. I hope you wake up tomorrow with a lighter heart.",
  },
  {
    id: "when-doubt-yourself",
    condition: "Open When You Doubt Yourself",
    tag: "FOR GENTLE REMINDERS",
    envelopeColor: "#E8B5C0",
    ribbonColor: "#F4D1D5",
    sealColor: "#A94F65",
    sticker: "🌷",
    content:
      "I wish you could see yourself through my eyes sometimes. Not because I think you're perfect, but because I see so many little things worth appreciating in you. You don't have to prove your worth every day. You're already someone I care about deeply.",
  },
  {
    id: "when-feel-loved",
    condition: "Open When You Want to Feel Loved",
    tag: "FOR PURE WARMTH",
    envelopeColor: "#FFF7F5",
    ribbonColor: "#E8B5C0",
    sealColor: "#A94F65",
    sticker: "💖",
    content:
      "Just in case I haven't said it enough today: I love you. I love the little details that make you who you are, the random stories, the laughter, and even the ordinary moments we share. I hope you never have to wonder whether you matter to me. You do. So much.",
  },
];

export default function OpenWhenLetters() {
  const [activeLetter, setActiveLetter] = useState<OpenWhenEnvelope | null>(null);

  const handleOpenLetter = useCallback((letter: OpenWhenEnvelope) => {
    playPaperSound();
    playSparkleSound();
    setActiveLetter(letter);
    unlockBadge("openWhenLetters");
  }, []);

  const handleClose = useCallback(() => {
    playPopSound();
    setActiveLetter(null);
  }, []);

  return (
    <section
      id="open-when-letters"
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none"
    >
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Personal Correspondence // For Every Season
          </span>
          <span className="text-sm">💌</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          Little Letters for You
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          Some little words for different kinds of days. Whenever you need warmth, tap the envelope made for that moment.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={40} />
        </div>
      </div>

      {/* Grid of 6 Envelopes on a Linen Shelf */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {OPEN_WHEN_LETTERS.map((letter, index) => {
          return (
            <article
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              role="button"
              tabIndex={0}
              aria-label={`Open letter: ${letter.condition}`}
              className="group relative cursor-pointer transition-all duration-300 hover:-translate-y-2.5 active:scale-98"
            >
              {/* Physical Envelope Card */}
              <div
                className="relative rounded-2xl p-6 sm:p-7 border-2 border-white shadow-md flex flex-col justify-between min-h-[220px] overflow-hidden group-hover:shadow-xl transition-all"
                style={{ backgroundColor: letter.envelopeColor }}
              >
                {/* Diagonal Envelope Flap Silhouette */}
                <div
                  className="absolute inset-x-0 top-0 h-20 bg-white/40 border-b border-black/5"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                />

                {/* Wax Seal Stamp in Center */}
                <div
                  className="absolute top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full shadow-sm flex items-center justify-center text-xs text-white border border-white/60"
                  style={{ backgroundColor: letter.sealColor }}
                >
                  {letter.sticker}
                </div>

                {/* Tag Banner */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#A94F65] uppercase mb-8">
                  <span>{letter.tag}</span>
                  <span>ENVELOPE #{index + 1}</span>
                </div>

                {/* Condition Title */}
                <div className="relative z-10 text-center mt-4">
                  <h3 className="font-serif italic text-xl sm:text-2xl text-[#702C43] font-medium leading-snug">
                    {letter.condition}
                  </h3>
                  <span className="text-[10px] font-mono text-[#A94F65] tracking-wider mt-2 inline-flex items-center gap-1 group-hover:underline">
                    <span>TAP TO UNFOLD</span>
                    <ChevronRight size={12} />
                  </span>
                </div>

                {/* Subtle Washi Ribbon at Bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2"
                  style={{ backgroundColor: letter.ribbonColor }}
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* UNFOLDED LETTER MODAL */}
      {activeLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={activeLetter.condition}
        >
          <div className="relative max-w-lg w-full bg-white text-[#702C43] rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(112,44,67,0.35)] border-4 border-[#FCE8E8] my-auto animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="sticky top-0 float-right -mr-2 -mt-2 p-2 rounded-full bg-[#FFF7F5] hover:bg-[#FCE8E8] text-[#702C43] transition-colors z-20 shadow-xs"
              aria-label="Fold the letter"
            >
              <X size={16} />
            </button>

            {/* Letterhead */}
            <div className="border-b border-[#F4D1D5] pb-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#A94F65] uppercase block">
                  {activeLetter.tag}
                </span>
                <h3 className="font-serif italic text-2xl text-[#702C43] font-medium mt-0.5">
                  {activeLetter.condition}
                </h3>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-xs"
                style={{ backgroundColor: activeLetter.envelopeColor }}
              >
                {activeLetter.sticker}
              </div>
            </div>

            {/* Letter Body Text */}
            <div className="py-2">
              <p className="font-serif text-base sm:text-lg leading-relaxed text-[#702C43]/90 font-light">
                {activeLetter.content}
              </p>
            </div>

            {/* Signoff */}
            <div className="mt-8 pt-4 border-t border-[#F4D1D5] flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[#A94F65] uppercase">
                ALURA&apos;S LITTLE LILY WORLD
              </span>
              <span className="font-serif italic text-base font-medium text-[#702C43]">
                — Always, Rifky
              </span>
            </div>

            {/* Fold the letter button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 rounded-full bg-[#FFF0F2] border border-[#D58C9C] text-[#702C43] text-xs font-medium shadow-xs hover:bg-[#FCE8E8] active:scale-95 transition-all"
              >
                Fold the Letter 💌
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
