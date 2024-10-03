const express = require('express')
const { payment } = require('../controllers/payment.controllers')

const payementRouter = express.Router()

payementRouter.post('/confirm-payment',payment)
module.exports = payementRouter