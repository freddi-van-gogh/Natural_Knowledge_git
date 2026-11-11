// SPDX-License-Identifier: GPL-3.0-only
// Stop 10.2: four pyramid shapes side by side, each with one example, its date, and its use.
// Our drawing, not to scale. Dates: Djoser c. 2667–2648 BCE and Khufu c. 2589–2566 BCE (Egypt's
// Ministry of Tourism and Antiquities), the Sun Pyramid's main body 170–310 CE (Sugiyama et al. 2013),
// Borobudur 8th–9th century CE (UNESCO).
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const esc = (s) => NKC.esc(s);
  const C = { stone: "#E7C88C", shade: "#D3AD6B", edge: "#A07A3A", stair: "#B8925A", hill: "#7A4F2A", ground: "#55595E" };

  const TYPES = ["step", "smooth", "platform", "terraced"];
  const INFO = {
    step: { name: "step pyramid", place: "Saqqara", date: "about 2670 BCE", use: "a king's tomb" },
    smooth: { name: "smooth-sided pyramid", place: "Giza", date: "about 2560 BCE", use: "a king's tomb" },
    platform: { name: "platform with stairs", place: "Teotihuacan", date: "about 200 CE", use: "a platform for a temple" },
    terraced: { name: "terraced mound", place: "Borobudur", date: "about 800 CE", use: "a stupa round a hill" },
  };
  NKC.pyramids = { TYPES, INFO };

  const f = (x) => Math.round(x * 10) / 10;
  const pts = (list) => list.map(([x, y]) => `${f(x)},${f(y)}`).join(" ");
  const poly = (list, fill) => `<polygon points="${pts(list)}" fill="${fill}" stroke="${C.edge}" stroke-width="1.5" stroke-linejoin="round"/>`;
  const text = (x, y, s, cls) => `<text x="${f(x)}" y="${f(y)}" class="${cls}" text-anchor="middle">${esc(s)}</text>`;

  // Each shape is drawn about its base centre (0, 0), 200 units wide, rising to negative y.
  // A stack of tiers: widths from the bottom up, each tier's height, and how far its sides lean in.
  function tiers(widths, h, lean) {
    const left = [], right = [];
    widths.forEach((w, i) => {
      const y0 = -i * h, y1 = -(i + 1) * h;
      left.push([-w / 2, y0], [-w / 2 + lean, y1]);
      right.push([w / 2, y0], [w / 2 - lean, y1]);
    });
    return left.concat(right.reverse());
  }

  const SHAPES = {
    // Six stacked tiers, as Djoser's: "six stacked mastabas".
    step: () => poly(tiers([200, 172, 144, 116, 88, 60], 17, 5), C.stone),
    // One smooth slope to a point; the right face in shade.
    smooth: () => poly([[-100, 0], [0, -127], [0, 0]], C.stone) + poly([[0, 0], [0, -127], [100, 0]], C.shade),
    // Sloping tiers to a broad flat top, with a stair up the middle.
    platform: () => {
      let s = poly(tiers([200, 168, 136, 104], 17, 9), C.stone);
      s += `<rect x="-12" y="-68" width="24" height="68" fill="${C.stair}" stroke="${C.edge}" stroke-width="1"/>`;
      for (let y = -64; y < 0; y += 6) s += `<line x1="-12" y1="${y}" x2="12" y2="${y}" stroke="${C.edge}" stroke-width="0.8"/>`;
      return s;
    },
    // Square terraces, then round ones set with small stupas, a big stupa on top, and the hill inside (dashed).
    terraced: () => {
      let s = poly(tiers([200, 184, 168, 152, 136], 7, 0), C.stone);
      const round = [112, 92, 72];
      round.forEach((w, i) => {
        const y0 = -35 - i * 7;
        s += `<rect x="${-w / 2}" y="${y0 - 7}" width="${w}" height="7" fill="${C.stone}" stroke="${C.edge}" stroke-width="1.5"/>`;
        for (let x = -w / 2 + 8; x <= w / 2 - 8; x += 13) {
          s += `<path d="M${f(x - 4)} ${y0 - 7} A4 4 0 0 1 ${f(x + 4)} ${y0 - 7} Z" fill="${C.stone}" stroke="${C.edge}" stroke-width="1"/>`;
        }
      });
      s += `<path d="M-15 -56 A15 15 0 0 1 15 -56 Z" fill="${C.stone}" stroke="${C.edge}" stroke-width="1.5"/>` +
        `<line x1="0" y1="-71" x2="0" y2="-82" stroke="${C.edge}" stroke-width="2.5"/>` +
        `<path d="M-90 0 Q0 -90 90 0" fill="none" stroke="${C.hill}" stroke-width="1.6" stroke-dasharray="5 4"/>`;
      return s;
    },
  };

  function shape(type, x, ground, k) {
    return `<g transform="translate(${x} ${ground}) scale(${k})">${SHAPES[type]()}</g>`;
  }

  const ARIA = "Drawing of four pyramid shapes, not to scale: a step pyramid (Saqqara, about 2670 BCE, a king's tomb), " +
    "a smooth-sided pyramid (Giza, about 2560 BCE, a king's tomb), a platform with stairs (Teotihuacan, about 200 CE, a platform for a temple), " +
    "and a terraced mound (Borobudur, about 800 CE, a stupa round a hill)";

  NKC.pyramids.svgHtml = function (narrow) {
    if (narrow) {
      // Two rows of two: name, place, date, and use beneath each.
      let s = `<svg class="pyr-svg" viewBox="0 0 420 470" role="img" aria-label="${esc(ARIA)}">`;
      TYPES.forEach((t, i) => {
        const x = i % 2 ? 315 : 105, g = i < 2 ? 140 : 355, d = INFO[t];
        s += `<line x1="${x - 95}" y1="${g}" x2="${x + 95}" y2="${g}" stroke="${C.ground}" stroke-width="1.5"/>` +
          shape(t, x, g, 0.8) +
          text(x, g + 28, d.name, "py-name-n") + text(x, g + 51, d.place, "py-small-n") +
          text(x, g + 73, d.date, "py-small-n") + text(x, g + 95, d.use, "py-small-n py-soft");
      });
      return s + `</svg>`;
    }
    let s = `<svg class="pyr-svg" viewBox="0 0 1000 270" role="img" aria-label="${esc(ARIA)}">` +
      `<line x1="12" y1="152" x2="988" y2="152" stroke="${C.ground}" stroke-width="1.5"/>`;
    TYPES.forEach((t, i) => {
      const x = 125 + 250 * i, d = INFO[t];
      s += shape(t, x, 152, 1) +
        text(x, 188, d.name, "py-name") + text(x, 216, `${d.place}, ${d.date}`, "py-small") + text(x, 242, d.use, "py-small py-soft");
    });
    return s + `</svg>`;
  };

  NKC.registerVisual("pyramids", (el) => {
    let narrow = null;
    function draw() {
      const n = (el.clientWidth || 800) < 600;
      if (n !== narrow) { narrow = n; el.innerHTML = NKC.pyramids.svgHtml(n); }
    }
    draw();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(draw).observe(el);
    return { start() {}, stop() {}, drawStill() {} };
  }, { static: true });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
