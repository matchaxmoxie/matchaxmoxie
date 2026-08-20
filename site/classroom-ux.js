/**
 * matchaxmoxie · classroom UX shell
 * Cookie / save consent + matchaxmoxie status presence.
 * No tracking. No third-party cookies.
 *
 * ── Consent ──
 * localStorage matchax-consent = "accepted" | "declined"
 * When accepted, also sets first-party cookie matchax_consent=accepted.
 * Remembered picks (localStorage only after Accept):
 *   matchax-situation · matchax-scratch-pick · matchax-footprint
 * (matchax-advice-funnel is cleared with those on Decline; do not advertise
 *  or expand beyond the three named above.)
 *
 * ── Status chip (Jade) ──
 * Modes: hiatus | teaching | office-hours | working | offline
 *
 * Ship a mode for everyone:
 *   1. Edit STATUS_DEFAULT.mode (and label/detail if you want custom copy)
 *   2. Commit + push site/classroom-ux.js
 *
 * Local demo only (your browser; visitors never see this):
 *   localStorage.setItem(
 *     "matchax-status-override",
 *     JSON.stringify({ mode: "teaching" })
 *   );
 *   // optional: "label" and/or "detail" strings override the preset copy
 *   location.reload();
 *
 * Clear demo override:
 *   localStorage.removeItem("matchax-status-override");
 *   location.reload();
 */
