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
  Trash2,
  ArrowLeft,
  ArrowRight,
  Plus,
  Grid,
  Sun,
  Timer,
  Maximize2,
  Check,
  ChevronLeft,
  ChevronRight,
  Move,
} from "lucide-react";
import PinkLily from "@/components/pink-lily";
import {
  PhotoboothFrame,
  FrameCategory,
  CameraFilter,
  FilterCategory,
  AdjustmentSettings,
  StickerItem,
  TextOverlayItem,
  CapturedPhoto,
  PhotoboothStep,
} from "./types";
import { PHOTOBOOTH_FRAMES, FRAME_CATEGORIES, drawPhotoboxFrame } from "./frames";
import {
  CAMERA_FILTERS,
  FILTER_CATEGORIES,
  getCombinedCssFilter,
  applyVignetteAndGrainToCanvas,
} from "./filters";
import { PHOTOBOOTH_LAYOUTS, LAYOUT_LIST, LayoutConfig } from "./layouts";
import {
  STICKER_PRESETS,
  TEXT_FONTS,
  TEXT_COLORS,
  drawStickersAndTextToCanvas,
} from "./stickers";
import FinalPopup from "./final-popup";
import {
  playCameraShutter,
  playPopSound,
  playSparkleSound,
  playChimeWin,
  playPaperSound,
} from "@/lib/sound-effects";

