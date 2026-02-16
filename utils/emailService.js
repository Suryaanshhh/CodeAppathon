const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use 'gmail', 'outlook', or SMTP details
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  // Use an "App Password" if using Gmail
  }
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"BloodConnect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Login OTP - BloodConnect',
    html: `
      <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
        <h2 style="color: #e63946;">BloodConnect Internal Portal</h2>
        <p>You requested an OTP for login. Your code is:</p>
        <h1 style="letter-spacing: 5px; color: #1d3557;">${otp}</h1>
        <p>This code is valid for <b>10 minutes</b>. Do not share it with anyone.</p>
        <hr />
        <small>If you did not request this, please ignore this email.</small>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };