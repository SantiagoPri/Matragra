const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_PROJECTS_DYNAMODB } = process.env;

function insertNewProjectDetail(projectName, phase, restParams) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `PHASE#${phase}`,
    ...restParams,
  };
  const params = {
    TableName: MATRAGRA_PROJECTS_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function getProjectDetailById(projectName, phase) {
  const params = {
    TableName: MATRAGRA_PROJECTS_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :phase)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":phase": `PHASE#${phase}`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  insertNewProjectDetail,
  getProjectDetailById
};
