const router = require("express").Router();
const { Record, User, Budget } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async(req, res) => {
    try {
        res.render("landingpage", {
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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

router.get("/reset-password", (req, res) => {
    res.render("resetPassword");
})

router.get("/email-reset", (req, res) => {
    res.render("emailReset");
})


module.exports = router;