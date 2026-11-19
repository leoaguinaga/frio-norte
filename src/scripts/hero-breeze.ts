// Home hero "refresh" effect.
// On first visit: warm afternoon grade → fresh grade, 32 → 18 °C counter, and a gust of
// air leaving the split's louvres. Afterwards a quieter breeze keeps flowing.
// Markup + styles live in src/components/home/Hero.astro.
//  - Plays the intro on every visit to the home page.
//  - prefers-reduced-motion: jumps to the settled state, no canvas motion.
//  - The breeze only runs on desktop (≥1024px) and only while the hero is on screen.

const FROM = 32;
const TO = 18;
const DELAY = 350; // let the warm photo register for a beat
const TEMP_MS = 1600;
const INTRO = 3200; // the first, stronger gust
const AMBIENT = 0.4; // mist level once the intro has passed
const N = 140; // samples per ribbon path
// Fade air out before it reaches the copy column (fractions of the card width).
const FADE_FROM = 0.3;
const FADE_TO = 0.48;

type Ribbon = { pts: [number, number][]; start: number; dur: number; width: number; tail: number; alpha: number };
type Mote = { x: number; y: number; r: number; vx: number; vy: number; ph: number; al: number; delay: number };

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOutSine = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function init(): (() => void) | undefined {
  const root = document.querySelector<HTMLElement>('[data-hero-fx]');
  const canvas = root?.querySelector<HTMLCanvasElement>('[data-hero-breeze]');
  const tempEl = root?.querySelector<HTMLElement>('[data-hero-temp]');
  const photo = root?.querySelector<HTMLImageElement>('img');
  const ctx = canvas?.getContext('2d');
  const box = canvas?.parentElement; // the photo card the canvas covers
  if (!root || !canvas || !tempEl || !photo || !ctx || !box) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 1024px)');

  // Louvre strip of the split in the photo, as fractions of the image's natural size.
  const ventX0 = Number(root.dataset.ventX0 ?? 0.6);
  const ventX1 = Number(root.dataset.ventX1 ?? 0.71);
  const ventY = Number(root.dataset.ventY ?? 0.285);
  const posX = Number(root.dataset.objectX ?? 0.7); // matches object-position on the <img>

  let W = 0, H = 0;
  function size() {
    const r = box!.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas!.width = Math.round(W * dpr); canvas!.height = Math.round(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  // Photo point → card pixels, honouring object-fit: cover.
  function toCard(nx: number, ny: number): [number, number] {
    const iw = photo!.naturalWidth || 1376, ih = photo!.naturalHeight || 768;
    const s = Math.max(W / iw, H / ih);
    return [(W - iw * s) * posX + nx * iw * s, (H - ih * s) * 0.5 + ny * ih * s];
  }
  const vent = () => toCard(rnd(ventX0, ventX1), ventY);

  // Cold air leaves the louvres downward, then rolls out into the room (down-left).
  function makeRibbon(start: number, o: Partial<Ribbon> = {}): Ribbon {
    const [sx, sy] = vent();
    const reach = W * rnd(0.28, 0.45), drop = H * rnd(0.1, 0.45), fall = rnd(1.4, 2.2);
    const freq = rnd(3, 5), amp = H * rnd(0.012, 0.03), ph = rnd(0, 6.28);
    return {
      pts: Array.from({ length: N }, (_, k) => {
        const u = k / (N - 1);
        return [sx - reach * u, sy + drop * (1 - Math.pow(1 - u, fall)) + Math.sin(u * freq + ph) * amp * u];
      }),
      start,
      dur: o.dur ?? rnd(1700, 2300),
      width: o.width ?? rnd(1.6, 2.8),
      tail: Math.round(rnd(45, 65)),
      alpha: o.alpha ?? rnd(0.65, 0.9),
    };
  }
  function makeMote(first = false): Mote {
    const [x, y] = vent();
    return { x, y, r: rnd(0.7, 1.8), vx: -rnd(35, 75), vy: rnd(12, 40), ph: rnd(0, 6.28), al: rnd(0.3, 0.6), delay: first ? rnd(0, 1600) : 0 };
  }

  function drawRibbon(rb: Ribbon, t: number) {
    const p = (t - rb.start) / rb.dur;
    if (p <= 0 || p >= 1) return;
    const head = easeInOutSine(p) * (N + rb.tail);
    const from = Math.max(0, Math.floor(head - rb.tail)), to = Math.min(N - 1, Math.floor(head));
    if (to - from < 2) return;
    // One continuous path per ribbon; the tail → head fade lives in a gradient along x.
    const grad = (r: number, g: number, b: number, mult: number) => {
      const gr = ctx!.createLinearGradient(rb.pts[from][0], 0, rb.pts[to][0], 0);
      for (let s = 0; s <= 8; s++) {
        const k = from + ((to - from) * s) / 8;
        const inWin = (k - (head - rb.tail)) / rb.tail;
        const bell = Math.sin(Math.PI * Math.min(1, Math.max(0, inWin)));
        const a = rb.alpha * bell * smooth(W * FADE_FROM, W * FADE_TO, rb.pts[Math.round(k)][0]) * mult;
        gr.addColorStop(s / 8, `rgba(${r},${g},${b},${a})`);
      }
      return gr;
    };
    const path = (dy: number) => {
      ctx!.beginPath();
      ctx!.moveTo(rb.pts[from][0], rb.pts[from][1] + dy);
      for (let k = from + 1; k <= to; k++) ctx!.lineTo(rb.pts[k][0], rb.pts[k][1] + dy);
    };
    // volume of air: a wide cyan haze so it reads over light areas too
    path(0); ctx!.strokeStyle = grad(140, 210, 238, 0.2); ctx!.lineWidth = rb.width * 12; ctx!.stroke();
    // two thin strands with a cool glow
    ctx!.shadowBlur = 6; ctx!.shadowColor = 'rgba(90, 180, 225, 0.6)';
    path(0); ctx!.strokeStyle = grad(255, 255, 255, 1); ctx!.lineWidth = rb.width; ctx!.stroke();
    path(rb.width * 4); ctx!.strokeStyle = grad(255, 255, 255, 0.7); ctx!.lineWidth = rb.width * 0.6; ctx!.stroke();
    ctx!.shadowBlur = 0;
  }

  // ---- State
  let ribbons: Ribbon[] = [];
  let motes: Mote[] = [];
  let el = 0, last = 0, nextGust = 0, raf = 0, running = false, visible = true, settled = false, counted = false, built = false;
  const timers: number[] = [];

  function settle() {
    settled = true;
    root!.classList.add('settled');
  }

  function build() {
    size();
    ribbons = el < DELAY + INTRO ? Array.from({ length: 7 }, (_, i) => makeRibbon(i * 170 + rnd(0, 120))) : [];
    motes = Array.from({ length: Math.round(W / 40) }, () => makeMote(true));
    built = true;
  }

  function frame(now: number) {
    // Accumulated clock: pausing (off-screen, hidden tab) resumes where it left off.
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    el += dt * 1000;
    const t = el - DELAY;
    const air = desktop.matches;
    ctx!.clearRect(0, 0, W, H);
    ctx!.lineCap = 'round';
    if (t >= 0) {
      if (air) {
        if (t > INTRO - 1200 && t >= nextGust) {
          ribbons.push(makeRibbon(t, { alpha: rnd(0.36, 0.5), dur: rnd(3400, 4600), width: rnd(1.4, 2.2) }));
          nextGust = t + rnd(1100, 1900);
        }
        ribbons = ribbons.filter((rb) => t < rb.start + rb.dur);
        for (const rb of ribbons) drawRibbon(rb, t);

        const glob = smooth(0, 500, t) * (1 - (1 - AMBIENT) * smooth(INTRO - 1200, INTRO, t));
        const speed = 1 - 0.45 * smooth(INTRO - 1200, INTRO, t);
        ctx!.fillStyle = '#fff';
        for (const m of motes) {
          if (t < m.delay) continue;
          m.x += m.vx * speed * dt;
          m.y += (m.vy * speed + Math.sin(t / 500 + m.ph) * 8) * dt;
          if (m.x < W * FADE_FROM || m.y > H) Object.assign(m, makeMote());
          ctx!.globalAlpha = m.al * glob * smooth(W * FADE_FROM, W * FADE_TO, m.x);
          ctx!.beginPath(); ctx!.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx!.fill();
        }
        ctx!.globalAlpha = 1;
      }
      if (!counted) {
        const tp = Math.min(1, Math.max(0, (t - 150) / TEMP_MS));
        tempEl!.textContent = String(Math.round(FROM - (FROM - TO) * easeOutCubic(tp)));
        if (!settled && tp > 0.45) settle(); // icon + label swap mid-count
        if (tp >= 1) counted = true;
      }
    }
    // Nothing left to animate on mobile once the counter has finished.
    if (!air && counted) { stop(); return; }
    raf = requestAnimationFrame(frame);
  }

  function stop() { cancelAnimationFrame(raf); raf = 0; running = false; }
  function start() {
    if (running || !visible || reduced) return;
    if (counted && !desktop.matches) return;
    if (!built) build();
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function begin() {
    if (reduced) {
      // Settled straight away: no warm-up, no counting, no moving air.
      root!.classList.add('fresh');
      settle();
      counted = true;
      tempEl!.textContent = String(TO);
      return;
    }
    timers.push(window.setTimeout(() => root!.classList.add('fresh'), DELAY));
    start();
  }

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
  io.observe(box);
  const ro = new ResizeObserver(() => { if (built) size(); });
  ro.observe(box);
  const onMq = () => start();
  desktop.addEventListener('change', onMq);

  // Start once the photo is in, so the warm frame is actually seen.
  if (photo.complete && photo.naturalWidth) begin();
  else photo.addEventListener('load', begin, { once: true });

  return () => {
    stop();
    timers.forEach(clearTimeout);
    io.disconnect();
    ro.disconnect();
    desktop.removeEventListener('change', onMq);
    photo.removeEventListener('load', begin);
  };
}

let cleanup: (() => void) | undefined;
document.addEventListener('astro:page-load', () => { cleanup?.(); cleanup = init(); });
document.addEventListener('astro:before-swap', () => { cleanup?.(); cleanup = undefined; });
