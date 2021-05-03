const { getProjectbyId } = require("@appModels/projects");

async function validateNewProject(projectName, areaName,) {
  if (!(projectName && areaName )) {
    return { isValid: false, message: "Información incompleta" };
  }
  let project = await getProjectbyId(projectName);
  if (project.Count) {
    return { isValid: false, message: "Ya existe el nombre de proyecto" };
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo proyecto" };
}

module.exports = validateNewProject;