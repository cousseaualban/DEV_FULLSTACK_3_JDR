# Modèle Physique de Données (MPD)

---

## 1. Entité CAMPAGNE

| Champ        | Type    | Description                                        |
| :----------- | :------ | :------------------------------------------------- |
| id           | string  | Identifiant unique de la campagne                  |
| nom          | string  | Nom affiché de la campagne                          |
| description  | string  | Description publique de la campagne                  |
| commentaire_MJ | string | Commentaire visible uniquement par le MJ            |
| active       | boolean | Indique si la campagne est active pour la session | 

## 2. Entité CHAPITRE

| Champ            | Type           | Description                                               |
| :--------------- | :------------- | :-------------------------------------------------------- |
| id               | string         | Identifiant unique du chapitre                            |
| campagne_id      | string         | Référence de la campagne parente                          |
| nom              | string         | Nom du chapitre                                            |
| statut           | enum           | Valeur possible : `inactif`, `actif`, `termine`           |
| description      | string         | Description du chapitre                                    |
| commentaire_MJ   | string         | Commentaire réservé au MJ                                  |
| mdp_activation  | string/null    | Mot de passe requis pour activer le chapitre              |
| objets_necessaires | array<string> | Objets requis pour activer le chapitre                  |
| mdp_resolution  | string/null    | Mot de passe requis pour résoudre le chapitre             |
| recompenses_objets | array<string> | Identifiants des objets reçus à la résolution          |
| recompenses_indices | array<string> | Identifiants des indices reçus à la résolution        |

## 3. Entité QUETE

| Champ            | Type           | Description                                               |
| :--------------- | :------------- | :-------------------------------------------------------- |
| id               | string         | Identifiant unique de la quête                            |
| chapitre_id      | string         | Référence du chapitre parent                              |
| lieu_id          | string         | Référence du lieu associé à la quête                      |
| nom              | string         | Nom de la quête                                            |
| statut           | enum           | Valeur possible : `inactive`, `active`, `terminee`, `abandonnee` |
| description      | string         | Description de la quête                                    |
| commentaire_MJ   | string         | Commentaire réservé au MJ                                  |
| mdp_activation   | string/null    | Mot de passe requis pour activer la quête                 |
| mdp_resolution   | string/null    | Mot de passe requis pour résoudre la quête                |
| recompenses_objets | array<string> | Identifiants des objets reçus à la résolution          |
| recompenses_indices | array<string> | Identifiants des indices reçus à la résolution        |

## 4. Entité JOUEUR

| Champ            | Type           | Description                                               |
| :--------------- | :------------- | :-------------------------------------------------------- |
| id               | string         | Identifiant unique du joueur                              |
| campagne_id      | string         | Référence de la campagne parente                          |
| nom              | string         | Nom du joueur                                              |
| statut           | enum           | Valeur possible : `vivant`, `mort`                        |
| description      | string         | Description du joueur                                      |
| commentaire_MJ   | string         | Commentaire réservé au MJ                                  |
| lieu_id          | string/null    | Identifiant du lieu où le joueur se trouve                |
| inventaire_objets | array<string> | Identifiants des objets possédés par le joueur           |
| inventaire_indices | array<string> | Identifiants des indices reçus par le joueur             |

## 5. Entité LIEU

| Champ            | Type           | Description                                               |
| :--------------- | :------------- | :-------------------------------------------------------- |
| id               | string         | Identifiant unique du lieu                                |
| campagne_id      | string         | Référence de la campagne parente                          |
| nom              | string         | Nom du lieu                                                |
| description      | string         | Description du lieu                                        |
| commentaire_MJ   | string         | Commentaire réservé au MJ                                  |

## 6. Entité OBJET

| Champ            | Type           | Description                                               |
| :--------------- | :------------- | :-------------------------------------------------------- |
| id               | string         | Identifiant unique de l’objet                              |
| campagne_id      | string         | Référence de la campagne parente                          |
| nom              | string         | Nom de l’objet                                             |
| description      | string         | Description de l’objet                                     |
| commentaire_MJ   | string         | Commentaire réservé au MJ                                  |

## 7. Entité INDICE

| Champ            | Type           | Description                                               |
| :--------------- | :------------- | :-------------------------------------------------------- |
| id               | string         | Identifiant unique de l’indice                             |
| campagne_id      | string         | Référence de la campagne parente                          |
| nom              | string         | Nom de l’indice                                            |
| texte            | string         | Texte complet de l’indice                                  |
| commentaire_MJ   | string         | Commentaire réservé au MJ                                  |

---

## Relations principales

| Entité source | Relation          | Entité cible |
| :------------ | :---------------- | :----------- |
| CAMPAGNE      | contient          | CHAPITRE     |
| CAMPAGNE      | contient          | JOUEUR       |
| CAMPAGNE      | référence         | LIEU         |
| CAMPAGNE      | référence         | OBJET        |
| CAMPAGNE      | référence         | INDICE       |
| CHAPITRE      | contient          | QUETE        |
| QUETE         | se déroule dans   | LIEU         |
| JOUEUR        | possède           | OBJET        |
| JOUEUR        | reçoit            | INDICE       |

## Règles de cohérence métier

- Une campagne contient plusieurs chapitres.
- Un chapitre contient plusieurs quêtes.
- Une quête appartient à un unique chapitre.
- Un joueur appartient à une unique campagne.
- Un lieu est un contenu réutilisable lié à une campagne.
- Un objet ou un indice peut être attribué à un joueur ou remis comme récompense de chapitre / quête.
- Les identifiants (`id`) doivent être uniques dans chaque type d’entité.
- Les champs `commentaire_MJ` doivent rester réservés à l’interface d’édition du MJ.

