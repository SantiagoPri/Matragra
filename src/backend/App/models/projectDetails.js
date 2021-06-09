const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_DYNAMODB } = process.env;

function insertNewProjectDetail(projectName, type, index, fase0,
                                    fase1, fase2, fase3, registroDeActividades, restParams) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `DETAIL#${type}`,
    index: index,
    fase0: fase0,
    fase1: fase1,
    fase2: fase2,
    fase3: fase3,
    registroDeActividades: registroDeActividades,
    ...restParams,
  };
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function getProjectDetailById(projectName) {
  const params = {
    TableName: MATRAGRA_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :detail)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":detail": `DETAIL#`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  insertNewProjectDetail,
  getProjectDetailById
};
