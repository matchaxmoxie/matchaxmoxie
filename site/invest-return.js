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
          body: "Play a starter on this site. Green flag, then the controls above the stage.",
          href: "scratch-play.html?project=jumping",
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
    var planProgress = document.getElementById("situation-plan-progress");
    var planList = document.getElementById("situation-plan-steps");
    var startLink = document.getElementById("situation-start-link");
    var pathLink = document.getElementById("situation-path-link");
    var pickStatus = document.getElementById("situation-pick-status");
    var saved = loadJson("situation", null);
    var restoringSaved = false;

    function renderPlan(key) {
      var data = SITUATIONS[key];
      if (!data || !planEl || !planList || !planTitle) return;

      var first = data.steps[0];
      planTitle.textContent = restoringSaved
        ? "Welcome back · " + data.label
        : "Got it · " + data.label;
      if (planProgress) {
        planProgress.textContent =
          "3 steps for your spot · start with step 1";
      }
      planList.innerHTML = "";
      data.steps.forEach(function (step, i) {
        var li = document.createElement("li");
        var strong = document.createElement("strong");
        strong.textContent = "Step " + (i + 1) + " · " + step.title;
        li.appendChild(strong);
        li.appendChild(document.createTextNode(step.body));
        planList.appendChild(li);
      });

      planEl.hidden = false;
      if (startLink && first) {
        startLink.href = first.href;
        startLink.textContent = "Start step 1 · " + first.title + " →";
      }
      if (pathLink) {
        pathLink.href = "student-path.html#advice-funnel";
        pathLink.textContent = "Full student path (optional)";
      }
      if (pickStatus) {
        pickStatus.textContent = restoringSaved
          ? "Saved pick restored · " + data.label
          : "Selected · " + data.label;
      }
      root.querySelectorAll(".situation-btn").forEach(function (btn) {
        var active = btn.getAttribute("data-situation") === key;
        btn.setAttribute("aria-pressed", active ? "true" : "false");
        var mark = btn.querySelector(".open-pick-selected");
        if (mark) mark.hidden = !active;
      });
      saveJson("situation", key);
      if (!restoringSaved) {
        scrollToEl(planEl);
        if (startLink && typeof startLink.focus === "function") {
          try {
            startLink.focus({ preventScroll: true });
          } catch (_e) {
            startLink.focus();
          }
        }
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

  /* ── 4. Scratch studio picker（站内 play 为主；playground 由 player.js 负责）── */
  var SCRATCH_PROJECTS = {
    jumping: {
      title: "Jumping Game",
      get: "A character that jumps with the space bar and lands on platforms.",
      why: "Best first game if you want something that moves right away.",
      href: "scratch-studio.html#jumping",
      file: "scratch-projects/jumping-game.sb3",
      pathHref: "informatics-class-of-2027.html#early-heading",
      pathLabel: "Pair with AP notes on the IU guide →",
    },
    catch: {
      title: "Catch Game",
      get: "A catcher that scoops falling items before they hit the ground.",
      why: "Great practice for forever loops and touching.",
      href: "scratch-studio.html#catch",
      file: "scratch-projects/catch-game.sb3",
      pathHref: "freshman.html",
      pathLabel: "See how early Luddy courses feel →",
    },
    pong: {
      title: "Pong",
      get: "A paddle and a bouncing ball you can play right away.",
      why: "Classic bounce logic without a huge sprite list.",
      href: "scratch-studio.html#pong",
      file: "scratch-projects/pong-game.sb3",
    },
    clicker: {
      title: "Clicker",
      get: "A score that goes up when you click, plus one upgrade.",
      why: "Variables click faster here than in a long story project.",
      href: "scratch-studio.html#clicker",
      file: "scratch-projects/clicker-game.sb3",
    },
    scroll: {
      title: "Scrolling Background",
      get: "Ground that loops so your hero feels like it is running.",
      why: "Nice when you already like motion and want a world that moves.",
      href: "scratch-studio.html#scroll",
      file: "scratch-projects/scrolling-background.sb3",
    },
    pet: {
      title: "Virtual Pet",
      get: "A pet that gets hungry over time, plus feed, play, and rest.",
      why: "State and buttons without needing perfect art.",
      href: "scratch-studio.html#pet",
      file: "scratch-projects/virtual-pet.sb3",
    },
    story: {
      title: "Story",
      get: "A three-scene mini story with one choice that branches.",
      why: "If you like writing more than platformers, start here.",
      href: "scratch-studio.html#story",
      file: "scratch-projects/story.sb3",
      pathHref: "footprint.html#bucket",
      pathLabel: "Ideas for what to try before you graduate →",
    },
    character: {
      title: "Character Designer",
      get: "A dress-up station: body, hat, and shirt layers you cycle.",
      why: "Low pressure art practice before you build a game.",
      href: "scratch-studio.html#character",
      file: "scratch-projects/character-designer.sb3",
    },
  };

  function initScratchPicker() {
    /* playground 页由 scratch-player/player.js 接管，避免双绑 */
    if (document.getElementById("scratch-stage")) return;

    var root = document.getElementById("scratch-project-picker");
    if (!root) return;

    var reveal = document.getElementById("scratch-pick-reveal");
    var getLine = document.getElementById("scratch-pick-get");
    var whyLine = document.getElementById("scratch-pick-why");
    var pathLine = document.getElementById("scratch-pick-path");
    var goLink = document.getElementById("scratch-pick-go");
    var playLink = document.getElementById("scratch-pick-play");
    var downloadLink = document.getElementById("scratch-pick-download");
    var welcomeBack = document.getElementById("scratch-welcome-back");
    var saved = loadJson("scratch-pick", null);
    var currentKey = null;
    var restoring = false;

    function selectProject(key, opts) {
      var proj = SCRATCH_PROJECTS[key];
      if (!proj) return;
      opts = opts || {};
      currentKey = key;

      root.querySelectorAll(".scratch-pick-btn").forEach(function (btn) {
        var active = btn.getAttribute("data-project") === key;
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (reveal) reveal.hidden = false;
      if (getLine) {
        getLine.textContent = "What you get: " + proj.get;
        getLine.hidden = false;
      }
      if (whyLine) {
        whyLine.textContent = "Why this one: " + proj.why;
        whyLine.hidden = false;
      }
      if (pathLine) {
        if (proj.pathHref && proj.pathLabel) {
          pathLine.hidden = false;
          pathLine.innerHTML =
            '<a href="' + proj.pathHref + '">' + proj.pathLabel + "</a>";
        } else {
          pathLine.hidden = true;
          pathLine.textContent = "";
        }
      }
      if (playLink) {
        playLink.href = "scratch-play.html?project=" + encodeURIComponent(key);
        playLink.removeAttribute("target");
        playLink.removeAttribute("rel");
        playLink.textContent = "Play on this site";
      }
      if (downloadLink) {
        downloadLink.href = proj.file;
        downloadLink.setAttribute("download", "");
        downloadLink.textContent =
          "Download " + proj.title + " (.sb3) to remix offline";
      }
      if (goLink) {
        goLink.href = "#" + key;
        goLink.textContent = "Open the " + proj.title + " how-to →";
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
        if (!opts.skipScroll && !restoring) {
          scrollToEl(reveal || card);
        }
      } else if (!opts.skipScroll && !restoring) {
        scrollToEl(reveal);
      }
    }

    root.querySelectorAll(".scratch-pick-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        restoring = false;
        if (welcomeBack) welcomeBack.hidden = true;
        selectProject(btn.getAttribute("data-project"));
      });
    });

    if (saved && SCRATCH_PROJECTS[saved]) {
      restoring = true;
      if (welcomeBack) {
        welcomeBack.hidden = false;
        welcomeBack.textContent =
          "Welcome back · your last starter was " +
          SCRATCH_PROJECTS[saved].title +
          ".";
      }
      selectProject(saved, { skipScroll: true });
      restoring = false;
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
