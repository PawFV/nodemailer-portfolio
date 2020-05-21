const nodemailer = require('nodemailer');
require('dotenv').config();



module.exports = {
   sendEmail(from, to, subject, html) {
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
         },
         tls: {
            rejectUnauthorized: false
         }
      })
      return new Promise((resolve, reject) => {
         transporter.sendMail({ from, subject, to, html }, (err, info) => {
            if (err) {
               console.log(err);
               reject(err)
            }
            resolve(info)
         })
      })

   }
}
