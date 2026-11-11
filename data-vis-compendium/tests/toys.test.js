// SPDX-License-Identifier: GPL-3.0-only
// The two toys as content: the pattern dish on stop 3, and the nitrogen cycle as stop 6.1.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const NKC = require("../js/core.js");
require("../js/media.js");
require("../js/render.js");
require("../content/pictures.js");
require("../content/stops.js");
require("../js/anim.js");
require("../js/anim-pattern.js");

const ROOT = path.join(__dirname, "..");
const stop = (n) => NKC.ENTRIES.find((e) => e.kind === "stop" && e.number === n);
// A picture's own size, from its file: a PNG's header, or a JPEG's start-of-frame marker.
function sizeOnDisk(file) {
  const b = fs.readFileSync(path.join(ROOT, file));
  if (b.toString("latin1", 1, 4) === "PNG") return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  let i = 2;
  while (i < b.length) {
    const m = b[i + 1], len = b.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xc3) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  return null;
}

test("stop 3 ends with the pattern dish, captioned as a model and sourced", () => {
  const s = stop("3");
  assert.deepEqual(s.visuals[s.visuals.length - 1].type, "sim");
  assert.equal(s.visuals[s.visuals.length - 1].id, "dish");
  assert.match(s.visuals[s.visuals.length - 1].caption, /model/i);
  assert.ok(s.sources.some((x) => /Pearson/.test(x.text)) && s.sources.some((x) => /Gray, P\./.test(x.text)));
});
test("the nitrogen cycle is stop 6.1, the author's own, with their prose and the toy", () => {
  const s = stop("6.1");
  assert.equal(s.id, "nitrogen-cycle");
  assert.equal(s.title, "Nitrogen cycle demo: multi-organism nutrient cycling");
  assert.equal(s.label, "own");
  assert.match(s.text, /^While Winogradsky columns are useful demonstrations of microcosm/);
  assert.match(s.text, /nitrates are very important nutrients for farming/);
  assert.match(s.subtitle, /^About 78% of the atmosphere on Earth is N₂/);
  assert.match(NKC.entryHtml(s, "firm"), /<p class="subtitle">About 78%/);
  assert.ok(NKC.validateEntries([{ ...s, subtitle: "" }]).some((e) => /subtitle/.test(e)));
  assert.ok(s.sources.some((x) => /78|atmosphere/i.test(x.text)), "the subtitle's source");
  assert.ok(s.visuals.some((v) => v.type === "sim" && v.id === "ncycle"));
  assert.ok(s.sources.filter((x) => x.checked).length >= 4);
  assert.ok(s.sources.some((x) => /Kuypers|nitrogen-cycling network/i.test(x.text)));
});
test("the 6.x stops are renumbered around it", () => {
  assert.match(stop("6.2").title, /Anabaena/); assert.match(stop("6.3").title, /Sponges/);
  assert.match(stop("6.4").title, /Coral/); assert.match(stop("6.5").title, /Hydra/); assert.match(stop("6.6").title, /Fish/);
});
test("a subtitle is optional, sits between the label line and the text, and must be a non-empty string", () => {
  const base = { kind: "stop", id: "x", number: "99", title: "X", label: "own", text: "Body.", visuals: [{ type: "sim", id: "x" }], sideRoads: [], sources: [] };
  assert.deepEqual(NKC.validateEntries([base]), []);
  assert.doesNotMatch(NKC.entryHtml(base, "firm"), /class="subtitle"/);
  assert.deepEqual(NKC.validateEntries([{ ...base, subtitle: 7 }]), ["x: subtitle must be a non-empty string"]);
  assert.deepEqual(NKC.validateEntries([{ ...base, subtitle: "  " }]), ["x: subtitle must be a non-empty string"]);
  const html = NKC.entryHtml({ ...base, subtitle: "A *line* under it." }, "firm");
  assert.match(html, /<p class="meta">[^]*<\/p><p class="subtitle">A <i>line<\/i> under it\.<\/p><p class="text">Body\.<\/p>/);
});

