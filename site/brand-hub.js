/* matchaxmoxie · sticky nav + enter-view + reduced motion */
(function () {
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var nav = document.querySelector("body.brand-hub .site-jump");
  if (nav) {
    function syncNav() {
      if (reduce) {
        nav.classList.remove("is-scrolled");
        return;
      }
      if (window.scrollY > 8) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    syncNav();
    window.addEventListener("scroll", syncNav, { passive: true });
  }

  if (reduce) return;

  var nodes = document.querySelectorAll(
    ".brand-hub-hero, .brand-hub-door, .brand-hub-panel"
  );
  if (!nodes.length || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("hub-in");
    });
    return;
  }

  nodes.forEach(function (el) {
    el.classList.add("hub-reveal");
  });

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("hub-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  nodes.forEach(function (el) {
    io.observe(el);
  });
})();
