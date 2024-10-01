// Function to generate email content based on the purpose
const generateEmailContent = (purpose, data) => {
  switch (purpose) {
    case "contactus_email_for_customer":
      return {
        subject: "Thank You for Reaching Out to Just Cakes!",

        html: `<p><strong>Hi ${data.name},</strong></p>
               <p>Thank you for contacting us! We’ve received your message and our team will get back to you as soon as possible.</p>
               <p>Here's a summary of what you shared with us :</p>
               <p><strong>Message : </strong>${data.message}</p>
               <p>We appreciate your interest in Just Cakes and look forward to assisting you!</p>
            <p><strong>Warm regards,<br>The Just Cakes Team</strong></p>`,
      };

    case "contactus_email_for_admin":
      return {
        subject: "New Contact Us Form Submission",
        html: `<p><strong>Hello Admin,</strong></p>
                       <p>A new message has been submitted via the Contact Us form on the website.</p>
                       <p>Here are the details:</p>
                       <p><strong>Name : </strong> ${data.name}</p>
                       <p><strong>Message : </strong>${data.message}</p>
                       <p>Please follow up with this inquiry as soon as possible.</p>
                    <p><strong>Best regards,<br>Just Cakes System</strong></p>`,
      };
    default:
      return {
        subject: "Default Subject",
        text: "This is a default email message.",
      };
  }
};

module.exports = generateEmailContent;
