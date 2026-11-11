// SPDX-License-Identifier: GPL-3.0-only
// Stop 6.3: a sponge, built from repeated little chambers. Water comes in through
// tiny pores in the wall, passes through chambers lined with collar cells whose beating whips
// (flagella) pull it along, and leaves through the big opening at the top (the osculum).
// Our diagram, not to scale (after the aquiferous system described by Leys et al. 2011).
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const esc = (s) => NKC.esc(s);
  const C = { wall: "#E7C88C", wallEdge: "#A07A3A", chamber: "#F6EBD0", collar: "#7A4F2A", water: "#1F5A8A", ink: "#2B2E31", soft: "#55595E" };

  // The chambers in both walls of the vase: `cols` across each wall, `rows` down it.
  // Fixed geometry: walls 100 units wide at x 120–220 and 400–500, from y 130 to 450.
  function chambers(cols, rows, geo) {
    const g = geo || { walls: [120, 400], width: 100, top: 130, height: 320 };
    const dx = g.width / cols, dy = g.height / rows, r = Math.min(dx, dy) * 0.36;
    const out = [];
    for (const left of g.walls) {
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) out.push({ x: left + dx * (i + 0.5), y: g.top + dy * (j + 0.5), r });
      }
    }
    return out;
  }
  // The water's arrows: thick enough, with heads big enough, to read as arrows when the drawing is small.
  // `head` is the arrowhead's length; its half-angle (0.45 rad) sets the width, so both scale with it.
  const ARROW = { width: 5.4, wideWidth: 9, head: 20 };
  NKC.sponge = { chambers, ARROW };

  function arrow(x1, y1, x2, y2, wide) {
    const a = Math.atan2(y2 - y1, x2 - x1), h = ARROW.head;
    const p1 = `${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)}`, p2 = `${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`;
    // The shaft stops inside the head, so its square end can't show past the point.
    const ex = x2 - h * 0.6 * Math.cos(a), ey = y2 - h * 0.6 * Math.sin(a);
    return `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="${C.water}" stroke-width="${wide ? ARROW.wideWidth : ARROW.width}"/><polygon points="${x2},${y2} ${p1} ${p2}" fill="${C.water}"/>`;
  }
  const text = (x, y, s, cls, anchor) => `<text x="${x}" y="${y}" class="${cls || "sp-label"}"${anchor ? ` text-anchor="${anchor}"` : ""}>${esc(s)}</text>`;

  // A chamber: a little round room, its inside rim lined with collar cells.
  function chamber(c, collars) {
    let s = `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" fill="${C.chamber}" stroke="${C.wallEdge}" stroke-width="1"/>`;
    for (let k = 0; k < collars; k++) {
      const a = (k / collars) * Math.PI * 2;
      s += `<circle cx="${c.x + Math.cos(a) * c.r * 0.72}" cy="${c.y + Math.sin(a) * c.r * 0.72}" r="${Math.max(1, c.r * 0.16)}" fill="${C.collar}"/>`;
    }
    return s;
  }

  // The vase: two walls full of chambers, a base, an open top. (sx, sy) shifts it; k scales it.
  function vase(list, k, sx, sy) {
    const T = (x, y) => `${sx + x * k},${sy + y * k}`;
    let s = `<path d="M${T(120, 110)} L${T(120, 470)} Q${T(310, 520)} ${T(500, 470)} L${T(500, 110)} L${T(400, 110)} L${T(400, 450)} Q${T(310, 470)} ${T(220, 450)} L${T(220, 110)} Z" fill="${C.wall}" stroke="${C.wallEdge}" stroke-width="2"/>`;
    for (const c of list) s += chamber({ x: sx + c.x * k, y: sy + c.y * k, r: c.r * k }, 6);
    // pores and water coming in on both outer faces
    for (const y of [160, 250, 340, 420]) {
      s += arrow(sx + 72 * k, sy + y * k, sx + 116 * k, sy + y * k) + arrow(sx + 548 * k, sy + y * k, sx + 504 * k, sy + y * k);
    }
    // up through the middle and out of the top
    s += arrow(sx + 310 * k, sy + 420 * k, sx + 310 * k, sy + 160 * k) + arrow(sx + 310 * k, sy + 130 * k, sx + 310 * k, sy + 30 * k, true);
    return s;
  }

  // One chamber, enlarged: collar cells on the rim, each with a whip pointing in.
  function inset(cx, cy, R) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${C.chamber}" stroke="${C.wallEdge}" stroke-width="2"/>`;
    const n = 14;
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2, bx = cx + Math.cos(a) * (R - 12), by = cy + Math.sin(a) * (R - 12);
      const tx = cx + Math.cos(a) * (R - 42), ty = cy + Math.sin(a) * (R - 42);
      const nx = -Math.sin(a) * 5, ny = Math.cos(a) * 5;
      s += `<circle cx="${bx}" cy="${by}" r="8" fill="${C.collar}"/>` +
        `<path d="M${bx} ${by} Q${(bx + tx) / 2 + nx} ${(by + ty) / 2 + ny} ${tx} ${ty}" fill="none" stroke="${C.collar}" stroke-width="2"/>`;
    }
    return s + arrow(cx - R - 50, cy + 20, cx - R + 6, cy + 20) + arrow(cx + R * 0.5, cy - R * 0.7, cx + R * 0.95, cy - R * 1.25);
  }

  NKC.sponge.svgHtml = function (narrow) {
    if (narrow) {
      const list = chambers(3, 5);
      return `<svg class="sponge-svg" viewBox="0 0 420 740" role="img" aria-label="Diagram of a sponge: water in through tiny pores, through chambers lined with collar cells, and out of the top">` +
        vase(list, 0.62, 18, 10) +
        text(330, 40, "water out", "sp-small", "start") +
        text(20, 365, "water in through tiny pores", "sp-small") +
        text(20, 395, "chambers lined with collar cells:", "sp-small") +
        text(20, 420, "up to 12,000 in a cubic millimetre", "sp-small") +
        text(20, 470, "one chamber, enlarged", "sp-label sp-strong") +
        inset(230, 620, 95) +
        `</svg>`;
    }
    const list = chambers(4, 6);
    return `<svg class="sponge-svg" viewBox="0 0 1000 620" role="img" aria-label="Diagram of a sponge: water in through tiny pores, through thousands of chambers lined with collar cells, and out of the top; one chamber enlarged">` +
      vase(list, 1, 0, 20) +
      text(330, 52, "water out (the osculum)", "sp-label") +
      text(10, 568, "water in through tiny pores", "sp-label") +
      text(10, 600, "chambers lined with collar cells: up to 12,000 in a cubic millimetre", "sp-small") +
      `<line x1="${460}" y1="${20 + 290}" x2="${672}" y2="${255}" stroke="${C.soft}" stroke-width="1.5" stroke-dasharray="5 5"/>` +
      inset(800, 260, 140) +
      text(800, 452, "one chamber, enlarged:", "sp-label sp-strong", "middle") +
      text(800, 480, "collar cells beat their whips", "sp-small", "middle") +
      text(800, 506, "(flagella) to pull the water through", "sp-small", "middle") +
      `</svg>`;
  };

  NKC.registerVisual("sponge", (el) => {
    let narrow = null;
    function draw() {
      const n = (el.clientWidth || 800) < 600;
      if (n !== narrow) { narrow = n; el.innerHTML = NKC.sponge.svgHtml(n); }
    }
    draw();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(draw).observe(el);
    return { start() {}, stop() {}, drawStill() {} };
  }, { static: true });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
