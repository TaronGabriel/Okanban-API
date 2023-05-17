// on récupère un routeur express
const { Router } = require('express');
const listsRouter = Router();
const listsController = require('../controllers/listsController');
const { body } = require('express-validator');
// ce fichier a été use() par l'app express avec un préfixe "/lists", donc pour gérer l'url "/lists/:id" par exemple, il ne faudra préciser que "/:id".

// route GET '/lists/'
listsRouter.get('/', listsController.getAll);
listsRouter.get('/:listId', listsController.getOne);
// on utilise body(nomdelapropriété).escape() pour supprimer le HTML éventuellement présent dans la propriété
listsRouter.post('/', body('name').escape(), listsController.create);
listsRouter.put('/:listId', listsController.update);
listsRouter.delete('/:listId', listsController.delete);

// on exporte le routeur
module.exports = listsRouter;