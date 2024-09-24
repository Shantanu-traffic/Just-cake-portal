class ProductService {
    // product_details;
    // constructor(product_details){
    //     this.product_details = product_details
    // }

  async addProduct(product_details) {
    const { title, description, image, price, created_by, stock, category } =
    product_details;
    if (!title || !description || !image || !price || !created_by) {
      return next(
        createError("All field are mandatory", 400, "add controller")
      );
    }
    try {
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

      return res.status(200).json({
        success: true,
        message: "product added successfully....",
        result: insertProduct.rows[0],
      });
    } catch (error) {
      return next(createError(error.message, 500, "add product controller"));
    }
  }
}


const Product = new ProductService() 
module.exports = Product;