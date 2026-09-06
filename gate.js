/* THE HOUSE KEY, FOR THE BOOKS. 5 September 2026.

   Pedro: "Uma vez aluno, acesso a tudo atraves do e-mail." The lessons
   (lessons.theconceptmethod.com) sign a registered person in with a cookie
   for the whole domain, and the Coach already opens with it. This script
   makes the books open with it too, without touching any page's own gate:

     1. A page that is already unlocked (cm_access in localStorage) is left
        alone. Nothing here runs before the page's own check has run.
     2. A page that is still locked asks the lessons who is holding the
        cookie (credentials: include; the cookie is same-site). A registered
        learner, teacher or director gets the same key the access code used
        to give, and the page reloads and opens by its own path.
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

  /* Inside the Coach the page is framed by the app and its own gate already
     lets it through; nothing here is needed and the button would be noise. */
  function framed() {
    try { return window.self !== window.top; } catch (e) { return true; }
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
    p.textContent = 'Registered with Concept? One tap on the link that comes to your email opens every book, the lessons and the Coach on this device.';
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
          location.reload();
        } else {
          offerEmail();
        }
      })
      .catch(function () { offerEmail(); });
  }

  function start() {
    if (framed() || unlocked()) { return; }
    ask();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
