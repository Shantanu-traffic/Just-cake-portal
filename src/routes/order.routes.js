const express = require('express')
const { delivery_address, orderProduct, orderHistory, adminOrderHistory,cancelOrder} = require('../controllers/orders.controllers')
const orderRouter = express.Router()


// address || POST
orderRouter.post('/address',delivery_address)

// ORDER || POST
orderRouter.post('/placed-order',orderProduct)

// ORDER HISTORY || GET
orderRouter.get('/order-history/:user_id',orderHistory)

// ORDER HISTORY || GET || FOR ADMIN
orderRouter.get('/admin-order-history',adminOrderHistory)

orderRouter.post('/cancel-order',cancelOrder)

module.exports = orderRouter