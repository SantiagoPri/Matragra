const { getEventById } = require("@appModels/events");

async function validateNewEvent(projectName, eventName, date,
    time,
    duration,
    subject,
    detail) {
  if (!(projectName && eventName && date && time && duration && subject && detail)) {
    return { isValid: false, message: "Información incompleta" };
  }

  let project = await getEventById(projectName, eventName);
  if (project.Count) {
    return { isValid: false, message: "Ya Existe el evento" };
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo evento" };
}

async function existEvent(projectName, eventName) {
  let project = await getEventById(projectName, eventName);
  if (project.Count) {
    return { isValid: true, message: "Existe el evento" };
  }
  return { isValid: false, message: "No existe el evento" };

}

module.exports = {validateNewEvent, existEvent};
