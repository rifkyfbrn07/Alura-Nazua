"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Pause, Play, Volume2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ifWeWere,
  memories,
  memoriesGallery,
  personalLetter,
  reasons,
} from "@/lib/love-story";

export default function LoveExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const secretHeartRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const vinylTweenRef = useRef<gsap.core.Tween | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [secretOpened, setSecretOpened] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".intro-mark", {
          scale: 0.7,
          opacity: 0,
          filter: reducedMotion ? "none" : "blur(8px)",
          duration: reducedMotion ? 0.35 : 1.1,
        })
        .from(
          ".intro-copy > *",
          {
            y: reducedMotion ? 0 : 18,
            opacity: 0,
            filter: reducedMotion ? "none" : "blur(7px)",
            stagger: reducedMotion ? 0 : 0.12,
            duration: 0.75,
          },
          "-=0.5",
        )
        .from(".open-button", { y: 12, opacity: 0, duration: 0.65 }, "-=0.2");

      if (reducedMotion) return;

      gsap.to(".intro-orb", {
        y: -18,
        x: 12,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".intro-spark", {
        y: -12,
        opacity: 0.35,
        duration: 3.8,
        stagger: 0.65,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
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
      gsap.to(".hero-image-wrap", {
        yPercent: 11,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(".scroll-cue", {
        y: 8,
        opacity: 0.55,
        duration: 1.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

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
      gsap.utils.toArray<HTMLElement>(".story-scene").forEach((scene) => {
        gsap.from(scene.querySelector(".story-photo"), {
          scale: 1.12,
          opacity: 0,
          duration: 1.15,
          ease: "power2.out",
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
      gsap.from(".letter-paper", {
        y: 45,
        opacity: 0,
        rotate: -1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".letter-section", start: "top 73%" },
      });
      gsap.from(".letter-line", {
        y: 12,
        opacity: 0,
        stagger: 0.18,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".letter-paper", start: "top 70%" },
      });
      gsap.from(".final-line", {
        y: 35,
        opacity: 0,
        stagger: 0.22,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".final-section", start: "top 70%" },
      });
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      document.body.style.overflow = "";
    };
  }, []);

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
    let cancelled = false;
    fetch("/audio/dinda.mp3", { method: "HEAD" })
      .then((response) => {
        if (cancelled) return;
        if (!response.ok) {
          setAudioFailed(true);
          return;
        }
        audio.src = "/audio/dinda.mp3";
        audio.load();
      })
      .catch(() => {
        if (!cancelled) setAudioFailed(true);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (selectedAnswer === null) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  }, [selectedAnswer]);

  const enterStory = useCallback(() => {
    if (entered || !introRef.current) return;
    const intro = introRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = gsap.utils.toArray<HTMLElement>(".transition-particle");
    gsap.set(particles, { x: 0, y: 0, opacity: 0, scale: 0.5 });
    const timeline = gsap.timeline({
      onComplete: () => {
        setEntered(true);
        document.body.style.overflow = "";
        lenisRef.current?.start();
        lenisRef.current?.scrollTo("#hero", { duration: 1.2, offset: 0 });
      },
    });
    timeline
      .fromTo(
        particles,
        { x: 0, y: 0, opacity: 0, scale: 0.5 },
        {
          x: () => gsap.utils.random(-Math.min(230, window.innerWidth * 0.4), Math.min(230, window.innerWidth * 0.4)),
          y: () => gsap.utils.random(-Math.min(210, window.innerHeight * 0.36), Math.min(210, window.innerHeight * 0.36)),
          opacity: 0.85,
          scale: 1,
          duration: reducedMotion ? 0.15 : 0.6,
          stagger: reducedMotion ? 0 : 0.012,
          ease: "power2.out",
        },
        0,
      )
      .to(particles, { opacity: 0, scale: 0, duration: reducedMotion ? 0.1 : 0.4 }, reducedMotion ? 0.1 : 0.35)
      .to(".intro-content", {
        scale: 0.84,
        opacity: 0,
        filter: reducedMotion ? "none" : "blur(8px)",
        duration: reducedMotion ? 0.12 : 0.55,
      }, 0)
      .to(".intro-orb", {
        scale: 1.8,
        opacity: 0.8,
        duration: reducedMotion ? 0.12 : 0.55,
      }, 0)
      .to(intro, {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
        duration: reducedMotion ? 0.18 : 1,
        ease: "power4.inOut",
      })
      .set(intro, { display: "none" });
  }, [entered]);

  const replay = useCallback(() => {
    if (!introRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lenisRef.current?.stop();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
    setEntered(false);
    setSelectedAnswer(null);
    setSecretOpened(false);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setPlaying(false);
    const intro = introRef.current;
    gsap.set(".transition-particle", { x: 0, y: 0, opacity: 0, scale: 0.5 });
    gsap.set(".intro-content", { scale: 0.88, opacity: 0, filter: reducedMotion ? "none" : "blur(6px)" });
    gsap.set(".open-button", { x: 0, y: 0 });
    gsap.set(secretHeartRef.current, { clearProps: "transform,opacity" });
    gsap.set(".secret-reveal", { clipPath: "circle(0% at 50% 50%)" });
    gsap.set(".secret-reveal-copy", { y: 18, opacity: 0, filter: reducedMotion ? "none" : "blur(5px)" });
    gsap.set(".answer-wash", { backgroundColor: "#d6b9ab" });
    gsap.set(intro, { display: "grid", opacity: 1, clipPath: "circle(150% at 50% 50%)" });
    gsap.fromTo(intro, { clipPath: "circle(0% at 50% 50%)" }, {
      clipPath: "circle(150% at 50% 50%)",
      duration: reducedMotion ? 0.15 : 1.1,
      ease: "power3.inOut",
      onComplete: () => gsap.to(".intro-content", {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: reducedMotion ? 0.12 : 0.75,
        ease: "power3.out",
      }),
    });
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
    gsap.to(".answer-wash", {
      backgroundColor: ifWeWere[index].color,
      duration: 1.1,
      ease: "power2.inOut",
    });
  };

  const openSecret = () => {
    if (secretOpened) return;
    setSecretOpened(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = gsap.timeline({
      onComplete: () => lenisRef.current?.scrollTo("#letter", { duration: reducedMotion ? 0.2 : 1.35, offset: -24 }),
    });
    timeline
      .to(secretHeartRef.current, { scale: reducedMotion ? 1.1 : 12, opacity: 0, duration: reducedMotion ? 0.12 : 0.85, ease: "power3.in" })
      .to(".secret-reveal", {
        clipPath: "circle(150% at 50% 50%)",
        duration: reducedMotion ? 0.15 : 0.85,
        ease: "power3.inOut",
      }, "<0.1")
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
      <div className="intro-screen" ref={introRef} role="dialog" aria-modal="true" aria-label="A little something for Ghiscca">
        <div className="intro-orb" aria-hidden="true" />
        <div className="transition-particles" aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => <i className="transition-particle" key={index} />)}
        </div>
        <span className="intro-spark spark-one" aria-hidden="true">✳</span>
        <span className="intro-spark spark-two" aria-hidden="true">·</span>
        <span className="intro-spark spark-three" aria-hidden="true">✧</span>
        <div className="intro-content">
          <div className="intro-mark" aria-hidden="true">♡</div>
          <div className="intro-copy">
            <p className="eyebrow intro-eyebrow">FOR GHISCCA</p>
            <h1>A little something<br />I made for you.</h1>
          </div>
          <button
            className="open-button"
            onClick={enterStory}
            onPointerMove={(event) => {
              if (window.matchMedia("(pointer: coarse)").matches) return;
              const bounds = event.currentTarget.getBoundingClientRect();
              gsap.to(event.currentTarget, {
                x: (event.clientX - bounds.left - bounds.width / 2) * 0.18,
                y: (event.clientY - bounds.top - bounds.height / 2) * 0.18,
                duration: 0.35,
                ease: "power2.out",
              });
            }}
            onPointerLeave={(event) => gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" })}
            aria-label="Open our story"
          >
            <span>OPEN</span>
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </button>
          <p className="intro-footnote">MADE WITH LOVE, BY RIFKY</p>
        </div>
      </div>

      <header className="site-header">
        <a href="#hero" className="brand-mark" aria-label="Ghiscca, back to beginning">R <span>♡</span> G</a>
        <span className="header-note">A LITTLE UNIVERSE FOR YOU</span>
        <span className="header-index">01 — 09</span>
      </header>

      <section className="hero" id="hero">
        <div className="hero-image-wrap" aria-hidden="true">
          <Image src={memories[0].image} alt="" fill priority sizes="100vw" />
        </div>
        <div className="hero-wash" />
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">A STORY, JUST FOR YOU</p>
          <h2 className="hero-word" aria-label="Ghiscca">
            {"GHISCCA".split("").map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </h2>
          <p className="hero-subtitle">I made a little universe<br />for you.</p>
        </div>
        <div className="hero-side-note">GHISCCA ALURA NAZUA <span>·</span> MY FAVORITE PERSON</div>
        <a className="scroll-cue" href="#story">
          <span>SCROLL TO ENTER</span>
          <ArrowDown size={16} strokeWidth={1.4} />
        </a>
        <span className="hero-coordinate">A SMALL PLACE IN THE UNIVERSE, MADE FOR YOU</span>
      </section>

      <section className="story section-pad" id="story">
        <div className="section-heading story-heading">
          <p className="eyebrow">01 / THE WAY WE BECAME US</p>
          <h2>OUR<br /><em>STORY</em></h2>
          <p className="heading-note">A few little things I never want to forget.</p>
        </div>
        <div className="story-list">
          <div className="story-line" aria-hidden="true"><span className="story-line-fill" /></div>
          {memories.map((memory, index) => (
            <article
              className="story-scene"
              data-side={index % 2 ? "right" : "left"}
              key={memory.chapter}
            >
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

      <section className="gallery section-pad" id="memories">
        <div className="gallery-heading">
          <p className="eyebrow">02 / LITTLE FRAGMENTS</p>
          <h2>A few moments<br />I <em>kept close.</em></h2>
          <p>Swap these little windows for the photographs that feel like us.</p>
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
              <figcaption><span>{memory.caption}</span><small>GHISCCA & RIFKY</small></figcaption>
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
              <p className="audio-note">The audio could not be played. Check that <code>/audio/dinda.mp3</code> is available.</p>
            ) : !audioReady ? (
              <p className="audio-note"><Volume2 size={13} /> Add <code>/public/audio/dinda.mp3</code> to listen.</p>
            ) : (
              <p className="audio-note">No rush. Listen whenever you like.</p>
            )}
            <audio
              ref={audioRef}
              preload="none"
              onCanPlay={() => { setAudioReady(true); setAudioFailed(false); }}
              onError={() => { setAudioReady(false); setAudioFailed(true); }}
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
        </div>
        <span className="question-ornament" aria-hidden="true">♡</span>
      </section>

      <section className="secret-section" id="secret">
        <div className="secret-inner">
          <p className="eyebrow">ONE LAST LITTLE SECRET</p>
          <h2>Wait...<br /><em>there&apos;s one more thing.</em></h2>
          <p className="secret-hint">When you&apos;re ready.</p>
          <button ref={secretHeartRef} className="secret-heart" onClick={openSecret} aria-label="Open one last thing">
            ♡
          </button>
        </div>
        <div className="secret-reveal" aria-hidden="true">
          <p className="secret-reveal-copy">The best part of every memory<br />is that it has you in it.</p>
        </div>
      </section>

      <section className="letter-section section-pad" id="letter">
        <div className="letter-heading">
          <p className="eyebrow">06 / A FEW WORDS, JUST FOR YOU</p>
          <span className="letter-heart">♡</span>
        </div>
        <div className="letter-paper">
          <span className="letter-stamp">R <i>♡</i> G</span>
          <h2>For Ghiscca</h2>
          <div className="letter-copy">
            {personalLetter.map((line, index) => (
              <p className={`letter-line ${index === 1 ? "letter-placeholder" : ""}`} key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
          <p className="letter-postscript">WITH ALL MY HEART, ALWAYS.</p>
        </div>
      </section>

      <section className="final-section section-pad" id="final">
        <p className="eyebrow final-line">07 / UNTIL THE NEXT LITTLE ADVENTURE</p>
        <h2 className="final-line">Out of all the people<br />in this world...<br /><em>I&apos;m glad I found you.</em></h2>
        <span className="final-heart final-line" aria-hidden="true">♡</span>
        <p className="final-name final-line">Ghiscca Alura Nazua</p>
        <button className="replay-button final-line" onClick={replay}>
          <span>REPLAY OUR STORY</span><ArrowUpRight size={15} strokeWidth={1.5} />
        </button>
        <footer className="site-footer"><span>MADE WITH LOVE</span><span>RIFKY <i>♡</i> GHISCCA</span><span>ALWAYS, A LITTLE MORE</span></footer>
      </section>
    </main>
  );
}
