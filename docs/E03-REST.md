# API Rest ?

## I. Structure SoC-friendly 

En réalité ce point est très dépendant de notre archi MVC

On sépare le plus possible chaque responsabilité :
- back vs front (termes caricaturaux mais ça fait le job)
  - + facile à maintenir
  - + facile à étendre
  - On peut modifier/ajouter un client sans se soucier de modifier le serveur
  - On peut modifier le serveur sans avoir à modifier les clients
  - On peut modifier le système de base de données sans modifier drastiquement le serveur

## II. Normalisation

On utilise une approche par "ressources" => les _entités_ du MCD sont devenues des _ressources_ dans notre API Rest. 

- Si tous les dev qui travaillent sur un projet respectent la normalisation liée à Rest, tout le monde garde ses marques :
  - Un dev front pourra déduire d'une route quelle sera la fonctionnalité associée (par. la route POST `/cards`) sert forcément à créer une carte
  - Un dev back saura que pour chaque ressource, au minimum, il devra créer les 5 routes CRUD (getAll, getOne, create, update, delete).
  - chaque ressource va trouver son router, son controller
  - ==> chaque intervenant sur le projet aura par défaut des repères au sein du code
- Facilite énormément le travail de documentation
- Facilite énormément le travail d'automatisation des tests