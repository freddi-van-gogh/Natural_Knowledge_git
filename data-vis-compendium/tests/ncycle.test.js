// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/anim.js");
require("../js/sim-ncycle.js");

test("ncycle: nitrogen is conserved (the air is a pool, so the system is closed)", () => {
  const s = NKC.ncycle.create();
  const total = NKC.ncycle.totalN(s);
  for (let i = 0; i < 1000; i++) { NKC.ncycle.tick(s, 0.02); assert.ok(Math.abs(NKC.ncycle.totalN(s) - total) < 1e-6); }
  s.alive.nob = false;
  for (let i = 0; i < 1000; i++) { NKC.ncycle.tick(s, 0.02); assert.ok(Math.abs(NKC.ncycle.totalN(s) - total) < 1e-6); }
});
test("ncycle: with the presets, the pools settle", () => {
  const s = NKC.ncycle.create();
  for (let i = 0; i < 20000; i++) NKC.ncycle.tick(s, 0.02);
  const a = { ...s.P }; for (let i = 0; i < 500; i++) NKC.ncycle.tick(s, 0.02);
  for (const k in a) assert.ok(Math.abs(s.P[k] - a[k]) < 0.5, k);
  assert.equal(NKC.ncycle.message(s), NKC.ncycle.MESSAGES.steady);
});
test("ncycle: kill the nitrite oxidizers and nitrite piles up while the trees starve", () => {
  const s = NKC.ncycle.create();
  for (let i = 0; i < 20000; i++) NKC.ncycle.tick(s, 0.02);
  s.alive.nob = false;
  const no2 = s.P.no2, org = s.P.org;
  for (let i = 0; i < 6000; i++) NKC.ncycle.tick(s, 0.02);
  assert.ok(s.P.no2 > no2 * 3 && s.P.org < org * 0.5);
  assert.equal(NKC.ncycle.message(s), NKC.ncycle.MESSAGES.nitrite);
});
test("ncycle: every rate at zero leaves finite, non-negative pools", () => {
  const s = NKC.ncycle.create();
  for (const k in s.mult) s.mult[k] = 0;
  for (let i = 0; i < 1000; i++) NKC.ncycle.tick(s, 0.05);
  for (const k in s.P) assert.ok(Number.isFinite(s.P[k]) && s.P[k] >= 0, k);
});
test("ncycle: dots spawn as a rate per second, so 120 Hz equals 60 Hz on average", () => {
  const r1 = NKC.rng(5), r2 = NKC.rng(6);
  let a = 0, b = 0;
  for (let i = 0; i < 6000; i++) a += NKC.ncycle.spawnCount(2, 1 / 60, r1);
  for (let i = 0; i < 12000; i++) b += NKC.ncycle.spawnCount(2, 1 / 120, r2);
  assert.ok(Math.abs(a - b) / a < 0.1, `${a} vs ${b}`);
});
test("ncycle markup and drawing carry the fixed copy, presets, colours and the oversimplified chip", () => {
  const h = NKC.ncycle.uiHtml();
  for (const st of NKC.ncycle.STEPS) assert.ok(h.includes(`value="${NKC.ncycle.PRESET[st.id]}"`) && h.includes(NKC.esc(st.name)) && h.includes(`accent-color:${NKC.ncycle.COLOURS[st.to === "N2" ? "n2" : st.to]}`), st.id);
  assert.match(h, /<span class="label label-oversimplified">oversimplified<\/span>/);
  assert.ok(h.includes("Reset everything") && (h.match(/>kill</g) || []).length === 6);
  const calls = []; const ctx = new Proxy({}, { get: (t, p) => (p === "fillText" ? (s) => calls.push(s) : () => ctx), set: () => true });
  NKC.ncycle.drawScene(ctx, NKC.ncycle.create(), 560, 450);
  for (const t of Object.values(NKC.ncycle.TEXT)) assert.ok(calls.includes(t), t);
  assert.deepEqual(Object.values(NKC.ncycle.COLOURS), ["#7A8795", "#2A9D8F", "#1F4E8C", "#6B3A6E", "#2E6B35", "#B8601E"]);
  assert.equal((h.match(/class="pool"/g) || []).length, 6, "six pool bars, laid out two rows of three by CSS");
});
test("ncycle: the messages, the drawn labels and the step names are the fixed copy, word for word", () => {
  assert.deepEqual(NKC.ncycle.MESSAGES, {
    nitrite: "Nitrite is piling up: in quantity it is toxic to fish, to plants, and to us.",
    starving: "The trees are starving for nitrate.",
    missing: "Something is missing, but the rest keeps turning for now.",
    steady: "The cycle is turning. Every pool holds roughly steady, whatever the rates.",
  });
  assert.deepEqual(NKC.ncycle.TEXT, {
    fungi: "decomposers like fungi", bacteria: "environmental bacteria",
    n2: "atmospheric nitrogen N₂", nh4: "ammonium NH₄⁺", no2: "nitrite NO₂⁻", no3: "nitrate NO₃⁻", org: "trees", dead: "dead leaves",
  });
  assert.deepEqual(NKC.ncycle.STEPS.map((st) => st.name), [
    "Nitrogen-fixing bacteria: N₂ → ammonium",
    "Ammonia-oxidizing bacteria: ammonium → nitrite",
    "Nitrite-oxidizing bacteria: nitrite → nitrate",
    "Trees take up nitrate",
    "Decomposers like fungi: dead leaves → ammonium",
    "Denitrifying bacteria: nitrate → N₂",
  ]);
});

