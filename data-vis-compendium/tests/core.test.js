// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");

test("rng is deterministic", () => {
  const a = NKC.rng(42)(), b = NKC.rng(42)();
  assert.equal(a, b);
  assert.ok(a >= 0 && a < 1);
  const r = NKC.rng(42);
  assert.notEqual(r(), r());
});

test("anchors", () => {
  assert.equal(NKC.anchorFor("stop", "6.5"), "stop-6-5");
  assert.equal(NKC.anchorFor("road", "starlings"), "road-starlings");
  assert.equal(NKC.anchorFor("stop", "14.1"), "stop-14-1");
});

test("lineStyles", () => {
  const e = [{ kind: "stop" }, { kind: "gap" }, { kind: "stop" }, { kind: "shift" }, { kind: "stop" }];
  assert.deepEqual(NKC.lineStyles(e), ["firm", "gap", "firm", "descriptive", "descriptive"]);
});

const src = { text: "A source", checked: true };
const good = () => ({
  kind: "stop", id: "s1", number: "1", title: "T", text: "Text.", label: "settled",
  visuals: [{ type: "anim", id: "dye" }], sideRoads: [], sources: [src],
});

test("validate accepts a good stop", () => {
  assert.deepEqual(NKC.validateEntries([good()]), []);
});

const cases = {
  "a bad label": (s) => { s.label = "certain"; },
  "a stop missing sources": (s) => { delete s.sources; },
  "a source without boolean checked": (s) => { s.sources = [{ text: "x", checked: "yes" }]; },
  "a picture with an NC licence": (s) => {
    s.visuals = [{ type: "picture", picture: { src: "assets/a.jpg", alt: "a", creator: "c", licence: "CC BY-NC 4.0", sourceUrl: "u" } }];
  },
  "a malformed video id": (s) => { s.visuals = [{ type: "video", video: { id: "short", title: "t", channel: "c" } }]; },
  "a bad label on a side road": (s) => {
    s.sideRoads = [{ id: "r1", title: "R", text: "x", label: "nope", sources: [src] }];
  },
};
for (const [name, mutate] of Object.entries(cases)) {
  test(`validate catches ${name}`, () => {
    const s = good();
    mutate(s);
    const errors = NKC.validateEntries([s]);
    assert.ok(errors.length > 0, "expected an error");
    assert.ok(errors.some((e) => e.includes("s1") || e.includes("r1")), errors.join("; "));
  });
}

test("validate catches a duplicate id", () => {
  const errors = NKC.validateEntries([good(), good()]);
  assert.ok(errors.some((e) => e.includes("duplicate") && e.includes("s1")), errors.join("; "));
});

test("validate allows a null video id with a find note", () => {
  const s = good();
  s.visuals = [{ type: "video", video: { id: null, title: "t", channel: "c", find: "a murmuration" } }];
  assert.deepEqual(NKC.validateEntries([s]), []);
});

test("validate allows open licences", () => {
  for (const licence of ["public domain", "CC0", "CC0 1.0", "CC BY 4.0", "CC BY-SA 3.0", "CC BY-SA 2.5", "CC BY-SA 3.0 FR", "CC BY 2.0"]) {
    const s = good();
    s.visuals = [{ type: "picture", picture: { src: "assets/a.jpg", alt: "a", creator: "c", licence, sourceUrl: "u" } }];
    assert.deepEqual(NKC.validateEntries([s]), [], licence);
  }
});

test("LABELS has the exact keys", () => {
  assert.deepEqual(Object.keys(NKC.LABELS).sort(),
    ["account", "analogy", "argued", "illustration", "measured", "oversimplified", "own", "settled"]);
  assert.equal(NKC.LABELS.account.text, "in their own words");
  assert.equal(NKC.LABELS.argued.text, "still argued about");
  assert.equal(NKC.LABELS.own.text, "the author's own");
});
