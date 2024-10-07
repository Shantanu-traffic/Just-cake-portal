const { sendEmailCustomerAdmin } = require("../../helper/email.helper");
const masterDb = require("../../config/db.connect");
const uploadFileToFirebase = require("../../helper/fileupload.helper");
require("dotenv").config();
class ContactServices {
  async contactUsByCustomer(req) {
    try {
      const {
        name,
        email,
        phone,
        address,
        cake_size,
        cake_type,
        order_date,
        message,
      } = req.body;
      if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !cake_size ||
        !cake_type ||
        !order_date
      ) {
        return "Provide all details...";
      }
      let upload_image;
      if (req.file) {
        upload_image = await uploadFileToFirebase(req.file);
      }
      const emailData = {
        name,
        email,
        phone,
        address,
        cake_size,
        cake_type,
        order_date,
        message,
        image: upload_image && upload_image.url,
        webiste_link: "http://localhost:5002",
      };
      await masterDb.query("BEGIN");
      const adminEmailsResult = await masterDb.query(
        `
                   select email from users u where is_admin = $1  
                `,
        [true]
      );

      await masterDb.query(
        `
              INSERT INTO order_request (name,email,phone,address,cake_size,cake_type,order_date,message,order_sample)
              VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          name,
          email,
          phone,
          address,
          cake_size,
          cake_type,
          order_date,
          message,
          upload_image && upload_image.url,
        ]
      );
      const adminEmails = adminEmailsResult.rows.map((row) => row.email);

      const customerEmail = [email];
      const customer_email_result = await sendEmailCustomerAdmin(
        customerEmail,
        "request_order_email_for_customer",
        emailData
      );
      console.log("customer result", customer_email_result);
      const admin_email_result = await sendEmailCustomerAdmin(
        adminEmails,
        "request_order_email_for_admin",
        emailData
      );

      await masterDb.query("COMMIT");

      return { customer_email_result, admin_email_result };
    } catch (error) {
      await masterDb.query("ROLLBACK");
      return error;
    }
  }
}

const ContactUs = new ContactServices();
module.exports = ContactUs;
