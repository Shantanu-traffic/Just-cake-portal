const express = require('express')
const { createProduct, editproduct, deleteProduct, getAllProducts, getProduct } = require('../controllers/products.controlles')
const productRouter = express.Router()
const multer = require("multer");
const upload = multer(); // Initialize multer for handling file uploads
// get All products || get
productRouter.post('/get-products',getAllProducts)

// get All product || get
productRouter.get('/get-product',getProduct)

// add product || POST
productRouter.post('/add-product',upload.single('image'),createProduct)

// edit product || PATCH
productRouter.patch('/update-product',editproduct)

// delete product || DELETE
productRouter.delete('/delete-product/:product_id',deleteProduct)




module.exports = productRouter