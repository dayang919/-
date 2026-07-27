/* 作品网格：渲染、筛选（全部/摄影/AI 视频）、灯箱 */
(function () {
  "use strict";

  var grid = document.getElementById("galleryGrid");
  if (!grid || !window.WORKS) return;

  var PLAY_SVG = '<svg viewBox="0 0 10 12"><path d="M0 0 L10 6 L0 12 Z"/></svg>';

  function render(filter) {
    grid.innerHTML = "";
    var items = window.WORKS.filter(function (w) {
      if (filter === "all") return true;
      return w.type === filter;
    });

    items.forEach(function (w, i) {
      var card = document.createElement("figure");
      card.className = "work-card";
      card.setAttribute("data-type", w.type);

      var media;
      if (w.type === "video") {
        // 用海报帧展示，点击进入灯箱播放（省流量 + 懒加载）
        media = document.createElement("img");
        media.src = w.src;
        media.alt = w.title;
        media.loading = "lazy";
        media.decoding = "async";
        var badge = document.createElement("span");
        badge.className = "badge-video";
        badge.innerHTML = PLAY_SVG + "AI 视频";
        card.appendChild(badge);
      } else {
        media = document.createElement("img");
        media.src = w.src;
        media.alt = w.title;
        media.loading = "lazy";       // 原生懒加载
        media.decoding = "async";
      }

      var veil = document.createElement("div");
      veil.className = "card-veil";

      var info = document.createElement("figcaption");
      info.className = "card-info";
      info.innerHTML = "<h3>" + w.title + "</h3><p>" + w.desc + "</p>";

      card.appendChild(media);
      card.appendChild(veil);
      card.appendChild(info);

      // 入场淡入（错落）
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      setTimeout(function () {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 40 + Math.min(i, 9) * 60);

      card.addEventListener("click", function () {
        if (window.openLightbox) window.openLightbox(w);
      });

      grid.appendChild(card);
    });
  }

  /* ---------- 筛选按钮 ---------- */
  var bar = document.getElementById("filterBar");
  if (bar) {
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      render(btn.getAttribute("data-filter"));
    });
  }

  render("all");
})();
