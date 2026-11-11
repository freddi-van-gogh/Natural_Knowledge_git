// SPDX-License-Identifier: GPL-3.0-only
// Tests for the findings of the final review (each written to fail before its fix).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const NKC = require("../js/core.js");
require("../js/media.js");
require("../js/anim.js");
require("../js/render.js");
require("../js/sim-flock.js");
require("../js/anim-pattern.js");
require("../js/anim-autocat.js");
require("../js/anim-quilt.js");
require("../content/pictures.js");
require("../content/stops.js");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const byId = (id) => NKC.ENTRIES.find((e) => e.id === id);
const road = (id) => NKC.ENTRIES.filter((e) => e.kind === "stop").flatMap((s) => s.sideRoads).find((r) => r.id === id);
function pictures() {
  const out = [];
  const visit = (vs) => (vs || []).forEach((v) => {
    if (v.type === "picture") out.push(v.picture);
    if (v.type === "gallery") out.push(...v.pictures);
  });
  for (const s of NKC.ENTRIES.filter((e) => e.kind === "stop")) { visit(s.visuals); s.sideRoads.forEach((r) => visit(r.visuals)); }
  return out;
}

// ------------------------------------------------------------------ content
test("variolation: Onesimus told Cotton Mather; the 1721 figures are not his", () => {
  const t = road("variolation").text;
  assert.match(t, /Onesimus[^.]*Cotton Mather/);
  assert.doesNotMatch(t, /Onesimus, described it:/);
});

test("march: Zallinger's 1965 line was of primates", () => {
  const t = byId("march").text;
  assert.match(t, /1965/);
  assert.match(t, /primates/);
});

test("jungle: the licence sentence is quoted whole", () => {
  assert.match(byId("jungle").text, /release derivative work under the same terms/);
});

test("selection caption doesn't promise the faster kind always wins", () => {
  assert.match(byId("selection").visuals.find((v) => v.type === "anim").caption, /usually/);
});

test("Amen Break count is not rounded up", () => {
  const t = byId("amen-break").text;
  assert.match(t, /more than 1,800/);
  assert.doesNotMatch(t, /nearly 2,000/);
});

test("the quilt is labelled an illustration", () => {
  const q = byId("out-of-africa").visuals.find((v) => v.id === "quilt");
  assert.match(q.opts.caption, /^An illustration/);
});

test("the slider states the 2013 finding", () => {
  assert.match(NKC.flock.uiHtml(), /A 2013 study of the Rome flocks found that six or seven gives the best balance/);
});

test("the Google Timelapse credit sits on the video, not the NASA picture", () => {
  const o = road("oxbow");
  const pic = o.visuals.find((v) => v.type === "picture").picture;
  const vid = o.visuals.find((v) => v.type === "video");
  assert.doesNotMatch(pic.caption || "", /Google/);
  assert.match(vid.caption, /Google Earth Timelapse \(Google, Landsat, Copernicus\)/);
});

test("Denisovans: the altitude gene is Denisovan-like", () => {
  assert.match(road("denisovans").text, /Denisovan-like/);
});

