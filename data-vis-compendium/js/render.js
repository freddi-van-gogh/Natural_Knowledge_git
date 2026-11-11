// SPDX-License-Identifier: GPL-3.0-only
// Turns the entries into the spine: stops, the gap, the shift, and side roads that open in place.
// entryHtml() builds strings (testable in Node); renderSpine() wires them into the page.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const esc = (s) => NKC.esc(s);

  // Escape, then allow *italics* for titles of works.
  NKC.inline = function (text) {
    return esc(text || "").replace(/\*([^*]+)\*/g, "<i>$1</i>");
  };

  function labelHtml(key) {
    const l = NKC.LABELS[key];
    return l ? `<span class="label label-${esc(key)}" title="${esc(l.meaning)}">${esc(l.text)}</span>` : "";
  }

  // A heading's title in a span of its own: the CSS underlines it, and not the space beside the
  // stop's number or the label chip.
  const titleHtml = (title) => `<span class="title">${NKC.inline(title)}</span>`;

  function sourcesHtml(sources) {
    if (!sources || !sources.length) return "";
    const items = sources.map((s) => {
      const text = s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${NKC.inline(s.text)}</a>` : NKC.inline(s.text);
      return `<li>${text}${s.checked ? "" : ` <span class="dagger" title="Not yet checked against the source">†</span>`}</li>`;
    });
    return `<details class="sources"><summary>Sources</summary><ul>${items.join("")}</ul></details>`;
  }

  function linksHtml(links) {
    if (!links || !links.length) return "";
    const items = links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${NKC.inline(l.text)}</a>`);
    // A no-break space ties each "·" to the link before it, so a wrapped line never starts with one.
    return `<p class="links">${items.join("&nbsp;· ")}</p>`;
  }

  function visualHtml(v) {
    let inner;
    if (v.type === "video") inner = NKC.videoCardHtml(v.video);
    else if (v.type === "picture") inner = NKC.pictureHtml(v.picture);
    else if (v.type === "gallery") inner = `<div class="gallery">${v.pictures.map(NKC.pictureHtml).join("")}</div>`;
    else if (v.type === "todo") inner = `<div class="visual-todo">To come: ${esc(v.note)}</div>`;
    else inner = `<div class="anim-mount"></div>`;
    const key = v.type === "sim" || v.type === "anim" ? v.id : v.type;
    const caption = v.caption ? `<p class="caption">${NKC.inline(v.caption)}</p>` : "";
    const title = v.title ? `<h3 class="visual-title">${NKC.inline(v.title)}</h3>` : "";   // a heading above the visual, if it has one
    return `<div class="visual" data-visual="${esc(key)}" data-type="${esc(v.type)}">${title}${inner}${caption}</div>`;
  }

  function roadHtml(r) {
    const id = NKC.anchorFor("road", r.id);
    const visuals = (r.visuals || []).map(visualHtml).join("");
    return {
      pill: `<button class="road" type="button" aria-expanded="false" aria-controls="${esc(id)}"><span aria-hidden="true">↳</span> ${NKC.inline(r.title)}</button>`,
      panel: `<div class="road-panel" id="${esc(id)}" hidden><h3>${titleHtml(r.title)} ${labelHtml(r.label)}</h3>` +
        `<p>${NKC.inline(r.text)}</p>${visuals}${linksHtml(r.links)}${sourcesHtml(r.sources)}` +
        `<button class="road-close" type="button" aria-controls="${esc(id)}" aria-label="Close: ${esc(String(r.title).replace(/\*/g, ""))}">Close</button></div>`,
    };
  }

  NKC.entryHtml = function (e, style) {
    if (e.kind === "gap") return `<div class="gap" role="note" id="${esc(e.id)}"><p>${NKC.inline(e.text)}</p></div>`;
    if (e.kind === "shift") return `<div class="shift" role="note" id="${esc(e.id)}"><p>${NKC.inline(e.text)}</p></div>`;
    const roads = (e.sideRoads || []).map(roadHtml);
    return `<section class="stop line-${esc(style)}" id="${esc(NKC.anchorFor("stop", e.number))}" data-number="${esc(e.number)}">` +
      `<h2><span class="number">${esc(e.number)}</span> ${titleHtml(e.title)}</h2>` +
      `<p class="meta">${labelHtml(e.label)}${e.date ? ` <span class="date">${esc(e.date)}</span>` : ""}</p>` +
      (e.subtitle ? `<p class="subtitle">${NKC.inline(e.subtitle)}</p>` : "") +
      String(e.text || "").split("\n\n").map((t) => `<p class="text">${NKC.inline(t)}</p>`).join("") +   // a blank line starts a paragraph
      (e.visuals || []).map(visualHtml).join("") +
      linksHtml(e.links) +
      (e.coda ? `<p class="coda">${NKC.inline(e.coda)}</p>` : "") +
      (roads.length ? `<div class="roads">${roads.map((r) => r.pill).join("")}${roads.map((r) => r.panel).join("")}</div>` : "") +
      sourcesHtml(e.sources) +
      `</section>`;
  };

  // The header's demo: a real side road, so a reader meets the pattern before the first stop.
  NKC.demoHtml = function () {
    return `<div class="roads demo"><span class="demo-arrow" aria-hidden="true">→</span>` +
      `<button class="road" type="button" aria-expanded="false" aria-controls="road-demo"><span aria-hidden="true">↳</span> Try me: a side road</button>` +
      `<div class="road-panel" id="road-demo" hidden><h3>${titleHtml("A side road")}</h3>` +
      `<p>A detour off the main line. It opens in place, and when you close it you're where you left off. Press Close, or the button again, then keep scrolling.</p>` +
      `<button class="road-close" type="button" aria-controls="road-demo" aria-label="Close: a side road">Close</button></div></div>`;
  };

  // ------------------------------------------------------------------ in the page

  function findVisual(entries, el) {
    // The data for a mounted visual: look it up by its stop or road and its position.
    const host = el.closest(".road-panel") || el.closest(".stop");
    const all = Array.from(host.querySelectorAll(":scope > .visual"));
    const index = all.indexOf(el);
    for (const e of entries) {
      if (e.kind !== "stop") continue;
      if (host.classList.contains("stop") && host.id === NKC.anchorFor("stop", e.number)) return e.visuals[index];
      for (const r of e.sideRoads || []) {
        if (host.id === NKC.anchorFor("road", r.id)) return (r.visuals || [])[index];
      }
    }
    return null;
  }

  function mountVisuals(entries, container) {
    for (const el of container.querySelectorAll(":scope > .visual")) {
      if (el.dataset.mounted) continue;
      el.dataset.mounted = "1";
      NKC.mountVideo(el);
      const v = findVisual(entries, el);
      if (v && (v.type === "sim" || v.type === "anim")) {
        const c = NKC.mountVisual(v.id, el.querySelector(".anim-mount"), v.opts || {});
        if (c) watchVisibility(c, el);
      }
    }
  }

  let observer = null;
  const controllers = new Map();
  function watchVisibility(c, el) {
    if (typeof IntersectionObserver === "undefined") {
      NKC.setVisible(c, true);
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver((items) => {
        for (const it of items) NKC.setVisible(controllers.get(it.target), it.isIntersecting);
      }, { threshold: 0.05 });
    }
    controllers.set(el, c);
    observer.observe(el);
  }

  function openRoad(btn, entries) {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    if (open) mountVisuals(entries, panel);
    else NKC.stopVideos(panel);            // a hidden player would keep playing
    return panel;
  }

  // The id a location hash points to, or null when there is none or it is malformed (a stray %).
  NKC.hashTarget = function (hash) {
    try {
      return decodeURIComponent(String(hash || "").slice(1)) || null;
    } catch (err) {
      if (err instanceof URIError) return null;
      throw err;
    }
  };

  function followHash(entries) {
    const id = NKC.hashTarget(location.hash);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    if (target.classList.contains("road-panel") && target.hidden) {
      const btn = document.querySelector(`button.road[aria-controls="${CSS.escape(id)}"]`);
      if (btn) openRoad(btn, entries);
    }
    // Mount everything above the target first, so the page doesn't shift after the jump.
    const stop = target.closest(".stop");
    for (const s of document.querySelectorAll("#spine > .stop")) {
      mountVisuals(entries, s);
      if (s === stop) break;
    }
    target.scrollIntoView({ block: "start", behavior: "instant" });
  }

  NKC.wireRoads = function (rootEl, entries) {
    rootEl.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button.road");
      if (btn) openRoad(btn, entries);
      // The close button at a panel's end works as its pill does, and hands the focus back to it.
      const close = ev.target.closest("button.road-close");
      if (close) {
        const id = close.getAttribute("aria-controls");
        const pill = Array.from(rootEl.querySelectorAll("button.road")).find((b) => b.getAttribute("aria-controls") === id);
        if (pill) { openRoad(pill, entries); pill.focus(); }
      }
    });
  };

  NKC.renderSpine = function (entries, mount) {
    const styles = NKC.lineStyles(entries);
    mount.innerHTML = entries.map((e, i) => NKC.entryHtml(e, styles[i])).join("");
    NKC.wireRoads(document, entries);
    // Mount each stop's visuals when it comes within a screen of view.
    const stops = mount.querySelectorAll(".stop");
    if (typeof IntersectionObserver === "undefined") {
      stops.forEach((s) => mountVisuals(entries, s));
    } else {
      const near = new IntersectionObserver((items) => {
        for (const it of items) {
          if (it.isIntersecting) {
            mountVisuals(entries, it.target);
            near.unobserve(it.target);
          }
        }
      }, { rootMargin: "100% 0px" });
      stops.forEach((s) => near.observe(s));
    }
    followHash(entries);
    root.addEventListener("hashchange", () => followHash(entries));
  };

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
