const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_FOROS_DYNAMODB } = process.env;

function putList(projectName, listName, restParams) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `LIST#${listName}`,
    ...restParams,
  };
  const params = {
    TableName: MATRAGRA_FOROS_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function getListById(projectName, listName) {
  const params = {
    TableName: MATRAGRA_FOROS_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :list)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":list": `LIST#${listName}`,
    },
  };
  return db.query(params).promise();
}

function getListByProject(projectName) {
  const params = {
    TableName: MATRAGRA_FOROS_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :list)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":list": `LIST#`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  putList,
  getListById,
};
