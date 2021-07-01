const { validateNewProjectUser } = require("@appValidations/projectUser");
const {
  insertNewProjectUser,
  deleteProjectUserByProjectUser,
  getProjectPksByUser,
  getProjectUser
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
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return { status: "error", message: "Error, el usuario no pertenece al proyecto" };
  }
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

async function validateProjectUserAuthService(projectName, userName) {
  const aux = await getProjectUser(projectName, userName);
  if (aux.Count) {
    return { isValid: true};
  }
  else return { isValid: false};
}

module.exports = {
  createProjectUserService,
  deleteProjectUserServiceByProjectUser,
  getProjectPksServiceByUser,
  validateProjectUserAuthService
};
