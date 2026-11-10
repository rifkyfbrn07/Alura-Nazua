"use client";

import { useState } from "react";
import { Sparkles, Heart, X, Coffee, Utensils, Cookie, Flame } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { favoriteThings, type FavoriteThing } from "@/lib/love-story";

export default function LittleThings() {
  const [activeItem, setActiveItem] = useState<FavoriteThing | null>(null);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D58C9C]/40 bg-[#FCE8E8]/70 text-[11px] font-mono tracking-widest text-[#702C43] uppercase mb-3">
          <Sparkles size={12} className="text-[#A94F65]" />
          <span>Alura&apos;s Favorites // Scrapbook Notes</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3 font-normal">
          The Little Things I Love About You
        </h2>
        <p className="text-sm sm:text-base text-[#A94F65] max-w-md mx-auto font-light leading-relaxed">
          I remember all the little things that bring you comfort and a smile. Tap any favorite to read what it means to me.
        </p>
      </div>

      {/* Scrapbook Grid of Stickers and Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {favoriteThings.map((item, index) => {
          const rotation = index % 3 === 0 ? "-2deg" : index % 2 === 0 ? "2.5deg" : "-1deg";
          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative bg-white rounded-2xl p-5 border border-[#F4D1D5] shadow-[0_8px_20px_rgba(112,44,67,0.06)] cursor-pointer transition-all duration-300 hover:shadow-[0_14px_30px_rgba(112,44,67,0.14)] hover:scale-105"
              style={{ transform: `rotate(${rotation})` }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveItem(item);
                }
              }}
              aria-label={`Open note for ${item.name}`}
            >
              {/* Mini washi tape in corner */}
              <div
                className="washi-tape top-[-7px] left-1/2 -translate-x-1/2 w-14"
                style={{ backgroundColor: item.accentColor }}
              />

              {/* Icon badge */}
              <div className="w-12 h-12 rounded-xl bg-[#FFF7F5] border border-[#FCE8E8] flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                {item.iconType === "lily" ? (
                  <PinkLily size={36} />
                ) : item.iconType === "butterfly" ? (
                  <span className="text-2xl" role="img" aria-label="butterfly">🦋</span>
                ) : item.iconType === "sparkle" ? (
                  <Sparkles size={24} className="text-[#D58C9C]" />
                ) : item.iconType === "cup" || item.iconType === "coffee" ? (
                  <Coffee size={22} className="text-[#A94F65]" />
                ) : item.iconType === "cookie" || item.iconType === "cake" ? (
                  <Cookie size={22} className="text-[#D58C9C]" />
                ) : (
                  <Utensils size={22} className="text-[#A94F65]" />
                )}
              </div>

              <div className="text-center">
                <span className="text-[9px] font-mono tracking-widest text-[#A94F65]/70 uppercase block mb-0.5">
                  {item.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg text-[#702C43] font-medium tracking-tight">
                  {item.name}
                </h3>
                <span className="text-[9px] font-mono text-[#D58C9C] mt-2 block tracking-wider">
                  [ TAP NOTE ]
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Note Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FFF7F5]/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm bg-white border border-[#F4D1D5] rounded-2xl p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(112,44,67,0.16)]">
            <div className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-24" />

            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FFF7F5] hover:bg-[#FCE8E8] text-[#702C43] transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <span className="text-[10px] font-mono tracking-[0.2em] text-[#A94F65] uppercase mb-1 block">
              A NOTE FOR ALURA // {activeItem.category}
            </span>
            <h3 className="font-serif text-2xl text-[#702C43] font-medium mb-3">
              {activeItem.name}
            </h3>

            <div className="w-10 h-0.5 bg-[#F4D1D5] mx-auto mb-4" />

            <p className="font-serif italic text-base sm:text-lg text-[#702C43]/90 leading-relaxed mb-6">
              &ldquo;{activeItem.message}&rdquo;
            </p>

            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="px-6 py-2 rounded-full border border-[#D58C9C] bg-[#FCE8E8] hover:bg-[#F4D1D5] text-[#702C43] text-xs font-mono tracking-wider uppercase transition-colors"
            >
              Keep in Heart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

