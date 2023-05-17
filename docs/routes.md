# Routes

## List

|VERBE|ROUTE|DESCRIPTION|
|------|------|------|  
|GET | `/lists`| récupérer toutes les listes |
|GET | `/lists/:id`| récupérer une liste (avec les cartes liées)|
|POST | `/lists`| créer une liste |
|PUT | `/lists/:id`| modifier une liste |
|DELETE | `/lists/:id`| supprimer une liste |

## Card

|VERBE|ROUTE|DESCRIPTION|
|------|------|------|  
|GET | `/cards`| récupérer toutes les cartes |
|GET | `/cards/:id`| récupérer une carte avec ses tags|
|POST | `/cards`| créer une carte |
|PUT | `/cards/:id`| modifier une carte |
|DELETE | `/cards/:id`| supprimer une carte |
|POST | `/cards/:id/tags`| ajouter un tag à une carte (:id désigne l'id de la card, l'id du tag à ajouté sera dans le corps de la requête) |
|DELETE | `/cards/:id/tags/:tagId`| supprimer un tag d'une carte |

## Tag

|VERBE|ROUTE|DESCRIPTION|
|------|------|------|  
|GET | `/tags`| récupérer toutes les tags |
|GET | `/tags/:id`| récupérer un tag |
|POST | `/tags`| créer un tag |
|PUT | `/tags/:id`| modifier un tag |
|DELETE | `/tags/:id`| supprimer un tag |
