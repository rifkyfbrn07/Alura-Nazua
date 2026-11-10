import type { StaticImageData } from "next/image";
import ghisccaPortrait from "@/image/Ghiscca.jpeg";
import blondePortrait from "@/image/blonde.jpeg";
import couplePhoto from "@/image/berdua.jpeg";
import smilePortrait from "@/image/simanis.jpeg";
import blackAndWhitePhoto from "@/image/B&W.jpeg";
import closePortrait from "@/image/mybini.jpeg";
import candidPortrait from "@/image/cantik.jpeg";
import favoritePortrait from "@/image/Lura.jpeg";
import sittingPortrait from "@/image/mbg.jpeg";
import gentlePortrait from "@/image/mbgg.jpeg";
import smilingPortrait from "@/image/Nazua.jpeg";
import sleepcallPhoto from "@/image/slipkol.jpeg";
import cutePortrait from "@/image/masi imut.jpeg";
import greetingPortrait from "@/image/hii.jpeg";
import recentMemory from "@/image/WhatsApp Image 2026-10-12 at 09.27.07.jpeg";
import candidLook from "@/image/lurah.jpeg";
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

export const welcomeScreen = {
  greeting: "Hey, Alura.",
  lead: "I made a little world for you.",
  description:
    "A place filled with the little things I love about you, our memories, and everything I still want to keep building with you.",
  buttonText: "Enter my little world",
  featuredPhoto: ghisccaPortrait,
  photoCaption: "The smile that always brightens my day",
};

// Memory Constellation Orbit Items (preserves the 3D orbit concept with enhanced Polaroid visuals)
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
    image: couplePhoto,
    caption: "right beside you",
    alt: "Alura and Rifky together",
    note: "My favorite place in the world is right here, with your hand in mine.",
    date: "A special frame",
    tapeColor: "#F4D1D5",
  },
  {
    id: "orbit-2",
    image: ghisccaPortrait,
    caption: "that gentle light",
    alt: "Soft smiling portrait of Alura",
    note: "I love the way your eyes crinkle when you're genuinely smiling.",
    date: "Just you",
    tapeColor: "#E8B5C0",
  },
  {
    id: "orbit-3",
    image: blondePortrait,
    caption: "silly photo strips",
    alt: "Playful photo strip of Alura",
    note: "Every little version of you, laughter and goofy poses included.",
    date: "Photo booth day",
    tapeColor: "#D58C9C",
  },
  {
    id: "orbit-4",
    image: smilePortrait,
    caption: "the sweetest smile",
    alt: "Warm smiling portrait of Alura",
    note: "The smile that makes every ordinary day feel warm and meaningful.",
    date: "Pure joy",
    tapeColor: "#F4D1D5",
  },
  {
    id: "orbit-5",
    image: candidPortrait,
    caption: "simply beautiful",
    alt: "Candid portrait of Alura",
    note: "Completely natural, unposed, and effortlessly glowing.",
    date: "Candid afternoon",
    tapeColor: "#E8B5C0",
  },
  {
    id: "orbit-6",
    image: blackAndWhitePhoto,
    caption: "frozen in time",
    alt: "Black and white memory of Alura",
    note: "Proof that warmth and love never lose their color.",
    date: "Timeless moment",
    tapeColor: "#D58C9C",
  },
  {
    id: "orbit-7",
    image: sittingPortrait,
    caption: "a quiet afternoon",
    alt: "Alura at a quiet table",
    note: "Sitting across from you, wishing the afternoon would never end.",
    date: "Cozy café",
    tapeColor: "#F4D1D5",
  },
  {
    id: "orbit-8",
    image: sleepcallPhoto,
    caption: "in between the hours",
    alt: "Sleepcall night moment",
    note: "Whispering through the screen until sleep gently took over.",
    date: "Late night whispers",
    tapeColor: "#E8B5C0",
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

// Section 7: Nostalgic Scrapbook Moments
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
    image: couplePhoto,
    title: "Side by Side",
    caption: "The world feels so quiet and safe whenever I'm holding your hand.",
    date: "One frame, both of us",
    tapeRotation: -4,
    rotation: -1.5,
    tag: "US // MEMORY_01",
  },
  {
    id: "moment-2",
    image: candidPortrait,
    title: "Completely You",
    caption: "Looking back at this, I'm reminded how easy it is to adore everything about you.",
    date: "Candid sunshine",
    tapeRotation: 3,
    rotation: 2,
    tag: "ALURA // MEMORY_02",
  },
  {
    id: "moment-3",
    image: blondePortrait,
    title: "Laughter in Four Takes",
    caption: "The spontaneous goofy faces in the photo booth that make me laugh every time.",
    date: "Photo booth day",
    tapeRotation: -2,
    rotation: -2.5,
    tag: "SMILES // MEMORY_03",
  },
  {
    id: "moment-4",
    image: favoritePortrait,
    title: "A Favorite View",
    caption: "I could look at this picture a hundred times and still stop to admire you.",
    date: "My favorite view",
    tapeRotation: 5,
    rotation: 1.8,
    tag: "CHERISHED // MEMORY_04",
  },
  {
    id: "moment-5",
    image: recentMemory,
    title: "Our Story Continues",
    caption: "Growing alongside you, learning to understand and love each other better every day.",
    date: "October days",
    tapeRotation: -3,
    rotation: -1,
    tag: "JOURNEY // MEMORY_05",
  },
  {
    id: "moment-6",
    image: smilePortrait,
    title: "Sweet Light",
    caption: "Your warmth is like a quiet shelter on days that feel overwhelming.",
    date: "Quiet joy",
    tapeRotation: 4,
    rotation: 2.2,
    tag: "WARMTH // MEMORY_06",
  },
];

// Film Strip Webcam Snaps for authentic scrapbook collage
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
  photo: couplePhoto,
};
