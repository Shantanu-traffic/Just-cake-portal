const express = require('express')
const { contactUs } = require('../controllers/contactus.controller')
const multer = require("multer");
const upload = multer(); // Initialize multer for handling file uploads
const mailRouter = express.Router()

mailRouter.post('/send-mail',upload.single('image'),contactUs)
module.exports = mailRouter