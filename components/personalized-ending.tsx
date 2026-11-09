"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { endingLines, endingSignature } from "@/lib/love-story";

export default function PersonalizedEnding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealedIndex, setRevealedIndex] = useState(-1);

  // Soft falling petals canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 800;
    };
    window.addEventListener("resize", handleResize);

    const petalColors = ["#ffd6e5", "#ffb3cc", "#ffffff", "#ffa1bf"];
    const petals = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.6 + 0.3,
      swingAmp: Math.random() * 1.2 + 0.4,
      swingSpeed: Math.random() * 0.018 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      alpha: Math.random() * 0.35 + 0.2,
    }));

    let animId: number;

    const render = () => {
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
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP ScrollTrigger sequential text reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Photo frame subtle fade and elevation
      gsap.fromTo(
        ".ending-photo-frame",
        { opacity: 0, scale: 0.94, filter: reducedMotion ? "none" : "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: reducedMotion ? 0.2 : 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ending-photo-frame",
            start: "top 75%",
          },
        }
      );

      // Sequential reveal of lines one at a time
      endingLines.forEach((_, index) => {
        gsap.fromTo(
          `.ending-line-${index}`,
          { opacity: 0, y: 18, filter: reducedMotion ? "none" : "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reducedMotion ? 0.2 : 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.ending-line-${index}`,
              start: "top 82%",
            },
          }
        );
      });

      // Signature reveal
      gsap.fromTo(
        ".ending-signoff",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0.2 : 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ending-signoff",
            start: "top 88%",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-[90vh] py-24 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#090308] via-[#140511] to-[#060205] text-center select-none overflow-hidden"
      role="contentinfo"
      aria-label="Personalized ending for Alura"
    >
      {/* Falling petals canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Atmospheric deep wine glow */}
      <div
        className="absolute w-[min(90vw,700px)] aspect-square rounded-full bg-gradient-to-tr from-rose-950/30 via-wine-900/15 to-transparent filter blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center">
        {/* The One Meaningful Photograph left on screen */}
        <div className="ending-photo-frame relative w-64 sm:w-72 md:w-80 aspect-[4/5] rounded-2xl overflow-hidden p-2.5 bg-gradient-to-b from-stone-800/60 to-black/90 border border-rose-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,77,141,0.15)] mb-12">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
            <Image
              src={endingSignature.photo}
              alt={endingSignature.alt}
              fill
              sizes="(max-width: 640px) 260px, 320px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* The quiet sequential lines */}
        <div className="space-y-6 max-w-md mx-auto mb-14">
          {endingLines.map((line, index) => (
            <p
              key={index}
              className={`ending-line-${index} font-serif text-lg sm:text-2xl text-rose-100/90 font-light tracking-wide leading-relaxed`}
            >
              &ldquo;{line}&rdquo;
            </p>
          ))}
        </div>

        {/* Personalized quiet dedication */}
        <div className="ending-signoff flex flex-col items-center gap-2 pt-8 border-t border-rose-500/15 w-48">
          <span className="font-serif text-xl sm:text-2xl text-rose-200 font-medium tracking-wide">
            {endingSignature.for}
          </span>
          <span className="text-xs font-mono tracking-widest text-rose-300/50 uppercase">
            {endingSignature.from}
          </span>
        </div>

        {/* Subtle timestamp */}
        <div className="mt-12 text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase">
          GHISCCA ALURA NAZUA // DIGITAL HORIZON
        </div>
      </div>
    </footer>
  );
}

