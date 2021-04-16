const bcrypt = require("bcryptjs");
const validateNewUser = require("@appValidations/newUser");
const { insertNewUser } = require("@appModels/users");

async function createUserService(user) {
  const { userName, roleName, password, ...restParams } = user;
  const validation = await validateNewUser(userName, roleName, password);
  if (!validation.isValid) {
    return validation.message;
  }
  // Feel free to find a better way to generate the salt, I'm just to tired XD
  // const salt = await bcrypt.genSalt(84);
  // const encryptedPassword = await bcrypt.hash(password, salt);
  await insertNewUser(userName, roleName, {
    // password: encryptedPassword,
    password,//TODO: delete this line
    ...restParams,
  });
  return "User succesfully created";
}

module.exports = { createUserService };
