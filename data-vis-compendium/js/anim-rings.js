// SPDX-License-Identifier: GPL-3.0-only
// Stop 10.1: a tree's rings, one a year from the centre out (book 1 ch. 11: "A tree adds a growth
// ring each year"). An illustration, not a real tree: the ring widths are invented (a gentle
// narrowing with age and a seeded wobble), and the three marked years are the author's choice.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const esc = (s) => NKC.esc(s);
  const C = { wood: "#EDD5A4", heart: "#E2C189", line: "#A07A3A", bark: "#7A4F2A", barkEdge: "#5A3A1E", mark: "#B8552F", ink: "#2B2E31", soft: "#55595E" };

  const PLANTED = 1900, THIS_YEAR = 2026;
  const EVENTS = [
    { year: 1945, label: "1945: the Second World War ends" },
    { year: 1989, label: "1989: the Berlin Wall falls" },
    { year: 2000, label: "2000: Y2K" },
  ];
  const NOTE = "An illustration, not a real tree: a trunk planted in 1900, with three of its years marked.";

  // One ring a year, plantedYear to thisYear inclusive. r is each ring's outer edge as a share of the
  // trunk's radius (the last ring ends at 1); a label is attached to the years that have an event.
  function rings(plantedYear, thisYear, events) {
    const rand = NKC.rng(plantedYear * 31 + thisYear);
    const n = thisYear - plantedYear + 1;
    const widths = [];
    for (let i = 0; i < n; i++) widths.push((1.5 - 0.8 * (i / Math.max(1, n - 1))) * (0.6 + 0.8 * rand()));
    const total = widths.reduce((a, b) => a + b, 0);
    const byYear = new Map((events || []).map((e) => [e.year, e.label]));
    let acc = 0;
    return widths.map((w, i) => {
      acc += w;
      const year = plantedYear + i;
      return { year, r: acc / total, label: byYear.has(year) ? byYear.get(year) : null };
    });
  }
  NKC.rings = { rings };

  const f = (x) => Math.round(x * 10) / 10;
  const text = (x, y, s, cls, anchor) => `<text x="${f(x)}" y="${f(y)}" class="${cls}"${anchor ? ` text-anchor="${anchor}"` : ""}>${esc(s)}</text>`;
  const polar = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];

  // The trunk: rough bark, wood with a darker heart, one thin line per ring, and the marked rings in ochre.
  function trunk(list, cx, cy, R) {
    const rand = NKC.rng(7);
    const bark = [];
    for (let k = 0; k < 96; k++) {
      const [x, y] = polar(cx, cy, R + 11 + 5 * rand(), (k / 96) * 360);
      bark.push(`${f(x)},${f(y)}`);
    }
    let s = `<polygon points="${bark.join(" ")}" fill="${C.bark}" stroke="${C.barkEdge}" stroke-width="2" stroke-linejoin="round"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${C.wood}"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${f(R * 0.42)}" fill="${C.heart}"/>`;
    for (const ring of list) {
      s += ring.label
        ? `<circle cx="${cx}" cy="${cy}" r="${f(ring.r * R)}" fill="none" stroke="${C.mark}" stroke-width="2.6"/>`
        : `<circle cx="${cx}" cy="${cy}" r="${f(ring.r * R)}" fill="none" stroke="${C.line}" stroke-width="0.7" stroke-opacity="0.7"/>`;
    }
    return s + `<circle cx="${cx}" cy="${cy}" r="2.5" fill="${C.barkEdge}"/>`;
  }

  // A leader: a dot on the ring, out along the radius past the bark, then on to (tx, ty).
  function leader(cx, cy, r, R, deg, tx, ty, colour) {
    const [x0, y0] = polar(cx, cy, r, deg), [x1, y1] = polar(cx, cy, R + 24, deg);
    return `<polyline points="${f(x0)},${f(y0)} ${f(x1)},${f(y1)} ${f(tx)},${f(ty)}" fill="none" stroke="${colour}" stroke-width="1.6"/>` +
      `<circle cx="${f(x0)}" cy="${f(y0)}" r="4" fill="${colour}"/>`;
  }

  const ARIA = "Drawing of a tree trunk cut across, with one ring a year from 1900 at the centre to 2026 under the bark; " +
    "the rings for 1945, 1989, and 2000 are marked: the Second World War ends, the Berlin Wall falls, and Y2K. An illustration, not a real tree.";

  NKC.rings.svgHtml = function (narrow) {
    const list = rings(PLANTED, THIS_YEAR, EVENTS);
    const marked = list.filter((r) => r.label);
    if (narrow) {
      const cx = 210, cy = 200, R = 165;
      // Leaders drop straight down to rows below the trunk; the outer ring takes the top row.
      const angles = [145, 115, 80], rows = [484, 452, 420];
      let s = `<svg class="rings-svg" viewBox="0 0 420 640" role="img" aria-label="${esc(ARIA)}">` + trunk(list, cx, cy, R);
      marked.forEach((m, i) => {
        const [x1] = polar(cx, cy, R + 24, angles[i]);
        s += leader(cx, cy, m.r * R, R, angles[i], x1, rows[i] - 6, C.mark) + text(x1 + 8, rows[i], m.label, "rg-small rg-strong");
      });
      return s + text(20, 526, "the oldest ring at the centre,", "rg-small rg-soft") +
        text(20, 548, "the newest under the bark", "rg-small rg-soft") +
        `<text class="rg-small rg-note"><tspan x="20" y="584">An illustration, not a real tree:</tspan>` +
        `<tspan x="20" y="607">a trunk planted in 1900, with three</tspan><tspan x="20" y="630">of its years marked.</tspan></text></svg>`;
    }
    const cx = 290, cy = 272, R = 232, tx = 640;
    const angles = [-25, 5, 32], rows = [170, 292, 410];
    let s = `<svg class="rings-svg" viewBox="0 0 1000 600" role="img" aria-label="${esc(ARIA)}">` + trunk(list, cx, cy, R);
    marked.forEach((m, i) => {
      s += leader(cx, cy, m.r * R, R, angles[i], tx - 8, rows[i] - 7, C.mark) + text(tx, rows[i], m.label, "rg-label rg-strong");
    });
    s += leader(cx, cy, R, R, -58, tx - 8, 58, C.soft) + text(tx, 65, "under the bark: the newest ring", "rg-small rg-soft");
    s += leader(cx, cy, 0, R, 58, tx - 8, 500, C.soft) + text(tx, 507, "at the centre: the oldest ring", "rg-small rg-soft");
    return s + text(20, 584, NOTE, "rg-small rg-note") + `</svg>`;
  };

  NKC.registerVisual("rings", (el) => {
    let narrow = null;
    function draw() {
      const n = (el.clientWidth || 800) < 600;
      if (n !== narrow) { narrow = n; el.innerHTML = NKC.rings.svgHtml(n); }
    }
    draw();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(draw).observe(el);
    return { start() {}, stop() {}, drawStill() {} };
  }, { static: true });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
