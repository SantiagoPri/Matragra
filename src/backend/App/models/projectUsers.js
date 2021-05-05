const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_DYNAMODB } = process.env;

function insertNewProjectUser(projectName, userName, restParams) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `USER#${userName}`,
    ...restParams,
  };
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function deleteProjectUserByProjectUser(projectName, userName) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    Key:{
      pk: `PROJECT#${projectName}`,
      sk: `USER#${userName}`,
    },
  };
  return db.delete(params).promise();
}

function getProjectPksByUser(userName) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    IndexName:'inverted_index',
    KeyConditionExpression: "#pk = :user and begins_with(#sk, :project)",
    ExpressionAttributeNames: {
      "#pk": "sk",
      "#sk": "pk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#`,
      ":user": `USER#${userName}`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
    insertNewProjectUser, 
    deleteProjectUserByProjectUser, 
    getProjectPksByUser
};
