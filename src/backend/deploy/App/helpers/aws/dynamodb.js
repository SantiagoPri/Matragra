const aws = require("aws-sdk");

const awsConfig = {
  region: "us-east-2",
};

const service = new aws.DynamoDB(awsConfig);
const documentClient = new aws.DynamoDB.DocumentClient({ service });
module.exports = documentClient;
