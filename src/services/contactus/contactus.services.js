const { sendEmailCustomerAdmin } = require("../../helper/email.helper");
const masterDb = require("../../config/db.connect");
require("dotenv").config();
class ContactServices {
  async contactUsByCustomer(req) {
    try {
      const { name, email, message } = req;

      if (!name || !email || !message) {
        return "Missing required fields: name, email, or message.";
      }

      const emailData = {
        name: name,
        message: message,
        webiste_link: "http://localhost:5002",
      };

      const adminEmailsResult = await masterDb.query(
        `
                   select email from users u where is_admin = $1  
                `,
        [true]
      );

      const adminEmails = adminEmailsResult.rows.map((row) => row.email);

      const customerEmail = [email];
      const customer_email_result = await sendEmailCustomerAdmin(
        customerEmail,
        "contactus_email_for_customer",
        emailData
      );
      console.log("customer result", customer_email_result);
      const admin_email_result = await sendEmailCustomerAdmin(
        adminEmails,
        "contactus_email_for_admin",
        emailData
      );

      return { customer_email_result, admin_email_result };
    } catch (error) {
      return error;
    }
  }
}

const ContactUs = new ContactServices();
module.exports = ContactUs;
