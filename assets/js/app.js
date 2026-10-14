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

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tel = (p) => "tel:+33" + p.replace(/\s/g, "").replace(/^0/, "");
  const hour = (t) => t.replace(":", "h").replace(/h00$/, "h");
  const range = (s) => (s.end ? `${hour(s.start)} – ${hour(s.end)}` : `à partir de ${hour(s.start)}`);
  const euro = (n) => n.toLocaleString("fr-FR") + " €";
  const mapUrl = (v) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.name + ", " + v.address);
  const byId = (id) => D.disciplines.find((d) => d.id === id);
  const audience = (d) => d.audience || AGE_GROUPS.filter((g) => d.minAge != null && g.max >= d.minAge).map((g) => g.id);
  const initials = (name) => name.split(/[\s,&-]+/).filter((w) => /^[A-ZÀ-Ý]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
  const options = (list, all) => `<option value="">${all}</option>` + list.map((o) => `<option value="${o.id}">${esc(o.label)}</option>`).join("");
  const FAMILIES = Object.entries(D.families).map(([id, label]) => ({ id, label }));

  // Photo, ou bloc sombre avec le nom en filigrane tant qu'il n'y a pas de photo.
  const photo = (src, label, cls = "") =>
    `<div class="photo ${cls}">${src ? `<img src="${esc(src)}" alt="${esc(label)}" loading="lazy">` : `<span class="ph-label" aria-hidden="true">${esc(label)}</span>`}</div>`;
  const dPhoto = (d) => D.photos.disciplines[d.id];

  const ICONS = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">${ICONS[name]}</svg>`;
  const BELTS = `<div class="belts" aria-hidden="true">${"<i></i>".repeat(7)}</div>`;

  /* ---------- En-tête / pied de page ---------- */
  const NAV = [
    { href: "index.html#disciplines", label: "Disciplines", page: "discipline" },
    { href: "planning.html", label: "Horaires", page: "planning" },
    { href: "infos.html", label: "Tarifs & inscriptions", page: "infos" },
    { href: "club.html", label: "Le club", page: "club" },
  ];

  function renderHeader() {
    const el = $("#site-header");
    el.className = "site-header";
    el.innerHTML = `${BELTS}
      <div class="wrap bar">
        <a class="logo" href="index.html"><b>CSAHR</b><span>Arts martiaux · Rueil-Malmaison</span></a>
        <nav class="nav" id="nav" aria-label="Navigation principale">
          ${NAV.map((n) => `<a href="${n.href}"${n.page === page ? ' aria-current="page"' : ""}>${n.label}</a>`).join("")}
          <a class="btn btn--primary" href="infos.html#essai">Cours d'essai gratuit</a>
        </nav>
        <a class="btn btn--primary header-cta" href="infos.html#essai">Cours d'essai gratuit</a>
        <button class="menu-toggle" aria-expanded="false" aria-controls="nav" aria-label="Menu">${icon("menu")}</button>
      </div>`;
    const btn = $(".menu-toggle", el);
    const nav = $("#nav", el);
    const set = (open) => {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open);
      btn.innerHTML = icon(open ? "close" : "menu");
    };
    btn.addEventListener("click", () => set(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => e.target.closest("a") && set(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && set(false));
  }

  function renderFooter() {
    const el = $("#site-footer");
    const c = D.club;
    el.className = "site-footer";
    el.innerHTML = `${BELTS}
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <a class="logo" href="index.html"><b>CSAHR</b></a>
            <p style="margin-top:12px;max-width:34ch">${esc(c.fullName)}. Association loi 1901, fondée en ${c.founded}.</p>
          </div>
          <div>
            <h2>Disciplines</h2>
            <ul>${D.disciplines.map((d) => `<li><a href="discipline.html#${d.id}">${esc(d.name)}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h2>Pratique</h2>
            <ul>
              <li><a href="planning.html">Horaires</a></li>
              <li><a href="infos.html#tarifs">Tarifs ${esc(c.season)}</a></li>
              <li><a href="infos.html#faq">Questions fréquentes</a></li>
              <li><a href="index.html#lieux">Salles</a></li>
              <li><a href="club.html">Le club</a></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>${esc(c.address)}</li>
              <li><a href="${tel(c.phone)}">${c.phone}</a></li>
              <li><a href="mailto:${c.email}">${c.email}</a></li>
              <li><a href="${c.facebook}" rel="noopener" target="_blank">Page Facebook</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} CSAHR</span>
          <span>${esc(c.seasonStart)}</span>
        </div>
      </div>`;

    const m = document.createElement("div");
    m.className = "mobile-cta";
    m.innerHTML = `<a class="btn btn--line" href="planning.html">Horaires</a><a class="btn btn--primary" href="infos.html#essai">Essai gratuit</a>`;
    document.body.appendChild(m);
  }

  /* ---------- Blocs partagés ---------- */
  function cardHTML(d) {
    return `
      <a class="dcard" href="discipline.html#${d.id}">
        <div style="position:relative">${photo(dPhoto(d), d.name)}<span class="age">${esc(d.ages)}</span></div>
        <h3>${esc(d.name)}</h3>
        <p class="who">${esc(d.teacher)}</p>
        <p>${esc(d.pitch)}</p>
      </a>`;
  }

  const venuesHTML = () =>
    Object.values(D.venues).map((v) => `
      <div class="venue">
        <h3>${esc(v.name)}</h3>
        <p>${esc(v.address)}${v.note ? `<small>${esc(v.note)}</small>` : ""}</p>
        <a href="${mapUrl(v)}" target="_blank" rel="noopener">Voir sur la carte</a>
      </div>`).join("");

  const faqHTML = (items) => items.map((f) => `<details><summary>${esc(f.q)}</summary><div><p>${esc(f.a)}</p></div></details>`).join("");

  /* ---------- Pages ---------- */
  function home() {
    $("#hero-photo").outerHTML = photo(D.photos.hero, "");
    $("#club-photo").outerHTML = photo(D.photos.club, "CSAHR");
    $("#fig-members").textContent = D.club.members;
    $("#fig-disciplines").textContent = D.disciplines.length;
    $("#fig-founded").textContent = D.club.founded;

    const age = $("#q-age");
    const fam = $("#q-family");
    age.innerHTML = options(AGE_GROUPS, "Tous les âges");
    fam.innerHTML = options(FAMILIES, "Toutes les disciplines");
    const grid = $("#discipline-grid");
    const count = $("#q-count");
    const update = () => {
      const res = D.disciplines.filter((d) => (!age.value || audience(d).includes(age.value)) && (!fam.value || d.family === fam.value));
      grid.innerHTML = res.length ? res.map(cardHTML).join("") : `<p class="none">Aucun cours ne correspond. Changez l'âge ou le type de discipline.</p>`;
      count.textContent = age.value || fam.value ? `${res.length} discipline${res.length > 1 ? "s" : ""} correspond${res.length > 1 ? "ent" : ""} à votre recherche.` : "";
    };
    age.addEventListener("change", update);
    fam.addEventListener("change", update);
    $("#finder").addEventListener("submit", (e) => { e.preventDefault(); $("#disciplines").scrollIntoView({ behavior: "smooth" }); });
    update();

    $("#venues").innerHTML = venuesHTML();
    $("#faq").innerHTML = faqHTML(D.faq.slice(0, 4));
  }

  function discipline() {
    const id = location.hash.slice(1) || new URLSearchParams(location.search).get("id");
    const d = byId(id);
    const main = $("#main");
    if (!d) {
      main.innerHTML = `<section class="page-head"><div class="wrap"><h1>Page introuvable</h1><p class="intro">Cette discipline n'existe pas ou a changé d'adresse.</p><a class="btn btn--primary" href="index.html#disciplines">Voir les disciplines</a></div></section>`;
      return;
    }
    document.title = `${d.name} à Rueil-Malmaison | CSAHR`;
    $('meta[name="description"]').setAttribute("content", `${d.name} au CSAHR, Rueil-Malmaison. ${d.pitch}`);

    const venueIds = [...new Set(d.slots.map((s) => s.venue).filter(Boolean).concat(d.venueHint || []))];
    const others = D.disciplines.filter((o) => o.family === d.family && o.id !== d.id).concat(D.disciplines.filter((o) => o.family !== d.family)).slice(0, 3);
    const contact = d.phone
      ? `<a class="phone" href="${tel(d.phone)}">${d.phone}</a><p class="note">${esc(d.teacher)}</p>`
      : `<a class="phone" style="font-size:1.2rem" href="mailto:${D.club.email}">${D.club.email}</a>`;

    main.innerHTML = `
      <section class="dhero">
        ${photo(dPhoto(d), d.name)}
        <div class="wrap">
          <nav class="crumbs" aria-label="Fil d'Ariane"><a href="index.html">Accueil</a> › <a href="index.html#disciplines">Disciplines</a> › ${esc(d.name)}</nav>
          <h1>${esc(d.name)}</h1>
          <p>${esc(d.pitch)}</p>
        </div>
      </section>
      <section class="section">
        <div class="wrap detail">
          <div>
            <dl class="kv">
              <dt>Pour qui</dt><dd>${esc(d.ages)}</dd>
              <dt>Enseignant${/[&·,]/.test(d.teacher) ? "s" : ""}</dt><dd>${esc(d.teacher)}</dd>
              <dt>Catégorie</dt><dd>${esc(D.families[d.family])}</dd>
            </dl>
            <p>${esc(d.body)}</p>

            <h2 id="horaires">Horaires</h2>
            ${d.slots.length
              ? `<table class="slots"><tbody>${d.slots.map((s) => `<tr><th scope="row">${DAYS[s.day]}</th><td class="t">${range(s)}</td><td class="l">${esc(s.level)}${s.venue ? `<br>${esc(D.venues[s.venue].name)}` : ""}</td></tr>`).join("")}</tbody></table>
                 <p class="note">Saison ${esc(D.club.season)}. <a href="planning.html#${d.id}">Voir tous les horaires du club</a></p>`
              : `<div class="notice"><p>Les horaires de cette discipline sont donnés par ${d.phone ? `le professeur au <a href="${tel(d.phone)}">${d.phone}</a>` : `le club : <a href="mailto:${D.club.email}">${D.club.email}</a>`}.</p></div>`}

            ${venueIds.length ? `<h2>Salle${venueIds.length > 1 ? "s" : ""}</h2><div class="venues">${venueIds.map((v) => D.venues[v]).map((v) => `<div class="venue"><h3>${esc(v.name)}</h3><p>${esc(v.address)}</p><a href="${mapUrl(v)}" target="_blank" rel="noopener">Voir sur la carte</a></div>`).join("")}</div>` : ""}
          </div>

          <aside>
            <div class="box" id="essai">
              <h2>Cours d'essai gratuit</h2>
              <p>Appelez le professeur pour savoir quel cours vous convient, puis venez en tenue de sport.</p>
              ${contact}
            </div>
            <div class="box">
              <h2>Tarifs ${esc(D.club.season)}</h2>
              ${d.prices.length
                ? `<ul class="prices">${d.prices.map((p) => `<li><span>${esc(p.label)}${p.detail ? `<small>${esc(p.detail)}</small>` : ""}</span><b>${euro(p.amount)}</b></li>`).join("")}</ul>`
                : `<p style="margin:0">Tarif communiqué par le professeur.</p>`}
              <p class="note">Cotisation à l'année. Chèque, espèces ou Pass+. <a href="infos.html#paiement">Modalités</a></p>
            </div>
          </aside>
        </div>
      </section>
      <section class="section section--alt">
        <div class="wrap">
          <div class="section-title"><h2>Autres disciplines</h2><a href="index.html#disciplines">Toutes les disciplines</a></div>
          <div class="disciplines">${others.map(cardHTML).join("")}</div>
        </div>
      </section>`;
  }

  function planning() {
    const fromHash = location.hash.slice(1);
    const sel = $("#f-discipline");
    sel.innerHTML = options(D.disciplines.filter((d) => d.slots.length).map((d) => ({ id: d.id, label: d.name })), "Toutes");
    if (byId(fromHash)) sel.value = fromHash;
    $("#f-age").innerHTML = options(AGE_GROUPS, "Tous");
    $("#f-venue").innerHTML = options(Object.entries(D.venues).map(([id, v]) => ({ id, label: v.name })), "Toutes");
    $$(".toolbar select").forEach((s) => s.addEventListener("change", render));

    const today = (new Date().getDay() + 6) % 7;
    const week = $("#week");

    function render() {
      const f = { d: sel.value, age: $("#f-age").value, venue: $("#f-venue").value };
      try { history.replaceState(null, "", f.d ? "#" + f.d : location.pathname); } catch (e) {}
      const slots = [];
      D.disciplines.forEach((d) => {
        if (f.d && d.id !== f.d) return;
        if (f.age && !audience(d).includes(f.age)) return;
        d.slots.forEach((s) => { if (!f.venue || s.venue === f.venue) slots.push({ ...s, d }); });
      });
      slots.sort((a, b) => a.start.localeCompare(b.start));
      week.innerHTML = DAYS.slice(0, 6).map((name, i) => {
        const items = slots.filter((s) => s.day === i);
        return `<section class="day${i === today ? " is-today" : ""}" aria-label="${name}">
          <h2>${name}${i === today ? "<small>aujourd'hui</small>" : ""}</h2>
          ${items.length ? `<ol>${items.map((s) => `<li><a class="slot" href="discipline.html#${s.d.id}"><time>${range(s)}</time><b>${esc(s.d.name)}</b><span>${esc(s.level)}${s.venue ? ` · ${esc(D.venues[s.venue].short)}` : ""}</span></a></li>`).join("")}</ol>` : `<p class="day-empty">—</p>`}
        </section>`;
      }).join("");
      $("#result-count").textContent = `${slots.length} cours par semaine${f.d || f.age || f.venue ? " pour cette sélection" : ""}.`;
    }
    render();

    const noSlots = D.disciplines.filter((d) => !d.slots.length);
    $("#no-slots").innerHTML = noSlots.length
      ? `<p>Pas encore d'horaires en ligne pour ${noSlots.map((d) => `<a href="discipline.html#${d.id}">${esc(d.name.toLowerCase())}</a>`).join(", ")}. Contactez le professeur (numéro sur la page de la discipline).</p>`
      : "";
  }

  function infos() {
    const rows = [];
    D.disciplines.forEach((d) => {
      const name = `<a href="discipline.html#${d.id}">${esc(d.name)}</a>`;
      if (!d.prices.length) rows.push(`<tr class="first"><td>${name}</td><td colspan="2" style="color:var(--muted)">Auprès du professeur</td><td class="amt">—</td></tr>`);
      d.prices.forEach((p, i) => rows.push(`<tr${i === 0 ? ' class="first"' : ""}><td>${i === 0 ? name : ""}</td><td>${esc(p.label)}</td><td style="color:var(--muted)">${esc(p.detail)}</td><td class="amt">${euro(p.amount)}</td></tr>`));
    });
    $("#price-rows").innerHTML = rows.join("");
    $("#faq").innerHTML = faqHTML(D.faq);
    $$("[data-season]").forEach((e) => (e.textContent = D.club.season));
    $("#trial-contacts").innerHTML = D.teachers.filter((t) => t.phone).map((t) => `<li><span>${esc(t.role)}<small>${esc(t.name)}</small></span><a href="${tel(t.phone)}">${t.phone}</a></li>`).join("");
  }

  function club() {
    $("#timeline").innerHTML = D.history.map((h) => `<li><b>${esc(h.year)}</b><p>${esc(h.text)}</p></li>`).join("");
    $("#teachers").innerHTML = D.teachers.map((t) => {
      const src = D.photos.teachers[t.name];
      return `<article class="teacher">
        ${src ? photo(src, t.name) : `<div class="photo"><span class="initials" aria-hidden="true">${esc(initials(t.name))}</span></div>`}
        <h3>${esc(t.name)}</h3>
        <p class="role">${esc(t.role)}</p>
        <p>${esc(t.detail)}</p>
        ${t.phone ? `<a href="${tel(t.phone)}">${t.phone}</a>` : ""}
      </article>`;
    }).join("");
    $("#club-members").textContent = D.club.members;
    $("#club-disciplines").textContent = D.disciplines.length;
  }

  renderHeader();
  renderFooter();
  ({ home, discipline, planning, infos, club })[page]?.();
  if (page === "discipline") window.addEventListener("hashchange", () => { discipline(); scrollTo(0, 0); });
})();
