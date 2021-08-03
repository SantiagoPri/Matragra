const { existProject } = require("@appValidations/project");
const { validateProjectUserAuthService } = require("@appServices/projectUsers");
const { putList, getListById } = require("@appModels/forosList");
const cleaner = require("@appHelpers/cleanResponses");

async function getListByIdService(projectName, userName) {
  const listName = "ForoList";
  let foroList = null;
  const exist = await existProject(projectName);
  if (!exist.isValid) {
    return { status: "error", message: "Error, el proyecto no existe" };
  }
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return {
      status: "error",
      message: "Error, el usuario no pertenece al proyecto",
    };
  }
  try {
    foroList = await getListById(projectName, listName);
    if (foroList) {
      foroList = cleaner(foroList);
      return { status: "ok", foroList: foroList.Items[0] };
    } else {
      return {
        status: "error",
        message: "Error, no se encontro la lista de foros",
      };
    }
  } catch {
    return {
      status: "error",
      message: "Error, no se pudo traer la lista de foros",
    };
  }
}

async function insertForoInListService(projectName, phase, foroName) {
  const listName = "ForoList";
  let forosList = await getListById(projectName, listName);
  forosList = cleaner(forosList);
  forosList = forosList.Count ? forosList.Items[0] : {};
  let restParams = null;
  switch (phase) {
    case "phase0":
      if (forosList.phase0) {
        restParams = { ...forosList, phase0: [...forosList.phase0, foroName] };
      } else {
        restParams = { ...forosList, phase0: [foroName] };
      }
      break;
    case "phase1":
      if (forosList.phase1) {
        restParams = { ...forosList, phase1: [...forosList.phase1, foroName]};
      } else {
        restParams = { ...forosList, phase1: [foroName] };
      }
      break;
    case "phase2":
      if (forosList.phase2) {
        restParams = { ...forosList, phase2: [...forosList.phase2, foroName]};
      } else {
        restParams = { ...forosList, phase2: [foroName] };
      }
      break;
    case "phase3":
      if (forosList.phase3) {
        restParams = { ...forosList, phase3: [...forosList.phase3, foroName]};
      } else {
        restParams = { ...forosList, phase3: [foroName] };
      }
      break;
    case "general":
      if (forosList.general) {
        restParams = { ...forosList, general: [...forosList.general, foroName]};
      } else {
        restParams = { ...forosList, general: [foroName] };
      }
      break;
    default:
      return {
        status: "error",
        message: "No se especifico ninguna fase, o la fase no es valida",
      };
  }
  try {
    await putList(projectName, listName, restParams);
  } catch (error) {
    return { status: "error", message: error };
  }
  return { status: "ok", message: "Foro asociado exitosamente" };
}

module.exports = { getListByIdService, insertForoInListService };
