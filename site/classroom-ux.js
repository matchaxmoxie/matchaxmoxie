/**
 * matchaxmoxie · classroom UX shell
 * Cookie / save consent + Miss Zhao status presence.
 * No tracking. No third-party cookies.
 *
 * Consent: localStorage matchax-consent = "accepted" | "declined"
 * When accepted, also sets first-party cookie matchax_consent=accepted.
 * App picks (situation, Scratch, footprint) stay in localStorage only after accept.
 *
 * Status: edit STATUS_DEFAULT below and commit, or demo-override with
 * localStorage matchax-status-override = {"mode":"teaching","label":"Teaching","detail":"..."}.
 */
(function () {
  "use strict";

  var CONSENT_KEY = "matchax-consent";
  var COOKIE_NAME = "matchax_consent";
  var STATUS_OVERRIDE_KEY = "matchax-status-override";
  var BANNER_MS = 380;
  var UX_KEYS = [
    "matchax-situation",
    "matchax-scratch-pick",
    "matchax-footprint",
    "matchax-advice-funnel",
  ];

  /* ── Jade edits this and commits ── */
  var STATUS_DEFAULT = {
    mode: "hiatus",
    label: "On hiatus",
    detail: "Senior year · classroom still open for you",
  };

  var STATUS_MODES = {
    working: { label: "Working", detail: "Building something for this classroom" },
    "office-hours": {
      label: "Office hours",
      detail: "Door open · bring a real question",
    },
    teaching: { label: "Teaching", detail: "Live classroom energy right now" },
    hiatus: {
      label: "On hiatus",
      detail: "Senior year · classroom still open for you",
    },
    offline: { label: "Offline", detail: "Quiet hour · archive still open" },
  };

  var pendingSaves = {};
  var listeners = [];

  function prefersReducedMotion() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_e) {
      return false;
    }
  }

  function readConsent() {
    try {
      var v = localStorage.getItem(CONSENT_KEY);
      if (v === "accepted" || v === "declined") return v;
    } catch (_e) {
      /* private mode */
    }
    return null;
  }

  function setConsentCookie(accepted) {
    if (accepted) {
      document.cookie =
        COOKIE_NAME +
        "=accepted; Path=/; Max-Age=31536000; SameSite=Lax";
    } else {
      document.cookie =
        COOKIE_NAME + "=; Path=/; Max-Age=0; SameSite=Lax";
    }
  }

  function clearUxStorage() {
    try {
      UX_KEYS.forEach(function (k) {
        localStorage.removeItem(k);
      });
    } catch (_e) {
      /* ignore */
    }
    pendingSaves = {};
  }

  function flushPending() {
    Object.keys(pendingSaves).forEach(function (key) {
      try {
        localStorage.setItem(key, JSON.stringify(pendingSaves[key]));
      } catch (_e) {
        /* quota */
      }
    });
    pendingSaves = {};
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (_e) {
      /* ignore */
    }
    if (value === "accepted") {
      setConsentCookie(true);
      flushPending();
    } else {
      setConsentCookie(false);
      clearUxStorage();
    }
    listeners.forEach(function (fn) {
      try {
        fn(value);
      } catch (_e) {
        /* ignore */
      }
    });
    document.dispatchEvent(
      new CustomEvent("matchax-consent-change", { detail: { value: value } })
    );
  }

  function allowsSave() {
    return readConsent() === "accepted";
  }

  function loadStored(key, fallback) {
    if (!allowsSave()) return fallback;
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_e) {
      return fallback;
    }
  }

  function saveStored(key, value) {
    var c = readConsent();
    if (c === "accepted") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (_e) {
        /* quota */
      }
      return;
    }
    /* undecided: queue until Accept. declined: this visit only */
    if (c === null) {
      pendingSaves[key] = value;
    }
  }

  window.MatchaxConsent = {
    get: readConsent,
    allowsSave: allowsSave,
    load: loadStored,
    save: saveStored,
    onChange: function (fn) {
      if (typeof fn === "function") listeners.push(fn);
    },
  };

  function resolveStatus() {
    var status = {
      mode: STATUS_DEFAULT.mode,
      label: STATUS_DEFAULT.label,
      detail: STATUS_DEFAULT.detail,
    };
    try {
      var raw = localStorage.getItem(STATUS_OVERRIDE_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && typeof o === "object") {
          if (o.mode && STATUS_MODES[o.mode]) status.mode = o.mode;
          if (typeof o.label === "string" && o.label) status.label = o.label;
          if (typeof o.detail === "string" && o.detail) status.detail = o.detail;
        }
      }
    } catch (_e) {
      /* ignore bad override */
    }
    var preset = STATUS_MODES[status.mode];
    if (preset) {
      if (!status.label) status.label = preset.label;
      if (!status.detail) status.detail = preset.detail;
    }
    return status;
  }

  function initStatusChip() {
    if (document.getElementById("classroom-status")) return;
    var nav = document.querySelector(".site-jump");
    var status = resolveStatus();
    var el = document.createElement("p");
    el.id = "classroom-status";
    el.className = "classroom-status classroom-status--" + status.mode;
    el.setAttribute("role", "status");
    el.setAttribute(
      "aria-label",
      "Miss Zhao status: " + status.label + ". " + status.detail
    );

    var dot = document.createElement("span");
    dot.className = "classroom-status-dot";
    dot.setAttribute("aria-hidden", "true");

    var kicker = document.createElement("span");
    kicker.className = "classroom-status-kicker";
    kicker.textContent = "Miss Zhao";

    var mode = document.createElement("span");
    mode.className = "classroom-status-mode";
    mode.textContent = status.label;

    var detail = document.createElement("span");
    detail.className = "classroom-status-detail";
    detail.textContent = status.detail;

    el.appendChild(dot);
    el.appendChild(kicker);
    el.appendChild(document.createTextNode(" · "));
    el.appendChild(mode);
    el.appendChild(document.createTextNode(" · "));
    el.appendChild(detail);

    if (nav && nav.parentNode) {
      nav.insertAdjacentElement("afterend", el);
    } else {
      document.body.insertBefore(el, document.body.firstChild);
    }
  }

  function buildBanner() {
    var existing = document.getElementById("cookie-consent");
    if (existing) return existing;

    var banner = document.createElement("div");
    banner.id = "cookie-consent";
    banner.className = "cookie-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-labelledby", "cookie-consent-title");
    banner.setAttribute("aria-describedby", "cookie-consent-desc");
    banner.hidden = true;

    banner.innerHTML =
      '<div class="cookie-consent-inner">' +
      '<p id="cookie-consent-title" class="cookie-consent-title">Want me to remember your picks?</p>' +
      '<p id="cookie-consent-desc" class="cookie-consent-desc">' +
      "Accept and this device keeps your situation, Scratch starter, and footprint checks. " +
      "One tiny first-party cookie marks that yes. No tracking pixels. " +
      "No thanks still lets you browse; picks last for this visit only." +
      "</p>" +
      '<div class="cookie-consent-actions">' +
      '<button type="button" class="cookie-consent-accept" id="cookie-consent-accept">Yes, remember me</button>' +
      '<button type="button" class="cookie-consent-decline" id="cookie-consent-decline">Just browsing</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(banner);
    return banner;
  }

  function buildCookieTab() {
    var existing = document.getElementById("cookie-consent-tab");
    if (existing) return existing;

    var tab = document.createElement("button");
    tab.type = "button";
    tab.id = "cookie-consent-tab";
    tab.className = "cookie-consent-tab";
    tab.textContent = "Cookies";
    tab.setAttribute("aria-label", "Cookie and save settings");
    tab.setAttribute("aria-controls", "cookie-consent");
    tab.setAttribute("aria-expanded", "false");
    tab.hidden = true;
    document.body.appendChild(tab);
    return tab;
  }

  function showTab(tab) {
    if (!tab) return;
    tab.hidden = false;
    tab.setAttribute("aria-expanded", "false");
    if (prefersReducedMotion()) {
      tab.classList.add("is-visible");
      return;
    }
    window.requestAnimationFrame(function () {
      tab.classList.add("is-visible");
    });
  }

  function hideTab(tab) {
    if (!tab) return;
    tab.classList.remove("is-visible");
    tab.hidden = true;
    tab.setAttribute("aria-expanded", "true");
  }

  function openBanner(banner, tab, focusAccept) {
    if (!banner) return;
    hideTab(tab);
    banner.hidden = false;
    banner.removeAttribute("aria-hidden");
    banner.classList.remove("is-leaving");

    function afterOpen() {
      if (focusAccept) {
        var acceptBtn = document.getElementById("cookie-consent-accept");
        if (acceptBtn) {
          try {
            acceptBtn.focus({ preventScroll: true });
          } catch (_e) {
            acceptBtn.focus();
          }
        }
      }
    }

    if (prefersReducedMotion()) {
      banner.classList.add("is-open");
      afterOpen();
      return;
    }

    window.requestAnimationFrame(function () {
      banner.classList.add("is-open");
      window.setTimeout(afterOpen, BANNER_MS);
    });
  }

  function closeBanner(banner, tab, focusTab) {
    if (!banner) return;

    function finish() {
      banner.classList.remove("is-open", "is-leaving");
      banner.hidden = true;
      banner.setAttribute("aria-hidden", "true");
      showTab(tab);
      if (focusTab && tab) {
        try {
          tab.focus({ preventScroll: true });
        } catch (_e) {
          tab.focus();
        }
      }
    }

    if (banner.hidden || prefersReducedMotion()) {
      banner.classList.remove("is-open", "is-leaving");
      finish();
      return;
    }

    banner.classList.remove("is-open");
    banner.classList.add("is-leaving");
    window.setTimeout(finish, BANNER_MS);
  }

  function initConsentUi() {
    var banner = buildBanner();
    var tab = buildCookieTab();
    var acceptBtn = document.getElementById("cookie-consent-accept");
    var declineBtn = document.getElementById("cookie-consent-decline");
    var consent = readConsent();

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        writeConsent("accepted");
        closeBanner(banner, tab, true);
      });
    }
    if (declineBtn) {
      declineBtn.addEventListener("click", function () {
        writeConsent("declined");
        closeBanner(banner, tab, true);
      });
    }

    tab.addEventListener("click", function () {
      openBanner(banner, tab, true);
    });

    banner.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !banner.hidden) {
        e.preventDefault();
        if (readConsent() === null) {
          writeConsent("declined");
        }
        closeBanner(banner, tab, true);
      }
    });

    if (consent === null) {
      openBanner(banner, tab, false);
    } else {
      banner.hidden = true;
      banner.setAttribute("aria-hidden", "true");
      banner.classList.remove("is-open", "is-leaving");
      showTab(tab);
    }
  }

  function init() {
    initStatusChip();
    initConsentUi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/**
 * Scroll reveals · showcase layer 2026-07-23.
 * Below-the-fold classroom cards ride in as you scroll.
 * On-screen elements are never hidden (no flash); respects
 * prefers-reduced-motion and degrades to fully visible without JS.
 */
(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  } catch (_e) {
    return;
  }

  var SELECTOR = [
    ".gwc-block",
    ".photo-frame",
    ".kiss-home .quiet-links",
    ".footer-kiss",
    ".journey-year-nav",
    ".journey-note",
    ".choice-home-visual",
  ].join(", ");

  function setUp() {
    var els = document.querySelectorAll(SELECTOR);
    if (!els.length) return;

    document.documentElement.classList.add("js-reveal");

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    var vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach(function (el) {
      /* skip anything already on screen · zero flash on load */
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      el.classList.add("rv");
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setUp);
  } else {
    setUp();
  }
})();
