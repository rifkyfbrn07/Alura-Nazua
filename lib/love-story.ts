import type { StaticImageData } from "next/image";
import ghisccaPortrait from "@/image/Ghiscca.jpeg";
import blondePortrait from "@/image/blonde.jpeg";
import couplePhoto from "@/image/Nazua.jpeg";
import smilePortrait from "@/image/slipkol.jpeg";
import blackAndWhitePhoto from "@/image/B&W.jpeg";
import closePortrait from "@/image/mybini.jpeg";

export const memories = [
  {
    chapter: "01",
    title: "The beginning",
    date: "A little moment, a big beginning",
    description:
      "Some stories begin quietly. Ours became one of my favorite things without me even noticing.",
    image: ghisccaPortrait,
    imageAlt: "A favorite portrait of Ghiscca",
  },
  {
    chapter: "02",
    title: "The first conversation",
    date: "One conversation at a time",
    description:
      "I could never have guessed that a simple hello would become a voice I always want to hear.",
    image: blondePortrait,
    imageAlt: "A smiling portrait of Ghiscca",
  },
  {
    chapter: "03",
    title: "The moments that stayed",
    date: "The ordinary, made ours",
    description:
      "The best memories aren't always the grand ones. Sometimes they're just the little things, with you.",
    image: couplePhoto,
    imageAlt: "A close-up photo of Ghiscca and Rifky together",
  },
  {
    chapter: "04",
    title: "And somehow...",
    date: "My favorite person",
    description:
      "Somewhere along the way, you became the person I want to tell everything to.",
    image: closePortrait,
    imageAlt: "A candid portrait of Ghiscca",
  },
];

export const memoriesGallery: { image: StaticImageData; caption: string; size: "portrait" | "landscape" }[] = [
  { image: couplePhoto, caption: "A little piece of our world", size: "portrait" },
  { image: ghisccaPortrait, caption: "The light felt like this", size: "landscape" },
  { image: smilePortrait, caption: "One for the memory book", size: "portrait" },
  { image: blackAndWhitePhoto, caption: "A little photo-booth memory", size: "landscape" },
];

export const reasons = [
  "The way you talk.",
  "The little things you do.",
  "The way you make ordinary moments feel special.",
  "The way you are simply... you.",
];

export const ifWeWere = [
  {
    label: "a place",
    answer: "Somewhere by the sea, at golden hour — where we could stay a little longer.",
    color: "#d8b79b",
  },
  {
    label: "a season",
    answer: "Early autumn. Soft light, slow afternoons, and your hand in mine.",
    color: "#bd806c",
  },
  {
    label: "a song",
    answer: "Dinda, of course. A little melody that somehow sounds like you.",
    color: "#98705f",
  },
  {
    label: "a memory",
    answer: "One of those ordinary days that became my favorite just because you were there.",
    color: "#c58b81",
  },
  {
    label: "a color",
    answer: "The warm blush of the sky just before the sun goes down.",
    color: "#d99c93",
  },
];

export const personalLetter = [
  "Dear Ghiscca,",
  "[PLACEHOLDER FOR MY PERSONAL LETTER]",
  "Thank you for being part of my life.",
  "— Rifky",
];
