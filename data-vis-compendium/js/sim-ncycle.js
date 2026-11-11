// SPDX-License-Identifier: GPL-3.0-only
// Stop 6.1: the nitrogen cycle, with the living things as knobs. Six pools of nitrogen (the air,
// ammonium, nitrite, nitrate, the trees, and their dead leaves) and six steps between them, each
// done by a different living thing, plus a leaf fall that never stops. Every step but fixation
// moves a share of its source pool; fixation draws on the air in proportion to what is left of it.
// The air is a pool too, so no nitrogen is made or lost. The shape of the cycle, not measured rates.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const C = NKC.COLOURS;   // the series' palette, from anim.js

  // The six steps, top to bottom as the sliders show them. from and to are pools.
  const STEPS = [
    { id: "fix", name: "Nitrogen-fixing bacteria: N₂ → ammonium", from: "n2", to: "nh4", bug: true },
    { id: "amo", name: "Ammonia-oxidizing bacteria: ammonium → nitrite", from: "nh4", to: "no2", bug: true },
    { id: "nob", name: "Nitrite-oxidizing bacteria: nitrite → nitrate", from: "no2", to: "no3", bug: true },
    { id: "up", name: "Trees take up nitrate", from: "no3", to: "org" },
    { id: "dec", name: "Decomposers like fungi: dead leaves → ammonium", from: "dead", to: "nh4", fungi: true },
    { id: "den", name: "Denitrifying bacteria: nitrate → N₂", from: "no3", to: "n2", bug: true },
  ];
  const FALL = { id: "fall", from: "org", to: "dead" };   // the leaf fall: fixed, and nothing kills it
  const ARROWS = STEPS.concat(FALL);

  const PRESET = { fix: 40, amo: 10, nob: 40, up: 50, dec: 50, den: 70 };   // % of BASE
  const BASE = { fix: 2.0, amo: 0.14, nob: 0.5, up: 0.06, dec: 0.08, den: 0.03 };
  const LEAF_FALL = 0.05;
  const START = { n2: 1000, nh4: 30, no2: 6, no3: 40, org: 60, dead: 25 };
  const FULL_AIR = 1000;           // fixation runs at its full rate while the air holds this much
  const NITRITE_TOXIC = 40, TREES_STARVING = 8;

  // One colour per pool; a step's slider and dots take the colour of the pool it fills and leaves.
  const COLOURS = { n2: "#7A8795", nh4: "#2A9D8F", no2: "#1F4E8C", no3: "#6B3A6E", org: "#2E6B35", dead: "#B8601E" };
  const TEXT = {
    fungi: "decomposers like fungi", bacteria: "environmental bacteria",
    n2: "atmospheric nitrogen N₂", nh4: "ammonium NH₄⁺", no2: "nitrite NO₂⁻", no3: "nitrate NO₃⁻", org: "trees", dead: "dead leaves",
  };
  const POOL_NAMES = { n2: "atmospheric nitrogen", nh4: "ammonium", no2: "nitrite", no3: "nitrate", org: "trees", dead: "dead leaves" };
  const MESSAGES = {
    nitrite: "Nitrite is piling up: in quantity it is toxic to fish, to plants, and to us.",
    starving: "The trees are starving for nitrate.",
    missing: "Something is missing, but the rest keeps turning for now.",
    steady: "The cycle is turning. Every pool holds roughly steady, whatever the rates.",
  };

  // The page's pace: the cycle runs 1.2 units of model time per second, and a dot crosses an
  // arrow in 1 / 0.6 units. Dots leave a pool at 9 a second per unit of flow (0.15 a frame at
  // 60 Hz), at most 54 a second on one arrow, and never more than MAX_DOTS on screen at once.
  const SPEED = 1.2, DOT_SPEED = 0.6, MAX_DT = 1 / 30;
  const DOT_RATE = 0.15 * 60, MAX_DOT_RATE = 0.9 * 60, MAX_DOTS = 300;
  const STILL_TICKS = 20000, STILL_DT = 0.02;   // the still frame: the presets run to their steady state

  function create() {
    const mult = {}, alive = {};
    for (const st of STEPS) { mult[st.id] = PRESET[st.id] / 100; alive[st.id] = true; }
    return { P: { ...START }, mult, alive, particles: [] };
  }

  // Moves the model on by dt units of model time and returns the flows. Each step moves its flow
  // out of one pool and into another, so the total never changes. Nothing clamps a pool: none can
  // go below zero while dt times its fastest rate out stays under 1. The fastest is nitrite's, 1 a
  // unit of time with its slider at 200 %, and the page never steps more than 0.04.
  function tick(state, dt) {
    const { P, mult, alive } = state;
    const rate = (id) => (alive[id] ? BASE[id] * mult[id] : 0);
    const flows = { fall: LEAF_FALL * P.org };
    for (const st of STEPS) flows[st.id] = rate(st.id) * (st.id === "fix" ? P.n2 / FULL_AIR : P[st.from]);
    for (const st of ARROWS) {
      P[st.from] -= dt * flows[st.id];
      P[st.to] += dt * flows[st.id];
    }
    return flows;
  }

  function totalN(state) {
    let n = 0;
    for (const k in state.P) n += state.P[k];
    return n;
  }

  // A step at zero counts as missing, the same as a killed one.
  function message(state) {
    const { P } = state;
    if (P.no2 > NITRITE_TOXIC) return MESSAGES.nitrite;
    if (P.org < TREES_STARVING) return MESSAGES.starving;
    if (STEPS.some((st) => !state.alive[st.id] || !(state.mult[st.id] > 0))) return MESSAGES.missing;
    return MESSAGES.steady;
  }

  // How many dots leave a pool along an arrow in dt seconds of the page: a Poisson draw, so a
  // 120 Hz screen shows the same traffic as a 60 Hz one.
  function spawnCount(flow, dt, rand) {
    const mean = Math.min(DOT_RATE * flow, MAX_DOT_RATE) * dt;
    if (!(mean > 0)) return 0;
    const floor = Math.exp(-mean);
    let n = 0, p = rand();
    while (p > floor) { n++; p *= rand(); }
    return n;
  }

  // ------------------------------------------------------------------ the drawing
  // Drawn on a 560 × 450 plan and scaled to the canvas.
  const VIEW_W = 560, VIEW_H = 450, TAU = Math.PI * 2;
  const POS = {
    n2: { x: 175, y: 56, r: 40 },
    nh4: { x: 84, y: 190 },
    no2: { x: 84, y: 330 },
    no3: { x: 277, y: 405 },
    org: { x: 470, y: 330, r: 40 },
    dead: { x: 470, y: 114, r: 36 },
  };
  // Pools grow without limit; the drawing stops growing at these.
  const R_MAX = 40, TREE_MAX = 100, HEAP_MAX = 240;
  const ARROW_INK = "#B9AE94", SOFT_INK = "#55595E", BUG_INK = "#8A5A2B";

  // The ammonium circle is drawn smaller than the others at the same value.
  const radius = (k, P) => POS[k].r ||
    Math.min(R_MAX, k === "nh4" ? 9 + Math.sqrt(Math.max(0, P.nh4)) * 1.4 : 14 + Math.sqrt(Math.max(0, P[k])) * 2.2);

  function roundRect(ctx, x, y, w, h, r) {
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  }

  // A rod-shaped bacterium with a few flagella, pointing along angle a.
  function bug(ctx, x, y, a) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a);
    ctx.fillStyle = C.copper; ctx.strokeStyle = BUG_INK; ctx.lineWidth = 1.2;
    ctx.beginPath(); roundRect(ctx, -11, -5, 22, 10, 5); ctx.fill(); ctx.stroke();
    ctx.beginPath();
    for (const dy of [-3, 0, 3]) {
      ctx.moveTo(11, dy);
      ctx.quadraticCurveTo(16, dy - 3, 20, dy);
      ctx.quadraticCurveTo(23, dy + 3, 26, dy - 1);
    }
    ctx.stroke();
    ctx.fillStyle = BUG_INK;
    for (const dx of [-5, 0, 5]) { ctx.beginPath(); ctx.arc(dx, 0, 1.3, 0, TAU); ctx.fill(); }
    ctx.restore();
  }

  function mushroom(ctx, x, y, s) {
    ctx.fillStyle = "#EAD9B8"; ctx.fillRect(x - 3 * s, y - 10 * s, 6 * s, 12 * s);
    ctx.fillStyle = C.ochre; ctx.beginPath(); ctx.ellipse(x, y - 10 * s, 11 * s, 7 * s, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = C.paper;
    for (const [dx, dy] of [[-5, -13], [2, -15], [6, -11]]) { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, 1.4 * s, 0, TAU); ctx.fill(); }
  }

  // Half green, half turning: autumn starting. It grows with its pool.
  function tree(ctx, x, y, size) {
    const h = 46 + size * 0.6, grow = 0.8 + size / 300;
    ctx.fillStyle = "#6B4A2B"; ctx.fillRect(x - 5, y - h * 0.35, 10, h * 0.75);
    const blobs = [[-18, -0.45, 17, "#2E6B35"], [-4, -0.65, 19, "#2E6B35"], [12, -0.5, 17, "#D9A441"],
      [20, -0.3, 13, "#C9733E"], [-12, -0.25, 13, "#2E6B35"], [4, -0.35, 15, "#D9A441"]];
    for (const [dx, dy, r, c] of blobs) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + dx, y + dy * h, r * grow, 0, TAU); ctx.fill(); }
  }

  // A parabolic heap of leaves on a line of soil: filled, with the outlines of smaller piles
  // inside it, leaves all through it, and a row on its surface pointing every which way.
  const LEAF_COLOURS = ["#B8601E", "#C9733E", "#D9A441", "#8F4A1C", "#C9733E"];
  function leafPile(ctx, x, y, size) {
    ctx.fillStyle = "#8A6A45"; ctx.fillRect(x - 52, y + 14, 104, 5);
    const half = 46, top = 30 + size / 12;
    const para = (u, h) => y + 13 - h * (1 - u * u);
    ctx.fillStyle = "#A85A2A"; ctx.beginPath(); ctx.moveTo(x - half, y + 14);
    for (let u = -1; u <= 1.001; u += 0.1) ctx.lineTo(x + u * half, para(u, top));
    ctx.lineTo(x + half, y + 14); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#7A3E14"; ctx.lineWidth = 1.2;
    for (const [cu, w, h] of [[-0.45, 0.5, 0.55], [0.1, 0.55, 0.75], [0.55, 0.4, 0.45], [0, 1, 1]]) {
      ctx.beginPath();
      for (let t = -1; t <= 1.001; t += 0.1) {
        const u = cu + t * w;
        if (u < -1 || u > 1) continue;
        const yy = Math.min(para(u, top), y + 13 - h * top * (1 - t * t));
        if (t === -1) ctx.moveTo(x + u * half, yy); else ctx.lineTo(x + u * half, yy);
      }
      ctx.stroke();
    }
    const leaf = (lx, ly, rot, c) => {
      ctx.fillStyle = c; ctx.save(); ctx.translate(lx, ly); ctx.rotate(rot);
      ctx.beginPath(); ctx.ellipse(0, 0, 7, 3.5, 0, 0, TAU); ctx.fill(); ctx.restore();
    };
    const n = 44 + Math.round(size / 3);
    for (let i = 0; i < n; i++) {
      const u = ((i * 0.618034) % 1) * 2 - 1, hmax = top * (1 - u * u);
      leaf(x + u * half, y + 12 - hmax * (((i * 0.3819) % 1) * 0.95 + 0.03), u * 1.2 + i, LEAF_COLOURS[i % 5]);
    }
    for (let j = 0; j < 11; j++) {
      const u = -0.95 + j * 0.19, rot = ((j * 2.399 + 1.3) % Math.PI) - Math.PI / 2;
      leaf(x + u * half, para(u, top) - 1, rot, LEAF_COLOURS[(j + 2) % 5]);
    }
  }

  // Nitrogen gas as its structure, N≡N, in a rounded box.
  function n2Box(ctx, x, y) {
    ctx.fillStyle = "#fff"; ctx.strokeStyle = ARROW_INK; ctx.lineWidth = 1.5;
    ctx.beginPath(); roundRect(ctx, x - 44, y - 22, 88, 44, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.blueBlack; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("N", x - 22, y + 1); ctx.fillText("N", x + 22, y + 1);
    ctx.strokeStyle = C.blueBlack; ctx.lineWidth = 2;
    for (const dy of [-5, 0, 5]) { ctx.beginPath(); ctx.moveTo(x - 10, y + dy); ctx.lineTo(x + 10, y + dy); ctx.stroke(); }
    ctx.textBaseline = "alphabetic";
  }

  // An arrow from circle a (radius ra) to circle b (radius rb); returns its ends and direction.
  function arrow(ctx, a, b, w, ra, rb) {
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const x1 = a.x + ux * ra, y1 = a.y + uy * ra, x2 = b.x - ux * rb, y2 = b.y - uy * rb;
    ctx.strokeStyle = ARROW_INK; ctx.lineWidth = w;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.fillStyle = ARROW_INK; ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ux * 10 - uy * 6, y2 - uy * 10 + ux * 6); ctx.lineTo(x2 - ux * 10 + uy * 6, y2 - uy * 10 - ux * 6); ctx.fill();
    return { x1, y1, x2, y2, ux, uy };
  }

  // Where a line of text goes: centred on x, kept inside the drawing, and the box it fills.
  function place(ctx, text, x, y, font, px) {
    ctx.font = font;
    const half = ctx.measureText(text).width / 2;
    x = Math.max(half + 3, Math.min(VIEW_W - half - 3, x));
    return { text, font, x, y, l: x - half, r: x + half, top: y - 0.75 * px, bottom: y + 0.25 * px };
  }
  const overlap = (a, b) => a.l < b.r && b.l < a.r && a.top < b.bottom && b.top < a.bottom;

  // Text with a halo of paper, so it reads over an arrow or a bacterium.
  function paint(ctx, t, colour) {
    ctx.font = t.font; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    ctx.lineJoin = "round"; ctx.lineWidth = 3; ctx.strokeStyle = C.paper; ctx.strokeText(t.text, t.x, t.y);
    ctx.fillStyle = colour; ctx.fillText(t.text, t.x, t.y);
  }

  // The whole scene on a W × H canvas. The plan scales with the canvas, but the text shrinks
  // less: on a phone it stays at least 11.5 px (the pools) and 10 px (the living things) on screen.
  function drawScene(ctx, state, W, H) {
    const { P, alive } = state, s = W / VIEW_W;
    const poolPx = Math.max(13, 11.5 / s), notePx = Math.max(11, 10 / s);
    ctx.save();
    ctx.scale(s, s);
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, VIEW_W, H / s);
    const segs = {}, notes = [];
    for (const st of ARROWS) {
      const dead = st !== FALL && !alive[st.id];
      const m = (segs[st.id] = arrow(ctx, POS[st.from], POS[st.to], dead ? 1 : 2.5, radius(st.from, P) + 4, radius(st.to, P) + 6));
      const mx = (m.x1 + m.x2) / 2, my = (m.y1 + m.y2) / 2;
      if (dead) {
        ctx.fillStyle = C.ochre; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("✕", mx, my + 6);
      } else if (st.bug) {
        const bx = mx - m.uy * 14, by = my + m.ux * 14;
        bug(ctx, bx, by, Math.atan2(m.uy, m.ux));
        notes.push({ text: TEXT.bacteria, x: bx - m.uy * 16, y: by + m.ux * 16 + 4 });
      } else if (st.fungi) {
        mushroom(ctx, mx + 56, my - 8, 1.76);
        mushroom(ctx, mx + 86, my - 4, 1.28);
        // Over the mushrooms; but where the text is large for the plan (on a phone) and would
        // run into another label there, under the path, clear of it at the note's left end.
        notes.push({ text: TEXT.fungi, x: mx + 70, y: my - 50, below: (l) => my + ((l - mx) * m.uy) / m.ux + 4 + 0.75 * notePx });
      }
    }
    for (const p of state.particles) {
      const m = segs[p.id];
      ctx.fillStyle = COLOURS[p.from];
      ctx.beginPath(); ctx.arc(m.x1 + (m.x2 - m.x1) * p.t, m.y1 + (m.y2 - m.y1) * p.t, 3.2, 0, TAU); ctx.fill();
    }
    n2Box(ctx, POS.n2.x, POS.n2.y);
    tree(ctx, POS.org.x, POS.org.y, Math.min(TREE_MAX, P.org));
    leafPile(ctx, POS.dead.x, POS.dead.y, Math.min(HEAP_MAX, P.dead));
    for (const k of ["nh4", "no2", "no3"]) {
      ctx.fillStyle = k === "no2" && P.no2 > NITRITE_TOXIC ? C.ochre : COLOURS[k];
      ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.arc(POS[k].x, POS[k].y, radius(k, P), 0, TAU); ctx.fill();
      ctx.globalAlpha = 1;
    }
    // Each pool's name sits under its drawing; the text grows downwards on a phone.
    const under = { n2: 23, org: 39, dead: 19 }, poolFont = `${poolPx}px sans-serif`, noteFont = `italic ${notePx}px sans-serif`;
    const names = Object.keys(POS).map((k) =>
      place(ctx, TEXT[k], POS[k].x, Math.min(VIEW_H - 4, POS[k].y + (under[k] || radius(k, P) + 2) + poolPx), poolFont, poolPx));
    for (const n of notes) {
      let t = place(ctx, n.text, n.x, n.y, noteFont, notePx);
      if (n.below && names.some((b) => overlap(b, t))) t = place(ctx, n.text, n.x, n.below(t.l), noteFont, notePx);
      paint(ctx, t, SOFT_INK);
    }
    for (const t of names) paint(ctx, t, C.blueBlack);
    ctx.restore();
  }

  // ------------------------------------------------------------------ the controls
  // The pools at rest: the presets run to their steady state. The still frame shows it, and the bars
  // are scaled to it: each is full at 1.8 times its pool at rest. So at rest every bar is a little
  // over half full, with room to show its pool piling up or draining away.
  let steady = null;
  function steadyState() {
    if (!steady) { steady = create(); for (let i = 0; i < STILL_TICKS; i++) tick(steady, STILL_DT); }
    return steady;
  }
  const BAR_HEADROOM = 1.8;
  const barOf = (k, v) => Math.max(0, Math.min(100, (100 * v) / (BAR_HEADROOM * steadyState().P[k])));

  // A slider's style: its step's colour (the browser's accent, and --c for the CSS's own track) and
  // how far along it is (--p, 0 to 1), which the CSS fills in that colour.
  const SLIDER_MAX = 200;
  const fillOf = (value) => String(Number(value) / SLIDER_MAX);

  function uiHtml() {
    const esc = NKC.esc, P = START;
    const steps = STEPS.map((st) =>
      `<div class="ncycle-step" role="group" aria-label="${esc(st.name)}">` +
      `<label><span>${esc(st.name)}</span><input type="range" name="${st.id}" min="0" max="${SLIDER_MAX}" value="${PRESET[st.id]}" style="accent-color:${COLOURS[st.to]};--c:${COLOURS[st.to]};--p:${fillOf(PRESET[st.id])}"></label>` +
      `<button type="button" class="ncycle-kill" data-step="${st.id}">kill</button></div>`).join("");
    const pools = Object.keys(COLOURS).map((k) =>
      `<div class="pool">${esc(POOL_NAMES[k])}<span class="bar"><i data-pool="${k}" style="background:${COLOURS[k]};width:${barOf(k, P[k])}%"></i></span></div>`).join("");
    return `<div class="ncycle-ui">` +
      `<canvas class="ncycle-canvas" width="${VIEW_W}" height="${VIEW_H}" role="img" aria-label="The nitrogen cycle: nitrogen gas, ammonium, nitrite, nitrate, trees, and dead leaves, with the bacteria and fungi that move nitrogen between them"></canvas>` +
      `<div class="ncycle-controls"><div class="ncycle-steps">${steps}` +
      `<button type="button" class="ncycle-reset">Reset everything</button></div>` +
      `<div class="ncycle-pools">${pools}</div>` +
      `<p class="ncycle-msg"><span class="ncycle-say" aria-live="polite">${esc(message(create()))}</span> ` +
      `<span class="label label-oversimplified">${esc(NKC.LABELS.oversimplified.text)}</span></p>` +
      `</div></div>`;
  }

  NKC.ncycle = { STEPS, PRESET, BASE, LEAF_FALL, COLOURS, TEXT, MESSAGES, create, tick, totalN, message, spawnCount, uiHtml, drawScene, barOf };

  // ------------------------------------------------------------------ the cycle in the page
  const copy = (s) => ({ P: { ...s.P }, mult: { ...s.mult }, alive: { ...s.alive }, particles: [] });

  NKC.registerVisual("ncycle", (el) => {
    el.innerHTML = uiHtml();
    const canvas = el.querySelector(".ncycle-canvas"), ctx = canvas.getContext("2d");
    const ranges = el.querySelectorAll(".ncycle-step input"), kills = el.querySelectorAll(".ncycle-kill");
    const say = el.querySelector(".ncycle-say"), bars = {};
    for (const i of el.querySelectorAll(".ncycle-pools i")) bars[i.dataset.pool] = i;
    const rand = NKC.rng(Date.now() >>> 0);
    let state = create(), frame = 0, last = 0, W = VIEW_W, H = VIEW_H;

    function size() {
      const dpr = root.devicePixelRatio || 1;
      W = Math.max(240, canvas.clientWidth || VIEW_W);
      H = (W * VIEW_H) / VIEW_W;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw() {
      drawScene(ctx, state, W, H);
      for (const k in bars) bars[k].style.width = `${barOf(k, state.P[k])}%`;
      const now = message(state);
      if (say.textContent !== now) {   // a live region: speak only on a change
        say.textContent = now;
        say.classList.toggle("warn", now === MESSAGES.nitrite || now === MESSAGES.starving);
      }
    }
    // dt is seconds of the page, capped; the model runs SPEED times as fast.
    function advance(dt) {
      const flows = tick(state, dt * SPEED);
      for (const st of ARROWS) {
        for (let n = spawnCount(flows[st.id], dt, rand); n > 0 && state.particles.length < MAX_DOTS; n--) {
          state.particles.push({ id: st.id, from: st.from, t: 0 });
        }
      }
      for (const p of state.particles) p.t += dt * SPEED * DOT_SPEED;
      state.particles = state.particles.filter((p) => p.t < 1);
    }
    function loop(now) {
      advance(Math.min(MAX_DT, last ? (now - last) / 1000 : 1 / 60));
      last = now;
      draw();
      frame = root.requestAnimationFrame(loop);
    }
    // A change while the cycle is paused (or still, under reduced motion) starts it first,
    // through the same Play button the reader would press, so the change shows.
    function wake() {
      if (frame) return;
      const toggle = el.querySelector(":scope > .anim-toggle");
      if (toggle) toggle.click();
    }
    function showKill(b, alive) {
      b.textContent = alive ? "kill" : "revive";
      b.classList.toggle("is-dead", !alive);
    }
    for (const r of ranges) {
      r.addEventListener("input", () => {
        state.mult[r.name] = Number(r.value) / 100;
        r.style.setProperty("--p", fillOf(r.value));
        wake();
      });
    }
    for (const b of kills) {
      b.addEventListener("click", () => {
        const id = b.dataset.step;
        state.alive[id] = !state.alive[id];
        showKill(b, state.alive[id]);
        wake();
        draw();
      });
    }
    el.querySelector(".ncycle-reset").addEventListener("click", () => {
      state = create();
      for (const r of ranges) { r.value = PRESET[r.name]; r.style.setProperty("--p", fillOf(r.value)); }
      for (const b of kills) showKill(b, true);
      draw();
    });
    size();
    draw();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => { size(); draw(); }).observe(canvas);
    return {
      start() { if (!frame) { last = 0; frame = root.requestAnimationFrame(loop); } },
      stop() { root.cancelAnimationFrame(frame); frame = 0; },
      drawStill() {
        state = copy(steadyState());
        draw();
      },
    };
  });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
