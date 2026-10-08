"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowDown, Heart, X } from "lucide-react";
import gsap from "gsap";
import { memoriesOrbit, recipientName, relationshipDateLabel } from "@/lib/love-story";

type OrbitMemory = {
  image: StaticImageData;
  caption: string;
  alt: string;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
};

type HeartInteractionStage = "idle" | "pull" | "burst" | "rebuild";

function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.7 + Math.random() * (index % 7 === 0 ? 2.1 : 1.15),
    phase: Math.random() * Math.PI * 2,
    speed: 0.2 + Math.random() * 0.45,
  }));
}

function drawHeart(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  progress: number,
  time: number,
  stage: HeartInteractionStage,
  stageProgress: number,
) {
  const points = 128;
  for (let index = 0; index < points; index += 1) {
    const t = (index / points) * Math.PI * 2;
    const targetX = 16 * Math.sin(t) ** 3;
    const targetY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const shape = stage === "burst" ? 1 - stageProgress : 1;
    const scatter = stage === "pull"
      ? Math.sin(stageProgress * Math.PI) * 5
      : stage === "burst"
        ? 14 + stageProgress * 100
        : stage === "rebuild"
          ? 20 * (1 - stageProgress)
          : 0;
    const pulse = stage === "idle" ? 1 + (Math.sin(time * 0.0038) + 1) * 0.018 : 1;
    const wobble = Math.sin(time * 0.0008 + index) * 1.5;
    const px = x + (targetX * progress * shape + Math.sin(index * 6.2) * scatter) * scale * pulse + wobble;
    const py = y + (targetY * progress * shape + Math.cos(index * 4.7) * scatter) * scale * pulse;
    const radius = (0.8 + (Math.sin(time * 0.002 + index * 0.3) + 1) * 0.6) * (stage === "pull" ? 1.2 : 1);
    const alpha = (0.2 + (Math.sin(time * 0.0013 + index) + 1) * 0.3) * shape;
    context.fillStyle = index % 7 === 0
      ? `rgba(255, 239, 246, ${alpha})`
      : `rgba(255, 77, 142, ${alpha})`;
    context.beginPath();
    context.arc(px, py, radius, 0, Math.PI * 2);
    context.fill();
  }
}

