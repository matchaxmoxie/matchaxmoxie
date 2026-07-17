/**
 * matchaxmoxie · invest → return interactions
 * High school seniors: put attention in, get a clear payoff out.
 * localStorage only · no tracking · respects prefers-reduced-motion via CSS.
 */
(function () {
  "use strict";

  var STORAGE_PREFIX = "matchax-";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scrollToEl(el) {
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "nearest",
    });
  }

  function loadJson(key, fallback) {
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_e) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (_e) {
      /* quota or private mode */
    }
  }

  /* ── 1. Pick your situation → 3-step plan (index) ── */
  var SITUATIONS = {
    "ap-csp": {
      label: "AP CSP or curious about code",
      steps: [
        {
          title: "Start with AP notes",
          body: "See how AP Computer Science Principles maps to IU.",
          href: "informatics-class-of-2027.html#early-heading",
        },
        {
          title: "Ship a tiny Scratch game",
          body: "Download a starter, load it, press green flag.",
          href: "scratch-studio.html#jumping",
        },
        {
          title: "Peek freshman year",
          body: "Course names from my first year at Luddy.",
          href: "freshman.html",
        },
      ],
    },
    undecided: {
      label: "Undecided major · eyeing Informatics",
      steps: [
        {
          title: "Read official IU links first",
          body: "Bulletin, AP credit, registrar calendar. Live pages win.",
          href: "informatics-class-of-2027.html#official-links",
        },
        {
          title: "Explore career slides",
          body: "Learn about yourself before you pick a track.",
          href: "informatics-class-of-2027.html#career-slides",
        },
        {
          title: "Check the footprint list",
          body: "Five big life moves to try before you graduate.",
          href: "footprint.html#bucket",
        },
      ],
    },
    visiting: {
      label: "Visiting IU or already admitted",
      steps: [
        {
          title: "Campus survival vibes",
          body: "Archival Year '23 packing and welcome week notes.",
          href: "campus-survival.html",
        },
        {
          title: "FA26 to FA27 calendar",
          body: "Verify dates on the live registrar page.",
          href: "informatics-class-of-2027.html#official-links",
        },
        {
          title: "Four-year path peek",
          body: "Freshman through senior, including Madrid.",
          href: "junior.html",
        },
      ],
    },
  };

  function initSituationPicker() {
    var root = document.getElementById("situation-picker");
    if (!root) return;

    var planEl = document.getElementById("situation-plan");
    var planTitle = document.getElementById("situation-plan-title");
    var planList = document.getElementById("situation-plan-steps");
    var pathLink = document.getElementById("situation-path-link");
    var saved = loadJson("situation", null);
    var restoringSaved = false;

    function renderPlan(key) {
      var data = SITUATIONS[key];
      if (!data || !planEl || !planList || !planTitle) return;

      planTitle.textContent = restoringSaved
        ? "Welcome back · your saved plan · " + data.label
        : "Your 3-step plan · " + data.label;
      planList.innerHTML = "";
      data.steps.forEach(function (step, i) {
        var li = document.createElement("li");
        li.innerHTML =
          '<strong>Step ' +
          (i + 1) +
          " · " +
          step.title +
          "</strong>" +
          step.body +
          ' <a href="' +
          step.href +
          '">Go →</a>';
        planList.appendChild(li);
      });

      planEl.hidden = false;
      if (pathLink) {
        pathLink.href = "student-path.html#advice-funnel";
        pathLink.textContent = "Open the full student path →";
      }
      root.querySelectorAll(".situation-btn").forEach(function (btn) {
        var active = btn.getAttribute("data-situation") === key;
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
      saveJson("situation", key);
      if (!restoringSaved) {
        scrollToEl(planEl);
      }
    }

    root.querySelectorAll(".situation-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        restoringSaved = false;
        renderPlan(btn.getAttribute("data-situation"));
      });
    });

    if (saved && SITUATIONS[saved]) {
      restoringSaved = true;
      renderPlan(saved);
      restoringSaved = false;
    }
  }

  /* ── 2. Advice funnel · step X of 6 + reward (index) ── */
  var FUNNEL_LABELS = [
    "AP & never too early",
    "Official IU links",
    "Campus survival",
    "Four-year path peek",
    "Scratch studio",
    "Career progress slides",
  ];

  function initAdviceFunnel() {
    var funnel = document.getElementById("advice-funnel");
    if (!funnel) return;

    var progressBar = document.getElementById("advice-funnel-progress");
    var progressText = document.getElementById("advice-funnel-progress-text");
    var reward = document.getElementById("advice-funnel-reward");
    var rewardName = document.getElementById("advice-funnel-path-name");
    var downloadBtn = document.getElementById("advice-funnel-download");
    var items = funnel.querySelectorAll("li");
    var total = items.length;
    var done = loadJson("advice-funnel", []);

    if (!Array.isArray(done)) done = [];

    function updateProgress() {
      var count = done.length;
      var pct = total ? Math.round((count / total) * 100) : 0;

      if (progressBar) {
        progressBar.value = count;
        progressBar.max = total;
        progressBar.setAttribute("aria-valuenow", String(count));
        progressBar.setAttribute("aria-valuemax", String(total));
      }
      if (progressText) {
        progressText.textContent =
          count === total
            ? "You finished all " + total + " steps. Claim your plan below."
            : "You completed step " + count + " of " + total + ".";
      }

      items.forEach(function (li, i) {
        var checked = done.indexOf(i) !== -1;
        var cb = li.querySelector('input[type="checkbox"]');
        if (cb) cb.checked = checked;
        li.classList.toggle("advice-funnel__done", checked);
      });

      if (reward) {
        reward.hidden = count < total;
      }
      if (rewardName && count >= total) {
        rewardName.textContent =
          "Miss Zhao path · " + FUNNEL_LABELS.join(" → ");
      }
    }

    items.forEach(function (li, i) {
      var strong = li.querySelector("strong");
      var labelText = strong ? strong.textContent : "Step " + (i + 1);

      var wrap = document.createElement("label");
      wrap.className = "advice-funnel-check";

      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = "advice-step-" + i;
      cb.setAttribute(
        "aria-label",
        "Mark step " + (i + 1) + " done: " + labelText
      );

      cb.addEventListener("change", function () {
        var idx = done.indexOf(i);
        if (cb.checked && idx === -1) {
          done.push(i);
          done.sort(function (a, b) {
            return a - b;
          });
        } else if (!cb.checked && idx !== -1) {
          done.splice(idx, 1);
        }
        saveJson("advice-funnel", done);
        updateProgress();
      });

      var content = document.createElement("span");
      content.className = "advice-funnel-content";
      while (li.firstChild) {
        content.appendChild(li.firstChild);
      }

      wrap.appendChild(cb);
      wrap.appendChild(content);
      li.appendChild(wrap);
    });

    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        var lines = [
          "Miss Zhao · matchaxmoxie · your advice path",
          "https://matchaxmoxie.github.io/matchaxmoxie/",
          "",
          "Steps you marked done:",
        ];
        done.forEach(function (i) {
          lines.push((i + 1) + ". " + FUNNEL_LABELS[i]);
        });
        lines.push("");
        lines.push("Next: verify FA26 to FA27 on live IU pages.");
        lines.push("IG @zhao.langxi · builder site jadexzhao (龙 · dragon)");

        var blob = new Blob([lines.join("\n")], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "miss-zhao-advice-path.txt";
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    updateProgress();
  }

  /* ── 3. Footprint checklist · localStorage + claimed count ── */
  function initFootprintChecklist() {
    var list = document.querySelector(".footprint-page .coord-checklist");
    if (!list) return;

    var countEl = document.getElementById("footprint-claimed-count");
    var banner = document.getElementById("footprint-progress");
    var boxes = list.querySelectorAll('input[type="checkbox"]');
    var saved = loadJson("footprint", {});

    function updateCount() {
      var claimed = 0;
      boxes.forEach(function (cb) {
        if (cb.checked) claimed += 1;
      });
      if (countEl) {
        countEl.textContent = String(claimed);
      }
      if (banner) {
        banner.hidden = claimed === 0;
        var msg = banner.querySelector("[data-footprint-msg]");
        if (msg) {
          msg.textContent =
            claimed === boxes.length
              ? "All " + boxes.length + " prints claimed. You left a footprint."
              : claimed + " print" + (claimed === 1 ? "" : "s") + " claimed of " + boxes.length + ".";
        }
      }
    }

    boxes.forEach(function (cb) {
      var id = cb.id;
      if (saved[id]) cb.checked = true;

      cb.addEventListener("change", function () {
        saved[id] = cb.checked;
        saveJson("footprint", saved);
        updateCount();
      });
    });

    updateCount();
  }

  /* ── 4. Scratch studio · pick a project + what you get ── */
  var SCRATCH_PROJECTS = {
    jumping: {
      title: "Jumping Game",
      get: "A character that jumps with space bar and lands on platforms.",
      href: "#jumping",
    },
    catch: {
      title: "Catch Game",
      get: "A catcher sprite that scoops falling items before they hit the ground.",
      href: "#catch",
    },
    pong: {
      title: "Pong",
      get: "Two paddles and a bouncing ball you can play with a friend.",
      href: "#pong",
    },
    clicker: {
      title: "Clicker",
      get: "A score that goes up when you click. Simple variables practice.",
      href: "#clicker",
    },
  };

  function initScratchPicker() {
    var root = document.getElementById("scratch-project-picker");
    if (!root) return;

    var reveal = document.getElementById("scratch-pick-reveal");
    var getLine = document.getElementById("scratch-pick-get");
    var goLink = document.getElementById("scratch-pick-go");
    var saved = loadJson("scratch-pick", null);

    function selectProject(key) {
      var proj = SCRATCH_PROJECTS[key];
      if (!proj) return;

      root.querySelectorAll(".scratch-pick-btn").forEach(function (btn) {
        var active = btn.getAttribute("data-project") === key;
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (reveal) reveal.hidden = false;
      if (getLine) {
        getLine.textContent = "What you get: " + proj.get;
      }
      if (goLink) {
        goLink.href = proj.href;
        goLink.textContent = "Load " + proj.title + " starter →";
      }

      saveJson("scratch-pick", key);

      document.querySelectorAll(".howto-card--picked").forEach(function (card) {
        card.classList.remove("howto-card--picked");
      });
      var card = document.querySelector(
        '.howto-card[data-project="' + key + '"]'
      );
      if (card) {
        card.classList.add("howto-card--picked");
        scrollToEl(card);
      }
    }

    root.querySelectorAll(".scratch-pick-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectProject(btn.getAttribute("data-project"));
      });
    });

    if (saved && SCRATCH_PROJECTS[saved]) {
      selectProject(saved);
    }
  }

  function init() {
    initSituationPicker();
    initAdviceFunnel();
    initFootprintChecklist();
    initScratchPicker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
