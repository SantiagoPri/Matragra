const {
    insertNewProjectDetail,
    getProjectDetailById,
  } = require("@appModels/projectDetails");
  const validateNewProjectDetail = require("@appValidations/projectDetail");
  const cleaner = require("@appHelpers/cleanResponses");
  
  async function createProjectDetailService(project) {
    const { projectName, type, index, fase0,
        fase1, fase2, fase3, registroDeActividades, ...restParams } = project;
    const { isValid, message } = await validateNewProjectDetail(projectName, type, index, fase0,
        fase1, fase2, fase3, registroDeActividades
    );
    if (!isValid) {
      return { status: "error", message };
    }
  
    await insertNewProjectDetail(projectName, type, index, fase0,
        fase1, fase2, fase3, registroDeActividades, {
      ...restParams,
    });
    return { status: "ok", message: "Proyecto creado exitosamente" };
  }
  
  async function getProjectDetailByIdService(projectName) {
    const project = await getProjectDetailById(projectName);
    if (project.Count) {
      const cProject = cleaner(project);
      return { projectDetail: cProject.Items[0] };
    }
    return { status: "error", message: "No se encontro ningun registro" };
  }
  
  module.exports = {
    createProjectDetailService,
    getProjectDetailByIdService
  };
  