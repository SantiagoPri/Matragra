const {
  insertNewProjectDetail,
  getProjectDetailById,
} = require("@appModels/projectDetails");
const { validateProjectUserAuthService } = require("@appServices/projectUsers");
const { existProject } = require("@appValidations/project");
const { validateNewProjectDetail, validateProjectPhase, validateProjectPhase0 } = require("@appValidations/projectDetail");
const cleaner = require("@appHelpers/cleanResponses");

async function createProjectDetailService(projectName, phase, restParams) {
  const { isValid, message } = await validateNewProjectDetail(
    projectName,
    phase
  );
  if (!isValid) {
    return { status: "error", message };
  }

  await insertNewProjectDetail(projectName, phase, {
    ...restParams,
  });
  return { status: "ok", message: "Proyecto creado exitosamente" };
}

async function getProjectDetailByIdService(projectId, phase) {
  let project = null;
  switch (phase) {
    case "phase0":
      project = await getProjectDetailById(projectId, "0");
      break;
    case "phase1":
      project = await getProjectDetailById(projectId, "1");
      break;
    case "phase2":
      project = await getProjectDetailById(projectId, "2");
      break;
    case "phase3":
      project = await getProjectDetailById(projectId, "3");
      break;
    case "activities":
      project = await getProjectDetailById(projectId, "activities");
      break;
    default:
      return { status: "error", message: "No se especifico ninguna fase" };
  }
  if (project.Count) {
    const cProject = cleaner(project);
    return { projectDetail: cProject.Items[0] };
  }
  return { status: "error", message: "No se encontro ningun registro" };
}

async function putProjectDetailService(projectName, userName, phase, restParams) {
  const exist = await existProject(projectName);
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  let phaseIsValid=null;
  if (phase==="phase0") {
    phaseIsValid = await validateProjectPhase0(restParams);
  }else {
    phaseIsValid = await validateProjectPhase(restParams);
  }
  if (!exist.isValid) {
    return { status: "error", message: "Error, el proyecto no existe" };
  }
  if (!auxAuth.isValid) {
    return { status: "error", message: "Error el usuario no pertenece al proyecto" };
  }
  if (!phaseIsValid.isValid) {
    return { status: "error", message: "Error la fase no es valida" };
  }
  switch (phase) {
    case "phase0":
      await insertNewProjectDetail(projectName, "0", {
        ...restParams,
      });
      break;
    case "phase1":
      await insertNewProjectDetail(projectName, "1", {
        ...restParams,
      });
      break;
    case "phase2":
      await insertNewProjectDetail(projectName, "2", {
        ...restParams,
      });
            break;
    case "phase3":
      await insertNewProjectDetail(projectName, "3", {
        ...restParams,
      });
            break;
    case "activities":
      await insertNewProjectDetail(projectName, "activities", {
        ...restParams,
      });
            break;
    default:
      return { status: "error", message: "No se especifico ninguna fase" };
  }
  return { status: "ok", message: "Proyecto actualizado exitosamente" };
}

module.exports = {
  createProjectDetailService,
  getProjectDetailByIdService,
  putProjectDetailService
};
