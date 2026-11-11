// SPDX-License-Identifier: GPL-3.0-only
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const NKC = require("../js/core.js");
require("../js/media.js");
require("../js/anim.js");
require("../js/render.js");

const ROOT = path.join(__dirname, "..");
const ok = { kind: "stop", id: "x", number: "99", title: "t", label: "own", text: "t", visuals: [{ type: "todo", note: "n" }], sideRoads: [], sources: [],
  links: [{ text: "The series on Amazon", url: "https://www.amazon.com/dp/B0HQGK8BQ8" }] };

test("links: validator accepts text+https url, rejects a missing url", () => {
  assert.deepEqual(NKC.validateEntries([ok]), []);
  const bad = { ...ok, links: [{ text: "no url" }] };
  assert.ok(NKC.validateEntries([bad]).some((e) => /link/.test(e)));
});
test("links render after the visuals, opening in a new tab", () => {
  const html = NKC.entryHtml(ok, "firm");
  assert.match(html, /<p class="links"><a href="https:\/\/www\.amazon\.com\/dp\/B0HQGK8BQ8" target="_blank" rel="noopener">The series on Amazon<\/a><\/p>/);
  assert.ok(html.indexOf('class="links"') > html.indexOf('class="visual"'));
});
test("the header demo is a real side road with fixed copy", () => {
  const html = NKC.demoHtml();
  assert.match(html, /<button class="road" type="button" aria-expanded="false" aria-controls="road-demo"><span aria-hidden="true">↳<\/span> Try me: a side road<\/button>/);
  assert.match(html, /<div class="road-panel" id="road-demo" hidden>/);
  assert.match(html, /<p>A detour off the main line\. It opens in place, and when you close it you're where you left off\. Press Close, or the button again, then keep scrolling\.<\/p>/);
  assert.doesNotMatch(html, /Press the button again to close this one/);
  // It ends as every real side road does, with a Close button.
  assert.match(html, /<button class="road-close" type="button" aria-controls="road-demo" aria-label="Close: a side road">Close<\/button><\/div><\/div>$/);
  assert.match(html, /<span class="demo-arrow" aria-hidden="true">→<\/span>/);
});
test("index.html mounts the demo in the header and wires roads on the document", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.match(html, /<div id="demo"><\/div>/);
  assert.match(html, /NKC\.demoHtml\(\)/);
  assert.match(html, /Scroll down: each stop is one more layer of order than the last\. Buttons like this one are side roads:/);
  assert.match(fs.readFileSync(path.join(ROOT, "js/render.js"), "utf8"), /NKC\.wireRoads\(document, entries\)/);
});
