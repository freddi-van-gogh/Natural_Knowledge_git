// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const NKC = require("../js/core.js");
require("../content/stops.js");

const ROOT = path.join(__dirname, "..");
const ORDER = ["1", "1.2", "1.5", "2", "3", "4", "|gap|", "5", "6", "6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "7", "|shift|",
  "8", "9", "10", "10.1", "10.2", "11", "11.5", "11.6", "12", "13", "14", "14.1", "14.2", "15"];

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}
const rel = (p) => path.relative(ROOT, p);
const stop = (n) => NKC.ENTRIES.find((e) => e.kind === "stop" && e.number === n);

test("order", () => {
  const seq = NKC.ENTRIES.map((e) => (e.kind === "stop" ? e.number : `|${e.kind}|`));
  assert.deepEqual(seq, ORDER);
});

test("stop 9 is Out of Africa and stop 10 the village", () => {
  assert.match(stop("9").title, /Out of Africa/);
  assert.match(stop("10").title, /village/);
});

test("gap and shift carry the fixed copy", () => {
  assert.equal(NKC.ENTRIES.find((e) => e.kind === "gap").text,
    "How chemistry first came to copy itself reliably is not known.");
  assert.equal(NKC.ENTRIES.find((e) => e.kind === "shift").text,
    "From here on: the same words, not the same machinery.");
});

test("validates", () => {
  assert.deepEqual(NKC.validateEntries(NKC.ENTRIES), []);
});

test("spdx", () => {
  const code = [path.join(ROOT, "index.html"),
    ...["js", "css", "tools", "tests"].flatMap((d) => (fs.existsSync(path.join(ROOT, d)) ? walk(path.join(ROOT, d)) : []))];
  for (const f of code) {
    const head = fs.readFileSync(f, "utf8").split("\n").slice(0, 3).join("\n");
    assert.match(head, /SPDX-License-Identifier: GPL-3\.0-only/, rel(f));
  }
  const content = fs.readFileSync(path.join(ROOT, "content/stops.js"), "utf8").split("\n").slice(0, 3).join("\n");
  assert.match(content, /SPDX-License-Identifier: CC-BY-SA-4\.0/);
});

test("no-modules-no-fetch", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.doesNotMatch(html, /type=["']module["']/);
  for (const f of walk(path.join(ROOT, "js"))) {
    const t = fs.readFileSync(f, "utf8");
    assert.doesNotMatch(t, /\bfetch\(/, rel(f));
    assert.doesNotMatch(t, /^\s*import\s/m, rel(f));
  }
});

test("no-external-hosts", () => {
  // Hosts the page may *link* to or embed on click; nothing is loaded from any of them up front.
  const allowed = new Set(["www.youtube-nocookie.com", "www.youtube.com", "creativecommons.org"]);
  const files = [path.join(ROOT, "index.html"), ...walk(path.join(ROOT, "css")), ...walk(path.join(ROOT, "js"))];
  for (const f of files) {
    for (const m of fs.readFileSync(f, "utf8").matchAll(/https?:\/\/([^/"'\s)]+)/g)) {
      assert.ok(allowed.has(m[1]), `${rel(f)} loads ${m[1]}`);
    }
  }
});

test("sizes", () => {
  for (const f of walk(ROOT)) {
    assert.ok(fs.statSync(f).size < 25 * 1024 * 1024, `${rel(f)} is over 25 MB`);
  }
});

// ---------------------------------------------------------------- Task 8: the content is complete
const stops = () => NKC.ENTRIES.filter((e) => e.kind === "stop");
const road = (id) => stops().flatMap((s) => s.sideRoads).find((r) => r.id === id);
function allPictures() {
  const out = [];
  const visit = (vs) => (vs || []).forEach((v) => {
    if (v.type === "picture") out.push(v.picture);
    if (v.type === "gallery") out.push(...v.pictures);
  });
  for (const s of stops()) { visit(s.visuals); s.sideRoads.forEach((r) => visit(r.visuals)); }
  return out;
}

test("complete: strict validation passes", () => {
  assert.deepEqual(NKC.validateEntries(NKC.ENTRIES, { strict: true }), []);
});

test("complete: every stop has text, sources and real visuals", () => {
  for (const s of stops()) {
    assert.ok(s.text.length > 0, s.id);
    assert.ok(s.sources.length >= 1, `${s.id} has no source`);
    assert.ok(s.visuals.length >= 1 && s.visuals.every((v) => v.type !== "todo"), `${s.id} visuals`);
    for (const r of s.sideRoads) {
      assert.ok(r.text.length > 0 && r.sources.length >= 1, r.id);
      assert.ok((r.visuals || []).every((v) => v.type !== "todo"), `${r.id} visuals`);
    }
  }
});

test("dates on the human-story stops", () => {
  assert.ok(stop("9").date && stop("10").date);
});

test("labels per spec and research", () => {
  assert.equal(stop("6.6").label, "oversimplified");
  assert.equal(stop("8").label, "analogy");
  assert.equal(road("drones").label, "analogy");
  assert.equal(road("islamic-geometry").label, "argued");
  assert.equal(road("dreaming").label, "account");
  assert.equal(road("spiral-shapes").label, "analogy");
  for (const id of ["vesicle", "autocatalysis"]) {
    const anim = NKC.ENTRIES.find((e) => e.id === id).visuals.find((v) => v.type === "anim");
    assert.match(anim.caption, /illustration/i, id);
  }
});

test("every picture used exists, and every stored picture is used and credited", () => {
  const used = new Set(allPictures().map((p) => p.src));
  for (const src of used) assert.ok(fs.existsSync(path.join(ROOT, src)), `${src} missing`);
  const credits = fs.readFileSync(path.join(ROOT, "CREDITS.md"), "utf8");
  for (const f of fs.readdirSync(path.join(ROOT, "assets"))) {
    assert.ok(used.has(`assets/${f}`), `assets/${f} is not used`);
    assert.ok(credits.includes(`assets/${f}`), `assets/${f} is not in CREDITS.md`);
  }
});

test("metadata stripped from stored pictures", () => {
  for (const f of fs.readdirSync(path.join(ROOT, "assets"))) {
    const b = fs.readFileSync(path.join(ROOT, "assets", f));
    for (const marker of ["Exif", "<x:xmpmeta", "tEXt", "iTXt"]) assert.equal(b.indexOf(marker), -1, `${f} contains ${marker}`);
  }
});

test("every stored JPEG has no comment, Exif/XMP, Photoshop, or ICC segment", () => {
  const names = { 0xfffe: "COM", 0xffe1: "APP1 (Exif/XMP)", 0xffed: "APP13 (Photoshop)", 0xffe2: "APP2 (ICC)" };
  for (const f of fs.readdirSync(path.join(ROOT, "assets")).filter((n) => /\.jpe?g$/i.test(n))) {
    const b = fs.readFileSync(path.join(ROOT, "assets", f));
    let i = 2;
    while (i + 4 <= b.length && b[i] === 0xff) {
      const m = 0xff00 | b[i + 1];
      assert.ok(!(m in names), `${f} has a ${names[m]} segment`);
      if (m === 0xffda) break;
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
});

test("CREDITS.md is in sync with the content", () => {
  const { creditsText } = require("../tools/make-credits.js");
  assert.equal(fs.readFileSync(path.join(ROOT, "CREDITS.md"), "utf8"), creditsText(NKC.ENTRIES));
});
