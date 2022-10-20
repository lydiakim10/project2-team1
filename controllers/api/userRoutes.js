const router = require('express').Router();
const { where } = require('sequelize');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const randomstring = require('randomstring');

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

        // res.json({ user: userData });

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
        const updateUserEmail = await userData;

        // Get Random String for Reset Link
        const randomString = randomstring.generate();
        try {
            const updatedPassword = await User.update({ resetString: randomString }, {
                where: { email: updateUserEmail.email }
            });
            if (updatedPassword) {
                // Email the link to user
                //randomString

                res.status(200).json('Check your email for a password reset link.');
            } else {
                res.status(500).send('Something went wrong...');
            }
        } catch (err) {
            //res.status(500).json(`second ${err}`);
            res.send(`second ${err}`);
        }
    } catch (err) {
        res.send(`second ${err}`);
        //res.status(500).json(`first ${err}`);
    }
});

// Password Reset Route
router.put('/:password_reset', async(req, res) => {
    // get user that needs password reset
    try {
        const userData = await User.findOne({
            where: {
                reset: req.params.password_reset
            }
        });
        if (!userData) {
            res.status(404).json({ message: 'No user with that reset link!' });
            return;
        }
        const updateUserData = await userData.json();

        // reset the users password
        try {
            const updatedPassword = await User.update({ password: req.body.password }, { where: { user_id: updateUserData[0].user_id } });
            if (updatedPassword.ok) {
                res.redirect('/login');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;