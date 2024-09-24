const {ProductServices} = require("../services/index");
const { createError } = require("../middleware/errorHandler.middleware");

// Add Product

const createProduct = async (req, res, next) => {
  const { title, description, image, price, created_by,stock,category } = req.body;
  if (!title || !description || !image || !price || !created_by) {
    return next(createError("All field are mandatory", 400, "add controller"));
  }
  try {
    const result =await ProductServices.Product.addProduct(req.body);
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
  const {product_id,title,description,image,price,created_by,stock,category,} = req.body;
  if (!product_id ||  !title ||    !description ||    !image ||    !price ||  !created_by  ) {
    return next(createError("All field are mandatory", 400, "add controller"));
  }
  try {
    const result = await ProductServices.Product.editProduct(req.body);
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

const deleteProductByAdmin = async (req, res, next) => {};

module.exports = {
  createProduct,
  editproduct,
  deleteProductByAdmin,
};