// ---------------------------------------------------------------- the fix wave after the final review
test("ncycle: at rest every pool's bar is between a third and two-thirds full, and a pile-up shows", () => {
  const s = NKC.ncycle.create();
  for (let i = 0; i < 20000; i++) NKC.ncycle.tick(s, 0.02);
  for (const k in s.P) {
    const f = NKC.ncycle.barOf(k, s.P[k]) / 100;
    assert.ok(f >= 0.35 && f <= 0.7, `${k}: ${f.toFixed(2)}`);
  }
  const rest = NKC.ncycle.barOf("nh4", s.P.nh4);
  s.alive.amo = false;   // kill the ammonia oxidizers: ammonium piles up, and its bar fills
  for (let i = 0; i < 6000; i++) NKC.ncycle.tick(s, 0.02);
  assert.ok(NKC.ncycle.barOf("nh4", s.P.nh4) > rest + 30, "ammonium's bar rises");
});

// A stand-in for the page, with only what a factory asks for: nodes that take listeners and fire
// them, and a toggle that counts its clicks. No DOM library.
function node(extra = {}) {
  const on = {}, props = {};
  return {
    props, dataset: {}, textContent: "", classList: { toggle() {} },
    style: { setProperty: (k, v) => { props[k] = v; } },
    addEventListener(type, f) { (on[type] = on[type] || []).push(f); },
    fire(type, ev = {}) { for (const f of on[type] || []) f(ev); },
    ...extra,
  };
}
const fakeCtx = () => new Proxy({}, {
  get: (t, p) => (p === "measureText" ? () => ({ width: 10 }) : () => {}),
  set: () => true,
});
test("ncycle: a slider moved while the cycle is still presses its Play button once, and fills to its value", () => {
  let clicks = 0;
  const toggle = { click: () => { clicks++; } };
  const ranges = NKC.ncycle.STEPS.map((st) => node({ name: st.id, value: String(NKC.ncycle.PRESET[st.id]) }));
  const bars = Object.keys(NKC.ncycle.COLOURS).map((k) => node({ dataset: { pool: k } }));
  const one = {
    ".ncycle-canvas": { clientWidth: 560, getContext: () => fakeCtx() },
    ".ncycle-say": node(), ".ncycle-reset": node(), ":scope > .anim-toggle": toggle,
  };
  const all = { ".ncycle-step input": ranges, ".ncycle-kill": [], ".ncycle-pools i": bars };
  const el = { querySelector: (s) => one[s], querySelectorAll: (s) => all[s] || [] };
  const c = NKC.mountVisual("ncycle", el, { reducedMotion: false });
  ranges[1].value = "150";
  ranges[1].fire("input");
  assert.equal(clicks, 1);
  assert.equal(ranges[1].props["--p"], "0.75");
  // Once it runs, a slider changes the cycle and nothing else.
  const raf = globalThis.requestAnimationFrame, caf = globalThis.cancelAnimationFrame;
  globalThis.requestAnimationFrame = () => 7; globalThis.cancelAnimationFrame = () => {};
  try {
    c.impl.start();
    ranges[2].value = "20";
    ranges[2].fire("input");
    assert.equal(clicks, 1);
    c.impl.stop();
  } finally { globalThis.requestAnimationFrame = raf; globalThis.cancelAnimationFrame = caf; }
  one[".ncycle-reset"].fire("click");
  assert.equal(ranges[1].value, NKC.ncycle.PRESET.amo);
  assert.equal(ranges[1].props["--p"], String(NKC.ncycle.PRESET.amo / 200));
});
test("ncycle markup: each slider carries its step's colour and its fill", () => {
  const h = NKC.ncycle.uiHtml();
  for (const st of NKC.ncycle.STEPS) {
    const c = NKC.ncycle.COLOURS[st.to];
    assert.ok(h.includes(`style="accent-color:${c};--c:${c};--p:${NKC.ncycle.PRESET[st.id] / 200}"`), st.id);
  }
});
