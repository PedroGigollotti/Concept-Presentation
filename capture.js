/* ==========================================================================
   CONCEPT — the capture button.

   ONE JOB. Netto reads the books on his phone. When something is wrong with an
   item he has to describe where he is, in a message, from memory. This puts a
   button on the page that writes that description for him, as plain text he
   can paste straight back into a conversation.

   IT IS NOT A BUG TRACKER. It stores nothing, sends nothing, and has no
   server. It reads the page, formats what it read, and hands it to the
   clipboard. Everything it captures is already on the screen in front of him.

   ---- SCOPE, 30 Aug 2026 --------------------------------------------------
   Netto's ruling: A1/A2 ONLY for now. He gets it where he is working and 93
   stable published pages stay untouched. This file is therefore included by
   the A1/A2 pages and by nothing else.

   BUT IT IS WRITTEN AS IF IT WERE FOR ALL FOUR, which is the other half of the
   ruling. There is no A1/A2 anywhere in this file. Every field is DERIVED from
   the DOM, never passed in, and the markup it reads is the SHARED kit markup
   that C1, C2 and Phrasal Verbs already emit: #gate, #content, .ex-block,
   .ex-label, .ex-title, .q, .fb, .unit-label. Extending it to those three is
   an include line.
   THE ONE BOOK THAT WOULD NEED MORE IS CALIBRATED SPEECH, which has none of
   that markup -- no gate, no #content, no .ex-block, no .fb. There it degrades
   to a page-level capture rather than breaking, and a real capture there needs
   its own entry in SEL below. Said here so it is not discovered at launch.

   ---- THE RULES IT IS BUILT TO -------------------------------------------
   1. IT NEVER INTERFERES WITH AN EXERCISE. It adds two elements to <body> and
      touches nothing else. Every listener is passive, none is on the capture
      phase, and nothing is ever preventDefault-ed. It does not read or write a
      single input except to COPY the value the learner already typed.
   2. IT FAILS SILENTLY. Every entry point is wrapped. If anything throws, the
      button does nothing and the page is unaffected. A capture button that can
      break a unit is worse than no capture button.
   3. THUMB FIRST, AND IT COVERS NOTHING. The control is 44 tall, which is
      the floor this book adopted on 30 Aug 2026, and it lives INSIDE the
      page's own bottom bar rather than floating over the column. At 375px
      every input is full width, so a floating button in any corner sits on
      the end of a field: measured, not assumed.
   4. IT PRINTS NOTHING. @media print removes it, like every other control.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- the selector table --------------------------------------------------
     ONE TABLE, so that adding a book is an entry and not a rewrite. These are
     the shared kit's class names; nothing here is specific to a level. */
  var SEL = {
    gate:     '#gate',
    content:  '#content',
    exercise: '.ex-block',
    exLabel:  '.ex-label',
    exTitle:  '.ex-title',
    item:     '.q',
    itemText: '.q-text',
    feedback: '.fb',
    unitLabel:'.unit-label',
    /* WHERE THE CONTROL GOES. The page's own bottom bar, which every book the
       shared kit builds already has, and which is the one strip on the page
       that is never content. */
    bar:      '#scoreBar'
  };

  var LAST = null;   /* the last .q the learner touched                       */
  var PANEL = null;

  function q(sel, root) { try { return (root || document).querySelector(sel); } catch (e) { return null; } }
  function txt(el) { return el ? String(el.textContent || '').replace(/\s+/g, ' ').trim() : ''; }

  /* TEXT WITHOUT THE FURNITURE. A .q-text carries the item NUMBER in a span and
     a .fb carries the Listen button that appears after Check, so reading either
     one whole produced "2.There isn't ___ milk today." and "Answer: any
     Listen". The capture is read by a person and pasted into a message; noise
     in it is noise in the message. */
  function cleanTxt(el, drop) {
    if (!el) { return ''; }
    try {
      var c = el.cloneNode(true);
      var kill = c.querySelectorAll(drop || 'button, .qn, .num');
      for (var i = 0; i < kill.length; i++) { kill[i].parentNode.removeChild(kill[i]); }
      return txt(c);
    } catch (e) { return txt(el); }
  }

  /* ---- WHERE AM I ---------------------------------------------------------
     Derived, never told. The PATH is the unambiguous fact and is always
     reported raw; the book and unit are a best-effort reading of the title and
     the filename, and are labelled as derived so a wrong guess is visible
     rather than misleading. */
  function place() {
    var title = document.title || '';
    var path  = location.pathname || '';
    /* "Unit 3 · A1 · Concept" -> ["Unit 3","A1","Concept"] on every book the
       shared kit builds. Falls back to the whole title. */
    var parts = title.split('·').map(function (s) { return s.trim(); });
    var book = parts.length > 2 ? parts[parts.length - 2] : '';
    var unit = '';
    var m = /unit\s*0*(\d+)/i.exec(title) || /unit0*(\d+)/i.exec(path);
    if (m) { unit = m[1]; }
    var label = txt(q(SEL.unitLabel));
    return { title: title, path: path, book: book, unit: unit, label: label };
  }

  /* ---- WHICH ITEM ---------------------------------------------------------
     The last item he touched, or the exercise nearest the middle of the screen
     if he has touched nothing. Never a guess presented as a fact: which of the
     two it was is written into the capture. */
  function nearestItem() {
    if (LAST && document.contains(LAST)) { return { el: LAST, how: 'the item you last typed in or tapped' }; }
    var mid = window.innerHeight / 2, best = null, bestD = Infinity;
    var all = document.querySelectorAll(SEL.item);
    for (var i = 0; i < all.length; i++) {
      var r = all[i].getBoundingClientRect();
      if (!r.height) { continue; }
      var d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) { bestD = d; best = all[i]; }
    }
    return best ? { el: best, how: 'the item in the middle of the screen (nothing was tapped)' } : null;
  }

  function exerciseOf(el) {
    while (el && el !== document.body) {
      if (el.classList && el.classList.contains(SEL.exercise.slice(1))) { return el; }
      el = el.parentNode;
    }
    return null;
  }

  /* ---- WHAT HE TYPED, AND THE ANSWER IF HE CHECKED -------------------------
     The expected answer exists in the DOM only AFTER Check: the feedback line
     reads "Not quite. Answer: X". Before Check it is empty, so an unchecked
     item reports the answer as not shown, which is the honest state and also
     the one that keeps the key off the capture when he has not asked for it. */
  function itemFields(item) {
    var out = { number: '', prompt: '', typed: '', feedback: '' };
    var n = q('.qn', item) || q('.num', item);
    out.number = txt(n).replace(/\.$/, '');
    var t = q(SEL.itemText, item);
    out.prompt = t ? cleanTxt(t) : '';
    if (!out.prompt) {
      /* A referential item has no printed prompt: the clip IS the question. */
      var listen = q('.listen-q', item);
      out.prompt = listen ? '(no printed prompt — the clip is the question)'
                          : cleanTxt(item, 'button, .qn, .num, input, select, .fb').slice(0, 160);
    }
    var f = item.querySelectorAll('input, select, textarea');
    var vals = [];
    for (var i = 0; i < f.length; i++) {
      var v = f[i].value;
      if (f[i].tagName === 'SELECT') {
        var o = f[i].options[f[i].selectedIndex];
        v = o ? o.text : v;
      }
      if (v && String(v).trim()) { vals.push(String(v).trim()); }
    }
    out.typed = vals.join(' | ');
    out.feedback = cleanTxt(q(SEL.feedback, item));
    return out;
  }

  function capture() {
    var p = place();
    var hit = nearestItem();
    var L = [];
    L.push('CONCEPT — CAPTURE');
    L.push('page      ' + p.title);
    L.push('url       ' + location.href);
    if (p.book) { L.push('book      ' + p.book + '   (derived from the page title)'); }
    if (p.unit) { L.push('unit      ' + p.unit); }
    if (p.label) { L.push('nav       ' + p.label); }
    if (hit) {
      var ex = exerciseOf(hit.el);
      if (ex) {
        var lab = q(SEL.exLabel, ex);
        var slot = lab && lab.getAttribute ? lab.getAttribute('data-slot') : null;
        L.push('exercise  ' + txt(lab) + (slot && slot !== txt(lab) ? ' (data letter ' + slot + ')' : '') +
               '  —  ' + txt(q(SEL.exTitle, ex)));
      }
      var f = itemFields(hit.el);
      L.push('item      ' + (f.number || '(unnumbered)') + '   [' + hit.how + ']');
      L.push('prompt    ' + (f.prompt || '(none)'));
      L.push('typed     ' + (f.typed || '(nothing typed)'));
      L.push('checked   ' + (f.feedback || '(not checked, so no answer is shown)'));
    } else {
      L.push('item      (no exercise item found on this page)');
    }
    L.push('screen    ' + window.innerWidth + 'x' + window.innerHeight +
           ' css px, dpr ' + (window.devicePixelRatio || 1));
    L.push('browser   ' + navigator.userAgent);
    return L.join('\n');
  }

  /* ---- THE PANEL ----------------------------------------------------------
     A textarea, pre-selected, and a Copy button. The textarea matters more
     than the button: navigator.clipboard needs a secure context and a user
     gesture, and on a phone a tap-hold on selected text always works. */
  /* NO FOCUS ON OPEN. Focusing the textarea raises the phone keyboard over the
     sheet, and the Copy button is the first thing it covers. The clipboard call
     does not need focus; the fallback does, and asks for it only then. */
  function show(text) {
    if (!PANEL) { return; }
    var ta = q('textarea', PANEL);
    ta.value = text;
    PANEL.style.display = 'flex';
    try { ta.scrollTop = 0; } catch (e) {}
  }

  function copyNow() {
    var ta = q('textarea', PANEL);
    var done = function () {
      var b = q('.cap-copy', PANEL);
      if (b) { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1400); }
    };
    try {
      /* SYNCHRONOUSLY, INSIDE THE TAP. iOS Safari revokes the user gesture
         across an await, so the clipboard call happens first and directly. */
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ta.value).then(done, selectFallback);
        return;
      }
      selectFallback();
    } catch (e) { try { selectFallback(); } catch (e2) {} }

    /* THE FALLBACK, WHICH IS WHAT ACTUALLY RUNS ON AN OLDER PHONE. execCommand
       cannot copy from a READONLY textarea on iOS -- it refuses to select it --
       which is why the box above is editable. Selecting it also means a
       tap-hold gives him the system Copy even if both APIs are gone. */
    function selectFallback() {
      try {
        ta.focus();
        ta.setSelectionRange(0, ta.value.length);
        document.execCommand('copy');
        done();
      } catch (e) { /* selected; tap-hold still works */ }
    }
  }

  function mount() {
    var css = document.createElement('style');
    css.textContent =
      /* IN THE BAR when the page has one, which is every book the shared kit
         builds. A FLOATING BUTTON OVER A NARROW COLUMN ALWAYS COVERS
         SOMETHING: at 375px every input is full width, so a 52px circle in
         any corner sits on the right-hand end of a field the learner is
         about to tap. That is interference, and rule 1 forbids it. The bar
         already wraps, and the pill shares the Print button's row. */
      '.cap-btn{min-height:44px;padding:0 16px;border-radius:999px;' +
      'border:1.5px solid #14344F;background:#fff;color:#14344F;' +
      'font:600 13.5px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif;' +
      'cursor:pointer;display:inline-flex;align-items:center;gap:6px;' +
      '-webkit-tap-highlight-color:transparent;}' +
      '.cap-btn::before{content:"\\2318";font-size:.95em;line-height:1;}' +
      '.cap-btn:active{background:#14344F;color:#fff;}' +
      /* NO BAR ON THE PAGE: float, as the only remaining option. */
      '.cap-float{position:fixed;right:14px;bottom:18px;z-index:2147483000;' +
      'box-shadow:0 2px 10px rgba(0,0,0,.14);background:#fff;}' +
      '.cap-wrap{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483001;background:rgba(20,30,40,.45);' +
      'display:none;align-items:flex-end;justify-content:center;}' +
      '.cap-card{background:#fff;width:100%;max-width:640px;border-radius:16px 16px 0 0;' +
      'padding:16px 14px calc(16px + env(safe-area-inset-bottom));' +
      'font:400 14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif;' +
      'max-height:86vh;display:flex;flex-direction:column;gap:10px;}' +
      '.cap-card h4{margin:0;font-size:14px;color:#14344F;letter-spacing:.02em;}' +
      '.cap-card textarea{width:100%;flex:1 1 auto;min-height:190px;font:400 13px/1.45 ui-monospace,' +
      'SFMono-Regular,Menlo,monospace;padding:10px;border:1.5px solid #DCDDD6;border-radius:10px;' +
      'resize:none;-webkit-user-select:text;user-select:text;}' +
      '.cap-row{display:flex;gap:8px;}' +
      '.cap-row button{flex:1 1 auto;min-height:44px;border-radius:999px;font:600 14px/1 inherit;' +
      'cursor:pointer;border:1.5px solid #14344F;background:#fff;color:#14344F;}' +
      '.cap-row .cap-copy{background:#14344F;color:#fff;}' +
      '@media print{.cap-btn,.cap-wrap{display:none !important;}}';
    document.head.appendChild(css);

    var btn = document.createElement('button');
    btn.className = 'cap-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Capture this item to paste into a message');
    btn.title = 'Capture this item';
    /* A CONTROL ANNOUNCES ITSELF, which this book made a series rule on
       30 Aug 2026. A bare glyph is a rebus. */
    btn.textContent = 'Capture';

    var wrap = document.createElement('div');
    wrap.className = 'cap-wrap';
    wrap.innerHTML =
      '<div class="cap-card">' +
      '<h4>Copy this and paste it into the chat</h4>' +
      '<textarea spellcheck="false" autocapitalize="off" autocorrect="off"></textarea>' +
      '<div class="cap-row"><button type="button" class="cap-close">Close</button>' +
      '<button type="button" class="cap-copy">Copy</button></div></div>';

    var bar = q(SEL.bar);
    if (bar) { bar.appendChild(btn); }
    else { btn.className = 'cap-btn cap-float'; document.body.appendChild(btn); }
    document.body.appendChild(wrap);
    PANEL = wrap;

    btn.addEventListener('click', function () {
      try { show(capture()); } catch (e) { /* silent, rule 2 */ }
    });
    wrap.addEventListener('click', function (ev) {
      if (ev.target === wrap || (ev.target.className || '') === 'cap-close') {
        wrap.style.display = 'none';
      } else if ((ev.target.className || '').indexOf('cap-copy') !== -1) {
        try { copyNow(); } catch (e) {}
      }
    });

    /* WHICH ITEM HE IS ON. Passive, on the document, never on the controls
       themselves: nothing here can consume an event an exercise needs. */
    ['focusin', 'click'].forEach(function (t) {
      document.addEventListener(t, function (ev) {
        try {
          var el = ev.target;
          while (el && el !== document.body) {
            if (el.classList && el.classList.contains(SEL.item.slice(1))) { LAST = el; return; }
            el = el.parentNode;
          }
        } catch (e) {}
      }, { passive: true });
    });

    /* HIDDEN WHILE THE GATE IS UP. The books open on an access code and a
       floating button over it would be the first thing a learner sees. */
    function gated() {
      var g = q(SEL.gate), c = q(SEL.content);
      if (!g && !c) { return false; }
      if (g && getComputedStyle(g).display !== 'none') { return true; }
      if (c && getComputedStyle(c).display === 'none') { return true; }
      return false;
    }
    function sync() { try { btn.style.display = gated() ? 'none' : 'inline-flex'; } catch (e) {} }
    sync();
    var g = q(SEL.gate);
    if (g && window.MutationObserver) {
      new MutationObserver(sync).observe(g, { attributes: true, attributeFilter: ['style', 'class'] });
    }
    document.addEventListener('click', sync, { passive: true });
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { try { mount(); } catch (e) {} });
    } else { mount(); }
  } catch (e) { /* rule 2 */ }
})();
