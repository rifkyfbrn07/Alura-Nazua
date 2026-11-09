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

export const recipientName = "Alura";
export const recipientFullName = "Ghiscca Alura Nazua";
export const creatorName = "Rifky";

export const preloaderMessages = [
  "Preparing something special...",
  "Just for you, Alura.",
  "Made with all my heart.",
];

export const firstGreeting = {
  greeting: "Hey, Alura.",
  lead: "I made a little world for you.",
  sublead: "Because some people remain special, no matter how much time passes.",
  buttonLabel: "Enter my little world",
};

export type MemoryItem = {
  id: string;
  image: StaticImageData;
  title: string;
  note: string;
  caption: string;
  alt: string;
  tag?: string;
};

export const memories: MemoryItem[] = [
  {
    id: "berdua",
    image: couplePhoto,
    title: "Right Beside You",
    note: "Some memories never really leave.",
    caption: "A frame I keep close because you were right there beside me.",
    alt: "A close photo of Alura and Rifky together",
    tag: "MEM_01 // TOGETHER",
  },
  {
    id: "ghiscca",
    image: ghisccaPortrait,
    title: "That Gentle Light",
    note: "I don't think I ever told you enough how beautiful you are to me.",
    caption: "The quiet warmth in your eyes that always made everything feel alright.",
    alt: "A cherished portrait of Alura smiling",
    tag: "MEM_02 // PORTRAIT",
  },
  {
    id: "blonde",
    image: blondePortrait,
    title: "Little Versions of Your Joy",
    note: "The silly photo strips and genuine laughter.",
    caption: "You had a way of turning an ordinary afternoon into something unforgettable.",
    alt: "Playful photo strip of Alura",
    tag: "MEM_03 // MOMENTS",
  },
  {
    id: "simanis",
    image: smilePortrait,
    title: "The Sweetest Smile",
    note: "If I could choose again, I'd still want to know you.",
    caption: "A smile that could instantly brighten even the heaviest days.",
    alt: "Alura smiling warmly",
    tag: "MEM_04 // SMILE",
  },
  {
    id: "cantik",
    image: candidPortrait,
    title: "Simply You",
    note: "I wish I could have given you more beautiful moments.",
    caption: "Completely natural, unposed, and effortlessly radiant.",
    alt: "A candid portrait of Alura",
    tag: "MEM_05 // CANDID",
  },
  {
    id: "bw",
    image: blackAndWhitePhoto,
    title: "Frozen in Time",
    note: "Black and white, but the warmth from that day has never faded.",
    caption: "Proof that some moments don't lose their color, even when time moves forward.",
    alt: "Black and white photo booth memory",
    tag: "MEM_06 // BOOTH",
  },
  {
    id: "slipkol",
    image: sleepcallPhoto,
    title: "Late Night Whispers",
    note: "Quiet nights when time seemed to pause for us.",
    caption: "Falling asleep with the phone still connected, feeling close across the distance.",
    alt: "A quiet late-night moment",
    tag: "MEM_07 // NIGHTS",
  },
  {
    id: "lura",
    image: favoritePortrait,
    title: "Always Cherished",
    note: "Even now, I still find myself wishing we had more tomorrows.",
    caption: "A picture I find myself looking back at, remembering the person I love.",
    alt: "Portrait of Alura",
    tag: "MEM_08 // CHERISHED",
  },
  {
    id: "recent",
    image: recentMemory,
    title: "In My Heart",
    note: "You will always have a special place in my heart.",
    caption: "No matter how circumstances change, my care for you remains genuine.",
    alt: "A recent photograph of Alura",
    tag: "MEM_09 // TIMELESS",
  },
];

export const orbitMemories = [
  { image: couplePhoto, caption: "right beside you", alt: "Alura and Rifky together", quote: "Some memories never really leave." },
  { image: ghisccaPortrait, caption: "that gentle light", alt: "Alura smiling softly", quote: "I don't think I ever told you enough how beautiful you are to me." },
  { image: blondePortrait, caption: "your silly joy", alt: "Photo strip of Alura", quote: "If I could choose again, I'd still want to know you." },
  { image: smilePortrait, caption: "the sweetest smile", alt: "Warm smile of Alura", quote: "You will always have a special place in my heart." },
  { image: candidPortrait, caption: "effortlessly beautiful", alt: "Candid portrait of Alura", quote: "I wish I could have given you more beautiful moments." },
  { image: blackAndWhitePhoto, caption: "frozen in time", alt: "Black and white memory", quote: "Even now, I still find myself wishing we had more tomorrows." },
  { image: sittingPortrait, caption: "a quiet afternoon", alt: "Alura sitting at a table", quote: "You're still someone very special to me." },
  { image: sleepcallPhoto, caption: "in between the hours", alt: "Sleepcall memory", quote: "Some memories never fade." },
];

export const personalQuotes = [
  "You're still someone very special to me.",
  "I don't think I ever told you enough how beautiful you are to me.",
  "Some memories never really leave.",
  "If I could choose again, I'd still want to know you.",
  "I wish I could have given you more beautiful moments.",
  "Even now, I still find myself wishing we had more tomorrows.",
  "You will always have a special place in my heart.",
];

export const foundationLetter = [
  "Dear Alura,",
  "I don't really know how to put all of this into words.",
  "I just know that you mean so much to me.",
  "I'm sorry for the moments when I wasn't the person you needed me to be. I know I wasn't perfect, and there are things I wish I could have done differently.",
  "I once imagined having so many more tomorrows with you. I wanted to keep making memories, laughing together, and experiencing all the little things life had waiting for us.",
  "Even though things are different now, I still care about you. I still love you more than I can properly explain.",
  "A part of me still wishes we could have stayed together longer. I wish I could have loved you better and given you more reasons to smile.",
  "I don't know what the future holds, and I don't want to ask anything from you through these words.",
  "I just want you to know that what we shared mattered to me.",
  "Thank you for being part of my story, Alura.",
  "You will always be someone I hold dear.",
  "With love,",
  "Rifky",
];

export const hiddenParticleMessage =
  "Wherever life leads you, Alura, I will always be quietly rooting for your happiness.";

export const endingLines = [
  "Thank you for being part of my life.",
  "I wish we could have had more tomorrows.",
  "Whatever happens, I hope life is gentle with you.",
];

export const endingSignature = {
  for: "For Alura.",
  from: "With love, Rifky.",
  photo: couplePhoto,
  alt: "Alura and Rifky together, cherished forever",
};
