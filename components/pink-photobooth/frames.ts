// 15 Professional Photobox & Instagram-Style Frames for Alura's Pink Photobooth Studio
// Clean, elegant, Korean photobox aesthetics. Photos are always the primary attraction.

import { PhotoboothFrame, FrameCategory } from "./types";
import { LayoutConfig } from "./layouts";

export const PHOTOBOOTH_FRAMES: PhotoboothFrame[] = [
  // ─── CATEGORY A — CLASSIC PHOTOBOX ─────────────────────────────────────────
  {
    id: "classic-white",
    name: "Classic White",
    category: "classic",
    description: "Crisp pure white photobox borders with minimalist Korean typography",
    bgColor: "#FFFFFF",
    textColor: "#1A1A1A",
    subtextColor: "#8E8E93",
    borderColor: "#F0F0F2",
    headerText: "LIFE FOUR CUTS",
    footerText: "ALURA × RIFKY • MEMORY STUDIO",
    accentStyle: "minimal",
    previewBg: "#FFFFFF",
  },
  {
    id: "soft-pink",
    name: "Soft Pink",
    category: "classic",
    description: "Gentle blush pink border with delicate rose typography",
    bgColor: "#FFF5F7",
    textColor: "#702C43",
    subtextColor: "#A94F65",
    borderColor: "#F4D1D5",
    headerText: "ALURA'S PHOTO STUDIO",
    footerText: "BLOOMING WITH SWEET MEMORIES",
    accentStyle: "korean-cut",
    previewBg: "#FFF5F7",
  },
  {
    id: "korean-four-cut",
    name: "Korean Four Cut",
    category: "classic",
    description: "Modern Haru Film dark charcoal photobox strip with numbered badges",
    bgColor: "#16191E",
    textColor: "#F8FAFC",
    subtextColor: "#94A3B8",
    borderColor: "#2D3748",
    headerText: "HARU FOUR CUTS // STUDIO",
    footerText: "ALURA & RIFKY • SPECIAL ARCHIVE",
    accentStyle: "korean-cut",
    previewBg: "#16191E",
  },
  {
    id: "vintage-black",
    name: "Vintage Black",
    category: "classic",
    description: "Sleek matte black border with timeless cinematic typography",
    bgColor: "#0D0D0E",
    textColor: "#FFFFFF",
    subtextColor: "#A1A1AA",
    borderColor: "#27272A",
    headerText: "THE ARCHIVE // NO. 26",
    footerText: "A DAY TO REMEMBER FOREVER",
    accentStyle: "minimal",
    previewBg: "#0D0D0E",
  },
  {
    id: "cream-film",
    name: "Cream Film",
    category: "classic",
    description: "Warm ivory cream paper with analog orange date stamp & film notch",
    bgColor: "#FAF7F0",
    textColor: "#4A3B32",
    subtextColor: "#8C7A6B",
    borderColor: "#EADFCF",
    headerText: "35MM ANALOG MEMORY",
    footerText: "KODAK PORTRA 400 • '26 11 10",
    accentStyle: "film-sheet",
    previewBg: "#FAF7F0",
  },
  {
    id: "retro-booth",
    name: "Retro Booth",
    category: "classic",
    description: "Classic 1970s arcade photostrip cardstock with hairline divider trims",
    bgColor: "#F3EDE2",
    textColor: "#2B2620",
    subtextColor: "#6E6255",
    borderColor: "#D9CDBF",
    headerText: "PHOTO AUTOMAT BOOTH",
    footerText: "SAN FRANCISCO • AUTOMATIC PORTRAITS",
    accentStyle: "sprockets",
    previewBg: "#F3EDE2",
  },

  // ─── CATEGORY B — INSTAGRAM STYLE ──────────────────────────────────────────
  {
    id: "instagram-story",
    name: "Instagram Story",
    category: "instagram",
    description: "9:16 portrait story frame with real story header and minimalist footer",
    bgColor: "#050505",
    textColor: "#FFFFFF",
    subtextColor: "#A8A8A8",
    borderColor: "#262626",
    headerText: "ghiscca.alura",
    footerText: "Send message...",
    accentStyle: "instagram-ui",
    previewBg: "#050505",
  },
  {
    id: "photo-dump",
    name: "Photo Dump",
    category: "instagram",
    description: "Casual lifestyle photo dump with clean washi-tape corners & date",
    bgColor: "#FAF8F5",
    textColor: "#2D2A26",
    subtextColor: "#8A847C",
    borderColor: "#ECE6DD",
    headerText: "LITTLE MOMENTS DUMP",
    footerText: "a gentle collection of ordinary days with you",
    accentStyle: "photo-dump",
    previewBg: "#FAF8F5",
  },
  {
    id: "minimal-grid",
    name: "Minimal Grid",
    category: "instagram",
    description: "Ultra-clean Scandinavian layout with hairline grid lines & micro-labels",
    bgColor: "#FFFFFF",
    textColor: "#0F172A",
    subtextColor: "#64748B",
    borderColor: "#E2E8F0",
    headerText: "SERIES 01 // GHISCCA ALURA",
    footerText: "CURATED BY RIFKY • ALL RIGHTS RESERVED",
    accentStyle: "minimal",
    previewBg: "#FFFFFF",
  },
  {
    id: "editorial-collage",
    name: "Editorial Collage",
    category: "instagram",
    description: "Fashion editorial magazine spread with bold serif masthead",
    bgColor: "#F8F6F2",
    textColor: "#18181B",
    subtextColor: "#71717A",
    borderColor: "#E4E0D6",
    headerText: "L'ARCHIVE D'ALURA",
    footerText: "ISSUE NO. 11 // SWEETEST SMILE",
    accentStyle: "editorial",
    previewBg: "#F8F6F2",
  },
  {
    id: "polaroid-stack",
    name: "Polaroid Stack",
    category: "instagram",
    description: "Crisp white Polaroid cardstock with generous bottom handwriting margin",
    bgColor: "#FAFAFA",
    textColor: "#3F3F46",
    subtextColor: "#71717A",
    borderColor: "#E4E4E7",
    headerText: "POLAROID ORIGINAL",
    footerText: "my favorite person in the world",
    accentStyle: "polaroid",
    previewBg: "#FAFAFA",
  },
  {
    id: "contact-sheet",
    name: "Contact Sheet",
    category: "instagram",
    description: "35mm dark contact proof sheet with frame numbers & orange film stamps",
    bgColor: "#141416",
    textColor: "#E4E4E7",
    subtextColor: "#E5A93C",
    borderColor: "#27272A",
    headerText: "KODAK PORTRA 400 // CONTACT SHEET",
    footerText: "▶ 24A • 25 • 25A • 26 ◀",
    accentStyle: "contact-sheet",
    previewBg: "#141416",
  },

  // ─── CATEGORY C — CUTE & COQUETTE ──────────────────────────────────────────
  {
    id: "coquette-pink",
    name: "Coquette Pink",
    category: "coquette",
    description: "Soft blush pink frame with tiny elegant vector bows in the outer corners",
    bgColor: "#FFF2F5",
    textColor: "#702C43",
    subtextColor: "#A94F65",
    borderColor: "#F4D1D5",
    headerText: "COQUETTE CLUB // ALURA",
    footerText: "sweet ribbon days & pretty smiles",
    accentStyle: "coquette-bows",
    previewBg: "#FFF2F5",
  },
  {
    id: "baby-pink-film",
    name: "Baby Pink Film",
    category: "coquette",
    description: "Pastel baby pink film strip with subtle analog sprockets in soft rose",
    bgColor: "#FFEBF0",
    textColor: "#80354E",
    subtextColor: "#B35B76",
    borderColor: "#F7CAD7",
    headerText: "BABY PINK 35MM",
    footerText: "SOFT MEMORIES // LITTLE LILY WORLD",
    accentStyle: "sprockets",
    previewBg: "#FFEBF0",
  },
  {
    id: "lily-signature",
    name: "Lily Signature",
    category: "coquette",
    description: "Minimalist ivory frame with a delicate tiny line-art lily flower emblem at the bottom",
    bgColor: "#FFFDFB",
    textColor: "#542031",
    subtextColor: "#8F3A53",
    borderColor: "#F0DFE3",
    headerText: "ALURA'S LITTLE LILY WORLD",
    footerText: "blooming softly every day",
    accentStyle: "lily-signature",
    previewBg: "#FFFDFB",
  },
  {
    id: "maroon-scrapbook",
    name: "Maroon Scrapbook",
    category: "coquette",
    description: "Burgundy paper layers, gingham patches, stitched stars and tiny keepsakes",
    bgColor: "#6D1425",
    textColor: "#FFF8EF",
    subtextColor: "#F2C9C3",
    borderColor: "#9A2835",
    headerText: "LITTLE MOMENTS · VOL. 01",
    footerText: "kept close, always",
    accentStyle: "maroon-scrapbook",
    previewBg: "#6D1425",
  },
  {
    id: "denim-diary",
    name: "Denim Diary",
    category: "coquette",
    description: "Indigo denim texture, gingham fabric patches and retro ticket details",
    bgColor: "#17253C",
    textColor: "#FFF8EA",
    subtextColor: "#D8C5A9",
    borderColor: "#405577",
    headerText: "THE LITTLE MEMORY CLUB",
    footerText: "one day at a time",
    accentStyle: "denim-diary",
    previewBg: "#17253C",
  },
  {
    id: "mini-gallery",
    name: "Mini Gallery",
    category: "instagram",
    description: "Airy white gallery cards with tiny original character details",
    bgColor: "#FCFCFA",
    textColor: "#394858",
    subtextColor: "#7892A2",
    borderColor: "#E6ECEC",
    headerText: "TODAY · LITTLE GALLERY",
    footerText: "a favorite little day",
    accentStyle: "mini-gallery",
    previewBg: "#FCFCFA",
  },
];

