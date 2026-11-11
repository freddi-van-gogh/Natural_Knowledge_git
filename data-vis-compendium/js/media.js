// SPDX-License-Identifier: GPL-3.0-only
// Videos and pictures. A video is a plain card until the reader presses play: nothing loads
// from YouTube before that, and the privacy-enhanced (no-cookie) player is used when it does.
// Opened from a file (double-clicked), the page can't embed YouTube, so play opens the video
// on YouTube instead. Closing a side road stops its videos.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const esc = (s) => NKC.esc(s);

  NKC.embedUrl = function (id, start) {
    let url = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    if (start) url += `&start=${Math.floor(start)}`;
    return url;
  };

  const watchUrl = (v) => `https://www.youtube.com/watch?v=${encodeURIComponent(v.id)}${v.start ? `&t=${Math.floor(v.start)}s` : ""}`;

  function metaHtml(v) {
    return `<div class="video-meta"><span class="video-title">${esc(v.title)}</span>` +
      (v.channel ? `<span class="video-channel">${esc(v.channel)}</span>` : "") +
      `<a class="video-watch" href="${esc(watchUrl(v))}" target="_blank" rel="noopener">Watch on YouTube</a></div>`;
  }

  function cardInnerHtml(v) {
    return `<button class="play" type="button" data-video-id="${esc(v.id)}" aria-label="Play: ${esc(v.title)}">` +
      `<span class="play-icon" aria-hidden="true">▶</span></button>` + metaHtml(v);
  }

  NKC.videoCardHtml = function (video) {
    if (!video || video.id === null || video.id === undefined) {
      return `<div class="video-todo">Video to come: ${esc((video && video.find) || (video && video.title) || "")}</div>`;
    }
    return `<div class="video-card" data-video-id="${esc(video.id)}" data-title="${esc(video.title)}" data-channel="${esc(video.channel || "")}"` +
      `${video.start ? ` data-start="${Math.floor(video.start)}"` : ""}>${cardInnerHtml(video)}</div>`;
  };

  // The video a card stands for, read back from its data attributes (element.dataset).
  NKC.videoFromCard = function (d) {
    const v = { id: d.videoId, title: d.title, channel: d.channel };
    if (d.start) v.start = Number(d.start);
    return v;
  };

  // The player, with the title, channel and watch link kept underneath it.
  NKC.playingCardHtml = function (v) {
    return `<iframe class="video-frame" src="${esc(NKC.embedUrl(v.id, v.start))}" title="${esc(v.title)}"` +
      ` allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>` + metaHtml(v);
  };

  // YouTube's player refuses pages opened from a file, so there play opens YouTube itself.
  NKC.playMode = function (protocol) {
    return protocol === "file:" ? "open" : "embed";
  };

  NKC.mountVideo = function (el) {
    for (const btn of el.querySelectorAll("button.play[data-video-id]")) {
      if (btn.dataset.bound) continue;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        const card = btn.closest(".video-card");
        const v = NKC.videoFromCard(card.dataset);
        if (NKC.playMode(root.location.protocol) === "open") {
          root.open(watchUrl(v), "_blank", "noopener");
          return;
        }
        card.innerHTML = NKC.playingCardHtml(v);
        card.classList.add("playing");
        const frame = card.querySelector("iframe");
        if (frame) frame.focus();
      });
    }
  };

  // Put every playing video inside el back to its card (stopping it).
  NKC.stopVideos = function (el) {
    for (const card of el.querySelectorAll(".video-card.playing")) {
      card.classList.remove("playing");
      card.innerHTML = cardInnerHtml(NKC.videoFromCard(card.dataset));
    }
    NKC.mountVideo(el);
  };

  // The deed for a Creative Commons licence name, or null (public domain needs none).
  NKC.licenceUrl = function (licence) {
    const s = String(licence).trim();
    if (/^CC0/i.test(s)) return "https://creativecommons.org/publicdomain/zero/1.0/";
    const m = s.match(/^CC (BY(?:-SA)?) (\d\.\d)(?: ([a-z]{2}))?$/i);
    if (!m) return null;
    return `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/${m[3] ? `${m[3].toLowerCase()}/` : ""}`;
  };

  // A picture marked `link: true` opens itself full size when tapped (the covers strip, too small on a phone).
  NKC.pictureHtml = function (p) {
    const size = p.width && p.height ? ` width="${p.width}" height="${p.height}"` : "";
    const deed = NKC.licenceUrl(p.licence);
    const licence = deed ? `<a href="${esc(deed)}" target="_blank" rel="noopener">${esc(p.licence)}</a>` : esc(p.licence);
    const img = `<img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy"${size}>`;
    return `<figure class="picture">${p.link ? `<a href="${esc(p.src)}" target="_blank" rel="noopener">${img}</a>` : img}` +
      `<figcaption>${p.caption ? `${NKC.inline ? NKC.inline(p.caption) : esc(p.caption)} ` : ""}<span class="credit">${esc(p.creator)}, ${licence} ` +
      `(<a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener">source</a>)</span></figcaption></figure>`;
  };

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
