"use client";

import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import gsap from "gsap";
import { recipientName } from "@/lib/love-story";

type OpeningFilmProps = {
  onComplete: () => void;
};

export default function OpeningFilm({ onComplete }: OpeningFilmProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const motionRef = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".opening-heart-mark", { opacity: 0, scale: 0.7, filter: reducedMotion ? "none" : "blur(6px)" }, {
          opacity: 1, scale: 1, filter: "blur(0px)", duration: reducedMotion ? 0.12 : 0.9,
        })
        .fromTo(".opening-kicker, .opening-copy", { y: 15, opacity: 0, filter: reducedMotion ? "none" : "blur(5px)" }, {
          y: 0, opacity: 1, filter: "blur(0px)", duration: reducedMotion ? 0.12 : 0.8, stagger: 0.13,
        }, "-=0.38")
        .fromTo(".opening-button", { y: 11, opacity: 0 }, {
          y: 0, opacity: 1, duration: reducedMotion ? 0.12 : 0.65,
        }, "-=0.25");

      if (!reducedMotion) {
        gsap.to(".opening-dust", {
          y: (index) => (index % 2 ? -19 : 15),
          x: (index) => (index % 3 ? 12 : -12),
          opacity: () => gsap.utils.random(0.08, 0.54),
          duration: () => gsap.utils.random(4, 8),
          ease: "sine.inOut",
          stagger: { each: 0.17, from: "random" },
          repeat: -1,
          yoyo: true,
        });
        motionRef.current = {
          x: gsap.quickTo(".opening-button", "x", { duration: 0.4, ease: "power3.out" }),
          y: gsap.quickTo(".opening-button", "y", { duration: 0.4, ease: "power3.out" }),
        };
      }
    }, root);

    return () => {
      timelineRef.current?.kill();
      context.revert();
      motionRef.current = null;
    };
  }, []);

  const open = () => {
    if (timelineRef.current) return;
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = gsap.timeline({ onComplete });
    timelineRef.current = timeline;
    timeline
      .to(".opening-button", { scale: 0.94, duration: reducedMotion ? 0.08 : 0.18, ease: "power2.in" })
      .to(".opening-button", { scale: 1, duration: reducedMotion ? 0.08 : 0.3, ease: "back.out(2)" })
      .to(".opening-heart-mark", { scale: reducedMotion ? 1.2 : 3.8, opacity: 0, duration: reducedMotion ? 0.12 : 0.75, ease: "power3.in" }, "-=0.15")
      .to(".opening-film", { opacity: 0, filter: reducedMotion ? "none" : "blur(9px)", duration: reducedMotion ? 0.14 : 0.72, ease: "power2.inOut" }, "-=0.38");
  };

  const moveButton = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    motionRef.current?.x((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    motionRef.current?.y((event.clientY - bounds.top - bounds.height / 2) * 0.14);
  };

  return (
    <div className="opening-film" ref={rootRef} role="dialog" aria-modal="true" aria-label={`A little universe for ${recipientName}`}>
      <div className="opening-film-grain" aria-hidden="true" />
      <div className="opening-film-glow" aria-hidden="true" />
      {Array.from({ length: 16 }, (_, index) => (
        <i className={`opening-dust opening-dust-${index % 4}`} key={index} aria-hidden="true" />
      ))}
      <div className="opening-content">
        <span className="opening-heart-mark" aria-hidden="true"><Heart size={21} strokeWidth={1.15} /></span>
        <p className="opening-kicker">HEY, {recipientName.toUpperCase()}.</p>
        <h1 className="opening-copy">I made something<br /><em>just for you.</em></h1>
        <button className="opening-button" type="button" onClick={open} onPointerMove={moveButton} onPointerLeave={() => {
          motionRef.current?.x(0);
          motionRef.current?.y(0);
        }}>
          <span>COME IN</span><i aria-hidden="true">↗</i>
        </button>
        <span className="opening-signoff">RIFKY, FOR YOU</span>
      </div>
    </div>
  );
}
