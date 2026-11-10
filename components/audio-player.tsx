"use client";

import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { Play, Pause } from "lucide-react";
import PinkLily from "@/components/pink-lily";

export type AudioPlayerHandle = {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  getEnergy: () => number;
  isPlaying: boolean;
};

type AudioPlayerProps = {
  autoPlayAttempt?: boolean;
};

export const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(
  function AudioPlayer({ autoPlayAttempt = true }, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
    const energyRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);

    // Setup Web Audio Analyser for music reactivity
    const setupAudioContext = useCallback(() => {
      if (audioContextRef.current || !audioRef.current) return;
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.8;
        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      } catch (e) {
        console.warn("AudioContext setup notice:", e);
      }
    }, []);

    // Frame loop to calculate real-time energy
    useEffect(() => {
      let isRunning = true;
      const updateEnergy = () => {
        if (!isRunning) return;
        if (analyserRef.current && dataArrayRef.current && isPlaying) {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          let sum = 0;
          const count = Math.min(8, dataArrayRef.current.length);
          for (let i = 0; i < count; i++) {
            sum += dataArrayRef.current[i];
          }
          const rawEnergy = sum / (count * 255);
          energyRef.current = energyRef.current * 0.7 + rawEnergy * 0.3;
        } else if (isPlaying) {
          const t = Date.now() / 1000;
          const beat = Math.pow(Math.sin(t * Math.PI * 1.1), 4);
          energyRef.current = 0.15 + beat * 0.25;
        } else {
          energyRef.current = energyRef.current * 0.85;
        }

        document.documentElement.style.setProperty(
          "--music-energy",
          energyRef.current.toFixed(3)
        );

        rafRef.current = requestAnimationFrame(updateEnergy);
      };

      rafRef.current = requestAnimationFrame(updateEnergy);
      return () => {
        isRunning = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [isPlaying]);

    const playAudio = useCallback(async () => {
      const audio = audioRef.current;
      if (!audio) return;
      try {
        setupAudioContext();
        if (audioContextRef.current?.state === "suspended") {
          await audioContextRef.current.resume();
        }
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        console.warn("Autoplay notice:", err);
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    }, [setupAudioContext]);

    const pauseAudio = useCallback(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      setIsPlaying(false);
    }, []);

    const togglePlay = useCallback(() => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    }, [isPlaying, pauseAudio, playAudio]);

    useImperativeHandle(
      ref,
      () => ({
        play: playAudio,
        pause: pauseAudio,
        toggle: togglePlay,
        getEnergy: () => energyRef.current,
        isPlaying,
      }),
      [playAudio, pauseAudio, togglePlay, isPlaying]
    );

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handleCanPlay = () => {
        if (autoPlayAttempt) {
          playAudio();
        }
      };

      audio.addEventListener("canplaythrough", handleCanPlay, { once: true });

      const handleFirstInteraction = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
          playAudio();
        }
        window.removeEventListener("pointerdown", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);
      };

      window.addEventListener("pointerdown", handleFirstInteraction);
      window.addEventListener("keydown", handleFirstInteraction);

      return () => {
        window.removeEventListener("pointerdown", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);
        audio.removeEventListener("canplaythrough", handleCanPlay);
      };
    }, [autoPlayAttempt, playAudio]);

    return (
      <>
        <audio
          ref={audioRef}
          src="/audio/dinda.mp3"
          loop
          preload="auto"
          playsInline
        />

        {/* Elegant Floating Sound Control in Soft Blush & Burgundy */}
        <aside
          className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none"
          role="region"
          aria-label="Sound player"
        >
          <button
            type="button"
            onClick={togglePlay}
            className={`group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 backdrop-blur-md ${
              isPlaying
                ? "bg-white/90 border-[#D58C9C] text-[#702C43] shadow-[0_4px_16px_rgba(169,79,101,0.18)] hover:border-[#A94F65]"
                : autoplayBlocked
                ? "bg-[#FCE8E8] border-[#A94F65] text-[#702C43] animate-pulse hover:bg-[#F4D1D5]"
                : "bg-white/80 border-[#E8B5C0] text-[#702C43]/80 hover:border-[#D58C9C]"
            }`}
            title={isPlaying ? "Pause soundtrack" : "Play Dinda"}
            aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
          >
            {/* Visualizer bars */}
            <span className="flex items-end gap-0.5 h-3.5 w-3.5" aria-hidden="true">
              <span
                className={`w-0.5 rounded-full bg-[#A94F65] transition-all duration-150 ${
                  isPlaying ? "animate-[soundbar_0.8s_ease-in-out_infinite]" : "h-1"
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-[#A94F65] transition-all duration-150 ${
                  isPlaying ? "animate-[soundbar_0.6s_ease-in-out_infinite_0.2s]" : "h-2"
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-[#A94F65] transition-all duration-150 ${
                  isPlaying ? "animate-[soundbar_1s_ease-in-out_infinite_0.4s]" : "h-1.5"
                }`}
              />
            </span>

            <span className="text-[11px] font-mono tracking-widest uppercase">
              {isPlaying ? "Dinda // Playing" : autoplayBlocked ? "Tap for Music" : "Dinda // Paused"}
            </span>

            {isPlaying ? (
              <Pause size={12} className="opacity-80 group-hover:opacity-100 transition-opacity text-[#702C43]" />
            ) : (
              <Play size={12} className="opacity-80 group-hover:opacity-100 transition-opacity text-[#702C43] fill-current" />
            )}
          </button>
        </aside>
      </>
    );
  }
);
