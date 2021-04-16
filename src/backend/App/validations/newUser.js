const { getUserbyId } = require("@appModels/users");

async function validateNewUser(userName, roleName, password) {
  if (!(userName && roleName && password)) {
    return { isValid: false, message: "Incomplete Information" };
  }
  const user = await getUserbyId(userName);
  if (user.Count) {
    return { isValid: false, message: "User Name already exist" };
  }
  //Add more checks if needed
  return { isValid: true, message: "This is a new user" };
}

module.exports = validateNewUser;
