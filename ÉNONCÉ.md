# Projet final

## Table des matières

I. Contexte p. 1  
A. Sujet p. 1  
B. Qu’est-ce qu’un jeu de rôle (JDR) ? p. 1  
II. Éléments d'une campagne p. 2  
A. Les campagnes p. 2  
B. Les chapitres p. 2  
C. Les quêtes p. 3  
D. Les joueurs p. 3  
E. Contenus réutilisables p. 3  
III. Interfaces p. 5  
A. Concept p. 5  
B. Interface d'édition (MJ) p. 5  
C. Interface de lecture (Joueur) p. 6  
IV. Contraintes de réalisation p. 8  
A. Techniques p. 8  
B. Graphique p. 8  
C. Stockage p. 8  
D. Fonctionnalités bonus p. 8  
V. Modalités p. 9  
A. Le rendu du projet p. 9  
B. Bonus potentiels p. 9  
C. Malus potentiels p. 9

## I. Contexte

### A. Sujet

Vous devez réaliser une application destinée au suivi de campagne de jeu de rôle.

Cette application doit permettre de :

- structurer une campagne en chapitres et quêtes,
- gérer des bibliothèques de contenu réutilisable (lieux, objets, indices),
- relier les éléments entre eux (relations entre quêtes et contenus),
- proposer un mode édition (pour le maître du jeu) et un mode lecture (pour les joueurs),
- représenter interactivement l'état de la campagne (emplacement des joueurs, inventaire, etc.),
- importer et exporter des campagnes, sans backend.

### B. Qu’est-ce qu’un jeu de rôle (JDR) ?

Un jeu de rôle est une activité collaborative de narration.

Un groupe de personnes se réunit pour vivre une histoire fictive : chaque participant incarne un personnage, tandis qu’une personne appelée le maître du jeu (MJ) décrit l’univers, les situations et les évènements.

Le MJ prépare une campagne, c’est-à-dire un ensemble structuré d’histoires appelées quêtes. Ces quêtes se déroulent dans des lieux, peuvent impliquer des personnages non-joueurs (PNJ), peuvent donner lieu à la découverte d’objets ou d’indices, et évoluent selon les décisions prises par les joueurs.

Un JDR repose donc sur :

- une organisation claire de l’information,
- des relations entre de nombreux éléments (quêtes, personnages, lieux…),
- et une distinction entre les informations connues des joueurs et celles réservées au MJ.

L’objectif de ce projet est de concevoir une application permettant d’organiser et de suivre efficacement cette complexité.

*Page : 1*

## II. Éléments d'une campagne

### A. Les campagnes

Une campagne correspond à une « partie » de jeu de rôle.

Une campagne contient les informations suivantes :

- Un nom
- Un état : brouillon, disponible, active
- Une description
- Un commentaire, visible uniquement en interface édition (MJ)
- La liste des joueurs
- La liste des chapitres associés

### B. Les chapitres

Un chapitre peut contenir une ou plusieurs quêtes. Par défaut inactif, il peut être activé lors de la partie.

L'activation d'un chapitre est faite par un joueur, en fournissant un mot de passe (fourni par le MJ ou deviné). Il pourra également être nécessaire au joueur de disposer d'un ou plusieurs objet(s) spécifique(s).

La résolution d'un chapitre est également faite par un joueur, via mot de passe fourni par le MJ ou deviné ; une récompense (sous forme d'objet(s) et/ou d'indice(s)) pourra, ou non, être fournie à la résolution de celui-ci.

Un chapitre contient les informations suivantes :

- Un nom
- Un état : inactif, actif, terminé
- Une description
- Un commentaire, visible uniquement en interface édition (MJ)
- Mot de passe d'activation
- Objets nécessaires à l'activation (facultatif)
- Mot de passe de résolution
- Récompense(s) à la résolution (facultatif)
- La liste des quêtes associées

*Page : 2*

### C. Les quêtes

Une quête appartient à un unique chapitre. Par défaut active, elle peut être configurée pour nécessiter qu'un joueur fournisse un mot de passe pour son activation.

