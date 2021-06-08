const { getProjectDetailById } = require("@appModels/projectDetails");

async function validateNewProjectDetail(projectName, type, index, fase0,
  fase1, fase2, fase3, registroDeActividades) {
  if (!(projectName && type && index && fase0 &&
    fase1 && fase2 && fase3 && registroDeActividades)) {
    return { isValid: false, message: "Información incompleta" };
  }
  
  let project = await getProjectDetailById(projectName);
  if (project.Count) {
    return { isValid: false, message: "Ya existe el nombre de proyecto" };
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo proyecto" };
}

module.exports = validateNewProjectDetail;