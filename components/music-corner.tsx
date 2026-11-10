"use client";

import { useState, useCallback, useEffect } from "react";
import { Play, Pause, SkipForward, Disc3, Sparkles, Volume2 } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPopSound } from "@/lib/sound-effects";

export default function MusicCorner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState("Shape of My Heart");

  // Synchronize with document and audio elements if active
  useEffect(() => {
    const checkAudio = () => {
      const audioEl = document.querySelector("audio");
      if (audioEl) {
        setIsPlaying(!audioEl.paused);
        if (audioEl.src.includes("dinda")) {
          setTrackName("Dinda");
        } else {
          setTrackName("Shape of My Heart");
        }
      }
    };

    const interval = setInterval(checkAudio, 800);
    return () => clearInterval(interval);
  }, []);

  const handleTogglePlay = useCallback(() => {
    playPopSound();
    const audioEl = document.querySelector("audio");
    if (!audioEl) return;
    if (audioEl.paused) {
      audioEl.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audioEl.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleNextTrack = useCallback(() => {
    playPopSound();
    const audioEl = document.querySelector("audio");
    if (!audioEl) return;
    const isCurrentlyDinda = audioEl.src.includes("dinda");
    audioEl.src = isCurrentlyDinda ? "/audio/Shape-of-My-Heart.mp3" : "/audio/dinda.mp3";
    audioEl.play().catch(() => {});
    setIsPlaying(true);
    setTrackName(isCurrentlyDinda ? "Shape of My Heart" : "Dinda");
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto select-none">
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Acoustic Parlor // Melodies for Alura
          </span>
          <span className="text-sm">🎧</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-[#702C43] tracking-tight mb-2">
          The Little Music Corner
        </h2>

        <p className="text-xs sm:text-sm text-[#702C43]/75 font-sans">
          A cozy vintage vinyl record player spinning our favorite soundtrack.
        </p>
      </div>

      {/* Mini Pink Record Player */}
      <div className="relative max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.25)] flex flex-col items-center">
        
        {/* The Turntable Platter */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#3B1422] via-[#702C43] to-[#3B1422] p-2 shadow-2xl flex items-center justify-center border-4 border-white">
          
          {/* Vinyl Disc with Grooves */}
          <div
            className={`relative w-full h-full rounded-full bg-[#1F0B13] border-4 border-[#702C43]/50 flex items-center justify-center shadow-inner ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
          >
            {/* Concentric Groove Rings */}
            <div className="absolute inset-4 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-white/10 pointer-events-none" />

            {/* Pink Center Label */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#F4D1D5] to-[#FCE8E8] border-2 border-white shadow-sm flex flex-col items-center justify-center text-center p-1">
              <span className="text-[8px] font-mono font-bold text-[#702C43]">ALURA</span>
              <span className="text-[7px] font-mono text-[#A94F65]">SIDE A</span>
              <div className="w-2 h-2 rounded-full bg-[#702C43] mt-0.5" />
            </div>
          </div>

          {/* Tonearm Stylus */}
          <div
            className={`absolute -top-2 right-2 w-16 h-28 pointer-events-none transition-transform duration-700 origin-top-right ${
              isPlaying ? "rotate-12" : "-rotate-12"
            }`}
          >
            <div className="w-1.5 h-20 bg-[#E8B5C0] rounded-full shadow-sm ml-auto mr-2" />
            <div className="w-4 h-5 bg-[#A94F65] rounded-xs shadow-md ml-auto" />
          </div>
        </div>

        {/* Track Title and Controls */}
        <div className="mt-6 text-center w-full">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#A94F65] block">
            NOW SPINNING
          </span>
          <h3 className="font-serif italic text-xl text-[#702C43] font-medium mt-0.5 mb-4">
            {trackName}
          </h3>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-medium shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              <span>{isPlaying ? "Pause Track" : "Spin Record"}</span>
            </button>

            <button
              type="button"
              onClick={handleNextTrack}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#E8B5C0] text-[#702C43] text-xs font-medium shadow-xs hover:bg-[#FCE8E8] active:scale-95 transition-all"
              title="Next Track"
            >
              <SkipForward size={14} />
              <span>Switch Song</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

