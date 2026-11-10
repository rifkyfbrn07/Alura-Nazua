"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Sparkles, Camera, Heart, RotateCcw, X, Stamp } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { HiddenLilyTrigger } from "@/components/hidden-lilies-manager";
import { gacoanPhotoboothStrips, type GacoanPhotoboothStrip } from "@/lib/love-story";
import { playCameraShutter, playPaperSound, playPopSound } from "@/lib/sound-effects";

export default function GacoanPhotobooth() {
  const [selectedStrip, setSelectedStrip] = useState<GacoanPhotoboothStrip | null>(null);
  const [isLifting, setIsLifting] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [showCaption, setShowCaption] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Handle clicking / tapping a photobooth strip
  const handleOpenStrip = useCallback((strip: GacoanPhotoboothStrip) => {
    playPaperSound();
    setSelectedStrip(strip);
    setIsLifting(true);
    setShowCaption(false);
    setFlashActive(false);

    // Sequence: lift -> film camera flash -> freshly printed reveal
    setTimeout(() => {
      setFlashActive(true);
      playCameraShutter();
      setTimeout(() => {
        setFlashActive(false);
        setShowCaption(true);
      }, 350);
    }, 400);
  }, []);

  const handleCloseStrip = useCallback(() => {
    playPaperSound();
    setShowCaption(false);
    setIsLifting(false);
    setTimeout(() => {
      setSelectedStrip(null);
    }, 380);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto select-none overflow-hidden"
      aria-label="Our Little Gacoan Memory"
    >
      {/* Background Soft Lily & Bokeh Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-12 left-[10%] w-48 h-24 bg-[#FCE8E8]/70 rounded-full blur-2xl opacity-60 animate-[gentleFloat_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-16 right-[12%] w-56 h-28 bg-[#F4D1D5]/60 rounded-full blur-2xl opacity-60 animate-[gentleFloat_11s_ease-in-out_infinite_1.5s]" />
      </div>

      {/* Chapter Header */}
      <div className="relative text-center max-w-2xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Special Chapter // Photobooth Keepsakes
          </span>
          <Camera size={13} className="text-[#D58C9C]" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#702C43] tracking-tight mb-4">
          Our Little Gacoan Memory
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/80 font-sans leading-relaxed max-w-lg mx-auto">
          Our actual photobooth strips and sweet moments together at Mie Gacoan.
          Tap any strip to hold it closer and see it freshly printed.
        </p>

        {/* Central Botanical Pink Lily */}
        <div className="flex justify-center mt-5">
          <PinkLily size={48} />
        </div>
      </div>

      {/* Scrapbook Photobooth Showcase Sleeve */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.22)] p-6 sm:p-10 md:p-12 overflow-hidden">
          
          {/* Top Photobooth Stamp Header */}
          <div className="flex items-center justify-between border-b border-[#E8B5C0]/60 pb-5 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#702C43]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A94F65] animate-pulse" />
              <span className="font-semibold tracking-wider">MIE GACOAN // PHOTOBOOTH ARCHIVE</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#D58C9C] text-[#A94F65] text-[11px] font-mono shadow-xs">
              <Stamp size={12} />
              <span>Lab Box Series</span>
              <HiddenLilyTrigger id="lily-gacoan" />
            </div>
          </div>

          {/* Grid of Photobooth Strips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-end justify-center py-3">
            {gacoanPhotoboothStrips.map((strip, idx) => {
              return (
                <div
                  key={strip.id}
                  className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:-translate-y-3.5 hover:z-20 active:scale-98"
                  style={{
                    transform: `rotate(${strip.rotation}deg)`,
                  }}
                  onPointerDown={() => handleOpenStrip(strip)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photobooth strip: ${strip.title}`}
                >
                  {/* Decorative Washi Ribbon at Top of Strip */}
                  <div
                    className="absolute -top-3.5 z-20 px-3 py-1 rounded-sm shadow-sm text-[10px] font-sans font-medium text-[#702C43] border border-white/80 whitespace-nowrap"
                    style={{ backgroundColor: strip.ribbonColor }}
                  >
                    {strip.sticker} {strip.title}
                  </div>

                  {/* Vertical Photobooth Strip Frame */}
                  <div className="relative w-full aspect-[9/18] bg-white rounded-lg shadow-md border-2 border-[#F4D1D5] p-2 flex flex-col justify-between overflow-hidden group-hover:shadow-2xl group-hover:border-[#A94F65] transition-all">
                    {/* Image */}
                    <div className="relative w-full h-[85%] rounded bg-[#FFF7F5] overflow-hidden">
                      <Image
                        src={strip.image}
                        alt={strip.title}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 220px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                      />
                    </div>

                    {/* Strip Footer Stamp */}
                    <div className="text-center pt-1.5 border-t border-[#FCE8E8] flex items-center justify-between px-1">
                      <span className="text-[9px] font-mono tracking-widest text-[#A94F65] truncate">
                        {strip.stamp}
                      </span>
                      <span className="text-[9px] text-[#A94F65]">★</span>
                    </div>
                  </div>

                  {/* Soft Paper Shadow */}
                  <div className="w-4/5 h-2.5 bg-[#702C43]/10 rounded-full blur-xs mt-2 group-hover:scale-110 group-hover:opacity-40 transition-all" />
                </div>
              );
            })}
          </div>

          {/* Bottom Caption & Location Stamp */}
          <div className="mt-8 pt-5 border-t border-[#E8B5C0]/50 flex flex-wrap items-center justify-between text-xs text-[#702C43]/75 font-sans">
            <span className="flex items-center gap-1.5 font-medium">
              <Heart size={12} className="text-[#A94F65] fill-current" />
              Photographed together at Mie Gacoan
            </span>
            <span className="font-mono text-[11px] text-[#A94F65] tracking-wider">
              RIFKY &amp; ALURA // GACOAN MOMENTS
            </span>
          </div>
        </div>
      </div>

      {/* MODAL: FRESHLY PRINTED PHOTOBOOTH STRIP ZOOM WITH CAMERA FLASH */}
      {selectedStrip && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#702C43]/50 backdrop-blur-md transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={selectedStrip.title}
        >
          {/* Subtle Film-Camera Flash Animation */}
          {flashActive && (
            <div
              className="absolute inset-0 bg-white z-50 pointer-events-none animate-[fadeOut_0.35s_ease-out_forwards]"
              aria-hidden="true"
            />
          )}

          {/* The Zoomed Photobooth Strip */}
          <div
            className={`relative max-w-md w-full bg-white rounded-2xl shadow-[0_25px_70px_rgba(112,44,67,0.4)] border-4 border-[#FCE8E8] p-4 sm:p-6 transition-all duration-500 transform ${
              isLifting ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10"
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseStrip}
              className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-white text-[#702C43] border border-[#E8B5C0] shadow-md flex items-center justify-center hover:bg-[#FCE8E8] active:scale-90 transition-all z-20"
              title="Close photobooth strip"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Top Photobooth Strip Header */}
            <div className="flex items-center justify-between mb-3 border-b border-[#FCE8E8] pb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{selectedStrip.sticker}</span>
                <span className="text-xs font-mono font-medium tracking-wider text-[#A94F65] uppercase">
                  {selectedStrip.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#702C43]/70">
                {selectedStrip.stamp}
              </span>
            </div>

            {/* The Photo Image */}
            <div className="relative w-full aspect-[9/16] sm:aspect-[9/15] rounded-lg bg-[#FFF7F5] overflow-hidden border border-[#F4D1D5] shadow-inner">
              <Image
                src={selectedStrip.image}
                alt={selectedStrip.title}
                fill
                sizes="(max-width: 640px) 90vw, 420px"
                className="object-contain sm:object-cover object-center"
                priority
              />
            </div>

            {/* Handwritten Caption & Description */}
            <div
              className={`mt-4 text-center transition-all duration-500 ${
                showCaption ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <p className="font-serif italic text-lg sm:text-xl text-[#702C43] mb-1">
                &ldquo;{selectedStrip.caption}&rdquo;
              </p>
              <p className="text-xs text-[#702C43]/80 font-sans leading-relaxed max-w-xs mx-auto mb-4">
                {selectedStrip.note}
              </p>

              {/* Action Button: "put it back" */}
              <button
                type="button"
                onClick={handleCloseStrip}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFF0F2] border border-[#D58C9C] text-[#702C43] text-xs font-medium shadow-sm hover:bg-[#FCE8E8] hover:border-[#A94F65] active:scale-95 transition-all"
              >
                <RotateCcw size={13} className="text-[#A94F65]" />
                <span>put it back</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

