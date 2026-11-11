// SPDX-License-Identifier: GPL-3.0-only
// Stop 2: a vesicle forms. Each molecule has a water-loving head and an oily tail. Drifting in
// water, they close into a two-layered sac: heads out to the water on the outside and in to the
// water on the inside, tails tucked between. Sped up, and drawn, not simulated.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const D = 7;   // half the bilayer's thickness

  function targets(n, cx, cy, r) {
    const half = Math.floor(n / 2), out = [];
    for (let i = 0; i < half; i++) {
      const a = (2 * Math.PI * i) / half;
      out.push({ x: cx + (r + D) * Math.cos(a), y: cy + (r + D) * Math.sin(a), angle: a, leaflet: "outer" });
    }
    for (let i = 0; i < half; i++) {
      const a = (2 * Math.PI * (i + 0.5)) / half;
      out.push({ x: cx + (r - D) * Math.cos(a), y: cy + (r - D) * Math.sin(a), angle: a + Math.PI, leaflet: "inner" });
    }
    return out;
  }
  NKC.vesicle = { targets };

  const ease = (t) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t));
  const lerpAngle = (a, b, t) => a + (((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * t;

  NKC.registerVisual("vesicle", (el) => {
    const rand = NKC.rng(21);
    const C = NKC.COLOURS;
    const N = 72;
    function scatter(W, H) {
      return Array.from({ length: N }, () => ({ x: rand() * W, y: rand() * H, angle: rand() * Math.PI * 2 }));
    }
    function init(W, H) {
      const r = Math.min(W, H) * 0.28;
      return { free: scatter(W, H), goal: targets(N, W / 2, H / 2, r), t: 0 };
    }
    return NKC.canvasAnim(el, 260, {
      label: "Molecules with a water-loving head and an oily tail closing into a two-layered sac",
      init,
      tick(s, W, H) {
        s.t++;
        if (s.t < 140) for (const m of s.free) { m.x += (rand() - 0.5) * 2; m.y += (rand() - 0.5) * 2; m.angle += (rand() - 0.5) * 0.2; }
        if (s.t > 620) { const fresh = init(W, H); Object.assign(s, fresh); }
      },
      still(s) { s.t = 420; },
      draw(ctx, s, W, H) {
        ctx.fillStyle = C.water;
        ctx.fillRect(0, 0, W, H);
        const k = s.t < 140 ? 0 : s.t < 330 ? ease((s.t - 140) / 190) : s.t < 520 ? 1 : 1 - ease((s.t - 520) / 100);
        const wob = s.t >= 330 && s.t < 520 ? 0.6 : 0;
        for (let i = 0; i < N; i++) {
          const f = s.free[i], g = s.goal[i];
          const x = f.x + (g.x - f.x) * k + (wob ? Math.sin(s.t / 9 + i) * wob : 0);
          const y = f.y + (g.y - f.y) * k + (wob ? Math.cos(s.t / 11 + i) * wob : 0);
          const a = lerpAngle(f.angle, g.angle, k);
          ctx.strokeStyle = C.copper;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - Math.cos(a) * 11, y - Math.sin(a) * 11);
          ctx.stroke();
          ctx.fillStyle = C.verdigris;
          ctx.beginPath();
          ctx.arc(x, y, 3.6, 0, Math.PI * 2);
          ctx.fill();
        }
      },
    });
  });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
