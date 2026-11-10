"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PinkLily from "@/components/pink-lily";
import { finalScene, recipientName } from "@/lib/love-story";

export default function PersonalizedEnding() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Soft falling petals canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { rootMargin: "100px" }
    );
    observer.observe(container);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 800;
    };
    window.addEventListener("resize", handleResize);

    const petalColors = ["#FFF7F5", "#FCE8E8", "#F4D1D5", "#E8B5C0", "#D58C9C"];
    const petals = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.6 + 0.3,
      swingAmp: Math.random() * 1.4 + 0.4,
      swingSpeed: Math.random() * 0.018 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      alpha: Math.random() * 0.4 + 0.3,
    }));

    let animId: number;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

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

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ending-photo",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0.2 : 1.1,
          scrollTrigger: {
            trigger: ".ending-photo",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".ending-lily",
        { scale: 0.2, opacity: 0, rotation: -20 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: reducedMotion ? 0.2 : 1.4,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: ".ending-photo",
            start: "top 75%",
          },
        }
      );

      finalScene.paragraphs.forEach((_, index) => {
        gsap.fromTo(
          `.ending-line-${index}`,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: reducedMotion ? 0.2 : 0.9,
            scrollTrigger: {
              trigger: `.ending-line-${index}`,
              start: "top 85%",
            },
          }
        );
      });

      gsap.fromTo(
        ".ending-highlight",
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0.2 : 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ending-highlight",
            start: "top 85%",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-[85vh] py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF7F5] via-[#FCE8E8]/60 to-[#FFF0F3] text-center select-none overflow-hidden"
      role="contentinfo"
      aria-label="Final scene of Alura's Little Lily World"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center">
        {/* The One Meaningful Photograph in a Romantic Polaroid */}
        <div className="ending-photo relative mb-10">
          <div className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-28 -rotate-1" />
          <div className="polaroid-frame w-56 sm:w-64 rotate-1 hover:rotate-0 transition-transform">
            <div className="relative w-full aspect-[4/5] rounded overflow-hidden bg-[#FCE8E8]">
              <Image
                src={finalScene.photo}
                alt="Alura and Rifky together"
                fill
                sizes="(max-width: 640px) 220px, 260px"
                className="object-cover"
                priority
              />
            </div>
            <p className="font-serif italic text-xs text-[#702C43]/80 pt-3 text-center">
              Our journey, one day at a time
            </p>
          </div>

          {/* Signature Pink Lily Accent */}
          <div className="ending-lily absolute -bottom-5 -right-5 pointer-events-none">
            <PinkLily size={64} />
          </div>
        </div>

        {/* Sincere Ending Paragraphs */}
        <div className="space-y-4 max-w-lg mx-auto mb-8 text-center">
          {finalScene.paragraphs.map((para, index) => (
            <p
              key={index}
              className={`ending-line-${index} font-serif text-base sm:text-lg text-[#702C43]/90 font-light leading-relaxed`}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Highlight Quote */}
        <div className="ending-highlight max-w-md mx-auto mb-10 p-5 rounded-2xl bg-white/70 border border-[#F4D1D5] shadow-xs">
          <p className="font-serif italic font-medium text-lg sm:text-xl text-[#702C43] leading-relaxed">
            &ldquo;{finalScene.highlight}&rdquo;
          </p>
          <span className="block text-xs font-mono text-[#A94F65] tracking-widest mt-2 uppercase">
            {finalScene.signature}
          </span>
        </div>

        {/* Warm Dedication */}
        <div className="pt-6 border-t border-[#F4D1D5] flex flex-col items-center gap-1.5 w-52">
          <span className="font-serif text-2xl text-[#702C43] font-medium tracking-wide">
            {finalScene.dedication}
          </span>
        </div>

        <span className="mt-8 text-[9px] font-mono tracking-[0.25em] text-[#A94F65]/50 uppercase">
          ALURA&apos;S LITTLE LILY WORLD // 2026
        </span>
      </div>
    </footer>
  );
}