function ParticleHeart({
  reducedMotion,
  interactionStage,
}: {
  reducedMotion: boolean;
  interactionStage: HeartInteractionStage;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<((time: number) => void) | null>(null);
  const stageRef = useRef(interactionStage);
  const stageStartedAtRef = useRef(0);

  useEffect(() => {
    stageRef.current = interactionStage;
    stageStartedAtRef.current = performance.now();
    if (reducedMotion) drawRef.current?.(stageStartedAtRef.current);
  }, [interactionStage, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const particles = createParticles(window.innerWidth < 650 ? 38 : 76, 1, 1);
    let width = 1;
    let height = 1;
    let frame = 0;
    const startedAt = performance.now();
    let disposed = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.forEach((particle) => {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      });
    };

    const draw = (now: number) => {
      if (disposed) return;
      context.clearRect(0, 0, width, height);
      const elapsed = now - startedAt;
      const progress = reducedMotion ? 1 : Math.min(1, elapsed / 2100);
      const time = reducedMotion ? startedAt : now;
      const centerX = width * 0.5;
      const portraitTablet = width >= 650 && width < 1200 && height > width;
      const centerY = height * (width < 650 ? 0.41 : portraitTablet ? 0.44 : 0.32);
      const heartScale = Math.min(width * 0.0042, height * 0.0035, 3.8);
      const stage = stageRef.current;
      const stageDuration = stage === "pull" ? 520 : stage === "burst" ? 700 : stage === "rebuild" ? 950 : 1;
      const stageProgress = Math.min(1, (now - stageStartedAtRef.current) / stageDuration);
      const musicEnergy = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--music-energy")) || 0;

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.y += particle.speed * 0.48;
          particle.x += Math.sin(now * 0.00028 + particle.phase) * 0.12;
          if (particle.y > height + 8) {
            particle.y = -8;
            particle.x = Math.random() * width;
          }
        }
        context.beginPath();
        context.fillStyle = `rgba(255, 163, 194, ${0.12 + (Math.sin(time * 0.001 + particle.phase) + 1) * 0.08 + musicEnergy * 0.14})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      drawHeart(context, centerX, centerY, heartScale * (1 + musicEnergy * 0.045), progress, time, stage, stageProgress);
      if (!reducedMotion || (stage !== "idle" && stageProgress < 1)) {
        frame = window.requestAnimationFrame(draw);
      }
    };
    drawRef.current = draw;

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(startedAt);
    });
    observer.observe(canvas);
    if (reducedMotion) draw(startedAt);
    else frame = window.requestAnimationFrame(draw);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      drawRef.current = null;
    };
  }, [reducedMotion]);

  return <canvas className="orbit-particle-canvas" ref={canvasRef} aria-hidden="true" />;
}

function OrbitPhoto({
  memory,
  index,
  selected,
  onSelect,
}: {
  memory: OrbitMemory;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`orbit-photo orbit-photo-${index + 1}`}
      data-orbit-index={index}
      type="button"
      onClick={onSelect}
      aria-label={`Open memory: ${memory.caption}`}
      aria-pressed={selected}
    >
      <span className="orbit-photo-image">
        <Image
          src={memory.image}
          alt={memory.alt}
          fill
          sizes="(max-width: 650px) 27vw, 180px"
          loading="lazy"
        />
      </span>
      <span className="orbit-photo-caption">{memory.caption}</span>
    </button>
  );
}

export default function LoveOrbit() {
  const worldRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const cameraDepthRef = useRef(0);
  const cameraVelocityRef = useRef(0);
  const frozenRef = useRef(false);
  const dragRef = useRef<{ pointerId: number; x: number; y: number; angle: number; depth: number; moved: boolean } | null>(null);
  const draggedRef = useRef(false);
  const heartTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const [heartFound, setHeartFound] = useState(false);
  const [interactionStage, setInteractionStage] = useState<HeartInteractionStage>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;
    let disposed = false;
    const photos = Array.from(world.querySelectorAll<HTMLElement>(".orbit-photo"));
    const render = () => {
      if (disposed) return;
      const bounds = world.getBoundingClientRect();
      const mobile = bounds.width < 650;
      const tablet = bounds.width >= 650 && bounds.width < 1200;
      const portrait = tablet && bounds.height > bounds.width;
      const radiusX = Math.min(
        bounds.width * (mobile ? 0.34 : portrait ? 0.32 : tablet ? 0.39 : 0.35),
        mobile ? 166 : portrait ? 300 : tablet ? 480 : 560,
      );
      const radiusY = Math.min(
        bounds.height * (mobile ? 0.14 : portrait ? 0.24 : tablet ? 0.22 : 0.17),
        mobile ? 110 : portrait ? 250 : tablet ? 230 : 165,
      );
      const centerY = bounds.height * (mobile ? 0.41 : portrait ? 0.44 : tablet ? 0.46 : 0.32);
      if (Math.abs(velocityRef.current) < 0.000012) velocityRef.current = 0;
      if (Math.abs(cameraVelocityRef.current) < 0.000012) cameraVelocityRef.current = 0;
      if (!frozenRef.current) {
        angleRef.current += reducedMotion ? 0 : 0.00048 + velocityRef.current;
        cameraDepthRef.current += cameraVelocityRef.current;
        velocityRef.current *= 0.94;
        cameraVelocityRef.current *= 0.9;
      }
      const musicEnergy = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--music-energy")) || 0;
      const heartbeat = reducedMotion ? 1 : 1 + (Math.sin(performance.now() * 0.0038) + 1) * (0.008 + musicEnergy * 0.012);

      if (!frozenRef.current) {
        photos.forEach((photo, index) => {
          const phase = (index / photos.length) * Math.PI * 2 + (index % 2 ? 0.2 : -0.12);
          const rate = 0.9 + (index % 3) * 0.055;
          const angle = angleRef.current * rate + phase;
          const x = Math.cos(angle) * radiusX + Math.sin(angle * 2.12 + phase) * radiusX * 0.075;
          const y = Math.sin(angle * 0.82 + phase * 0.5) * radiusY + Math.cos(angle * 1.57 + phase) * radiusY * 0.095;
          const depth = gsap.utils.clamp(0, 1, (Math.sin(angle * 0.77 + phase + cameraDepthRef.current) + 1) / 2);
          const scale = (0.54 + depth * 0.58) * heartbeat;
          const depthZ = depth * 180 + cameraDepthRef.current * 90;
          photo.style.transform = `translate3d(${bounds.width / 2 + x}px, ${centerY + y}px, ${depthZ}px) translate(-50%, -50%) scale(${scale}) rotate(${Math.cos(angle) * 4.8}deg)`;
          photo.style.opacity = String(0.38 + depth * 0.62);
          photo.style.filter = depth < 0.24
            ? "blur(1.4px)"
            : depth > 0.78
              ? `drop-shadow(0 0 ${8 + musicEnergy * 8}px rgba(255, 77, 142, 0.2))`
              : "none";
          photo.style.zIndex = String(Math.round(depth * 20) + 1);
        });
      }
    };

    render();
    gsap.ticker.add(render);
    return () => {
      disposed = true;
      gsap.ticker.remove(render);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const world = worldRef.current;
    if (!world) return;
    const context = gsap.context(() => {
      gsap.fromTo(".orbit-petal", {
        y: "-12vh",
        x: 0,
        rotation: () => gsap.utils.random(-45, 45),
        opacity: 0,
      }, {
        y: "112vh",
        x: () => gsap.utils.random(-50, 50),
        rotation: () => gsap.utils.random(-180, 180),
        opacity: 0.34,
        duration: () => gsap.utils.random(12, 21),
        delay: () => gsap.utils.random(0, 12),
        repeat: -1,
        repeatRefresh: true,
        ease: "none",
      });
    }, world);
    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (activeMemory === null) {
      frozenRef.current = false;
      return;
    }
    frozenRef.current = true;
    velocityRef.current = 0;
    cameraVelocityRef.current = 0;
    const timeline = gsap.timeline();
    timeline.fromTo(".orbit-memory-modal", {
      opacity: 0,
      scale: reducedMotion ? 1 : 0.92,
      filter: reducedMotion ? "none" : "blur(8px)",
    }, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: reducedMotion ? 0.12 : 0.55,
      ease: "power3.out",
    });
    return () => { timeline.kill(); };
  }, [activeMemory, reducedMotion]);

  useEffect(() => {
    if (activeMemory === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMemory(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeMemory, reducedMotion]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".orbit-heart-button, a, .orbit-memory-modal")) return;
    velocityRef.current = 0;
    cameraVelocityRef.current = 0;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      angle: angleRef.current,
      depth: cameraDepthRef.current,
      moved: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    if (Math.abs(delta) > 6 || Math.abs(deltaY) > 6) {
      drag.moved = true;
      draggedRef.current = true;
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }
    if (drag.moved && !reducedMotion) {
      const bounds = worldRef.current?.getBoundingClientRect();
      const width = bounds?.width || 1;
      const height = bounds?.height || 1;
      angleRef.current = drag.angle + delta / width * Math.PI * 1.4;
      cameraDepthRef.current = gsap.utils.clamp(-0.9, 0.9, drag.depth - deltaY / height * 0.75);
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId === event.pointerId) {
      velocityRef.current = drag.moved ? gsap.utils.clamp(-0.012, 0.012, (event.clientX - drag.x) * 0.00005) : 0;
      cameraVelocityRef.current = drag.moved ? gsap.utils.clamp(-0.009, 0.009, (drag.y - event.clientY) * 0.00004) : 0;
      dragRef.current = null;
      window.setTimeout(() => { draggedRef.current = false; }, 0);
    }
  };

  const findHeart = () => {
    if (heartFound || heartTimelineRef.current) return;
    const world = worldRef.current;
    if (!world) return;
    frozenRef.current = true;
    setInteractionStage("pull");
    const photos = world.querySelectorAll(".orbit-photo");
    const bounds = world.getBoundingClientRect();
    const centerX = bounds.width / 2;
    const centerY = bounds.height * (bounds.width < 650 ? 0.41 : bounds.width < 1200 && bounds.height > bounds.width ? 0.44 : bounds.width < 1200 ? 0.46 : 0.32);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(photos, { clearProps: "transform,opacity,filter" });
        frozenRef.current = false;
        velocityRef.current = 0;
        cameraVelocityRef.current = 0;
        setHeartFound(true);
        setInteractionStage("idle");
        heartTimelineRef.current = null;
      },
    });
    heartTimelineRef.current = timeline;
    timeline
      .to(photos, {
        x: centerX,
        y: centerY,
        scale: 0.48,
        opacity: 0.22,
        filter: "blur(3px)",
        duration: reduced ? 0.1 : 0.5,
        stagger: reduced ? 0 : 0.025,
        ease: "power2.in",
      })
      .to(".orbit-heart-button", {
        scale: reduced ? 1.1 : 1.55,
        color: "#fff7fb",
        boxShadow: "0 0 65px rgba(255, 45, 141, 0.72)",
        duration: reduced ? 0.1 : 0.35,
      }, "<")
      .call(() => setInteractionStage("burst"))
      .to(photos, {
        x: (index) => centerX + Math.cos((index / photos.length) * Math.PI * 2) * Math.min(bounds.width * 0.45, 420),
        y: (index) => centerY + Math.sin((index / photos.length) * Math.PI * 2) * Math.min(bounds.height * 0.33, 250),
        scale: 0.56,
        opacity: 0,
        duration: reduced ? 0.1 : 0.56,
        stagger: reduced ? 0 : 0.02,
        ease: "power2.out",
      }, "-=0.12")
      .to(".orbit-shockwave", {
        scale: 7,
        opacity: 0,
        duration: reduced ? 0.1 : 0.72,
        stagger: reduced ? 0 : 0.09,
        ease: "power2.out",
      }, "<")
      .to(".orbit-burst-petal", {
        x: (index) => Math.cos((index / 8) * Math.PI * 2) * gsap.utils.random(70, 210),
        y: (index) => Math.sin((index / 8) * Math.PI * 2) * gsap.utils.random(55, 180),
        rotation: (index) => index % 2 ? 80 : -80,
        opacity: 0,
        duration: reduced ? 0.1 : 0.65,
        stagger: reduced ? 0 : 0.02,
        ease: "power2.out",
      }, "<")
      .call(() => setInteractionStage("rebuild"))
      .to(".orbit-heart-button", {
        scale: 1,
        color: "#ffbfd3",
        boxShadow: "0 0 24px rgba(244, 82, 143, 0.15)",
        duration: reduced ? 0.1 : 0.45,
        ease: "elastic.out(1, 0.55)",
      }, "+=0.18");
  };

  const closeMemory = () => {
    const modal = worldRef.current?.querySelector(".orbit-memory-modal");
    if (!modal || reducedMotion) {
      setActiveMemory(null);
      return;
    }
    gsap.to(modal, {
      opacity: 0,
      scale: 0.96,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setActiveMemory(null),
    });
  };

  const memory = activeMemory === null ? null : memoriesOrbit[activeMemory];

  return (
    <div
      className="love-orbit"
      ref={worldRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
    >
      <div className="orbit-halo" aria-hidden="true" />
      <ParticleHeart reducedMotion={reducedMotion} interactionStage={interactionStage} />
      <div className="orbit-petal-rain" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <svg
            className={`orbit-petal orbit-petal-${index + 1}`}
            key={index}
            viewBox="0 0 24 24"
            style={{ left: `${index * 10 + 2}%` }}
          >
            <path d="M1 2C9 -1 20 1 22 9C24 17 14 24 5 22C9 15 6 7 1 2Z" />
          </svg>
        ))}
      </div>
      <div className="orbit-shockwaves" aria-hidden="true">
        <i className="orbit-shockwave" />
        <i className="orbit-shockwave" />
      </div>
      <div className="orbit-burst-field" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => <i className="orbit-burst-petal" key={index} />)}
      </div>
      <div className="orbit-instruction" aria-hidden="true">DRAG THE MEMORIES AROUND</div>
      {memoriesOrbit.map((item, index) => (
        <OrbitPhoto
          key={item.image.src}
          memory={item}
          index={index}
          selected={activeMemory === index}
          onSelect={() => {
            if (draggedRef.current) return;
            frozenRef.current = true;
            setActiveMemory(index);
          }}
        />
      ))}
      <button
        className={`orbit-heart-button ${heartFound ? "is-found" : ""} ${interactionStage !== "idle" ? "is-interacting" : ""}`}
        type="button"
        onClick={findHeart}
        aria-label={heartFound ? "You found the heart" : "Find the heart at the center"}
        aria-expanded={heartFound}
        disabled={heartFound || interactionStage !== "idle"}
      >
        <Heart size={24} strokeWidth={1.15} />
      </button>
      <p className={`orbit-heart-note ${heartFound ? "is-visible" : ""}`} aria-live="polite">
        {heartFound
          ? <>you found the heart.<br /><span>{relationshipDateLabel}</span><br />that&apos;s where it started.</>
          : "tap the little heart"}
      </p>
      {memory && (
        <div className="orbit-memory-modal" role="dialog" aria-modal="true" aria-label={memory.caption} onClick={closeMemory}>
          <button className="orbit-memory-close" type="button" aria-label="Close memory" onClick={(event) => {
            event.stopPropagation();
            closeMemory();
          }}>
            <X size={18} strokeWidth={1.4} />
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <div className="orbit-memory-image">
              <Image src={memory.image} alt={memory.alt} fill sizes="(max-width: 650px) 78vw, 400px" />
            </div>
            <figcaption>{memory.caption}<small>{recipientName.toUpperCase()}, IN MY LITTLE UNIVERSE</small></figcaption>
          </figure>
        </div>
      )}
      <a className="orbit-continue" href="#story">
        <span>SCROLL TO ENTER</span><ArrowDown size={14} strokeWidth={1.4} />
      </a>
      <span className="orbit-coordinate" aria-hidden="true">SOMEWHERE IN OUR LITTLE UNIVERSE</span>
    </div>
  );
}
