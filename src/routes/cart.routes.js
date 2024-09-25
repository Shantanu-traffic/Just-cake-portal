const express = require('express')
const { addToCart, deleteCartItem, getAllCartItemForUser } = require('../controllers/cart.controllers')
const cartRouter = express.Router()

// add to cart  || POST
cartRouter.post('/add-to-cart',addToCart)

// delete from cart || DELETE
cartRouter.delete('/delete-cart-item/:product_id',deleteCartItem)


// get all item from cart for specific user
cartRouter.get('/all-cart-item',getAllCartItemForUser)


module.exports = cartRouter