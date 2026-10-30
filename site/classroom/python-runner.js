/**
 * Browser Python runner for matchaxmoxie lessons.
 * Loads Pyodide only after the learner asks to run code.
 * No backend. No account. Output comes from a real interpreter.
 */
(function () {
  "use strict";

  var PYODIDE_VERSION = "0.27.7";
  var PYODIDE_BASE =
    "https://cdn.jsdelivr.net/pyodide/v" + PYODIDE_VERSION + "/full/";
  var loadPromise = null;
  var lastResult = null;

  function $(id) {
    return document.getElementById(id);
  }

  function setStatus(el, text, isError) {
    if (!el) return;
    el.textContent = text;
    el.classList.toggle("is-error", !!isError);
  }

  function explainError(message) {
    var text = String(message || "");
    if (text.indexOf("NameError") !== -1) {
      return (
        text +
        "\n\nNameError usually means Python saw a name that was never assigned. " +
        "If you meant text, put quotes around it: \"matcha\" not matcha."
      );
    }
    if (text.indexOf("SyntaxError") !== -1) {
      return (
        text +
        "\n\nSyntaxError means the line is not valid Python. Check quotes, " +
        "parentheses, and that each string is opened and closed."
      );
    }
    if (text.indexOf("IndentationError") !== -1) {
      return (
        text +
        "\n\nIndentationError means spaces at the start of a line do not match. " +
        "This first lesson should not need extra spaces at the left."
      );
    }
    return text;
  }

  function loadEngine(statusEl) {
    if (loadPromise) return loadPromise;
    setStatus(statusEl, "Loading Python in this browser. First load can take a moment.");
    loadPromise = new Promise(function (resolve, reject) {
      if (typeof window.loadPyodide === "function") {
        resolve();
        return;
      }
      var script = document.createElement("script");
      script.src = PYODIDE_BASE + "pyodide.js";
      script.async = true;
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        loadPromise = null;
        reject(new Error("Could not load Pyodide from the public CDN."));
      };
      document.head.appendChild(script);
    }).then(function () {
      return window.loadPyodide({ indexURL: PYODIDE_BASE });
    });
    return loadPromise;
  }

  function printedLines(stdout) {
    return String(stdout || "")
      .split(/\r?\n/)
      .map(function (line) {
        return line.trim();
      })
      .filter(function (line) {
        return line.length > 0;
      });
  }

  function checkWork(spec, result) {
    if (!result || !result.ran) {
      return {
        pass: false,
        message: "Run the programme first. The check uses the real output, not a preview.",
      };
    }
    if (!result.ok) {
      return {
        pass: false,
        message: "Python reported an error. Read the output, change the code, then run again.",
      };
    }
    var lines = printedLines(result.stdout);
    var min = (spec && spec.minPrintedLines) || 1;
    if (lines.length < min) {
      return {
        pass: false,
        message:
          "Your programme ran, but it printed " +
          lines.length +
          " line(s). Print both stored values so two lines appear.",
      };
    }
    return {
      pass: true,
      message: "That ran in the browser. You printed " + lines.length + " line(s).",
    };
  }

  async function runCode(editor, output, statusEl, spec, checkEl) {
    var code = editor.value;
    lastResult = { ran: false, ok: false, stdout: "", stderr: "", code: code };
    output.textContent = "";
    setStatus(statusEl, "Running…");
    try {
      var pyodide = await loadEngine(statusEl);
      pyodide.runPython(
        "import sys\nfrom io import StringIO\n_mx_out = StringIO()\n_mx_err = StringIO()\nsys.stdout = _mx_out\nsys.stderr = _mx_err"
      );
      try {
        await pyodide.runPythonAsync(code);
        var stdout = pyodide.runPython("_mx_out.getvalue()");
        var stderr = pyodide.runPython("_mx_err.getvalue()");
        lastResult = {
          ran: true,
          ok: true,
          stdout: stdout,
          stderr: stderr,
          code: code,
        };
        output.textContent = stdout || "(Programme finished. Nothing was printed.)";
        setStatus(statusEl, "Finished. Output is from Pyodide " + PYODIDE_VERSION + " in this browser.");
      } catch (err) {
        var message = explainError(err && err.message ? err.message : err);
        lastResult = {
          ran: true,
          ok: false,
          stdout: "",
          stderr: message,
          code: code,
        };
        output.textContent = message;
        setStatus(statusEl, "Python reported an error.", true);
      }
    } catch (loadErr) {
      lastResult = {
        ran: false,
        ok: false,
        stdout: "",
        stderr: String(loadErr.message || loadErr),
        code: code,
      };
      output.textContent =
        "The in-browser Python engine did not load. Check your network, or copy the example into any local Python 3 install.\n\n" +
        lastResult.stderr;
      setStatus(statusEl, "Could not load the Python engine.", true);
    }
    if (checkEl && spec) {
      var verdict = checkWork(spec, lastResult);
      checkEl.textContent = verdict.message;
      checkEl.classList.toggle("is-pass", verdict.pass);
      checkEl.classList.toggle("is-error", !verdict.pass);
      if (verdict.pass) {
        document.dispatchEvent(
          new CustomEvent("matchax-lesson-pass", { detail: { id: spec.lessonId } })
        );
      }
    }
  }

  function init() {
    var root = document.querySelector("[data-python-playground]");
    if (!root) return;
    var editor = $("python-editor");
    var output = $("python-output");
    var statusEl = $("python-status");
    var checkEl = $("python-check");
    var runBtn = $("python-run");
    var resetBtn = $("python-reset");
    var loadBtn = $("python-load");
    if (!editor || !output || !runBtn) return;

    var starter = root.getAttribute("data-starter") || editor.value;
    var spec = { minPrintedLines: 2, lessonId: root.getAttribute("data-lesson-id") };
    var minAttr = root.getAttribute("data-min-lines");
    if (minAttr) spec.minPrintedLines = parseInt(minAttr, 10) || 2;

    function readyToType() {
      editor.removeAttribute("disabled");
      runBtn.removeAttribute("disabled");
      if (resetBtn) resetBtn.removeAttribute("disabled");
    }

    readyToType();

    if (loadBtn) {
      loadBtn.addEventListener("click", function () {
        loadBtn.disabled = true;
        loadEngine(statusEl)
          .then(function () {
            setStatus(statusEl, "Python is ready in this browser. Press Run when you want output.");
            readyToType();
            loadBtn.hidden = true;
          })
          .catch(function (err) {
            loadBtn.disabled = false;
            setStatus(statusEl, err.message || "Could not load Python.", true);
          });
      });
    }

    runBtn.addEventListener("click", function () {
      runBtn.disabled = true;
      loadEngine(statusEl)
        .then(function () {
          readyToType();
          if (loadBtn) loadBtn.hidden = true;
          return runCode(editor, output, statusEl, spec, checkEl);
        })
        .finally(function () {
          runBtn.disabled = false;
        });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        editor.value = starter;
        output.textContent = "";
        lastResult = null;
        if (checkEl) {
          checkEl.textContent = "";
          checkEl.classList.remove("is-pass", "is-error");
        }
        setStatus(statusEl, "Editor reset to the starter example.");
        editor.focus();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
