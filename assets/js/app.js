(function () {
  "use strict";

  const D = window.CSAHR;
  const page = document.body.dataset.page;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const AGE_GROUPS = [
    { id: "4-5", label: "4-5 ans", max: 5 },
    { id: "6-11", label: "6-11 ans", max: 11 },
    { id: "12-17", label: "12-17 ans", max: 17 },
    { id: "adulte", label: "Adulte", max: 99 },
  ];

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tel = (p) => "tel:+33" + p.replace(/\s/g, "").replace(/^0/, "");
  const hour = (t) => t.replace(":", "h").replace(/h00$/, "h");
  const range = (s) => (s.end ? `${hour(s.start)} – ${hour(s.end)}` : `Dès ${hour(s.start)}`);
  const euro = (n) => n.toLocaleString("fr-FR") + " €";
  const mapUrl = (v) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.name + ", " + v.address);
  const byId = (id) => D.disciplines.find((d) => d.id === id);
  const audience = (d) => d.audience || AGE_GROUPS.filter((g) => d.minAge != null && g.max >= d.minAge).map((g) => g.id);
  const initials = (name) => name.split(/[\s,&-]+/).filter((w) => /^[A-ZÀ-Ý]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

  const ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    gift: '<path d="M4 11h16v10H4zM2 7h20v4H2zM12 7v14M12 7c-2-4-6-4-6-1s6 1 6 1zm0 0c2-4 6-4 6-1s-6 1-6 1z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
  const ENSO = '<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M33.5 8.6A18 18 0 1 0 41.6 21" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/><circle cx="24" cy="24" r="5" fill="currentColor"/></svg>';

  /* ---------- Layout ---------- */
  const NAV = [
    { href: "index.html#disciplines", label: "Disciplines", page: "discipline" },
    { href: "planning.html", label: "Planning", page: "planning" },
    { href: "infos.html", label: "Tarifs & inscription", page: "infos" },
    { href: "club.html", label: "Le club", page: "club" },
  ];

  function renderHeader() {
    const el = $("#site-header");
    if (!el) return;
    el.className = "site-header";
    el.innerHTML = `
      <div class="wrap">
        <a class="brand" href="index.html" aria-label="CSAHR — accueil">
          ${ENSO}
          <span class="brand-text"><strong>CSAHR</strong><span>Arts martiaux · Rueil-Malmaison</span></span>
        </a>
        <nav class="nav" id="nav" aria-label="Navigation principale">
          ${NAV.map((n) => `<a href="${n.href}"${n.page === page ? ' aria-current="page"' : ""}>${n.label}</a>`).join("")}
          <a class="btn btn--primary" href="infos.html#essai">Cours d'essai gratuit</a>
        </nav>
        <a class="btn btn--primary btn--sm header-cta" href="infos.html#essai">Cours d'essai gratuit</a>
        <button class="menu-toggle" aria-expanded="false" aria-controls="nav" aria-label="Ouvrir le menu">${icon("menu")}</button>
      </div>`;
    const btn = $(".menu-toggle", el);
    const nav = $("#nav", el);
    const set = (open) => {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      btn.innerHTML = icon(open ? "close" : "menu");
    };
    btn.addEventListener("click", () => set(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => e.target.closest("a") && set(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && set(false));
  }

  function renderFooter() {
    const el = $("#site-footer");
    if (!el) return;
    const c = D.club;
    el.className = "site-footer";
    el.innerHTML = `
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <a class="brand" href="index.html">${ENSO}<span class="brand-text"><strong>CSAHR</strong><span>${esc(c.fullName)}</span></span></a>
            <p style="margin-top:16px;max-width:36ch">Association loi 1901 fondée en ${c.founded}. ${esc(c.members)} adhérents, ${D.disciplines.length} disciplines, enfants et adultes.</p>
          </div>
          <div>
            <h2>Disciplines</h2>
            <ul>${D.disciplines.slice(0, 6).map((d) => `<li><a href="discipline.html?id=${d.id}">${esc(d.name)}</a></li>`).join("")}
              <li><a href="index.html#disciplines">Toutes les disciplines →</a></li></ul>
          </div>
          <div>
            <h2>Infos pratiques</h2>
            <ul>
              <li><a href="planning.html">Planning des cours</a></li>
              <li><a href="infos.html#tarifs">Tarifs ${esc(c.season)}</a></li>
              <li><a href="infos.html#faq">Questions fréquentes</a></li>
              <li><a href="infos.html#lieux">Lieux d'entraînement</a></li>
              <li><a href="club.html">Histoire & professeurs</a></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href="mailto:${c.email}">${c.email}</a></li>
              <li><a href="${tel(c.phone)}">${c.phone}</a></li>
              <li>${esc(c.address)}</li>
              <li><a href="${c.facebook}" rel="noopener" target="_blank">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${esc(c.fullName)}</span>
          <span>Saison ${esc(c.season)} · ${esc(c.seasonStart)}</span>
        </div>
      </div>`;

    const m = document.createElement("div");
    m.className = "mobile-cta";
    m.innerHTML = `<a class="btn btn--ghost" href="planning.html">${icon("calendar")}Planning</a><a class="btn btn--primary" href="infos.html#essai">Essai gratuit</a>`;
    document.body.appendChild(m);
  }

  /* ---------- Shared components ---------- */
  function cardHTML(d) {
    const days = [...new Set(d.slots.map((s) => s.day))].map((i) => DAYS[i].slice(0, 3)).join(" · ");
    return `
      <a class="dcard" href="discipline.html?id=${d.id}" data-family="${d.family}">
        <div class="meta"><span class="tag tag--fam">${esc(D.families[d.family])}</span><span class="tag">${esc(d.ages)}</span></div>
        <h3>${esc(d.name)}</h3>
        <p>${esc(d.pitch)}</p>
        <div class="meta">${days ? `<span class="tag">${icon("calendar").replace("<svg", '<svg width="14" height="14" style="margin-right:6px"')}${days}</span>` : ""}</div>
        <span class="go">Découvrir ${icon("arrow")}</span>
      </a>`;
  }

  function venuesHTML() {
    return Object.values(D.venues)
      .map((v) => `
        <article class="venue">
          <h3>${esc(v.name)}</h3>
          <p>${esc(v.address)}</p>
          ${v.note ? `<small>${esc(v.note)}</small>` : ""}
          <a class="link" href="${mapUrl(v)}" target="_blank" rel="noopener">Itinéraire →</a>
        </article>`)
      .join("");
  }

  function faqHTML(items) {
    return items.map((f) => `<details><summary>${esc(f.q)}</summary><div><p>${esc(f.a)}</p></div></details>`).join("");
  }

  function chipGroup(container, options, { multi = false, onChange }) {
    container.innerHTML = options.map((o) => `<button type="button" class="chip" data-value="${o.id}" aria-pressed="false">${esc(o.label)}</button>`).join("");
    const state = new Set();
    container.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      const v = b.dataset.value;
      if (state.has(v)) state.delete(v);
      else {
        if (!multi) state.clear();
        state.add(v);
      }
      $$(".chip", container).forEach((c) => c.setAttribute("aria-pressed", state.has(c.dataset.value)));
      onChange(state);
    });
    return state;
  }

  /* ---------- Pages ---------- */
  function home() {
    $("#stat-members").textContent = D.club.members;
    $("#stat-disciplines").textContent = D.disciplines.length;
    $("#stat-founded").textContent = D.club.founded;
    $("#stat-slots").textContent = D.disciplines.reduce((n, d) => n + d.slots.length, 0) + "+";

    // Finder
    let age = null, fam = null;
    const list = $("#finder-list");
    const count = $("#finder-count");
    const update = () => {
      const res = D.disciplines.filter((d) => (!age || audience(d).includes(age)) && (!fam || d.family === fam));
      count.textContent = !age && !fam ? `${res.length} disciplines au choix` : `${res.length} discipline${res.length > 1 ? "s" : ""} pour vous`;
      list.innerHTML = res.length
        ? res.map((d) => `<li><a href="discipline.html?id=${d.id}"><span><strong>${esc(d.name)}</strong><br><small>${esc(d.ages)}</small></span>${icon("arrow").replace("<svg", '<svg width="18" height="18"')}</a></li>`).join("")
        : `<li class="empty">Aucune discipline ne correspond. Essayez une autre combinaison.</li>`;
    };
    chipGroup($("#finder-age"), AGE_GROUPS, { onChange: (s) => { age = [...s][0] || null; update(); } });
    chipGroup($("#finder-family"), Object.entries(D.families).map(([id, label]) => ({ id, label })), { onChange: (s) => { fam = [...s][0] || null; update(); } });
    update();

    // Grid
    const grid = $("#discipline-grid");
    const renderGrid = (f) => {
      const res = D.disciplines.filter((d) => !f || d.family === f);
      grid.innerHTML = res.map(cardHTML).join("");
    };
    const filters = $("#grid-filters");
    const opts = [{ id: "", label: "Toutes" }, ...Object.entries(D.families).map(([id, label]) => ({ id, label }))];
    filters.innerHTML = opts.map((o, i) => `<button type="button" class="chip" data-value="${o.id}" aria-pressed="${i === 0}">${esc(o.label)}</button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      $$(".chip", filters).forEach((c) => c.setAttribute("aria-pressed", c === b));
      renderGrid(b.dataset.value);
    });
    renderGrid("");

    $("#venues").innerHTML = venuesHTML();
    $("#faq").innerHTML = faqHTML(D.faq.slice(0, 4));
  }

  function discipline() {
    const id = new URLSearchParams(location.search).get("id");
    const d = byId(id);
    const main = $("#main");
    if (!d) {
      main.innerHTML = `<section class="page-head"><div class="wrap"><h1>Discipline introuvable</h1><p class="lead">Cette page n'existe pas ou a été déplacée.</p><a class="btn btn--primary" href="index.html#disciplines">Voir toutes les disciplines</a></div></section>`;
      return;
    }
    document.title = `${d.name} à Rueil-Malmaison — CSAHR`;
    $('meta[name="description"]').setAttribute("content", `${d.name} au CSAHR, Rueil-Malmaison : ${d.pitch}`);

    const venueIds = [...new Set(d.slots.map((s) => s.venue).filter(Boolean).concat(d.venueHint || []))];
    const venues = venueIds.map((v) => D.venues[v]);
    const others = D.disciplines.filter((o) => o.family === d.family && o.id !== d.id).concat(D.disciplines.filter((o) => o.family !== d.family)).slice(0, 3);

    main.innerHTML = `
      <section class="page-head" data-family="${d.family}">
        <div class="wrap">
          <nav class="crumbs" aria-label="Fil d'Ariane"><a href="index.html">Accueil</a> / <a href="index.html#disciplines">Disciplines</a> / ${esc(d.name)}</nav>
          <span class="tag tag--fam">${esc(D.families[d.family])}</span>
          <h1 style="margin-top:14px">${esc(d.name)}</h1>
          <p class="lead">${esc(d.pitch)}</p>
        </div>
      </section>
      <section class="section" style="padding-top:40px">
        <div class="wrap detail-grid">
          <div>
            <div class="facts">
              <div class="fact"><small>Public</small><strong>${esc(d.ages)}</strong></div>
              <div class="fact"><small>Professeur${/[&·,]/.test(d.teacher) ? "s" : ""}</small><strong>${esc(d.teacher)}</strong></div>
              <div class="fact"><small>Essai</small><strong>1er cours gratuit</strong></div>
            </div>
            <h2 style="font-size:1.6rem;margin-top:32px">La discipline</h2>
            <p>${esc(d.body)}</p>

            <h2 style="font-size:1.6rem;margin-top:40px" id="horaires">Horaires</h2>
            ${d.slots.length
              ? `<ul class="slot-list">${d.slots.map((s) => `<li><span class="d">${DAYS[s.day]}</span><span><span class="t">${range(s)}</span><span class="l">${esc(s.level)}${s.venue ? " · " + esc(D.venues[s.venue].name) : ""}</span></span></li>`).join("")}</ul>
                 <p class="note">Planning de la saison ${esc(D.club.season)}. <a href="planning.html?d=${d.id}">Voir dans le planning général →</a></p>`
              : `<div class="callout">${icon("info")}<p>Les créneaux de cette discipline sont communiqués par ${d.phone ? `le professeur au <a href="${tel(d.phone)}"><strong>${d.phone}</strong></a>` : `le club à <a href="mailto:${D.club.email}"><strong>${D.club.email}</strong></a>`}.</p></div>`}

            ${venues.length ? `<h2 style="font-size:1.6rem;margin-top:40px">Où ?</h2><div class="venues">${venues.map((v) => `<article class="venue"><h3>${esc(v.name)}</h3><p>${esc(v.address)}</p><a class="link" href="${mapUrl(v)}" target="_blank" rel="noopener">Itinéraire →</a></article>`).join("")}</div>` : ""}
          </div>

          <aside class="detail-aside">
            <div class="panel" id="essai">
              <h2>Essayez gratuitement</h2>
              <p style="color:var(--ink-2);font-size:.95rem">Le premier cours est offert, sans engagement. Prévenez le professeur et venez en tenue de sport.</p>
              ${d.phone ? `<a class="contact-line" href="${tel(d.phone)}">${icon("phone")}${d.phone}</a>` : ""}
              <a class="contact-line" href="mailto:${D.club.email}?subject=${encodeURIComponent("Cours d'essai — " + d.name)}">${icon("mail")}${D.club.email}</a>
              <a class="btn btn--primary" style="width:100%;margin-top:8px" href="${d.phone ? tel(d.phone) : "mailto:" + D.club.email}">${d.phone ? "Appeler le professeur" : "Écrire au club"}</a>
            </div>
            <div class="panel">
              <h2>Tarifs ${esc(D.club.season)}</h2>
              ${d.prices.length
                ? `<ul class="price-list">${d.prices.map((p) => `<li><span>${esc(p.label)}${p.detail ? `<small>${esc(p.detail)}</small>` : ""}</span><strong>${euro(p.amount)}</strong></li>`).join("")}</ul>`
                : `<p style="color:var(--ink-2);font-size:.95rem;margin:0">Tarifs communiqués sur demande auprès du professeur.</p>`}
              <p class="note">Cotisation annuelle, licence incluse. Chèque, espèces ou Pass+. <a href="infos.html#paiement">Modalités →</a></p>
            </div>
          </aside>
        </div>
      </section>
      <section class="section section--tint">
        <div class="wrap">
          <div class="section-head"><h2>Vous aimerez aussi</h2><a class="btn btn--ghost btn--sm" href="index.html#disciplines">Toutes les disciplines</a></div>
          <div class="grid-cards">${others.map(cardHTML).join("")}</div>
        </div>
      </section>`;
  }

  function planning() {
    const params = new URLSearchParams(location.search);
    const state = { d: params.get("d") || "", fam: "", venue: "", age: "" };

    const sel = $("#f-discipline");
    sel.innerHTML = `<option value="">Toutes les disciplines</option>` + D.disciplines.filter((d) => d.slots.length).map((d) => `<option value="${d.id}">${esc(d.name)}</option>`).join("");
    sel.value = state.d;
    const vsel = $("#f-venue");
    vsel.innerHTML = `<option value="">Tous les lieux</option>` + Object.entries(D.venues).map(([id, v]) => `<option value="${id}">${esc(v.name)}</option>`).join("");

    const famBox = $("#f-family");
    famBox.innerHTML = [{ id: "", label: "Toutes" }, ...Object.entries(D.families).map(([id, label]) => ({ id, label }))]
      .map((o) => `<button type="button" class="chip" data-value="${o.id}" aria-pressed="${o.id === ""}">${esc(o.label)}</button>`).join("");
    const ageBox = $("#f-age");
    ageBox.innerHTML = [{ id: "", label: "Tous âges" }, ...AGE_GROUPS]
      .map((o) => `<button type="button" class="chip" data-value="${o.id}" aria-pressed="${o.id === ""}">${esc(o.label)}</button>`).join("");

    const bindChips = (box, key) => box.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state[key] = b.dataset.value;
      $$(".chip", box).forEach((c) => c.setAttribute("aria-pressed", c === b));
      render();
    });
    bindChips(famBox, "fam");
    bindChips(ageBox, "age");
    sel.addEventListener("change", () => { state.d = sel.value; render(); });
    vsel.addEventListener("change", () => { state.venue = vsel.value; render(); });

    const today = (new Date().getDay() + 6) % 7;
    const week = $("#week");

    function render() {
      const url = new URL(location);
      state.d ? url.searchParams.set("d", state.d) : url.searchParams.delete("d");
      history.replaceState(null, "", url);

      const slots = [];
      D.disciplines.forEach((d) => {
        if (state.d && d.id !== state.d) return;
        if (state.fam && d.family !== state.fam) return;
        if (state.age && !audience(d).includes(state.age)) return;
        d.slots.forEach((s) => {
          if (state.venue && s.venue !== state.venue) return;
          slots.push({ ...s, d });
        });
      });
      slots.sort((a, b) => a.start.localeCompare(b.start));
      let total = 0;
      week.innerHTML = DAYS.slice(0, 6).map((name, i) => {
        const items = slots.filter((s) => s.day === i);
        total += items.length;
        return `<section class="day${i === today ? " is-today" : ""}" aria-label="${name}">
          <h2>${name}${i === today ? ' <span class="today-pill">Auj.</span>' : ""}</h2>
          ${items.length ? `<ol>${items.map((s) => `<li><a class="slot" data-family="${s.d.family}" href="discipline.html?id=${s.d.id}">
            <time>${range(s)}</time><strong>${esc(s.d.name)}</strong><span>${esc(s.level)}</span>${s.venue ? `<span>${esc(D.venues[s.venue].short)}</span>` : ""}</a></li>`).join("")}</ol>` : `<p class="day-empty">Pas de cours</p>`}
        </section>`;
      }).join("");
      $("#result-count").textContent = `${total} créneau${total > 1 ? "x" : ""} affiché${total > 1 ? "s" : ""}`;
    }
    render();

    $("#legend").innerHTML = Object.entries(D.families).map(([id, l]) => `<span data-family="${id}"><i></i>${esc(l)}</span>`).join("");
    const noSlots = D.disciplines.filter((d) => !d.slots.length);
    $("#no-slots").innerHTML = noSlots.length
      ? `${icon("info")}<p>Les horaires de ${noSlots.map((d) => `<a href="discipline.html?id=${d.id}"><strong>${esc(d.name)}</strong></a>`).join(", ")} sont communiqués directement par les professeurs. Retrouvez leurs contacts sur chaque page.</p>`
      : "";
  }

  function infos() {
    const rows = [];
    D.disciplines.forEach((d) => {
      if (!d.prices.length) rows.push(`<tr><td><a href="discipline.html?id=${d.id}">${esc(d.name)}</a></td><td colspan="2" style="color:var(--muted)">Sur demande auprès du professeur</td><td class="amount">—</td></tr>`);
      d.prices.forEach((p, i) => rows.push(`<tr><td>${i === 0 ? `<a href="discipline.html?id=${d.id}">${esc(d.name)}</a>` : ""}</td><td>${esc(p.label)}</td><td style="color:var(--muted)">${esc(p.detail)}</td><td class="amount">${euro(p.amount)}</td></tr>`));
    });
    $("#price-rows").innerHTML = rows.join("");
    $("#faq").innerHTML = faqHTML(D.faq);
    $("#venues").innerHTML = venuesHTML();
    $$("[data-season]").forEach((e) => (e.textContent = D.club.season));
    $("#trial-contacts").innerHTML = D.teachers.filter((t) => t.phone).map((t) => `<li><a class="contact-line" href="${tel(t.phone)}">${icon("phone")}<span>${esc(t.role)} <small style="display:block;font-weight:500;color:var(--muted)">${esc(t.name)} · ${t.phone}</small></span></a></li>`).join("");
  }

  function club() {
    $("#timeline").innerHTML = D.history.map((h) => `<li><strong>${esc(h.year)}</strong><p>${esc(h.text)}</p></li>`).join("");
    $("#teachers").innerHTML = D.teachers.map((t) => `
      <article class="teacher">
        <span class="avatar" aria-hidden="true">${esc(initials(t.name))}</span>
        <h3>${esc(t.name)}</h3>
        <span class="role">${esc(t.role)}</span>
        <p>${esc(t.detail)}</p>
        ${t.phone ? `<a href="${tel(t.phone)}">${t.phone}</a>` : ""}
      </article>`).join("");
    $("#club-members").textContent = D.club.members;
    $("#club-disciplines").textContent = D.disciplines.length;
  }

  renderHeader();
  renderFooter();
  ({ home, discipline, planning, infos, club })[page]?.();
})();
