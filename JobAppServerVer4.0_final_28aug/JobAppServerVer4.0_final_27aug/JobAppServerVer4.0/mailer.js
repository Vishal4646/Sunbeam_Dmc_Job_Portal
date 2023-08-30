const nodemailer = require('nodemailer')
const config = require('./config')

function sendEmail(email, subject, body, callback) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  })

  const mailOptions = {
    from: `JOB PORTAL<${config.email.user}>`,
    to: email,
    subject: subject,
    html: body,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    callback(error, info)
  })
}

module.exports = {
  sendEmail: sendEmail,
}