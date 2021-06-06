const {
  insertNewProject,
  getProjectbyId,
  getProjectsByState,
} = require("@appModels/projects");
const { getProjectPksServiceByUser } = require("@appServices/projectUsers");
const { existUser } = require("@appValidations/user");
const validateNewProject = require("@appValidations/project");
const cleaner = require("@appHelpers/cleanResponses");

async function createProjectService(project) {
  const { projectName, states, index, ...restParams } = project;
  const { isValid, message } = await validateNewProject(
    projectName,
    states,
    index
  );
  if (!isValid) {
    return { status: "error", message };
  }

  await insertNewProject(projectName, "active", states, index, {
    ...restParams,
  });
  return { status: "ok", message: "Proyecto creado exitosamente" };
}

async function getProjectbyIdService(projectName) {
  const project = await getProjectbyId(projectName);
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

async function getProjectsByUserService(userName) {
  let projects = [];

  const { isValid, message } = await existUser(userName);
  if (!isValid) {
    return { status: "error", message };
  }

  let projectUsers = await getProjectPksServiceByUser(userName);
  for (const p of projectUsers.projects) {
    let aux = await getProjectbyIdService(p.pk);
    projects.push(aux.project);
  }
  return { status: "ok", projects: projects };
}

async function getActiveProjectsFiteredByUserService(userName) {
  let projects = await getActiveProjectsService();
  projects = projects.projects;

  const { isValid, message } = await existUser(userName);
  if (!isValid) {
    return { status: "error", message };
  }

  let projectUsers = await getProjectPksServiceByUser(userName);
  for (const p of projectUsers.projects) {
    let aux = await getProjectbyIdService(p.pk);
    let i = projects.lastIndexOf(aux.project);
    projects.splice(i, 1);
  }
  return { status: "ok", projects: projects };
}

module.exports = {
  createProjectService,
  getProjectbyIdService,
  getActiveProjectsService,
  getProjectsByUserService,
  getActiveProjectsFiteredByUserService
};