export default function PinkPhotobooth() {
  // Current Workflow Step
  const [currentStep, setCurrentStep] = useState<PhotoboothStep>("camera");

  // Camera & Stream States
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [mirrorVideo, setMirrorVideo] = useState(true);
  const [showGridLines, setShowGridLines] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState<0 | 3 | 5 | 10>(3);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [flashActive, setFlashActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Configuration States
  const [selectedLayout, setSelectedLayout] = useState<LayoutConfig>(PHOTOBOOTH_LAYOUTS.strip4);
  const [selectedFrame, setSelectedFrame] = useState<PhotoboothFrame>(PHOTOBOOTH_FRAMES[0]);
  const [selectedFilter, setSelectedFilter] = useState<CameraFilter>(CAMERA_FILTERS[0]);
  const [frameCategory, setFrameCategory] = useState<FrameCategory>("all");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("natural");

  // Captured Photos Collection
  const [sessionPhotos, setSessionPhotos] = useState<CapturedPhoto[]>([]);
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);
  const [retakeTargetIndex, setRetakeTargetIndex] = useState<number | null>(null);

  // Studio Editor Adjustments
  const [editorTab, setEditorTab] = useState<"layout" | "frame" | "filter" | "adjust" | "text" | "stickers">("frame");
  const [adjustments, setAdjustments] = useState<AdjustmentSettings>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    warmth: 0,
    grain: 0,
    vignette: 0,
    blur: 0,
  });
  const [customCaption, setCustomCaption] = useState("");
  const [showDate, setShowDate] = useState(true);
  const [borderThickness, setBorderThickness] = useState(12);

  // Stickers & Text Overlay States
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [texts, setTexts] = useState<TextOverlayItem[]>([]);
  const [newTextString, setNewTextString] = useState("");
  const [newTextFont, setNewTextFont] = useState<"serif" | "sans" | "script" | "mono">("serif");
  const [newTextColor, setNewTextColor] = useState("#702C43");

  // Final Output & Modal States
  const [compiledImageUrl, setCompiledImageUrl] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isFinalPopupOpen, setIsFinalPopupOpen] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── CAMERA MANAGEMENT ──────────────────────────────────────────────────────
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Camera access is not supported on this browser.");
        return;
      }

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
      console.warn("Camera access warning:", err);
      if (err instanceof DOMException && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
        setCameraError("Camera permission denied. Please allow camera access in browser settings.");
      } else {
        setCameraError("Unable to access camera. Please verify device camera availability.");
      }
      setCameraActive(false);
    }
  }, [facingMode]);

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

  // Cleanup on unmount or when leaving camera/review step
  useEffect(() => {
    if (currentStep === "editor" || currentStep === "final_popup") {
      stopCamera();
    }
  }, [currentStep, stopCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Restart camera when facing mode changes
  useEffect(() => {
    if (cameraActive && (currentStep === "camera" || currentStep === "review_single")) {
      startCamera();
    }
  }, [facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSwitchCamera = useCallback(() => {
    playPopSound();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  // ─── STEP 2: TAKE ONE PHOTO ─────────────────────────────────────────────────
  const captureOnePhoto = useCallback(() => {
    const video = videoRef.current;
    if (!video) return null;

    const snapCanvas = document.createElement("canvas");
    snapCanvas.width = 960;
    snapCanvas.height = 720;
    const ctx = snapCanvas.getContext("2d");
    if (!ctx) return null;

    ctx.save();
    // Mirror if front camera and mirror is on
    if (mirrorVideo && facingMode === "user") {
      ctx.translate(snapCanvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Apply active filter CSS directly during snapshot
    const filterCss = getCombinedCssFilter(selectedFilter, adjustments);
    if (filterCss !== "none") {
      ctx.filter = filterCss;
    }

    ctx.drawImage(video, 0, 0, snapCanvas.width, snapCanvas.height);
    ctx.restore();

    return snapCanvas.toDataURL("image/jpeg", 0.94);
  }, [mirrorVideo, facingMode, selectedFilter, adjustments]);

  const handleTriggerCapture = useCallback(() => {
    if (!cameraActive) {
      startCamera();
      return;
    }

    playPopSound();

    if (timerSeconds === 0) {
      // Immediate capture
      if (flashEnabled) {
        setFlashActive(true);
        setTimeout(() => setFlashActive(false), 200);
      }
      playCameraShutter();
      const snap = captureOnePhoto();
      if (snap) {
        setPendingPhoto(snap);
        setCurrentStep("review_single");
      }
      return;
    }

    // Countdown timer (3, 2, 1)
    let count = timerSeconds;
    setCountdown(count);

    const timerInterval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
        playPopSound();
      } else {
        clearInterval(timerInterval);
        setCountdown(null);

        // Flash & Shutter
        if (flashEnabled) {
          setFlashActive(true);
          setTimeout(() => setFlashActive(false), 220);
        }
        playCameraShutter();

        const snap = captureOnePhoto();
        if (snap) {
          setPendingPhoto(snap);
          setCurrentStep("review_single");
        }
      }
    }, 1000);
  }, [cameraActive, startCamera, timerSeconds, flashEnabled, captureOnePhoto]);

  // ─── STEP 3: REVIEW PHOTO (RETAKE vs CONTINUE) ──────────────────────────────
  const handleRetakePending = useCallback(() => {
    playPopSound();
    setPendingPhoto(null);
    setCurrentStep("camera");
  }, []);

  const handleContinuePending = useCallback(() => {
    if (!pendingPhoto) return;
    playSparkleSound();

    if (retakeTargetIndex !== null) {
      // Replace specific photo in session
      setSessionPhotos((prev) => {
        const next = [...prev];
        next[retakeTargetIndex] = {
          id: `photo-${Date.now()}`,
          dataUrl: pendingPhoto,
          timestamp: Date.now(),
        };
        return next;
      });
      setRetakeTargetIndex(null);
    } else {
      // Append new photo to session
      setSessionPhotos((prev) => [
        ...prev,
        {
          id: `photo-${Date.now()}`,
          dataUrl: pendingPhoto,
          timestamp: Date.now(),
        },
      ]);
    }

    setPendingPhoto(null);

    // If session now has enough photos for layout, jump to editor or tray
    const currentCount = sessionPhotos.length + 1;
    if (currentCount >= selectedLayout.requiredPhotos) {
      setCurrentStep("editor");
      playChimeWin();
    } else {
      setCurrentStep("camera");
    }
  }, [pendingPhoto, retakeTargetIndex, sessionPhotos.length, selectedLayout.requiredPhotos]);

  // ─── STEP 4: SESSION MANAGEMENT ─────────────────────────────────────────────
  const handleDeletePhoto = useCallback((index: number) => {
    playPopSound();
    setSessionPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleRetakeSpecificPhoto = useCallback((index: number) => {
    playPopSound();
    setRetakeTargetIndex(index);
    setCurrentStep("camera");
  }, []);

  const handleMovePhoto = useCallback((index: number, direction: "left" | "right") => {
    playPopSound();
    setSessionPhotos((prev) => {
      const next = [...prev];
      const targetIndex = direction === "left" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  }, []);

  // ─── STEP 5: MASTER COMPILATION TO HIGH-RES CANVAS 2D ───────────────────────
  const compilePhotoboxCanvas = useCallback(async (): Promise<string | null> => {
    if (sessionPhotos.length === 0) return null;

    const canvas = document.createElement("canvas");
    const { canvasWidth, canvasHeight, slots } = selectedLayout;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // 1. Draw Background
    ctx.fillStyle = selectedFrame.bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Load and render captured photos into slots
    const loadedImages: HTMLImageElement[] = await Promise.all(
      sessionPhotos.map(
        (photo) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = photo.dataUrl;
          })
      )
    );

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const sx = (slot.x / 100) * canvasWidth;
      const sy = (slot.y / 100) * canvasHeight;
      const sw = (slot.w / 100) * canvasWidth;
      const sh = (slot.h / 100) * canvasHeight;

      if (i < loadedImages.length) {
        const img = loadedImages[i];
        ctx.save();

        // Clip to slot rectangle with subtle rounded corners
        ctx.beginPath();
        ctx.roundRect(sx, sy, sw, sh, 4);
        ctx.clip();

        // Calculate aspect-fill cover
        const imgRatio = img.width / img.height;
        const slotRatio = sw / sh;
        let renderW = sw;
        let renderH = sh;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > slotRatio) {
          renderW = sh * imgRatio;
          offsetX = (sw - renderW) / 2;
        } else {
          renderH = sw / imgRatio;
          offsetY = (sh - renderH) / 2;
        }

        // Apply filter CSS & adjustments
        const filterCss = getCombinedCssFilter(selectedFilter, adjustments);
        if (filterCss !== "none") {
          ctx.filter = filterCss;
        }

        ctx.drawImage(img, sx + offsetX, sy + offsetY, renderW, renderH);

        // Apply Vignette and Grain directly on this slot
        if (adjustments.vignette > 0 || adjustments.grain > 0) {
          applyVignetteAndGrainToCanvas(ctx, sw, sh, adjustments.vignette, adjustments.grain);
        }

        ctx.restore();

        // Subtle slot hairline outline
        ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
        ctx.lineWidth = 1;
        ctx.strokeRect(sx, sy, sw, sh);
      } else {
        // Empty slot placeholder
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(sx, sy, sw, sh);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(sx, sy, sw, sh);
        ctx.setLineDash([]);
      }
    }

    // 3. Render Photobox Frame typography, stamps & accents
    const todayStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    drawPhotoboxFrame(ctx, selectedFrame, selectedLayout, canvasWidth, canvasHeight, {
      customCaption: customCaption.trim() || undefined,
      showDate,
      displayDate: todayStr,
      borderThickness,
    });

    // 4. Render Instagram Stickers & Custom Texts
    drawStickersAndTextToCanvas(ctx, stickers, texts, canvasWidth, canvasHeight);

    return canvas.toDataURL("image/png", 1.0);
  }, [
    sessionPhotos,
    selectedLayout,
    selectedFrame,
    selectedFilter,
    adjustments,
    customCaption,
    showDate,
    borderThickness,
    stickers,
    texts,
  ]);

  // Handle clicking "Finish & Print ✨" (Step 5 -> Step 6)
  const handleFinishAndPrint = useCallback(async () => {
    setIsCompiling(true);
    playSparkleSound();
    try {
      const dataUrl = await compilePhotoboxCanvas();
      if (dataUrl) {
        setCompiledImageUrl(dataUrl);
        setIsFinalPopupOpen(true);
        playChimeWin();
      }
    } finally {
      setIsCompiling(false);
    }
  }, [compilePhotoboxCanvas]);

  // ─── STICKER & TEXT HELPERS ─────────────────────────────────────────────────
  const handleAddSticker = (type: StickerItem["type"], label: string, color: string) => {
    playPopSound();
    const newSticker: StickerItem = {
      id: `st-${Date.now()}`,
      type,
      label,
      x: 35 + Math.random() * 30,
      y: 35 + Math.random() * 30,
      scale: 1.0,
      rotation: Math.floor(Math.random() * 16 - 8),
      color,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const handleAddCustomText = () => {
    if (!newTextString.trim()) return;
    playPopSound();
    const newTxt: TextOverlayItem = {
      id: `txt-${Date.now()}`,
      text: newTextString.trim(),
      font: newTextFont,
      size: 24,
      color: newTextColor,
      x: 50,
      y: 50,
    };
    setTexts((prev) => [...prev, newTxt]);
    setNewTextString("");
  };

  const handleResetSession = () => {
    playPopSound();
    setSessionPhotos([]);
    setPendingPhoto(null);
    setStickers([]);
    setTexts([]);
    setCompiledImageUrl(null);
    setIsFinalPopupOpen(false);
    setCurrentStep("camera");
  };

  // Filtered frames
  const displayedFrames =
    frameCategory === "all"
      ? PHOTOBOOTH_FRAMES
      : PHOTOBOOTH_FRAMES.filter((f) => f.category === frameCategory);

  // Filtered camera filters
  const displayedFilters = CAMERA_FILTERS.filter((f) => f.category === filterCategory);

  return (
    <section
      id="pink-photobooth"
      className="relative w-full py-16 px-3 sm:px-6 md:px-8 bg-gradient-to-b from-[#FFFDFB] via-[#FFF5F7] to-[#FFF7F5] overflow-hidden"
    >
      {/* Decorative Background Accents */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#FCE8E8]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#F4D1D5]/40 blur-3xl pointer-events-none" />

      {/* Screen Flash Animation */}
      {flashActive && (
        <div className="fixed inset-0 z-[120] bg-white animate-out fade-out duration-200 pointer-events-none" />
      )}

      {/* Main Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F2] border border-[#E8B5C0] text-[#A94F65] text-xs font-medium tracking-wide shadow-sm mb-3">
            <Camera className="w-3.5 h-3.5 text-[#D58C9C]" />
            <span>ALURA&apos;S PINK PHOTOBOOTH STUDIO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#702C43] font-medium tracking-tight">
            A Little Camera for Your Little Memories
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#702C43]/70 max-w-md mx-auto mt-2 font-light">
            Take cute photos with real camera filters, switch professional Korean photobox frames, style with stickers, and download high-res prints.
          </p>

          {/* Step Breadcrumb Bar */}
          <div className="flex items-center justify-center gap-2 mt-5 text-xs">
            <button
              type="button"
              onClick={() => setCurrentStep("camera")}
              className={`px-3 py-1 rounded-full transition-colors ${
                currentStep === "camera" || currentStep === "review_single"
                  ? "bg-[#A94F65] text-white font-medium"
                  : "bg-white/80 text-[#702C43]/70 hover:bg-[#FFF0F2]"
              }`}
            >
              1. Camera ({sessionPhotos.length}/{selectedLayout.requiredPhotos})
            </button>
            <span className="text-[#D58C9C]">•</span>
            <button
              type="button"
              onClick={() => {
                if (sessionPhotos.length > 0) setCurrentStep("editor");
              }}
              disabled={sessionPhotos.length === 0}
              className={`px-3 py-1 rounded-full transition-colors disabled:opacity-40 ${
                currentStep === "editor"
                  ? "bg-[#A94F65] text-white font-medium"
                  : "bg-white/80 text-[#702C43]/70 hover:bg-[#FFF0F2]"
              }`}
            >
              2. Studio Editor
            </button>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            STEP 1 & 2: CAMERA VIEWPORT
            ═════════════════════════════════════════════════════════════════════ */}
        {currentStep === "camera" && (
          <div className="bg-white/90 rounded-3xl border border-[#F4D1D5] shadow-xl p-4 sm:p-6 backdrop-blur-sm">
            {/* Top Camera Controls Bar */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#F4D1D5]/60 mb-4 flex-wrap">
              {/* Selected Layout Indicator */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#702C43] bg-[#FFF0F2] px-2.5 py-1 rounded-lg border border-[#E8B5C0]">
                  {selectedLayout.label} • Need {selectedLayout.requiredPhotos} shots
                </span>
                <span className="text-xs text-[#A94F65]/80 font-mono">
                  {sessionPhotos.length} taken
                </span>
              </div>

              {/* Camera Toggles: Timer, Mirror, Grid, Switch */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Timer Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setTimerSeconds((prev) => (prev === 0 ? 3 : prev === 3 ? 5 : prev === 5 ? 10 : 0));
                  }}
                  className={`p-2 rounded-xl text-xs flex items-center gap-1 transition-colors ${
                    timerSeconds > 0
                      ? "bg-[#FFF0F2] text-[#A94F65] border border-[#D58C9C]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                  title="Toggle Countdown Timer"
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>{timerSeconds === 0 ? "Off" : `${timerSeconds}s`}</span>
                </button>

                {/* Mirror Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setMirrorVideo((prev) => !prev);
                  }}
                  className={`p-2 rounded-xl text-xs transition-colors ${
                    mirrorVideo
                      ? "bg-[#FFF0F2] text-[#A94F65] border border-[#D58C9C]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                  title="Toggle Mirror Preview"
                >
                  Mirror
                </button>

                {/* Grid Overlay Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setShowGridLines((prev) => !prev);
                  }}
                  className={`p-2 rounded-xl text-xs transition-colors ${
                    showGridLines
                      ? "bg-[#FFF0F2] text-[#A94F65] border border-[#D58C9C]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                  title="Rule of Thirds Grid"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>

                {/* Switch Camera */}
                <button
                  type="button"
                  onClick={handleSwitchCamera}
                  className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-[#FFF0F2] hover:text-[#702C43] transition-colors"
                  title="Switch Front / Back Camera"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Camera Screen Viewport */}
            <div className="relative aspect-[4/3] max-w-xl mx-auto bg-black rounded-2xl overflow-hidden shadow-inner border border-black/10 flex items-center justify-center">
              {/* Video Stream Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{
                  transform: mirrorVideo && facingMode === "user" ? "scaleX(-1)" : "none",
                  filter: getCombinedCssFilter(selectedFilter, adjustments),
                }}
              />

              {/* Inactive Camera State Overlay */}
              {!cameraActive && (
                <div className="absolute inset-0 bg-[#FFF7F5] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#FFF0F2] border border-[#E8B5C0] flex items-center justify-center mb-3 shadow-sm">
                    <Camera className="w-8 h-8 text-[#A94F65]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#702C43] font-medium">Camera is Standing By</h3>
                  <p className="text-xs text-[#702C43]/70 max-w-xs mt-1 mb-4">
                    Press Start Camera to allow preview and take your photos.
                  </p>
                  {cameraError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs mb-3 max-w-sm">
                      {cameraError}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={startCamera}
                    className="py-2.5 px-6 rounded-full bg-[#A94F65] text-white font-medium text-xs shadow-md hover:bg-[#702C43] transition-colors cursor-pointer"
                  >
                    Start Camera ✨
                  </button>
                </div>
              )}

              {/* Rule of Thirds Grid Lines */}
              {showGridLines && cameraActive && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-white/25" />
                  <div className="border-r border-b border-white/25" />
                  <div className="border-b border-white/25" />
                  <div className="border-r border-b border-white/25" />
                  <div className="border-r border-b border-white/25" />
                  <div className="border-b border-white/25" />
                  <div className="border-r border-white/25" />
                  <div className="border-r border-white/25" />
                  <div />
                </div>
              )}

              {/* Countdown Numbers Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                  <div className="w-24 h-24 rounded-full bg-[#FFF0F2]/90 border-2 border-[#D58C9C] shadow-2xl flex items-center justify-center animate-ping duration-1000">
                    <span className="font-serif text-5xl font-bold text-[#702C43]">{countdown}</span>
                  </div>
                </div>
              )}

              {/* Filter Watermark Label */}
              {cameraActive && (
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-[11px] text-white/90 font-mono pointer-events-none">
                  {selectedFilter.name}
                </div>
              )}
            </div>

            {/* Quick Live Filter Selector Carousel */}
            <div className="mt-4 pt-3 border-t border-[#F4D1D5]/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#702C43]">Live Camera Filter</span>
                <div className="flex gap-1 text-[11px]">
                  {FILTER_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFilterCategory(cat.id)}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        filterCategory === cat.id
                          ? "bg-[#A94F65] text-white font-medium"
                          : "text-[#702C43]/70 hover:bg-[#FFF0F2]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {displayedFilters.map((fil) => (
                  <button
                    key={fil.id}
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setSelectedFilter(fil);
                    }}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs transition-all border ${
                      selectedFilter.id === fil.id
                        ? "bg-[#FFF0F2] text-[#702C43] border-[#A94F65] font-medium shadow-sm ring-1 ring-[#A94F65]"
                        : "bg-white text-[#702C43]/75 border-[#F4D1D5] hover:bg-[#FFF5F7]"
                    }`}
                  >
                    {fil.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Big Center Capture Button */}
            <div className="mt-6 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleTriggerCapture}
                disabled={countdown !== null}
                className="group relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#A94F65] to-[#D58C9C] p-1.5 shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer disabled:opacity-50"
                title="Take One Photo"
              >
                <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                    <Camera className="w-6 h-6 text-[#A94F65]" />
                  </div>
                </div>
              </button>
              <span className="text-[11px] text-[#702C43]/70 mt-2 font-mono">
                {countdown !== null ? `Taking photo in ${countdown}s...` : "Click to Take 1 Photo"}
              </span>
            </div>

            {/* Session Photos Tray at Bottom */}
            {sessionPhotos.length > 0 && (
              <div className="mt-6 pt-4 border-t border-[#F4D1D5]/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#702C43]">
                    Current Session ({sessionPhotos.length}/{selectedLayout.requiredPhotos})
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("editor")}
                    className="text-xs font-medium text-[#A94F65] hover:underline flex items-center gap-1"
                  >
                    <span>Open Editor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {sessionPhotos.map((photo, i) => (
                    <div
                      key={photo.id}
                      className="relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border border-[#D58C9C] shadow-sm bg-black group"
                    >
                      <img src={photo.dataUrl} alt={`Shot ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 px-1 rounded bg-black/60 text-[10px] text-white font-mono">
                        #{i + 1}
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleRetakeSpecificPhoto(i)}
                          className="p-1 rounded bg-white text-[#702C43] hover:bg-[#FFF0F2]"
                          title="Retake this slot"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(i)}
                          className="p-1 rounded bg-rose-500 text-white hover:bg-rose-600"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════
            STEP 3: REVIEW SINGLE PHOTO MODAL / SCREEN (RETAKE vs CONTINUE)
            ═════════════════════════════════════════════════════════════════════ */}
        {currentStep === "review_single" && pendingPhoto && (
          <div className="bg-white/95 rounded-3xl border border-[#F4D1D5] shadow-xl p-5 sm:p-8 backdrop-blur-sm max-w-lg mx-auto text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F2] text-[#A94F65] text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D58C9C]" />
              <span>
                Review Shot #{sessionPhotos.length + 1} of {selectedLayout.requiredPhotos}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#702C43] font-medium">How does this look?</h3>
            <p className="text-xs text-[#702C43]/70 mt-1 mb-4">
              Check your pose. You can retake it instantly or continue to save it.
            </p>

            {/* Single Photo Preview */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border border-[#F4D1D5] bg-black mb-6">
              <img src={pendingPhoto} alt="Review capture" className="w-full h-full object-cover" />
            </div>

            {/* RETAKE vs CONTINUE Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleRetakePending}
                className="py-3 px-4 rounded-2xl bg-white border border-[#D58C9C] text-[#702C43] text-sm font-medium hover:bg-[#FFF0F2] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-[#A94F65]" />
                <span>Retake</span>
              </button>

              <button
                type="button"
                onClick={handleContinuePending}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#A94F65] to-[#702C43] text-white text-sm font-medium hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-md shadow-[#A94F65]/25 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Continue</span>
              </button>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════
            STEP 5: STUDIO EDITOR & PHOTOBOX CUSTOMIZATION
            ═════════════════════════════════════════════════════════════════════ */}
        {currentStep === "editor" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Photobox Interactive Canvas Preview */}
            <div className="lg:col-span-7 bg-white/90 rounded-3xl border border-[#F4D1D5] shadow-xl p-4 sm:p-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 border-b border-[#F4D1D5]/60 mb-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("camera")}
                  className="text-xs font-medium text-[#702C43] hover:text-[#A94F65] flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Camera</span>
                </button>
                <span className="text-xs font-mono text-[#A94F65]">
                  {selectedLayout.name} • {selectedFrame.name}
                </span>
              </div>

              {/* Photobox Mockup Preview Container */}
              <div className="relative w-full max-w-sm flex justify-center py-2">
                <div
                  className="relative rounded-2xl shadow-2xl overflow-hidden border transition-all duration-300"
                  style={{
                    backgroundColor: selectedFrame.bgColor,
                    borderColor: selectedFrame.borderColor,
                    borderWidth: `${borderThickness}px`,
                    width: "100%",
                    maxWidth: "340px",
                    aspectRatio: selectedLayout.aspectRatio,
                  }}
                >
                  {/* Frame Header Text */}
                  <div className="w-full text-center py-2 px-3">
                    <span
                      className="text-[10px] tracking-widest font-semibold uppercase truncate block"
                      style={{ color: selectedFrame.subtextColor }}
                    >
                      {selectedFrame.headerText}
                    </span>
                  </div>

                  {/* Layout Slots with Captured Photos */}
                  <div className="relative w-full h-[82%] px-2">
                    {selectedLayout.slots.map((slot, i) => {
                      const photo = sessionPhotos[i];
                      return (
                        <div
                          key={i}
                          className="absolute rounded overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center"
                          style={{
                            left: `${slot.x}%`,
                            top: `${slot.y}%`,
                            width: `${slot.w}%`,
                            height: `${slot.h}%`,
                          }}
                        >
                          {photo ? (
                            <img
                              src={photo.dataUrl}
                              alt={`Slot ${i + 1}`}
                              className="w-full h-full object-cover"
                              style={{
                                filter: getCombinedCssFilter(selectedFilter, adjustments),
                              }}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                playPopSound();
                                setRetakeTargetIndex(i);
                                setCurrentStep("camera");
                              }}
                              className="w-full h-full border border-dashed border-[#A94F65]/40 flex flex-col items-center justify-center p-2 text-center hover:bg-[#FFF0F2] transition-colors"
                            >
                              <Plus className="w-4 h-4 text-[#A94F65]" />
                              <span className="text-[10px] text-[#A94F65] font-medium mt-1">
                                + Photo #{i + 1}
                              </span>
                            </button>
                          )}
                        </div>
                      );
                    })}

                    {/* Draggable Stickers Preview */}
                    {stickers.map((st) => (
                      <div
                        key={st.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-xs font-bold"
                        style={{
                          left: `${st.x}%`,
                          top: `${st.y}%`,
                          transform: `translate(-50%, -50%) rotate(${st.rotation}deg) scale(${st.scale})`,
                          color: st.color,
                        }}
                      >
                        {st.type === "heart" && "💗"}
                        {st.type === "sparkle" && "✨"}
                        {st.type === "star" && "⭐"}
                        {st.type === "bow" && "🎀"}
                        {(st.type === "label" || st.type === "datestamp") && (
                          <span className="px-1.5 py-0.5 rounded-full bg-white/90 border border-current text-[9px] shadow-sm">
                            {st.label}
                          </span>
                        )}
                      </div>
                    ))}

                    {/* Custom Text Overlays Preview */}
                    {texts.map((txt) => (
                      <div
                        key={txt.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-xs drop-shadow-md ${
                          txt.font === "serif"
                            ? "font-serif italic"
                            : txt.font === "script"
                            ? "font-serif italic font-light"
                            : txt.font === "mono"
                            ? "font-mono font-bold"
                            : "font-sans font-medium"
                        }`}
                        style={{
                          left: `${txt.x}%`,
                          top: `${txt.y}%`,
                          color: txt.color,
                        }}
                      >
                        {txt.text}
                      </div>
                    ))}
                  </div>

                  {/* Frame Footer Caption & Date */}
                  <div className="absolute bottom-2 inset-x-0 text-center px-2">
                    <p
                      className="font-serif italic text-xs truncate"
                      style={{ color: selectedFrame.textColor }}
                    >
                      {customCaption.trim() || selectedFrame.footerText}
                    </p>
                    {showDate && (
                      <span
                        className="text-[9px] font-mono tracking-wider block mt-0.5 opacity-80"
                        style={{ color: selectedFrame.subtextColor }}
                      >
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Big Action Button: Finish & Print */}
              <div className="w-full mt-6">
                <button
                  type="button"
                  onClick={handleFinishAndPrint}
                  disabled={isCompiling}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#A94F65] to-[#702C43] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#A94F65]/25 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 text-[#F4D1D5]" />
                  <span>{isCompiling ? "Printing Photobox..." : "Finish & Print Memory ✨"}</span>
                </button>
              </div>
            </div>

            {/* Right: Studio Customization Tools (Tabs) */}
            <div className="lg:col-span-5 bg-white/90 rounded-3xl border border-[#F4D1D5] shadow-xl p-4 sm:p-6 backdrop-blur-sm">
              {/* Tab Navigation */}
              <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-4 border-b border-[#F4D1D5]/60 scrollbar-none">
                {[
                  { id: "frame", label: "Frames (15)" },
                  { id: "layout", label: "Layouts (11)" },
                  { id: "filter", label: "Filters (24)" },
                  { id: "adjust", label: "Sliders" },
                  { id: "stickers", label: "Stickers" },
                  { id: "text", label: "Text" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setEditorTab(tab.id as typeof editorTab);
                    }}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs transition-colors ${
                      editorTab === tab.id
                        ? "bg-[#A94F65] text-white font-medium shadow-sm"
                        : "bg-[#FFF0F2]/70 text-[#702C43] hover:bg-[#FFF0F2]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: FRAMES PICKER */}
              {editorTab === "frame" && (
                <div className="space-y-4">
                  {/* Frame Category Selector */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {FRAME_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFrameCategory(cat.id)}
                        className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs transition-colors ${
                          frameCategory === cat.id
                            ? "bg-[#702C43] text-white font-medium"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Frame Grid */}
                  <div className="grid grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {displayedFrames.map((frame) => (
                      <button
                        key={frame.id}
                        type="button"
                        onClick={() => {
                          playPaperSound();
                          setSelectedFrame(frame);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedFrame.id === frame.id
                            ? "border-[#A94F65] bg-[#FFF0F2] ring-2 ring-[#A94F65]/30 shadow-sm"
                            : "border-[#F4D1D5] bg-white hover:bg-[#FFF5F7]"
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded-lg mb-2 border border-black/10 flex items-center justify-center text-[10px] font-mono uppercase"
                          style={{
                            backgroundColor: frame.bgColor,
                            color: frame.textColor,
                          }}
                        >
                          Preview
                        </div>
                        <div className="font-serif text-xs font-medium text-[#702C43] truncate">
                          {frame.name}
                        </div>
                        <div className="text-[10px] text-[#A94F65]/80 line-clamp-1 mt-0.5">
                          {frame.description}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Frame Settings: Caption & Border */}
                  <div className="pt-3 border-t border-[#F4D1D5]/60 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-[#702C43] block mb-1">
                        Frame Caption
                      </label>
                      <input
                        type="text"
                        value={customCaption}
                        onChange={(e) => setCustomCaption(e.target.value)}
                        placeholder={selectedFrame.footerText}
                        className="w-full px-3 py-2 rounded-xl border border-[#D58C9C] text-xs text-[#702C43] bg-white focus:outline-none focus:ring-1 focus:ring-[#A94F65]"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#702C43]">
                      <span>Include Date Stamp</span>
                      <input
                        type="checkbox"
                        checked={showDate}
                        onChange={(e) => setShowDate(e.target.checked)}
                        className="accent-[#A94F65] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[#702C43] mb-1">
                        <span>Border Thickness</span>
                        <span>{borderThickness}px</span>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={24}
                        value={borderThickness}
                        onChange={(e) => setBorderThickness(Number(e.target.value))}
                        className="w-full accent-[#A94F65]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LAYOUTS PICKER */}
              {editorTab === "layout" && (
                <div className="space-y-3">
                  <p className="text-xs text-[#702C43]/70">
                    Switch layout anytime. If a layout needs more photos, you can add them directly!
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
                    {LAYOUT_LIST.map((ly) => (
                      <button
                        key={ly.id}
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setSelectedLayout(ly);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedLayout.id === ly.id
                            ? "border-[#A94F65] bg-[#FFF0F2] ring-2 ring-[#A94F65]/30 shadow-sm"
                            : "border-[#F4D1D5] bg-white hover:bg-[#FFF5F7]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-xs font-medium text-[#702C43]">
                            {ly.name}
                          </span>
                          <span className="text-[10px] bg-[#E8B5C0]/40 text-[#702C43] px-1.5 py-0.5 rounded font-mono">
                            {ly.requiredPhotos} shots
                          </span>
                        </div>
                        <p className="text-[10px] text-[#A94F65]/80 line-clamp-1">{ly.tagline}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: FILTERS PICKER */}
              {editorTab === "filter" && (
                <div className="space-y-3">
                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {FILTER_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFilterCategory(cat.id)}
                        className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs transition-colors ${
                          filterCategory === cat.id
                            ? "bg-[#702C43] text-white font-medium"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 max-h-[380px] overflow-y-auto pr-1">
                    {displayedFilters.map((fil) => (
                      <button
                        key={fil.id}
                        type="button"
                        onClick={() => {
                          playPopSound();
                          setSelectedFilter(fil);
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedFilter.id === fil.id
                            ? "border-[#A94F65] bg-[#FFF0F2] font-medium ring-2 ring-[#A94F65]/30 shadow-sm"
                            : "border-[#F4D1D5] bg-white hover:bg-[#FFF5F7]"
                        }`}
                      >
                        <span className="text-xs text-[#702C43] block truncate">{fil.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SLIDERS & ADJUSTMENTS */}
              {editorTab === "adjust" && (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {[
                    { key: "brightness", label: "Brightness", min: -50, max: 50 },
                    { key: "contrast", label: "Contrast", min: -50, max: 50 },
                    { key: "saturation", label: "Saturation", min: -50, max: 50 },
                    { key: "warmth", label: "Warmth", min: -50, max: 50 },
                    { key: "grain", label: "Film Grain", min: 0, max: 100 },
                    { key: "vignette", label: "Vignette", min: 0, max: 100 },
                    { key: "blur", label: "Soft Focus / Blur", min: 0, max: 100 },
                  ].map((slider) => {
                    const val = adjustments[slider.key as keyof AdjustmentSettings];
                    return (
                      <div key={slider.key} className="space-y-1">
                        <div className="flex justify-between text-xs text-[#702C43]">
                          <span>{slider.label}</span>
                          <span className="font-mono">{val}</span>
                        </div>
                        <input
                          type="range"
                          min={slider.min}
                          max={slider.max}
                          value={val}
                          onChange={(e) =>
                            setAdjustments((prev) => ({
                              ...prev,
                              [slider.key]: Number(e.target.value),
                            }))
                          }
                          className="w-full accent-[#A94F65]"
                        />
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() =>
                      setAdjustments({
                        brightness: 0,
                        contrast: 0,
                        saturation: 0,
                        warmth: 0,
                        grain: 0,
                        vignette: 0,
                        blur: 0,
                      })
                    }
                    className="w-full py-2 rounded-xl border border-gray-300 text-xs text-gray-600 hover:bg-gray-100"
                  >
                    Reset All Sliders
                  </button>
                </div>
              )}

              {/* TAB 5: STICKERS */}
              {editorTab === "stickers" && (
                <div className="space-y-3">
                  <p className="text-xs text-[#702C43]/70">
                    Click any sticker to place it onto your photobox:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {STICKER_PRESETS.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handleAddSticker(st.type, st.label, st.defaultColor)}
                        className="p-2.5 rounded-xl border border-[#F4D1D5] bg-white hover:bg-[#FFF0F2] text-xs text-[#702C43] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <span className="text-base">{st.previewIcon}</span>
                        <span className="truncate">{st.label}</span>
                      </button>
                    ))}
                  </div>

                  {stickers.length > 0 && (
                    <div className="pt-3 border-t border-[#F4D1D5]/60">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-[#702C43]">
                          Active Stickers ({stickers.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => setStickers([])}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {stickers.map((st, i) => (
                          <div
                            key={st.id}
                            className="flex items-center justify-between p-1.5 rounded-lg bg-[#FFF0F2] text-xs text-[#702C43]"
                          >
                            <span>
                              #{i + 1} {st.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => setStickers((prev) => prev.filter((_, idx) => idx !== i))}
                              className="text-rose-600 hover:text-rose-800"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: CUSTOM TEXT */}
              {editorTab === "text" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-[#702C43] block mb-1">
                      Add Custom Text
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTextString}
                        onChange={(e) => setNewTextString(e.target.value)}
                        placeholder="e.g. prettiest day with you"
                        className="flex-1 px-3 py-2 rounded-xl border border-[#D58C9C] text-xs text-[#702C43] bg-white focus:outline-none focus:ring-1 focus:ring-[#A94F65]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomText}
                        className="py-2 px-4 rounded-xl bg-[#A94F65] text-white text-xs font-medium hover:bg-[#702C43]"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Font Style Selection */}
                  <div>
                    <label className="text-xs font-medium text-[#702C43] block mb-1">
                      Font Style
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {TEXT_FONTS.map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => setNewTextFont(font.id as typeof newTextFont)}
                          className={`p-2 rounded-lg text-xs border text-center ${
                            newTextFont === font.id
                              ? "bg-[#FFF0F2] border-[#A94F65] text-[#702C43] font-medium"
                              : "bg-white border-[#F4D1D5] text-[#702C43]/70"
                          }`}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Color Picker */}
                  <div>
                    <label className="text-xs font-medium text-[#702C43] block mb-1">
                      Text Color
                    </label>
                    <div className="flex gap-2">
                      {TEXT_COLORS.map((col) => (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => setNewTextColor(col.hex)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            newTextColor === col.hex ? "scale-110 border-[#702C43]" : "border-gray-200"
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Active Texts List */}
                  {texts.length > 0 && (
                    <div className="pt-3 border-t border-[#F4D1D5]/60">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-[#702C43]">
                          Active Texts ({texts.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => setTexts([])}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-1.5 max-h-32 overflow-y-auto">
                        {texts.map((txt, i) => (
                          <div
                            key={txt.id}
                            className="flex items-center justify-between p-1.5 rounded-lg bg-[#FFF0F2] text-xs text-[#702C43]"
                          >
                            <span className="truncate">&ldquo;{txt.text}&rdquo;</span>
                            <button
                              type="button"
                              onClick={() => setTexts((prev) => prev.filter((_, idx) => idx !== i))}
                              className="text-rose-600 hover:text-rose-800"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          STEP 6: FINAL PHOTO POPUP MODAL
          ═════════════════════════════════════════════════════════════════════ */}
      <FinalPopup
        isOpen={isFinalPopupOpen}
        onClose={() => setIsFinalPopupOpen(false)}
        compiledImageUrl={compiledImageUrl}
        individualPhotos={sessionPhotos.map((p) => p.dataUrl)}
        onEditAgain={() => {
          setIsFinalPopupOpen(false);
          setCurrentStep("editor");
        }}
        onNewSession={handleResetSession}
        frameName={selectedFrame.name}
        layoutName={selectedLayout.name}
      />
    </section>
  );
}
