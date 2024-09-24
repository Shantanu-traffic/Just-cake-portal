const Cart = require("./carts/cart.service");
const ProductObj = require("./products/product.service");
const User = require("./user/user.service")


const ProductServices = {
    Product: ProductObj
}

const UserServices = {
    User:User
}

const CartServices = {
    Cart:Cart
}
module.exports = {ProductServices,UserServices,CartServices}