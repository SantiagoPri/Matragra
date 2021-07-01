const { getProjectDetailById } = require("@appModels/projectDetails");

async function validateNewProjectDetail(projectName, phase) {
  if (!(projectName && phase)) {
    return { isValid: false, message: "Información incompleta" };
  }
  
  let project = await getProjectDetailById(projectName);
  if (project.Count) {
    return { isValid: false, message: "Ya existe el nombre de proyecto" };
  }
  return { isValid: true, message: "Este es un nuevo proyecto" };
}

async function validateProjectPhase(phase) {
  Object.entries(phase).forEach(task => {
    const [key, element] = task;
    if (!key.startsWith("task#")) {
      return { isValid: false, message: "Información incompleta o estructura incorrecta" };
    }
    if (!(element.name && element.description && element.subTask)) {
      return { isValid: false, message: "Información incompleta o estructura incorrecta" };
    }
  });
  return { isValid: true, message: "Fase valida" };
}

async function validateProjectPhase0(phase) {
  const {objectives, scope} = phase;
  if (!((objectives || objectives === []) && (scope || scope === ""))) {
    return { isValid: false, message: "Información incompleta o estructura incorrecta" };
  }
  return { isValid: true, message: "Fase valida" };
}

module.exports = { validateNewProjectDetail, validateProjectPhase, validateProjectPhase0 };