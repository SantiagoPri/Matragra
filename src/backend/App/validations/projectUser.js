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

  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return {
      status: "error",
      message: "Error, el usuario no pertenece al proyecto",
    };
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo proyecto" };
}

module.exports = { validateNewProjectUser };
