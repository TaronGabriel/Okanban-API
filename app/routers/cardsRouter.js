// on récupère un routeur express
const { Router } = require('express');
const cardsRouter = Router();
const cardsController = require('../controllers/cardsController');
const { body } = require('express-validator');
// ce fichier a été use() par l'app express avec un préfixe "/cards", donc pour gérer l'url "/cards/:id" par exemple, il ne faudra préciser que "/:id".

// route GET '/cards/'
cardsRouter.get('/', cardsController.getAll);
cardsRouter.get('/:cardId', cardsController.getOne);
// on utilise body(nomdelapropriété).escape() pour supprimer le HTML éventuellement présent dans la propriété
cardsRouter.post('/', body('description').escape(), cardsController.create);
cardsRouter.put('/:cardId', cardsController.update);
cardsRouter.delete('/:cardId', cardsController.delete);
// ajouter une association entre un tag et une card
cardsRouter.post('/:cardId/tags', cardsController.addTag);
// supprimer une association entre un tag et une card
cardsRouter.delete('/:cardId/tags/:tagId', cardsController.removeTag);

// on exporte le routeur
module.exports = cardsRouter;