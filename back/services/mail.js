import { createTransport, createTestAccount } from 'nodemailer'
import { ErrorHandler } from 'middlewares'

export const resetMail = (reset, url) => ({
  from: '"Hypertube ⚡️" <robot@hypertube.com>',
  to: reset.email,
  subject: 'Your password reset token 🦄',
  text: `Reset your password at : ${url}/password/${reset.token}`,
  html: `<b>Reset your password :</b> <a href="${url}/password/${reset.token}">${url}/password/${reset.token}</a>`,
})

const mailer = async () => {
  const account = await createTestAccount()

  const mailService = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  })

  mailService.verify(error => {
    if (error) {
      throw new ErrorHandler(500, 'Mail service failed')
    } else {
      return true
    }
  })

  return mailService
}

export default mailer
