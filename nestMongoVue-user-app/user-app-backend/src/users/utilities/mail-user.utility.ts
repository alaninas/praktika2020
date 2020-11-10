import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import Mail from 'nodemailer/lib/mailer';

async function createMailTransporter (): Promise<Mail> {
  let transporter: Mail;
  if (JSON.parse(process.env.USE_TEST_ACCOUNT)) {
    const testAccount = await nodemailer.createTestAccount()
    transporter = nodemailer.createTransport({
      host: process.env.TESTACC_SMTP_CONNECTION_HOST,
      port: parseInt(process.env.TESTACC_SMTP_CONNECTION_PORT),
      secure: JSON.parse(process.env.TESTACC_SMTP_CONNECTION_SECURE),
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })
  } else {
    transporter = nodemailer.createTransport({ 
      service: process.env.SMTP_TRANSPORT_SERVICE,
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS
      }
    }); 
  }
  return transporter
}

async function sendMail (useremail: string, password: string): Promise<string> {
  const transporter = await createMailTransporter();
  
  const messageHtml = await ejs.renderFile('./src/users/utilities/password-mail.ejs', {
    password: password, link: process.env.LINK_TO_LOGIN_PAGE
  });
  
  const info = await transporter.sendMail({
    from: process.env.SEND_EMAIL_FROM,
    to: useremail, // list of receivers
    subject: process.env.SEND_EMAIL_SUBJECT,
    text: `Your new password: ${password}`,
    html: messageHtml
  })

  const result = nodemailer.getTestMessageUrl(info)
  console.log(result)
  return result ? result : ''
}

export {
  sendMail
}