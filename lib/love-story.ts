import type { StaticImageData } from "next/image";

// Individual photographs of Alura — ONLY photographs where Alura is wearing her hijab
import cantikPortrait from "@/image/cantik.jpeg";      // Alura in dusty rose / blush pink hijab (4-frame selfie)
import simanisPortrait from "@/image/simanis.jpeg";    // Alura in navy blue hijab with clear glasses hanging
import mybiniPortrait from "@/image/mybini.jpeg";      // Alura in navy blue hijab with "G" necklace, warm close smile
import masiImutPortrait from "@/image/masi imut.jpeg"; // Alura in soft blush pink hijab (4-frame selfie)
import hiiPortrait from "@/image/hii.jpeg";            // Alura in black hijab with glasses, playful cute poses

// Couple photographs of Rifky and Alura together (prioritizing authentic photobooth & recent moments)
import coupleNightPhoto from "@/image/berdua.jpeg";                              // Close night selfie together
import coupleSweetPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29.jpeg";       // Close sweet selfie together
import coupleWarmPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29 (1).jpeg";   // Smiling warmly together
import couplePlayfulPhoto from "@/image/WhatsApp Image 2026-11-10 at 09.33.29 (2).jpeg"; // Playful close selfie
import coupleCafeTablet1 from "@/image/WhatsApp Image 2026-11-10 at 09.33.27 (1).jpeg";  // Tablet café selfie (playful faces)
import coupleCafeTablet2 from "@/image/WhatsApp Image 2026-11-10 at 09.33.27 (2).jpeg";  // Tablet café selfie angle 2
import coupleCafeTablet3 from "@/image/WhatsApp Image 2026-11-10 at 09.33.27.jpeg";      // Tablet café selfie
import coupleCafeGaze from "@/image/WhatsApp Image 2026-11-10 at 09.33.28.jpeg";         // Rifky & Alura smiling at café table

// Lab Box Photobooth strips (Rifky & Alura with matching bucket hats, gingham border, cute stickers)
import labBoxStripFull from "@/image/WhatsApp Image 2026-11-10 at 09.33.24.jpeg";        // Lab Box print held in hand
import labBoxStripScreen from "@/image/WhatsApp Image 2026-11-10 at 09.33.24 (1).jpeg";   // Lab Box live booth screen
import labBoxStripWide from "@/image/WhatsApp Image 2026-11-10 at 09.33.24 (2).jpeg";     // Lab Box photobooth full view

// Webcam Toy cute couple selfies (Alura in light grey hijab)
import webcam1 from "@/image/webcam-toy-photo1.jpg";
import webcam2 from "@/image/webcam-toy-photo2.jpg";
import webcam3 from "@/image/webcam-toy-photo3.jpg";
import webcam4 from "@/image/webcam-toy-photo4.jpg";

export const recipientName = "Alura";
export const recipientFullName = "Ghiscca Alura Nazua";
export const creatorName = "Rifky";

export const relationshipStartDate = new Date(2026, 8, 6); // 06 September 2026

export const preloaderSteps = [
  "Something special is blooming...",
  "Alura",
  "A little world made just for you.",
];

// Phase 2: Welcome Screen (using Alura's hijab portrait: cantikPortrait)
export const welcomeScreen = {
  greeting: "Hey, Alura.",
  lead: "I made a little world for you.",
  description:
    "A place filled with the little things I love about you, our memories, and everything I still want to keep building with you.",
  buttonText: "Enter my little world",
  featuredPhoto: cantikPortrait,
  photoCaption: "The smile that always brightens my day",
};

// Section 5: Memory Constellation Orbit Items (Strictly couple photos & Alura in hijab)
export type OrbitMemory = {
  id: string;
  image: StaticImageData;
  caption: string;
  alt: string;
  note: string;
  date?: string;
  tapeColor?: string;
};

