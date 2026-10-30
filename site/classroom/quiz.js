/**
 * Accessible knowledge check. Answers live in the form as data-answer.
 * Explains why. Does not claim a grade or a verified skill.
 */
(function () {
  "use strict";

  function init() {
    var form = document.querySelector("[data-lesson-quiz]");
    if (!form) return;
    var status = document.getElementById("quiz-status");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var items = form.querySelectorAll("fieldset[data-answer]");
      var correct = 0;
      var total = items.length;
      items.forEach(function (field) {
        var answer = field.getAttribute("data-answer");
        var picked = field.querySelector("input[type='radio']:checked");
        var why = field.querySelector(".quiz-why");
        var ok = !!(picked && picked.value === answer);
        if (ok) correct += 1;
        if (why) {
          why.hidden = false;
        }
        field.classList.toggle("quiz-item--ok", ok);
        field.classList.toggle("quiz-item--miss", !ok);
      });
      if (status) {
        status.textContent =
          correct +
          " of " +
          total +
          " answered as the lesson key. Read the notes under each question. This is practice, not a certificate.";
      }
      if (correct === total) {
        document.dispatchEvent(new CustomEvent("matchax-quiz-pass"));
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
