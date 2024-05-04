const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

/*var transport = nodemailer.createTransport({
  host: process.env.TEST_MAIL_HOST,
  port: process.env.TEST_MAIL_PORT,
  auth: {
    user: process.env.TEST_MAIL_USERNAME,
    pass: process.env.TEST_MAIL_PASSWORD,
  },
});*/

function generateOrderEmail(order) {
  console.log("Order: ", order);
  return {
    from: "orders@hoophouse.store",
    subject: "Your order has been confirmed",
    html: `<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #f2f2f2;
        padding: 10px;
        text-align: center;
      }
      .order-details {
        margin-top: 20px;
      }
      .order-details h2 {
        color: #333;
        font-size: 24px;
      }
      .order-items {
        margin-top: 20px;
      }
      .order-item {
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
      }
      .order-item:last-child {
        border-bottom: none;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
      </div>
      <div class="order-details">
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> #${order.id + 623}</p>
        <p><strong>Date:</strong> ${order.createdAt.toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )}</p>
      </div>
      <div class="order-items">
        <h2>Order Items</h2>
        ${order.orderItems
          .map((orderItem) => {
            return `<div class="order-item">
            <p><strong>Product:</strong> ${orderItem.item.name}</p>
            <p><strong>Quantity:</strong> ${orderItem.quantity}</p>
            <p><strong>Price:</strong> $${orderItem.item.price} x ${orderItem.quantity}</p>
          </div>`;
          })
          .join("\n")}
      </div>
      <div class="footer">
        <p>If you have any questions about your order, please contact us at <a href="mailto:help@hoophouse.store">help@hoophouse.store</a>.</p>
        <p>Thank you for shopping with us!</p>
      </div>
    </div>
  </body>
  </html>`,
  };
}

module.exports = function sendMail(email, type, data) {
  var mailOptions = null;
  switch (type) {
    case "order":
      mailOptions = {
        ...generateOrderEmail(data),
        to: email,
      };
      break;
  }

  if (!mailOptions) {
    throw new Error("Email was not sent. Mail options not specified.");
  }
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};
