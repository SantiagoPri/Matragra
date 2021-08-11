const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const { EMAIL_PASSWORD, MATRAGRA_EMAIL } = process.env;

async function sendEmail(
  emailsTo,
  subject,
  detail,
  fecha,
  hora,
  duration,
  projectName
) {
  try {
    const template = fs.readFileSync(
      path.resolve(__dirname, "../emailTemplates/index.html"),
      { encoding: "utf-8" }
    );
    console.log(template);

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: MATRAGRA_EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    const emailBody = `
      ${detail.description}
      --------------------------------
      Fecha de la reunión: ${fecha} Hora: ${hora}
      Duración de la reunión: ${duration}
      Unete en éste link: ${detail.link}
      --------------------------------
      Este es un mensaje Generado automaticamente por Matragra
      Enviado a todos los miembros del proyecto ${projectName}
    `;

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: MATRAGRA_EMAIL, // Sender address
      to: emailsTo, // List of receivers
      subject, // Subject line
      text: emailBody, // Plain text body
      //html: template, // Html body
    });

    console.log("Message sent: ", JSON.stringify(info));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendEmail,
};
