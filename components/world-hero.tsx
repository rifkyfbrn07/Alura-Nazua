"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowDown } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { HiddenLilyTrigger } from "@/components/hidden-lilies-manager";
import { recipientFullName, recipientName, creatorName } from "@/lib/love-story";
import mybiniPhoto from "@/image/mybini.jpeg";

export default function WorldHero() {
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const dateStr = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
      setTimestamp(`${dateStr} // ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full min-h-[90vh] flex flex-col justify-between items-center px-4 sm:px-8 py-8 text-center select-none overflow-hidden bg-gradient-to-b from-[#FFF7F5] via-[#FCE8E8]/50 to-[#FFF7F5]">
      {/* Decorative Corner Lilies */}
      <div className="absolute top-6 left-6 opacity-30 pointer-events-none hidden sm:block">
        <PinkLily size={70} />
      </div>
      <div className="absolute top-6 right-20 opacity-30 pointer-events-none hidden sm:block">
        <PinkLily size={70} />
      </div>

      {/* Top Telemetry / Scrapbook Header */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#A94F65]/80 uppercase pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D58C9C] animate-pulse" />
          <span>ORIGIN // {creatorName.toUpperCase()}</span>
        </div>
        <div className="text-[#702C43] font-semibold tracking-[0.2em]">
          DESTINATION // {recipientFullName.toUpperCase()}
        </div>
        <div>
          <span>{timestamp || "LIVE ARCHIVE"}</span>
        </div>
      </div>

      {/* Main Headline Centerpiece */}
      <div className="relative z-10 max-w-3xl my-auto flex flex-col items-center">
        {/* Soft Badge with Pink Lily */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D58C9C]/40 bg-white shadow-sm text-xs font-mono tracking-widest text-[#702C43] uppercase mb-6">
          <PinkLily size={16} />
          <span>Alura&apos;s Little Lily World</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#702C43] tracking-tight mb-4 leading-[1.15]">
          A Little World,
          <br />
          <span className="italic font-normal text-[#A94F65]">
            Made Just For You.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-[#702C43]/90 font-light max-w-xl mx-auto mb-3 leading-relaxed">
          &ldquo;A place filled with the little things I love about you, our memories, and everything I still want to keep building with you.&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-[#A94F65] max-w-md mx-auto font-light leading-relaxed mb-6">
          Nostalgic scrapbook pages, your favorite pink lilies, and our constellation of memories.
        </p>

        {/* Small delicate floating polaroid preview */}
        <div className="relative w-32 sm:w-36 -rotate-2 hover:rotate-0 transition-transform duration-300">
          <div className="washi-tape top-[-8px] left-1/2 -translate-x-1/2 w-20" />
          {/* Easter egg hidden lily #1 */}
          <div className="absolute -top-3 -right-3 z-30">
            <HiddenLilyTrigger id="lily-hero" />
          </div>
          <div className="polaroid-frame w-full rounded">
            <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-[#FCE8E8]">
              <Image
                src={mybiniPhoto}
                alt="Portrait of Alura smiling"
                fill
                className="object-cover"
                sizes="150px"
                priority
              />
            </div>
            <p className="font-serif italic text-[10px] text-[#702C43]/80 pt-2 text-center">
              my favorite person
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#A94F65] uppercase animate-bounce pt-4">
        <span>EXPLORE ALURA&apos;S WORLD</span>
        <ArrowDown size={14} className="text-[#A94F65]" />
      </div>
    </header>
  );
}
