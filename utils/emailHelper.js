const nodemailer = require("nodemailer");

async function sendEmail(userName, resetLink, userEmail) {}
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'help.budget2go@gmail.com',
        pass: 'qhqvopikxzqjadqw',
    },
});

transporter.sendMail({
    from: 'Budget Bot <help.budget2go@gmail.com>',
    to: userEmail,
    subject: "Budget2Go Password Reset",
    text: `Hello ${userName}, you are receiving this email because you requested a password reset. 
    If this was not you, you should still reset your password. Follow the link below:\n\n${resetLink}`
});