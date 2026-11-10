// 12 Original Interactive Photobooth Frames for Alura's Pink Photobooth
// Each frame has distinct SVG preview elements and native Canvas 2D drawing routines for high-res PNG export.

export type FrameCategory = "all" | "cute" | "floral" | "vintage" | "romantic" | "celebration";

export type PhotoboothFrame = {
  id: string;
  name: string;
  category: "cute" | "floral" | "vintage" | "romantic" | "celebration";
  bgColor: string;
  borderColor: string;
  accentColor: string;
  textColor: string;
  tagline: string;
  thumbnailEmoji: string;
  badge: string;
};

export const PHOTOBOOTH_FRAMES: PhotoboothFrame[] = [
  {
    id: "classic-pink",
    name: "Classic Pink",
    category: "romantic",
    bgColor: "#FFF5F7",
    borderColor: "#F4D1D5",
    accentColor: "#A94F65",
    textColor: "#702C43",
    tagline: "Soft pastel elegance",
    thumbnailEmoji: "🌸",
    badge: "Classic",
  },
  {
    id: "coquette-ribbon",
    name: "Coquette Ribbon",
    category: "cute",
    bgColor: "#FFF0F2",
    borderColor: "#E8B5C0",
    accentColor: "#A94F65",
    textColor: "#702C43",
    tagline: "Delicate satin bows & ribbons",
    thumbnailEmoji: "🎀",
    badge: "Popular",
  },
  {
    id: "lily-garden",
    name: "Lily Garden",
    category: "floral",
    bgColor: "#FFF7F5",
    borderColor: "#D58C9C",
    accentColor: "#A94F65",
    textColor: "#702C43",
    tagline: "Alura's signature blooming lilies",
    thumbnailEmoji: "🌷",
    badge: "Signature",
  },
  {
    id: "butterfly-dream",
    name: "Butterfly Dream",
    category: "romantic",
    bgColor: "#FCE8E8",
    borderColor: "#E8B5C0",
    accentColor: "#A94F65",
    textColor: "#702C43",
    tagline: "Fluttering pastel butterflies & stardust",
    thumbnailEmoji: "🦋",
    badge: "Soft",
  },
  {
    id: "retro-photobooth",
    name: "Retro Photobooth",
    category: "vintage",
    bgColor: "#F4D1D5",
    borderColor: "#702C43",
    accentColor: "#702C43",
    textColor: "#FFFFFF",
    tagline: "Vintage arcade photo strip vibes",
    thumbnailEmoji: "🎞️",
    badge: "Retro",
  },
  {
    id: "vintage-film",
    name: "Vintage Film",
    category: "vintage",
    bgColor: "#2A1820",
    borderColor: "#D58C9C",
    accentColor: "#E5A93C",
    textColor: "#FFF0F2",
    tagline: "Dark 35mm film perforations & orange stamps",
    thumbnailEmoji: "🎬",
    badge: "Analog",
  },
  {
    id: "love-letter",
    name: "Love Letter",
    category: "romantic",
    bgColor: "#FFFDFB",
    borderColor: "#F4D1D5",
    accentColor: "#A94F65",
    textColor: "#702C43",
    tagline: "Airmail trims & wax seal imprint",
    thumbnailEmoji: "💌",
    badge: "Letter",
  },
  {
    id: "strawberry-milk",
    name: "Strawberry Milk",
    category: "cute",
    bgColor: "#FFEBF0",
    borderColor: "#FFB3C6",
    accentColor: "#FB6F92",
    textColor: "#702C43",
    tagline: "Sweet cream and strawberry gingham",
    thumbnailEmoji: "🍓",
    badge: "Sweet",
  },
  {
    id: "cloud-nine",
    name: "Cloud Nine",
    category: "cute",
    bgColor: "#F0F4FF",
    borderColor: "#D4E0FF",
    accentColor: "#7A9CE6",
    textColor: "#34495E",
    tagline: "Fluffy pastel clouds & crescent moon",
    thumbnailEmoji: "☁️",
    badge: "Dreamy",
  },
  {
    id: "birthday-special",
    name: "Birthday Special",
    category: "celebration",
    bgColor: "#FFF9E6",
    borderColor: "#FCE8E8",
    accentColor: "#A94F65",
    textColor: "#702C43",
    tagline: "Party confetti, sparkles & celebration bows",
    thumbnailEmoji: "🎂",
    badge: "Festive",
  },
  {
    id: "polaroid-memories",
    name: "Polaroid Memories",
    category: "vintage",
    bgColor: "#FFFFFF",
    borderColor: "#E8B5C0",
    accentColor: "#A94F65",
    textColor: "#702C43",
    tagline: "Authentic white Polaroid frame & tape",
    thumbnailEmoji: "📷",
    badge: "Minimal",
  },
  {
    id: "our-little-world",
    name: "Our Little World",
    category: "floral",
    bgColor: "#FFF0F2",
    borderColor: "#A94F65",
    accentColor: "#702C43",
    textColor: "#702C43",
    tagline: "Lilies, ribbons, butterflies & scrapbook memories",
    thumbnailEmoji: "✨",
    badge: "Special",
  },
];

