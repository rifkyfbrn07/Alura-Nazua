// Layout configurations and coordinate calculations for Alura's Pink Photobooth Studio

import { LayoutType } from "./types";

export type LayoutSlot = {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  w: number; // percentage (0 - 100)
  h: number; // percentage (0 - 100)
};

export type LayoutConfig = {
  id: LayoutType;
  name: string;
  label: string;
  tagline: string;
  requiredPhotos: number;
  aspectRatio: string; // CSS aspect ratio string e.g. "1 / 3.2"
  canvasWidth: number;
  canvasHeight: number;
  slots: LayoutSlot[];
  headerSpace: number; // percentage
  footerSpace: number; // percentage
};

export const PHOTOBOOTH_LAYOUTS: Record<LayoutType, LayoutConfig> = {
  // 1. Classic Korean 4-Cut Strip
  strip4: {
    id: "strip4",
    name: "Korean Four Cut",
    label: "4-Cut Strip",
    tagline: "Classic vertical photobox strip",
    requiredPhotos: 4,
    aspectRatio: "1 / 3.1",
    canvasWidth: 800,
    canvasHeight: 2480,
    headerSpace: 5,
    footerSpace: 9,
    slots: [
      { x: 8, y: 5.5, w: 84, h: 20 },
      { x: 8, y: 27, w: 84, h: 20 },
      { x: 8, y: 48.5, w: 84, h: 20 },
      { x: 8, y: 70, w: 84, h: 20 },
    ],
  },

  // 2. 3-Photo Vertical Strip
  strip3: {
    id: "strip3",
    name: "Trio Strip",
    label: "3-Cut Strip",
    tagline: "Elegant vertical 3-photo strip",
    requiredPhotos: 3,
    aspectRatio: "1 / 2.4",
    canvasWidth: 800,
    canvasHeight: 1920,
    headerSpace: 6,
    footerSpace: 10,
    slots: [
      { x: 8, y: 6.5, w: 84, h: 25.5 },
      { x: 8, y: 34, w: 84, h: 25.5 },
      { x: 8, y: 61.5, w: 84, h: 25.5 },
    ],
  },

  // 3. Single Portrait (4:5)
  single: {
    id: "single",
    name: "Solo Portrait",
    label: "Single 4:5",
    tagline: "Classic studio solo portrait",
    requiredPhotos: 1,
    aspectRatio: "4 / 5",
    canvasWidth: 1080,
    canvasHeight: 1350,
    headerSpace: 6,
    footerSpace: 12,
    slots: [{ x: 8, y: 7, w: 84, h: 79 }],
  },

  // 4. Square Photo (1:1)
  square: {
    id: "square",
    name: "Square Photo",
    label: "Square 1:1",
    tagline: "Minimalist square format",
    requiredPhotos: 1,
    aspectRatio: "1 / 1.15",
    canvasWidth: 1200,
    canvasHeight: 1380,
    headerSpace: 5,
    footerSpace: 13,
    slots: [{ x: 7, y: 6, w: 86, h: 79 }],
  },

  // 5. 2-Photo Duo Stack
  col2: {
    id: "col2",
    name: "Two-Cut Duo",
    label: "2-Cut Duo",
    tagline: "Vertical duo frame",
    requiredPhotos: 2,
    aspectRatio: "1 / 1.7",
    canvasWidth: 800,
    canvasHeight: 1360,
    headerSpace: 6,
    footerSpace: 12,
    slots: [
      { x: 8, y: 7, w: 84, h: 38 },
      { x: 8, y: 48, w: 84, h: 38 },
    ],
  },

  // 6. 2x2 Photo Grid
  grid2x2: {
    id: "grid2x2",
    name: "2×2 Photobox Grid",
    label: "2×2 Grid",
    tagline: "Haru Film modern 4-photo square grid",
    requiredPhotos: 4,
    aspectRatio: "1 / 1.25",
    canvasWidth: 1400,
    canvasHeight: 1750,
    headerSpace: 5,
    footerSpace: 10,
    slots: [
      { x: 6, y: 6, w: 42, h: 40 },
      { x: 52, y: 6, w: 42, h: 40 },
      { x: 6, y: 48.5, w: 42, h: 40 },
      { x: 52, y: 48.5, w: 42, h: 40 },
    ],
  },

  // 7. 3-Photo Editorial Collage
  collage3: {
    id: "collage3",
    name: "Editorial Trio",
    label: "3 Collage",
    tagline: "1 Hero photo + 2 stacked shots",
    requiredPhotos: 3,
    aspectRatio: "4 / 5",
    canvasWidth: 1200,
    canvasHeight: 1500,
    headerSpace: 6,
    footerSpace: 10,
    slots: [
      { x: 6, y: 7, w: 48, h: 81 },
      { x: 57, y: 7, w: 37, h: 39 },
      { x: 57, y: 49, w: 37, h: 39 },
    ],
  },

  // 8. 4-Photo Collage
  collage4: {
    id: "collage4",
    name: "Editorial Quad",
    label: "4 Collage",
    tagline: "Magazine editorial layout",
    requiredPhotos: 4,
    aspectRatio: "4 / 5",
    canvasWidth: 1200,
    canvasHeight: 1500,
    headerSpace: 6,
    footerSpace: 10,
    slots: [
      { x: 6, y: 7, w: 52, h: 52 },
      { x: 61, y: 7, w: 33, h: 38 },
      { x: 61, y: 48, w: 33, h: 40 },
      { x: 6, y: 62, w: 52, h: 26 },
    ],
  },

  // 9. Horizontal 4-Cut Strip
  stripHorizontal: {
    id: "stripHorizontal",
    name: "Horizontal 4-Cut",
    label: "Horizontal Strip",
    tagline: "Cinematic horizontal photo strip",
    requiredPhotos: 4,
    aspectRatio: "3.2 / 1",
    canvasWidth: 2560,
    canvasHeight: 800,
    headerSpace: 3,
    footerSpace: 4,
    slots: [
      { x: 3, y: 10, w: 22, h: 78 },
      { x: 27.5, y: 10, w: 22, h: 78 },
      { x: 52, y: 10, w: 22, h: 78 },
      { x: 76.5, y: 10, w: 22, h: 78 },
    ],
  },

  // 10. Instagram Story Layout (9:16)
  story: {
    id: "story",
    name: "Instagram Story",
    label: "Story 9:16",
    tagline: "Clean Instagram Story composition",
    requiredPhotos: 3,
    aspectRatio: "9 / 16",
    canvasWidth: 1080,
    canvasHeight: 1920,
    headerSpace: 9,
    footerSpace: 11,
    slots: [
      { x: 9, y: 11, w: 82, h: 24 },
      { x: 9, y: 37, w: 82, h: 24 },
      { x: 9, y: 63, w: 82, h: 24 },
    ],
  },

  // 11. Asymmetric Photo Dump
  photodump: {
    id: "photodump",
    name: "Photo Dump",
    label: "Photo Dump",
    tagline: "Scrapbook photo dump with tape accents",
    requiredPhotos: 4,
    aspectRatio: "4 / 5",
    canvasWidth: 1200,
    canvasHeight: 1500,
    headerSpace: 6,
    footerSpace: 10,
    slots: [
      { x: 6, y: 7, w: 42, h: 38 },
      { x: 52, y: 7, w: 42, h: 38 },
      { x: 6, y: 48, w: 42, h: 39 },
      { x: 52, y: 48, w: 42, h: 39 },
    ],
  },
};

export const LAYOUT_LIST = Object.values(PHOTOBOOTH_LAYOUTS);

