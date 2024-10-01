const express = require('express')
const { addToCart, deleteCartItem, getAllCartItemForUser, proudctQty } = require('../controllers/cart.controllers')
const { contactUs } = require('../controllers/contactus.controller')
const cartRouter = express.Router()

// add to cart  || POST
cartRouter.post('/add-to-cart',addToCart)

// delete from cart || DELETE
cartRouter.delete('/delete-cart-item/:cart_id',deleteCartItem)


// get all item from cart for specific user
cartRouter.get('/all-cart-item',getAllCartItemForUser)

// increase qty
cartRouter.patch('/qty',proudctQty)

cartRouter.post('/send-mail',contactUs)
module.exports = cartRouter