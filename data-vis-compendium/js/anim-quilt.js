// SPDX-License-Identifier: GPL-3.0-only
// Stop 9: a quilt of where people went and who they met. Each patch is a population or region;
// the stitched seams are journeys (migration) and mixing (admixture) with our archaic cousins.
// An illustration: proportions are symbolic, except the two seams that carry sourced figures.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});

  // On an 8 × 3 grid, laid out roughly as the map is.
  const PATCHES = [
    { id: "neanderthals", label: "Neanderthals", col: 0, row: 0, w: 2, h: 1, fill: "#8C6B4F", weave: "stripes", archaic: true },
    { id: "europe", label: "Europe", col: 2, row: 0, w: 2, h: 1, fill: "#3A786A", weave: "checks" },
    { id: "eastasia", label: "East Asia", col: 4, row: 0, w: 2, h: 2, fill: "#B8552F", weave: "zigzag" },
    { id: "denisovans", label: "Denisovans", col: 6, row: 0, w: 2, h: 1, fill: "#5C5470", weave: "dots", archaic: true },
    { id: "africa", label: "Africa", col: 0, row: 1, w: 2, h: 2, fill: "#C9963A", weave: "zigzag" },
    { id: "neareast", label: "Near East", col: 2, row: 1, w: 2, h: 1, fill: "#C98446", weave: "dots" },
    { id: "oceania", label: "Oceania", col: 6, row: 1, w: 2, h: 2, fill: "#1F5A8A", weave: "stripes" },
    { id: "southasia", label: "South Asia", col: 2, row: 2, w: 2, h: 1, fill: "#7A4F6E", weave: "checks" },
    { id: "americas", label: "The Americas", col: 4, row: 2, w: 2, h: 1, fill: "#6E9E8F", weave: "dots" },
  ];
  const SEAMS = [
    { from: "africa", to: "neareast", kind: "migration" },
    { from: "neareast", to: "europe", kind: "migration" },
    { from: "neareast", to: "southasia", kind: "migration" },
    { from: "southasia", to: "oceania", kind: "migration" },
    { from: "neareast", to: "eastasia", kind: "migration" },
    { from: "eastasia", to: "americas", kind: "migration" },
    // A share's `narrow` spot is where it goes below that scale, when the larger text would reach its seam.
    { from: "neanderthals", to: "neareast", kind: "admixture", share: "≈ 2%",   // 1.8–2.6% outside Africa and Oceania (Prüfer et al. 2017)
      narrow: { below: 0.35, x: 218, y: 160, anchor: "end" } },
    { from: "neanderthals", to: "europe", kind: "admixture" },
    { from: "denisovans", to: "oceania", kind: "admixture", share: "up to ≈ 5%", anchor: "end",   // Sankararaman et al. 2016
      narrow: { below: 0.55, x: 881, y: 200, anchor: "end" } },
    { from: "denisovans", to: "eastasia", kind: "admixture" },
  ];
  NKC.quilt = { PATCHES, SEAMS };

  const esc = (s) => NKC.esc(s);
  const U = 125, V = 150, PAD = 10, VW = 8 * U, VH = 3 * V + 75;
  const centre = (p) => ({ x: (p.col + p.w / 2) * U, y: (p.row + p.h / 2) * V });
  const FIGURE = `<circle cx="0" cy="-15" r="5"/><path d="M-6 -9 L6 -9 L5 6 L-5 6 Z"/>`;
  const person = (x, y) => `<g class="q-person" transform="translate(${x} ${y})">${FIGURE}</g>`;
  // An archaic cousin's one figure: the same shape as a thick dashed outline, a people of the past, not a group still among us.
  const pastPerson = (x, y) => `<g class="q-past" transform="translate(${x} ${y})" fill="none" stroke="#fff" stroke-opacity="0.85" stroke-width="2.5" stroke-dasharray="4 3" stroke-linecap="round">${FIGURE}</g>`;

  // Where a share sits when the drawing is shown at `scale` (rendered width / viewBox width). The CSS
  // draws the shares at no less than 11 px on screen, so on a phone they grow; each then moves to its
  // narrow spot, left of its seam, instead of running across it (the fixes test checks every scale).
  NKC.quilt.sharePlace = function (s, scale, mx, my) {
    if (s.narrow && scale < s.narrow.below) return s.narrow;
    // A share by the right edge ends at the edge, so as it grows it grows inwards.
    return { x: s.anchor === "end" ? VW - PAD : mx, y: my - 8, anchor: s.anchor || "middle" };
  };

  // The legend and the caption under the quilt. The CSS draws them, like the shares, at no less than
  // 11 px on screen, so on a phone (below NARROW) they grow. The legend's text then sits by its
  // swatches at that size. The caption wraps, allowing half an em a character (more than the page's
  // font takes), and the drawing grows taller to hold it.
  const NARROW = 0.6, LEGEND_Y = 3 * V + 20;
  function legendHtml(caption, scale) {
    const item = (y) => `<path class="q-seam migration" d="M0 0 L60 0"/><text x="72" y="${y}">journeys</text>` +
      `<path class="q-seam admixture" d="M300 0 L360 0"/><text x="372" y="${y}">mixing with our cousins</text>`;
    const wrap = (g) => `<g class="q-legend" transform="translate(16 ${LEGEND_Y})">${g}</g>`;
    if (scale >= NARROW) {
      return { legend: wrap(item(7) + (caption ? `<text x="0" y="40" class="q-caption">${esc(caption)}</text>` : "")), height: VH };
    }
    const size = Math.max(11 / scale, 28);   // the CSS's size on a phone, in the drawing's units
    const perLine = Math.floor((VW - 32) / (0.5 * size)), lines = [];
    for (const word of String(caption || "").split(" ").filter(Boolean)) {
      const lastLine = lines[lines.length - 1];
      if (lastLine && lastLine.length + 1 + word.length <= perLine) lines[lines.length - 1] = `${lastLine} ${word}`;
      else lines.push(word);
    }
    const base = Math.round(0.35 * size), gap = Math.round(1.3 * size);
    const text = lines.map((l, i) => `<text x="0" y="${base + (i + 1) * gap}" class="q-caption">${esc(l)}</text>`).join("");
    const bottom = LEGEND_Y + base + lines.length * gap + Math.round(0.4 * size) + 4;
    return { legend: wrap(item(base) + text), height: Math.max(VH, bottom) };
  }

  NKC.quilt.svgHtml = function (caption, scale = 1) {
    const defs = `<defs>
      <pattern id="w-stripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="6" height="12" fill="rgba(255,255,255,0.13)"/></pattern>
      <pattern id="w-checks" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="rgba(255,255,255,0.12)"/><rect x="10" y="10" width="10" height="10" fill="rgba(255,255,255,0.12)"/></pattern>
      <pattern id="w-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="2.4" fill="rgba(255,255,255,0.2)"/></pattern>
      <pattern id="w-zigzag" width="20" height="12" patternUnits="userSpaceOnUse"><path d="M0 9 L5 3 L10 9 L15 3 L20 9" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2"/></pattern>
    </defs>`;
    const patches = PATCHES.map((p) => {
      const x = p.col * U + PAD, y = p.row * V + PAD, w = p.w * U - 2 * PAD, h = p.h * V - 2 * PAD;
      const c = centre(p);
      const people = p.archaic ? pastPerson(c.x - 10, c.y + 30) : person(c.x - 22, c.y + 30) + person(c.x, c.y + 30) + person(c.x + 22, c.y + 30);
      // Our archaic cousins' patches have rounder corners than the continents', in the same grid.
      const r = p.archaic ? 28 : 10, hem = p.archaic ? 22 : 6;
      return `<g class="q-patch${p.archaic ? " archaic" : ""}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${p.fill}"/>` +
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#w-${p.weave})"/>` +
        `<rect class="q-hem" x="${x + 7}" y="${y + 7}" width="${w - 14}" height="${h - 14}" rx="${hem}"/>` +
        `<text class="q-label" x="${c.x}" y="${c.y - 8}" text-anchor="middle">${esc(p.label)}</text>${people}</g>`;
    }).join("");
    const at = (id) => PATCHES.find((p) => p.id === id);
    const seams = SEAMS.map((s) => {
      const a = centre(at(s.from)), b = centre(at(s.to));
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.15, my = (a.y + b.y) / 2 - (b.x - a.x) * 0.15;
      const place = s.share && NKC.quilt.sharePlace(s, scale, mx, my);
      const share = place ? `<text class="q-share" x="${place.x}" y="${place.y}" text-anchor="${place.anchor}">${esc(s.share)}</text>` : "";
      return `<path class="q-seam ${s.kind}" d="M${a.x} ${a.y + 4} Q${mx} ${my} ${b.x} ${b.y + 4}"/>${share}`;
    }).join("");
    const { legend, height } = legendHtml(caption, scale);
    return `<svg class="quilt-svg" viewBox="0 0 ${VW} ${height}" role="img" aria-label="A quilt of regions and peoples, stitched together by journeys and by mixing with Neanderthals and Denisovans">${defs}${patches}${seams}${legend}</svg>`;
  };

  NKC.registerVisual("quilt", (el, opts) => {
    const caption = (opts && opts.caption) || "Proportions are symbolic.";
    // Tell the CSS how far the drawing is scaled down, so the shares can keep a readable size, and
    // redraw when that moves a share to its narrow spot or back.
    let drawn = "";
    const fit = () => {
      const scale = el.clientWidth ? el.clientWidth / VW : 1;
      if (el.clientWidth) el.style.setProperty("--q-scale", String(scale));
      const html = NKC.quilt.svgHtml(caption, scale);
      if (html !== drawn) el.innerHTML = drawn = html;
    };
    fit();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(fit).observe(el);
    return { start() {}, stop() {}, drawStill() {} };
  }, { static: true });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
