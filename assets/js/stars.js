/* 首屏星空：鼠标悬停点亮星星 + 女孩手电筒光束跟随鼠标 */
(function () {
  "use strict";

  var canvas = document.getElementById("starCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var hero = canvas.parentElement;

  var W = 0, H = 0, DPR = 1, stars = [], t = 0;
  var pointer = { x: -9999, y: -9999, active: false };
  var beamAngle = -Math.PI / 2.6;   // 初始指向夜空
  var idleT = 0;

  /* 女孩剪影（含锚点：手电筒尖端在图片内的坐标） */
  var GIRL_ANCHOR = { x: 543, y: 264 };
  var girl = { img: new Image(), ready: false, x: 0, y: 0, w: 0, h: 0, ax: 0, ay: 0 };
  girl.img.src = "assets/img/girl-field.png";
  girl.img.onload = function () { girl.ready = true; layoutGirl(); };

  var HOVER_R = 175;        // 点亮半径（比上版更大）
  var BEAM_HALF = 0.145;    // 光束半角（弧度）
  var BEAM_LEN_RATIO = 0.85;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed();
    layoutGirl();
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

  function layoutGirl() {
    if (!girl.ready || !H) return;
    var scale = (H * 0.44) / 900;                   // 女孩身高约占首屏 44%
    var h = 900 * scale;
    var w = 700 * scale;
    girl.w = w;
    girl.h = h;
    girl.x = W * 0.5 - w * 0.52;                    // 略偏左站立
    girl.y = H - h + H * 0.02;                      // 脚踩首屏底部
    girl.ax = girl.x + GIRL_ANCHOR.x * scale;       // 手电尖端（画布坐标）
    girl.ay = girl.y + GIRL_ANCHOR.y * scale;
  }

  function onMove(x, y) {
    var rect = canvas.getBoundingClientRect();
    pointer.x = x - rect.left;
    pointer.y = y - rect.top;
    pointer.active = true;
    idleT = 0;
  }

  hero.addEventListener("mousemove", function (e) { onMove(e.clientX, e.clientY); });
  hero.addEventListener("touchmove", function (e) {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  hero.addEventListener("mouseleave", function () { pointer.active = false; });

  /* 手电筒光束：从锚点朝指针方向 */
  function drawBeam(angle) {
    var len = Math.sqrt(W * W + H * H) * BEAM_LEN_RATIO;
    ctx.save();
    ctx.translate(girl.ax, girl.ay);
    ctx.rotate(angle);

    var spread = Math.tan(BEAM_HALF) * len;
    var grad = ctx.createLinearGradient(0, 0, len, 0);
    grad.addColorStop(0, "rgba(240, 220, 160, 0.16)");
    grad.addColorStop(0.4, "rgba(232, 210, 150, 0.07)");
    grad.addColorStop(1, "rgba(232, 210, 150, 0)");

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len, -spread);
    ctx.lineTo(len, spread);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // 手电口的一粒暖光
    var tip = ctx.createRadialGradient(0, 0, 0, 0, 0, 26);
    tip.addColorStop(0, "rgba(245, 225, 170, 0.8)");
    tip.addColorStop(1, "rgba(245, 225, 170, 0)");
    ctx.fillStyle = tip;
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, 6.283);
    ctx.fill();

    ctx.restore();
  }

  /* 星星在光束内的增益：角差越小越亮 */
  function beamBoost(s, angle) {
    var a = Math.atan2(s.y - girl.ay, s.x - girl.ax);
    var d = Math.abs(((a - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    if (d > BEAM_HALF) return 0;
    return Math.pow(1 - d / BEAM_HALF, 1.5);
  }

  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    // 目标光束角：跟随鼠标；无操作时缓慢摇曳
    var target;
    if (pointer.active) {
      target = Math.atan2(pointer.y - girl.ay, pointer.x - girl.ax);
      // 手电只朝夜空：鼠标低于手时，光束贴到两侧上沿
      if (target > 0) target = target > Math.PI / 2 ? -Math.PI + 0.25 : -0.2;
      target = Math.max(-Math.PI + 0.25, Math.min(-0.2, target));
    } else {
      idleT += 0.008;
      target = -Math.PI / 2.3 + Math.sin(idleT) * 0.35;
    }
    // 平滑转向（最短弧）
    var diff = ((target - beamAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    beamAngle += diff * 0.06;

    // 1) 光束铺在星星下面
    if (girl.ready) drawBeam(beamAngle);

    // 2) 星星
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.tw += s.twS;
      var a = s.baseA + Math.sin(s.tw) * 0.14;

      var boost = girl.ready ? beamBoost(s, beamAngle) : 0;   // 光束增益
      var hov = 0;                                            // 悬停增益
      if (pointer.active) {
        var dx = s.x - pointer.x, dy = s.y - pointer.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < HOVER_R) hov = Math.pow(1 - dist / HOVER_R, 1.6);
      }
      var e = Math.min(1, boost * 1.15 + hov);                // 光束更亮一档
      if (e > 0) a = Math.min(1, a + e * 0.85);

      // 点亮时星星明显变大
      var r = s.r * (1 + e * 1.5 + boost * 0.5);

      var cr, cg, cb;
      if (s.gold || e > 0.25) {
        var k = Math.min(1, 0.45 + e * 0.55);                 // 越亮越金
        cr = 232 + (240 - 232) * k; cg = 226 + (214 - 226) * k; cb = 218 + (160 - 218) * k;
      } else {
        cr = 226; cg = 230; cb = 222;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, 6.283);
      ctx.fillStyle = "rgba(" + (cr | 0) + "," + (cg | 0) + "," + (cb | 0) + "," + a.toFixed(3) + ")";
      ctx.fill();

      // 光晕
      if (e > 0.12) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 3.2, 0, 6.283);
        ctx.fillStyle = "rgba(240,224,170," + (e * 0.14).toFixed(3) + ")";
        ctx.fill();
      }
      s._e = e;
    }

    // 3) 星座连线（被点亮的星星之间）
    ctx.lineWidth = 0.6;
    for (var m = 0; m < stars.length; m++) {
      var s1 = stars[m];
      if (!s1._e || s1._e < 0.4) continue;
      for (var n = m + 1; n < stars.length; n++) {
        var s2 = stars[n];
        if (!s2._e || s2._e < 0.4) continue;
        var ddx = s1.x - s2.x, ddy = s1.y - s2.y;
        var dd = ddx * ddx + ddy * ddy;
        if (dd < 110 * 110) {
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.strokeStyle = "rgba(222,196,138," + (Math.min(s1._e, s2._e) * 0.3).toFixed(3) + ")";
          ctx.stroke();
        }
      }
    }

    // 4) 女孩剪影盖在最上层
    if (girl.ready) ctx.drawImage(girl.img, girl.x, girl.y, girl.w, girl.h);

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
