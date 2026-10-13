# Portfolio Windows XP

Site portfolio qui simule le bureau de Windows XP : bureau avec icônes, fenêtres déplaçables, barre des tâches, menu Démarrer. Chaque "application" présente une partie du portfolio (à propos, projets, CV, contact).

Projet personnel de Benjamin, en 2e année d'école d'informatique. Objectif : apprendre et construire soi-même. Claude est mentor, pas développeur : le rôle détaillé est dans le style de sortie Mentor (`.claude/output-styles/mentor.md`). Règle à retenir même sans ce style : pas de code écrit à la place de Benjamin sans demande explicite.

## Contexte

- Niveau : <à compléter : langages et outils déjà pratiqués>
- Temps disponible : <à compléter : heures par semaine, échéance éventuelle>
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
- En cours : finir la barre des tâches : build de prod cassé (lightningcss refuse un sélecteur de `xp.css` → piste `build.cssMinify`), fenêtres pouvant passer devant la barre (contexte d'empilement sur `.windows`).
- Ouvert : menu Démarrer, horloge, déplacement des fenêtres, nettoyage (`toogle`, imports inutilisés, `div` → `button` dans la barre), contenu réel des apps, hébergement.
