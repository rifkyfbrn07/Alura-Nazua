// 24 Instagram-Camera-Style Filters & Adjustment Utilities for Alura's Pink Photobooth Studio

import { CameraFilter, FilterCategory, AdjustmentSettings } from "./types";

export const CAMERA_FILTERS: CameraFilter[] = [
  // ─── 1. NATURAL ──────────────────────────────────────────────────────────
  {
    id: "original",
    name: "Original",
    category: "natural",
    css: "none",
    warmth: 0,
  },
  {
    id: "natural",
    name: "Natural",
    category: "natural",
    css: "contrast(1.03) brightness(1.02) saturate(1.06)",
    warmth: 2,
    brightnessBoost: 2,
    contrastBoost: 3,
    saturationBoost: 6,
  },
  {
    id: "soft_skin",
    name: "Soft Skin",
    category: "natural",
    css: "contrast(0.96) brightness(1.06) saturate(1.04)",
    warmth: 4,
    brightnessBoost: 6,
    contrastBoost: -4,
    saturationBoost: 4,
  },
  {
    id: "warm_light",
    name: "Warm Light",
    category: "natural",
    css: "sepia(0.12) contrast(1.02) brightness(1.04) saturate(1.1)",
    warmth: 12,
    brightnessBoost: 4,
    contrastBoost: 2,
    saturationBoost: 10,
  },
  {
    id: "bright",
    name: "Bright",
    category: "natural",
    css: "brightness(1.1) contrast(1.04) saturate(1.02)",
    warmth: 0,
    brightnessBoost: 10,
    contrastBoost: 4,
    saturationBoost: 2,
  },
  {
    id: "soft_contrast",
    name: "Soft Contrast",
    category: "natural",
    css: "contrast(0.9) brightness(1.05) saturate(0.98)",
    warmth: 1,
    brightnessBoost: 5,
    contrastBoost: -10,
    saturationBoost: -2,
  },

  // ─── 2. VINTAGE ──────────────────────────────────────────────────────────
  {
    id: "vintage",
    name: "Vintage",
    category: "vintage",
    css: "sepia(0.28) contrast(0.98) brightness(1.03) saturate(0.96)",
    warmth: 20,
    tint: "rgba(245, 235, 220, 0.08)",
    contrastBoost: -2,
    saturationBoost: -4,
    grainDefault: 15,
  },
  {
    id: "kodak_warm",
    name: "Kodak Warm",
    category: "vintage",
    css: "sepia(0.18) hue-rotate(-8deg) contrast(1.06) saturate(1.18)",
    warmth: 18,
    contrastBoost: 6,
    saturationBoost: 18,
    grainDefault: 10,
  },
  {
    id: "film_grain",
    name: "Film Grain",
    category: "vintage",
    css: "contrast(1.08) brightness(0.98) saturate(0.92)",
    warmth: 5,
    contrastBoost: 8,
    brightnessBoost: -2,
    saturationBoost: -8,
    grainDefault: 28,
  },
  {
    id: "retro_90s",
    name: "Retro 90s",
    category: "vintage",
    css: "contrast(1.12) brightness(1.03) saturate(1.2) hue-rotate(5deg)",
    warmth: 8,
    contrastBoost: 12,
    brightnessBoost: 3,
    saturationBoost: 20,
    grainDefault: 12,
  },
  {
    id: "fade",
    name: "Fade",
    category: "vintage",
    css: "contrast(0.88) brightness(1.08) saturate(0.85)",
    warmth: 6,
    contrastBoost: -12,
    brightnessBoost: 8,
    saturationBoost: -15,
  },
  {
    id: "disposable",
    name: "Disposable",
    category: "vintage",
    css: "contrast(1.15) brightness(1.07) saturate(1.14)",
    warmth: 10,
    contrastBoost: 15,
    brightnessBoost: 7,
    saturationBoost: 14,
    grainDefault: 18,
  },

  // ─── 3. PINK & DREAMY ────────────────────────────────────────────────────
  {
    id: "soft_pink",
    name: "Soft Pink",
    category: "pink",
    css: "sepia(0.1) hue-rotate(320deg) saturate(1.22) brightness(1.05)",
    warmth: 6,
    tint: "rgba(255, 230, 235, 0.12)",
    contrastBoost: 0,
    saturationBoost: 22,
    brightnessBoost: 5,
  },
  {
    id: "rose",
    name: "Rose",
    category: "pink",
    css: "sepia(0.15) hue-rotate(330deg) contrast(1.03) saturate(1.14)",
    warmth: 8,
    tint: "rgba(235, 175, 190, 0.1)",
    contrastBoost: 3,
    saturationBoost: 14,
  },
  {
    id: "blush",
    name: "Blush",
    category: "pink",
    css: "brightness(1.06) contrast(0.96) saturate(1.18) hue-rotate(315deg)",
    warmth: 5,
    tint: "rgba(252, 218, 224, 0.1)",
    contrastBoost: -4,
    saturationBoost: 18,
    brightnessBoost: 6,
  },
  {
    id: "dreamy",
    name: "Dreamy",
    category: "pink",
    css: "brightness(1.08) contrast(0.92) saturate(1.15)",
    warmth: 4,
    contrastBoost: -8,
    saturationBoost: 15,
    brightnessBoost: 8,
  },
  {
    id: "pastel",
    name: "Pastel",
    category: "pink",
    css: "contrast(0.88) brightness(1.12) saturate(0.9)",
    warmth: 2,
    contrastBoost: -12,
    brightnessBoost: 12,
    saturationBoost: -10,
  },
  {
    id: "pink_glow",
    name: "Pink Glow",
    category: "pink",
    css: "brightness(1.06) saturate(1.16) hue-rotate(325deg) contrast(0.98)",
    warmth: 7,
    tint: "rgba(255, 210, 225, 0.14)",
    brightnessBoost: 6,
    saturationBoost: 16,
  },

  // ─── 4. AESTHETIC ────────────────────────────────────────────────────────
  {
    id: "cool_tone",
    name: "Cool Tone",
    category: "aesthetic",
    css: "hue-rotate(185deg) sepia(0.06) contrast(1.04) saturate(1.05)",
    warmth: -18,
    contrastBoost: 4,
    saturationBoost: 5,
  },
  {
    id: "golden_hour",
    name: "Golden Hour",
    category: "aesthetic",
    css: "sepia(0.32) saturate(1.32) brightness(1.04) hue-rotate(-12deg)",
    warmth: 30,
    contrastBoost: 2,
    saturationBoost: 32,
    brightnessBoost: 4,
  },
  {
    id: "matte",
    name: "Matte",
    category: "aesthetic",
    css: "contrast(0.86) brightness(1.06) saturate(0.92)",
    warmth: 3,
    contrastBoost: -14,
    brightnessBoost: 6,
    saturationBoost: -8,
  },
  {
    id: "bw",
    name: "Black & White",
    category: "aesthetic",
    css: "grayscale(1) contrast(1.2) brightness(1.02)",
    warmth: 0,
    contrastBoost: 20,
    brightnessBoost: 2,
    saturationBoost: -100,
  },
  {
    id: "soft_focus",
    name: "Soft Focus",
    category: "aesthetic",
    css: "contrast(0.96) brightness(1.06) saturate(1.08)",
    warmth: 4,
    contrastBoost: -4,
    brightnessBoost: 6,
    saturationBoost: 8,
  },
  {
    id: "cinematic",
    name: "Cinematic",
    category: "aesthetic",
    css: "contrast(1.12) saturate(1.18) hue-rotate(12deg)",
    warmth: -6,
    contrastBoost: 12,
    saturationBoost: 18,
  },
];

