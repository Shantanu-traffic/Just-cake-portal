const Cart = require("./carts/cart.service");
const ProductObj = require("./products/product.service");
const User = require("./user/user.service")
const Order = require("./orders/orders.services")


const ProductServices = {
    Product: ProductObj
}

const UserServices = {
    User:User
}

const CartServices = {
    Cart:Cart
}

const OrderServices = {
    Order:Order
}
module.exports = {ProductServices,UserServices,CartServices,OrderServices}