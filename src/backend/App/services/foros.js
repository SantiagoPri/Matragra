const cleaner = require("@appHelpers/cleanResponses");
const { existProject } = require("@appValidations/project");
const { validateProjectUserAuthService } = require("@appServices/projectUsers");

const { insertNewForo, putForo, getForoById } = require("@appModels/foros");
const { insertForoInListService } = require("@appServices/forosList");

async function createForoService(foro, userName) {
  const { projectName, foroName, phase, description, files } = foro;

  const answers = null;

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
    await insertNewForo(
      projectName,
      foroName,
      phase,
      description,
      files,
      answers
    );
  } catch {
    return {
      status: "error",
      message: "Error, no se pudo crear el foro",
    };
  }
  const resp = await insertForoInListService(projectName, phase, foroName);
  if (resp.status === "ok") {
    return { status: "ok", message: "Foro creado exitosamente" };
  } else {
    return resp;
  }
}

async function getForoByIdService(projectName, foroName, userName) {
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
  let foro = null;
  try {
    foro = await getForoById(projectName, foroName);
    if (foro.Count) {
      foro = cleaner(foro);
      return { status: "ok", foro: foro.Items[0] };
    } else {
      return {
        status: "error",
        message: "Error, no se encontro la lista de foros",
      };
    }
  } catch {
    return {
      status: "error",
      message: "Error, no se pudo crear el foro",
    };
  }
}

async function putForoService(projectName, foroName, userName, answer) {
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
  let foro = null;
  try {
    foro = await getForoById(projectName, foroName);
    foro = cleaner(foro);
    const { pk, sk, answers, ...foroParams } = foro.Items[0];
    const newAnswers = answers ? answers : [];
    newAnswers.push({...answer, author: userName});
    await putForo(projectName, foroName, {...foroParams, answers: newAnswers});
  } catch(error) {
    console.log(error);
    return {
      status: "error",
      message: "Error, no se pudo crear el foro",
    };
  }
  return { status: "ok", message: "Foro actualizado" };
}

module.exports = { createForoService, getForoByIdService, putForoService };
