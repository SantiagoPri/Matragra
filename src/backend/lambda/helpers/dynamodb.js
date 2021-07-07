const aws = require("aws-sdk");

const awsConfig = {
  region: "us-east-2",
};

const service = new aws.DynamoDB(awsConfig);
const db = new aws.DynamoDB.DocumentClient({ service });

const { MATRAGRA_DYNAMODB } = process.env;

function getProjectUsers(projectName) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :user)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":user": `USER#`,
    },
  };
  return db.query(params).promise();
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

module.exports = {
  getProjectUsers,
  getUserById,
};
