/* 作品数据
   结构：cat 为一级分类（portrait 人像 / humanity 人文 / landscape 风景 / stilllife 静物 / video AI 视频）
   人像可带 series 系列名（序章 / 蔓生 / 自若），同属一个系列的作品会归为一组展示。
   替换照片：把文件放入 assets/img/gallery/ 对应子目录，修改下方条目即可。 */
window.WORKS = [
  /* ========== 摄影 · 人像 · 序章 ========== */
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-01.jpg", title: "序章 · 一", desc: "天光乍破时" },
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-02.jpg", title: "序章 · 二", desc: "第一页总是轻的" },
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-03.jpg", title: "序章 · 三", desc: "风翻到哪页读哪页" },
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-04.jpg", title: "序章 · 四", desc: "提灯的人先照亮自己" },
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-05.jpg", title: "序章 · 五", desc: "故事从背影开始" },
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-06.jpg", title: "序章 · 六", desc: "向光处去" },
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-07.jpg", title: "序章 · 七", desc: "雾还没散" },
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-08.jpg", title: "序章 · 八", desc: "草在听" },
  { type: "photo", cat: "portrait", series: "序章", src: "assets/img/gallery/portrait/xuzhang-09.jpg", title: "序章 · 九", desc: "第一章留给明天" },

  /* ========== 摄影 · 人像 · 蔓生 ========== */
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-01.jpg", title: "蔓生 · 一", desc: "绿意从头顶垂下来" },
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-02.jpg", title: "蔓生 · 二", desc: "藤蔓记得每一场雨" },
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-03.jpg", title: "蔓生 · 三", desc: "慢慢长，不着急" },
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-04.jpg", title: "蔓生 · 四", desc: "叶隙间有光" },
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-05.jpg", title: "蔓生 · 五", desc: "与植物交换呼吸" },
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-06.jpg", title: "蔓生 · 六", desc: "向上，再向上" },
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-07.jpg", title: "蔓生 · 七", desc: "根在暗处写诗" },
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-08.jpg", title: "蔓生 · 八", desc: "一寸一寸地绿" },
  { type: "photo", cat: "portrait", series: "蔓生", src: "assets/img/gallery/portrait/mansheng-09.jpg", title: "蔓生 · 九", desc: "长成了自己的样子" },

  /* ========== 摄影 · 人像 · 自若 ========== */
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-01.jpg", title: "自若 · 一", desc: "夜色把心放平" },
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-02.jpg", title: "自若 · 二", desc: "星星不催人" },
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-03.jpg", title: "自若 · 三", desc: "坐成一座小山" },
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-04.jpg", title: "自若 · 四", desc: "风来，就让它来" },
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-05.jpg", title: "自若 · 五", desc: "与月亮互不打扰" },
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-06.jpg", title: "自若 · 六", desc: "安静是一种能力" },
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-07.jpg", title: "自若 · 七", desc: "把自己还给夜晚" },
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-08.jpg", title: "自若 · 八", desc: "不慌不忙地亮着" },
  { type: "photo", cat: "portrait", series: "自若", src: "assets/img/gallery/portrait/ziruo-09.jpg", title: "自若 · 九", desc: "如是，安然" },

  /* ========== 摄影 · 人文 ========== */
  { type: "photo", cat: "humanity", src: "assets/img/gallery/humanity/renwen-01.jpg", title: "巷灯", desc: "一条街的呼吸声" },
  { type: "photo", cat: "humanity", src: "assets/img/gallery/humanity/renwen-02.jpg", title: "夜归", desc: "路灯把影子拉长" },
  { type: "photo", cat: "humanity", src: "assets/img/gallery/humanity/renwen-03.jpg", title: "窗火", desc: "每扇窗后都有一顿饭" },
  { type: "photo", cat: "humanity", src: "assets/img/gallery/humanity/renwen-04.jpg", title: "街角", desc: "故事在拐角处等" },
  { type: "photo", cat: "humanity", src: "assets/img/gallery/humanity/renwen-05.jpg", title: "行人", desc: "谁也不认识谁的温柔" },
  { type: "photo", cat: "humanity", src: "assets/img/gallery/humanity/renwen-06.jpg", title: "夜市", desc: "烟火气最抚凡人心" },

  /* ========== 摄影 · 风景 ========== */
  { type: "photo", cat: "landscape", src: "assets/img/gallery/field-dusk.jpg", title: "暮色田野", desc: "黄昏的麦浪，光在撤退之前" },
  { type: "photo", cat: "landscape", src: "assets/img/gallery/mist-forest.jpg", title: "雾林", desc: "树影在雾气里练习隐身" },
  { type: "photo", cat: "landscape", src: "assets/img/gallery/golden-wheat.jpg", title: "金色低语", desc: "正午之前，麦田的密语" },
  { type: "photo", cat: "landscape", src: "assets/img/gallery/lake-moon.jpg", title: "湖上月", desc: "一枚月亮，两用：照明与想念" },
  { type: "photo", cat: "landscape", src: "assets/img/gallery/mountain-fog.jpg", title: "山雾", desc: "群山在呼吸，一次很慢的深呼吸" },
  { type: "photo", cat: "landscape", src: "assets/img/gallery/night-path.jpg", title: "夜路", desc: "路的尽头有一盏不肯睡去的灯" },
  { type: "photo", cat: "landscape", src: "assets/img/gallery/reeds-water.jpg", title: "芦苇与水", desc: "风替水面写字，芦苇负责读" },
  { type: "photo", cat: "landscape", src: "assets/img/gallery/valley-dawn.jpg", title: "山谷清晨", desc: "第一缕光翻过山脊的账本" },
  { type: "photo", cat: "landscape", src: "assets/img/gallery/star-trail.jpg", title: "星轨", desc: "把快门交给夜，把时间还给星" },

  /* ========== 摄影 · 静物 ========== */
  { type: "photo", cat: "stilllife", src: "assets/img/gallery/stilllife/jingwu-01.jpg", title: "瓶中枝", desc: "枯枝也有春天" },
  { type: "photo", cat: "stilllife", src: "assets/img/gallery/stilllife/jingwu-02.jpg", title: "茶烟", desc: "热气往上，心事往下" },
  { type: "photo", cat: "stilllife", src: "assets/img/gallery/stilllife/jingwu-03.jpg", title: "书堆", desc: "纸页间的平行宇宙" },
  { type: "photo", cat: "stilllife", src: "assets/img/gallery/stilllife/jingwu-04.jpg", title: "空椅", desc: "留给下午三点的阳光" },
  { type: "photo", cat: "stilllife", src: "assets/img/gallery/stilllife/jingwu-05.jpg", title: "小盆栽", desc: "桌上的一平方厘米森林" },

  /* ========== AI 视频 ========== */
  { type: "video", cat: "video", src: "assets/img/gallery/dream-tide.jpg", video: "assets/videos/dream-tide.mp4", title: "梦潮", desc: "AI 生成 · 缓慢流动的金色雾" },
  { type: "video", cat: "video", src: "assets/img/gallery/cloud-machine.jpg", video: "assets/videos/cloud-machine.mp4", title: "造云机", desc: "AI 生成 · 云的内部结构" },
  { type: "video", cat: "video", src: "assets/img/gallery/neon-field.jpg", video: "assets/videos/neon-field.mp4", title: "萤原", desc: "AI 生成 · 漂浮在原野上的光" }
];

/* 分类显示名与顺序 */
window.CATS = [
  { key: "portrait",  name: "人像" },
  { key: "humanity",  name: "人文" },
  { key: "landscape", name: "风景" },
  { key: "stilllife", name: "静物" }
];
window.SERIES_ORDER = ["序章", "蔓生", "自若"];
