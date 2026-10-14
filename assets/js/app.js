(function () {
  "use strict";

  const D = window.CSAHR;
  const page = document.body.dataset.page;
  const $ = (sel, root = document) => root.querySelector(sel);

  const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const PUBLICS = { enfants: "Enfants", ados: "Ados et adultes", tous: "Tous âges" };
  const MONTHS = ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tel = (p) => "tel:+33" + p.replace(/\D/g, "").replace(/^0/, "");
  const hour = (t) => t.replace(":", "h");
  const euro = (n) => n.toLocaleString("fr-FR") + " €";
  const byId = (id) => D.disciplines.find((d) => d.id === id);
  const mapUrl = (v) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.name.replace(/[«»]/g, "") + ", " + v.address);
  const hashId = () => decodeURIComponent(location.hash.slice(1));

  // Tous les créneaux à plat : { d, teacher, venue, day, start, end, level, pub }
  const allSlots = () => D.disciplines.flatMap((d) => d.groups.flatMap((g) =>
    g.slots.map(([day, start, end, level, pub]) => ({ d, teacher: D.teachers[g.teacher], venue: g.venue, day, start, end, level, pub }))));

  // Lit les tranches d'âge écrites dans le libellé du cours (« 6-11 ans », « 12 ans à adultes », « +14 ans »…).
  function slotFitsAge(s, age) {
    const l = s.level.toLowerCase();
    const ranges = [...l.matchAll(/(\d+)\s*(?:-|à)\s*(\d+)\s*ans/g)];
    if (ranges.length) return ranges.some((m) => age >= +m[1] && age <= +m[2]);
    let m;
    if ((m = l.match(/(\d+)\s*ans à adultes|\+\s*(\d+)\s*ans|à partir de (\d+)/))) return age >= +(m[1] || m[2] || m[3]);
    if (age < s.d.minAge) return false;
    if (s.pub === "enfants") return age < 15;
    if (s.pub === "ados") return age >= 12;
    return true;
  }

  const ICON = {
    doc: '<path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h8M9 17h8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    euro: '<path d="M17 6a7 7 0 1 0 0 12M4 10h9M4 14h9"/>',
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;

  /* ---------- Gabarit commun ---------- */
  const NAV = [
    ["inscription.html", "S'inscrire", "inscription"],
    ["planning.html", "Horaires", "planning"],
    ["tarifs.html", "Tarifs", "tarifs"],
    ["faq.html", "Questions", "faq"],
    ["club.html", "Le club", "club"],
  ];

  function pictosHTML(current) {
    return `<nav class="pictos inner" aria-label="Disciplines">${D.disciplines.map((d) => `
      <a class="picto" href="discipline.html#${d.id}" title="${esc(d.name)}"${d.id === current ? ' aria-current="page"' : ""}>
        <img class="g" src="assets/img/pictos/${d.id}.png" alt="${esc(d.name)}" width="83" height="66">
        <img class="c" src="assets/img/pictos/${d.id}-c.png" alt="" width="83" height="66">
      </a>`).join("")}</nav>`;
  }

  function renderLayout() {
    $("#site-header").innerHTML = `
      <a class="banner" href="index.html" aria-label="CSAHR arts martiaux — accueil"></a>
      <div class="nav-bar"><nav class="nav inner" aria-label="Menu principal">
        ${NAV.map(([href, label, p]) => `<a href="${href}"${p === page ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav></div>`;

    const c = D.club;
    $("#site-footer").innerHTML = `
      <div class="footer"><div class="cols inner">
        <div><h2>Les dernières nouvelles</h2><ul>${D.news.map((n) => `<li><a href="index.html#actu">${esc(n.title)}</a></li>`).join("")}</ul></div>
        <div><h2>Informations</h2><ul>
          <li><a href="inscription.html">S'inscrire</a></li><li><a href="planning.html">Horaires</a></li><li><a href="tarifs.html">Tarifs</a></li>
          <li><a href="faq.html">Foire aux questions</a></li><li><a href="club.html#professeurs">Les professeurs</a></li><li><a href="club.html#lieux">Où sommes-nous ?</a></li>
        </ul></div>
        <div><h2>Les sections</h2><ul>${D.disciplines.map((d) => `<li><a href="discipline.html#${d.id}">${esc(d.name)}</a></li>`).join("")}</ul></div>
        <div><h2>Nous contacter</h2><ul>
          <li><a href="${c.messenger}" target="_blank" rel="noopener">Messenger : réponse rapide</a></li>
          <li><a href="mailto:${c.email}">${c.email}</a></li>
          <li>${esc(c.address)}</li>
          <li><a href="${c.facebook}" target="_blank" rel="noopener">Facebook</a></li>
        </ul></div>
      </div></div>
      <div class="copy"><div class="inner">© ${new Date().getFullYear()} CSAHR, ${esc(c.fullName)}. Tous droits réservés.</div></div>`;
  }

  /* ---------- Blocs ---------- */
  function venueTable(venueId, slots, opts = {}) {
    const v = D.venues[venueId];
    const sorted = [...slots].sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
    return `<div class="venue-table">
      <div class="venue-head"><div><b>${esc(v.name)}</b><span>${esc(v.address)} · Quartier ${esc(v.quarter)}</span></div><a href="${mapUrl(v)}" target="_blank" rel="noopener">Plan d'accès</a></div>
      <table><tbody>${sorted.map((s, i) => `<tr><th scope="row">${i === 0 || sorted[i - 1].day !== s.day ? DAYS[s.day] : ""}</th><td class="t">${hour(s.start)} à ${hour(s.end)}</td><td>${esc(s.level)}${opts.showD ? `<span class="who">${esc(s.d.name)}</span>` : ""}</td></tr>`).join("")}</tbody></table>
      ${v.bus.length ? `<div class="bus">Bus : ${v.bus.map(([stop, lines]) => `${esc(stop)} (${lines})`).join(" · ")}</div>` : ""}
    </div>`;
  }

  const faqHTML = (items) => items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");

  function dateBadge(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return `<span class="date"><b>${d}</b>${MONTHS[m - 1]}<br>${y}</span>`;
  }

  /* ---------- Pages ---------- */
  function home() {
    $("#pictos").outerHTML = pictosHTML();

    // Diaporama
    const sl = $("#slider");
    sl.innerHTML = D.images.slider.map((s, i) => `<img src="${s.src}" alt="${esc(s.alt)}"${i === 0 ? ' class="on"' : ' loading="lazy"'}>`).join("") +
      `<div class="dots">${D.images.slider.map((_, i) => `<button type="button" aria-label="Photo ${i + 1}"${i === 0 ? ' aria-current="true"' : ""}></button>`).join("")}</div>`;
    const imgs = sl.querySelectorAll("img");
    const dots = sl.querySelectorAll(".dots button");
    let cur = 0, timer;
    const show = (n) => {
      imgs[cur].classList.remove("on"); dots[cur].removeAttribute("aria-current");
      cur = (n + imgs.length) % imgs.length;
      imgs[cur].classList.add("on"); dots[cur].setAttribute("aria-current", "true");
    };
    const play = () => { clearInterval(timer); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => show(cur + 1), 5000); };
    dots.forEach((b, i) => b.addEventListener("click", () => { show(i); play(); }));
    play();

    // Trouver un cours
    const fd = $("#q-d"), fa = $("#q-age"), fj = $("#q-day");
    fd.innerHTML = `<option value="">Toutes les disciplines</option>` + D.disciplines.map((d) => `<option value="${d.id}">${esc(d.name)}</option>`).join("");
    fj.innerHTML = `<option value="">Tous les jours</option>` + DAYS.map((d, i) => `<option value="${i}">${d}</option>`).join("");
    const out = $("#q-out");
    const run = () => {
      const age = parseInt(fa.value, 10);
      if (!fd.value && !fa.value && fj.value === "") { out.innerHTML = ""; return; }
      const ds = D.disciplines.filter((d) => (!fd.value || d.id === fd.value) && (isNaN(age) || age >= d.minAge));
      const rows = ds.map((d) => {
        let slots = allSlots().filter((s) => s.d === d && (fj.value === "" || s.day === +fj.value));
        if (!isNaN(age)) slots = slots.filter((s) => slotFitsAge(s, age));
        return { d, n: slots.length };
      }).filter((r) => r.n);
      out.innerHTML = rows.length
        ? rows.map(({ d, n }) => `<a class="result" style="--c:${d.color}" href="discipline.html#${d.id}"><div><b>${esc(d.name)}</b><span>${esc(d.teachers.map((t) => D.teachers[t].name).join(" · "))}</span></div><small>${n} cours${fj.value !== "" ? " le " + DAYS[+fj.value].toLowerCase() : " / semaine"}</small></a>`).join("")
        : `<p class="none">Aucun cours ne correspond. Essayez un autre jour ou une autre discipline.</p>`;
    };
    [fd, fa, fj].forEach((el) => el.addEventListener("input", run));
    $("#finder").addEventListener("submit", (e) => { e.preventDefault(); run(); });

    $("#news").innerHTML = D.news.map((n) => `
      <article>
        <h3>${esc(n.title)}</h3>
        <div class="pic">${dateBadge(n.date)}<img src="${n.img}" alt="" loading="lazy"></div>
        <p>${esc(n.text)}</p>
        ${n.link ? `<a class="more" href="${n.link}" target="_blank" rel="noopener">+ En savoir plus…</a>` : ""}
      </article>`).join("");

    $("#gallery").innerHTML = D.images.gallery.map((g) => `<figure><img src="${g.src}" alt="${esc(g.caption)}" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></figure>`).join("");
  }

  function discipline() {
    const d = byId(hashId()) || byId(new URLSearchParams(location.search).get("id"));
    $("#pictos").outerHTML = pictosHTML(d && d.id);
    const main = $("#content");
    if (!d) {
      main.innerHTML = `<h1 class="page-title">Discipline introuvable</h1><p class="page-lead">Choisissez une discipline dans les pictogrammes ci-dessus.</p>`;
      return;
    }
    document.title = `${d.name} à Rueil-Malmaison | CSAHR`;
    $('meta[name="description"]').setAttribute("content", `${d.name} au CSAHR, Rueil-Malmaison : horaires, tarifs ${D.club.season}, professeurs. Cours d'essai gratuit.`);
    $(".d-rule").style.setProperty("--c", d.color);

    const teachers = d.teachers.map((t) => D.teachers[t]);
    const byTeacherVenue = d.groups.map((g) => ({ g, slots: g.slots.map(([day, start, end, level, pub]) => ({ d, day, start, end, level, pub })) }));

    main.innerHTML = `
      <div class="d-head">
        <h1>${esc(d.name)}</h1>
        <p>${d.subtitle ? `( ${esc(d.subtitle)} )<br>` : ""}${esc(d.ages)}</p>
        <div class="links">
          <a class="l-ins" href="#inscriptions">${icon("doc")}S'inscrire</a>
          <a class="l-hor" href="#horaires">${icon("clock")}Horaires</a>
          <a class="l-tar" href="#tarifs">${icon("euro")}Tarifs</a>
        </div>
      </div>
      <div class="d-body">
        <div>
          <h2 class="tag tag--orange">Qu'est-ce que c'est ?</h2>
          ${d.intro.map((p) => `<p>${esc(p)}</p>`).join("")}
        </div>
        <aside class="prof-col">${teachers.map((t) => `
          <div class="prof-card">
            <img src="${t.photo}" alt="${esc(t.name)}" loading="lazy">
            <h3>${esc(t.name)}</h3>
            <a class="tel" href="${tel(t.phone)}">☎ ${t.phone}</a>
            <ul>${t.creds.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
          </div>`).join("")}
        </aside>
      </div>

      <div class="two">
        <div id="inscriptions">
          <h2 class="tag tag--blue">S'inscrire ${/^[aeiouyàâéèêëïîôûü]/i.test(d.name) ? "à l'" : /^boxe/i.test(d.name) ? "à la " : "au "}${esc(d.name.toLowerCase())}</h2>
          <h3>Où et quand s'inscrire ?</h3>
          <p class="signup">${esc(d.signup)}</p>
          ${d.extra ? `<p class="note">${esc(d.extra)}</p>` : ""}
          <h3>Que faut-il fournir ?</h3>
          <ol class="docs">${D.documents.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
        </div>
        <div id="tarifs">
          <h2 class="tag tag--yellow">Tarifs ${esc(D.club.season)}</h2>
          <h3>Combien ça coûte ?</h3>
          <ul class="prices">${d.prices.map(([label, detail, amount, chq]) => `<li><span>${esc(label)}${detail ? `<small>${esc(detail)}</small>` : ""}<small>Deux chèques : ${esc(chq)} (professeur + C.S.A.H.R.)</small></span><b>${euro(amount)}</b></li>`).join("")}</ul>
          <h3>Est-il possible d'essayer ?</h3>
          <p>Bien sûr ! Le club vous offre un cours d'essai gratuit. Présentez-vous au professeur au cours de votre choix (dès la reprise des cours) avec des vêtements appropriés.</p>
        </div>
      </div>

      <h2 class="tag tag--green" id="horaires">Où et quand pratiquer ?</h2>
      ${byTeacherVenue.map(({ g, slots }) => `${teachers.length > 1 ? `<p class="d-sub">${esc(D.teachers[g.teacher].name)}</p>` : ""}${venueTable(g.venue, slots)}`).join("")}
      <p class="note"><a href="planning.html#${d.id}">Voir ces cours dans le planning de la semaine</a></p>

      <h2 class="tag tag--teal">Photos</h2>
      <div class="photos3">${[1, 2, 3].map((k) => `<img src="assets/img/disciplines/${d.id}-${k}.jpg" alt="${esc(d.name)} au CSAHR" loading="lazy">`).join("")}</div>`;
  }

  function planning() {
    $("#pictos").outerHTML = pictosHTML();
    const fd = $("#f-d"), fp = $("#f-pub"), fv = $("#f-venue");
    fd.innerHTML = `<option value="">Toutes</option>` + D.disciplines.map((d) => `<option value="${d.id}">${esc(d.name)}</option>`).join("");
    fp.innerHTML = `<option value="">Tous âges</option>` + Object.entries(PUBLICS).filter(([k]) => k !== "tous").map(([k, v]) => `<option value="${k}">${v}</option>`).join("");
    const quarters = [...new Set(Object.values(D.venues).map((v) => v.quarter))];
    fv.innerHTML = `<option value="">Tous les quartiers</option>` + quarters.map((q) => `<option value="${esc(q)}">${esc(q)}</option>`).join("");
    if (byId(hashId())) fd.value = hashId();

    const today = (new Date().getDay() + 6) % 7;
    const render = () => {
      try { history.replaceState(null, "", fd.value ? "#" + fd.value : location.pathname); } catch (e) {}
      const slots = allSlots().filter((s) => (!fd.value || s.d.id === fd.value) && (!fp.value || s.pub === fp.value || s.pub === "tous") && (!fv.value || D.venues[s.venue].quarter === fv.value))
        .sort((a, b) => a.start.localeCompare(b.start));
      $("#week").innerHTML = DAYS.map((name, i) => {
        const items = slots.filter((s) => s.day === i);
        return `<section class="day${i === today ? " today" : ""}" aria-label="${name}"><h2>${name}</h2>
          ${items.length ? `<ol>${items.map((s) => `<li><a class="slot" style="--c:${s.d.color}" href="discipline.html#${s.d.id}"><time>${hour(s.start)} – ${hour(s.end)}</time><b>${esc(s.d.name)}</b><span>${esc(s.level)}</span><span class="v">${esc(D.venues[s.venue].short)}</span></a></li>`).join("")}</ol>` : `<p class="day-empty">Pas de cours</p>`}
        </section>`;
      }).join("");
      $("#count").textContent = `${slots.length} cours par semaine${fd.value || fp.value || fv.value ? " pour cette sélection" : " au total"}. Pas de cours pendant les vacances scolaires.`;
    };
    [fd, fp, fv].forEach((el) => el.addEventListener("input", render));
    render();
    $("#legend").innerHTML = D.disciplines.map((d) => `<span style="--c:${d.color}"><i></i>${esc(d.name)}</span>`).join("");
  }

  function tarifs() {
    $("#pictos").outerHTML = pictosHTML();
    const fd = $("#c-d"), fa = $("#c-age"), out = $("#c-out");
    fd.innerHTML = `<option value="">Choisir une discipline</option>` + D.disciplines.map((d) => `<option value="${d.id}">${esc(d.name)} (${esc(d.teachers.map((t) => D.teachers[t].name).join(", "))})</option>`).join("");
    // Choisit la ligne de tarif qui correspond à l'âge, d'après les tranches écrites dans son libellé.
    const fits = (label, age) => {
      const l = label.toLowerCase();
      let m;
      if ((m = l.match(/(\d+)\s*-\s*(\d+)\s*ans/))) return age >= +m[1] && age <= +m[2];
      if ((m = l.match(/moins de (\d+)/))) return age < +m[1];
      if ((m = l.match(/\+?\s*(\d+)\s*ans et plus|\(\+(\d+) ans\)|(\d+) ans et \+/))) return age >= +(m[1] || m[2] || m[3]);
      if (/adulte/.test(l) && !/enfant/.test(l)) return age >= 18;
      return true;
    };
    const run = () => {
      const d = byId(fd.value);
      const age = parseInt(fa.value, 10);
      if (!d) { out.innerHTML = ""; return; }
      if (!isNaN(age) && age < d.minAge) { out.innerHTML = `<p class="warn">Le ${esc(d.name.toLowerCase())} se pratique à partir de ${d.minAge} ans.</p>`; return; }
      const rows = d.prices.filter(([label]) => isNaN(age) || fits(label, age));
      out.innerHTML = rows.map(([label, detail, amount, chq]) => `<div><p class="total">${euro(amount)}</p><p><b>${esc(label)}</b>${detail ? ` · ${esc(detail)}` : ""}</p><p class="note">Deux chèques : ${esc(chq)} (un à l'ordre du professeur, un à l'ordre du « C.S.A.H.R. »)</p></div>`).join("<hr>")
        + `<p><a href="discipline.html#${d.id}">Voir les horaires du ${esc(d.name.toLowerCase())}</a></p>`;
    };
    [fd, fa].forEach((el) => el.addEventListener("input", run));
    $("#calc").addEventListener("submit", (e) => { e.preventDefault(); run(); });

    $("#price-rows").innerHTML = D.disciplines.map((d) => d.prices.map(([label, detail, amount, chq], i) => `<tr>
      ${i === 0 ? `<td class="n" style="--c:${d.color}" rowspan="${d.prices.length}"><a href="discipline.html#${d.id}">${esc(d.name)}</a></td>` : ""}
      <td>${esc(label)}${detail ? `<br><span class="note">${esc(detail)}</span>` : ""}</td><td class="chq">${esc(chq)}</td><td class="amt">${euro(amount)}</td></tr>`).join("")).join("");
  }

  function inscription() {
    $("#pictos").outerHTML = pictosHTML();
    $("#docs").innerHTML = D.documents.map((x) => `<li>${esc(x)}</li>`).join("");
    $("#dates").innerHTML = D.disciplines.map((d) => `<tr><td class="n" style="--c:${d.color}"><a href="discipline.html#${d.id}">${esc(d.name)}</a></td><td>${esc(d.signup)}</td><td>${d.teachers.map((t) => `<a href="${tel(D.teachers[t].phone)}">${D.teachers[t].phone}</a>`).join("<br>")}</td></tr>`).join("");
  }

  function faq() {
    $("#pictos").outerHTML = pictosHTML();
    $("#faq").innerHTML = faqHTML(D.faq);
  }

  function club() {
    $("#pictos").outerHTML = pictosHTML();
    $("#president").innerHTML = D.president.map((p) => `<p>${esc(p)}</p>`).join("") + `<p><b>Marc Lopes</b><br>Président</p>`;
    $("#staff").innerHTML = D.staff.map((p) => `<a class="person" href="discipline.html#${p.d}"><img src="${p.photo}" alt="${esc(p.name)}" loading="lazy"><b>${esc(p.name)}</b><span>${esc(p.role)}</span></a>`).join("");
    $("#board").innerHTML = D.board.map((p) => `<div class="person"><img src="${p.photo}" alt="${esc(p.name)}" loading="lazy"><b>${esc(p.name)}</b><span>${esc(p.role)}</span></div>`).join("");
    $("#history").innerHTML = D.history.map(([y, t]) => `<li><b>${y}</b><p>${esc(t)}</p></li>`).join("");
    const f = D.founder;
    $("#founder").innerHTML = `<img src="${f.photo}" alt="${esc(f.name)}" loading="lazy"><div>${f.text.map((p) => `<p>${esc(p)}</p>`).join("")}<p class="quote">« ${esc(f.quote)} »</p></div>`;
    $("#venues").innerHTML = Object.keys(D.venues).map((id) => {
      const slots = allSlots().filter((s) => s.venue === id);
      const ds = [...new Set(slots.map((s) => s.d.name))];
      const v = D.venues[id];
      return `<div class="venue-table"><div class="venue-head"><div><b>${esc(v.name)}</b><span>${esc(v.address)}</span><span>Quartier ${esc(v.quarter)}</span></div><a href="${mapUrl(v)}" target="_blank" rel="noopener">Plan d'accès</a></div>
        <div class="bus">${esc(ds.join(", "))}${v.bus.length ? `<br>Bus : ${v.bus.map(([s, l]) => `${esc(s)} (${l})`).join(" · ")}` : ""}</div></div>`;
    }).join("");
  }

  renderLayout();
  ({ home, discipline, planning, tarifs, inscription, faq, club })[page]?.();
  if (page === "discipline") window.addEventListener("hashchange", () => { location.reload(); });
})();