export const orbitMemories: OrbitMemory[] = [
  {
    id: "orbit-1",
    image: coupleSweetPhoto,
    caption: "right beside you",
    alt: "Alura and Rifky close selfie together",
    note: "My favorite place in the world is right here, with your hand in mine.",
    date: "A special frame",
    tapeColor: "#F4D1D5",
  },
  {
    id: "orbit-2",
    image: cantikPortrait,
    caption: "that gentle radiance",
    alt: "Alura smiling in her blush pink hijab",
    note: "I love the way your eyes crinkle when you're genuinely smiling.",
    date: "Soft afternoon",
    tapeColor: "#E8B5C0",
  },
  {
    id: "orbit-3",
    image: coupleCafeTablet1,
    caption: "little café laughter",
    alt: "Rifky and Alura taking tablet selfies at the café",
    note: "Every little silly face and spontaneous moment with you is a treasure.",
    date: "Café date",
    tapeColor: "#D58C9C",
  },
  {
    id: "orbit-4",
    image: simanisPortrait,
    caption: "the sweetest smile",
    alt: "Warm smiling portrait of Alura in navy hijab",
    note: "The smile that makes every ordinary day feel warm and meaningful.",
    date: "Pure joy",
    tapeColor: "#F4D1D5",
  },
  {
    id: "orbit-5",
    image: coupleWarmPhoto,
    caption: "warmth in every glance",
    alt: "Rifky and Alura smiling softly together",
    note: "Finding peace and happiness in the quiet moments we share.",
    date: "Together",
    tapeColor: "#E8B5C0",
  },
  {
    id: "orbit-6",
    image: mybiniPortrait,
    caption: "simply beautiful",
    alt: "Close portrait of Alura with letter G necklace in navy hijab",
    note: "Completely natural, sweet, and effortlessly glowing.",
    date: "Favorite portrait",
    tapeColor: "#D58C9C",
  },
  {
    id: "orbit-7",
    image: coupleNightPhoto,
    caption: "under the quiet night",
    alt: "Rifky and Alura smiling together at night",
    note: "Sitting close to you, wishing the evening would never end.",
    date: "Night breeze",
    tapeColor: "#F4D1D5",
  },
  {
    id: "orbit-8",
    image: masiImutPortrait,
    caption: "playful innocence",
    alt: "Alura in soft pink hijab smiling cutely",
    note: "Your sweet laughter that always brings warmth into my heart.",
    date: "Sweet smiles",
    tapeColor: "#E8B5C0",
  },
  {
    id: "orbit-9",
    image: couplePlayfulPhoto,
    caption: "laughing together",
    alt: "Rifky and Alura playful close selfie",
    note: "Because life is so much brighter when we're smiling side by side.",
    date: "Happy hours",
    tapeColor: "#F4D1D5",
  },
  {
    id: "orbit-10",
    image: hiiPortrait,
    caption: "cute little quirks",
    alt: "Alura in black hijab with glasses making cute poses",
    note: "All the little quirks and expressions that make you uniquely you.",
    date: "Quirky takes",
    tapeColor: "#D58C9C",
  },
];

// Section: OUR LITTLE TOYBOX — Interactive Photobooth Strips
export type PhotoboothStrip = {
  id: string;
  title: string;
  caption: string;
  sticker: string;
  image: StaticImageData;
  rotation: number;
  ribbonColor: string;
  note: string;
};

