const { validateNewProjectUser } = require("@appValidations/projectUsers");
const { existUser } = require("@appValidations/user");
const {
  insertNewProjectUser,
  deleteProjectUserByProjectUser,
  getProjectPksByUser
} = require("@appModels/projectUsers");
const cleaner = require("@appHelpers/cleanResponses");

async function createProjectUserService(projectName, userName) {
  const { isValid, message } = await validateNewProjectUser(
    projectName,
    userName
  );
  if (!isValid) {
    return { status: "error", message };
  }

  await insertNewProjectUser(projectName, userName);
  return { status: "ok", message: "Usuario asociado al proyecto" };
}

async function deleteProjectUserServiceByProjectUser(projectName, userName) {
  const { isValid, message } = await validateNewProjectUser(
    projectName,
    userName
  );
  if (!isValid) {
    return { status: "error", message };
  }

  await deleteProjectUserByProjectUser(projectName, userName);
  return { status: "ok", message: "El usuario ya no pertenece al proyecto" };
}

async function getProjectPksServiceByUser(userName) {
  const { isValid, message } = await existUser(userName);
  if (!isValid) {
    return { status: "error", message };
  }

  let projects = await getProjectPksByUser(userName);
  if (projects.Count) {
    const cProjects = cleaner(projects);
    return { status: "ok", projects: cProjects.Items };
  }
  return { status: "error", projects: null };
}

module.exports = {
  createProjectUserService,
  deleteProjectUserServiceByProjectUser,
  getProjectPksServiceByUser,
};
