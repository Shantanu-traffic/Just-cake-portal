// Function to generate email content based on the purpose
const generateEmailContent = (purpose, data) => {
  console.log("data found", data);
  switch (purpose) {
    case "request_order_email_for_customer":
      return {
        subject: "Thank You for Your Order Request at Just Cakes!",
        html: `<p><strong>Hi ${data.name},</strong></p>
           <p>Thank you for your order request! We have received the following details:</p>
           <p><strong>Cake Size:</strong> ${data.cake_size}</p>
           <p><strong>Cake Type:</strong> ${data.cake_type}</p>
           <p><strong>Order Date:</strong> ${data.order_date}</p>
            ${
              data.image
                ? `<p><strong>Cake Sample:</strong> <a href="${data.image}" target="_blank">View Image</a></p>`
                : ""
            }
            ${
              data.message
                ? `<p><strong>Message:</strong> ${data.message}</p>`
                : ""
            }
           <p><strong>Contact Information:</strong></p>
           <p>Email: ${data.email}<br>Phone: ${data.phone}<br>Address: ${
          data.address
        }</p>
           <p>Our team will review your order and get back to you shortly!</p>
           <p><a href="www.cakecrafts.co.nz" target="_blank">Visit our website for future inquiries</a></p>
           <p>We appreciate your interest in Just Cakes and look forward to serving you!</p>
           <p><strong>Warm regards,<br>The Just Cakes Team</strong></p>`,
      };

    case "request_order_email_for_admin":
      return {
        subject: "New Order Request Submission",
        html: `<p><strong>Hello Admin,</strong></p>
           <p>A new order request has been submitted via the Contact Us form on the website.</p>
           <p>Here are the details:</p>
           <p><strong>Name:</strong> ${data.name}</p>
           <p><strong>Email:</strong> ${data.email}</p>
           <p><strong>Phone:</strong> ${data.phone}</p>
           <p><strong>Address:</strong> ${data.address}</p>
           <p><a href="www.cakecrafts.co.nz" target="_blank">Visit our website for future inquiries</a></p>
           <p><strong>Cake Size:</strong> ${data.cake_size}</p>
           <p><strong>Cake Type:</strong> ${data.cake_type}</p>
            ${
              data.image
                ? `<p><strong>Cake Sample:</strong> <a href="${data.image}" target="_blank">View Image</a></p>`
                : ""
            }
           <p><strong>Order Date:</strong> ${data.order_date}</p>
           ${
             data.message
               ? `<p><strong>Message:</strong> ${data.message}</p>`
               : ""
           }
           <p>Please follow up with this request as soon as possible.</p>
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
          <p><strong>Mode Of Payment : </strong> ${data.payment_mode}</p>
           ${
             data.payment_mode === "Bank Payment"
               ? `
      <p><strong>Payment Receipt:</strong> <a href="${data.payment_attachement}" target="_blank">Download Your Receipt</a></p>
    `
               : ""
           }

      <p><a href="www.cakecrafts.co.nz" target="_blank">Visit our website for future inquiries</a></p>
      
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
      <p><strong>Mode Of Payment : </strong> ${data.payment_mode}</p>
          ${
             data.payment_mode === "Bank Payment"
               ? `
      <p><strong>Payment Receipt:</strong> <a href="${data.payment_attachement}" target="_blank">Download Your Receipt</a></p>
    `
               : ""
           }
      <p>You can review and manage this order by visiting the admin dashboard.</p>
      
      <p><a href="www.cakecrafts.co.nz" target="_blank">Go to Admin Dashboard</a></p>
      
      <p><strong>Best regards,<br>Just Cakes System</strong></p>
      <p><em>Stay updated with the latest activities on the platform.</em></p>
    `,
      };

    case "forgot_password_otp":
      return {
        subject: "Reset Your Password - OTP Inside",
        text: `Hello ${data.name},\n\nWe received a request to reset your password. Your OTP code is ${data.otp}.\n\nThis OTP is valid for 2 minutes. Please enter the code on the password reset page to proceed.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nYour Team`,
        html: `
              <p>Hello ${data.name},</p>
              <p>We received a request to reset your password. Your OTP code is <strong>${data.otp}</strong>.</p>
              <p><strong>This OTP is valid for 2 minutes.</strong></p>
              <p>Please enter the code on the password reset page to proceed.</p>
              <p>If you did not request this, please ignore this email.</p>
              <p>Best regards,<br>Just Cakes</p>
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
