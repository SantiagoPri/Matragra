const {
  formatDynamoImages,
  getProjectEmails,
} = require("./helpers/helperFunctions");
const { sendEmail } = require("./helpers/sesService");
// const { sendEmail } = require("./helpers/ymlpService");

exports.handler = async (event) => {
  try {
    console.log("DynamoStream Event: ", JSON.stringify(event));
    const record = formatDynamoImages(event.Records[0].dynamodb.NewImage);
    console.log("clean record: ", JSON.stringify(record));
    const emails = await getProjectEmails(record.projectName);
    console.log("email list: ", JSON.stringify(emails));
    // await sendEmail(emails, record.subject, record.detail.description);
  } catch (error) {
    console.error(error);
  }
};
