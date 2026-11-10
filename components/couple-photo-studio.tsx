"use client";

import { useState, useRef, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { Sparkles, Camera, Download, RotateCcw, Heart, Palette, Layers, Type } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playCameraShutter, playPaperSound, playPopSound, playSparkleSound } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

import coupleSweetPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29.jpeg";
import coupleWarmPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29 (1).jpeg";
import couplePlayfulPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29 (2).jpeg";
import coupleGacoanTablet1 from "@/image/WhatsApp Image 2026-11-10 at 09.33.27 (1).jpeg";
import coupleGacoanTablet2 from "@/image/WhatsApp Image 2026-11-10 at 09.33.27 (2).jpeg";
import cantikPortrait from "@/image/cantik.jpeg";
import simanisPortrait from "@/image/simanis.jpeg";
import mybiniPortrait from "@/image/mybini.jpeg";

type StudioPhoto = {
  id: string;
  name: string;
  img: StaticImageData;
};

const STUDIO_PHOTOS: StudioPhoto[] = [
  { id: "p-sweet", name: "Sweet Couple Selfie", img: coupleSweetPhoto },
  { id: "p-warm", name: "Warm Smile Together", img: coupleWarmPhoto },
  { id: "p-playful", name: "Playful Poses", img: couplePlayfulPhoto },
  { id: "p-gacoan1", name: "Mie Gacoan Take 1", img: coupleGacoanTablet1 },
  { id: "p-gacoan2", name: "Mie Gacoan Take 2", img: coupleGacoanTablet2 },
  { id: "p-cantik", name: "Alura Blush Pink", img: cantikPortrait },
  { id: "p-simanis", name: "Alura's Sweetest Smile", img: simanisPortrait },
  { id: "p-mybini", name: "Alura Favorite Portrait", img: mybiniPortrait },
];

type StudioTemplate = {
  id: string;
  name: string;
  bg: string;
  border: string;
  washiTape: string;
  headerTag: string;
};

const TEMPLATES: StudioTemplate[] = [
  {
    id: "classic",
    name: "Classic Polaroid",
    bg: "#FFFFFF",
    border: "#F4D1D5",
    washiTape: "#F4D1D5",
    headerTag: "POLAROID // US",
  },
  {
    id: "strip",
    name: "Four-frame Photobooth",
    bg: "#FFF5F7",
    border: "#E8B5C0",
    washiTape: "#E8B5C0",
    headerTag: "LAB BOX // PHOTOBOOTH",
  },
  {
    id: "scrapbook",
    name: "Pink Scrapbook",
    bg: "#FFF0F2",
    border: "#D58C9C",
    washiTape: "#D58C9C",
    headerTag: "SCRAPBOOK ARCHIVE",
  },
  {
    id: "memories",
    name: "Our Little Memories",
    bg: "#FFFDFB",
    border: "#F4D1D5",
    washiTape: "#FCE8E8",
    headerTag: "SWEET MOMENT",
  },
  {
    id: "garden",
    name: "Lily Garden Frame",
    bg: "#FCE8E8",
    border: "#A94F65",
    washiTape: "#E8B5C0",
    headerTag: "LILY WORLD SPECIAL",
  },
];

const STICKERS = ["🌷", "🎀", "⭐", "🍜", "💖", "🌸", "💫", "💌", "✨"];

const PRESET_CAPTIONS = [
  "One minute with you, a million sweet feelings.",
  "Even ordinary days become special with you.",
  "My favorite place is right beside you.",
  "Proof that we can make a whole memory out of any day.",
  "With you, every second feels like a warm story.",
];

