// Gentle synthesized Web Audio API sound effects for Alura's Little Lily World
// Subtle, lightweight, zero external MP3 dependencies, never interrupts background music.

let audioCtx: AudioContext | null = null;
let sfxEnabled = true;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioCtxClass();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSfxEnabled(): boolean {
  return sfxEnabled;
}

export function setSfxEnabled(enabled: boolean) {
  sfxEnabled = enabled;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("alura_sfx_enabled", enabled ? "1" : "0");
    } catch {}
  }
}

export function toggleSfx(): boolean {
  setSfxEnabled(!sfxEnabled);
  return sfxEnabled;
}

// 1. Soft Camera Shutter Sound (White noise click + slight snap)
export function playCameraShutter() {
  if (!sfxEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;

    // First click (mechanical shutter opening)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1400, t);
    osc1.frequency.exponentialRampToValueAtTime(180, t + 0.04);
    gain1.gain.setValueAtTime(0.12, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.05);

    // Second click (mechanical shutter closing)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(900, t + 0.07);
    osc2.frequency.exponentialRampToValueAtTime(120, t + 0.12);
    gain2.gain.setValueAtTime(0.09, t + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.13);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t + 0.07);
    osc2.stop(t + 0.13);

    // Subtle white noise burst (air / mirror flick)
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2500, t);
    filter.Q.setValueAtTime(2, t);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.05);
  } catch {}
}

// 2. Gentle Paper Sound (Soft bandpass noise flutter)
export function playPaperSound() {
  if (!sfxEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const duration = 0.18;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const envelope = Math.sin(progress * Math.PI) * Math.exp(-progress * 2);
      data[i] = (Math.random() * 2 - 1) * envelope;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.exponentialRampToValueAtTime(800, t + duration);
    filter.Q.setValueAtTime(1.5, t);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(t);
    noise.stop(t + duration);
  } catch {}
}

// 3. Delicate Sparkle Chime (Gentle celestial bell harmonic for lily / discovery)
export function playSparkleSound() {
  if (!sfxEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    // Pentatonic high notes: E6, G#6, B6, E7
    const freqs = [1318.51, 1661.22, 1975.53, 2637.02];

    freqs.forEach((freq, index) => {
      const delay = index * 0.045;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + delay);

      gain.gain.setValueAtTime(0.045, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + delay + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + delay);
      osc.stop(t + delay + 0.35);
    });
  } catch {}
}

// 4. Gentle Heartbeat Sound (Low resonant warm double pulse)
export function playHeartbeatSound() {
  if (!sfxEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;

    const playThud = (time: number, freq: number, vol: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.08);

      gain.gain.setValueAtTime(vol, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.12);
    };

    // Lub-dub
    playThud(t, 90, 0.14);
    playThud(t + 0.12, 75, 0.1);
  } catch {}
}

// 5. Cute Pop Sound (For stickers, buttons, bows)
export function playPopSound() {
  if (!sfxEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(950, t + 0.06);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  } catch {}
}

// 6. Water Drop & Ripple (For watering can and wishing well)
export function playWaterDrop() {
  if (!sfxEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1100, t);
    osc.frequency.exponentialRampToValueAtTime(580, t + 0.09);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  } catch {}
}

// 7. Confetti Pop (For mystery gift box & rewards)
export function playConfettiPop() {
  if (!sfxEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;

    // Pop tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);

    // Light sparkle
    playSparkleSound();
  } catch {}
}

// 8. Sweet Win Chime (For claw machine, quiz win, butterfly catch)
export function playChimeWin() {
  if (!sfxEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const delay = idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + delay);

      gain.gain.setValueAtTime(0.06, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + delay);
      osc.stop(t + delay + 0.45);
    });
  } catch {}
}


