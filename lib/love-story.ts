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
import smilingPortrait from "@/image/Nazua.jpeg";

export const recipientName = "Alura";
export const creatorName = "Rifky";

export const memories = [
  {
    chapter: "01",
    title: "A little moment",
    date: "A little piece of us",
    description:
      "I keep this one close. Some pictures say enough without needing a long story.",
    image: ghisccaPortrait,
    imageAlt: "A favorite portrait of Alura",
  },
  {
    chapter: "02",
    title: "One of my favorites",
    date: "A little piece of us",
    description:
      "I like having this little piece of our world to come back to.",
    image: blondePortrait,
    imageAlt: "A playful photo strip of Alura",
  },
  {
    chapter: "03",
    title: "Right here",
    date: "One frame, both of us",
    description:
      "A photo I keep close because you're right there beside me.",
    image: couplePhoto,
    imageAlt: "A close-up photo of Alura and Rifky together",
  },
  {
    chapter: "04",
    title: "Just you",
    date: "Always worth another look",
    description:
      "I could look at this one a hundred times and still stop to look again.",
    image: closePortrait,
    imageAlt: "A candid portrait of Alura",
  },
];

export const memoriesGallery: { image: StaticImageData; caption: string; size: "portrait" | "landscape" }[] = [
  { image: couplePhoto, caption: "A little piece of our world", size: "portrait" },
  { image: ghisccaPortrait, caption: "The light felt like this", size: "landscape" },
  { image: smilePortrait, caption: "One for the memory book", size: "portrait" },
  { image: blackAndWhitePhoto, caption: "A little photo-booth memory", size: "landscape" },
];

export const memoriesOrbit = [
  { image: couplePhoto, caption: "right here, next to you", alt: "A close selfie of Alura and Rifky together" },
  { image: ghisccaPortrait, caption: "that smile of yours", alt: "A close portrait of Alura smiling" },
  { image: sittingPortrait, caption: "a quiet little moment", alt: "A close photo of Alura at a table" },
  { image: favoritePortrait, caption: "one I keep coming back to", alt: "A favorite portrait of Alura" },
  { image: closePortrait, caption: "you, being you", alt: "A warm, close portrait of Alura" },
  { image: blondePortrait, caption: "a few little versions of you", alt: "A playful photo strip of Alura" },
  { image: smilingPortrait, caption: "one more for the album", alt: "A smiling portrait of Alura" },
  { image: candidPortrait, caption: "a little candid", alt: "A candid portrait of Alura" },
];

export const reasons = [
  "The way you talk.",
  "The little things you do.",
  "The way you make ordinary moments feel special.",
  "The way you are simply... you.",
];

export const relationshipStartDate = new Date(2026, 8, 6);
export const relationshipDateLabel = [
  String(relationshipStartDate.getDate()).padStart(2, "0"),
  String(relationshipStartDate.getMonth() + 1).padStart(2, "0"),
  String(relationshipStartDate.getFullYear()).slice(-2),
].join(".");

export const honestMessage: { text: string; kind?: "pause" | "signature" }[] = [
  { text: "I'm sorry I haven't always been the best boyfriend." },
  { text: "I know I still have a lot to learn." },
  { text: "But I want you to know that I'm trying." },
  { text: "I want to be better." },
  { text: "Not just for a moment," },
  { text: "but for you." },
  { text: "I may not be the best yet,", kind: "pause" },
  { text: "but I want to be." },
  { text: "for you, Lura.", kind: "signature" },
];

export const ifWeWere = [
  {
    label: "a place",
    answer: "Somewhere by the sea, at golden hour — where we could stay a little longer.",
    color: "#291523",
  },
  {
    label: "a season",
    answer: "Early autumn. Soft light, slow afternoons, and your hand in mine.",
    color: "#321522",
  },
  {
    label: "a song",
    answer: "Dinda, of course. A little melody that somehow sounds like you.",
    color: "#241322",
  },
  {
    label: "a memory",
    answer: "One of those ordinary days that became my favorite just because you were there.",
    color: "#351722",
  },
  {
    label: "a color",
    answer: "The warm blush of the sky just before the sun goes down.",
    color: "#2c1423",
  },
];

export const personalLetter = [
  `Dear ${recipientName},`,
  "I'm sorry I haven't always been the boyfriend you deserve.",
  "Sometimes I still don't know what I'm doing.",
  "But I'm learning.",
  "And I want to keep learning, with you.",
  "I can't promise I'll always get everything right.",
  "But I can promise that I'll keep trying to be better.",
  "For you.",
  `for you, ${recipientName === "Alura" ? "Lura" : recipientName}.`,
];
