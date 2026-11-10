"use client";

import { Sparkles } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { littlePromises, recipientName } from "@/lib/love-story";

export default function LittlePromise() {
  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto select-none">
      <div className="relative bg-gradient-to-b from-white via-[#FFF7F5] to-[#FCE8E8]/50 rounded-3xl p-8 sm:p-12 border border-[#F4D1D5] shadow-[0_15px_35px_rgba(112,44,67,0.08)] text-center overflow-hidden">
        {/* Decorative corner lily */}
        <div className="absolute top-4 right-4 opacity-40 pointer-events-none">
          <PinkLily size={60} />
        </div>
        <div className="absolute bottom-4 left-4 opacity-40 pointer-events-none">
          <PinkLily size={60} />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D58C9C]/40 bg-white text-[11px] font-mono tracking-widest text-[#702C43] uppercase mb-4">
          <Sparkles size={12} className="text-[#A94F65]" />
          <span>A Quiet Promise // For {recipientName}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl text-[#702C43] font-normal tracking-tight mb-8">
          Learning to Love You Better
        </h2>

        {/* Lines */}
        <div className="space-y-4 max-w-xl mx-auto">
          {littlePromises.map((promise, index) => (
            <p
              key={index}
              className="font-serif italic text-base sm:text-xl text-[#702C43]/90 leading-relaxed font-light"
            >
              &ldquo;{promise}&rdquo;
            </p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#F4D1D5] flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest text-[#A94F65]/70 uppercase">
          <span>WITH HONESTY &amp; SINCERITY</span>
          <span>•</span>
          <span>RIFKY</span>
        </div>
      </div>
    </section>
  );
}

