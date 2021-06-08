const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_DYNAMODB } = process.env;

function insertNewProject(projectName, projectState) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `STATE#${projectState}`
  };
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function getProjectById(projectName) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :state)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":state": `STATE#`,
    },
  };
  return db.query(params).promise();
}

function getProjectsByState(projectState) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    IndexName:'inverted_index',
    KeyConditionExpression: "#pk = :state and begins_with(#sk, :project)",
    ExpressionAttributeNames: {
      "#pk": "sk",
      "#sk": "pk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#`,
      ":state": `STATE#${projectState}`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  insertNewProject,
  getProjectById,
  getProjectsByState,
};
