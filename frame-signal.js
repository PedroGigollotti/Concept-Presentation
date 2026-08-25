/* ==========================================================================
   CONCEPT — SIGNAL C. The published page telling the app that an item was
   checked, and what the learner put.

   THE PROBLEM IT SOLVES. The Concept Coach reads these books inside a
   CROSS-ORIGIN iframe, so it can see nothing at all of what happens in them:
   js/coach.js pins the item state to 'open' in the reader, which means the
   Coach is forbidden to explain an error it cannot know has been made. That is
   Signal C in the app's STATE.md, priced there at 138 published pages and
   deferred under "site first, then the app".

   IT IS AN INCLUDE LINE, AND THAT IS THE FINDING. This file changes nothing in
   any exercise. It watches the feedback lines the checkers already write, with
   a MutationObserver, and reports what appeared. So the 138-page rollout is one
   <script> tag per page and no rebuild of any exercise engine.

   ---- THE THREE RULES IT IS BUILT TO --------------------------------------
   1. IT NEVER SPEAKS FIRST, AND NEVER TO '*'. The app says hello; this page
      records the origin it came from IF that origin is on the list below, and
      replies only there, ever. postMessage to '*' would broadcast the
      learner's own writing to whatever happened to embed the page, and the
      learner's writing is the whole payload.
   2. NO PARENT, NO MESSAGES. A learner reading the book on the site directly
      is the ordinary case. Nothing is posted, nothing is stored, nothing runs
      but one idle observer.
   3. IT FAILS SILENTLY, like every other script on these pages. A page that
      breaks because an app is not listening is worse than an app that cannot
      hear.

   NOTHING IS STORED, HERE OR ANYWHERE. This posts a message to one window that
   identified itself. It writes no cookie, no localStorage, no request.
   ========================================================================== */
(function () {
  'use strict';

  /* The app, and the address it is intended to move to. Nothing else is ever
     answered. Two entries, and both are ours. */
  var ALLOWED = [
    'https://concept-coach.pages.dev',
    'https://coach.theconceptmethod.com'
  ];

  var PEER = null;      /* the origin that said hello, once it has            */
  var SEEN = {};        /* item id -> the feedback we already reported        */

  function place() {
    var t = document.title || '';
    var parts = t.split('·').map(function (s) { return s.trim(); });
    var m = /unit\s*0*(\d+)/i.exec(t) || /unit0*(\d+)/i.exec(location.pathname);
    return {
      book: parts.length > 2 ? parts[parts.length - 2] : '',
      unit: m ? Number(m[1]) : null,
      path: location.pathname
    };
  }

  function exerciseOf(el) {
    while (el && el !== document.body) {
      if (el.classList && el.classList.contains('ex-block')) { return el; }
      el = el.parentNode;
    }
    return null;
  }
  function txt(el) { return el ? String(el.textContent || '').replace(/\s+/g, ' ').trim() : ''; }
  function clean(el) {
    if (!el) { return ''; }
    try {
      var c = el.cloneNode(true), k = c.querySelectorAll('button, .qn, .num');
      for (var i = 0; i < k.length; i++) { k[i].parentNode.removeChild(k[i]); }
      return txt(c);
    } catch (e) { return txt(el); }
  }

  /* WHAT THE LEARNER PUT. Read, never written. A select reports its label
     rather than its value, because the label is what he saw. */
  function typedIn(item) {
    var f = item.querySelectorAll('input, select, textarea'), out = [];
    for (var i = 0; i < f.length; i++) {
      var v = f[i].value;
      if (f[i].tagName === 'SELECT') {
        var o = f[i].options[f[i].selectedIndex];
        v = o ? o.text : v;
      }
      if (v && String(v).trim()) { out.push(String(v).trim().slice(0, 300)); }
    }
    return out.join(' | ');
  }

  function report(fb) {
    if (!PEER) { return; }
    var state = txt(fb);
    if (!state) { return; }
    var id = fb.id || '';
    if (SEEN[id] === state) { return; }   /* the same verdict twice is not news */
    SEEN[id] = state;

    var item = fb.parentNode;
    while (item && item !== document.body &&
           !(item.classList && item.classList.contains('q'))) {
      item = item.parentNode;
    }
    if (!item || item === document.body) { item = fb.parentNode; }
    var ex = exerciseOf(fb);
    var lab = ex ? ex.querySelector('.ex-label') : null;
    var p = place();

    /* MISSED IS ONLY EVER TRUE FOR A MISS, and absent otherwise. The app's
       own note on Signal A: absent and false are different claims and the
       Coach is not told the wrong one. */
    var missed = /^not quite/i.test(state) ? true : undefined;

    var msg = {
      source: 'concept-book',
      type: 'item-checked',
      book: p.book,
      unit: p.unit,
      path: p.path,
      exercise: lab ? txt(lab) : '',
      exerciseSlot: (lab && lab.getAttribute) ? (lab.getAttribute('data-slot') || '') : '',
      exerciseTitle: ex ? txt(ex.querySelector('.ex-title')) : '',
      item: txt(item.querySelector('.qn') || item.querySelector('.num')).replace(/\.$/, ''),
      prompt: clean(item.querySelector('.q-text')) ||
              (item.querySelector('.listen-q') ? '(heard, not printed)' : ''),
      chose: typedIn(item),
      feedback: clean(fb)
    };
    if (missed) { msg.missed = true; }
    try { window.parent.postMessage(msg, PEER); } catch (e) {}
  }

  function start() {
    try {
      if (window.parent === window) { return; }   /* rule 2: no parent, no work */

      window.addEventListener('message', function (ev) {
        try {
          if (ALLOWED.indexOf(ev.origin) === -1) { return; }
          var d = ev.data;
          if (!d || d.source !== 'concept-coach' || d.type !== 'hello') { return; }
          PEER = ev.origin;
          window.parent.postMessage({ source: 'concept-book', type: 'ready',
                                      book: place().book, unit: place().unit }, PEER);
        } catch (e) {}
      }, false);

      /* THE FEEDBACK LINES ARE THE SIGNAL. The checkers already write them and
         nothing else on the page does, so watching them costs one observer and
         changes no exercise. */
      if (!window.MutationObserver) { return; }
      var obs = new MutationObserver(function (recs) {
        try {
          for (var i = 0; i < recs.length; i++) {
            var t = recs[i].target;
            var fb = (t.nodeType === 1 && t.classList && t.classList.contains('fb'))
                     ? t : (t.parentNode && t.parentNode.classList &&
                            t.parentNode.classList.contains('fb') ? t.parentNode : null);
            if (fb) { report(fb); }
          }
        } catch (e) {}
      });
      obs.observe(document.body, { childList: true, characterData: true, subtree: true });
    } catch (e) { /* rule 3 */ }
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else { start(); }
  } catch (e) {}
})();
