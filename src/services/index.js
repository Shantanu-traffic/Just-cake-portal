const Cart = require("./carts/cart.service");
const ProductObj = require("./products/product.service");
const User = require("./user/user.service");
const Order = require("./orders/orders.services");
const ContactUs = require("./contactus/contactus.services");
const Payment = require("./payment/payment.service");

const ProductServices = {
  Product: ProductObj,
};

const UserServices = {
  User: User,
};

const CartServices = {
  Cart: Cart,
};

const OrderServices = {
  Order: Order,
};

const ContactUsServices = {
  ContactUs:ContactUs
}

const PaymentService = {
  Payment:Payment
}
module.exports = {
  ProductServices,
  UserServices,
  CartServices,
  OrderServices,
  ContactUsServices,
  PaymentService
};
