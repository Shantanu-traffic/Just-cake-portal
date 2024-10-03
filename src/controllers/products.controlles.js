const {ProductServices} = require("../services/index");
const { createError } = require("../middleware/errorHandler.middleware");

//Get  All Product
const getAllProducts = async (req,res,next)=> {
  try {
    const offSet = req.body.offSet
    if(!offSet){
      throw new Error("offset Value is required")
    }
    else{
      const result = await ProductServices.Product.getProducts(offSet)
      return res.status(200).json({
        success: true,
        message: "products fetched successfully....",
        result: result,
      });
    }
  } catch (error) {
    return next(createError(error.message, 500, "add product controller"));
  }
}

// Get Single Product
const getProduct = async (req,res,next)=> {
  try {
    const {product_id} = req.query

    if(!product_id){
      throw new Error("product_id Value is required")
    }
    else{
      const result =await ProductServices.Product.getSingleProduct(product_id)
      return res.status(200).json({
        success: true,
        message: "product fetched successfully....",
        result: result,
      });
    }
  } catch (error) {
    return next(createError(error.message, 500, "add product controller"));
  }
}

// Add Product
const createProduct = async (req, res, next) => {  
  const { title, description, price, created_by,stock,category } = req.body;
  if (!title || !description || !price || !created_by|| !stock || !category) {
    return next(createError("All field are mandatory", 400, "add controller"));
  }
  try {
    const result =await ProductServices.Product.addProduct(req.body, req.file);
    return res.status(200).json({
      success: true,
      message: "product added successfully....",
      result: result,
    });
  } catch (error) {
    return next(createError(error.message, 500, "add product controller"));
  }
};

// Edit Product
const editproduct = async (req, res, next) => {
  const {product_id,title,description,price,created_by,stock, category} = req.body;
  if (!product_id ||  !title ||    !description ||    !price ||  !created_by || !stock || !category ) {
    return next(createError("All field are mandatory", 400, "add controller"));
  }
  try {
    const result = await ProductServices.Product.editProduct(req.body, req.file);
    return res.status(200).json({
      success: true,
      message: "product updated successfully....",
      result: result,
    });
  } catch (error) {
    return next(createError(error.message, 500, "edit product controller"));
  }
};

// Delete Product
const deleteProduct = async (req, res, next) => {
  const {product_id}= req.params
  if (!product_id) {
    return next(createError("Please Provide Product Id", 400,));
  }
try {
  const result = ProductServices.Product.deleteproduct(product_id);
    return res.status(200).json({
      success: true,
      message: "product Deleted successfully....",
    });
} catch (error) {
  return next(createError(error.message, 500, "Delete product controller"));
}
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  editproduct,
  deleteProduct,
};
