"use client";

import { useEffect, useState } from "react";
import { Sparkles, Calendar, Heart } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { relationshipStartDate } from "@/lib/love-story";

type Duration = {
  months: number;
  days: number;
  totalDays: number;
};

function calculateDuration(start: Date, current: Date): Duration {
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(current.getFullYear(), current.getMonth(), current.getDate());

  if (e < s) return { months: 0, days: 0, totalDays: 0 };

  const totalDays = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));

  let months = (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth();
  const anchor = new Date(s.getFullYear(), s.getMonth() + months, s.getDate());

  if (anchor > e) {
    months -= 1;
  }

  const completedAnchor = new Date(s.getFullYear(), s.getMonth() + months, s.getDate());
  const days = Math.floor((e.getTime() - completedAnchor.getTime()) / (1000 * 60 * 60 * 24));

  return { months, days, totalDays };
}

export default function RelationshipTimeline() {
  const [duration, setDuration] = useState<Duration | null>(null);

  useEffect(() => {
    setDuration(calculateDuration(relationshipStartDate, new Date()));
    const interval = setInterval(() => {
      setDuration(calculateDuration(relationshipStartDate, new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      date: "06 September 2026",
      title: "Where It All Began",
      desc: "The day our world started. Two stories gently crossing and deciding to walk hand in hand.",
    },
    {
      date: "Through the Rain & Sunlight",
      title: "Learning and Growing",
      desc: "Every journey has its difficult days. What matters is that we learned to listen, to care deeper, and to choose each other through it all.",
    },
    {
      date: "Building Our Way Forward",
      title: "Something Real & Lasting",
      desc: "Not a fantasy of perfection, but an honest promise to keep understanding, loving, and growing together.",
    },
  ];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D58C9C]/40 bg-[#FCE8E8]/70 text-[11px] font-mono tracking-widest text-[#702C43] uppercase mb-3">
          <Calendar size={12} className="text-[#A94F65]" />
          <span>Our Story Timeline // Since 06.09.26</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-4 font-normal">
          Every Day With You Matters
        </h2>

        {/* Dynamic Duration Counter */}
        {duration ? (
          <div className="inline-flex items-center justify-center gap-4 sm:gap-6 bg-white border border-[#F4D1D5] rounded-2xl px-6 py-4 shadow-[0_8px_20px_rgba(112,44,67,0.06)] mb-6">
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-[#702C43] font-medium">
                {duration.months}
              </span>
              <span className="text-[10px] font-mono tracking-wider text-[#A94F65] uppercase">
                {duration.months === 1 ? "Month" : "Months"}
              </span>
            </div>
            <span className="text-xl text-[#D58C9C] font-serif">&amp;</span>
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-[#702C43] font-medium">
                {duration.days}
              </span>
              <span className="text-[10px] font-mono tracking-wider text-[#A94F65] uppercase">
                {duration.days === 1 ? "Day" : "Days"}
              </span>
            </div>
            <div className="w-px h-8 bg-[#F4D1D5] hidden sm:block" />
            <div className="hidden sm:flex flex-col items-start text-left">
              <span className="text-xs font-serif italic text-[#702C43]">
                {duration.totalDays} days of memories
              </span>
              <span className="text-[9px] font-mono text-[#A94F65]/80 uppercase">
                and counting every one
              </span>
            </div>
          </div>
        ) : null}

        <p className="text-sm sm:text-base text-[#A94F65] max-w-lg mx-auto font-light leading-relaxed">
          We&apos;ve had moments that tested us, but every step taught us how to be kinder, more patient, and how to protect what we share.
        </p>
      </div>

      {/* Elegant Timeline Sequence */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#F4D1D5] space-y-10 sm:space-y-12 ml-4 sm:ml-12">
        {milestones.map((ms, index) => (
          <div key={index} className="relative group">
            {/* Lily Node marker */}
            <div className="absolute -left-[37px] sm:-left-[45px] top-0.5 w-8 h-8 rounded-full bg-white border border-[#D58C9C] flex items-center justify-center shadow-sm">
              <PinkLily size={20} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#F4D1D5] shadow-[0_6px_18px_rgba(112,44,67,0.06)] transition-all hover:shadow-[0_10px_24px_rgba(112,44,67,0.12)]">
              <span className="text-[10px] font-mono tracking-widest text-[#A94F65] uppercase block mb-1">
                {ms.date}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#702C43] font-medium mb-2">
                {ms.title}
              </h3>
              <p className="text-sm text-[#702C43]/85 font-light leading-relaxed">
                {ms.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

