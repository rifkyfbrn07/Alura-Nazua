"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, Sparkles, RotateCw, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import PinkLily from "@/components/pink-lily";
import { orbitMemories, type OrbitMemory, recipientName } from "@/lib/love-story";
import { playHeartbeatSound, playPaperSound } from "@/lib/sound-effects";

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  speed: number;
  phase: number;
};

type BurstPetal = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  color: string;
};

export default function MemoryOrbit() {
  const worldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const angleRef = useRef<number>(0);
  const velocityRef = useRef<number>(0.0018);
  const heartExpansionRef = useRef<number>(1);
  const orbitPushRef = useRef<number>(0);

  const dragRef = useRef<{ isDragging: boolean; startX: number; startAngle: number; moved: boolean }>({
    isDragging: false,
    startX: 0,
    startAngle: 0,
    moved: false,
  });

  const [activePhoto, setActivePhoto] = useState<OrbitMemory | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const burstPetalsRef = useRef<BurstPetal[]>([]);
  const ripplesRef = useRef<{ radius: number; maxRadius: number; alpha: number }[]>([]);
  const isVisibleRef = useRef<boolean>(true);
  const dimsRef = useRef<{ w: number; h: number }>({ w: 800, h: 500 });

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(q.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    q.addEventListener("change", handler);
    return () => q.removeEventListener("change", handler);
  }, []);

  // Pause heavy canvas and 3D calculations when offscreen
  useEffect(() => {
    const world = worldRef.current;
    if (!world || typeof IntersectionObserver === "undefined") return;

    const updateDims = () => {
      const rect = world.getBoundingClientRect();
      dimsRef.current = { w: rect.width || 800, h: rect.height || 500 };
    };
    updateDims();
    window.addEventListener("resize", updateDims, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { rootMargin: "150px" }
    );

    observer.observe(world);
    return () => {
      window.removeEventListener("resize", updateDims);
      observer.disconnect();
    };
  }, []);

  // 1. Central Particle Heart & Canvas Effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 650);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 650;
      initHeartParticles();
    };
    window.addEventListener("resize", handleResize);

    // Initialize mathematical heart points
    const initHeartParticles = () => {
      const points = 100;
      const particles: Particle[] = [];
      const colors = ["#FFF7F5", "#FCE8E8", "#F4D1D5", "#E8B5C0", "#D58C9C", "#A94F65"];

      for (let i = 0; i < points; i++) {
        const t = (i / points) * Math.PI * 2;
        // Mathematical Heart formula
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        );

        particles.push({
          x: hx,
          y: hy,
          originX: hx,
          originY: hy,
          size: Math.random() * 1.8 + 1.2,
          color: colors[i % colors.length],
          alpha: Math.random() * 0.4 + 0.6,
          baseAlpha: Math.random() * 0.4 + 0.6,
          speed: Math.random() * 0.002 + 0.001,
          phase: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    };

    initHeartParticles();
    let animId: number;

    const render = (time: number) => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      const musicEnergy = 0.15;

      // Draw soft pink ripples expanding
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 4.5;
        rip.alpha *= 0.96;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(213, 140, 156, ${rip.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Draw burst petals
      const burstPetals = burstPetalsRef.current;
      for (let i = burstPetals.length - 1; i >= 0; i--) {
        const bp = burstPetals[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.rotation += bp.rotSpeed;
        bp.alpha *= 0.97;

        ctx.save();
        ctx.translate(bp.x, bp.y);
        ctx.rotate(bp.rotation);
        ctx.globalAlpha = bp.alpha;
        ctx.fillStyle = bp.color;

        ctx.beginPath();
        ctx.moveTo(0, -bp.size);
        ctx.bezierCurveTo(bp.size * 0.6, -bp.size * 0.6, bp.size * 0.8, bp.size * 0.5, 0, bp.size);
        ctx.bezierCurveTo(-bp.size * 0.8, bp.size * 0.5, -bp.size * 0.6, -bp.size * 0.6, 0, -bp.size);
        ctx.fill();
        ctx.restore();

        if (bp.alpha < 0.02) {
          burstPetals.splice(i, 1);
        }
      }

      // Heart base scale with heartbeat pulse
      const baseScale = Math.min(width, height) * 0.0044;
      const pulse =
        (1 + Math.sin(time * 0.0035) * 0.045 + musicEnergy * 0.12) * heartExpansionRef.current;
      const scale = baseScale * pulse;

      // Soft center halo glow
      const haloGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80 * scale);
      haloGrad.addColorStop(0, "rgba(244, 209, 213, 0.45)");
      haloGrad.addColorStop(0.6, "rgba(232, 181, 192, 0.2)");
      haloGrad.addColorStop(1, "rgba(255, 247, 245, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Render Heart Particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const px = centerX + p.x * scale;
        const py = centerY + p.y * scale;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.size + musicEnergy * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, p.alpha + musicEnergy * 0.25);
        ctx.shadowColor = "#D58C9C";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 2. 3D Multi-Layer Orbit Layout Loop
  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;

    const cards = Array.from(world.querySelectorAll<HTMLElement>(".orbit-polaroid-item"));
    let animId: number;

    const tick = () => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(tick);
        return;
      }

      // Natural orbit rotation if not dragging and not zoomed into a photo
      if (!dragRef.current.isDragging && !activePhoto) {
        angleRef.current += velocityRef.current;
      }

      const w = dimsRef.current.w;
      const h = dimsRef.current.h;

      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1100;

      // Multiple invisible orbital paths with responsive radii
      const baseRadiusX = isMobile ? w * 0.38 : isTablet ? w * 0.41 : Math.min(w * 0.38, 540);
      const baseRadiusY = isMobile ? h * 0.24 : isTablet ? h * 0.27 : Math.min(h * 0.29, 210);

      const count = cards.length;
      cards.forEach((card, index) => {
        // Multi-layer depth factor: alternate photos on slightly different orbits
        const layer = index % 2 === 0 ? 1.0 : 1.15;
        const radiusX = (baseRadiusX + orbitPushRef.current) * layer;
        const radiusY = (baseRadiusY + orbitPushRef.current * 0.5) * layer;

        const offset = (index / count) * Math.PI * 2;
        const currentAngle = angleRef.current + offset;

        const x = Math.cos(currentAngle) * radiusX;
        const y = Math.sin(currentAngle) * radiusY;
        const z = Math.sin(currentAngle); // -1 (back) to +1 (front)

        // Project 3D depth to 2D scale and opacity
        const depthNorm = (z + 1) * 0.5; // 0 to 1
        const scale = 0.72 + depthNorm * 0.38;
        const opacity = activePhoto
          ? 0.2 // dims background if one photo is zoomed
          : 0.45 + depthNorm * 0.55;
        const zIndex = Math.round(depthNorm * 100);

        card.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
        card.style.opacity = opacity.toFixed(2);
        card.style.zIndex = `${zIndex}`;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [activePhoto]);

  // Pointer drag controls (Mouse, Touch, Stylus)
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
    if (Math.abs(deltaX) > 5) {
      dragRef.current.moved = true;
    }
    angleRef.current = dragRef.current.startAngle + deltaX * 0.005;
  };

  const handlePointerUp = () => {
    dragRef.current.isDragging = false;
  };

  // Heart Tap: Ripple, petal burst, photos push outward
  const handleHeartClick = () => {
    playHeartbeatSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const centerX = canvas.width * 0.5;
    const centerY = canvas.height * 0.5;

    // 1. Expand ripple
    ripplesRef.current.push({
      radius: 20,
      maxRadius: Math.max(canvas.width, canvas.height) * 0.6,
      alpha: 0.9,
    });

    // 2. Petal burst in 360 degrees
    const petalColors = ["#FFF7F5", "#FCE8E8", "#F4D1D5", "#D58C9C"];
    const burst: BurstPetal[] = [];
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const speed = Math.random() * 5 + 3.5;
      burst.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 8 + 6,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        alpha: 1,
        color: petalColors[i % petalColors.length],
      });
    }
    burstPetalsRef.current.push(...burst);

    // 3. Heart pulse & photos push outward then return
    gsap.timeline()
      .to(heartExpansionRef, { current: 1.4, duration: 0.25, ease: "back.out(2)" })
      .to(heartExpansionRef, { current: 1.0, duration: 0.5, ease: "power2.out" });

    gsap.timeline()
      .to(orbitPushRef, { current: 55, duration: 0.35, ease: "power2.out" })
      .to(orbitPushRef, { current: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" });
  };

  const handlePhotoClick = (photo: OrbitMemory) => {
    if (dragRef.current.moved) return;
    playPaperSound();
    setActivePhoto(photo);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden select-none bg-gradient-to-b from-[#FFF7F5] via-[#FCE8E8]/40 to-[#FFF7F5]">
      {/* Decorative Corner Lilies */}
      <div className="absolute top-10 left-6 opacity-40 pointer-events-none hidden md:block">
        <PinkLily size={80} />
      </div>
      <div className="absolute bottom-10 right-6 opacity-40 pointer-events-none hidden md:block">
        <PinkLily size={80} />
      </div>

      {/* Section Header */}
      <div className="max-w-3xl mx-auto px-4 text-center mb-8 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D58C9C]/40 bg-[#FCE8E8]/80 text-[11px] font-mono tracking-widest text-[#702C43] uppercase mb-3">
          <Sparkles size={12} className="text-[#A94F65]" />
          <span>Memory Constellation // Photo Orbit</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3 font-normal">
          The Orbit of Our Memories
        </h2>
        <p className="text-sm sm:text-base text-[#A94F65] max-w-lg mx-auto font-light leading-relaxed">
          Surrounding the heart are our real moments. Drag to spin the constellation, tap a Polaroid to look closer, or tap the heart to send petals blooming.
        </p>
      </div>

      {/* 3D Orbit Viewport with Canvas Background */}
      <div
        ref={worldRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[500px] sm:h-[580px] md:h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none perspective-1000"
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Central Particle Heart Tap Trigger Area */}
        <button
          type="button"
          onClick={handleHeartClick}
          className="group absolute z-15 flex flex-col items-center justify-center w-36 h-36 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95"
          title="Tap heart to pulse"
          aria-label="Pulse heart"
        >
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#A94F65]/70 mb-1 group-hover:text-[#702C43]">
            TAP HEART
          </span>
          <span className="font-serif text-2xl sm:text-3xl text-[#702C43] tracking-wide font-normal">
            {recipientName}
          </span>
        </button>

        {/* Orbiting Polaroid Memory Frames */}
        {orbitMemories.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => handlePhotoClick(photo)}
            className="orbit-polaroid-item absolute top-1/2 left-1/2 -ml-20 sm:-ml-24 -mt-24 sm:-mt-28 w-40 sm:w-48 cursor-pointer select-none"
          >
            <div
              className="polaroid-frame relative flex flex-col rounded bg-white shadow-md transition-all hover:scale-105"
              style={{
                transform: `rotate(${index % 2 === 0 ? "-2.5deg" : "2.5deg"})`,
              }}
            >
              {/* Mini washi tape at top */}
              <div
                className="washi-tape top-[-8px] left-1/2 -translate-x-1/2 w-16"
                style={{ backgroundColor: photo.tapeColor || "#F4D1D5" }}
              />

              {/* Photo inside Polaroid */}
              <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-[#FCE8E8]">
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 150px, 190px"
                  className="object-cover"
                />
              </div>

              {/* Handwritten style caption */}
              <div className="pt-2.5 pb-1 text-center">
                <span className="font-serif italic text-xs text-[#702C43] tracking-wide block truncate">
                  {photo.caption}
                </span>
                <span className="text-[8px] font-mono tracking-widest text-[#A94F65]/60 uppercase block">
                  {photo.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tapped Photo Detail Modal (Photo Approaches the Camera) */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#FFF7F5]/90 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm sm:max-w-md bg-white border border-[#F4D1D5] rounded-2xl p-6 shadow-[0_20px_50px_rgba(112,44,67,0.18)] flex flex-col items-center text-center">
            {/* Top Washi Tape */}
            <div className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-28" />

            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#FFF7F5] hover:bg-[#FCE8E8] text-[#702C43] transition-colors"
              aria-label="Back to orbit"
            >
              <X size={16} />
            </button>

            {/* Enlarged Photo Frame */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-[#FCE8E8] border border-[#F4D1D5]">
              <Image
                src={activePhoto.image}
                alt={activePhoto.alt}
                fill
                sizes="(max-width: 640px) 320px, 420px"
                className="object-cover"
              />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-[#A94F65] uppercase mb-1">
              {activePhoto.date}
            </span>
            <h3 className="font-serif italic text-xl text-[#702C43] mb-2 font-medium">
              &ldquo;{activePhoto.caption}&rdquo;
            </h3>
            <p className="font-serif text-sm sm:text-base text-[#702C43]/90 leading-relaxed max-w-xs mb-6">
              {activePhoto.note}
            </p>

            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#D58C9C] bg-[#FCE8E8] hover:bg-[#F4D1D5] text-[#702C43] text-xs font-mono tracking-wider uppercase transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Orbit</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
