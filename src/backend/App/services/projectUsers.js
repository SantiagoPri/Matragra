const { validateNewProjectUser } = require("@appValidations/projectUser");
const {
  insertNewProjectUser,
  deleteProjectUserByProjectUser,
  getProjectPksByUser,
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
  const projects = await getProjectPksByUser(userName);
  if (projects.Count) {
    const cProjects = cleaner(projects);
    return cProjects.Items.map((project) => project.pk);
  }
  return [];
}

async function validateProjectUserAuth(projectName, userName) {
  const projectsUser = await getProjectPksServiceByUser(userName);
  if (projectsUser.includes(projectName)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  createProjectUserService,
  deleteProjectUserServiceByProjectUser,
  getProjectPksServiceByUser,
  validateProjectUserAuth
};
