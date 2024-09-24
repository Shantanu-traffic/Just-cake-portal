const masterDb = require("../../config/db.connect");
class ProductService {

  async addProduct(product_details) {
    const { title, description, image, price, created_by, stock, category } =
      product_details;
    try {
      console.log("test data",product_details)
      const insertProduct = await masterDb.query(
        `
                         INSERT INTO products (title,description,image,price,created_by,stock,category)
                         VALUES ($1,$2,$3,$4,$5,$6,$7)
                         returning *
                      `,
        [title, description, image, price, created_by, stock, category]
      );

      if (insertProduct.rows.length === 0) {
        return next(
          createError(
            "Some thing Went Wrong to insert the data in db",
            400,
            "add product controller"
          )
        );
      }

      return {
        success: true,
        message: "product added successfully....",
        result: insertProduct.rows[0],
      };
    } catch (error) {
      return error;
    }
  }

  async editProduct(product_details) {
    const {
      product_id,
      title,
      description,
      image,
      price,
      created_by,
      stock,
      category,
    } = product_details;
    try {
      const updateProduct = await masterDb.query(
        `
                    UPDATE products
                    SET title = $1, description = $2, image = $3, price = $4, created_by = $5,
                    stock = $6, category = $7 WHERE id = $8 returning *
                  `,
        [
          title,
          description,
          image,
          price,
          created_by,
          stock,
          category,
          product_id,
        ]
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

      return  updateProduct.rows[0].id
    } catch (error) {
      return error;
    }
  }
}

const ProductObj = new ProductService();
module.exports = ProductObj;