export const toyboxPhotoboothStrips: PhotoboothStrip[] = [
  {
    id: "strip-1",
    title: "Lab Box Photobooth",
    caption: "my favorite little moments.",
    sticker: "🎀",
    image: labBoxStripFull,
    rotation: -3,
    ribbonColor: "#F4D1D5",
    note: "The photobooth strip with matching bucket hats, gingham border, and the biggest smiles.",
  },
  {
    id: "strip-2",
    title: "Matching Hats & Hugs",
    caption: "we look cute together, don't we?",
    sticker: "⭐",
    image: labBoxStripScreen,
    rotation: 2.5,
    ribbonColor: "#E8B5C0",
    note: "Looking at the screen while holding our printed strip, laughing at every pose.",
  },
  {
    id: "strip-3",
    title: "Café Table Memories",
    caption: "one strip, so many memories.",
    sticker: "🌷",
    image: coupleCafeTablet2,
    rotation: -1.5,
    ribbonColor: "#D58C9C",
    note: "Sitting across from each other, capturing selfies through the screen on a sunny afternoon.",
  },
  {
    id: "strip-4",
    title: "Endless Smiles",
    caption: "I'd keep these moments forever.",
    sticker: "💫",
    image: coupleCafeGaze,
    rotation: 3.5,
    ribbonColor: "#F4D1D5",
    note: "The quiet look in your eyes that always tells me everything will be okay.",
  },
];

// Section 6: The Little Things I Love About You (Interactive scrapbook favorites)
export type FavoriteThing = {
  id: string;
  name: string;
  category: string;
  iconType: string;
  message: string;
  accentColor: string;
};

export const favoriteThings: FavoriteThing[] = [
  {
    id: "lily",
    name: "Pink Lilies",
    category: "Signature Flower",
    iconType: "lily",
    message: "Somehow, lilies will always remind me of you. Soft, elegant, and completely rare.",
    accentColor: "#F4D1D5",
  },
  {
    id: "butterfly",
    name: "Butterflies",
    category: "Little Wonders",
    iconType: "butterfly",
    message: "I hope you never stop finding happiness in little things, drifting freely and lighthearted.",
    accentColor: "#E8B5C0",
  },
  {
    id: "pink",
    name: "Pink Everything",
    category: "Signature Color",
    iconType: "sparkle",
    message: "Your favorite color that makes everything around you feel soft, warm, and gentle.",
    accentColor: "#D58C9C",
  },
  {
    id: "matcha",
    name: "Matcha Latte",
    category: "Comfort Drink",
    iconType: "cup",
    message: "Remembering how much you love your sweet matcha treat on quiet afternoons.",
    accentColor: "#C7D4B6",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Cozy Coffee",
    iconType: "coffee",
    message: "The warm aroma and cozy conversations that always feel far too short.",
    accentColor: "#D2B48C",
  },
  {
    id: "icecream",
    name: "Ice Cream",
    category: "Sweet Treats",
    iconType: "icecream",
    message: "Sweet, cold, and guaranteed to put an instant happy smile on your face.",
    accentColor: "#FDE2E8",
  },
  {
    id: "bakso",
    name: "Bakso",
    category: "Favorite Food",
    iconType: "bowl",
    message: "How your eyes light up whenever we eat warm, savory bakso together after a long day.",
    accentColor: "#E8C8B5",
  },
  {
    id: "noodles",
    name: "Noodles",
    category: "Late Night Cravings",
    iconType: "noodles",
    message: "All the spontaneous noodle cravings and laughs we share over hot bowls.",
    accentColor: "#F4D1D5",
  },
  {
    id: "dimsum",
    name: "Dimsum",
    category: "Snack Favorite",
    iconType: "dimsum",
    message: "Steaming hot dimsum and how you always pick your favorite ones first with a grin.",
    accentColor: "#E8B5C0",
  },
  {
    id: "brownies",
    name: "Brownies",
    category: "Chocolate Comfort",
    iconType: "cake",
    message: "Rich, chocolatey, and one of your favorite little comfort bites when you need warmth.",
    accentColor: "#8B5A2B",
  },
  {
    id: "cookies",
    name: "Soft Cookies",
    category: "Sweet Bakes",
    iconType: "cookie",
    message: "Chewy, sweet little treats that brighten up ordinary days and make life sweeter.",
    accentColor: "#D58C9C",
  },
];

