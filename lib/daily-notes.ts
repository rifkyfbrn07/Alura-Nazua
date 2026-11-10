// 60+ Original Daily Love Notes for Alura
// Sincere, warm, affectionate, nostalgic, and playful.
// Persisted in localStorage using device-local date.

export type DailyLoveNote = {
  id: number;
  category: "compliment" | "love" | "memory" | "gratitude" | "hope" | "playful" | "thought";
  text: string;
  tag: string;
};

export const DAILY_LOVE_NOTES: DailyLoveNote[] = [
  // 1-10: Compliments & Adoration
  {
    id: 1,
    category: "compliment",
    text: "Somehow, you still manage to make me smile even when you're not around.",
    tag: "A Little Smile",
  },
  {
    id: 2,
    category: "compliment",
    text: "I hope you know your eyes crinkle in the sweetest way whenever you're genuinely laughing.",
    tag: "Favorite Sight",
  },
  {
    id: 3,
    category: "compliment",
    text: "You have a natural grace that makes everything around you feel calm and soft.",
    tag: "Gentle Radiance",
  },
  {
    id: 4,
    category: "compliment",
    text: "You don't need to try to be impressive. You're already special just by being yourself.",
    tag: "True You",
  },
  {
    id: 5,
    category: "compliment",
    text: "Out of all the smiles in this world, yours is the one that never fails to brighten my day.",
    tag: "Pure Light",
  },
  {
    id: 6,
    category: "compliment",
    text: "Your voice has a way of making any overwhelming day feel a little lighter.",
    tag: "Quiet Comfort",
  },
  {
    id: 7,
    category: "compliment",
    text: "I love how passionate you get when you talk about the little things you like.",
    tag: "Cute Habits",
  },
  {
    id: 8,
    category: "compliment",
    text: "You're effortlessly cute, even when you're just frowning at your phone screen.",
    tag: "Little Quirks",
  },
  {
    id: 9,
    category: "compliment",
    text: "The kindness you show to the people around you is one of the things I respect most about you.",
    tag: "Kind Heart",
  },
  {
    id: 10,
    category: "compliment",
    text: "Pink suits you, but your natural warmth suits you even more.",
    tag: "Soft Color",
  },

  // 11-20: Things I Love About You
  {
    id: 11,
    category: "love",
    text: "Just a random reminder that I really like having you in my life.",
    tag: "Random Thought",
  },
  {
    id: 12,
    category: "love",
    text: "I love how easy it is to laugh with you over things that wouldn't make sense to anyone else.",
    tag: "Inside Jokes",
  },
  {
    id: 13,
    category: "love",
    text: "I love sitting next to you and realizing I don't want to be anywhere else right now.",
    tag: "Right Beside You",
  },
  {
    id: 14,
    category: "love",
    text: "I love the way you get excited about sweet treats and spontaneous snacks.",
    tag: "Sweet Cravings",
  },
  {
    id: 15,
    category: "love",
    text: "I love that when I look at you, my heart feels completely sure.",
    tag: "Certainty",
  },
  {
    id: 16,
    category: "love",
    text: "I love how even ordinary silence feels comfortable when it's shared with you.",
    tag: "Peaceful Moments",
  },
  {
    id: 17,
    category: "love",
    text: "I love learning all the small details about you that most people might never notice.",
    tag: "Learning You",
  },
  {
    id: 18,
    category: "love",
    text: "I love that you're the first person I want to tell when something good happens.",
    tag: "First Thought",
  },
  {
    id: 19,
    category: "love",
    text: "I love knowing that somewhere out there today, you're smiling.",
    tag: "Warm Wish",
  },
  {
    id: 20,
    category: "love",
    text: "I love you. Simply, gently, and without any hesitation.",
    tag: "Unconditional",
  },

  // 21-30: Little Memories
  {
    id: 21,
    category: "memory",
    text: "I wish I could save the little moments when you're laughing in a jar to replay whenever I want.",
    tag: "Saved Laughs",
  },
  {
    id: 22,
    category: "memory",
    text: "Remember our afternoon at Mie Gacoan? Even eating spicy noodles becomes romantic with you.",
    tag: "Gacoan Date",
  },
  {
    id: 23,
    category: "memory",
    text: "Looking back at our photobooth strips in those matching bucket hats will always make me smile.",
    tag: "Photobooth Strip",
  },
  {
    id: 24,
    category: "memory",
    text: "The memory of holding your hand for the first time still gives me butterflies.",
    tag: "First Touch",
  },
  {
    id: 25,
    category: "memory",
    text: "Remember those quiet night talks where neither of us wanted to say goodnight first?",
    tag: "Midnight Talks",
  },
  {
    id: 26,
    category: "memory",
    text: "All those candid photos of you smiling are secretly my favorite treasures.",
    tag: "Candid Joy",
  },
  {
    id: 27,
    category: "memory",
    text: "I still remember the outfit you wore that day. You looked so pretty it was hard to look away.",
    tag: "Unforgettable",
  },
  {
    id: 28,
    category: "memory",
    text: "Our little walks where we talked about everything and nothing at all are deeply etched in my heart.",
    tag: "Quiet Walks",
  },
  {
    id: 29,
    category: "memory",
    text: "Every time I see pink lilies, my mind immediately jumps straight to you.",
    tag: "Lily Scent",
  },
  {
    id: 30,
    category: "memory",
    text: "I wouldn't trade any of our ordinary days for anything in the world.",
    tag: "Priceless",
  },

  // 31-40: Gratitude & Thank-You Notes
  {
    id: 31,
    category: "gratitude",
    text: "Today is just another ordinary day, but I'm so glad you're part of mine.",
    tag: "Daily Blessing",
  },
  {
    id: 32,
    category: "gratitude",
    text: "Thank you for being someone I can always be myself around.",
    tag: "Safe Space",
  },
  {
    id: 33,
    category: "gratitude",
    text: "Thank you for listening to my ramblings, even when they make very little sense.",
    tag: "Patient Listener",
  },
  {
    id: 34,
    category: "gratitude",
    text: "Thank you for sharing your stories, your laughs, and your time with me.",
    tag: "Shared Time",
  },
  {
    id: 35,
    category: "gratitude",
    text: "Thank you for bringing so much gentle warmth into my world.",
    tag: "Warm World",
  },
  {
    id: 36,
    category: "gratitude",
    text: "I appreciate every little effort you make, even the ones you think go unnoticed.",
    tag: "Appreciation",
  },
  {
    id: 37,
    category: "gratitude",
    text: "Thank you for teaching me that love is found in the softest, smallest moments.",
    tag: "Soft Love",
  },
  {
    id: 38,
    category: "gratitude",
    text: "I'm grateful for your patience, your sweet messages, and your presence.",
    tag: "Gratitude",
  },
  {
    id: 39,
    category: "gratitude",
    text: "Thank you for choosing to share pages of your life with me, Alura.",
    tag: "Shared Pages",
  },
  {
    id: 40,
    category: "gratitude",
    text: "Thank you for simply being the person you are.",
    tag: "For Being You",
  },

  // 41-50: Future Hopes & Sweet Promises
  {
    id: 41,
    category: "hope",
    text: "I hope something unexpectedly nice happens to you today.",
    tag: "Sweet Wish",
  },
  {
    id: 42,
    category: "hope",
    text: "I hope we get to take a thousand more photos together and laugh at all of them.",
    tag: "Future Memories",
  },
  {
    id: 43,
    category: "hope",
    text: "I hope we visit more quiet places, drink sweet drinks, and never run out of stories.",
    tag: "Quiet Adventures",
  },
  {
    id: 44,
    category: "hope",
    text: "I hope you always feel how much you are cherished, especially on days you feel tired.",
    tag: "Always Cherished",
  },
  {
    id: 45,
    category: "hope",
    text: "I promise to keep learning how to understand and care for you better every day.",
    tag: "My Promise",
  },
  {
    id: 46,
    category: "hope",
    text: "I hope whatever you're working hard on today turns out beautifully.",
    tag: "Cheering For You",
  },
  {
    id: 47,
    category: "hope",
    text: "I look forward to all the spontaneous adventures we haven't even planned yet.",
    tag: "Unwritten Pages",
  },
  {
    id: 48,
    category: "hope",
    text: "I hope your heart feels light and peaceful tonight when you lay your head down.",
    tag: "Peaceful Night",
  },
  {
    id: 49,
    category: "hope",
    text: "If I could make one wish today, it would simply be to see you smile in person.",
    tag: "One Wish",
  },
  {
    id: 50,
    category: "hope",
    text: "I hope you never doubt that my tomorrow always includes wanting you in it.",
    tag: "Every Tomorrow",
  },

  // 51-65: Playful Thoughts & Random Affection
  {
    id: 51,
    category: "playful",
    text: "Official update: You're still the cutest girl on this planet. No competition.",
    tag: "Official Notice",
  },
  {
    id: 52,
    category: "playful",
    text: "If missing you was a full-time job, I'd probably be the hardest worker in the world.",
    tag: "Missing You",
  },
  {
    id: 53,
    category: "playful",
    text: "I bet you look adorable right now reading this note on your screen.",
    tag: "Caught You",
  },
  {
    id: 54,
    category: "playful",
    text: "Reminder: You owe me a hug the next time we meet. No excuses allowed.",
    tag: "Hug Debt",
  },
  {
    id: 55,
    category: "playful",
    text: "Are you tired? Because you've been running through my thoughts all day long.",
    tag: "Classic Line",
  },
  {
    id: 56,
    category: "thought",
    text: "When life feels noisy, thinking of you is like finding a quiet room with open windows.",
    tag: "Quiet Breeze",
  },
  {
    id: 57,
    category: "thought",
    text: "Some people just make the world feel softer. You are definitely that person for me.",
    tag: "Soft Presence",
  },
  {
    id: 58,
    category: "thought",
    text: "I like the person I become when I'm around you — more patient, happier, and hopeful.",
    tag: "Better Together",
  },
  {
    id: 59,
    category: "thought",
    text: "Even on days when we don't say much, knowing you exist is enough comfort.",
    tag: "Silent Anchor",
  },
  {
    id: 60,
    category: "thought",
    text: "If I had to write our story in one sentence: Meeting you was the best thing that ever happened to me.",
    tag: "Our Story",
  },
  {
    id: 61,
    category: "thought",
    text: "You are my favorite thought to wake up to, and the sweetest thought before I sleep.",
    tag: "Day and Night",
  },
  {
    id: 62,
    category: "playful",
    text: "Don't forget to drink water today, eat something sweet, and remember that Rifky loves you.",
    tag: "Daily Checklist",
  },
];

