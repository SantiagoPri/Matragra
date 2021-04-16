const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_DYNAMODB } = process.env;

function insertNewUser(userName, roleName, restParams) {
  const Item = {
    pk: `USER#${userName}`,
    sk: `ROLE#${roleName}`,
    ...restParams,
  };
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    Item,
  };
  console.log("Creating new User");
  return db.put(params).promise();
}

function getUserbyId(userName) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    KeyConditionExpression: "#pk = :user and begins_with(#sk, :role)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":user": `USER#${userName}`,
      ":role": `ROLE#`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  insertNewUser,
  getUserbyId,
};
