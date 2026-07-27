/* 首屏星空：鼠标悬停点亮周围的星星，连成星座 */
(function () {
  "use strict";

  var canvas = document.getElementById("starCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var hero = canvas.parentElement;

  var W = 0, H = 0, DPR = 1, stars = [];
  var pointer = { x: -9999, y: -9999, active: false };
  var HOVER_R = 175;   // 点亮半径

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed();
  }

  function seed() {
    stars = [];
    var count = Math.floor((W * H) / 6200);
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.92,
        r: Math.random() * 1.2 + 0.5,
        baseA: Math.random() * 0.35 + 0.18,
        tw: Math.random() * 6.28,
        twS: 0.008 + Math.random() * 0.02,
        gold: Math.random() < 0.14
      });
    }
  }

  function onMove(x, y) {
    var rect = canvas.getBoundingClientRect();
    pointer.x = x - rect.left;
    pointer.y = y - rect.top;
    pointer.active = true;
  }

  hero.addEventListener("mousemove", function (e) { onMove(e.clientX, e.clientY); });
  hero.addEventListener("touchmove", function (e) {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  hero.addEventListener("mouseleave", function () { pointer.active = false; });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.tw += s.twS;
      var a = s.baseA + Math.sin(s.tw) * 0.14;

      var e = 0;
      if (pointer.active) {
        var dx = s.x - pointer.x, dy = s.y - pointer.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < HOVER_R) e = Math.pow(1 - dist / HOVER_R, 1.6);
      }
      if (e > 0) a = Math.min(1, a + e * 0.85);

      // 点亮时星星明显变大
      var r = s.r * (1 + e * 1.6);

      var cr = 226, cg = 230, cb = 222;
      if (s.gold || e > 0.25) {
        var k = Math.min(1, 0.45 + e * 0.55);   // 越亮越金
        cr = 232 + 8 * k; cg = 226 - 12 * k; cb = 218 - 58 * k;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, 6.283);
      ctx.fillStyle = "rgba(" + (cr | 0) + "," + (cg | 0) + "," + (cb | 0) + "," + a.toFixed(3) + ")";
      ctx.fill();

      if (e > 0.12) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 3.2, 0, 6.283);
        ctx.fillStyle = "rgba(240,224,170," + (e * 0.14).toFixed(3) + ")";
        ctx.fill();
      }
      s._e = e;
    }

    // 星座连线（被点亮的星星之间）
    ctx.lineWidth = 0.6;
    for (var m = 0; m < stars.length; m++) {
      var s1 = stars[m];
      if (!s1._e || s1._e < 0.4) continue;
      for (var n = m + 1; n < stars.length; n++) {
        var s2 = stars[n];
        if (!s2._e || s2._e < 0.4) continue;
        var ddx = s1.x - s2.x, ddy = s1.y - s2.y;
        if (ddx * ddx + ddy * ddy < 110 * 110) {
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.strokeStyle = "rgba(222,196,138," + (Math.min(s1._e, s2._e) * 0.3).toFixed(3) + ")";
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
