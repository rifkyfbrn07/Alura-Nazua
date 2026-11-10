"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Camera,
  RefreshCw,
  Sparkles,
  Download,
  RotateCcw,
  Sliders,
  Type,
  Calendar,
  Layers,
  Heart,
  Eye,
  X,
  Play,
  CheckCircle2,
  Maximize2,
} from "lucide-react";
import PinkLily from "@/components/pink-lily";
import {
  PHOTOBOOTH_FRAMES,
  CAMERA_FILTERS,
  type PhotoboothFrame,
  type LiveCameraFilter,
  type FrameCategory,
  drawPhotoboothDecorations,
} from "./frames";
import {
  playCameraShutter,
  playPopSound,
  playSparkleSound,
  playChimeWin,
} from "@/lib/sound-effects";

type LayoutType = "strip4" | "strip3" | "single" | "grid2x2";

const LAYOUT_CONFIG: Record<
  LayoutType,
  { name: string; photoCount: number; label: string; icon: string }
> = {
  strip4: { name: "4-Photo Strip", photoCount: 4, label: "Classic Strip", icon: "🎞️" },
  strip3: { name: "3-Photo Strip", photoCount: 3, label: "Trio Strip", icon: "🎀" },
  single: { name: "Single Photo", photoCount: 1, label: "Solo Portrait", icon: "📷" },
  grid2x2: { name: "2x2 Photo Grid", photoCount: 4, label: "Collage Grid", icon: "🔲" },
};

const PRESET_CAPTIONS = [
  "A little moment with myself.",
  "Just being cute today.",
  "A day worth remembering.",
  "Made with a little love.",
  "Blooming softly every day.",
  "Alura's sweetest smile.",
];