// ---------------------------------------------------------------- stops 11.5 and 11.6, the stop-12 sentence, underlined headings
test("stop 11.5 fills space two ways: nature's hexagons and people's tilings and mazes", () => {
  const s = stop("11.5");
  assert.equal(s.id, "hexagons");
  assert.equal(s.title, "Ways to fill space with shapes");
  assert.equal(s.label, "own");
  assert.match(s.text, /growth and tiling|two ways/);
  assert.match(s.text, /maze|labyrinth/);
  assert.match(s.text, /still argued/);                                  // the bees' mechanism keeps its caveat
  assert.ok(s.sources.some((x) => /Natural Knowledge\*, ch\. 10/.test(x.text)) && s.sources.some((x) => /Hales/.test(x.text)));
  const pics = s.visuals.filter((v) => v.type === "gallery").flatMap((g) => g.pictures);
  assert.ok(pics.length >= 8);
  for (const re of [/comb|honeycomb/i, /causeway|basalt/i, /lozenge|diamond/i, /maze/i, /henna|mehndi/i, /tatau|tattoo/i, /labyrinth/i]) assert.ok(pics.some((p) => re.test(p.alt)), String(re));
});
test("stop 11.6, 3D constraints: twelve pentagons close a hexagonal net, in a ball, a molecule, two domes, and a virus", () => {
  const s = stop("11.6");
  assert.equal(s.id, "three-d"); assert.equal(s.title, "3D constraints"); assert.equal(s.label, "settled");
  assert.match(s.text, /twelve pentagons|12 pentagons/);
  const pics = s.visuals.filter((v) => v.type === "gallery").flatMap((g) => g.pictures);
  for (const re of [/football|soccer/i, /C.?60|fullerene|buckyball/i, /Biosph/i, /Spaceship Earth|Epcot/i, /virus|capsid/i]) assert.ok(pics.some((p) => re.test(p.alt)), String(re));
  assert.ok(s.sources.some((x) => /Kroto/.test(x.text)) && s.sources.some((x) => /Caspar/.test(x.text)));
});
test("stop 12 says what repetition does when it turns intricate", () => {
  assert.match(stop("12").text, /repeated/);
});
test("headings are underlined: the title only, not the space by the number or the label chip", () => {
  const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
  assert.match(css, /\.stop h2 \.title[^{]*\{[^}]*text-decoration: underline; text-underline-offset: 0\.18em; text-decoration-thickness: 1px/);
  assert.match(css, /\.road-panel h3 \.title \{[^}]*text-decoration: underline/);
  assert.doesNotMatch(css.match(/\.stop h2 \{[^}]*\}/)[0], /underline/);
  assert.doesNotMatch(css.match(/\.road-panel h3 \{[^}]*\}/)[0], /underline/);
  const html = NKC.entryHtml(stop("11.5"), "firm");
  assert.match(html, /<h2><span class="number">11\.5<\/span> <span class="title">Ways to fill space with shapes<\/span><\/h2>/);
  const host = NKC.ENTRIES.find((e) => (e.sideRoads || []).some((r) => r.id === "dreaming"));
  assert.match(NKC.entryHtml(host, "descriptive"), /<h3><span class="title">[^<]+<\/span> <span class="label label-account"/);
  assert.match(NKC.demoHtml(), /<h3><span class="title">A side road<\/span><\/h3>/);
});

