/**
 * matchaxmoxie · 站内 Scratch 播放器
 * 用 TurboWarp Scaffolding（scaffolding-min.js）同域 fetch .sb3。
 * 重建说明见同目录 README.md（简体中文）。
 */
(function () {
  "use strict";

  var PROJECTS = {
    jumping: {
      title: "Jumping Game",
      file: "scratch-projects/jumping-game.sb3",
      howto: "scratch-studio.html#jumping",
      controls: "Space to jump · ← → to move",
      tip: "After green flag, click the stage (or empty page) so Space reaches the game, not the buttons.",
      running: "Running. Space jumps · ← → move. Stop pauses.",
      needsKeys: true,
    },
    catch: {
      title: "Catch Game",
      file: "scratch-projects/catch-game.sb3",
      howto: "scratch-studio.html#catch",
      controls: "← → to slide the catcher",
      tip: "After green flag, click the stage so arrow keys reach the game.",
      running: "Running. ← → move the catcher. Stop pauses.",
      needsKeys: true,
    },
    pong: {
      title: "Pong",
      file: "scratch-projects/pong-game.sb3",
      howto: "scratch-studio.html#pong",
      controls: "Mouse to aim the paddle · or ← →",
      tip: "Move the mouse over the stage, or click the stage first if you use arrow keys.",
      running: "Running. Mouse or ← → for the paddle. Stop pauses.",
      needsKeys: true,
    },
    clicker: {
      title: "Clicker",
      file: "scratch-projects/clicker-game.sb3",
      howto: "scratch-studio.html#clicker",
      controls: "Click the main sprite for points · click upgrade when you can afford it",
      tip: "No keyboard needed. Click on the stage sprites.",
      running: "Running. Click the sprite · buy the upgrade. Stop pauses.",
      needsKeys: false,
    },
    scroll: {
      title: "Scrolling Background",
      file: "scratch-projects/scrolling-background.sb3",
      howto: "scratch-studio.html#scroll",
      controls: "Green flag runs the loop · watch the ground scroll",
      tip: "Mostly watch-mode. Optional remix later: hold right arrow in Scratch.",
      running: "Running. Watch the scroll. Stop pauses.",
      needsKeys: false,
    },
    pet: {
      title: "Virtual Pet",
      file: "scratch-projects/virtual-pet.sb3",
      howto: "scratch-studio.html#pet",
      controls: "Click Feed · Play · Rest on the stage",
      tip: "No keyboard. Tap the buttons on the stage.",
      running: "Running. Click Feed, Play, or Rest. Stop pauses.",
      needsKeys: false,
    },
    story: {
      title: "Story",
      file: "scratch-projects/story.sb3",
      howto: "scratch-studio.html#story",
      controls: "Green flag starts the scenes · click choices when they appear",
      tip: "Watch first. Click choice sprites when the story asks.",
      running: "Running. Watch scenes · click choices if you see them. Stop pauses.",
      needsKeys: false,
    },
    character: {
      title: "Character Designer",
      file: "scratch-projects/character-designer.sb3",
      howto: "scratch-studio.html#character",
      controls: "Click the cycle buttons for body · hat · shirt",
      tip: "No keyboard. Click the buttons on the stage to change looks.",
      running: "Running. Click the cycle buttons. Stop pauses.",
      needsKeys: false,
    },
  };

  var scaffolding = null;
  var currentKey = null;
  var loadToken = 0;

  function qs(id) {
    return document.getElementById(id);
  }

  function queryProject() {
    try {
      var key = new URLSearchParams(window.location.search).get("project");
      if (key && PROJECTS[key]) return key;
    } catch (_e) {
      /* ignore */
    }
    return "jumping";
  }

  function setStatus(text, isError) {
    var el = qs("scratch-player-status");
    if (!el) return;
    el.textContent = text;
    el.classList.toggle("scratch-player-status--error", !!isError);
  }

  function setControlsEnabled(ready) {
    var flag = qs("scratch-green-flag");
    var stop = qs("scratch-stop-all");
    if (flag) flag.disabled = !ready;
    if (stop) stop.disabled = !ready;
  }

  /**
   * TurboWarp Scaffolding only posts keyboard IO when focus is on
   * document/body. After Green flag / Stop, blur the button so Space
   * and arrows reach the VM (needed for Jumping Game, etc.).
   */
  function releaseKeyboardFocus() {
    var active = document.activeElement;
    if (active && active !== document.body && typeof active.blur === "function") {
      active.blur();
    }
  }

  function syncHowto(proj) {
    var controls = qs("scratch-howto-controls");
    var tip = qs("scratch-howto-tip");
    if (controls) {
      controls.innerHTML =
        "<strong>This starter:</strong> " + (proj.controls || "Green flag to run.");
    }
    if (tip) {
      tip.textContent = proj.tip || "";
      tip.hidden = !proj.tip;
    }
  }

  function syncChrome(key) {
    var proj = PROJECTS[key];
    if (!proj) return;

    var title = qs("scratch-play-title");
    var lede = qs("scratch-play-lede");
    var download = qs("scratch-pick-download");
    var howto = qs("scratch-pick-go");
    var stageLabel = qs("scratch-stage");

    if (title) title.textContent = proj.title + " playground";
    if (lede) {
      lede.textContent =
        proj.title +
        ". Wait for ready, then green flag. " +
        (proj.controls || "Controls are above the stage.");
    }
    syncHowto(proj);
    if (download) {
      download.href = proj.file;
      download.setAttribute("download", "");
      download.textContent = "Download " + proj.title + " (.sb3) to remix offline";
    }
    if (howto) {
      howto.href = proj.howto;
      howto.textContent = "Rebuild steps for " + proj.title + " →";
    }
    if (stageLabel) {
      stageLabel.setAttribute("aria-label", proj.title + " stage");
    }

    document.querySelectorAll(".scratch-pick-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-project") === key;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try {
      if (window.history && window.history.replaceState) {
        var url = new URL(window.location.href);
        url.searchParams.set("project", key);
        window.history.replaceState({}, "", url.toString());
      }
    } catch (_e) {
      /* ignore */
    }
  }

  function ensureScaffolding() {
    if (scaffolding) return scaffolding;
    if (typeof Scaffolding === "undefined" || !Scaffolding.Scaffolding) {
      throw new Error("Player engine did not load. Refresh, or try another browser.");
    }
    scaffolding = new Scaffolding.Scaffolding();
    scaffolding.width = 480;
    scaffolding.height = 360;
    scaffolding.resizeMode = "preserve-ratio";
    scaffolding.setup();
    var stage = qs("scratch-stage");
    if (!stage) throw new Error("Missing stage container.");
    scaffolding.appendTo(stage);
    return scaffolding;
  }

  function loadProject(key) {
    var proj = PROJECTS[key];
    if (!proj) return;

    currentKey = key;
    syncChrome(key);
    setControlsEnabled(false);
    setStatus("Loading " + proj.title + "…", false);

    var token = ++loadToken;
    var sc;
    try {
      sc = ensureScaffolding();
    } catch (err) {
      setStatus(err.message || "Could not start the player.", true);
      return;
    }

    fetch(proj.file, { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Could not fetch the starter file (" + res.status + ").");
        }
        return res.arrayBuffer();
      })
      .then(function (buffer) {
        if (token !== loadToken) return null;
        return sc.loadProject(buffer);
      })
      .then(function () {
        if (token !== loadToken) return;
        setControlsEnabled(true);
        setStatus(
          proj.title + " ready. Press green flag, then use: " + proj.controls,
          false
        );
      })
      .catch(function (err) {
        if (token !== loadToken) return;
        setControlsEnabled(false);
        setStatus(
          (err && err.message) || "Could not load this starter. Try download to remix offline.",
          true
        );
      });
  }

  function init() {
    var stage = qs("scratch-stage");
    if (!stage) return;

    var flag = qs("scratch-green-flag");
    var stop = qs("scratch-stop-all");

    if (flag) {
      flag.addEventListener("click", function () {
        if (!scaffolding || !currentKey) return;
        var proj = PROJECTS[currentKey];
        scaffolding.greenFlag();
        setStatus(
          (proj && proj.running) || "Running. Stop pauses.",
          false
        );
        if (proj && proj.needsKeys) {
          releaseKeyboardFocus();
        }
      });
    }
    if (stop) {
      stop.addEventListener("click", function () {
        if (!scaffolding) return;
        scaffolding.stopAll();
        setStatus("Stopped. Green flag to run again.", false);
        releaseKeyboardFocus();
      });
    }

    document.querySelectorAll(".scratch-pick-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-project");
        if (key && PROJECTS[key] && key !== currentKey) {
          loadProject(key);
        }
      });
    });

    setControlsEnabled(false);
    loadProject(queryProject());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
