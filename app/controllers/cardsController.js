const List = require('../models/List');
const Card = require('../models/Card');
const Tag = require('../models/Tag');
const errors = require('../modules/errors');

const cardsController = {
    // contrôleur pour la route /cards/
    getAll: async (req, res) => {
        // récupérer les données => models
        const allCards = await Card.findAll({
            order: [['position', 'ASC']]
        });
        // renvoyer les données au format JSON
        res.json(allCards);
    }, 
    getOne: async (req, res, next) => {
        const cardId = Number(req.params.cardId);

        try {
            const card = await Card.findByPk(cardId, {
                include: Tag
            });

            if (!card) {
                next();
                return;
            }

            res.json(card);
        } catch(err) {
            errors.error500(res, err);
        }
    }, 
    create: async (req, res, next) => {
        const description = req.body.description;
        const listId = Number(req.body.listId);

        console.log("description="+description)
        console.log("listId="+listId)

        if (typeof description != 'string' || description.length < 2 || isNaN(listId)) {
            errors.error400(res);
        }

        try {
            const card = await Card.create({ description, listId });
            res.json(card);
        } catch(err) {
            errors.error500(res, err);
        }
    },
    update:  async (req, res, next) => {
        const cardId = Number(req.params.cardId);

        try {
            const card = await Card.findByPk(cardId);
            if (!card) {
                return next();
            }

            const cardData = {
                description: req.body.description || card.description,
                position: req.body.position || card.position,
                listId: req.body.listId || card.listId,
                color: req.body.color || card.color
            };

            await card.update(cardData);
            res.json(card);
        }
        catch(err) {
            errors.error500(res, err);
        }
    },
    delete: async (req, res, next) => {
        const cardId = Number(req.params.cardId);

        try {
            const card = await Card.findByPk(cardId);
            if (!card) {
                return next();
            }

            await card.destroy();
            res.json(card);
        }
        catch(err) {
            errors.error500(res, err);
        }
    },
    addTag: async (req, res, next) => {
        // récupérer les données nécessaires
        const cardId = Number(req.params.cardId);
        const tagId = Number(req.body.tagId);

        // récupérer les models correspondant
        const card = await Card.findByPk(cardId, {include: Tag});
        const tag = await Tag.findByPk(tagId);
        // si un model n'existe pas, on renvoie en 404
        if (!card || !tag) {
            return next();
        }

        // faire l'association entre card et tag
        // on peut utiliser une méthode générée automatiquement par sequelize, ici par exemple la méthode addTag() sur le model Card.
        await card.addTag(tag);
        // on met à jour card avant de le renvoyer sinon le nouveau tag ne sera pas apparent (bien qu'enregistré en base)
        await card.reload();
        res.json(card);
    },
    removeTag: async (req, res, next) => {
        // récupérer les données nécessaires
        const cardId = Number(req.params.cardId);
        const tagId = Number(req.params.tagId);

        // récupérer les models correspondant
        const card = await Card.findByPk(cardId, {include: Tag});
        const tag = await Tag.findByPk(tagId);
        // si un model n'existe pas, on renvoie en 404
        if (!card || !tag) {
            return next();
        }

        await card.removeTag(tag);
        // on met à jour card avant de le renvoyer sinon le nouveau tag ne sera pas apparent (bien qu'enregistré en base)
        await card.reload();
        res.json(card);
    }
};

module.exports = cardsController;