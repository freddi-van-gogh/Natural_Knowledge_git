// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/anim.js");
for (const f of ["anim-march", "anim-pattern", "anim-langtree", "anim-quilt"]) require(`../js/${f}.js`);

test("bush: five figures; ape and human share a parent that isn't either of them", () => {
  const nodes = NKC.march.bushLayout();
  const figs = nodes.filter((n) => n.figure);
  assert.equal(figs.length, 5);
  assert.deepEqual(figs.map((n) => n.figure).sort(), ["ape", "fish", "human", "lobefin", "tetrapod"]);
  const ape = figs.find((n) => n.figure === "ape"), human = figs.find((n) => n.figure === "human");
  assert.equal(ape.parent, human.parent);
  assert.ok(ape.parent && ape.parent !== "ape" && ape.parent !== "human");
  const ids = new Set(nodes.map((n) => n.id));
  for (const n of nodes) if (n.parent) assert.ok(ids.has(n.parent), `${n.id}'s parent ${n.parent} exists`);
  for (const n of nodes) assert.ok(Number.isFinite(n.x) && Number.isFinite(n.y));
});

test("march order: fish first, human last", () => {
  assert.deepEqual(NKC.march.MARCH, ["fish", "lobefin", "tetrapod", "ape", "human"]);
});

test("classify by nearest dots", () => {
  const pts = [{ x: 0, y: 0, c: "red" }, { x: 1, y: 0, c: "red" }, { x: 0, y: 1, c: "red" },
    { x: 10, y: 10, c: "blue" }, { x: 11, y: 10, c: "blue" }, { x: 10, y: 11, c: "blue" }];
  assert.equal(NKC.pattern.classify(pts, 0.5, 0.5, 3), "red");
  assert.equal(NKC.pattern.classify(pts, 10.5, 10.5, 3), "blue");
  assert.equal(NKC.pattern.classify([], 1, 1, 3), null);
  assert.equal(NKC.pattern.classify([{ x: 0, y: 0, c: "blue" }], 50, 50, 3), "blue");
});

test("pattern ships with ten starter dots of both colours (the author's preset)", () => {
  const s = NKC.pattern.STARTER;
  assert.equal(s.length, 10);
  assert.ok(s.some((p) => p.c === "red") && s.some((p) => p.c === "blue"));
});

test("langtree: ten branches, each with a language and a word", () => {
  const t = NKC.langtree.TREE;
  assert.equal(t.children.length, 10);
  assert.deepEqual(t.children.map((c) => c.branch),
    ["Anatolian", "Tocharian", "Indo-Iranian", "Armenian", "Hellenic", "Albanian", "Italic", "Celtic", "Germanic", "Balto-Slavic"]);
  for (const c of t.children) assert.ok(c.lang && c.word, c.branch);
});

test("langtree layout: leaves strictly left to right, root above them", () => {
  const pos = NKC.langtree.layout(NKC.langtree.TREE, 1000, 300);
  const leaves = pos.filter((p) => p.node !== NKC.langtree.TREE);
  const root = pos.find((p) => p.node === NKC.langtree.TREE);
  for (let i = 1; i < leaves.length; i++) assert.ok(leaves[i].x > leaves[i - 1].x);
  for (const l of leaves) assert.ok(l.y > root.y);
});

test("quilt: seams join real patches; both archaic cousins stitched in by admixture", () => {
  const ids = new Set(NKC.quilt.PATCHES.map((p) => p.id));
  for (const s of NKC.quilt.SEAMS) {
    assert.ok(ids.has(s.from) && ids.has(s.to), `${s.from} → ${s.to}`);
    assert.ok(s.kind === "migration" || s.kind === "admixture");
  }
  for (const cousin of ["neanderthals", "denisovans"]) {
    assert.ok(NKC.quilt.SEAMS.some((s) => s.from === cousin && s.kind === "admixture"), cousin);
  }
  assert.ok(NKC.quilt.SEAMS.some((s) => s.from === "africa" && s.kind === "migration"));
});

test("pattern markup carries the fixed line and both colour buttons", () => {
  const html = NKC.pattern.uiHtml();
  assert.match(html, /The computer only ever asks: which colours are closest\?/);
  assert.match(html, /data-colour="red"[^>]*aria-pressed="true"/);
  assert.match(html, /data-colour="blue"[^>]*aria-pressed="false"/);
});

test("march markup has a toggle that names the honest version", () => {
  assert.match(NKC.march.svgHtml(), /<svg[^>]+viewBox="0 0 1000 380"/);
  assert.match(NKC.march.buttonHtml(false), /Show it as it really was/);
  assert.match(NKC.march.buttonHtml(true), /Show the march again/);
});
