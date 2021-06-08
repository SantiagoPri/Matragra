const { getProjectById } = require("@appModels/projects");
const { getUserById } = require("@appModels/users");

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
    return { isValid: false, message: "No existe el usuario" };
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo proyecto" };
}

module.exports = { validateNewProjectUser };
