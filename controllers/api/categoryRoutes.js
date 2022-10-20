const router = require('express').Router();
const Category = require('../../models/category');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET all Categories
router.get('/', async(req, res) => {
    try {
        const data = await Category.findAll({
            where: {
                user_id: req.query.user_id
            },
            order: [
                ['category_name', req.query.order_by]
            ]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single Category by id 
router.get('/:id', withAuth, async(req, res) => {
    try {
        const data = await Category.findOne({
            where: {
                user_id: req.body.user_id,
                id: req.params.id
            },
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new Category
router.post('/', withAuth, async(req, res) => {
    try {
        const data = await Category.create({
            category_name: req.body.category_name,
            budget: req.body.budget,
            user_id: req.body.user_id
        })
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// UPDATE a Category
router.put('/:id', withAuth, async(req, res) => {
    try {
        const data = await Category.update({
            id: req.body.id,
            category_name: req.body.name,
            budget: req.body.budget
        }, {
            where: {
                id: req.params.id,
                user_id: req.body.user_id
            }
        })
        if (!data) {
            res.status(404).json({ message: 'No record found with this id' });
            return;
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE A Category 
router.delete('/:id', withAuth, async(req, res) => {
    try {
        const data = await Category.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!data) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;