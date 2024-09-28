const masterDb = require("../../config/db.connect");

class OrderService {
  async deliveryAddress(req) {
    const { user_id, street, city, state, postal_code, country,phone } = req;
    try {
      const result = await masterDb.query(
        `
                    INSERT INTO addresses (user_id,street,city,state,postal_code,country,phone)
                    VALUES ($1,$2,$3,$4,$5,$6,$7) returning address_id
                `,
        [user_id, street, city, state, postal_code, country,phone]
      );
      return result.rows[0].address_id;
    } catch (error) {
      console.log("erroFound", error);
      return error;
    }
  }

  async orderProduct(req) {
    const { user_id, order_date, total_amount, order_status,shipping_address_id,billing_address_id, products } = req;
    try {
      // Start a transaction to ensure data consistency
      await masterDb.query("BEGIN");

      // Insert the new order
      const orderResult = await masterDb.query(
        `
                INSERT INTO orders (user_id, order_date, total_amount, order_status,shipping_address_id,billing_address_id)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING order_id;
            `,
        [user_id, order_date, total_amount, order_status,shipping_address_id,billing_address_id]
      );
      const order_id = orderResult.rows[0].order_id;

      for (const item of products) {
        const { product_id, quantity, price } = item;
        const itemQuery = await masterDb.query(
          `
                    INSERT INTO order_products_mapping (order_id, product_id, quantity, price)
                    VALUES ($1, $2, $3, $4);
                `,
          [order_id, product_id, quantity, price]
        );
      }

      await masterDb.query("COMMIT");

      return order_id;
    } catch (error) {
      await masterDb.query("ROLLBACK");
      console.error("Error placing order:", error);
      return error;
    }
  }

  async orderHistory(user_id){
    try {
        const orders = await masterDb.query(
            `SELECT o.order_id, o.total_amount, o.order_date, o.order_status, 
                    ARRAY_AGG(json_build_object('product_id', opm.product_id, 'quantity', opm.quantity, 'price', opm.price)) AS products
             FROM orders o
             JOIN order_products_mapping opm  ON o.order_id = opm.order_id
             WHERE o.user_id = $1
             GROUP BY o.order_id
             ORDER BY o.order_date DESC`,
            [user_id]
        );
       return orders.rows
    } catch (error) {
        console.error('Error fetching order history:', error);
        return error
    }
  }
}

const Order = new OrderService();
module.exports = Order;
