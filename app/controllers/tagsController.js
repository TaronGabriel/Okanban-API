const Tag = require('../models/Tag');
const Card = require('../models/Card');
const errors = require('../modules/errors');

const tagController = {
    // contrôleur pour la route /lists/
    getAll: async (req, res) => {
        try {
            const allTags = await Tag.findAll();
            res.json(allTags);
        } catch(err) {
            errors.error500(res, err);
        }
    }, 
    getOne: async (req, res, next) => {
        const tagId = Number(req.params.tagId);

        try {
            const tag = await Tag.findByPk(tagId, {
                include: Card
            });

            if (!tag) {
                return next();
            }
            res.json(tag);
        } catch(err) {
            errors.error500(res, err);
        }
    }, 
    create: async (req, res, next) => {

        const name = req.body.name;
        if (typeof name != 'string' || name.length < 2) {
            errors.error400(res);
        }

        try {
            const tag = await Tag.create({ name });
            res.json(tag);
        } catch(err) {
            errors.error500(res, err);
        }
    },
    update:  async (req, res, next) => {
        const tagId = Number(req.params.tagId);

        try {
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                return next();
            }

            const tagData = {
                name: req.body.name || tag.name,
                color: req.body.color || tag.color,
            }

            await tag.update(tagData);
            res.json(tag);
        }
        catch(err) {
            errors.error500(res, err);
        }
    },
    delete: async (req, res, next) => {
        const tagId = Number(req.params.tagId);

        try {
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                next();
                return;
            }
            await tag.destroy();
            res.json(tag);
        }
        catch(err) {
            errors.error500(res, err);
        }
    }
}

module.exports = tagController;