export const FILTER_CATEGORIES: { id: FilterCategory; name: string }[] = [
  { id: "natural", name: "Natural" },
  { id: "vintage", name: "Vintage" },
  { id: "pink", name: "Pink & Dreamy" },
  { id: "aesthetic", name: "Aesthetic" },
];

/**
 * Computes combined CSS filter string merging the base preset with slider adjustments
 */
export function getCombinedCssFilter(
  filter: CameraFilter,
  adjustments: AdjustmentSettings
): string {
  const parts: string[] = [];

  // Base filter CSS (unless original or none)
  if (filter.css && filter.css !== "none") {
    parts.push(filter.css);
  }

  // Brightness: -50% to +50% -> 0.5 to 1.5
  if (adjustments.brightness !== 0) {
    const val = 1 + adjustments.brightness / 100;
    parts.push(`brightness(${val.toFixed(2)})`);
  }

  // Contrast: -50% to +50% -> 0.5 to 1.5
  if (adjustments.contrast !== 0) {
    const val = 1 + adjustments.contrast / 100;
    parts.push(`contrast(${val.toFixed(2)})`);
  }

  // Saturation: -50% to +50% -> 0.5 to 1.5
  if (adjustments.saturation !== 0 && filter.id !== "bw") {
    const val = 1 + adjustments.saturation / 100;
    parts.push(`saturate(${val.toFixed(2)})`);
  }

  // Warmth: -50 to +50
  if (adjustments.warmth > 0) {
    const sepiaVal = (adjustments.warmth / 150).toFixed(2);
    parts.push(`sepia(${sepiaVal})`);
  } else if (adjustments.warmth < 0) {
    const hueVal = Math.round(Math.abs(adjustments.warmth) * 2.2);
    parts.push(`hue-rotate(${hueVal}deg)`);
  }

  // Blur: 0 to 100% -> 0 to 2px
  if (adjustments.blur > 0) {
    const px = ((adjustments.blur / 100) * 2).toFixed(2);
    parts.push(`blur(${px}px)`);
  }

  return parts.length > 0 ? parts.join(" ") : "none";
}

/**
 * Canvas 2D Post-Processor: applies vignette & film grain cleanly
 */
export function applyVignetteAndGrainToCanvas(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  vignetteAmount: number, // 0 - 100
  grainAmount: number // 0 - 100
) {
  // 1. Vignette
  if (vignetteAmount > 0) {
    ctx.save();
    const radius = Math.max(w, h) * 0.75;
    const grad = ctx.createRadialGradient(w / 2, h / 2, radius * 0.4, w / 2, h / 2, radius);
    const alpha = (vignetteAmount / 100) * 0.65;
    grad.addColorStop(0, "rgba(0, 0, 0, 0)");
    grad.addColorStop(1, `rgba(15, 8, 12, ${alpha.toFixed(2)})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  // 2. Grain
  if (grainAmount > 0) {
    ctx.save();
    const grainCanvas = document.createElement("canvas");
    const gw = 120;
    const gh = 120;
    grainCanvas.width = gw;
    grainCanvas.height = gh;
    const gctx = grainCanvas.getContext("2d");
    if (gctx) {
      const imgData = gctx.createImageData(gw, gh);
      const d = imgData.data;
      const intensity = (grainAmount / 100) * 35;
      for (let i = 0; i < d.length; i += 4) {
        const val = (Math.random() - 0.5) * intensity;
        d[i] = val > 0 ? 255 : 0;
        d[i + 1] = val > 0 ? 255 : 0;
        d[i + 2] = val > 0 ? 255 : 0;
        d[i + 3] = Math.min(255, Math.abs(val) * 2.5);
      }
      gctx.putImageData(imgData, 0, 0);

      const pattern = ctx.createPattern(grainCanvas, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, w, h);
      }
    }
    ctx.restore();
  }
}

