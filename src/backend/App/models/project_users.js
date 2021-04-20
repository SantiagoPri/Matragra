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
  console.log("Creating new project user");
  return db.put(params).promise();
}

module.exports = {
    insertNewProjectUser,
};
