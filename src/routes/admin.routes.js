const express = require('express')
const { createProduct, editproduct, deleteProduct, getAllProducts, getProduct } = require('../controllers/admin.products')
const passport = require('passport')
const adminRouter = express.Router()

// get All products || get
adminRouter.post('/get-products',getAllProducts)

// get All product || get
adminRouter.get('/get-product',getProduct)

// add product || POST
adminRouter.post('/add-product',createProduct)

// edit product || PATCH
adminRouter.patch('/update-product',editproduct)

// delete product || DELETE
adminRouter.delete('/delete-product/:product_id',deleteProduct)


module.exports = adminRouter