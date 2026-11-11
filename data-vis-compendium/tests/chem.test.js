// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/anim.js");
for (const f of ["anim-dye", "anim-vesicle", "anim-autocat", "anim-protocell", "anim-selection"]) require(`../js/${f}.js`);

test("dye spreads", () => {
  const rand = NKC.rng(3);
  const p = NKC.dye.create(300, 100, 100);
  for (let i = 0; i < 50; i++) NKC.dye.step(p, rand);
  const early = NKC.dye.msd(p, 100, 100);
  for (let i = 0; i < 150; i++) NKC.dye.step(p, rand);
  assert.ok(NKC.dye.msd(p, 100, 100) > early);
  assert.ok(early > 0);
});

const norm = (a) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
const close = (a, b) => Math.min(Math.abs(norm(a) - norm(b)), 2 * Math.PI - Math.abs(norm(a) - norm(b))) < 1e-9;

test("vesicle leaflets", () => {
  const t = NKC.vesicle.targets(60, 200, 150, 80);
  const outer = t.filter((p) => p.leaflet === "outer"), inner = t.filter((p) => p.leaflet === "inner");
  assert.equal(outer.length, 30);
  assert.equal(inner.length, 30);
  const r = (p) => Math.hypot(p.x - 200, p.y - 150);
  assert.ok(Math.min(...outer.map(r)) > Math.max(...inner.map(r)));
  for (const p of outer) assert.ok(close(p.angle, Math.atan2(p.y - 150, p.x - 200)), "outer heads face out");
  for (const p of inner) assert.ok(close(p.angle, Math.atan2(p.y - 150, p.x - 200) + Math.PI), "inner heads face in");
});

test("autocat conserves, grows while it can, then stops", () => {
  const rand = NKC.rng(3);
  const s = { strands: [4], monomers: 200 };
  const total = NKC.autocat.total(s);
  let grew = false, last = s.strands.length;
  for (let i = 0; i < 500; i++) {
    const before = s.strands.length, could = s.monomers >= 4;
    NKC.autocat.step(s, rand);
    assert.equal(NKC.autocat.total(s), total);
    if (s.strands.length > before) { grew = true; assert.ok(could, "copied without enough monomers"); }
    last = s.strands.length;
  }
  assert.ok(grew);
  assert.ok(s.monomers < 4, "should have used up the monomers");
  const count = last;
  for (let i = 0; i < 100; i++) NKC.autocat.step(s, rand);
  assert.equal(s.strands.length, count, "no growth once the monomers run out");
});

test("autocat with decay returns monomers and still conserves", () => {
  const rand = NKC.rng(5);
  const s = { strands: [4, 4, 4], monomers: 20 };
  const total = NKC.autocat.total(s);
  for (let i = 0; i < 300; i++) NKC.autocat.step(s, rand, { copy: 0.05, decay: 0.02 });
  assert.equal(NKC.autocat.total(s), total);
});

test("protocell divides", () => {
  const rand = NKC.rng(3);
  const cells = NKC.protocell.step({ contents: 100, food: 40, threshold: 100 }, rand);
  assert.equal(cells.length, 2);
  assert.equal(cells[0].contents + cells[1].contents, 100);
});

test("protocell grows while fed", () => {
  const rand = NKC.rng(3);
  const [c] = NKC.protocell.step({ contents: 10, food: 40, threshold: 100 }, rand);
  assert.ok(c.contents > 10);
  assert.ok(c.food < 40);
  const [starved] = NKC.protocell.step({ contents: 10, food: 0, threshold: 100 }, rand);
  assert.equal(starved.contents, 10);
});

test("selection", () => {
  const rand = NKC.rng(3);
  let pop = { a: 50, b: 50 };
  for (let g = 0; g < 60; g++) pop = NKC.selection.generation(pop, { a: 1.2, b: 1.0 }, 100, rand);
  assert.equal(pop.a + pop.b, 100);
  assert.ok(pop.a / (pop.a + pop.b) > 0.8);
});
