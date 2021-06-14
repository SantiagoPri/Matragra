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

  try {
    await insertNewProject(projectName, "active", index);
  } catch (error) {
    return { status: "error", message: "Error guardando el proyecto" };
  }
  let params = {fase0, ...restParams}
  return await createFase0(projectName, params);
}

async function getProjectByIdService(projectId) {
  const project = await getProjectById(projectId);
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

async function createFase0(projectName, restParams){
  // TODO: validate restParams
  await insertNewProjectDetail(projectName, "0", {
    ...restParams });
  return { status: "ok", message: "Proyecto creado exitosamente"};
}

module.exports = {
  createProjectService,
  getProjectByIdService,
  getActiveProjectsService,
  getAllProjectsByUser
};
