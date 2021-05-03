module.exports = function validateLoginInput(user, password) {
  let erross = {};

  if (!(user && password)){
    return {
        isValid: false,
        message: "Campos incompletos"
    }
  }
  return {
    isValid: true,
    message: "Campos validos"
  }
};
