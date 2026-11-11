// SPDX-License-Identifier: GPL-3.0-only
// Stop 6.6: the famous march from fish to human, redrawn by us, and then rearranged into what
// it really was: a branching bush. Two of the five are long extinct side branches, not steps,
// and apes and humans share ancestors; neither came from the other.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const MARCH = ["fish", "lobefin", "tetrapod", "ape", "human"];

  // Silhouettes, each drawn in a 100 × 100 box standing on y = 100. Ours, not traced.
  const FIGURES = {
    fish: '<ellipse cx="52" cy="72" rx="30" ry="12"/><path d="M24 72 L6 58 L10 72 L6 86 Z"/><path d="M44 61 L56 50 L62 62 Z"/><path d="M50 82 L58 92 L62 81 Z"/><circle cx="72" cy="69" r="2.4" fill="#F7F2E4"/>',
    lobefin: '<path d="M10 86 Q30 76 58 78 Q78 78 92 86 Q78 92 58 92 Q30 92 10 86 Z"/><path d="M10 86 L2 80 L4 92 Z"/><ellipse cx="62" cy="95" rx="7" ry="3.5" transform="rotate(-20 62 95)"/><ellipse cx="38" cy="95" rx="6" ry="3" transform="rotate(20 38 95)"/><circle cx="84" cy="83" r="2" fill="#F7F2E4"/>',
    tetrapod: '<path d="M8 84 Q30 80 50 79 Q74 78 92 84 Q74 90 50 89 Q30 88 8 84 Z"/><rect x="66" y="86" width="4" height="13" rx="2"/><rect x="58" y="86" width="4" height="13" rx="2" transform="rotate(14 60 86)"/><rect x="34" y="86" width="4" height="13" rx="2"/><rect x="26" y="86" width="4" height="13" rx="2" transform="rotate(-14 28 86)"/><ellipse cx="90" cy="83" rx="8" ry="5"/><circle cx="92" cy="81" r="1.6" fill="#F7F2E4"/>',
    ape: '<ellipse cx="50" cy="58" rx="20" ry="15" transform="rotate(-24 50 58)"/><circle cx="73" cy="44" r="10"/><path d="M66 60 L76 99 L82 99 L72 58 Z"/><path d="M58 64 L64 99 L70 99 L64 62 Z"/><path d="M36 64 L30 99 L37 99 L44 66 Z"/><path d="M42 66 L44 99 L51 99 L50 66 Z"/>',
    human: '<circle cx="50" cy="12" r="8"/><path d="M41 22 L59 22 L61 56 L39 56 Z"/><path d="M41 54 L37 99 L45 99 L50 62 Z"/><path d="M59 54 L63 99 L55 99 L50 62 Z"/><path d="M41 24 L33 54 L38 55 L45 28 Z"/><path d="M59 24 L67 54 L62 55 L55 28 Z"/>',
  };
  NKC.march = { MARCH };

  // The bush: tips at the time each line ends (top = today). Fish, apes, and humans are alive
  // today; the lobe-finned fish and the early four-legged animal are long-extinct side branches.
  NKC.march.bushLayout = function () {
    return [
      { id: "root", x: 0.16, y: 0.96, parent: null, figure: null },
      { id: "n-lobe", x: 0.3, y: 0.82, parent: "root", figure: null },
      { id: "n-tetra", x: 0.44, y: 0.7, parent: "n-lobe", figure: null },
      { id: "n-primate", x: 0.8, y: 0.42, parent: "n-tetra", figure: null },
      { id: "fish", x: 0.08, y: 0.2, parent: "root", figure: "fish" },
      { id: "lobefin", x: 0.27, y: 0.58, parent: "n-lobe", figure: "lobefin" },
      { id: "tetrapod", x: 0.47, y: 0.47, parent: "n-tetra", figure: "tetrapod" },
      { id: "ape", x: 0.7, y: 0.2, parent: "n-primate", figure: "ape" },
      { id: "human", x: 0.9, y: 0.2, parent: "n-primate", figure: "human" },
    ];
  };

  const VW = 1000, VH = 380, GROUND = 330;
  NKC.march.svgHtml = function () {
    const nodes = NKC.march.bushLayout();
    const at = (id) => nodes.find((n) => n.id === id);
    const lines = nodes.filter((n) => n.parent).map((n) => {
      const p = at(n.parent);
      return `<path d="M${p.x * VW} ${p.y * VH} L${p.x * VW} ${n.y * VH + 30} L${n.x * VW} ${n.y * VH + 30}"/>`;
    }).join("");
    const figs = MARCH.map((f) => `<g class="fig" data-figure="${f}">${FIGURES[f]}</g>`).join("");
    return `<svg class="march-svg" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="Five figures, fish to human">` +
      `<line class="ground" x1="0" y1="${GROUND}" x2="${VW}" y2="${GROUND}"/>` +
      `<g class="bush-lines">${lines}</g>` +
      `<text class="bush-today" x="${VW - 10}" y="40" text-anchor="end">today</text>` +
      `<text class="bush-past" x="${VW - 10}" y="${VH - 12}" text-anchor="end">long ago</text>` +
      `${figs}</svg>`;
  };
  NKC.march.buttonHtml = function (bush) {
    return bush ? "Show the march again" : "Show it as it really was";
  };

  function place(svg, bush) {
    const nodes = NKC.march.bushLayout();
    MARCH.forEach((f, i) => {
      const g = svg.querySelector(`[data-figure="${f}"]`);
      let x, y, s;
      if (bush) {
        const n = nodes.find((m) => m.figure === f);
        s = 0.9; x = n.x * VW - 50 * s; y = n.y * VH + 30 - 100 * s;
      } else {
        s = 1.6; x = (i + 0.5) * (VW / 5) - 50 * s; y = GROUND - 100 * s;
      }
      g.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    });
    svg.classList.toggle("is-bush", bush);
  }

  NKC.registerVisual("march", (el) => {
    el.innerHTML = NKC.march.svgHtml() +
      `<button type="button" class="march-toggle">${NKC.march.buttonHtml(false)}</button>` +
      `<p class="march-note" hidden>A branching bush, not a ladder: apes and humans share ancestors.</p>`;
    const svg = el.querySelector("svg"), btn = el.querySelector("button"), note = el.querySelector(".march-note");
    let bush = false;
    place(svg, false);
    btn.addEventListener("click", () => {
      bush = !bush;
      place(svg, bush);
      btn.textContent = NKC.march.buttonHtml(bush);
      note.hidden = !bush;
    });
    return {
      start() { svg.classList.add("walking"); },
      stop() { svg.classList.remove("walking"); },
      drawStill() {},
    };
  }, { static: true });

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
