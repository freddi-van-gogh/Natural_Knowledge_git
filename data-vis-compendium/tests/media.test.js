// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const NKC = require("../js/core.js");
require("../js/media.js");
require("../js/anim.js");

const video = { id: "abcdefghijk", title: "A murmuration", channel: "Some Channel" };

test("video-card", () => {
  const html = NKC.videoCardHtml(video);
  assert.match(html, /A murmuration/);
  assert.match(html, /Some Channel/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=abcdefghijk"/);
  assert.match(html, /Watch on YouTube/);
  assert.match(html, /data-video-id="abcdefghijk"/);
  assert.doesNotMatch(html, /<iframe/);
});

test("video-missing", () => {
  const html = NKC.videoCardHtml({ id: null, title: "Murmuration", channel: "", find: "a starling murmuration" });
  assert.match(html, /class="video-todo"/);
  assert.match(html, /Video to come: a starling murmuration/);
  assert.doesNotMatch(html, /youtube/);
});

test("embed", () => {
  assert.equal(NKC.embedUrl("abcdefghijk"), "https://www.youtube-nocookie.com/embed/abcdefghijk?autoplay=1&rel=0");
  assert.equal(NKC.embedUrl("abcdefghijk", 30), "https://www.youtube-nocookie.com/embed/abcdefghijk?autoplay=1&rel=0&start=30");
});

test("picture", () => {
  const html = NKC.pictureHtml({ src: "assets/fern.jpg", alt: "A fern unrolling", creator: "Jane Doe",
    licence: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Fern.jpg" });
  assert.match(html, /<figure/);
  assert.match(html, /<img[^>]+loading="lazy"/);
  assert.match(html, /alt="A fern unrolling"/);
  assert.match(html, /Jane Doe/);
  assert.match(html, /CC BY-SA 4\.0/);
  assert.match(html, /href="https:\/\/commons\.wikimedia\.org\/wiki\/File:Fern\.jpg"/);
});

test("escaping", () => {
  const html = NKC.videoCardHtml({ id: "abcdefghijk", title: 'Fish & "chips" <b>', channel: "c" });
  assert.match(html, /Fish &amp; &quot;chips&quot; &lt;b&gt;/);
  assert.doesNotMatch(html, /<b>/);
});

test("autoplay-respects-reduced-motion", () => {
  assert.equal(NKC.shouldAutoplay(true), false);
  assert.equal(NKC.shouldAutoplay(false), true);
});

function fakeFactory(counts) {
  return () => ({ start() { counts.start++; }, stop() { counts.stop++; }, drawStill() { counts.still++; } });
}

test("lifecycle", () => {
  const counts = { start: 0, stop: 0, still: 0 };
  NKC.registerVisual("fake", fakeFactory(counts));
  const c = NKC.mountVisual("fake", {}, { reducedMotion: false });
  NKC.setVisible(c, true);
  NKC.setVisible(c, false);
  assert.equal(counts.start, 1);
  assert.equal(counts.stop, 1);
  assert.equal(c.running, false);
  NKC.setVisible(c, false);
  assert.equal(counts.stop, 1);
});

test("reduced motion: visible does not start until played", () => {
  const counts = { start: 0, stop: 0, still: 0 };
  NKC.registerVisual("fake2", fakeFactory(counts));
  const c = NKC.mountVisual("fake2", {}, { reducedMotion: true });
  assert.equal(counts.still, 1);
  NKC.setVisible(c, true);
  assert.equal(counts.start, 0);
  NKC.play(c);
  assert.equal(counts.start, 1);
  assert.equal(c.running, true);
});

test("unknown visual mounts nothing", () => {
  assert.equal(NKC.mountVisual("no-such-visual", {}, {}), null);
});

test("static visuals need no play button under reduced motion", () => {
  const counts = { start: 0, stop: 0, still: 0 };
  NKC.registerVisual("fake-static", () => ({ start() { counts.start++; }, stop() { counts.stop++; }, drawStill() { counts.still++; } }), { static: true });
  const c = NKC.mountVisual("fake-static", {}, { reducedMotion: true });
  assert.equal(c.allowed, true);
  assert.equal(counts.still, 0);
  assert.equal(NKC.isStatic("fake-static"), true);
  assert.equal(NKC.isStatic("fake"), false);
});

test("the march, pattern, tree and quilt are registered static; the flock is not", () => {
  for (const f of ["sim-flock", "anim-march", "anim-pattern", "anim-langtree", "anim-quilt"]) require(`../js/${f}.js`);
  for (const id of ["pattern", "langtree", "quilt", "march"]) assert.equal(NKC.isStatic(id), true, id);
  assert.equal(NKC.isStatic("flock"), false);
});
