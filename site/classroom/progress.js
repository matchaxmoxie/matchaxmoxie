/**
 * Optional same-tab progress. sessionStorage only. No account. No cookie.
 */
(function () {
  "use strict";

  var KEY = "matchax-lesson-progress";

  function read() {
    try {
      return JSON.parse(sessionStorage.getItem(KEY) || "{}");
    } catch (_e) {
      return {};
    }
  }

  function write(data) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(data));
    } catch (_e) {
      /* private mode */
    }
  }

  function mark(flag) {
    var root = document.querySelector("[data-lesson-id]");
    if (!root) return;
    var id = root.getAttribute("data-lesson-id");
    if (!id) return;
    var data = read();
    data[id] = data[id] || {};
    data[id][flag] = true;
    data[id].updated = new Date().toISOString();
    write(data);
    var chip = document.getElementById("lesson-progress");
    if (chip) {
      chip.hidden = false;
      chip.textContent =
        "Saved for this browser tab: " +
        (data[id].exercise ? "exercise ran" : "opened") +
        (data[id].quiz ? " · quiz checked" : "") +
        ". Close the tab to clear.";
    }
  }

  document.addEventListener("matchax-lesson-pass", function () {
    mark("exercise");
  });
  document.addEventListener("matchax-quiz-pass", function () {
    mark("quiz");
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      mark("opened");
    });
  } else {
    mark("opened");
  }
})();