La résolution d'une quête est faite par un joueur positionné dans le lieu de la quête, via mot de passe fourni par le MJ ou deviné ; une récompense (sous forme d'objet(s) et/ou d'indice(s)) pourra, ou non, être fournie à la résolution de celui-ci.

Une quête contient les informations suivantes :

- Un nom
- Un état : inactive, active, terminée, abandonnée
- Une description
- Un lieu
- Un commentaire, visible uniquement en interface édition (MJ)
- Mot de passe d'activation (facultatif)
- Mot de passe de résolution
- Récompense(s) à la résolution (facultatif)

### D. Les joueurs

Un joueur représente une personne active sur la campagne.

Un joueur contient les informations suivantes :

- Un nom
- Un état : vivant, mort
- Un commentaire, visible uniquement en interface édition (MJ)
- Une description
- Un inventaire

### E. Contenus réutilisables

#### Lieux

Un lieu représente un emplacement accessible au joueur, utilisé pour les quêtes.

Un lieu contient les informations suivantes :

- Un nom
- Une description
- Un commentaire, visible uniquement en interface édition (MJ)

*Page : 3*

#### Objets

Un objet représente une entité fournie à un joueur spécifique, soit à la résolution d'une quête, soit à la résolution d'un chapitre.

Un objet contient les informations suivantes :

- Un nom
- Une description
- Un commentaire, visible uniquement en interface édition (MJ)

#### Indices

Un indice représente une information fournie à l'ensemble des joueurs, soit à la résolution d'une quête, soit à la résolution d'un chapitre.

Un indice contient les informations suivantes :

- Un nom
- Le texte de l'indice
- Un commentaire, visible uniquement en interface édition (MJ)

*Page : 4*

## III. Interfaces

### A. Concept

L'application aura deux interfaces (avec plusieurs vues/pages/zones pour chacune) : édition pour le MJ et lecture pour les joueurs. Le passage de l'une à l'autre se fera avec un bouton sur l'interface.

### B. Interface d'édition (MJ)

L'interface du MJ permettra de choisir la campagne à lancer, de configurer les campagnes, de contrôler la campagne active et d'importer ou exporter des campagnes.

#### Contrôle du jeu

La partie contrôle affiche la liste des campagnes dans l'application et permet au MJ de choisir laquelle activer.

#### Contrôle des campagnes

La zone de configuration des campagnes permet au MJ de :

- Créer une campagne
- Définir une campagne comme active
- Modifier une campagne
- Réorganiser les chapitres
- Dupliquer une campagne
- Supprimer une campagne
- Exporter une campagne sous forme d'un fichier JSON avec l'extension `.cplc.json`
- Importer une campagne depuis un fichier JSON avec l'extension `.cplc.json`

#### Contrôle des chapitres

La zone de configuration des chapitres permet au MJ de :

- Créer un chapitre
- Modifier un chapitre
- Dupliquer un chapitre
- Supprimer un chapitre
- Réorganiser les quêtes

#### Contrôle des quêtes

La zone de configuration des quêtes permet au MJ de :

- Créer une quête
- Modifier une quête
- Dupliquer une quête
- Supprimer une quête
- Déplacer une quête dans un autre chapitre

*Page : 5*

#### Contrôle des joueurs

La zone de configuration des joueurs permet au MJ de :

- Créer un joueur
- Modifier un joueur
- Dupliquer un joueur
- Supprimer un joueur

#### Contrôle des contenus

La zone de configuration des contenus (lieux, indices, objets) permet au MJ de :

- Créer un contenu
- Modifier un contenu
- Dupliquer un contenu
- Supprimer un contenu

#### Contrôle de la campagne active

La zone de configuration de la campagne active permet au MJ de :

- Changer manuellement l'état d'un chapitre
- Changer manuellement l'état d'une quête
- Changer manuellement l'état d'un joueur
- Déplacer manuellement un joueur dans un lieu
- Donner ou reprendre un objet à un joueur
- Donner ou reprendre un indice à l'ensemble des joueurs

