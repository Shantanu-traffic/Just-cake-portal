const masterDb = require("../../config/db.connect");

class PaymentService {
  async payment(req) {
    const {
      order_id,
      user_id,
      payment_mode,
      payment_receipt_attachement,
      total_amount,
    } = req;
    try {
      const result = await masterDb.query(
        `
                    INSERT INTO payments (order_id,user_id,payment_mode,payment_receipt_attachement,total_amount)
                    VALUES ($1,$2,$3,$4,$5) returning payment_id,order_id,total_amount,user_id
                `,
        [
          order_id,
          user_id,
          payment_mode,
          payment_receipt_attachement,
          total_amount,
        ]
      );

      const deleteData = await masterDb.query(`
              DELETE FROM carts WHERE user_id = $1
        `,[result.user_id])
        
      return result.rows[0];
    } catch (error) {
      return error;
    }
  }

  async paymentMail(payment_id) {
    try {
      const result = await masterDb.query(
        `
                  SELECT 
                          p.payment_id,
                          p.order_id,
                          o.total_amount,
                          p.payment_mode,
                          p.payment_receipt_attachement,
                          json_agg(
                              json_build_object(
                                  'productId', p2.id,
                                  'productName', p2.title,
                                  'price', p2.price,
                                  'quantity', opm.quantity
                              )
                          ) AS products
                      FROM 
                          payments p
                      INNER JOIN 
                          order_products_mapping opm ON opm.order_id = p.order_id
                      INNER JOIN 
                          products p2 ON p2.id = opm.product_id
                      INNER JOIN 
                          orders o ON o.order_id = p.order_id
                      WHERE 
                          p.payment_id = $1
                      GROUP BY 
                          p.order_id, p.payment_id, o.total_amount;
        `,
        [payment_id]
      );
      return result.rows[0]
    } catch (error) {
      return error;
    }
  }
}

const Payment = new PaymentService();
module.exports = Payment;
