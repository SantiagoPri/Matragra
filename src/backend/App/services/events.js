const {
  insertNewEvent,
  putEvent,
  getEventById,
  getEventsByProject,
} = require("@appModels/events");
const { existProject } = require("@appValidations/project");
const { validateNewEvent, existEvent } = require("@appValidations/event");
const { validateProjectUserAuthService } = require("@appServices/projectUsers");
const cleaner = require("@appHelpers/cleanResponses");

async function createEventService(event, userName) {
  const { projectName, eventName, date, time, duration, subject, detail } =
    event;
  const { isValid, message } = await validateNewEvent(
    projectName,
    eventName,
    date,
    time,
    duration,
    subject,
    detail
  );
  const exist = await existProject(projectName);
  if (!exist.isValid) {
    return { status: "error", message: "Error, el proyecto no existe" };
  }
  if (!isValid) {
    return { status: "error", message };
  }
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return {
      status: "error",
      message: "Error, el usuario no pertenece al proyecto",
    };
  }
  try {
    await insertNewEvent(
      projectName,
      eventName,
      date,
      time,
      duration,
      subject,
      detail
    );
    return { status: "ok", message: "Evento creado exitosamente" };
  } catch (error) {
    return { status: "error", message: "Error guardando el evento" };
  }
}

async function getEventByIdService(projectName, eventName, userName) {
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return {
      status: "error",
      message: "Error, el usuario no pertenece al proyecto",
    };
  }
  const project = await getEventById(projectName, eventName);
  if (project.Count) {
    const cProject = cleaner(project);
    return { status: "ok", project: cProject.Items[0] };
  }
  return { status: "error", project: null };
}

async function getEventsByProjectService(projectName, userName) {
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return {
      status: "error",
      message: "Error, el usuario no pertenece al proyecto",
    };
  }
  const project = await getEventsByProject(projectName);
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
  );
  today.setHours(0, 0, 0, 0);
  if (project.Count) {
    const cProject = cleaner(project);
    const events = {
      past: [],
      present: [],
      future: [],
    };
    cProject.Items.forEach((event) => {
      const { pk, sk, date, ...restParams } = event;
      const finalObject = {
        projectName: pk,
        eventName: sk,
        date,
        ...restParams,
      };
      const dateParts = date.split("/");
      const dateObject = new Date(
        +dateParts[2],
        dateParts[1] - 1,
        +dateParts[0]
      );
      if (dateObject.getTime() === today.getTime()) {
        events.present.push(finalObject);
      } else if (dateObject.getTime() > today.getTime()) {
        events.future.push(finalObject);
      } else {
        events.past.push(finalObject);
      }
    });
    return { status: "ok", events };
  }
  return { status: "error", project: null };
}

async function putEventService(projectName, eventName, userName, restParams) {
  const exist = await existEvent(projectName, eventName);
  if (!exist.isValid) {
    return { status: "error", message: "Error, el evento no existe" };
  }
  const auxAuth = await validateProjectUserAuthService(projectName, userName);
  if (!auxAuth.isValid) {
    return {
      status: "error",
      message: "Error, el usuario no pertenece al proyecto",
    };
  }
  try {
    await putEvent(projectName, eventName, restParams);
    return { status: "ok", message: "Evento actualizado exitosamente" };
  } catch (error) {
    return { status: "error", message: "Error, actualizando el evento" };
  }
}

module.exports = {
  createEventService,
  getEventByIdService,
  getEventsByProjectService,
  putEventService,
};
