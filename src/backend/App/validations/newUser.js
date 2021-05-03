const { getUserbyId, getUserbyEmail } = require("@appModels/users");

async function validateNewUser(userName, email, roleName, password) {
  if (!(userName && email && roleName && password)) {
    return { isValid: false, message: "Información incompleta" };
  }
  let user = await getUserbyId(userName);
  if (user.Count) {
    return { isValid: false, message: "Nombre de usuario ya existe" };
  } else {
    user = await getUserbyEmail(email);
    if (user.Count) {
      return { isValid: false, message: "El correo ya ha sido registrado" };
    }
  }

  //Add more checks if needed
  return { isValid: true, message: "Este es un nuevo usuario" };
}

module.exports = validateNewUser;