export default function CouplePhotoStudio() {
  const [selectedPhoto, setSelectedPhoto] = useState(STUDIO_PHOTOS[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [activeStickers, setActiveStickers] = useState<string[]>(["🎀", "🌷"]);
  const [caption, setCaption] = useState(PRESET_CAPTIONS[0]);
  const [customText, setCustomText] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const previewFrameRef = useRef<HTMLDivElement>(null);

  const handleToggleSticker = useCallback((stk: string) => {
    playPopSound();
    setActiveStickers((prev) =>
      prev.includes(stk) ? prev.filter((s) => s !== stk) : [...prev, stk]
    );
  }, []);

  const handleReset = useCallback(() => {
    playPopSound();
    setSelectedPhoto(STUDIO_PHOTOS[0]);
    setSelectedTemplate(TEMPLATES[0]);
    setActiveStickers(["🎀", "🌷"]);
    setCaption(PRESET_CAPTIONS[0]);
    setCustomText("");
  }, []);

  // Native HTML5 Canvas export
  const handleSaveAsImage = useCallback(() => {
    playCameraShutter();
    setIsExporting(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 720;
      canvas.height = 960;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background
      ctx.fillStyle = selectedTemplate.bg;
      ctx.fillRect(0, 0, 720, 960);

      // Border frame
      ctx.lineWidth = 12;
      ctx.strokeStyle = selectedTemplate.border;
      ctx.strokeRect(20, 20, 680, 920);

      // Top Washi Tape
      ctx.fillStyle = selectedTemplate.washiTape;
      ctx.fillRect(260, 10, 200, 36);

      // Top Header text
      ctx.font = "bold 16px monospace";
      ctx.fillStyle = "#A94F65";
      ctx.textAlign = "center";
      ctx.fillText(selectedTemplate.headerTag, 360, 75);

      // Draw Photo
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = selectedPhoto.img.src;
      img.onload = () => {
        // Draw photo container
        ctx.fillStyle = "#FFF7F5";
        ctx.fillRect(50, 95, 620, 680);

        // Aspect fit / cover
        const photoAspect = img.width / img.height;
        const targetAspect = 620 / 680;
        let sx = 0,
          sy = 0,
          sw = img.width,
          sh = img.height;

        if (photoAspect > targetAspect) {
          sw = img.height * targetAspect;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / targetAspect;
          sy = (img.height - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 50, 95, 620, 680);

        // Overlay active stickers on bottom right of photo
        ctx.font = "38px sans-serif";
        activeStickers.forEach((stk, i) => {
          ctx.fillText(stk, 580 - i * 46, 750);
        });

        // Caption text
        ctx.font = "italic 26px Georgia, serif";
        ctx.fillStyle = "#702C43";
        ctx.textAlign = "center";
        const displayCaption = customText.trim() || caption;
        ctx.fillText(`“${displayCaption}”`, 360, 835);

        // Footer stamp
        ctx.font = "14px monospace";
        ctx.fillStyle = "#A94F65";
        ctx.fillText("ALURA'S LITTLE LILY WORLD // RIFKY & ALURA", 360, 890);

        // Download trigger
        const link = document.createElement("a");
        link.download = `Alura-Rifky-${selectedTemplate.id}-photobooth.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        playSparkleSound();
        unlockBadge("photoStudio");
        setIsExporting(false);
      };
    } catch {
      setIsExporting(false);
    }
  }, [selectedPhoto, selectedTemplate, activeStickers, caption, customText]);

  const activeCaptionText = customText.trim() || caption;

  return (
    <section
      id="couple-photo-studio"
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto select-none"
    >
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Creative Photobooth // Keepsake Studio
          </span>
          <span className="text-sm">📸</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          Couple Photo Studio
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          Design and style your own photobooth print! Choose authentic memories, customize templates, add cute stickers, and download your finished picture.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={40} />
        </div>
      </div>

      {/* STUDIO WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        
        {/* Left Column: Live Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            ref={previewFrameRef}
            className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl border-4 shadow-[0_20px_60px_-15px_rgba(169,79,101,0.25)] transition-all flex flex-col items-center"
            style={{
              backgroundColor: selectedTemplate.bg,
              borderColor: selectedTemplate.border,
            }}
          >
            {/* Washi Tape */}
            <div
              className="washi-tape top-[-8px] left-1/2 -translate-x-1/2 w-28"
              style={{ backgroundColor: selectedTemplate.washiTape }}
            />

            {/* Header Stamp */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-widest text-[#A94F65] uppercase mb-3">
              <span>{selectedTemplate.headerTag}</span>
              <span>RIFKY &amp; ALURA</span>
            </div>

            {/* Photo Box */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFF7F5] shadow-inner border border-black/5 mb-4">
              <Image
                src={selectedPhoto.img}
                alt={selectedPhoto.name}
                fill
                sizes="(max-width: 640px) 90vw, 420px"
                className="object-cover"
                priority
              />

              {/* Floating stickers overlay */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 pointer-events-none drop-shadow-md">
                {activeStickers.map((stk, idx) => (
                  <span
                    key={idx}
                    className="text-2xl animate-[float_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${idx * 0.3}s` }}
                  >
                    {stk}
                  </span>
                ))}
              </div>
            </div>

            {/* Caption Text */}
            <p className="font-serif italic text-base sm:text-lg text-[#702C43] text-center px-2 min-h-[44px] flex items-center justify-center">
              &ldquo;{activeCaptionText}&rdquo;
            </p>

            {/* Footer Bar */}
            <div className="mt-3 pt-3 border-t border-[#702C43]/10 w-full flex items-center justify-between text-[10px] font-mono text-[#A94F65]">
              <span>ALURA&apos;S LITTLE LILY WORLD</span>
              <span>2026 // KEEPSAKE</span>
            </div>
          </div>

          {/* Action Export Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSaveAsImage}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-serif font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>{isExporting ? "Rendering PNG..." : "Save as Image (PNG)"}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#E8B5C0] text-[#702C43] text-xs font-medium shadow-xs hover:bg-[#FCE8E8] active:scale-95 transition-all"
            >
              <RotateCcw size={13} />
              <span>Reset Design</span>
            </button>
          </div>
        </div>

        {/* Right Column: Customizer Controls */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* 1. Choose Photo */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-wider text-[#A94F65] uppercase font-semibold">
              <Camera size={14} />
              <span>1. Choose Authentic Photo</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {STUDIO_PHOTOS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    playPaperSound();
                    setSelectedPhoto(p);
                  }}
                  className={`p-2 rounded-xl border text-xs text-left truncate flex items-center gap-2 transition-all cursor-pointer ${
                    selectedPhoto.id === p.id
                      ? "bg-[#FFF0F2] border-[#A94F65] text-[#702C43] font-medium shadow-xs"
                      : "bg-[#FFF7F5] border-[#F4D1D5] text-[#702C43]/70 hover:bg-[#FCE8E8]"
                  }`}
                >
                  <span>🖼️</span>
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Choose Template */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-wider text-[#A94F65] uppercase font-semibold">
              <Palette size={14} />
              <span>2. Choose Photobooth Style</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setSelectedTemplate(tmpl);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    selectedTemplate.id === tmpl.id
                      ? "bg-[#A94F65] text-white border-[#702C43] shadow-xs"
                      : "bg-[#FFF7F5] border-[#F4D1D5] text-[#702C43]/70 hover:bg-[#FCE8E8]"
                  }`}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Choose Stickers */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-wider text-[#A94F65] uppercase font-semibold">
              <Layers size={14} />
              <span>3. Add Cute Stickers</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {STICKERS.map((stk) => {
                const isActive = activeStickers.includes(stk);
                return (
                  <button
                    key={stk}
                    type="button"
                    onClick={() => handleToggleSticker(stk)}
                    className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center border transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#FFF0F2] border-[#A94F65] scale-110 shadow-xs"
                        : "bg-[#FFF7F5] border-[#F4D1D5] opacity-60 hover:opacity-100"
                    }`}
                  >
                    {stk}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Choose or Custom Caption */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-wider text-[#A94F65] uppercase font-semibold">
              <Type size={14} />
              <span>4. Caption &amp; Words</span>
            </div>

            <div className="space-y-1.5 mb-3">
              {PRESET_CAPTIONS.map((cap, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playPaperSound();
                    setCaption(cap);
                    setCustomText("");
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs font-serif italic truncate block transition-all cursor-pointer ${
                    caption === cap && !customText
                      ? "bg-[#FFF0F2] text-[#702C43] font-medium border border-[#D58C9C]"
                      : "text-[#702C43]/70 hover:bg-[#FCE8E8]"
                  }`}
                >
                  &ldquo;{cap}&rdquo;
                </button>
              ))}
            </div>

            {/* Custom caption input */}
            <input
              type="text"
              placeholder="Or write your own little caption..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-3 py-2 text-xs font-serif italic rounded-xl border border-[#F4D1D5] bg-[#FFF7F5] focus:outline-none focus:border-[#A94F65] text-[#702C43]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
