// utils/sendMail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'hotmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (to, subject, text, html = null) => {
  const mailOptions = {
    from: `"Lost & Found" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
    // Only include html if provided
    ...(html && { html }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendMail;
