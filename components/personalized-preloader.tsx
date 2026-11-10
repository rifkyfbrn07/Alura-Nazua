"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import PinkLily from "@/components/pink-lily";
import { preloaderSteps, recipientName } from "@/lib/love-story";

type PreloaderProps = {
  onComplete: () => void;
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
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number | null>(null);

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
      scale: 1.03,
      filter: "blur(8px)",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete,
    });
  }, [isFinishing, onComplete]);

  // Sequential message steps
  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStep(1), 1400); // reveals "Alura"
    const t2 = setTimeout(() => setCurrentStep(2), 2700); // reveals "A little world made just for you."
    const t3 = setTimeout(() => handleFinish(), 4200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(100, prev + 5);
      });
    }, 150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(progressInterval);
    };
  }, [handleFinish]);

  // Petal rain canvas
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
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#FFF7F5", "#FCE8E8", "#F4D1D5", "#E8B5C0", "#D58C9C"];
    petalsRef.current = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.7 + 0.4,
      swingAmp: Math.random() * 1.5 + 0.5,
      swingSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.45 + 0.35,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

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
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-[#FFF7F5] via-[#FCE8E8] to-[#F4D1D5] text-[#702C43] select-none overflow-hidden"
      role="progressbar"
      aria-label="Preloader for Alura's Little Lily World"
      aria-valuenow={progress}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Top Telemetry in Soft Burgundy */}
      <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-[#A94F65]/70 uppercase">
        <span>ALURA&apos;S LITTLE LILY WORLD</span>
        <span>A GIFT FROM RIFKY</span>
      </div>

      {/* Center Centerpiece: Blooming Lily & Name */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4">
        {/* Soft Pink Lily with subtle breathing glow */}
        <div className="relative mb-6 animate-[gentleFloat_4s_ease-in-out_infinite]">
          <div className="absolute inset-0 rounded-full bg-[#F4D1D5]/60 filter blur-xl scale-125" />
          <PinkLily size={110} />
        </div>

        {/* Step 0: "Something special is blooming..." */}
        {currentStep === 0 && (
          <p className="font-serif italic text-lg sm:text-2xl text-[#702C43] tracking-wide animate-[fadeIn_0.5s_ease-out]">
            {preloaderSteps[0]}
          </p>
        )}

        {/* Step 1: "Alura" */}
        {currentStep >= 1 && (
          <div className="animate-[fadeInUp_0.6s_ease-out]">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#A94F65] block mb-1">
              FOR MY SPECIAL PERSON
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#702C43] font-normal tracking-wide drop-shadow-sm">
              {recipientName}
            </h1>
          </div>
        )}

        {/* Step 2: "A little world made just for you." */}
        {currentStep >= 2 && (
          <p className="font-serif text-base sm:text-xl text-[#A94F65] font-light mt-4 tracking-wide max-w-sm mx-auto animate-[fadeInUp_0.6s_ease-out]">
            {preloaderSteps[2]}
          </p>
        )}

        {/* Delicate Ribbon Detail */}
        <div className="mt-6 flex items-center gap-2 opacity-60">
          <span className="w-8 h-px bg-[#D58C9C]" />
          <span className="text-xs text-[#A94F65]">❦</span>
          <span className="w-8 h-px bg-[#D58C9C]" />
        </div>
      </div>

      {/* Bottom Progress Bar & Skip */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-2 text-center">
        <div className="w-36 h-1 bg-[#F4D1D5] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D58C9C] to-[#702C43] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          type="button"
          onClick={handleFinish}
          className="text-[10px] font-mono tracking-widest text-[#A94F65]/70 hover:text-[#702C43] transition-colors uppercase pt-1"
        >
          [ Enter World ]
        </button>
      </div>
    </div>
  );
}
