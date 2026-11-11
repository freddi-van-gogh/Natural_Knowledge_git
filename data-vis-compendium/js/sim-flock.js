// SPDX-License-Identifier: GPL-3.0-only
// Stop 1: the flock slider. Each bird steers by its nearest k neighbours (topological, not by
// distance): it matches their heading, drifts towards them, and keeps a little room. At k = 0
// there are no neighbours at all, only random kicks: Brownian motion, and no order.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const SPEED = 1.6;          // flocking speed, pixels per 60th of a second
  const JOSTLE_SPEED = 1.1;   // speed when only jostled (k = 0)
  const ALIGN = 0.08, COHERE = 0.0015, SEPARATE = 0.6, ROOM2 = 100, NOISE = 0.12, KICK = 1.4;
  const TICK = 1 / 60, MAX_DT = 1 / 30;   // the rates above are per TICK; a stalled frame counts as MAX_DT

  // Room to measure every bird's distance to every other, allocated once and reused each step.
  const scratchFor = (n) => ({ dx: new Float64Array(n), dy: new Float64Array(n), d2: new Float64Array(n), near: Array.from({ length: n }, (_, j) => j) });

  // A flock: n birds on a w × h canvas, each watching its nearest k, with its own random numbers.
  function create(n, w, h, rand, k = 0) {
    const birds = [];
    for (let i = 0; i < n; i++) {
      const a = rand() * Math.PI * 2;
      birds.push({ x: rand() * w, y: rand() * h, vx: Math.cos(a) * SPEED, vy: Math.sin(a) * SPEED });
    }
    return { birds, k, w, h, rand, scratch: scratchFor(n) };
  }

  // Moves the flock on by dt seconds, so it flies the same on a 120 Hz screen as on a 60 Hz one:
  // the steering scales with dt and each bird keeps its speed. The random kicks are a random walk,
  // which spreads with the square root of time, so they scale with √dt (divided by √f here,
  // before the whole push is multiplied by f).
  function step(flock, dt = TICK) {
    const { birds, w, h, rand } = flock;
    const n = birds.length, f = Math.min(dt, MAX_DT) / TICK, rf = Math.sqrt(f);
    if (!(f > 0)) return;
    const kk = Math.min(flock.k, n - 1);
    if (!flock.scratch || flock.scratch.d2.length !== n) flock.scratch = scratchFor(n);
    const { dx: DX, dy: DY, d2: D2, near } = flock.scratch;
    const byDistance = (p, q) => D2[p] - D2[q];
    for (const b of birds) {
      let ax, ay;
      if (kk > 0) {
        for (let j = 0; j < n; j++) {
          const o = birds[j];
          let dx = o.x - b.x, dy = o.y - b.y;
          if (dx > w / 2) dx -= w; else if (dx < -w / 2) dx += w;
          if (dy > h / 2) dy -= h; else if (dy < -h / 2) dy += h;
          DX[j] = dx; DY[j] = dy; D2[j] = o === b ? Infinity : dx * dx + dy * dy;
          near[j] = j;
        }
        near.sort(byDistance);
        let cx = 0, cy = 0, vx = 0, vy = 0, sx = 0, sy = 0;
        for (let i = 0; i < kk; i++) {
          const j = near[i], o = birds[j];
          cx += DX[j]; cy += DY[j]; vx += o.vx; vy += o.vy;
          if (D2[j] < ROOM2) { sx -= DX[j] / (D2[j] + 1); sy -= DY[j] / (D2[j] + 1); }
        }
        ax = (vx / kk - b.vx) * ALIGN + (cx / kk) * COHERE + sx * SEPARATE + ((rand() - 0.5) * NOISE) / rf;
        ay = (vy / kk - b.vy) * ALIGN + (cy / kk) * COHERE + sy * SEPARATE + ((rand() - 0.5) * NOISE) / rf;
      } else {
        ax = ((rand() - 0.5) * KICK) / rf;
        ay = ((rand() - 0.5) * KICK) / rf;
      }
      b.vx += ax * f; b.vy += ay * f;
      const s = Math.hypot(b.vx, b.vy) || 1, v = kk > 0 ? SPEED : JOSTLE_SPEED;
      b.vx = (b.vx / s) * v; b.vy = (b.vy / s) * v;
    }
    for (const b of birds) {
      b.x = (((b.x + b.vx * f) % w) + w) % w;
      b.y = (((b.y + b.vy * f) % h) + h) % h;
    }
  }

  // Polarization: how much the flock heads one way (1) or every way (0).
  function order(birds) {
    let sx = 0, sy = 0;
    for (const b of birds) {
      const s = Math.hypot(b.vx, b.vy) || 1;
      sx += b.vx / s; sy += b.vy / s;
    }
    return Math.hypot(sx, sy) / birds.length;
  }

  function clipFor(k) {
    if (k <= 0) return "none";
    if (k <= 4) return "low";
    if (k <= 9) return "starlings";
    if (k <= 15) return "high";
    return "herd";
  }

  NKC.flock = { create, step, order, clipFor, SPEED, JOSTLE_SPEED };

  // ------------------------------------------------------------------ the slider in the page
  const BETWEEN = { low: "Small groups form and break apart.", high: "Bigger, steadier, slower to turn." };

  const TICKS = [
    { left: "0", cls: "first", value: "0", text: "no order: Brownian motion" },
    { left: "32.5%", cls: "", value: "6–7", text: "Roman starlings", label: "measured" },
    { left: "auto", cls: "last", value: "20", text: "herding", label: "illustration" },
  ];
  const chip = (label) => (label ? ` <span class="label label-${label}">${NKC.esc(NKC.LABELS[label].text)}</span>` : "");

  // The slider's markup. The ticks sit under their values on wide screens; on narrow ones the
  // same words appear as a short key instead, so they never collide.
  function uiHtml() {
    const ticks = TICKS.map((k) =>
      `<span class="tick ${k.cls}" style="left:${k.left}"><b>${k.value}</b><span class="t">${NKC.esc(k.text)}</span>${chip(k.label)}</span>`).join("");
    const key = TICKS.map((k) => `<li><b>${k.value}</b> ${NKC.esc(k.text)}${chip(k.label)}</li>`).join("");
    return `<canvas class="flock-canvas" height="300" role="img" aria-label="A simulated flock of birds. Each bird follows as many of its nearest neighbours as the slider sets; with none, they wander at random."></canvas>` +
      `<div class="flock-ui">` +
      `<input type="range" min="0" max="20" step="1" value="0" aria-label="How many neighbours each bird watches">` +
      `<div class="flock-ticks" aria-hidden="true">${ticks}</div>` +
      `<ul class="flock-key">${key}</ul>` +
      `<p class="flock-readout" aria-live="polite">Each bird watches its nearest <b class="k">0</b> <span class="kw">neighbours</span>.</p>` +
      `<p class="flock-try">Try other numbers.</p>` +
      `<p class="flock-note">A 2013 study of the Rome flocks found that six or seven gives the best balance between the flock agreeing and each bird's effort.</p>` +
      `<div class="flock-clip"></div></div>`;
  }
  NKC.flock.uiHtml = uiHtml;

  NKC.registerVisual("flock", (el, opts) => {
    const clips = (opts && opts.clips) || {};
    el.innerHTML = uiHtml();
    const canvas = el.querySelector("canvas"), ctx = canvas.getContext("2d");
    const input = el.querySelector("input"), kOut = el.querySelector(".k"), kWord = el.querySelector(".kw");
    const clipEl = el.querySelector(".flock-clip");
    const rand = NKC.rng(Date.now() >>> 0);
    let W = 600, H = 300, flock = null, frame = 0, last = 0, band = null;

    function size() {
      const dpr = root.devicePixelRatio || 1;
      W = Math.max(240, canvas.clientWidth || el.clientWidth || 600);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!flock) flock = create(W < 500 ? 120 : 200, W, H, rand);
      flock.w = W;
    }
    function draw() {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#F6B98F"); g.addColorStop(0.6, "#C98AA8"); g.addColorStop(1, "#5D5A8A");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(25,20,35,0.85)";
      for (const b of flock.birds) {
        const a = Math.atan2(b.vy, b.vx), c = Math.cos(a), s = Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(b.x + 4 * c, b.y + 4 * s);
        ctx.lineTo(b.x - 3 * c - 2.2 * s, b.y - 3 * s + 2.2 * c);
        ctx.lineTo(b.x - 3 * c + 2.2 * s, b.y - 3 * s - 2.2 * c);
        ctx.fill();
      }
    }
    function showClip(k) {
      const next = clipFor(k);
      if (next === band) return;            // don't interrupt a video that's playing
      band = next;
      if (next === "none") clipEl.innerHTML = "";
      else if (BETWEEN[next]) clipEl.innerHTML = `<p>${BETWEEN[next]}</p>`;
      else if (next === "starlings") clipEl.innerHTML = [clips.starlings, clips.drones].filter(Boolean).map(NKC.videoCardHtml).join("");
      else clipEl.innerHTML = clips.herd ? NKC.videoCardHtml(clips.herd) : "";
      NKC.mountVideo(clipEl);
    }
    function onInput() {
      const k = Number(input.value);
      flock.k = k;
      kOut.textContent = String(k);
      kWord.textContent = k === 1 ? "neighbour" : "neighbours";
      showClip(k);
    }
    function loop(now) {
      step(flock, last ? (now - last) / 1000 : TICK);
      last = now;
      draw();
      frame = root.requestAnimationFrame(loop);
    }
    input.addEventListener("input", onInput);
    size();
    onInput();
    draw();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => { size(); draw(); }).observe(canvas);
    return {
      start() { if (!frame) { last = 0; frame = root.requestAnimationFrame(loop); } },
      stop() { root.cancelAnimationFrame(frame); frame = 0; },
      drawStill() { draw(); },
    };
  });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
