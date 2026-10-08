"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type LilyGardenProps = {
  onBloom?: () => void;
};

export default function LilyGarden({ onBloom }: LilyGardenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  const [watered, setWatered] = useState(false);
  const [bloomed, setBloomed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const garden = gardenRef.current;
    if (!root || !garden) return;

    const ctx = gsap.context(() => {
      const sway = gsap.to(garden.querySelectorAll(".lily-stem"), {
        rotation: 2.5,
        transformOrigin: "bottom center",
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
      });

      gsap.to(garden.querySelectorAll(".garden-petal"), {
        y: -14,
        x: 12,
        rotation: 16,
        opacity: 0.55,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.55, repeat: -1, yoyo: true },
      });

      return () => sway.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  const handleWater = () => {
    if (watered || bloomed) return;
    const root = rootRef.current;
    if (!root) return;

    setWatered(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setBloomed(true);
        onBloom?.();
      },
    });

    tl.fromTo(
      root.querySelectorAll(".water-drop"),
      { y: -30, opacity: 0, scale: 0.5 },
      { y: 110, opacity: 1, scale: 1, duration: 0.75, stagger: 0.04, ease: "power2.in" },
    )
      .to(root.querySelectorAll(".seedling"), {
        scaleY: 1.16,
        duration: 0.45,
        transformOrigin: "bottom",
      })
      .to(root.querySelectorAll(".lily-bud"), {
        scale: 1.08,
        rotate: 4,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.7)",
      })
      .to(root.querySelectorAll(".lily-petal"), {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
      })
      .to(
        root.querySelectorAll(".lily-center"),
        { scale: 1, opacity: 1, duration: 0.35 },
        "-=0.15",
      )
      .to(
        root.querySelectorAll(".garden-heart"),
        {
          y: -42,
          opacity: 0,
          scale: 1.25,
          duration: 1.05,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.15",
      );
  };

  return (
    <div ref={rootRef} className="lily-garden">
      <div ref={gardenRef} className="lily-garden-art" aria-hidden="true">
        <span className="garden-glow" />
        {Array.from({ length: 9 }, (_, i) => (
          <span
            className="garden-petal"
            key={i}
            style={{
              left: `${9 + i * 10}%`,
              top: `${18 + (i % 3) * 16}%`,
              rotate: `${i * 9 - 12}deg`,
            }}
          />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <span
            className="garden-heart"
            key={i}
            style={{
              left: `${26 + i * 16}%`,
              top: `${54 + (i % 2) * 10}%`,
            }}
          >
            ♡
          </span>
        ))}
        <div className="lily-bouquet">
          {Array.from({ length: 3 }, (_, index) => (
            <div className="lily-bundle" key={index}>
              <span className="lily-stem" />
              <span className="seedling" />
              <span className="lily-bud">
                <span className="lily-petal p1" />
                <span className="lily-petal p2" />
                <span className="lily-petal p3" />
                <span className="lily-petal p4" />
                <span className="lily-petal p5" />
                <span className="lily-center" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {!bloomed && (
        <button type="button" className="water-button" onClick={handleWater} disabled={watered}>
          <span>{watered ? "THE GARDEN IS WAKING..." : "WATER THE LILIES"}</span>
          <span aria-hidden="true">♡</span>
        </button>
      )}

      <div className="water-drops" aria-hidden="true">
        {Array.from({ length: 11 }, (_, i) => (
          <i
            className="water-drop"
            key={i}
            style={{ left: `${39 + (i % 4) * 7}%` }}
          />
        ))}
      </div>

      <p className="lily-garden-caption">
        {bloomed
          ? "you made them bloom."
          : "a little care can make beautiful things grow."}
      </p>
    </div>
  );
}
