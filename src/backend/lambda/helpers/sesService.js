const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const {
  SERVER_NAME,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  MATRAGRA_EMAIL,
} = //{
  //   SERVER_NAME: "email-smtp.us-east-2.amazonaws.com",
  //   EMAIL_USERNAME: "AKIAYP7TDEV4AEKGVBWU",
  //   EMAIL_PASSWORD: "BBvPut3YJKsV6J4FvnyoxoANPTo5J908gi04VrS6y4cI",
  //   MATRAGRA_EMAIL: "matragra@gmail.com",
  // };
  process.env;

async function sendEmail(emailsTo, subject, description) {
  const template = fs.readFileSync(
    path.resolve(__dirname, "../emailTemplates/index.html"),
    { encoding: "utf-8" }
  );
  console.log(template);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: SERVER_NAME,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USERNAME, // generated ethereal user
      pass: EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: MATRAGRA_EMAIL, // sender address
    to: emailsTo, // list of receivers
    subject, // Subject line
    text: description, // plain text body
    html: template, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  sendEmail,
};

//sendEmail(["santi.prieto1212@gmail.com"], "email super serio", "description");
