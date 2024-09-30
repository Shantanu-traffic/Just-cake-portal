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
  async deleteCartItem(cart_id) {
    try {
      const itemDeleted = await masterDb.query(
        `
            DELETE FROM carts WHERE id = $1
        `,
        [cart_id]
      );
      return itemDeleted.rowCount;
    } catch (error) {
      return error;
    }
  }

  // get all cart item for specific user
  async getAllCartItemForUser(user_id) {
    try {
      const result = await masterDb.query(
        `
          SELECT c.id as cart_id, 
    p.id as product_id, 
    * FROM carts c
          INNER JOIN products p on p.id = c.product_id
          WHERE user_id = $1
        `,
        [user_id]
      );

      return result.rows;
    } catch (error) {
      return error;
    }
  }

  // increase Qnty
  async cartProductQty(req) {
    const { cart_id, total_price, quantity } = req;
    try {
      const checkProductExist = await masterDb.query(
        `
                SELECT * FROM carts WHERE id = $1
        `,
        [cart_id]
      );
      if (checkProductExist.rows.length === 0) {
        return "Proudct Does not Exist...";
      }
      const result = await masterDb.query(
        `
                UPDATE carts
                SET quantity = $1, total_price = $2
                WHERE id = $3 returning id;
        `,
        [quantity, total_price, cart_id]
      );
      return result.rows[0].id;
    } catch (error) {
      return error;
    }
  }
}

const Cart = new CartService();
module.exports = Cart;
