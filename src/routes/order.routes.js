const express = require('express')
const { delivery_address, orderProduct, orderHistory } = require('../controllers/orders.controllers')
const orderRouter = express.Router()


// address || POST
orderRouter.post('/address',delivery_address)

// ORDER || POST
orderRouter.post('/placed-order',orderProduct)

// ORDER HISTORY || GET
orderRouter.get('/order-history/:user_id',orderHistory)

module.exports = orderRouter