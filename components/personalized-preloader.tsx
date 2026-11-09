"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { preloaderMessages } from "@/lib/love-story";

type PreloaderProps = {
  onComplete: () => void;
};

type Particle = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  glow: number;
  delay: number;
};

type Petal = {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  vx: number;
  vy: number;
  swingAmp: number;
  swingSpeed: number;
  phase: number;
  color: string;
  alpha: number;
};

export default function PersonalizedPreloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const sweepProgressRef = useRef<number>(-0.3);

  const handleFinish = useCallback(() => {
    if (isFinishing) return;
    setIsFinishing(true);
    const container = containerRef.current;
    if (!container) {
      onComplete();
      return;
    }

    gsap.to(container, {
      opacity: 0,
      scale: 1.04,
      filter: "blur(8px)",
      duration: 0.9,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      },
    });
  }, [isFinishing, onComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Sequential messages
    const t1 = setTimeout(() => setCurrentMessageIndex(1), 1600);
    const t2 = setTimeout(() => setCurrentMessageIndex(2), 3200);
    const t3 = setTimeout(() => {
      handleFinish();
    }, 4900);

    // Realistic progress bar
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const delta = Math.random() * 8 + 4;
        return Math.min(100, prev + delta);
      });
    }, 120);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(progressInterval);
    };
  }, [handleFinish]);

  // Setup Canvas Particles for ALURA typography and floating petals
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const initParticles = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      // Draw large elegant letters for ALURA in the center
      const fontSize = Math.min(width * 0.16, height * 0.22, 140);
      offCtx.font = `600 ${fontSize}px "Cinzel", "Playfair Display", Georgia, serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = "#ffffff";
      offCtx.letterSpacing = "0.22em";
      offCtx.fillText("ALURA", width / 2, height / 2 - 20);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const step = Math.max(3, Math.floor(fontSize / 32));
      const targets: { x: number; y: number }[] = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 140) {
            targets.push({ x, y });
          }
        }
      }

      // Max ~600 particles for silky 60fps performance
      const stride = Math.max(1, Math.floor(targets.length / 550));
      const filteredTargets = targets.filter((_, i) => i % stride === 0);

      const colors = ["#ffffff", "#ffe4ee", "#ff7da7", "#ff4d88", "#ffccd9"];

      particlesRef.current = filteredTargets.map((pt, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.min(width, height) * 0.5 + 40;
        return {
          x: pt.x + Math.cos(angle) * dist,
          y: pt.y + Math.sin(angle) * dist,
          targetX: pt.x,
          targetY: pt.y,
          vx: 0,
          vy: 0,
          radius: Math.random() * 1.5 + 0.8,
          color: colors[i % colors.length],
          alpha: 0,
          baseAlpha: Math.random() * 0.45 + 0.55,
          glow: Math.random() * 8 + 4,
          delay: Math.random() * 800,
        };
      });

      // Petals
      const petalColors = ["#ffd6e5", "#ffb3cc", "#ffffff", "#ffa1bf"];
      petalsRef.current = Array.from({ length: 22 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        vx: Math.random() * 0.6 - 0.3,
        vy: Math.random() * 0.8 + 0.4,
        swingAmp: Math.random() * 1.5 + 0.5,
        swingSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        alpha: Math.random() * 0.4 + 0.25,
      }));
    };

    initParticles();
    startTimeRef.current = performance.now();

    const render = (time: number) => {
      const elapsed = time - startTimeRef.current;
      ctx.clearRect(0, 0, width, height);

      // Deep wine glow centered behind name
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2 - 20,
        0,
        width / 2,
        height / 2 - 20,
        Math.min(width, height) * 0.65
      );
      grad.addColorStop(0, "rgba(163, 24, 71, 0.24)");
      grad.addColorStop(0.5, "rgba(69, 7, 30, 0.12)");
      grad.addColorStop(1, "rgba(8, 3, 7, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Light sweep progression
      sweepProgressRef.current += 0.004;
      if (sweepProgressRef.current > 1.4) {
        sweepProgressRef.current = -0.3;
      }
      const sweepX = width * 0.2 + sweepProgressRef.current * (width * 0.6);

      // Draw and update particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (elapsed > p.delay) {
          const t = Math.min(1, (elapsed - p.delay) / 1800);
          const ease = 1 - Math.pow(1 - t, 3);

          if (!reducedMotion) {
            p.x += (p.targetX - p.x) * (0.05 * ease) + (Math.random() - 0.5) * 0.3;
            p.y += (p.targetY - p.y) * (0.05 * ease) + (Math.random() - 0.5) * 0.3;
          } else {
            p.x = p.targetX;
            p.y = p.targetY;
          }
          p.alpha = Math.min(p.baseAlpha, p.alpha + 0.02);
        }

        // Light sweep highlight
        const distToSweep = Math.abs(p.x - sweepX);
        const sweepBoost = Math.max(0, 1 - distToSweep / 90);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + sweepBoost * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = sweepBoost > 0.2 ? "#ffffff" : p.color;
        ctx.globalAlpha = Math.min(1, p.alpha + sweepBoost * 0.5);
        if (sweepBoost > 0.3) {
          ctx.shadowColor = "#ff7da7";
          ctx.shadowBlur = p.glow * 1.5;
        }
        ctx.fill();
        ctx.restore();
      }

      // Draw and update petals
      const petals = petalsRef.current;
      for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];
        if (!reducedMotion) {
          petal.y += petal.vy;
          petal.phase += petal.swingSpeed;
          petal.x += Math.sin(petal.phase) * petal.swingAmp + petal.vx;
          petal.rotation += petal.rotSpeed;

          if (petal.y > height + 20) {
            petal.y = -20;
            petal.x = Math.random() * width;
          }
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        ctx.globalAlpha = petal.alpha;
        ctx.fillStyle = petal.color;

        // Draw delicate petal shape
        ctx.beginPath();
        ctx.moveTo(0, -petal.size);
        ctx.bezierCurveTo(
          petal.size * 0.6,
          -petal.size * 0.6,
          petal.size * 0.8,
          petal.size * 0.5,
          0,
          petal.size
        );
        ctx.bezierCurveTo(
          -petal.size * 0.8,
          petal.size * 0.5,
          -petal.size * 0.6,
          -petal.size * 0.6,
          0,
          -petal.size
        );
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-[#080307] text-white select-none overflow-hidden"
      role="progressbar"
      aria-label="Personalized preloader for Alura"
      aria-valuenow={Math.round(loadingProgress)}
    >
      {/* Dynamic Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Top subtle digital telemetry */}
      <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-rose-300/40 uppercase">
        <span>FOR GHISCCA ALURA NAZUA</span>
        <span>A WORLD MADE FOR YOU</span>
      </div>

      {/* Center Heartbeat Icon & Shimmer Below Center */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-auto mb-auto pointer-events-none">
        {/* Subtle breathing glow */}
        <div
          className="w-32 h-32 rounded-full bg-rose-600/15 filter blur-2xl animate-[pulse_2.2s_ease-in-out_infinite]"
          aria-hidden="true"
        />

        {/* Heartbeat pulse animation indicator */}
        <div className="mt-28 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose-200/50">
            HEARTBEAT // 68 BPM
          </span>
        </div>
      </div>

      {/* Bottom Sequential Message & Real Progress */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center gap-5 text-center">
        {/* Sequential messages with smooth GSAP-like key transitions */}
        <div className="h-8 flex items-center justify-center">
          <p
            key={currentMessageIndex}
            className="text-sm sm:text-base font-light tracking-wider text-rose-100/90 transition-all duration-700 animate-[fadeInUp_0.6s_ease-out]"
          >
            {preloaderMessages[currentMessageIndex]}
          </p>
        </div>

        {/* Subtle elegant progress indicator */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-44 h-0.5 bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-rose-300 to-white transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(255,100,150,0.8)]"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="w-44 flex justify-between text-[9px] font-mono tracking-widest text-white/30 uppercase">
            <span>LOADING</span>
            <span>{Math.round(loadingProgress)}%</span>
          </div>
        </div>

        {/* Skip button for accessibility and impatient visitors */}
        <button
          type="button"
          onClick={handleFinish}
          className="text-[10px] font-mono tracking-widest text-rose-300/40 hover:text-rose-200 transition-colors uppercase pt-1"
        >
          [ Skip to Experience ]
        </button>
      </div>
    </div>
  );
}

