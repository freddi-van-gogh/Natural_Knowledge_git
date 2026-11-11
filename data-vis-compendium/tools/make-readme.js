// SPDX-License-Identifier: GPL-3.0-only
// Writes README.md from the content: what the compendium is, a link to every stop and side road
// on the live page, how to run it, and the licences. Run: node tools/make-readme.js
// (tests/readme.test.js fails if README.md is out of step with content/stops.js).
const fs = require("node:fs");
const path = require("node:path");

const PAGES = "https://freddi-van-gogh.github.io/Natural_Knowledge_git/data-vis-compendium/";

function readmeText(entries) {
  const NKC = globalThis.NKC;
  const plain = (s) => String(s).replace(/\*/g, "");
  const lines = [
    "# Natural Knowledge: a visual compendium",
    "",
    "A companion to the *Natural Knowledge* series: one long scrolling page that shows the processes the books describe, from random jostling molecules to art, memes, and music. Side roads branch off the main line without losing your place, and every stop says how sure we are and where the claim comes from.",
    "",
    `**Read it here:** ${PAGES}`,
    "",
    "## The stops",
    "",
  ];
  for (const e of entries) {
    if (e.kind === "gap") { lines.push(`- *${plain(e.text)}*`); continue; }
    if (e.kind === "shift") { lines.push(`- *${plain(e.text)}*`); continue; }
    const label = NKC.LABELS[e.label].text;
    lines.push(`- [${e.number} · ${plain(e.title)}](${PAGES}#${NKC.anchorFor("stop", e.number)}) (${label}${e.date ? `; ${e.date}` : ""})`);
    for (const r of e.sideRoads || []) {
      lines.push(`  - side road: [${plain(r.title)}](${PAGES}#${NKC.anchorFor("road", r.id)}) (${NKC.LABELS[r.label].text})`);
    }
  }
  lines.push(
    "",
    "## What the labels mean",
    "",
    ...Object.values(NKC.LABELS).map((l) => `- **${l.text}**: ${l.meaning}`),
    "",
    "The spine is solid where the account is firm, dashed across the one gap the books name (how heredity began), and dotted from language on, where the books use biology's words but not its machinery.",
    "",
    "## Running it",
    "",
    "- **In a browser:** open `index.html`. It needs no server, no build, and no installs, and works offline apart from the videos.",
    "- **The tests:** `node --test tests/` (Node 18 or later; nothing to install).",
    "- **After changing `content/stops.js`:** run `node tools/make-readme.js` and `node tools/make-credits.js`, so this file, `CREDITS.md` and `credits.html` stay in step (the tests check).",
    "",
    "## Adding a stop",
    "",
    "Every stop and side road is one entry in `content/stops.js`. Give it a number, a title, a sentence or two, a label, at least one visual, and its sources. Animations live in `js/`, one file each, and register themselves by name; a new one also needs its tag in `index.html`, `<script src=\"js/anim-….js\"></script>`, before the one for `content/pictures.js`.",
    "",
    "A picture goes in `assets/`, scaled to at most 1,400 px and with its metadata stripped, with an entry in `content/pictures.js` giving its creator, licence, source, and size. Then run both generators, `node tools/make-readme.js` and `node tools/make-credits.js`, so this file and the credits stay in step.",
    "",
    "## Licences",
    "",
    "- **The code** (`css/`, `js/`, `tools/`, `tests/`, and the code in `index.html`): GPL-3.0, in `LICENSE-CODE.txt`.",
    "- **The text, data, and our own pictures** (`content/`, `credits.html`): CC BY-SA 4.0, like the books (the repository's `LICENSE`). `index.html` mixes the two: its prose is CC BY-SA 4.0, its code GPL-3.0.",
    "- **Others' pictures and videos** keep their own licences, listed in `CREDITS.md` (and `credits.html`). Videos are embedded from YouTube in privacy-enhanced mode and load only when you press play.",
    "- **Fonts:** Linux Libertine, SIL Open Font License 1.1 (`fonts/OFL.txt`).",
    "",
  );
  return lines.join("\n");
}

module.exports = { readmeText };

if (require.main === module) {
  require("../js/core.js");
  require("../content/pictures.js");
  const NKC = require("../content/stops.js");
  const out = path.join(__dirname, "..", "README.md");
  fs.writeFileSync(out, readmeText(NKC.ENTRIES));
  console.log(`wrote ${out}`);
}
