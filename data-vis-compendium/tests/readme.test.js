// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const NKC = require("../js/core.js");
require("../content/pictures.js");
require("../content/stops.js");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const PAGES = "https://freddi-van-gogh.github.io/Natural_Knowledge_git/data-vis-compendium/";

test("README is in sync with the content", () => {
  const { readmeText } = require("../tools/make-readme.js");
  assert.equal(read("README.md"), readmeText(NKC.ENTRIES));
});

test("README links every stop and side road on the live page", () => {
  const readme = read("README.md");
  assert.ok(readme.includes(`${PAGES}#stop-6-5`));
  for (const e of NKC.ENTRIES.filter((x) => x.kind === "stop")) {
    assert.ok(readme.includes(`${PAGES}#${NKC.anchorFor("stop", e.number)}`), e.id);
    for (const r of e.sideRoads) assert.ok(readme.includes(`${PAGES}#${NKC.anchorFor("road", r.id)}`), r.id);
  }
});

test("licence split is stated in the README and the page footer", () => {
  for (const f of ["README.md", "index.html"]) {
    const t = read(f);
    assert.match(t, /GPL-3\.0/, f);
    assert.match(t, /CC BY-SA 4\.0/, f);
  }
});

test("the page says how it was made, in the author's approved words", () => {
  const html = read("index.html");
  assert.match(html, /How this was made/);
  assert.doesNotMatch(html, /<!-- Draft, awaiting the author's approval/);
  assert.match(html, /The author answered them, made editorial calls, and drafted some text sections themselves\./);
  assert.match(html, /an AI drafted the bulk of the compendium alongside author inputs and rewrites/);
  assert.doesNotMatch(html, /The author answered them and made the calls\./);
  assert.match(html, /this compendium/);
});

test("the page has its header, the order line and the legend", () => {
  const html = read("index.html");
  assert.match(html, /The order follows the books' ideas, with dates where they matter\./);
  assert.match(html, /class="legend"/);
  assert.match(html, /href="credits\.html"/);
});

test("fonts referenced by the CSS exist, with their licence", () => {
  const css = read("css/style.css");
  const urls = [...css.matchAll(/url\("\.\.\/(fonts\/[^"]+)"\)/g)].map((m) => m[1]);
  assert.ok(urls.length >= 3);
  for (const u of urls) assert.ok(fs.existsSync(path.join(ROOT, u)), u);
  assert.match(read("fonts/OFL.txt"), /SIL OPEN FONT LICENSE/i);
});
