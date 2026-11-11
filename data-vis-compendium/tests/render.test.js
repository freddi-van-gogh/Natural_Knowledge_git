// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/media.js");
require("../js/anim.js");
require("../js/render.js");

const sample = () => ({
  kind: "stop", id: "march", number: "6.5", title: "Fish → legs → ape → human", text: "A march.",
  label: "oversimplified", date: "about 375 million years ago to today",
  visuals: [{ type: "anim", id: "march", caption: "Redrawn by us." }],
  sideRoads: [{ id: "x", title: "A side road", text: "Road text.", label: "settled",
    visuals: [{ type: "video", video: { id: "abcdefghijk", title: "V", channel: "C" } }],
    sources: [{ text: "Road source", checked: true }] }],
  sources: [{ text: "Checked source", url: "https://example.org/a", checked: true },
    { text: "Unchecked source", checked: false }],
});

test("stop markup", () => {
  const html = NKC.entryHtml(sample(), "firm");
  assert.match(html, /<section class="stop line-firm" id="stop-6-5" data-number="6\.5">/);
  assert.match(html, /label-oversimplified/);
  assert.match(html, />oversimplified</);
  assert.match(html, /class="date"/);
  assert.match(html, /<div class="visual" data-visual="march"/);
  assert.match(html, /<button class="road"[^>]*aria-expanded="false"[^>]*aria-controls="road-x"/);
  assert.match(html, /<div class="road-panel" id="road-x" hidden>/);
  assert.match(html, /<details class="sources">/);
});

test("dagger", () => {
  const html = NKC.entryHtml(sample(), "firm");
  assert.match(html, /Unchecked source <span class="dagger"[^>]*>†<\/span>/);
  assert.doesNotMatch(html, /Checked source<\/a> <span class="dagger"/);
  assert.match(html, /<a href="https:\/\/example\.org\/a"[^>]*>Checked source<\/a>/);
});

test("escaping", () => {
  const s = sample();
  s.title = "<b>&";
  assert.match(NKC.entryHtml(s, "firm"), /&lt;b&gt;&amp;/);
});

test("gap and shift", () => {
  const gap = NKC.entryHtml({ kind: "gap", id: "g", text: "How chemistry first came to copy itself reliably is not known." }, "gap");
  assert.match(gap, /<div class="gap" role="note"[^>]*>/);
  assert.match(gap, /not known\./);
  const shift = NKC.entryHtml({ kind: "shift", id: "s", text: "From here on: the same words, not the same machinery." }, "descriptive");
  assert.match(shift, /<div class="shift" role="note"[^>]*>/);
  assert.match(shift, /the same words/);
});

test("gallery and picture visuals", () => {
  const s = sample();
  const pic = { src: "assets/a.jpg", alt: "A", creator: "C", licence: "CC0", sourceUrl: "https://example.org" };
  s.visuals = [{ type: "gallery", pictures: [pic, pic] }, { type: "picture", picture: pic }];
  const html = NKC.entryHtml(s, "descriptive");
  assert.match(html, /class="stop line-descriptive"/);
  assert.match(html, /<div class="gallery">(.*<figure){2}/s);
});

test("descriptive line style class", () => {
  assert.match(NKC.entryHtml(sample(), "descriptive"), /class="stop line-descriptive"/);
});

test("inline italics for titles of works, after escaping", () => {
  const s = sample();
  s.text = "Van Gogh's *The Starry Night* & <script>";
  const html = NKC.entryHtml(s, "firm");
  assert.match(html, /<i>The Starry Night<\/i> &amp; &lt;script&gt;/);
});
