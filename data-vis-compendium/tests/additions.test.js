// SPDX-License-Identifier: GPL-3.0-only
// The 10 November additions: new stops, side roads and visuals.
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/anim.js");
require("../js/anim-anabaena.js");
require("../js/anim-autocat.js");
require("../js/anim-dye.js");
require("../js/anim-langtree.js");
require("../js/anim-march.js");
require("../js/anim-pattern.js");
require("../js/anim-protocell.js");
require("../js/anim-pyramids.js");
require("../js/anim-quilt.js");
require("../js/anim-rings.js");
require("../js/anim-selection.js");
require("../js/anim-sponge.js");
require("../js/anim-vesicle.js");
require("../js/media.js");
require("../js/render.js");
require("../content/pictures.js");
require("../content/stops.js");

const stops = () => NKC.ENTRIES.filter((e) => e.kind === "stop");
const stop = (n) => stops().find((e) => e.number === n);
const road = (id) => stops().flatMap((s) => s.sideRoads).find((r) => r.id === id);

// ---------------------------------------------------------------- Task 3: stop 1.2 and the dye drop
test("stop 1 shows a real dye drop beside the dye animation, captioned for currents", () => {
  const s = stop("1");
  const v = s.visuals.find((x) => x.type === "video" && x.video.id === "FPvcfmiuyIg");
  assert.ok(v && /currents/.test(v.caption));
});
test("stop 1.2: dissipative structures, from the books' chapter 4", () => {
  const s = stop("1.2");
  assert.equal(s.id, "flows");
  assert.equal(s.label, "settled");
  assert.match(s.text, /only (for )?as long as/);
  assert.ok(s.visuals.filter((v) => v.type === "video").length >= 2, "pan hexagons and the candle");
  assert.ok(s.sources.some((x) => /Natural Knowledge\*, ch\. 4/.test(x.text)));
  assert.ok(s.sources.some((x) => /Prigogine/.test(x.text)));
});

// ---------------------------------------------------------------- Task 4: side roads on 2, 5 and 6; the RNA clip on 3
test("stop 2 side road: agar.io as an analogy, with the protocell-competition paper", () => {
  const r = road("absorbing");
  assert.equal(r.label, "analogy");
  assert.ok(r.visuals.some((v) => v.type === "video"));
  assert.ok(!r.visuals.some((v) => v.type === "picture" || v.type === "gallery"), "no game screenshots");
  assert.ok(r.sources.some((s) => /Chen, I\. A\., Roberts, R\. W\., & Szostak/.test(s.text)));
});
test("stop 3 has a short RNA clip beside the Szostak talk", () => {
  assert.ok(stop("3").visuals.filter((v) => v.type === "video").length >= 2);
});
test("stop 5 side road: many trials at once, labelled the author's own framing", () => {
  const r = road("parallel-trials");
  assert.equal(r.label, "own");
  assert.ok(r.sources.some((s) => /Natural Knowledge\*, ch\. 3/.test(s.text)));
  assert.ok(r.sources.filter((s) => s.checked).length >= 2);
  assert.ok(r.visuals.some((v) => v.type === "picture" || v.type === "gallery"), "the pipette");
});
test("stop 6 side road: a Winogradsky column, from the books' chapter 7", () => {
  const r = road("winogradsky");
  assert.equal(r.label, "settled");
  assert.ok(r.sources.some((s) => /Natural Knowledge\*, ch\. 7/.test(s.text)));
  assert.ok(r.sources.some((s) => /Esteban|Rundell/.test(s.text)));
});

