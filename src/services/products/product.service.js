const masterDb = require("../../config/db.connect");
const uploadFileToFirebase = require("../../helper/fileupload.helper");
const { createError } = require("../../middleware/errorHandler.middleware");
const { getStorage, ref, deleteObject } = require("firebase/storage");

class ProductService {
  async getProducts(offSet) {
    try {
      const data = await masterDb
        .query(
          `SELECT * FROM products
          where is_removed = false
            LIMIT 10 OFFSET ($1 - 1) * 10 `,
          [offSet]
        )
        .catch((err) => {
          throw err;
        });
      return data.rows;
    } catch (error) {
      console.log("error found", error);
      return error;
    }
  }

  async getSingleProduct(product_id) {
    try {
      const data = await masterDb
        .query(
          `SELECT * FROM products p
            where p.id = $1`,
          [product_id]
        )
        .catch((err) => {
          throw err;
        });

      return data.rows;
    } catch (error) {
      return error;
    }
  }

  async addProduct(product_details, product_image) {
    const { title, description, price, created_by, stock, category } =
      product_details;
    try {
      const uploadedImage = await uploadFileToFirebase(product_image);
      const imageUrl = uploadedImage.url;
      const insertProduct = await masterDb.query(
        `                INSERT INTO products (title,description,image,price,created_by,stock,category)
                         VALUES ($1,$2,$3,$4,$5,$6,$7)
                         returning *
                      `,
        [title, description, imageUrl, price, created_by, stock, category]
      );

      if (insertProduct.rows.length === 0) {
        return createError(
          "Some thing Went Wrong to insert the data in db",
          400,
          "add product service"
        );
      }

      return insertProduct.rows[0];
    } catch (error) {
      return error;
    }
  }

  async editProduct(product_details, product_image) {
    const {
      product_id,
      title,
      description,
      price,
      created_by,
      stock,
      category,
    } = product_details;
    try {
      const uploadedImage = await uploadFileToFirebase(product_image);
      const imageUrl = uploadedImage.url;
      const updateProduct = await masterDb.query(
        `
                    UPDATE products
                    SET title = $1, description = $2, image = $3, price = $4, created_by = $5,
                    stock = $6, category = $7 WHERE id = $8 returning *
                  `,
        [
          title,
          description,
          imageUrl,
          price,
          created_by,
          stock,
          category,
          product_id,
        ]
      );

      if (updateProduct.rows.length === 0) {
        return createError(
          "Some thing Went Wrong to insert the data in db",
          400,
          "add product controller"
        );
      }

      return updateProduct.rows[0].id;
    } catch (error) {
      return error;
    }
  }

  async deleteproduct(product_id) {
    try {
      await masterDb
        .query(
          `UPDATE products
            SET is_removed=true
            WHERE id= $1;`,
          [product_id]
        )
        .catch((err) => {
          throw err;
        });

      return {
        success: true,
        message: "product deleted successfully from DB",
      };
    } catch (error) {
      console.log(error);

      return createError(
        "Some thing Went Wrong to deletion the data in db",
        400,
        "delete product service"
      );
    }
  }
}

const ProductObj = new ProductService();
module.exports = ProductObj;
