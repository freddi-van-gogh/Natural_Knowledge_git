// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/anim.js");
require("../js/sim-dish.js");

test("dish: u and v stay within 0..1 across the regimes", () => {
  for (const [f, k] of [[0.025, 0.062], [0.040, 0.062], [0.055, 0.062], [0.018, 0.051], [0.004, 0.040], [0.080, 0.070]]) {
    const s = NKC.dish.create(NKC.rng(1)); NKC.dish.rinse(s, NKC.rng(2));
    for (let i = 0; i < 600; i++) NKC.dish.step(s, f, k);
    for (let i = 0; i < s.u.length; i++) assert.ok(s.u[i] >= 0 && s.u[i] <= 1 && s.v[i] >= 0 && s.v[i] <= 1, `${f},${k} at ${i}`);
  }
});
test("dish: the regime readout is one of six fixed strings", () => {
  const R = NKC.dish;
  assert.equal(R.regime(0.008, 0.062), "Starved: everything fades.");
  assert.equal(R.regime(0.020, 0.050), "Waves and spirals.");
  assert.equal(R.regime(0.025, 0.062), "Spots that split like cells.");
  assert.equal(R.regime(0.040, 0.062), "Worms and stripes.");
  assert.equal(R.regime(0.055, 0.062), "A maze that fills the dish.");
  assert.equal(R.regime(0.075, 0.062), "Flooded: the pattern dissolves.");
  assert.ok(typeof R.regime(0.035, 0.070) === "string");
  assert.equal(R.feedOf(0), 0.004); assert.ok(Math.abs(R.feedOf(1000) - 0.080) < 1e-9);
  assert.equal(R.killOf(0), 0.040); assert.ok(Math.abs(R.killOf(1000) - 0.070) < 1e-9);
});
test("dish: a seeded dish grows a pattern (not blank) at spots settings", () => {
  const s = NKC.dish.create(NKC.rng(3)); NKC.dish.rinse(s, NKC.rng(4));
  for (let i = 0; i < 1500; i++) NKC.dish.step(s, 0.035, 0.062);
  const lit = Array.from(s.v).filter((v) => v > 0.1).length;
  assert.ok(lit > 500 && lit < s.v.length * 0.9, `lit ${lit}`);
});
test("dish: steps per frame follow elapsed time, capped", () => {
  assert.equal(NKC.dish.stepsFor(1 / 60), 10);
  assert.equal(NKC.dish.stepsFor(1 / 120), 5);
  assert.equal(NKC.dish.stepsFor(1 / 20), 12);     // capped, never more
  assert.equal(NKC.dish.stepsFor(0), 0);
});
test("dish markup carries the fixed copy and the illustration chip", () => {
  const h = NKC.dish.uiHtml();
  for (const t of ["blank", "spots that divide", "worms", "a maze", "waves and spirals", "spots and worms", "fades",
    "if the screen is all white or blue, try moving this around", "Drop some in", "Rinse the dish"]) assert.ok(h.includes(t), t);
  assert.match(h, /<canvas class="dish-canvas"[^>]*role="img"[^>]*aria-label=/);
  assert.match(h, /<span class="label label-illustration">illustration<\/span>/);
  assert.match(h, /<em class="dish-hint">if the screen/);
  assert.ok(h.indexOf('name="feed"') < h.indexOf('name="kill"'), "wash-out below feed");
});

// ---------------------------------------------------------------- the fix wave after the final review
test("dish: the still frame (a rinse and 400 steps at the opening sliders, 245 and 310) is not blank", () => {
  const s = NKC.dish.still(NKC.dish.create(NKC.rng(8)), NKC.rng(9));
  assert.ok(Array.from(s.v).some((v) => v > 0.1));
});

// A stand-in for the page, with only what the factory asks for. No DOM library.
function node(extra = {}) {
  const on = {};
  return {
    textContent: "",
    addEventListener(type, f) { (on[type] = on[type] || []).push(f); },
    fire(type, ev = {}) { for (const f of on[type] || []) f(ev); },
    ...extra,
  };
}
function fakeDish() {
  let clicks = 0;
  const frames = [];
  const ctx = {
    createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
    putImageData: (img) => { frames.push(img.data.slice()); },
  };
  const one = {
    ".dish-canvas": node({ getContext: () => ctx, getBoundingClientRect: () => ({ left: 0, top: 0, width: 192, height: 192 }) }),
    'input[name="feed"]': node({ value: "245" }), 'input[name="kill"]': node({ value: "310" }),
    ".dish-regime": node(), ".dish-drop": node(), ".dish-rinse": node(),
    ":scope > .anim-toggle": { click: () => { clicks++; } },
  };
  return { el: { querySelector: (s) => one[s] }, one, frames, clicks: () => clicks };
}
test("dish: under reduced motion the page's still frame shows a pattern, not an empty dish", () => {
  const d = fakeDish();
  NKC.mountVisual("dish", d.el, { reducedMotion: true });
  const last = d.frames[d.frames.length - 1], paper = [0xF7, 0xF2, 0xE4];
  let inked = 0;
  for (let p = 0; p < last.length; p += 4) if (last[p] !== paper[0] || last[p + 1] !== paper[1] || last[p + 2] !== paper[2]) inked++;
  assert.ok(inked > 100, `${inked} pixels off the paper`);
});
test("dish: a click on the still dish, or Drop some in, presses its Play button once each", () => {
  const d = fakeDish();
  NKC.mountVisual("dish", d.el, { reducedMotion: false });
  d.one[".dish-canvas"].fire("click", { clientX: 50, clientY: 60 });
  assert.equal(d.clicks(), 1);
  d.one[".dish-drop"].fire("click");
  assert.equal(d.clicks(), 2);
  d.one[".dish-rinse"].fire("click");
  assert.equal(d.clicks(), 2, "a rinse doesn't start it");
});
test("dish: the sliders open on the author's settings, pulsing waves, and the readout agrees", () => {
  const h = NKC.dish.uiHtml();
  assert.match(h, /<input type="range" name="feed" min="0" max="1000" value="245">/);
  assert.match(h, /<input type="range" name="kill" min="0" max="1000" value="310">/);
  assert.match(h, /<span class="dish-regime" aria-live="polite">Waves and spirals\.<\/span>/);
});
