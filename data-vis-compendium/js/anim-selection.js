// SPDX-License-Identifier: GPL-3.0-only
// Stop 5: copies and selection. A hundred copiers of two kinds; one copies a little faster.
// Each generation is drawn by chance, weighted by speed, and the faster kind takes over.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});

  // Wright–Fisher: each of `size` places in the next generation is a copy of an a or a b,
  // chosen at random in proportion to how many there are and how fast each copies.
  function generation(pop, fitness, size, rand) {
    const wa = pop.a * fitness.a, wb = pop.b * fitness.b;
    const p = wa + wb > 0 ? wa / (wa + wb) : 0;
    let a = 0;
    for (let i = 0; i < size; i++) if (rand() < p) a++;
    return { a, b: size - a };
  }
  NKC.selection = { generation };

  NKC.registerVisual("selection", (el) => {
    const rand = NKC.rng(51);
    const C = NKC.COLOURS;
    const SIZE = 100, FIT = { a: 1.15, b: 1.0 };
    const order = Array.from({ length: SIZE }, (_, i) => i).sort(() => rand() - 0.5);
    const init = () => ({ pop: { a: 10, b: 90 }, gen: 0, t: 0, hold: 0 });
    return NKC.canvasAnim(el, 260, {
      label: "A hundred copiers of two kinds; the slightly faster kind takes over over the generations",
      init,
      tick(s) {
        s.t++;
        if (s.pop.a === SIZE || s.pop.a === 0) { if (++s.hold > 120) Object.assign(s, init()); return; }
        if (s.t % 36 === 0) { s.pop = generation(s.pop, FIT, SIZE, rand); s.gen++; }
      },
      still(s) { s.pop = { a: 62, b: 38 }; s.gen = 14; },
      draw(ctx, s, W, H) {
        ctx.fillStyle = C.paper;
        ctx.fillRect(0, 0, W, H);
        const side = Math.min((H - 50) / 10, (W - 24) / 10), x0 = (W - side * 10) / 2, y0 = 38;
        const isA = new Set(order.slice(0, s.pop.a));
        for (let i = 0; i < SIZE; i++) {
          ctx.fillStyle = isA.has(i) ? C.verdigris : C.copper;
          ctx.fillRect(x0 + (i % 10) * side + 1, y0 + Math.floor(i / 10) * side + 1, side - 2, side - 2);
        }
        ctx.fillStyle = C.slate;
        ctx.font = "14px serif";
        const words = W < 520 ? `generation ${s.gen}: ${s.pop.a} faster (green)`
          : `generation ${s.gen}: ${s.pop.a} of ${SIZE} are the faster copier (green)`;
        ctx.fillText(words, 12, 22);
      },
    });
  });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
