// import nodemailer from 'nodemailer'
import * as nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
async function sendMail (useremail: string, password: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"UserApp Co 👻" <admin@user-app.com>', // sender address
    to: `${useremail}`, // list of receivers
    subject: 'Password update ✔', // Subject line
    text: `Your new password ${password}`, // plain text body
    html: `<b>Your new password ${password}</b>` // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  // TODO: set return values as messageId and mailUrl
  //       so as to return to frontend upon password reset completion
}

// sendMail().catch(console.error)

export {
  sendMail
}