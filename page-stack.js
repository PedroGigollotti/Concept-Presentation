/* The stack of page buttons (page-stack.css). Two jobs:
   1. Over a light part of the page, put the dark layer under each glass button (.dim), so its words stay readable.
   2. On a wide screen, give each band's content room beside the stack (--wm, the content's own width) and keep the
      Books pages' full-width bar full width after its column moves right. */
(function () {
  var stack = document.querySelector('.page-stack');
  if (!stack) return;
  var wide = window.matchMedia('(min-width:1100px)');

  function bgOf(el) {
    for (; el && el !== document.documentElement; el = el.parentElement) {
      if (el.tagName === 'IMG' || el.tagName === 'VIDEO') return null;
      var cs = getComputedStyle(el);
      var m = cs.backgroundColor.match(/[\d.]+/g);
      if (m && (m.length < 4 || +m[3] > 0.5)) return m;
      if (cs.backgroundImage !== 'none') return null;
    }
    var b = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g);
    return b && (b.length < 4 || +b[3] > 0) ? b : ['255', '255', '255'];
  }
  function light(m) {
    if (!m) return false;
    return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255 > 0.45;
  }
  function dim() {
    stack.querySelectorAll('.ps-link,.ps-lang').forEach(function (b) {
      var r = b.getBoundingClientRect();
      if (!r.width) return;
      var under = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
        .filter(function (e) { return !stack.contains(e); })[0];
      b.classList.toggle('dim', light(bgOf(under)));
    });
  }
  function room() {
    document.querySelectorAll('section .wrap, footer .wrap, .wrap').forEach(function (w) {
      w.style.removeProperty('--wm');
      var mw = parseFloat(getComputedStyle(w).maxWidth);
      if (mw) w.style.setProperty('--wm', mw + 'px');
    });
    var top = document.querySelector('.topnav');
    if (top) {
      top.style.marginLeft = '';
      if (wide.matches) {
        var p = top.parentElement, r = p.getBoundingClientRect();
        top.style.marginLeft = -(r.left + parseFloat(getComputedStyle(p).paddingLeft)) + 'px';
      }
    }
  }
  var queued = false;
  function soon() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; dim(); });
  }
  room(); dim();
  requestAnimationFrame(function () { stack.classList.add('ready'); });
  window.addEventListener('scroll', soon, { passive: true });
  window.addEventListener('resize', function () { room(); soon(); });
  window.addEventListener('load', function () { room(); dim(); });
})();
