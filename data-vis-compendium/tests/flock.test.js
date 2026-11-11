// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/media.js");
require("../js/anim.js");
require("../js/sim-flock.js");

function run(k, steps) {
  const flock = NKC.flock.create(150, 400, 300, NKC.rng(7), k);
  for (let i = 0; i < steps; i++) NKC.flock.step(flock, 1 / 60);
  return flock.birds;
}

test("k0 stays disordered", () => {
  assert.ok(NKC.flock.order(run(0, 400)) < 0.35);
});

test("k7 orders", () => {
  assert.ok(NKC.flock.order(run(7, 600)) > 0.8);
});

test("k20 orders at least as much", () => {
  assert.ok(NKC.flock.order(run(20, 600)) > 0.85);
});

test("speed constant", () => {
  for (const k of [0, 7]) {
    for (const b of run(k, 50)) {
      const speed = Math.hypot(b.vx, b.vy);
      const expected = k === 0 ? NKC.flock.JOSTLE_SPEED : NKC.flock.SPEED;
      assert.ok(Math.abs(speed - expected) < 1e-6, `k=${k} speed ${speed}`);
    }
  }
});

test("birds stay on the canvas", () => {
  for (const b of run(7, 200)) {
    assert.ok(b.x >= 0 && b.x < 400 && b.y >= 0 && b.y < 300);
  }
});

test("clipFor boundaries", () => {
  const expect = { 0: "none", 1: "low", 4: "low", 5: "starlings", 9: "starlings", 10: "high", 15: "high", 16: "herd", 20: "herd" };
  for (const [k, band] of Object.entries(expect)) assert.equal(NKC.flock.clipFor(Number(k)), band, `k=${k}`);
});

test("order is 1 for a flock all heading one way, ~0 for opposite pairs", () => {
  assert.equal(NKC.flock.order([{ vx: 1, vy: 0 }, { vx: 2, vy: 0 }]), 1);
  assert.ok(NKC.flock.order([{ vx: 1, vy: 0 }, { vx: -1, vy: 0 }]) < 1e-9);
});

test("slider markup carries the fixed copy, positioned and as a key for small screens", () => {
  const html = NKC.flock.uiHtml();
  assert.match(html, /type="range" min="0" max="20"[^>]*value="0"/);
  for (const copy of ["no order: Brownian motion", "Roman starlings", "herding", "Try other numbers."]) {
    assert.ok(html.split(copy).length - 1 >= 1, copy);
  }
  assert.match(html, /class="flock-ticks"/);
  assert.match(html, /class="flock-key"/);
  assert.match(html, /label-measured/);
  assert.match(html, /label-illustration/);
  assert.match(html, /Each bird watches its nearest <b class="k">0<\/b> <span class="kw">neighbours<\/span>\./);
});
