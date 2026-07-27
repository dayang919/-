/* 作品网格：两级筛选（摄影/AI 视频 → 人像/人文/风景/静物）、系列分组、灯箱翻页 */
(function () {
  "use strict";

  var grid = document.getElementById("galleryGrid");
  if (!grid || !window.WORKS) return;

  var PLAY_SVG = '<svg viewBox="0 0 10 12"><path d="M0 0 L10 6 L0 12 Z"/></svg>';
  var visible = [];   // 当前可见作品（灯箱翻页用）
  var groups = [];    // 当前分组锚点（左侧目录用）
  var tocEl = document.getElementById("tocNav");
  var tocIO = null;

  /* ---------- 工具 ---------- */
  function itemsOf(filter) {
    return window.WORKS.filter(function (w) {
      if (filter === "all") return true;
      if (filter === "video") return w.type === "video";
      if (filter === "photo") return w.type === "photo";
      return w.cat === filter;      // portrait / humanity / landscape / stilllife
    });
  }

  function catName(key) {
    var c = window.CATS.find(function (x) { return x.key === key; });
    return c ? c.name : key;
  }

  function makeCard(w, i) {
    var card = document.createElement("figure");
    card.className = "work-card";
    card.setAttribute("data-cat", w.cat);

    var media = document.createElement("img");
    media.src = w.src;
    media.alt = w.title;
    media.loading = "lazy";
    media.decoding = "async";
    card.appendChild(media);

    if (w.type === "video") {
      var badge = document.createElement("span");
      badge.className = "badge-video";
      badge.innerHTML = PLAY_SVG + "AI 视频";
      card.appendChild(badge);
    }

    var veil = document.createElement("div");
    veil.className = "card-veil";
    var info = document.createElement("figcaption");
    info.className = "card-info";
    info.innerHTML = "<h3>" + w.title + "</h3><p>" + w.desc + "</p>";
    card.appendChild(veil);
    card.appendChild(info);

    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    setTimeout(function () {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 40 + Math.min(i, 9) * 50);

    card.addEventListener("click", function () {
      openAt(visible.indexOf(w));
    });
    return card;
  }

  function makeHeader(text, sub) {
    var h = document.createElement("div");
    h.className = "series-header" + (sub ? " sub" : "");
    h.innerHTML = "<span>" + text + "</span>";
    h.id = "group-" + groups.length;
    groups.push({ id: h.id, text: text, sub: !!sub });
    return h;
  }

  /* ---------- 左侧目录 ---------- */
  function buildToc() {
    if (!tocEl) return;
    if (tocIO) { tocIO.disconnect(); tocIO = null; }
    tocEl.innerHTML = "";
    if (!groups.length) { tocEl.classList.remove("show"); return; }

    var title = document.createElement("p");
    title.className = "toc-title";
    title.textContent = "目 录";
    tocEl.appendChild(title);

    groups.forEach(function (g, i) {
      var a = document.createElement("a");
      a.href = "#" + g.id;
      a.className = "toc-link" + (g.sub ? " sub" : "");
      a.textContent = g.text.replace(/[「」]/g, "");
      a.setAttribute("data-target", g.id);
      if (i === 0) a.classList.add("active");
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var el = document.getElementById(g.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      tocEl.appendChild(a);
    });

    tocEl.classList.add("show");

    // 滚动高亮当前组
    tocIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocEl.querySelectorAll(".toc-link").forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("data-target") === en.target.id);
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    groups.forEach(function (g) {
      var el = document.getElementById(g.id);
      if (el) tocIO.observe(el);
    });
  }

  /* ---------- 渲染 ---------- */
  function renderFlat(items) {
    items.forEach(function (w, i) { grid.appendChild(makeCard(w, i)); });
  }

  function render(filter, sub) {
    grid.innerHTML = "";
    groups = [];
    visible = itemsOf(filter === "photo" && sub && sub !== "all" ? sub : filter);

    if (filter === "photo" && (!sub || sub === "all")) {
      // 摄影全部：按分类分组，人像再按系列细分
      var n = 0;
      window.CATS.forEach(function (c) {
        var inCat = visible.filter(function (w) { return w.cat === c.key; });
        if (!inCat.length) return;
        grid.appendChild(makeHeader(c.name));
        if (c.key === "portrait") {
          window.SERIES_ORDER.forEach(function (s) {
            var inSeries = inCat.filter(function (w) { return w.series === s; });
            if (!inSeries.length) return;
            grid.appendChild(makeHeader("「" + s + "」", true));
            inSeries.forEach(function (w) { grid.appendChild(makeCard(w, n++)); });
          });
        } else {
          inCat.forEach(function (w) { grid.appendChild(makeCard(w, n++)); });
        }
      });
    } else if (sub === "portrait") {
      // 只看人像：按系列分三组
      var m = 0;
      window.SERIES_ORDER.forEach(function (s) {
        var inSeries = visible.filter(function (w) { return w.series === s; });
        if (!inSeries.length) return;
        grid.appendChild(makeHeader("「" + s + "」"));
        inSeries.forEach(function (w) { grid.appendChild(makeCard(w, m++)); });
      });
    } else {
      renderFlat(visible);
    }
    buildToc();
  }

  /* ---------- 一级筛选 ---------- */
  var bar = document.getElementById("filterBar");
  var subBar = document.getElementById("subFilterBar");
  var state = { main: "all", sub: "all" };

  if (bar) {
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.main = btn.getAttribute("data-filter");
      state.sub = "all";
      if (subBar) {
        subBar.classList.toggle("show", state.main === "photo");
        subBar.querySelectorAll(".filter-btn").forEach(function (b, i) {
          b.classList.toggle("active", i === 0);
        });
      }
      render(state.main, state.sub);
    });
  }

  /* ---------- 二级筛选（摄影子类） ---------- */
  if (subBar) {
    subBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      subBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.sub = btn.getAttribute("data-filter");
      render("photo", state.sub);
    });
  }

  /* ---------- 灯箱（带左右翻页） ---------- */
  var lb, lbMedia, lbCap, cur = -1;

  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML =
      '<button class="lightbox-close" aria-label="关闭">×</button>' +
      '<button class="lightbox-nav prev" aria-label="上一张">‹</button>' +
      '<div class="lightbox-box"></div>' +
      '<button class="lightbox-nav next" aria-label="下一张">›</button>';
    document.body.appendChild(lb);
    lb.querySelector(".lightbox-close").addEventListener("click", close);
    lb.querySelector(".prev").addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
    lb.querySelector(".next").addEventListener("click", function (e) { e.stopPropagation(); step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (cur < 0) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  function show() {
    var w = visible[cur];
    if (!w) return;
    var box = lb.querySelector(".lightbox-box");
    box.innerHTML = "";
    var el;
    if (w.type === "video") {
      el = document.createElement("video");
      el.src = w.video;
      el.controls = true;
      el.autoplay = true;
      el.loop = true;
      el.muted = true;
      el.playsInline = true;
    } else {
      el = document.createElement("img");
      el.src = w.src;
      el.alt = w.title;
    }
    box.appendChild(el);
    var cap = document.createElement("p");
    cap.className = "lightbox-caption";
    cap.textContent = (w.series ? "「" + w.series + "」 " : "") + w.title + " — " + w.desc;
    box.appendChild(cap);
  }

  function openAt(i) {
    if (!lb) buildLightbox();
    cur = i;
    show();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function step(d) {
    if (!visible.length) return;
    var old = lb.querySelector("video");
    if (old) old.pause();
    cur = (cur + d + visible.length) % visible.length;
    show();
  }

  function close() {
    var v = lb.querySelector("video");
    if (v) v.pause();
    lb.classList.remove("open");
    document.body.style.overflow = "";
    cur = -1;
  }

  render("all", "all");
})();
