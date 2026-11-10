"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Sparkles, Camera, Heart, RotateCcw, X, Star } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { toyboxKeepsakes } from "@/lib/love-story";
import { playCameraShutter, playPaperSound, playPopSound } from "@/lib/sound-effects";

export default function LittleToybox() {
  const [selectedItem, setSelectedItem] = useState<typeof toyboxKeepsakes[0] | null>(null);
  const [isLifting, setIsLifting] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOpenItem = useCallback((item: typeof toyboxKeepsakes[0]) => {
    playPaperSound();
    setSelectedItem(item);
    setIsLifting(true);
    setShowCaption(false);
    setFlashActive(false);

    setTimeout(() => {
      setFlashActive(true);
      playCameraShutter();
      setTimeout(() => {
        setFlashActive(false);
        setShowCaption(true);
      }, 350);
    }, 400);
  }, []);

  const handleCloseItem = useCallback(() => {
    playPaperSound();
    setShowCaption(false);
    setIsLifting(false);
    setTimeout(() => {
      setSelectedItem(null);
    }, 380);
  }, []);

  const toggleToyboxLid = useCallback(() => {
    playPopSound();
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto select-none overflow-hidden"
      aria-label="Our Little Toybox"
    >
      {/* Playful Floating Mini Clouds & Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-[8%] w-36 h-20 bg-white/70 rounded-full blur-xl opacity-60 animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-36 right-[12%] w-48 h-24 bg-[#FCE8E8]/80 rounded-full blur-xl opacity-70 animate-[float_10s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-20 left-[15%] w-44 h-24 bg-[#F4D1D5]/50 rounded-full blur-xl opacity-60 animate-[float_9s_ease-in-out_infinite_1s]" />

        <span className="absolute top-16 left-[22%] text-[#D58C9C]/60 text-lg animate-[pulse_3s_ease-in-out_infinite]">✦</span>
        <span className="absolute top-28 right-[25%] text-[#A94F65]/50 text-sm animate-[pulse_4s_ease-in-out_infinite_1s]">★</span>
        <span className="absolute bottom-32 right-[18%] text-[#D58C9C]/60 text-xl animate-[pulse_4.5s_ease-in-out_infinite_0.5s]">✦</span>
      </div>

      {/* Chapter Header */}
      <div className="relative text-center max-w-2xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Section 07 // Nostalgic Toy Room
          </span>
          <Star size={12} className="text-[#D58C9C]" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#702C43] tracking-tight mb-4">
          Our Little Toybox
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed max-w-lg mx-auto">
          A playful pastel box full of our favorite photobooth strips, little keepsakes, and soft moments.
          Tap any memory to take it out and look closer.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={44} />
        </div>
      </div>

      {/* THE TOYBOX CONTAINER */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#FFF0F2] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.25)] p-6 sm:p-10 md:p-12 overflow-hidden transition-all duration-500">
          
          {/* Toybox Lid & Controls */}
          <div className="flex items-center justify-between border-b border-[#E8B5C0]/60 pb-5 mb-8">
            <button
              type="button"
              onClick={toggleToyboxLid}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D58C9C] text-[#702C43] text-xs font-medium shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <span>{isOpen ? "📦 Toybox Open" : "🎁 Closed Toybox"}</span>
              <span className="text-[10px] text-[#A94F65] underline">
                {isOpen ? "(peek inside)" : "(open)"}
              </span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#A94F65]">
              <Camera size={14} />
              <span>Treasured Keepsakes</span>
            </div>
          </div>

          {/* Toybox Interior */}
          {isOpen ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-end justify-center py-4">
              {toyboxKeepsakes.map((item, idx) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-3"
                  style={{
                    transform: `rotate(${idx % 2 === 0 ? "-2.5deg" : "2.5deg"})`,
                  }}
                  onPointerDown={() => handleOpenItem(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open keepsake: ${item.title}`}
                >
                  {/* Decorative Washi Ribbon */}
                  <div className="absolute -top-3 z-20 px-3 py-1 rounded-sm shadow-sm text-[10px] font-sans font-medium text-[#702C43] bg-[#F4D1D5] border border-white/80">
                    {item.sticker} {item.title}
                  </div>

                  {/* Frame */}
                  <div className="relative w-full aspect-[9/18] bg-white rounded-lg shadow-md border-2 border-[#F4D1D5] p-2 flex flex-col justify-between overflow-hidden group-hover:shadow-xl group-hover:border-[#A94F65] transition-all">
                    <div className="relative w-full h-[85%] rounded bg-[#FFF7F5] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 45vw, 220px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-center pt-1.5 border-t border-[#FCE8E8]">
                      <span className="text-[9px] font-mono tracking-wider text-[#A94F65] block truncate">
                        ★ TAP TO HOLD ★
                      </span>
                    </div>
                  </div>

                  <div className="w-4/5 h-2 bg-[#702C43]/10 rounded-full blur-xs mt-2 group-hover:scale-110 group-hover:opacity-40 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm font-serif text-[#702C43]/80 mb-3">
                The little toybox is closed. Tap below to unpack our memories.
              </p>
              <button
                type="button"
                onClick={toggleToyboxLid}
                className="px-5 py-2 rounded-full bg-[#A94F65] text-white text-xs font-medium tracking-wide shadow-md hover:bg-[#702C43] transition-all active:scale-95"
              >
                Open Our Toybox ✨
              </button>
            </div>
          )}

          {/* Toy Room Details */}
          <div className="mt-8 pt-4 border-t border-[#E8B5C0]/40 flex flex-wrap items-center justify-between text-xs text-[#702C43]/70 font-sans">
            <span className="flex items-center gap-1.5">
              <Heart size={12} className="text-[#A94F65] fill-current" />
              Treasured photobooth keepsakes
            </span>
            <span className="font-mono text-[11px] text-[#A94F65]">
              Rifky &amp; Alura // Toybox Archive
            </span>
          </div>
        </div>
      </div>

      {/* Modal Zoom with Camera Flash */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/45 backdrop-blur-md transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
        >
          {flashActive && (
            <div
              className="absolute inset-0 bg-white z-50 pointer-events-none animate-[fadeOut_0.35s_ease-out_forwards]"
              aria-hidden="true"
            />
          )}

          <div
            className={`relative max-w-md w-full bg-white rounded-2xl shadow-[0_25px_70px_rgba(112,44,67,0.35)] border-4 border-[#FCE8E8] p-4 sm:p-6 transition-all duration-500 transform ${
              isLifting ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10"
            }`}
          >
            <button
              type="button"
              onClick={handleCloseItem}
              className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-white text-[#702C43] border border-[#E8B5C0] shadow-md flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all z-20"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="flex items-center justify-between mb-3 border-b border-[#FCE8E8] pb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{selectedItem.sticker}</span>
                <span className="text-xs font-mono font-medium tracking-wider text-[#A94F65] uppercase">
                  {selectedItem.title}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#702C43]/60">
                Toybox Keepsake
              </span>
            </div>

            <div className="relative w-full aspect-[9/16] sm:aspect-[9/15] rounded-lg bg-[#FFF7F5] overflow-hidden border border-[#F4D1D5] shadow-inner">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                sizes="(max-width: 640px) 90vw, 420px"
                className="object-contain sm:object-cover object-center"
                priority
              />
            </div>

            <div
              className={`mt-4 text-center transition-all duration-500 ${
                showCaption ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <p className="font-serif italic text-lg sm:text-xl text-[#702C43] mb-1">
                &ldquo;{selectedItem.caption}&rdquo;
              </p>
              <p className="text-xs text-[#702C43]/75 font-sans leading-relaxed max-w-xs mx-auto mb-4">
                {selectedItem.note}
              </p>

              <button
                type="button"
                onClick={handleCloseItem}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFF0F2] border border-[#D58C9C] text-[#702C43] text-xs font-medium shadow-sm hover:bg-[#FCE8E8] hover:border-[#A94F65] active:scale-95 transition-all"
              >
                <RotateCcw size={13} className="text-[#A94F65]" />
                <span>put it back in the toybox</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

