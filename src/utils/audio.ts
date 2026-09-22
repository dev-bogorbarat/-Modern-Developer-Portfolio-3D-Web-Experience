// Inisialisasi Audio Context dan Efek Suara Interaktif
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Ambil preferensi suara dari localStorage jika ada
try {
  const saved = localStorage.getItem('portfolio_sound_enabled');
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
} catch {
  // Ignore localStorage errors
}

// Inisialisasi lazy agar mematuhi aturan browser autoplay
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  try {
    localStorage.setItem('portfolio_sound_enabled', String(enabled));
  } catch {
    // Ignore
  }
}

export function toggleSound(): boolean {
  const next = !soundEnabled;
  setSoundEnabled(next);
  if (next) {
    playClickSound();
  }
  return next;
}

// Fungsi untuk membuat nada futuristik ringan saat Hover
let lastHoverTime = 0;
export function playHoverSound() {
  if (!soundEnabled) return;

  // Throttle agar tidak menumpuk saat kursor bergerak cepat
  const now = Date.now();
  if (now - lastHoverTime < 50) return;
  lastHoverTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine'; // Tipe gelombang suara: sine
    osc.frequency.setValueAtTime(440, ctx.currentTime); // Frekuensi nada awal (440 Hz)
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // Nada naik cepat (880 Hz)

    gain.gain.setValueAtTime(0.05, ctx.currentTime); // Volume rendah agar lembut
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Audio tidak didukung atau diblokir
  }
}

// Fungsi untuk membuat suara saat Click
export function playClickSound() {
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Audio tidak didukung atau diblokir
  }
}

// Fungsi efek suara pantulan fisik (Cannon.es bounce resonance)
let lastBounceTime = 0;
export function playBounceSound(pitch = 320) {
  if (!soundEnabled) return;
  const now = Date.now();
  if (now - lastBounceTime < 90) return;
  lastBounceTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.6, ctx.currentTime + 0.04);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.7, ctx.currentTime + 0.14);

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch {
    // Audio tidak didukung atau diblokir
  }
}

// Inisialisasi global event listeners untuk semua tombol, link, dan elemen interaktif
export function initGlobalSoundEffects(): () => void {
  if (typeof window === 'undefined') return () => {};

  const handlePointerOver = (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest(
      'button, a, input[type="button"], input[type="submit"], select, [role="button"], .interactive-sound'
    );
    if (target) {
      playHoverSound();
    }
  };

  const handlePointerDown = (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest(
      'button, a, input[type="button"], input[type="submit"], select, [role="button"], .interactive-sound'
    );
    if (target) {
      playClickSound();
    }
  };

  // Expose ke global window untuk kemudahan pengujian atau pemanggilan skrip inline
  try {
    (window as unknown as { playHoverSound: typeof playHoverSound; playClickSound: typeof playClickSound }).playHoverSound = playHoverSound;
    (window as unknown as { playHoverSound: typeof playHoverSound; playClickSound: typeof playClickSound }).playClickSound = playClickSound;
  } catch {
    // Ignore
  }

  window.addEventListener('mouseover', handlePointerOver, { passive: true });
  window.addEventListener('click', handlePointerDown, { passive: true });

  return () => {
    window.removeEventListener('mouseover', handlePointerOver);
    window.removeEventListener('click', handlePointerDown);
  };
}
