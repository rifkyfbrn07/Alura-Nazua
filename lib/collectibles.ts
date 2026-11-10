// Alura's Little Collection - Progress & Collectible Manager
// Stored locally in localStorage so progress persists without accounts or backend.

export type CollectibleBadge = {
  id: string;
  name: string;
  description: string;
  sticker: string;
  color: string;
};

export const ALL_BADGES: CollectibleBadge[] = [
  {
    id: "claw",
    name: "Lucky Claw Master",
    description: "Won a cute plushie from the little pastel claw machine.",
    sticker: "🎀",
    color: "#F4D1D5",
  },
  {
    id: "garden",
    name: "Lily Gardener",
    description: "Watered and bloomed sweet pink lilies in Alura's garden.",
    sticker: "🌷",
    color: "#E8B5C0",
  },
  {
    id: "butterflies",
    name: "Butterfly Whisperer",
    description: "Caught fluttering pastel butterflies in the meadow.",
    sticker: "🦋",
    color: "#D58C9C",
  },
  {
    id: "mysteryBox",
    name: "Gift Opener",
    description: "Unwrapped the hidden pastel surprise gift boxes.",
    sticker: "🎁",
    color: "#FCE8E8",
  },
  {
    id: "secretNotes",
    name: "Secret Keeper",
    description: "Discovered heartfelt thoughts on the Secret Message Wall.",
    sticker: "💌",
    color: "#FFF0F2",
  },
  {
    id: "quiz",
    name: "Memory Scholar",
    description: "Remembered the sweet little details of our journey together.",
    sticker: "💗",
    color: "#F4D1D5",
  },
  {
    id: "scrapbook",
    name: "Scrapbook Artist",
    description: "Designed a personal keepsake page in the memory scrapbook.",
    sticker: "📸",
    color: "#E8B5C0",
  },
  {
    id: "wishingWell",
    name: "Star Dreamer",
    description: "Dropped a glowing star into the wishing well with a warm hope.",
    sticker: "✨",
    color: "#FCE8E8",
  },
  {
    id: "hiddenLilies",
    name: "Lily Seeker",
    description: "Found all 5 hidden lilies tucked away across the world.",
    sticker: "🌸",
    color: "#D58C9C",
  },
];

const STORAGE_KEY = "alura_little_collectibles";

export function getUnlockedBadges(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isBadgeUnlocked(id: string): boolean {
  return getUnlockedBadges().includes(id);
}

export function unlockBadge(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getUnlockedBadges();
    if (current.includes(id)) return false;
    const updated = [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch event so all components react immediately
    window.dispatchEvent(
      new CustomEvent("alura_badge_unlocked", {
        detail: { id, badge: ALL_BADGES.find((b) => b.id === id) },
      })
    );
    return true;
  } catch {
    return false;
  }
}

