"use client";

import Image from "next/image";
import { Moon, Sparkles, Star } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import coupleNightPhoto from "@/image/berdua.jpeg";

export default function YouAreMyMoon() {
  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none overflow-hidden">
      {/* Warm Burgundy Twilight Sky Background Frame */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#702C43] via-[#5C2336] to-[#451625] text-white p-8 sm:p-12 md:p-16 shadow-[0_25px_60px_rgba(70,22,37,0.3)] overflow-hidden border border-[#A94F65]/40">
        
        {/* Soft Glowing Moon in Ivory / Pale Blush */}
        <div className="absolute top-8 right-8 sm:top-12 sm:right-16 pointer-events-none" aria-hidden="true">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#FFF7F5] via-[#FFF0F3] to-[#FCE8E8] shadow-[0_0_60px_rgba(254,232,232,0.4)] flex items-center justify-center">
            {/* Soft Moon Crater Texture */}
            <div className="absolute top-5 left-7 w-5 h-5 rounded-full bg-[#F4D1D5]/40 blur-xs" />
            <div className="absolute bottom-6 right-8 w-7 h-7 rounded-full bg-[#E8B5C0]/30 blur-xs" />
            <div className="absolute top-12 right-6 w-3 h-3 rounded-full bg-[#F4D1D5]/35 blur-xs" />
          </div>
        </div>

        {/* Twinkling Stardust */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="absolute top-16 left-[18%] text-[#FCE8E8]/70 text-sm animate-[pulse_3s_ease-in-out_infinite]">✦</span>
          <span className="absolute top-36 left-[35%] text-[#F4D1D5]/60 text-xs animate-[pulse_4s_ease-in-out_infinite_1s]">★</span>
          <span className="absolute top-24 right-[38%] text-[#FFF7F5]/70 text-sm animate-[pulse_3.5s_ease-in-out_infinite_1.5s]">✧</span>
          <span className="absolute bottom-20 left-[25%] text-[#FCE8E8]/60 text-xs animate-[pulse_5s_ease-in-out_infinite_0.5s]">✦</span>
          <span className="absolute bottom-32 right-[22%] text-[#F4D1D5]/70 text-sm animate-[pulse_4.5s_ease-in-out_infinite_2s]">★</span>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Words from the Heart */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D58C9C]/40 bg-white/10 backdrop-blur-md text-xs font-mono tracking-widest text-[#FCE8E8] uppercase mb-2">
              <Moon size={12} className="text-[#FCE8E8]" />
              <span>Section D // The Night Sky</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight font-normal">
              You Are My Moon
            </h2>

            <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[#FFF7F5]/90 font-light">
              <p>
                Dan terima kasih karena sudah menjadi bulan di kala malamku.
              </p>
              <p>
                Bukan karena kamu harus selalu menerangi semuanya, bukan juga karena aku berharap kamu harus selalu terlihat terang.
              </p>
              <p>
                Tapi karena, seperti bulan yang tetap indah meski langit sedang gelap, kehadiranmu sering kali membuat malam-malamku terasa sedikit lebih tenang.
              </p>
              <p>
                Ada sesuatu tentang kamu yang membuat dunia terasa tidak terlalu bising. Sesuatu yang membuatku ingin berhenti sebentar, menarik napas, dan menikmati kenyataan bahwa aku punya seseorang sepertimu untuk disayangi.
              </p>
              <p className="italic text-[#FCE8E8] font-normal border-l-2 border-[#D58C9C] pl-4">
                Kalau malam punya bulan untuk ditemani, aku bersyukur karena dalam hidupku ada kamu.
              </p>
              <p className="text-sm sm:text-base text-[#F4D1D5]/80">
                Dan kalau suatu saat malam terasa panjang, aku harap kita masih bisa saling menemukan, saling mendengarkan, dan mengingat bahwa kita nggak harus selalu sempurna untuk bisa saling menyayangi.
              </p>
            </div>
          </div>

          {/* Right Column: Genuine Night Memory Polaroid & Botanical Lily */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-56 sm:w-64 rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="washi-tape top-[-8px] left-1/2 -translate-x-1/2 w-24 bg-[#E8B5C0]" />
              <div className="polaroid-frame w-full rounded bg-white text-[#702C43] shadow-2xl p-2.5">
                <div className="relative aspect-[4/5] rounded overflow-hidden mb-2 bg-[#FCE8E8]">
                  <Image
                    src={coupleNightPhoto}
                    alt="Rifky and Alura under the night sky"
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                </div>
                <p className="font-serif italic text-xs text-[#702C43]/85 text-center">
                  a quiet night with you
                </p>
              </div>

              {/* Pink Lily Silhouette Ornament */}
              <div className="absolute -bottom-6 -left-6 pointer-events-none drop-shadow-md">
                <PinkLily size={60} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#A94F65]/40 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#FCE8E8]/70 uppercase">
          <span>ALURA // ALWAYS MY MOON</span>
          <span>WITH LOVE, RIFKY</span>
        </div>
      </div>
    </section>
  );
}

