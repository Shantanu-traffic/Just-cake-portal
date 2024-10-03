const express = require('express')
const { payment } = require('../controllers/payment.controllers')
const multer = require("multer");
const upload = multer(); // Initialize multer for handling file uploads

const payementRouter = express.Router()

payementRouter.post('/confirm-payment',upload.single('image'),payment)
module.exports = payementRouter