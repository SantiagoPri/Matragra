const validateNewProject = require("@appValidations/newProject");
const { insertNewProject, getProjectbyId } = require("@appModels/projects");
const cleaner = require("@appHelpers/cleanResponses");

async function createProjectService(project) {
  const { projectName, areaName, ...restParams } = project;
  const { isValid, message } = await validateNewProject(projectName, areaName);
  if (!isValid) {
    return { status: "error", message };
  }

  await insertNewProject(projectName, areaName, {
    ...restParams,
  });
  return { status: "ok", message: "Proyecto creado exitosamente" };
}

async function getProjectbyIdService(projectName) {
  const project = await getProjectbyId(projectName);
  if (project.Count) {
    const cProject = cleaner(project);
    return { error: false, project: cProject.Items[0] };
  }
  return { error: true, project: null };
}

module.exports = { createProjectService, getProjectbyIdService };
