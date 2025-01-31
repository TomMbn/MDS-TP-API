API REST - Boutique info

Ce projet consiste en la mise en place d'une API RESTful qui permet la gestion des produits, des utilisateurs, et leur authentification avec un système basé sur JSON Web Token (JWT). L'API est construite avec Express.js, Sequelize pour l'ORM et une base de données SQL Server. Elle est également documentée avec Swagger.

Fonctionnalités
1. Swagger / Documentation (3pts)

L'API est entièrement documentée avec Swagger pour offrir une interface interactive et permettre à l'utilisateur de tester les différentes routes de manière facile et efficace. La documentation couvre toutes les fonctionnalités disponibles dans l'API, y compris :

Création, mise à jour, suppression et récupération des produits.
Gestion des utilisateurs avec différents rôles (admin, commercial, fournisseur).
Authentification via JWT pour sécuriser les routes sensibles.
Accédez à la documentation Swagger en vous rendant sur :
http://tom.mauboussin.angers.mds-project.fr:8080/api-docs/

2. Connexion à la Base de Données (1pt)

L'API se connecte à une base de données SQL Server grâce à la bibliothèque Sequelize. Cette connexion est gérée via le fichier de configuration de la base de données. Vous pouvez retrouver les informations de connexion dans le fichier .env pour la personnalisation de votre environnement local.

3. ORM (Sequelize) (3pts)

Nous utilisons Sequelize comme ORM (Object Relational Mapping) pour interagir avec la base de données. Les modèles pour les produits et utilisateurs sont définis avec Sequelize et leurs relations sont gérées de manière simplifiée.

4. API REST (4pts)

L'API suit les principes du REST en utilisant les méthodes HTTP standards :

GET pour récupérer des données (ex. /products pour obtenir tous les produits).
POST pour créer de nouvelles ressources (ex. /products pour créer un produit).
PUT pour mettre à jour une ressource existante (ex. /products/{id} pour mettre à jour un produit).
DELETE pour supprimer une ressource (ex. /products/{id} pour supprimer un produit).

5. Support JSON / XML - Header Request (1pt)

L'API supporte JSON par défaut pour les échanges de données via les requêtes et réponses. Le type de contenu est spécifié dans les en-têtes de chaque requête avec le header Content-Type: application/json.

6. Authentification JWT (3pts)

L'API utilise JSON Web Tokens (JWT) pour sécuriser les routes sensibles et vérifier l'authentification des utilisateurs. Lors de la connexion, l'utilisateur reçoit un token JWT qu'il doit inclure dans les en-têtes de ses futures requêtes.
Les rôles d'utilisateur sont inclus dans le JWT et permettent de contrôler l'accès aux différentes routes (par exemple, certaines routes sont réservées aux admins uniquement).

7. Mise en Production avec P2M et SQLServer (4pts)

Le projet est configuré pour être déployé sur un serveur de production. Nous utilisons PM2 pour faciliter la gestion du déploiement et de la mise en production.

La base de données SQL Server est configurée pour la production et les informations de connexion sont sécurisées via un fichier .env.

8. Tests Unitaires et Tests de Charge (3pts)

Pas fait

9. Postman + Collections + Token (4pts)

La collection Postman est fournie pour faciliter le test de l'API. Elle contient toutes les routes de l'API et permet de tester l'authentification via le token JWT. Vous pouvez facilement exécuter des tests de toutes les fonctionnalités de l'API à l'aide de la collection Postman, et elle inclut des exemples de requêtes avec les tokens JWT.

10. Architecture & Qualité du Code (4pts)

Le projet suit une architecture modulaire et scalable pour garantir une bonne maintenabilité. Le code est bien structuré, avec des contrôleurs séparés pour chaque fonctionnalité (par exemple, gestion des utilisateurs et des produits), et les middlewares sont utilisés pour gérer l'authentification et les rôles.
Le code est également écrit en suivant les meilleures pratiques, avec une séparation claire entre les responsabilités (par exemple, le modèle Product est séparé des routes et des contrôleurs).

11. Page de Tchat avec Socket.io (10pts)

Une fonctionnalité de tchat en temps réel est intégrée via Socket.io. La page de tchat permet à deux ou plusieurs utilisateurs d'échanger des messages en temps réel. Cette fonctionnalité est liée à la gestion des utilisateurs (les utilisateurs doivent être authentifiés et autorisés à accéder au tchat).
Socket.io est utilisé pour la gestion des connexions en temps réel.
Le tchat contient également un DAB
