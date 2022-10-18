const router = require("express").Router();
const { Record, User, Category } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        // const recordData = await Record.findall({
        //     include: [
        //         {
        //             model: User,
        //             attributes: ["username"],
        //         },
        //     ],
        // });

        // const record = recordData.map((record) => record.get({ plain: true }));

        res.render("dashboard", {
            // record,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;