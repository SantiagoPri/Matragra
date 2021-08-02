const AWS = require("aws-sdk");
const { getProjectUsers, getUserById } = require("./dynamodb");



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

module.exports = {
  getProjectEmails,
  formatDynamoImages,
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
