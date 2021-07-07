const {
  formatDynamoImages,
  getProjectEmails,
  sendEmail,
} = require("./helpers/helperFunctions");

exports.handler = async (event) => {
  console.log("DynamoStream Event: ", JSON.stringify(event));
  const record = formatDynamoImages(event.Records[0].dynamodb.NewImage);
  const emails = await getProjectEmails(record.projectName);
  console.log("clean record: ", record);
  console.log("email list: ", emails);
  await sendEmail(emails, record.subject, record.detail.description);
};
