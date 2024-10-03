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

    case "payment_email_for_customer":
      return {
        subject: "Order Confirmation - Your Order is Successfully Placed!",
        html: `
      <p><strong>Hello ${data.name},</strong></p>
      <p>Thank you for your purchase! Your order has been successfully placed.</p>
      <p><strong>Order ID:</strong> ${data.order_id}</p>
      <p>We are processing your order and will notify you once it's shipped.</p>
      
      <p>If you have any questions or need further assistance, feel free to contact us. You can also visit our website for more details.</p>
      
      <p><a href="${data.website_link}" target="_blank">Visit our website for future inquiries</a></p>
      
      <p><strong>Best regards,<br>Just Cakes Team</strong></p>
      <p><em>Follow us on our social channels for the latest updates!</em></p>
    `,
      };

    case "payment_email_for_admin":
      return {
        subject: `New Order Placed - Order ID: ${data.order_id}`,
        html: `
      <p><strong>Hello Admin,</strong></p>
      <p>A new order has been placed successfully on the website. Below are the order details:</p>
      
      <p><strong>Order ID:</strong> ${data.order_id}</p>
      <p><strong>Customer Name:</strong> ${data.name}</p>
      <p><strong>Total Amount:</strong> $${data.total_amount}</p>
      
      <p>You can review and manage this order by visiting the admin dashboard.</p>
      
      <p><a href="${data.website_link}" target="_blank">Go to Admin Dashboard</a></p>
      
      <p><strong>Best regards,<br>Just Cakes System</strong></p>
      <p><em>Stay updated with the latest activities on the platform.</em></p>
    `,
      };

    default:
      return {
        subject: "Default Subject",
        text: "This is a default email message.",
      };
  }
};

module.exports = generateEmailContent;
