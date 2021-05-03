const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_DYNAMODB } = process.env;

function insertNewProject(projectName, areaName, restParams) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `AREA#${areaName}`,
    ...restParams,
  };
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function getProjectbyId(projectName) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :area)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":area": `AREA#`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  insertNewProject,
  getProjectbyId,
};