// Section 7: Nostalgic Scrapbook Moments (Strictly couple photos & Alura in hijab)
export type ScrapbookMoment = {
  id: string;
  image: StaticImageData;
  title: string;
  caption: string;
  date: string;
  tapeRotation: number;
  rotation: number;
  tag: string;
};

export const scrapbookMoments: ScrapbookMoment[] = [
  {
    id: "moment-1",
    image: coupleSweetPhoto,
    title: "Side by Side",
    caption: "The world feels so quiet and safe whenever I'm holding your hand.",
    date: "One frame, both of us",
    tapeRotation: -4,
    rotation: -1.5,
    tag: "US // MEMORY_01",
  },
  {
    id: "moment-2",
    image: cantikPortrait,
    title: "Her Sweet Radiance",
    caption: "Looking back at this, I'm reminded how easy it is to adore everything about you.",
    date: "Blush pink warmth",
    tapeRotation: 3,
    rotation: 2,
    tag: "ALURA // MEMORY_02",
  },
  {
    id: "moment-3",
    image: coupleCafeTablet1,
    title: "Café Afternoon",
    caption: "Spontaneous silly faces in front of the screen that make me smile every time.",
    date: "Café date",
    tapeRotation: -2,
    rotation: -2.5,
    tag: "SMILES // MEMORY_03",
  },
  {
    id: "moment-4",
    image: mybiniPortrait,
    title: "A Favorite View",
    caption: "I could look at this picture a hundred times and still stop to admire you.",
    date: "My favorite view",
    tapeRotation: 5,
    rotation: 1.8,
    tag: "CHERISHED // MEMORY_04",
  },
  {
    id: "moment-5",
    image: coupleWarmPhoto,
    title: "Finding Our Way Forward",
    caption: "Growing alongside you, learning to understand and love each other better every day.",
    date: "Together",
    tapeRotation: -3,
    rotation: -1,
    tag: "JOURNEY // MEMORY_05",
  },
  {
    id: "moment-6",
    image: masiImutPortrait,
    title: "Pure Joy",
    caption: "Your warmth is like a quiet shelter on days that feel overwhelming.",
    date: "Quiet joy",
    tapeRotation: 4,
    rotation: 2.2,
    tag: "WARMTH // MEMORY_06",
  },
];

// Film Strip Webcam Snaps for authentic scrapbook collage (Alura in light grey hijab)
export const filmstripSnaps = [webcam1, webcam2, webcam3, webcam4];

// Section 9: A Little Promise
export const littlePromises = [
  "I know love is not about being perfect.",
  "I want to keep learning how to love you better.",
  "I want to make more little memories with you.",
  "I want to be someone you can feel safe and happy with.",
  "Not just for the beautiful days, but for the ordinary ones too.",
];

// Section 10: Foundation Letter
export const foundationLetter = [
  "Dear Alura,",
  "I just want you to know how happy I am that we are finding our way forward together.",
  "I know I haven't always been perfect. There are things I wish I had done differently, and I still have so much to learn.",
  "But I want to keep trying.",
  "I want more ordinary mornings, random conversations, little adventures, silly laughter, and all the small things that make being with you special.",
  "I don't want to take those moments for granted.",
  "I want to love you better, listen more, understand you more, and keep growing alongside you.",
  "Thank you for being you, Alura.",
  "And if I could choose again, I'd still choose you.",
  "Here's to more memories, more laughter, and more pages of our story.",
  "With all my love,",
  "Rifky",
];

// Envelope Polaroid Photo (tucked inside letter)
export const letterEnvelopePhoto = coupleSweetPhoto;

// Section 11: Final Scene
export const finalScene = {
  lines: [
    "There's still so much life to experience.",
    "More little moments to collect.",
    "More reasons to smile.",
    "And so many pages left to write.",
  ],
  dedication: "For you, Alura.",
  signature: "With love, Rifky.",
  photo: coupleWarmPhoto,
};
