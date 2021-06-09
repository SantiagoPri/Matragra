const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_DYNAMODB } = process.env;

function insertNewUser(userName, email, roleName, password, restParams) {
  const Item = {
    pk: `USER#${userName}`,
    sk: `EMAIL#${email}`,
    roleName: roleName,
    password: password,
    // ...restParams,
  };
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function getUserById(userName) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    KeyConditionExpression: "#pk = :user and begins_with(#sk, :email)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":user": `USER#${userName}`,
      ":email": `EMAIL#`,
    },
  };
  return db.query(params).promise();
}

function getUserbyEmail(email) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    IndexName:'inverted_index',
    KeyConditionExpression: "#pk = :email and begins_with(#sk, :user)",
    ExpressionAttributeNames: {
      "#pk": "sk",
      "#sk": "pk",
    },
    ExpressionAttributeValues: {
      ":user": `USER#`,
      ":email": `EMAIL#${email}`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  insertNewUser,
  getUserById,
  getUserbyEmail,
};
