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
  getProjectbyIdService,
  getActiveProjectsService,
  getAllProjectsByUser,
};