export default function PinkPhotobooth() {
  // Camera & Stream States
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [mirrorVideo, setMirrorVideo] = useState(true);

  // Configuration States
  const [layout, setLayout] = useState<LayoutType>("strip4");
  const [selectedFrame, setSelectedFrame] = useState<PhotoboothFrame>(PHOTOBOOTH_FRAMES[0]);
  const [selectedFilter, setSelectedFilter] = useState<LiveCameraFilter>(CAMERA_FILTERS[1]); // Soft Pink default
  const [frameCategory, setFrameCategory] = useState<FrameCategory>("all");

  // Capturing Sequence States
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [flashActive, setFlashActive] = useState(false);

  // Post-Capture Editing States
  const [caption, setCaption] = useState(PRESET_CAPTIONS[0]);
  const [customCaption, setCustomCaption] = useState("");
  const [showCaption, setShowCaption] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showDecorations, setShowDecorations] = useState(true);
  const [borderThickness, setBorderThickness] = useState(16);
  const [brightness, setBrightness] = useState(100); // 80 - 120
  const [contrast, setContrast] = useState(100); // 80 - 120
  const [saturation, setSaturation] = useState(100); // 80 - 120
  const [isExporting, setIsExporting] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stripCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Camera Lifecycle: Start Camera
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Camera access is not supported on this browser.");
        return;
      }

      // Stop existing tracks if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      playSparkleSound();
    } catch (err: unknown) {
      console.warn("Camera access notice:", err);
      if (err instanceof DOMException && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
        setCameraError("Camera permission was denied. Please allow camera access in your browser settings to take photos.");
      } else {
        setCameraError("Could not access camera. Please make sure no other app is using it.");
      }
      setCameraActive(false);
    }
  }, [facingMode]);

  // Stop Camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Switch Camera
  const handleSwitchCamera = useCallback(() => {
    playPopSound();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  // Restart camera when facingMode changes if already active
  useEffect(() => {
    if (cameraActive) {
      startCamera();
    }
  }, [facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Take a single snapshot from video stream
  const captureSnapshot = useCallback(() => {
    const video = videoRef.current;
    if (!video) return null;

    const snapCanvas = document.createElement("canvas");
    snapCanvas.width = 640;
    snapCanvas.height = 480;
    const ctx = snapCanvas.getContext("2d");
    if (!ctx) return null;

    ctx.save();
    // Mirror if front camera and mirror enabled
    if (mirrorVideo && facingMode === "user") {
      ctx.translate(snapCanvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Apply basic filter CSS in canvas
    if (selectedFilter.css !== "none") {
      ctx.filter = selectedFilter.css;
    }
    ctx.drawImage(video, 0, 0, snapCanvas.width, snapCanvas.height);
    ctx.restore();

    return snapCanvas.toDataURL("image/jpeg", 0.92);
  }, [mirrorVideo, facingMode, selectedFilter]);

  // PHOTO SEQUENCE CONTROLLER
  const handleStartSession = useCallback(() => {
    if (!cameraActive) {
      startCamera();
      return;
    }

    playPopSound();
    setIsSessionActive(true);
    setCapturedPhotos([]);
    setCurrentShotIndex(0);

    const totalShots = LAYOUT_CONFIG[layout].photoCount;
    let shotCount = 0;
    const photosAccumulator: string[] = [];

    const runCountdownAndCapture = () => {
      let count = 3;
      setCountdown(count);

      const countInterval = setInterval(() => {
        count -= 1;
        if (count > 0) {
          setCountdown(count);
          playPopSound();
        } else {
          clearInterval(countInterval);
          setCountdown(null);

          // Flash & shutter
          setFlashActive(true);
          playCameraShutter();
          setTimeout(() => setFlashActive(false), 200);

          const snap = captureSnapshot();
          if (snap) {
            photosAccumulator.push(snap);
            setCapturedPhotos([...photosAccumulator]);
          }

          shotCount += 1;
          setCurrentShotIndex(shotCount);

          if (shotCount < totalShots) {
            // Pause 2.5s before next shot
            setTimeout(runCountdownAndCapture, 2400);
          } else {
            // Completed all shots
            setTimeout(() => {
              setIsSessionActive(false);
              playChimeWin();
            }, 600);
          }
        }
      }, 1000);
    };

    runCountdownAndCapture();
  }, [cameraActive, startCamera, layout, captureSnapshot]);

  // Cancel Session
  const handleCancelSession = useCallback(() => {
    setIsSessionActive(false);
    setCountdown(null);
    setCapturedPhotos([]);
    playPopSound();
  }, []);

  // Filtered frames based on tab
  const displayedFrames =
    frameCategory === "all"
      ? PHOTOBOOTH_FRAMES
      : PHOTOBOOTH_FRAMES.filter((f) => f.category === frameCategory);

  const activeCaption = customCaption.trim() || caption;
  const todayDateString = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // HIGH-RESOLUTION CANVAS COMPOSITOR & PNG DOWNLOAD
  const handleDownloadStrip = useCallback(async () => {
    if (capturedPhotos.length === 0) return;
    setIsExporting(true);
    playCameraShutter();

    const canvas = document.createElement("canvas");
    const count = capturedPhotos.length;

    // Dimensions based on layout
    let canvasW = 800;
    let canvasH = 2400;

    if (layout === "single") {
      canvasW = 800;
      canvasH = 1000;
    } else if (layout === "strip3") {
      canvasW = 800;
      canvasH = 1900;
    } else if (layout === "grid2x2") {
      canvasW = 1200;
      canvasH = 1350;
    }

    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Strip Background
    ctx.fillStyle = selectedFrame.bgColor;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // 2. Load all captured images
    const loadedImages: HTMLImageElement[] = await Promise.all(
      capturedPhotos.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
          })
      )
    );

    // 3. Render photo slots with filters, brightness, contrast, saturation
    const photoPad = borderThickness + 14;
    const topMargin = borderThickness + 46;
    const bottomMargin = 120;
    const availableH = canvasH - topMargin - bottomMargin;

    ctx.save();
    // Color grading adjustments
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

    if (layout === "strip4" || layout === "strip3") {
      const slotH = (availableH - (count - 1) * 14) / count;
      const slotW = canvasW - photoPad * 2;

      loadedImages.forEach((img, i) => {
        const y = topMargin + i * (slotH + 14);

        // Aspect fit / cover
        const photoAspect = img.width / img.height;
        const targetAspect = slotW / slotH;
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

        ctx.drawImage(img, sx, sy, sw, sh, photoPad, y, slotW, slotH);

        // Border around each individual photo slot
        ctx.strokeStyle = "rgba(0,0,0,0.06)";
        ctx.lineWidth = 2;
        ctx.strokeRect(photoPad, y, slotW, slotH);
      });
    } else if (layout === "single") {
      const slotW = canvasW - photoPad * 2;
      const slotH = availableH;
      const img = loadedImages[0];
      if (img) {
        ctx.drawImage(img, photoPad, topMargin, slotW, slotH);
      }
    } else if (layout === "grid2x2") {
      const slotW = (canvasW - photoPad * 2 - 16) / 2;
      const slotH = (availableH - 16) / 2;

      loadedImages.slice(0, 4).forEach((img, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = photoPad + col * (slotW + 16);
        const y = topMargin + row * (slotH + 16);

        ctx.drawImage(img, x, y, slotW, slotH);
        ctx.strokeStyle = "rgba(0,0,0,0.06)";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, slotW, slotH);
      });
    }
    ctx.restore();

    // 4. Draw frame decorations, stamps, borders, and captions
    drawPhotoboothDecorations(ctx, selectedFrame, canvasW, canvasH, {
      caption: showCaption ? activeCaption : "",
      showDate,
      displayDate: todayDateString,
      borderThickness,
      showDecorations,
    });

    // 5. Trigger PNG Download
    const downloadLink = document.createElement("a");
    const dateStamp = new Date().toISOString().split("T")[0];
    downloadLink.download = `alura-photobooth-${dateStamp}.png`;
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.click();

    playSparkleSound();
    setIsExporting(false);
  }, [
    capturedPhotos,
    layout,
    selectedFrame,
    borderThickness,
    brightness,
    contrast,
    saturation,
    showCaption,
    activeCaption,
    showDate,
    todayDateString,
    showDecorations,
  ]);

  // Download a single individual photo
  const handleDownloadSingle = useCallback((photoSrc: string, index: number) => {
    playCameraShutter();
    const link = document.createElement("a");
    link.download = `alura-photo-${index + 1}.jpg`;
    link.href = photoSrc;
    link.click();
  }, []);

  return (
    <section
      id="pink-photobooth"
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto select-none"
      aria-label="Alura's Pink Photobooth Studio"
    >
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Live Camera Studio // Real Photobooth
          </span>
          <span className="text-sm">📸</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-2">
          Alura&apos;s Pink Photobooth
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-[#A94F65] mb-2">
          &ldquo;A little camera for your little memories.&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-[#702C43]/75 font-sans leading-relaxed">
          Step right in, pick your favorite cute frame, look into the lens, and capture authentic smiles directly from your device!
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={40} />
        </div>
      </div>

      {/* PHOTOBOOTH PHYSICAL MACHINE CASING */}
      <div className="relative max-w-5xl mx-auto p-4 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FCE8E8] to-[#F4D1D5] border-4 border-white shadow-[0_25px_60px_-15px_rgba(169,79,101,0.25)]">
        
        {/* Top Booth Header Sign */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#A94F65] via-[#D58C9C] to-[#A94F65] rounded-2xl py-3 px-5 mb-6 text-white shadow-md border-2 border-white/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <span className="font-serif italic font-medium tracking-wide text-sm sm:text-base">
              Alura&apos;s Pink Booth
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cameraActive && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest bg-white/20 px-3 py-1 rounded-full uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CAMERA LIVE</span>
              </span>
            )}
            <span className="text-[10px] font-mono tracking-widest bg-white/20 px-2.5 py-1 rounded-full uppercase">
              100% PRIVATE &amp; LOCAL
            </span>
          </div>
        </div>

        {/* WORKBENCH: Camera & Capture on Left / Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CAMERA & PREVIEW COLUMN */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The Camera Viewport Frame */}
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-white border-4 border-[#E8B5C0] shadow-inner overflow-hidden flex items-center justify-center">
              
              {/* Flash burst effect */}
              {flashActive && (
                <div
                  className="absolute inset-0 bg-white z-50 pointer-events-none animate-[fadeOut_0.2s_ease-out_forwards]"
                  aria-hidden="true"
                />
              )}

              {/* Countdown overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/35 backdrop-blur-2xs text-white">
                  <span className="font-serif text-8xl font-bold animate-[scaleIn_0.4s_ease-out] drop-shadow-lg">
                    {countdown}
                  </span>
                  <span className="text-xs font-mono tracking-widest uppercase mt-3 bg-white/20 px-3 py-1 rounded-full">
                    Pose {currentShotIndex + 1} of {LAYOUT_CONFIG[layout].photoCount}!
                  </span>
                </div>
              )}

              {/* Live Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transition-all ${
                  cameraActive ? "block" : "hidden"
                }`}
                style={{
                  transform: mirrorVideo && facingMode === "user" ? "scaleX(-1)" : "none",
                  filter: selectedFilter.css !== "none" ? selectedFilter.css : undefined,
                }}
              />

              {/* Camera Off Placeholder */}
              {!cameraActive && (
                <div className="p-8 text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-[#FFF0F2] border-2 border-[#D58C9C] flex items-center justify-center text-4xl mb-4 shadow-sm animate-bounce">
                    📷
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#702C43] font-medium mb-2">
                    Pink Photobooth Ready
                  </h3>
                  <p className="text-xs sm:text-sm text-[#702C43]/75 font-sans max-w-xs mx-auto mb-6">
                    Tap below to enable your camera. We never save or upload your photos — everything stays strictly on your device!
                  </p>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="px-6 py-3 rounded-full bg-[#A94F65] text-white text-xs font-serif font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Camera size={16} />
                    <span>Start Camera</span>
                  </button>

                  {cameraError && (
                    <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans max-w-sm">
                      {cameraError}
                    </div>
                  )}
                </div>
              )}

              {/* In-view decorative corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#A94F65] pointer-events-none opacity-60" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#A94F65] pointer-events-none opacity-60" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#A94F65] pointer-events-none opacity-60" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#A94F65] pointer-events-none opacity-60" />
            </div>

            {/* In-Session Live Controller Controls */}
            {cameraActive && (
              <div className="mt-4 w-full flex items-center justify-between gap-2 px-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSwitchCamera}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8B5C0] text-[#702C43] text-xs font-mono shadow-xs hover:bg-[#FCE8E8] active:scale-95 transition-all cursor-pointer"
                    title="Switch camera"
                  >
                    <RefreshCw size={12} />
                    <span className="hidden sm:inline">Flip Cam</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setMirrorVideo((prev) => !prev);
                    }}
                    className={`px-3 py-1.5 rounded-full border text-xs font-mono shadow-xs transition-all cursor-pointer ${
                      mirrorVideo
                        ? "bg-[#FFF0F2] border-[#A94F65] text-[#702C43]"
                        : "bg-white border-[#E8B5C0] text-[#702C43]/70"
                    }`}
                    title="Mirror front camera"
                  >
                    Mirror: {mirrorVideo ? "ON" : "OFF"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={stopCamera}
                  className="text-xs font-mono text-[#A94F65] hover:underline cursor-pointer"
                >
                  Turn Off Camera
                </button>
              </div>
            )}

            {/* Big Shutter / Take Photos Action Button */}
            <div className="mt-5 w-full">
              {!isSessionActive ? (
                <button
                  type="button"
                  onClick={handleStartSession}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#A94F65] via-[#D58C9C] to-[#702C43] text-white font-serif font-medium text-base sm:text-lg shadow-md hover:shadow-xl hover:brightness-105 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Camera size={20} />
                  <span>
                    {cameraActive
                      ? `Start Photo Session (${LAYOUT_CONFIG[layout].photoCount} Photos) ✨`
                      : "Start Camera First 📸"}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCancelSession}
                  className="w-full py-3 rounded-2xl bg-[#FFF0F2] border-2 border-[#A94F65] text-[#702C43] font-serif text-sm font-medium hover:bg-[#FCE8E8] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  <span>Cancel Photo Session</span>
                </button>
              )}
            </div>

            {/* Live Camera Filters Selection Pills */}
            <div className="mt-6 w-full p-4 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#A94F65] block mb-2 font-semibold">
                ✨ Live Camera Filters
              </span>
              <div className="flex flex-wrap gap-2">
                {CAMERA_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setSelectedFilter(f);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      selectedFilter.id === f.id
                        ? "bg-[#A94F65] text-white border-[#702C43] shadow-xs scale-105"
                        : "bg-[#FFF7F5] border-[#F4D1D5] text-[#702C43]/70 hover:bg-[#FCE8E8]"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 12 INTERACTIVE FRAMES & CUSTOMIZATION CONTROLS */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Layout Selector */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#A94F65] block mb-2 font-semibold">
                1. Choose Layout
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(LAYOUT_CONFIG) as LayoutType[]).map((key) => {
                  const cfg = LAYOUT_CONFIG[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setLayout(key);
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs font-sans transition-all flex items-center gap-2 cursor-pointer ${
                        layout === key
                          ? "bg-[#FFF0F2] border-[#A94F65] text-[#702C43] font-medium shadow-xs"
                          : "bg-[#FFF7F5] border-[#F4D1D5] text-[#702C43]/70 hover:bg-[#FCE8E8]"
                      }`}
                    >
                      <span className="text-base">{cfg.icon}</span>
                      <div className="truncate">
                        <span className="block font-medium truncate">{cfg.name}</span>
                        <span className="text-[10px] opacity-75">{cfg.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Interactive Frame Collection (12 Original Frames) */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#A94F65] font-semibold">
                  2. Choose Frame ({PHOTOBOOTH_FRAMES.length} Designs)
                </span>
                <span className="text-xs font-mono text-[#A94F65]">
                  Active: {selectedFrame.name}
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(["all", "cute", "floral", "vintage", "romantic", "celebration"] as FrameCategory[]).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setFrameCategory(cat);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        frameCategory === cat
                          ? "bg-[#A94F65] text-white"
                          : "bg-[#FFF7F5] text-[#702C43]/70 hover:bg-[#FCE8E8]"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              {/* Thumbnail Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
                {displayedFrames.map((frame) => {
                  const isSelected = selectedFrame.id === frame.id;
                  return (
                    <button
                      key={frame.id}
                      type="button"
                      onClick={() => {
                        playPopSound();
                        setSelectedFrame(frame);
                      }}
                      className={`relative p-2.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#A94F65] shadow-md scale-102"
                          : "border-black/5 hover:border-[#D58C9C]"
                      }`}
                      style={{ backgroundColor: frame.bgColor }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">{frame.thumbnailEmoji}</span>
                        {isSelected && (
                          <CheckCircle2 size={13} className="text-[#A94F65]" />
                        )}
                      </div>
                      <span className="font-serif italic text-xs font-medium text-[#702C43] block truncate">
                        {frame.name}
                      </span>
                      <span className="text-[9px] font-mono text-[#A94F65] truncate">
                        {frame.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Captions & Custom Text */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#A94F65] font-semibold">
                  3. Caption &amp; Stamps
                </span>
                <label className="flex items-center gap-1.5 text-xs font-mono text-[#702C43] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCaption}
                    onChange={(e) => setShowCaption(e.target.checked)}
                    className="accent-[#A94F65]"
                  />
                  <span>Show Caption</span>
                </label>
              </div>

              {showCaption && (
                <>
                  <div className="space-y-1.5 mb-2.5">
                    {PRESET_CAPTIONS.slice(0, 4).map((cap, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          playPaperSound();
                          setCaption(cap);
                          setCustomCaption("");
                        }}
                        className={`w-full text-left p-1.5 rounded-lg text-xs font-serif italic truncate transition-colors cursor-pointer ${
                          caption === cap && !customCaption
                            ? "bg-[#FFF0F2] text-[#702C43] font-medium border border-[#D58C9C]"
                            : "text-[#702C43]/70 hover:bg-[#FCE8E8]"
                        }`}
                      >
                        &ldquo;{cap}&rdquo;
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Or type custom caption..."
                    value={customCaption}
                    onChange={(e) => setCustomCaption(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-serif italic rounded-xl border border-[#F4D1D5] bg-[#FFF7F5] focus:outline-none focus:border-[#A94F65] text-[#702C43]"
                  />
                </>
              )}

              {/* Toggles */}
              <div className="mt-3 pt-3 border-t border-[#F4D1D5] flex items-center justify-between text-xs font-mono text-[#702C43]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDate}
                    onChange={(e) => setShowDate(e.target.checked)}
                    className="accent-[#A94F65]"
                  />
                  <span>Date Stamp</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDecorations}
                    onChange={(e) => setShowDecorations(e.target.checked)}
                    className="accent-[#A94F65]"
                  />
                  <span>Ornaments</span>
                </label>
              </div>
            </div>

            {/* 4. Fine-tune Adjustments (Post-Capture / Pre-capture) */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-xs">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#A94F65] block mb-3 font-semibold">
                4. Adjust Exposure &amp; Border
              </span>

              <div className="space-y-3 text-xs font-mono text-[#702C43]">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Brightness</span>
                    <span>{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="120"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-[#A94F65]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Contrast</span>
                    <span>{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="120"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-[#A94F65]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Frame Border Thickness</span>
                    <span>{borderThickness}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="28"
                    value={borderThickness}
                    onChange={(e) => setBorderThickness(Number(e.target.value))}
                    className="w-full accent-[#A94F65]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: DEVELOPED PHOTOBOOTH STRIP RESULT */}
        {capturedPhotos.length > 0 && !isSessionActive && (
          <div className="mt-12 pt-8 border-t-2 border-dashed border-[#D58C9C]/40 animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center max-w-md mx-auto mb-6">
              <span className="text-3xl animate-bounce inline-block mb-1">🎉</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#702C43] font-medium">
                Look at you! You look adorable.
              </h3>
              <p className="font-serif italic text-sm sm:text-base text-[#A94F65] mt-1">
                &ldquo;Keep this little memory somewhere special.&rdquo;
              </p>
            </div>

            {/* The Assembled Strip Preview Container */}
            <div className="flex flex-col items-center">
              <div
                className="relative max-w-xs sm:max-w-sm w-full p-4 sm:p-6 rounded-3xl shadow-2xl border-4 transition-all"
                style={{
                  backgroundColor: selectedFrame.bgColor,
                  borderColor: selectedFrame.borderColor,
                }}
              >
                {/* Washi tape at top */}
                <div
                  className="washi-tape top-[-8px] left-1/2 -translate-x-1/2 w-28"
                  style={{ backgroundColor: selectedFrame.borderColor }}
                />

                {/* Header stamp */}
                <div className="text-center text-[10px] font-mono tracking-widest uppercase mb-3" style={{ color: selectedFrame.accentColor }}>
                  ALURA&apos;S PINK PHOTOBOOTH // MEMORY STRIP
                </div>

                {/* Rendered Photos Column */}
                <div
                  className={`gap-3 ${
                    layout === "grid2x2" ? "grid grid-cols-2" : "flex flex-col"
                  }`}
                >
                  {capturedPhotos.map((photoSrc, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-xs border border-black/5"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoSrc}
                        alt={`Pose ${idx + 1}`}
                        className="w-full h-full object-cover"
                        style={{
                          filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                        }}
                      />

                      {/* Download single photo icon on hover */}
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(photoSrc, idx)}
                        className="absolute bottom-1.5 right-1.5 px-2 py-1 rounded-md bg-black/60 text-white text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                        title="Download single photo"
                      >
                        <Download size={10} />
                        <span>Save #0{idx + 1}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Caption on the Strip */}
                {showCaption && (
                  <p
                    className="font-serif italic text-sm sm:text-base text-center mt-3 leading-snug px-2"
                    style={{ color: selectedFrame.textColor }}
                  >
                    &ldquo;{activeCaption}&rdquo;
                  </p>
                )}

                {/* Date stamp */}
                {showDate && (
                  <div
                    className="text-center text-[10px] font-mono tracking-widest mt-2"
                    style={{ color: selectedFrame.accentColor }}
                  >
                    {todayDateString.toUpperCase()}
                  </div>
                )}
              </div>

              {/* ACTION DOWNLOAD BUTTONS */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadStrip}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#A94F65] via-[#D58C9C] to-[#702C43] text-white font-serif font-medium text-sm sm:text-base shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Download size={16} />
                  <span>{isExporting ? "Rendering PNG Strip..." : "Download My Photobooth! 🎀"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    handleStartSession();
                  }}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-full bg-white border border-[#E8B5C0] text-[#702C43] text-xs font-serif font-medium shadow-xs hover:bg-[#FCE8E8] active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Retake Session</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

