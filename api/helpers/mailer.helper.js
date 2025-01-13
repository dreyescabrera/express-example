const nodemailer = require('nodemailer')
const { ENVIRONMENT } = require('./../config/environment.js')

const { GMAIL_USER, GMAIL_PASSWORD } = ENVIRONMENT

class MailerHelper {
  static async sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD
      }
    })

    const info = await transporter.sendMail({
      from: '"My Store" <my-store@gmail.com>',
      to,
      subject,
      text
    })

    return info
  }
}

module.exports = MailerHelper
