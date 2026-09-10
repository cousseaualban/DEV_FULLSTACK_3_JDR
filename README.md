CAHIER DES CHARGES -- Répartition des tâches

Personne 1 — Modèle de données, stockage et import/export
Responsable du cœur métier du projet. => ALBAN

Tâches :

Définir les structures de données :
campagne,
chapitre,
quête,
joueur,
lieu,
objet,
indice.
Mettre en place les relations entre ces éléments.
Créer le store Pinia ou la logique de données centralisée.
Gérer la persistance navigateur avec localStorage ou IndexedDB.
Implémenter l’import/export des campagnes au format .cplc.json.
Livrables :

schéma de données cohérent,
données persistantes,
fichier JSON import/export fonctionnel.

------------------------------------------------------------------------------

Personne 2 — Interface MJ : édition et administration
Responsable de la zone de gestion du maître du jeu. => SAM

Tâches :

Construire l’interface d’édition MJ.
Créer les vues et formulaires pour :
campagnes,
chapitres,
quêtes,
joueurs,
contenus réutilisables.
Gérer la création, modification, duplication, suppression.
Gérer l’état d’une campagne active.
Permettre la réorganisation des chapitres et des quêtes.
Mettre en place la partie “contrôle de la campagne active” :
changer l’état d’un chapitre,
d’une quête,
d’un joueur,
donner/reprendre objets et indices.
Livrables :

formulaire de campagne,
formulaire de chapitre,
formulaire de quête,
gestion des joueurs et contenus.

------------------------------------------------------------------------------

Personne 3 — Interface joueur : lecture, progression et actions
Responsable de l’expérience du joueur. => NGUYEN

Tâches :

Construire l’interface lecture côté joueur.
Afficher la progression globale :
chapitres actifs/terminés,
quêtes actives/terminées,
détails des éléments.
Implémenter la recherche et le filtre.
Gérer la sélection du joueur courant.
Afficher l’inventaire spécifique du joueur.
Gérer les actions du joueur :
déplacement dans un lieu,
activation / résolution d’un chapitre,
activation / résolution d’une quête avec mot de passe.
Livrables :

vue progression,
vue inventaire,
vue actions joueur,
navigation entre lieux et pages.

------------------------------------------------------------------------------

Personne 4 — UI globale, routing, design et bonus
Responsable de la cohérence visuelle et des points bonus. => ILEF

Tâches :

Définir la structure générale de l’application.
Mettre en place les routes Vue Router entre :
interface MJ,
interface joueur,
vues de sélection / lecture / édition.
Créer la charte graphique minimale :
thème visuel,
composants réutilisables,
CSS global.
S’occuper du design responsive.
Ajouter un bonus éventuel :
timeline des quêtes,
vue graphe,
import/export chiffré,
génération d’objets ou lieux.
Livrables :

structure de navigation,
CSS global,
interface élégante et cohérente,
bonus éventuels.