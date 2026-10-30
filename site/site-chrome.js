/**
 * matchaxmoxie · shared nav + footer
 * Pages-safe. Reads data-base and data-page on <html>.
 * Existing header/footer stay as no-JS fallback; this keeps labels in one place.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var base = root.getAttribute("data-base") || "";
  var page = root.getAttribute("data-page") || "";

  var LINKS = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "learn", href: "learn/index.html", label: "Learn" },
    { id: "notebook", href: "notebook/index.html", label: "Notebook" },
    { id: "explore", href: "explore/index.html", label: "Explore" },
  ];

  function href(path) {
    return base + path;
  }

  function navMarkup(label) {
    var html = "";
    LINKS.forEach(function (link) {
      var current = page === link.id ? ' aria-current="page"' : "";
      html +=
        '<a href="' +
        href(link.href) +
        '"' +
        current +
        ">" +
        link.label +
        "</a>";
    });
    return html;
  }

  function fillNav(el, label) {
    if (!el) return;
    el.setAttribute("aria-label", label);
    el.innerHTML = navMarkup();
  }

  var headerNav = document.querySelector(".topbar .site-nav");
  fillNav(headerNav, "Site");

  var footerNav = document.querySelector(".site-footer .footer-nav");
  fillNav(footerNav, "Footer");

  var brand = document.querySelector(".topbar .brand");
  if (brand) brand.setAttribute("href", href("index.html"));
})();
