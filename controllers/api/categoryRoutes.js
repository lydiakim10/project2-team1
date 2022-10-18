const router = require('express').Router();
const { Category } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET all Categories
router.get('/', withAuth, async(req, res) => {
    try {
        const data = await Category.findAll({});
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
            name: req.body.name,
            budget: req.body.budget
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
            name: req.body.name,
            budget: req.body.budget
        }, {
            where: {
                id: req.params.id
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