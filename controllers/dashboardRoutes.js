const router = require("express").Router();
const { Record, User, Category } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const recordData = await Record.findAll({
            attributes: ["type", "amount", "merchant", "date"],
            where: {
                    user_id: req.session.user_id
                },
        });
        const record = recordData.map((record) => record.get({ plain: true }));

        res.render("dashboard", {
            record,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.get("/record/:id", async (req, res) => {
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