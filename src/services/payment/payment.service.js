const masterDb = require("../../config/db.connect");

class PaymentService {
  async payment(req) {
    const { order_id, user_id, payment_mode, payment_receipt_attachement } =
      req;
    try {
      const result = await masterDb.query(
        `
                    INSERT INTO payments (order_id,user_id,payment_mode,payment_receipt_attachement)
                    VALUES ($1,$2,$3,$4) returning payment_id
                `,
        [order_id, user_id, payment_mode, payment_receipt_attachement]
      );
  return result.rows[0].payment_id
    } catch (error) {
      return error;
    }
  }
}

const Payment = new PaymentService();
module.exports = Payment;
