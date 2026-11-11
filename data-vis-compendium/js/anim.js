// SPDX-License-Identifier: GPL-3.0-only
// The animation lifecycle. Every animation registers a factory under an id. The page mounts it
// when its stop comes near, runs it only while it's on screen, and, if the reader has asked for
// reduced motion, shows a still frame with a play button instead of starting by itself.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const registry = new Map();

  // opts.static: the visual doesn't move by itself (it only changes when the reader acts), so
  // reduced motion needs no still frame and no play button for it.
  NKC.registerVisual = function (id, factory, opts) {
    registry.set(id, { factory, static: !!(opts && opts.static) });
  };

  NKC.isStatic = function (id) {
    const r = registry.get(id);
    return !!(r && r.static);
  };

  NKC.shouldAutoplay = function (prefersReducedMotion) {
    return !prefersReducedMotion;
  };

  function prefersReduced() {
    return typeof root.matchMedia === "function" && root.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  NKC.mountVisual = function (id, el, opts) {
    const entry = registry.get(id);
    if (!entry) return null;
    const o = opts || {};
    const reduced = o.reducedMotion !== undefined ? o.reducedMotion : prefersReduced();
    const impl = entry.factory(el, o);
    const c = { id, impl, el, running: false, visible: false, paused: false, allowed: entry.static || NKC.shouldAutoplay(reduced) };
    if (!c.allowed && impl.drawStill) impl.drawStill();
    // Every moving animation gets a pause/play toggle (WCAG 2.2.2); static ones need none.
    if (!entry.static && typeof document !== "undefined" && el && el.appendChild) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "anim-toggle";
      btn.addEventListener("click", () => { if (c.running) NKC.pause(c); else NKC.play(c); });
      el.appendChild(btn);
      c.button = btn;
    }
    refresh(c);
    return c;
  };

  function refresh(c) {
    if (!c.button) return;
    const on = c.running || (c.allowed && !c.paused);
    c.button.textContent = on ? "❚❚ Pause" : "▶ Play";
    c.button.setAttribute("aria-label", on ? "Pause the animation" : "Play the animation");
  }

  NKC.setVisible = function (c, visible) {
    if (!c) return;
    c.visible = visible;
    if (visible && c.allowed && !c.paused && !c.running) {
      c.impl.start();
      c.running = true;
    } else if (!visible && c.running) {
      c.impl.stop();
      c.running = false;
    }
    refresh(c);
  };

  // The reader pressed play: allow it (reduced motion), unpause it, and start it.
  NKC.play = function (c) {
    c.allowed = true;
    c.paused = false;
    if (!c.running) {
      c.impl.start();
      c.running = true;
    }
    refresh(c);
  };

  // The reader pressed pause: stop it, and keep it stopped until they press play.
  NKC.pause = function (c) {
    c.paused = true;
    if (c.running) {
      c.impl.stop();
      c.running = false;
    }
    refresh(c);
  };

  // A canvas animation: spec = { label, init(W, H), tick(state, W, H), draw(ctx, state, W, H),
  // still?(state, W, H) }. Handles size, device pixel ratio, resizing and the frame loop, and
  // returns what registerVisual factories return.
  NKC.canvasAnim = function (el, height, spec) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", spec.label || "");
    el.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const H = height;
    let W = 600, state = null, frame = 0, still = false;   // still: the still frame is showing
    function size() {
      const dpr = root.devicePixelRatio || 1;
      W = Math.max(240, canvas.clientWidth || el.clientWidth || 600);
      canvas.style.height = `${H}px`;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    state = spec.init(W, H);
    spec.draw(ctx, state, W, H);
    if (typeof ResizeObserver !== "undefined") {
      let lastW = W;
      new ResizeObserver(() => {
        size();
        if (Math.abs(W - lastW) > 1) {
          state = spec.init(W, H);
          lastW = W;
          if (still && spec.still) spec.still(state, W, H);   // not running: redraw the still frame at the new size
        }
        spec.draw(ctx, state, W, H);
      }).observe(canvas);
    }
    function loop() {
      spec.tick(state, W, H);
      spec.draw(ctx, state, W, H);
      frame = root.requestAnimationFrame(loop);
    }
    return {
      start() { still = false; if (!frame) frame = root.requestAnimationFrame(loop); },
      stop() { root.cancelAnimationFrame(frame); frame = 0; },
      drawStill() { still = true; if (spec.still) spec.still(state, W, H); spec.draw(ctx, state, W, H); },
    };
  };

  // Colours shared by the animations: the series' palette.
  NKC.COLOURS = { verdigris: "#3A786A", copper: "#C98446", ochre: "#B8552F", slate: "#2B2E31",
    chalk: "#ECE6D8", water: "#E4EEEC", paper: "#F7F2E4", blueBlack: "#1F2B4A" };

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
