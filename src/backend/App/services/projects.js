const {
  insertNewProject,
  getProjectById,
  getProjectsByState,
} = require("@appModels/projects");
const {
  insertNewProjectDetail,
} = require("@appModels/projectDetails");
const { getProjectPksServiceByUser } = require("@appServices/projectUsers");
const validateNewProject = require("@appValidations/project");
const cleaner = require("@appHelpers/cleanResponses");

async function createProjectService(project) {
  const { projectName, index, fase0, ...restParams } = project;
  const { isValid, message } = await validateNewProject(
    projectName,
    index,
    fase0
  );
  if (!isValid) {
    return { status: "error", message };
  }

  await insertNewProject(projectName, "active");
  fase1 = {};
  fase2 = {};
  fase3 = {};
  registroDeActividades = {};  
  await insertNewProjectDetail(projectName, "info", index, fase0,
    fase1, fase2, fase3, registroDeActividades, {
      ...restParams });
  return { status: "ok", message: "Proyecto creado exitosamente" };
}

async function getProjectByIdService(projectName) {
  const project = await getProjectById(projectName);
  if (project.Count) {
    const cProject = cleaner(project);
    return { status: "ok", project: cProject.Items[0] };
  }
  return { status: "error", project: null };
}

async function getActiveProjectsService() {
  const projects = await getProjectsByState("active");
  if (projects.Count) {
    const cProjects = cleaner(projects);
    return { status: "ok", projects: cProjects.Items };
  }
  return { status: "error", projects: null };
}

async function getAllProjectsByUser(userName) {
  const result = {
    userProjectNames: [],
    OtherProjects: [],
  };
  const projectsUser = await getProjectPksServiceByUser(userName);
  let projects = await getProjectsByState("active");
  if (!projects.Count) {
    return result;
  }
  projects = cleaner(projects);
  projects.Items.forEach((project) => {
    if (projectsUser.includes(project.pk)) {
      result.userProjectNames.push(project);
    } else {
      result.OtherProjects.push(project);
    }
  });
  return result;
}

module.exports = {
  createProjectService,
  getProjectByIdService,
  getActiveProjectsService,
  getAllProjectsByUser
};
