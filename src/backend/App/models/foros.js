const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_FOROS_DYNAMODB } = process.env;

function insertNewForo(
  projectName,
  foroName,
  phase,
  description,
  files,
  answers
) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `FORO#${foroName}`,
    phase: phase,
    description,
    files,
    answers
  };
  const params = {
    TableName: MATRAGRA_FOROS_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function putForo(projectName, foroName, restParams) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `FORO#${foroName}`,
    ...restParams,
  };
  const params = {
    TableName: MATRAGRA_FOROS_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function getForoById(projectName, foroName) {
  const params = {
    TableName: MATRAGRA_FOROS_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :foro)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":foro": `FORO#${foroName}`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  insertNewForo,
  putForo,
  getForoById
};
