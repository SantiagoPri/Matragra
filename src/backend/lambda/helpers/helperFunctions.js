const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");
const { getProjectUsers, getUserById } = require("./dynamodb");

const { SERVER_NAME, EMAIL_USERNAME, EMAIL_PASSWORD, MATRAGRA_EMAIL } =
  process.env;

async function getProjectEmails(projectName) {
  const query = await getProjectUsers(projectName);
  const users = cleaner(query).Items.map((user) => getUserById(user.sk));
  const queries = await Promise.all(users);
  let emails = "";
  queries.forEach((queryInfo) => {
    const [userInfo] = cleaner(queryInfo).Items;
    emails = emails ? `${emails},${userInfo.sk}` : userInfo.sk;
  });
  return emails;
}

function formatDynamoImages(dynamoImage) {
  const { pk, sk, ...eventAttributes } =
    AWS.DynamoDB.Converter.unmarshall(dynamoImage);
  return {
    projectName: pk.substring(pk.indexOf("#") + 1),
    eventId: sk.substring(sk.indexOf("#") + 1),
    ...eventAttributes,
  };
}

async function sendEmail(emailsTo, subject, description) {
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
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  getProjectEmails,
  formatDynamoImages,
  sendEmail,
};

function cleaner(record) {
  /**
    {
      "Items": [
        {
          "pk": "RULES#123",
          "sk": "xxxx#321",
          "prior": 1
        }
      ],
      "Count": 1,
      "ScannedCount": 1
    }
    */
  const { Items } = record;
  const formattedRecord = { ...record };
  formattedRecord.Items = Items.map((item) => {
    const { pk, sk, ...attributes } = item;
    return {
      pk: pk.substring(pk.indexOf("#") + 1),
      sk: sk.substring(sk.indexOf("#") + 1),
      ...attributes,
    };
  });
  return formattedRecord;
}
