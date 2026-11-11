// SPDX-License-Identifier: GPL-3.0-only
// Stop 6.2: Anabaena, compartments that split the work. A filament of ordinary (vegetative) cells
// that photosynthesize, making sugar and oxygen, and, every 10 to 20 cells, a heterocyst: a cell
// that stops making oxygen, adds extra walls, and fixes nitrogen from the air, trading it for its
// neighbours' sugar. Our diagram, not to scale (after Kumar, Mella-Herrera & Golden 2010).
(function (root) {
  const NKC = (root.NKC = root.NKC || {});

  // The filament: a heterocyst every `spacing` cells, the first one half a spacing in.
  function cells(n, spacing) {
    const out = [];
    const first = Math.floor(spacing / 2);
    for (let i = 0; i < n; i++) out.push(i >= first && (i - first) % spacing === 0 ? "heterocyst" : "vegetative");
    return out;
  }

  const C = { veg: "#3F8F46", vegLine: "#2E6B3A", het: "#E9E3B4", hetRing: "#8A7A2E", sugar: "#B8552F", nitrogen: "#1F5A8A", ink: "#2B2E31", soft: "#55595E" };
  const esc = (s) => NKC.esc(s);

  function arrow(x1, y1, x2, y2, colour) {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    const p1 = `${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)}`, p2 = `${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colour}" stroke-width="3"/><polygon points="${x2},${y2} ${p1} ${p2}" fill="${colour}"/>`;
  }
  const text = (x, y, s, opts) => {
    const o = opts || {};
    return `<text x="${x}" y="${y}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""} class="${o.cls || "ab-label"}"${o.fill ? ` fill="${o.fill}"` : ""}>${esc(s)}</text>`;
  };

  function filament(list, x0, y, step) {
    let out = `<line x1="${x0 - 14}" y1="${y}" x2="${x0 + step * (list.length - 1) + 14}" y2="${y}" stroke="${C.vegLine}" stroke-width="3"/>`;
    list.forEach((kind, i) => {
      const x = x0 + i * step;
      if (kind === "heterocyst") {
        out += `<ellipse cx="${x}" cy="${y}" rx="${step * 0.62}" ry="${step * 0.56}" fill="none" stroke="${C.hetRing}" stroke-width="5"/>` +   // outer wall
          `<ellipse cx="${x}" cy="${y}" rx="${step * 0.5}" ry="${step * 0.45}" fill="${C.het}" stroke="${C.hetRing}" stroke-width="2.5"/>` + // inner wall
          `<circle cx="${x - step * 0.47}" cy="${y}" r="3.5" fill="${C.hetRing}"/><circle cx="${x + step * 0.47}" cy="${y}" r="3.5" fill="${C.hetRing}"/>`; // polar plugs
      } else {
        out += `<ellipse cx="${x}" cy="${y}" rx="${step * 0.46}" ry="${step * 0.42}" fill="${C.veg}" stroke="${C.vegLine}" stroke-width="1.5"/>`;
      }
    });
    return out;
  }

  // One heterocyst's exchange with its neighbours, drawn around cell index `h`.
  function exchange(x0, y, step, h) {
    const x = x0 + h * step;
    return arrow(x - step * 2.6, y - step * 1.05, x - step * 0.75, y - step * 0.6, C.sugar) +
      arrow(x + step * 2.6, y - step * 1.05, x + step * 0.75, y - step * 0.6, C.sugar) +
      arrow(x - step * 0.75, y + step * 0.6, x - step * 2.6, y + step * 1.05, C.nitrogen) +
      arrow(x + step * 0.75, y + step * 0.6, x + step * 2.6, y + step * 1.05, C.nitrogen);
  }

  const bubbles = (x, y) => `<circle cx="${x}" cy="${y}" r="4" class="ab-bubble"/><circle cx="${x + 7}" cy="${y - 10}" r="3" class="ab-bubble"/>`;

  NKC.anabaena = { cells };

  NKC.anabaena.svgHtml = function (narrow) {
    if (narrow) {
      const list = cells(9, 9), step = 42, x0 = 42, y = 150, h = list.indexOf("heterocyst");
      const hx = x0 + h * step;
      return `<svg class="anabaena-svg" viewBox="0 0 420 470" role="img" aria-label="Diagram of an Anabaena filament: green cells send sugar to a heterocyst, which sends fixed nitrogen back">` +
        text(210, 34, "heterocyst: fixes nitrogen from the air", { anchor: "middle", cls: "ab-title-n" }) +
        exchange(x0, y, step, h) + filament(list, x0, y, step) + bubbles(x0 + step, y - 34) + bubbles(x0 + 7 * step, y - 34) +
        text(hx - step * 2.7, y - step * 1.25, "sugar", { anchor: "middle", fill: C.sugar, cls: "ab-small" }) +
        text(hx - step * 2.7, y + step * 1.65, "fixed nitrogen", { anchor: "middle", fill: C.nitrogen, cls: "ab-small" }) +
        text(20, 280, "In the heterocyst:", { cls: "ab-label ab-strong" }) +
        text(20, 312, "• extra walls keep oxygen out", { cls: "ab-small" }) +
        text(20, 340, "• no oxygen made here", { cls: "ab-small" }) +
        text(20, 380, "In the green cells:", { cls: "ab-label ab-strong" }) +
        text(20, 412, "• photosynthesis makes sugar, and oxygen", { cls: "ab-small" }) +
        text(20, 450, "About 1 cell in 10 to 20 becomes a heterocyst.", { cls: "ab-small", fill: C.soft }) +
        `</svg>`;
    }
    const list = cells(23, 11), step = 40, x0 = 60, y = 190;
    const hs = list.map((k, i) => (k === "heterocyst" ? i : -1)).filter((i) => i >= 0);
    const [h1, h2] = hs, x1 = x0 + h1 * step, x2 = x0 + h2 * step;
    return `<svg class="anabaena-svg" viewBox="0 0 1000 390" role="img" aria-label="Diagram of an Anabaena filament: green cells send sugar to the heterocysts, which send fixed nitrogen back; at least ten ordinary cells lie between heterocysts">` +
      exchange(x0, y, step, h2) + filament(list, x0, y, step) +
      bubbles(x0 + 1 * step, y - 36) + bubbles(x0 + 9 * step, y - 36) + bubbles(x0 + 21 * step, y - 36) +
      text(x0 + 1 * step - 4, y - 58, "oxygen", { anchor: "middle", cls: "ab-small", fill: C.soft }) +
      // the heterocyst on the left, explained
      text(x1, 58, "heterocyst: fixes nitrogen from the air", { anchor: "middle", cls: "ab-title" }) +
      text(x1, 86, "extra walls keep oxygen out; no oxygen made here", { anchor: "middle", cls: "ab-small" }) +
      `<line x1="${x1}" y1="96" x2="${x1}" y2="${y - 30}" stroke="${C.soft}" stroke-width="1.5" stroke-dasharray="4 4"/>` +
      // the exchange around the right heterocyst
      text(x2 - step * 2.7, y - step * 1.3, "sugar", { anchor: "middle", fill: C.sugar }) +
      text(x2 + step * 2.7, y - step * 1.3, "sugar", { anchor: "middle", fill: C.sugar }) +
      text(x2, y + step * 1.85, "fixed nitrogen, out to its neighbours", { anchor: "middle", fill: C.nitrogen }) +
      // the green cells, and the spacing
      text(x0 - 20, y + 92, "green cells: photosynthesis makes sugar, and oxygen", { cls: "ab-small" }) +
      `<path d="M${x1 + step} ${y + 120} L${x1 + step} ${y + 130} L${x2 - step} ${y + 130} L${x2 - step} ${y + 120}" fill="none" stroke="${C.soft}" stroke-width="1.5"/>` +
      text((x1 + x2) / 2, y + 158, "ten ordinary cells or more between heterocysts", { anchor: "middle", cls: "ab-small", fill: C.soft }) +
      `</svg>`;
  };

  NKC.registerVisual("anabaena", (el) => {
    let narrow = null;
    function draw() {
      const n = (el.clientWidth || 800) < 600;
      if (n !== narrow) { narrow = n; el.innerHTML = NKC.anabaena.svgHtml(n); }
    }
    draw();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(draw).observe(el);
    return { start() {}, stop() {}, drawStill() {} };
  }, { static: true });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
