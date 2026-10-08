"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Heart, Pause, Play, Volume2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import BotanicalLily from "@/components/botanical-lily";
import OpeningFilm from "@/components/opening-film";
import RelationshipCounter from "@/components/relationship-counter";
import LoveOrbit from "@/components/love-orbit";
import {
  creatorName,
  honestMessage,
  ifWeWere,
  memories,
  memoriesGallery,
  personalLetter,
  recipientName,
  reasons,
  relationshipDateLabel,
} from "@/lib/love-story";

export default function LoveExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const interactionContextRef = useRef<gsap.Context | null>(null);
  const secretHeartRef = useRef<HTMLButtonElement>(null);
  const secretTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const letterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const letterOrbitTweenRef = useRef<gsap.core.Tween | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const vinylTweenRef = useRef<gsap.core.Tween | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const letterAudioVolumeRef = useRef<number | null>(null);
  const autoplayBlockedRef = useRef(false);
  const [entered, setEntered] = useState(false);
  const [openingKey, setOpeningKey] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const [audioAutoplayBlocked, setAudioAutoplayBlocked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [secretOpened, setSecretOpened] = useState(false);
  const [letterOpening, setLetterOpening] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);

  const animateInContext = useCallback((animation: () => void) => {
    const context = interactionContextRef.current;
    const scope = rootRef.current;
    if (!context || !scope) {
      animation();
      return;
    }
    context.add("interaction", animation, scope)();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
    const lenis = new Lenis({ autoRaf: false, duration: reducedMotion ? 0.25 : 1.15 });
    lenisRef.current = lenis;
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    interactionContextRef.current = gsap.context(() => {}, root);

    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        ".hero-word span",
        { yPercent: 110, opacity: 0, rotateX: -18 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.25,
          stagger: 0.045,
          ease: "power4.out",
          scrollTrigger: { trigger: ".hero", start: "top 70%" },
        },
      );
      gsap.fromTo(
        ".hero-subtitle",
        { y: 24, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.25,
          scrollTrigger: { trigger: ".hero", start: "top 65%" },
        },
      );
      if (window.matchMedia("(min-width: 651px)").matches) {
        gsap.from(".story-endnote", {
          y: 18,
          opacity: 0.7,
          scrollTrigger: {
            trigger: ".story-endnote",
            start: "top 74%",
            end: "+=260",
            pin: true,
            scrub: 0.6,
          },
        });
      }

      gsap.from(".story-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".story", start: "top 72%" },
      });
      gsap.fromTo(
        ".story-line-fill",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".story-list",
            start: "top 65%",
            end: "bottom 70%",
            scrub: 0.7,
          },
        },
      );
      gsap.to(".story-petal", {
        x: 28,
        y: 165,
        rotation: 120,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-list",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.8,
        },
      });
      gsap.utils.toArray<HTMLElement>(".story-scene").forEach((scene) => {
        const marker = scene.querySelector(".story-bloom");
        if (marker) {
          gsap.from(marker, {
            scale: 0.45,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: scene, start: "top 68%" },
          });
        }
        gsap.from(scene.querySelector(".story-photo"), {
          scale: 1.08,
          opacity: 0,
          filter: reducedMotion ? "none" : "blur(8px)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: scene, start: "top 72%" },
        });
        gsap.from(scene.querySelector(".story-copy"), {
          x: scene.dataset.side === "right" ? 42 : -42,
          opacity: 0,
          filter: "blur(5px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scene, start: "top 73%" },
        });
        gsap.from(scene.querySelector(".story-photo figcaption"), {
          y: 8,
          opacity: 0,
          delay: 0.22,
          duration: 0.55,
          scrollTrigger: { trigger: scene, start: "top 66%" },
        });
        gsap.to(scene.querySelector(".story-photo img"), {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: 0.7 },
        });
      });

      gsap.from(".gallery-heading > *", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: ".gallery", start: "top 72%" },
      });
      gsap.utils.toArray<HTMLElement>(".memory-frame").forEach((frame, index) => {
        gsap.from(frame, {
          x: index % 2 ? 70 : -70,
          y: 45,
          rotate: index % 2 ? 8 : -8,
          scale: 0.92,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 86%" },
        });
        gsap.to(frame.querySelector("img"), {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });

      gsap.from(".music-intro > *", {
        y: 28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: ".music-section", start: "top 70%" },
      });
      gsap.from(".vinyl", {
        scale: 0.82,
        rotate: -25,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".music-section", start: "top 62%" },
      });
      gsap.from(".music-lily", {
        scale: 0.7,
        opacity: 0,
        rotation: -8,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".music-section", start: "top 58%" },
      });
      gsap.to(".music-lily", {
        y: -7,
        rotation: 2,
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".gallery-flower", {
        rotation: 4,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>(".reason-line").forEach((line) => {
        gsap.fromTo(
          line,
          { y: 48, opacity: 0, filter: "blur(7px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: line, start: "top 82%" },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".honest-line").forEach((line, index) => {
        gsap.fromTo(line, {
          y: 12,
          opacity: 0,
          filter: "blur(4px)",
        }, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          delay: index % 3 === 0 ? 0.08 : 0,
          ease: "power3.out",
          scrollTrigger: { trigger: line, start: "top 86%" },
        });
      });
      gsap.from(".question-intro > *", {
        y: 22,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        scrollTrigger: { trigger: ".question-section", start: "top 70%" },
      });
      gsap.from(".secret-inner > *", {
        y: 22,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: { trigger: ".secret-section", start: "top 68%" },
      });
      gsap.from(".secret-lily", {
        y: 24,
        scale: 0.88,
        opacity: 0,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".secret-section", start: "top 72%" },
      });
      gsap.to(".secret-lily", {
        y: -9,
        rotation: 1.4,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.from(".final-line", {
        y: 35,
        opacity: 0,
        stagger: 0.22,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".final-section", start: "top 70%" },
      });
      gsap.from(".final-lily", {
        y: 32,
        scale: 0.88,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ".final-section", start: "top 72%" },
      });
      gsap.to(".final-lily", {
        y: -8,
        rotation: 1.2,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, root);

    return () => {
      ctx.revert();
      interactionContextRef.current?.revert();
      interactionContextRef.current = null;
      secretTimelineRef.current?.kill();
      letterTimelineRef.current?.kill();
      letterOrbitTweenRef.current?.kill();
      vinylTweenRef.current?.kill();
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!letterOpening) return;
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();
    const audio = audioRef.current;
    if (audio) {
      letterAudioVolumeRef.current = audio.volume;
      audio.volume = Math.max(0, audio.volume * 0.35);
    }

    animateInContext(() => {
      gsap.getTweensOf(".memory-frame img, .gallery-flower").forEach((tween) => tween.pause());
      letterOrbitTweenRef.current = gsap.to(".letter-orbit", {
        rotation: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
      });
      gsap.set(".letter-reveal-line, .letter-reveal-signature, .letter-reveal-happy", {
        opacity: 0,
      });
      gsap.set(".letter-reveal-line", { y: 9, filter: "blur(4px)" });
      gsap.set(".letter-envelope-flap", { rotateX: 0 });
      gsap.set(".letter-reveal-paper", { y: 6, scaleY: 0.9, opacity: 0 });
      gsap.set(".letter-seal-crack", { scaleY: 0 });
      gsap.set(".letter-seal-half", { x: 0, y: 0, rotation: 0 });
      gsap.set(".letter-reveal-flower .lily-stem", { strokeDasharray: 300, strokeDashoffset: 300 });
      gsap.set(".letter-reveal-flower .lily-leaf", { opacity: 0 });
      gsap.set(".letter-paper-shared", { opacity: 0, scale: 0.96 });

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const timeline = gsap.timeline({
        onComplete: () => {
          letterOrbitTweenRef.current?.kill();
          letterOrbitTweenRef.current = null;
          setLetterRevealed(true);
          setLetterOpening(false);
        },
      });
      letterTimelineRef.current = timeline;

      timeline
        .to({}, {
          duration: 0,
          onComplete: () => gsap.getTweensOf(".letter-orbit").forEach((tween) => tween.pause()),
        })
        .to(".letter-film-backdrop", {
          opacity: 1,
          backdropFilter: reducedMotion ? "blur(2px)" : "blur(9px)",
          duration: reducedMotion ? 0.15 : 0.8,
          ease: "power2.inOut",
        })
        .to(".letter-orbit-photo", {
          filter: "blur(8px)",
          opacity: 0.23,
          duration: reducedMotion ? 0.15 : 0.55,
        }, "<")
        .to(".letter-envelope-object", {
          y: 0,
          scale: 1.08,
          rotation: 1.5,
          duration: reducedMotion ? 0.16 : 0.72,
          ease: "power3.out",
        }, "-=0.35")
        .to(".letter-wax-seal", {
          boxShadow: "0 0 26px rgba(145, 39, 57, 0.42), 0 5px 9px rgba(65, 18, 27, 0.25)",
          duration: reducedMotion ? 0.1 : 0.35,
        })
        .to(".letter-seal-crack", { scaleY: 1, duration: reducedMotion ? 0.1 : 0.28, ease: "power2.out" })
        .to(".letter-seal-half:first-child", { x: -3, y: -2, rotation: -8, duration: reducedMotion ? 0.12 : 0.3, ease: "power2.out" }, "<")
        .to(".letter-seal-half:nth-child(2)", { x: 3, y: 2, rotation: 8, duration: reducedMotion ? 0.12 : 0.3, ease: "power2.out" }, "<")
        .to(".letter-seal-particle", {
          x: (index) => index === 0 ? -13 : index === 1 ? 12 : 1,
          y: (index) => index === 2 ? -14 : 8,
          opacity: 0,
          scale: 0.5,
          duration: reducedMotion ? 0.12 : 0.42,
          stagger: 0.035,
          ease: "power2.out",
        }, "<")
        .to(".letter-envelope-flap", {
          rotateX: -174,
          duration: reducedMotion ? 0.16 : 0.62,
          ease: "power2.inOut",
        }, "+=0.05")
        .to(".letter-reveal-paper", {
          y: reducedMotion ? -30 : -58,
          scaleY: 1,
          opacity: 1,
          duration: reducedMotion ? 0.2 : 0.85,
          ease: "power3.out",
        }, "-=0.24")
        .to(".letter-film-backdrop", {
          backgroundColor: "rgba(245, 238, 226, 0.97)",
          backdropFilter: reducedMotion ? "blur(2px)" : "blur(12px)",
          duration: reducedMotion ? 0.2 : 0.85,
          ease: "sine.inOut",
        }, "-=0.15")
        .to(".letter-envelope-object", {
          y: 40,
          scale: 0.9,
          opacity: 0,
          duration: reducedMotion ? 0.14 : 0.55,
          ease: "power2.in",
        }, "<")
        .to(".letter-reveal-paper", {
          y: 0,
          scale: 1,
          rotation: 0,
          duration: reducedMotion ? 0.15 : 0.6,
          ease: "power3.out",
        }, "<")
        .to(".letter-open-card", {
          scale: 1,
          duration: reducedMotion ? 0.16 : 0.65,
          ease: "power3.out",
        }, "<")
        .to({}, { duration: reducedMotion ? 0.12 : 0.7 });

      const letterLines = gsap.utils.toArray<HTMLElement>(".letter-reveal-line");
      letterLines.forEach((line, index) => {
        const position = `+=${index === 0 || index === 1 || index === 5 || index === 8 ? 0.38 : 0.2}`;
        timeline.to(line, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: reducedMotion ? 0.14 : 0.42,
          ease: "power2.out",
        }, position);
      });
      timeline
        .to(".letter-reveal-signature", { y: 0, opacity: 1, duration: reducedMotion ? 0.15 : 0.58, ease: "power2.out" }, "+=0.75")
        .to(".letter-reveal-flower .lily-stem", { strokeDashoffset: 0, duration: reducedMotion ? 0.15 : 0.75, ease: "power2.inOut" }, "-=0.2")
        .to(".letter-reveal-flower .lily-petals", { opacity: 1, duration: reducedMotion ? 0.12 : 0.48, ease: "power3.out" }, "-=0.15")
        .to(".letter-reveal-flower .lily-petal", { opacity: 1, duration: reducedMotion ? 0.12 : 0.42, stagger: reducedMotion ? 0 : 0.04, ease: "power3.out" }, "<")
        .to(".letter-reveal-flower .lily-leaf", { opacity: 1, duration: reducedMotion ? 0.12 : 0.4, stagger: reducedMotion ? 0 : 0.08, ease: "power3.out" }, "<")
        .to(".letter-reveal-flower .lily-stamens", { opacity: 1, duration: reducedMotion ? 0.1 : 0.25 }, "-=0.1")
        .to(".letter-reveal-happy", { y: 0, opacity: 1, duration: reducedMotion ? 0.14 : 0.55, ease: "power2.out" }, "+=0.32")
        .to({}, { duration: reducedMotion ? 0.2 : 1.1 })
        .to(".letter-paper-shared", { opacity: 1, scale: 1, rotation: -0.4, duration: reducedMotion ? 0.16 : 1, ease: "power3.out" })
        .to(".letter-open-card", { scale: 0.86, opacity: 0, duration: reducedMotion ? 0.15 : 0.75, ease: "power2.inOut" }, "<")
        .to(".letter-film-backdrop", { opacity: 0, duration: reducedMotion ? 0.14 : 0.65, ease: "power2.inOut" }, "<");
    });

    return () => {
      letterTimelineRef.current?.kill();
      letterTimelineRef.current = null;
      letterOrbitTweenRef.current?.kill();
      letterOrbitTweenRef.current = null;
      gsap.getTweensOf(".memory-frame img, .gallery-flower").forEach((tween) => tween.play());
      if (audio && letterAudioVolumeRef.current !== null) {
        audio.volume = letterAudioVolumeRef.current;
        letterAudioVolumeRef.current = null;
      }
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [animateInContext, letterOpening]);

  useEffect(() => {
    if (playing) {
      vinylTweenRef.current?.kill();
      vinylTweenRef.current = gsap.to(".vinyl", {
        rotation: "+=360",
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 12 : 5,
        ease: "none",
        repeat: -1,
      });
    } else {
      vinylTweenRef.current?.pause();
    }
    return () => {
      vinylTweenRef.current?.kill();
      vinylTweenRef.current = null;
    };
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = "/audio/dinda.mp3";
    audio.volume = 0.34;
    audio.load();
    let disposed = false;
    let canPlay = false;

    const startPlayback = () => {
      if (disposed || !canPlay || !autoplayBlockedRef.current) return;
      void audio.play().then(() => {
        autoplayBlockedRef.current = false;
        setAudioAutoplayBlocked(false);
        setPlaying(true);
      }).catch(() => {
        autoplayBlockedRef.current = true;
        setAudioAutoplayBlocked(true);
      });
    };
    const attemptAutoplay = () => {
      if (disposed) return;
      canPlay = true;
      void audio.play().then(() => {
        autoplayBlockedRef.current = false;
        setAudioAutoplayBlocked(false);
        setPlaying(true);
      }).catch(() => {
        autoplayBlockedRef.current = true;
        setAudioAutoplayBlocked(true);
      });
    };
    const onCanPlay = () => { canPlay = true; };
    audio.addEventListener("canplay", onCanPlay, { once: true });
    audio.addEventListener("canplay", attemptAutoplay, { once: true });
    window.addEventListener("pointerdown", startPlayback, { passive: true });
    window.addEventListener("keydown", startPlayback);

    return () => {
      disposed = true;
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("canplay", attemptAutoplay);
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
    };
  }, []);

  useEffect(() => {
    const energy = gsap.to(document.documentElement, {
      "--music-energy": playing ? 1 : 0,
      duration: playing ? 0.7 : 0.45,
      ease: "sine.inOut",
      repeat: playing ? -1 : 0,
      yoyo: playing,
      repeatDelay: playing ? 0.18 : 0,
    });
    return () => { energy.kill(); };
  }, [playing]);

  useEffect(() => {
    if (selectedAnswer === null) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animateInContext(() => {
      gsap.fromTo(
        ".answer-copy",
        { y: reducedMotion ? 0 : 14, opacity: 0, filter: reducedMotion ? "none" : "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: reducedMotion ? 0.12 : 0.7,
          ease: "power3.out",
        },
      );
    });
  }, [animateInContext, selectedAnswer]);

  const completeOpening = useCallback(() => {
    setEntered(true);
    document.body.style.overflow = "";
    lenisRef.current?.start();
    lenisRef.current?.scrollTo("#hero", {
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.2 : 1.2,
      offset: 0,
    });
  }, []);

  const replay = useCallback(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lenisRef.current?.stop();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
    setEntered(false);
    setOpeningKey((key) => key + 1);
    setSelectedAnswer(null);
    setSecretOpened(false);
    setLetterOpening(false);
    setLetterRevealed(false);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setPlaying(false);
    secretTimelineRef.current?.kill();
    gsap.set(secretHeartRef.current, { clearProps: "transform,opacity" });
    gsap.set(".secret-reveal", { clipPath: "circle(0% at 50% 50%)" });
    gsap.set(".secret-reveal-copy", { y: 18, opacity: 0, filter: reducedMotion ? "none" : "blur(5px)" });
    gsap.set(".secret-section", { clearProps: "backgroundColor" });
    gsap.set(".answer-wash", { clearProps: "backgroundColor" });
    gsap.set(".if-we-lily .lily-petals", { opacity: 0.12 });
    gsap.set(".vinyl", { rotation: 0 });
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !audioReady) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setAudioFailed(true);
      setPlaying(false);
    }
  };

  const chooseAnswer = (index: number) => {
    setSelectedAnswer(index);
    animateInContext(() => {
      gsap.to(".if-we-lily .lily-petals", {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(".answer-wash", {
        backgroundColor: ifWeWere[index].color,
        duration: 1.1,
        ease: "power2.inOut",
      });
    });
  };

  const openSecret = () => {
    if (secretOpened) return;
    setSecretOpened(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = gsap.timeline({
      onComplete: () => lenisRef.current?.scrollTo("#honest-note", { duration: reducedMotion ? 0.2 : 1.35, offset: -20 }),
    });
    secretTimelineRef.current = timeline;
    timeline
      .to(secretHeartRef.current, { scale: reducedMotion ? 1.1 : 3.4, duration: reducedMotion ? 0.12 : 0.9, ease: "power3.in" })
      .to(".secret-section", {
        backgroundColor: "#32101f",
        duration: reducedMotion ? 0.12 : 0.9,
        ease: "sine.inOut",
      }, "<")
      .to(".secret-reveal", {
        clipPath: "circle(150% at 50% 47%)",
        duration: reducedMotion ? 0.15 : 1.1,
        ease: "power3.inOut",
      }, "<0.05")
      .fromTo(
        ".secret-reveal-copy",
        { y: 18, opacity: 0, filter: "blur(5px)" },
        {
          y: 0,
          opacity: 1,
          filter: reducedMotion ? "none" : "blur(0px)",
          duration: reducedMotion ? 0.15 : 0.7,
        },
        "-=0.25",
      );
  };

  return (
    <main ref={rootRef} className="experience">
      <div className="grain" aria-hidden="true" />
      {!entered && <OpeningFilm key={openingKey} onComplete={completeOpening} />}

      <header className="site-header">
        <a href="#hero" className="brand-mark" aria-label={`${recipientName}, back to beginning`}>{recipientName.toUpperCase()}</a>
        <span className="header-note">A LITTLE UNIVERSE, MADE FOR YOU</span>
        <span className="header-index">01 — 09</span>
      </header>

      <section className="hero" id="hero">
        <div className="hero-wash" />
        <LoveOrbit key={openingKey} />
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">A STORY, JUST FOR YOU</p>
          <h2 className="hero-word" aria-label={recipientName}>
            {recipientName.toUpperCase().split("").map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </h2>
          <p className="hero-subtitle">I made a little universe<br />for you.</p>
        </div>
        <div className="hero-side-note">THE ONE I KEEP CHOOSING <span>·</span> {recipientName.toUpperCase()}</div>
      </section>

      <section className="story section-pad" id="story">
        <div className="section-heading story-heading">
          <p className="eyebrow">01 / THE WAY WE BECAME US</p>
          <h2>OUR<br /><em>STORY</em></h2>
          <BotanicalLily className="story-heading-lily botanical-lily" />
          <p className="heading-note">A few little things I never want to forget.</p>
        </div>
        <div className="story-list">
          <div className="story-line" aria-hidden="true"><span className="story-line-fill" /></div>
          <span className="story-petal" aria-hidden="true" />
          {memories.map((memory, index) => (
            <article
              className="story-scene"
              data-side={index % 2 ? "right" : "left"}
              key={memory.chapter}
            >
              <BotanicalLily className="story-bloom botanical-lily" />
              <div className="story-copy">
                <span className="story-number">{memory.chapter} <i>—</i> {memory.date}</span>
                <h3>{memory.title}</h3>
                <p>{memory.description}</p>
              </div>
              <figure className="story-photo">
                <Image
                  src={memory.image}
                  alt={memory.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 650px) 86vw, 40vw"
                />
                <figcaption>FIG. {memory.chapter} &nbsp;·&nbsp; A MEMORY TO KEEP</figcaption>
              </figure>
            </article>
          ))}
        </div>
        <p className="story-endnote">And somehow...<br /><em>you became my favorite person.</em></p>
      </section>

      <RelationshipCounter />

      <section className="gallery section-pad" id="memories">
        <div className="gallery-heading">
          <p className="eyebrow">02 / LITTLE FRAGMENTS</p>
          <h2>A few moments<br />I <em>kept close.</em></h2>
          <p>A few small pieces of a life I feel lucky to share with you.</p>
        </div>
        <div className="gallery-field">
          {memoriesGallery.map((memory, index) => (
            <figure className={`memory-frame memory-${index + 1} ${memory.size}`} key={memory.image.src}>
              <div className="memory-photo">
                <Image
                  src={memory.image}
                  alt={memory.caption}
                  fill
                  loading="lazy"
                  sizes="(max-width: 650px) 45vw, 30vw"
                />
              </div>
              <BotanicalLily className={`gallery-flower gallery-flower-${index + 1} botanical-lily`} />
              <figcaption><span>{memory.caption}</span><small>{recipientName.toUpperCase()} & {creatorName.toUpperCase()}</small></figcaption>
            </figure>
          ))}
          <div className="gallery-scribble" aria-hidden="true">the days<br />I keep <span>♡</span></div>
        </div>
        <p className="gallery-footnote">A SMALL COLLECTION OF OUR NOT-YET-FILLED PHOTO ALBUM</p>
      </section>

      <section className="music-section section-pad" id="song">
        <div className="music-intro">
          <p className="eyebrow">03 / THE SOUND OF YOU</p>
          <h2>A song that<br />reminds me <em>of you.</em></h2>
          <p>Some songs find their way into a memory. This one always finds its way back to you.</p>
        </div>
        <div className={`record-player ${playing ? "is-playing" : ""}`}>
          <BotanicalLily className="music-lily botanical-lily" />
          <div className="vinyl" aria-label="Illustration of a vinyl record">
            <div className="vinyl-grooves" />
            <div className="vinyl-label"><span>DINDA</span><small>MASDO · SIDE A</small><i>♡</i></div>
            <div className="vinyl-hole" />
          </div>
          <div className="record-copy">
            <span className="eyebrow">A LITTLE DEDICATION</span>
            <h3>DINDA</h3>
            <p>Masdo</p>
            <div className="equalizer" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((bar) => <i key={bar} />)}
            </div>
            <button className="play-button" onClick={toggleMusic} disabled={!audioReady} aria-label={playing ? "Pause Dinda" : "Play Dinda"}>
              {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
              <span>{playing ? "PAUSE" : "PLAY"}</span>
            </button>
            {audioFailed ? (
              <p className="audio-note">The record is resting here for now. The song can join us whenever you&apos;re ready.</p>
            ) : audioAutoplayBlocked ? (
              <p className="audio-note">Tap play whenever you&apos;re ready.</p>
            ) : !audioReady ? (
              <p className="audio-note"><Volume2 size={13} /> A little listening room, ready when you are.</p>
            ) : (
              <p className="audio-note">No rush. Listen whenever you like.</p>
            )}
            <audio
              ref={audioRef}
              preload="auto"
              onCanPlay={() => { setAudioReady(true); setAudioFailed(false); }}
              onError={() => { setAudioReady(false); setAudioFailed(true); }}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
          </div>
        </div>
        <p className="music-disclaimer">A SONG WE LOVE · NO LYRICS, JUST A FEELING</p>
      </section>

      <section className="reasons-section section-pad" id="reasons">
        <div className="reasons-heading">
          <p className="eyebrow">04 / IF YOU EVER WONDER</p>
          <h2>THINGS I LOVE<br /><em>ABOUT YOU</em></h2>
        </div>
        <div className="reasons-list">
          {reasons.map((reason, index) => (
            <p className="reason-line" key={reason}>
              <span>0{index + 1}</span>{reason}
            </p>
          ))}
        </div>
        <p className="reasons-end">And so many more than I could fit on a page.</p>
      </section>

      <section className="question-section section-pad" id="if-we-were">
        <div className="answer-wash" aria-hidden="true" />
        <div className="question-content">
          <div className="question-intro">
            <p className="eyebrow">05 / JUST IMAGINE</p>
            <h2>IF WE<br /><em>WERE...</em></h2>
            <p className="question-prompt">Pick one. I have a feeling about it.</p>
          </div>
          <div className="question-options" role="group" aria-label="Choose what we would be">
            {ifWeWere.map((item, index) => (
              <button
                className={selectedAnswer === index ? "is-selected" : ""}
                key={item.label}
                onClick={() => chooseAnswer(index)}
                aria-pressed={selectedAnswer === index}
              >
                <span>{item.label}?</span><ArrowUpRight size={16} strokeWidth={1.3} />
              </button>
            ))}
          </div>
          <div className="answer-area" aria-live="polite">
            {selectedAnswer !== null ? (
              <p className="answer-copy">{ifWeWere[selectedAnswer].answer}</p>
            ) : (
              <p className="answer-hint">I&apos;ll tell you what I think<br />when you choose.</p>
            )}
          </div>
          <BotanicalLily className={`if-we-lily botanical-lily ${selectedAnswer !== null ? "is-open" : ""}`} />
        </div>
        <span className="question-ornament" aria-hidden="true">♡</span>
      </section>

      <section className="secret-section" id="secret">
        <div className="secret-inner">
          <p className="eyebrow">A QUIET LITTLE PAUSE</p>
          <h2><em>there&apos;s one more thing.</em></h2>
          <p className="secret-hint">When you&apos;re ready.</p>
          <button
            ref={secretHeartRef}
            className="secret-heart secret-lily-button"
            onClick={openSecret}
            aria-label="Open the little heart and reveal one last thing"
            aria-expanded={secretOpened}
            aria-controls="honest-note"
          >
            <Heart className="secret-lily" size={38} strokeWidth={1.1} />
          </button>
        </div>
        <div className="secret-reveal" aria-hidden={!secretOpened}>
          <p className="secret-reveal-copy">The best part of every memory<br />is that it has you in it.</p>
        </div>
      </section>

      <section className="honest-note section-pad" id="honest-note" aria-labelledby="honest-note-title">
        <p className="eyebrow">A THING I WANT TO SAY OUT LOUD</p>
        <h2 id="honest-note-title">I know I&apos;m still<br /><em>learning.</em></h2>
        <div className="honest-note-copy">
          {honestMessage.map((line, index) => (
            <p
              className={`honest-line ${line.kind === "pause" ? "honest-note-pause" : ""} ${line.kind === "signature" ? "honest-note-signature" : ""}`}
              key={`${index}-${line.text}`}
            >
              {line.kind === "signature" ? <>{line.text}<br /><span>— {creatorName}</span></> : line.text}
            </p>
          ))}
        </div>
      </section>

      <section className="letter-section section-pad" id="letter">
        <div className="letter-heading">
          <p className="eyebrow">08 / WHEN YOU&apos;RE READY</p>
          <span className="letter-date">{relationshipDateLabel}</span>
        </div>
        {!letterRevealed ? (
          <div className="letter-discovery">
            <p className="letter-discovery-prompt">there&apos;s something I want you to read.</p>
            <button
              className="letter-envelope-button"
              onClick={() => setLetterOpening(true)}
              disabled={letterOpening}
              aria-label="Take and open Rifky's letter"
            >
              <span className="letter-envelope-face">
                <span className="letter-envelope-fold" />
                <span className="letter-envelope-edge" />
                <span className="letter-envelope-button-seal">♡</span>
              </span>
            </button>
            <p className="letter-take-it">take it.</p>
          </div>
        ) : null}

        <article className={`letter-paper letter-paper-shared ${letterRevealed ? "is-revealed" : letterOpening ? "is-preparing" : ""}`} aria-hidden={!letterRevealed}>
          <span className="letter-stamp">A NOTE, FOR YOU</span>
          <p className="letter-paper-date">{relationshipDateLabel} <span>·</span> the day it started</p>
          <h2>For {recipientName}</h2>
          <div className="letter-copy">
            {personalLetter.map((line, index) => (
              <p className={`letter-line ${index === 1 || index === 5 || index === 8 ? "letter-breath" : ""}`} key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
          <div className="letter-closing">
            <p className="letter-signature">— {creatorName} <span>♡</span></p>
            <BotanicalLily className="letter-lily botanical-lily" />
            <p className="letter-happy-us">happy us day, Lura.</p>
          </div>
          <p className="letter-postscript">A LITTLE NOTE, FROM ME TO YOU.</p>
        </article>

        {letterOpening && (
          <div className="letter-film-overlay" role="dialog" aria-modal="true" aria-label={`${creatorName}'s letter for ${recipientName}`}>
            <div className="letter-film-backdrop" />
            <div className="letter-orbit">
              {[memoriesGallery[0], memoriesGallery[2], memoriesGallery[3]].map((memory, index) => (
                <div className={`letter-orbit-photo letter-orbit-photo-${index + 1}`} key={memory.image.src}>
                  <Image src={memory.image} alt="" fill sizes="18vw" />
                </div>
              ))}
            </div>
            <div className="letter-film-stage">
              <div className="letter-open-card">
                <div className="letter-envelope-object" aria-hidden="true">
                  <span className="letter-envelope-back" />
                  <span className="letter-envelope-pocket" />
                  <span className="letter-envelope-flap" />
                  <span className="letter-wax-seal">
                    <span className="letter-seal-half">♡</span>
                    <span className="letter-seal-half">♡</span>
                    <i className="letter-seal-crack" />
                  </span>
                  <i className="letter-seal-particle" />
                  <i className="letter-seal-particle" />
                  <i className="letter-seal-particle" />
                </div>
                <article className="letter-paper letter-reveal-paper">
                  <span className="letter-stamp">A NOTE, FOR YOU</span>
                  <p className="letter-paper-date">{relationshipDateLabel} <span>·</span> the day it started</p>
                  <h2>For {recipientName}</h2>
                  <div className="letter-copy">
                    {personalLetter.map((line, index) => (
                      <p className={`letter-line letter-reveal-line ${index === 1 || index === 5 || index === 8 ? "letter-breath" : ""}`} key={`${line}-${index}`}>{line}</p>
                    ))}
                  </div>
                  <div className="letter-closing">
                    <p className="letter-signature letter-reveal-signature">— {creatorName} <span>♡</span></p>
                    <BotanicalLily className="letter-lily letter-reveal-flower botanical-lily" />
                    <p className="letter-happy-us letter-reveal-happy">happy us day, Lura.</p>
                  </div>
                  <p className="letter-postscript">A LITTLE NOTE, FROM ME TO YOU.</p>
                </article>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="final-section section-pad" id="final">
        <BotanicalLily className="final-lily botanical-lily" />
        <p className="eyebrow final-line">09 / UNTIL THE NEXT LITTLE ADVENTURE</p>
        <h2 className="final-line">Out of all the people<br />in this world...<br /><em>I&apos;m glad I found you.</em></h2>
        <p className="final-date final-line" aria-label="Since September 6, 2026">{relationshipDateLabel}</p>
        <p className="final-name final-line">{recipientName}</p>
        <button className="replay-button final-line" onClick={replay}>
          <span>REPLAY OUR STORY</span><ArrowUpRight size={15} strokeWidth={1.5} />
        </button>
        <footer className="site-footer"><span>MADE WITH LOVE</span><span>{creatorName.toUpperCase()} · FOR {recipientName.toUpperCase()}</span><span>ALWAYS, A LITTLE MORE</span></footer>
      </section>
    </main>
  );
}
