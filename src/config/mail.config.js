
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER_EMAIL,
        pass: process.env.NODEMAILER_USER_PASSWORD
    }
});

module.exports = transporter;