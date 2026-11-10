"use client";

import { useState, useCallback } from "react";
import { Sparkles, Heart, CheckCircle2, RotateCcw, Trophy } from "lucide-react";
import PinkLily from "@/components/pink-lily";
import { playPopSound, playSparkleSound, playChimeWin } from "@/lib/sound-effects";
import { unlockBadge } from "@/lib/collectibles";

type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  funFact: string;
};

const QUESTIONS: QuizQuestion[] = [
  {
    question: "When did our story officially begin?",
    options: ["6 September 2026", "14 February 2026", "1 Januari 2026", "A random Tuesday"],
    correctIndex: 0,
    funFact: "06.09.2026 — The start of something very special in my life.",
  },
  {
    question: "What flower will forever remind me of Alura?",
    options: ["Pink Lilies 🌷", "Yellow Daisies", "Red Carnations", "Plastic Flowers"],
    correctIndex: 0,
    funFact: "Pink lilies — soft, rare, and delicate, just like you.",
  },
  {
    question: "Which color always makes Alura's world feel warm and happy?",
    options: ["Soft Blush Pink 💕", "Neon Yellow", "Dark Charcoal", "Muddy Green"],
    correctIndex: 0,
    funFact: "Soft pink everything — bringing sweetness to every corner.",
  },
  {
    question: "Where did we take our cherished photobooth strips in matching bucket hats?",
    options: ["Mie Gacoan 🍜", "A noisy airport", "A quiet library", "A random train station"],
    correctIndex: 0,
    funFact: "Mie Gacoan! Making an unforgettable memory out of an ordinary lunch.",
  },
  {
    question: "What's one of our favorite things to share together?",
    options: ["Sweet matcha, dimsum & laughs 🍵", "Dead silence", "Cold rainy drafts", "Spicy arguments"],
    correctIndex: 0,
    funFact: "Sharing hot treats and laughter is the warmest feeling in the world.",
  },
];

export default function RelationshipQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = QUESTIONS[currentIdx];

  const handleSelectOption = useCallback((optionIdx: number) => {
    if (isAnswered) return;
    playPopSound();
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    if (optionIdx === currentQ.correctIndex) {
      playSparkleSound();
      setScore((s) => s + 1);
    }
  }, [isAnswered, currentQ]);

  const handleNextQuestion = useCallback(() => {
    playPopSound();
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      playChimeWin();
      unlockBadge("quiz");
    }
  }, [currentIdx]);

  const handleRestart = useCallback(() => {
    playPopSound();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFinished(false);
    setScore(0);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto select-none">
      {/* Chapter Label */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8B5C0] shadow-sm mb-4">
          <Sparkles size={14} className="text-[#A94F65]" />
          <span className="text-xs font-mono tracking-widest text-[#702C43] uppercase">
            Playful Trivia // Memory Lane
          </span>
          <span className="text-sm">💗</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-[#702C43] tracking-tight mb-3">
          How Well Do You Know Us?
        </h2>

        <p className="text-sm sm:text-base text-[#702C43]/75 font-sans leading-relaxed">
          A gentle, fun quiz about our little moments, favorite things, and story together.
        </p>

        <div className="flex justify-center mt-4">
          <PinkLily size={42} />
        </div>
      </div>

      {/* Quiz Card Housing */}
      <div className="relative max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-white via-[#FFF7F5] to-[#FCE8E8]/70 border-4 border-white shadow-[0_20px_60px_-15px_rgba(169,79,101,0.22)] p-6 sm:p-10">
        
        {!quizFinished ? (
          <>
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-[#A94F65] mb-6 border-b border-[#F4D1D5] pb-3">
              <span>
                Question {currentIdx + 1} of {QUESTIONS.length}
              </span>
              <span>
                Score: {score}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-serif text-xl sm:text-2xl text-[#702C43] font-medium mb-6 text-center">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === currentQ.correctIndex;

                let btnStyle = "bg-white border-[#F4D1D5] text-[#702C43] hover:bg-[#FCE8E8]";
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-[#FFF0F2] border-[#A94F65] text-[#702C43] font-medium shadow-sm";
                  } else if (isSelected) {
                    btnStyle = "bg-[#FCE8E8] border-[#D58C9C] text-[#702C43]/70";
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(i)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-sans transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 size={18} className="text-[#A94F65] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Fun Fact revelation */}
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-[#FFF0F2] border border-[#E8B5C0] text-center mb-6 animate-[fadeIn_0.3s_ease-out]">
                <p className="font-serif italic text-sm sm:text-base text-[#702C43]">
                  💡 &ldquo;{currentQ.funFact}&rdquo;
                </p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-full py-3 rounded-full bg-[#A94F65] text-white text-xs font-sans font-medium tracking-wide shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
              >
                {currentIdx + 1 < QUESTIONS.length ? "Next Question ✨" : "See Final Message 💕"}
              </button>
            )}
          </>
        ) : (
          /* Finished Screen */
          <div className="text-center py-6 animate-[fadeIn_0.4s_ease-out]">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FCE8E8] border border-[#D58C9C] flex items-center justify-center text-3xl mb-4 shadow-sm">
              <Trophy size={30} className="text-[#A94F65]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#702C43] font-medium mb-3">
              Look at you!
            </h3>

            <div className="p-5 rounded-2xl bg-white border border-[#E8B5C0] shadow-sm mb-6 max-w-lg mx-auto">
              <p className="font-serif italic text-base sm:text-lg text-[#702C43] leading-relaxed">
                &ldquo;Look at you! You remember all these little things. I hope we keep collecting more memories together.&rdquo;
              </p>
              <span className="block text-[11px] font-mono text-[#A94F65] mt-2">
                — Rifky
              </span>
            </div>

            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A94F65] text-white text-xs font-medium shadow-md hover:bg-[#702C43] active:scale-95 transition-all"
            >
              <RotateCcw size={13} />
              <span>Play Quiz Again</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

