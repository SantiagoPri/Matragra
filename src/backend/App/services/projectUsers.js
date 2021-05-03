const validateNewProjectUser = require("@appValidations/projectUsers");
const { insertNewProjectUser, deleteProjectUserByProjectUser } = require("@appModels/projectUsers");
const cleaner = require("@appHelpers/cleanResponses");

async function createProjectUserService(projectName, userName) {
  const { isValid, message } = await validateNewProjectUser(projectName, userName);
  if (!isValid) {
    return { status: "error", message };
  }

  await insertNewProjectUser(projectName, userName);
  return { status: "ok", message: "Usuario asociado al proyecto" };
}

async function deleteProjectUserServiceByProjectUser(projectName, userName) {
  const { isValid, message } = await validateNewProjectUser(projectName, userName);
  if (!isValid) {
    return { status: "error", message };
  }

  await deleteProjectUserByProjectUser(projectName, userName);
  return { status: "ok", message: "El usuario ya no pertenece al proyecto" };
}

module.exports = { createProjectUserService, deleteProjectUserServiceByProjectUser };
