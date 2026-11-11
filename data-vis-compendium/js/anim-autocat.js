// SPDX-License-Identifier: GPL-3.0-only
// Stop 3: reactions that feed themselves. A short strand speeds up the making of copies of
// itself from free building blocks, so copies make more copies, until the blocks run out.
// What a self-copying RNA strand could look like, sped up: an illustration, not a simulation
// of real chemistry.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});

  function step(state, rand, opts) {
    const copy = opts && opts.copy !== undefined ? opts.copy : 0.05;
    const decay = opts && opts.decay !== undefined ? opts.decay : 0;
    const n = state.strands.length;
    for (let i = 0; i < n; i++) {
      const len = state.strands[i];
      if (rand() < copy && state.monomers >= len) {
        state.monomers -= len;
        state.strands.push(len);
      }
    }
    if (decay > 0) {
      for (let i = state.strands.length - 1; i >= 0 && state.strands.length > 1; i--) {
        if (rand() < decay) {
          state.monomers += state.strands[i];
          state.strands.splice(i, 1);
        }
      }
    }
  }
  const total = (state) => state.monomers + state.strands.reduce((a, b) => a + b, 0);
  NKC.autocat = { step, total };

  NKC.registerVisual("autocat", (el) => {
    const rand = NKC.rng(31);
    const C = NKC.COLOURS;
    const LEN = 4, BLOCKS = 240;
    const BEAD = [C.verdigris, C.copper, C.ochre, C.blueBlack];
    function init(W, H) {
      return {
        chem: { strands: [LEN], monomers: BLOCKS },
        strands: [{ x: W / 2, y: H / 2, a: 0 }],
        dots: Array.from({ length: BLOCKS }, () => ({ x: rand() * W, y: rand() * H, c: Math.floor(rand() * 4) })),
        t: 0,
      };
    }
    return NKC.canvasAnim(el, 260, {
      label: "Short strands making copies of themselves from free building blocks until the blocks run out",
      init,
      tick(s, W, H) {
        s.t++;
        for (const d of s.dots) { d.x = (d.x + (rand() - 0.5) * 1.6 + W) % W; d.y = (d.y + (rand() - 0.5) * 1.6 + H) % H; }
        for (const q of s.strands) { q.x = (q.x + (rand() - 0.5) * 0.9 + W) % W; q.y = (q.y + (rand() - 0.5) * 0.9 + H) % H; q.a += (rand() - 0.5) * 0.05; }
        if (s.t % 5 === 0) {
          step(s.chem, rand, { copy: 0.06, decay: 0.002 });
          while (s.strands.length < s.chem.strands.length) {
            const p = s.strands[Math.floor(rand() * s.strands.length)];
            s.strands.push({ x: p.x + (rand() - 0.5) * 30, y: p.y + (rand() - 0.5) * 30, a: rand() * Math.PI });
          }
          while (s.strands.length > s.chem.strands.length) s.strands.splice(Math.floor(rand() * s.strands.length), 1);
          while (s.dots.length > s.chem.monomers) s.dots.splice(Math.floor(rand() * s.dots.length), 1);
          while (s.dots.length < s.chem.monomers) s.dots.push({ x: rand() * W, y: rand() * H, c: Math.floor(rand() * 4) });
        }
        if (s.t > 1400) Object.assign(s, init(W, H));
      },
      still(s, W, H) { for (let i = 0; i < 90; i++) step(s.chem, rand, { copy: 0.06 }); while (s.strands.length < s.chem.strands.length) s.strands.push({ x: rand() * W, y: rand() * H, a: rand() * 3 }); s.dots.length = s.chem.monomers; },
      draw(ctx, s, W, H) {
        ctx.fillStyle = C.water;
        ctx.fillRect(0, 0, W, H);
        for (const d of s.dots) {
          ctx.fillStyle = BEAD[d.c];
          ctx.globalAlpha = 0.45;
          ctx.beginPath(); ctx.arc(d.x, d.y, 2.6, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
        for (const q of s.strands) {
          const dx = Math.cos(q.a) * 7, dy = Math.sin(q.a) * 7;
          ctx.strokeStyle = C.slate; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(q.x - dx * 1.5, q.y - dy * 1.5); ctx.lineTo(q.x + dx * 1.5, q.y + dy * 1.5); ctx.stroke();
          for (let b = 0; b < LEN; b++) {
            ctx.fillStyle = BEAD[b];
            ctx.beginPath(); ctx.arc(q.x + dx * (b - 1.5), q.y + dy * (b - 1.5), 3.4, 0, Math.PI * 2); ctx.fill();
          }
        }
        ctx.fillStyle = "rgba(43, 46, 49, 0.85)";
        ctx.font = "14px serif";
        ctx.fillText(`strands: ${s.chem.strands.length}   free building blocks: ${s.chem.monomers}`, 12, 22);
      },
    });
  });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
