"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { X, Sparkles, Eye, RotateCw } from "lucide-react";
import gsap from "gsap";
import { orbitMemories, recipientName, hiddenParticleMessage } from "@/lib/love-story";

type OrbitMemory = {
  image: StaticImageData;
  caption: string;
  alt: string;
  quote: string;
};

type Star = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
};

export default function MemoryOrbit() {
  const worldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const angleRef = useRef<number>(0);
  const velocityRef = useRef<number>(0.0015);
  const dragRef = useRef<{ isDragging: boolean; startX: number; startAngle: number; moved: boolean }>({
    isDragging: false,
    startX: 0,
    startAngle: 0,
    moved: false,
  });

  const [activeMemory, setActiveMemory] = useState<OrbitMemory | null>(null);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(q.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    q.addEventListener("change", handler);
    return () => q.removeEventListener("change", handler);
  }, []);

  // 1. Particle Constellation & Heart Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    const stars: Star[] = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.001 + 0.0005,
    }));

    let animId: number;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Read audio energy from CSS variable
      const musicEnergy =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--music-energy")
        ) || 0;

      // Draw starry constellation
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!reducedMotion) {
          star.alpha = 0.25 + Math.sin(time * star.speed + i) * 0.35 + musicEnergy * 0.2;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size + musicEnergy * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? "#ff8eb5" : "#ffffff";
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fill();

        // Connect nearby stars with delicate lines
        if (i % 6 === 0 && i + 1 < stars.length) {
          const neighbor = stars[i + 1];
          const dist = Math.hypot(neighbor.x - star.x, neighbor.y - star.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.strokeStyle = "rgba(255, 140, 180, 0.12)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw Center Particle Heart
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const heartPoints = 84;
      const baseScale = Math.min(width, height) * 0.0042;
      const pulse = 1 + Math.sin(time * 0.003) * 0.04 + musicEnergy * 0.12;
      const scale = baseScale * pulse;

      ctx.save();
      for (let i = 0; i < heartPoints; i++) {
        const t = (i / heartPoints) * Math.PI * 2;
        // Mathematical Heart Curve
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        );

        const px = centerX + hx * scale;
        const py = centerY + hy * scale;

        ctx.beginPath();
        ctx.arc(px, py, 1.2 + musicEnergy * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "#ff699a" : "#fff0f5";
        ctx.globalAlpha = 0.35 + Math.sin(time * 0.002 + i) * 0.2 + musicEnergy * 0.3;
        ctx.shadowColor = "#ff4d8d";
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  // 2. 3D Orbit Layout & Physics Loop
  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;

    const cards = Array.from(world.querySelectorAll<HTMLElement>(".orbit-card"));
    let animId: number;

    const tick = () => {
      if (!dragRef.current.isDragging) {
        angleRef.current += velocityRef.current;
      }

      const rect = world.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Responsive orbit radii
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1100;
      const radiusX = isMobile ? w * 0.38 : isTablet ? w * 0.4 : Math.min(w * 0.38, 520);
      const radiusY = isMobile ? h * 0.22 : isTablet ? h * 0.26 : Math.min(h * 0.28, 200);

      const count = cards.length;
      cards.forEach((card, index) => {
        const offset = (index / count) * Math.PI * 2;
        const currentAngle = angleRef.current + offset;

        const x = Math.cos(currentAngle) * radiusX;
        const y = Math.sin(currentAngle) * radiusY;
        const z = Math.sin(currentAngle); // -1 (back) to +1 (front)

        // Depth projection
        const depthNorm = (z + 1) * 0.5; // 0 to 1
        const scale = 0.72 + depthNorm * 0.38;
        const opacity = 0.35 + depthNorm * 0.65;
        const zIndex = Math.round(depthNorm * 100);

        card.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
        card.style.opacity = opacity.toFixed(2);
        card.style.zIndex = `${zIndex}`;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer & Touch Controls
  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startAngle: angleRef.current,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    if (Math.abs(deltaX) > 4) {
      dragRef.current.moved = true;
    }
    angleRef.current = dragRef.current.startAngle + deltaX * 0.005;
  };

  const handlePointerUp = () => {
    dragRef.current.isDragging = false;
  };

  const handleCardClick = (memory: OrbitMemory) => {
    if (dragRef.current.moved) return;
    setActiveMemory(memory);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden select-none">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8 relative z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-[11px] font-mono tracking-widest text-rose-300 uppercase mb-3">
          <Sparkles size={12} className="text-rose-400" />
          <span>Interactive Constellation // Memories of Alura</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-3">
          The Orbit of Our Moments
        </h2>
        <p className="text-sm sm:text-base text-rose-200/60 max-w-lg mx-auto font-light leading-relaxed">
          Drag to rotate the memories floating around your constellation. Click any photograph to read what it holds.
        </p>
      </div>

      {/* Orbit Container with Canvas Background */}
      <div
        ref={worldRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Central Pulse Centerpiece with Name */}
        <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose-300/40 mb-1">
            CENTER OF MEMORY
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-light text-rose-100/90 tracking-widest">
            {recipientName}
          </div>
        </div>

        {/* Hidden Interactive Star trigger */}
        <button
          type="button"
          onClick={() => setShowHiddenMessage(true)}
          className="group absolute top-12 right-8 sm:right-16 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-black/50 backdrop-blur-md text-[11px] font-mono text-rose-200/80 hover:text-white hover:border-rose-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,77,141,0.2)]"
          title="A hidden message for Alura"
        >
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span>A Delicate Message Hidden Here</span>
        </button>

        {/* Floating Memory Cards */}
        {orbitMemories.map((memory, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(memory)}
            className="orbit-card absolute top-1/2 left-1/2 -ml-16 sm:-ml-20 -mt-20 sm:-mt-24 w-32 sm:w-40 h-40 sm:h-48 rounded-xl bg-gradient-to-b from-stone-900/90 to-black/95 p-2 sm:p-2.5 border border-rose-500/25 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(255,77,141,0.15)] flex flex-col cursor-pointer transition-shadow hover:border-rose-300 hover:shadow-[0_0_25px_rgba(255,77,141,0.4)]"
          >
            <div className="relative w-full flex-1 rounded-lg overflow-hidden bg-black">
              <Image
                src={memory.image}
                alt={memory.alt}
                fill
                sizes="(max-width: 640px) 130px, 160px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="pt-2 text-center">
              <span className="text-[10px] font-mono tracking-wider text-rose-200/80 uppercase truncate block">
                {memory.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Memory Modal when a card is clicked */}
      {activeMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#160714] border border-rose-500/30 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,77,141,0.25)] flex flex-col items-center text-center">
            <button
              type="button"
              onClick={() => setActiveMemory(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Photo frame */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-white/10 shadow-inner">
              <Image
                src={activeMemory.image}
                alt={activeMemory.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 300px, 400px"
              />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-rose-300/60 uppercase mb-1">
              MEMORY // {activeMemory.caption}
            </span>
            <p className="font-serif text-lg sm:text-xl text-rose-100 italic leading-snug my-2">
              &ldquo;{activeMemory.quote}&rdquo;
            </p>

            <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase mt-4">
              [ TAP OUTSIDE TO RETURN TO CONSTELLATION ]
            </span>
          </div>
        </div>
      )}

      {/* Hidden Message Modal */}
      {showHiddenMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#25091c] to-[#12030d] border border-rose-400/40 rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(255,77,141,0.35)]">
            <button
              type="button"
              onClick={() => setShowHiddenMessage(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mx-auto mb-4 text-rose-300">
              <Sparkles size={20} />
            </div>

            <span className="text-[10px] font-mono tracking-[0.25em] text-rose-300/60 uppercase">
              A WHISPER AMONG THE PARTICLES
            </span>

            <h3 className="font-serif text-xl sm:text-2xl text-rose-100 font-light my-4 leading-relaxed">
              &ldquo;{hiddenParticleMessage}&rdquo;
            </h3>

            <p className="text-xs text-rose-200/50 leading-relaxed font-light mb-6">
              Some thoughts don&apos;t ask for anything in return. They are simply true.
            </p>

            <button
              type="button"
              onClick={() => setShowHiddenMessage(false)}
              className="px-6 py-2 rounded-full border border-rose-400/30 bg-rose-950/50 text-rose-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-colors"
            >
              Keep Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

