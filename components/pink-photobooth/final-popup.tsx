"use client";

import { useState } from "react";
import { Download, Sparkles, Edit3, Camera, X, Layers, Check } from "lucide-react";
import { playPopSound, playSparkleSound, playChimeWin } from "@/lib/sound-effects";

type FinalPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  compiledImageUrl: string | null;
  individualPhotos: string[];
  onEditAgain: () => void;
  onNewSession: () => void;
  frameName: string;
  layoutName: string;
};

export default function FinalPopup({
  isOpen,
  onClose,
  compiledImageUrl,
  individualPhotos,
  onEditAgain,
  onNewSession,
  frameName,
  layoutName,
}: FinalPopupProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadingIndividual, setDownloadingIndividual] = useState(false);

  if (!isOpen || !compiledImageUrl) return null;

  // 1. Download Master Composite Photobox Strip
  const handleDownloadMaster = () => {
    playSparkleSound();
    const link = document.createElement("a");
    link.download = `Alura-Photobooth-${Date.now()}.png`;
    link.href = compiledImageUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // 2. Download Individual Raw Photos
  const handleDownloadIndividual = async () => {
    if (individualPhotos.length === 0) return;
    setDownloadingIndividual(true);
    playPopSound();

    for (let i = 0; i < individualPhotos.length; i++) {
      const link = document.createElement("a");
      link.download = `Alura-Photo-${i + 1}-${Date.now()}.jpg`;
      link.href = individualPhotos[i];
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    setDownloadingIndividual(false);
    playChimeWin();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md transition-opacity duration-300">
      <div
        className="relative w-full max-w-2xl bg-[#FFFBFB] rounded-3xl border border-[#F4D1D5] shadow-2xl p-5 sm:p-8 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-[#702C43] flex items-center justify-center transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F2] text-[#A94F65] border border-[#E8B5C0] text-xs font-medium mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D58C9C]" />
            <span>Freshly Printed Photobox Memory</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#702C43] font-medium tracking-tight">
            Your Little Photobooth Memory!
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#702C43]/75 mt-1 font-light italic">
            &ldquo;Look at these! You did amazing.&rdquo;
          </p>
          <div className="text-[11px] text-[#A94F65]/80 font-mono mt-1">
            {frameName} • {layoutName}
          </div>
        </div>

        {/* The Printed Photobox Result — Animated drop-down card effect */}
        <div className="relative w-full flex justify-center items-center my-2 p-2 bg-[#FCE8E8]/30 rounded-2xl border border-[#F4D1D5]/60 overflow-hidden">
          <div className="relative max-h-[58vh] max-w-[92%] flex justify-center items-center rounded-xl shadow-2xl overflow-hidden border-2 border-white transform transition-transform duration-500 hover:scale-[1.01]">
            {/* Glossy Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            <img
              src={compiledImageUrl}
              alt="Your printed photobooth memory"
              className="max-h-[56vh] w-auto object-contain rounded-lg shadow-inner select-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-5 space-y-2.5">
          {/* Main Download Strip Button */}
          <button
            type="button"
            onClick={handleDownloadMaster}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#A94F65] to-[#702C43] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#A94F65]/25 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5 text-emerald-300" />
                <span>Downloaded Successfully! ✨</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Photo (PNG)</span>
              </>
            )}
          </button>

          {/* Secondary Action Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {/* Download Individual Photos */}
            <button
              type="button"
              onClick={handleDownloadIndividual}
              disabled={downloadingIndividual || individualPhotos.length === 0}
              className="py-2.5 px-3 rounded-xl bg-white border border-[#E8B5C0] text-[#702C43] text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-[#FFF0F2] transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <Layers className="w-3.5 h-3.5 text-[#A94F65]" />
              <span className="truncate">
                {downloadingIndividual ? "Downloading..." : `Save ${individualPhotos.length} Shots`}
              </span>
            </button>

            {/* Edit Again */}
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onEditAgain();
              }}
              className="py-2.5 px-3 rounded-xl bg-white border border-[#E8B5C0] text-[#702C43] text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-[#FFF0F2] transition-colors cursor-pointer shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#A94F65]" />
              <span>Edit Again</span>
            </button>

            {/* Take Another Session */}
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onNewSession();
              }}
              className="col-span-2 sm:col-span-1 py-2.5 px-3 rounded-xl bg-[#FFF0F2] border border-[#D58C9C] text-[#702C43] text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-[#FCE8E8] transition-colors cursor-pointer shadow-sm"
            >
              <Camera className="w-3.5 h-3.5 text-[#A94F65]" />
              <span>Take Another Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

