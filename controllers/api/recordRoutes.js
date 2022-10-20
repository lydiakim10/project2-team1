const router = require('express').Router();
const { Record } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// USE package for dates
const moment = require('moment');

// GET all records
router.get('/', async(req, res) => {
    try {
        const data = await Record.findAll({
            where: {
                user_id: req.query.user_id
            },
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single record by id 
router.get('/:record_id', withAuth, async(req, res) => {
    try {
        const data = await Record.findOne({
            where: {
                user_id: req.body.user_id,
                id: req.params.record_id
            },
            attributes: [
                'id',
                'user_id',
                'type',
                'amount',
                'merchant',
            ],
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new record
router.post('/', async(req, res) => {

    try {
        const data = await Record.create({
            type: req.body.type,
            amount: req.body.amount,
            user_id: req.body.user_id,
            merchant: req.body.merchant,
            date: req.body.date
        })
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// UPDATE a record
router.put('/:record_id', withAuth, async(req, res) => {
    try {
        const data = await Record.update({
            type: req.body.type,
            amount: req.body.amount,
            user_id: req.body.user_id,
            merchant: req.body.merchant,
        }, {
            where: {
                id: req.params.record_id
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
router.delete('/:record_id', withAuth, async(req, res) => {
    try {
        const data = await Record.destroy({
            where: {
                user_id: req.body.user_id,
                id: req.params.record_id
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