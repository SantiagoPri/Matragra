const { validateNewProjectUser, validateOldProjectUser } = require("@appValidations/projectUser");
const {
  insertNewProjectUser,
  deleteProjectUserByProjectUser,
  getProjectPksByUser,
  getProjectUser,
  getUsersByProject
} = require("@appModels/projectUsers");
const cleaner = require("@appHelpers/cleanResponses");
const { getUserById, getUserbyEmail } = require("@appModels/users");


async function createProjectUserService(projectName, userName) {
  const { isValid, message } = await validateNewProjectUser(
    projectName,
    userName
  );
  if (!isValid) {
    return { status: "error", message };
  }
  if (userName.includes("@")) {
    let userx = await getUserbyEmail(userName);
    userx = cleaner(userx);
    await insertNewProjectUser(projectName, userx.Items[0].pk);
  }else{
    await insertNewProjectUser(projectName, userName);
  }
  return { status: "ok", message: "Usuario asociado al proyecto" };
}

async function deleteProjectUserServiceByProjectUser(projectName, userName) {
  if (userName.includes("@")) {
    try {
      let userx = await getUserbyEmail(userName);
      userx = cleaner(userx);
      userName = userx.Items[0].pk;
    } catch (error) {
      return { status: "error", message: "Error, no se encontro el usuario" };
    }
  }
  
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return { status: "error", message: "Error, el usuario no pertenece al proyecto" };
  }
  const { isValid, message } = await validateOldProjectUser(
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

async function getUsersByProjectService(projectName, userName) {
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return { status: "error", message: "Error, el usuario no pertenece al proyecto" };
  }
  let users = await getUsersByProject(projectName);
  if (users.Count) {
    users = cleaner(users);
    return { status: "ok", users: users.Items }
  }else return  { status: "error", message: "Ha ocurrido un error buscando usuarios asociados" };
}

module.exports = {
  createProjectUserService,
  deleteProjectUserServiceByProjectUser,
  getProjectPksServiceByUser,
  validateProjectUserAuthService,
  getUsersByProjectService
};
