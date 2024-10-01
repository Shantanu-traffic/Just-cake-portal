const express = require('express')
const { contactUs } = require('../controllers/contactus.controller')
const mailRouter = express.Router()

mailRouter.post('/send-mail',contactUs)
module.exports = mailRouter