export const FRAME_CATEGORIES: { id: FrameCategory; name: string }[] = [
  { id: "all", name: "All Frames (18)" },
  { id: "classic", name: "Classic Photobox" },
  { id: "instagram", name: "Instagram Style" },
  { id: "coquette", name: "Cute & Coquette" },
];

/**
 * Helper to draw tiny delicate vector ribbon bow on Canvas 2D
 */
function drawVectorBow(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Center knot
  ctx.beginPath();
  ctx.ellipse(cx, cy, size * 0.16, size * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Left loop
  ctx.beginPath();
  ctx.moveTo(cx - size * 0.1, cy);
  ctx.bezierCurveTo(cx - size * 0.7, cy - size * 0.6, cx - size * 0.9, cy + size * 0.3, cx - size * 0.1, cy + size * 0.1);
  ctx.stroke();

  // Right loop
  ctx.beginPath();
  ctx.moveTo(cx + size * 0.1, cy);
  ctx.bezierCurveTo(cx + size * 0.7, cy - size * 0.6, cx + size * 0.9, cy + size * 0.3, cx + size * 0.1, cy + size * 0.1);
  ctx.stroke();

  // Left ribbon tail
  ctx.beginPath();
  ctx.moveTo(cx - size * 0.08, cy + size * 0.12);
  ctx.quadraticCurveTo(cx - size * 0.45, cy + size * 0.6, cx - size * 0.55, cy + size * 0.85);
  ctx.stroke();

  // Right ribbon tail
  ctx.beginPath();
  ctx.moveTo(cx + size * 0.08, cy + size * 0.12);
  ctx.quadraticCurveTo(cx + size * 0.45, cy + size * 0.6, cx + size * 0.55, cy + size * 0.85);
  ctx.stroke();

  ctx.restore();
}

/**
 * Helper to draw tiny minimalist vector lily emblem on Canvas 2D
 */
function drawVectorLilyEmblem(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Center petal
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.5);
  ctx.bezierCurveTo(cx - size * 0.25, cy + size * 0.1, cx - size * 0.2, cy - size * 0.5, cx, cy - size * 0.65);
  ctx.bezierCurveTo(cx + size * 0.2, cy - size * 0.5, cx + size * 0.25, cy + size * 0.1, cx, cy + size * 0.5);
  ctx.stroke();

  // Left flared petal
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.4);
  ctx.bezierCurveTo(cx - size * 0.4, cy + size * 0.1, cx - size * 0.7, cy - size * 0.15, cx - size * 0.65, cy - size * 0.45);
  ctx.stroke();

  // Right flared petal
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.4);
  ctx.bezierCurveTo(cx + size * 0.4, cy + size * 0.1, cx + size * 0.7, cy - size * 0.15, cx + size * 0.65, cy - size * 0.45);
  ctx.stroke();

  // Delicate stamen dots
  ctx.beginPath();
  ctx.arc(cx - size * 0.15, cy - size * 0.35, 1.5, 0, Math.PI * 2);
  ctx.arc(cx, cy - size * 0.45, 1.5, 0, Math.PI * 2);
  ctx.arc(cx + size * 0.15, cy - size * 0.35, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Master Canvas 2D Photobox Frame Renderer:
 * Renders high-res borders, professional typography, stamps, sprockets, and subtle accents.
 */
export function drawPhotoboxFrame(
  ctx: CanvasRenderingContext2D,
  frame: PhotoboothFrame,
  layout: LayoutConfig,
  canvasW: number,
  canvasH: number,
  options: {
    customCaption?: string;
    showDate?: boolean;
    displayDate?: string;
    borderThickness?: number;
  }
) {
  const { customCaption, showDate = true, displayDate, borderThickness = 12 } = options;
  const isDark = frame.id === "korean-four-cut" || frame.id === "vintage-black" || frame.id === "instagram-story" || frame.id === "contact-sheet";

  ctx.save();

  // 1. Outer Border Line if applicable
  if (borderThickness > 0) {
    ctx.strokeStyle = frame.borderColor;
    ctx.lineWidth = borderThickness;
    ctx.strokeRect(borderThickness / 2, borderThickness / 2, canvasW - borderThickness, canvasH - borderThickness);
  }

  // 2. Specific Accent Styles
  if (frame.accentStyle === "maroon-scrapbook") {
    drawGinghamPatch(ctx, 0, 0, canvasW * 0.19, canvasH * 0.075, "#F7E9D7", "#AD3440", true);
    drawGinghamPatch(ctx, canvasW * 0.77, canvasH * 0.925, canvasW * 0.23, canvasH * 0.075, "#F7E9D7", "#AD3440", true);
    ctx.strokeStyle = "#F3D8C4";
    ctx.lineWidth = 5;
    ctx.setLineDash([10, 8]);
    ctx.strokeRect(15, 15, canvasW - 30, canvasH - 30);
    ctx.setLineDash([]);
    drawScrapbookStar(ctx, canvasW * 0.08, canvasH * 0.30, 22, "#EBCB8A");
    drawScrapbookStar(ctx, canvasW * 0.92, canvasH * 0.72, 18, "#F7E9D7");
    drawTinyTeddy(ctx, canvasW * 0.82, canvasH * 0.965, Math.min(64, canvasW * 0.1));
    drawTape(ctx, canvasW * 0.50, canvasH * 0.02, canvasW * 0.24, 14, "#EAC7B7", -0.035);
  } else if (frame.accentStyle === "denim-diary") {
    ctx.fillStyle = "#263853";
    const edge = canvasW * .08;
    for (let x = 0; x < edge; x += 12) {
      ctx.fillStyle = x % 24 ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.12)";
      ctx.fillRect(x, 0, 5, canvasH);
      ctx.fillRect(canvasW - edge + x, 0, 5, canvasH);
    }
    drawGinghamPatch(ctx, 0, canvasH * 0.91, canvasW * 0.20, canvasH * 0.09, "#F4E7D3", "#AF3941", true);
    drawGinghamPatch(ctx, canvasW * 0.80, 0, canvasW * 0.20, canvasH * 0.085, "#F4E7D3", "#AF3941", true);
    drawScrapbookStar(ctx, canvasW * 0.08, canvasH * 0.44, 25, "#BD4550");
    drawScrapbookStar(ctx, canvasW * 0.92, canvasH * 0.57, 18, "#D6B66F");
    drawTicket(ctx, canvasW * 0.5, canvasH * 0.975, canvasW * 0.42, 34, frame.subtextColor, "MEMORY TICKET · 001");
    drawTape(ctx, canvasW * 0.5, canvasH * 0.02, canvasW * 0.24, 12, "#C6A898", 0.025);
  } else if (frame.accentStyle === "mini-gallery") {
    // Gallery style: fine card edges and restrained interface glyphs.
    ctx.strokeStyle = "#E7ECEB";
    ctx.lineWidth = 3;
    ctx.strokeRect(18, 18, canvasW - 36, canvasH - 36);
    ctx.fillStyle = "#E4A3AE";
    ctx.beginPath(); ctx.arc(34, 38, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = frame.subtextColor;
    ctx.font = "16px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("♥", 30, canvasH - 18);
    ctx.textAlign = "right";
    ctx.fillText("···", canvasW - 24, canvasH - 18);
    ctx.textAlign = "center";
    drawMiniCompanion(ctx, canvasW * 0.90, canvasH * 0.04, Math.min(44, canvasW * 0.07));
  } else if (frame.accentStyle === "coquette-bows") {
    // 4 Tiny elegant vector bows in corners
    const bowSize = 26;
    const margin = borderThickness + 24;
    drawVectorBow(ctx, margin, margin, bowSize, frame.subtextColor);
    drawVectorBow(ctx, canvasW - margin, margin, bowSize, frame.subtextColor);
    drawVectorBow(ctx, margin, canvasH - margin, bowSize, frame.subtextColor);
    drawVectorBow(ctx, canvasW - margin, canvasH - margin, bowSize, frame.subtextColor);
  } else if (frame.accentStyle === "sprockets") {
    // Elegant analog film perforations on edges
    ctx.fillStyle = frame.borderColor;
    const count = Math.floor(canvasH / 54);
    for (let i = 1; i < count; i++) {
      const y = i * 54;
      ctx.fillRect(8, y, 10, 18);
      ctx.fillRect(canvasW - 18, y, 10, 18);
    }
  } else if (frame.accentStyle === "contact-sheet") {
    // Film frame numbers & Kodak Portra stamps
    ctx.font = "bold 13px 'Courier New', monospace";
    ctx.fillStyle = "#E5A93C";
    ctx.textAlign = "left";
    ctx.fillText("▶ 35MM KODAK 400", 28, 28);
    ctx.textAlign = "right";
    ctx.fillText("FRAME #26 ◀", canvasW - 28, 28);
  } else if (frame.accentStyle === "photo-dump") {
    // Delicate washi tape accents on top corners
    ctx.fillStyle = "rgba(229, 215, 218, 0.75)";
    ctx.save();
    ctx.translate(canvasW * 0.15, 14);
    ctx.rotate(-0.06);
    ctx.fillRect(-35, -7, 70, 14);
    ctx.restore();
    ctx.save();
    ctx.translate(canvasW * 0.85, 14);
    ctx.rotate(0.06);
    ctx.fillRect(-35, -7, 70, 14);
    ctx.restore();
  }

  // 3. Header Typography
  ctx.textAlign = "center";
  if (frame.accentStyle === "instagram-ui") {
    // Instagram Story Header
    const headY = 44;
    // Avatar circle
    ctx.fillStyle = "#E1306C";
    ctx.beginPath();
    ctx.arc(42, headY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("G", 42, headY + 4);

    // Username & timestamp
    ctx.textAlign = "left";
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(frame.headerText, 66, headY + 1);
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#8E8E93";
    ctx.fillText("•  Just now", 175, headY + 1);

    // 3 dots
    ctx.textAlign = "right";
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("•••", canvasW - 32, headY + 4);
  } else {
    // Standard Photobox Header
    const headY = Math.max(34, canvasH * (layout.headerSpace * 0.01 * 0.65));
    ctx.font = "600 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillStyle = frame.subtextColor;
    ctx.fillText(frame.headerText.toUpperCase(), canvasW / 2, headY);
  }

  // 4. Footer Typography / Lily Emblem
  const footerY = canvasH - Math.max(28, canvasH * (layout.footerSpace * 0.01 * 0.45));

  if (frame.accentStyle === "lily-signature") {
    // Tiny elegant line-art lily emblem above caption
    drawVectorLilyEmblem(ctx, canvasW / 2, footerY - 24, 22, frame.subtextColor);
  }

  // Caption text (custom or frame preset)
  const activeCaption = customCaption?.trim() || frame.footerText;
  ctx.textAlign = "center";
  ctx.font = "italic 16px Georgia, serif";
  ctx.fillStyle = frame.textColor;
  ctx.fillText(activeCaption, canvasW / 2, footerY);

  // Date stamp
  if (showDate && displayDate) {
    ctx.font = "11px 'Courier New', monospace";
    ctx.letterSpacing = "1px";
    ctx.fillStyle = frame.subtextColor;
    ctx.fillText(displayDate.toUpperCase(), canvasW / 2, footerY + 20);
  }

  ctx.restore();
}

function drawGinghamPatch(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, light: string, red: string, diagonal = false) {
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.fillStyle = light; ctx.fillRect(x, y, w, h);
  const cell = Math.max(10, Math.min(w, h) / 5);
  ctx.fillStyle = red;
  for (let row = 0; row * cell < h + cell; row++) for (let col = 0; col * cell < w + cell; col++) {
    if ((row + col) % 2 === 0) ctx.fillRect(x + col * cell, y + row * cell, cell, cell);
  }
  if (diagonal) { ctx.globalAlpha = .2; ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; for (let d = -h; d < w; d += cell) { ctx.beginPath(); ctx.moveTo(x + d, y); ctx.lineTo(x + d + h, y + h); ctx.stroke(); } }
  ctx.restore();
}

function drawScrapbookStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.14); ctx.fillStyle = color; ctx.strokeStyle = "#FFF7E9"; ctx.lineWidth = 4; ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .48 : r; if (!i) ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); else ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}

