# Portfolio Windows XP

Site portfolio qui simule le bureau de Windows XP : bureau avec icônes, fenêtres déplaçables, barre des tâches, menu Démarrer. Chaque "application" présente une partie du portfolio (à propos, projets, CV, contact).

Projet personnel de Benjamin, en 2e année d'école d'informatique. Objectif : apprendre et construire soi-même. Claude est mentor, pas développeur : le rôle détaillé est dans le style de sortie Mentor (`.claude/output-styles/mentor.md`). Règle à retenir même sans ce style : pas de code écrit à la place de Benjamin sans demande explicite.

## Contexte

- Niveau : <à compléter : langages et outils déjà pratiqués>
- Temps disponible : échéance initiale du 18/10/2026 dépassée, nouvelle date à fixer.
- Machine : <à compléter : OS, éditeur, Claude Code en terminal / VS Code / appli>

## Stack

Vue 3 (`<script setup>`) + Vite, Pinia pour l'état, `xp.css` pour le style des fenêtres.
`xp.css` ne fournit ni barre des tâches, ni menu Démarrer, ni barre de titre inactive : ce CSS est à écrire à la main.

## Commandes

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run preview` — sert le build
- Pas de tests ni de lint pour l'instant.
- Commits : messages courts en français, sans ligne `Co-Authored-By`.

## État du projet

Mis à jour à la fin de chaque échange qui tranche quelque chose (2-3 lignes).

- Décidé : empilement des fenêtres par `zIndex` explicite (+ compteur `topZ`), appliqué via `:style` sur des fenêtres en `position: absolute`. Store : `{ id, minimized, zIndex }` + `activeId`. Focus au `pointerdown` sur la fenêtre (comportement XP, évite le conflit de bubbling avec les boutons de la barre de titre, base du futur drag). `activeId` remis à `null` quand on réduit/ferme (pas de réactivation auto). État actif de la barre des tâches via `:class`. Layout en flex colonne.
- Décidé : drag par la barre de titre (offset calculé au `mousedown`, écouteurs `mousemove`/`mouseup` sur `document`), positions `x`/`y` dans le store via `moveWindow`.
- Fait : agrandir/restaurer (`maximized` dans le store, `maximizeWindow` bascule, classe `.maximized`, drag désactivé quand agrandie).
- Fait (à tester dans le navigateur) : clamp dans `onDrag` (`App.vue`), bornes = taille mesurée de `.windows` via une ref de template, `MIN_VISIBLE = 40` px toujours visibles. La barre des tâches reste devant les fenêtres (contexte d'empilement sur `.windows`, z-index 1 contre 2 pour la barre).
- Fait : build de prod réparé avec `build.cssMinify: false` (lightningcss refusait `progress:not([value]):before:not([value])` dans `xp.css`). Alternative plus tard : `'esbuild'`, à installer.
- Fait : cascade (`CASCADE_OFFSET = 25`, calculée avec `windows.length` avant le `push`). `getApp(id)` exportée par `apps.js`, seule source pour retrouver une app (titre, icône, futur composant) : le store ne copie pas `name`. Nettoyage : `toggle`, imports, `console.log`.
- Reporté : `div` → `button` dans la barre des tâches (`xp.css` impose `button:not(:disabled).active`, qui écraserait notre classe `.active` : il faut d'abord travailler le CSS).
- Fait : boutons de titre ignorés dans `startDrag` (`event.target.closest('button')`), `focusWindow` toujours déclenché.
- Fait : 4 apps (`about`, `projets`, `cv`, `contact`) branchées via `component` dans `apps.js` + `<component :is>` dans `App.vue`, composants dans `src/components/apps/`, icônes XP (User Accounts, My Documents, Generic Text Document, Outlook Express). Chaque app doit avoir un `component` (pas de repli).
- Fait : CV (zoom, téléchargement, vrai CV dans `public/cv/`), Projets façon Explorateur XP (Tanafit, Valopyx, RPG MongoDB, Tanafit API), Contact via Formspree (retour d'envoi dans la barre d'état, verrou `sending`, « Nouveau message » vide le formulaire, lien LinkedIn en dur dans `ContactApp.vue`).
- Fait : About alimenté par `src/data/about.js` (textes, liens, compétences, outils, photo `public/img/photo.jpg` recadrée depuis le CV), même principe que `projects.js` : le contenu se modifie dans `src/data/`, pas dans les composants.
- Fait : menu Démarrer (`StartMenu.vue`, contenu lu dans `apps.js` et `about.js`, fermeture au clic extérieur via `.start-area` + `contains()`, « Tout fermer » = `closeAllWindows` du store). Noms des apps dans la barre des tâches (masqués sous 560 px).
- Décidé : quasiment pas de commentaires dans le code (tous retirés le 12/11/2026, sauf `vite.config.js` et le `link: null` de `projects.js`), et aucun écrit par Claude ; les explications vont dans ce fichier. Pas de bouton mort : un bouton est branché ou `disabled`.
- Fait : README (aperçu dans `docs/apercu.jpg`), `index.html` (titre, `lang="fr"`, description), `.claude/` sorti du dépôt (ignoré par git), 477 icônes inutilisées retirées de `public/icons` (24 gardées).
- Décidé : pas de lien vers l'appli Tanafit (`link: null` dans `projects.js`) tant qu'elle n'a pas de login.
- Fait : favicon (`public/favicon.png`, icône User Accounts réduite en 48 px ; l'ancien `favicon.ico` de Vue retiré). Boutons Rechercher et Dossiers retirés de Projets, avec leurs icônes ; « Dossier parent » était déjà branché. Site déjà en ligne.
- Fait (à tester sur vrai téléphone) : mobile. `isTouch()` dans `src/utils/touch.js` (`pointer: coarse`) : tap simple ouvre l'app (`Icon.vue`), fenêtres ouvertes agrandies (`openWindow`). Drag et focus passés aux pointer events (`pointerdown/move/up/cancel`), `@mousedown.prevent` remplacé par `user-select: none` + `touch-action: none` sur `.title-bar`.
- Fait (pas encore testé avec la vraie base) : admin en ligne sur Supabase. Page `/admin/` = 2e point d'entrée Vite (`admin/index.html`, `src/admin/`, sans xp.css), onglets Projets / About / CV / Contact. Tables `projects` et `settings` (`key` = `about` | `contact` | `cv`, `value` en jsonb), bucket `medias`, RLS : lecture publique, écriture réservée à l'UUID admin (SQL dans `docs/supabase.sql`). Le site lit tout via le store `content` (`load()` dans `App.vue`), initialisé avec `src/data/*.js` qui sert de secours si Supabase ne répond pas ou si `.env.local` est absent.
- En cours : Supabase auto-hébergé sur Coolify (Docker). Compte admin créé, inscription désactivée (`DISABLE_SIGNUP=true`, vérifié). SQL lancé, `.env.local` rempli, le site lit bien Supabase en local. Reste : tester l'admin (écriture, upload), passer Kong en HTTPS si ce n'est pas fait (sous-domaine de benjiguillaume.fr), variables chez l'hébergeur, `.env.example` à retirer du `.gitignore`.
- Décidé : `src/data/` gardé comme secours pour l'instant, à supprimer plus tard.
- Fait (15/11, sur la branche `integration`, ex-travail local refait par-dessus GitHub ; ancien travail dans `sauvegarde-15-11`) : démos dans Projets, lancées par « Lancer la démo » (`ProjectDemo.vue`, rien ne se charge avant le clic). `demo` = page de `public/demos/` en iframe, ou en plein onglet au tactile ; `terminal` = clé de `src/data/terminals.js` (session rejouée par `TerminalReplay.vue`, saisies en jaune) ; `controls` = section Commandes ; `progress` (`updated`, `done`, `todo`) = « En cours » + section Avancement.
- Fait : colonnes `demo`, `terminal`, `controls` (text[]), `progress` (jsonb) dans `docs/supabase.sql` ; migration pour la base existante + 3 projets + photo dans `docs/supabase-demos.sql` (**à lancer**). Onglet Projets de l'admin : champs démo, terminal (liste des clés), commandes (une par ligne), case « Projet en cours » + date, fait, à faire. Testé avec un faux Supabase (lecture, enregistrement, anciennes lignes sans ces colonnes).
- Fait : Valopyx (Pyxel 3.0.1, `packages="pillow"`, `gamepad="enabled"`) jouable au doigt : la croix et A / B / X sont lus par le jeu (commit dans le dépôt Valopyx), un toucher = un clic. Mise à jour de la démo : dans le dépôt Valopyx, `.venv\Scripts\pyxel package Jeu Jeu/projet_eleve.py`, puis copier `Jeu.pyxapp` en `public/demos/valopyx/valopyx.pyxapp` (même version de Pyxel que le `pyxel.js` de `index.html`).
- Fait : RPG = vraie partie de `main.py` capturée avec mongomock à la place de MongoDB, `random.seed(7)`, saisies `1, Benjamin, 3, 5, 1, 3`, extrait dans `src/data/rpgSession.js`. Invites et arrondis des PV corrigés dans le dépôt Projet_jeux_db.
- Décidé : fenêtre inactive → ses iframes en `pointer-events: none` (classe `.active` sur la fenêtre dans `AppWindow.vue`) : le 1er clic donne le focus, le 2e va au jeu. Drag avec iframe vérifié dans Chromium. Jeu réduit = continue de tourner, comme dans XP. Terminal fait maison plutôt qu'asciinema (zéro dépendance, pas de WSL).
- Fait : icônes réduites à 128 px (4,9 Mo → 283 Ko), horloge (`TaskbarClock.vue`), Projets en colonne sous 640 px, README à jour.
- Ouvert, par priorité : lancer `docs/supabase-demos.sql` sur la base ; tester le mobile sur un vrai téléphone ; boutons de titre plus gros au doigt ; pousser les dépôts Valopyx et Projet_jeux_db ; `public/icons/8d39…webp` (tier list vide, non suivi) à supprimer.
- Fait : `AppWindow.vue` sorti de `App.vue` (prop `win`, drag interne, bornes = `parentElement`, c.-à-d. `.windows`).
- Dette : barre d'outils copiée dans 4 apps, `windows.value.find` répété dans le store, nommage incohérent (`taskbar.vue`, classes `.CV`/`.Contact`/`.ProjetApp`), `div` → `button` dans la barre.
