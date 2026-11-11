// SPDX-License-Identifier: GPL-3.0-only
// The author's 11 November pass: sponge arrows, body text, quilt patches, the spiral gallery,
// stop 15, and the Dreaming road.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const NKC = require("../js/core.js");
require("../js/anim.js");
require("../js/anim-quilt.js");
require("../js/anim-sponge.js");
require("../js/media.js");
require("../js/render.js");
require("../content/pictures.js");
require("../content/stops.js");

const ROOT = path.join(__dirname, "..");
const stop = (n) => NKC.ENTRIES.filter((e) => e.kind === "stop").find((e) => e.number === n);
const OLD_HEAD = 10;   // the head length arrow() used before this pass (git: js/anim-sponge.js, `h = 10`)

test("sponge arrows are wider with bigger heads", () => {
  const A = NKC.sponge.ARROW;
  assert.equal(A.width, 5.4); assert.equal(A.wideWidth, 9);
  assert.equal(A.head, 2 * OLD_HEAD);
  const h = NKC.sponge.svgHtml(false);
  assert.ok((h.match(/stroke-width="5.4"/g) || []).length >= 6 && h.includes('stroke-width="9"'));
  assert.ok(!/stroke="#[0-9A-Fa-f]{6}" stroke-width="3"\/><polygon/.test(h), "no thin arrows left");
});
test("body text is about half again as large, and the secondary text keeps step", () => {
  const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
  assert.match(css, /body \{[^}]*font-size: 1\.7rem/);
  assert.match(css, /body \{ font-size: 1\.55rem; \}/);
  assert.match(css, /\.visual \.caption \{[^}]*font-size: 1\.25rem/);
});
test("the quilt's archaic patches are rounder than the continents, and their one figure is a dashed outline", () => {
  const h = NKC.quilt.svgHtml("", 1);
  assert.match(h, /class="q-patch archaic"><rect [^>]*rx="28"/);
  assert.match(h, /class="q-patch"><rect [^>]*rx="10"/);
  const archaic = h.match(/<g class="q-patch archaic">[\s\S]*?<\/g>/g), continents = h.match(/<g class="q-patch">[\s\S]*?<\/g>/g);
  assert.equal(archaic.length, 2);
  for (const g of archaic) assert.ok(/fill="none"/.test(g) && /stroke-dasharray/.test(g), "dashed outline figure");
  for (const g of continents) assert.ok(!/stroke-dasharray/.test(g), "solid group");
});
test("headings sit half a point above the body text, bold", () => {
  const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
  assert.match(css, /\.stop h2 \{[^}]*font-size: calc\(1\.7rem \+ 0\.5pt\)[^}]*font-weight: 700/);
  assert.match(css, /\.stop h2 \{ font-size: calc\(1\.55rem \+ 0\.5pt\)/);
  assert.match(css, /\.road-panel h3 \{[^}]*font-size: calc\(1\.7rem \+ 0\.5pt\)[^}]*font-weight: 700/);
  assert.match(css, /\.road-panel h3 \{ font-size: calc\(1\.55rem \+ 0\.5pt\)/);
});
test("the how-this-was-made prose keeps step with the other secondary text", () => {
  const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
  assert.match(css, /\.how-made \{ font-size: 1\.25rem; \}/);
});
test("the spiral road runs the flagellum, DNA, corkscrew, the two nautiluses, the conch, a live ram, the shofar", () => {
  const road = NKC.ENTRIES.flatMap((e) => e.sideRoads || []).find((r) => r.id === "spiral-shapes");
  // A picture carries no key of its own: its key is its file's name in assets/.
  const key = (p) => p.src.replace(/^assets\/|\.(jpg|png)$/g, "");
  const ids = road.visuals.filter((v) => v.type === "gallery").flatMap((g) => g.pictures.map(key));
  const ram = ids[6];
  assert.deepEqual(ids, ["flagellum", "dna-helix", "corkscrew", "nautilus-log", "nautilus-golden", "conch-spire", ram, "shofar"]);
  const pic = road.visuals.flatMap((g) => g.pictures || []).find((p) => key(p) === ram);
  assert.match(pic.alt, /ram|ibex|argali|mouflon|bighorn|goat/i); assert.match(pic.alt, /horn/i);
  assert.ok(NKC.PICTURES[ram] && /CC|Public domain/i.test(NKC.PICTURES[ram].licence));
});
test("stop 15 breaks into two paragraphs and names three games with their store links", () => {
  const s = stop("15");
  assert.match(s.text, /with an open mind\.\n\nPart of the inspiration/);
  assert.match(s.text, /\*Sid Meier's Civilization V\* \(Firaxis, 2010\): A game where you play various civilizations around the world evolving through various cultural achievements and empire expansion, even ending in diplomacy and victories that can be based on the Space Race, winning a majority favour at the United Nations, or even military domination\./);
  const html = NKC.entryHtml(s, "firm");
  assert.equal((html.match(/<p class="text">/g) || []).length, 2);
  for (const u of ["https://store.steampowered.com/app/8930/Sid_Meiers_Civilization_V/", "https://store.steampowered.com/app/17390/SPORE/", "https://store.steampowered.com/app/92800/SpaceChem/"]) assert.ok(s.links.some((l) => l.url === u), u);
  assert.ok(s.sources.some((x) => /Civilization V/.test(x.text)));
});
test("a text without a blank line renders one paragraph, as before", () => {
  assert.equal((NKC.entryHtml(stop("14"), "firm").match(/<p class="text">/g) || []).length, 1);
});
test("the Dreaming road's text matches what is on the page", () => {
  const road = NKC.ENTRIES.flatMap((e) => e.sideRoads || []).find((r) => r.id === "dreaming");
  assert.match(road.text, /Aunty Munya Andrews/);
  assert.match(road.text, /Ken Walker/);
  // The link shows in the road itself, not only in its collapsed sources.
  const host = NKC.ENTRIES.find((e) => (e.sideRoads || []).includes(road));
  const html = NKC.entryHtml(host, "firm");
  assert.ok(html.includes('href="https://nambucca-bellingen.storylines.com.au/?p=571"'));
  const panel = html.slice(html.indexOf('id="road-dreaming"'), html.indexOf("road-close", html.indexOf('id="road-dreaming"')));
  assert.match(panel, /<p class="links"><a href="https:\/\/nambucca-bellingen\.storylines\.com\.au\/\?p=571"[^>]*>Elder Ken Walker&#39;s Gumbaynggirr story on Storylines<\/a><\/p>/);
  assert.ok(panel.indexOf('class="links"') < panel.indexOf('class="sources"'), "the link before the sources");
});
test("a road's links are checked like a stop's", () => {
  const host = NKC.ENTRIES.find((e) => (e.sideRoads || []).some((r) => r.id === "dreaming"));
  const bad = { ...host, sideRoads: host.sideRoads.map((r) => (r.id === "dreaming" ? { ...r, links: [{ text: "x", url: "http://example.org" }] } : r)) };
  assert.ok(NKC.validateEntries([bad]).includes("dreaming: link 1 needs text and an https url"));
  const notList = { ...host, sideRoads: host.sideRoads.map((r) => (r.id === "dreaming" ? { ...r, links: "x" } : r)) };
  assert.ok(NKC.validateEntries([notList]).includes("dreaming: links must be a list"));
  assert.deepEqual(NKC.validateEntries([host]), []);
});
