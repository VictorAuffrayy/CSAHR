(function () {
  "use strict";

  const D = window.CSAHR;
  const page = document.body.dataset.page;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const MONTHS = ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const TODAY = (new Date().getDay() + 6) % 7; // 0 = lundi … 6 = dimanche

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tel = (p) => "tel:+33" + p.replace(/\D/g, "").replace(/^0/, "");
  const hour = (t) => t.replace(":", "h");
  const mins = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const euro = (n) => n.toLocaleString("fr-FR") + " €";
  const byId = (id) => D.disciplines.find((d) => d.id === id);
  const mapUrl = (v) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.name.replace(/[«»]/g, "") + ", " + v.address);
  const hashId = () => decodeURIComponent(location.hash.slice(1));
  const teacherNames = (d) => d.teachers.map((t) => D.teachers[t].name).join(" · ");
  const minPrice = (d) => Math.min(...d.prices.map((p) => p[2]));
  const picto = (d, color = true) => `assets/img/pictos/${d.id}${color ? "-c" : ""}.png`;

  const SLOTS = D.disciplines.flatMap((d) => d.groups.flatMap((g) =>
    g.slots.map(([day, start, end, level, pub]) => ({ d, teacher: D.teachers[g.teacher], venue: g.venue, day, start, end, level, pub }))));

  // Lit les tranches d'âge écrites dans le libellé du cours (« 6-11 ans », « 12 ans à adultes », « +14 ans »…).
  function fitsAge(s, age) {
    const l = s.level.toLowerCase();
    const ranges = [...l.matchAll(/(\d+)\s*(?:-|à)\s*(\d+)\s*ans/g)];
    if (ranges.length) return ranges.some((m) => age >= +m[1] && age <= +m[2]);
    const m = l.match(/(\d+)\s*ans à adultes|\+\s*(\d+)\s*ans|à partir de (\d+)/);
    if (m) return age >= +(m[1] || m[2] || m[3]);
    if (age < s.d.minAge) return false;
    if (s.pub === "enfants") return age < 15;
    if (s.pub === "ados") return age >= 12;
    return true;
  }

  const ICON = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;

  /* ---------- Gabarit ---------- */
  const NAV = [
    ["index.html#disciplines", "Disciplines", "discipline"],
    ["planning.html", "Horaires", "planning"],
    ["tarifs.html", "Tarifs", "tarifs"],
    ["inscription.html", "S'inscrire", "inscription"],
    ["club.html", "Le club", "club"],
    ["faq.html", "Questions", "faq"],
  ];

  function layout() {
    const h = $("#site-header");
    h.className = "header";
    const link = ([href, label, p]) => `<a href="${href}"${p === page ? ' aria-current="page"' : ""}>${label}</a>`;
    h.innerHTML = `<div class="wrap bar">
      <a class="brand" href="index.html" aria-label="CSAHR arts martiaux, accueil"></a>
      <nav class="nav" id="nav" aria-label="Menu principal">
        <div class="nav-l">${NAV.slice(0, 3).map(link).join("")}</div>
        <span class="nav-gap" aria-hidden="true"></span>
        <div class="nav-r">${NAV.slice(3).map(link).join("")}<a class="btn btn--red btn--sm" href="inscription.html#essai">Essai gratuit</a></div>
      </nav>
      <button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Menu">${icon("menu")}</button>
    </div>`;
    const compact = () => h.classList.toggle("small", window.scrollY > 40);
    window.addEventListener("scroll", compact, { passive: true });
    compact();
    const nav = $("#nav"), burger = $(".burger");
    const set = (o) => { nav.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.innerHTML = icon(o ? "close" : "menu"); };
    burger.addEventListener("click", () => set(!nav.classList.contains("open")));
    nav.addEventListener("click", (e) => e.target.closest("a") && set(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && set(false));

    const c = D.club;
    const f = $("#site-footer");
    f.className = "footer";
    f.innerHTML = `<div class="wrap">
      <div class="cols">
        <div>
          <a class="logo" href="index.html"><img src="assets/img/logo.png" alt="CSAHR arts martiaux" width="340" height="137"></a>
          <p style="margin-top:12px">${esc(c.fullName)}, association loi 1901 fondée en ${c.founded}.</p>
        </div>
        <div><h2>Les sections</h2><ul>${D.disciplines.map((d) => `<li><a href="discipline.html#${d.id}">${esc(d.name)}</a></li>`).join("")}</ul></div>
        <div><h2>Informations</h2><ul>
          <li><a href="planning.html">Horaires</a></li><li><a href="tarifs.html">Tarifs</a></li><li><a href="inscription.html">S'inscrire</a></li>
          <li><a href="faq.html">Foire aux questions</a></li><li><a href="club.html#professeurs">Les professeurs</a></li><li><a href="club.html#lieux">Où sommes-nous ?</a></li>
        </ul></div>
        <div><h2>Nous contacter</h2><ul>
          <li><a href="${c.messenger}" target="_blank" rel="noopener">Messenger : réponse rapide</a></li>
          <li><a href="mailto:${c.email}">${c.email}</a></li>
          <li>${esc(c.address)}</li>
          <li><a href="${c.facebook}" target="_blank" rel="noopener">Facebook</a></li>
        </ul></div>
      </div>
      <div class="copy"><span>© ${new Date().getFullYear()} CSAHR. Tous droits réservés.</span><span>Saison ${esc(c.season)}</span></div>
    </div>`;
  }

  /* ---------- Blocs partagés ---------- */
  const pictoLinks = (current) => D.disciplines.map((d) => `
    <a class="picto" style="--c:${d.color}" href="discipline.html#${d.id}" title="${esc(d.name)}"${d.id === current ? ' aria-current="page"' : ""}>
      <img class="g" src="${picto(d, false)}" alt="${esc(d.name)}" width="166" height="133"><img class="c" src="${picto(d)}" alt="" width="166" height="133">
    </a>`).join("");

  const classCard = (s) => `<a class="class-card" style="--c:${s.d.color}" href="discipline.html#${s.d.id}">
    <time>${hour(s.start)}<small>${hour(s.end)}</small></time><b>${esc(s.d.name)}</b><span>${esc(s.level)}</span><span class="v">${esc(D.venues[s.venue].short)}</span></a>`;

  const listRow = (s) => `<a class="lrow" style="--c:${s.d.color}" href="discipline.html#${s.d.id}">
    <time>${hour(s.start)}<small>${hour(s.end)}</small></time><img src="${picto(s.d)}" alt="" width="48" height="38">
    <div><b>${esc(s.d.name)}</b><span>${esc(s.level)}</span><span class="v">${esc(D.venues[s.venue].name)} · ${esc(s.teacher.name)}</span></div></a>`;

  function lightbox(items) {
    let dlg = $("#lightbox");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "lightbox";
      dlg.className = "lightbox";
      dlg.innerHTML = `<button type="button" aria-label="Fermer">×</button><img alt=""><p></p>`;
      document.body.appendChild(dlg);
      dlg.querySelector("button").addEventListener("click", () => dlg.close());
      dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
    }
    return (i) => {
      dlg.querySelector("img").src = items[i].src;
      dlg.querySelector("img").alt = items[i].caption || "";
      dlg.querySelector("p").textContent = items[i].caption || "";
      if (dlg.showModal) dlg.showModal(); else window.open(items[i].src);
    };
  }

  const dateBadge = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `<span class="date"><b>${d}</b>${MONTHS[m - 1]} ${y}</span>`; };

  /* ---------- Accueil ---------- */
  function home() {
    $("#fig-members").textContent = D.club.members;
    $("#fig-disciplines").textContent = D.disciplines.length;
    $("#fig-slots").textContent = SLOTS.length;
    $("#pictos").innerHTML = pictoLinks();

    // Trouver un cours
    const fd = $("#q-d"), fa = $("#q-age"), fj = $("#q-day"), out = $("#q-out");
    fd.innerHTML = `<option value="">Toutes</option>` + D.disciplines.map((d) => `<option value="${d.id}">${esc(d.name)}</option>`).join("");
    fj.innerHTML = `<option value="">Tous les jours</option>` + DAYS.map((d, i) => `<option value="${i}">${d}</option>`).join("");
    const run = () => {
      const age = parseInt(fa.value, 10);
      const rows = D.disciplines.filter((d) => !fd.value || d.id === fd.value).map((d) => {
        const n = SLOTS.filter((s) => s.d === d && (fj.value === "" || s.day === +fj.value) && (isNaN(age) || fitsAge(s, age))).length;
        return { d, n };
      }).filter((r) => r.n);
      out.innerHTML = rows.length
        ? rows.map(({ d, n }) => `<a class="result" style="--c:${d.color}" href="discipline.html#${d.id}"><img src="${picto(d)}" alt="" width="44" height="35"><div><b>${esc(d.name)}</b><span>${esc(d.ages)} · dès ${euro(minPrice(d))}/an</span></div><small>${n} cours${fj.value !== "" ? " le " + DAYS[+fj.value].toLowerCase() : "/sem."}</small></a>`).join("")
        : `<p class="none">Aucun cours ne correspond. Essayez un autre jour ou une autre discipline.</p>`;
    };
    [fd, fa, fj].forEach((el) => el.addEventListener("input", run));
    $("#finder").addEventListener("submit", (e) => { e.preventDefault(); run(); });
    run();

    // Prochains cours
    let day = TODAY, title = "Aujourd'hui au club";
    const now = new Date().getHours() * 60 + new Date().getMinutes();
    let next = day < 6 ? SLOTS.filter((s) => s.day === day && mins(s.end) > now) : [];
    if (!next.length) { day = (TODAY + 1) % 7; if (day === 6) day = 0; title = day === (TODAY + 1) % 7 ? "Demain au club" : "Lundi au club"; next = SLOTS.filter((s) => s.day === day); }
    next.sort((a, b) => a.start.localeCompare(b.start));
    $("#today-title").textContent = title;
    $("#today").innerHTML = next.slice(0, 8).map(classCard).join("");
    $("#today-more").textContent = next.length > 8 ? `Voir les ${next.length} cours du ${DAYS[day].toLowerCase()}` : "Voir tout l'emploi du temps";
    $("#today-more").href = "planning.html";

    // Disciplines
    $("#dgrid").innerHTML = D.disciplines.map((d) => {
      const n = SLOTS.filter((s) => s.d === d).length;
      return `<a class="dcard" style="--c:${d.color}" href="discipline.html#${d.id}">
        <div class="ph"><img src="assets/img/disciplines/${d.id}-1.jpg" alt="" loading="lazy"><span class="badge"><img src="${picto(d)}" alt="" width="50" height="40"></span></div>
        <div class="body"><h3>${esc(d.name)}</h3><p>${esc(teacherNames(d))}</p>
          <div class="chips"><span class="chip">${esc(d.ages)}</span><span class="chip">${n} cours/sem.</span><span class="chip">dès ${euro(minPrice(d))}</span></div></div>
      </a>`;
    }).join("");

    $("#news").innerHTML = D.news.map((n) => `<article>
      <div class="pic">${dateBadge(n.date)}<img src="${n.img}" alt="" loading="lazy"></div>
      <div class="txt"><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p>${n.link ? `<a class="more" href="${n.link}" target="_blank" rel="noopener">Voir sur Facebook</a>` : ""}</div></article>`).join("");

    const photos = [...D.images.gallery, ...D.images.slider.map((s) => ({ src: s.src, caption: s.alt }))];
    const open = lightbox(photos);
    $("#gallery").innerHTML = D.images.gallery.map((g, i) => `<button type="button" data-i="${i}" aria-label="Agrandir : ${esc(g.caption)}"><img src="${g.src}" alt="" loading="lazy"><span class="cap">${esc(g.caption)}</span></button>`).join("");
    $("#gallery").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) open(+b.dataset.i); });

    $("#venues").innerHTML = venuesHTML();
  }

  function venuesHTML() {
    return Object.entries(D.venues).map(([id, v]) => {
      const ds = D.disciplines.filter((d) => d.groups.some((g) => g.venue === id));
      return `<div class="venue"><span class="q">${esc(v.quarter)}</span><h3>${esc(v.name)}</h3><p>${esc(v.address)}</p>
        ${v.bus.length ? `<p class="bus">Bus : ${v.bus.map(([s, l]) => `${esc(s)} (${l})`).join(" · ")}</p>` : ""}
        <div class="dots">${ds.map((d) => `<img src="${picto(d)}" alt="${esc(d.name)}" title="${esc(d.name)}" width="34" height="27">`).join("")}</div>
        <a class="more map" href="${mapUrl(v)}" target="_blank" rel="noopener">Plan d'accès</a></div>`;
    }).join("");
  }

  /* ---------- Fiche discipline ---------- */
  function discipline() {
    const d = byId(hashId()) || byId(new URLSearchParams(location.search).get("id"));
    const main = $("#main");
    if (!d) {
      main.innerHTML = `<section class="page-hero"><div class="wrap"><h1>Discipline introuvable</h1><p>Choisissez une discipline ci-dessous.</p></div></section><div class="picto-strip"><div class="wrap pictos">${pictoLinks()}</div></div>`;
      return;
    }
    document.title = `${d.name} à Rueil-Malmaison | CSAHR`;
    $('meta[name="description"]').setAttribute("content", `${d.name} au CSAHR, Rueil-Malmaison : horaires, tarifs ${D.club.season}, professeurs. Cours d'essai gratuit.`);
    const teachers = d.teachers.map((t) => D.teachers[t]);
    const slots = SLOTS.filter((s) => s.d === d);
    const photos = [1, 2, 3].map((k) => ({ src: `assets/img/disciplines/${d.id}-${k}.jpg`, caption: d.name }));
    const article = /^[aeiouyàâéèêëïîôûü]/i.test(d.name) ? "à l'" : /^boxe/i.test(d.name) ? "à la " : "au ";

    main.innerHTML = `
      <section class="dhero" style="--c:${d.color}">
        <img src="${photos[0].src}" alt="">
        <div class="wrap">
          <div class="emblem"><img src="${picto(d)}" alt="" width="100" height="80"></div>
          <div>
            <nav class="crumbs" aria-label="Fil d'Ariane"><a href="index.html">Accueil</a> › <a href="index.html#disciplines">Disciplines</a> › ${esc(d.name)}</nav>
            <h1>${esc(d.name)}</h1>
            <p class="sub">${d.subtitle ? esc(d.subtitle) + " · " : ""}${esc(d.ages)}</p>
            <div class="facts"><span>${slots.length} cours par semaine</span><span>Dès ${euro(minPrice(d))} / an</span><span>${[...new Set(slots.map((s) => D.venues[s.venue].short))].length} salle(s)</span><span>1er cours gratuit</span></div>
            <div class="actions">
              <a class="btn btn--red" href="${tel(teachers[0].phone)}">${icon("phone")}Appeler le professeur</a>
              <a class="btn btn--ghost" href="#horaires">${icon("clock")}Voir les horaires</a>
            </div>
          </div>
        </div>
      </section>
      <nav class="tabs" aria-label="Sections de la page"><div class="wrap">
        <a href="#presentation" style="--tc:var(--orange)">Présentation</a>
        <a href="#horaires" style="--tc:var(--green)">Horaires</a>
        <a href="#tarifs" style="--tc:var(--yellow)">Tarifs</a>
        <a href="#inscription" style="--tc:var(--blue)">S'inscrire</a>
        <a href="#photos" style="--tc:var(--teal)">Photos</a>
      </div></nav>
      <section class="section" style="padding-top:36px">
        <div class="wrap detail">
          <div>
            <div class="block intro-text" id="presentation">
              <span class="label" style="--c:var(--orange)">Qu'est-ce que c'est ?</span>
              ${d.intro.map((p) => `<p>${esc(p)}</p>`).join("")}
            </div>

            <div class="block" id="horaires">
              <span class="label" style="--c:var(--green)">Où et quand pratiquer ?</span>
              <h2>Horaires ${esc(D.club.season)}</h2>
              ${d.groups.map((g) => venueCard(d, g)).join("")}
              <a class="more" href="planning.html#${d.id}">Voir dans l'emploi du temps du club</a>
            </div>

            <div class="block" id="tarifs">
              <span class="label" style="--c:var(--yellow)">Tarifs ${esc(D.club.season)}</span>
              <h2>Combien ça coûte ?</h2>
              <div class="prices">${d.prices.map(([label, detail, amount, chq]) => `<div class="price"><b>${euro(amount)}</b><span>${esc(label)}</span>${detail ? `<small>${esc(detail)}</small>` : ""}<small>Deux chèques : ${esc(chq)} (professeur + C.S.A.H.R.)</small></div>`).join("")}</div>
              <p style="margin-top:12px;font-size:.92rem;color:var(--muted)">Cotisation annuelle, licence comprise. Chèques, espèces ou Pass+. Paiement en plusieurs fois possible avec le professeur.</p>
            </div>

            <div class="block" id="inscription">
              <span class="label" style="--c:var(--blue)">S'inscrire ${article}${esc(d.name.toLowerCase())}</span>
              <h2>Comment s'inscrire ?</h2>
              <div class="notice">${esc(d.signup)}</div>
              ${d.extra ? `<div class="notice warn">${esc(d.extra)}</div>` : ""}
              <h3>Que faut-il fournir ?</h3>
              <ul class="checklist">${D.documents.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
            </div>

            <div class="block" id="photos">
              <span class="label" style="--c:var(--teal)">Photos</span>
              <div class="photos3">${photos.map((p, i) => `<button type="button" data-i="${i}" aria-label="Agrandir la photo ${i + 1}"><img src="${p.src}" alt="${esc(d.name)} au CSAHR" loading="lazy"></button>`).join("")}</div>
            </div>
          </div>

          <aside>
            ${teachers.map((t) => `<div class="prof">
              <img src="${t.photo}" alt="${esc(t.name)}" loading="lazy">
              <div class="in"><h3>${esc(t.name)}</h3><ul>${t.creds.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
              <a class="btn btn--red" href="${tel(t.phone)}">${icon("phone")}Appeler</a><a class="tel" href="${tel(t.phone)}">${t.phone}</a></div>
            </div>`).join("")}
            <div class="trial"><h3>Cours d'essai gratuit</h3><p>Pas besoin de réserver : présentez-vous au cours de votre choix, en kimono ou en tenue de sport.</p></div>
          </aside>
        </div>
      </section>
      <section class="section section--alt" style="padding-block:36px">
        <div class="wrap"><h2 style="font-size:1.2rem">Les autres disciplines</h2><div class="pictos">${pictoLinks(d.id)}</div></div>
      </section>`;

    // Les liens internes défilent sans remplacer l'identifiant de discipline dans l'adresse.
    main.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.getElementById(a.hash.slice(1));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    });

    const open = lightbox(photos);
    $(".photos3").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) open(+b.dataset.i); });

    // Onglet actif selon la section visible
    const tabs = $$(".tabs a");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) tabs.forEach((t) => t.classList.toggle("on", t.hash === "#" + en.target.id)); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".block").forEach((b) => io.observe(b));
    tabs[0].classList.add("on");
  }

  function venueCard(d, g) {
    const v = D.venues[g.venue];
    const t = D.teachers[g.teacher];
    const byDay = DAYS.map((name, i) => ({ name, slots: g.slots.filter((s) => s[0] === i).sort((a, b) => a[1].localeCompare(b[1])) })).filter((x) => x.slots.length);
    return `<div class="vcard" style="--c:${d.color}">
      <header><div>${d.teachers.length > 1 ? `<span class="who">${esc(t.name)}</span>` : ""}<b>${esc(v.name)}</b><span>${esc(v.address)}</span></div><a class="more" href="${mapUrl(v)}" target="_blank" rel="noopener">Plan d'accès</a></header>
      ${byDay.map((x) => `<div class="dayrow"><b>${x.name}</b><div class="sl">${x.slots.map(([, start, end, level]) => `<span class="pill"><time>${hour(start)} – ${hour(end)}</time>${esc(level)}</span>`).join("")}</div></div>`).join("")}
      ${v.bus.length ? `<div class="bus">Bus : ${v.bus.map(([s, l]) => `${esc(s)} (${l})`).join(" · ")}</div>` : ""}
    </div>`;
  }

  /* ---------- Emploi du temps ---------- */
  function planning() {
    const state = { ds: new Set(byId(hashId()) ? [hashId()] : []), pub: "", quarter: "", day: TODAY < 6 ? TODAY : 0, view: "grid" };
    const box = $("#tt-box");

    // Filtres : pictos cliquables
    const pbar = $("#tt-pictos");
    pbar.innerHTML = D.disciplines.map((d) => `<button type="button" class="picto" style="--c:${d.color}" data-id="${d.id}" aria-pressed="${state.ds.has(d.id)}" title="${esc(d.name)}">
      <img class="g" src="${picto(d, false)}" alt="${esc(d.name)}" width="166" height="133"><img class="c" src="${picto(d)}" alt="" width="166" height="133"></button>`).join("");
    pbar.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      state.ds.has(b.dataset.id) ? state.ds.delete(b.dataset.id) : state.ds.add(b.dataset.id);
      b.setAttribute("aria-pressed", state.ds.has(b.dataset.id));
      render();
    });
    const seg = (el, key) => el.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      state[key] = b.dataset.v;
      $$("button", el).forEach((x) => x.setAttribute("aria-pressed", x === b));
      render();
    });
    seg($("#tt-pub"), "pub");
    seg($("#tt-view"), "view");
    const q = $("#tt-quarter");
    q.innerHTML = `<option value="">Tous les quartiers</option>` + [...new Set(Object.values(D.venues).map((v) => v.quarter))].map((x) => `<option>${esc(x)}</option>`).join("");
    q.addEventListener("input", () => { state.quarter = q.value; render(); });
    $("#tt-reset").addEventListener("click", () => {
      state.ds.clear(); state.pub = ""; state.quarter = ""; q.value = "";
      $$("#tt-pictos button").forEach((b) => b.setAttribute("aria-pressed", "false"));
      $$("#tt-pub button").forEach((b, i) => b.setAttribute("aria-pressed", i === 0));
      render();
    });

    const filtered = () => SLOTS.filter((s) =>
      (!state.ds.size || state.ds.has(s.d.id)) &&
      (!state.pub || s.pub === state.pub || s.pub === "tous") &&
      (!state.quarter || D.venues[s.venue].quarter === state.quarter));

    function render() {
      try { history.replaceState(null, "", state.ds.size === 1 ? "#" + [...state.ds][0] : location.pathname); } catch (e) {}
      const list = filtered();
      box.classList.toggle("view-grid", state.view === "grid");
      box.classList.toggle("view-list", state.view === "list");
      $("#tt-count").textContent = `${list.length} cours / semaine`;
      $("#tt-reset").hidden = !(state.ds.size || state.pub || state.quarter);
      renderGrid(list);
      renderList(list);
    }

    // Vue semaine : une ligne par discipline, une colonne par jour, les créneaux en pastilles.
    function renderGrid(list) {
      const rows = D.disciplines.filter((d) => list.some((s) => s.d === d));
      $("#tt-grid").innerHTML = `<thead><tr><th scope="col" class="dcol">Discipline</th>${DAYS.map((d, i) => `<th scope="col"${i === TODAY ? ' class="now"' : ""}>${d}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((d) => `<tr style="--c:${d.color}">
          <th scope="row" class="dcol"><a href="discipline.html#${d.id}"><img src="${picto(d)}" alt="" width="52" height="42"><span><b>${esc(d.name)}</b><small>${esc(d.ages)}</small></span></a></th>
          ${DAYS.map((_, day) => {
            const cell = list.filter((s) => s.d === d && s.day === day).sort((a, b) => a.start.localeCompare(b.start));
            return `<td${day === TODAY ? ' class="now"' : ""}>${cell.map((s) => `<a class="cr" href="discipline.html#${d.id}" title="${esc(D.venues[s.venue].name)}"><time>${hour(s.start)}–${hour(s.end)}</time><span>${esc(s.level)}</span><small>${esc(D.venues[s.venue].short)}</small></a>`).join("")}</td>`;
          }).join("")}
        </tr>`).join("")}</tbody>`;
      $("#tt-empty").hidden = rows.length > 0;
    }

    function renderList(list) {
      $("#daytabs").innerHTML = DAYS.map((d, i) => `<button type="button" data-d="${i}" aria-pressed="${i === state.day}">${d.slice(0, 3)}<small>${list.filter((s) => s.day === i).length} cours</small></button>`).join("");
      const items = list.filter((s) => s.day === state.day).sort((a, b) => a.start.localeCompare(b.start));
      const periods = [["Matin", 0, 720], ["Après-midi", 720, 1080], ["Soir", 1080, 1440]];
      $("#daylist").innerHTML = items.length
        ? periods.map(([name, a, b]) => { const p = items.filter((s) => mins(s.start) >= a && mins(s.start) < b); return p.length ? `<p class="period">${name}</p><div class="list">${p.map(listRow).join("")}</div>` : ""; }).join("")
        : `<p class="empty">Pas de cours le ${DAYS[state.day].toLowerCase()} avec ces filtres.</p>`;
    }
    $("#daytabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; state.day = +b.dataset.d; renderList(filtered()); });

    render();
  }

  /* ---------- Tarifs ---------- */
  function tarifs() {
    const fd = $("#c-d"), fa = $("#c-age"), out = $("#c-out");
    fd.innerHTML = `<option value="">Choisir une discipline</option>` + D.disciplines.map((d) => `<option value="${d.id}">${esc(d.name)}</option>`).join("");
    const fits = (label, age) => {
      const l = label.toLowerCase(); let m;
      if ((m = l.match(/(\d+)\s*-\s*(\d+)\s*ans/))) return age >= +m[1] && age <= +m[2];
      if ((m = l.match(/moins de (\d+)/))) return age < +m[1];
      if ((m = l.match(/(\d+) ans et plus|\(\+(\d+) ans\)|(\d+) ans et \+/))) return age >= +(m[1] || m[2] || m[3]);
      return true;
    };
    const run = () => {
      const d = byId(fd.value), age = parseInt(fa.value, 10);
      if (!d) { out.innerHTML = ""; return; }
      if (!isNaN(age) && age < d.minAge) { out.innerHTML = `<div class="notice warn">Le ${esc(d.name.toLowerCase())} se pratique à partir de ${d.minAge} ans.</div>`; return; }
      const rows = d.prices.filter(([l]) => isNaN(age) || fits(l, age));
      out.innerHTML = `<div class="prices">${rows.map(([label, detail, amount, chq]) => `<div class="price"><b>${euro(amount)}</b><span>${esc(label)}</span>${detail ? `<small>${esc(detail)}</small>` : ""}<small>Deux chèques : ${esc(chq)}</small></div>`).join("")}</div>
        <a class="more" href="discipline.html#${d.id}">Voir les horaires et le professeur</a>`;
    };
    [fd, fa].forEach((el) => el.addEventListener("input", run));
    $("#calc").addEventListener("submit", (e) => { e.preventDefault(); run(); });

    $("#tcards").innerHTML = D.disciplines.map((d) => `<article class="tcard" style="--c:${d.color}">
      <header><img src="${picto(d)}" alt="" width="52" height="42"><div><a href="discipline.html#${d.id}">${esc(d.name)}</a><small>${esc(teacherNames(d))}</small></div></header>
      <ul>${d.prices.map(([label, detail, amount, chq]) => `<li><span>${esc(label)}<small>${detail ? esc(detail) + " · " : ""}chèques ${esc(chq)}</small></span><b>${euro(amount)}</b></li>`).join("")}</ul>
    </article>`).join("");
  }

  /* ---------- S'inscrire ---------- */
  function inscription() {
    $("#docs").innerHTML = D.documents.map((x) => `<li>${esc(x)}</li>`).join("");
    $("#dates").innerHTML = D.disciplines.map((d) => `<tr><td class="n" style="--c:${d.color}"><a href="discipline.html#${d.id}">${esc(d.name)}</a></td><td>${esc(d.signup)}</td><td>${d.teachers.map((t) => `${esc(D.teachers[t].name)}<br><a href="${tel(D.teachers[t].phone)}">${D.teachers[t].phone}</a>`).join("<br>")}</td></tr>`).join("");
  }

  /* ---------- FAQ ---------- */
  function faq() {
    const box = $("#faq");
    box.innerHTML = D.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
    const search = $("#faq-q");
    const none = $("#faq-none");
    search.addEventListener("input", () => {
      const t = search.value.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      let shown = 0;
      $$("details", box).forEach((el) => {
        const ok = !t || el.textContent.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(t);
        el.hidden = !ok; if (ok) shown++;
      });
      none.hidden = shown > 0;
    });
  }

  /* ---------- Club ---------- */
  function club() {
    $("#president").innerHTML = D.president.map((p) => `<p>${esc(p)}</p>`).join("") + `<p><b>Marc Lopes</b>, président</p>`;
    $("#staff").innerHTML = D.staff.map((p) => `<a class="person" href="discipline.html#${p.d}"><img src="${p.photo}" alt="${esc(p.name)}" loading="lazy"><div><b>${esc(p.name)}</b><span>${esc(p.role)}</span></div></a>`).join("");
    $("#board").innerHTML = D.board.map((p) => `<div class="person"><img src="${p.photo}" alt="${esc(p.name)}" loading="lazy"><div><b>${esc(p.name)}</b><span>${esc(p.role)}</span></div></div>`).join("");
    $("#history").innerHTML = D.history.map(([y, t]) => `<li><b>${y}</b><p>${esc(t)}</p></li>`).join("");
    const f = D.founder;
    $("#founder").innerHTML = `<img src="${f.photo}" alt="${esc(f.name)}" loading="lazy"><div>${f.text.map((p) => `<p>${esc(p)}</p>`).join("")}<p class="quote">« ${esc(f.quote)} »</p></div>`;
    $("#venues").innerHTML = venuesHTML();
  }

  layout();
  ({ home, discipline, planning, tarifs, inscription, faq, club })[page]?.();
  if (page === "discipline") window.addEventListener("hashchange", () => byId(hashId()) && location.reload());
})();
