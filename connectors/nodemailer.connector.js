const nodemailer = require('nodemailer');
const {envs} = require('../lib');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: envs.isMailSecure(),
    from: process.env.MAIL_NAME,
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PWD,
    },
});

module.exports = transporter;
