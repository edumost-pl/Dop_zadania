(function () {
  "use strict";

  var COPY = window.KAPSULA_COPY;
  var ORDER = ["matematyka", "polski", "angielski", "historia"];
  var KEY = "9022";
  var PLACE = { who: "podroznik", key: "klucz", from: "londyn", to: "egipt" };
  var STAMP = ["bird", "sun", "water"];
  var BONUS = "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-egypt/examine-rosetta-stone";
  var STATE_KEY = "kapsula-v2";
  var LANG_KEY = "dop-zadania-lang";
  var MISSION_LANG_KEY = "znajdz-blad-lang";
  var GAME_DONE_KEY = "znajdz-blad-finished";
  var GAME_PROGRESS_KEY = "znajdz-blad-progress";

  var stage = document.getElementById("stage");
  var top = document.getElementById("top");
  var lang = "pl";
  var flash = "";
  var state = emptyState();
  var board = emptyBoard();

  function emptyState() {
    return {
      done: {},
      keyOk: false,
      step: { polski: 0, angielski: 0, historia: 0 },
      signal: 0,
      place: {},
      opened: false
    };
  }

  function emptyBoard() {
    return { multi: {}, bins: {}, hold: "", order: [], flags: {}, groups: {}, matched: {}, arm: "", glyph: [], card: "" };
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function copy() {
    return COPY[lang] || COPY.pl;
  }

  function loadLang() {
    var query = new URLSearchParams(location.search).get("lang");
    if (query === "ru" || query === "pl") {
      lang = query;
      return;
    }
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
    } catch (err) { /* still switches for this visit */ }
  }

  function loadState() {
    state = emptyState();
    try {
      var raw = JSON.parse(localStorage.getItem(STATE_KEY) || "null");
      if (!raw || typeof raw !== "object") return;
      ORDER.forEach(function (id) {
        if (raw.done && raw.done[id]) state.done[id] = true;
      });
      state.keyOk = !!raw.keyOk;
      ["polski", "angielski", "historia"].forEach(function (id) {
        var n = raw.step && raw.step[id];
        state.step[id] = typeof n === "number" ? n : 0;
      });
      state.signal = typeof raw.signal === "number" ? raw.signal : 0;
      state.place = raw.place && typeof raw.place === "object" ? raw.place : {};
      state.opened = !!raw.opened;
    } catch (err) {
      state = emptyState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (err) { /* progress stays in memory */ }
  }

  function gameFinished() {
    try {
      if (localStorage.getItem(GAME_DONE_KEY) === "1") return true;
      var raw = JSON.parse(localStorage.getItem(GAME_PROGRESS_KEY) || "null");
      return !!(raw && raw.screen === 5);
    } catch (err) {
      return false;
    }
  }

  function syncMath() {
    if (gameFinished() && state.keyOk) state.done.matematyka = true;
  }

  function countDone() {
    return ORDER.filter(function (id) { return state.done[id]; }).length;
  }

  function unlocked(id) {
    var index = ORDER.indexOf(id);
    if (index <= 0) return true;
    return !!state.done[ORDER[index - 1]];
  }

  function activeId() {
    for (var i = 0; i < ORDER.length; i += 1) {
      if (!state.done[ORDER[i]]) return ORDER[i];
    }
    return "final";
  }

  function stepsOf(id) {
    var block = copy().stages[id];
    return (block && block.steps) || [];
  }

  function currentStep(id) {
    var steps = stepsOf(id);
    var index = state.step[id] || 0;
    if (index >= steps.length) return null;
    return steps[index];
  }

  function sameSet(list, correct) {
    if (list.length !== correct.length) return false;
    return correct.every(function (id) { return list.indexOf(id) !== -1; });
  }

  function advance(id) {
    board = emptyBoard();
    if (id === "angielski") state.signal = 0;
    state.step[id] = (state.step[id] || 0) + 1;
    if (state.step[id] >= stepsOf(id).length) state.done[id] = true;
    saveState();
  }

  function glyphSvg(id) {
    if (id === "sun") {
      return '<svg class="glyph" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="9" fill="none" stroke="currentColor" stroke-width="3"/><path d="M32 6 v10 M32 48 v10 M6 32 h10 M48 32 h10 M13 13 l7 7 M44 44 l7 7 M51 13 l-7 7 M20 44 l-7 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
    }
    if (id === "water") {
      return '<svg class="glyph" viewBox="0 0 64 64" aria-hidden="true"><path d="M6 26 q8 10 16 0 t16 0 t16 0" fill="none" stroke="currentColor" stroke-width="3"/><path d="M6 40 q8 10 16 0 t16 0 t16 0" fill="none" stroke="currentColor" stroke-width="3"/></svg>';
    }
    return '<svg class="glyph" viewBox="0 0 64 64" aria-hidden="true"><path d="M10 42 c8 -26 24 -24 34 -8 c6 6 8 14 2 18 c-14 4 -28 -2 -36 -10 z" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="38" cy="30" r="2" fill="currentColor"/></svg>';
  }

  function renderTop() {
    var text = copy();
    top.innerHTML =
      '<p class="brand">' + esc(text.brand) + "</p>" +
      '<div class="lang" role="group" aria-label="PL RU">' +
        '<button type="button" data-lang="pl" aria-pressed="' + (lang === "pl") + '">🇵🇱 PL</button>' +
        '<button type="button" data-lang="ru" aria-pressed="' + (lang === "ru") + '">🇷🇺 RU</button>' +
      "</div>";
    document.documentElement.lang = lang === "ru" ? "ru" : "pl";
    document.title = text.docTitle;
  }

  function mapHtml() {
    var text = copy();
    return (
      '<ol class="map" aria-label="' + esc(text.mapLabel) + '">' +
        ORDER.map(function (id, index) {
          var item = text.stages[id];
          var mode = state.done[id] ? "is-done" : unlocked(id) ? "is-active" : "is-locked";
          return (
            '<li class="map-node ' + mode + '"><a href="#etap-' + id + '">' +
              '<span class="map-no">' + (index + 1) + "</span>" +
              '<span class="map-name">' + esc(item.subject) + "</span>" +
            "</a></li>"
          );
        }).join("") +
      "</ol>"
    );
  }

  function flashHtml() {
    if (!flash) return "";
    return '<p class="flash" role="status">' + esc(flash) + "</p>";
  }

  function fragmentHtml(id) {
    if (!state.done[id]) return "";
    var bit = copy().fragments[id];
    return (
      '<p class="fragment"><span>' + esc(bit.k) + "</span><strong>" + esc(bit.v) + "</strong></p>"
    );
  }

  function checkBtn() {
    return '<button type="button" class="btn" data-check="1">' + esc(copy().check) + "</button>";
  }

  function multiHtml(step) {
    return (
      '<p class="sentence">' + esc(step.sentence) + "</p>" +
      '<div class="chips">' + step.choices.map(function (choice) {
        var on = board.multi[choice.id] ? " is-on" : "";
        return '<button type="button" class="chip' + on + '" data-chip="' + choice.id + '">' + esc(choice.label) + "</button>";
      }).join("") + "</div>" + checkBtn()
    );
  }

  function binsHtml(step) {
    var bins = step.bins.map(function (bin) {
      var items = step.items.filter(function (item) { return board.bins[item.id] === bin.id; });
      return (
        '<div class="bin"><p>' + esc(bin.label) + "</p>" +
          items.map(function (item) { return '<span class="chip is-on">' + esc(item.label) + "</span>"; }).join("") +
          '<button type="button" class="btn-ghost" data-bin="' + bin.id + '">+</button></div>'
      );
    }).join("");
    var pool = step.items.filter(function (item) { return !board.bins[item.id]; }).map(function (item) {
      var on = board.hold === item.id ? " is-on" : "";
      return '<button type="button" class="chip' + on + '" data-hold="' + item.id + '">' + esc(item.label) + "</button>";
    }).join("");
    return '<div class="bins">' + bins + '</div><div class="chips">' + pool + "</div>" + checkBtn();
  }

  function oneHtml(step) {
    return (
      (step.sentence ? '<p class="sentence">' + esc(step.sentence) + "</p>" : "") +
      (step.text ? '<p class="air">' + esc(step.text) + "</p>" : "") +
      (step.sign ? '<p class="sign">' + esc(step.sign) + "</p>" : "") +
      '<div class="choices">' + step.choices.map(function (choice) {
        return '<button type="button" class="choice" data-pick="' + choice.id + '">' + esc(choice.label) + "</button>";
      }).join("") + "</div>"
    );
  }

  function flagsHtml(step) {
    return (
      '<p class="air">' + esc(step.text) + "</p>" +
      step.items.map(function (item) {
        var yes = board.flags[item.id] === true ? " is-on" : "";
        var no = board.flags[item.id] === false ? " is-on" : "";
        return (
          '<div class="flag"><p>' + esc(item.text) + "</p>" +
            '<button type="button" class="chip' + yes + '" data-flag="' + item.id + '" data-val="1">' + esc(step.yes) + "</button>" +
            '<button type="button" class="chip' + no + '" data-flag="' + item.id + '" data-val="0">' + esc(step.no) + "</button></div>"
        );
      }).join("") + checkBtn()
    );
  }

  function orderHtml(step) {
    var labels = {};
    step.items.forEach(function (item) { labels[item.id] = item.label; });
    var row = board.order.map(function (id) {
      return '<span class="chip is-on">' + esc(labels[id]) + "</span>";
    }).join("");
    var pool = step.items.filter(function (item) {
      return board.order.indexOf(item.id) === -1;
    }).map(function (item) {
      return '<button type="button" class="chip" data-add="' + item.id + '">' + esc(item.label) + "</button>";
    }).join("");
    return (
      '<div class="order-row">' + row + "</div>" +
      '<div class="chips">' + pool + "</div>" +
      '<button type="button" class="btn-ghost" data-clear="1">←</button>' +
      checkBtn()
    );
  }

  function matchHtml(step) {
    var seen = {};
    var rights = [];
    step.pairs.forEach(function (pair) {
      if (seen[pair.right]) return;
      seen[pair.right] = true;
      rights.push(pair.right);
    });
    rights.push(rights.shift());
    var left = step.pairs.map(function (pair) {
      var cls = board.matched[pair.id] ? " is-done" : board.arm === pair.id ? " is-on" : "";
      return '<button type="button" class="choice' + cls + '" data-arm="' + pair.id + '"' + (board.matched[pair.id] ? " disabled" : "") + ">" + esc(pair.left) + "</button>";
    }).join("");
    var right = rights.map(function (label) {
      var done = step.pairs.every(function (pair) {
        return pair.right !== label || board.matched[pair.id];
      });
      return '<button type="button" class="choice' + (done ? " is-done" : "") + '" data-civil="' + esc(label) + '"' + (done ? " disabled" : "") + ">" + esc(label) + "</button>";
    }).join("");
    return '<div class="match"><div>' + left + "</div><div>" + right + "</div></div>";
  }

  function signalHtml(step) {
    var round = step.rounds[state.signal] || step.rounds[0];
    var pics = round.choices.map(function (id) {
      return '<button type="button" class="pic" data-hear="' + id + '"><span>' + step.icons[id] + "</span>" + esc(step.names[id]) + "</button>";
    }).join("");
    return '<p class="hear">' + esc(round.say) + "</p>" + '<div class="pics">' + pics + "</div>";
  }

  function glyphsHtml(step) {
    var key = step.glyphs.map(function (glyph) {
      return '<div class="key-bit">' + glyphSvg(glyph.id) + "<span>" + esc(glyph.name) + "</span></div>";
    }).join("");
    var stamp = STAMP.map(function (id) { return glyphSvg(id); }).join("");
    var names = {};
    step.glyphs.forEach(function (glyph) { names[glyph.id] = glyph.name; });
    var picks = board.glyph.map(function (id) { return '<span class="chip is-on">' + esc(names[id]) + "</span>"; }).join("");
    var buttons = step.glyphs.map(function (glyph) {
      return '<button type="button" class="choice" data-glyph="' + glyph.id + '">' + esc(glyph.name) + "</button>";
    }).join("");
    return '<div class="key-row">' + key + '</div><div class="stamp-row">' + stamp + '</div><div class="order-row">' + picks + '</div><div class="choices">' + buttons + "</div>";
  }

  function groupsHtml(step) {
    return step.groups.map(function (group) {
      return (
        '<fieldset class="group"><legend>' + esc(group.prompt) + "</legend>" +
          group.choices.map(function (choice) {
            var on = board.groups[group.id] === choice.id ? " is-on" : "";
            return '<button type="button" class="choice' + on + '" data-group="' + group.id + '" data-choice="' + choice.id + '">' + esc(choice.label) + "</button>";
          }).join("") +
        "</fieldset>"
      );
    }).join("") + checkBtn();
  }

  function stepBody(step) {
    if (!step) return "";
    var head = '<p class="card-kicker">' + esc(copy().step) + "</p><h3>" + esc(step.title) + "</h3><p>" + esc(step.lead) + "</p>";
    var body = "";
    if (step.type === "multi") body = multiHtml(step);
    else if (step.type === "bins") body = binsHtml(step);
    else if (step.type === "one") body = oneHtml(step);
    else if (step.type === "flags") body = flagsHtml(step);
    else if (step.type === "order") body = orderHtml(step);
    else if (step.type === "match") body = matchHtml(step);
    else if (step.type === "signal") body = signalHtml(step);
    else if (step.type === "glyphs") body = glyphsHtml(step);
    else if (step.type === "groups") body = groupsHtml(step);
    return head + body;
  }

  function mathHtml(item) {
    var text = copy();
    if (!gameFinished()) {
      return (
        "<p>" + esc(item.story) + "</p><ul>" + item.task.map(function (line) {
          return "<li>" + esc(line) + "</li>";
        }).join("") + "</ul><p class=\"reward\">" + esc(text.reward) + "</p>" +
        '<a class="btn" href="../znajdz-blad/index.html?lang=' + lang + '&from=kapsula">' + esc(text.openTask) + "</a>"
      );
    }
    if (!state.keyOk) {
      return (
        "<p>" + esc(item.keyLead) + "</p>" +
        '<form class="key-form" data-keyform="1"><input id="capsule-key" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="' + esc(text.keyPh) + '">' +
        '<button class="btn" type="submit">' + esc(text.keyBtn) + "</button></form>"
      );
    }
    return fragmentHtml("matematyka") +
      '<a class="btn" href="../znajdz-blad/index.html?lang=' + lang + '&from=kapsula">' + esc(text.openTask) + "</a>";
  }

  function panelHtml(id) {
    var text = copy();
    var item = text.stages[id];
    var index = ORDER.indexOf(id) + 1;
    var mode = state.done[id] ? "is-done" : unlocked(id) ? "is-active" : "is-locked";
    var body = "";
    if (mode === "is-locked") body = '<p class="lock-note">' + esc(text.locked) + "</p>";
    else if (id === "matematyka") body = mathHtml(item);
    else if (state.done[id]) body = fragmentHtml(id) + (id === "historia" ? '<p class="reward"><a href="' + BONUS + '" target="_blank" rel="noopener">' + esc(text.bonus) + "</a></p>" : "");
    else body = "<p>" + esc(item.story) + "</p><p class=\"reward\">" + esc(text.reward) + "</p>" + stepBody(currentStep(id));
    return (
      '<article class="card ' + mode + " scene-" + id + '" id="etap-' + id + '">' +
        '<p class="card-kicker">' + item.icon + " " + index + " · " + esc(item.subject) + "</p>" +
        "<h2>" + esc(item.name) + "</h2>" + body +
      "</article>"
    );
  }

  function finaleHtml() {
    if (countDone() < ORDER.length) return "";
    var text = copy();
    if (state.opened) {
      return (
        '<section class="finale scene-final">' +
          '<p class="card-kicker">🔓 ' + esc(text.openTitle) + "</p>" +
          "<h2>" + esc(text.openTitle) + "</h2>" +
          '<p class="message">' + esc(text.message) + "</p>" +
          "<p>" + esc(text.joined) + "</p>" +
          '<ul class="skills">' + text.skills.map(function (skill) {
            return "<li>" + esc(skill) + "</li>";
          }).join("") + "</ul>" +
          '<button type="button" class="btn-ghost" data-reset="1">' + esc(text.again) + "</button>" +
        "</section>"
      );
    }
    var used = {};
    Object.keys(state.place).forEach(function (slot) { if (state.place[slot]) used[state.place[slot]] = true; });
    var tray = Object.keys(text.cards).filter(function (id) { return !used[id]; }).map(function (id) {
      var on = board.card === id ? " is-on" : "";
      return '<button type="button" class="mini' + on + '" data-card="' + id + '">' + esc(text.cards[id]) + "</button>";
    }).join("");
    var slots = text.slots.map(function (slot, index) {
      var cardId = state.place[slot.id];
      var value = cardId ? text.cards[cardId] : "—";
      return '<button type="button" class="slot" data-slot="' + slot.id + '"><span>' + esc(slot.label) + "</span><strong>" + esc(value) + "</strong></button>";
    }).join("");
    return (
      '<section class="finale scene-final" id="etap-final">' +
        '<p class="card-kicker">' + esc(text.finaleKicker) + "</p>" +
        "<h2>" + esc(text.finaleTitle) + "</h2>" +
        "<p>" + esc(text.finaleLead) + "</p>" +
        '<div class="torn">' + text.blanks.map(function (line) { return "<p>" + esc(line) + "</p>"; }).join("") + "</div>" +
        '<div class="tray">' + tray + "</div>" +
        '<div class="slots">' + slots + "</div>" +
      "</section>"
    );
  }

  function render() {
    syncMath();
    var text = copy();
    var have = countDone();
    var scene = activeId();
    renderTop();
    stage.innerHTML =
      '<section class="hero scene-' + scene + '">' +
        '<p class="hero-mark" aria-hidden="true">🔐</p>' +
        '<p class="card-kicker">' + esc(text.kicker) + "</p>" +
        "<h1>" + esc(text.title) + "</h1>" +
        text.intro.map(function (line) { return "<p>" + esc(line) + "</p>"; }).join("") +
        (state.opened ? "" : "<p>" + esc(text.scenes[scene] || "") + "</p>") +
        flashHtml() +
        '<p class="progress"><span>' + esc(text.progress) + "</span> <strong>" + have + " / 4</strong></p>" +
        '<p class="left">' + esc(text.left) + ": " + (4 - have) + "</p>" +
        mapHtml() +
        '<p class="back-row"><a href="../index.html">' + esc(text.back) + "</a></p>" +
      "</section>" +
      ORDER.map(panelHtml).join("") +
      finaleHtml();
    flash = "";
  }

  function fail(step) {
    flash = step.bad;
    render();
  }

  function pass(id, step) {
    flash = step.ok;
    advance(id);
    render();
  }

  function onCheck() {
    var id = activeId();
    var step = currentStep(id);
    if (!step || !unlocked(id)) return;
    if (step.type === "multi") {
      var picked = Object.keys(board.multi).filter(function (key) { return board.multi[key]; });
      if (!sameSet(picked, step.correct)) return fail(step);
      return pass(id, step);
    }
    if (step.type === "bins") {
      var binsOk = step.items.every(function (item) { return board.bins[item.id] === item.bin; });
      if (!binsOk) return fail(step);
      return pass(id, step);
    }
    if (step.type === "flags") {
      var flagsOk = step.items.every(function (item) { return board.flags[item.id] === item.ok; });
      if (!flagsOk) return fail(step);
      return pass(id, step);
    }
    if (step.type === "order") {
      var orderOk = board.order.length === step.correct.length && step.correct.every(function (bit, index) {
        return board.order[index] === bit;
      });
      if (!orderOk) return fail(step);
      return pass(id, step);
    }
    if (step.type === "groups") {
      var groupsOk = step.groups.every(function (group) { return board.groups[group.id] === group.correct; });
      if (!groupsOk) return fail(step);
      return pass(id, step);
    }
  }

  function onPick(id) {
    var stageId = activeId();
    var step = currentStep(stageId);
    if (!step || step.type !== "one") return;
    if (id === step.correct) pass(stageId, step);
    else fail(step);
  }

  function onHear(id) {
    var step = currentStep("angielski");
    if (!step || step.type !== "signal") return;
    var round = step.rounds[state.signal];
    if (!round || id !== round.correct) return fail(step);
    if (state.signal + 1 >= step.rounds.length) return pass("angielski", step);
    state.signal += 1;
    saveState();
    flash = round.say;
    render();
  }

  function onPair(label) {
    var step = currentStep("historia");
    if (!step || step.type !== "match" || !board.arm) return;
    var armed = null;
    step.pairs.forEach(function (pair) {
      if (pair.id === board.arm) armed = pair;
    });
    if (!armed || armed.right !== label) {
      board.arm = "";
      return fail(step);
    }
    board.matched[board.arm] = true;
    board.arm = "";
    var all = step.pairs.every(function (pair) { return board.matched[pair.id]; });
    if (all) return pass("historia", step);
    render();
  }

  function onGlyph(id) {
    var step = currentStep("historia");
    if (!step || step.type !== "glyphs") return;
    var next = STAMP[board.glyph.length];
    if (id !== next) {
      board.glyph = [];
      return fail(step);
    }
    board.glyph.push(id);
    if (board.glyph.length === STAMP.length) return pass("historia", step);
    render();
  }

  function onSlot(slotId) {
    if (!board.card || state.opened) return;
    if (PLACE[slotId] !== board.card) {
      board.card = "";
      flash = copy().placeBad;
      render();
      return;
    }
    state.place[slotId] = board.card;
    board.card = "";
    var filled = Object.keys(PLACE).every(function (slot) { return state.place[slot] === PLACE[slot]; });
    if (filled) state.opened = true;
    saveState();
    render();
  }

  document.addEventListener("click", function (event) {
    var langBtn = event.target.closest("[data-lang]");
    if (langBtn) {
      lang = langBtn.getAttribute("data-lang") === "ru" ? "ru" : "pl";
      saveLang();
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url.pathname + url.search);
      render();
      return;
    }
    var chip = event.target.closest("[data-chip]");
    if (chip) {
      var chipId = chip.getAttribute("data-chip");
      board.multi[chipId] = !board.multi[chipId];
      render();
      return;
    }
    var hold = event.target.closest("[data-hold]");
    if (hold) {
      board.hold = hold.getAttribute("data-hold");
      render();
      return;
    }
    var bin = event.target.closest("[data-bin]");
    if (bin && board.hold) {
      board.bins[board.hold] = bin.getAttribute("data-bin");
      board.hold = "";
      render();
      return;
    }
    var add = event.target.closest("[data-add]");
    if (add) {
      board.order.push(add.getAttribute("data-add"));
      render();
      return;
    }
    if (event.target.closest("[data-clear]")) {
      board.order.pop();
      render();
      return;
    }
    var flag = event.target.closest("[data-flag]");
    if (flag) {
      board.flags[flag.getAttribute("data-flag")] = flag.getAttribute("data-val") === "1";
      render();
      return;
    }
    var group = event.target.closest("[data-group]");
    if (group) {
      board.groups[group.getAttribute("data-group")] = group.getAttribute("data-choice");
      render();
      return;
    }
    if (event.target.closest("[data-check]")) {
      onCheck();
      return;
    }
    var pick = event.target.closest("[data-pick]");
    if (pick) {
      onPick(pick.getAttribute("data-pick"));
      return;
    }
    var hear = event.target.closest("[data-hear]");
    if (hear) {
      onHear(hear.getAttribute("data-hear"));
      return;
    }
    var arm = event.target.closest("[data-arm]");
    if (arm) {
      board.arm = arm.getAttribute("data-arm");
      render();
      return;
    }
    var civil = event.target.closest("[data-civil]");
    if (civil) {
      onPair(civil.getAttribute("data-civil"));
      return;
    }
    var glyph = event.target.closest("[data-glyph]");
    if (glyph) {
      onGlyph(glyph.getAttribute("data-glyph"));
      return;
    }
    var card = event.target.closest("[data-card]");
    if (card) {
      board.card = card.getAttribute("data-card");
      render();
      return;
    }
    var slot = event.target.closest("[data-slot]");
    if (slot) {
      onSlot(slot.getAttribute("data-slot"));
      return;
    }
    if (event.target.closest("[data-reset]")) {
      state = emptyState();
      board = emptyBoard();
      saveState();
      render();
    }
  });

  document.addEventListener("submit", function (event) {
    var form = event.target.closest("[data-keyform]");
    if (!form) return;
    event.preventDefault();
    if (!gameFinished()) return;
    var field = document.getElementById("capsule-key");
    var value = field ? field.value.replace(/\s/g, "") : "";
    if (value === KEY) {
      state.keyOk = true;
      state.done.matematyka = true;
      saveState();
      flash = copy().fragments.matematyka.k;
      render();
      return;
    }
    flash = copy().stages.matematyka.keyBad;
    render();
  });

  window.addEventListener("pageshow", function () {
    loadState();
    render();
  });

  loadLang();
  saveLang();
  loadState();
  render();
})();
