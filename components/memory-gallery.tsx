"use client";

import Image from "next/image";
import { Sparkles, Heart } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { scrapbookMoments, filmstripSnaps } from "@/lib/love-story";
import { playPaperSound } from "@/lib/sound-effects";

export default function MemoryGallery() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D58C9C]/40 bg-[#FCE8E8]/70 text-[11px] font-mono tracking-widest text-[#702C43] uppercase mb-3">
          <Sparkles size={12} className="text-[#A94F65]" />
          <span>Our Little Moments // Scrapbook Album</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3 font-normal">
          Frames From Our Story
        </h2>
        <p className="text-sm sm:text-base text-[#A94F65] max-w-md mx-auto font-light leading-relaxed">
          Every photo strip, selfie, and candid smile that we collected together. Little pieces of time I hold close.
        </p>
      </div>

      {/* Film Strip Banner across the top */}
      <div className="mb-14 overflow-hidden rounded-2xl bg-[#702C43] p-3 sm:p-4 shadow-[0_12px_28px_rgba(112,44,67,0.2)]">
        <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.25em] text-[#FCE8E8]/70 uppercase px-2 mb-2">
          <span>ALURA &amp; RIFKY // WEBCAM SNAPSHOTS</span>
          <span>FILM ROLL // 2026</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {filmstripSnaps.map((snap, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-sm overflow-hidden bg-black/40 border border-white/20">
              <Image
                src={snap}
                alt="Webcam snapshot"
                fill
                sizes="(max-width: 640px) 160px, 260px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scrapbook Polaroid Collage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {scrapbookMoments.map((moment, index) => (
          <article
            key={moment.id}
            onPointerDown={() => playPaperSound()}
            className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-[1.04] hover:-translate-y-2 hover:z-20 active:scale-98"
            style={{ transform: `rotate(${moment.rotation}deg)` }}
          >
            {/* Washi tape at top */}
            <div
              className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-24"
              style={{ transform: `translateX(-50%) rotate(${moment.tapeRotation}deg)` }}
            />

            {/* Polaroid Frame */}
            <div className="polaroid-frame w-full max-w-sm rounded">
              {/* Photo Box */}
              <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden bg-[#FCE8E8] mb-3">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="(max-width: 768px) 340px, 320px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Caption and Date */}
              <div className="px-1 text-left">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#A94F65]/70 uppercase tracking-widest mb-1">
                  <span>{moment.tag}</span>
                  <span>{moment.date}</span>
                </div>
                <h3 className="font-serif italic text-lg text-[#702C43] font-medium leading-snug">
                  {moment.title}
                </h3>
                <p className="text-xs text-[#702C43]/75 font-light leading-relaxed mt-1">
                  {moment.caption}
                </p>
              </div>
            </div>

            {/* Decorative mini lily on occasional polaroids */}
            {index % 2 === 0 && (
              <div className="absolute -bottom-3 -right-2 pointer-events-none">
                <PinkLily size={38} />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
