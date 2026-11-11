// SPDX-License-Identifier: GPL-3.0-only
// Core rules shared by every part of the compendium: labels, the spine's line styles,
// anchors, a seeded random number generator, and the checks every entry must pass.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});

  // How sure the page is about a claim. The first three are the high school edition's words.
  NKC.LABELS = {
    settled: { text: "settled", meaning: "established science" },
    argued: { text: "still argued about", meaning: "contested" },
    own: { text: "the author's own", meaning: "the author's view or framing" },
    analogy: { text: "analogy", meaning: "a likeness, not a mechanism" },
    oversimplified: { text: "oversimplified", meaning: "deliberately simplified, and says how" },
    measured: { text: "measured", meaning: "a number from observation" },
    illustration: { text: "illustration", meaning: "a picture of an idea, not a measurement" },
    account: { text: "in their own words", meaning: "a community's own account, told by them, not judged here" },
  };

  // mulberry32: small, fast, and the same sequence for the same seed.
  NKC.rng = function (seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  // Escape text for HTML (content and attributes alike).
  NKC.esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  NKC.anchorFor = function (kind, key) {
    return `${kind}-${String(key).replace(/\./g, "-")}`;
  };

  // The spine is firm from the top, dashed across the gap, firm again, and descriptive
  // from the shift marker on (book 1 ch. 16: description rather than mechanism above language).
  NKC.lineStyles = function (entries) {
    let style = "firm";
    return entries.map((e) => {
      if (e.kind === "gap") return "gap";
      if (e.kind === "shift") style = "descriptive";
      return style;
    });
  };

  const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
  const OPEN_LICENCE = /^(public domain|CC0( 1\.0)?|CC BY( \d\.\d( [a-z]{2})?)?|CC BY-SA( \d\.\d( [a-z]{2})?)?)$/i;   // ' FR' etc.: national ports
  const VISUAL_TYPES = new Set(["sim", "anim", "video", "picture", "gallery", "todo"]);

  function checkSources(owner, sources, errors) {
    if (!Array.isArray(sources)) {
      errors.push(`${owner}: sources must be a list`);
      return;
    }
    sources.forEach((s, i) => {
      if (!s || typeof s.text !== "string" || !s.text) errors.push(`${owner}: source ${i + 1} has no text`);
      if (!s || typeof s.checked !== "boolean") errors.push(`${owner}: source ${i + 1} needs checked: true or false`);
    });
  }

  function checkPicture(owner, p, errors) {
    for (const k of ["src", "alt", "creator", "licence", "sourceUrl"]) {
      if (!p || typeof p[k] !== "string" || !p[k]) errors.push(`${owner}: picture needs ${k}`);
    }
    if (p && typeof p.licence === "string" && !OPEN_LICENCE.test(p.licence)) {
      errors.push(`${owner}: picture licence "${p.licence}" is not public domain, CC0, CC BY or CC BY-SA`);
    }
  }

  function checkVisuals(owner, visuals, errors) {
    if (!Array.isArray(visuals) || visuals.length === 0) {
      errors.push(`${owner}: needs at least one visual`);
      return;
    }
    for (const v of visuals) {
      if (!v || !VISUAL_TYPES.has(v.type)) {
        errors.push(`${owner}: unknown visual type ${v && v.type}`);
        continue;
      }
      if ((v.type === "sim" || v.type === "anim") && !v.id) errors.push(`${owner}: ${v.type} needs an id`);
      if (v.title !== undefined && (typeof v.title !== "string" || !v.title.trim())) errors.push(`${owner}: a visual's title must be a non-empty string`);
      if (v.type === "video") {
        const vid = v.video || {};
        if (vid.id !== null && !VIDEO_ID.test(String(vid.id))) errors.push(`${owner}: video id "${vid.id}" is malformed`);
        if (vid.id === null && !vid.find) errors.push(`${owner}: a video still to find needs a find note`);
        if (!vid.title) errors.push(`${owner}: video needs a title`);
      }
      if (v.type === "picture") checkPicture(owner, v.picture, errors);
      if (v.type === "gallery") {
        if (!Array.isArray(v.pictures) || !v.pictures.length) errors.push(`${owner}: gallery needs pictures`);
        else v.pictures.forEach((p) => checkPicture(owner, p, errors));
      }
    }
  }

  const allTodo = (visuals) => Array.isArray(visuals) && visuals.length > 0 && visuals.every((v) => v.type === "todo");

  // Optional links under a stop or a side road: each with text and an https url.
  function checkLinks(owner, links, errors) {
    if (links === undefined) return;
    if (!Array.isArray(links)) errors.push(`${owner}: links must be a list`);
    else links.forEach((l, i) => {
      if (!l || typeof l.text !== "string" || !l.text || typeof l.url !== "string" || !l.url.startsWith("https://")) {
        errors.push(`${owner}: link ${i + 1} needs text and an https url`);
      }
    });
  }

  NKC.validateEntries = function (entries, opts) {
    const strict = !!(opts && opts.strict);
    const errors = [];
    const seen = new Set();
    const claim = (id, owner) => {
      if (!id) errors.push(`${owner}: needs an id`);
      else if (seen.has(id)) errors.push(`duplicate id ${id}`);
      else seen.add(id);
    };
    for (const e of entries) {
      if (e.kind === "gap" || e.kind === "shift") {
        claim(e.id, e.kind);
        if (!e.text) errors.push(`${e.id}: needs text`);
        continue;
      }
      if (e.kind !== "stop") {
        errors.push(`${e.id}: unknown kind ${e.kind}`);
        continue;
      }
      const owner = e.id || `stop ${e.number}`;
      claim(e.id, owner);
      for (const k of ["number", "title"]) if (!e[k]) errors.push(`${owner}: needs ${k}`);
      if (!NKC.LABELS[e.label]) errors.push(`${owner}: unknown label "${e.label}"`);
      checkVisuals(owner, e.visuals, errors);
      const placeholder = !strict && allTodo(e.visuals);
      if (!placeholder && !e.text) errors.push(`${owner}: needs text`);
      if (!Array.isArray(e.sources)) errors.push(`${owner}: needs sources`);
      else checkSources(owner, e.sources, errors);
      checkLinks(owner, e.links, errors);
      if (e.coda !== undefined && (typeof e.coda !== "string" || !e.coda.trim())) errors.push(`${owner}: coda must be a non-empty string`);
      if (e.subtitle !== undefined && (typeof e.subtitle !== "string" || !e.subtitle.trim())) errors.push(`${owner}: subtitle must be a non-empty string`);
      if (!Array.isArray(e.sideRoads)) errors.push(`${owner}: sideRoads must be a list`);
      for (const r of e.sideRoads || []) {
        const rOwner = r.id || `a side road of ${owner}`;
        claim(r.id, rOwner);
        if (!r.title) errors.push(`${rOwner}: needs a title`);
        if (!NKC.LABELS[r.label]) errors.push(`${rOwner}: unknown label "${r.label}"`);
        const rPlaceholder = !strict && allTodo(r.visuals);
        if (!rPlaceholder && !r.text) errors.push(`${rOwner}: needs text`);
        if (r.visuals !== undefined) checkVisuals(rOwner, r.visuals, errors);
        checkLinks(rOwner, r.links, errors);
        checkSources(rOwner, r.sources, errors);
      }
    }
    return errors;
  };

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
