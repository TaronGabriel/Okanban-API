// on récupère un routeur express
const { Router } = require('express');
const tagsRouter = Router();
const tagsController = require('../controllers/tagsController');
const { body } = require('express-validator');
// ce fichier a été use() par l'app express avec un préfixe "/tags", donc pour gérer l'url "/tags/:id" par exemple, il ne faudra préciser que "/:id".

// route GET '/lists/'
tagsRouter.get('/', tagsController.getAll);
tagsRouter.get('/:tagId', tagsController.getOne);
// on utilise body(nomdelapropriété).escape() pour supprimer le HTML éventuellement présent dans la propriété
tagsRouter.post('/', body('name').escape(), tagsController.create);
tagsRouter.put('/:tagId', tagsController.update);
tagsRouter.delete('/:tagId', tagsController.delete);

// on exporte le routeur
module.exports = tagsRouter;