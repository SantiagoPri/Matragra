const { getProjectbyId } = require("@appModels/projects");
const { getUserbyId } = require("@appModels/users");


async function validateNewProjectUser(projectName, userName,) {
  if (!(projectName && userName )) {
    return { isValid: false, message: "Información incompleta" };
  }
  let project = await getProjectbyId(projectName);
  if (!project.Count) {
    return { isValid: false, message: "No existe el nombre de proyecto" };
  }

  let user = await getUserbyId(userName);
  if (!user.Count) {
    return { isValid: false, message: "No existe el usuario" };
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo proyecto" };
}

module.exports = validateNewProjectUser;