// Special Anniversary Note for September 6th
export const ANNIVERSARY_NOTE: DailyLoveNote = {
  id: 999,
  category: "love",
  text: "Happy September 6th, my favorite person in the whole universe. Today marks the anniversary of the day our story officially began. Through every laugh, every meal, every conversation, and every quiet moment, my heart would still choose you all over again. Happy Anniversary, Alura.",
  tag: "✦ SPECIAL ANNIVERSARY NOTE ✦",
};

const STORAGE_KEY = "alura_daily_note_state";

export type DailyNoteState = {
  lastOpenedDate: string; // "YYYY-MM-DD"
  noteId: number;
};

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function isAnniversaryDate(date = new Date()): boolean {
  // September is month index 8, day 6
  return date.getMonth() === 8 && date.getDate() === 6;
}

export function getTodayLoveNote(): {
  note: DailyLoveNote;
  isAnniversary: boolean;
  dateStr: string;
  displayDate: string;
} {
  const today = new Date();
  const dateStr = getTodayDateString();
  const displayDate = formatDisplayDate(today);

  if (isAnniversaryDate(today)) {
    return {
      note: ANNIVERSARY_NOTE,
      isAnniversary: true,
      dateStr,
      displayDate,
    };
  }

  // Deterministic daily mapping based on day-of-year + year
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const diffTime = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const noteIndex = Math.abs(dayOfYear % DAILY_LOVE_NOTES.length);
  const note = DAILY_LOVE_NOTES[noteIndex];

  return {
    note,
    isAnniversary: false,
    dateStr,
    displayDate,
  };
}

