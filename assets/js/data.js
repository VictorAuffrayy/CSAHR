/*
 * Contenu du site — source unique pour toutes les pages.
 * Repris de www.csahr.com/rueil (saison 2026-2027).
 */
window.CSAHR = {
  club: {
    name: "CSAHR",
    fullName: "Comité Sportif et Artistique des Hauts de Rueil",
    founded: 1968,
    members: "1 250",
    season: "2026-2027",
    address: "81 rue des Bons Raisins, 92500 Rueil-Malmaison",
    email: "contact@csahr.com",
    facebook: "https://www.facebook.com/ArtsMartiauxRueil",
    messenger: "https://www.messenger.com/t/219469275145819",
  },

  /* Images de la charte et de l'accueil */
  images: {
    banner: "assets/img/bandeau.png",
    slider: [
      { src: "assets/img/slider/1.jpg", alt: "Jeunes karatékas du CSAHR" },
      { src: "assets/img/slider/2.jpg", alt: "Cours de karaté enfants" },
      { src: "assets/img/slider/3.jpg", alt: "Enfants en kimono au dojo" },
      { src: "assets/img/slider/4.jpg", alt: "Enfants en kimono pendant un cours" },
    ],
    gallery: [
      { src: "assets/img/photos/coupe-de-france-2024.jpg", caption: "Coupe de France Karaté 2024 – Des triplés en or !" },
      { src: "assets/img/photos/johan-lopes-2013.jpg", caption: "Johan Lopes – Champion de France 2013" },
      { src: "assets/img/photos/cornubet-ducheix.jpg", caption: "Mickaël Cornubet – Champion du monde & Thierry Ducheix – Professeur" },
      { src: "assets/img/photos/baillard-aikido.jpg", caption: "Jean-Louis Baillard, 5e Dan d'Aïkido" },
    ],
  },

  news: [
    { date: "2026-06-26", title: "Fin de saison 2025-26", text: "Dernier cours d'Antoinette, le samedi 4 juillet, avec remise des grades et ceintures.", img: "assets/img/actu/facebook.jpg" },
    { date: "2026-06-18", title: "Suivez nos actualités sur Facebook et Instagram", text: "Nos résultats et nos évènements sont régulièrement mis à jour sur notre page Facebook : résultats sportifs, actualités du club et évènements particuliers. Vous pouvez aussi nous contacter via la messagerie Facebook. La team CSAHR.", img: "assets/img/actu/facebook.jpg", link: "https://www.facebook.com/ArtsMartiauxRueil" },
    { date: "2026-05-29", title: "Fermeture exceptionnelle des équipements sportifs", text: "En raison des fortes chaleurs annoncées et conformément à la décision municipale, l'ensemble des équipements sportifs sera fermé à compter de ce jour et jusqu'au dimanche 31 mai à 8h00.", img: "assets/img/actu/fortes-chaleurs.jpg" },
  ],

  venues: {
    mimoun: {
      name: "Complexe Sportif « Alain Mimoun »", short: "Mimoun",
      address: "43 rue Voltaire, 92500 Rueil-Malmaison", quarter: "Arsenal / Plateau",
      bus: [["Géranium", "241"], ["8 Mai 45", "241, 244"], ["Rue de la Paix", "244"]],
    },
    budokan: {
      name: "Salle du Budokan – Atrium", short: "Budokan",
      address: "81 rue des Bons Raisins, 92500 Rueil-Malmaison", quarter: "Arsenal / Plateau",
      bus: [["Géranium", "241"], ["8 Mai 45", "241, 244"], ["Rue de la Paix", "244"]],
    },
    lebrenn: {
      name: "Centre Raymond Le Brenn", short: "Le Brenn",
      address: "12 rue des Mazurières, 92500 Rueil-Malmaison", quarter: "Mazurières / Fouilleuse",
      bus: [["Fouilleuse", "141, 565"], ["Les Mazurières", "141, 241"]],
    },
    gare: {
      name: "Salle de la Gare", short: "Gare",
      address: "1 rue Braille, 92500 Rueil-Malmaison", quarter: "Rueil 2000 / Gare",
      bus: [],
    },
    jeandame: {
      name: "Complexe Sportif « Jean Dame »", short: "Jean Dame",
      address: "9 rue André Lachaud, 92500 Rueil-Malmaison", quarter: "Rueil Centre",
      bus: [["Baudin", "144, 241, 467"], ["Rue du Mans", "158"], ["Rueil Ville", "244, 258"]],
    },
    bonsraisins: {
      name: "Gymnase des Bons Raisins", short: "Bons Raisins",
      address: "34 rue des Bons Raisins, 92500 Rueil-Malmaison", quarter: "Arsenal / Plateau",
      bus: [["Les Godardes", "244"], ["Saint-Exupéry", "141"], ["Edmond Rostand", "244"]],
    },
  },

  teachers: {
    baillard: { name: "Jean-Louis Baillard", phone: "06 88 63 67 83", photo: "assets/img/profs/baillard.jpg", creds: ["Professeur diplômé d'État de la FFAB", "Ceinture noire 5e Dan de la CSDGE"] },
    mesdesirs: { name: "Christian Mesdesirs", phone: "06 72 42 67 96", photo: "assets/img/profs/mesdesirs.jpg", creds: ["Professeur diplômé d'État", "Gant d'argent technique", "Ex-compétiteur & vainqueur de divers galas"] },
    ducheix: { name: "Matis & Thierry Ducheix", phone: "06 95 60 55 29", photo: "assets/img/profs/ducheix.jpg", creds: ["Professeurs diplômés d'État"] },
    lopes: { name: "Johan, Marc & Mickaël Lopes", phone: "06 70 55 78 35", photo: "assets/img/profs/freres-lopes.jpg", creds: ["Professeurs diplômés d'État", "Ceintures noires 4e, 6e & 3e Dan", "Champions de France, 3e au championnat d'Europe", "Médaillés Jeunesse et Sport"] },
    fleuri: { name: "Antoinette Fleuri", phone: "06 84 64 34 12", photo: "assets/img/profs/fleuri.jpg", creds: ["Professeur diplômé d'État", "Ceinture noire 2e Dan"] },
    aubourg: { name: "Cyril Aubourg", phone: "06 62 74 23 66", photo: "assets/img/profs/aubourg.jpg", creds: ["Professeur diplômé d'État", "Ceinture noire 2e Dan"] },
    tacherift: { name: "Saïd Tacherift", phone: "06 16 52 41 62", photo: "assets/img/profs/tacherift.jpg", creds: ["Professeur diplômé", "Gants d'argent"] },
    volang: { name: "Frank Volang", phone: "06 74 82 97 46", photo: "assets/img/profs/volang.jpg", creds: ["Professeur diplômé d'État", "Champion de France 1998 et 2000"] },
  },

  /* Page « Les professeurs » : l'ordre et les photos du site d'origine */
  staff: [
    { name: "Jean-Louis Baillard", role: "Aïkido", photo: "assets/img/profs/baillard.jpg", d: "aikido" },
    { name: "Christian Mesdesirs", role: "Boxe française", photo: "assets/img/profs/mesdesirs.jpg", d: "boxe-francaise" },
    { name: "Matis & Thierry Ducheix", role: "Boxe thaï", photo: "assets/img/profs/ducheix.jpg", d: "boxe-thai" },
    { name: "Marc Lopes", role: "Fitness Fighting Move, Karaté, Krav-maga", photo: "assets/img/profs/marc-lopes.jpg", d: "karate" },
    { name: "Mickaël Lopes", role: "Fitness Fighting Move, Karaté, Krav-maga", photo: "assets/img/profs/mickael-lopes.jpg", d: "karate" },
    { name: "Johan Lopes", role: "Fitness Fighting Move, Karaté, Krav-maga", photo: "assets/img/profs/johan-lopes.jpg", d: "karate" },
    { name: "Antoinette Fleuri", role: "Judo", photo: "assets/img/profs/fleuri.jpg", d: "judo" },
    { name: "Cyril Aubourg", role: "Judo, Handi-judo", photo: "assets/img/profs/aubourg.jpg", d: "handi-judo" },
    { name: "Saïd Tacherift", role: "Kick boxing", photo: "assets/img/profs/tacherift.jpg", d: "kick-boxing" },
    { name: "Frank Volang", role: "Tai-chi-chuan", photo: "assets/img/profs/volang.jpg", d: "tai-chi-chuan" },
  ],

  board: [
    { name: "Marc Lopes", role: "Président", photo: "assets/img/bureau/marc-lopes.jpg" },
    { name: "Olivier Lieveaux", role: "Secrétaire général", photo: "assets/img/bureau/olivier-lieveaux.jpg" },
    { name: "Lounès Djabri", role: "Trésorier", photo: "assets/img/bureau/lounes-djabri.jpg" },
    { name: "Mickael Rodrigues", role: "Trésorier-adjoint", photo: "assets/img/bureau/mickael-rodrigues.jpg" },
    { name: "Amélie Salardaigne", role: "Administratrice", photo: "assets/img/bureau/amelie-salardaigne.jpg" },
    { name: "Rémi Kouby", role: "Administrateur", photo: "assets/img/bureau/remi-kouby.jpg" },
    { name: "Christelle Mollet", role: "Administratrice", photo: "assets/img/bureau/christelle-mollet.jpg" },
    { name: "Cyrielle Rivière", role: "Administratrice", photo: "assets/img/bureau/cyrielle-riviere.jpg" },
    { name: "Carlos Rodriguez", role: "Administrateur", photo: "assets/img/bureau/carlos-rodriguez.jpg" },
  ],

  /*
   * Disciplines. Chaque groupe = un professeur dans une salle.
   * slot : [jour 0=lundi…5=samedi, début, fin, niveau, public]
   * public : "enfants" | "ados" (ados et adultes) | "tous"
   */
  disciplines: [
    {
      id: "aikido", name: "Aïkido", color: "#cc3366", ages: "6 ans et +", minAge: 6,
      teachers: ["baillard"],
      intro: [
        "L'aïkido n'est pas un sport de combat mais un art martial. C'est un système de défense visant à rendre un attaquant inoffensif en ne lui causant pas de blessure. C'est la forme moderne et pacifique d'un ancien art martial japonais, l'aïkijitsu.",
        "Il ne nécessite pas de force physique : l'efficacité des techniques repose sur le placement du corps et le relâchement musculaire. Il est accessible à tous, hommes, femmes et enfants. Chez les enfants, les armes servent de support pédagogique pour parfaire les techniques à mains nues.",
      ],
      signup: "Inscriptions et reprise des cours depuis le mardi 15 septembre 2026",
      prices: [["Enfants (6-10 ans)", "2 cours max. / semaine", 348, "270 € + 78 €"], ["Adolescents (11-17 ans)", "2 cours max. / semaine", 378, "290 € + 88 €"], ["Adultes (+18 ans)", "2 cours max. / semaine", 388, "300 € + 88 €"]],
      groups: [
        { teacher: "baillard", venue: "mimoun", slots: [
          [1, "18:30", "19:30", "Enfants (6-10 ans)", "enfants"], [1, "19:30", "20:30", "Adolescents (11-15 ans)", "ados"], [1, "20:30", "21:45", "Ados / adultes (+16 ans)", "ados"],
          [3, "18:30", "19:30", "Enfants (6-10 ans)", "enfants"], [3, "19:30", "20:30", "Adolescents (11-15 ans)", "ados"], [3, "20:30", "21:45", "Ados / adultes (+16 ans)", "ados"],
          [5, "16:30", "18:30", "Aïkido self-défense ados / adultes (tarif distinct)", "ados"],
        ] },
      ],
    },
    {
      id: "boxe-francaise", name: "Boxe française", color: "#ce3234", ages: "6 ans et +", minAge: 6,
      teachers: ["mesdesirs"],
      intro: [
        "Codifiée dès 1794, la savate prend le nom de boxe française et utilise exclusivement des techniques de poings et de pieds. C'est de toutes les formes de boxe pieds-poings la plus technique : éducative, esthétique et efficace.",
        "La savate kangourou est conçue pour les plus petits : l'apprentissage de la boxe se fait par le jeu. Chez les plus grands, la boxe française se pratique en assaut à la touche, où la puissance est totalement exclue. La savate défense apprend à se défendre avec des techniques simples.",
      ],
      signup: "Inscriptions et reprise des cours depuis le mercredi 2 septembre 2026",
      extra: "Le dossier doit être complet avant tout entraînement. Tenue obligatoire : tenue de boxe ou jogging / short et t-shirt, chaussures de boxe française ou baskets à semelle lisse. Accessoires indispensables : protège-dents, coquille et protège-tibias.",
      prices: [["Moins de 15 ans", "1 cours max. / semaine", 279, "210 € + 69 €"], ["15 ans et plus", "2 cours max. / semaine", 364, "280 € + 84 €"]],
      groups: [
        { teacher: "mesdesirs", venue: "lebrenn", slots: [[0, "20:00", "21:30", "Ados / adultes (salle de boxe)", "ados"], [5, "14:00", "15:00", "Enfants", "enfants"], [5, "15:00", "16:45", "Ados / adultes", "ados"]] },
        { teacher: "mesdesirs", venue: "gare", slots: [[2, "20:00", "21:30", "Ados / adultes", "ados"]] },
      ],
    },
    {
      id: "boxe-thai", name: "Boxe thaï", color: "#cc9a34", ages: "12 ans et +", minAge: 12,
      teachers: ["ducheix"],
      intro: [
        "Le muay-thaï est un des sports pieds-poings les plus complets : jambes, poings, genoux, coudes, saisies et projections. Au-delà du sport, c'est une discipline où rigueur et dépassement de soi sont les atouts majeurs.",
        "Pratiqué en loisir ou en compétition, dans une ambiance conviviale, il améliore la condition physique, renforce les muscles et donne confiance en soi. Des interventions en pancrace (projections, immobilisations, soumissions) ont lieu régulièrement.",
      ],
      signup: "Inscriptions et reprise des cours depuis le lundi 14 septembre 2026",
      prices: [["Ados (12-17 ans)", "2 cours max. / semaine", 330, "280 € + 50 €"], ["Adultes (18 ans et +)", "2 cours max. / semaine", 350, "300 € + 50 €"]],
      groups: [
        { teacher: "ducheix", venue: "jeandame", slots: [[0, "20:00", "22:30", "Ados / adultes", "ados"], [2, "18:30", "20:30", "Ados / adultes", "ados"]] },
        { teacher: "ducheix", venue: "lebrenn", slots: [[3, "18:00", "20:00", "Ados / adultes", "ados"], [5, "11:30", "13:30", "Ados / adultes", "ados"]] },
      ],
    },
    {
      id: "fitness-fighting-move", name: "Fitness Fighting Move", color: "#000000", ages: "13 ans et +", minAge: 13,
      teachers: ["lopes"],
      intro: [
        "Des enchaînements de techniques de karaté et d'autres sports de combat, exécutés dans le vide, en rythme sur une musique moderne et dynamique. Une dépense physique saine dans une ambiance détendue.",
        "Pas besoin d'être pratiquant de karaté : le cours s'adresse à toutes et à tous, du débutant au confirmé. La pratique est sûre puisqu'elle ne repose sur aucune opposition physique, donc aucun risque de coup non contrôlé.",
      ],
      signup: "Inscriptions et reprise des cours depuis le lundi 7 septembre 2026",
      prices: [["1 cours par semaine", "", 300, "210 € + 90 €"], ["2 cours par semaine", "", 400, "310 € + 90 €"]],
      groups: [
        { teacher: "lopes", venue: "budokan", slots: [[0, "20:30", "21:30", "À partir de 14 ans", "ados"], [3, "20:30", "21:30", "À partir de 14 ans", "ados"]] },
      ],
    },
    {
      id: "handi-judo", name: "Handi-judo", color: "#9933cc", ages: "4 ans et +", minAge: 4,
      teachers: ["aubourg"],
      intro: [
        "Le judo est un sport d'éveil, éducatif et de compétition dont les pédagogies sont adaptées en fonction de l'âge et des capacités physiques.",
        "Réservé aux personnes en situation de handicap mental, le judo adapté propose de nombreuses alternatives sous forme de loisir, où chacun peut trouver son compte.",
      ],
      signup: "Inscriptions depuis le lundi 1er juin 2026, reprise des cours le lundi 14 septembre 2026",
      prices: [["Enfant / adulte (ancien adhérent)", "Nombre de cours libre", 366, "270 € + 96 €"], ["Enfant / adulte (nouvel adhérent)", "Nombre de cours libre", 381, "285 € + 96 €"]],
      groups: [
        { teacher: "aubourg", venue: "lebrenn", slots: [[4, "18:45", "20:15", "Groupe compétition et enfants / ados / adultes / handi", "tous"], [5, "09:15", "10:15", "Handi-judo enfants / adultes", "tous"], [5, "10:30", "11:45", "Handi-judo enfants / adultes", "tous"]] },
      ],
    },
    {
      id: "judo", name: "Judo", color: "#9933cc", ages: "3 ans et +", minAge: 3,
      teachers: ["fleuri", "aubourg"],
      intro: [
        "Jigoro Kano a trouvé la voie (dō) de la souplesse (jū) en développant l'antique ju-jitsu en un sport, né en 1882 au Kodokan de Tokyo. Son code moral : politesse, courage, sincérité, honneur, modestie, respect, contrôle de soi, amitié.",
        "Baby judo (3-5 ans) : une pédagogie d'éveil qui contribue au développement moteur dès la maternelle. 6-13 ans : découverte des fondamentaux techniques et des valeurs du judoka. École de judo : de l'initiation au perfectionnement, l'arbitrage et la compétition.",
      ],
      signup: "Antoinette Fleuri : inscriptions depuis le mardi 8 septembre, reprise le mardi 15 septembre 2026. Cyril Aubourg : inscriptions depuis le lundi 1er juin, reprise le lundi 14 septembre 2026.",
      prices: [["Baby & judo traditionnel, tout âge (Antoinette)", "2 cours max. / semaine", 296, "200 € + 96 €"], ["Enfant / adulte, ancien adhérent (Cyril)", "Nombre de cours libre", 366, "270 € + 96 €"], ["Enfant / adulte, nouvel adhérent (Cyril)", "Nombre de cours libre", 381, "285 € + 96 €"]],
      groups: [
        { teacher: "fleuri", venue: "budokan", slots: [
          [1, "17:30", "18:15", "4 à 5 ans (baby judo)", "enfants"], [1, "18:15", "19:30", "6 à 14 ans", "enfants"], [1, "19:30", "21:00", "Perfectionnement technique / préparation physique", "ados"],
          [2, "14:30", "15:30", "4 à 5 ans (baby judo)", "enfants"], [2, "14:30", "15:45", "6 à 14 ans", "enfants"], [2, "16:00", "17:30", "+14 ans", "ados"],
          [5, "09:45", "10:45", "6 à 7 ans", "enfants"], [5, "10:45", "11:45", "8 à 14 ans", "enfants"], [5, "11:45", "12:45", "4 à 6 ans (baby judo)", "enfants"], [5, "13:30", "15:00", "10 à 18 ans", "ados"], [5, "15:00", "16:30", "Adultes", "ados"], [5, "16:30", "18:30", "Katas", "ados"],
        ] },
        { teacher: "aubourg", venue: "gare", slots: [
          [1, "18:30", "19:30", "6-8 ans et 9-14 ans", "enfants"], [2, "15:00", "16:15", "6-8 ans et 9-14 ans", "enfants"], [2, "16:15", "17:15", "3 à 5 ans (baby judo)", "enfants"], [3, "18:30", "19:30", "4-6 ans et 7-10 ans", "enfants"],
        ] },
        { teacher: "aubourg", venue: "lebrenn", slots: [
          [0, "17:45", "18:45", "6 à 10 ans", "enfants"], [0, "18:45", "19:45", "7 à 12 ans", "enfants"], [0, "18:45", "20:15", "Ados / adultes", "ados"],
          [2, "18:30", "20:15", "Groupe compétition et enfants / ados / adultes / PPG / kata", "tous"],
          [4, "17:45", "18:45", "4 à 6 ans", "enfants"], [4, "18:45", "19:45", "7 à 12 ans", "enfants"], [4, "18:45", "20:15", "Cours compétition enfants, ados, adultes", "tous"],
          [5, "10:30", "11:30", "3 à 5 ans (baby judo)", "enfants"], [5, "11:45", "12:45", "6-10 ans", "enfants"], [5, "11:45", "13:15", "Cours compétition enfants, ados, adultes", "tous"], [5, "13:30", "16:00", "Animations : Judo Super Girls, Chanbara, Family Judo, kata, sumo, Coupe du Samouraï", "tous"],
        ] },
      ],
    },
    {
      id: "karate", name: "Karaté", color: "#2c99ce", ages: "4 ans et +", minAge: 4, subtitle: "Méthode Shotokan",
      teachers: ["lopes"],
      intro: [
        "Le karaté est une forme de combat à mains nues : cet art martial consiste à porter des atémis (techniques de percussion). Chez l'enfant, il est très appréciable pour le développement psychomoteur ; l'effort est dosé et ne perturbe pas la croissance.",
        "Chez l'adulte, la recherche d'efficacité évolue selon la fréquence et la régularité. Le karaté défense apprend à se défendre contre un agresseur avec toutes les techniques, y compris celles peu utilisées dans le karaté traditionnel.",
      ],
      signup: "Inscriptions et reprise des cours depuis le lundi 7 septembre 2026",
      prices: [["Baby karaté (4-5 ans)", "1 cours max. / semaine", 300, "210 € + 90 €"], ["Cours enfants / adultes", "2 cours max. / semaine", 400, "310 € + 90 €"]],
      groups: [
        { teacher: "lopes", venue: "mimoun", slots: [
          [0, "18:00", "19:00", "6-11 ans débutants", "enfants"], [2, "18:00", "19:00", "6-11 ans débutants", "enfants"],
          [0, "19:00", "20:30", "12 ans à adultes confirmés", "ados"], [2, "19:00", "20:30", "12 ans à adultes confirmés", "ados"],
          [0, "19:00", "20:00", "12 ans à adultes débutants", "ados"], [2, "19:00", "20:00", "12 ans à adultes débutants", "ados"],
        ] },
        { teacher: "lopes", venue: "budokan", slots: [
          [0, "18:00", "19:00", "6-11 ans confirmés", "enfants"], [3, "18:00", "19:00", "6-11 ans confirmés", "enfants"],
          [3, "19:00", "20:30", "12 ans à adultes kumité", "ados"],
          [0, "19:00", "20:30", "Équipe compétiteurs", "ados"], [2, "19:00", "20:30", "Équipe compétiteurs", "ados"],
          [4, "20:00", "21:30", "14 ans à adultes, préparation ceinture noire", "ados"],
          [4, "19:00", "20:00", "Préparation physique avec Johan Lopes, compétiteurs sélectionnés (toutes disciplines)", "ados"],
        ] },
        { teacher: "lopes", venue: "lebrenn", slots: [
          [1, "18:00", "19:00", "6-13 ans débutants", "enfants"], [2, "15:00", "16:00", "6-13 ans débutants", "enfants"],
          [1, "19:00", "20:00", "6-13 ans confirmés", "enfants"], [2, "16:00", "17:00", "6-13 ans confirmés", "enfants"],
          [2, "14:00", "14:45", "4-5 ans baby karaté", "enfants"],
        ] },
      ],
    },
    {
      id: "kick-boxing", name: "Kick boxing", color: "#ce3234", ages: "12 ans et +", minAge: 12,
      teachers: ["tacherift"],
      intro: [
        "Au milieu des années 70, des compétiteurs de karaté cherchent à utiliser pieds et poings dans la réalité du combat : le full contact est né. Sous l'influence du muay-thaï, les coups dans les jambes s'ajoutent et donnent le kick boxing.",
        "Mélange des techniques de poings (boxe anglaise) et de pieds (karaté, taekwondo, muay-thaï), il demande condition physique, agilité, rapidité, puissance, mais aussi concentration, courage et maîtrise de soi.",
      ],
      signup: "Inscriptions et reprise des cours depuis le mardi 8 septembre 2026",
      prices: [["Tarif unique", "2 cours max. / semaine", 340, "250 € + 90 €"]],
      groups: [
        { teacher: "tacherift", venue: "lebrenn", slots: [[1, "20:00", "21:30", "Ados / adultes (tous niveaux)", "ados"], [3, "20:00", "21:30", "Ados / adultes (tous niveaux)", "ados"], [5, "09:30", "11:30", "Ados / adultes (tous niveaux)", "ados"]] },
      ],
    },
    {
      id: "krav-maga", name: "Krav-maga", color: "#2c3e50", ages: "12 ans et +", minAge: 12,
      teachers: ["lopes"],
      intro: [
        "En hébreu, krav-maga signifie « combat rapproché ». C'est une méthode de combat simple, directe et efficace, qui associe boxe, lutte, ju-jitsu et boxe thaïlandaise. Elle est utilisée par de nombreuses forces de police dans le monde.",
        "Elle se compose du self-défense, qui en est la charpente, et du combat corps à corps, qui inclut la dimension psychologique (gestion du stress, travail à plusieurs). Sa pratique dynamique apporte souplesse, renforcement musculaire et condition physique.",
      ],
      signup: "Inscriptions et reprise des cours depuis le lundi 7 septembre 2026",
      prices: [["Tous niveaux", "2 cours max. / semaine", 400, "310 € + 90 €"]],
      groups: [
        { teacher: "lopes", venue: "mimoun", slots: [[0, "20:30", "21:45", "Tous niveaux", "ados"], [2, "20:30", "21:45", "Tous niveaux", "ados"]] },
      ],
    },
    {
      id: "tai-chi-chuan", name: "Tai-chi-chuan", color: "#4eba65", ages: "14 ans et +", minAge: 14,
      teachers: ["volang"],
      intro: [
        "Le tai-chi-chuan fait partie des arts martiaux internes chinois, comme le xing yi et le ba gua zhang. Il vise à l'amélioration de l'être sur les plans physique, émotionnel et mental : se détendre, se recentrer, se défendre, développer sa concentration.",
        "Trois aspects : la pratique de la forme, seul ou en groupe, dans la lenteur ; la poussée des mains (tui shou et san shou) avec un partenaire ; la pratique des armes (épées, sabres, bâtons, perches).",
      ],
      signup: "Inscriptions et reprise des cours depuis le lundi 14 septembre 2026",
      prices: [["Tarif unique", "2 cours max. / semaine", 507, "420 € + 87 €"]],
      groups: [
        { teacher: "volang", venue: "bonsraisins", slots: [[0, "18:00", "19:30", "Tous niveaux", "ados"], [0, "19:30", "21:30", "Confirmés", "ados"], [3, "19:00", "20:30", "Confirmés", "ados"], [4, "19:00", "20:30", "Débutants", "ados"], [5, "10:00", "12:00", "Tous niveaux", "ados"]] },
      ],
    },
  ],

  faq: [
    ["Est-ce qu'il reste des places ?", "La réponse est oui ! À moins qu'il ne soit clairement indiqué sur la page de la discipline que le cours est complet, il reste des places."],
    ["Quels sont les moyens de paiement acceptés ?", "Le règlement est effectué directement auprès du professeur de la discipline : chèques, espèces et Pass+. Si vous payez en espèces, prévoyez l'appoint. Les cartes bancaires, coupons sport et chèques vacances ne sont pas (encore) acceptés."],
    ["Est-il possible de payer en plusieurs fois ?", "Dans la plupart des cas, oui. Les modalités sont fixées directement par les professeurs, à voir avec eux lors de l'inscription définitive."],
    ["Les cours ont déjà commencé. Puis-je encore m'inscrire ?", "Oui. Les inscriptions sont possibles tout au long de l'année : rendez-vous directement auprès du professeur dès le prochain cours."],
    ["Dans ce cas, est-ce que je vais payer pour toute l'année ?", "C'est à voir avec le professeur, qui pourra éventuellement vous faire bénéficier d'une réduction selon la période. L'adhésion et la licence fédérale ne peuvent pas faire l'objet d'une réduction."],
    ["Combien de cours puis-je faire pour le tarif annoncé ?", "Sauf mention contraire, les tarifs sont forfaitaires et donnent accès toute l'année à l'ensemble des cours de votre niveau."],
    ["Est-il possible de faire un cours d'essai ?", "Oui, le premier cours est un cours d'essai et ne nécessite pas d'inscription. Si vous avez un kimono, prenez-le, sinon venez en tenue de sport. Pas besoin de réserver : présentez-vous simplement aux horaires habituels."],
    ["Quel est l'équipement nécessaire ?", "Il varie selon votre niveau et la discipline. Le professeur vous conseillera lors de l'inscription définitive."],
    ["Y a-t-il cours pendant les vacances scolaires ?", "Non, pas de cours pendant les vacances scolaires."],
    ["J'ai besoin d'une attestation de paiement ou d'une facture pour mon CE", "Les attestations de paiement et les factures sont fournies directement par les professeurs."],
    ["Est-ce que je dispose d'une licence fédérale ?", "Oui, toutes nos sections sont affiliées à une fédération nationale. Votre professeur doit vous remettre votre licence, qui garantit que vous êtes assuré pour la discipline."],
  ],

  documents: [
    "Un certificat médical de moins d'un an pour les adultes, avec la mention « Pas de contre-indication à la pratique de la discipline en compétition », ou un questionnaire de santé pour les mineurs, signé et ne comprenant que des réponses négatives.",
    "Une photo d'identité, avec le prénom et le nom du pratiquant au dos, ou téléchargée sur l'espace personnel de l'outil de gestion.",
    "La fiche de préinscription, imprimée sur deux pages distinctes.",
  ],

  history: [
    ["1968", "Création du CSAHR par Raymond Le Brenn pour lutter contre la délinquance qui se développe dans les grands ensembles."],
    ["1997", "Disparition de Raymond Le Brenn. Son fils, Gilles, lui succède à la présidence du club."],
    ["1998", "Création du Trophée Raymond Le Brenn. Marc Lopes, professeur de karaté, remporte la 1re édition."],
    ["1999", "Cyril Diabate, professeur de boxe thaï, remporte le 2e Trophée après son titre de champion du monde."],
    ["2000", "Marc Lopes est nommé président du club. Dominique Barthe et Brigitte Michel, professeurs de judo, remportent le 3e Trophée."],
    ["2001", "Odette Le Brenn, femme du fondateur, remporte le 4e Trophée."],
    ["2004", "Antoinette Fleuri, professeur de judo, remporte le 7e Trophée."],
    ["2009", "L'équipe de karaté combat du CSAHR remporte le 12e Trophée."],
    ["2010", "Frank Volang, professeur de tai-chi-chuan, remporte le 13e Trophée."],
    ["2011", "Johan Lopes (palmarès important en karaté) remporte le 14e Trophée."],
    ["2014", "Mickaël Cornubet, triple champion du monde de boxe thaï, remporte le 17e Trophée."],
    ["2015", "Cyril Aubourg, professeur de judo et responsable de la section handisport, remporte le 18e Trophée."],
    ["2023", "Marc Lopes est réélu président pour la 8e fois consécutive. Mickael Rodrigues devient trésorier après la disparition de Toni La Sala."],
    ["2026", "Élection du conseil d'administration 2026-2029 : Marc Lopes est réélu président pour la 9e fois consécutive, Olivier Lieveaux reconduit secrétaire général, Lounès Djabri devient trésorier."],
  ],

  founder: {
    name: "Maître Raymond Le Brenn",
    photo: "assets/img/raymond-le-brenn.jpg",
    text: [
      "Né en 1931 à Brest, Raymond Le Brenn boxe dès 16 ans. Engagé dans les commandos parachutistes, il apprend la boxe thaïlandaise et le full contact en Indochine, puis perd son bras droit à Dien Bien Phu.",
      "Sur les conseils d'un ami, il s'inscrit à un cours d'aïkido où il n'a de cesse d'égaler son professeur, handicapé lui aussi. Il apprend ensuite le judo, le karaté, le taijitsu et le yoseikan budo.",
      "En 1968, il fonde le Comité Sportif et Artistique des Hauts de Rueil-Malmaison et y crée une section d'aïki-karaté-jitsu. Il décède le 14 janvier 1997. Son livre : Handicap Zéro (Défense pour tous).",
    ],
    quote: "Ne jamais renoncer !",
  },

  president: [
    "Madame, Monsieur, chers parents et chers enfants,",
    "Nous espérons que ce site vous séduira et vous donnera l'envie de venir nous rejoindre. Vous trouverez dans ce club un accueil et un enseignement qui, nous l'espérons, vous satisferont totalement.",
    "Notre objectif est de vous permettre de pratiquer l'art martial que vous avez choisi dans les meilleures conditions de sécurité et dans un environnement des plus agréables. Notre école s'efforcera de vous faire progresser à votre rythme, grâce à un suivi individualisé.",
    "Salutations sportives !",
  ],
};