// ---------------------------------------------------------------- Task 5: stops 10.1 and 10.2, two diagrams; the stop-10 side road
test("rings: one ring a year, outward, with the dated events on their years", () => {
  const rs = NKC.rings.rings(1900, 2026, [{ year: 1945, label: "1945: the war ends" }, { year: 1989, label: "1989: the Berlin Wall falls" }, { year: 2000, label: "2000: Y2K" }]);
  assert.equal(rs.length, 127);
  for (let i = 1; i < rs.length; i++) assert.ok(rs[i].r > rs[i - 1].r);
  assert.deepEqual(rs.filter((r) => r.label).map((r) => r.year), [1945, 1989, 2000]);
  assert.match(NKC.rings.svgHtml(false), /1989: the Berlin Wall falls/);
  assert.match(NKC.rings.svgHtml(false), /An illustration, not a real tree/);
  assert.equal(NKC.isStatic("rings"), true);
});
test("pyramids: four types, each named in the drawing", () => {
  assert.deepEqual(NKC.pyramids.TYPES, ["step", "smooth", "platform", "terraced"]);
  const svg = NKC.pyramids.svgHtml(false);
  for (const words of ["step pyramid", "smooth-sided", "platform with stairs", "terraced mound"]) assert.ok(svg.includes(words), words);
  assert.match(NKC.pyramids.svgHtml(true), /viewBox="0 0 420 /);
  assert.equal(NKC.isStatic("pyramids"), true);
});
test("stops 10.1 and 10.2 sit between the village and early art, dated", () => {
  assert.match(stop("10.1").title, /^Circles/);
  assert.match(stop("10.2").title, /^Pyramids/);
  for (const n of ["10.1", "10.2"]) { assert.ok(stop(n).date, n); assert.equal(stop(n).label, "settled"); }
  assert.ok(stop("10.1").visuals.some((v) => (v.type === "anim" && v.id === "rings") || (v.type === "gallery" && v.pictures.some((p) => /ring/i.test(p.alt)))));
  assert.ok(stop("10.1").sources.some((s) => /Natural Knowledge\*, ch\. 11/.test(s.text)));
  assert.ok(stop("10.2").visuals.some((v) => v.type === "anim" && v.id === "pyramids"));
  assert.ok(stop("10.2").visuals.some((v) => v.type === "gallery" && v.pictures.length >= 5));
});
test("stop 10 side road: building with the ground itself, with its dates in the text", () => {
  const r = road("earth-building");
  assert.match(r.text, /Petra/);
  assert.match(r.text, /\d{3,4}/, "dates in the text, since these are thousands of years after the village");
  assert.ok(r.sources.filter((s) => s.checked).length >= 2);
});
test("stop 10.2 says the Americas' pyramids were not copied from Egypt's, and never says angle of repose", () => {
  const t = stop("10.2").text;
  assert.match(t, /Caral/);
  assert.match(t, /not copied|separately|independently/);
  assert.doesNotMatch(t, /angle of repose/);
  assert.ok(stop("10.2").sources.some((s) => /Inomata/.test(s.text)));
});

// ---------------------------------------------------------------- Task 6: stop 11.5, the spider's web on 11, the stop-12 side road
test("stop 11 opens its spirals in nature with a spider building its web", () => {
  const s = stop("11");
  assert.ok(s.visuals.filter((v) => v.type === "video").length >= 2);
  assert.ok(s.sources.some((x) => /Natural Knowledge\*, ch\. 10/.test(x.text)));
});
test("stop 11.5 keeps its hexagons, with the honeycomb proof, the Causeway, and the link back to 1.2", () => {
  const s = stop("11.5");
  assert.equal(s.id, "hexagons");
  assert.equal(s.label, "own");                                         // now "Ways to fill space with shapes", the author's framing
  assert.match(s.text, /stop 1\.2|heated pan/);
  assert.ok(s.sources.some((x) => /Hales/.test(x.text)));
  assert.ok(s.sources.some((x) => /Goehring|Hofmann/.test(x.text)));
  assert.ok(s.visuals.some((v) => v.type === "gallery" && v.pictures.length >= 2));
});
test("stop 12 side road: spirals you can walk", () => {
  const r = road("walkable-spirals");
  assert.equal(r.label, "settled");
  assert.match(r.text, /Round Tower|Rundetaarn/);
  assert.ok(r.sources.some((s) => /Natural Knowledge\*, ch\. 10/.test(s.text)));
});

// ---------------------------------------------------------------- Task 7: stop 15, the outro, the covers, the series links
test("stop 15 carries the outro from the author's notes, and ends with the covers above the Amazon link", () => {
  const s = stop("15");
  assert.equal(s.label, "own");
  assert.match(s.text, /Gödel, Escher, Bach/);
  assert.match(s.text, /Spore/);
  assert.match(s.text, /open mind/);
  assert.ok(s.sources.some((x) => /Hofstadter/.test(x.text)) && s.sources.some((x) => /Spore/.test(x.text)));
  const p = s.visuals.find((v) => v.type === "picture");
  assert.equal(p.picture.src, "assets/covers.jpg");
  assert.equal(p.picture.ours, true);
  assert.deepEqual(s.links.map((l) => l.text), ["The series on Amazon", "The repository",
    "*Sid Meier's Civilization V* on Steam", "*Spore* on Steam", "*SpaceChem* on Steam"], "the series first, then the games in the author's order");
  assert.equal(s.links[0].url, "https://www.amazon.com/dp/B0HQGK8BQ8", "the stable form, with no search-session tail");
  assert.equal(s.links[1].url, "https://github.com/freddi-van-gogh/Natural_Knowledge_git");
  assert.ok(!s.visuals.some((v) => v.type === "todo"));
  assert.equal(s.coda, "More to come.");
  assert.ok(s.visuals.findIndex((v) => v.type === "video") < s.visuals.findIndex((v) => v.type === "picture"), "the trailer before the covers");
});
test("stop 15 names SpaceChem beside Spore, each with its own trailer from its maker's channel, and no screenshots", () => {
  const s = stop("15");
  assert.match(s.text, /Spore[^.]*SpaceChem/, "SpaceChem beside Spore, in the same point");
  assert.match(s.text, /I Am a Strange Loop/);
  assert.ok(s.sources.some((x) => /SpaceChem/.test(x.text) && x.checked));
  assert.ok(s.sources.some((x) => /Spore/.test(x.text) && x.checked && x.url === "https://en.wikipedia.org/wiki/Spore_(2008_video_game)"));
  assert.equal(s.sources.filter((x) => /Hofstadter/.test(x.text)).length, 2, "both books");
  assert.deepEqual(s.visuals.map((v) => v.type), ["video", "video", "picture"]);
  assert.deepEqual(s.visuals.filter((v) => v.type === "video").map((v) => [v.video.id, v.video.channel]),
    [["WGJOlq6-upY", "Electronic Arts"], ["w1_w_-46rV0", "Zachtronics"]]);
  assert.ok(!s.visuals.some((v) => v.type === "gallery"), "no game screenshots");
  assert.doesNotMatch(s.text, /\b(obviously|simply|of course|clearly|just a|is just|just because)\b/i);
  assert.doesNotMatch(s.text, /\[|draft/i, "no placeholder and no draft marker on the page");
});
test("coda: one line after the links, validated as a non-empty string", () => {
  const s = stop("15");
  const html = NKC.entryHtml(s, "descriptive");
  assert.match(html, /<p class="coda">More to come\.<\/p>/);
  assert.ok(html.indexOf('class="coda"') > html.indexOf('class="links"'));
  assert.ok(NKC.validateEntries([{ ...s, coda: "" }]).some((e) => /coda/.test(e)));
});
test("coda: optional, and a stop without one renders no coda line", () => {
  const s = stop("14.1");
  assert.equal(s.coda, undefined);
  assert.doesNotMatch(NKC.entryHtml(s, "descriptive"), /class="coda"/);
  assert.ok(NKC.validateEntries([{ ...stop("15"), coda: 3 }]).includes("strange-loop: coda must be a non-empty string"));
});
test("the covers strip is four covers wide and carries no metadata", () => {
  const { width, height } = NKC.PICTURES.covers;
  assert.equal(width, 1400);
  assert.ok(Math.abs(width / height - (4 * 1600 + 3 * 24) / 2560) < 0.02);   // four covers and three 24 px gaps
});
test("credits mark our own picture as ours", () => {
  const { creditsText, creditsHtml } = require("../tools/make-credits.js");
  assert.match(creditsText(NKC.ENTRIES), /assets\/covers\.jpg[^\n]*the compendium's own/);
  assert.match(creditsText(NKC.ENTRIES), /Pictures marked “the compendium's own” are ours \(CC BY-SA 4\.0\); the rest were made by others\./);
  assert.match(creditsHtml(NKC.ENTRIES), /assets\/covers\.jpg[^\n]*the compendium&#39;s own/);
  assert.doesNotMatch(creditsText(NKC.ENTRIES), /starlings-rome\.jpg[^\n]*the compendium's own/, "others' pictures keep their licence");
});
test("stop 15: the author's caption on the Spore trailer, with Science's F sourced; the game titles in italics", () => {
  const s = stop("15");
  const spore = s.visuals.find((v) => v.type === "video" && v.video.id === "WGJOlq6-upY");
  assert.match(spore.caption, /gave it an F/);
  assert.match(spore.caption, /^Evolution wouldn't be much fun, but here's a game's attempt at it: keep in mind that \*Science\*, a highly circulated research journal, gave it an F\./);
  assert.ok(s.sources.some((x) => /Bohannon/.test(x.text) && /Flunking Spore/.test(x.text) && x.url === "https://doi.org/10.1126/science.322.5901.531b"));
  assert.match(s.text, /\*Spore\* \(Maxis[^.]*\*SpaceChem\* \(Zachtronics, 2011\), an indie puzzle game of building reactor patterns/);
  assert.doesNotMatch(s.text, /(^|[^*])\b(Spore|SpaceChem)\b(?!\*)/, "every mention of a game title is in italics");
});
test("stop 15, the author's wording: toyish and over-simplified; SpaceChem plainly a second inspiration, Civilization V a third; six sentences", () => {
  const t = stop("15").text;
  assert.match(t, /a toyish and over-simplified version of early life; another was \*SpaceChem\*/);
  assert.match(t, /reactor patterns; a third was \*Sid Meier's Civilization V\*/);
  assert.match(t, /military domination\. Games and data visualization often put an image in the mind/);
  assert.equal(t.split(/(?<=\.)\s+(?=[A-Z])/).length, 6);
});

// ---------------------------------------------------------------- the final review's fix wave
const galleryOf = (visuals) => visuals.filter((v) => v.type === "gallery").flatMap((v) => v.pictures);
const pictureNamed = (key) => stops().flatMap((s) => [s, ...s.sideRoads]).flatMap((e) => [
  ...(e.visuals || []).filter((v) => v.type === "picture").map((v) => v.picture), ...galleryOf(e.visuals || [])]).find((p) => p.src === `assets/${key}.jpg`);

test("the honeycomb is named as comb on a beekeeper's foundation sheet, so it settles nothing", () => {
  const p = pictureNamed("honeycomb");
  assert.equal(p.caption, "Honeycomb on a beekeeper's foundation sheet, whose embossed hexagons set the plan; the walls are the bees' own.");
  assert.match(p.alt, /foundation sheet/);
});
test("the Causeway tops say they are cropped (CC BY-SA asks for changes to be shown)", () => {
  assert.match(pictureNamed("causeway-tops").caption, /cropped/i);
});
test("the milk in coffee claims no more than its sources", () => {
  const p = pictureNamed("milk-coffee");
  assert.equal(p.caption, "Milk poured into coffee: the start of the mixing. Left unstirred it keeps mixing for a while: a cup is a place to watch convection.");
});
test("Lenski's move to UT Austin in 2022 is sourced to the 2022 release, opened and checked", () => {
  const s = road("parallel-trials").sources;
  const release = s.find((x) => x.url === "https://www.eurekalert.org/news-releases/957174");
  assert.ok(release && release.checked);
  assert.match(release.text, /27 June/);
  assert.match(release.text, /UT Austin|University of Texas at Austin/);
  const msu = s.find((x) => /MSU Today/.test(x.text));
  assert.doesNotMatch(msu.text, /UT Austin from 2022/);
  assert.equal(s.indexOf(release), s.indexOf(msu) + 1, "beside MSU Today");
});
test("the credits say once that our own pictures are CC BY-SA", () => {
  const { creditsText } = require("../tools/make-credits.js");
  const intro = creditsText(NKC.ENTRIES).split("\n")[2];
  assert.match(intro, /Our own text and data are CC BY-SA 4\.0; our code is GPL-3\.0/);
  assert.doesNotMatch(intro, /data, and pictures/);
});
test("Science's grades for Spore are checked and given in the source", () => {
  const b = stop("15").sources.find((x) => /Bohannon/.test(x.text));
  assert.equal(b.checked, true);
  assert.match(b.text, /graded by area: evolutionary biology F, sociology B\+/);
});
test("the spiral road: a DNA helix, a conch, and a shofar beside the nautilus, from the books' chapter 10", () => {
  const r = road("spiral-shapes");
  const pics = galleryOf(r.visuals);
  for (const re of [/DNA/i, /conch/i, /shofar|ram's horn/i]) assert.ok(pics.some((p) => re.test(p.alt)), String(re));
  assert.match(r.text, /DNA/);
  assert.match(r.text, /shofar|ram's horn/);
  assert.ok(r.sources.some((s) => s.text === "*Natural Knowledge*, ch. 10, on helices and growth spirals."));
  const OPEN = /^(public domain|CC0( 1\.0)?|CC BY( \d\.\d( [a-z]{2})?)?|CC BY-SA( \d\.\d( [a-z]{2})?)?)$/i;   // core.js's OPEN_LICENCE
  for (const key of ["dna-helix", "conch-spire", "shofar"]) {
    const p = NKC.PICTURES[key];
    assert.ok(p, key);
    assert.match(p.licence, OPEN, key);
    assert.match(p.sourceUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, key);
    assert.ok(Number.isInteger(p.width) && Number.isInteger(p.height) && Math.max(p.width, p.height) <= 1400, key);
  }
  assert.deepEqual(NKC.validateEntries(NKC.ENTRIES, { strict: true }), []);
});
