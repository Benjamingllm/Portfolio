# Feuille de route du portfolio XP

Budget : environ 30 h sur deux semaines (échéance vers le 2026-10-20).
Stack : HTML, CSS, JavaScript sans framework, modules JS natifs, [XP.css](https://botoxparty.github.io/XP.css/) pour le style, Live Server en local, GitHub Pages en ligne.

## v1 : pour l'échéance (30 h)

| # | Étape | Ce que ça couvre | Estimation |
|---|-------|------------------|-----------|
| 3 | Fenêtre générique | Ouvrir, fermer, déplacer à la souris, passer au premier plan au clic | 8 h |
| 4 | Barre des tâches | Bouton Démarrer, un bouton par fenêtre ouverte, réduire et restaurer, horloge | 4 h |
| 5 | Menu Démarrer | Liste des applications, ouverture au clic | 2 h |
| 6 | Contenus | À propos, Projets, CV (PDF affiché et téléchargeable), Contact (mail, LinkedIn, GitHub) | 6 h |
| 7 | Mobile | Sous une certaine largeur, fenêtres en plein écran et pas de déplacement | 2 h |
| 8 | Marge | Bugs, finitions, relecture des textes | 4 h |

L'étape 3 est le cœur du projet et la plus difficile : toutes les applications reposent dessus. Une fenêtre qui marche bien vaut mieux que cinq applications.

Les textes de l'étape 6 (descriptions de projets, CV en PDF) se préparent en dehors du code, au fil des deux semaines : c'est la partie la plus souvent sous-estimée.

## Jalons

- **Fin de semaine 1 :** étapes 1 à 3. Le site est en ligne et une fenêtre s'ouvre, se déplace et se ferme.
- **Fin de semaine 2 :** étapes 4 à 8. Le site est complet, testé sur téléphone, et le lien est prêt à mettre sur le CV.

Si la semaine 1 déborde, on coupe d'abord le menu Démarrer (étape 5) : les icônes du bureau suffisent pour ouvrir les applications.

## Hors v1

À faire seulement s'il reste du temps :

- Agrandir une fenêtre en plein écran (1-2 h).
- Redimensionner une fenêtre en tirant sur le bord (3-4 h).
- Écran de démarrage ou de connexion façon XP (2 h).
- Sons système (1 h).

## v2 : après l'échéance

- Réécriture en React (avec Vite), en gardant le même périmètre. Objectif : comparer avec la version faite à la main et pouvoir l'expliquer en entretien.

## Plus tard

- Jeux : Démineur (6-10 h à lui seul), Paint.
- Explorateur de fichiers pour parcourir les projets.