function drawTinyTeddy(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save(); ctx.fillStyle = "#D8AA80"; ctx.strokeStyle = "#FFF8EB"; ctx.lineWidth = 3;
  for (const dx of [-.26, .26]) { ctx.beginPath(); ctx.arc(cx + size * dx, cy - size * .37, size * .18, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(cx, cy, size * .34, size * .42, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#5B3028"; ctx.beginPath(); ctx.arc(cx - size * .11, cy - size * .05, 2.5, 0, Math.PI * 2); ctx.arc(cx + size * .11, cy - size * .05, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy + size * .06, size * .06, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}

function drawTape(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number, color: string, angle: number) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle); ctx.globalAlpha = .82; ctx.fillStyle = color; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore();
}

function drawTicket(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number, color: string, text: string) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.025); ctx.fillStyle = "#F5EBDD"; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeStyle = color; ctx.setLineDash([4, 4]); ctx.strokeRect(-w / 2 + 5, -h / 2 + 4, w - 10, h - 8); ctx.setLineDash([]); ctx.fillStyle = "#443A35"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(text, 0, 0); ctx.restore();
}

function drawMiniCompanion(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save(); ctx.fillStyle = "#E7B6A4"; ctx.strokeStyle = "#FFF"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, cy, size * .34, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#D68F99"; ctx.beginPath(); ctx.arc(cx, cy - size * .15, size * .38, Math.PI, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#49343A"; ctx.beginPath(); ctx.arc(cx - size * .12, cy, 2, 0, Math.PI * 2); ctx.arc(cx + size * .12, cy, 2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#E99BA5"; ctx.beginPath(); ctx.arc(cx, cy + size * .1, size * .04, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
