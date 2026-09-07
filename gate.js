/* THE HOUSE KEY, FOR THE BOOKS. 5 September 2026.

   Pedro: "Uma vez aluno, acesso a tudo atraves do e-mail." The lessons
   (lessons.theconceptmethod.com) sign a registered person in with a cookie
   for the whole domain, and the Coach already opens with it. This script
   makes the books open with it too, without touching any page's own gate:

     1. A page that is already unlocked (cm_access in localStorage) is left
        alone. Nothing here runs before the page's own check has run.
     2. A page that is still locked asks the lessons who is holding the
        cookie (credentials: include; the cookie is same-site). A registered
        learner, teacher or director gets the shared key (the one a code once
        gave), and the page reloads and opens by its own path.
     3. A stranger gets one more thing in the gate box: a button to enter
        with the email they registered, which comes back to this very page.

   THE ACCESS CODE IS GONE. Pedro, 6 Sep 2026: "pode tirar o ACCESS CODE de
   todos os livros." Every gate box now carries the email door itself (the
   markup with class house-enter, written into the page); offerEmail() below
   is the fallback for a page that somehow lacks it. A device that unlocked
   with a code before that day keeps its key: cm_access is still honored.

   One file for all six books. Every unit page loads it with
   <script src="/gate.js" defer></script>, and the generators emit that line.
   Edit this file, never the copy of it that a page might once have carried. */
(function () {
  'use strict';

  var WHOAMI = 'https://lessons.theconceptmethod.com/api/whoami';
  var ENTER  = 'https://lessons.theconceptmethod.com/enter';

  function unlocked() {
    try {
      return localStorage.getItem('cm_access') === '1' ||
             localStorage.getItem('cm_pv_access') === '1';
    } catch (e) { return false; }
  }

  function grant() {
    try { localStorage.setItem('cm_access', '1'); } catch (e) { /* private mode: the page asks again */ }
  }

  /* Inside the Coach the page is framed by the app, and there is nowhere in a
     frame to type an email, so the button would be noise. */
  function framed() {
    try { return window.self !== window.top; } catch (e) { return true; }
  }

  /* FRAMED BY THE APP, WHICH IS NOT THE SAME AS AUTHORISED.

     This test used to live inline in 229 published pages, and in each of them
     it was wired straight into hasAccess(): being in a frame whose referrer
     began with one of two strings opened the book, with no further check of
     any kind. The app's own door is a single shared password -- sha256 of one
     SITE_PASSWORD, the same bytes for every person alive -- so anybody holding
     it could open the app, let the app frame any unit of any book, and read
     all six without ever being a registered learner.

     IT IS NOT NEEDED FOR THE APP TO WORK, and that is what made it safe to
     close. functions/book/[[path]].js fetches the unit and serves it from the
     APP'S OWN ORIGIN, then injects `localStorage.setItem("cm_access","1")`
     ahead of the page's own script. Inside the app the page is first-party,
     the key is already written, and hasAccess() returns true without this
     function ever being consulted.

     What it is still good for is knowing not to draw an email button into a
     frame nobody can type in. That is all it does now. */
  function framedByApp() {
    try {
      if (window.self === window.top) { return false; }
      var r = document.referrer || '';
      /* The trailing slash is load bearing: without it a host such as
         concept-coach.pages.dev.example.com would match the prefix. */
      return r.indexOf('https://concept-coach.pages.dev/') === 0 ||
             r.indexOf('https://coach.theconceptmethod.com/') === 0;
    } catch (e) { return false; }
  }

  function gateBox() {
    return document.getElementById('gate') || document.getElementById('cmGate');
  }

  function offerEmail() {
    var box = gateBox();
    if (!box || box.querySelector('.house-enter')) { return; }
    var wrap = document.createElement('div');
    wrap.className = 'house-enter';
    /* A full row, whatever the gate box's layout: the Calibrated Speech gate
       is a flex row, and without this the button lands beside the code. */
    wrap.style.cssText = 'margin:18px 0 6px;flex:1 1 100%;text-align:center;';
    var a = document.createElement('a');
    a.href = ENTER + '?next=' + encodeURIComponent(location.href.split('#')[0]);
    a.textContent = 'Enter with my email';
    a.style.cssText = 'display:inline-block;padding:12px 22px;border-radius:999px;' +
      'background:#B3132B;color:#fff;font-weight:600;text-decoration:none;font-family:inherit;';
    var p = document.createElement('p');
    p.textContent = 'A link and a six-digit code come to your email. One tap, and this device is signed in for a year: every book, the lessons, and the Coach.';
    p.style.cssText = 'margin:10px 0 0;font-size:14px;line-height:1.5;opacity:.8;';
    wrap.appendChild(a);
    wrap.appendChild(p);
    /* Above the code field when there is one, so the email is the first way
       in and the code the second. */
    var first = box.querySelector('input, form, button');
    if (first && first.parentNode === box) { box.insertBefore(wrap, first); }
    else { box.appendChild(wrap); }
  }

  function ask() {
    if (!window.fetch) { offerEmail(); return; }
    fetch(WHOAMI, { credentials: 'include', cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (who) {
        var role = who && who.role;
        if (role === 'student' || role === 'teacher' || role === 'director') {
          grant();
          /* Reload only if the key took: with storage blocked the page would
             ask, grant nothing, and reload for ever. Otherwise open in place. */
          if (unlocked()) { location.reload(); }
          else if (typeof window.openUnit === 'function') { window.openUnit(); }
          else if (typeof window.openBook === 'function') { window.openBook(); }
        } else {
          offerEmail();
        }
      })
      .catch(function () { offerEmail(); });
  }

  function start() {
    if (unlocked()) { return; }
    /* A FRAME IS NOT A REASON TO OPEN, AND IT IS NOT A REASON TO ASK EITHER.
       In the app the key is already written by its door, so `unlocked()` above
       has already returned. Any other frame gets nothing: no gate box drawn
       into somebody else's page, and no page opened. */
    if (framed()) { return; }
    ask();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
