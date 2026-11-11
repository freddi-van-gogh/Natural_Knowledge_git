// SPDX-License-Identifier: GPL-3.0-only
// Stop 8: the Indo-European family, one word across its ten branches: "three". The words are
// data (and sourced in the stop's sources); the drawing is a simple tree, sideways on phones.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});

  // Spellings as given by the source: UT Austin Linguistics Research Center, Indo-European
  // Lexicon, Pokorny etymon "trei-" (one source for all ten branches).
  const TREE = {
    name: "Proto-Indo-European", word: "*trei-", note: "Pokorny's root",
    children: [
      { branch: "Anatolian", lang: "Hittite", word: "teri-" },
      { branch: "Tocharian", lang: "Tocharian B", word: "trai" },
      { branch: "Indo-Iranian", lang: "Sanskrit", word: "tráyas" },
      { branch: "Armenian", lang: "Armenian", word: "erek'" },
      { branch: "Hellenic", lang: "Homeric Greek", word: "τρεῖς" },
      { branch: "Albanian", lang: "Albanian", word: "tre" },
      { branch: "Italic", lang: "Latin", word: "trēs" },
      { branch: "Celtic", lang: "Old Irish", word: "tri(ū)" },
      { branch: "Germanic", lang: "Gothic", word: "þreis" },
      { branch: "Balto-Slavic", lang: "Lithuanian", word: "trỹs" },
    ],
  };

  function layout(tree, w, h, opts) {
    const vertical = !!(opts && opts.vertical);
    const n = tree.children.length;
    if (vertical) {
      const top = 70, step = (h - top - 20) / n;
      return [{ node: tree, x: 20, y: 30 },
        ...tree.children.map((c, i) => ({ node: c, x: 90, y: top + step * (i + 0.5) }))];
    }
    const step = w / n;
    return [{ node: tree, x: w / 2, y: 50 },
      ...tree.children.map((c, i) => ({ node: c, x: step * (i + 0.5), y: h - 90 }))];
  }
  NKC.langtree = { TREE, layout };

  const esc = (s) => NKC.esc(s);
  function svg(vertical) {
    const w = vertical ? 400 : 1000, h = vertical ? 620 : 300;
    const pos = layout(TREE, w, h, { vertical });
    const r = pos[0];
    const lines = pos.slice(1).map((p) => vertical
      ? `<path d="M${r.x + 10} ${r.y + 18} L${r.x + 10} ${p.y} L${p.x - 8} ${p.y}"/>`
      : `<path d="M${r.x} ${r.y + 34} L${r.x} ${r.y + 70} L${p.x} ${r.y + 70} L${p.x} ${p.y - 10}"/>`).join("");
    const leaves = pos.slice(1).map((p) => vertical
      ? `<text x="${p.x}" y="${p.y - 4}"><tspan class="lt-word">${esc(p.node.word)}</tspan><tspan class="lt-lang" dx="10">${esc(p.node.lang)}</tspan></text>` +
        `<text class="lt-branch" x="${p.x}" y="${p.y + 16}">${esc(p.node.branch)}</text>`
      : `<text class="lt-word" x="${p.x}" y="${p.y + 14}" text-anchor="middle">${esc(p.node.word)}</text>` +
        `<text class="lt-lang" x="${p.x}" y="${p.y + 38}" text-anchor="middle">${esc(p.node.lang)}</text>` +
        `<text class="lt-branch" x="${p.x}" y="${p.y + 60}" text-anchor="middle">${esc(p.node.branch)}</text>`).join("");
    const rootText = vertical
      ? `<text x="${r.x}" y="${r.y}"><tspan class="lt-root">${esc(TREE.name)}</tspan></text><text x="${r.x}" y="${r.y + 22}"><tspan class="lt-word">${esc(TREE.word)}</tspan><tspan class="lt-lang" dx="8">${esc(TREE.note)}</tspan></text>`
      : `<text class="lt-root" x="${r.x}" y="${r.y}" text-anchor="middle">${esc(TREE.name)}</text><text x="${r.x}" y="${r.y + 26}" text-anchor="middle"><tspan class="lt-word">${esc(TREE.word)}</tspan><tspan class="lt-lang" dx="8">(${esc(TREE.note)})</tspan></text>`;
    return `<svg class="langtree-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="The Indo-European family tree, with the word for three in each branch"><g class="lt-lines">${lines}</g>${rootText}${leaves}</svg>`;
  }

  NKC.registerVisual("langtree", (el) => {
    let vertical = null;
    function draw() {
      const v = (el.clientWidth || 800) < 600;
      if (v !== vertical) { vertical = v; el.innerHTML = svg(v); }
    }
    draw();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(draw).observe(el);
    return { start() {}, stop() {}, drawStill() {} };
  }, { static: true });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