### C. Interface de lecture (Joueur)

L'interface Joueur permet de suivre l'avancement de la campagne et d'interagir avec les quêtes.

#### Progression globale

La zone d'affichage de la progression globale permet de voir la liste des chapitres / quêtes terminés, le chapitre actif, la ou les quête(s) active(s). Il faudra prévoir la possibilité de voir le détail de chacun de ces éléments (description de la quête, récompense reçue lors de la complétion du chapitre, etc.).

*Page : 6*

Une zone de recherche permettra de retrouver les chapitres et/ou quêtes dont le titre contient la recherche.

Une zone de filtre permettra de retrouver les quêtes par statut.

#### Choix du joueur

Une zone de sélection du joueur permet de sélectionner l'un des joueurs de la campagne pour pouvoir accéder à son état et ses actions.

#### Inventaire spécifique du joueur

La zone d'affichage de l'inventaire permet de retrouver la liste des objets et des indices reçus. Il faudra prévoir la possibilité de voir le détail de chacun de ces éléments (description de l'objet, texte de l'indice, etc.).

Une zone de recherche permettra de retrouver un élément de son inventaire dont le nom ou la description contient la recherche.

#### Actions spécifiques du joueur

Une zone d'actions devra permettre à un joueur :

- de se déplacer dans un lieu,
- de demander l'activation ou la complétion d'un chapitre, en fournissant le mot de passe,
- de demander l'activation ou la complétion d'une quête dans le lieu dans lequel il se trouve, en fournissant le mot de passe.

*Page : 7*

## IV. Contraintes de réalisation

### A. Techniques

Le projet devra être pur front et réalisé avec Vue.js ; les bibliothèques Vue-Router et Pinia devront également être utilisées.

### B. Graphique

L'application devra être un minimum stylisée ; s'il n'est pas nécessaire de penser une charte graphique complète, un minimum de design sera requis afin de rendre son utilisation agréable.

### C. Stockage

Les données devront être stockées dans le navigateur de manière (pseudo-)persistante. L'application devra donc utiliser le localStorage ou IndexedDB.

### D. Fonctionnalités bonus

Le projet peut se développer bien au-delà des fonctionnalités listées. Ajouter des fonctionnalités supplémentaires peut apporter des points bonus.

Les fonctionnalités bonus sont libres ; quelques exemples de fonctionnalités :

- Interface 100% responsive
- Timeline ou vue graphe des quêtes
- Génération aléatoire d'objets / lieux
- Export chiffré par mot de passe

*Page : 8*

## V. Modalités

Les modalités de ce projet sont les suivantes :

- Ce projet devra être réalisé en groupe de 3 à 4 personnes
- Votre rendu devra être effectué dans une archive ZIP envoyée par NetYparéo, nous vous conseillons donc une taille inférieure à 25Mo (voir livrables).
- Le projet doit être « pur front », son fonctionnement ne doit donc pas reposer sur l'utilisation d'un serveur.
- Mis à part ceux explicitement interdits, vous êtes autorisés à installer des packages, tant qu'ils ne permettent pas de résoudre une fonctionnalité.

### A. Le rendu du projet

Le projet doit être rendu avant la date limite sur NetYparéo.

Le projet devra inclure un fichier README.md contenant la liste des membres du groupe, les fonctionnalités bonus réalisées, ainsi que toute information nécessaire à la mise en place du projet.

Attention à la taille de votre rendu ; un rendu trop volumineux, au-delà de 25Mo, pourra être sanctionné.

### B. Bonus potentiels

L'ajout de fonctionnalités supplémentaires ou un travail particulièrement qualitatif sur un élément du projet peut donner droit à des points supplémentaires.

### C. Malus potentiels

Des malus pourront être appliqués :

- En cas de copier/coller trop important d'une source, que ce soit internet, un autre groupe ou une IA générative
- En cas de copier/coller non sourcé dans un commentaire
- Retard d'envoi du projet
- Hors sujet

*Page : 9*

contact@ls-a.fr  
https://www.ls-a.fr
