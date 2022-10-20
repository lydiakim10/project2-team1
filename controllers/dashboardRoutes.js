const router = require("express").Router();
const { Record, User } = require("../models");
const Category = require('../models/category');
const withAuth = require("../utils/auth");

router.get("/", withAuth, async(req, res) => {
    try {
        const recordData = await Record.findAll({
            attributes: ["type", "amount", "merchant", "date"],
            where: {
                user_id: req.session.user_id
            },
            order: [
                ['date', 'ASC']
            ],
            raw: true
        });
        const categoryData = await Category.findAll({
            attributes: ["category_name", "budget"],
            where: {
                user_id: req.session.user_id
            },
            order: [
                ['category_name', 'ASC']
            ],
            raw: true
        });

        res.render("dashboard", {
            recordData,
            categoryData,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.get("/record/:record_id", async(req, res) => {
    try {
        const recordData = await Record.findbyPk(req.params.id, {
            attributes: ["type", "amount", "merchant", "date"],
        });

        const record = recordData.get({ plain: true });

        res.render("record", {
            ...record,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;