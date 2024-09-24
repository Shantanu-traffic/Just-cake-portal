const express = require('express')
const { createProduct, editproduct, deleteProduct } = require('../controllers/admin.products')
const passport = require('passport')
const adminRouter = express.Router()

// add product by admin || POST
adminRouter.post('/add-product',createProduct)


// edit product by admin || PATCH
adminRouter.patch('/update-product',editproduct)

// delete product by admin || DELETE
adminRouter.delete('/delete-product',deleteProduct)


module.exports = adminRouter