// SPDX-License-Identifier: GPL-3.0-only
// Stop 7: pattern recognition, ELI10. Put red and blue dots on the board; the computer colours
// every other spot by asking one question: which colours are closest? (A nearest-neighbour
// classifier, with the three nearest dots voting.)
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const COL = { red: "#B8552F", blue: "#1F5A8A" };
  const TINT = { red: "rgba(184, 85, 47, 0.16)", blue: "rgba(31, 90, 138, 0.16)" };

  function classify(points, x, y, k) {
    if (!points.length) return null;
    const near = points.map((p) => ({ c: p.c, d: (p.x - x) ** 2 + (p.y - y) ** 2 }))
      .sort((a, b) => a.d - b.d).slice(0, Math.max(1, k));
    const votes = {};
    for (const n of near) votes[n.c] = (votes[n.c] || 0) + 1;
    const best = Math.max(...Object.values(votes));
    const tied = Object.keys(votes).filter((c) => votes[c] === best);
    return tied.length === 1 ? tied[0] : near.find((n) => tied.includes(n.c)).c;
  }

  const K = 3;   // how many of the nearest dots vote

  // The board opens (and Start again returns) on the author's ten dots, in fractions of its width
  // and height, so the boundary bends between red and blue before the reader touches it.
  const STARTER = [
    { x: 0.20, y: 0.30, c: "red" }, { x: 0.38, y: 0.40, c: "red" }, { x: 0.28, y: 0.63, c: "red" },
    { x: 0.56, y: 0.85, c: "red" }, { x: 0.64, y: 0.80, c: "red" },
    { x: 0.44, y: 0.19, c: "blue" }, { x: 0.56, y: 0.33, c: "blue" }, { x: 0.66, y: 0.36, c: "blue" },
    { x: 0.84, y: 0.28, c: "blue" }, { x: 0.78, y: 0.66, c: "blue" },
  ];

  function uiHtml() {
    return `<canvas class="pattern-board" aria-label="A board of red and blue dots; click to add one"></canvas>` +
      `<div class="pattern-tools">` +
      `<button type="button" data-colour="red" aria-pressed="true"><span class="colour-dot red"></span> Place red</button>` +
      `<button type="button" data-colour="blue" aria-pressed="false"><span class="colour-dot blue"></span> Place blue</button>` +
      `<button type="button" data-action="random">Add a dot at random</button>` +
      `<button type="button" data-action="reset">Start again</button></div>` +
      `<p class="pattern-line">The computer only ever asks: which colours are closest?</p>`;
  }
  NKC.pattern = { classify, K, STARTER, COL, uiHtml };

  NKC.registerVisual("pattern", (el) => {
    el.innerHTML = uiHtml();
    const canvas = el.querySelector("canvas"), ctx = canvas.getContext("2d");
    const H = 260, CELL = 8;
    let W = 600, pts = STARTER.map((p) => ({ ...p })), colour = "red";
    function size() {
      const dpr = root.devicePixelRatio || 1;
      W = Math.max(240, canvas.clientWidth || el.clientWidth || 600);
      canvas.style.height = `${H}px`;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw() {
      const px = pts.map((p) => ({ x: p.x * W, y: p.y * H, c: p.c }));
      ctx.fillStyle = "#FFFDF7";
      ctx.fillRect(0, 0, W, H);
      for (let y = 0; y < H; y += CELL) {
        for (let x = 0; x < W; x += CELL) {
          const c = classify(px, x + CELL / 2, y + CELL / 2, K);
          if (c) { ctx.fillStyle = TINT[c]; ctx.fillRect(x, y, CELL, CELL); }
        }
      }
      for (const p of px) {
        ctx.fillStyle = COL[p.c]; ctx.strokeStyle = "#FFFDF7"; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
    }
    canvas.addEventListener("click", (ev) => {
      const r = canvas.getBoundingClientRect();
      pts.push({ x: (ev.clientX - r.left) / r.width, y: (ev.clientY - r.top) / r.height, c: colour });
      draw();
    });
    for (const b of el.querySelectorAll("[data-colour]")) {
      b.addEventListener("click", () => {
        colour = b.dataset.colour;
        for (const o of el.querySelectorAll("[data-colour]")) o.setAttribute("aria-pressed", String(o === b));
      });
    }
    el.querySelector("[data-action=reset]").addEventListener("click", () => { pts = STARTER.map((p) => ({ ...p })); draw(); });
    // Keyboard and switch users: the same as a click, at a random spot, in the chosen colour.
    el.querySelector("[data-action=random]").addEventListener("click", () => {
      pts.push({ x: 0.05 + Math.random() * 0.9, y: 0.05 + Math.random() * 0.9, c: colour });
      draw();
    });
    size(); draw();
    if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => { size(); draw(); }).observe(canvas);
    return { start() {}, stop() {}, drawStill() { draw(); } };   // nothing moves: it changes only when clicked
  }, { static: true });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