test("How this was made says where the compendium's facts came from", () => {
  const html = read("index.html");
  assert.doesNotMatch(html, /working from the author's own notes, research and writing/);
  assert.match(html, /research assistants/);
});

test("mixed files say which part is which", () => {
  assert.match(read("index.html"), /<!-- The code in this file is GPL-3\.0; its prose is CC BY-SA 4\.0\. -->/);
  assert.match(read("README.md"), /`index\.html`[^.]*prose[^.]*CC BY-SA 4\.0/);
});

// ------------------------------------------------------------------ videos
const video = { id: "abcdefghijk", title: "A murmuration", channel: "Some Channel", start: 30 };

test("a video card carries everything needed to rebuild it", () => {
  const html = NKC.videoCardHtml(video);
  assert.match(html, /<div class="video-card" data-video-id="abcdefghijk" data-title="A murmuration" data-channel="Some Channel" data-start="30">/);
  assert.deepEqual(NKC.videoFromCard({ videoId: "abcdefghijk", title: "A murmuration", channel: "Some Channel", start: "30" }), video);
});

test("a playing card keeps its title, channel and watch link under the player", () => {
  const html = NKC.playingCardHtml(video);
  assert.match(html, /<iframe[^>]+src="https:\/\/www\.youtube-nocookie\.com\/embed\/abcdefghijk\?autoplay=1&amp;rel=0&amp;start=30"/);
  assert.match(html, /Watch on YouTube/);
  assert.match(html, /Some Channel/);
});

test("on a double-clicked page, play opens YouTube instead of embedding", () => {
  assert.equal(NKC.playMode("file:"), "open");
  assert.equal(NKC.playMode("https:"), "embed");
});

// ------------------------------------------------------------------ pause
test("animations can be paused, and a paused one stays paused when scrolled back", () => {
  const counts = { start: 0, stop: 0 };
  NKC.registerVisual("fake-pause", () => ({ start() { counts.start++; }, stop() { counts.stop++; } }));
  const c = NKC.mountVisual("fake-pause", {}, { reducedMotion: false });
  NKC.setVisible(c, true);
  NKC.pause(c);
  assert.equal(c.running, false);
  assert.equal(c.paused, true);
  NKC.setVisible(c, false);
  NKC.setVisible(c, true);
  assert.equal(counts.start, 1, "must not restart while paused");
  NKC.play(c);
  assert.equal(c.running, true);
  assert.equal(c.paused, false);
});

// ------------------------------------------------------------------ pictures and licences
test("licence names link to their licence", () => {
  assert.equal(NKC.licenceUrl("CC BY 2.0"), "https://creativecommons.org/licenses/by/2.0/");
  assert.equal(NKC.licenceUrl("CC BY-SA 3.0 FR"), "https://creativecommons.org/licenses/by-sa/3.0/fr/");
  assert.equal(NKC.licenceUrl("CC BY-SA 4.0"), "https://creativecommons.org/licenses/by-sa/4.0/");
  assert.equal(NKC.licenceUrl("CC0"), "https://creativecommons.org/publicdomain/zero/1.0/");
  assert.equal(NKC.licenceUrl("Public domain"), null);
  const html = NKC.pictureHtml({ src: "assets/a.jpg", alt: "A", creator: "C", licence: "CC BY 2.0", sourceUrl: "https://example.org/a", width: 10, height: 20 });
  assert.match(html, /href="https:\/\/creativecommons\.org\/licenses\/by\/2\.0\/"/);
  assert.match(html, /href="https:\/\/example\.org\/a"/);
  assert.match(html, /width="10" height="20"/);
});

test("every picture has its size, so the page doesn't jump as they load", () => {
  for (const p of pictures()) assert.ok(Number.isInteger(p.width) && Number.isInteger(p.height), p.src);
});

test("every picture credits a named creator", () => {
  for (const p of pictures()) assert.doesNotMatch(p.creator, /Commons contributor|none given/i, p.src);
});

// ------------------------------------------------------------------ credits and licence files on Pages
test("credits and the code licence open as pages, not downloads", () => {
  const { creditsHtml } = require("../tools/make-credits.js");
  assert.equal(read("credits.html"), creditsHtml(NKC.ENTRIES));
  const html = read("index.html");
  assert.match(html, /href="credits\.html"/);
  assert.match(html, /href="LICENSE-CODE\.txt"/);
  assert.ok(fs.existsSync(path.join(ROOT, "LICENSE-CODE.txt")));
  assert.ok(!fs.existsSync(path.join(ROOT, "LICENSE-CODE")));
});

// ------------------------------------------------------------------ layout and keyboard
test("the slider's tick text gives way to the key list below 46rem", () => {
  assert.match(read("css/style.css"), /@media \(max-width: 46rem\) \{[^@]*\.flock-key \{ display: block; \}/);
});

test("the pattern board works without a mouse", () => {
  assert.match(NKC.pattern.uiHtml(), /<button type="button" data-action="random">Add a dot at random<\/button>/);
});

test("stop 6.6: mudskippers right after the tetrapods video, framed as living models, not ancestors", () => {
  const s = byId("march");
  const ids = s.visuals.filter((v) => v.type === "video").map((v) => v.video.id);
  assert.equal(ids[ids.indexOf("zK8XGEDcTfo") + 1], "CJl_relCddQ");
  const mud = s.visuals.find((v) => v.type === "video" && v.video.id === "CJl_relCddQ");
  assert.equal(mud.video.title, "These Mudskipper Fins Were Made For Walking | Deep Look");
  assert.match(mud.caption, /not our ancestors/);
  assert.ok(s.sources.some((x) => x.checked && /Quigley/.test(x.text)));
  assert.ok(s.sources.some((x) => x.checked && /kqed\.org/.test(x.url || "")));
});

test("stop 6.6: the basilisk follows the mudskippers, the inversion of walking out of water", () => {
  const s = byId("march");
  const ids = s.visuals.filter((v) => v.type === "video").map((v) => v.video.id);
  assert.equal(ids[ids.indexOf("CJl_relCddQ") + 1], "CW0TijmAUqY");
  const liz = s.visuals.find((v) => v.type === "video" && v.video.id === "CW0TijmAUqY");
  assert.equal(liz.video.channel, "National Geographic");
  assert.match(liz.caption, /runs on water/);
  assert.ok(s.sources.some((x) => x.checked && /Hsieh/.test(x.text)));
});

// ------------------------------------------------------------------ the minor findings that review deferred
test("stalagmite: the UNSW press release on Baker 2021 is cited beside the paper", () => {
  const s = road("stalagmite").sources;
  assert.ok(s.some((x) => /UNSW|University of New South Wales/.test(x.text)));
  assert.ok(s.some((x) => /Baker, A\., et al\. \(2021\)/.test(x.text)));
});

test("the quilt's two sourced shares stay at least 11 px on a phone", () => {
  // SVG text is sized in the drawing's units, which shrink with it: the CSS divides by the scale.
  assert.match(read("css/style.css"), /\.quilt-svg \.q-share \{ font-size: max\(11px \/ var\(--q-scale, 1\), 20px\); \}/);
  const props = {};
  const el = { clientWidth: 300, style: { setProperty: (k, v) => { props[k] = v; } } };
  NKC.mountVisual("quilt", el, { reducedMotion: false });
  assert.equal(props["--q-scale"], "0.3");
  // On a 320 px phone the quilt is 248 px wide (#spine's 1.25rem sides, the stop's 2rem indent), so
  // the shares are drawn at 11 × 1000 / 248 ≈ 44 units. Even at a full em a character, each stays
  // inside the viewBox.
  const svg = NKC.quilt.svgHtml("");
  const VW = Number(svg.match(/viewBox="0 0 (\d+)/)[1]);
  const size = Math.max((11 * VW) / (320 - 2 * 20 - 32), 20);
  const shares = [...svg.matchAll(/<text class="q-share" x="([\d.]+)" y="[\d.]+" text-anchor="(start|middle|end)">([^<]+)<\/text>/g)];
  assert.equal(shares.length, 2);
  for (const [, x, anchor, text] of shares) {
    const width = [...text].length * size;
    const left = anchor === "start" ? Number(x) : anchor === "end" ? x - width : x - width / 2;
    assert.ok(left >= 0 && left + width <= VW, `${text} runs from ${left.toFixed(0)} to ${(left + width).toFixed(0)} of ${VW}`);
  }
});

// A canvas, a mount and a ResizeObserver, just enough for NKC.canvasAnim outside a browser.
function fakeDom() {
  const dom = { width: 600, arcs: [], made: [], resize: null };
  const ctx = new Proxy({}, { get: (t, k) => (k === "arc" ? (x, y) => dom.arcs.push([x, y]) : k in t ? t[k] : () => {}) });
  dom.element = (tag) => {
    const e = { tag, style: {}, clientWidth: dom.width, setAttribute() {}, addEventListener() {}, appendChild() {}, getContext: () => ctx };
    dom.made.push(e);
    return e;
  };
  globalThis.document = { createElement: dom.element };
  globalThis.ResizeObserver = class { constructor(cb) { dom.resize = cb; } observe() {} };
  dom.restore = () => { delete globalThis.document; delete globalThis.ResizeObserver; };
  return dom;
}

test("reduced motion: a resize keeps the still frame, drawn at the canvas's own size", () => {
  const dom = fakeDom();
  try {
    const stills = [];
    NKC.registerVisual("fake-resize", (el) => NKC.canvasAnim(el, 144, { init: () => ({}), tick() {}, draw() {}, still: (s, W, H) => stills.push([W, H]) }));
    const c = NKC.mountVisual("fake-resize", dom.element("div"), { reducedMotion: true });
    assert.equal(c.running, false);
    assert.deepEqual(stills, [[600, 144]]);
    dom.made.find((e) => e.tag === "canvas").clientWidth = 300;
    dom.resize();
    assert.deepEqual(stills.at(-1), [300, 144]);
    // The self-copying strands' still frame fills the canvas it has, not a fixed 500 × 240.
    dom.width = 300;
    dom.arcs.length = 0;
    NKC.mountVisual("autocat", dom.element("div"), { reducedMotion: true });
    assert.ok(dom.arcs.length > 0);
    for (const [x, y] of dom.arcs) assert.ok(x > -11 && x < 311 && y > -11 && y < 271, `bead at ${x}, ${y}`);
  } finally {
    dom.restore();
  }
});

test("the flock steps by elapsed time and reuses its scratch space", () => {
  const make = (k) => NKC.flock.create(60, 400, 300, NKC.rng(5), k);
  for (const k of [0, 7]) {
    const a = make(k), b = make(k);
    const was = a.birds.map((p) => [p.x, p.y]);
    NKC.flock.step(a, 1 / 60);
    NKC.flock.step(b, 1 / 120);
    const moved = (f, i) => {
      let dx = f.birds[i].x - was[i][0], dy = f.birds[i].y - was[i][1];
      dx -= 400 * Math.round(dx / 400); dy -= 300 * Math.round(dy / 300);
      return Math.hypot(dx, dy);
    };
    a.birds.forEach((_, i) => assert.ok(Math.abs(moved(a, i) - 2 * moved(b, i)) < 1e-6, `k=${k}, bird ${i}`));
    const scratch = a.scratch;
    assert.equal(typeof scratch, "object");
    NKC.flock.step(a, 1 / 60);
    assert.equal(a.scratch, scratch);
  }
  // A stalled frame counts as 1/30 s, so the birds don't jump across the canvas.
  const c = make(7), d = make(7);
  NKC.flock.step(c, 1);
  NKC.flock.step(d, 1 / 30);
  assert.deepEqual(c.birds, d.birds);
  // The random kicks are a random walk, so they scale with √dt: at k = 0 the birds turn as much in
  // a quarter of a second at 120 or 144 Hz as at 60 Hz (mean heading correlation, 150 birds, 40 seeds).
  const turn = (dt) => {
    let sum = 0, count = 0;
    for (let seed = 1; seed <= 40; seed++) {
      const f = NKC.flock.create(150, 400, 300, NKC.rng(seed), 0);
      const was = f.birds.map((p) => Math.atan2(p.vy, p.vx));
      for (let t = 0; t < Math.round(0.25 / dt); t++) NKC.flock.step(f, dt);
      f.birds.forEach((p, i) => { sum += Math.cos(Math.atan2(p.vy, p.vx) - was[i]); count++; });
    }
    return sum / count;
  };
  const at60 = turn(1 / 60);
  for (const hz of [120, 144]) {
    const at = turn(1 / hz);
    assert.ok(Math.abs(at - at60) < 0.05, `heading correlation ${at.toFixed(3)} at ${hz} Hz, ${at60.toFixed(3)} at 60 Hz`);
  }
});

test("every side road ends with a close button, and it closes the road", () => {
  const s = byId("brownian");
  const html = NKC.entryHtml(s, "firm");
  assert.equal(html.split('<button class="road-close"').length - 1, s.sideRoads.length);
  assert.match(html, /<button class="road-close" type="button" aria-controls="road-stalagmite" aria-label="[^"]+">Close<\/button><\/div>/);
  // Wired on a fake root: the close button toggles its panel's pill, which takes the focus.
  const panel = { hidden: false, querySelectorAll: () => [] };
  const pillAttrs = { "aria-controls": "road-x", "aria-expanded": "true" };
  const pill = { getAttribute: (k) => pillAttrs[k], setAttribute: (k, v) => { pillAttrs[k] = v; }, closest: () => pill, focused: false, focus() { this.focused = true; } };
  const close = { getAttribute: (k) => (k === "aria-controls" ? "road-x" : null), closest: (sel) => (sel === "button.road-close" ? close : null) };
  let click = null;
  const rootEl = { addEventListener: (type, fn) => { click = fn; }, querySelectorAll: (sel) => (sel === "button.road" ? [pill] : []) };
  globalThis.document = { getElementById: (id) => (id === "road-x" ? panel : null) };
  try {
    NKC.wireRoads(rootEl, []);
    click({ target: close });
  } finally {
    delete globalThis.document;
  }
  assert.equal(pillAttrs["aria-expanded"], "false");
  assert.equal(panel.hidden, true);
  assert.equal(pill.focused, true);
});

test("a malformed hash is ignored instead of throwing", () => {
  assert.equal(NKC.hashTarget("#%E0"), null);
  assert.equal(NKC.hashTarget("#stop-1-2"), "stop-1-2");
  assert.equal(NKC.hashTarget(""), null);
  assert.match(read("js/render.js"), /const id = NKC\.hashTarget\(location\.hash\);/);
});

test("README: adding a stop covers the script tag and the pictures", () => {
  const section = read("README.md").split("## Adding a stop")[1].split("\n## ")[0];
  assert.match(section, /<script src="js\//);
  assert.match(section, /content\/pictures\.js/);
});

test("legend lines have square ends, and the unused mono font is gone", () => {
  const css = read("css/style.css");
  assert.doesNotMatch(css, /swatch[^}]*border-radius: 50%/);
  assert.doesNotMatch(css, /LinLibertine_M|Mono/);
  assert.ok(!fs.readdirSync(path.join(ROOT, "fonts")).some((f) => /Mono|_M/.test(f)));
  assert.ok(fs.existsSync(path.join(ROOT, "fonts/OFL.txt")));
});

test("the ↳ is hidden from screen readers, and the flock canvas is an image", () => {
  const s = byId("brownian");
  const html = NKC.entryHtml(s, "firm");
  assert.equal(html.split('<span aria-hidden="true">↳</span>').length - 1, s.sideRoads.length);
  assert.doesNotMatch(html, />↳ /);
  assert.match(NKC.demoHtml(), /<span aria-hidden="true">↳<\/span>/);
  assert.match(NKC.flock.uiHtml(), /<canvas class="flock-canvas" height="300" role="img" aria-label="[^"]+">/);
});

// ------------------------------------------------------------------ the final whole-branch review (fix wave)
// The quilt's shares, drawn at a scale: where each sits, and the box its text fills. The widths are
// "≈ 2%" and "up to ≈ 5%" in the page's own font, measured with getBBox in Brave (1.88 and 4.25 em),
// with 5% to spare; the box runs from 0.92 em above the baseline to 0.28 em below it.
const SHARE_EM = { "≈ 2%": 1.88, "up to ≈ 5%": 4.25 };
function shareBoxes(scale) {
  const size = Math.max(11 / scale, 20);   // the CSS: max(11px / var(--q-scale), 20px), in drawing units
  const svg = NKC.quilt.svgHtml("", scale);
  return [...svg.matchAll(/<text class="q-share" x="([\d.]+)" y="([\d.]+)" text-anchor="(start|middle|end)">([^<]+)<\/text>/g)].map(([, x, y, anchor, text]) => {
    const w = SHARE_EM[text] * size * 1.05;
    const left = anchor === "start" ? Number(x) : anchor === "end" ? x - w : x - w / 2;
    return { text, left, right: left + w, top: y - 0.92 * size, bottom: Number(y) + 0.28 * size };
  });
}
// Points along every seam in the drawing, each with the half-width of its stitches.
function seamPoints() {
  const svg = NKC.quilt.svgHtml("");
  const quilt = svg.split('<g class="q-legend"')[0];
  const out = [];
  for (const [, kind, ax, ay, cx, cy, bx, by] of quilt.matchAll(/<path class="q-seam (\w+)" d="M([\d.]+) ([\d.]+) Q([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/g)) {
    const [a, c, b] = [[ax, ay], [cx, cy], [bx, by]].map((p) => p.map(Number));
    for (let i = 0; i <= 400; i++) {
      const t = i / 400, u = 1 - t;
      out.push({ kind, x: u * u * a[0] + 2 * t * u * c[0] + t * t * b[0], y: u * u * a[1] + 2 * t * u * c[1] + t * t * b[1] });
    }
  }
  return out;
}

test("the quilt's shares clear every seam at every scale from a 250 px phone to full size", () => {
  const seams = seamPoints();
  assert.equal(seams.length, 10 * 401);
  const VW = Number(NKC.quilt.svgHtml("").match(/viewBox="0 0 (\d+)/)[1]);
  for (let scale = 0.25; scale <= 1.0001; scale += 0.01) {
    const boxes = shareBoxes(scale);
    assert.equal(boxes.length, 2);
    for (const b of boxes) {
      assert.ok(b.left >= 0 && b.right <= VW, `${b.text} leaves the drawing at scale ${scale.toFixed(2)}`);
      for (const p of seams) {
        const r = p.kind === "admixture" ? 3 : 2;   // half the stitch width (6 and 4 in the CSS)
        const d = Math.hypot(Math.max(b.left - p.x, 0, p.x - b.right), Math.max(b.top - p.y, 0, p.y - b.bottom)) - r;
        assert.ok(d >= 2, `${b.text} meets a seam (${p.kind}) at (${p.x.toFixed(0)}, ${p.y.toFixed(0)}), scale ${scale.toFixed(2)}`);
      }
    }
  }
});

test("the quilt redraws its shares for the size it is shown at, and haloes them in slate", () => {
  const el = { clientWidth: 318, style: { setProperty() {} } };
  NKC.mountVisual("quilt", el, { reducedMotion: false });
  assert.equal(el.innerHTML, NKC.quilt.svgHtml("Proportions are symbolic.", 0.318));
  assert.notEqual(NKC.quilt.svgHtml("", 0.318), NKC.quilt.svgHtml("", 1), "a phone's shares sit elsewhere");
  const rule = read("css/style.css").match(/\.quilt-svg \.q-share \{[^}]*\}/g).join(" ");
  for (const decl of ["paint-order: stroke", "stroke: #2B2E31", "stroke-width: 6px", "stroke-linejoin: round"]) assert.ok(rule.includes(decl), decl);
});

test("the legend's swatches keep their length when a label wraps", () => {
  assert.match(read("css/style.css"), /\.legend \.swatch \{[^}]*flex: none;[^}]*\}/);
});

test("galleries show two pictures a row on a phone", () => {
  const small = read("css/style.css").split("/* ------------------------------------------------------------------ small screens */")[1].split("/* ---")[0];
  assert.match(small, /@media \(max-width: 40rem\) \{[^@]*\.gallery \{ grid-template-columns: repeat\(2, 1fr\); gap: 0\.6rem; \}/);
});

test("a picture marked link opens itself full size; the covers strip is one", () => {
  const p = { src: "assets/covers.jpg", alt: "Four covers", creator: "C", licence: "CC BY-SA 4.0", sourceUrl: "https://example.org/c", width: 1400, height: 554 };
  assert.doesNotMatch(NKC.pictureHtml(p), /<a href="assets\/covers\.jpg"/);
  assert.match(NKC.pictureHtml({ ...p, link: true }),
    /<figure class="picture"><a href="assets\/covers\.jpg" target="_blank" rel="noopener"><img src="assets\/covers\.jpg" alt="Four covers" loading="lazy" width="1400" height="554"><\/a><figcaption>/);
  const covers = byId("strange-loop").visuals.find((v) => v.type === "picture").picture;
  assert.equal(covers.link, true);
  assert.deepEqual(NKC.validateEntries([byId("strange-loop")]), []);
});

test("every close button names its road for a screen reader", () => {
  const html = NKC.entryHtml(byId("brownian"), "firm");
  assert.match(html, /<button class="road-close" type="button" aria-controls="road-stalagmite" aria-label="Close: A stalagmite: drip by drip, what stays adds up">Close<\/button><\/div>/);
  assert.match(NKC.entryHtml(byId("out-of-africa"), "descriptive"), /aria-label="Close: The “hobbits” of Flores: Homo floresiensis"/);
  assert.match(NKC.demoHtml(), /aria-label="Close: a side road">Close<\/button>/);
});

// ------------------------------------------------------------------ the fix wave after the final review
test("the quilt's legend and caption stay at least 11 px on a phone: the caption wraps, and the drawing grows to hold it", () => {
  const css = read("css/style.css");
  assert.match(css, /\.quilt-svg \.q-legend text \{ font-size: max\(11px \/ var\(--q-scale, 1\), 20px\); \}/);
  assert.match(css, /@media \(max-width: 40rem\) \{(?:\s*[^{}]+\{[^}]*\})*?\s*\.quilt-svg \.q-legend text \{ font-size: max\(11px \/ var\(--q-scale, 1\), 28px\); \}/);
  const cap = byId("out-of-africa").visuals.find((v) => v.id === "quilt").opts.caption;
  const top = 3 * 150 + 20;   // where the legend's group starts, in drawing units
  for (let scale = 0.25; scale <= 1.0001; scale += 0.01) {
    const at = scale.toFixed(2);
    const svg = NKC.quilt.svgHtml(cap, scale);
    const [, VW, VH] = svg.match(/viewBox="0 0 (\d+) (\d+)"/).map(Number);
    // The CSS's size in drawing units (28 on a phone, where the scale is under 0.57), and half an em a
    // character, more than the page's font takes.
    const size = Math.max(11 / scale, scale < 0.6 ? 28 : 20);
    const texts = [...svg.split('<g class="q-legend"')[1].matchAll(/<text x="([\d.]+)" y="([\d.]+)"(?: class="q-caption")?>([^<]+)<\/text>/g)]
      .map(([, x, y, t]) => ({ x: Number(x), y: Number(y), t }));
    assert.deepEqual(texts.slice(0, 2).map((t) => t.t), ["journeys", "mixing with our cousins"]);
    assert.equal(texts.slice(2).map((t) => t.t).join(" "), cap, `the whole caption, in order, at ${at}`);
    for (const t of texts) {
      assert.ok(16 + t.x + [...t.t].length * 0.5 * size <= VW, `"${t.t}" runs off the side at ${at}`);
      assert.ok(top + t.y + 0.3 * size <= VH, `"${t.t}" runs off the bottom at ${at}`);
      assert.ok(top + t.y - 0.92 * size >= 3 * 150 - 10, `"${t.t}" reaches into the patches at ${at}`);
    }
    const ys = [...new Set(texts.map((t) => t.y))].sort((a, b) => a - b);
    for (let i = 1; i < ys.length; i++) assert.ok(ys[i] - ys[i - 1] >= 1.2 * size, `lines run together at ${at}`);
    assert.ok(texts[0].x + 8 * 0.5 * size < 300, `"journeys" reaches the second swatch at ${at}`);
  }
  assert.equal(NKC.quilt.svgHtml(cap, 1), NKC.quilt.svgHtml(cap, 0.6), "wider screens keep the one-line legend");
});
