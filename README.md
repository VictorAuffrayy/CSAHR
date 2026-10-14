# CSAHR — refonte du site

Refonte du site du **Comité Sportif et Artistique des Hauts de Rueil** (club multi-arts martiaux de
Rueil-Malmaison), à partir de [csahr.com/rueil](https://www.csahr.com/rueil/).

La charte graphique d'origine est conservée : bandeau et logo CSAHR, fond photo sombre, colonne blanche
centrée, menu Montserrat, pictogrammes des disciplines (gris, en couleur au survol), titres Roboto Condensed,
étiquettes de couleur (orange, bleu, jaune, vert, turquoise) et pied de page sombre.
Toutes les photos, le logo et les pictogrammes viennent du site d'origine.

Site statique : HTML, CSS et JavaScript sans framework ni étape de build. Il fonctionne tel quel sur GitHub Pages.

## Pages

| Page | Contenu |
| --- | --- |
| `index.html` | Accroche, diaporama, pictogrammes, recherche de cours (discipline, âge, jour), actualités, photos |
| `discipline.html#karate` | Fiche discipline : présentation, professeur(s), inscription, tarifs, horaires par salle (plan d'accès, bus), photos |
| `planning.html` | Planning de la semaine filtrable par discipline, âge et quartier |
| `tarifs.html` | Calcul du tarif selon la discipline et l'âge, tableau de tous les tarifs |
| `inscription.html` | Cours d'essai, documents à fournir, dates d'inscription par discipline |
| `faq.html` | Foire aux questions |
| `club.html` | Présentation, mot du président, professeurs, conseil d'administration, histoire, lieux |

## Modifier le contenu

Tout le contenu (disciplines, horaires, tarifs, professeurs, salles, actualités, FAQ, historique) est dans
**`assets/js/data.js`**. Les images sont dans `assets/img/`.

## Lancer en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Publier sur GitHub Pages

Settings → Pages → *Deploy from a branch* → choisir la branche et `/ (root)`.
