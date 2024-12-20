const masterDb = require("../../config/db.connect");
const { sendEmailCustomerAdmin } = require("../../helper/email.helper");
const uploadFileToFirebase = require("../../helper/fileupload.helper");
require('dotenv').config()
class PaymentService {
  async payment(payment_details,payment_proof) {
    let uploadedProof = "NA"
    if(payment_proof != undefined){
      uploadedProof = await uploadFileToFirebase(payment_proof)
      console.log("uploadProof",uploadedProof)
    }
    const {
      order_id,
      user_id,
      payment_mode,
      total_amount,
    } = payment_details;
    try {
      await masterDb.query("BEGIN");
      const result = await masterDb.query(
        `
                    INSERT INTO payments (order_id,user_id,payment_mode,payment_receipt_attachement,total_amount)
                    VALUES ($1,$2,$3,$4,$5) returning payment_id,order_id,payment_receipt_attachement,total_amount,user_id
                `,
        [
          order_id,
          user_id,
          payment_mode,
          uploadedProof?.url,
          total_amount,
        ]
      );

      const deleteData = await masterDb.query(`
              UPDATE carts
            SET invisible=true
            WHERE user_id = $1;
        `,[result.rows[0].user_id])
        console.log("item deleted",deleteData)
        console.log("user id found",result.rows[0].user_id)
        await masterDb.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await masterDb.query("ROLLBACK");
      return error;
    }
  }

  async paymentMail(user_id,order_id,total_amount,payment_mode,payment_receipt_attachement) {
    try {

      const customerEmailResult = await masterDb.query(`
              SELECT email,display_name FROM users WHERE id = $1
        `,[user_id])

        const adminEmailsResult = await masterDb.query(
          `
                     select email from users u where is_admin = $1  
                  `,
          [true]
        );

        const emailData = {
          name: customerEmailResult.rows[0].display_name,
          order_id:order_id,
          total_amount:total_amount,
          payment_mode,
          payment_attachement:payment_receipt_attachement,
          webiste_link:'http://www.cakecrafts.co.nz/'
        };
        const adminEmails = adminEmailsResult.rows.map((row) => row.email);
  
        const customerEmail = customerEmailResult.rows[0].email;
        console.log("customer email",customerEmail)
        const customer_email_result = await sendEmailCustomerAdmin(
          [customerEmail],
          "payment_email_for_customer",
          emailData
        );
        console.log("customer result", customer_email_result);
        const admin_email_result = await sendEmailCustomerAdmin(
          adminEmails,
          "payment_email_for_admin",
          emailData
        );
  
        return { customer_email_result, admin_email_result };
    } catch (error) {
      return error;
    }
  }
}

const Payment = new PaymentService();
module.exports = Payment;