(function () {
  "use strict";

  var CONSENT_KEY = "matchax-consent";
  var COOKIE_NAME = "matchax_consent";
  var STATUS_OVERRIDE_KEY = "matchax-status-override";
  var BANNER_MS = 380;
  var TOAST_MS = 2200;
  var UX_KEYS = [
    "matchax-situation",
    "matchax-scratch-pick",
    "matchax-footprint",
    "matchax-advice-funnel",
  ];
  /* Banner names these three only; toast only for them */
  var REMEMBERED_TOAST_KEYS = {
    "matchax-situation": true,
    "matchax-scratch-pick": true,
    "matchax-footprint": true,
  };

  /* ── Jade edits this and commits ── */
  var STATUS_DEFAULT = {
    mode: "hiatus",
    label: "On hiatus",
    detail: "Senior year · classroom still open for you",
  };

  var STATUS_MODES = {
    hiatus: {
      label: "On hiatus",
      detail: "Senior year · classroom still open for you",
    },
    teaching: { label: "Teaching", detail: "Live classroom energy right now" },
    "office-hours": {
      label: "Office hours",
      detail: "Door open · bring a real question",
    },
    working: { label: "Working", detail: "Building something for this classroom" },
    offline: { label: "Offline", detail: "Quiet hour · archive still open" },
  };

  var pendingSaves = {};
  var listeners = [];
  var toastTimer = null;

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

  function ensureToast() {
    var el = document.getElementById("cookie-save-toast");
    if (el) return el;
    el = document.createElement("p");
    el.id = "cookie-save-toast";
    el.className = "cookie-save-toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    el.hidden = true;
    document.body.appendChild(el);
    return el;
  }

  function showSaveToast(message) {
    var el = ensureToast();
    el.textContent = message;
    el.hidden = false;
    el.classList.add("is-visible");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      el.classList.remove("is-visible");
      toastTimer = window.setTimeout(function () {
        el.hidden = true;
        toastTimer = null;
      }, prefersReducedMotion() ? 0 : 280);
    }, TOAST_MS);
  }

  /**
   * @param {string} key
   * @param {*} value
   * @param {{ quiet?: boolean }} [options] quiet: skip toast (e.g. restore)
   */
  function saveStored(key, value, options) {
    var quiet = options && options.quiet;
    var c = readConsent();
    if (c === "accepted") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (_e) {
        /* quota */
      }
      if (!quiet && REMEMBERED_TOAST_KEYS[key]) {
        showSaveToast("Cookie saved. Your seat is remembered.");
      }
      return "saved";
    }
    /* undecided: queue until Accept. declined: this visit only · never pretend */
    if (c === null) {
      pendingSaves[key] = value;
      return "queued";
    }
    return "session";
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
      "matchaxmoxie status: " + status.label + ". " + status.detail
    );

    var dot = document.createElement("span");
    dot.className = "classroom-status-dot";
    dot.setAttribute("aria-hidden", "true");

    var kicker = document.createElement("span");
    kicker.className = "classroom-status-kicker";
    kicker.textContent = "matchaxmoxie";

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
      '<p id="cookie-consent-title" class="cookie-consent-title">Want a cookie?</p>' +
      '<p id="cookie-consent-desc" class="cookie-consent-desc">' +
      "Say yes and this device remembers your seat, Scratch starter, and footprint checks. " +
      "One tiny first-party cookie. No tracking." +
      "</p>" +
      '<div class="cookie-consent-actions">' +
      '<button type="button" class="cookie-consent-accept" id="cookie-consent-accept">Yes, please</button>' +
      '<button type="button" class="cookie-consent-decline" id="cookie-consent-decline">Just looking</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(banner);
    return banner;
  }

  function tabAriaLabel(consent) {
    if (consent === "accepted") {
      return "Cookie settings · remembering picks on this device";
    }
    if (consent === "declined") {
      return "Cookie settings · this visit only, not remembering";
    }
    return "Cookie settings";
  }

  function setTabVisual(tab, suffix) {
    var label = suffix ? "Cookie · " + suffix : "Cookie";
    tab.innerHTML =
      '<span aria-hidden="true">🍪</span> <span class="cookie-consent-tab-label">' +
      label +
      "</span>";
  }

  function syncTabState(tab) {
    if (!tab) return;
    var consent = readConsent();
    tab.classList.remove(
      "cookie-consent-tab--accepted",
      "cookie-consent-tab--declined",
      "cookie-consent-tab--undecided"
    );
    if (consent === "accepted") {
      tab.classList.add("cookie-consent-tab--accepted");
      setTabVisual(tab, "on");
    } else if (consent === "declined") {
      tab.classList.add("cookie-consent-tab--declined");
      setTabVisual(tab, "off");
    } else {
      tab.classList.add("cookie-consent-tab--undecided");
      setTabVisual(tab, "");
    }
    tab.setAttribute("aria-label", tabAriaLabel(consent));
  }

  function buildCookieTab() {
    var existing = document.getElementById("cookie-consent-tab");
    if (existing) return existing;

    var tab = document.createElement("button");
    tab.type = "button";
    tab.id = "cookie-consent-tab";
    tab.className = "cookie-consent-tab";
    tab.setAttribute("aria-controls", "cookie-consent");
    tab.setAttribute("aria-expanded", "false");
    tab.hidden = true;
    syncTabState(tab);
    document.body.appendChild(tab);
    return tab;
  }

  function showTab(tab) {
    if (!tab) return;
    syncTabState(tab);
    tab.hidden = false;
    tab.setAttribute("aria-expanded", "false");
    tab.classList.remove("cookie-consent-tab--nudge");
    if (prefersReducedMotion()) {
      tab.classList.add("is-visible");
      return;
    }
    window.requestAnimationFrame(function () {
      tab.classList.add("is-visible");
      tab.classList.add("cookie-consent-tab--nudge");
      window.setTimeout(function () {
        tab.classList.remove("cookie-consent-tab--nudge");
      }, 1600);
    });
  }

  function hideTab(tab) {
    if (!tab) return;
    tab.classList.remove("is-visible", "cookie-consent-tab--nudge");
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
        syncTabState(tab);
        closeBanner(banner, tab, true);
        showSaveToast("Cookie saved. Your seat is remembered.");
      });
    }
    if (declineBtn) {
      declineBtn.addEventListener("click", function () {
        writeConsent("declined");
        syncTabState(tab);
        closeBanner(banner, tab, true);
      });
    }

    tab.addEventListener("click", function () {
      openBanner(banner, tab, true);
    });

    banner.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !banner.hidden) {
        e.preventDefault();
        // Close only; do not silently write declined when still undecided
        closeBanner(banner, tab, true);
      }
    });

    window.MatchaxConsent.onChange(function () {
      syncTabState(tab);
    });

    if (consent === null) {
      openBanner(banner, tab, true);
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
    initEggs();
  }

  function initEggs() {
    var MATCHA = "#006b45";
    var buffer = "";
    var fired = {};
    var BUFFER_MAX = 24;
    var reduce = prefersReducedMotion();

    console.log(
      "%c🍵 matchaxmoxie · phoenix classroom · same person, other doors",
      "color:" + MATCHA + ";font-size:14px;font-weight:600"
    );
    console.log(
      "%chidden paths: type dragon · duck · essay (keyboard, not in a text field)",
      "color:" + MATCHA + ";font-size:11px"
    );

    var DOORS = {
      dragon: {
        label: "SWE proof · jadewowgreen",
        url: "https://jadexzhao.github.io/jadexzhao/",
      },
      duck: {
        label: "Duck farm sandbox",
        url: "https://jadexzhao.github.io/jadexzhao/duck-farm/",
      },
      essay: {
        label: "Essays · zhao-langxi",
        url: "https://zhao-langxi.github.io/zhao-langxi/",
      },
    };

    function ensureEggToast() {
      var el = document.getElementById("door-egg-toast");
      if (el) return el;
      el = document.createElement("p");
      el.id = "door-egg-toast";
      el.className = "door-egg-toast cookie-save-toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.hidden = true;
      document.body.appendChild(el);
      return el;
    }

    function showEggToast(doorKey) {
      var door = DOORS[doorKey];
      if (!door) return;
      var el = ensureEggToast();
      el.innerHTML =
        door.label +
        ' · <a href="' +
        door.url +
        '" rel="noopener noreferrer">' +
        door.url.replace(/^https:\/\//, "") +
        "</a>";
      el.hidden = false;
      el.classList.add("is-visible");
      window.setTimeout(function () {
        el.classList.remove("is-visible");
        window.setTimeout(function () {
          el.hidden = true;
        }, reduce ? 0 : 280);
      }, 3200);
    }

    function fireOnce(key) {
      if (fired[key]) return;
      fired[key] = true;
      showEggToast(key);
      window.setTimeout(function () {
        fired[key] = false;
      }, 4000);
    }

    function isTypingContext(target) {
      if (!target || !target.tagName) return false;
      var tag = target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return true;
      if (target.isContentEditable) return true;
      return false;
    }

    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingContext(e.target)) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-BUFFER_MAX);
      Object.keys(DOORS).forEach(function (word) {
        if (buffer.endsWith(word)) fireOnce(word);
      });
    });

    var phoenix = document.querySelector(".egg-phoenix");
    if (phoenix) {
      var lastTap = 0;
      phoenix.addEventListener("click", function () {
        var now = Date.now();
        if (now - lastTap < 420) fireOnce("essay");
        lastTap = now;
      });
      phoenix.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fireOnce("dragon");
        }
      });
    }
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
    ".photo-frame:not(.photo-frame--desk)",
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
