(function () {
  "use strict";

  var I18N = window.ZB_I18N;
  var LANG_KEY = "znajdz-blad-lang";
  var STATE_KEY = "znajdz-blad-progress";
  var CARD_IDS = ["units", "tens", "carry", "shift"];

  var state = {
    lang: "pl",
    screen: 0,
    cards: [],
    question: 0,
    notes: ["", "", "", ""]
  };

  var topEl = document.getElementById("top");
  var stageEl = document.getElementById("stage");

  function t(key) {
    return I18N[state.lang][key];
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function load() {
    try {
      var fromQuery = new URLSearchParams(window.location.search).get("lang") || "";
      if (fromQuery === "pl" || fromQuery === "ru") state.lang = fromQuery;
      else state.lang = localStorage.getItem(LANG_KEY) === "ru" ? "ru" : "pl";
      var raw = JSON.parse(localStorage.getItem(STATE_KEY) || "null");
      if (!raw || typeof raw !== "object") return;
      var screen = Number(raw.screen);
      if (Number.isInteger(screen) && screen >= 0 && screen <= 5) state.screen = screen;
      if (Array.isArray(raw.cards)) {
        state.cards = CARD_IDS.filter(function (id) { return raw.cards.indexOf(id) !== -1; });
      }
      var question = Number(raw.question);
      if (Number.isInteger(question) && question >= 0 && question <= 3) state.question = question;
      if (Array.isArray(raw.notes)) {
        state.notes = [0, 1, 2, 3].map(function (i) {
          return String(raw.notes[i] == null ? "" : raw.notes[i]).slice(0, 600);
        });
      }
    } catch (err) {
      state.lang = "pl";
    }
  }

  function save() {
    try {
      localStorage.setItem(LANG_KEY, state.lang);
      localStorage.setItem("dop-zadania-lang", state.lang);
      localStorage.setItem(STATE_KEY, JSON.stringify({
        screen: state.screen,
        cards: state.cards,
        question: state.question,
        notes: state.notes
      }));
    } catch (err) {
      /* Private mode can block storage. The mission still runs in memory. */
    }
  }

  function chainHtml(steps) {
    return steps.map(function (step, index) {
      var arrow = index === 0 ? "" : '<span class="arrow" aria-hidden="true">↓</span>';
      var cls = index === 0 ? "chain-step is-head" : "chain-step";
      return '<li class="chain-item">' + arrow + '<span class="' + cls + '" style="--i:' + index + '">' + esc(step) + "</span></li>";
    }).join("");
  }

  function sumHtml() {
    var cells = ["", "3", "4", "7", "×", "", "2", "6"];
    return cells.map(function (cell) {
      var cls = cell === "×" ? ' class="op"' : "";
      return "<span" + cls + ">" + cell + "</span>";
    }).join("");
  }

  function screenStart() {
    var copy = I18N[state.lang];
    return (
      '<section class="screen rise">' +
        '<div class="scene" aria-hidden="true">' +
          '<span class="floater f1">×</span>' +
          '<span class="floater f2">÷</span>' +
          '<span class="floater f3">=</span>' +
          '<span class="floater f4">?</span>' +
          '<span class="floater f5">+</span>' +
          '<svg class="glass" viewBox="0 0 140 140">' +
            '<circle class="lens" cx="58" cy="58" r="34"/>' +
            '<circle class="gleam" cx="46" cy="44" r="8"/>' +
            '<path class="handle" d="M82 82 L112 116"/>' +
          "</svg>" +
          '<span class="track tr1"></span>' +
          '<span class="track tr2"></span>' +
          '<span class="track tr3"></span>' +
        "</div>" +
        '<p class="eyebrow" aria-hidden="true">🧩</p>' +
        "<h1>" + esc(copy.s1title) + "</h1>" +
        '<p class="subtitle">' + esc(copy.s1sub) + "</p>" +
        '<div class="sheet">' +
          '<p class="scan"><span class="pulse" aria-hidden="true"></span> ' + esc(copy.s1p1) + "<br>" + esc(copy.s1p2) + "</p>" +
          "<p>" + esc(copy.s1p3) + "</p>" +
          '<div class="actions">' +
            '<button type="button" class="btn" data-action="start">' + esc(copy.s1btn) + "</button>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function screenMul() {
    var copy = I18N[state.lang];
    return (
      '<section class="screen rise">' +
        '<p class="eyebrow" aria-hidden="true">🔎</p>' +
        "<h1>" + esc(copy.s2title) + "</h1>" +
        '<div class="sheet">' +
          '<p class="tag">' + esc(copy.evidence1) + "</p>" +
          '<p class="sr-only">' + esc(copy.mulLabel) + "</p>" +
          '<div class="sum-wrap" aria-hidden="true"><div class="sum">' + sumHtml() + '</div><div class="rule"></div></div>' +
          '<div class="callout">' +
            "<p>✏️ " + esc(copy.s2p1) + "</p>" +
            "<p>" + esc(copy.s2p2) + "</p>" +
            "<p>" + esc(copy.s2p3before) + " <strong>" + esc(copy.s2p3) + "</strong>.</p>" +
          "</div>" +
          '<p class="ready">' + esc(copy.s2ready) + "</p>" +
          '<div class="actions">' +
            '<button type="button" class="btn" data-action="solved-mul">' + esc(copy.s2btn) + "</button>" +
            '<button type="button" class="btn-ghost" data-action="back">' + esc(copy.back) + "</button>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function screenClues() {
    var copy = I18N[state.lang];
    var cards = copy.cards.map(function (card, index) {
      var on = state.cards.indexOf(card.id) !== -1;
      return (
        '<button type="button" class="clue' + (on ? " is-on" : "") + '" data-card="' + card.id + '" aria-pressed="' + (on ? "true" : "false") + '">' +
          '<span class="clue-no">' + (index + 1) + "</span>" +
          '<span class="clue-title">' + esc(card.title) + "</span>" +
          '<span class="clue-hint">' + esc(card.hint) + "</span>" +
          '<span class="clue-mark" aria-hidden="true">' + esc(copy.selected) + "</span>" +
        "</button>"
      );
    }).join("");

    return (
      '<section class="screen rise">' +
        '<p class="eyebrow" aria-hidden="true">🕵️</p>' +
        "<h1>" + esc(copy.s3title) + "</h1>" +
        '<div class="lede">' +
          "<p>" + esc(copy.s3p1) + "</p>" +
          "<p>" + esc(copy.s3p2) + "</p>" +
          "<p><strong>" + esc(copy.s3p3) + "</strong></p>" +
        "</div>" +
        '<div class="cards">' + cards + "</div>" +
        '<p class="fine fine-on-dark">' + esc(copy.clueHint) + "</p>" +
        '<div class="actions">' +
          '<button type="button" class="btn" data-action="next-clues">' + esc(copy.s3btn) + "</button>" +
          '<button type="button" class="btn-ghost" data-action="back">' + esc(copy.back) + "</button>" +
        "</div>" +
      "</section>"
    );
  }

  function screenDiv() {
    var copy = I18N[state.lang];
    return (
      '<section class="screen rise">' +
        '<p class="eyebrow" aria-hidden="true">🔎</p>' +
        "<h1>" + esc(copy.s4title) + "</h1>" +
        '<div class="sheet">' +
          '<p class="tag">' + esc(copy.evidence2) + "</p>" +
          '<p class="sr-only">' + esc(copy.divLabel) + "</p>" +
          '<p class="quotient" aria-hidden="true"><span>936</span> <span class="op">:</span> <span>24</span> <span class="op">=</span> <span class="mystery">?</span></p>' +
          '<div class="callout">' +
            "<p>✏️ " + esc(copy.s4p1) + "</p>" +
            "<p>" + esc(copy.s4p2) + "</p>" +
            "<p><strong>" + esc(copy.s4p3) + "</strong></p>" +
          "</div>" +
          '<div class="actions">' +
            '<button type="button" class="btn" data-action="solved-div">' + esc(copy.s4btn) + "</button>" +
            '<button type="button" class="btn-ghost" data-action="back">' + esc(copy.back) + "</button>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  function screenThink() {
    var copy = I18N[state.lang];
    var q = state.question;
    var last = q === 3;
    return (
      '<section class="screen rise">' +
        '<p class="eyebrow" aria-hidden="true">🧠</p>' +
        '<p class="stage-name">' + esc(copy.s5title) + "</p>" +
        '<p class="q-count">' + esc(copy.qOf) + " " + (q + 1) + " " + esc(copy.qOfMid) + " 4</p>" +
        '<div class="q-dots" aria-hidden="true">' +
          [0, 1, 2, 3].map(function (i) {
            var cls = i < q ? "is-done" : i === q ? "is-now" : "";
            return '<span class="' + cls + '"></span>';
          }).join("") +
        "</div>" +
        "<h1>" + esc(copy.questions[q]) + "</h1>" +
        '<p class="fine fine-on-dark">' + esc(copy.thinkLead) + "</p>" +
        '<div class="sheet sheet-tight">' +
          '<label class="note-label" id="note-label" for="note">' + esc(copy.noteLabel) + "</label>" +
          '<textarea id="note" data-note rows="4" maxlength="600" placeholder="' + esc(copy.notePlaceholder) + '">' + esc(state.notes[q]) + "</textarea>" +
        "</div>" +
        '<div class="actions">' +
          '<button type="button" class="btn" data-action="next-q">' + esc(last ? copy.finishThink : copy.nextQuestion) + "</button>" +
          '<button type="button" class="btn-ghost" data-action="back">' + esc(copy.back) + "</button>" +
        "</div>" +
      "</section>"
    );
  }

  function screenFinish() {
    var copy = I18N[state.lang];
    var sparks = "";
    for (var i = 0; i < 10; i += 1) sparks += "<i></i>";
    return (
      '<section class="screen rise finale">' +
        '<div class="sparks" aria-hidden="true">' + sparks + "</div>" +
        '<div class="seal">' + esc(copy.seal) + "</div>" +
        '<p class="eyebrow" aria-hidden="true">🏆</p>' +
        "<h1>" + esc(copy.s6title) + "</h1>" +
        '<div class="lede">' +
          "<p><strong>" + esc(copy.s6p1) + "</strong></p>" +
          "<p>" + esc(copy.s6p2) + "</p>" +
          "<p>" + esc(copy.s6p3) + "</p>" +
          '<p class="key-line">🧠 <strong>' + esc(copy.s6key) + "</strong></p>" +
        "</div>" +
        '<div class="sheet">' +
          "<h2>" + esc(copy.mapTitle) + "</h2>" +
          '<div class="chains">' +
            '<ol class="chain">' + chainHtml(copy.chainMul) + "</ol>" +
            '<ol class="chain">' + chainHtml(copy.chainDiv) + "</ol>" +
          "</div>" +
        "</div>" +
        '<div class="actions">' +
          '<button type="button" class="btn" data-action="retry">' + esc(copy.s6btn) + "</button>" +
        "</div>" +
      "</section>"
    );
  }

  var screens = [screenStart, screenMul, screenClues, screenDiv, screenThink, screenFinish];

  function renderHeader() {
    var copy = I18N[state.lang];
    var n = state.screen + 1;
    var bits = "";
    for (var i = 0; i < 6; i += 1) {
      if (i > 0) {
        bits += '<span class="step-line' + (state.screen >= i ? " is-done" : "") + '"></span>';
      }
      var dotCls = i < state.screen ? " is-done" : i === state.screen ? " is-now" : "";
      bits += '<span class="step-dot' + dotCls + '"></span>';
    }
    topEl.innerHTML =
      '<a class="to-catalog" href="../index.html#/matematyka">' + esc(copy.catalogBack) + "</a>" +
      '<div class="top-row">' +
        '<p class="phase">' + esc(copy.phases[state.screen]) + ' <span>· ' + n + " / 6</span></p>" +
        '<div class="lang" role="group" aria-label="PL RU">' +
          '<button type="button" data-set-lang="pl" aria-pressed="' + (state.lang === "pl" ? "true" : "false") + '">🇵🇱 PL</button>' +
          '<button type="button" data-set-lang="ru" aria-pressed="' + (state.lang === "ru" ? "true" : "false") + '">🇷🇺 RU</button>' +
        "</div>" +
      "</div>" +
      '<div class="steps" role="progressbar" aria-valuemin="1" aria-valuemax="6" aria-valuenow="' + n + '" aria-label="' + esc(copy.progressAria) + " " + n + " " + esc(copy.of6) + '">' +
        bits +
      "</div>";
  }

  function render(animate) {
    document.documentElement.lang = state.lang;
    document.title = t("docTitle");
    renderHeader();
    stageEl.innerHTML = screens[state.screen]();
    if (!animate) {
      var screen = stageEl.querySelector(".screen");
      if (screen) screen.classList.remove("rise");
    }
    if (animate) window.scrollTo(0, 0);
  }

  function captureNote() {
    var field = document.querySelector("[data-note]");
    if (!field || state.screen !== 4) return;
    state.notes[state.question] = field.value.slice(0, 600);
  }

  function go(screen) {
    state.screen = screen;
    save();
    render(true);
  }

  function toggleCard(btn) {
    var id = btn.getAttribute("data-card");
    var index = state.cards.indexOf(id);
    if (index === -1) state.cards.push(id);
    else state.cards.splice(index, 1);
    save();
    var on = state.cards.indexOf(id) !== -1;
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function nextQuestion() {
    if (state.question < 3) {
      state.question += 1;
      save();
      render(true);
      return;
    }
    go(5);
  }

  function back() {
    if (state.screen === 4 && state.question > 0) {
      state.question -= 1;
      save();
      render(true);
      return;
    }
    if (state.screen > 0) go(state.screen - 1);
  }

  function retry() {
    state.screen = 0;
    state.cards = [];
    state.question = 0;
    state.notes = ["", "", "", ""];
    save();
    render(true);
  }

  function setLang(lang) {
    if (lang !== "pl" && lang !== "ru") return;
    if (lang === state.lang) return;
    state.lang = lang;
    save();
    render(false);
  }

  document.addEventListener("click", function (event) {
    var langBtn = event.target.closest("[data-set-lang]");
    if (langBtn) {
      captureNote();
      setLang(langBtn.getAttribute("data-set-lang"));
      return;
    }
    var card = event.target.closest("[data-card]");
    if (card) {
      toggleCard(card);
      return;
    }
    var actionBtn = event.target.closest("[data-action]");
    if (!actionBtn) return;
    captureNote();
    var action = actionBtn.getAttribute("data-action");
    if (action === "start") go(1);
    else if (action === "solved-mul") go(2);
    else if (action === "next-clues") go(3);
    else if (action === "solved-div") go(4);
    else if (action === "next-q") nextQuestion();
    else if (action === "back") back();
    else if (action === "retry") retry();
  });

  document.addEventListener("input", function (event) {
    var field = event.target.closest("[data-note]");
    if (!field) return;
    state.notes[state.question] = field.value.slice(0, 600);
    save();
  });

  load();
  render(false);
})();
