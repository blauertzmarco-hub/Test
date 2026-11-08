(() => {
  "use strict";

  const STORAGE_KEY = "trainingsplaner.v1";
  const LIMITS = { sets: [1, 20], reps: [1, 100] };
  const QUICK = { sets: [2, 3, 4, 5], reps: [5, 8, 10, 12, 15] };
  const exById = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));

  const $ = (sel, root = document) => root.querySelector(sel);
  const uid = () => Math.random().toString(36).slice(2, 10);
  const clamp = (v, [min, max]) => Math.min(max, Math.max(min, v));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Zustand ----------
  function defaultState() {
    const plan = {
      id: uid(),
      name: "Mein Trainingsplan",
      days: [
        { id: uid(), name: "Tag A – Oberkörper", items: [
          { id: uid(), exId: "lh-bankdruecken", sets: 4, reps: 8, weight: 60, rest: 120, note: "" },
          { id: uid(), exId: "kz-latzug", sets: 3, reps: 10, weight: 50, rest: 90, note: "" },
          { id: uid(), exId: "kh-seitheben", sets: 3, reps: 12, weight: 8, rest: 60, note: "" },
        ] },
        { id: uid(), name: "Tag B – Unterkörper", items: [
          { id: uid(), exId: "lh-kniebeuge", sets: 4, reps: 8, weight: 70, rest: 120, note: "" },
          { id: uid(), exId: "m-beinpresse", sets: 3, reps: 12, weight: 120, rest: 90, note: "" },
          { id: uid(), exId: "plank", sets: 3, reps: 45, weight: null, rest: 60, note: "Sekunden halten" },
        ] },
      ],
    };
    return { currentId: plan.id, plans: [plan] };
  }

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (s && Array.isArray(s.plans) && s.plans.length) return s;
    } catch (_) { /* ignorieren */ }
    return defaultState();
  }

  let state = load();
  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* z. B. privater Modus */ }
  };
  const plan = () => state.plans.find((p) => p.id === state.currentId) || state.plans[0];
  const findDay = (id) => plan().days.find((d) => d.id === id);

  // ---------- Hilfen für Grafiken ----------
  const figureSvg = (ex) => `<svg viewBox="0 0 100 100" aria-hidden="true">${POSES[ex.pose] || POSES.stehen}</svg>`;
  const eqSvg = (key) => EQUIPMENT[key].svg.replace("<svg ", '<svg aria-hidden="true" ');
  const fmtRest = (s) => (s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} min` : `${s} s`);

  // ---------- Darstellung ----------
  function render() {
    renderPlanSelect();
    renderSummary();
    renderDays();
  }

  function renderPlanSelect() {
    const sel = $("#planSelect");
    sel.innerHTML = state.plans.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join("");
    sel.value = plan().id;
    document.title = `${plan().name} – Trainingsplaner`;
  }

  function renderSummary() {
    const p = plan();
    const items = p.days.flatMap((d) => d.items);
    const sets = items.reduce((n, i) => n + i.sets, 0);
    const muscles = new Set(items.flatMap((i) => exById[i.exId]?.muscles || []));
    $("#summary").innerHTML = [
      [p.days.length, "Trainingstage"],
      [items.length, "Übungen"],
      [sets, "Sätze gesamt"],
      [muscles.size, "Muskelgruppen"],
    ].map(([v, l]) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`).join("");
  }

  function renderDays() {
    const wrap = $("#days");
    wrap.innerHTML = "";
    const tpl = $("#dayTpl");
    plan().days.forEach((day) => {
      const el = tpl.content.firstElementChild.cloneNode(true);
      el.dataset.day = day.id;
      $(".day-name", el).value = day.name;
      const totalSets = day.items.reduce((n, i) => n + i.sets, 0);
      const minutes = Math.round(day.items.reduce((t, i) => t + i.sets * (40 + (i.rest || 0)), 0) / 60);
      $(".day-meta", el).textContent = day.items.length ? `${totalSets} Sätze · ca. ${minutes} min` : "";
      $(".ex-list", el).innerHTML = day.items.map((it, idx) => itemHtml(it, idx, day.items.length)).join("");
      wrap.appendChild(el);
    });
  }

  function itemHtml(it, idx, count) {
    const ex = exById[it.exId];
    if (!ex) return "";
    const extras = [
      it.weight ? `${String(it.weight).replace(".", ",")} kg` : null,
      it.rest ? `Pause ${fmtRest(it.rest)}` : null,
      it.note ? esc(it.note) : null,
    ].filter(Boolean).join(" · ");
    return `
      <li class="ex-item" data-item="${it.id}">
        <div class="figure" title="${esc(ex.tip)}">${figureSvg(ex)}</div>
        <div class="ex-info">
          <div class="ex-title"><i class="eq-icon" title="${EQUIPMENT[ex.eq].name}">${eqSvg(ex.eq)}</i><span>${esc(ex.name)}</span></div>
          <div class="ex-dose">
            <span class="pill" title="Sätze">
              <button data-act="dec" data-field="sets" aria-label="Weniger Sätze">−</button>
              <b>${it.sets}</b> Sätze
              <button data-act="inc" data-field="sets" aria-label="Mehr Sätze">＋</button>
            </span>
            <span class="pill" title="Wiederholungen">
              <button data-act="dec" data-field="reps" aria-label="Weniger Wiederholungen">−</button>
              <b>${it.reps}</b> Wdh.
              <button data-act="inc" data-field="reps" aria-label="Mehr Wiederholungen">＋</button>
            </span>
          </div>
          ${extras ? `<div class="ex-sub">${extras}</div>` : ""}
        </div>
        <div class="ex-actions">
          <button class="icon-btn" data-act="up" ${idx === 0 ? "disabled" : ""} aria-label="Nach oben">▲</button>
          <button class="icon-btn" data-act="edit" aria-label="Bearbeiten">✎</button>
          <button class="icon-btn" data-act="down" ${idx === count - 1 ? "disabled" : ""} aria-label="Nach unten">▼</button>
          <button class="icon-btn" data-act="remove" aria-label="Entfernen">✕</button>
        </div>
      </li>`;
  }

  // ---------- Ereignisse: Tage & Übungen ----------
  $("#days").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const dayEl = btn.closest(".day");
    const day = findDay(dayEl.dataset.day);

    if (btn.classList.contains("add-ex")) return openLibrary(day.id);
    if (btn.dataset.act === "delete-day") {
      if (day.items.length && !confirm(`„${day.name}“ mit ${day.items.length} Übung(en) löschen?`)) return;
      plan().days = plan().days.filter((d) => d !== day);
      return commit();
    }

    const itemEl = btn.closest(".ex-item");
    if (!itemEl) return;
    const idx = day.items.findIndex((i) => i.id === itemEl.dataset.item);
    const item = day.items[idx];
    switch (btn.dataset.act) {
      case "inc":
      case "dec": {
        const f = btn.dataset.field;
        item[f] = clamp(item[f] + (btn.dataset.act === "inc" ? 1 : -1), LIMITS[f]);
        break;
      }
      case "up":
        if (idx > 0) [day.items[idx - 1], day.items[idx]] = [day.items[idx], day.items[idx - 1]];
        break;
      case "down":
        if (idx < day.items.length - 1) [day.items[idx + 1], day.items[idx]] = [day.items[idx], day.items[idx + 1]];
        break;
      case "remove":
        day.items.splice(idx, 1);
        break;
      case "edit":
        return openConfig(day.id, item.exId, item);
      default:
        return;
    }
    commit();
  });

  $("#days").addEventListener("change", (e) => {
    if (!e.target.classList.contains("day-name")) return;
    const day = findDay(e.target.closest(".day").dataset.day);
    day.name = e.target.value.trim() || "Trainingstag";
    commit();
  });

  $("#addDayBtn").addEventListener("click", () => {
    const n = plan().days.length;
    plan().days.push({ id: uid(), name: `Tag ${String.fromCharCode(65 + (n % 26))}`, items: [] });
    commit();
    const last = $("#days").lastElementChild;
    last?.scrollIntoView({ behavior: "smooth", block: "center" });
    $(".day-name", last)?.select();
  });

  // ---------- Pläne ----------
  $("#planSelect").addEventListener("change", (e) => {
    state.currentId = e.target.value;
    commit();
  });

  $("#newPlanBtn").addEventListener("click", () => {
    const name = prompt("Name des neuen Trainingsplans:", "Neuer Plan");
    if (name === null) return;
    const p = { id: uid(), name: name.trim() || "Neuer Plan", days: [{ id: uid(), name: "Tag A", items: [] }] };
    state.plans.push(p);
    state.currentId = p.id;
    commit();
  });

  const menu = $("#menu");
  const menuBtn = $("#menuBtn");
  const toggleMenu = (open) => {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
  };
  menuBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMenu(menu.hidden); });
  document.addEventListener("click", (e) => { if (!menu.contains(e.target)) toggleMenu(false); });

  menu.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    toggleMenu(false);
    const p = plan();
    switch (action) {
      case "rename": {
        const name = prompt("Neuer Name:", p.name);
        if (name && name.trim()) { p.name = name.trim(); commit(); }
        break;
      }
      case "duplicate": {
        const copy = JSON.parse(JSON.stringify(p));
        copy.id = uid();
        copy.name = `${p.name} (Kopie)`;
        copy.days.forEach((d) => { d.id = uid(); d.items.forEach((i) => { i.id = uid(); }); });
        state.plans.push(copy);
        state.currentId = copy.id;
        commit();
        break;
      }
      case "delete":
        if (!confirm(`Plan „${p.name}“ wirklich löschen?`)) return;
        state.plans = state.plans.filter((x) => x !== p);
        if (!state.plans.length) state = defaultState();
        state.currentId = state.plans[0].id;
        commit();
        break;
      case "print":
        window.print();
        break;
      case "export": {
        const blob = new Blob([JSON.stringify(p, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${p.name.replace(/[^\wäöüÄÖÜß -]/g, "").trim() || "trainingsplan"}.json`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        break;
      }
      case "import":
        $("#importFile").click();
        break;
    }
  });

  $("#importFile").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      const p = JSON.parse(await file.text());
      if (!p || !Array.isArray(p.days)) throw new Error("Kein gültiger Trainingsplan");
      const clean = {
        id: uid(),
        name: String(p.name || "Importierter Plan").slice(0, 80),
        days: p.days.map((d) => ({
          id: uid(),
          name: String(d.name || "Tag").slice(0, 60),
          items: (d.items || []).filter((i) => exById[i.exId]).map((i) => ({
            id: uid(),
            exId: i.exId,
            sets: clamp(parseInt(i.sets, 10) || 3, LIMITS.sets),
            reps: clamp(parseInt(i.reps, 10) || 10, LIMITS.reps),
            weight: Number(i.weight) > 0 ? Number(i.weight) : null,
            rest: Math.max(0, parseInt(i.rest, 10) || 0),
            note: String(i.note || "").slice(0, 120),
          })),
        })),
      };
      state.plans.push(clean);
      state.currentId = clean.id;
      commit();
    } catch (err) {
      alert(`Import fehlgeschlagen: ${err.message}`);
    }
  });

  function commit() {
    save();
    render();
  }

  // ---------- Übungsbibliothek ----------
  const dlg = $("#library");
  const filters = { eq: null, muscle: null, q: "" };
  let target = { dayId: null, exId: null, item: null };

  function openLibrary(dayId) {
    target = { dayId, exId: null, item: null };
    $("#libTitle").textContent = "Übung hinzufügen";
    $("#libSubtitle").textContent = `zu „${findDay(dayId).name}“ – wähle Gerät, Muskelgruppe oder suche direkt`;
    showBrowse();
    dlg.showModal();
    renderLibrary();
  }

  function showBrowse() {
    $("#libBrowse").hidden = false;
    $("#libConfig").hidden = true;
  }

  function renderLibrary() {
    $("#equipGrid").innerHTML = Object.entries(EQUIPMENT).map(([key, eq]) =>
      `<button type="button" class="equip" data-eq="${key}" aria-pressed="${filters.eq === key}">${eq.svg}<span>${eq.name}</span></button>`
    ).join("");

    $("#muscleChips").innerHTML = MUSCLES.map((m) =>
      `<button type="button" class="chip" data-muscle="${m}" aria-pressed="${filters.muscle === m}">${m}</button>`
    ).join("");

    const q = filters.q.toLowerCase();
    const list = EXERCISES.filter((ex) =>
      (!filters.eq || ex.eq === filters.eq) &&
      (!filters.muscle || ex.muscles.includes(filters.muscle)) &&
      (!q || ex.name.toLowerCase().includes(q) || ex.muscles.join(" ").toLowerCase().includes(q) || EQUIPMENT[ex.eq].name.toLowerCase().includes(q))
    );

    $("#exGrid").innerHTML = list.length
      ? list.map((ex) => `
        <button type="button" class="ex-card" data-ex="${ex.id}">
          <div class="figure">${figureSvg(ex)}<span class="eq-badge" title="${EQUIPMENT[ex.eq].name}">${eqSvg(ex.eq)}</span></div>
          <strong>${esc(ex.name)}</strong>
          <small>${EQUIPMENT[ex.eq].name} · ${ex.muscles.join(", ")}</small>
        </button>`).join("")
      : `<p class="empty">Keine Übung gefunden. Filter zurücksetzen?</p>`;
  }

  $("#equipGrid").addEventListener("click", (e) => {
    const b = e.target.closest(".equip");
    if (!b) return;
    filters.eq = filters.eq === b.dataset.eq ? null : b.dataset.eq;
    renderLibrary();
  });
  $("#muscleChips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    filters.muscle = filters.muscle === b.dataset.muscle ? null : b.dataset.muscle;
    renderLibrary();
  });
  $("#search").addEventListener("input", (e) => {
    filters.q = e.target.value.trim();
    renderLibrary();
  });
  $("#exGrid").addEventListener("click", (e) => {
    const b = e.target.closest(".ex-card");
    if (b) openConfig(target.dayId, b.dataset.ex, null);
  });

  // ---------- Sätze & Wiederholungen festlegen ----------
  const cfg = { sets: 3, reps: 10 };

  function openConfig(dayId, exId, item) {
    const ex = exById[exId];
    target = { dayId, exId, item };
    cfg.sets = item ? item.sets : 3;
    cfg.reps = item ? item.reps : (ex.pose === "plank" ? 30 : 10);
    $("#cfgWeight").value = item?.weight ?? "";
    $("#cfgRest").value = item ? item.rest : 90;
    $("#cfgNote").value = item?.note ?? "";

    $("#libTitle").textContent = item ? "Übung bearbeiten" : "Sätze & Wiederholungen";
    $("#libSubtitle").textContent = findDay(dayId).name;
    $("#saveExBtn").textContent = item ? "Speichern" : "Hinzufügen";
    $("#backBtn").textContent = item ? "Abbrechen" : "← Zurück";

    $("#configPreview").innerHTML = `
      <div class="figure">${figureSvg(ex)}</div>
      <div>
        <h3>${esc(ex.name)}</h3>
        <div class="ex-title muted"><i class="eq-icon">${eqSvg(ex.eq)}</i><span>${EQUIPMENT[ex.eq].name}</span></div>
        <p class="tag">${ex.muscles.join(" · ")}</p>
        <p>${esc(ex.tip)}</p>
      </div>`;

    $("#libBrowse").hidden = true;
    $("#libConfig").hidden = false;
    renderSteppers();
    if (!dlg.open) dlg.showModal();
  }

  function renderSteppers() {
    document.querySelectorAll("#libConfig .stepper").forEach((s) => {
      $("output", s).textContent = cfg[s.dataset.field];
    });
    document.querySelectorAll("#libConfig .quick").forEach((q) => {
      const f = q.dataset.for;
      q.innerHTML = QUICK[f].map((v) =>
        `<button type="button" class="chip" data-quick="${v}" aria-pressed="${cfg[f] === v}">${v}</button>`
      ).join("");
    });
  }

  $("#libConfig").addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    if (step) {
      const f = step.closest(".stepper").dataset.field;
      cfg[f] = clamp(cfg[f] + Number(step.dataset.step), LIMITS[f]);
      return renderSteppers();
    }
    const quick = e.target.closest("[data-quick]");
    if (quick) {
      cfg[quick.closest(".quick").dataset.for] = Number(quick.dataset.quick);
      renderSteppers();
    }
  });

  $("#backBtn").addEventListener("click", () => {
    if (target.item) return dlg.close();
    $("#libTitle").textContent = "Übung hinzufügen";
    $("#libSubtitle").textContent = `zu „${findDay(target.dayId).name}“`;
    showBrowse();
  });

  $("#libConfig").addEventListener("submit", (e) => {
    e.preventDefault();
    const weight = parseFloat(String($("#cfgWeight").value).replace(",", "."));
    const data = {
      sets: cfg.sets,
      reps: cfg.reps,
      weight: weight > 0 ? weight : null,
      rest: Math.max(0, parseInt($("#cfgRest").value, 10) || 0),
      note: $("#cfgNote").value.trim(),
    };
    if (target.item) {
      Object.assign(target.item, data);
    } else {
      findDay(target.dayId).items.push({ id: uid(), exId: target.exId, ...data });
    }
    dlg.close();
    commit();
  });

  dlg.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]") || e.target === dlg) dlg.close();
  });

  render();
})();
