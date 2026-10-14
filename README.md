# CSAHR — refonte du site

Refonte complète (UX + UI) du site du **Comité Sportif et Artistique des Hauts de Rueil**
(club multi-arts martiaux de Rueil-Malmaison), à partir du contenu de `csahr.com/rueil`.

Site statique : HTML, CSS et JavaScript sans framework ni étape de build. Il fonctionne tel quel sur GitHub Pages.

## Pages

| Page | Rôle |
| --- | --- |
| `index.html` | Accueil : sélecteur « Quelle discipline pour moi ? » (âge + type), chiffres clés, grille des disciplines filtrable, parcours d'inscription, FAQ, lieux |
| `discipline.html#…` | Fiche discipline : présentation, horaires, lieux, tarifs et contact direct du professeur pour l'essai gratuit |
| `planning.html` | Planning hebdomadaire interactif, filtrable par famille, âge, discipline et lieu (jour courant mis en évidence, filtre partageable via l'URL `planning.html#karate`) |
| `infos.html` | Cours d'essai, tableau de tous les tarifs, modalités de paiement, certificat médical, FAQ complète, lieux |
| `club.html` | Histoire du club et équipe de professeurs |

## Modifier le contenu

Tout le contenu (disciplines, horaires, tarifs, professeurs, lieux, FAQ, historique) se trouve dans
**`assets/js/data.js`**. Une modification à cet endroit s'applique à toutes les pages.

Données à compléter (non publiées sur l'ancien site au moment de la reprise) :
- horaires du judo, handi-judo, boxe thaï, kick boxing et cours du samedi de boxe française ;
- lieux des cours d'aïkido (mardi/jeudi) et de boxe française ;
- tarifs de la boxe thaï, du kick boxing et du handi-judo ;
- adresses exactes de la salle Raymond Le Brenn et du gymnase des Bons Raisins ;
- téléphone du club : `01 47 51 45 94` (PagesJaunes) ; Facebook indique `01 47 49 39 52`, à vérifier.

## Lancer en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Publier sur GitHub Pages

Settings → Pages → *Deploy from a branch* → choisir la branche et `/ (root)`.
