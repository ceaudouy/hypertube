import { createTransport } from 'nodemailer'
import { ErrorHandler } from 'middlewares'

export const resetMail = (reset, url) => ({
  from: '"Hypertube ⚡️" <robot@hypertube.com>',
  to: reset.email,
  subject: 'Your password reset token 🦄',
  text: `Reset your password at : ${url}/password/${reset.token}`,
  html: `<b>Reset your password :</b> <a href="${url}/password/${reset.token}">${url}/password/${reset.token}</a>`,
})

const mailer = createTransport({
  host: 'ssl0.ovh.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USR,
    pass: process.env.MAIL_PWD,
  },
})

mailer.verify(error => {
  if (error) {
    throw new ErrorHandler(500, 'Mail service failed')
  } else {
    return true
  }
})

export default mailer
