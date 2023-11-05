const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // Replace with your email address
    pass: '' // Replace with your email password (or use environment variables)
  }
});

module.exports = transporter;