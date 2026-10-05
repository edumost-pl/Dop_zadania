(function () {
  "use strict";

  var I18N = window.DOP_I18N;
  var TASKS = window.DOP_TASKS;
  var LANG_KEY = "dop-zadania-lang";
  var MISSION_LANG_KEY = "znajdz-blad-lang";
  var stage = document.getElementById("stage");
  var lang = "pl";

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function t() {
    return I18N[lang];
  }

  function loadLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY) || localStorage.getItem(MISSION_LANG_KEY);
      lang = saved === "ru" ? "ru" : "pl";
    } catch (err) {
      lang = "pl";
    }
  }

  function saveLang() {
    try {
      localStorage.setItem(LANG_KEY, lang);
      localStorage.setItem(MISSION_LANG_KEY, lang);
    } catch (err) {
      /* Storage can be blocked. The catalog still switches for this visit. */
    }
  }

  function subjectId() {
    var raw = (location.hash || "").replace(/^#\/?/, "");
    var known = t().subjects.some(function (item) { return item.id === raw; });
    return known ? raw : "";
  }

  function taskCount(id) {
    return (TASKS[id] || []).length;
  }

  function renderSubjects() {
    var copy = t();
    var cards = copy.subjects.map(function (item) {
      var count = taskCount(item.id);
      var meta = count === 0 ? copy.soon : count === 1 ? copy.oneTask : count + " " + copy.manyTasks;
      return (
        '<a class="card" href="#/' + item.id + '">' +
          '<span class="card-icon" aria-hidden="true">' + item.icon + "</span>" +
          '<span class="card-name">' + esc(item.name) + "</span>" +
          '<span class="card-meta">' + esc(meta) + "</span>" +
        "</a>"
      );
    }).join("");
    var missionHref = "zaszyfrowana-kapsula/index.html?lang=" + lang;
    stage.innerHTML =
      '<section class="screen">' +
        "<h1>" + esc(copy.title) + "</h1>" +
        '<p class="lead">' + esc(copy.lead) + "</p>" +
        '<a class="mission-banner" href="' + esc(missionHref) + '">' +
          '<span class="card-meta">' + esc(copy.missionEyebrow) + "</span>" +
          "<strong>🕵️ " + esc(copy.missionTitle) + "</strong>" +
          '<span class="card-meta">' + esc(copy.missionMeta) + "</span>" +
        "</a>" +
        '<div class="grid">' + cards + "</div>" +
      "</section>";
  }

  function renderTasks(id) {
    var copy = t();
    var subject = copy.subjects.filter(function (item) { return item.id === id; })[0];
    var tasks = TASKS[id] || [];
    var list = tasks.length
      ? tasks.map(function (task) {
          var href = task.href + (task.href.indexOf("?") === -1 ? "?" : "&") + "lang=" + lang;
          return (
            '<a class="task" href="' + esc(href) + '">' +
              '<span class="card-icon" aria-hidden="true">' + task.icon + "</span>" +
              '<span class="task-copy">' +
                '<span class="card-name">' + esc(task.title[lang]) + "</span>" +
                '<span class="card-meta">' + esc(task.desc[lang]) + "</span>" +
              "</span>" +
              '<span class="open">' + esc(copy.open) + "</span>" +
            "</a>"
          );
        }).join("")
      : '<p class="empty">' + esc(copy.empty) + "</p>";
    stage.innerHTML =
      '<section class="screen">' +
        '<a class="back" href="#/">' + esc(copy.back) + "</a>" +
        "<h1>" + esc(subject.name) + "</h1>" +
        '<p class="lead">' + esc(copy.tasksLead) + "</p>" +
        '<div class="task-list">' + list + "</div>" +
      "</section>";
  }

  function render() {
    document.documentElement.lang = lang;
    document.title = t().docTitle;
    document.getElementById("brand").textContent = t().brand;
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    var id = subjectId();
    if (id) renderTasks(id);
    else renderSubjects();
    window.scrollTo(0, 0);
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-set-lang]");
    if (!btn) return;
    var next = btn.getAttribute("data-set-lang");
    if (next !== "pl" && next !== "ru") return;
    if (next === lang) return;
    lang = next;
    saveLang();
    render();
  });

  window.addEventListener("hashchange", render);
  loadLang();
  render();
})();
