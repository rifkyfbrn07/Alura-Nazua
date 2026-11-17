"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Sparkles, Edit3, Camera, X, Layers, Check } from "lucide-react";
import { playPopSound, playSparkleSound, playChimeWin } from "@/lib/sound-effects";
import { useModalLifecycle } from "@/lib/use-modal-lifecycle";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadingIndividual, setDownloadingIndividual] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const objectUrlTimerRef = useRef<number | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useModalLifecycle(isOpen && Boolean(compiledImageUrl), onClose, dialogRef);

  useEffect(() => () => {
    if (objectUrlTimerRef.current !== null) window.clearTimeout(objectUrlTimerRef.current);
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  if (!isOpen || !compiledImageUrl) return null;

  // 1. Download Master Composite Photobox Strip
  const handleDownloadMaster = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);
    try {
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
      if (!compiledImageUrl.startsWith("data:image/png;base64,")) throw new Error("PNG image data is missing.");
      const encoded = compiledImageUrl.slice(compiledImageUrl.indexOf(",") + 1);
      const binary = atob(encoded);
      if (!binary.length) throw new Error("The exported image is empty.");
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
      const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
      if (!pngSignature.every((byte, index) => bytes[index] === byte)) throw new Error("The exported file is not a valid PNG.");
      const blob = new Blob([bytes], { type: "image/png" });
      if (blob.size < 8 || blob.type !== "image/png") throw new Error("PNG export could not be created.");
      const objectUrl = URL.createObjectURL(blob);
      objectUrlRef.current = objectUrl;
      const link = document.createElement("a");
      const date = new Date().toISOString().slice(0, 10);
      link.download = `Alura-Little-Lily-Photobooth-${date}.png`;
      link.href = objectUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
      if (objectUrlTimerRef.current !== null) window.clearTimeout(objectUrlTimerRef.current);
      objectUrlTimerRef.current = window.setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
        objectUrlRef.current = null;
        objectUrlTimerRef.current = null;
      }, 1500);
      playSparkleSound();
      setDownloadSuccess(true);
      window.setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (error) {
      console.error("Photobooth PNG download failed", error);
      setDownloadError("The PNG could not be prepared. Please try again.");
    } finally {
      setIsDownloading(false);
    }
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
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/75 p-2 backdrop-blur-md transition-opacity duration-300 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative my-auto flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#F4D1D5] bg-[#FFFBFB] shadow-2xl animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="photobooth-popup-title"
        tabIndex={-1}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#702C43] shadow-sm ring-1 ring-[#F4D1D5] transition-colors hover:bg-[#FFF0F2] cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="shrink-0 px-12 pb-3 pt-4 text-center sm:px-16 sm:pt-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F2] text-[#A94F65] border border-[#E8B5C0] text-xs font-medium mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D58C9C]" />
            <span>Freshly Printed Photobox Memory</span>
          </div>
          <h2 id="photobooth-popup-title" className="font-serif text-2xl sm:text-3xl text-[#702C43] font-medium tracking-tight">
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
        <main className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto overscroll-contain px-3 pb-3 sm:px-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[#F4D1D5]/60 bg-[#FCE8E8]/30 p-2 sm:min-h-[280px]">
          <div className="relative flex max-h-[min(65dvh,720px)] max-w-full items-center justify-center overflow-hidden rounded-xl border-2 border-white shadow-2xl">
            {/* Glossy Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            <img
              src={compiledImageUrl}
              alt="Your printed photobooth memory"
              className="max-h-[min(65dvh,720px)] w-auto max-w-full object-contain select-none"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-[#F4D1D5]/60 bg-white p-4 sm:p-6">
          <span className="text-[10px] font-mono uppercase tracking-[.18em] text-[#A94F65]">High resolution · PNG</span>
          <h3 className="mt-2 font-serif text-xl text-[#702C43]">A little keepsake to keep</h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8C6974]">This preview and its download use the same Canvas render.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-[#785765]"><span className="rounded-full bg-[#FFF0F2] px-3 py-1.5">{frameName}</span><span className="rounded-full bg-[#FFF0F2] px-3 py-1.5">{layoutName}</span><span className="rounded-full bg-[#FFF0F2] px-3 py-1.5">{individualPhotos.length} photos</span></div>
        </div>
        </main>

        {/* Actions remain visible while the preview area scrolls */}
        <footer className="z-20 shrink-0 border-t border-[#F4D1D5]/70 bg-[#FFFBFB] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:px-5">
        <div className="w-full space-y-2">
          {/* Main Download Strip Button */}
          <button
            type="button"
            onClick={handleDownloadMaster}
            disabled={isDownloading}
            className="w-full min-h-12 rounded-2xl bg-gradient-to-r from-[#A94F65] to-[#702C43] px-5 py-3 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#A94F65]/25 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer disabled:cursor-wait disabled:opacity-70"
          >
            {isDownloading ? <><Download className="h-5 w-5 animate-pulse" /><span>Preparing PNG…</span></> : downloadSuccess ? (
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
          {downloadError && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-center text-xs text-rose-800">{downloadError}</p>}
          {downloadSuccess && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-xs text-emerald-800">PNG generated. Your browser should start the download.</p>}

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
        </footer>
      </div>
    </div>
  );
}
