const { getProjectById } = require("@appModels/projects");

async function validateNewProject(projectName, index, fase0) {
  if (!(projectName && index && fase0)) {
    return { isValid: false, message: "Información incompleta" };
  }
  
  let project = await getProjectById(projectName);
  if (project.Count) {
    return { isValid: false, message: "Ya existe el nombre de proyecto" };
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo proyecto" };
}

module.exports = validateNewProject;