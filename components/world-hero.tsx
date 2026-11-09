"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowDown } from "lucide-react";
import { recipientFullName, recipientName, creatorName } from "@/lib/love-story";
import ghisccaPhoto from "@/image/Ghiscca.jpeg";

export default function WorldHero() {
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const dateStr = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setTimestamp(`${dateStr} // ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full min-h-[92vh] flex flex-col justify-between items-center px-4 sm:px-8 py-10 text-center select-none overflow-hidden">
      {/* Top telemetry bar */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-rose-300/40 uppercase pt-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          <span>ORIGIN // {creatorName.toUpperCase()}</span>
        </div>
        <div className="text-rose-200/60 font-semibold tracking-[0.2em]">
          DESTINATION // {recipientFullName.toUpperCase()}
        </div>
        <div>
          <span>{timestamp || "LIVE // ARCHIVE"}</span>
        </div>
      </div>

      {/* Main hero typography & centerpiece */}
      <div className="relative z-10 max-w-3xl my-auto flex flex-col items-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/20 text-[11px] font-mono tracking-widest text-rose-300 uppercase mb-6">
          <Sparkles size={12} className="text-rose-400" />
          <span>A World Made For Alura</span>
        </div>

        {/* Cinematic headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight mb-6 leading-[1.1]">
          A World Made
          <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-300 to-white">
            Just For You.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-rose-100/80 font-light max-w-xl mx-auto mb-4 leading-relaxed">
          &ldquo;You&apos;re still someone very special to me.&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-rose-300/50 max-w-md mx-auto font-light leading-relaxed mb-8">
          I don&apos;t think I ever told you enough how beautiful you are to me. Even with time passing, this little world remains yours.
        </p>

        {/* Small delicate floating portrait */}
        <div className="relative w-28 sm:w-36 aspect-[4/5] rounded-xl overflow-hidden p-1.5 bg-gradient-to-b from-rose-500/30 to-black border border-rose-400/30 shadow-[0_10px_25px_rgba(255,77,141,0.25)] transition-transform duration-500 hover:scale-105">
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
            <Image
              src={ghisccaPhoto}
              alt="Portrait of Alura"
              fill
              className="object-cover"
              sizes="150px"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest text-rose-300/40 uppercase animate-bounce pt-4">
        <span>EXPLORE HER WORLD</span>
        <ArrowDown size={14} className="text-rose-400/70" />
      </div>
    </header>
  );
}

