"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Sparkles, Heart } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { relationshipStartDate } from "@/lib/love-story";
import coupleSweetPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29.jpeg";
import coupleWarmPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29 (1).jpeg";

export default function MinuteWithYou() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - relationshipStartDate.getTime());
      const totalMinutes = Math.floor(diff / (1000 * 60));
      const currentSeconds = Math.floor((diff / 1000) % 60);
      setMinutes(totalMinutes);
      setSeconds(currentSeconds);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FCE8E8]/40 rounded-full blur-3xl opacity-70" />
      </div>

      {/* Chapter Label */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D58C9C]/40 bg-[#FCE8E8]/70 text-[11px] font-mono tracking-widest text-[#702C43] uppercase mb-3">
          <Clock size={12} className="text-[#A94F65]" />
          <span>Section A // Reflections on Time</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3 font-normal">
          Every Minute With You
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Flow of Time Ticker & Polaroids */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Elegant Time Dial Card */}
          <div className="relative w-full max-w-sm rounded-3xl bg-white border border-[#F4D1D5] shadow-[0_12px_32px_rgba(112,44,67,0.08)] p-6 text-center mb-6">
            <div className="washi-tape top-[-8px] left-1/2 -translate-x-1/2 w-20 bg-[#F4D1D5]" />
            <div className="flex items-center justify-center gap-2 mb-2 text-xs font-mono text-[#A94F65] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D58C9C] animate-ping" />
              <span>Flow of Time With Alura</span>
            </div>

            <div className="font-serif text-3xl sm:text-4xl text-[#702C43] font-normal tracking-tight mb-1">
              {minutes.toLocaleString()} <span className="text-lg font-sans text-[#A94F65]">minutes</span>
            </div>
            <div className="text-xs font-mono text-[#702C43]/60">
              and {String(seconds).padStart(2, "0")} seconds collected
            </div>

            {/* Subtle Ticking Pendulum Animation */}
            <div className="mt-4 flex justify-center items-center gap-1 text-[10px] font-mono text-[#A94F65]/70">
              <span className="inline-block animate-[pulse_1s_ease-in-out_infinite]">●</span>
              <span>EVERY SECOND FEELS SPECIAL</span>
              <span className="inline-block animate-[pulse_1s_ease-in-out_infinite_0.5s]">●</span>
            </div>
          </div>

          {/* Polaroid of Couple Moments */}
          <div className="relative w-48 sm:w-56 -rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="polaroid-frame w-full rounded bg-white shadow-md p-2">
              <div className="relative aspect-[4/5] rounded overflow-hidden mb-2 bg-[#FCE8E8]">
                <Image
                  src={coupleSweetPhoto}
                  alt="Rifky and Alura together"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <p className="font-serif italic text-[11px] text-[#702C43]/80 text-center">
                one minute, a million feelings
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Sincere Storytelling Paragraphs */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#F4D1D5] shadow-xs space-y-5 font-serif text-base sm:text-lg leading-relaxed text-[#702C43]/90">
          <p className="first-letter:text-4xl first-letter:font-normal first-letter:text-[#A94F65] first-letter:mr-1">
            Aku baru sadar, ternyata waktu bisa terasa berbeda hanya karena siapa yang ada di dalamnya.
          </p>

          <p>
            Satu menit bersamamu rasanya tidak pernah sama seperti satu menit biasanya. Menit-menit yang biasanya cuma lewat begitu saja, ketika bersamamu justru terasa ingin kusimpan lebih lama.
          </p>

          <p>
            Bahkan hal sesederhana duduk berdua, ngobrol tentang sesuatu yang nggak penting, atau sekadar melihatmu tersenyum, bisa menjadi bagian dari hari yang ingin kuulang berkali-kali.
          </p>

          <p className="italic text-[#A94F65] font-normal border-l-2 border-[#D58C9C] pl-4">
            Aku nggak tahu bagaimana menjelaskannya dengan tepat. Yang jelas, bersamamu, waktu bukan cuma sesuatu yang berlalu. Ada sesuatu yang ingin aku kenang di setiap detiknya.
          </p>

          <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#A94F65]/80">
            <span>RIFKY // TO ALURA</span>
            <PinkLily size={32} />
          </div>
        </div>
      </div>
    </section>
  );
}

