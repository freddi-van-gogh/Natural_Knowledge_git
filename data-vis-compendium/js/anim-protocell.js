// SPDX-License-Identifier: GPL-3.0-only
// Stop 4: a protocell. A sac with self-copying chemistry inside: fed from outside, the contents
// grow, the sac grows with them, and past a size it splits in two. Not yet alive. Drawn, sped up.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});

  function step(cell, rand) {
    const threshold = cell.threshold || 100;
    if (cell.contents >= threshold) {
      const half = { contents: cell.contents / 2, food: cell.food / 2, threshold };
      return [{ ...half, x: cell.x, y: cell.y }, { ...half, x: cell.x, y: cell.y }];
    }
    if (cell.food > 0) {
      const g = Math.min(cell.food, 0.5 + rand() * 1.5);
      return [{ ...cell, contents: cell.contents + g, food: cell.food - g }];
    }
    return [{ ...cell }];
  }
  NKC.protocell = { step };

  NKC.registerVisual("protocell", (el) => {
    const rand = NKC.rng(41);
    const C = NKC.COLOURS;
    const MAX = 8;
    const init = (W, H) => ({ cells: [{ contents: 50, food: 0, threshold: 100, x: W / 2, y: H / 2, vx: 0, vy: 0 }], t: 0, hold: 0 });
    return NKC.canvasAnim(el, 260, {
      label: "Sacs with self-copying chemistry inside, growing and splitting in two",
      init,
      tick(s, W, H) {
        s.t++;
        if (s.cells.length >= MAX) { if (++s.hold > 150) Object.assign(s, init(W, H)); return; }
        if (s.t % 3 === 0) {
          const next = [];
          for (const c of s.cells) {
            c.food += 0.7;                                   // fed from the water around it
            const out = step(c, rand);
            if (out.length === 2) {
              const a = rand() * Math.PI * 2;
              out[0].vx = Math.cos(a) * 1.5; out[0].vy = Math.sin(a) * 1.5;
              out[1].vx = -out[0].vx; out[1].vy = -out[0].vy;
            } else { out[0].vx = c.vx; out[0].vy = c.vy; }
            next.push(...out);
          }
          s.cells = next.slice(0, MAX);
        }
        for (const c of s.cells) {                           // drift apart, stay inside the frame
          for (const o of s.cells) {
            if (o === c) continue;
            const dx = c.x - o.x, dy = c.y - o.y, d = Math.hypot(dx, dy) || 1, min = radius(c) + radius(o) + 6;
            if (d < min) { c.vx += (dx / d) * 0.05; c.vy += (dy / d) * 0.05; }
          }
          c.vx *= 0.93; c.vy *= 0.93;
          c.x = Math.min(W - radius(c), Math.max(radius(c), c.x + c.vx));
          c.y = Math.min(H - radius(c), Math.max(radius(c), c.y + c.vy));
        }
      },
      still(s) { s.cells[0].contents = 90; },
      draw(ctx, s, W, H) {
        ctx.fillStyle = C.water;
        ctx.fillRect(0, 0, W, H);
        for (const c of s.cells) {
          const r = radius(c);
          ctx.strokeStyle = C.copper; ctx.lineWidth = 5;
          ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, Math.PI * 2); ctx.stroke();
          ctx.strokeStyle = C.verdigris; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(c.x, c.y, r - 4, 0, Math.PI * 2); ctx.stroke();
          const dots = Math.floor(c.contents / 5);
          for (let i = 0; i < dots; i++) {
            const a = i * 2.39996, rr = (r - 10) * Math.sqrt((i + 0.5) / dots);
            ctx.fillStyle = i % 2 ? C.ochre : C.blueBlack;
            ctx.beginPath(); ctx.arc(c.x + Math.cos(a + s.t / 60) * rr, c.y + Math.sin(a + s.t / 60) * rr, 2.2, 0, Math.PI * 2); ctx.fill();
          }
        }
      },
    });
    function radius(c) { return 14 + Math.sqrt(c.contents) * 3.2; }
  });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
