// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/anim.js");
require("../js/anim-sponge.js");
require("../js/anim-anabaena.js");
require("../content/pictures.js");
require("../content/stops.js");

test("sponge: a wall of many repeated chambers, none overlapping", () => {
  const ch = NKC.sponge.chambers(4, 6);
  assert.equal(ch.length, 48, "chambers on both walls of the vase");
  for (let i = 0; i < ch.length; i++) {
    for (let j = i + 1; j < ch.length; j++) {
      assert.ok(Math.hypot(ch[i].x - ch[j].x, ch[i].y - ch[j].y) >= 2 * ch[i].r, `chambers ${i} and ${j} overlap`);
    }
  }
});

test("sponge diagram names the way the water goes", () => {
  const svg = NKC.sponge.svgHtml(false);
  for (const words of ["water in through tiny pores", "chambers lined with collar cells", "water out", "one chamber, enlarged"]) {
    assert.ok(svg.includes(words), words);
  }
  assert.match(NKC.sponge.svgHtml(true), /viewBox="0 0 420 /);
  assert.equal(NKC.isStatic("sponge"), true);
});

test("sponges are main stop 6.3, just before the coral, with the diagram and the author's video", () => {
  const r = NKC.ENTRIES.find((e) => e.kind === "stop" && e.number === "6.3");
  assert.equal(r.id, "sponges");
  assert.ok(!NKC.ENTRIES.find((e) => e.number === "6.2").sideRoads.some((x) => x.id === "sponges"), "no longer a side road");
  assert.equal(r.title, "Sponges building structure from repeated little houses");
  assert.ok(r.visuals.some((v) => v.type === "anim" && v.id === "sponge"));
  const v = r.visuals.find((x) => x.type === "video").video;
  assert.equal(v.id, "pTZ211cIjX8");
  assert.equal(v.title, "Amazing footage of sponges pumping!");
  assert.equal(v.channel, "BlueWorldTV");
  assert.ok(r.sources.filter((x) => x.checked).length >= 2);
});

test("the Anabaena diagram's phone title fits its width", () => {
  assert.match(NKC.anabaena.svgHtml(true), /class="ab-title-n"/);
});
