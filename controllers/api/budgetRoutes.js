const router = require('express').Router();
const { Budget } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET all Budgets
router.get('/', withAuth, async(req, res) => {
    try {
        const data = await Budget.findAll({});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single Budget by id 
router.get('/:id', withAuth, async(req, res) => {
    try {
        const data = await Budget.findOne({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new Budget
router.post('/', withAuth, async(req, res) => {
    try {
        const data = await Budget.create({
            month: req.body.month,
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
        const data = await Budget.update({
            id: req.body.id,
            month: req.body.month,
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
        const data = await Budget.destroy({
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