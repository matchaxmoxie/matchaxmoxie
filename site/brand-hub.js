/* matchaxmoxie · sticky nav shadow on scroll */
(function () {
  var nav = document.querySelector("body.brand-hub .site-jump");
  if (!nav) return;
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function sync() {
    if (window.scrollY > 8) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  sync();
  window.addEventListener("scroll", sync, { passive: true });
  if (reduce) nav.classList.remove("is-scrolled");
})();
