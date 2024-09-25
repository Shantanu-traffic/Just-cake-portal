const express = require('express')
const { delivery_address, orderProduct } = require('../controllers/orders.controllers')
const orderRouter = express.Router()


// address || POST
orderRouter.post('/address',delivery_address)

// ORDER || POST
orderRouter.post('/order',orderProduct)

module.exports = orderRouter