// ---------------------------------------------------------------- the fix wave after the final review
const words = (s) => s.trim().split(/\s+/).length;
const sentences = (s) => s.split(/(?<=[.?!])\s+(?=[A-Z“(*])/);
const caption = (n, key) => stop(n).visuals.filter((v) => v.type === "gallery").flatMap((g) => g.pictures).find((p) => p.src === `assets/${key}.jpg`).caption;

test("the malu plate is whole, its uploader's labels painted out, and credited as a colonial-era record", () => {
  const p = NKC.PICTURES["samoan-malu"];
  assert.deepEqual(sizeOnDisk(p.src), { width: 923, height: 692 });   // the 550 × 692 plate, centred on a 4:3 canvas of its own paper
  assert.equal(p.width, 923); assert.equal(p.height, 692);
  const c = caption("11.5", "samoan-malu");
  assert.match(c, /from a German colonial-era record of 1899 \(the uploader's legend and the numbered pointers removed\)\./);
  assert.doesNotMatch(c, /cropped/);
});
test("stop 11.5 keeps its hedges: the basalt mostly six-sided, the pan an experiment, not nature", () => {
  const t = stop("11.5").text;
  assert.match(t, /the Causeway's cracked basalt, mostly six-sided\./);
  assert.match(t, /The heated pan at stop 1\.2 makes cells, often six-sided, for as long as the heat flows\./);
  assert.doesNotMatch(t, /Nature finds[^.]*heated pan/);
  for (const s of sentences(t)) assert.ok(words(s) < 40, s);
});
test("C₆₀ is named after Fuller and his domes, not after the dome's inventor", () => {
  const c = caption("11.6", "c60-model");
  assert.match(c, /named it after Buckminster Fuller and his geodesic domes\./);
  assert.doesNotMatch(c, /inventor/);
});
test("stop 6.1's caption: one tree and its microbes are a holobiont; each step is done by many kinds of microbe", () => {
  const c = stop("6.1").visuals.find((v) => v.id === "ncycle").caption;
  assert.match(c, /In real soil each step the microbes do is done by many kinds of microbe, and not all are bacteria/);
  assert.match(c, /with a host this time: each tree and its microbes can be called a holobiont\.$/);
  assert.match(c, /^A model of the cycle's shape, not of measured rates\./);
  for (const s of sentences(c)) assert.ok(words(s) < 40, s);
});
test("the dish's caption is short; the stirred tank and Pearson's map live in his source note", () => {
  const s = stop("3"), c = s.visuals.find((v) => v.id === "dish").caption;
  assert.ok(words(c) <= 66, `${words(c)} words`);
  assert.match(c, /^A model of a dish, not a dish\. /);
  assert.match(c, /all come from one pair of rules with two numbers changed\./);
  assert.match(c, /these aren't Turing patterns: a drop starts them\./);
  assert.match(c, /The real dish, with full spirals, is the BZ reaction in the side road below\.$/);
  assert.doesNotMatch(c, /stirred tank|Pearson/);
  assert.match(s.sources.find((x) => /^Pearson/.test(x.text)).text, /stirred tank[^)]*simulated dish[^)]*no stable Turing patterns/);
  for (const t of sentences(c)) assert.ok(words(t) < 40, t);
});
test("the NASA source note is in the house format", () => {
  assert.ok(stop("6.1").sources.some((x) => x.text === "NASA Goddard Space Flight Center, NSSDCA. “Earth Fact Sheet”. (Dry air by volume: 78.08% nitrogen, 20.95% oxygen.)"));
});
test("the readouts sit at the secondary text size, and the cycle's message holds two lines", () => {
  const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
  for (const sel of ["\\.dish-read", "\\.ncycle-msg", "\\.flock-readout"]) assert.match(css, new RegExp(`${sel} \\{[^}]*font-size: 1\\.25rem`), sel);
  assert.match(css, /\.ncycle-msg \{[^}]*line-height: 1\.55;[^}]*min-height: 3\.1em/);   // 2 × 1.55
  assert.match(css, /@media \(max-width: 40rem\) \{ \.ncycle-msg \{ min-height: 4\.65em; \} \}/);   // 3 × 1.55, on a phone
});
test("the cycle's six sliders draw one grey track, the dish's, with the step's colour on the thumb and the filled part", () => {
  const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
  assert.match(css, /\.ncycle-step input\[type=range\] \{[^}]*appearance: none;[^}]*--track: #EFEFEF; --track-edge: #B2B2B2;/);
  assert.match(css, /@media \(prefers-color-scheme: dark\) \{ \.ncycle-step input\[type=range\] \{ --track: #3B3B3B; --track-edge: #858585; \} \}/);
  assert.match(css, /::-webkit-slider-runnable-track \{[^}]*background: linear-gradient\(to right, var\(--c\) calc\(var\(--p\) \* \(100% - 16px\) \+ 8px\), var\(--track\) 0\)/);
  assert.match(css, /::-webkit-slider-thumb \{[^}]*background: var\(--c\)/);
  assert.match(css, /::-moz-range-track \{[^}]*background: var\(--track\)/);
  assert.match(css, /::-moz-range-progress \{[^}]*background: var\(--c\)/);
  assert.match(css, /::-moz-range-thumb \{[^}]*background: var\(--c\)/);
});
test("a links row's separators keep to the link before them, so no line starts with one", () => {
  const html = NKC.entryHtml(stop("15"), "firm");
  const row = html.match(/<p class="links">.*?<\/p>/)[0];
  assert.equal((row.match(/<\/a>&nbsp;· <a /g) || []).length, 4);
  assert.doesNotMatch(row, /<\/a> ·/);
});
test("a visual may carry a title, a non-empty string, shown as a heading above it", () => {
  const base = { kind: "stop", id: "x", number: "99", title: "X", label: "own", text: "Body.", visuals: [{ type: "sim", id: "x" }], sideRoads: [], sources: [] };
  assert.deepEqual(NKC.validateEntries([{ ...base, visuals: [{ type: "sim", id: "x", title: "A title" }] }]), []);
  assert.deepEqual(NKC.validateEntries([{ ...base, visuals: [{ type: "sim", id: "x", title: 7 }] }]), ["x: a visual's title must be a non-empty string"]);
  assert.deepEqual(NKC.validateEntries([{ ...base, visuals: [{ type: "sim", id: "x", title: "  " }] }]), ["x: a visual's title must be a non-empty string"]);
  assert.doesNotMatch(NKC.entryHtml(base, "firm"), /visual-title/);
  const html = NKC.entryHtml(stop("3"), "firm");
  assert.match(html, /<div class="visual" data-visual="dish" data-type="sim"><h3 class="visual-title">Interact with chemical properties to make fun shapes<\/h3><div class="anim-mount"><\/div><p class="caption">/);
  assert.deepEqual(NKC.validateEntries([stop("3")]), []);
  const css = fs.readFileSync(path.join(ROOT, "css/style.css"), "utf8");
  assert.match(css, /\.visual-title \{[^}]*font-size: calc\(1\.7rem \+ 0\.5pt\);[^}]*font-weight: 700;[^}]*text-decoration: underline; text-underline-offset: 0\.18em; text-decoration-thickness: 1px;/);
  assert.match(css, /\.visual-title \{ font-size: calc\(1\.55rem \+ 0\.5pt\); \}/);
});

// ---------------------------------------------------------------- the author's second pass of 11 November
const keyOf = (p) => p.src.replace(/^assets\/|\.(jpg|png)$/g, "");   // as tests/author-pass.test.js derives it

test("stop 10.1's ring of rings ends with a modern stadium and a concert hall", () => {
  const pics = stop("10.1").visuals.filter((v) => v.type === "gallery").flatMap((g) => g.pictures);
  const i = pics.findIndex((p) => /colosseum/i.test(p.alt));
  assert.ok(i >= 0 && pics.length >= i + 3);
  assert.match(pics[i + 1].alt, /stadium|field/i);
  assert.match(pics[i + 2].alt, /hall|auditorium|theater|theatre/i);
  for (const p of pics.slice(i + 1)) assert.ok(/CC|Public domain/i.test(NKC.PICTURES[keyOf(p)].licence), p.alt);
  assert.ok(stop("10.1").sources.some((x) => /Lincoln Financial Field|Geffen|Lincoln Center/.test(x.text)));
});
test("stop 6.3 shows a sponge still before the pumping video", () => {
  const v = stop("6.3").visuals;
  const i = v.findIndex((x) => (x.type === "video" || x.type === "clip") && /pTZ211cIjX8/.test(JSON.stringify(x)));
  assert.ok(i >= 1, "the video is there, not first");
  assert.equal(v[i - 1].type, "picture");   // the house's pic() helper makes { type: "picture", picture }
  assert.match(v[i - 1].picture.alt, /sponge/i);
});

// The k-nearest-neighbours toy opens on the author's ten dots (etc/knn_interactive_new_preset.png),
// in fractions of the board's width and height.
const PRESET = {
  red: [[0.20, 0.30], [0.38, 0.40], [0.28, 0.63], [0.56, 0.85], [0.64, 0.80]],
  blue: [[0.44, 0.19], [0.56, 0.33], [0.66, 0.36], [0.84, 0.28], [0.78, 0.66]],
};
const EXPECTED = Object.entries(PRESET).flatMap(([c, xy]) => xy.map(([x, y]) => `${c} ${x.toFixed(2)} ${y.toFixed(2)}`)).sort();
const asList = (pts) => pts.map((p) => `${p.c} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).sort();

test("the k-nearest-neighbours preset: five red and five blue dots on the board, with the boundary between them", () => {
  const s = NKC.pattern.STARTER;
  assert.equal(s.length, 10);
  assert.equal(s.filter((p) => p.c === "red").length, 5);
  assert.equal(s.filter((p) => p.c === "blue").length, 5);
  for (const p of s) assert.ok(p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1, JSON.stringify(p));
  assert.deepEqual(asList(s), EXPECTED);
  assert.equal(NKC.pattern.K, 3);   // the three nearest dots vote
  assert.equal(NKC.pattern.classify(s, 0.25, 0.45, NKC.pattern.K), "red");
  assert.equal(NKC.pattern.classify(s, 0.80, 0.30, NKC.pattern.K), "blue");
});

// A stand-in for the board, with only what the factory asks for: it records the dots each frame paints.
function fakeBoard() {
  const W = 600, H = 260, frames = [], on = {};
  const INK = Object.fromEntries(Object.entries(NKC.pattern.COL).map(([c, hex]) => [hex, c]));
  const ctx = new Proxy({}, {
    get: (t, k) => k === "fillRect" ? (x, y, w, h) => { if (x === 0 && y === 0 && w === W && h === H) frames.push([]); }
      : k === "arc" ? (x, y) => frames[frames.length - 1].push({ x: x / W, y: y / H, c: INK[t.fillStyle] })
      : k in t ? t[k] : () => {},
    set: (t, k, v) => { t[k] = v; return true; },
  });
  const canvas = { clientWidth: W, style: {}, getContext: () => ctx, addEventListener() {} };
  const button = (name) => ({ addEventListener: (type, f) => { on[name] = f; } });
  const parts = { canvas, "[data-action=reset]": button("reset"), "[data-action=random]": button("random") };
  const el = { innerHTML: "", querySelector: (s) => parts[s], querySelectorAll: () => [] };
  return { el, frames, click: (name) => on[name](), last: () => frames[frames.length - 1] };
}
test("the toy opens on the preset (the still frame under reduced motion too), and Start again brings it back", () => {
  for (const reducedMotion of [false, true]) {
    const b = fakeBoard();
    const c = NKC.mountVisual("pattern", b.el, { reducedMotion });
    assert.deepEqual(asList(b.last()), EXPECTED, `opening frame, reduced motion ${reducedMotion}`);
    const n = b.frames.length;
    c.impl.drawStill();
    assert.equal(b.frames.length, n + 1, "the still frame is drawn");
    assert.deepEqual(asList(b.last()), EXPECTED, "the still frame holds the preset");
    b.click("random");
    assert.equal(b.last().length, 11, "a random dot goes on top of the preset");
    b.click("reset");
    assert.deepEqual(asList(b.last()), EXPECTED, "Start again restores the preset");
  }
});

// The gallery crops every thumbnail to 4:3 (object-fit: cover), so a tall or wide picture showed only
// its middle: these three are re-made as 4:3 canvases with the whole picture centred.
test("the malu plate, the Syracuse coin, and the Jayuya arms are padded to the gallery's 4:3, whole", () => {
  for (const key of ["samoan-malu", "syracuse-coin", "jayuya-arms"]) {
    const p = NKC.PICTURES[key];
    assert.ok(Math.abs(p.width / p.height / (4 / 3) - 1) <= 0.01, `${key}: ${p.width}×${p.height}`);
    assert.ok(Math.max(p.width, p.height) <= 1400, key);
    assert.deepEqual(sizeOnDisk(p.src), { width: p.width, height: p.height }, key);
  }
  assert.match(NKC.PICTURES["jayuya-arms"].src, /\.png$/);
});

// ---------------------------------------------------------------- fix round 1 of the second pass
test("stop 10.1 names Lincoln Center, puts seats behind Geffen Hall's orchestra (not two arcs), and dates from about 5,000 years ago", () => {
  const s = stop("10.1");
  const pics = s.visuals.filter((v) => v.type === "gallery").flatMap((g) => g.pictures);
  const hall = pics.find((p) => p.src === "assets/berlin-philharmonie.jpg");
  assert.ok([...pics.map((p) => p.caption || ""), ...s.sources.map((x) => x.text)].some((t) => /Lincoln Center/.test(t)));
  assert.match(hall.caption, /^The Berlin Philharmonie, seen from the smaller arc of seats behind the orchestra: /);
  assert.match(hall.caption, /David Geffen Hall at Lincoln Center, New York, rebuilt inside and reopened in 2022, also has seats behind its orchestra; /);
  assert.doesNotMatch(hall.caption, /same two arcs/);
  assert.match(hall.alt, /standing concert-goers fill the right of the frame/);
  for (const t of sentences(hall.caption)) assert.ok(words(t) < 40, t);
  assert.equal(s.date, "from about 5,000 years ago");
});
test("the NOAA sponge note says where its link goes and keeps to the record's own place", () => {
  const x = stop("6.3").sources.find((y) => /reef3860/.test(y.text));
  assert.match(x.text, /, via Wikimedia Commons\./);
  assert.match(x.text, /Caribbean Sea, Cayman Islands\.\)$/);
  assert.doesNotMatch(x.text, /Little Cayman/);
});

// ---------------------------------------------------------------- Task 9: a bacteriophage among the 3D constraints
test("stop 11.6 ends with a micrograph of phages and a model of T4, both openly licensed, with the Fokine source", () => {
  const pics = stop("11.6").visuals.filter((v) => v.type === "gallery").flatMap((g) => g.pictures);
  const last = pics[pics.length - 1], before = pics[pics.length - 2];
  assert.match(last.alt, /T4|model/i);
  assert.match(last.alt, /phage/i);
  assert.match(before.alt, /micrograph|electron/i);
  assert.match(before.alt, /phage/i);
  for (const p of [last, before]) {
    assert.match(NKC.PICTURES[keyOf(p)].licence, /CC|Public domain/i);
    assert.match(p.alt + " " + (p.caption || ""), /icosahedr|facet|head/i);
    for (const t of sentences(p.caption)) assert.ok(words(t) < 40, t);
  }
  assert.match(last.caption, /model/i);
  assert.match(before.caption, /micrograph/i);
  assert.doesNotMatch(before.alt + before.caption, /T4/);
  assert.ok(stop("11.6").sources.some((x) => /Fokine|T4|capsid/.test(x.text)));
});

test("stop 14.2 shows three ways to store sound: a record, a cassette, a hard disk", () => {
  const s = stop("14.2");
  assert.equal(s.id, "audio-storage"); assert.equal(s.title, "Audio storage solutions: spirals and concentric circles");
  assert.match(s.text, /spiral/); assert.match(s.text, /concentric|not a spiral/);
  const pics = s.visuals.filter((v) => v.type === "gallery").flatMap((g) => g.pictures);
  assert.equal(pics.length, 3);
  assert.match(pics[0].alt, /record|turntable|stylus/i); assert.match(pics[1].alt, /cassette/i); assert.match(pics[2].alt, /hard disk|hard drive|platter/i);
  assert.match(pics[1].caption || pics[1].alt, /reel|hub|unequal|more tape/i);
  for (const p of pics) assert.ok(/CC|Public domain/i.test(NKC.PICTURES[keyOf(p)].licence), p.alt);
  assert.ok(s.sources.filter((x) => x.checked).length >= 3);
});
