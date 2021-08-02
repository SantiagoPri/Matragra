const db = require("../helpers/aws/dynamodb");

const { MATRAGRA_EVENTS_DYNAMODB } = process.env;

function insertNewEvent(
  projectName,
  eventName,
  date,
  time,
  duration,
  subject,
  detail
) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `EVENT#${eventName}`,
    date,
    time,
    duration,
    subject,
    detail,
  };
  const params = {
    TableName: MATRAGRA_EVENTS_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function putEvent(projectName, eventName, restParams) {
  const Item = {
    pk: `PROJECT#${projectName}`,
    sk: `EVENT#${eventName}`,
    ...restParams,
  };
  const params = {
    TableName: MATRAGRA_EVENTS_DYNAMODB,
    Item,
  };
  return db.put(params).promise();
}

function getEventById(projectName, eventName) {
  const params = {
    TableName: MATRAGRA_EVENTS_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :event)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":event": `EVENT#${eventName}`,
    },
  };
  return db.query(params).promise();
}

function getEventsByProject(projectName) {
  const params = {
    TableName: MATRAGRA_EVENTS_DYNAMODB,
    KeyConditionExpression: "#pk = :project and begins_with(#sk, :event)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
    ExpressionAttributeValues: {
      ":project": `PROJECT#${projectName}`,
      ":event": `EVENT#`,
    },
  };
  return db.query(params).promise();
}

module.exports = {
  insertNewEvent,
  putEvent,
  getEventById,
  getEventsByProject,
};
