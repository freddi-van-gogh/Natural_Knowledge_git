// SPDX-License-Identifier: GPL-3.0-only
// Stop 1, second visual: a drop of dye in still water. Each speck is knocked about at random
// (a random walk), and the drop spreads and thins out on its own.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const STEP = 6;

  function create(n, cx, cy) {
    const p = [];
    for (let i = 0; i < n; i++) p.push({ x: cx, y: cy });
    return p;
  }
  function step(particles, rand) {
    for (const q of particles) {
      q.x += (rand() - 0.5) * STEP;
      q.y += (rand() - 0.5) * STEP;
    }
  }
  function msd(particles, cx, cy) {
    let s = 0;
    for (const q of particles) s += (q.x - cx) ** 2 + (q.y - cy) ** 2;
    return s / particles.length;
  }
  NKC.dye = { create, step, msd };

  NKC.registerVisual("dye", (el) => {
    const rand = NKC.rng(11);
    const C = NKC.COLOURS;
    return NKC.canvasAnim(el, 220, {
      label: "A drop of dye spreading through still water",
      init: (W, H) => ({ p: create(700, W / 2, H / 2), t: 0 }),
      tick(s, W, H) {
        step(s.p, rand);
        if (++s.t > 1100) { s.p = create(700, W / 2, H / 2); s.t = 0; }
      },
      still(s) { for (let i = 0; i < 400; i++) step(s.p, rand); },
      draw(ctx, s, W, H) {
        ctx.fillStyle = C.water;
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "rgba(184, 85, 47, 0.35)";
        for (const q of s.p) {
          ctx.beginPath();
          ctx.arc(((q.x % W) + W) % W, ((q.y % H) + H) % H, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      },
    });
  });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
