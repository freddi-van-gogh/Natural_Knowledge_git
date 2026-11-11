// SPDX-License-Identifier: GPL-3.0-only
// Stop 3: the chemical pattern dish. The Gray–Scott model: two chemicals spread through a dish.
// One (u) is fed in and used up; the other (v) breeds in it and is washed out. Two numbers, the
// feed and the wash-out, decide whether the dish grows spots that divide, worms, a maze, spirals,
// or nothing at all. A model of a dish, not a dish.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const N = 192;                   // the dish is N × N cells, and wraps round at its edges
  const DU = 0.16, DV = 0.08;      // how fast u and v spread
  const STEPS_PER_SECOND = 600, MAX_STEPS_PER_FRAME = 12, MAX_DT = 1 / 30;
  const STILL_STEPS = 400;         // the still frame under reduced motion: this many steps from a rinse

  // A dish of fresh u with a few seeds of v in it.
  function create(seedRand) {
    const n = N * N;
    const state = { u: new Float32Array(n), v: new Float32Array(n), u2: new Float32Array(n), v2: new Float32Array(n) };
    rinse(state, seedRand);
    return state;
  }

  // Drops some v into a disc of radius r around cell (px, py).
  function poke(state, px, py, r, rand) {
    const cx = Math.floor(px), cy = Math.floor(py);
    for (let y = -r; y <= r; y++) {
      for (let x = -r; x <= r; x++) {
        if (x * x + y * y > r * r) continue;
        const i = ((((cy + y) % N) + N) % N) * N + ((((cx + x) % N) + N) % N);
        state.v[i] = 0.5 + rand() * 0.25;
        state.u[i] = 0.5;
      }
    }
  }

  // Back to fresh u everywhere, with three seeds.
  function rinse(state, rand) {
    state.u.fill(1);
    state.v.fill(0);
    poke(state, N / 2, N / 2, 14, rand);
    poke(state, N / 3, N / 3, 10, rand);
    poke(state, (2 * N) / 3, N / 2.5, 10, rand);
  }

  // One step: u + D_u ∇²u − uv² + f(1 − u) and v + D_v ∇²v + uv² − (f + k)v, where ∇² is a
  // cell's four neighbours minus four times itself. The new values go into u2 and v2, which
  // then swap places with u and v.
  function step(state, f, k) {
    const { u: U, v: V, u2: U2, v2: V2 } = state;
    for (let y = 0; y < N; y++) {
      const y0 = y * N, ym = (y === 0 ? N - 1 : y - 1) * N, yp = (y === N - 1 ? 0 : y + 1) * N;
      for (let x = 0; x < N; x++) {
        const xm = x === 0 ? N - 1 : x - 1, xp = x === N - 1 ? 0 : x + 1, i = y0 + x;
        const u = U[i], v = V[i], uvv = u * v * v;
        U2[i] = u + DU * (U[ym + x] + U[yp + x] + U[y0 + xm] + U[y0 + xp] - 4 * u) - uvv + f * (1 - u);
        V2[i] = v + DV * (V[ym + x] + V[yp + x] + V[y0 + xm] + V[y0 + xp] - 4 * v) + uvv - (f + k) * v;
      }
    }
    state.u = U2; state.v = V2; state.u2 = U; state.v2 = V;
  }

  // The readout: the feed decides, and the wash-out only matters between 0.012 and 0.03.
  function regime(f, k) {
    if (f < 0.012) return "Starved: everything fades.";
    if (f < 0.03) return k < 0.055 ? "Waves and spirals." : "Spots that split like cells.";
    if (f < 0.045) return "Worms and stripes.";
    if (f < 0.066) return "A maze that fills the dish.";
    return "Flooded: the pattern dissolves.";
  }

  // The sliders run 0…1000; these turn them into the feed f and the wash-out k.
  const feedOf = (x) => 0.004 + (0.076 * x) / 1000;
  const killOf = (x) => 0.040 + (0.030 * x) / 1000;

  // Model steps for a frame that took dt seconds: a stalled frame counts as MAX_DT, and a slow
  // device gets a slower dish rather than a stuttering page.
  const stepsFor = (dt) => Math.min(MAX_STEPS_PER_FRAME, Math.round(Math.min(dt, MAX_DT) * STEPS_PER_SECOND));

  // The sliders' opening positions, the author's: the dish pulses with rings and waves.
  const FEED_START = 245, KILL_START = 310;

  // The still frame under reduced motion: the dish rinsed, then STILL_STEPS steps at the sliders'
  // feed and wash-out (the opening ones unless given).
  function still(state, rand, f = feedOf(FEED_START), k = killOf(KILL_START)) {
    rinse(state, rand);
    for (let i = 0; i < STILL_STEPS; i++) step(state, f, k);
    return state;
  }

  NKC.dish = { N, DU, DV, STEPS_PER_SECOND, MAX_STEPS_PER_FRAME, create, step, rinse, poke, regime, feedOf, killOf, stepsFor, still };

  // ------------------------------------------------------------------ the dish in the page
  // v drawn from paper (none) through verdigris to blue-black (v of about 0.4 and more).
  const SHADE = 2.6;
  const RAMP = (function () {
    const C = NKC.COLOURS, rgb = (h) => [1, 3, 5].map((j) => parseInt(h.slice(j, j + 2), 16));
    const stops = [rgb(C.paper), rgb(C.verdigris), rgb(C.blueBlack)], out = new Uint8ClampedArray(256 * 3);
    for (let j = 0; j < 256; j++) {
      const t = (j / 255) * 2, a = stops[t < 1 ? 0 : 1], b = stops[t < 1 ? 1 : 2], s = t < 1 ? t : t - 1;
      for (let c = 0; c < 3; c++) out[j * 3 + c] = Math.round(a[c] + (b[c] - a[c]) * s);
    }
    return out;
  })();

  function paint(state, img) {
    const d = img.data, V = state.v;
    for (let i = 0, p = 0; i < V.length; i++, p += 4) {
      const j = Math.min(255, (V[i] * SHADE * 255) | 0) * 3;
      d[p] = RAMP[j]; d[p + 1] = RAMP[j + 1]; d[p + 2] = RAMP[j + 2]; d[p + 3] = 255;
    }
  }

  // Tick labels: [left, text, class]. The two blanks sit flush with the ends so they never run off.
  const FEED_TICKS = [["0", "blank", "first"], ["27%", "spots that divide"], ["52%", "worms"], ["77%", "a maze"], ["", "blank", "last"]];
  const KILL_TICKS = [["30%", "waves and spirals"], ["67%", "spots and worms"], ["93%", "fades"]];
  const ticksHtml = (ticks) => `<div class="dish-ticks">${ticks.map(([left, text, cls]) =>
    `<span${cls ? ` class="${cls}"` : ""}${left ? ` style="left:${left}"` : ""}>${NKC.esc(text)}</span>`).join("")}</div>`;

  function uiHtml() {
    return `<div class="dish-ui">` +
      `<canvas class="dish-canvas" width="${N}" height="${N}" role="img" aria-label="A model dish of two chemicals that react and spread, forming spots, worms, a maze, or nothing as the feed and wash-out sliders change. Click or tap it to drop more in."></canvas>` +
      `<label>Feed<input type="range" name="feed" min="0" max="1000" value="${FEED_START}"></label>` +
      ticksHtml(FEED_TICKS) +
      `<label>Wash-out<input type="range" name="kill" min="0" max="1000" value="${KILL_START}"></label>` +
      ticksHtml(KILL_TICKS) +
      `<em class="dish-hint">if the screen is all white or blue, try moving this around</em>` +
      `<div class="dish-buttons"><button type="button" class="dish-drop">Drop some in</button>` +
      `<button type="button" class="dish-rinse">Rinse the dish</button></div>` +
      `<p class="dish-read"><span class="dish-regime" aria-live="polite">${NKC.esc(regime(feedOf(FEED_START), killOf(KILL_START)))}</span> ` +
      `<span class="label label-illustration">${NKC.esc(NKC.LABELS.illustration.text)}</span></p>` +
      `</div>`;
  }
  NKC.dish.uiHtml = uiHtml;

  NKC.registerVisual("dish", (el) => {
    el.innerHTML = uiHtml();
    const canvas = el.querySelector(".dish-canvas"), ctx = canvas.getContext("2d");
    const img = ctx.createImageData(N, N);
    const feed = el.querySelector('input[name="feed"]'), kill = el.querySelector('input[name="kill"]');
    const readout = el.querySelector(".dish-regime");
    const rand = NKC.rng(Date.now() >>> 0);
    const state = create(rand);
    let f = 0, k = 0, frame = 0, last = 0;

    function draw() { paint(state, img); ctx.putImageData(img, 0, 0); }
    function onInput() {
      f = feedOf(Number(feed.value));
      k = killOf(Number(kill.value));
      const now = regime(f, k);
      if (readout.textContent !== now) readout.textContent = now;   // a live region: speak only on a change
    }
    // A drop while the dish is paused (or still, under reduced motion) starts it first, through
    // the same Play button the reader would press, so the drop is never lost.
    function wake() {
      if (frame) return;
      const toggle = el.querySelector(":scope > .anim-toggle");
      if (toggle) toggle.click();
    }
    function loop(now) {
      const n = stepsFor(last ? (now - last) / 1000 : 1 / 60);
      last = now;
      for (let i = 0; i < n; i++) step(state, f, k);
      draw();
      frame = root.requestAnimationFrame(loop);
    }
    canvas.addEventListener("click", (e) => {
      wake();
      const r = canvas.getBoundingClientRect();
      poke(state, ((e.clientX - r.left) / r.width) * N, ((e.clientY - r.top) / r.height) * N, 8, rand);
      draw();
    });
    el.querySelector(".dish-drop").addEventListener("click", () => {
      wake();
      for (let n = 0; n < 4; n++) poke(state, rand() * N, rand() * N, 7, rand);
      draw();
    });
    el.querySelector(".dish-rinse").addEventListener("click", () => { rinse(state, rand); draw(); });
    feed.addEventListener("input", onInput);
    kill.addEventListener("input", onInput);
    onInput();
    draw();
    return {
      start() { if (!frame) { last = 0; frame = root.requestAnimationFrame(loop); } },
      stop() { root.cancelAnimationFrame(frame); frame = 0; },
      drawStill() { still(state, rand, f, k); draw(); },
    };
  });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
