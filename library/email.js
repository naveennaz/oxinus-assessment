const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'naveeine@gmail.com', // Replace with your email address
    pass: '$naveen@123#' // Replace with your email password (or use environment variables)
  }
});

module.exports = transporter;