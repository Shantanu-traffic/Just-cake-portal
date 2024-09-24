// Add Product

const masterDb = require("../config/db.connect");
const { createError } = require("../middleware/errorHandler.middleware");

const addProductByAdmin = async (req, res, next) => {
  const { title, description, image, price, created_by,stock,category } = req.body;
  if (!title || !description || !image || !price || !created_by) {
    return next(createError("All field are mandatory", 400, "add controller"));
  }
  try {
    const addProduct = await masterDb.query(
      `
               INSERT INTO products (title,description,image,price,created_by,stock,category)
               VALUES ($1,$2,$3,$4,$5,$6,$7)
               returning *
            `,
      [title, description, image, price, created_by,stock,category]
    );

    if (addProduct.rows.length === 0) {
      return next(
        createError(
          "Some thing Went Wrong to insert the data in db",
          400,
          "add product controller"
        )
      );
    }

    return res.status(200).json({
      success: true,
      message: "product added successfully....",
      result: addProduct.rows[0],
    });
  } catch (error) {
    return next(createError(error.message, 500, "add product controller"));
  }
};

// Edit Product
const editProductByAdmin = async (req, res, next) => {
    const { product_id,title, description, image, price, created_by,stock,category } = req.body;
    if (!product_id || !title || !description || !image || !price || !created_by ) {
      return next(createError("All field are mandatory", 400, "add controller"));
    }
    try {
      const updateProduct = await masterDb.query(
              `
                UPDATE products
                SET title = $1, description = $2, image = $3, price = $4, created_by = $5,
                stock = $6, category = $7 WHERE id = $8 returning *
              `,
             [title, description, image, price, created_by, stock, category, product_id]
      );
  
      if (updateProduct.rows.length === 0) {
        return next(
          createError(
            "Some thing Went Wrong to insert the data in db",
            400,
            "add product controller"
          )
        );
      }
  
      return res.status(200).json({
        success: true,
        message: "product updated successfully....",
        result: updateProduct.rows[0],
      });
    } catch (error) {
      return next(createError(error.message, 500, "edit product controller"));
    }
};

// Delete Product

const deleteProductByAdmin = async (req, res, next) => {};

module.exports = {
  addProductByAdmin,
  editProductByAdmin,
  deleteProductByAdmin,
};
