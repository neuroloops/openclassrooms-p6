# So pekocko

[TOC]

## TODO

- [x] Serveur node
- [x] mongooose
- [x] POST api/auth/signup
- [x] POST /api/auth/login
- [x] GET /api/sauces
- [x] GET /api/sauces/:id
- [x] POST /api/sauces
- [ ] PUT /api/sauces/:id
- [ ] DELETE /api/sauces/:id
- [ ] POST /api/sauces/:id/like
- [ ] fonction like /dislike
- [ ] fonction dislike POST
- [ ] ajouter userID dans les sauce crée

## infos

### front end

- run front with `ng serve`
- adddress : `http://localhost:4200/login`

### backend

- run `npm start`
- address port 3000.

## route

POST api/auth/signup

> Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données

POST /api/auth/login

> Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé (contenant également l'identifiant userID)

GET /api/sauces

> Renvoie le tableau de toutes les sauces dans la base de données

GET /api/sauces/:id

> Renvoie la sauce avec l'ID fourni

POST /api/sauces

> Capture et enregistre l'image, analyse la sauce en utilisant une chaîne de caractères et l'enregistre dans la base de données, en définissant correctement son image URL. Remet les sauces aimées et celles détestées à 0, et les sauces usersliked et celles usersdisliked aux tableaux vides.

PUT /api/sauces/:id

> Met à jour la sauce avec l'identifiant fourni. Si une image est téléchargée, capturez-la et mettez à jour l'image URL des sauces. Si aucun fichier n'est fourni, les détails de la sauce figurent directement dans le corps de la demande (req.body.name, req.body.heat etc). Si un fichier est fourni, la sauce avec chaîne est en req.body.sauce.

DELETE /api/sauces/:id

> Supprime la sauce avec l'ID fourni.

POST /api/sauces/:id/like

> Définit le statut "j'aime" pour userID fourni. Si j'aime = 1, l'utilisateur aime la sauce. Si j'aime = 0, l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas. Si j'aime =-1, l'utilisateur n'aime pas la sauce. L'identifiant de l'utilisateur doit être ajouté ou supprimé du tableau approprié, en gardant une trace de ses préférences et en l'empêchant d'aimer ou de ne pas aimer la même sauce plusieurs fois. Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour avec chaque "j'aime"

### details

| route                     |                   Corps de la demande                    | Type de réponse attendue |
| :------------------------ | :------------------------------------------------------: | :----------------------: |
| POST /api/auth/signup     |          `{ email: string, password: string }`           |  `{ message: string }`   |
| POST /api/auth/login      |          `{ email: string, password: string }`           |                          |
| GET /api/sauces           |                           `-`                            |    Tableau de sauces     |
| GET /api/sauces/:id       |                           `-`                            |      `Sauce unique`      |
| POST /api/sauces          |            `{ sauce: Chaîne, image:Fichier}`             |   `{message: Chaîne}`    |
| PUT /api/sauces/:id       | `Sauce comme JSON` ou `{ sauce: Chaîne, image: Fichier}` |   `{message: Chaîne}`    |
| DELETE /api/sauces/:id    |                           `-`                            |  `{message : Chaîne }`   |
| POST /api/sauces/:id/like |          `{ userId: Chaîne, j'aime : Nombre }`           |  `{ message: Chaîne }`   |

## Exigences concernant la sécurité

- l’API doit respecter le RGPD et les standards OWASP ;
- le mot de passe des utilisateurs doit être chiffré ;
- 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données ;
- la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine ;
- l’authentification est renforcée sur les routes requises ;
- les mots de passe sont stockés de manière sécurisée ;
- les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

## Erreurs API

Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur().

## Routes API

Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Porteur <token>").

## Modèle de données

### Sauce

Le modèle de données pour une sauce est le suivant:

- id: ObjectID — identifiant unique créé par MongoDB ;
- userID: string — identifiant unique MongoDB pour l'utilisateur qui a créé la sauce ;
- name: string — nom de la sauce ;
- manufacturer: string — fabricant de la sauce ;
- description: string — description de la sauce ;
- mainingredient: string — principal ingrédient dans la sauce ;
- imageUrl: string — string de l'image de la sauce téléchargée par l'utilisateur ;
- heat: number — nombre entre 1 et 10 décrivant la sauce ;
- likes: number — nombre d'utilisateurs qui aiment la sauce ;
- dislikes: number — nombre d'utilisateurs qui n'aiment pas la sauce ;
- usersliked: [string] — tableau d'identifiants d'utilisateurs ayant aimé la sauce ;
- usersdisliked: [string] — tableau d'identifiants d'utilisateurs n'ayant pas aimé

### Utilisateur

Le modèle de données pour un utilisateur est le suivant :

- userId: ​ string ​ — identifiant unique MongoDB pour l'utilisateur qui a créé la sauce ;
- e-mail: ​ string ​ — adresse électronique de l'utilisateur [unique] ;
- password: ​ string ​ — hachage du mot de passe de l'utilisateur.

## Technologies à utiliser

- framework : Express ;
- serveur : NodeJS ;
- base de données : MongoDB ;
- toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts
