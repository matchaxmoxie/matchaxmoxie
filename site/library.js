/**
 * matchaxmoxie · learning library filter
 * Reads library.json (real pages only). Falls back to the static list in HTML.
 * No invented times or difficulty.
 */
(function () {
  "use strict";

  var list = document.getElementById("library-list");
  var search = document.getElementById("library-search");
  var filters = document.getElementById("library-filters");
  var status = document.getElementById("library-status");
  if (!list) return;

  var KIND_LABEL = {
    videos: "I211 videos",
    notes: "Course notes",
    handoffs: "Handoffs",
    lessons: "Lessons",
    notebook: "Notebook",
    explore: "Explore",
  };
  var STATUS_LABEL = {
    ready: "",
    placeholder: "Embeds not ready",
    "pdf-missing": "PDF still to export",
  };

  var items = [];
  var kind = "all";
  var query = "";

  function textOf(item) {
    return [item.title, item.summary, item.topic, item.term, item.kind]
      .join(" ")
      .toLowerCase();
  }

  function card(item) {
    var meta = [];
    if (item.term) meta.push(item.term);
    if (item.topic) meta.push(item.topic);
    meta.push(KIND_LABEL[item.kind] || item.kind);
    var flag = STATUS_LABEL[item.status] || "";
    var extra = flag
      ? '<span class="library-card__flag">' + flag + "</span>"
      : "";
    return (
      '<li class="library-card" data-kind="' +
      item.kind +
      '">' +
      '<a href="' +
      item.path +
      '">' +
      '<span class="library-card__kicker">' +
      meta.join(" · ") +
      "</span>" +
      "<strong>" +
      item.title +
      "</strong>" +
      "<span>" +
      item.summary +
      "</span>" +
      extra +
      "</a></li>"
    );
  }

  function visible() {
    return items.filter(function (item) {
      if (kind !== "all" && item.kind !== kind) return false;
      if (query && textOf(item).indexOf(query) === -1) return false;
      return true;
    });
  }

  function render() {
    var shown = visible();
    list.innerHTML = shown.map(card).join("");
    if (status) {
      status.textContent =
        shown.length +
        " of " +
        items.length +
        " pages in this archive" +
        (kind === "all" && !query ? "" : " · filtered");
    }
  }

  function readStatic() {
    var cards = list.querySelectorAll("[data-kind]");
    var found = [];
    cards.forEach(function (el) {
      var link = el.querySelector("a");
      if (!link) return;
      found.push({
        title: (el.querySelector("strong") || link).textContent.trim(),
        path: link.getAttribute("href") || "",
        kind: el.getAttribute("data-kind") || "notes",
        topic: el.getAttribute("data-topic") || "",
        term: el.getAttribute("data-term") || "",
        summary: (el.querySelector(".library-card__dek") || {}).textContent || "",
        status: el.getAttribute("data-status") || "ready",
      });
    });
    return found;
  }

  function setPressed() {
    if (!filters) return;
    filters.querySelectorAll("[data-kind-filter]").forEach(function (btn) {
      var on = btn.getAttribute("data-kind-filter") === kind;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-kind-filter]");
      if (!btn) return;
      kind = btn.getAttribute("data-kind-filter") || "all";
      setPressed();
      render();
    });
  }

  if (search) {
    search.addEventListener("input", function () {
      query = (search.value || "").trim().toLowerCase();
      render();
    });
  }

  items = readStatic();
  setPressed();
  if (status && items.length) {
    status.textContent = items.length + " of " + items.length + " pages in this archive";
  }

  var dataUrl = list.getAttribute("data-src") || "library.json";
  fetch(dataUrl, { credentials: "same-origin" })
    .then(function (res) {
      if (!res.ok) throw new Error("library.json missing");
      return res.json();
    })
    .then(function (data) {
      if (data && data.items && data.items.length) {
        items = data.items;
        render();
      }
    })
    .catch(function () {
      /* keep the static HTML list */
    });
})();
