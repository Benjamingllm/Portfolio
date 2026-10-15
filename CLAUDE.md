# Portfolio Windows XP

Site portfolio qui simule le bureau de Windows XP : bureau avec icônes, fenêtres déplaçables, barre des tâches, menu Démarrer. Chaque "application" présente une partie du portfolio (à propos, projets, CV, contact).

Projet personnel de Benjamin, en 2e année d'école d'informatique. Objectif : apprendre et construire soi-même. Claude est mentor, pas développeur : le rôle détaillé est dans le style de sortie Mentor (`.claude/output-styles/mentor.md`). Règle à retenir même sans ce style : pas de code écrit à la place de Benjamin sans demande explicite.

## Contexte

- Niveau : <à compléter : langages et outils déjà pratiqués>
- Temps disponible : échéance dimanche 18/10/2026. Jeudi 15 soir 2 h, vendredi 16 5 h, samedi 17 2-3 h.
- Machine : <à compléter : OS, éditeur, Claude Code en terminal / VS Code / appli>

## Stack

Vue 3 (`<script setup>`) + Vite, Pinia pour l'état, `xp.css` pour le style des fenêtres.
`xp.css` ne fournit ni barre des tâches, ni menu Démarrer, ni barre de titre inactive : ce CSS est à écrire à la main.

## Commandes

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run preview` — sert le build
- Pas de tests ni de lint pour l'instant.

## État du projet

Mis à jour à la fin de chaque échange qui tranche quelque chose (2-3 lignes).

- Décidé : empilement des fenêtres par `zIndex` explicite (+ compteur `topZ`), appliqué via `:style` sur des fenêtres en `position: absolute`. Store : `{ id, minimized, zIndex }` + `activeId`. Focus au `mousedown` sur la fenêtre (comportement XP, évite le conflit de bubbling avec les boutons de la barre de titre, base du futur drag). `activeId` remis à `null` quand on réduit/ferme (pas de réactivation auto). État actif de la barre des tâches via `:class`. Layout en flex colonne.
- Décidé : drag par la barre de titre (offset calculé au `mousedown`, écouteurs `mousemove`/`mouseup` sur `document`), positions `x`/`y` dans le store via `moveWindow`.
- Fait : agrandir/restaurer (`maximized` dans le store, `maximizeWindow` bascule, classe `.maximized`, drag désactivé quand agrandie).
- Fait (à tester dans le navigateur) : clamp dans `onDrag` (`App.vue`), bornes = taille mesurée de `.windows` via une ref de template, `MIN_VISIBLE = 40` px toujours visibles. La barre des tâches reste devant les fenêtres (contexte d'empilement sur `.windows`, z-index 1 contre 2 pour la barre).
- Fait : build de prod réparé avec `build.cssMinify: false` (lightningcss refusait `progress:not([value]):before:not([value])` dans `xp.css`). Alternative plus tard : `'esbuild'`, à installer.
- Fait : cascade (`CASCADE_OFFSET = 25`, calculée avec `windows.length` avant le `push`). `getApp(id)` exportée par `apps.js`, seule source pour retrouver une app (titre, icône, futur composant) : le store ne copie pas `name`. Nettoyage : `toggle`, imports, `console.log`.
- Reporté : `div` → `button` dans la barre des tâches (`xp.css` impose `button:not(:disabled).active`, qui écraserait notre classe `.active` : il faut d'abord travailler le CSS).
- Reporté : `mousedown` des boutons de titre qui déclenche `startDrag` (la fenêtre suit la souris pendant l'appui, impossible d'annuler un clic). Correctif prévu : ignorer les boutons dans `startDrag` (`event.target.closest`), plutôt que `.stop`, qui empêcherait aussi `focusWindow`.
- Plan jusqu'à dimanche : jeudi = build, boutons de titre, cascade, nettoyage, titre de fenêtre. Vendredi = apps via `<component :is>`, contenu des 4 apps, mise en ligne, horloge. Samedi = menu Démarrer simplifié + tests + correctifs. Le menu Démarrer est la seule tâche qu'on coupe en cas de retard.
- Ouvert : menu Démarrer, horloge, composable `useDrag` (plus tard), nettoyage (`toogle`, imports inutilisés, `div` → `button` dans la barre), contenu réel des apps, hébergement.
