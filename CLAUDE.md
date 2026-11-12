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

- Décidé : empilement des fenêtres par `zIndex` explicite (+ compteur `topZ`), appliqué via `:style` sur des fenêtres en `position: absolute`. Store : `{ id, minimized, zIndex }` + `activeId`. Focus au `mousedown` sur la fenêtre (comportement XP, évite le conflit de bubbling avec les boutons de la barre de titre, base du futur drag). `activeId` remis à `null` quand on réduit/ferme (pas de réactivation auto). État actif de la barre des tâches via `:class`. Layout en flex colonne.
- Décidé : drag par la barre de titre (offset calculé au `mousedown`, écouteurs `mousemove`/`mouseup` sur `document`), positions `x`/`y` dans le store via `moveWindow`.
- Fait : agrandir/restaurer (`maximized` dans le store, `maximizeWindow` bascule, classe `.maximized`, drag désactivé quand agrandie).
- Fait (à tester dans le navigateur) : clamp dans `onDrag` (`App.vue`), bornes = taille mesurée de `.windows` via une ref de template, `MIN_VISIBLE = 40` px toujours visibles. La barre des tâches reste devant les fenêtres (contexte d'empilement sur `.windows`, z-index 1 contre 2 pour la barre).
- Fait : build de prod réparé avec `build.cssMinify: false` (lightningcss refusait `progress:not([value]):before:not([value])` dans `xp.css`). Alternative plus tard : `'esbuild'`, à installer.
- Fait : cascade (`CASCADE_OFFSET = 25`, calculée avec `windows.length` avant le `push`). `getApp(id)` exportée par `apps.js`, seule source pour retrouver une app (titre, icône, futur composant) : le store ne copie pas `name`. Nettoyage : `toggle`, imports, `console.log`.
- Reporté : `div` → `button` dans la barre des tâches (`xp.css` impose `button:not(:disabled).active`, qui écraserait notre classe `.active` : il faut d'abord travailler le CSS).
- Fait : boutons de titre ignorés dans `startDrag` (`event.target.closest('button')`), `focusWindow` toujours déclenché.
- Fait : 4 apps (`about`, `projets`, `cv`, `contact`) branchées via `component` dans `apps.js` + `<component :is>` dans `App.vue`, composants dans `src/components/apps/`, icônes XP (User Accounts, My Documents, Generic Text Document, Outlook Express). Chaque app doit avoir un `component` (pas de repli).
- Fait : CV (zoom, téléchargement, encore le faux CV `resumeMitchIvin`), Projets façon Explorateur XP (`src/data/projects.js`, un seul projet : Tanafit), Contact via Formspree (retour d'envoi dans la barre d'état, verrou `sending`, « Nouveau message » vide le formulaire, lien LinkedIn en dur dans `ContactApp.vue`).
- Fait : About alimenté par `src/data/about.js` (textes, liens, compétences, outils, `photo: null` = icône XP), même principe que `projects.js` : le contenu se modifie dans `src/data/`, pas dans les composants.
- Fait : menu Démarrer (`StartMenu.vue`, contenu lu dans `apps.js` et `about.js`, fermeture au clic extérieur via `.start-area` + `contains()`, « Tout fermer » = `closeAllWindows` du store). Noms des apps dans la barre des tâches (masqués sous 560 px).
- Décidé : commentaires qui disent *pourquoi*, pas *ce que fait le langage*. Pas de bouton mort : un bouton est branché ou `disabled`.
- Fait : README (aperçu dans `docs/apercu.jpg`), `index.html` (titre, `lang="fr"`, description), `.claude/` sorti du dépôt (ignoré par git), 477 icônes inutilisées retirées de `public/icons` (24 gardées).
- Décidé : pas de lien vers l'appli Tanafit (`link: null` dans `projects.js`) tant qu'elle n'a pas de login.
- Fait : favicon (`public/favicon.png`, icône User Accounts réduite en 48 px ; l'ancien `favicon.ico` de Vue retiré). Boutons Rechercher et Dossiers retirés de Projets, avec leurs icônes ; « Dossier parent » était déjà branché. Site déjà en ligne.
- Fait (à tester sur vrai téléphone) : mobile. `isTouch()` dans `src/utils/touch.js` (`pointer: coarse`) : tap simple ouvre l'app (`Icon.vue`), fenêtres ouvertes agrandies (`openWindow`). Drag et focus passés aux pointer events (`pointerdown/move/up/cancel`), `@mousedown.prevent` remplacé par `user-select: none` + `touch-action: none` sur `.title-bar`.
- Ouvert, par priorité : tester le mobile ; boutons de titre plus gros au doigt ; 2-3 projets + photo ; horloge.
- Dette : `AppWindow.vue` à sortir de `App.vue`, barre d'outils copiée dans 4 apps, `windows.value.find` répété dans le store, nommage incohérent (`taskbar.vue`, classes `.CV`/`.Contact`/`.ProjetApp`), `div` → `button` dans la barre.
