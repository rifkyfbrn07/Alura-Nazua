"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  BookOpen,
  Camera,
  Flower2,
  Gift,
  Heart,
  Lamp,
  Moon,
  Music2,
  Pause,
  Play,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useModalLifecycle } from "@/lib/use-modal-lifecycle";
import type { AudioPlayerHandle } from "@/components/audio-player";

type Place = "room" | "garden" | "photobooth" | "toybox" | "bakery" | "moonlight";
type Mood = "peek" | "wave" | "happy" | "sleepy" | "grumpy" | "laugh" | "dance" | "run";
type Dessert = "Brownies" | "Soft cookies" | "Ice cream" | "Matcha latte" | "Cappuccino";

const PLACES: { id: Place; name: string; detail: string; icon: typeof Heart; color: string }[] = [
  { id: "room", name: "Lura's Little Room", detail: "A cozy place with a secret drawer", icon: Lamp, color: "rose" },
  { id: "garden", name: "Lily Garden", detail: "Water a flower and find a note", icon: Flower2, color: "green" },
  { id: "photobooth", name: "Pink Photobooth Studio", detail: "Make a new little memory", icon: Camera, color: "pink" },
  { id: "toybox", name: "Memory Toybox", detail: "Open the box of keepsakes", icon: Gift, color: "lilac" },
  { id: "bakery", name: "Sweet Little Bakery", detail: "Choose, decorate, and serve", icon: Heart, color: "peach" },
  { id: "moonlight", name: "Moonlight Corner", detail: "A song and a softer sky", icon: Moon, color: "night" },
];

const BAKERY_INGREDIENTS = ["Butter", "Chocolate", "Strawberries", "Matcha", "Whipped cream"];
const DESSERT_REACTIONS: Record<Dessert, string> = {
  Brownies: "Lili takes a tiny bite and gives you a chocolatey thumbs-up!",
  "Soft cookies": "That warm cookie smell made Lili's little eyes sparkle.",
  "Ice cream": "Lili is delighted — especially by the strawberry on top.",
  "Matcha latte": "A gentle sip, a happy wiggle. Lili approves!",
  Cappuccino: "A perfect little foam heart. Lili saves you the first sip.",
};

