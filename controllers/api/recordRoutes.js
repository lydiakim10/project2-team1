const router = require('express').Router();
const { Record } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


// USE package for dates
const moment = require('moment')

// GET all records
router.get('/', withAuth, async(req, res) => {
    try {
        const data = await Record.findAll({
            where: {
                user_id: req.body.user_id
            }
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single record by id 
router.get('/:id', withAuth, async(req, res) => {
    try {
        const data = await Record.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'user_id',
                'category_id',
                'cost',
                'merchant',
            ],
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new record
router.post('/', withAuth, async(req, res) => {

    try {
        const data = await Record.create({
            category_id: req.body.category_id,
            cost: req.body.cost,
            user_id: req.body.user_id,
            merchant: req.body.merchant,
        })
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// UPDATE a record
router.put('/:id', withAuth, async(req, res) => {
    try {
        const data = await Record.update({
            category_id: req.body.category_id,
            cost: req.body.cost,
            user_id: req.body.user_id,
            merchant: req.body.merchant,
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

// DELETE A record 
router.delete('/:id', withAuth, async(req, res) => {
    try {
        const data = await Record.destroy({
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