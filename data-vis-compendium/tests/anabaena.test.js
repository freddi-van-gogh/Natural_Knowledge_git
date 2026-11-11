// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const NKC = require("../js/core.js");
require("../js/anim.js");
require("../js/anim-anabaena.js");
require("../content/pictures.js");
require("../content/stops.js");

const ROOT = path.join(__dirname, "..");
const stop = (n) => NKC.ENTRIES.find((e) => e.kind === "stop" && e.number === n);

test("anabaena: one heterocyst in about every 10 to 20 cells, never two together", () => {
  const cells = NKC.anabaena.cells(23, 11);
  assert.equal(cells.length, 23);
  const h = cells.map((c, i) => (c === "heterocyst" ? i : -1)).filter((i) => i >= 0);
  assert.ok(h.length >= 2, "at least two heterocysts to show the spacing");
  for (let i = 1; i < h.length; i++) assert.ok(h[i] - h[i - 1] - 1 >= 10, "at least ten ordinary cells between");
  assert.ok(cells.every((c) => c === "heterocyst" || c === "vegetative"));
});

test("anabaena diagram names the parts and the exchange", () => {
  const svg = NKC.anabaena.svgHtml(false);
  for (const word of ["heterocyst", "sugar", "fixed nitrogen", "no oxygen made here", "extra walls"]) {
    assert.ok(svg.includes(word), word);
  }
  assert.match(NKC.anabaena.svgHtml(true), /viewBox="0 0 420 /);   // a narrower drawing for phones
  assert.equal(NKC.isStatic("anabaena"), true);
});

test("stop 6.2 is Anabaena; sponges, coral and Hydra follow as 6.3, 6.4 and 6.5", () => {
  assert.match(stop("6.2").title, /Anabaena/);
  assert.ok(stop("6.2").visuals.some((v) => v.type === "anim" && v.id === "anabaena"));
  assert.ok(stop("6.2").sources.filter((s) => s.checked).length >= 3);
  assert.match(stop("6.3").title, /Sponges/);
  assert.match(stop("6.4").title, /Coral/);
  assert.match(stop("6.5").title, /Hydra/);
});

test("the subtitle takes the Oxford comma", () => {
  for (const f of ["index.html", "README.md"]) {
    assert.match(fs.readFileSync(path.join(ROOT, f), "utf8"), /art, memes, and music/, f);
  }
  assert.match(fs.readFileSync(path.join(ROOT, "..", "README.md"), "utf8"), /art, memes, and music/, "root README");
});
