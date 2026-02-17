// Lightweight SoundManager using WebAudio (lazy init)
const SoundManager = (function () {
  let ctx = null;
  let masterGain = null;

  function init() {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.12; // overall volume
      masterGain.connect(ctx.destination);
    } catch (e) {
      console.warn("AudioContext not available", e);
      ctx = null;
    }
  }

  function tone(frequency, type = "sine", duration = 0.07, when = 0) {
    if (!ctx) init();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = frequency;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(masterGain);
    const now = ctx.currentTime + when;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(1.0, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);
    o.start(now);
    o.stop(now + duration + 0.02);
  }

  function noise(duration = 0.12, when = 0) {
    if (!ctx) init();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    src.connect(g);
    g.connect(masterGain);
    const now = ctx.currentTime + when;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.8, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    src.start(now);
    src.stop(now + duration + 0.02);
  }

  // public
  return {
    init,
    play(name) {
      // Lazy init on first play
      if (!ctx) init();
      if (!ctx) return;
      switch (name) {
        case "eat":
          tone(880, "sawtooth", 0.08);
          tone(1320, "sine", 0.06, 0.03);
          break;
        case "gameover":
          tone(220, "sine", 0.35);
          noise(0.12, 0.04);
          break;
        case "move":
          tone(660, "sine", 0.04);
          break;
        case "whack":
          noise(0.06);
          tone(880, "square", 0.05, 0.02);
          break;
        case "pop":
          tone(1100, "sine", 0.06);
          break;
        case "match":
          tone(1200, "sine", 0.08);
          tone(1500, "sine", 0.05, 0.04);
          break;
        case "win":
          tone(1400, "sine", 0.14);
          tone(1600, "sine", 0.12, 0.06);
          break;
        case "click":
          tone(700, "square", 0.04);
          break;
        case "start":
          tone(900, "sine", 0.06);
          break;
        default:
          tone(800, "sine", 0.03);
      }
    },
  };
})();

export default SoundManager;