export type LiveCameraFilter = {
  id: string;
  name: string;
  css: string;
  canvasApply: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
};

export const CAMERA_FILTERS: LiveCameraFilter[] = [
  {
    id: "original",
    name: "Original",
    css: "none",
    canvasApply: () => {},
  },
  {
    id: "softPink",
    name: "Soft Pink",
    css: "sepia(0.12) saturate(1.18) hue-rotate(318deg) brightness(1.04)",
    canvasApply: (ctx, w, h) => {
      ctx.fillStyle = "rgba(252, 232, 232, 0.16)";
      ctx.fillRect(0, 0, w, h);
    },
  },
  {
    id: "warmVintage",
    name: "Warm Vintage",
    css: "sepia(0.32) contrast(0.96) brightness(1.05) saturate(1.1)",
    canvasApply: (ctx, w, h) => {
      ctx.fillStyle = "rgba(244, 209, 213, 0.14)";
      ctx.fillRect(0, 0, w, h);
    },
  },
  {
    id: "dreamy",
    name: "Dreamy",
    css: "brightness(1.08) contrast(0.92) saturate(1.15)",
    canvasApply: (ctx, w, h) => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(0, 0, w, h);
    },
  },
  {
    id: "softGlow",
    name: "Soft Glow",
    css: "contrast(0.94) brightness(1.06) saturate(1.08)",
    canvasApply: (ctx, w, h) => {
      ctx.fillStyle = "rgba(255, 240, 242, 0.12)";
      ctx.fillRect(0, 0, w, h);
    },
  },
  {
    id: "blackAndWhite",
    name: "Black & White",
    css: "grayscale(1) contrast(1.1) brightness(1.02)",
    canvasApply: (ctx, w, h) => {
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
      }
      ctx.putImageData(imgData, 0, 0);
    },
  },
  {
    id: "retroFilm",
    name: "Retro Film",
    css: "sepia(0.24) contrast(1.04) brightness(0.98) saturate(0.88)",
    canvasApply: (ctx, w, h) => {
      ctx.fillStyle = "rgba(232, 181, 192, 0.12)";
      ctx.fillRect(0, 0, w, h);
    },
  },
];

