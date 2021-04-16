module.exports = function validateLoginInput(user, password) {
  let erross = {};

  if (!(user && password)){
    return {
        isValid: false,
        message: "incomplete fields"
    }
  }
  return {
    isValid: true,
    message: "valid fields"
  }
};
