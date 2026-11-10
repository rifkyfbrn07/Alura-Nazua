// Shared Types for Alura's Pink Photobooth Studio

export type LayoutType =
  | "strip4"
  | "strip3"
  | "single"
  | "square"
  | "col2"
  | "grid2x2"
  | "collage3"
  | "collage4"
  | "stripHorizontal"
  | "story"
  | "photodump";

export type FrameCategory = "all" | "classic" | "instagram" | "coquette";

export type PhotoboothFrame = {
  id: string;
  name: string;
  category: "classic" | "instagram" | "coquette";
  description: string;
  bgColor: string;
  textColor: string;
  subtextColor: string;
  borderColor: string;
  headerText: string;
  footerText: string;
  accentStyle:
    | "minimal"
    | "korean-cut"
    | "sprockets"
    | "film-sheet"
    | "coquette-bows"
    | "lily-signature"
    | "instagram-ui"
    | "editorial"
    | "polaroid"
    | "contact-sheet"
    | "photo-dump";
  previewBg: string;
};

export type FilterCategory = "natural" | "vintage" | "pink" | "aesthetic";

export type CameraFilter = {
  id: string;
  name: string;
  category: FilterCategory;
  css: string;
  warmth: number; // -50 to 50
  tint?: string;
  contrastBoost?: number;
  saturationBoost?: number;
  brightnessBoost?: number;
  grainDefault?: number;
};

export type AdjustmentSettings = {
  brightness: number; // -50 to 50, default 0
  contrast: number; // -50 to 50, default 0
  saturation: number; // -50 to 50, default 0
  warmth: number; // -50 to 50, default 0
  grain: number; // 0 to 100, default 0
  vignette: number; // 0 to 100, default 0
  blur: number; // 0 to 100, default 0
};

export type StickerType = "heart" | "sparkle" | "star" | "bow" | "label" | "datestamp";

export type StickerItem = {
  id: string;
  type: StickerType;
  label: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  scale: number; // 0.6 - 2.0
  rotation: number; // degrees -180 to 180
  color: string;
};

export type TextOverlayItem = {
  id: string;
  text: string;
  font: "serif" | "sans" | "script" | "mono";
  size: number; // 12 - 48
  color: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
};

export type CapturedPhoto = {
  id: string;
  dataUrl: string;
  timestamp: number;
};

export type PhotoboothStep =
  | "camera"
  | "review_single"
  | "session_tray"
  | "editor"
  | "final_popup";