// Helper to draw customized decorative frame overlays onto Canvas 2D
export function drawPhotoboothDecorations(
  ctx: CanvasRenderingContext2D,
  frame: PhotoboothFrame,
  canvasWidth: number,
  canvasHeight: number,
  options: {
    caption: string;
    showDate: boolean;
    displayDate: string;
    borderThickness: number;
    showDecorations: boolean;
  }
) {
  const { caption, showDate, displayDate, borderThickness, showDecorations } = options;
  const padding = borderThickness;

  ctx.save();

  // 1. Outer Frame Stroke
  ctx.strokeStyle = frame.borderColor;
  ctx.lineWidth = borderThickness;
  ctx.strokeRect(padding / 2, padding / 2, canvasWidth - padding, canvasHeight - padding);

  // 2. Specific frame decorations based on frame ID
  if (showDecorations) {
    if (frame.id === "coquette-ribbon") {
      ctx.font = "32px sans-serif";
      ctx.fillText("🎀", 28, 48);
      ctx.fillText("🎀", canvasWidth - 58, 48);
      ctx.fillText("🎀", 28, canvasHeight - 50);
      ctx.fillText("🎀", canvasWidth - 58, canvasHeight - 50);
    } else if (frame.id === "lily-garden") {
      ctx.font = "34px sans-serif";
      ctx.fillText("🌷", 24, 52);
      ctx.fillText("🌷", canvasWidth - 60, 52);
      ctx.fillText("🌸", 24, canvasHeight - 48);
      ctx.fillText("🌷", canvasWidth - 60, canvasHeight - 48);
    } else if (frame.id === "butterfly-dream") {
      ctx.font = "30px sans-serif";
      ctx.fillText("🦋", 28, 50);
      ctx.fillText("✨", canvasWidth - 50, 48);
      ctx.fillText("✨", 32, canvasHeight - 50);
      ctx.fillText("🦋", canvasWidth - 60, canvasHeight - 50);
    } else if (frame.id === "retro-photobooth") {
      // Film sprocket perforations along sides
      ctx.fillStyle = frame.borderColor;
      const count = Math.floor(canvasHeight / 48);
      for (let i = 1; i < count; i++) {
        ctx.fillRect(8, i * 48, 12, 22);
        ctx.fillRect(canvasWidth - 20, i * 48, 12, 22);
      }
    } else if (frame.id === "vintage-film") {
      // Film edge numbers
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "#E5A93C";
      ctx.fillText("▶ 35MM KODAK 400", 28, 30);
      ctx.fillText("FRAME #04 ◀", canvasWidth - 140, 30);
    } else if (frame.id === "love-letter") {
      // Airmail border dashes
      ctx.strokeStyle = "#A94F65";
      ctx.setLineDash([14, 8]);
      ctx.lineWidth = 4;
      ctx.strokeRect(14, 14, canvasWidth - 28, canvasHeight - 28);
      ctx.setLineDash([]);
      ctx.font = "28px sans-serif";
      ctx.fillText("💌", canvasWidth - 52, 48);
    } else if (frame.id === "strawberry-milk") {
      ctx.font = "28px sans-serif";
      ctx.fillText("🍓", 28, 48);
      ctx.fillText("🍓", canvasWidth - 54, 48);
    } else if (frame.id === "cloud-nine") {
      ctx.font = "28px sans-serif";
      ctx.fillText("☁️", 28, 48);
      ctx.fillText("⭐", canvasWidth - 52, 48);
      ctx.fillText("🌙", 28, canvasHeight - 50);
    } else if (frame.id === "birthday-special") {
      ctx.font = "28px sans-serif";
      ctx.fillText("🎉", 28, 48);
      ctx.fillText("🎂", canvasWidth - 54, 48);
      ctx.fillText("✨", canvasWidth / 2 - 14, 48);
    } else if (frame.id === "polaroid-memories") {
      // Washi tape at top
      ctx.fillStyle = "rgba(244, 209, 213, 0.8)";
      ctx.fillRect(canvasWidth / 2 - 60, 10, 120, 26);
    } else if (frame.id === "our-little-world") {
      ctx.font = "28px sans-serif";
      ctx.fillText("🌷", 24, 48);
      ctx.fillText("🎀", canvasWidth - 52, 48);
      ctx.fillText("🦋", 24, canvasHeight - 50);
      ctx.fillText("✨", canvasWidth - 50, canvasHeight - 50);
    }
  }

  // 3. Header Stamp
  ctx.textAlign = "center";
  ctx.font = "bold 13px monospace";
  ctx.fillStyle = frame.accentColor;
  ctx.fillText("ALURA'S PINK PHOTOBOOTH // MEMORY STRIP", canvasWidth / 2, padding + 18);

  // 4. Footer Caption and Date
  const bottomY = canvasHeight - 38;
  if (caption) {
    ctx.font = "italic 20px Georgia, serif";
    ctx.fillStyle = frame.textColor;
    ctx.fillText(`“${caption}”`, canvasWidth / 2, bottomY - 24);
  }

  if (showDate) {
    ctx.font = "12px monospace";
    ctx.fillStyle = frame.accentColor;
    ctx.fillText(displayDate.toUpperCase(), canvasWidth / 2, bottomY);
  }

  ctx.restore();
}

