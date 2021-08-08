const { getProjectById } = require("@appModels/projects");
const { getUserById, getUserbyEmail } = require("@appModels/users");
const { validateProjectUserAuthService } = require("@appServices/projectUsers");

async function validateNewProjectUser(projectName, userName) {
  if (!(projectName && userName)) {
    return { isValid: false, message: "Información incompleta" };
  }
  let project = await getProjectById(projectName);
  if (!project.Count) {
    return { isValid: false, message: "No existe el nombre de proyecto" };
  }

  let user = await getUserById(userName);
  if (!user.Count) {
    let user = await getUserbyEmail(userName);
    if (!user.Count) {
      return { isValid: false, message: "No existe el usuario" };
    }
  }

  return { isValid: true, message: "Este es un nuevo proyecto" };
}

async function validateOldProjectUser(projectName, userName) {
  if (!(projectName && userName)) {
    return { isValid: false, message: "Información incompleta" };
  }
  let project = await getProjectById(projectName);
  if (!project.Count) {
    return { isValid: false, message: "No existe el nombre de proyecto" };
  }

  let user = await getUserById(userName);
  if (!user.Count) {
    let user = await getUserbyEmail(userName);
    if (!user.Count) {
      return { isValid: false, message: "No existe el usuario" };
    }
  }

  return { isValid: true, message: "Este es un nuevo proyecto" };
}

module.exports = { validateNewProjectUser, validateOldProjectUser };
