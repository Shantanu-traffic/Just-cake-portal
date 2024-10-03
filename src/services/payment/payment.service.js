const masterDb = require("../../config/db.connect");

class PaymentService {
  async payment(req) {
    const { order_id, user_id, payment_mode, payment_receipt_attachement,total_amount } =
      req;
    try {
      const result = await masterDb.query(
        `
                    INSERT INTO payments (order_id,user_id,payment_mode,payment_receipt_attachement,total_amount)
                    VALUES ($1,$2,$3,$4,$5) returning payment_id,order_id,total_amount
                `,
        [order_id, user_id, payment_mode, payment_receipt_attachement,total_amount]
      );
  return result.rows[0]
    } catch (error) {
      return error;
    }
  }
}

const Payment = new PaymentService();
module.exports = Payment;
