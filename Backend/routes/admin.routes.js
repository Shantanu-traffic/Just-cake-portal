const express = require('express')
const { addProductByAdmin, editProductByAdmin, deleteProductByAdmin } = require('../controllers/admin.products')
const adminRouter = express.Router()

// add product by admin || POST
adminRouter.post('/add-product',addProductByAdmin)


// edit product by admin || PATCH
adminRouter.patch('/update-product',editProductByAdmin)

// delete product by admin || DELETE
adminRouter.delete('/delete-product',deleteProductByAdmin)


module.exports = adminRouter