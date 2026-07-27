/* 留言板（localStorage 版）
   说明：GitHub Pages 是纯静态托管，留言保存在访客自己的浏览器里。
   若需要"所有人可见"的共享留言板，推荐接入 Giscus（基于 GitHub Discussions），
   接入方法见 README.md。 */
(function () {
  "use strict";

  var KEY = "yeji_guestbook_v1";
  var form = document.getElementById("gbForm");
  var list = document.getElementById("gbList");
  if (!form || !list) return;

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function save(items) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) { /* 存储满或隐私模式下静默失败 */ }
  }

  function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmt(ts) {
    var d = new Date(ts);
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) +
           " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function render() {
    var items = load();
    list.innerHTML = "";
    if (!items.length) {
      var empty = document.createElement("p");
      empty.className = "gb-empty";
      empty.textContent = "这里还很安静，写下第一句话吧。";
      list.appendChild(empty);
      return;
    }
    items.forEach(function (it) {
      var div = document.createElement("div");
      div.className = "gb-item";
      div.innerHTML =
        '<div class="gb-head"><span class="gb-name">' + esc(it.name) + "</span>" +
        '<span class="gb-date">' + fmt(it.ts) + "</span></div>" +
        '<p class="gb-msg">' + esc(it.msg) + "</p>";
      list.appendChild(div);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nameEl = form.querySelector("input[name=name]");
    var msgEl = form.querySelector("textarea[name=msg]");
    var name = nameEl.value.trim().slice(0, 20) || "路过的风";
    var msg = msgEl.value.trim().slice(0, 300);
    if (!msg) {
      msgEl.focus();
      return;
    }
    var items = load();
    items.unshift({ name: name, msg: msg, ts: Date.now() });
    if (items.length > 100) items = items.slice(0, 100);
    save(items);
    msgEl.value = "";
    render();

    // 柔和提示
    var btn = form.querySelector(".gb-submit");
    var old = btn.textContent;
    btn.textContent = "已留下足迹";
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = old;
      btn.disabled = false;
    }, 1600);
  });

  render();
})();
