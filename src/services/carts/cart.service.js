const masterDb = require("../../config/db.connect");

class CartService {
  async addToCart(req) {
    const { product_id, user_id, quantity, total_price } = req;
    try {
      const result = await masterDb.query(
        `
                        INSERT INTO carts (product_id,user_id,quantity,total_price)
                        VALUES ($1,$2,$3,$4)
                        returning id;
                `,
        [product_id, user_id, quantity, total_price]
      );
      return result.rows[0].id;
    } catch (error) {
      return error;
    }
  }

  // cart item submit
  async deleteCartItem(product_id){
    try {
      console.log("product id",product_id)
      const itemDeleted = await masterDb.query(`
            DELETE FROM carts WHERE id = $1
        `,[product_id])
        return itemDeleted.rowCount
    } catch (error) {
      return error
    }
  }

  // get all cart item for specific user
  async getAllCartItemForUser(user_id){
    console.log("userid ",user_id)
    try {
      const result = await masterDb.query(`
          SELECT * FROM carts c
          INNER JOIN products p on p.id = c.product_id
           WHERE user_id = $1
        `,[user_id])
      
        return result.rows
    } catch (error) {
      return error
    }
  }
}

const Cart = new CartService();
module.exports = Cart;
