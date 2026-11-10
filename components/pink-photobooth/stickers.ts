// Instagram Story Style Stickers & Text Overlays for Alura's Pink Photobooth Studio

import { StickerItem, TextOverlayItem, StickerType } from "./types";

export type StickerPreset = {
  id: string;
  type: StickerType;
  label: string;
  previewIcon: string;
  defaultColor: string;
};

export const STICKER_PRESETS: StickerPreset[] = [
  { id: "st-heart-pink", type: "heart", label: "Heart Pink", previewIcon: "🤍", defaultColor: "#F4D1D5" },
  { id: "st-heart-rose", type: "heart", label: "Heart Rose", previewIcon: "💗", defaultColor: "#E8B5C0" },
  { id: "st-sparkle", type: "sparkle", label: "Sparkle", previewIcon: "✨", defaultColor: "#FDE68A" },
  { id: "st-star", type: "star", label: "Star", previewIcon: "⭐", defaultColor: "#FEF08A" },
  { id: "st-bow", type: "bow", label: "Tiny Bow", previewIcon: "🎀", defaultColor: "#D58C9C" },
  { id: "st-special", type: "label", label: "SPECIAL MEMORY", previewIcon: "🏷️", defaultColor: "#702C43" },
  { id: "st-lily", type: "label", label: "LILY WORLD", previewIcon: "🌷", defaultColor: "#A94F65" },
  { id: "st-cutest", type: "label", label: "CUTEST SMILE", previewIcon: "💫", defaultColor: "#702C43" },
  { id: "st-xoxo", type: "label", label: "XOXO", previewIcon: "💌", defaultColor: "#9F1239" },
  { id: "st-date", type: "datestamp", label: "DATE STAMP", previewIcon: "📅", defaultColor: "#D97706" },
];

export const TEXT_FONTS = [
  { id: "serif", name: "Serif (Editorial)", className: "font-serif italic" },
  { id: "sans", name: "Sans (Modern)", className: "font-sans font-medium" },
  { id: "script", name: "Script (Cursive)", className: "font-serif italic font-light" },
  { id: "mono", name: "Mono (Typewriter)", className: "font-mono font-bold" },
] as const;

export const TEXT_COLORS = [
  { id: "white", hex: "#FFFFFF", name: "White" },
  { id: "pink", hex: "#F4D1D5", name: "Soft Pink" },
  { id: "rose", hex: "#D58C9C", name: "Rose" },
  { id: "burgundy", hex: "#702C43", name: "Burgundy" },
  { id: "black", hex: "#18181B", name: "Deep Black" },
  { id: "gold", hex: "#E5A93C", name: "Warm Gold" },
];

/**
 * Draws custom stickers and text overlays onto the final export Canvas 2D
 */
export function drawStickersAndTextToCanvas(
  ctx: CanvasRenderingContext2D,
  stickers: StickerItem[],
  texts: TextOverlayItem[],
  canvasW: number,
  canvasH: number
) {
  // 1. Draw Stickers
  for (const st of stickers) {
    ctx.save();
    const cx = (st.x / 100) * canvasW;
    const cy = (st.y / 100) * canvasH;

    ctx.translate(cx, cy);
    ctx.rotate((st.rotation * Math.PI) / 180);
    ctx.scale(st.scale, st.scale);

    if (st.type === "heart") {
      ctx.fillStyle = st.color;
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(-14, -12, -22, 6, 0, 20);
      ctx.bezierCurveTo(22, 6, 14, -12, 0, 4);
      ctx.fill();
    } else if (st.type === "sparkle") {
      ctx.fillStyle = st.color;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.quadraticCurveTo(2, -2, 18, 0);
      ctx.quadraticCurveTo(2, 2, 0, 18);
      ctx.quadraticCurveTo(-2, 2, -18, 0);
      ctx.quadraticCurveTo(-2, -2, 0, -18);
      ctx.fill();
    } else if (st.type === "star") {
      ctx.fillStyle = st.color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outer = 14;
        const inner = 6;
        const a1 = (i * 72 - 90) * (Math.PI / 180);
        const a2 = (i * 72 + 36 - 90) * (Math.PI / 180);
        if (i === 0) ctx.moveTo(Math.cos(a1) * outer, Math.sin(a1) * outer);
        else ctx.lineTo(Math.cos(a1) * outer, Math.sin(a1) * outer);
        ctx.lineTo(Math.cos(a2) * inner, Math.sin(a2) * inner);
      }
      ctx.closePath();
      ctx.fill();
    } else if (st.type === "bow") {
      // Tiny vector bow
      ctx.strokeStyle = st.color;
      ctx.fillStyle = st.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.bezierCurveTo(-12, -8, -16, 4, -2, 2);
      ctx.moveTo(2, 0);
      ctx.bezierCurveTo(12, -8, 16, 4, 2, 2);
      ctx.stroke();
    } else if (st.type === "label" || st.type === "datestamp") {
      // Rounded pill badge with text
      ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
      const metrics = ctx.measureText(st.label);
      const pw = metrics.width + 18;
      const ph = 24;

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.strokeStyle = st.color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = st.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(st.label, 0, 1);
    }

    ctx.restore();
  }

  // 2. Draw Texts
  for (const txt of texts) {
    if (!txt.text.trim()) continue;
    ctx.save();
    const cx = (txt.x / 100) * canvasW;
    const cy = (txt.y / 100) * canvasH;

    const fontStyle =
      txt.font === "serif"
        ? "italic"
        : txt.font === "script"
        ? "italic 300"
        : txt.font === "mono"
        ? "bold"
        : "600";
    const fontFamily =
      txt.font === "serif"
        ? "Georgia, serif"
        : txt.font === "script"
        ? "Snell Roundhand, 'Brush Script MT', cursive"
        : txt.font === "mono"
        ? "'Courier New', monospace"
        : "-apple-system, BlinkMacSystemFont, sans-serif";

    ctx.font = `${fontStyle} ${txt.size}px ${fontFamily}`;
    ctx.fillStyle = txt.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Soft drop shadow for legibility
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;

    ctx.fillText(txt.text, cx, cy);
    ctx.restore();
  }
}

