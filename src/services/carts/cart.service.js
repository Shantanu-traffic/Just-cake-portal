const masterDb = require("../../config/db.connect");

class CartService {
  async addToCart(req) {
    const { product_id, user_id, quantity, total_price } = req;
    try {
      const result = await masterDb.query(
        `
                        INSERT INTO carts (product_id,user_id,quantity,total_price)
                        VALUES ($1,$2,$3,$)
                        returning id;
                `,
        [product_id, user_id, quantity, total_price]
      );
      return result.rows[0].id;
    } catch (error) {
      return error;
    }
  }

  // 
}

const Cart = new CartService();
module.exports = Cart;
