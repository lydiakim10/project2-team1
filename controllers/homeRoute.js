const router = require("express").Router();
const { Record, User, Category } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async(req, res) => {
    try {
        const recordData = await Record.findall({
            include: [{
                model: User,
                attributes: ["username"],
            }, ],
        });

        const record = recordData.map((record) => record.get({ plain: true }));

        res.render("homepage", {
            // record,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/record/:id", async(req, res) => {
    try {
        const recordData = await Record.findbyPk(req.params.id, {
            attributes: ["category_id", "cost", "merchant"],
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

<<<<<<< HEAD
router.get("/", (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn,
    });
});
=======
>>>>>>> 3d6e8405fc9ce937ea6a9a237fe385fde9fa1dad

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;