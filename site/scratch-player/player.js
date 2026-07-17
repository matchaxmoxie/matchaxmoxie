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
    },
    catch: {
      title: "Catch Game",
      file: "scratch-projects/catch-game.sb3",
      howto: "scratch-studio.html#catch",
    },
    pong: {
      title: "Pong",
      file: "scratch-projects/pong-game.sb3",
      howto: "scratch-studio.html#pong",
    },
    clicker: {
      title: "Clicker",
      file: "scratch-projects/clicker-game.sb3",
      howto: "scratch-studio.html#clicker",
    },
    scroll: {
      title: "Scrolling Background",
      file: "scratch-projects/scrolling-background.sb3",
      howto: "scratch-studio.html#scroll",
    },
    pet: {
      title: "Virtual Pet",
      file: "scratch-projects/virtual-pet.sb3",
      howto: "scratch-studio.html#pet",
    },
    story: {
      title: "Story",
      file: "scratch-projects/story.sb3",
      howto: "scratch-studio.html#story",
    },
    character: {
      title: "Character Designer",
      file: "scratch-projects/character-designer.sb3",
      howto: "scratch-studio.html#character",
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
        "Plays on this site. Green flag to start, red stop to pause. Download if you want to remix offline.";
    }
    if (download) {
      download.href = proj.file;
      download.setAttribute("download", "");
      download.textContent = "Download " + proj.title + " (.sb3) to remix offline";
    }
    if (howto) {
      howto.href = proj.howto;
      howto.textContent = "Open the " + proj.title + " how-to on the studio page →";
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
        setStatus(proj.title + " is ready. Press green flag to play.", false);
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
        if (!scaffolding) return;
        scaffolding.greenFlag();
        setStatus("Running. Red stop pauses all scripts.", false);
      });
    }
    if (stop) {
      stop.addEventListener("click", function () {
        if (!scaffolding) return;
        scaffolding.stopAll();
        setStatus("Stopped. Green flag to run again.", false);
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
