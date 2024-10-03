const masterDb = require("../../config/db.connect");
const { sendEmailCustomerAdmin } = require("../../helper/email.helper");
const uploadFileToFirebase = require("../../helper/fileupload.helper");

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
      const result = await masterDb.query(
        `
                    INSERT INTO payments (order_id,user_id,payment_mode,payment_receipt_attachement,total_amount)
                    VALUES ($1,$2,$3,$4,$5) returning payment_id,order_id,total_amount,user_id
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
              DELETE FROM carts WHERE user_id = $1
        `,[result.user_id])

      return result.rows[0];
    } catch (error) {
      return error;
    }
  }

  async paymentMail(user_id,order_id,total_amount) {
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
          webiste_link:"www.google.com"
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
      return result.rows[0]
    } catch (error) {
      return error;
    }
  }
}

const Payment = new PaymentService();
module.exports = Payment;
