"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { playSparkleSound } from "@/lib/sound-effects";

type Butterfly = {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  wingSpeed: number;
  scale: number;
  rotation: number;
  color: string;
};

export default function CuteButterflies() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const pointerPos = useRef<{ x: number; y: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only 3-4 delicate butterflies for optimal performance
    const colors = ["#F4D1D5", "#E8B5C0", "#D58C9C", "#FCE8E8"];
    const initialButterflies: Butterfly[] = [
      {
        id: 1,
        x: typeof window !== "undefined" ? window.innerWidth * 0.15 : 100,
        y: typeof window !== "undefined" ? window.innerHeight * 0.3 : 200,
        targetX: 200,
        targetY: 250,
        vx: 0,
        vy: 0,
        wingSpeed: 0.12,
        scale: 0.85,
        rotation: 15,
        color: colors[0],
      },
      {
        id: 2,
        x: typeof window !== "undefined" ? window.innerWidth * 0.8 : 700,
        y: typeof window !== "undefined" ? window.innerHeight * 0.45 : 350,
        targetX: 750,
        targetY: 300,
        vx: 0,
        vy: 0,
        wingSpeed: 0.15,
        scale: 0.75,
        rotation: -20,
        color: colors[1],
      },
      {
        id: 3,
        x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 450,
        y: typeof window !== "undefined" ? window.innerHeight * 0.65 : 500,
        targetX: 500,
        targetY: 450,
        vx: 0,
        vy: 0,
        wingSpeed: 0.1,
        scale: 0.9,
        rotation: 5,
        color: colors[2],
      },
    ];

    setButterflies(initialButterflies);

    const handlePointerMove = (e: PointerEvent) => {
      pointerPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let lastTick = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTick) / 1000, 0.1);
      lastTick = now;

      setButterflies((prev) =>
        prev.map((b) => {
          // Wander gently or steer slightly away from pointer if close
          let targetX = b.targetX;
          let targetY = b.targetY;

          // Periodically pick new gentle targets
          if (Math.random() < 0.015) {
            targetX = Math.random() * (window.innerWidth - 100) + 50;
            targetY = Math.random() * (window.innerHeight - 100) + 50;
          }

          // Gentle pointer evasion
          if (pointerPos.current) {
            const dx = b.x - pointerPos.current.x;
            const dy = b.y - pointerPos.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 140) {
              const repel = (140 - dist) / 140;
              targetX += (dx / dist) * 120 * repel;
              targetY += (dy / dist) * 120 * repel;
            }
          }

          const toTargetX = targetX - b.x;
          const toTargetY = targetY - b.y;

          const ax = toTargetX * 0.4;
          const ay = toTargetY * 0.4;

          const vx = (b.vx + ax * dt) * 0.94;
          const vy = (b.vy + ay * dt) * 0.94;

          const newX = b.x + vx * dt * 45;
          const newY = b.y + vy * dt * 45;

          const heading = Math.atan2(vy, vx) * (180 / Math.PI) + 90;

          return {
            ...b,
            x: newX,
            y: newY,
            targetX,
            targetY,
            vx,
            vy,
            rotation: heading,
          };
        })
      );

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleButterflyTap = useCallback((id: number) => {
    playSparkleSound();
    setButterflies((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              targetX: b.x + (Math.random() - 0.5) * 300,
              targetY: b.y + (Math.random() - 0.5) * 300,
              vx: (Math.random() - 0.5) * 200,
              vy: (Math.random() - 0.5) * 200,
            }
          : b
      )
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {butterflies.map((b) => {
        return (
          <div
            key={b.id}
            className="absolute transition-transform duration-75 ease-out pointer-events-auto cursor-pointer"
            style={{
              transform: `translate3d(${b.x}px, ${b.y}px, 0) scale(${b.scale}) rotate(${b.rotation}deg)`,
              willChange: "transform",
            }}
            onPointerDown={() => handleButterflyTap(b.id)}
            title="A gentle butterfly for Alura ✨"
          >
            {/* SVG Illustrated Butterfly */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 64 64"
              className="drop-shadow-[0_2px_8px_rgba(169,79,101,0.2)]"
            >
              {/* Left Wing with Flutter Animation */}
              <g className="origin-[32px_32px] animate-[wingLeft_0.35s_ease-in-out_infinite_alternate]">
                <path
                  d="M32 30 C20 10, 4 16, 8 36 C10 46, 26 44, 32 34 Z"
                  fill={b.color}
                  stroke="#A94F65"
                  strokeWidth="1.2"
                  opacity="0.88"
                />
                {/* Wing pattern */}
                <path
                  d="M28 28 C20 18, 12 24, 16 34"
                  fill="none"
                  stroke="#702C43"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
              </g>

              {/* Right Wing with Flutter Animation */}
              <g className="origin-[32px_32px] animate-[wingRight_0.35s_ease-in-out_infinite_alternate]">
                <path
                  d="M32 30 C44 10, 60 16, 56 36 C54 46, 38 44, 32 34 Z"
                  fill={b.color}
                  stroke="#A94F65"
                  strokeWidth="1.2"
                  opacity="0.88"
                />
                {/* Wing pattern */}
                <path
                  d="M36 28 C44 18, 52 24, 48 34"
                  fill="none"
                  stroke="#702C43"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
              </g>

              {/* Butterfly Body & Antennae */}
              <ellipse cx="32" cy="32" rx="2" ry="7" fill="#702C43" />
              <path
                d="M32 25 Q28 18 24 16 M32 25 Q36 18 40 16"
                stroke="#702C43"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

