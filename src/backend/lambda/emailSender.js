const {
  formatDynamoImages,
  getProjectEmails,
} = require("./helpers/helperFunctions");
//const { sendEmail } = require("./helpers/sesService");
const { sendEmail } = require("./helpers/ymlpService");

exports.handler = async (event) => {
  console.log("DynamoStream Event: ", JSON.stringify(event));
  const record = formatDynamoImages(event.Records[0].dynamodb.NewImage);
  console.log("clean record: ", record);
  const emails = await getProjectEmails(record.projectName);
  console.log("email list: ", emails);
  await sendEmail(emails, record.subject, record.detail.description);
};
