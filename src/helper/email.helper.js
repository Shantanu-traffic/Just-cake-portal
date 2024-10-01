
const transporter = require("../config/mail.config");
const generateEmailContent = require("../mailTemplate/mail.template")

const sendEmailCustomerAdmin = async (recipients, purpose, data) => {
  const emailContent = generateEmailContent(purpose, data);
  const sentEmails = [];
  const from = `JUST CAKES <${process.env.NODEMAILER_USER_EMAIL}>`;
  for (const email of recipients) {
    const mailOptions = {
      from: from,
      to: email,
      subject: emailContent.subject,
      // text: emailContent.text,
      html:emailContent.html
    };

    try {
      console.log("Sending email to:", email);
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}: ` + info.response);
      sentEmails.push(email);
    } catch (error) {
      console.error(`Error sending email to ${email}: `, error);
      return { status: "error", message: `Failed to send email to ${email}` };
    }
  }
  const result = `Email Sent Successfully to ${sentEmails.join(" and ")}.`;
  // If all emails are sent without errors, return success
  return result;
};

module.exports = {
  sendEmailCustomerAdmin,
};
