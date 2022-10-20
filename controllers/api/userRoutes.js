const router = require('express').Router();
const { where } = require('sequelize');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');


// User GET Route
router.get('/', async(req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
});


// Single User GET Route
router.get('/:id', async(req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user with this ID' });
            return;
        }

        res.json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// User Create Route

router.post('/', async(req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            console.log('Updating session after signup')
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// User Login Route

router.post('/login', async(req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userData) {
            res.status(404).json({ message: 'No user with that email address!' });
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(404).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user_id: userData.id, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User Logout Route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            console.log('logged out')
            res.status(204).end();
        });
    } else {
        console.log('here')
        res.status(404).end();
    }
});

// Create Password Reset Link
router.put('/get-reset-link', async(req, res) => {
    // get user that needs password reset
    try {
        const userData = await User.findOne({
            where: {
                email: `${req.body.email}`
            }
        });
        if (!userData) {
            res.status(404).json({ message: 'No user with that email!' });
            return;
        }

        // Get Random String for Reset Link
        const randomString = randomstring.generate();
        try {
            const updatedPassword = await User.update({ resetString: randomString }, {
                where: { email: userData.email }
            });
            async function sendEmail() {
                if (updatedPassword) {
                    // Email the link to user

                    const resetLink = (`${req.protocol}://${req.get('host')}/reset-password/${randomString}`);
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'help.budget2go@gmail.com',
                            pass: 'wdlovzyvppnfxfps',
                        },
                    });

                    let mailOptions = {
                        from: 'help.budget2go@gmail.com',
                        to: userData.email,
                        subject: "Budget2Go Password Reset",
                        text: `Hello ${userData.username}, you are receiving this email because you requested a password reset. ` +
                            `If this was not you, you should still reset your password. Follow the link below:\n\n${resetLink}`
                    }

                    const sentEmail = await transporter.sendMail(mailOptions);
                    try {
                        console.log('Email sent');
                    } catch (err) {
                        if (err) {
                            console.log('Error: ', err);
                        }
                    }


                    res.status(200).json('Check your email for a password reset link.');
                } else {
                    res.status(500).send('Something went wrong...');
                }
            }
            // Call the async email reset function
            sendEmail();
            res.render('login');
        } catch (err) {
            res.status(500).json(`${err}`);
        }
    } catch (err) {
        res.send(`${err}`);
    }
});

// Password Reset Route
router.put('/reset-password/:password_reset', async(req, res) => {
    // get user that needs password reset
    try {
        try {
            const updatedPassword = await User.update({
                password: req.body.password,
                resetString: null,
            }, {
                where: {
                    resetString: req.params.password_reset
                },
                individualHooks: true,
            });
            if (updatedPassword) {
                res.render('login');
            }

        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;