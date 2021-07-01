const { getProjectById } = require("@appModels/projects");

async function validateNewProject(projectName, index, phase0) {
  if (!(projectName && phase0 && index <= 3 && index >= 0)) {
    return { isValid: false, message: "Información incompleta" };
  }

  let project = await getProjectById(projectName);
  if (project.Count) {
    return { isValid: false, message: "Ya existe el nombre de proyecto" };
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo proyecto" };
}

async function existProject(projectName) {
  let project = await getProjectById(projectName);
  if (project.Count) {
    return { isValid: true, message: "Existe el proyecto" };
  }
  return { isValid: false, message: "No existe el nombre de proyecto" };

}

module.exports = {validateNewProject, existProject};
