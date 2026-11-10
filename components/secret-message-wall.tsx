"use client";

import { useState, useCallback } from "react";
import { Sparkles, Pin, Heart, Lock, Unlock, X } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPaperSound, playSparkleSound, playPopSound, playChimeWin } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

type StickyNote = {
  id: string;
  tag: string;
  color: string;
  rotation: number;
  pinColor: string;
  message: string;
  isSecret?: boolean;
};

const INITIAL_NOTES: StickyNote[] = [
  {
    id: "note-1",
    tag: "OFFICIAL MEMO",
    color: "#FFF0F2",
    rotation: -2.5,
    pinColor: "#A94F65",
    message: "You're cute. Yes, this is an official announcement from headquarters.",
  },
  {
    id: "note-2",
    tag: "APPRECIATION",
    color: "#FCE8E8",
    rotation: 3,
    pinColor: "#D58C9C",
    message: "I hope you know how much I appreciate your existence. Having you around makes everything softer and brighter.",
  },
  {
    id: "note-3",
    tag: "LITTLE CONFESSION",
    color: "#FFF9E6",
    rotation: -1.5,
    pinColor: "#E5A93C",
    message: "Sometimes I randomly remember your sweet smile in the middle of a busy day, and I find myself smiling alone.",
  },
  {
    id: "note-4",
    tag: "GRATEFUL",
    color: "#F4D1D5",
    rotation: 2.2,
    pinColor: "#702C43",
    message: "Thank you for making even the most ordinary days feel different, meaningful, and worth remembering.",
  },
  {
    id: "note-5",
    tag: "A PROMISE",
    color: "#E8B5C0",
    rotation: -3,
    pinColor: "#A94F65",
    message: "I still want to take a thousand more pictures with you, eat warm food, and get lost in conversation.",
  },
  {
    id: "note-6",
    tag: "SWEET MOMENT",
    color: "#FFF0F2",
    rotation: 1.8,
    pinColor: "#D58C9C",
    message: "Sitting across from you with noodles and drinks is genuinely better than any fancy dinner in the world.",
  },
  {
    id: "note-secret-1",
    tag: "LOCKED SECRET #1",
    color: "#FDE2E8",
    rotation: -2,
    pinColor: "#702C43",
    isSecret: true,
    message: "Bonus Secret: My favorite place on earth is wherever you're holding my hand and talking excitedly about your day.",
  },
  {
    id: "note-secret-2",
    tag: "LOCKED SECRET #2",
    color: "#FFF7F5",
    rotation: 2.5,
    pinColor: "#A94F65",
    isSecret: true,
    message: "Bonus Secret: If I had to live every single day over again from the start, I'd still search until I found you.",
  },
];

export default function SecretMessageWall() {
  const [readNoteIds, setReadNoteIds] = useState<string[]>([]);
  const [activeNote, setActiveNote] = useState<StickyNote | null>(null);

  const canUnlockSecrets = readNoteIds.length >= 3;

  const handleOpenNote = useCallback((note: StickyNote) => {
    if (note.isSecret && !canUnlockSecrets) {
      playPopSound();
      return;
    }

    playPaperSound();
    setActiveNote(note);

    setReadNoteIds((prev) => {
      const next = [...new Set([...prev, note.id])];
      if (next.length >= 5) {
        unlockBadge("secretNotes");
        playChimeWin();
      }
      return next;
    });
  }, [canUnlockSecrets]);

  const handleCloseModal = useCallback(() => {
    playPopSound();
    setActiveNote(null);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none">
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Noticeboard // Sticky Notes &amp; Memos
          </span>
          <span className="text-sm">💌</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          The Secret Message Wall
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          Little sticky notes, spontaneous thoughts, and pinned confessions left just for you.
          Read 3 notes to unlock the secret messages!
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={42} />
        </div>
      </div>

      {/* The Pinboard Wall */}
      <div className="relative max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF5F7] via-[#FCE8E8]/70 to-[#F4D1D5]/60 border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.22)]">
        
        {/* Ribbon banner string across top */}
        <div className="relative border-b-2 border-dashed border-[#D58C9C]/40 pb-4 mb-8 flex items-center justify-between text-xs font-mono text-[#702C43]">
          <span className="flex items-center gap-1.5">
            <Heart size={13} className="text-[#A94F65] fill-current" />
            Notes read: {readNoteIds.length} / {INITIAL_NOTES.length}
          </span>
          <span className="text-[11px] text-[#A94F65]">
            {canUnlockSecrets ? "✨ Secret Notes Unlocked!" : "Read 3 notes to reveal bonus secrets"}
          </span>
        </div>

        {/* Grid of Pinned Notes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {INITIAL_NOTES.map((note) => {
            const isRead = readNoteIds.includes(note.id);
            const isLocked = note.isSecret && !canUnlockSecrets;

            return (
              <div
                key={note.id}
                onClick={() => handleOpenNote(note)}
                role="button"
                tabIndex={0}
                aria-label={`Open note: ${note.tag}`}
                className={`group relative p-4 rounded-xl shadow-md border border-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl active:scale-95 ${
                  isLocked ? "cursor-not-allowed opacity-75" : "cursor-pointer"
                }`}
                style={{
                  backgroundColor: note.color,
                  transform: `rotate(${note.rotation}deg)`,
                }}
              >
                {/* Push Pin */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: note.pinColor }}
                >
                  <Pin size={12} className="text-white fill-current" />
                </div>

                {/* Tag & Status */}
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-[#702C43]/70 uppercase mb-2 mt-1">
                  <span>{note.tag}</span>
                  {note.isSecret ? (
                    canUnlockSecrets ? (
                      <Unlock size={11} className="text-[#A94F65]" />
                    ) : (
                      <Lock size={11} className="text-[#702C43]/60" />
                    )
                  ) : isRead ? (
                    <span className="text-[#A94F65]">✓</span>
                  ) : (
                    <span>●</span>
                  )}
                </div>

                {/* Preview Snippet */}
                <p className="font-serif italic text-xs sm:text-sm text-[#702C43] line-clamp-3 leading-snug">
                  {isLocked
                    ? "Locked secret... Read 3 other notes to unlock this memo."
                    : note.message}
                </p>

                {/* Footer hint */}
                <div className="mt-3 pt-2 border-t border-[#702C43]/10 flex items-center justify-between text-[9px] font-mono text-[#A94F65]">
                  <span>{isLocked ? "LOCKED" : "TAP TO READ"}</span>
                  <span>🎀</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: FULL NOTE VIEW */}
      {activeNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/45 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={activeNote.tag}
        >
          <div
            className="relative max-w-sm w-full rounded-3xl p-6 sm:p-8 text-center border-4 border-white shadow-[0_25px_60px_rgba(112,44,67,0.35)] animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ backgroundColor: activeNote.color }}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 text-[#702C43] border border-[#E8B5C0] flex items-center justify-center hover:bg-white active:scale-90 transition-all"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[#A94F65] text-xs font-mono uppercase tracking-widest mb-4 shadow-xs">
              📌 {activeNote.tag}
            </span>

            <p className="font-serif italic text-lg sm:text-xl text-[#702C43] leading-relaxed mb-6">
              &ldquo;{activeNote.message}&rdquo;
            </p>

            <div className="pt-3 border-t border-[#702C43]/15 flex items-center justify-between text-[11px] font-mono text-[#702C43]/70">
              <span>FOR: ALURA</span>
              <span>FROM: RIFKY</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

