/**
 * matchaxmoxie · green-flag classroom demo (vanilla)
 * Ask → try → revise. No Scratch MIT embed required.
 */
(function () {
  "use strict";

  var stage = document.getElementById("stage");
  var say = document.getElementById("say");
  var flag = document.getElementById("green-flag");
  var stop = document.getElementById("stop-all");
  var sprite = document.querySelector(".sprite");
  if (!stage || !say || !flag) return;

  var runId = 0;

  function setSay(html) {
    say.innerHTML = html;
  }

  function setRunning(on) {
    stage.classList.toggle("is-running", on);
    if (sprite) sprite.classList.toggle("is-hopping", on);
    if (stop) stop.disabled = !on;
  }

  function stopRun() {
    runId += 1;
    setRunning(false);
    setSay("<p>Stopped. Press the green flag to ask again.</p>");
  }

  function showAsk(token) {
    setSay(
      "<p class=\"ask-prompt\">What should happen when the name box is empty?</p>" +
        "<form class=\"ask\" id=\"scratch-ask-form\">" +
        "<label for=\"scratch-answer\">Your answer</label>" +
        "<input id=\"scratch-answer\" name=\"answer\" autocomplete=\"off\" maxlength=\"120\">" +
        "<button type=\"submit\">answer</button>" +
        "</form>"
    );
    var form = document.getElementById("scratch-ask-form");
    var input = document.getElementById("scratch-answer");
    if (input) input.focus();
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (token !== runId) return;
      var value = input && input.value ? input.value.trim() : "";
      reply(token, value);
    });
  }

  function reply(token, value) {
    if (token !== runId) return;
    if (!value) {
      setSay(
        "<p><strong>The box is empty.</strong> That is a costume with nothing in it.</p>" +
          "<p class=\"ask-next\">Revise: change one thing, then run the green flag again.</p>"
      );
    } else {
      setSay(
        "<p>You said: <strong>" +
          escapeHtml(value) +
          "</strong>.</p>" +
          "<p class=\"ask-next\">Next: change one thing and run the flag again. Expectation versus what actually ran.</p>"
      );
    }
    window.setTimeout(function () {
      if (token !== runId) return;
      setRunning(false);
    }, 1600);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  flag.addEventListener("click", function () {
    runId += 1;
    var token = runId;
    setRunning(true);
    setSay("<p>when green flag clicked...</p>");
    window.setTimeout(function () {
      if (token !== runId) return;
      showAsk(token);
    }, 280);
  });

  if (stop) {
    stop.disabled = true;
    stop.addEventListener("click", stopRun);
  }
})();
