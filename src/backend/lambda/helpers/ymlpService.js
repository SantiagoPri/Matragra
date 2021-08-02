const YMLP = require("node-ymlp");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const { YMLP_API_KEY, YMLP_USERNAME } = {
  YMLP_API_KEY: "JFVNWN0VPEWRNNQ5QQB9",
  YMLP_USERNAME: "matragra",
}; //process.env;
const ymlp = new YMLP(YMLP_API_KEY, YMLP_USERNAME);

async function sendEmail(emailsTo, subject, description) {
  try {
    const files = fs.readFileSync(
      path.resolve(__dirname, "../emailTemplates/index.html"),
      { encoding: "utf-8" }
    );
    console.log(files);
    const groupId = await addGroup("MatragraNew");
    await Promise.all(
      emailsTo.map((email) => {
        return addEmail(email, groupId);
      })
    );
    const fromId = await getFroms();
    await sendNewsLetter(subject, `${files}`, description, fromId, groupId);
    await deleteGroup(groupId);
  } catch (error) {
    throw error;
  }
}

function addGroup(GroupName) {
  return new Promise((resolve, reject) => {
    ymlp.groups(
      "Add",
      {
        GroupName,
        Key: YMLP_API_KEY,
        Username: YMLP_USERNAME,
      },
      (err, response) => {
        if (err) {
          reject(err);
        }
        const GroupID = response.split(":")[1].trim();
        resolve(GroupID);
      }
    );
  });
}

function addEmail(Email, GroupID) {
  return new Promise((resolve, reject) => {
    ymlp.contacts(
      "Add",
      {
        Email,
        FieldX: "nombre",
        GroupID,
        Key: YMLP_API_KEY,
        Username: YMLP_USERNAME,
      },
      (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      }
    );
  });
}

function getFroms() {
  return new Promise((resolve, reject) => {
    ymlp.newsletter(
      "GetFroms",
      { Key: YMLP_API_KEY, Username: YMLP_USERNAME },
      (err, response) => {
        if (err) {
          reject(err);
        }
        const { FromID } = response[0];
        resolve(FromID);
      }
    );
  });
}

function sendNewsLetter(Subject, HTML, description, FromID, GroupID) {
  return new Promise((resolve, reject) => {
    ymlp.newsletter(
      "Send",
      {
        Subject,
        HTML,
        Text: description,
        FromID,
        GroupID,
        Key: YMLP_API_KEY,
        Username: YMLP_USERNAME,
      },
      (err, response) => {
        if (err) {
          reject(err);
        }
        console.log(response);
        resolve(response);
      }
    );
  });
}

function deleteGroup(GroupID) {
  return new Promise((resolve, reject) => {
    ymlp.groups(
      "Delete",
      {
        GroupID,
        Key: YMLP_API_KEY,
        Username: YMLP_USERNAME,
      },
      (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      }
    );
  });
}

module.exports = {
  sendEmail,
};

//sendEmail(["santi.prieto1212@gmail.com"], "email super serio", "description");