function LiliFigure({
  mood,
  onClick,
  onMouseEnter,
  compact = false,
}: {
  mood: Mood;
  onClick: () => void;
  onMouseEnter: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      className={`lili-friend lili-${mood}${compact ? " lili-compact" : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      aria-label="Say hello to Lili"
      title="Say hello to Lili"
    >
      <svg viewBox="0 0 112 132" role="img" aria-label="Lili, a tiny pink lily friend">
        <path d="M37 19c-4-10 5-15 17-5 12-10 21-5 17 5l-8 9H45z" fill="#d87991" stroke="#a94f65" strokeWidth="2" />
        <path d="M54 23c-7-10-17-13-18-8-1 4 7 11 18 14m2-6c7-10 17-13 18-8 1 4-7 11-18 14" fill="#f3a5b6" stroke="#a94f65" strokeWidth="2" strokeLinejoin="round" />
        <path d="M25 67c-7-3-15 2-14 12 1 7 9 10 18 8m54-20c7-3 15 2 14 12-1 7-9 10-18 8" fill="#f8c5ce" stroke="#d58c9c" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="56" cy="76" rx="35" ry="37" fill="#f5b5c2" stroke="#d58c9c" strokeWidth="2.5" />
        <ellipse cx="43" cy="72" rx="4" ry="5.5" fill="#702c43" className="lili-eye" />
        <ellipse cx="69" cy="72" rx="4" ry="5.5" fill="#702c43" className="lili-eye" />
        <ellipse cx="33" cy="83" rx="6" ry="3.5" fill="#e98b9e" opacity=".8" />
        <ellipse cx="79" cy="83" rx="6" ry="3.5" fill="#e98b9e" opacity=".8" />
        <path d="M51 85q5 5 10 0" fill="none" stroke="#a94f65" strokeWidth="2" strokeLinecap="round" className="lili-smile" />
        <path d="M50 119c-4 5-11 5-14 2m25-2c4 5 11 5 14 2" fill="none" stroke="#d58c9c" strokeWidth="3" strokeLinecap="round" />
        <path d="M75 48c7-11 15-14 18-9 3 6-5 15-17 18" fill="#fff7f5" stroke="#d58c9c" strokeWidth="2" />
        <path d="M76 52c7-4 12-5 15-3m-14 8c6-1 10 0 13 3" fill="none" stroke="#e8b5c0" strokeWidth="2" strokeLinecap="round" />
        <circle cx="84" cy="51" r="2.5" fill="#e7c56e" />
        <path d="M82 57l7 5" stroke="#7ca274" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="lili-name">Lili</span>
    </button>
  );
}

function LocalWindow() {
  const [period, setPeriod] = useState<"morning" | "sunset" | "night">("morning");

  useEffect(() => {
    const updatePeriod = () => {
      const hour = new Date().getHours();
      setPeriod(hour >= 5 && hour < 16 ? "morning" : hour < 20 ? "sunset" : "night");
    };
    updatePeriod();
    const timer = window.setInterval(updatePeriod, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`little-window-view window-${period}`}>
      <div className="window-scene" aria-hidden="true">
        {period === "morning" && <><Sun /><span className="window-bloom">✿</span><span className="window-butterfly">⌁</span></>}
        {period === "sunset" && <><Sun /><span className="window-bird">⌁　⌁</span></>}
        {period === "night" && <><Moon /><span className="window-stars">✧　·　✦　·　✧</span></>}
      </div>
      <p className="mt-4 font-serif italic text-[#702C43]">
        &ldquo;I wish I could share all these little views with you.&rdquo;
      </p>
      <span className="mt-2 text-[10px] uppercase tracking-[.2em] text-[#A94F65]">
        {period === "morning" ? "A gentle morning" : period === "sunset" ? "Peachy evening" : "A little goodnight"}
        {" · "}local time
      </span>
    </div>
  );
}

export default function LiliWorld({ audioPlayer }: { audioPlayer: AudioPlayerHandle | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [place, setPlace] = useState<Place | null>(null);
  const [mood, setMood] = useState<Mood>("peek");
  const [message, setMessage] = useState("Psst... there's a whole tiny world waiting!");
  const [roomNote, setRoomNote] = useState("");
  const [dessert, setDessert] = useState<Dessert>("Brownies");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [topping, setTopping] = useState("Strawberries");
  const [served, setServed] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [poppedBalloon, setPoppedBalloon] = useState(false);
  const [giftRevealed, setGiftRevealed] = useState(false);
  const [dandelionBlown, setDandelionBlown] = useState(false);
  const [butterflyAway, setButterflyAway] = useState(false);
  const clickTimes = useRef<number[]>([]);
  const travelTimer = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const happyTimer = useRef<number | null>(null);
  const polaroidRef = useRef<HTMLButtonElement | null>(null);
  const dragStart = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  useModalLifecycle(isOpen, () => {
    setIsOpen(false);
    setPlace(null);
  }, dialogRef);

  useEffect(() => {
    let active = true;
    let idleTimer: number;
    const wake = () => {
      if (!active || isOpen) return;
      setMood("sleepy");
    };
    idleTimer = window.setTimeout(wake, 16_000);
    const resetIdle = () => {
      window.clearTimeout(idleTimer);
      if (!active) return;
      setMood("peek");
      idleTimer = window.setTimeout(wake, 16_000);
    };
    window.addEventListener("pointerdown", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle);
    const handleVisibility = () => {
      document.documentElement.classList.toggle("page-hidden", document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();
    return () => {
      active = false;
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointerdown", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.documentElement.classList.remove("page-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    const audio = audioPlayer?.getAudioElement();
    if (!audio) return;
    const handlePlay = () => setMood("dance");
    const handlePause = () => setMood("peek");
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioPlayer]);

  useEffect(() => {
    if (!isOpen || place !== "moonlight") return;
    const audio = audioPlayer?.getAudioElement();
    if (!audio) return;
    const update = () => {
      setSongProgress(audio.currentTime);
      setSongDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setIsMuted(audio.muted);
      setIsMusicPlaying(!audio.paused);
    };
    update();
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);
    audio.addEventListener("play", update);
    audio.addEventListener("pause", update);
    audio.addEventListener("volumechange", update);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
      audio.removeEventListener("play", update);
      audio.removeEventListener("pause", update);
      audio.removeEventListener("volumechange", update);
    };
  }, [audioPlayer, isOpen, place]);

  useEffect(() => () => {
    if (travelTimer.current !== null) window.clearTimeout(travelTimer.current);
    if (happyTimer.current !== null) window.clearTimeout(happyTimer.current);
  }, []);

  const say = useCallback((text: string, nextMood: Mood = "happy") => {
    setMessage(text);
    setMood(nextMood);
    if (happyTimer.current !== null) window.clearTimeout(happyTimer.current);
    happyTimer.current = window.setTimeout(() => setMood("peek"), 2200);
  }, []);

  const handleLiliClick = useCallback(() => {
    const now = Date.now();
    clickTimes.current = [...clickTimes.current.filter((time) => now - time < 3500), now];
    if (clickTimes.current.length >= 5) {
      clickTimes.current = [];
      say("Eep! Stop tickling me—hehe, okay, one more!", "grumpy");
      if (happyTimer.current !== null) window.clearTimeout(happyTimer.current);
      happyTimer.current = window.setTimeout(() => setMood("laugh"), 800);
      return;
    }
    if (!isOpen) setIsOpen(true);
    say(clickTimes.current.length > 1 ? "Hehe! Again!" : "Hi! I saved you the coziest spot.", "happy");
  }, [isOpen, say]);

  const enterPlace = useCallback((next: Place) => {
    setMood("run");
    setMessage("Lili is hurrying over!");
    if (travelTimer.current !== null) window.clearTimeout(travelTimer.current);
    travelTimer.current = window.setTimeout(() => {
      if (next === "garden" || next === "photobooth" || next === "toybox" || next === "moonlight") {
        const target = {
          garden: "lily-garden",
          photobooth: "pink-photobooth",
          toybox: "memory-toybox",
          moonlight: "moonlight-corner",
        }[next];
        setIsOpen(false);
        setPlace(null);
        setMood("peek");
        window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
        return;
      }
      setPlace(next);
      setMood("happy");
      setMessage(next === "room" ? "Welcome to my very own cozy corner!" : "Something sweet is baking!");
    }, 550);
  }, []);

  const toggleIngredient = (ingredient: string) => {
    setIngredients((current) => current.includes(ingredient)
      ? current.filter((item) => item !== ingredient)
      : [...current, ingredient]);
    setServed(false);
  };

  const toggleMusic = async () => {
    const audio = audioPlayer?.getAudioElement();
    if (!audio || !audioPlayer) return;
    if (audio.paused || !audio.src.includes("Jatuh%20Suka.mp3") && !audio.src.includes("Jatuh Suka.mp3")) {
      say("Our little song is playing!", "dance");
      await audioPlayer.playTrack("jatuh-suka");
    } else {
      audioPlayer.pause();
      say("A quiet little pause.", "happy");
    }
  };

  const seekMusic = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioPlayer?.getAudioElement();
    if (audio && songDuration) audio.currentTime = Number(event.currentTarget.value);
  };

  const closeWorld = () => {
    setIsOpen(false);
    setPlace(null);
  };

  return (
    <>
      <div className="lili-companion" aria-label="Lili, your little world guide">
        <div className="lili-speech" aria-live="polite">{message}</div>
        <LiliFigure
          mood={mood}
          onClick={handleLiliClick}
          onMouseEnter={() => { if (!isOpen && mood !== "sleepy") setMood("wave"); }}
        />
      </div>

      {isOpen && (
        <div
          className="lili-world-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeWorld();
          }}
        >
          <div
            ref={dialogRef}
            className={`lili-world-dialog${place ? " is-in-room" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={place ? PLACES.find((item) => item.id === place)?.name : "Lili's Little World Map"}
            tabIndex={-1}
          >
            <header className="lili-world-header">
              <div>
                <span className="lili-world-kicker"><Sparkles size={13} /> ALURA&apos;S LITTLE LILY WORLD</span>
                <h2>{place ? PLACES.find((item) => item.id === place)?.name : "Where shall we wander?"}</h2>
              </div>
              <button type="button" className="lili-icon-button" onClick={closeWorld} aria-label="Close little world"><X size={20} /></button>
            </header>

            {place ? (
              <div className="lili-room">
                <div className="lili-room-topline">
                  <button type="button" className="lili-back-button" onClick={() => setPlace(null)}><ArrowLeft size={15} /> Little World Map</button>
                  <span>{message}</span>
                </div>

                {place === "room" && (
                  <div className="lili-cozy-room">
                    <div className="room-window"><LocalWindow /></div>
                    <div className="room-wall">
                      <button type="button" className="room-object room-bed" onClick={() => say("A tiny nap? Lili is already yawning.", "sleepy")}>little bed<small>soft pink quilt</small></button>
                      <button type="button" className="room-object room-desk" onClick={() => say("A fresh page, just waiting for a little note.")}>study desk<small>today&apos;s little plan</small></button>
                      <button type="button" className="room-object room-mirror" onClick={() => { setRoomNote("Lili looks at her reflection, then gives you a shy little wave."); say("Do I have a petal in my hair?", "wave"); }}>mirror<small>tap to peek</small></button>
                      <button type="button" className="room-object room-wardrobe" onClick={() => say("The pink cardigan is missing... maybe it's with the butterflies?")}>wardrobe<small>one tiny cardigan</small></button>
                      <button type="button" className="room-object room-books" onClick={() => say("Lili's favorite story has a lily on every page.")}><BookOpen size={18} />bookshelf</button>
                      <button type="button" className="room-object room-photos" onClick={() => { setRoomNote("A little photo, tucked safe beside all the other favorite moments."); say("Oh! Our memories. Let's visit them together."); }}>photo shelf<small>look closer</small></button>
                      <button type="button" className="room-object room-lamp" onClick={(event) => event.currentTarget.classList.toggle("lamp-on")}><Lamp size={22} />lamp<small>tap to glow</small></button>
                      <button type="button" className="room-object room-drawer" onClick={() => { setRoomNote("Secret note: You make even ordinary days feel like a little story."); say("You found my hidden note!", "happy"); }}><Gift size={18} />secret drawer<small>psst...</small></button>
                      <button type="button" className="room-object room-door" onClick={() => { setRoomNote("Behind the little door: a tiny lily-colored gift, just for you."); say("A surprise! You found the secret door!"); }}>little door<small>look behind me</small></button>
                      <div className="room-rug" aria-hidden="true" />
                    </div>
                    <button
                      ref={polaroidRef}
                      type="button"
                      className="room-polaroid"
                      onPointerDown={(event) => {
                        dragStart.current = { x: event.clientX, y: event.clientY, moved: false };
                        event.currentTarget.setPointerCapture(event.pointerId);
                      }}
                      onPointerMove={(event) => {
                        if (!dragStart.current) return;
                        const dx = event.clientX - dragStart.current.x;
                        const dy = event.clientY - dragStart.current.y;
                        if (Math.abs(dx) + Math.abs(dy) > 5) dragStart.current.moved = true;
                        if (dragStart.current.moved) event.currentTarget.style.translate = `${dx}px ${dy}px`;
                      }}
                      onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
                      onClick={() => {
                        if (dragStart.current?.moved) {
                          dragStart.current = null;
                          return;
                        }
                        setRoomNote("A little photo, tucked safe beside all the other favorite moments.");
                        say("Oh! Our memories. Let's visit them together.");
                      }}
                      aria-label="Drag or open a little polaroid memory"
                    >
                      <span className="polaroid-snapshot">♡</span><span>our favorite day</span>
                    </button>
                    {roomNote && (
                      <div className="lili-discovery" role="status">
                        <Sparkles size={16} />{roomNote}
                        {roomNote.startsWith("A little photo") && (
                          <button type="button" onClick={() => { closeWorld(); window.setTimeout(() => document.getElementById("memory-gallery")?.scrollIntoView({ behavior: "smooth" }), 80); }}>
                            Open the memory album
                          </button>
                        )}
                      </div>
                    )}
                    <p className="lili-room-hint">Try the lamp, mirror, photo shelf, and the little drawer.</p>
                    <div className="room-delights">
                      <button type="button" className={`room-balloon${poppedBalloon ? " balloon-popped" : ""}`} onClick={() => { setPoppedBalloon(true); say("Pop! A tiny heart floated down.", "happy"); }}>balloon</button>
                      <button type="button" className={`room-dandelion${dandelionBlown ? " dandelion-blown" : ""}`} onClick={() => { setDandelionBlown(true); say("A little wish is on its way."); }}>blow a wish</button>
                      <button type="button" className={`room-butterfly${butterflyAway ? " butterfly-away" : ""}`} onClick={() => { setButterflyAway(true); say("The butterfly fluttered off with a secret: you are loved."); }}>catch the butterfly</button>
                      <button type="button" onClick={() => say("A little star says: I like doing life with you.")}>tap a star ✦</button>
                      <button type="button" className={giftRevealed ? "gift-opened" : ""} onClick={() => { setGiftRevealed(true); say("A ribbon-tied surprise, just for you!", "happy"); }}>{giftRevealed ? "your little gift is open" : "pull the ribbon 🎀"}</button>
                    </div>
                  </div>
                )}

                {place === "bakery" && (
                  <div className="lili-bakery">
                    <div className={`bakery-display${served ? " dessert-served" : ""}`} aria-live="polite">
                      <span className="bakery-dessert">{served ? "♡" : "✿"}</span>
                      <strong>{served ? `${dessert} for you!` : dessert}</strong>
                      <span>{served ? DESSERT_REACTIONS[dessert] : "Pick a treat and make it your own."}</span>
                    </div>
                    <label className="lili-select-label" htmlFor="dessert-choice">Choose a little treat</label>
                    <select id="dessert-choice" value={dessert} onChange={(event) => { setDessert(event.target.value as Dessert); setServed(false); }}>
                      {Object.keys(DESSERT_REACTIONS).map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <h3>Pick your ingredients</h3>
                    <div className="bakery-ingredients">
                      {BAKERY_INGREDIENTS.map((item) => (
                        <button key={item} type="button" className={ingredients.includes(item) ? "ingredient chosen" : "ingredient"} onClick={() => toggleIngredient(item)}>
                          {ingredients.includes(item) ? "✓ " : "+ "}{item}
                        </button>
                      ))}
                    </div>
                    <div className="bakery-last-step">
                      <label className="lili-select-label" htmlFor="dessert-topping">A finishing touch</label>
                      <select id="dessert-topping" value={topping} onChange={(event) => setTopping(event.target.value)}>
                        {["Strawberries", "Chocolate drizzle", "Tiny sugar stars", "A little lily"].map((item) => <option key={item}>{item}</option>)}
                      </select>
                      <button type="button" className="lili-primary-button" onClick={() => { setServed(true); say(`A little ${topping.toLowerCase()} treat, made with love!`); }}>
                        {served ? "Serve another" : "Bake & serve"}
                      </button>
                    </div>
                    <span className="lili-bakery-hint">{ingredients.length ? `${ingredients.length} ingredients in the bowl` : "Psst: any combination is a good combination."}</span>
                  </div>
                )}

                {place === "moonlight" && (
                  <div className="lili-moonlight">
                    <div className="moonlight-sky" aria-hidden="true"><span>✦</span><span>✧</span><span>·</span><span>✦</span><span>✧</span></div>
                    <div className={`moonlight-player${isMusicPlaying ? " is-playing" : ""}`}>
                      <div className="cassette-art"><span>♡</span><small>little memories<br />side A</small></div>
                      <div className="moonlight-track"><span>OUR LITTLE SONG</span><h3>Jatuh Suka</h3><div className="music-visualizer" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div></div>
                      <div className="moonlight-controls">
                        <button type="button" className="lili-play-button" onClick={() => { void toggleMusic(); }} aria-label={isMusicPlaying ? "Pause Jatuh Suka" : "Play Jatuh Suka"}>
                          {isMusicPlaying ? <Pause size={18} /> : <Play size={18} />}
                        </button>
                        <button type="button" className="lili-icon-button" onClick={() => { const audio = audioPlayer?.getAudioElement(); if (audio) { audio.muted = !audio.muted; setIsMuted(audio.muted); } }} aria-label={isMuted ? "Unmute music" : "Mute music"}>
                          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                      </div>
                      <input className="moonlight-progress" type="range" min="0" max={songDuration || 1} value={Math.min(songProgress, songDuration || 1)} onChange={seekMusic} aria-label="Song progress" />
                      <div className="moonlight-times"><span>{formatTime(songProgress)}</span><span>{formatTime(songDuration)}</span></div>
                    </div>
                    <p className="moonlight-note">Tap play when you feel like listening. Lili will dance along.</p>
                    <p className="lili-room-hint"><Music2 size={13} /> The song is optional; the quiet is lovely too.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="lili-map">
                <div className="lili-map-illustration">
                  <div className="map-path" aria-hidden="true" />
                  <div className="map-center"><LiliFigure mood={mood} onClick={() => say("Let's go somewhere lovely!", "happy")} onMouseEnter={() => setMood("wave")} compact /></div>
                  <button type="button" className="map-rare-lily" onClick={() => say("You found the rare rose-pink lily! Lili is doing a happy dance.", "dance")} aria-label="Find a rare lily">
                    <span>✿</span><small>a different little lily?</small>
                  </button>
                  {PLACES.map(({ id, name, detail, icon: Icon, color }) => (
                    <button key={id} type="button" className={`map-place place-${id} place-${color}`} onClick={() => enterPlace(id)}>
                      <span className="map-place-icon"><Icon size={20} /></span>
                      <span className="map-place-name">{name}</span>
                      <span className="map-place-detail">{detail}</span>
                    </button>
                  ))}
                </div>
                <div className="lili-map-footer"><span><Sparkles size={13} /> Pick a little building to visit</span><button type="button" onClick={() => say("Tap a place and I'll show you around!")}>How to explore</button></div>
              </div>
            )}

            <footer className="lili-world-footer"><span>Every little corner has a story.</span><span><Heart size={12} fill="currentColor" /> made just for you</span></footer>
          </div>
        </div>
      )}
    </>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}
