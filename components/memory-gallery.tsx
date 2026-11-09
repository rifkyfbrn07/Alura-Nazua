"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { memories, recipientName } from "@/lib/love-story";

export default function MemoryGallery() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Animate gallery cards
      gsap.utils.toArray<HTMLElement>(".gallery-memory-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: reducedMotion ? 0 : 35,
            scale: reducedMotion ? 1 : 0.96,
            filter: reducedMotion ? "none" : "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: reducedMotion ? 0.2 : 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });

      // Animate sincere quote dividers
      gsap.utils.toArray<HTMLElement>(".sincere-quote-break").forEach((quote) => {
        gsap.fromTo(
          quote,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: reducedMotion ? 0.2 : 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quote,
              start: "top 85%",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none"
      aria-label="Gallery of memories for Alura"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-[11px] font-mono tracking-widest text-rose-300 uppercase mb-3">
          <Sparkles size={12} className="text-rose-400" />
          <span>Frames in Time // Personal Archive</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4">
          Moments That Never Left
        </h2>
        <p className="text-sm sm:text-base text-rose-200/60 max-w-md mx-auto font-light leading-relaxed">
          Looking back at the pictures we took, every single one still holds something I treasure.
        </p>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {memories.map((item, index) => (
          <article
            key={item.id}
            className="gallery-memory-card group relative rounded-2xl bg-gradient-to-b from-[#180715]/90 via-[#10030d]/95 to-[#090207] p-4 sm:p-5 border border-rose-500/20 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(255,77,141,0.08)] flex flex-col justify-between transition-all duration-300 hover:border-rose-400/50 hover:shadow-[0_20px_45px_rgba(255,77,141,0.2)] hover:-translate-y-1"
          >
            {/* Card Header with Digital Metadata */}
            <div className="flex items-center justify-between text-[10px] font-mono text-rose-300/50 uppercase mb-3 tracking-widest">
              <span>{item.tag || `MEM_${index + 1}`}</span>
              <span>ALURA // ARCHIVE</span>
            </div>

            {/* Photo Container */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black/60 mb-4 border border-white/5">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Card Captions and Sincere Note */}
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-rose-100 font-medium tracking-tight mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/60 leading-relaxed mb-3">
                  {item.caption}
                </p>
              </div>

              {/* Personal quote note */}
              <div className="pt-3 border-t border-rose-500/15">
                <p className="font-serif text-xs sm:text-sm text-rose-200/90 italic leading-snug">
                  &ldquo;{item.note}&rdquo;
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mid-gallery reflective quote */}
      <div className="sincere-quote-break my-20 sm:my-28 text-center max-w-2xl mx-auto px-4">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent mx-auto mb-6" />
        <p className="font-serif text-xl sm:text-3xl text-rose-100/95 font-light leading-relaxed italic">
          &ldquo;If I could choose again, I&apos;d still want to know you.&rdquo;
        </p>
        <span className="text-[11px] font-mono tracking-widest text-rose-300/40 uppercase mt-4 block">
          A THOUGHT FOR ALURA
        </span>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent mx-auto mt-6" />
      </div>
    </section>
  );
}

